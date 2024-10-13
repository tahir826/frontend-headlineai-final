// components/ChatApp.tsx
import { useState } from 'react';
import ChatInput from './ChatInput';
import MessageList from './MessageList';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = (message: string) => {
    // Add user's message to the messages list
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, sender: 'user' },
    ]);

    // Simulate AI response (you can replace this with an actual API call)
    setTimeout(() => {
      const aiResponse = "This is an AI response to: " + message;
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: aiResponse, sender: 'bot' },
      ]);
    }, 1000); // 1 second delay to simulate a response
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Message List */}
      <MessageList messages={messages} />

      {/* Chat Input */}
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatApp;
