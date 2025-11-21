import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="bg-primary text-white px-2 py-2">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold mb-2">
          강구토건 근로계약서
        </h1>
        <nav className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <Link to="/" className="hover:underline">
            홈
          </Link>
          <Link to="/workers" className="hover:underline">
            근로자 관리
          </Link>
          <Link to="/create-contract" className="hover:underline">
            계약서 생성
          </Link>
        </nav>
      </div>
    </header>
  );
};
