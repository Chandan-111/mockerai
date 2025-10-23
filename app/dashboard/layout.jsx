import React from 'react'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Header from './_components/Header'

async function DashboardLayout({children}) {
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800'>
      <Header/>

        <div className='mx-5 md:mx-20 lg:mx-36 py-8'>
        {children}
        </div>
    </div>
  )
}
export default DashboardLayout
