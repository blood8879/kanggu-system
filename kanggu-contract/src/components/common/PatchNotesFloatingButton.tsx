import React, { useState } from 'react';
import { Modal } from './Modal';
import { PatchNotesSection } from './PatchNotesSection';

export const PatchNotesFloatingButton: React.FC = () => {
  const [isPatchNotesOpen, setIsPatchNotesOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsPatchNotesOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-110 flex items-center justify-center z-40"
        aria-label="패치노트 보기"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
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
      </button>

      {/* Modal */}
      <Modal
        isOpen={isPatchNotesOpen}
        onClose={() => setIsPatchNotesOpen(false)}
        title="패치 노트"
      >
        <PatchNotesSection />
      </Modal>
    </>
  );
};
