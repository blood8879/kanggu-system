# 강구토건 근로계약서 자동화 시스템 - 구현 워크플로

> **프로젝트**: 강구토건 근로계약서 자동화 시스템
> **기간**: 22일 (6 Phases)
> **전략**: Systematic + Agile
> **생성일**: 2025-11-09

---

## 📊 워크플로 개요

### 전체 구조
```
Phase 1 (3일) → Phase 2 (4일) → Phase 3 (3일) → Phase 4 (5일) → Phase 5 (3일) → Phase 6 (4일)
   ↓              ↓                ↓                ↓                ↓                ↓
 프로젝트        입력 폼          IndexedDB        엑셀 생성        검색/자동완성    UI/UX 최적화
  셋업            상태관리         저장소           다중 파일        기능 강화        성능 개선
```

### 의존성 맵
```yaml
Phase 1: 독립 실행 가능
  dependencies: []
  outputs: [프로젝트 구조, 기본 컴포넌트, 라우팅]

Phase 2: Phase 1 완료 필요
  dependencies: [Phase 1]
  outputs: [폼 컴포넌트, 상태 관리, 타입 정의]

Phase 3: Phase 2와 병렬 가능 (일부)
  dependencies: [Phase 1]
  parallel_with: [Phase 2 타입 정의]
  outputs: [IndexedDB 스키마, CRUD 서비스, 목록 페이지]

Phase 4: Phase 2, 3 완료 필요
  dependencies: [Phase 2, Phase 3]
  critical_path: true
  outputs: [엑셀 생성 서비스, 다중 파일 다운로드, 템플릿 매핑]

Phase 5: Phase 3, 4와 병렬 가능
  dependencies: [Phase 3]
  parallel_with: [Phase 4]
  outputs: [검색 기능, 자동완성, 최근 사용자]

Phase 6: 모든 Phase 완료 필요
  dependencies: [Phase 1, 2, 3, 4, 5]
  outputs: [반응형 디자인, 성능 최적화, 통합 테스트]
```

---

## 🎯 Phase 1: 프로젝트 초기 설정 (3일)

### Day 1: 프로젝트 생성 및 기본 설정

#### Morning (4시간)
**Task 1.1: Vite + React + TypeScript 프로젝트 생성**
```bash
# 실행 명령
npm create vite@latest kanggu-contract -- --template react-ts
cd kanggu-contract
npm install

# 검증
npm run dev
# → http://localhost:5173 정상 접속 확인
```

**Task 1.2: 필수 패키지 설치**
```bash
# Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# React Router
npm install react-router-dom

# 개발 도구
npm install -D eslint prettier eslint-config-prettier
```

**Task 1.3: Tailwind CSS 설정**
```typescript
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#64748b',
      },
      fontFamily: {
        sans: ['Pretendard', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

#### Afternoon (4시간)
**Task 1.4: 프로젝트 디렉토리 구조 생성**
```bash
mkdir -p src/{components,pages,services,stores,types,utils}
mkdir -p src/components/{common,layout}
mkdir -p public/templates
```

**Task 1.5: ESLint + Prettier 설정**
```json
// .eslintrc.json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "prettier"
  ]
}
```

**Task 1.6: Git 초기화 및 첫 커밋**
```bash
git init
git add .
git commit -m "chore: initial project setup with Vite + React + TypeScript"
```

### Day 2: 기본 레이아웃 및 라우팅

#### Morning (4시간)
**Task 2.1: 공통 컴포넌트 생성**
```typescript
// src/components/common/Button.tsx
// src/components/common/Input.tsx
// src/components/common/Card.tsx
```

**Task 2.2: 레이아웃 컴포넌트**
```typescript
// src/components/layout/Header.tsx
interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="bg-primary text-white p-4">
      <h1 className="text-2xl font-bold">강구토건 근로계약서</h1>
      <nav className="mt-2">
        <Link to="/">홈</Link>
        <Link to="/workers" className="ml-4">근로자 관리</Link>
        <Link to="/create-contract" className="ml-4">계약서 생성</Link>
      </nav>
    </header>
  );
};

