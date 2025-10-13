import React from "react";
import { X, ExternalLink } from "lucide-react";

const LondonBaptistModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full h-[90vh] overflow-hidden animate-scale-up flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-amber-800 text-white p-6 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                The London Baptist Confession of Faith
              </h2>
              <p className="text-amber-100 text-sm md:text-base">
                1689 - A Reformed Baptist Statement of Faith
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors flex-shrink-0"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content - Embedded Website */}
        <div className="flex-grow overflow-hidden bg-gray-50 relative">
          <iframe
            src="https://www.the1689confession.com"
            className="w-full h-full border-0"
            title="London Baptist Confession of Faith 1689"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />

          {/* Loading overlay */}
          <div className="absolute inset-0 bg-white flex items-center justify-center pointer-events-none animate-fade-out">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading confession...</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-amber-50 border-t-2 border-amber-200 p-4 flex-shrink-0">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <p className="text-sm text-gray-700">
              Reformed Baptist distinctive on church polity and ordinances
            </p>
            <a
              href="https://www.the1689confession.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-900 font-semibold text-sm transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Open in new tab
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LondonBaptistModal;