import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function AskNewLifeButton() {
  const GEM_URL = 'https://gemini.google.com/gem/13Whz0Mp4C6Ai5pOsGx7wxFl_PwjFcrS-?usp=sharing';

  const handleClick = () => {
    // Open the Gemini Gem in a new tab
    window.open(GEM_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 z-50 group"
      aria-label="Ask New Life"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        Ask New Life
      </span>
    </button>
  );
}
