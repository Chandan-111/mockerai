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
        {children}
    </div>
  )
}
export default DashboardLayout
