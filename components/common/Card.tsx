
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className, onClick }) => {
  const interactiveClasses = onClick ? 'cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300' : '';
  
  return (
    <div
      className={`bg-card rounded-xl shadow-md overflow-hidden p-6 ${interactiveClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
