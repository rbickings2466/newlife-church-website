import React from "react";

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className='fixed inset-0 bg-white z-50 flex items-center justify-center'>
      <div className='text-center'>
        <div className='w-16 h-16 border-4 border-church-blue border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
        <p className='text-gray-600 text-lg'>{message}</p>
      </div>
    </div>
  );
};

export default Loading;
