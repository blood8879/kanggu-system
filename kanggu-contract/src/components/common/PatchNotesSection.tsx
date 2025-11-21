import React, { useState } from 'react';
import { Card } from './Card';
import { PatchNoteItem } from './PatchNoteItem';
import { patchNotes } from '../../constants/patchNotesData';
import type { PatchNoteCategory } from '../../types/patchNotes';

const categoryLabels: Record<PatchNoteCategory | 'all', string> = {
  all: '전체',
  contract: '계약서 생성',
  worker: '근로자 관리',
  general: '일반',
};

interface PatchNotesSectionProps {
  filterByCategory?: PatchNoteCategory;
  showCategoryFilter?: boolean;
}

export const PatchNotesSection: React.FC<PatchNotesSectionProps> = ({
  filterByCategory,
  showCategoryFilter = true,
}) => {
  const [selectedCategory, setSelectedCategory] =
    useState<PatchNoteCategory | 'all'>(filterByCategory || 'all');

  const filteredNotes = filterByCategory
    ? patchNotes.filter((note) => note.category === filterByCategory)
    : selectedCategory === 'all'
      ? patchNotes
      : patchNotes.filter((note) => note.category === selectedCategory);

  return (
    <Card className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-0">
          패치 노트
        </h2>
        {showCategoryFilter && !filterByCategory && (
          <div className="flex gap-2 overflow-x-auto">
            {(Object.keys(categoryLabels) as Array<PatchNoteCategory | 'all'>).map(
              (category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {categoryLabels[category]}
                </button>
              )
            )}
          </div>
        )}
      </div>

      <div className="space-y-4 max-h-[500px] overflow-y-auto">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note, index) => (
            <PatchNoteItem key={`${note.version}-${index}`} note={note} />
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">
            해당 카테고리의 패치 노트가 없습니다.
          </p>
        )}
      </div>
    </Card>
  );
};
