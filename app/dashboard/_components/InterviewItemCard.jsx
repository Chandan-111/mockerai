import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

function InterviewItemCard({interview}) {
    const router = useRouter()
    const onStart=()=>{
        router.push(`/dashboard/interview/${interview.mockId}`)
    }
    const onFeedback=()=>{
        router.push(`/dashboard/interview/${interview.mockId}/feedback`)
    }


  return (
    <div className='frosted-card rounded-xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 text-white'>
      <h2 className='text-lg font-bold text-white mb-2'>Position: {interview?.jobPosition}</h2>
      <h3 className='text-sm text-gray-300 font-semibold mb-2'>Experience: {interview?.jobExperience}</h3>
      <h3 className='text-xs text-gray-400'>Created: {interview?.createdAt}</h3>
      <div className='flex gap-2 mt-3'>
        <Button className='flex-1 cursor-pointer frosted-button text-white border-white/20 hover:bg-white/20' variant='outline' onClick={onFeedback}>View Interview</Button>
         <Button className='flex-1 cursor-pointer frosted-button text-white border-white/20 hover:bg-white/20' onClick={onStart}>Re-take Interview</Button>
      </div>
    </div>
  )
}

export default InterviewItemCard