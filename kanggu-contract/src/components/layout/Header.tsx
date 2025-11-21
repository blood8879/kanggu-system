import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from '../common/Modal';
import { PatchNotesSection } from '../common/PatchNotesSection';

export const Header: React.FC = () => {
  const [isPatchNotesOpen, setIsPatchNotesOpen] = useState(false);

  return (
    <header className="bg-primary text-white px-2 py-2">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl sm:text-2xl font-bold">강구토건 근로계약서</h1>
          <button
            onClick={() => setIsPatchNotesOpen(true)}
            className="px-3 py-1 bg-white text-primary rounded hover:bg-gray-100 transition-colors text-sm font-medium"
          >
            패치노트
          </button>
        </div>
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

      <Modal
        isOpen={isPatchNotesOpen}
        onClose={() => setIsPatchNotesOpen(false)}
        title="패치 노트"
      >
        <PatchNotesSection />
      </Modal>
    </header>
  );
};
