import { useState, useEffect, useRef } from 'react';
import UserModal from './UserModal';

interface User {
  name: string;
  email: string;
}

const UserIcon: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const userIconRef = useRef<HTMLDivElement | null>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      const userData: User = {
        name: localStorage.getItem('username') || 'Me',
        email: localStorage.getItem('email') || 'Loading',
      };
      setUser(userData);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="spinner">Loading...</div>;
  }

  if (!user) {
    return <div>Please log in to continue.</div>;
  }

  return (
    <div>
      <div
        ref={userIconRef}
        className="cursor-pointer flex items-center space-x-1 bg-gradient-to-r from-purple-500 to-blue-500 p-1 rounded-full shadow-lg transform transition-all hover:scale-105 mr-4"
        onClick={openModal}
      >
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-blue-500 font-bold text-lg shadow-md">
          {user.name[0].toUpperCase()}
        </div>
        <span className="hidden sm:block text-white font-semibold">{user.name}</span>
      </div>

      <UserModal isOpen={isModalOpen} closeModal={closeModal} user={user} anchorRef={userIconRef} />
    </div>
  );
};

export default UserIcon;
