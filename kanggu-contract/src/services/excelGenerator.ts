import ExcelJS from 'exceljs';
import type { ContractFormData, Worker } from '../types/contract';
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

    // 현장대리인: 이름이 있으면 "이름 (인)" 형식, 없으면 "(인)" 유지
    if (data.siteManager) {
      worksheet.getCell(companyInfo.siteManager).value = `${data.siteManager}                          (인)`;
    }
    // siteManager가 없으면 템플릿의 "(인)"이 그대로 유지됨
  }

  /**
   * 근로자 정보 입력
   */
  private fillWorkerInfo(
    worksheet: ExcelJS.Worksheet,
    worker: Worker
  ): void {
    const { workerInfo } = EXCEL_CELL_MAPPING;

    // 근로자 정보 입력 (G열에만 입력하면 됨)
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

    // 계약 기간 계산 (개월)
    const monthsDiff =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      (endDate.getMonth() - startDate.getMonth()) + 1;

    // richText 형식으로 날짜 설정 (원본 스타일 유지)
    this.setDateWithStyle(worksheet, contractInfo.startDate, this.formatDate(startDate) + ' ~');
    this.setDateWithStyle(worksheet, contractInfo.endDate, `${this.formatDate(endDate)} (${monthsDiff}개월)`);
  }

  /**
   * richText 스타일로 날짜 설정
   */
  private setDateWithStyle(
    worksheet: ExcelJS.Worksheet,
    cellAddress: string,
    dateText: string
  ): void {
    const cell = worksheet.getCell(cellAddress);

    // 원본 템플릿과 동일한 richText 형식 적용
    cell.value = {
      richText: [
        {
          text: ' ' // 앞 공백
        },
        {
          font: {
            bold: true,
            underline: true,
            size: 10,
            color: { theme: 1 } as Partial<ExcelJS.Color>, // 파란색
            name: '굴림',
            family: 3,
            charset: 129
          },
          text: ` ${dateText}`
        }
      ]
    };
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

    // 계약 월 시트만 표시하고 나머지는 숨김 처리 후, 계약 월 시트를 첫 번째로 이동
    const targetSheetName = worksheet.name;

    // 1단계: 모든 시트의 상태 설정
    workbook.worksheets.forEach((sheet) => {
      if (sheet.name === targetSheetName) {
        sheet.state = 'visible';
      } else {
        sheet.state = 'hidden';
      }
    });

    // 2단계: 계약 월 시트를 첫 번째 위치로 이동
    const currentSheetIndex = workbook.worksheets.findIndex(s => s.name === targetSheetName);
    if (currentSheetIndex > 0) {
      const [targetSheet] = workbook.worksheets.splice(currentSheetIndex, 1);
      workbook.worksheets.unshift(targetSheet);
    }

    return await workbook.xlsx.writeBuffer();
  }

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

export const excelGenerator = new ExcelGeneratorService();