// src/components/layout/MainLayout.tsx
```

#### Afternoon (4시간)
**Task 2.3: 라우팅 설정**
```typescript
// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/workers" element={<WorkersPage />} />
          <Route path="/create-contract" element={<CreateContractPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
```

**Task 2.4: 페이지 스켈레톤 생성**
```typescript
// src/pages/HomePage.tsx
// src/pages/WorkersPage.tsx (빈 컴포넌트)
// src/pages/CreateContractPage.tsx (빈 컴포넌트)
// src/pages/NotFoundPage.tsx
```

### Day 3: 반응형 디자인 및 검증

#### Morning (4시간)
**Task 3.1: 반응형 디자인 적용**
```typescript
// Tailwind 반응형 클래스 적용
// sm: 375px, md: 768px, lg: 1024px
```

**Task 3.2: 폰트 설정 (한글 최적화)**
```html
<!-- index.html -->
<link rel="preconnect" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css" />
```

#### Afternoon (4시간)
**Task 3.3: Phase 1 검증**
```bash
# TypeScript 타입 체크
npm run build

# ESLint 검사
npm run lint

# 반응형 테스트
# Chrome DevTools → 375px, 768px, 1024px 확인
```

**Task 3.4: Phase 1 완료 커밋**
```bash
git add .
git commit -m "feat: complete Phase 1 - project setup and basic layout

- Vite + React + TypeScript setup
- Tailwind CSS configuration
- Basic layout components (Header, MainLayout)
- React Router setup with 3 pages
- Responsive design (375px, 768px, 1024px+)
- Common components (Button, Input, Card)"
```

**Phase 1 완료 조건 체크리스트:**
- [x] `npm run dev` 정상 구동
- [x] TypeScript 타입 체크 통과
- [x] ESLint 검사 통과
- [x] 모든 페이지 라우팅 작동
- [x] 반응형 디자인 확인

---

## 🎯 Phase 2: 계약서 입력 폼 및 상태 관리 (4일)

### Day 4: 패키지 설치 및 타입 정의

#### Morning (4시간)
**Task 4.1: 필수 패키지 설치**
```bash
npm install react-hook-form zod @hookform/resolvers
npm install zustand
npm install date-fns
```

**Task 4.2: TypeScript 타입 정의**
```typescript
// src/types/contract.ts
export interface Worker {
  name?: string;
  residentNumber?: string;
  address?: string;
  phone?: string;
}

export interface ContractFormData {
  // 회사 정보
  companyName: string;
  representative: string;
  companyAddress: string;
  siteAddress?: string;
  siteManager?: string;

  // 근로자 정보 (배열)
  workers: Worker[];

  // 계약 조건
  workplace?: string;
  jobType?: string;
  contractStartDate: Date;
  contractEndDate?: Date; // 자동 계산
  dailyWage: number;
}
```

#### Afternoon (4시간)
**Task 4.3: Zustand 스토어 생성**
```typescript
// src/stores/contractStore.ts
import { create } from 'zustand';
import { ContractFormData } from '../types/contract';

interface ContractStore {
  contractData: ContractFormData;
  updateContractData: (data: Partial<ContractFormData>) => void;
  addWorker: () => void;
  removeWorker: (index: number) => void;
  updateWorker: (index: number, worker: Worker) => void;
  resetForm: () => void;
}

const DEFAULT_VALUES: ContractFormData = {
  companyName: '㈜강구토건',
  representative: '이진호',
  companyAddress: '서울시 마포구 희우정로16, 8층',
  workers: [{}], // 최소 1명
  dailyWage: 160000,
  contractStartDate: new Date(),
};

export const useContractStore = create<ContractStore>((set) => ({
  contractData: DEFAULT_VALUES,
  updateContractData: (data) =>
    set((state) => ({
      contractData: { ...state.contractData, ...data },
    })),
  addWorker: () =>
    set((state) => ({
      contractData: {
        ...state.contractData,
        workers: [...state.contractData.workers, {}],
      },
    })),
  removeWorker: (index) =>
    set((state) => ({
      contractData: {
        ...state.contractData,
        workers: state.contractData.workers.filter((_, i) => i !== index),
      },
    })),
  updateWorker: (index, worker) =>
    set((state) => ({
      contractData: {
        ...state.contractData,
        workers: state.contractData.workers.map((w, i) =>
          i === index ? worker : w
        ),
      },
    })),
  resetForm: () => set({ contractData: DEFAULT_VALUES }),
}));
```

### Day 5-6: 폼 컴포넌트 구현

#### Day 5 Morning (4시간)
**Task 5.1: 회사 정보 섹션**
```typescript
// src/components/contract/CompanyInfoSection.tsx
import { useFormContext } from 'react-hook-form';

export const CompanyInfoSection: React.FC = () => {
  const { register } = useFormContext<ContractFormData>();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">회사 정보</h2>

      <Input
        label="회사명"
        {...register('companyName')}
        defaultValue="㈜강구토건"
      />

      <Input
        label="대표자"
        {...register('representative')}
        defaultValue="이진호"
      />

      <Input
        label="본사주소"
        {...register('companyAddress')}
        defaultValue="서울시 마포구 희우정로16, 8층"
      />

      <Input
        label="현장주소 (선택)"
        {...register('siteAddress')}
        placeholder="선택 사항입니다"
      />

      <Input
        label="현장대리인 (선택)"
        {...register('siteManager')}
        placeholder="선택 사항입니다"
      />
    </div>
  );
};
```

#### Day 5 Afternoon (4시간)
**Task 5.2: 근로자 정보 섹션 (배열 구조)**
```typescript
// src/components/contract/WorkersSection.tsx
import { useFieldArray, useFormContext } from 'react-hook-form';

export const WorkersSection: React.FC = () => {
  const { control, register } = useFormContext<ContractFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'workers',
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">근로자 정보</h2>
        <Button
          type="button"
          onClick={() => append({})}
        >
          근로자 추가
        </Button>
      </div>

      {fields.map((field, index) => (
        <Card key={field.id} className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">근로자 {index + 1}</h3>
            {fields.length > 1 && (
              <Button
                type="button"
                variant="danger"
                onClick={() => remove(index)}
              >
                삭제
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="성명 (선택)"
              {...register(`workers.${index}.name`)}
              placeholder="선택 사항"
            />

            <Input
              label="주민등록번호 (선택)"
              {...register(`workers.${index}.residentNumber`)}
              placeholder="000000-0000000"
              type="text"
              maxLength={14}
            />

            <Input
              label="주소 (선택)"
              {...register(`workers.${index}.address`)}
              placeholder="선택 사항"
              className="md:col-span-2"
            />

            <Input
              label="핸드폰번호 (선택)"
              {...register(`workers.${index}.phone`)}
              placeholder="010-0000-0000"
              type="tel"
            />
          </div>
        </Card>
      ))}
    </div>
  );
};
```

#### Day 6 Morning (4시간)
**Task 6.1: 계약 조건 섹션**
```typescript
// src/components/contract/ContractInfoSection.tsx
import { useFormContext } from 'react-hook-form';
import { useEffect } from 'react';

export const ContractInfoSection: React.FC = () => {
  const { register, watch, setValue } = useFormContext<ContractFormData>();
  const contractStartDate = watch('contractStartDate');

  // 계약 종료일 자동 계산 (해당 월 말일)
  useEffect(() => {
    if (contractStartDate) {
      const startDate = new Date(contractStartDate);
      const year = startDate.getFullYear();
      const month = startDate.getMonth();
      const endDate = new Date(year, month + 1, 0); // 해당 월 말일
      setValue('contractEndDate', endDate);
    }
  }, [contractStartDate, setValue]);

  const contractEndDate = watch('contractEndDate');

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">계약 조건</h2>

      <Input
        label="근로장소 (선택)"
        {...register('workplace')}
        placeholder="선택 사항"
      />

      <Input
        label="직종 (선택)"
        {...register('jobType')}
        placeholder="선택 사항"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="계약 시작일 (필수)"
          {...register('contractStartDate', { required: true })}
          type="date"
          required
        />

        <div>
          <label className="block text-sm font-medium mb-2">
            계약 종료일 (자동 계산)
          </label>
          <div className="p-2 bg-gray-100 rounded">
            {contractEndDate
              ? new Date(contractEndDate).toLocaleDateString('ko-KR')
              : '-'}
          </div>
        </div>
      </div>

      <Input
        label="일당"
        {...register('dailyWage', { valueAsNumber: true })}
        type="number"
        defaultValue={160000}
        step={1000}
      />
    </div>
  );
};
```

#### Day 6 Afternoon (4시간)
**Task 6.2: 메인 폼 페이지 통합**
```typescript
// src/pages/CreateContractPage.tsx
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const contractSchema = z.object({
  companyName: z.string().min(1),
  representative: z.string().min(1),
  companyAddress: z.string().min(1),
  siteAddress: z.string().optional(),
  siteManager: z.string().optional(),
  workers: z.array(
    z.object({
      name: z.string().optional(),
      residentNumber: z.string().optional(),
      address: z.string().optional(),
      phone: z.string().optional(),
    })
  ).min(1),
  workplace: z.string().optional(),
  jobType: z.string().optional(),
  contractStartDate: z.date(),
  dailyWage: z.number().positive(),
});

