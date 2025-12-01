import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseClasses = `
    relative overflow-hidden
    font-[family-name:var(--font-family-sans)] font-semibold
    rounded-xl
    transition-all duration-300
    disabled:opacity-50 disabled:cursor-not-allowed
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black
  `;

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-[var(--color-luxury-gold)] to-[var(--color-luxury-gold-light)]
      text-black
      shadow-[var(--shadow-gold-glow)]
      hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]
      hover:scale-105
      focus:ring-[var(--color-luxury-gold)]
      active:scale-95
    `,
    secondary: `
      bg-gradient-to-r from-[var(--color-luxury-silver)] to-[var(--color-luxury-silver-light)]
      text-black
      shadow-lg
      hover:shadow-xl
      hover:scale-105
      focus:ring-[var(--color-luxury-silver)]
      active:scale-95
    `,
    danger: `
      bg-gradient-to-r from-red-600 to-red-500
      text-white
      shadow-lg shadow-red-500/30
      hover:shadow-xl hover:shadow-red-500/50
      hover:scale-105
      focus:ring-red-500
      active:scale-95
    `,
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {/* Shimmer effect on hover */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>

      {/* Content */}
      <span className="relative z-10">{children}</span>
    </button>
  );
};
