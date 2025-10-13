import React from "react";
import { X, Download, BookOpen, ExternalLink } from "lucide-react";

const HeidelbergModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleDownloadPDF = () => {
    window.open("https://www.heidelberg-catechism.com/pdf/lords-days/Heidelberg-Catechism.pdf", "_blank", "noopener,noreferrer");
    onClose();
  };

  const handleOpenWebsite = () => {
    window.open("https://www.heidelberg-catechism.com", "_blank", "noopener,noreferrer");
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
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6">
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

        {/* Content */}
        <div className="p-8 md:p-12">
          <div className="text-center mb-8">
            <BookOpen className="w-20 h-20 text-purple-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              View the Complete Catechism
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              The Heidelberg Catechism (1563) is one of the most influential Reformed catechisms,
              organized into 52 Lord's Days for study throughout the year. It beautifully
              presents Christian doctrine through the themes of guilt, grace, and gratitude.
            </p>
            <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6 mb-6">
              <h4 className="font-bold text-gray-900 mb-3">Structure:</h4>
              <ul className="text-left text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>52 Lord's Days (129 questions and answers)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>Part 1: Guilt - Human misery and sin</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>Part 2: Grace - Redemption through Christ</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>Part 3: Gratitude - Living in thankfulness</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleDownloadPDF}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <Download className="w-5 h-5" />
              <span>Download PDF (52 Lord's Days)</span>
            </button>

            <button
              onClick={handleOpenWebsite}
              className="w-full bg-white border-2 border-purple-600 text-purple-700 hover:bg-purple-50 font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <ExternalLink className="w-5 h-5" />
              <span>Browse Online at heidelberg-catechism.com</span>
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-4">
            Opens in a new tab for the best reading experience
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeidelbergModal;