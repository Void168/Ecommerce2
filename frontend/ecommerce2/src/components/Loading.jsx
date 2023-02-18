import React from 'react'

function Loading() {
  return (
    <div className="flex text-center justify-center items-center min-h-screen">
      <img
        src="/images/loading.gif"
        alt="Loading"
        className="shadow-none small-phone:w-32 small-phone:h-32 laptop:w-64 laptop:h-64"
      />
    </div>
  );
}

export default Loading
