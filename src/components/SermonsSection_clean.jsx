import React, { useState, useMemo } from "react";
import {
  Play,
  Youtube,
  Filter,
  Tv,
  Clock,
  Eye,
  ThumbsUp,
  Calendar,
  RefreshCw,
} from "lucide-react";
import Button from "./Button";
import { useYouTubeVideos, useLiveStream } from "../hooks/useYouTube";

const SermonsSection = () => {
  const {
    videos,
    playlists,
    loading: videosLoading,
    error: videosError,
    refetch,
    refetchPlaylists,
  } = useYouTubeVideos(10);

  const {
    liveStream,
    upcomingStream,
    loading: streamLoading,
  } = useLiveStream({ refreshInterval: 10 * 60 * 1000 });

  const [sermonFilters, setSermonFilters] = useState({
    preacher: "",
    topic: "",
    date: "",
    search: "",
  });
  const [playingVideo, setPlayingVideo] = useState(null);

  // Process videos and extract preacher, scripture, and topic
  const processedSermons = useMemo(() => {
    if (!videos || videos.length === 0) {
      console.log("No videos available for processing, videos:", videos);
      return [];
    }

    console.log("Processing", videos.length, "videos");

    return videos.map((video) => {
      const title = video.title || "";
      const description = video.description || "";

      // Enhanced preacher extraction
      let possiblePreacher = "";

      // Pattern 1: "Title - Pastor Name" or "Title by Pastor Name"
      const dashPattern =
        /(?:-\s*(?:Pastor\s+)?(.+?)$|by\s+(?:Pastor\s+)?(.+?)(?:\s|$))/i;
      const dashMatch = title.match(dashPattern);
      if (dashMatch) {
        possiblePreacher = (dashMatch[1] || dashMatch[2] || "").trim();
      }

      // Pattern 2: "Pastor Name: Title"
      if (!possiblePreacher) {
        const colonPattern =
          /^((?:Pastor\s+|Rev\.?\s+|Dr\.?\s+)?[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s*:/i;
        const colonMatch = title.match(colonPattern);
        if (colonMatch) {
          possiblePreacher = colonMatch[1].trim();
        }
      }

      // Clean up common prefixes
      possiblePreacher = possiblePreacher
        .replace(/^(Pastor\s+|Rev\.?\s+|Dr\.?\s+)/i, "")
        .trim();

      // Enhanced scripture extraction
      let scripture = "";
      const scripturePatterns = [
        /([1-3]?\s*[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+(\d+):(\d+(?:-\d+)?)/g,
        /([1-3]?\s*[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+(\d+)/g,
      ];

      for (const pattern of scripturePatterns) {
        const matches = [...(title + " " + description).matchAll(pattern)];
        if (matches.length > 0) {
          scripture = matches[0][0];
          break;
        }
      }

      // Enhanced topic categorization
      let topic = "General";
      const titleLower = title.toLowerCase();

      if (
        titleLower.includes("christmas") ||
        titleLower.includes("nativity") ||
        titleLower.includes("advent")
      ) {
        topic = "Christmas";
      } else if (
        titleLower.includes("easter") ||
        titleLower.includes("resurrection") ||
        titleLower.includes("palm sunday")
      ) {
        topic = "Easter";
      } else if (
        titleLower.includes("prophecy") ||
        titleLower.includes("prophetic") ||
        titleLower.includes("revelation")
      ) {
        topic = "Prophecy";
      } else if (
        titleLower.includes("healing") ||
        titleLower.includes("miracle") ||
        titleLower.includes("divine healing")
      ) {
        topic = "Healing";
      } else if (
        titleLower.includes("prayer") ||
        titleLower.includes("intercession") ||
        titleLower.includes("spiritual warfare")
      ) {
        topic = "Prayer";
      } else if (
        titleLower.includes("worship") ||
        titleLower.includes("praise") ||
        titleLower.includes("adoration")
      ) {
        topic = "Worship";
      } else if (
        titleLower.includes("faith") ||
        titleLower.includes("believe") ||
        titleLower.includes("trust")
      ) {
        topic = "Faith";
      } else if (
        titleLower.includes("love") ||
        titleLower.includes("grace") ||
        titleLower.includes("mercy")
      ) {
        topic = "Love & Grace";
      } else if (
        titleLower.includes("baptism") ||
        titleLower.includes("communion") ||
        titleLower.includes("lord's supper")
      ) {
        topic = "Ordinances";
      }

      return {
        ...video,
        preacher: possiblePreacher || "Pastor",
        scripture: scripture || "",
        topic: topic,
        date: video.publishedAt.split("T")[0],
        searchableText: `${video.title} ${
          video.description || ""
        } ${possiblePreacher} ${scripture}`.toLowerCase(),
      };
    });
  }, [videos]);

  // Filter sermons - IMPROVED FILTERING
  const filteredSermons = useMemo(() => {
    if (!processedSermons || processedSermons.length === 0) return [];

    return processedSermons.filter((sermon) => {
      const matchesSearch =
        !sermonFilters.search ||
        sermon.searchableText.includes(sermonFilters.search.toLowerCase());

      const matchesPreacher =
        !sermonFilters.preacher ||
        sermon.preacher
          .toLowerCase()
          .includes(sermonFilters.preacher.toLowerCase());

      // Improved topic filter - matches generated topics OR playlist names
      const matchesTopic =
        !sermonFilters.topic ||
        sermon.topic === sermonFilters.topic ||
        sermon.title
          .toLowerCase()
          .includes(sermonFilters.topic.toLowerCase()) ||
        (sermon.description &&
          sermon.description
            .toLowerCase()
            .includes(sermonFilters.topic.toLowerCase()));

      const matchesDate =
        !sermonFilters.date || sermon.date.includes(sermonFilters.date);

      return matchesSearch && matchesPreacher && matchesTopic && matchesDate;
    });
  }, [processedSermons, sermonFilters]);

  const clearFilters = () => {
    setSermonFilters({ preacher: "", topic: "", date: "", search: "" });
  };

  const handleRefresh = () => {
    refetch();
  };

  // Get available topics - COMBINES generated topics + playlists
  const availableTopics = useMemo(() => {
    console.log(
      "Available playlists:",
      playlists?.length || 0,
      "Processed sermons:",
      processedSermons.length
    );

    const generatedTopics = [
      ...new Set(processedSermons.map((sermon) => sermon.topic)),
    ];
    const playlistTopics = playlists
      ? playlists.map((playlist) => playlist.title)
      : [];

    const allTopics = [...new Set([...generatedTopics, ...playlistTopics])];
    return allTopics.sort();
  }, [playlists, processedSermons]);

  const handleVideoPlay = (videoId) => {
    setPlayingVideo(playingVideo === videoId ? null : videoId);
  };

  if (videosLoading || streamLoading) {
    return (
      <section id='sermons' className='py-20 bg-gray-50'>
        <div className='container mx-auto px-6 text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto'></div>
          <p className='mt-4 text-gray-600'>Loading sermons...</p>
        </div>
      </section>
    );
  }

  console.log("Rendering sermons section with:", {
    videosCount: videos?.length || 0,
    processedCount: processedSermons?.length || 0,
    filteredCount: filteredSermons?.length || 0,
    playlistsCount: playlists?.length || 0,
    error: videosError,
  });

  return (
    <section className='py-16 lg:py-24'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12 animate-fade-in'>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6'>
            Recent Sermons
          </h2>
          <p className='text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8'>
            Join us as we explore God's Word together. Each message is designed
            to encourage, challenge, and inspire you in your faith journey.
          </p>
        </div>

        {/* Debug Information */}
        {import.meta.env.DEV && (
          <div className='mb-4 p-4 bg-yellow-100 rounded-lg'>
            <h3 className='font-bold text-yellow-800'>Debug Info:</h3>
            <p>Videos loaded: {videos?.length || 0}</p>
            <p>Processed sermons: {processedSermons?.length || 0}</p>
            <p>Filtered sermons: {filteredSermons?.length || 0}</p>
            <p>Playlists: {playlists?.length || 0}</p>
            <p>Error: {videosError || "None"}</p>
            <p>Loading: {videosLoading ? "Yes" : "No"}</p>
          </div>
        )}

        {/* Live Stream Section */}
        {(liveStream || upcomingStream) && (
          <div className='mb-12 p-6 bg-red-50 border border-red-200 rounded-xl animate-fade-in'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-4'>
                <div className='relative'>
                  <Tv className='w-8 h-8 text-red-600' />
                  {liveStream && (
                    <div className='absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse'></div>
                  )}
                </div>
                <div>
                  <h3 className='text-xl font-bold text-red-900'>
                    {liveStream ? "LIVE NOW" : "UPCOMING STREAM"}
                  </h3>
                  <p className='text-red-700'>
                    {liveStream
                      ? liveStream.title
                      : upcomingStream?.title || "Next service"}
                  </p>
                  {upcomingStream && !liveStream && (
                    <p className='text-sm text-red-600 mt-1'>
                      <Clock className='inline w-4 h-4 mr-1' />
                      {new Date(upcomingStream.publishedAt).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
              <Button
                onClick={() =>
                  window.open(
                    `https://youtube.com/watch?v=${
                      liveStream?.id || upcomingStream?.id
                    }`,
                    "_blank"
                  )
                }
                className='bg-red-600 hover:bg-red-700'
              >
                {liveStream ? "Watch Live" : "Set Reminder"}
              </Button>
            </div>
          </div>
        )}

        {/* Filter Controls */}
        <div className='mb-8 bg-white rounded-xl shadow-sm p-6 border border-gray-100 animate-fade-in'>
          <div className='flex items-center gap-4 mb-6'>
            <div className='flex items-center gap-2'>
              <Filter className='w-5 h-5 text-gray-600' />
              <h3 className='text-lg font-semibold text-gray-900'>
                Filter Sermons
              </h3>
            </div>
            <Button
              onClick={handleRefresh}
              variant='outline'
              size='sm'
              className='ml-auto'
            >
              <RefreshCw className='w-4 h-4 mr-2' />
              Refresh
            </Button>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Search
              </label>
              <input
                type='text'
                placeholder='Search sermons...'
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200'
                value={sermonFilters.search}
                onChange={(e) =>
                  setSermonFilters({ ...sermonFilters, search: e.target.value })
                }
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Preacher
              </label>
              <input
                type='text'
                placeholder='Filter by preacher...'
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200'
                value={sermonFilters.preacher}
                onChange={(e) =>
                  setSermonFilters({
                    ...sermonFilters,
                    preacher: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <div className='flex items-center justify-between mb-2'>
                <label className='block text-sm font-medium text-gray-700'>
                  Topic{" "}
                  {playlists && playlists.length > 0
                    ? "(From Playlists)"
                    : "(Generated)"}
                </label>
                {playlists && playlists.length > 0 && (
                  <button
                    onClick={refetchPlaylists}
                    className='text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1'
                    title='Refresh playlists'
                  >
                    <RefreshCw className='w-3 h-3' />
                    Refresh
                  </button>
                )}
              </div>
              <select
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200'
                value={sermonFilters.topic}
                onChange={(e) =>
                  setSermonFilters({ ...sermonFilters, topic: e.target.value })
                }
              >
                <option value=''>All Topics</option>
                {availableTopics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Date
              </label>
              <input
                type='date'
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200'
                value={sermonFilters.date}
                onChange={(e) =>
                  setSermonFilters({ ...sermonFilters, date: e.target.value })
                }
              />
            </div>
          </div>

          {/* Active Filters Display */}
          {(sermonFilters.search ||
            sermonFilters.preacher ||
            sermonFilters.topic ||
            sermonFilters.date) && (
            <div className='flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200'>
              <span className='text-sm text-gray-600 mr-2'>
                Active filters:
              </span>
              {sermonFilters.search && (
                <span className='bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs'>
                  Search: {sermonFilters.search}
                </span>
              )}
              {sermonFilters.preacher && (
                <span className='bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs'>
                  Preacher: {sermonFilters.preacher}
                </span>
              )}
              {sermonFilters.topic && (
                <span className='bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs'>
                  Topic: {sermonFilters.topic}
                </span>
              )}
              {sermonFilters.date && (
                <span className='bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs'>
                  Date: {sermonFilters.date}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Sermon Grid */}
        {filteredSermons.length === 0 ? (
          <div className='text-center py-12'>
            <div className='text-gray-400 text-6xl mb-4'>📹</div>
            <h3 className='text-xl font-semibold text-gray-600 mb-2'>
              No Sermons Found
            </h3>
            <p className='text-gray-500 mb-4'>
              {sermonFilters.search ||
              sermonFilters.preacher ||
              sermonFilters.topic ||
              sermonFilters.date
                ? "Try adjusting your filters or search terms."
                : videosError
                ? "There was an error loading sermons. Please try refreshing the page."
                : "Loading sermons... Please wait."}
            </p>
            {(sermonFilters.search ||
              sermonFilters.preacher ||
              sermonFilters.topic ||
              sermonFilters.date) && (
              <Button onClick={clearFilters} variant='outline'>
                Clear All Filters
              </Button>
            )}
          </div>
        ) : (
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {filteredSermons.map((sermon, index) => (
              <div
                key={sermon.id}
                className='bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in'
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className='aspect-video bg-gray-200 relative group'>
                  {playingVideo === sermon.id ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${sermon.id}?autoplay=1&rel=0`}
                      title={sermon.title}
                      className='w-full h-full'
                      frameBorder='0'
                      allowFullScreen
                      allow='autoplay'
                    ></iframe>
                  ) : (
                    <>
                      <img
                        src={
                          sermon.thumbnail ||
                          `https://img.youtube.com/vi/${sermon.id}/hqdefault.jpg`
                        }
                        alt={sermon.title}
                        className='w-full h-full object-cover cursor-pointer bg-gray-200'
                        onClick={() => handleVideoPlay(sermon.id)}
                        onError={(e) => {
                          console.log("Thumbnail failed for:", sermon.id);
                          if (e.target.src.includes("hqdefault")) {
                            e.target.src = `https://img.youtube.com/vi/${sermon.id}/mqdefault.jpg`;
                          } else if (e.target.src.includes("mqdefault")) {
                            e.target.src = `https://img.youtube.com/vi/${sermon.id}/default.jpg`;
                          } else {
                            e.target.style.backgroundColor = "#f3f4f6";
                            e.target.style.color = "#9ca3af";
                            e.target.style.fontSize = "48px";
                            e.target.style.display = "flex";
                            e.target.style.alignItems = "center";
                            e.target.style.justifyContent = "center";
                            e.target.textContent = "📹";
                          }
                        }}
                      />
                      <div
                        className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center cursor-pointer'
                        onClick={() => handleVideoPlay(sermon.id)}
                      >
                        <Play className='w-16 h-16 text-white opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 drop-shadow-lg' />
                      </div>
                      {sermon.durationMinutes > 0 && (
                        <div className='absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded'>
                          {sermon.durationMinutes}m
                        </div>
                      )}
                    </>
                  )}
                </div>

                <div className='p-6'>
                  <h3 className='text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors duration-200'>
                    {sermon.title}
                  </h3>

                  {sermon.scripture && (
                    <p className='text-blue-600 font-medium mb-2'>
                      {sermon.scripture}
                    </p>
                  )}

                  <p className='text-gray-600 text-sm mb-4 line-clamp-2'>
                    {sermon.description?.substring(0, 120)}...
                  </p>

                  <div className='flex items-center justify-between text-sm text-gray-500 mb-3'>
                    <span className='font-medium'>{sermon.preacher}</span>
                    <span>
                      {new Date(sermon.publishedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className='flex items-center justify-between text-xs text-gray-400 mb-4'>
                    <div className='flex items-center space-x-4'>
                      <span className='flex items-center'>
                        <Eye className='w-3 h-3 mr-1' />
                        {sermon.formattedViews}
                      </span>
                      <span className='flex items-center'>
                        <ThumbsUp className='w-3 h-3 mr-1' />
                        {sermon.formattedLikes}
                      </span>
                    </div>
                    <span className='flex items-center'>
                      <Calendar className='w-3 h-3 mr-1' />
                      {new Date(sermon.publishedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className='flex items-center justify-between'>
                    <span className='inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium'>
                      {sermon.topic}
                    </span>
                    <div className='flex gap-2'>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() => handleVideoPlay(sermon.id)}
                      >
                        <Play className='w-4 h-4' />
                      </Button>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() =>
                          window.open(
                            `https://youtube.com/watch?v=${sermon.id}`,
                            "_blank"
                          )
                        }
                      >
                        <Youtube className='w-4 h-4' />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SermonsSection;