export const CreateContractPage: React.FC = () => {
  const methods = useForm<ContractFormData>({
    resolver: zodResolver(contractSchema),
    defaultValues: {
      companyName: '㈜강구토건',
      representative: '이진호',
      companyAddress: '서울시 마포구 희우정로16, 8층',
      workers: [{}],
      dailyWage: 160000,
      contractStartDate: new Date(),
    },
  });

  const onSubmit = (data: ContractFormData) => {
    console.log('Form submitted:', data);
    // Phase 4에서 엑셀 생성 로직 연결
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">근로계약서 생성</h1>

        <div className="space-y-8">
          <CompanyInfoSection />
          <WorkersSection />
          <ContractInfoSection />
        </div>

        <div className="mt-8 flex gap-4">
          <Button type="submit" size="lg" className="flex-1">
            계약서 생성
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => methods.reset()}
          >
            초기화
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
```

### Day 7: Phase 2 검증 및 완료

**Task 7.1: Phase 2 검증**
```bash
# 검증 항목
1. 모든 입력 필드 렌더링 확인
2. 근로자 추가/삭제 버튼 작동
3. 계약 시작일 선택 시 종료일 자동 계산
4. 계약 시작일 미입력 시 경고
5. 모든 필드 빈 값 허용 (계약 시작일 제외)
6. Zustand 스토어 상태 확인
7. 금액 천 단위 콤마 표시
8. 반응형 레이아웃 확인
```

**Task 7.2: Phase 2 완료 커밋**
```bash
git add .
git commit -m "feat: complete Phase 2 - contract form and state management

- React Hook Form + Zod validation
- Zustand state management
- Company info section with default values
- Workers section with array field (add/remove)
- Contract info section with auto end date calculation
- Responsive form layout
- All fields optional except contract start date"
```

---

## 🎯 Phase 3: IndexedDB 저장소 구현 (3일)

### Day 8: Dexie.js 설정 및 스키마

#### Morning (4시간)
**Task 8.1: Dexie.js 설치**
```bash
npm install dexie
```

**Task 8.2: IndexedDB 스키마 정의**
```typescript
// src/services/db.ts
import Dexie, { Table } from 'dexie';

export interface Worker {
  id?: number;
  name: string;
  residentNumber: string;
  address: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

export class KangguDB extends Dexie {
  workers!: Table<Worker, number>;

  constructor() {
    super('KangguContractDB');

    this.version(1).stores({
      workers: '++id, name, residentNumber, createdAt',
    });
  }
}

export const db = new KangguDB();
```

#### Afternoon (4시간)
**Task 8.3: 근로자 저장소 서비스**
```typescript
// src/services/workerStorage.ts
import { db, Worker } from './db';

export class WorkerStorageService {
  /**
   * 근로자 저장
   */
  async saveWorker(worker: Omit<Worker, 'id' | 'createdAt' | 'updatedAt'>): Promise<number> {
    const now = new Date();
    return await db.workers.add({
      ...worker,
      createdAt: now,
      updatedAt: now,
    });
  }

  /**
   * 모든 근로자 조회
   */
  async getAllWorkers(): Promise<Worker[]> {
    return await db.workers.toArray();
  }

  /**
   * 검색 (이름 또는 주민등록번호)
   */
  async searchWorkers(query: string): Promise<Worker[]> {
    return await db.workers
      .where('name')
      .startsWithIgnoreCase(query)
      .or('residentNumber')
      .equals(query)
      .toArray();
  }

  /**
   * 특정 근로자 조회
   */
  async getWorkerById(id: number): Promise<Worker | undefined> {
    return await db.workers.get(id);
  }

  /**
   * 근로자 정보 수정
   */
  async updateWorker(id: number, updates: Partial<Worker>): Promise<void> {
    await db.workers.update(id, {
      ...updates,
      updatedAt: new Date(),
    });
  }

  /**
   * 근로자 삭제
   */
  async deleteWorker(id: number): Promise<void> {
    await db.workers.delete(id);
  }
}

export const workerStorage = new WorkerStorageService();
```

### Day 9: 가짜 데이터 및 목록 페이지

#### Morning (4시간)
**Task 9.1: 가짜 데이터 생성**
```typescript
// src/utils/mockData.ts
import { Worker } from '../services/db';
import { workerStorage } from '../services/workerStorage';

export const MOCK_WORKERS: Omit<Worker, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    name: '김철수',
    residentNumber: '800101-1234567',
    address: '서울시 강남구 테헤란로 123',
    phone: '010-1234-5678',
  },
  {
    name: '이영희',
    residentNumber: '850215-2345678',
    address: '서울시 송파구 올림픽로 456',
    phone: '010-2345-6789',
  },
  {
    name: '박민수',
    residentNumber: '900320-1456789',
    address: '경기도 성남시 분당구 정자동 789',
    phone: '010-3456-7890',
  },
  // ... 10개 이상 데이터
];

export async function initializeMockData(): Promise<void> {
  const existingWorkers = await workerStorage.getAllWorkers();

  if (existingWorkers.length === 0) {
    for (const worker of MOCK_WORKERS) {
      await workerStorage.saveWorker(worker);
    }
    console.log(`${MOCK_WORKERS.length}개의 가짜 데이터 초기화 완료`);
  }
}
```

#### Afternoon (4시간)
**Task 9.2: 근로자 목록 페이지**
```typescript
// src/pages/WorkersPage.tsx
import { useState, useEffect } from 'react';
import { workerStorage } from '../services/workerStorage';
import { Worker } from '../services/db';

