# PRD: 강구토건 근로계약서 자동화 시스템

## 1. 문제 정의

### 현재 상황
- (주)강구토건에서는 신규 일용직 근로자가 올 때마다 근로계약서를 작성
- 기존 출근하던 일용직 근로자들도 매달 1일이 되면 계약서를 신규 작성 필요
- 수기로 작성해야 할 항목이 많아 시간 소요 및 오류 발생 가능성 존재

### 핵심 문제
- **반복 근로자의 계약서 작성 시간 낭비**: 이전 출근 이력이 있는 근로자의 경우에도 매달 동일한 정보를 반복 입력
- **수기 작성의 비효율성**: 복잡한 엑셀 양식에 수기로 정보를 입력하는 과정이 비효율적
- **오류 발생 가능성**: 수기 입력 과정에서 정보 누락 또는 오입력 가능성

## 2. 타겟 사용자

### Primary Users
- **현장 관리자**: 근로계약서를 작성하고 관리하는 담당자
- **일용직 근로자**: 계약서에 서명하고 정보를 제공하는 근로자

### User Characteristics
- IT 리터러시가 높지 않을 수 있음
- 빠르고 간단한 프로세스 선호
- 모바일 접근성 필요

## 3. 제안 해결책

### 핵심 기능
1. **웹 기반 입력 폼**: 직관적인 UI에서 필요한 정보만 입력
2. **근로자 정보 저장**: 이전 출근 이력이 있는 근로자의 정보 자동 불러오기
3. **자동 계약서 생성**: 입력된 정보를 바탕으로 엑셀 양식 자동 작성
4. **다운로드 및 출력**: 완성된 계약서 파일 다운로드 후 즉시 출력 가능

### 사용 흐름
1. 사용자가 웹 UI에 접속
2. 근로자 정보 입력 (신규) 또는 검색 (기존 근로자)
3. 필요한 항목만 추가/수정
4. "계약서 생성" 버튼 클릭
5. 작성된 엑셀 파일 다운로드
6. 출력 후 서명

## 4. 요구사항 분석

### 4.1 엑셀 템플릿 구조 분석

#### Before Template (contact_form_before.xlsx)
- **구조**: 단일 시트 (8시간(8hx6)_1월)
- **크기**: A1:S51 (19열 × 51행)
- **주요 섹션**:
  - 기본 정보 (A1-J7): 근로장소, 계약기간, 직종, 일당, 근로시간
  - 임금 정보 (A11-J26): 기본일급, 법정수당, 임금 산정내역
  - 근로시간/휴게시간 (A25-J28)
  - 연차휴가 (A29-J29)
  - 계약해지사유 (A30-J35)
  - 기타 근로조건 (A36-J40)
  - 안전보호구 지급확인 (A41-J44)
  - 서명란 (A47-J51)

#### After Template (contact_form_after.xlsx)
- **구조**: 13개 시트 (12개월 + 요약 시트)
- **월별 시트**: 1월~12월 각각 독립된 계약서 양식
- **특징**: 각 월의 계약기간이 자동으로 설정됨 (예: 5월 시트 → 2025.05.01 ~ 2025.05.31)

### 4.2 입력 필요 항목

#### 회사 정보 (사용자 입력)
- 회사명: ㈜강구토건 (기본값, 수정 가능)
- 대표자: 이진호 (기본값, 수정 가능)
- 본사주소: 서울시 마포구 희우정로16, 8층 (기본값, 수정 가능)
- 현장주소 (선택, 미입력 시 빈 값으로 출력)
- 현장대리인 (선택, 미입력 시 빈 값으로 출력)

#### 근로자 정보 (배열 입력)
- **다중 근로자 입력 가능** (배열 구조)
  - 한 명 입력: 파일 1개 생성 및 다운로드
  - 여러 명 입력: 각 근로자별 파일 생성 및 다중 다운로드
