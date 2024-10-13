import styles from './ChatHistory.module.css';

interface ChatHistoryProps {
  // Add any props needed for the chat history
}

const ChatHistory: React.FC<ChatHistoryProps> = () => {
  return (
    <div className={styles.chatHistory}>
      <h2>Chat History</h2>
      {/* Add chat history functionality here */}
    </div>
  );
};

export default ChatHistory;