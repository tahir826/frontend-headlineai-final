"use client"
import { FaUserLarge } from "react-icons/fa6";
import Image from "next/image"
import UserIcon from "./UserIcon";
import Link from "next/link"
import logo from "@/public/mainLogo.png"
export default function Header() {
    return (
        <main className="">
            <div className="flex bg-black w-full h-16 items-center justify-between">
                <div className="flex bg-black justify-start ">
                    <Link  href="/chat">
                    <Image src={logo} alt="logo" className="w-56 ml-10"></Image>
                    </Link>
                </div>
               <div>
               <UserIcon />
               </div> 
            </div>
        </main>
    )
}
