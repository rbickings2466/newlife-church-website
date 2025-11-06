import React, { useState } from "react";
import { ExternalLink, Maximize2, Minimize2 } from "lucide-react";

const FaithlifeSection = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const faithlifeUrl = "https://signage.faithlife.com/new-life-bible-fellowship-church-presentation-6/signs/website";

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What's Happening at New Life
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay connected with our church community through live updates, announcements, and upcoming events
            </p>
          </div>

          {/* Iframe Container */}
          <div className="max-w-7xl mx-auto">
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
              {/* Control Bar */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  <span className="text-white font-semibold text-lg">Live Church Updates</span>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={toggleFullscreen}
                    className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors duration-200"
                    aria-label="Toggle fullscreen"
                  >
                    <Maximize2 className="w-5 h-5" />
                  </button>
                  <a
                    href={faithlifeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                    aria-label="Open in new window"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span className="text-sm font-medium hidden sm:inline">Open</span>
                  </a>
                </div>
              </div>

              {/* Iframe */}
              <div className="relative w-full bg-gray-900" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  src={faithlifeUrl}
                  className="absolute top-0 left-0 w-full h-full"
                  title="New Life Church Updates"
                  loading="lazy"
                  allow="fullscreen"
                  style={{ border: "none" }}
                ></iframe>
              </div>

              {/* Bottom Info Bar */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
                  <p className="text-sm text-gray-600">
                    Powered by <span className="font-semibold text-blue-600">Faithlife</span> • Updated in real-time
                  </p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Connected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex flex-col">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              <span className="text-white font-semibold text-lg">Live Church Updates</span>
            </div>
            <button
              onClick={toggleFullscreen}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors duration-200"
              aria-label="Exit fullscreen"
            >
              <Minimize2 className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 relative">
            <iframe
              src={faithlifeUrl}
              className="w-full h-full"
              title="New Life Church Updates - Fullscreen"
              allow="fullscreen"
              style={{ border: "none" }}
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default FaithlifeSection;