- 각 근로자별 정보 (모두 선택 항목)
  - 성명 (선택, 미입력 시 빈 값으로 출력)
  - 주민등록번호 (선택, 미입력 시 빈 값으로 출력)
  - 주소 (선택, 미입력 시 빈 값으로 출력)
  - 핸드폰번호 (선택, 미입력 시 빈 값으로 출력)

#### 근로 조건 (사용자 입력/선택)
- 근로장소 (선택, 미입력 시 빈 값으로 출력)
- 직종 (선택, 미입력 시 빈 값으로 출력)
- 계약 시작일 (날짜 선택, 필수)
  - 예: 2025년 5월 15일 선택 → 계약기간: 2025.05.15 ~ 2025.05.31
  - 계약 종료일은 시작일의 해당 월 말일로 자동 계산
- 일당 (기본값: 160,000원, 수정 가능)

### 4.3 기능 요구사항

#### FR1: 근로자 정보 관리
- FR1.1: 신규 근로자 정보 입력
- FR1.2: 기존 근로자 정보 검색 (이름 또는 주민등록번호)
- FR1.3: 근로자 정보 수정
- FR1.4: 근로자 정보 저장 (브라우저 로컬 스토리지/IndexedDB 활용)
- FR1.5: 저장된 근로자 정보 목록 조회 및 선택

#### FR2: 계약서 생성
- FR2.1: 계약 시작일 기반 계약서 생성
  - 시작일 선택 시 해당 월 시트 자동 선택
  - 종료일 자동 계산 (해당 월 말일)
- FR2.2: 입력된 정보를 엑셀 템플릿의 지정된 셀에 자동 입력
- FR2.3: 수식이 포함된 셀 자동 계산 (임금 관련 수식)
- FR2.4: 다중 근로자 처리
  - 근로자 1명: 파일 1개 생성 및 단일 다운로드
  - 근로자 여러 명: 각 근로자별 파일 생성
  - 다중 파일 자동 다운로드 (순차 또는 ZIP 압축)
- FR2.5: 브라우저에서 직접 엑셀 파일 생성 및 다운로드

#### FR3: 사용자 인터페이스
- FR3.1: 직관적인 입력 폼 제공
- FR3.2: 입력 항목 검증 (필수 항목 체크, 형식 검증)
- FR3.3: 이전 근로자의 경우 자동완성 기능
- FR3.4: 반응형 디자인 (모바일 접근성)

#### FR4: 확장성
- FR4.1: 다양한 서류 양식 추가 가능한 구조
- FR4.2: 템플릿 관리 기능 (향후)
- FR4.3: 양식 커스터마이징 기능 (향후)

### 4.4 비기능 요구사항

#### NFR1: 성능
- NFR1.1: 계약서 생성 시간 < 3초
- NFR1.2: 페이지 로딩 시간 < 2초
- NFR1.3: 브라우저 메모리 사용량 최적화 (< 100MB)

#### NFR2: 보안 및 개인정보 보호
- NFR2.1: 개인정보 로컬 저장 (브라우저 저장소만 사용, 외부 전송 없음)
- NFR2.2: HTTPS 배포 (정적 호스팅)
- NFR2.3: 개인정보 암호화 저장 (브라우저 로컬 스토리지)
- NFR2.4: 사용자 데이터 내보내기/가져오기 기능 (백업)

#### NFR3: 사용성
- NFR3.1: 직관적인 UI/UX (클릭 3회 이내 목표 달성)
- NFR3.2: 모바일 최적화 (반응형 디자인)
- NFR3.3: 한글 지원 및 한글 입력 최적화
- NFR3.4: 오프라인 사용 가능 (PWA 지원)

#### NFR4: 유지보수성
- NFR4.1: 모듈화된 코드 구조
- NFR4.2: 엑셀 템플릿 쉬운 교체 (설정 파일로 관리)
- NFR4.3: 클라이언트 사이드 에러 로깅

## 5. 시스템 아키텍처 설계

