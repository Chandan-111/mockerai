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
    <div className='border shadow-md rounded-lg p-6 hover:shadow-lg transition-all bg-white'>
      <h2 className='text-lg font-bold text-gray-800 mb-2'>Position: {interview?.jobPosition}</h2>
      <h3 className='text-sm text-gray-600 font-semibold mb-2'>Experience: {interview?.jobExperience}</h3>
      <h3 className='text-xs text-gray-500'>Created: {interview?.createdAt}</h3>
      <div className='flex gap-2 mt-3'>
        <Button className='flex-1 cursor-pointer' variant='outline' onClick={onFeedback}>View Interview</Button>
         <Button className='flex-1 cursor-pointer' onClick={onStart}>Re-take Interview</Button>
      </div>
    </div>
  )
}

export default InterviewItemCard