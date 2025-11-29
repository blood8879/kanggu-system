import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hover = false }) => {
  return (
    <div
      className={`
        bg-white/95 backdrop-blur-sm
        border border-white/40
        rounded-3xl
        shadow-[0_8px_30px_rgba(0,0,0,0.12)]
        px-8 py-8
        transition-all duration-500 ease-out
        ${hover ? 'hover:shadow-[0_20px_60px_rgba(0,0,0,0.2)] hover:scale-[1.02] hover:-translate-y-1' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
