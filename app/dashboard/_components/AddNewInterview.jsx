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
import { ShinyText } from '@/components/ui/shiny-text'
import SplitText from '@/components/SplitText'

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false)
  return (
    <div>
      <div className=' p-10 rounded-lg shadow-md 
      hover:shadow-lg transition-all cursor-pointer transition-all'>
        <h2 className='text-md font-bold text-center'
         onClick={() => setOpenDialog(true)}
         >
          <SplitText variant="rainbow">+ NEW INTERVIEW</SplitText>
        </h2>
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
          <div className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Role/Position</label>
              <Input placeholder="Ex, Full Stack Developer"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Description</label>
              <Textarea placeholder="Ex, Ex,React,Angular,NodeJs,My SQL"/>
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button>Continue</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddNewInterview
