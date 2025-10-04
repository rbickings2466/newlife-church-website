import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import ChatbotModal from './ChatbotModal';

export default function AskNewLifeButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 z-50 group"
        aria-label="Ask New Life"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Ask New Life
        </span>
      </button>

      <ChatbotModal isOpen={isModalOpen} onClose={handleClose} />
    </>
  );
}
