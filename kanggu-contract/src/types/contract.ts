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