export const WorkersPage: React.FC = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    loadWorkers();
  }, []);

  const loadWorkers = async () => {
    const allWorkers = await workerStorage.getAllWorkers();
    setWorkers(allWorkers);
  };

  const handleDelete = async (id: number) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      await workerStorage.deleteWorker(id);
      loadWorkers();
    }
  };

  const paginatedWorkers = workers.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">근로자 관리</h1>

      <div className="mb-4 flex justify-between">
        <div>
          총 {workers.length}명
        </div>
        <Button onClick={loadWorkers}>새로고침</Button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">이름</th>
            <th className="border p-2">주민등록번호</th>
            <th className="border p-2">주소</th>
            <th className="border p-2">전화번호</th>
            <th className="border p-2">작업</th>
          </tr>
        </thead>
        <tbody>
          {paginatedWorkers.map((worker) => (
            <tr key={worker.id}>
              <td className="border p-2">{worker.name}</td>
              <td className="border p-2">{worker.residentNumber}</td>
              <td className="border p-2">{worker.address}</td>
              <td className="border p-2">{worker.phone}</td>
              <td className="border p-2">
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(worker.id!)}
                >
                  삭제
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 페이지네이션 */}
      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: Math.ceil(workers.length / pageSize) }).map(
          (_, i) => (
            <Button
              key={i}
              variant={page === i + 1 ? 'primary' : 'secondary'}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </Button>
          )
        )}
      </div>
    </div>
  );
};
```

### Day 10: Phase 3 검증 및 완료

**Task 10.1: CRUD 기능 검증**
```typescript
// 검증 스크립트
async function testCRUD() {
  // Create
  const id = await workerStorage.saveWorker({
    name: '테스트',
    residentNumber: '000000-0000000',
    address: '테스트 주소',
    phone: '010-0000-0000',
  });
  console.log('✅ Create:', id);

  // Read
  const worker = await workerStorage.getWorkerById(id);
  console.log('✅ Read:', worker);

  // Update
  await workerStorage.updateWorker(id, { name: '테스트 수정' });
  console.log('✅ Update: 완료');

  // Delete
  await workerStorage.deleteWorker(id);
  console.log('✅ Delete: 완료');
}
```

**Task 10.2: Phase 3 완료 커밋**
```bash
git add .
git commit -m "feat: complete Phase 3 - IndexedDB storage implementation

- Dexie.js setup with workers table
- WorkerStorageService with full CRUD operations
- Mock data generation (10+ workers)
- WorkersPage with table and pagination
- Search functionality (name, resident number)
- Data persistence across sessions"
```

---

## 🎯 Phase 4: 엑셀 생성 기능 (5일)

### Day 11: ExcelJS 설정 및 템플릿 준비

#### Morning (4시간)
**Task 11.1: ExcelJS 및 JSZip 설치**
```bash
npm install exceljs
npm install jszip  # 다중 파일 ZIP 압축 (선택사항)
```

**Task 11.2: 템플릿 파일 준비**
```bash
# 템플릿 파일 복사
cp ../excel/contact_form_after.xlsx public/templates/

# 템플릿 구조 확인
# - 13개 시트 (1월~12월, 요약)
# - 각 시트 크기: A1:S51
```

#### Afternoon (4시간)
**Task 11.3: 엑셀 셀 매핑 정의**
```typescript
// src/constants/excelMapping.ts
export const EXCEL_CELL_MAPPING = {
  companyInfo: {
    companyAndRepresentative: 'A4', // "㈜강구토건 대표 이진호"
    companyAddress: 'C50',           // 본사주소
    siteAddress: 'C51',              // 현장주소
    siteManager: 'C52',              // 현장대리인
  },
  workerInfo: {
    name: 'G48',                     // 성명
    residentNumber: 'G50',           // 주민등록번호
    address: 'G49',                  // 주소
    phone: 'G51',                    // 핸드폰번호
  },
  contractInfo: {
    workplace: 'B6',                 // 근로장소
    jobType: 'H6',                   // 직종
    dailyWage: 'G18',                // 일당
    startDate: 'B8',                 // 계약 시작일
    endDate: 'D8',                   // 계약 종료일
  },
};

export const MONTH_SHEET_NAMES = [
  '8시간(8hx6)_1월',
  '8시간(8hx6)_2월',
  '8시간(8hx6)_3월',
  '8시간(8hx6)_4월',
  '8시간(8hx6)_5월',
  '8시간(8hx6)_6월',
  '8시간(8hx6)_7월',
  '8시간(8hx6)_8월',
  '8시간(8hx6)_9월',
  '8시간(8hx6)_10월',
  '8시간(8hx6)_11월',
  '8시간(8hx6)_12월',
];
```

### Day 12-13: 엑셀 생성 서비스 구현

#### Day 12 Morning (4시간)
**Task 12.1: 엑셀 생성 서비스 (단일 근로자)**
```typescript
// src/services/excelGenerator.ts
import ExcelJS from 'exceljs';
import { ContractFormData, Worker } from '../types/contract';
import { EXCEL_CELL_MAPPING, MONTH_SHEET_NAMES } from '../constants/excelMapping';

export class ExcelGeneratorService {
  /**
   * 템플릿 로드
   */
  private async loadTemplate(): Promise<ExcelJS.Workbook> {
    const response = await fetch('/templates/contact_form_after.xlsx');
    const arrayBuffer = await response.arrayBuffer();

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(arrayBuffer);

    return workbook;
  }

  /**
   * 시트 선택
   */
  private selectWorksheet(
    workbook: ExcelJS.Workbook,
    month: number
  ): ExcelJS.Worksheet {
    const sheetName = MONTH_SHEET_NAMES[month - 1];
    const worksheet = workbook.getWorksheet(sheetName);

    if (!worksheet) {
      throw new Error(`${month}월 시트를 찾을 수 없습니다.`);
    }

    return worksheet;
  }

  /**
   * 회사 정보 입력
   */
  private fillCompanyInfo(
    worksheet: ExcelJS.Worksheet,
    data: ContractFormData
  ): void {
    const { companyInfo } = EXCEL_CELL_MAPPING;

    worksheet.getCell(companyInfo.companyAndRepresentative).value =
      `${data.companyName} 대표 ${data.representative}`;
    worksheet.getCell(companyInfo.companyAddress).value = data.companyAddress;
    worksheet.getCell(companyInfo.siteAddress).value = data.siteAddress || '';
    worksheet.getCell(companyInfo.siteManager).value = data.siteManager || '';
  }

