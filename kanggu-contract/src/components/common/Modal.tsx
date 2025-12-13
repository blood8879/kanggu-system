import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-[fadeInUp_0.3s_ease-out]">
      {/* Backdrop with blur */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative backdrop-blur-xl bg-[var(--color-luxury-card-bg)] border border-[var(--color-luxury-border)] rounded-2xl shadow-[var(--shadow-card)] max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden animate-[fadeInUp_0.4s_ease-out]">
        {/* Glassmorphic glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(212,175,55,0.1)] via-transparent to-[rgba(0,217,255,0.05)] pointer-events-none"></div>

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between px-6 py-5 border-b border-[var(--color-luxury-border)]">
          <h2 className="text-xl sm:text-2xl font-[family-name:var(--font-family-display)] font-bold bg-gradient-to-r from-[var(--color-luxury-gold)] to-[var(--color-luxury-gold-light)] bg-clip-text text-transparent">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[rgba(192,192,192,0.1)] hover:bg-[rgba(212,175,55,0.2)] border border-[var(--color-luxury-border)] hover:border-[var(--color-luxury-gold)] text-[var(--color-luxury-silver-light)] hover:text-[var(--color-luxury-gold)] transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[var(--color-luxury-gold)]/50"
            aria-label="Close modal"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="relative z-10 overflow-y-auto p-6 text-[var(--color-luxury-silver-light)] font-[family-name:var(--font-family-sans)]">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};