### 5.1 기술 스택 제안

#### 클라이언트 사이드 애플리케이션
**추천: React + TypeScript + Vite + Tailwind CSS**

**선택 이유:**
- **React**: 컴포넌트 기반 구조로 재사용성 높음, 풍부한 생태계
- **TypeScript**: 타입 안정성으로 유지보수성 향상
- **Vite**: 빠른 개발 서버, 최적화된 빌드
- **Tailwind CSS**: 빠른 UI 개발, 일관된 디자인 시스템
- **상태관리**: Zustand (경량, 간단한 API)
- **폼 관리**: React Hook Form (성능 우수, 검증 기능)

**대안:**
- **Vanilla JavaScript**: 더 간단하지만 확장성 낮음
- **Vue.js**: 더 간단한 학습 곡선, React와 유사한 기능

#### 엑셀 처리
**추천: ExcelJS (클라이언트 사이드)**

**선택 이유:**
- 브라우저에서 직접 Excel 파일 생성 가능
- 읽기/쓰기 모두 지원
- 수식, 스타일, 병합 셀 등 완벽 지원
- Node.js와 브라우저 모두 지원

**대안:**
- **SheetJS (xlsx)**: 더 가벼운 라이브러리지만 일부 기능 제한

#### 데이터 저장소
**추천: IndexedDB + Dexie.js**

**선택 이유:**
- **IndexedDB**: 브라우저 내장 NoSQL 데이터베이스
- **Dexie.js**: IndexedDB를 쉽게 사용할 수 있는 래퍼 라이브러리
- 대용량 데이터 저장 가능 (수백 MB)
- 오프라인 사용 가능
- 개인정보가 사용자 기기에만 저장됨 (서버 전송 없음)

**대안:**
- **LocalStorage**: 간단하지만 용량 제한 (5MB), 구조화된 데이터 저장 불편

#### 배포 및 호스팅
**추천: Vercel / Netlify / GitHub Pages**

**선택 이유:**
- 정적 사이트 무료 호스팅
- 자동 HTTPS
- Git 연동 자동 배포
- CDN 제공으로 빠른 로딩
- 서버 비용 없음

#### 개발 도구
- **버전 관리**: Git + GitHub
- **패키지 관리**: npm/pnpm
- **코드 품질**: ESLint, Prettier
- **테스팅**: Vitest, React Testing Library
- **번들러**: Vite (기본 제공)

### 5.2 시스템 아키텍처

```
┌───────────────────────────────────────────────────────────────┐
│                  브라우저 (Client-Side Only)                  │
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │              React Application (SPA)                    │ │
│  │                                                         │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │ │
│  │  │근로자 검색/  │  │ 정보 입력폼  │  │계약서 미리보기│ │ │
│  │  │선택 컴포넌트 │  │ 컴포넌트     │  │ 컴포넌트      │ │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘ │ │
│  │                                                         │ │
│  │  ┌─────────────────────────────────────────────────┐  │ │
│  │  │         상태 관리 (Zustand)                     │  │ │
│  │  │  - 근로자 정보 상태                             │  │ │
│  │  │  - 계약 정보 상태                               │  │ │
│  │  │  - 폼 상태 관리                                 │  │ │
│  │  └─────────────────────────────────────────────────┘  │ │
│  │                          │                              │ │
│  │  ┌───────────────────────▼─────────────────────────┐  │ │
│  │  │          서비스 레이어                          │  │ │
│  │  │  ┌─────────────────┐  ┌─────────────────────┐  │  │ │
│  │  │  │ Worker Service  │  │ Excel Generator     │  │  │ │
│  │  │  │ (IndexedDB 저장)│  │ Service (ExcelJS)   │  │  │ │
│  │  │  └─────────────────┘  └─────────────────────┘  │  │ │
│  │  └─────────────────────────────────────────────────┘  │ │
│  └─────────────────────────────────────────────────────────┘ │
│                          │                                    │
│         ┌────────────────┼────────────────┐                  │
│         │                │                │                  │
│  ┌──────▼──────┐  ┌──────▼──────┐  ┌──────▼──────┐         │
│  │ IndexedDB   │  │ Template    │  │ Generated   │         │
│  │ (Dexie.js)  │  │ Storage     │  │ Excel File  │         │
│  │             │  │ (Public/)   │  │ (Download)  │         │
│  │ - workers   │  │ - .xlsx     │  │ - Blob      │         │
│  │   테이블    │  │   templates │  │   객체      │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                               │
└───────────────────────────────────────────────────────────────┘
                          │
                          │ (정적 파일 배포)
                          │
              ┌───────────▼──────────┐
              │  정적 호스팅 서버    │
              │  (Vercel/Netlify)   │
              │  - HTTPS 자동 적용  │
              │  - CDN 배포         │
              └─────────────────────┘
```

