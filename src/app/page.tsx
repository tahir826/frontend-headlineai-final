"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import logo from "@/public/mainLogo.png";
import UserIcon from "@/components/UserIcon";
import { isTokenExpired, refreshAccessToken } from "@/utils/tokenUtils";

function LandingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const email = localStorage.getItem("email");
    const accessToken = localStorage.getItem("access_token");

    if (!email || !accessToken) return;

    if (isTokenExpired(accessToken)) {
      refreshAccessToken()
        .then((newToken) => newToken && setIsLoggedIn(true))
        .catch(() => {
          localStorage.clear();
          setIsLoggedIn(false);
        });
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
    <main className="bg-black min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 w-full flex justify-between items-center px-6 py-4 z-10 backdrop-blur-sm bg-opacity-30 text-white">
        <Image src={logo} alt="logo" className="h-auto w-56" />
        <div className="hidden md:flex gap-8">
          <button onClick={() => scrollToSection("home")} className="text-pink-400 font-bold text-2xl hover:text-blue-600 transition duration-300">Home</button>
          <button onClick={() => scrollToSection("about")} className="text-pink-400 font-bold text-2xl hover:text-blue-600 transition duration-300">About</button>
          <button onClick={() => scrollToSection("features")} className="text-pink-400 font-bold text-2xl hover:text-blue-600 transition duration-300">Features</button>
          <button onClick={() => scrollToSection("blog")} className="text-pink-400 font-bold text-2xl hover:text-blue-600 transition duration-300">Blog</button>
        </div>
        <div>
          {isLoggedIn ? <UserIcon /> : (
            <button onClick={handleLoginClick} className="text-white bg-blue-600 border border-blue-700 py-2 px-5 rounded-md hover:bg-white hover:text-black transition duration-300">Login</button>
          )}
        </div>
      </nav>

      {/* Home Section */}
      <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden bg-gradient-to-bl from-purple-900 via-black to-blue-900">
        {/* Background Animation */}
        <style jsx>{`
          @keyframes nebulaBackground {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          .bg-animated {
            background: linear-gradient(270deg, #212b52, #563774, #283c71, #52356b);
            background-size: 400% 400%;
            animation: nebulaBackground 20s ease infinite;
          }
          .particle {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.7);
            opacity: 0.8;
            animation: floatParticle 8s ease infinite;
          }
          @keyframes floatParticle {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
        `}</style>
        <div className="bg-animated absolute inset-0 -z-10" />

        {/* Particles */}
        {[...Array(200)].map((_, i) => (
          <span key={i} className="particle" style={{
            width: `${Math.random() * 8 + 3}px`,
            height: `${Math.random() * 8 + 3}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${4 + Math.random() * 6}s`,
          }} />
        ))}

        {/* Content */}
        <div className="flex flex-col items-center">
          <p className="text-6xl sm:text-7xl md:text-9xl mt-10 bg-gradient-to-r from-pink-600 to-purple-400 bg-clip-text text-transparent font-bold leading-tight">
            HeadlineAI
          </p>
          <p className="text-white text-2xl sm:text-3xl md:text-4xl mt-4">
            <span className="text-purple-400">AI-Powered</span> News Application
          </p>
        </div>

        <div className="mt-8">
          <p className="text-white text-3xl sm:text-5xl md:text-6xl leading-relaxed">
            Explore The<br/>Potential of <span className="text-blue-500">Agentic AI</span><br/>in News
          </p>
        </div>

        <div className="flex justify-center mt-12">
          {isLoggedIn ? (
            <Link href="/chat">
              <button className="bg-purple-500 px-6 sm:px-8 py-3 rounded-lg text-white text-lg sm:text-xl hover:bg-white hover:text-purple-500 transition duration-300">
                Let’s Chat
              </button>
            </Link>
          ) : (
            <Link href="/signup">
              <button className="bg-purple-500 px-6 sm:px-8 py-3 rounded-lg text-white text-lg sm:text-xl hover:bg-white hover:text-purple-500 transition duration-300">
                Get Started
              </button>
            </Link>
          )}
        </div>
      </section>
      {/* About Section */}
      <section
        id="about"
        className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-center text-white"
      >
        <h2 className="text-4xl font-bold">About HeadlineAI</h2>
        <p className="mt-4 text-xl max-w-2xl mx-auto mr-10 ml-10">
          HeadlineAI is a cutting-edge AI-powered news platform that helps users stay informed with the latest news.
          Powered by advanced AI, our system curates and delivers personalized news updates based on your interests.
        </p>
      </section>

      {/* Features Section */}
      <section id="features" className="min-h-screen flex flex-col justify-center items-center bg-black text-center text-white">
        <h2 className="text-4xl font-bold">Features</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold">AI News Curation</h3>
            <p className="mt-4">
              Our AI-driven algorithm selects the most relevant news articles based on your preferences and reading history.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold">Chat-Based Interface</h3>
            <p className="mt-4">
              Communicate with an AI agent to get news updates, ask questions, and have real-time conversations about current events.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold">Personalized Alerts</h3>
            <p className="mt-4">
              Get real-time notifications about breaking news and topics you care about, directly to your device.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-center text-white">
        <h2 className="text-4xl font-bold">Our Blog</h2>
        <p className="mt-4 text-xl max-w-2xl mx-auto mr-10 ml-10">
          Stay up-to-date with the latest insights and articles from industry experts. Learn more about AI trends, journalism, and the future of news.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-black py-6 text-center text-white">
        <p>© 2024 HeadlineAI. All rights reserved.</p>
      </footer>
    </main>
  );
}

export default LandingPage;
