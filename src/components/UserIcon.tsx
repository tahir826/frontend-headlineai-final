import { useState, useEffect } from 'react';
import UserModal from './UserModal';

interface User {
  name: string;
  email: string;
}

const UserIcon: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null); // Set initial user state to null

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Fetch user data from localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem('token'); // Optional: Validate token if needed
    if (token) {
      // Simulating fetching user information
      const userData: User = {
        name: 'Me', // Fallback to hardcoded name
        email: localStorage.getItem('email') || "Please Login To Continoun", // Fallback to hardcoded email
      };
      setUser(userData);
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>; // Show a loading state or fallback UI while fetching user data
  }

  return (
    <div>
      {/* User Icon */}
      <div className="cursor-pointer flex items-center space-x-2" onClick={openModal}>
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
          {user.name[0]} {/* Display the first letter of the user's name */}
        </div>
        <span className="hidden sm:block">{user.name}</span>
      </div>

      {/* User Info Modal */}
      <UserModal isOpen={isModalOpen} closeModal={closeModal} user={user} />
    </div>
  );
};

export default UserIcon;