**아키텍처 특징:**
- **완전한 클라이언트 사이드 처리**: 모든 로직이 브라우저에서 실행
- **서버 비용 없음**: 정적 호스팅만 사용 (무료)
- **개인정보 보호**: 데이터가 사용자 기기에만 저장되어 외부 서버로 전송되지 않음
- **오프라인 가능**: PWA로 구현 시 오프라인에서도 사용 가능
- **빠른 성능**: 서버 왕복 없이 모든 처리가 로컬에서 수행

### 5.3 IndexedDB 스키마 (Dexie.js)

#### workers 테이블
```typescript
interface Worker {
  id?: number; // Auto-increment
  name: string;
  residentNumber: string; // 암호화 저장
  address: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

// Dexie 스키마 정의
db.version(1).stores({
  workers: '++id, name, residentNumber, createdAt'
});
```

#### contracts 테이블 (선택사항 - 이력 관리용)
```typescript
interface Contract {
  id?: number; // Auto-increment
  workerId: number; // workers 테이블 참조
  contractStartDate: Date; // 계약 시작일
  contractEndDate: Date; // 계약 종료일 (자동 계산)
  workplace: string;
  jobType: string;
  dailyWage: number;
  createdAt: Date;
}

// Dexie 스키마 정의
db.version(1).stores({
  workers: '++id, name, residentNumber, createdAt',
  contracts: '++id, workerId, contractStartDate, createdAt'
});
```

### 5.4 핵심 모듈 설계

#### ExcelGeneratorService (클라이언트 사이드)

