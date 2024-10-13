import { useState } from 'react';
import UserModal from './UserModal';


interface User {
  name: string;
  email: string;
}

const UserIcon: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const user: User = {
    name: 'Tahir',
    email: 'tahirhassan@gmail.com'
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      {/* User Icon */}
      <div className="cursor-pointer flex items-center space-x-2" onClick={openModal}>
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
          {user.name[0]}
        </div>
        <span className="hidden sm:block">{user.name}</span>
      </div>

      {/* User Info Modal */}
      <UserModal isOpen={isModalOpen} closeModal={closeModal} user={user} />
    </div>
  );
};

export default UserIcon;
