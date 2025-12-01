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
          <label className="text-sm font-medium text-[var(--color-luxury-silver-light)] font-[family-name:var(--font-family-sans)]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          value={formattedValue}
          className={`
            px-4 py-3
            bg-[rgba(20,20,20,0.6)] backdrop-blur-sm
            border border-[var(--color-luxury-border)]
            rounded-xl
            text-[var(--color-luxury-silver-light)]
            font-[family-name:var(--font-family-sans)]
            placeholder:text-[var(--color-luxury-silver)]/50
            transition-all duration-300
            focus:outline-none
            focus:border-[var(--color-luxury-gold)]
            focus:ring-2
            focus:ring-[var(--color-luxury-gold)]/30
            focus:shadow-[0_0_20px_rgba(212,175,55,0.2)]
            hover:border-[var(--color-luxury-silver)]
            disabled:opacity-50 disabled:cursor-not-allowed
            ${className}
          `}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';