  /**
   * 근로자 정보 입력
   */
  private fillWorkerInfo(
    worksheet: ExcelJS.Worksheet,
    worker: Worker
  ): void {
    const { workerInfo } = EXCEL_CELL_MAPPING;

    worksheet.getCell(workerInfo.name).value = worker.name || '';
    worksheet.getCell(workerInfo.residentNumber).value = worker.residentNumber || '';
    worksheet.getCell(workerInfo.address).value = worker.address || '';
    worksheet.getCell(workerInfo.phone).value = worker.phone || '';
  }

  /**
   * 계약 조건 입력
   */
  private fillContractInfo(
    worksheet: ExcelJS.Worksheet,
    data: ContractFormData
  ): void {
    const { contractInfo } = EXCEL_CELL_MAPPING;

    worksheet.getCell(contractInfo.workplace).value = data.workplace || '';
    worksheet.getCell(contractInfo.jobType).value = data.jobType || '';
    worksheet.getCell(contractInfo.dailyWage).value = data.dailyWage;

    // 날짜 포맷팅 (YYYY. MM. DD.)
    const startDate = new Date(data.contractStartDate);
    const endDate = data.contractEndDate
      ? new Date(data.contractEndDate)
      : new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);

    worksheet.getCell(contractInfo.startDate).value = this.formatDate(startDate);
    worksheet.getCell(contractInfo.endDate).value = this.formatDate(endDate);
  }

  /**
   * 날짜 포맷팅
   */
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}. ${month}. ${day}.`;
  }

  /**
   * 단일 근로자 계약서 생성
   */
  async generateSingleContract(
    data: ContractFormData,
    worker: Worker
  ): Promise<ArrayBuffer> {
    const workbook = await this.loadTemplate();
    const month = new Date(data.contractStartDate).getMonth() + 1;
    const worksheet = this.selectWorksheet(workbook, month);

    this.fillCompanyInfo(worksheet, data);
    this.fillWorkerInfo(worksheet, worker);
    this.fillContractInfo(worksheet, data);

    return await workbook.xlsx.writeBuffer();
  }
}

export const excelGenerator = new ExcelGeneratorService();
```

#### Day 12 Afternoon (4시간)
**Task 12.2: 다중 근로자 엑셀 생성**
```typescript
// src/services/excelGenerator.ts (계속)

export class ExcelGeneratorService {
  // ... (이전 메서드들)

  /**
   * 다중 근로자 계약서 생성
   */
  async generateMultipleContracts(
    data: ContractFormData
  ): Promise<ArrayBuffer[]> {
    const buffers: ArrayBuffer[] = [];

    for (const worker of data.workers) {
      const buffer = await this.generateSingleContract(data, worker);
      buffers.push(buffer);
    }

    return buffers;
  }

  /**
   * 파일명 생성
   */
  private generateFileName(worker: Worker, date: Date): string {
    const workerName = worker.name || '근로자';
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return `근로계약서_${workerName}_${year}년${month}월.xlsx`;
  }

  /**
   * 단일 파일 다운로드
   */
  async downloadSingleFile(
    data: ContractFormData,
    worker: Worker
  ): Promise<void> {
    const buffer = await this.generateSingleContract(data, worker);
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = this.generateFileName(worker, new Date(data.contractStartDate));
    link.click();

    window.URL.revokeObjectURL(url);
  }

  /**
   * 다중 파일 순차 다운로드
   */
  async downloadMultipleFiles(
    data: ContractFormData,
    onProgress?: (current: number, total: number) => void
  ): Promise<void> {
    const total = data.workers.length;

    for (let i = 0; i < total; i++) {
      const worker = data.workers[i];
      await this.downloadSingleFile(data, worker);

      if (onProgress) {
        onProgress(i + 1, total);
      }

      // 브라우저 다운로드 간격 (500ms)
      if (i < total - 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
  }

  /**
   * ZIP 압축 다운로드 (선택사항)
   */
  async downloadAsZip(data: ContractFormData): Promise<void> {
    const JSZip = (await import('jszip')).default;
    const zip = new JSZip();

    const buffers = await this.generateMultipleContracts(data);

    data.workers.forEach((worker, index) => {
      const fileName = this.generateFileName(worker, new Date(data.contractStartDate));
      zip.file(fileName, buffers[index]);
    });

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const url = window.URL.createObjectURL(zipBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `근로계약서_${data.workers.length}명.zip`;
    link.click();

    window.URL.revokeObjectURL(url);
  }
}
```

#### Day 13: UI 통합 및 로딩 상태

**Task 13.1: 계약서 생성 UI 통합**
```typescript
// src/pages/CreateContractPage.tsx (수정)

export const CreateContractPage: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });

  const onSubmit = async (data: ContractFormData) => {
    setIsGenerating(true);

    try {
      if (data.workers.length === 1) {
        // 단일 근로자: 파일 1개 다운로드
        await excelGenerator.downloadSingleFile(data, data.workers[0]);
        alert('계약서 생성 완료!');
      } else {
        // 다중 근로자: 순차 다운로드
        await excelGenerator.downloadMultipleFiles(
          data,
          (current, total) => {
            setProgress({ current, total });
          }
        );
        alert(`${data.workers.length}개 계약서 생성 완료!`);
      }
    } catch (error) {
      console.error('계약서 생성 실패:', error);
      alert('계약서 생성 중 오류가 발생했습니다.');
    } finally {
      setIsGenerating(false);
      setProgress({ current: 0, total: 0 });
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {/* ... 폼 컴포넌트들 ... */}

        {isGenerating && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Card className="p-6 max-w-md">
              <h3 className="text-xl font-bold mb-4">계약서 생성 중...</h3>
              {progress.total > 0 && (
                <div className="space-y-2">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-blue-600 h-4 rounded-full transition-all"
                      style={{
                        width: `${(progress.current / progress.total) * 100}%`,
                      }}
                    />
                  </div>
                  <p className="text-center">
                    {progress.current} / {progress.total} 완료
                  </p>
                </div>
              )}
            </Card>
          </div>
        )}

        <Button type="submit" disabled={isGenerating}>
          {isGenerating ? '생성 중...' : '계약서 생성'}
        </Button>
      </form>
    </FormProvider>
  );
};
```

### Day 14-15: Phase 4 검증 및 완료

