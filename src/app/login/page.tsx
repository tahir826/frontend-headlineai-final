"use client";
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import the Next.js router

// Utility to check token expiration (can be stored in a utility file)
function isTokenExpired(token: string) {
  const tokenPayload = JSON.parse(atob(token.split('.')[1]));
  const expiryTime = tokenPayload.exp * 1000; // Convert to milliseconds
  return Date.now() > expiryTime;
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // State for success popup
  const router = useRouter(); // Use Next.js router to redirect

  // Check if the user is already logged in by checking email and access token
  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    const accessToken = localStorage.getItem('access_token');

    if (storedEmail && accessToken && !isTokenExpired(accessToken)) {
      // User is logged in, redirect to the chat page
      router.push('/chat');
    }
  }, [router]); // Run this on component mount

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);

      const response = await fetch("https://headlineai.graycoast-7c0c32b7.eastus.azurecontainerapps.io/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('username', 'Me'); // Set the actual username
        localStorage.setItem('email', email); // Save the email

        // Set success message
        setSuccessMessage('Login successful! Redirecting...');
        setTimeout(() => {
          setSuccessMessage(null); // Hide the message after 3 seconds
          window.location.href = '/chat'; // Redirect after success
        }, 2000);
      } else {
        const data = await response.json();
        setError(data.detail);
      }
    } catch (error) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">Sign in to your account</h2>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                  loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-black'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black`}
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3V4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                    ></path>
                  </svg>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>

          {/* Success message popup */}
          {successMessage && (
            <div className="mt-4 p-2 bg-green-200 text-green-800 rounded text-center">
              {successMessage}
            </div>
          )}

          <div className="text-center mt-6">
            <div className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link href="/signup">
                <p className="font-medium text-xl text-black hover:text-gray-700">Sign up</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
