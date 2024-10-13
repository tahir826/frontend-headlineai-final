import React, { useEffect, useRef, useState } from 'react';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messageContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (messageContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = messageContainerRef.current;
        setShowScrollButton(scrollTop + clientHeight < scrollHeight);
      }
    };

    const messageContainer = messageContainerRef.current;
    if (messageContainer) {
      messageContainer.addEventListener('scroll', handleScroll);
      return () => messageContainer.removeEventListener('scroll', handleScroll);
    }
  }, [messages]);

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
      setShowScrollButton(false);
    }
  };

  return (
    <div className="flex-1 bg-white overflow-y-auto flex justify-center p-4" ref={messageContainerRef}>
      <div className="w-full max-w-2xl mb-16">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-4 my-3 rounded-lg transition-all duration-200 ${
              message.sender === 'user'
                ? 'bg-black text-white self-end ml-auto'
                : 'bg-gray-200 text-black self-start mr-auto'
            }`}
            style={{
              alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '90%',
              width: 'fit-content',
            }}
          >
            {message.text}
          </div>
        ))}
      </div>
      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="fixed bottom-20 right-4 bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 transition-colors"
          aria-label="Scroll to bottom"
        >
          {/* Simple down arrow SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6" // Adjust size here if needed
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default MessageList;
