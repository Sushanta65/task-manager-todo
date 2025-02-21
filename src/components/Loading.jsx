import React from 'react';

const Loading = () => {
  return (
    <div className="flex justify-center items-center space-x-2 pt-36">
      <div className="w-8 h-8 border-t-4 border-blue-600 border-solid rounded-full animate-spin"></div>
      <span className="text-blue-600 font-medium">Loading...</span>
    </div>
  );
};

export default Loading;
