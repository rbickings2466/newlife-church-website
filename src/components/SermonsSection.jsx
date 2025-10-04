import React, { useState, useMemo } from "react";
import { useYouTubeVideos } from "../hooks/useYouTube";
import { Play, Calendar, User, ChevronDown } from "lucide-react";
import Button from "./Button";

const SermonsSection = () => {
  const { videos, playlists, loading, error, refetch, fetchVideosByPlaylist } =
    useYouTubeVideos();
  const [selectedPreacher, setSelectedPreacher] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [playingVideoId, setPlayingVideoId] = useState(null);

  const handleTopicChange = (e) => {
    const topicTitle = e.target.value;
    setSelectedTopic(topicTitle);
    setSelectedPreacher(""); // Reset preacher filter when topic changes

    if (topicTitle) {
      const playlist = playlists.find((p) => p.snippet.title === topicTitle);
      if (playlist) {
        fetchVideosByPlaylist(playlist.id);
      }
    } else {
      refetch(); // Fetch all videos
    }
  };

  const handleVideoClick = (videoId) => {
    setPlayingVideoId(videoId === playingVideoId ? null : videoId);
  };

  // Extract preachers from videos for filter dropdown
  const preachers = useMemo(() => {
    if (!videos || videos.length === 0) return [];

    const preacherSet = new Set();
    videos.forEach((video) => {
      const title = video.snippet?.title || "";
      const description = video.snippet?.description || "";

      // Simple regex patterns for extracting preacher names
      const patterns = [
        /(?:Pastor|Rev\.?|Dr\.?)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/i,
        /by\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/i,
        /^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s*[-:]/,
      ];

      const textToSearch = `${title} ${description}`;
      for (const pattern of patterns) {
        const match = textToSearch.match(pattern);
        if (match && match[1]) {
          const name = match[1].trim();
          if (
            !["New Life", "Church", "Sunday", "Service"].some((exclude) =>
              name.includes(exclude)
            )
          ) {
            preacherSet.add(name);
            break;
          }
        }
      }
    });

    return Array.from(preacherSet).sort();
  }, [videos]);

  // Topics are derived directly from playlists
  const topics = useMemo(() => {
    if (!playlists || playlists.length === 0) return [];
    return playlists
      .map((playlist) => playlist.snippet?.title)
      .filter(Boolean)
      .sort();
  }, [playlists]);

  // Filter videos based on selected preacher
  const filteredVideos = useMemo(() => {
    if (!videos) return [];

    let filtered = [...videos];

    // Preacher filter is applied to the current set of videos (either all or from a playlist)
    if (selectedPreacher) {
      filtered = filtered.filter((video) => {
        const title = video.snippet?.title || "";
        const description = video.snippet?.description || "";
        return `${title} ${description}`
          .toLowerCase()
          .includes(selectedPreacher.toLowerCase());
      });
    }

    return filtered;
  }, [videos, selectedPreacher]);

  if (loading) {
    return (
      <section className='py-20 bg-gray-50'>
        <div className='container mx-auto px-6'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto'></div>
            <p className='mt-4 text-gray-600'>Loading sermons...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className='py-20 bg-gray-50'>
        <div className='container mx-auto px-6'>
          <div className='text-center'>
            <p className='text-red-600 mb-4'>{error}</p>
            <Button onClick={refetch} className='bg-blue-600 hover:bg-blue-700'>
              Try Again
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id='sermons' className='py-20 bg-gray-50'>
      <div className='container mx-auto px-6'>
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-bold text-gray-900 mb-4'>
            Recent Sermons
          </h2>
          <p className='text-xl text-gray-600'>
            Watch our latest messages and grow in faith
          </p>
        </div>

        {/* Debug info removed for production */}

        {/* Filters */}
        <div className='mb-8 flex flex-wrap gap-4 justify-center'>
          <div className='relative'>
            <select
              value={selectedPreacher}
              onChange={(e) => setSelectedPreacher(e.target.value)}
              className='appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value=''>All Preachers</option>
              {preachers.map((preacher) => (
                <option key={preacher} value={preacher}>
                  {preacher}
                </option>
              ))}
            </select>
            <ChevronDown className='absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none' />
          </div>

          <div className='relative'>
            <select
              value={selectedTopic}
              onChange={handleTopicChange}
              className='appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value=''>All Topics</option>
              {topics.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
            <ChevronDown className='absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none' />
          </div>

          {(selectedPreacher || selectedTopic) && (
            <Button
              onClick={() => {
                setSelectedPreacher("");
                setSelectedTopic("");
                refetch(); // Refetch all videos
              }}
              variant='outline'
              className='text-sm'
            >
              Clear Filters
            </Button>
          )}
        </div>

        {!filteredVideos || filteredVideos.length === 0 ? (
          <div className='text-center py-12'>
            <p className='text-gray-600 mb-4'>
              No sermons found matching your criteria.
            </p>
            <Button onClick={refetch} className='bg-blue-600 hover:bg-blue-700'>
              Refresh
            </Button>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {filteredVideos.slice(0, 9).map((video) => {
              const videoId = video.id?.videoId || video.id;
              const isPlaying = playingVideoId === videoId;

              return (
                <div
                  key={videoId}
                  className='bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow'
                >
                  <div className='relative aspect-video bg-gray-100'>
                    {isPlaying ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                        className='w-full h-full'
                        frameBorder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                        title={video.snippet?.title}
                      ></iframe>
                    ) : (
                      <div
                        className='relative h-full cursor-pointer'
                        onClick={() => handleVideoClick(videoId)}
                      >
                        <img
                          src={
                            video.snippet?.thumbnails?.high?.url ||
                            video.snippet?.thumbnails?.medium?.url ||
                            video.snippet?.thumbnails?.default?.url ||
                            `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                          }
                          alt={video.snippet?.title}
                          className='w-full h-full object-cover'
                          onError={(e) => {
                            e.target.src = `https://img.youtube.com/vi/${videoId}/default.jpg`;
                          }}
                        />
                        <div className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center hover:bg-opacity-30 transition-all'>
                          <div className='bg-red-600 rounded-full p-4 hover:bg-red-700 transition-colors'>
                            <Play
                              className='h-8 w-8 text-white ml-1'
                              fill='currentColor'
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className='p-6'>
                    <h3 className='text-xl font-semibold text-gray-900 mb-2 line-clamp-2'>
                      {video.snippet?.title}
                    </h3>

                    <div className='flex items-center text-sm text-gray-500 mb-2'>
                      <Calendar className='h-4 w-4 mr-1' />
                      <span>
                        {video.snippet?.publishedAt
                          ? new Date(
                              video.snippet.publishedAt
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          : "Date not available"}
                      </span>
                    </div>

                    <div className='flex items-center text-sm text-gray-500 mb-4'>
                      <User className='h-4 w-4 mr-1' />
                      <span>{video.snippet?.channelTitle}</span>
                    </div>

                    <p className='text-gray-600 text-sm line-clamp-3 mb-4'>
                      {video.snippet?.description}
                    </p>

                    <Button
                      onClick={() => handleVideoClick(videoId)}
                      className='w-full bg-blue-600 hover:bg-blue-700'
                    >
                      {isPlaying ? "Close Video" : "Watch Sermon"}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default SermonsSection;
