'use client'
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation';

function Header() {
const path = usePathname();
useEffect(() => {
  console.log(path);
}, []);

  return (
    <div className='frosted-glass sticky top-0 z-50 flex p-4 items-center justify-between text-white shadow-lg'>
        <Image src="/logo.svg" width={250} height={200} alt="logo" className='filter brightness-0 invert' />
        <ul className='hidden md:flex gap-6'>
           <li className={`hover:text-blue-300 hover:font-bold transition-all cursor-pointer text-lg
           ${path==='/' || path==='/dashboard' ? 'text-blue-400 font-bold text-xl' : 'text-gray-300'}
           `}
          >Dashboard</li>
          <li className={`hover:text-blue-300 hover:font-bold transition-all cursor-pointer text-lg
          ${path==='/questions' ? 'text-blue-400 font-bold text-xl' : 'text-gray-300'}
          `}>Questions</li>
          <li className={`hover:text-blue-300 hover:font-bold transition-all cursor-pointer text-lg
          ${path==='/upgrade' ? 'text-blue-400 font-bold text-xl' : 'text-gray-300'}
          `}>Upgrade</li>
          <li className={`hover:text-blue-300 hover:font-bold transition-all cursor-pointer text-lg
          ${path==='/how-it-works' ? 'text-blue-400 font-bold text-xl' : 'text-gray-300'}
          `}>How it works</li>
        </ul>
        <div className='frosted-button rounded-full p-2'>
          <UserButton/>
        </div>
    </div>
  )
}

export default Header
