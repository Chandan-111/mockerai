'use client'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import QuestionsSection from './_components/QuestionsSection'
import RecordAnswerSection from '@/app/dashboard/_components/RecordAnswerSection'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
function StartInterview({params}) {
  const resolvedParams = React.use(params)
  const [interviewData, setInterviewData] = useState()
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([])
  const [activeQuestionIndex,setActiveQuestionIndex]=useState(0)

  useEffect(() => {
    GetInterviewDetails()
  }, [resolvedParams?.interviewID])
  
  const GetInterviewDetails = async () => {
    const result = await db.select().from(MockInterview)
    .where(eq(MockInterview.mockId, resolvedParams?.interviewID))
    if (!result || result.length === 0) return
    const raw = result[0].jsonMockResp
    let jsonMockResp
    try {
      jsonMockResp = typeof raw === 'string' ? JSON.parse(raw) : raw
    } catch (e) {
      jsonMockResp = []
    }
    const questionsArray = Array.isArray(jsonMockResp) ? jsonMockResp : (jsonMockResp?.questions || jsonMockResp?.data || [])
    console.log(jsonMockResp)
    setMockInterviewQuestion(Array.isArray(questionsArray) ? questionsArray : [])
    setInterviewData(result[0])
  }
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-29'>
        {/*Questions*/}
        <QuestionsSection
         mockInterviewQuestion={mockInterviewQuestion}
         activeQuestionIndex={activeQuestionIndex}
         />
        {/*video/audio recording*/}
        <RecordAnswerSection
                 mockInterviewQuestion={mockInterviewQuestion}
                 activeQuestionIndex={activeQuestionIndex}
                 interviewData={interviewData}
        />

      </div>
      <div className='flex justify-center gap-2 my-2 mr-98'>
        {activeQuestionIndex>0 && <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}
        {activeQuestionIndex<mockInterviewQuestion.length-1 && <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}
        {activeQuestionIndex===mockInterviewQuestion.length-1 &&
         <Link href={'/dashboard/interview/'+interviewData?.mockId+'/feedback'}>
          <Button>End Interview</Button>
          </Link>}
      </div>
    </div>
  )
}

export default StartInterview