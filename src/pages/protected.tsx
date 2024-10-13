// pages/protected.tsx
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import api from '../utils/api';
import { User } from '../types';
import { useRouter } from 'next/router';
import { withAuth } from '@/components/withAuth';
const ProtectedPage = () => {
  const { user, logout } = useContext(AuthContext);
  const [data, setData] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const response = await api.get<{ msg: string; user: User }>('/protected-route');
        setData(response.data.msg);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [user, router]);

  if (!user) {
    return <p>Redirecting to login...</p>;
  }

  return (
    <div>
      <h1>Protected Page</h1>
      <p>{data}</p>
      <p>Welcome, {user.username}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default withAuth(ProtectedPage);
