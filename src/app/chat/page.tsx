// src/app/chat/page.tsx
"use client";
import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ChatInterface from '@/components/ChatInterface';


// Define the user type
interface User {
  name: string;
  email: string;
}

const ChatPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch user data from local storage
    const token = localStorage.getItem('access_token');
    const email = localStorage.getItem('email');
    
    // If user data is not found, redirect to login page
    if (!token && !email) {
      router.push('/login'); // Use Next.js router to redirect to login
    } else {
      // Set user state if data is found
      setUser({ name: "Me", email : "email"});
    }
  }, [router]); // Added router as a dependency

  return (
    <main>
      <Header /> {/* Pass user data to Header */}
      <ChatInterface />
      
    </main>
  );
};

export default ChatPage;
