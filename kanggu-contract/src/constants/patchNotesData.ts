import type { PatchNote } from '../types/patchNotes';

export const patchNotes: PatchNote[] = [
  // 2025-11-20 업데이트
  {
    version: '1.3.0',
    date: '2025-11-20',
    category: 'contract',
    title: '작성일 자동 기입 기능 추가',
    description: '계약서 A46 셀에 작성일이 자동으로 기입되도록 개선했습니다.',
    type: 'feature',
  },
  {
    version: '1.3.0',
    date: '2025-11-20',
    category: 'contract',
    title: '작성일 표시 위치 개선',
    description: '작성일 일자의 위치를 우측으로 조정하고 월/일을 중앙 정렬하여 가독성을 향상시켰습니다.',
    type: 'improvement',
  },
  // 2025-11-16 업데이트
  {
    version: '1.2.1',
    date: '2025-11-16',
    category: 'contract',
    title: '인쇄 영역 1페이지 맞춤 설정 수정',
    description: '인쇄 시 전체 계약서 영역이 1페이지에 완전히 맞도록 설정을 수정했습니다.',
    type: 'improvement',
  },
  // 2025-11-15 업데이트
  {
    version: '1.2.0',
    date: '2025-11-15',
    category: 'contract',
    title: '인쇄 영역 한 페이지 맞춤 설정',
    description: '계약서 인쇄 시 한 페이지에 맞춤 설정을 추가하여 출력 품질을 개선했습니다.',
    type: 'feature',
  },
  {
    version: '1.2.0',
    date: '2025-11-15',
    category: 'contract',
    title: '계약 종료일 유효성 검증 오류 수정',
    description: '계약 종료일 입력 필드의 유효성 검증 오류를 완전히 해결했습니다.',
    type: 'bugfix',
  },
  {
    version: '1.2.0',
    date: '2025-11-15',
    category: 'contract',
    title: '날짜 입력 필드 오류 수정',
    description: 'Invalid Date 오류를 수정하여 날짜 입력의 안정성을 개선했습니다.',
    type: 'bugfix',
  },
  {
    version: '1.2.0',
    date: '2025-11-15',
    category: 'contract',
    title: '폼 제출 오류 수정',
    description: 'JSON 순환 참조 에러 및 NaN 유효성 검증 오류를 수정했습니다.',
    type: 'bugfix',
  },
  {
    version: '1.1.0',
    date: '2025-11-15',
    category: 'worker',
    title: '근로자별 개별 계약 조건 설정',
    description: '각 근로자마다 다른 계약 조건을 개별적으로 설정할 수 있는 기능을 추가했습니다.',
    type: 'feature',
  },
  {
    version: '1.1.0',
    date: '2025-11-15',
    category: 'worker',
    title: '근로자 이름 셀 처리 개선',
    description: '근로자 이름 필드의 셀 처리를 개선하고 행 높이를 조정하여 레이아웃을 개선했습니다.',
    type: 'improvement',
  },
];

// 카테고리별 필터링 함수
export const getPatchNotesByCategory = (category: PatchNote['category']) => {
  return patchNotes.filter((note) => note.category === category);
};

// 최신 패치노트 가져오기
export const getLatestPatchNotes = (limit: number = 5) => {
  return patchNotes.slice(0, limit);
};
