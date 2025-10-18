import React from 'react'

function Dashboard() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-8 text-gray-800">Dashboard</h1>
        <h2 className="text-3xl font-semibold mb-6 text-blue-600">Create and Start your Mock Interview</h2>
        <p className="text-gray-600 mb-10 text-xl max-w-2xl mx-auto">Welcome to your AI Interview Mocker dashboard. Practice with AI-powered mock interviews tailored to your role and experience level.</p>
        
        <div className="space-y-6">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-lg text-xl transition-colors shadow-lg">
            Start New Interview
          </button>
          <div className="text-gray-500 text-lg">
            Choose your role, experience level, and get personalized questions
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
