const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;
const BASE_URL = "https://www.googleapis.com/youtube/v3";

// Centralized lightweight error classifier so UI can surface friendly messages
export function classifyYouTubeError(err) {
  const msg = err?.message || "Unknown error";
  if (/quota/i.test(msg))
    return {
      type: "quota",
      message:
        "Daily YouTube API quota exceeded. Videos will reappear after reset.",
    };
  if (/forbidden/i.test(msg))
    return {
      type: "forbidden",
      message:
        "YouTube API access forbidden. Verify API key & enabled Data API v3.",
    };
  if (/Invalid YouTube channel ID/i.test(msg) || /channel ID/i.test(msg))
    return {
      type: "channel",
      message:
        "Invalid channel configuration. Please verify the channel ID in environment variables.",
    };
  if (/Missing YouTube API key/i.test(msg))
    return {
      type: "config",
      message:
        "YouTube API key missing. Add VITE_YOUTUBE_API_KEY to .env.local and restart dev server.",
    };
  return {
    type: "generic",
    message: "Unable to load latest videos right now.",
  };
}

// Debug: Check if environment variables are loaded
console.log("YouTube API Key loaded:", !!YOUTUBE_API_KEY);
console.log("Channel ID loaded:", !!CHANNEL_ID);
console.log(
  "API Key prefix:",
  YOUTUBE_API_KEY ? YOUTUBE_API_KEY.substring(0, 10) + "..." : "NOT_SET"
);
console.log("Channel ID:", CHANNEL_ID || "NOT_SET");

