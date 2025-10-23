import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'

function Dashboard() {
  return (
    <div className='py-10'>

      <div className='frosted-card rounded-2xl p-8 mb-8'>
        <h2 className='text-4xl font-bold text-white mb-2'>Dashboard</h2>
        <h2 className='text-gray-300 text-xl'>Create new interview</h2>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
        <AddNewInterview/>
      </div>
      <InterviewList/>
    </div>
  )
}

export default Dashboard