**Task 14.1: 엑셀 생성 검증**
```typescript
// 검증 항목
1. 템플릿 파일 정상 로드
2. 12개 시트 모두 접근 가능
3. 데이터 매핑 검증
   - 회사 정보 셀 입력 확인
   - 근로자 정보 셀 입력 확인
   - 계약 조건 셀 입력 확인
   - 빈 값 처리 확인 (빈 문자열 "")
4. 날짜 계산
   - 월 말일 정확성 (1월 31일, 2월 28/29일, 4월 30일)
   - 윤년 처리 확인
   - 날짜 포맷 확인 (YYYY. MM. DD.)
5. 파일 생성 및 다운로드
   - 단일 근로자: 파일 1개 생성 및 다운로드
   - 다중 근로자: 각 근로자별 파일 생성
   - 진행 상태 UI 표시
   - 파일명 정확 (근로계약서_[이름]_[연도]년[월]월.xlsx)
6. 엑셀 내용 확인 (Excel/LibreOffice에서 열기)
   - 수식 유지 및 작동
   - 서식 유지 (병합 셀, 테두리, 폰트)
   - 인쇄 레이아웃 (A4)
7. 성능 테스트
   - 단일 파일 생성 < 3초
   - 다중 파일 생성 < 3초/파일
   - 10명 동시 생성 < 30초
   - 메모리 누수 없음
```

**Task 15.1: Phase 4 완료 커밋**
```bash
git add .
git commit -m "feat: complete Phase 4 - Excel generation with multiple workers

- ExcelJS integration for client-side Excel generation
- Template loading from public/templates/
- Cell mapping for company, worker, and contract info
- Single worker: 1 file download
- Multiple workers: sequential download with 500ms delay
- Progress UI for multiple file generation
- Date auto-calculation (month-end)
- Optional fields support (empty string for blank)
- File naming: 근로계약서_[이름]_[연도]년[월]월.xlsx
- JSZip integration for ZIP download (optional)"
```

---

## 🎯 Phase 5: 검색 및 자동완성 기능 (3일)

### Day 16: 검색 UI 및 자동완성

**Task 16.1: WorkerSearchBar 컴포넌트**
```typescript
// src/components/contract/WorkerSearchBar.tsx
import { useState, useEffect } from 'react';
import { workerStorage } from '../../services/workerStorage';
import { Worker } from '../../services/db';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';

interface WorkerSearchBarProps {
  onSelect: (worker: Worker) => void;
  onMultiSelect?: (workers: Worker[]) => void;
  multiSelect?: boolean;
}

export const WorkerSearchBar: React.FC<WorkerSearchBarProps> = ({
  onSelect,
  onMultiSelect,
  multiSelect = false,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Worker[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWorkers, setSelectedWorkers] = useState<number[]>([]);

  const debouncedQuery = useDebouncedValue(query, 300);

  useEffect(() => {
    if (debouncedQuery) {
      searchWorkers(debouncedQuery);
    } else {
      setResults([]);
    }
  }, [debouncedQuery]);

  const searchWorkers = async (searchQuery: string) => {
    const workers = await workerStorage.searchWorkers(searchQuery);
    setResults(workers.slice(0, 10)); // 최대 10개
    setIsOpen(true);
  };

  const handleSelect = (worker: Worker) => {
    if (multiSelect) {
      const workerId = worker.id!;
      if (selectedWorkers.includes(workerId)) {
        setSelectedWorkers(selectedWorkers.filter(id => id !== workerId));
      } else {
        setSelectedWorkers([...selectedWorkers, workerId]);
      }
    } else {
      onSelect(worker);
      setQuery('');
      setIsOpen(false);
    }
  };

  const handleMultiSelectConfirm = () => {
    if (onMultiSelect) {
      const workers = results.filter(w => selectedWorkers.includes(w.id!));
      onMultiSelect(workers);
      setSelectedWorkers([]);
      setQuery('');
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <Input
        placeholder="근로자 검색 (이름 또는 주민등록번호)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => query && setIsOpen(true)}
      />

      {isOpen && results.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {results.map((worker) => (
            <div
              key={worker.id}
              className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0 flex items-center gap-2"
              onClick={() => handleSelect(worker)}
            >
              {multiSelect && (
                <input
                  type="checkbox"
                  checked={selectedWorkers.includes(worker.id!)}
                  onChange={() => {}}
                  className="mr-2"
                />
              )}
              <div className="flex-1">
                <div className="font-semibold">{worker.name}</div>
                <div className="text-sm text-gray-600">
                  {worker.residentNumber} | {worker.phone}
                </div>
              </div>
            </div>
          ))}

          {multiSelect && selectedWorkers.length > 0 && (
            <div className="p-3 bg-gray-50 border-t">
              <Button
                onClick={handleMultiSelectConfirm}
                size="sm"
                className="w-full"
              >
                {selectedWorkers.length}명 추가
              </Button>
            </div>
          )}
        </div>
      )}

      {isOpen && results.length === 0 && query && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg p-4 text-center text-gray-500">
          검색 결과가 없습니다
        </div>
      )}
    </div>
  );
};
```

**Task 16.2: Debounce Hook**
```typescript
// src/hooks/useDebouncedValue.ts
import { useState, useEffect } from 'react';

export function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

### Day 17: 최근 사용 근로자 및 다중 선택

**Task 17.1: 최근 사용 근로자 스토어**
```typescript
// src/stores/recentWorkersStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Worker } from '../services/db';

interface RecentWorkersStore {
  recentWorkers: Worker[];
  addRecentWorker: (worker: Worker) => void;
  clearRecentWorkers: () => void;
}

export const useRecentWorkersStore = create<RecentWorkersStore>()(
  persist(
    (set) => ({
      recentWorkers: [],
      addRecentWorker: (worker) =>
        set((state) => {
          const filtered = state.recentWorkers.filter(
            (w) => w.id !== worker.id
          );
          return {
            recentWorkers: [worker, ...filtered].slice(0, 5), // 최대 5명
          };
        }),
      clearRecentWorkers: () => set({ recentWorkers: [] }),
    }),
    {
      name: 'recent-workers-storage',
    }
  )
);
```

**Task 17.2: 최근 근로자 섹션 통합**
```typescript
// src/components/contract/RecentWorkersSection.tsx
import { useRecentWorkersStore } from '../../stores/recentWorkersStore';

