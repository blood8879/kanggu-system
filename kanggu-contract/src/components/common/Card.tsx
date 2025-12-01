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
        relative overflow-hidden
        backdrop-blur-xl bg-[var(--color-luxury-card-bg)]
        border border-[var(--color-luxury-border)]
        rounded-2xl shadow-[var(--shadow-card)]
        p-6 sm:p-8
        transition-all duration-500
        ${hover ? 'hover:border-[var(--color-luxury-gold)] hover:shadow-[var(--shadow-gold-glow)] hover:scale-[1.02]' : ''}
        ${className}
      `}
    >
      {/* Glassmorphic overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[rgba(212,175,55,0.05)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
