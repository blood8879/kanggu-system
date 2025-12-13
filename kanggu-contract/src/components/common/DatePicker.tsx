import React, { useState, useRef, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import type { DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import 'react-day-picker/style.css';

interface DatePickerProps {
  label?: string;
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  className?: string;
  mode?: 'single' | 'range';
  rangeValue?: DateRange;
  onRangeChange?: (range: DateRange | undefined) => void;
}

export const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      label,
      value,
      onChange,
      placeholder = '날짜 선택',
      className = '',
      mode = 'single',
      rangeValue,
      onRangeChange,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const calendarRef = useRef<HTMLDivElement>(null);

    // ref forwarding 처리
    React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

    // 외부 클릭 감지
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);

    const handleDateSelect = (date: Date | undefined) => {
      if (mode === 'single' && onChange) {
        onChange(date || null);
        setIsOpen(false);
      }
    };

    const handleRangeSelect = (range: DateRange | undefined) => {
      if (mode === 'range' && onRangeChange) {
        onRangeChange(range);
        if (range?.from && range?.to) {
          setIsOpen(false);
        }
      }
    };

    const displayValue = () => {
      if (mode === 'single' && value) {
        return format(value, 'yyyy년 MM월 dd일', { locale: ko });
      }
      if (mode === 'range' && rangeValue?.from) {
        const fromStr = format(rangeValue.from, 'yyyy.MM.dd', { locale: ko });
        const toStr = rangeValue.to
          ? format(rangeValue.to, 'yyyy.MM.dd', { locale: ko })
          : '';
        return toStr ? `${fromStr} - ${toStr}` : fromStr;
      }
      return placeholder;
    };

    return (
      <div ref={containerRef} className={`relative ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-[var(--color-luxury-silver-light)] mb-2 font-[family-name:var(--font-family-sans)]">
            {label}
          </label>
        )}

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 bg-[rgba(20,20,20,0.6)] backdrop-blur-sm border border-[var(--color-luxury-border)] rounded-xl text-[var(--color-luxury-silver-light)] font-[family-name:var(--font-family-sans)] text-left transition-all duration-300 focus:outline-none focus:border-[var(--color-luxury-gold)] focus:ring-2 focus:ring-[var(--color-luxury-gold)]/30 focus:shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:border-[var(--color-luxury-silver)]"
        >
          <span className={!value && !rangeValue?.from ? 'text-[var(--color-luxury-silver)]/50' : ''}>
            {displayValue()}
          </span>
        </button>

        {isOpen && (
          <div
            ref={calendarRef}
            className="absolute left-0 right-0 bottom-full z-[9999] mb-2 bg-[rgba(15,15,15,0.98)] backdrop-blur-xl border border-[var(--color-luxury-border)] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-4"
          >
            <style>{`
              .rdp {
                --rdp-accent-color: var(--color-luxury-gold);
                --rdp-background-color: rgba(212, 175, 55, 0.15);
                --rdp-accent-color-dark: #C5A028;
                margin: 0;
              }

              .rdp-months {
                justify-content: center;
              }

              .rdp-month {
                color: var(--color-luxury-silver-light);
              }

              .rdp-caption {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 0.5rem 0 1rem 0;
                color: var(--color-luxury-gold);
                font-weight: 600;
                font-size: 1rem;
              }

              .rdp-nav {
                position: absolute;
                top: 0.5rem;
                display: flex;
                align-items: center;
              }

              .rdp-button_previous {
                left: 0.5rem;
              }

              .rdp-button_next {
                right: 0.5rem;
              }

              .rdp-nav_button {
                width: 2rem;
                height: 2rem;
                border-radius: 0.5rem;
                color: var(--color-luxury-silver);
                transition: all 0.2s;
                background: rgba(212, 175, 55, 0.1);
                border: 1px solid var(--color-luxury-border);
              }

              .rdp-nav_button:hover:not([disabled]) {
                background-color: rgba(212, 175, 55, 0.2);
                color: var(--color-luxury-gold);
                border-color: var(--color-luxury-gold);
              }

              .rdp-nav_button[disabled] {
                opacity: 0.3;
                cursor: not-allowed;
              }

              .rdp-head_cell {
                color: var(--color-luxury-silver);
                font-weight: 500;
                font-size: 0.875rem;
                padding: 0.5rem;
              }

              .rdp-day {
                width: 2.5rem;
                height: 2.5rem;
                font-size: 0.875rem;
                border-radius: 0.5rem;
                color: var(--color-luxury-silver-light);
                transition: all 0.2s;
              }

              .rdp-day_button {
                width: 100%;
                height: 100%;
                border-radius: 0.5rem;
                border: none;
                background: transparent;
                color: inherit;
                font-size: inherit;
                transition: all 0.2s;
              }

              .rdp-day_button:hover:not([disabled]) {
                background-color: rgba(212, 175, 55, 0.15);
                color: var(--color-luxury-gold);
              }

              .rdp-day_button[disabled] {
                opacity: 0.3;
                cursor: not-allowed;
              }

              .rdp-day_outside {
                opacity: 0.3;
              }

              .rdp-day_selected .rdp-day_button,
              .rdp-day_selected .rdp-day_button:hover {
                background-color: var(--color-luxury-gold);
                color: var(--color-luxury-black);
                font-weight: 600;
                box-shadow: 0 0 15px rgba(212, 175, 55, 0.4);
              }

              .rdp-day_today:not(.rdp-day_selected) .rdp-day_button {
                border: 1px solid var(--color-luxury-gold);
                background-color: rgba(212, 175, 55, 0.1);
              }

              .rdp-day_range_start .rdp-day_button,
              .rdp-day_range_end .rdp-day_button {
                background-color: var(--color-luxury-gold);
                color: var(--color-luxury-black);
                font-weight: 600;
              }

              .rdp-day_range_middle .rdp-day_button {
                background-color: rgba(212, 175, 55, 0.2);
                color: var(--color-luxury-silver-light);
              }

              .rdp-caption_label {
                font-size: 1rem;
                font-weight: 600;
                color: var(--color-luxury-gold);
              }

              .rdp-weeknumber {
                color: var(--color-luxury-silver);
                opacity: 0.6;
              }
            `}</style>

            {mode === 'single' ? (
              <DayPicker
                mode="single"
                selected={value || undefined}
                onSelect={handleDateSelect}
                locale={ko}
                showOutsideDays
              />
            ) : (
              <DayPicker
                mode="range"
                selected={rangeValue}
                onSelect={handleRangeSelect}
                locale={ko}
                showOutsideDays
              />
            )}
          </div>
        )}
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';
