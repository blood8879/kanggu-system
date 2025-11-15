export interface Worker {
  name?: string;
  residentNumber?: string;
  address?: string;
  phone?: string;
  // 각 근로자별 계약 조건
  workplace?: string;
  jobType?: string;
  contractStartDate?: Date | null;
  contractEndDate?: Date | null;
  dailyWage?: number;
}

export interface ContractFormData {
  // 회사 정보
  companyName: string;
  representative: string;
  companyAddress: string;
  siteAddress?: string;
  siteManager?: string;

  // 근로자 정보 (배열) - 각 근로자별로 계약 조건 포함
  workers: Worker[];
}
