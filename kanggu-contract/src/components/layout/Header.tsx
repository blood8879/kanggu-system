import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="relative z-20 backdrop-blur-xl bg-[rgba(0,0,0,0.8)] border-b border-[var(--color-luxury-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Logo with gold gradient */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-[family-name:var(--font-family-display)] font-extrabold mb-4 sm:mb-6 bg-gradient-to-r from-[var(--color-luxury-gold)] via-[var(--color-luxury-gold-light)] to-[var(--color-luxury-gold)] bg-clip-text text-transparent">
          강구토건 근로계약서
        </h1>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row gap-2 sm:gap-6">
          <Link
            to="/"
            className={`px-4 py-2 rounded-lg font-[family-name:var(--font-family-sans)] font-medium transition-all duration-300 ${
              isActive('/')
                ? 'bg-gradient-to-r from-[var(--color-luxury-gold)] to-[var(--color-luxury-gold-light)] text-black shadow-[var(--shadow-gold-glow)]'
                : 'text-[var(--color-luxury-silver)] hover:text-[var(--color-luxury-gold-light)] hover:bg-[rgba(212,175,55,0.1)]'
            }`}
          >
            홈
          </Link>
          <Link
            to="/workers"
            className={`px-4 py-2 rounded-lg font-[family-name:var(--font-family-sans)] font-medium transition-all duration-300 ${
              isActive('/workers')
                ? 'bg-gradient-to-r from-[var(--color-luxury-gold)] to-[var(--color-luxury-gold-light)] text-black shadow-[var(--shadow-gold-glow)]'
                : 'text-[var(--color-luxury-silver)] hover:text-[var(--color-luxury-gold-light)] hover:bg-[rgba(212,175,55,0.1)]'
            }`}
          >
            근로자 관리
          </Link>
          <Link
            to="/create-contract"
            className={`px-4 py-2 rounded-lg font-[family-name:var(--font-family-sans)] font-medium transition-all duration-300 ${
              isActive('/create-contract')
                ? 'bg-gradient-to-r from-[var(--color-luxury-gold)] to-[var(--color-luxury-gold-light)] text-black shadow-[var(--shadow-gold-glow)]'
                : 'text-[var(--color-luxury-silver)] hover:text-[var(--color-luxury-gold-light)] hover:bg-[rgba(212,175,55,0.1)]'
            }`}
          >
            계약서 생성
          </Link>
        </nav>
      </div>
    </header>
  );
};
