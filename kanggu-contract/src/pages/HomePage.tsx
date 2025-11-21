import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { PatchNotesSection } from '../components/common/PatchNotesSection';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold">
        강구토건 근로계약서 자동화 시스템
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <Card className="p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
            계약서 생성
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
            새로운 근로계약서를 생성합니다.
          </p>
          <Link to="/create-contract">
            <Button className="w-full sm:w-auto">계약서 생성 시작</Button>
          </Link>
        </Card>

        <Card className="p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
            근로자 관리
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
            등록된 근로자 정보를 관리합니다.
          </p>
          <Link to="/workers">
            <Button variant="secondary" className="w-full sm:w-auto">
              근로자 목록 보기
            </Button>
          </Link>
        </Card>
      </div>

      <PatchNotesSection />
    </div>
  );
};
