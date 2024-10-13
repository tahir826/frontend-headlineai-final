"use client"
import ChatApp from '@/components/ChatApp'
import Header from '@/components/Header'
import SideLayout from '@/components/SidePanel'


function page() {
  return (
    <main>
      <Header />
      <SideLayout />
        < ChatApp />
        </main>
  )
}

export default page