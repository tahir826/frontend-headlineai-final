import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { AiOutlineClose } from 'react-icons/ai';

interface User {
  name: string;
  email: string;
}

interface UserModalProps {
  isOpen: boolean;
  closeModal: () => void;
  user: User | null;
  anchorRef: React.RefObject<HTMLDivElement>;
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, closeModal, user, anchorRef }) => {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('email');
    localStorage.removeItem('username');
    router.push('/login');
  };

  useEffect(() => {
    if (isOpen && anchorRef.current && modalRef.current) {
      const { bottom } = anchorRef.current.getBoundingClientRect();
      modalRef.current.style.top = `${bottom}px`;
    }
  }, [isOpen, anchorRef]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-start justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="transform transition-all ease-out duration-300"
            enterFrom="translate-y-4 opacity-0"
            enterTo="translate-y-0 opacity-100"
            leave="transform transition-all ease-in duration-200"
            leaveFrom="translate-y-0 opacity-100"
            leaveTo="translate-y-4 opacity-0"
          >
            <Dialog.Panel ref={modalRef} className="w-full max-w-md transform overflow-hidden rounded-lg bg-gray-700 p-6 shadow-lg transition-all relative">
              <button onClick={closeModal} className="absolute top-4 right-4 text-white hover:text-gray-400">
                <AiOutlineClose className="w-5 h-5" />
              </button>

              <Dialog.Title as="h3" className="text-lg font-semibold text-white border-b pb-2">
                User Information
              </Dialog.Title>
              <div className="mt-4 space-y-4">
                <div className="p-4 bg-white rounded-lg shadow-md">
                  <p className="text-xl font-bold text-gray-800">
                    <strong>Name:</strong> <span className="text-gray-600">{user?.name}</span> 
                  </p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-md">
                  <p className="text-xl font-bold text-gray-800 break-words">
                    <strong>Email:</strong> <span className="text-gray-600">{user?.email}</span>
                  </p>
                </div>
              </div>
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  className="rounded-md bg-black px-6 py-3 text-xl font-medium text-white hover:bg-gray-600 transition duration-200"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UserModal;
