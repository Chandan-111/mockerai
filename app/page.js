import Image from "next/image";
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { UserButton } from "@clerk/nextjs";
import Header from './dashboard/_components/Header'

export default async function Home() {
  const { userId } = await auth()
  
  if (userId) {
    redirect('/dashboard')
  } 
  return (
<div>
  <Header/>
  Dashboard
  <UserButton/>
</div>
  );
}
