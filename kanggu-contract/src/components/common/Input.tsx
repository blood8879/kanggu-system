import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, className = '', type, value, ...props }, ref) => {
    // type="date"이고 value가 Date 객체인 경우 yyyy-MM-dd 형식으로 변환
    let formattedValue = value;
    if (type === 'date' && value instanceof Date && !isNaN(value.getTime())) {
      const year = value.getFullYear();
      const month = String(value.getMonth() + 1).padStart(2, '0');
      const day = String(value.getDate()).padStart(2, '0');
      formattedValue = `${year}-${month}-${day}`;
    }

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label className="text-sm font-medium text-gray-700">{label}</label>
        )}
        <input
          ref={ref}
          type={type}
          value={formattedValue}
          className={`px-2 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';
