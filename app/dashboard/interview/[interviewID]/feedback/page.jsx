'use client'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDownIcon, ChevronFirstIcon, ChevronsUpDown, ChevronsUpDownIcon, ChevronUpCircleIcon } from 'lucide-react'
import { ShinyText } from '@/components/ui/shiny-text'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

function Feedback({params}) {
  const [feedbackList, setFeedbackList] = useState([])
  const [averageRating, setAverageRating] = useState(0)
  const router=useRouter()

  const resolvedParams = React.use(params)
  
  const GetFeedback = async () => {
        const result=await db.select().from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef,resolvedParams.interviewID))
      .orderBy(UserAnswer.id)

      console.log(result)
      setFeedbackList(result)
      
      if (result && result.length > 0) {
        const totalRating = result.reduce((sum, item) => {
          const rating = parseFloat(item.rating) || 0
          return sum + rating
        }, 0)
        const average = totalRating / result.length
        setAverageRating(Math.round(average * 10) / 10) // Round to 1 decimal place
      }

  }
  useEffect(() => {
    if (resolvedParams?.interviewID) {
      GetFeedback()
    }
  }, [resolvedParams?.interviewID])
  return (
    <div className='p-10'>
      <h2 className='text-3xl font-bold text-green-500' ><ShinyText variant="gold">Congratulation!</ShinyText></h2>
      <h2 className='font-bold text-2xl my-2'>Here is your feedback for the interview.</h2>
       {feedbackList?.length==0?
       <h2 className='text-grey-500 font-bold'>No feedback found</h2>
       :
       <>
       <h2 className='text-lg my-2 text-blue-500 font-bold'>Your overall rating : <strong>{averageRating}/10</strong></h2>
       <h2 className='text-grey'>Find below the interview questions with correct answers and your answers with feedback for improvement.</h2>
       
      

        <h2 className='text-lg my-2 text-blue-500 font-bold'>Your overall rating : <strong>{averageRating}/10</strong></h2>
      <h2 className='text-grey'>Find below the interview questions with correct answers and your answers with feedback for improvement.</h2>
      {feedbackList&&feedbackList.map((item,index)=>(
      <Collapsible key={index}>
  <CollapsibleTrigger className='p-4 bg-gray-100 rounded-full my-3 text-left flex justify-between items-center hover:bg-gray-200 transition-colors cursor-pointer group'>
    <div className='flex items-center gap-3'>
      <div className='bg-blue-500 text-white rounded-full p-2 flex items-center justify-center text-sm font-bold shadow-md'>
        {index + 1}
      </div>
      <span className='text-gray-800 font-medium group-hover:text-blue-600 transition-colors'>
        {item.question}
      </span>
    </div>
    <ChevronsUpDownIcon className='h-4 w-4 text-gray-500 group-hover:text-blue-500 transition-colors'/>
  </CollapsibleTrigger>
  <CollapsibleContent>  
  <div className=''>
  <h2 className='text-md text-blue-500 border-rounded-lg '>Rating : <strong>{item.rating}/10</strong></h2>
  <h2 className='border border-grey-500 rounded-lg pl-2 bg-red-50 mt-2'><strong className='text-md text-red-800 pr-2'>User Answer : </strong><span className='text-red-700 text-semibold font-medium'>{item.userAns}</span></h2>
  <h2 className='border border-grey-500 rounded-lg pl-2 bg-green-50 mt-2'><strong className='text-md text-green-800 pr-2'>Correct Answer : </strong><span className='text-green-700 text-semibold font-medium'>{item.correctAns}</span></h2>
    </div>
  </CollapsibleContent>
</Collapsible>
      ))}
      </>}
      <Button className='mt-4 flex justify-center cursor-pointer'  onClick={()=>router.push('/dashboard') }>Go to Dashboard</Button>
      </div>
  )
}

export default Feedback