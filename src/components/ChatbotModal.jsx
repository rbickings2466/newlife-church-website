import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Loader2, AlertCircle } from 'lucide-react';
import { sendMessageToGemini } from '../utils/geminiApi';
import { rateLimiter } from '../utils/rateLimiter';

export default function ChatbotModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Hello! I\'m here to help answer questions about New Life Bible Fellowship Church. How can I assist you today?',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rateLimitError, setRateLimitError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    // Check rate limit
    if (!rateLimiter.canSendMessage()) {
      const minutesRemaining = rateLimiter.getTimeUntilReset();
      setRateLimitError(`You've reached the message limit. Please try again in ${minutesRemaining} minute${minutesRemaining !== 1 ? 's' : ''}.`);
      return;
    }

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setRateLimitError(null);

    // Add user message to chat
    const newMessages = [...messages, { role: 'user', text: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Record message for rate limiting
      rateLimiter.recordMessage();

      // Get conversation history (reduced from 10 to 4 messages to save tokens)
      const conversationHistory = newMessages.slice(-4);

      // Send to Gemini API
      const reply = await sendMessageToGemini(userMessage, conversationHistory);

      // Add assistant response
      setMessages([...newMessages, { role: 'assistant', text: reply }]);
    } catch (error) {
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          text: 'I apologize, but I\'m having trouble connecting right now. Please try again or contact the church office at (302)945-8145.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl h-[600px] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-blue-600 text-white rounded-t-lg">
          <div>
            <h2 className="text-xl font-semibold">Ask New Life</h2>
            <p className="text-sm text-blue-100">Your questions about our church answered</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-blue-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-3">
                <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t p-4">
          {rateLimitError && (
            <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-800">{rateLimitError}</p>
            </div>
          )}
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask a question about New Life BFC..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-2 text-center">
            {rateLimiter.getRemainingMessages()} questions remaining this hour
          </p>
        </div>
      </div>
    </div>
  );
}
