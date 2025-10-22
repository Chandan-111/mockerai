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
    <div  className='flex p-4 items-center justify-between bg-secondary shadow-emerald-50 text-xl '>
        <Image src="/logo.svg" width={250} height={200} alt="logo" />
        <ul className='hidden md:flex gap-6'>
           <li className={`hover:text-grey-500  hover:font-bold transition-all cursor-pointer
           ${path==='/' || path==='/dashboard' ? 'text-blue-500 font-bold text-xl' : ''}
           `}
          >Dashboard</li>
          <li className={`hover:text-gray-500  hover:font-bold transition-all cursor-pointer
          ${path==='/questions' ? 'text-blue-500 font-bold text-xl' : ''}
          `}>Questions</li>
          <li className={`hover:text-gray-500  hover:font-bold transition-all cursor-pointer
          ${path==='/upgrade' ? 'text-blue-500 font-bold text-xl' : ''}
          `}>Upgrade</li>
          <li className={`hover:text-gray-500  hover:font-bold transition-all cursor-pointer
          ${path==='/how-it-works' ? 'text-blue-500 font-bold text-xl' : ''}
          `}>How it works</li>
        </ul>
        <UserButton/>
    </div>
  )
}

export default Header
