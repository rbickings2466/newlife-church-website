import React from "react";
import { X } from "lucide-react";
import usePromoBanner from "../hooks/usePromoBanner";

/**
 * PromoBanner - Displays promotional videos for events, sermon series, etc.
 *
 * Now powered by Firebase - manage videos through the admin panel!
 * Supports YouTube videos with optional title, description, and call-to-action.
 */
const PromoBanner = () => {
  const { promoBanner, loading, error } = usePromoBanner();
  const [isVisible, setIsVisible] = React.useState(true);

  // Don't render if loading, error, no banner, or user dismissed
  if (loading || error || !promoBanner || !isVisible) {
    return null;
  }

  const config = promoBanner;

  // Extract YouTube video ID from various URL formats
  const getYouTubeEmbedUrl = (url) => {
    let videoId = '';

    // Handle different YouTube URL formats
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('youtube.com/watch')) {
      videoId = url.split('v=')[1]?.split('&')[0];
    } else if (url.includes('youtube.com/embed/')) {
      videoId = url.split('embed/')[1].split('?')[0];
    }

    return `https://www.youtube.com/embed/${videoId}`;
  };

  const handleClose = () => {
    setIsVisible(false);
    // Optional: Store dismissal in localStorage to remember across sessions
    if (config.rememberDismissal) {
      localStorage.setItem(`promo_dismissed_${config.id}`, 'true');
    }
  };

  // Check if user previously dismissed this promo
  React.useEffect(() => {
    if (config.rememberDismissal && config.id) {
      const wasDismissed = localStorage.getItem(`promo_dismissed_${config.id}`);
      if (wasDismissed === 'true') {
        setIsVisible(false);
      }
    }
  }, [config.id, config.rememberDismissal]);

  return (
    <section className={`relative py-12 ${config.backgroundColor || 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Close button */}
        {config.dismissible !== false && (
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Close banner"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        )}

        <div className="max-w-6xl mx-auto">
          {/* Title */}
          {config.title && (
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                {config.title}
              </h2>
              {config.subtitle && (
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {config.subtitle}
                </p>
              )}
            </div>
          )}

          {/* Video Container */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src={getYouTubeEmbedUrl(config.videoUrl)}
                className="absolute top-0 left-0 w-full h-full"
                title={config.title || "Promotional Video"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ border: "none" }}
              ></iframe>
            </div>
          </div>

          {/* Description & CTA */}
          {(config.description || config.ctaButton) && (
            <div className="mt-8 text-center">
              {config.description && (
                <p className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto">
                  {config.description}
                </p>
              )}

              {config.ctaButton && (
                <button
                  onClick={() => {
                    if (config.ctaButton.onClick) {
                      config.ctaButton.onClick();
                    } else if (config.ctaButton.link) {
                      window.location.href = config.ctaButton.link;
                    }
                  }}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  {config.ctaButton.text || "Learn More"}
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
