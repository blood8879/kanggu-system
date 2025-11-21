import React from 'react';
import type { PatchNote } from '../../types/patchNotes';

interface PatchNoteItemProps {
  note: PatchNote;
}

const typeLabels: Record<PatchNote['type'], string> = {
  feature: '새 기능',
  bugfix: '버그 수정',
  improvement: '개선',
};

const typeColors: Record<PatchNote['type'], string> = {
  feature: 'bg-blue-100 text-blue-800',
  bugfix: 'bg-red-100 text-red-800',
  improvement: 'bg-green-100 text-green-800',
};

const categoryLabels: Record<PatchNote['category'], string> = {
  contract: '계약서 생성',
  worker: '근로자 관리',
  general: '일반',
};

export const PatchNoteItem: React.FC<PatchNoteItemProps> = ({ note }) => {
  return (
    <div className="border-l-4 border-blue-500 pl-4 py-2">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${typeColors[note.type]}`}
        >
          {typeLabels[note.type]}
        </span>
        <span className="text-xs text-gray-500">{categoryLabels[note.category]}</span>
        <span className="text-xs text-gray-400">{note.date}</span>
      </div>
      <h4 className="font-semibold text-sm sm:text-base mb-1">{note.title}</h4>
      <p className="text-xs sm:text-sm text-gray-600">{note.description}</p>
    </div>
  );
};