export const youtubeAPI = {
  // Get channel uploads playlist
  async getChannelUploadsPlaylist() {
    if (!YOUTUBE_API_KEY || !CHANNEL_ID) {
      throw new Error("Missing YouTube API credentials");
    }

    try {
      const url = `${BASE_URL}/channels?key=${YOUTUBE_API_KEY}&id=${CHANNEL_ID}&part=contentDetails`;
      console.log(
        "Fetching channel info:",
        url.replace(YOUTUBE_API_KEY, "API_KEY_HIDDEN")
      );

      const response = await fetch(url);
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Channel fetch error:", errorText);
        throw new Error(`Channel fetch failed: ${response.status}`);
      }

      const data = await response.json();
      console.log("Channel data:", data);

      const uploadsPlaylistId =
        data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
      if (!uploadsPlaylistId) {
        throw new Error("Could not find uploads playlist for channel");
      }

      return uploadsPlaylistId;
    } catch (error) {
      console.error("Error getting uploads playlist:", error);
      throw error;
    }
  },

  // Get videos from uploads playlist
  async getPlaylistVideos(playlistId, maxResults = 20) {
    if (!YOUTUBE_API_KEY) {
      throw new Error("Missing YouTube API key");
    }

    try {
      const url = `${BASE_URL}/playlistItems?key=${YOUTUBE_API_KEY}&playlistId=${playlistId}&part=snippet&order=date&maxResults=${maxResults}`;
      console.log(
        "Fetching playlist videos:",
        url.replace(YOUTUBE_API_KEY, "API_KEY_HIDDEN")
      );

      const response = await fetch(url);
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Playlist fetch error:", errorText);
        throw new Error(`Playlist fetch failed: ${response.status}`);
      }

      const data = await response.json();
      console.log("Playlist data:", data);

      return (
        data.items?.map((item) => ({
          id: item.snippet.resourceId.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          publishedAt: item.snippet.publishedAt,
          thumbnail:
            item.snippet.thumbnails.high?.url ||
            item.snippet.thumbnails.medium?.url ||
            item.snippet.thumbnails.default?.url ||
            `https://img.youtube.com/vi/${item.snippet.resourceId.videoId}/hqdefault.jpg`, // YouTube direct thumbnail URL
          channelTitle: item.snippet.channelTitle,
        })) || []
      );
    } catch (error) {
      console.error("Error getting playlist videos:", error);
      throw error;
    }
  },

  // Get latest videos from channel (updated method)
  async getChannelVideos(maxResults = 20) {
    // Check if API key and channel ID are available
    if (!YOUTUBE_API_KEY) {
      console.error("YouTube API key not found. Check your .env.local file.");
      throw new Error("YouTube API key not configured");
    }

    if (!CHANNEL_ID) {
      console.error(
        "YouTube channel ID not found. Check your .env.local file."
      );
      throw new Error("YouTube channel ID not configured");
    }

    try {
      // First try the uploads playlist method (more reliable)
      console.log("Trying uploads playlist method...");
      try {
        const uploadsPlaylistId = await this.getChannelUploadsPlaylist();
        const videos = await this.getPlaylistVideos(
          uploadsPlaylistId,
          maxResults
        );
        if (videos.length > 0) {
          console.log(`Found ${videos.length} videos via uploads playlist`);
          return videos;
        }
      } catch (playlistError) {
        console.warn("Uploads playlist method failed:", playlistError.message);
      }

      // Fallback to search method
      console.log("Trying search method...");
      const url = `${BASE_URL}/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&maxResults=${maxResults}&type=video`;
      console.log(
        "Fetching videos from:",
        url.replace(YOUTUBE_API_KEY, "API_KEY_HIDDEN")
      );

      const response = await fetch(url);

      console.log("YouTube API Response Status:", response.status);
      console.log(
        "YouTube API Response Headers:",
        Object.fromEntries(response.headers.entries())
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("YouTube API Error Response:", errorText);

        let errorJson;
        try {
          errorJson = JSON.parse(errorText);
        } catch (parseError) {
          console.error(
            "Could not parse error response as JSON:",
            parseError.message
          );
        }

        if (response.status === 403) {
          const quotaExceeded = errorJson?.error?.errors?.some(
            (e) =>
              e.reason === "quotaExceeded" || e.reason === "dailyLimitExceeded"
          );
          if (quotaExceeded) {
            throw new Error(
              "YouTube API daily quota exceeded. Please try again tomorrow or increase your quota limit."
            );
          }
          throw new Error(
            "YouTube API access forbidden. Please check your API key permissions and ensure the YouTube Data API v3 is enabled."
          );
        } else if (response.status === 400) {
          const invalidChannel = errorJson?.error?.errors?.some(
            (e) => e.reason === "channelNotFound" || e.location === "channelId"
          );
          if (invalidChannel) {
            throw new Error(
              `Invalid YouTube channel ID: ${CHANNEL_ID}. Please verify the channel ID is correct.`
            );
          }
          throw new Error(
            `Invalid YouTube API request. Error: ${
              errorJson?.error?.message || errorText
            }`
          );
        }
        throw new Error(
          `YouTube API error: ${response.status} ${response.statusText}. ${
            errorJson?.error?.message || errorText
          }`
        );
      }

      const data = await response.json();
      console.log("YouTube API response structure:", {
        kind: data.kind,
        etag: data.etag,
        nextPageToken: data.nextPageToken,
        regionCode: data.regionCode,
        pageInfo: data.pageInfo,
        itemsCount: data.items?.length || 0,
      });

      if (!data.items || data.items.length === 0) {
        console.warn("No videos found for channel:", CHANNEL_ID);
        return [];
      }

      return data.items.map((item) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        publishedAt: item.snippet.publishedAt,
        thumbnail:
          item.snippet.thumbnails.high?.url ||
          item.snippet.thumbnails.medium?.url ||
          item.snippet.thumbnails.default?.url ||
          `https://img.youtube.com/vi/${item.id.videoId}/hqdefault.jpg`, // YouTube direct thumbnail URL
        channelTitle: item.snippet.channelTitle,
      }));
    } catch (error) {
      console.error("Error fetching YouTube videos:", error);
      // Re-throw so caller can classify, but attach a hint flag
      error.__YT_FETCH_FAILED = true;
      throw error;
    }
  },

  // Get live streams (current and upcoming)
  async getLiveStreams() {
    if (!YOUTUBE_API_KEY || !CHANNEL_ID) {
      return [];
    }

    try {
      const response = await fetch(
        `${BASE_URL}/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&maxResults=5&type=video&eventType=live`
      );

      if (!response.ok) {
        console.warn("Could not fetch live streams:", response.status);
        return [];
      }

      const data = await response.json();
      return data.items.map((item) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        publishedAt: item.snippet.publishedAt,
        thumbnail:
          item.snippet.thumbnails.high?.url ||
          item.snippet.thumbnails.default.url,
        isLive: true,
      }));
    } catch (error) {
      console.error("Error fetching live streams:", error);
      return [];
    }
  },

  // Get upcoming live streams
  async getUpcomingStreams() {
    if (!YOUTUBE_API_KEY || !CHANNEL_ID) {
      return [];
    }

    try {
      const response = await fetch(
        `${BASE_URL}/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&maxResults=5&type=video&eventType=upcoming`
      );

      if (!response.ok) {
        console.warn("Could not fetch upcoming streams:", response.status);
        return [];
      }

      const data = await response.json();
      return data.items.map((item) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        publishedAt: item.snippet.publishedAt,
        thumbnail:
          item.snippet.thumbnails.high?.url ||
          item.snippet.thumbnails.medium?.url ||
          item.snippet.thumbnails.default?.url ||
          `https://img.youtube.com/vi/${item.id.videoId}/hqdefault.jpg`,
        isUpcoming: true,
      }));
    } catch (error) {
      console.error("Error fetching upcoming streams:", error);
      return [];
    }
  },

  // Get video details including duration, view count, etc.
  async getVideoDetails(videoIds) {
    if (!YOUTUBE_API_KEY || !videoIds || videoIds.length === 0) {
      return [];
    }

    try {
      const response = await fetch(
        `${BASE_URL}/videos?key=${YOUTUBE_API_KEY}&id=${videoIds.join(
          ","
        )}&part=snippet,statistics,contentDetails`
      );

      if (!response.ok) {
        console.warn("Could not fetch video details:", response.status);
        return [];
      }

      const data = await response.json();
      return data.items.map((item) => ({
        id: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        publishedAt: item.snippet.publishedAt,
        thumbnail:
          item.snippet.thumbnails.high?.url ||
          item.snippet.thumbnails.medium?.url ||
          item.snippet.thumbnails.default?.url ||
          `https://img.youtube.com/vi/${item.id}/hqdefault.jpg`,
        duration: item.contentDetails.duration,
        viewCount: item.statistics.viewCount,
        likeCount: item.statistics.likeCount,
        tags: item.snippet.tags || [],
      }));
    } catch (error) {
      console.error("Error fetching video details:", error);
      return [];
    }
  },

  // Get all playlists from channel for topic filtering
  async getChannelPlaylists() {
    if (!YOUTUBE_API_KEY || !CHANNEL_ID) {
      return [];
    }

    try {
      const response = await fetch(
        `${BASE_URL}/playlists?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,contentDetails&maxResults=50`
      );

      if (!response.ok) {
        console.warn("Could not fetch channel playlists:", response.status);
        return [];
      }

      const data = await response.json();
      return (
        data.items?.map((item) => ({
          id: item.id,
          title: item.snippet.title,
          description: item.snippet.description,
          itemCount: item.contentDetails?.itemCount || 0,
          thumbnail:
            item.snippet.thumbnails.high?.url ||
            item.snippet.thumbnails.medium?.url ||
            item.snippet.thumbnails.default?.url,
        })) || []
      );
    } catch (error) {
      console.error("Error fetching channel playlists:", error);
      return [];
    }
  },

  // Get videos from a specific playlist by ID
  async getVideosFromPlaylist(playlistId, maxResults = 20) {
    if (!YOUTUBE_API_KEY || !playlistId) {
      return [];
    }

    try {
      const response = await fetch(
        `${BASE_URL}/playlistItems?key=${YOUTUBE_API_KEY}&playlistId=${playlistId}&part=snippet&maxResults=${maxResults}&order=date`
      );

      if (!response.ok) {
        console.warn("Could not fetch playlist videos:", response.status);
        return [];
      }

      const data = await response.json();
      return (
        data.items?.map((item) => ({
          id: item.snippet.resourceId?.videoId || item.snippet.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          publishedAt: item.snippet.publishedAt,
          thumbnail:
            item.snippet.thumbnails.high?.url ||
            item.snippet.thumbnails.medium?.url ||
            item.snippet.thumbnails.default?.url ||
            "/api/placeholder/480/360", // Fallback placeholder
          channelTitle: item.snippet.channelTitle,
          playlistTitle: item.snippet.playlistTitle,
        })) || []
      );
    } catch (error) {
      console.error("Error fetching playlist videos:", error);
      return [];
    }
  },
};

// Helper function to parse ISO 8601 duration to minutes
export const parseDuration = (duration) => {
  if (!duration) return 0;
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return 0;

  const hours = parseInt(match[1]) || 0;
  const minutes = parseInt(match[2]) || 0;
  const seconds = parseInt(match[3]) || 0;
  return hours * 60 + minutes + (seconds > 30 ? 1 : 0); // Round up if >30 seconds
};

// Helper function to format numbers (1000 -> 1K)
export const formatNumber = (num) => {
  if (!num) return "0";
  const number = parseInt(num);
  if (number >= 1000000) return (number / 1000000).toFixed(1) + "M";
  if (number >= 1000) return (number / 1000).toFixed(1) + "K";
  return number.toString();
};
