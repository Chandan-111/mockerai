import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'

function Dashboard() {
  return (
    <div className='py-10'>

      <h2 className='text-2xl font-bold'>Dashoard</h2>
      <h2 className='text-gray-500'>Create new interview</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
        <AddNewInterview/>
      </div>
      <InterviewList/>
    </div>
  )
}

export default Dashboard
