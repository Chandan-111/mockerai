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
    <div>
      <Header/>
      <div className='px-4 py-8'>
        {children}
      </div>
    </div>
  )
}
export default DashboardLayout
