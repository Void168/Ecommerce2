import React, { Suspense } from 'react'

function Home() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <div className="h-screen">Home</div>
    </Suspense>
  )
}

export default Home
