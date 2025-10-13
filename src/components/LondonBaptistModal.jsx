import React from "react";
import { X, ExternalLink, BookOpen } from "lucide-react";

const LondonBaptistModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleOpenExternal = () => {
    window.open("https://www.the1689confession.com", "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-amber-800 text-white p-6">
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

        {/* Content */}
        <div className="p-8 md:p-12">
          <div className="text-center mb-8">
            <BookOpen className="w-20 h-20 text-amber-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              View the Complete Confession
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              The London Baptist Confession of Faith (1689) is a Reformed Baptist statement
              that articulates the doctrinal beliefs of particular Baptist churches. It closely
              parallels the Westminster Confession while maintaining Baptist distinctives on
              church polity and the ordinances.
            </p>
            <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6 mb-6">
              <h4 className="font-bold text-gray-900 mb-3">Key Features:</h4>
              <ul className="text-left text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>32 chapters covering core theological topics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Reformed theology with Baptist distinctives</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Believer's baptism by immersion</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Congregational church government</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleOpenExternal}
            className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <ExternalLink className="w-5 h-5" />
            <span>Read Full Confession at the1689confession.com</span>
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Opens in a new tab for the best reading experience
          </p>
        </div>
      </div>
    </div>
  );
};

export default LondonBaptistModal;