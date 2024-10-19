import React from 'react';
import styles from './ChatHistory.module.css';

interface ChatHistoryProps {
  history: { id: number; name: string; messages: Array<{ user: string; bot: string }> }[];
  onChatSelect: (id: number) => void; // Prop to handle chat selection
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ history, onChatSelect }) => {
  return (
    <div className={styles.chatHistory}>
      <h2>Chat History</h2>
      {history.map((chat) => (
        <div
          key={chat.id}
          onClick={() => onChatSelect(chat.id)} // Handle chat selection
          className="cursor-pointer p-2 hover:bg-gray-200"
        >
          {chat.name}
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;
