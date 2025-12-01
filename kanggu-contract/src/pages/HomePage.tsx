import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-8 sm:space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-[family-name:var(--font-family-display)] font-extrabold bg-gradient-to-r from-[var(--color-luxury-silver-light)] via-white to-[var(--color-luxury-silver-light)] bg-clip-text text-transparent leading-tight">
          강구토건 근로계약서
          <br />
          자동화 시스템
        </h1>
        <p className="text-base sm:text-lg text-[var(--color-luxury-silver)] max-w-2xl mx-auto font-[family-name:var(--font-family-sans)]">
          프리미엄 근로계약서 관리 플랫폼
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* Contract Creation Card */}
        <Card hover={true} className="group">
          <div className="space-y-4 sm:space-y-6">
            {/* Icon */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[var(--color-luxury-gold)] to-[var(--color-luxury-gold-light)] flex items-center justify-center shadow-[var(--shadow-gold-glow)] group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-7 h-7 sm:w-8 sm:h-8 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>

            {/* Content */}
            <div>
              <h2 className="text-xl sm:text-2xl font-[family-name:var(--font-family-display)] font-bold text-[var(--color-luxury-gold-light)] mb-2 sm:mb-3">
                계약서 생성
              </h2>
              <p className="text-sm sm:text-base text-[var(--color-luxury-silver)] leading-relaxed">
                새로운 근로계약서를 빠르고 정확하게 생성합니다.
              </p>
            </div>

            {/* CTA Button */}
            <Link to="/create-contract" className="block">
              <Button className="w-full">계약서 생성 시작</Button>
            </Link>
          </div>
        </Card>

        {/* Worker Management Card */}
        <Card hover={true} className="group">
          <div className="space-y-4 sm:space-y-6">
            {/* Icon */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[var(--color-luxury-silver)] to-[var(--color-luxury-silver-light)] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-7 h-7 sm:w-8 sm:h-8 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>

            {/* Content */}
            <div>
              <h2 className="text-xl sm:text-2xl font-[family-name:var(--font-family-display)] font-bold text-[var(--color-luxury-silver-light)] mb-2 sm:mb-3">
                근로자 관리
              </h2>
              <p className="text-sm sm:text-base text-[var(--color-luxury-silver)] leading-relaxed">
                등록된 근로자 정보를 체계적으로 관리합니다.
              </p>
            </div>

            {/* CTA Button */}
            <Link to="/workers" className="block">
              <Button variant="secondary" className="w-full">
                근로자 목록 보기
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
