import React from "react";
import { X, ExternalLink, Download } from "lucide-react";

const HeidelbergModal = ({ isOpen, onClose }) => {
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
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                The Heidelberg Catechism
              </h2>
              <p className="text-purple-100 text-sm md:text-base">
                A Pastoral Guide to Christian Doctrine and Life
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

        {/* Content - Embedded PDF */}
        <div className="flex-grow overflow-hidden bg-gray-50 relative">
          <iframe
            src="https://www.heidelberg-catechism.com/pdf/lords-days/Heidelberg-Catechism.pdf"
            className="w-full h-full border-0"
            title="The Heidelberg Catechism PDF"
            type="application/pdf"
          />

          {/* Loading overlay */}
          <div className="absolute inset-0 bg-white flex items-center justify-center pointer-events-none animate-fade-out">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading catechism...</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-purple-50 border-t-2 border-purple-200 p-4 flex-shrink-0">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <p className="text-sm text-gray-700">
              A pastoral guide to Christian doctrine and life (52 Lord's Days)
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.heidelberg-catechism.com/pdf/lords-days/Heidelberg-Catechism.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-purple-700 hover:text-purple-900 font-semibold text-sm transition-colors"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </a>
              <a
                href="https://www.heidelberg-catechism.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-purple-700 hover:text-purple-900 font-semibold text-sm transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Open website
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeidelbergModal;