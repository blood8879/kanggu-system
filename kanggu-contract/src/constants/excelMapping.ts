export const EXCEL_CELL_MAPPING = {
  companyInfo: {
    companyAndRepresentative: 'A4', // "㈜강구토건 대표 이진호"
    companyAddress: 'C49',           // 본사주소 (49행)
    siteAddress: 'C50',              // 현장주소 (50행) ✅ 수정됨
    siteManager: 'C51',              // 현장대리인 (51행) ✅ 유지
  },
  workerInfo: {
    name: 'G48',                     // 성명 (근로자) ✅ 확인됨
    residentNumber: 'G50',           // 주민등록번호 ✅ 확인됨
    address: 'G49',                  // 주소 ✅ 확인됨
    phone: 'G51',                    // 핸드폰번호 ✅ 확인됨
    // 동의자 서명 필드들
    signatureE4: 'E4',               // 동의자 (인)
    signatureB19: 'B19',             // 동의자 (인)
    signatureB21: 'B21',             // 개인정보제공 동의자 성명 : (인)
    signatureB25: 'B25',             // 동의자 성명 : (인)
    signatureB36: 'B36',             // ____(인)
    signatureB44: 'B44',             // 동의자
    signatureB45: 'B45',             // 동의자
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
