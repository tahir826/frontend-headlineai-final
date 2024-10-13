import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logo from '@/public/mainLogo.png'
function page() {
  return (
    <main>
      <div className='bg-black h-full w-auto'>
        <nav className='flex gap-28 justify-between items-center ml-10'>
          <Image src={logo} alt='logo' className='h w-72'></Image>
          <div className='flex gap-8 mr-40'>
            <button className='text-white text-xl hover:text-blue-600'>Home</button>
            <button className='text-white text-xl hover:text-blue-600'>About</button>
            <button className='text-white text-xl hover:text-blue-600'>Features</button>
            <button className='text-white text-xl hover:text-blue-600'>Blog</button>
          </div>
          <div>
            <Link href="/login">
            <button className='text-white bg-blue-600 border border-blue-700 py-2 px-5 rounded-md mr-10 hover:bg-white hover:border-white hover:text-black'>Login</button>
            </Link>
          </div>
        </nav>
        <div className='mt-16'>
          <div className='flex justify-center'>
            <p className='text-white text-xl'>HeadlineAI :<span className='text-blue-600'> AI-Powered</span> News Application</p>
          </div>
          <div className='flex justify-center mt-11'>
            <div className='flex flex-col justify-center items-center'>
              <p className='text-7xl text-white'>Examin The</p>
              <p className='text-7xl text-white'>Potential of HeadlineAI</p>
              <p className='text-7xl text-blue-600'>Chating</p>
            </div>
          </div>
        </div>
        <div className='flex justify-center mt-10'>
          <p className='text-white text-xl text-center'>HeadlineAI is an<span className='text-blue-600'> AI-powered</span> news<br />application with a conversational user interface<span className='text-blue-600'> (CUI)</span>, designed to<br />help users query<span className='text-blue-600'> News</span> efficiently</p>
        </div>
        <div className='flex justify-center mt-10'>
          <Link href="/signup">
          <button className='bg-blue-600 border border-blue-600 px-10 py-3 rounded-lg text-white text-xl hover:border-white hover:text-black hover:bg-white'>Get Started</button>
          </Link>
        </div>
        <div className='mt-20'>
          <h1 className='text-7xl text-blue-600 flex justify-center'>About</h1>
          <div className='mt-10'>
            <p className='text-2xl text-white text-center'>Headline AI is a revolutionary chatbot app that leverages a conversational user interface<br />(CUI) to bring you the latest news from aroundthe globe.
              Designed for intuitive, interactive<br />experiences, Headline AI allows users to communicate with the bot naturally, just like<br />chatting with a person.
              Ask for the latest headlines, sports updates, or business news,<br />and get real-time information, fetched directly<br />from trusted news sources.With its simple, text-based<br />conversational interface, Headline AI makes staying updated<br />fast and easy. Whether you're on your desktop, mobile,<br />or tablet,
              just type in your query<br />and let the bot handle the rest.<br />Stay informed in a way that feels personal and<br />effortless.</p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default page