```typescript
import ExcelJS from 'exceljs';

interface Worker {
  name?: string;
  residentNumber?: string;
  address?: string;
  phone?: string;
}

interface ContractData {
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
  dailyWage: number;
}

class ExcelGeneratorService {
  /**
   * 브라우저에서 계약서 생성 및 다운로드
   * 근로자가 1명이면 단일 파일, 여러 명이면 다중 파일 생성
   */
  async generateAndDownloadContract(contractData: ContractData): Promise<void> {
    if (contractData.workers.length === 1) {
      // 단일 근로자: 파일 1개 생성 및 다운로드
      await this.generateSingleContract(contractData, contractData.workers[0]);
    } else {
      // 다중 근로자: 각 근로자별 파일 생성 및 순차 다운로드
      await this.generateMultipleContracts(contractData);
    }
  }

  /**
   * 단일 근로자 계약서 생성
   */
  private async generateSingleContract(contractData: ContractData, worker: Worker): Promise<void> {
    const workbook = await this.loadTemplate();
    const month = contractData.contractStartDate.getMonth() + 1;
    const worksheet = workbook.getWorksheet(`8시간(8hx6)_${month}월`);

    if (!worksheet) {
      throw new Error(`${month}월 시트를 찾을 수 없습니다.`);
    }

    this.fillCompanyInfo(worksheet, contractData);
    this.fillWorkerInfo(worksheet, worker);
    this.fillContractInfo(worksheet, contractData);

    const buffer = await workbook.xlsx.writeBuffer();
    this.downloadFile(buffer, worker, contractData.contractStartDate);
  }

  /**
   * 다중 근로자 계약서 생성 및 순차 다운로드
   */
  private async generateMultipleContracts(contractData: ContractData): Promise<void> {
    for (let i = 0; i < contractData.workers.length; i++) {
      const worker = contractData.workers[i];
      await this.generateSingleContract(contractData, worker);

      // 브라우저 다운로드 간격 (500ms delay)
      if (i < contractData.workers.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
  }

  /**
   * 템플릿 파일 로드
   */
  private async loadTemplate(): Promise<ExcelJS.Workbook> {
    const response = await fetch('/templates/contact_form_after.xlsx');
    const arrayBuffer = await response.arrayBuffer();

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(arrayBuffer);

    return workbook;
  }

  /**
   * 회사 정보 입력
   */
  private fillCompanyInfo(worksheet: ExcelJS.Worksheet, data: ContractData) {
    worksheet.getCell('A4').value = `${data.companyName} 대표 ${data.representative}`;
    worksheet.getCell('C50').value = data.companyAddress; // 본사주소
    worksheet.getCell('C51').value = data.siteAddress || ''; // 현장주소 (선택)
    worksheet.getCell('C52').value = data.siteManager || ''; // 현장대리인 (선택)
  }

  /**
   * 근로자 정보 입력
   */
  private fillWorkerInfo(worksheet: ExcelJS.Worksheet, worker: Worker) {
    worksheet.getCell('G48').value = worker.name || ''; // 성명 (선택)
    worksheet.getCell('G50').value = worker.residentNumber || ''; // 주민등록번호 (선택)
    worksheet.getCell('G49').value = worker.address || ''; // 주소 (선택)
    worksheet.getCell('G51').value = worker.phone || ''; // 핸드폰번호 (선택)
  }

  /**
   * 계약 조건 입력
   */
  private fillContractInfo(worksheet: ExcelJS.Worksheet, data: ContractData) {
    worksheet.getCell('B6').value = data.workplace || ''; // 근로장소 (선택)
    worksheet.getCell('H6').value = data.jobType || ''; // 직종 (선택)
    worksheet.getCell('G18').value = data.dailyWage; // 일당

    // 계약 시작일 및 종료일 설정
    const startDate = data.contractStartDate;
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0); // 해당 월 말일

    worksheet.getCell('B8').value =
      `${startDate.getFullYear()}. ${String(startDate.getMonth() + 1).padStart(2, '0')}. ${String(startDate.getDate()).padStart(2, '0')}.`;
    worksheet.getCell('D8').value =
      `${endDate.getFullYear()}. ${String(endDate.getMonth() + 1).padStart(2, '0')}. ${String(endDate.getDate()).padStart(2, '0')}.`;
  }

  /**
   * 파일 다운로드
   */
  private downloadFile(buffer: ArrayBuffer, worker: Worker, contractStartDate: Date) {
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const workerName = worker.name || '근로자';
    link.download = `근로계약서_${workerName}_${contractStartDate.getFullYear()}년${contractStartDate.getMonth() + 1}월.xlsx`;
    link.click();

    window.URL.revokeObjectURL(url);
  }
}

export default new ExcelGeneratorService();
```

#### WorkerStorageService (IndexedDB)

