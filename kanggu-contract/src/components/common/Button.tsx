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
    font-semibold
    rounded-2xl
    transition-all duration-300
    transform
    hover:scale-105
    active:scale-95
    shadow-lg
    hover:shadow-2xl
  `;

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-blue-500 to-purple-600
      text-white
      hover:from-blue-600 hover:to-purple-700
    `,
    secondary: `
      bg-gradient-to-r from-gray-600 to-gray-700
      text-white
      hover:from-gray-700 hover:to-gray-800
    `,
    danger: `
      bg-gradient-to-r from-red-500 to-pink-600
      text-white
      hover:from-red-600 hover:to-pink-700
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
      {children}
    </button>
  );
};
