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
    <div  className='flex p-4 items-center justify-between bg-secondary shadow-emerald-50 '>
        <Image src="/logo.svg" width={100} height={50} alt="logo" />
        <ul className='hidden md:flex gap-6'>
           <li className={`hover:text-blue-500  hover:font-bold transition-all cursor-pointer
           ${path==='/' || path==='/dashboard' ? 'text-blue-600 font-bold' : ''}
           `}
          >Dashboard</li>
          <li className={`hover:text-gray-500  hover:font-bold transition-all cursor-pointer
          ${path==='/questions' ? 'text-blue-600 font-bold' : ''}
          `}>Questions</li>
          <li className={`hover:text-gray-500  hover:font-bold transition-all cursor-pointer
          ${path==='/upgrade' ? 'text-blue-600 font-bold' : ''}
          `}>Upgrade</li>
          <li className={`hover:text-gray-500  hover:font-bold transition-all cursor-pointer
          ${path==='/how-it-works' ? 'text-blue-600 font-bold' : ''}
          `}>How it works</li>
        </ul>
        <UserButton/>
    </div>
  )
}

export default Header
