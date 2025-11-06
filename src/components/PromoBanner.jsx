import React from "react";
import { X } from "lucide-react";
import usePromoBanner from "../hooks/usePromoBanner";

/**
 * PromoBanner - Displays promotional videos for events, sermon series, etc.
 *
 * Now powered by Firebase - manage videos through the admin panel!
 * Supports YouTube and Google Drive/Vids videos with optional title, description, and call-to-action.
 */
const PromoBanner = () => {
  const { promoBanner, loading, error } = usePromoBanner();

  // Initialize visibility state - check localStorage on mount to avoid hydration mismatch
  const [isVisible, setIsVisible] = React.useState(() => {
    if (typeof window === 'undefined') return true;
    return true; // Default to visible, will check dismissal in useEffect
  });

  // Extract video embed URL from various platforms (YouTube, Google Drive/Vids)
  const getVideoEmbedUrl = (url) => {
    if (!url || typeof url !== 'string') return '';

    try {
      // Google Drive/Docs/Vids URLs
      if (url.includes('docs.google.com') || url.includes('drive.google.com')) {
        // Extract the file ID from various Google formats
        let fileId = '';

        // Format: https://docs.google.com/videos/d/{ID}/edit
        if (url.includes('/videos/d/')) {
          fileId = url.split('/videos/d/')[1].split('/')[0];
        }
        // Format: https://drive.google.com/file/d/{ID}/view
        else if (url.includes('/file/d/')) {
          fileId = url.split('/file/d/')[1].split('/')[0];
        }
        // Format: https://docs.google.com/document/d/{ID}/
        else if (url.includes('/document/d/')) {
          fileId = url.split('/document/d/')[1].split('/')[0];
        }
        // Format: https://drive.google.com/open?id={ID}
        else if (url.includes('id=')) {
          fileId = url.split('id=')[1].split('&')[0];
        }

        if (fileId) {
          // Remove any query parameters
          fileId = fileId.split('?')[0];
          return `https://drive.google.com/file/d/${fileId}/preview`;
        }
      }

      // YouTube URLs
      let videoId = '';
      if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split('?')[0];
      } else if (url.includes('youtube.com/watch')) {
        videoId = url.split('v=')[1]?.split('&')[0];
      } else if (url.includes('youtube.com/embed/')) {
        videoId = url.split('embed/')[1].split('?')[0];
      }

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    } catch (err) {
      console.error('Error parsing video URL:', err);
      return '';
    }

    return '';
  };

  // Don't render if loading, error, no banner, or user dismissed
  if (loading || error || !promoBanner || !isVisible) {
    return null;
  }

  const config = promoBanner;

  // Validate required fields
  if (!config.videoUrl) {
    console.error('Promo banner missing videoUrl');
    return null;
  }

  const embedUrl = getVideoEmbedUrl(config.videoUrl);
  if (!embedUrl) {
    console.error('Invalid video URL (must be YouTube or Google Drive/Vids):', config.videoUrl);
    return null;
  }

  const handleClose = () => {
    setIsVisible(false);
    // Optional: Store dismissal in localStorage to remember across sessions
    if (config.rememberDismissal) {
      localStorage.setItem(`promo_dismissed_${config.id}`, 'true');
    }
  };

  // Check if user previously dismissed this promo
  React.useEffect(() => {
    if (!promoBanner) return;

    if (promoBanner.rememberDismissal && promoBanner.id) {
      const wasDismissed = localStorage.getItem(`promo_dismissed_${promoBanner.id}`);
      if (wasDismissed === 'true') {
        setIsVisible(false);
      }
    }
  }, [promoBanner]);

  const backgroundColor = config?.backgroundColor || 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50';
  const isDismissible = config?.dismissible !== false;

  return (
    <section className={`relative py-12 ${backgroundColor}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Close button - always render but hide if not dismissible */}
        <button
          onClick={handleClose}
          className={`absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200 ${
            !isDismissible ? 'hidden' : ''
          }`}
          aria-label="Close banner"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

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
                src={embedUrl}
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

              {config.ctaButton && config.ctaButton.link && (
                <a
                  href={config.ctaButton.link}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  {config.ctaButton.text || "Learn More"}
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
