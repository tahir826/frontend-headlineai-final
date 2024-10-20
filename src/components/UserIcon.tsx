import { useState, useEffect } from 'react';
import UserModal from './UserModal';

interface User {
  name: string;
  email: string;
}

const UserIcon: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Loading state

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Ensure this key is correct
    if (token) {
      // Simulating fetching user information
      const userData: User = {
        name: 'Me', // Fallback to hardcoded name
        email: localStorage.getItem('email') || "Loading", // Fallback to hardcoded email
      };
      setUser(userData);
    }
    setLoading(false); // Update loading state
  }, []);

  if (loading) {
    return <div className="spinner">Loading...</div>; // Add a spinner or loading indicator
  }

  if (!user) {
    return <div>Please log in to continue.</div>; // Show a message if user data is not available
  }

  return (
    <div>
      <div className="cursor-pointer flex items-center space-x-2" onClick={openModal}>
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
          {user.name[0]}
        </div>
        <span className="hidden sm:block">{user.name}</span>
      </div>

      <UserModal isOpen={isModalOpen} closeModal={closeModal} user={user} />
    </div>
  );
};

export default UserIcon;
