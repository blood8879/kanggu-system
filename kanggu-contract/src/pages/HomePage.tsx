import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-8 sm:space-y-12">
      <h1 className="text-3xl sm:text-5xl font-bold text-white text-center animate-fade-in-up tracking-tight leading-tight">
        강구토건 근로계약서 자동화 시스템
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <Card hover={true} className="animate-fade-in-up animate-delay-100">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">
            계약서 생성
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed">
            새로운 근로계약서를 생성합니다.
          </p>
          <Link to="/create-contract">
            <Button className="w-full sm:w-auto">계약서 생성 시작</Button>
          </Link>
        </Card>

        <Card hover={true} className="animate-fade-in-up animate-delay-200">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">
            근로자 관리
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed">
            등록된 근로자 정보를 관리합니다.
          </p>
          <Link to="/workers">
            <Button variant="secondary" className="w-full sm:w-auto">
              근로자 목록 보기
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
};