```typescript
import Dexie from 'dexie';
import { Worker } from './types';

class WorkerDatabase extends Dexie {
  workers!: Dexie.Table<Worker, number>;

  constructor() {
    super('KangguContractDB');

    this.version(1).stores({
      workers: '++id, name, residentNumber, createdAt'
    });
  }
}

const db = new WorkerDatabase();

class WorkerStorageService {
  /**
   * 근로자 정보 저장
   */
  async saveWorker(worker: Omit<Worker, 'id' | 'createdAt' | 'updatedAt'>): Promise<number> {
    const now = new Date();
    return await db.workers.add({
      ...worker,
      createdAt: now,
      updatedAt: now
    });
  }

  /**
   * 근로자 검색 (이름 또는 주민등록번호)
   */
  async searchWorkers(query: string): Promise<Worker[]> {
    return await db.workers
      .where('name').startsWithIgnoreCase(query)
      .or('residentNumber').equals(query)
      .toArray();
  }

  /**
   * 모든 근로자 조회
   */
  async getAllWorkers(): Promise<Worker[]> {
    return await db.workers.toArray();
  }

  /**
   * 근로자 정보 수정
   */
  async updateWorker(id: number, updates: Partial<Worker>): Promise<void> {
    await db.workers.update(id, {
      ...updates,
      updatedAt: new Date()
    });
  }

  /**
   * 근로자 삭제
   */
  async deleteWorker(id: number): Promise<void> {
    await db.workers.delete(id);
  }
}

export default new WorkerStorageService();
```

## 6. 목표 및 성공 지표

### 6.1 단기 목표 (Phase 1: MVP)
- **기간**: 2개월
- **범위**: 근로계약서 자동화 기본 기능
- **성공 지표**:
  - 계약서 작성 시간 80% 단축 (20분 → 4분)
  - 사용자 만족도 4점 이상 (5점 만점)
  - 오류율 5% 이하

### 6.2 중기 목표 (Phase 2: 확장)
- **기간**: 3-6개월
- **범위**: 다양한 서류 양식 추가
- **성공 지표**:
  - 지원 서류 종류 5개 이상
  - 월간 활성 사용자 100명 이상
  - 시스템 가동률 99% 이상

### 6.3 장기 목표 (Phase 3: 최적화)
- **기간**: 6-12개월
- **범위**: AI 기반 자동화, 통합 관리 시스템
- **성공 지표**:
  - 완전 자동화 비율 90% 이상
  - 다양한 건설사 적용 (B2B 확장)
  - 연간 비용 절감 효과 측정

## 7. 개발 로드맵

### Phase 1: MVP (4주)

**Week 1: 프로젝트 셋업 및 기반 구축**
- Vite + React + TypeScript 프로젝트 생성
- Tailwind CSS 설정
- IndexedDB (Dexie.js) 설정
- 엑셀 템플릿 분석 및 매핑 정의
- ExcelJS 라이브러리 통합

**Week 2: 핵심 UI 개발**
- 근로자 검색/등록 UI 컴포넌트
- 계약 정보 입력 폼 (React Hook Form)
- 날짜 선택기 (계약 시작일)
- 기본 레이아웃 및 네비게이션

**Week 3: 핵심 기능 개발**
- ExcelGeneratorService 구현
- WorkerStorageService 구현 (IndexedDB)
- 계약서 생성 로직 (셀 매핑)
- 파일 다운로드 기능
- 근로자 정보 검색 및 자동완성

**Week 4: 테스트 및 배포**
- 단위 테스트 (Vitest)
- E2E 테스트 (실제 엑셀 생성 테스트)
- 버그 수정 및 최적화
- Vercel/Netlify 배포
- 사용자 테스트

### Phase 2: 확장 (8주)
- PWA 지원 (오프라인 사용)
- 다양한 서류 양식 지원 (템플릿 추가)
- 데이터 내보내기/가져오기 (백업/복원)
- 인쇄 최적화 뷰
- 계약 이력 관리 기능

### Phase 3: 최적화 (12주)
- 모바일 최적화 (반응형 개선)
- 다크모드 지원
- 접근성 개선 (WCAG 2.1 AA)
- 다국어 지원 (i18n)
- 사용 통계 (로컬 분석)

## 8. 위험 요소 및 대응 방안