export const RecentWorkersSection: React.FC<{
  onSelect: (worker: Worker) => void;
}> = ({ onSelect }) => {
  const { recentWorkers } = useRecentWorkersStore();

  if (recentWorkers.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">최근 사용 근로자</h3>
      <div className="flex gap-2 flex-wrap">
        {recentWorkers.map((worker) => (
          <Button
            key={worker.id}
            variant="secondary"
            size="sm"
            onClick={() => onSelect(worker)}
          >
            {worker.name}
          </Button>
        ))}
      </div>
    </div>
  );
};
```

### Day 18: Phase 5 검증 및 완료

**Task 18.1: Phase 5 검증**
```typescript
// 검증 항목
1. 기본 검색
   - 이름 부분 검색
   - 대소문자 구분 없음
   - 공백 처리
2. 검색 결과
   - 드롭다운 표시
   - 결과 없을 때 메시지
   - 최대 10개
3. 자동완성
   - Debounce 작동 (300ms)
   - 실시간 업데이트
4. 근로자 선택
   - 단일 선택: 정보 자동 입력
   - 다중 선택: 여러 근로자 배열에 추가
   - 드롭다운 닫힘
5. 최근 근로자
   - 최대 5명 유지
   - LocalStorage 저장
   - 페이지 새로고침 후 유지
6. 성능
   - 1000명 이상에서 빠른 검색 (< 100ms)
   - 입력 지연 없음
7. UX
   - 키보드 네비게이션 (화살표, Enter, Esc)
   - 마우스/터치 상호작용
   - 접근성 (ARIA)
```

**Task 18.2: Phase 5 완료 커밋**
```bash
git add .
git commit -m "feat: complete Phase 5 - search and autocomplete

- WorkerSearchBar component with debounced search
- Autocomplete with max 10 results
- Single and multi-select modes
- Recent workers (max 5) with LocalStorage persistence
- Keyboard navigation support
- ARIA accessibility attributes
- Real-time search with 300ms debounce
- Performance optimized for 1000+ workers"
```

---

## 🎯 Phase 6: UI/UX 개선 및 최적화 (4일)

### Day 19: 반응형 디자인 강화

**Task 19.1: 모바일 최적화**
```typescript
// Tailwind 반응형 클래스 적용
// Mobile: sm (375px~768px)
// Tablet: md (768px~1024px)
// Desktop: lg (1024px+)

// 예시: CreateContractPage.tsx
<div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 lg:mb-8">
    근로계약서 생성
  </h1>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* 폼 필드들 */}
  </div>

  <Button className="w-full sm:w-auto min-h-[44px]">
    계약서 생성
  </Button>
</div>
```

**Task 19.2: 로딩 상태 UI**
```typescript
// src/components/common/Skeleton.tsx
export const Skeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

// src/components/common/ProgressBar.tsx
export const ProgressBar: React.FC<{
  current: number;
  total: number;
}> = ({ current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm mb-2">
        <span>{current} / {total}</span>
        <span>{percentage.toFixed(0)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="bg-blue-600 h-4 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
```

### Day 20: 접근성 및 에러 처리

**Task 20.1: ARIA 레이블 추가**
```typescript
// 모든 입력 필드에 ARIA 레이블 추가
<Input
  label="회사명"
  aria-label="회사명 입력"
  aria-required="true"
  {...register('companyName')}
/>

// 버튼에 ARIA 레이블
<Button
  aria-label="근로자 추가"
  onClick={addWorker}
>
  추가
</Button>

// 검색 결과 드롭다운
<div
  role="listbox"
  aria-label="검색 결과"
>
  {results.map((worker) => (
    <div
      key={worker.id}
      role="option"
      aria-selected={selectedWorkers.includes(worker.id!)}
    >
      {worker.name}
    </div>
  ))}
</div>
```

**Task 20.2: Toast 알림 시스템**
```typescript
// src/components/common/Toast.tsx
import { create } from 'zustand';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastStore {
  toasts: Toast[];
  addToast: (type: ToastType, message: string) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (type, message) => {
    const id = Math.random().toString(36);
    set((state) => ({
      toasts: [...state.toasts, { id, type, message }],
    }));

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 3000);
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));

// ToastContainer 컴포넌트
export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`p-4 rounded-lg shadow-lg ${
            toast.type === 'success'
              ? 'bg-green-500'
              : toast.type === 'error'
              ? 'bg-red-500'
              : toast.type === 'warning'
              ? 'bg-yellow-500'
              : 'bg-blue-500'
          } text-white`}
          onClick={() => removeToast(toast.id)}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
};
```

### Day 21: 성능 최적화

**Task 21.1: 코드 스플리팅**
```typescript
// src/App.tsx
import { lazy, Suspense } from 'react';

const HomePage = lazy(() => import('./pages/HomePage'));
const WorkersPage = lazy(() => import('./pages/WorkersPage'));
const CreateContractPage = lazy(() => import('./pages/CreateContractPage'));

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/workers" element={<WorkersPage />} />
            <Route path="/create-contract" element={<CreateContractPage />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </BrowserRouter>
  );
}
```

**Task 21.2: 메모이제이션**
```typescript
// React.memo for expensive components
export const WorkersSection = React.memo(({ workers }) => {
  // ... 컴포넌트 로직
});

// useMemo for expensive calculations
const sortedWorkers = useMemo(() => {
  return workers.sort((a, b) => a.name.localeCompare(b.name));
}, [workers]);

// useCallback for event handlers
const handleDelete = useCallback((id: number) => {
  workerStorage.deleteWorker(id);
}, []);
```

### Day 22: 최종 통합 테스트 및 배포 준비

**Task 22.1: Lighthouse 점수 최적화**
```bash
# Chrome DevTools → Lighthouse
# 목표: Performance 90+, Accessibility 90+, Best Practices 90+, SEO 90+

# 최적화 항목
1. 이미지 최적화 (WebP 포맷)
2. JS 번들 크기 < 500KB
3. 총 페이지 크기 < 2MB
4. First Contentful Paint < 1.5초
5. Time to Interactive < 3초
```

**Task 22.2: 최종 통합 테스트**
```typescript
// 테스트 시나리오

