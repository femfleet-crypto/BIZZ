
import React from 'react';

interface LoaderProps {
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({ message = 'Thinking...' }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="text-text-secondary font-medium">{message}</p>
    </div>
  );
};

export default Loader;
