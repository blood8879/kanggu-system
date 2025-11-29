import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="bg-white/10 backdrop-blur-xl text-white px-4 py-4 shadow-lg border-b border-white/20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight">
          강구토건 근로계약서
        </h1>
        <nav className="flex flex-col sm:flex-row gap-3 sm:gap-6">
          <Link
            to="/"
            className="text-white/90 hover:text-white transition-all duration-300 hover:translate-x-1 font-medium"
          >
            홈
          </Link>
          <Link
            to="/workers"
            className="text-white/90 hover:text-white transition-all duration-300 hover:translate-x-1 font-medium"
          >
            근로자 관리
          </Link>
          <Link
            to="/create-contract"
            className="text-white/90 hover:text-white transition-all duration-300 hover:translate-x-1 font-medium"
          >
            계약서 생성
          </Link>
        </nav>
      </div>
    </header>
  );
};