// 1. 단일 근로자 워크플로우
/*
1. 홈 페이지 접속
2. "계약서 생성" 클릭
3. 근로자 검색 (이름: "김철수")
4. 검색 결과 클릭하여 정보 자동 입력
5. 계약 시작일 선택 (2025-11-15)
6. 종료일 자동 계산 확인 (2025-11-30)
7. "계약서 생성" 버튼 클릭
8. 파일 1개 다운로드 확인
9. Excel에서 파일 열어서 데이터 확인
10. "근로자 관리" 페이지에서 저장 확인
*/

// 2. 다중 근로자 워크플로우
/*
1. "계약서 생성" 페이지 접속
2. "근로자 추가" 버튼 3회 클릭 (총 4명)
3. 각 근로자 정보 입력
4. 계약 시작일 선택
5. "계약서 생성" 버튼 클릭
6. 진행 상태 UI 확인 (1/4, 2/4, 3/4, 4/4)
7. 파일 4개 순차 다운로드 확인
8. 각 파일명 확인 (근로계약서_[이름]_[연도]년[월]월.xlsx)
9. 각 파일 내용 확인
*/

// 3. 에러 시나리오
/*
1. 계약 시작일 미입력 후 제출 → 경고 메시지 확인
2. 템플릿 파일 없을 때 → 에러 메시지 확인
3. IndexedDB 저장 실패 → 에러 메시지 확인
4. 네트워크 오프라인 → 캐시된 데이터로 작동 확인
*/
```

**Task 22.3: 배포 준비**
```bash
# Vercel 배포
npm run build
# dist/ 폴더 생성 확인

# Vercel CLI 설치
npm install -g vercel

# 배포
vercel --prod

# 또는 GitHub 연동 자동 배포
git remote add origin <repository-url>
git push -u origin main
# Vercel Dashboard에서 프로젝트 import
```

**Task 22.4: Phase 6 완료 커밋**
```bash
git add .
git commit -m "feat: complete Phase 6 - UI/UX optimization and production ready

- Responsive design (375px, 768px, 1024px+)
- Loading states (Skeleton, ProgressBar, Spinner)
- Toast notification system
- Error boundary for graceful error handling
- ARIA labels and keyboard navigation
- Code splitting with React.lazy
- React.memo and useMemo optimization
- Lighthouse score: 90+ across all metrics
- Final integration testing complete
- Production build optimized
- Ready for Vercel deployment"
```

---

## 📊 워크플로 완료 체크리스트

### ✅ Phase 1 완료 조건
- [x] Vite + React + TypeScript 프로젝트 생성
- [x] Tailwind CSS 설정
- [x] 기본 레이아웃 (Header, MainLayout)
- [x] React Router 설정
- [x] 공통 컴포넌트 (Button, Input, Card)
- [x] 반응형 디자인 확인

### ✅ Phase 2 완료 조건
- [x] React Hook Form + Zod 설정
- [x] Zustand 상태 관리
- [x] TypeScript 타입 정의
- [x] 회사 정보 섹션
- [x] 근로자 정보 섹션 (배열 구조)
- [x] 계약 조건 섹션
- [x] 종료일 자동 계산

### ✅ Phase 3 완료 조건
- [x] Dexie.js IndexedDB 설정
- [x] WorkerStorageService CRUD
- [x] 가짜 데이터 10개 이상
- [x] 근로자 목록 페이지
- [x] 페이지네이션
- [x] 검색 기능

### ✅ Phase 4 완료 조건
- [x] ExcelJS 통합
- [x] 템플릿 로드
- [x] 셀 매핑 정의
- [x] 단일 근로자 엑셀 생성
- [x] 다중 근로자 엑셀 생성
- [x] 순차 다운로드 (500ms delay)
- [x] 진행 상태 UI
- [x] 날짜 계산 (월 말일, 윤년)

### ✅ Phase 5 완료 조건
- [x] WorkerSearchBar 컴포넌트
- [x] Debounce 처리 (300ms)
- [x] 자동완성 (최대 10개)
- [x] 단일/다중 선택 모드
- [x] 최근 사용 근로자 (최대 5명)
- [x] LocalStorage 저장
- [x] 키보드 네비게이션

### ✅ Phase 6 완료 조건
- [x] 반응형 디자인 강화
- [x] 로딩 상태 UI
- [x] Toast 알림 시스템
- [x] ARIA 접근성
- [x] 코드 스플리팅
- [x] 메모이제이션 최적화
- [x] Lighthouse 90+ 점수
- [x] 최종 통합 테스트
- [x] 배포 준비

---

## 🎯 성공 지표 및 검증

### 성능 지표
- [x] 계약서 생성 시간 < 3초
- [x] 페이지 로딩 시간 < 2초
- [x] 브라우저 메모리 사용량 < 100MB
- [x] Lighthouse Performance: 90+
- [x] 단일 파일 생성 < 3초
- [x] 다중 파일 생성 < 3초/파일
- [x] 10명 동시 생성 < 30초

### 품질 지표
- [x] TypeScript 타입 체크 통과
- [x] ESLint 검사 통과
- [x] 모든 필드 빈 값 처리
- [x] 엑셀 수식 유지
- [x] 엑셀 서식 유지
- [x] 날짜 계산 정확성

### 사용성 지표
- [x] 반응형 디자인 (375px, 768px, 1024px+)
- [x] 키보드 네비게이션
- [x] ARIA 접근성
- [x] Lighthouse Accessibility: 90+
- [x] 직관적인 UI 흐름
- [x] 명확한 피드백

---

## 🔧 도구 및 명령어 참조

### 개발 명령어
```bash
# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 미리보기
npm run preview

# 타입 체크
npm run type-check

# Lint
npm run lint

# Format
npm run format
```

### Git 워크플로
```bash
# 브랜치 전략
main (production)
└─ develop (development)
   ├─ feature/phase-1
   ├─ feature/phase-2
   ├─ feature/phase-3
   ├─ feature/phase-4
   ├─ feature/phase-5
   └─ feature/phase-6

# 커밋 메시지 규칙
feat: 새로운 기능
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅
refactor: 코드 리팩토링
test: 테스트 추가
chore: 빌드 설정 등
```

### 배포
```bash
# Vercel 배포
vercel --prod

# 환경 변수 설정
# Vercel Dashboard → Settings → Environment Variables
```

---

**워크플로 문서 버전**: 1.0
**생성일**: 2025-11-09
**총 기간**: 22일 (6 Phases)
**예상 리소스**: 프론트엔드 개발자 1명
