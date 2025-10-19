"use client"
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'
import SplitText from '@/components/SplitText'
import GeminiAIModal, { ChatSession } from '@/utils/GeminiAIModal'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs'
import { User } from '@clerk/nextjs'
import moment from 'moment/moment'

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false)
  const [jobPosition, setJobPosition] = useState('')
  const [jobDesc, setJobDesc] = useState('')
  const [jobExperience, setJobExperience] = useState('')
  const [loading, setLoading] = useState(false)
  const [jsonResponse,setJsonResponse] = useState([])
  const { user } = useUser()
  
  // Define ChatSession from Google Generative AI
  const chatSession = new ChatSession('AIzaSyDoEmcJVlSnVvOCZ0lOtX-gBl0xBX2nYCA')

  const onSubmit = async(e) => {
    setLoading(true)
    e.preventDefault()
    console.log(jobPosition, jobDesc, jobExperience);
    const InputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}. 

IMPORTANT: Return ONLY valid JSON format. Do not include any explanatory text, comments, or additional content before or after the JSON.

Generate 5 interview questions with answers in this EXACT format:
{
  "questions": [
    {"question": "Question 1", "answer": "Answer 1"},
    {"question": "Question 2", "answer": "Answer 2"},
    {"question": "Question 3", "answer": "Answer 3"},
    {"question": "Question 4", "answer": "Answer 4"},
    {"question": "Question 5", "answer": "Answer 5"}
  ]
} 

Return ONLY the JSON object above, nothing else.`;
    const result = await chatSession.sendMessage(InputPrompt);
    
    // Clean the response - remove markdown code blocks
    let MockJsonResp   = result.replace('```json', '').replace('```', '').trim();
    
    // Extract JSON object from the response
    const jsonMatch = MockJsonResp.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      MockJsonResp = jsonMatch[0];
    }
    
    try {
      const parsedJson = JSON.parse(MockJsonResp);
      console.log('Successfully parsed JSON:', parsedJson);
      setJsonResponse(parsedJson);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.log('Cleaned response that failed to parse:', MockJsonResp);
    }
    setJsonResponse(MockJsonResp);
    if(MockJsonResp){

    const resp = await db.insert(MockInterview).values({
      mockId: uuidv4(),
      jsonMockResp: MockJsonResp,
      jobPosition: jobPosition,
      jobDesc: jobDesc,
      jobExperience: jobExperience,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),       
    }).returning({mockId:MockInterview.mockId})
    console.log("Inserted ID:",resp)
    if(resp){
      setOpenDialog(false)
    }
  }
  else{
    console.log("No JSON Response");
  }

  }
  return (
    <div>
      <div className=' p-10 rounded-lg shadow-md 
      hover:shadow-lg transition-all cursor-pointer transition-all'>
        <div onClick={() => setOpenDialog(true)} className="cursor-pointer text-center font-bold">
          <SplitText
            text="+ NEW INTERVIEW"
            tag="h2"
            delay={50}
            duration={0.8} loop={true} loopDelay={2000}
            from={{ opacity: 0, y: 20, rotationX: 90 }}
            to={{ opacity: 1, y: 0, rotationX: 0 }}
            splitType="words"
          />
        </div>
        <h1 className='text-center text-gray-500'>Buckle up</h1>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className={cn('max-w-2xl')}>
          <DialogHeader>
            <DialogTitle className={cn('text-2xl font-bold text-center')}>Let's see what you got!</DialogTitle>
            <DialogDescription className={cn('text-gray-500 text-center')}>
              Fill in the details and get ready to showcase your skills!
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit}>
          <div className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Role/Position</label>
              <Input placeholder="Ex, Full Stack Developer" required onChange={(event) => setJobPosition(event.target.value)}/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Description</label>
              <Textarea placeholder="Ex, React, Angular, NodeJs, MySQL" 
              required 
              onChange={(event) => setJobDesc(event.target.value)}/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
              <Input 
                type="number" 
                placeholder="Ex, 5"
                min="0"
                max="50"
                step="1"
                required
                onChange={(event) => setJobExperience(event.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button type="submit" disabled={loading} className="relative">
              {loading && (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {loading ? 'Generating Questions...' : 'Continue'}
            </Button>
          </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddNewInterview
