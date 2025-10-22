import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function Home() {
  const { userId } = await auth()
  
  if (userId) {
    redirect('/dashboard')
  } 
  
  // Redirect unauthenticated users to sign-in page
  redirect('/sign-in')
}