### 8.1 기술적 위험
| 위험 요소 | 영향도 | 발생 확률 | 대응 방안 |
|-----------|--------|----------|-----------|
| 엑셀 수식 호환성 문제 | 높음 | 중간 | ExcelJS 테스트 철저히 진행, 대안 라이브러리 준비 |
| 성능 저하 (동시 접속) | 중간 | 낮음 | 로드 테스트 수행, 캐싱 전략 도입 |
| 개인정보 유출 | 높음 | 낮음 | 암호화 필수, 보안 감사 정기 수행 |

### 8.2 비즈니스 위험
| 위험 요소 | 영향도 | 발생 확률 | 대응 방안 |
|-----------|--------|----------|-----------|
| 사용자 저항 (기존 프로세스 선호) | 중간 | 중간 | 충분한 교육, 단계적 도입 |
| 법규 변경 (근로계약 양식) | 높음 | 낮음 | 템플릿 관리 시스템으로 쉬운 업데이트 구조 |
| 예산 초과 | 중간 | 중간 | MVP 우선, 단계적 기능 추가 |

## 9. 예산 및 리소스

### 9.1 인력
- **프론트엔드 개발자**: 1명 (1개월)
- **QA/테스터**: 0.5명 (0.5개월)
- **디자이너**: 0.3명 (UI/UX 컨설팅)

### 9.2 인프라 비용 (월간)
- **호스팅**: Vercel/Netlify 무료 플랜 (충분)
- **도메인**: 선택사항 (~$10/년)
- **SSL 인증서**: 자동 제공 (무료)
- **CDN**: 자동 제공 (무료)
- **총 예상 비용**: **$0/월** (도메인 제외)

### 9.3 개발 도구
- 무료 오픈소스 활용 (Git, VSCode, Vite, React, TypeScript)
- 모든 라이브러리 무료 (ExcelJS, Dexie.js, Zustand, React Hook Form)

## 10. 결론

### 핵심 가치 제안
1. **시간 절감**: 계약서 작성 시간 80% 단축 (20분 → 4분)
2. **오류 감소**: 자동화로 입력 오류 최소화
3. **확장성**: 다양한 서류 양식으로 확장 가능
4. **사용 편의성**: 직관적인 UI로 누구나 쉽게 사용
5. **비용 효율성**: 서버 비용 $0, 무료 호스팅으로 운영
6. **개인정보 보호**: 데이터가 사용자 기기에만 저장되어 외부 유출 없음

### 추천 기술 스택 (최종)
- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **State Management**: Zustand
- **Form**: React Hook Form
- **Storage**: IndexedDB + Dexie.js
- **Excel Processing**: ExcelJS (클라이언트 사이드)
- **Deployment**: Vercel / Netlify (무료 정적 호스팅)

### 차별화 포인트
- **완전한 클라이언트 사이드**: 서버 없이 브라우저에서 모든 처리
- **개인정보 보호 강화**: 데이터가 사용자 기기 외부로 나가지 않음
- **서버 비용 0원**: 정적 호스팅으로 운영 비용 절감
- **오프라인 사용 가능**: PWA로 구현 시 인터넷 없이도 작동
- **건설업 특화**: 일용직 근로계약서에 최적화된 UI/UX
- **기존 양식 활용**: 현재 사용 중인 엑셀 템플릿 그대로 사용
- **확장 용이**: 향후 다양한 서류 양식 추가 가능

### 구현 우선순위
**Phase 1 (MVP - 필수)**
- 근로자 정보 입력/검색/저장 (IndexedDB)
- 계약 시작일 선택 및 종료일 자동 계산
- 엑셀 계약서 자동 생성 (ExcelJS)
- 파일 다운로드 기능

**Phase 2 (확장 - 중요)**
- PWA 지원 (오프라인 사용)
- 데이터 백업/복원
- 계약 이력 관리
- 다양한 양식 지원

**Phase 3 (최적화 - 선택)**
- 모바일 최적화
- 다크모드
- 접근성 개선
- 다국어 지원

---

**작성일**: 2025-11-09
**작성자**: Product Manager
**버전**: 2.0 (클라이언트 사이드 전용)
