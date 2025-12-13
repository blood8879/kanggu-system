import React from 'react';
import { DatePicker } from './DatePicker';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  onDateChange?: (date: Date | null) => void;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, className = '', type, value, onDateChange, onChange, ...props }, ref) => {
    const internalRef = React.useRef<HTMLInputElement>(null);

    // ref forwarding 처리
    React.useImperativeHandle(ref, () => internalRef.current as HTMLInputElement);

    // type="number"일 때 마우스 휠로 값이 변경되는 것을 방지
    React.useEffect(() => {
      const input = internalRef.current;
      if (!input || type !== 'number') return;

      const handleWheel = (e: WheelEvent) => {
        // 포커스가 있을 때만 휠 이벤트 방지
        if (document.activeElement === input) {
          e.preventDefault();
        }
      };

      input.addEventListener('wheel', handleWheel, { passive: false });
      return () => input.removeEventListener('wheel', handleWheel);
    }, [type]);

    // type="date"인 경우 DatePicker 컴포넌트 사용
    if (type === 'date') {
      const dateValue = value instanceof Date ? value : null;

      const handleDateChange = (date: Date | null) => {
        // react-hook-form의 onChange 호출
        if (onChange && internalRef.current) {
          // Date 객체를 포함한 합성 이벤트 생성
          const syntheticEvent = {
            target: internalRef.current,
            currentTarget: internalRef.current,
            type: 'change',
          } as React.ChangeEvent<HTMLInputElement>;

          // target.value에 Date 객체 설정 (valueAsDate를 위해)
          Object.defineProperty(syntheticEvent.target, 'value', {
            get: () => date,
            configurable: true,
          });

          onChange(syntheticEvent);
        }

        if (onDateChange) {
          onDateChange(date);
        }
      };

      return (
        <div className="flex flex-col gap-2">
          <DatePicker
            label={label}
            value={dateValue}
            onChange={handleDateChange}
            placeholder={props.placeholder}
            className={className}
          />
          {/* react-hook-form과의 통합을 위한 hidden input */}
          <input
            ref={internalRef}
            type="hidden"
            value={dateValue?.toISOString() || ''}
            onChange={onChange}
            {...props}
          />
        </div>
      );
    }

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
          ref={internalRef}
          type={type}
          value={formattedValue}
          onChange={onChange}
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
