import { useState, useEffect, useCallback } from "react";
import { youtubeAPI } from "../lib/youtube";
import { getStaticSermons } from "../data/staticSermons";

// Fallback videos in case of quota exceeded
const getFallbackVideos = () => {
  return getStaticSermons();
};

export const useYouTubeVideos = (maxResults = 20) => {
  const [videos, setVideos] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch channel playlists for topic filtering
  const fetchPlaylists = useCallback(async () => {
    try {
      const channelPlaylists = await youtubeAPI.getChannelPlaylists();
      // Normalize to include snippet shape expected by UI (playlist.snippet.title)
      const normalized = channelPlaylists.map((p) => ({
        ...p,
        snippet: {
          title: p.title,
          description: p.description,
          thumbnails: {
            high: { url: p.thumbnail },
            medium: { url: p.thumbnail },
            default: { url: p.thumbnail },
          },
        },
      }));
      setPlaylists(normalized);
      return normalized;
    } catch (error) {
      console.warn("Could not fetch playlists:", error.message);
      return [];
    }
  }, []);

  // Fetch latest channel videos (default list)
  const fetchVideos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("Starting to fetch YouTube videos...");

      // Check if environment variables are available
      const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
      const channelId = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

      if (!apiKey) {
        const errorMsg =
          "YouTube API key not found in environment variables. Please check your .env.local file.";
        console.error(errorMsg);
        console.error("Available env vars:", Object.keys(import.meta.env));
        throw new Error(errorMsg);
      }

      if (!channelId) {
        const errorMsg =
          "YouTube channel ID not found in environment variables. Please check your .env.local file.";
        console.error(errorMsg);
        throw new Error(errorMsg);
      }

      console.log("API Key exists:", !!apiKey);
      console.log("Channel ID exists:", !!channelId);

      const channelVideos = await youtubeAPI.getChannelVideos(maxResults);
      console.log("Fetched videos:", channelVideos.length);

      if (channelVideos.length > 0) {
        // Normalize to a common structure with snippet for UI compatibility
        const normalized = channelVideos.map((v) => ({
          id: v.id,
          // Provide a snippet shape similar to YouTube API search/list responses
          snippet: {
            title: v.title,
            description: v.description,
            publishedAt: v.publishedAt,
            channelTitle: v.channelTitle,
            thumbnails: {
              high: { url: v.thumbnail },
              medium: { url: v.thumbnail },
              default: { url: v.thumbnail },
            },
          },
          // Keep flat fields for any legacy access
          title: v.title,
          description: v.description,
          publishedAt: v.publishedAt,
          thumbnail: v.thumbnail,
          channelTitle: v.channelTitle,
        }));
        setVideos(normalized);
      } else {
        console.warn("No videos found in the channel.");
        setVideos(getFallbackVideos()); // Use fallback if no videos found
      }
    } catch (error) {
      console.error("Error fetching YouTube videos:", error);
      setError("Failed to fetch YouTube videos. Please try again later.");
      setVideos(getFallbackVideos()); // Use fallback on error
    } finally {
      setLoading(false);
    }
  }, [maxResults]);

  // Fetch videos when a playlist (topic) is selected
  const fetchVideosByPlaylist = useCallback(
    async (playlistId) => {
      if (!playlistId) {
        // Reset to default list
        return fetchVideos();
      }
      try {
        setLoading(true);
        setError(null);
        const playlistVideos = await youtubeAPI.getVideosFromPlaylist(
          playlistId,
          maxResults
        );
        const normalized = playlistVideos.map((v) => ({
          id: v.id,
          snippet: {
            title: v.title,
            description: v.description,
            publishedAt: v.publishedAt,
            channelTitle: v.channelTitle,
            thumbnails: {
              high: { url: v.thumbnail },
              medium: { url: v.thumbnail },
              default: { url: v.thumbnail },
            },
          },
          title: v.title,
          description: v.description,
          publishedAt: v.publishedAt,
          thumbnail: v.thumbnail,
          channelTitle: v.channelTitle,
          playlistId,
        }));
        setVideos(normalized);
      } catch (err) {
        console.error("Error fetching playlist videos:", err.message);
        setError(
          `Failed to fetch videos for the selected topic. ${err.message}`
        );
        setVideos(getFallbackVideos());
      } finally {
        setLoading(false);
      }
    },
    [fetchVideos, maxResults]
  );

  useEffect(() => {
    fetchPlaylists();
    fetchVideos();
  }, [fetchPlaylists, fetchVideos]);

  return {
    videos,
    playlists,
    loading,
    error,
    refetch: fetchVideos,
    refetchPlaylists: fetchPlaylists,
    fetchVideosByPlaylist,
  };
};

export const useLiveStream = (options = {}) => {
  const { refreshInterval = 5 * 60 * 1000 } = options; // Default to 5 minutes

  const [liveStream, setLiveStream] = useState(null);
  const [upcomingStream, setUpcomingStream] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStreams = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("Fetching live stream...");
      const { live, upcoming } = await youtubeAPI.getLiveStreams();

      if (live.length > 0) {
        setLiveStream(live[0]);
      } else {
        setLiveStream(null);
      }

      if (upcoming.length > 0) {
        setUpcomingStream(upcoming[0]);
      } else {
        setUpcomingStream(null);
      }

      if (live.length > 0) {
        console.log("Live stream detected:", live[0].title);
      }
      if (upcoming.length > 0) {
        console.log("Upcoming stream detected:", upcoming[0].title);
      }
    } catch (err) {
      console.error("Error in useLiveStream:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStreams();

    // Only set up interval if refreshInterval is greater than 0
    if (refreshInterval > 0) {
      console.log(
        `Setting up live stream check every ${
          refreshInterval / 1000 / 60
        } minutes`
      );
      const interval = setInterval(fetchStreams, refreshInterval);
      return () => clearInterval(interval);
    } else {
      console.log("Live stream auto-refresh disabled to save API quota");
    }
  }, [refreshInterval]);

  return { liveStream, upcomingStream, loading, error, refetch: fetchStreams };
};
