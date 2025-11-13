import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-gray-600 mb-6">페이지를 찾을 수 없습니다.</p>
      <Link to="/">
        <Button>홈으로 돌아가기</Button>
      </Link>
    </div>
  );
};
