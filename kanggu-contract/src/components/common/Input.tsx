import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  className = '',
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <input
        className={`px-2 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
        {...props}
      />
    </div>
  );
};
