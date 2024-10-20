"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import logo from "@/public/mainLogo.png";
import UserIcon from "@/components/UserIcon";

// Import token utilities
import { isTokenExpired, refreshAccessToken } from "@/utils/tokenUtils";

function LandingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Auto-scroll function for smooth navigation
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const email = localStorage.getItem("email");
    const accessToken = localStorage.getItem("access_token");

    if (!email || !accessToken) {
      console.log("User is not logged in or missing access token.");
      return;
    }

    // Check if the access token is expired
    if (isTokenExpired(accessToken)) {
      console.log("Access token expired, attempting to refresh...");
      refreshAccessToken()
        .then((newToken) => {
          if (newToken) {
            setIsLoggedIn(true); // Set user as logged in after token refresh
          }
        })
        .catch(() => {
          console.log("Token refresh failed, logging out.");
          localStorage.removeItem("email");
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          setIsLoggedIn(false);
        });
    } else {
      setIsLoggedIn(true); // Set user as logged in if access token is valid
    }
  }, []);

  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
    <main className="bg-black min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 w-full flex justify-between items-center px-6 py-4 bg-black z-10">
        <Image src={logo} alt="logo" className="h-auto w-40" />
        <div className="hidden md:flex gap-8">
          <button
            onClick={() => scrollToSection("home")}
            className="text-white text-xl hover:text-blue-600 transition duration-300"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="text-white text-xl hover:text-blue-600 transition duration-300"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("features")}
            className="text-white text-xl hover:text-blue-600 transition duration-300"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection("blog")}
            className="text-white text-xl hover:text-blue-600 transition duration-300"
          >
            Blog
          </button>
        </div>
        <div>
          {isLoggedIn ? (
            <UserIcon />
          ) : (
            <button
              onClick={handleLoginClick}
              className="text-white bg-blue-600 border border-blue-700 py-2 px-5 rounded-md hover:bg-white hover:text-black transition duration-300"
            >
              Login
            </button>
          )}
        </div>
      </nav>

{/* Home Section */}
<section
  id="home"
  className="min-h-screen flex flex-col justify-center items-center bg-black text-center px-4"
>
  <div className="flex flex-col items-center">
    <p className="text-5xl sm:text-6xl md:text-8xl bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent font-bold leading-tight">
      HeadlineAI
    </p>
    <p className="text-white text-xl sm:text-2xl md:text-3xl mt-2">
      <span className="text-blue-600">AI-Powered</span> News Application
    </p>
  </div>

  <div className="mt-6">
    <p className="text-white text-lg sm:text-2xl md:text-5xl leading-relaxed mt-10">
      Explore The<br/>Potential of <span className="text-blue-600">Agentic AI</span><br/>in news
    </p>
  </div>

  <div className="flex justify-center mt-20">
    {isLoggedIn ? (
      <Link href="/chat">
        <button className="bg-blue-600 px-6 sm:px-8 py-3 rounded-lg text-white text-lg sm:text-xl hover:bg-white hover:text-black transition duration-300">
          Let’s Chat
        </button>
      </Link>
    ) : (
      <Link href="/signup">
        <button className="bg-blue-600 px-6 sm:px-8 py-3 rounded-lg text-white text-lg sm:text-xl hover:bg-white hover:text-black transition duration-300">
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
        <p className="mt-4 text-xl max-w-2xl mx-auto">
          HeadlineAI is a cutting-edge AI-powered news platform that helps users stay informed with the latest news.
          Powered by advanced AI, our system curates and delivers personalized news updates based on your interests.
        </p>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="min-h-screen flex flex-col justify-center items-center bg-black text-center text-white"
      >
        <h2 className="text-4xl font-bold">Features</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold">AI News Curation</h3>
            <p className="mt-4">
              Our AI-driven algorithm selects the most relevant news articles based on your preferences and reading
              history.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold">Chat-Based Interface</h3>
            <p className="mt-4">
              Communicate with an AI agent to get news updates, ask questions, and have real-time conversations about
              current events.
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
      <section
        id="blog"
        className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-center text-white"
      >
        <h2 className="text-4xl font-bold">Our Blog</h2>
        <p className="mt-4 text-xl max-w-2xl mx-auto">
          Stay up-to-date with the latest insights and articles from industry experts. Learn more about AI trends,
          journalism, and the future of news.
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
