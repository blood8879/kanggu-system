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

    // 근로자 정보 입력 (G열에만 입력하면 됨) - #002060 색상으로 설정
    // 근로자명: 이름(#002060) + 공백 + (서명)(회색 #808080)
    if (worker.name) {
      const nameCell = worksheet.getCell(workerInfo.name);
      nameCell.value = {
        richText: [
          {
            font: { color: { argb: 'FF002060' } }, // #002060
            text: worker.name
          },
          {
            text: '                          ' // 우측 끝 배치를 위한 공백
          },
          {
            font: { color: { argb: 'FF808080' } }, // 회색 #808080
            text: '(서명)'
          }
        ]
      };

      // 추가 서명 필드들에 근로자명 입력 (원본 내용의 빈칸만 교체)
      // E4: 단순히 이름만 (가운데 정렬)
      const cellE4 = worksheet.getCell(workerInfo.signatureE4);
      cellE4.value = worker.name;
      cellE4.alignment = { horizontal: 'center', vertical: 'middle' };
      cellE4.font = { ...cellE4.font, color: { argb: 'FF002060' } };

      // B19: "동의자" 뒤 빈칸을 근로자명으로 교체
      this.fillWorkerNameInCell(worksheet, workerInfo.signatureB19, worker.name);

      // B21: "동의자" 뒤 빈칸을 근로자명으로 교체 (마지막만)
      this.fillWorkerNameInCell(worksheet, workerInfo.signatureB21, worker.name, 'last');

      // B25: "동의자 성명 :" 뒤 빈칸을 근로자명으로 교체 (마지막만)
      this.fillWorkerNameInCell(worksheet, workerInfo.signatureB25, worker.name, 'last');

      // B36: "성명 :" 패턴 뒤의 모든 빈칸을 근로자명으로 교체 (특수 케이스)
      this.fillWorkerNameInCell(worksheet, workerInfo.signatureB36, worker.name, 'name-fields');

      // B44: "동의자 성명 :" 뒤 빈칸을 근로자명으로 교체
      this.fillWorkerNameInCell(worksheet, workerInfo.signatureB44, worker.name);

      // B45: 마지막 빈칸을 근로자명으로 교체
      this.fillWorkerNameInCell(worksheet, workerInfo.signatureB45, worker.name);
    }

    this.setCellWithBlackText(worksheet, workerInfo.residentNumber, worker.residentNumber || '');
    this.setCellWithBlackText(worksheet, workerInfo.address, worker.address || '');
    this.setCellWithBlackText(worksheet, workerInfo.phone, worker.phone || '');

    // 행 높이 설정
    worksheet.getRow(35).height = 58.2;
    worksheet.getRow(40).height = 33;
  }

  /**
   * 셀의 원본 내용에서 빈칸 부분만 근로자명으로 교체
   * 근로자명은 #002060 색상, 나머지 원본 텍스트는 원래 색상 유지
   * @param mode - 'all': 모든 빈칸 교체 (기본값), 'first': 첫 번째 빈칸만 교체, 'last': 마지막 빈칸만 교체, 'name-fields': "성명 :" 뒤의 모든 빈칸 교체
   */
  private fillWorkerNameInCell(
    worksheet: ExcelJS.Worksheet,
    cellAddress: string,
    workerName: string,
    mode: 'all' | 'first' | 'last' | 'name-fields' = 'all'
  ): void {
    const cell = worksheet.getCell(cellAddress);
    const originalValue = cell.value;

    if (typeof originalValue === 'string') {
      // 일반 텍스트를 richText로 변환하면서 빈칸만 근로자명(#002060)으로 교체
      const originalFont = cell.font || {};
      const parts: ExcelJS.RichText[] = [];

      // 15자 이상 연속된 공백을 기준으로 텍스트를 나눔
      const regex = /\s{15,}/g;

      if (mode === 'name-fields') {
        // 'name-fields' 모드: "성명 :" 패턴 뒤의 모든 긴 공백을 교체
        const nameFieldRegex = /(성명\s*:\s*)(\s{15,})/g;
        let lastIndex = 0;
        let match;

        while ((match = nameFieldRegex.exec(originalValue)) !== null) {
          // "성명 :" 이전 텍스트 (원본 색상)
          if (match.index > lastIndex) {
            parts.push({
              font: originalFont,
              text: originalValue.substring(lastIndex, match.index)
            });
          }

          // "성명 :" 부분 (원본 색상)
          parts.push({
            font: originalFont,
            text: match[1]
          });

          // 근로자명 (#002060)
          parts.push({
            font: { ...originalFont, color: { argb: 'FF002060' } },
            text: `            ${workerName}            `
          });

          lastIndex = nameFieldRegex.lastIndex;
        }

        // 마지막 남은 텍스트 (원본 색상)
        if (lastIndex < originalValue.length) {
          parts.push({
            font: originalFont,
            text: originalValue.substring(lastIndex)
          });
        }
      } else if (mode === 'last') {
        // 'last' 모드: 마지막 긴 공백만 교체
        const matches = Array.from(originalValue.matchAll(/\s{15,}/g));
        if (matches.length > 0) {
          const lastMatch = matches[matches.length - 1];

          // 마지막 매치 이전 텍스트 (원본 색상)
          if (lastMatch.index && lastMatch.index > 0) {
            parts.push({
              font: originalFont,
              text: originalValue.substring(0, lastMatch.index)
            });
          }

          // 근로자명 (#002060)
          parts.push({
            font: { ...originalFont, color: { argb: 'FF002060' } },
            text: `            ${workerName}            `
          });

          // 마지막 매치 이후 텍스트 (원본 색상)
          const afterIndex = lastMatch.index! + lastMatch[0].length;
          if (afterIndex < originalValue.length) {
            parts.push({
              font: originalFont,
              text: originalValue.substring(afterIndex)
            });
          }
        }
      } else {
        // 'first' 또는 'all' 모드
        let lastIndex = 0;
        let match;
        let replaceCount = 0;

        while ((match = regex.exec(originalValue)) !== null) {
          // mode가 'first'이고 이미 한 번 교체했으면 나머지는 그대로 유지
          if (mode === 'first' && replaceCount > 0) {
            break;
          }

          // 빈칸 앞부분 텍스트 (원본 색상)
          if (match.index > lastIndex) {
            parts.push({
              font: originalFont,
              text: originalValue.substring(lastIndex, match.index)
            });
          }

          // 근로자명 (#002060)
          parts.push({
            font: { ...originalFont, color: { argb: 'FF002060' } },
            text: `            ${workerName}            `
          });

          lastIndex = regex.lastIndex;
          replaceCount++;
        }

        // 마지막 남은 텍스트 (원본 색상)
        if (lastIndex < originalValue.length) {
          parts.push({
            font: originalFont,
            text: originalValue.substring(lastIndex)
          });
        }
      }

      // richText로 설정
      if (parts.length > 0) {
        cell.value = { richText: parts };
      }
    } else if (originalValue && typeof originalValue === 'object' && 'richText' in originalValue) {
      // richText 형식인 경우: 빈칸 부분을 찾아서 근로자명으로 교체
      const richTextValue = originalValue as { richText: ExcelJS.RichText[] };

      if (mode === 'name-fields') {
        // 'name-fields' 모드: "성명 :" 패턴 뒤의 모든 긴 공백을 교체
        const newRichText: ExcelJS.RichText[] = [];

        // 먼저 모든 "성명 :" 패턴의 위치를 찾습니다
        const nameFieldPositions: Array<{ partIndex: number; textIndex: number }> = [];
        richTextValue.richText.forEach((part, partIndex) => {
          if (part.text && part.text.includes('성명')) {
            const matches = Array.from(part.text.matchAll(/성명\s*:/g));
            matches.forEach(match => {
              nameFieldPositions.push({
                partIndex,
                textIndex: match.index! + match[0].length
              });
            });
          }
        });

        // "성명 :" 이후에 나오는 긴 공백들을 표시
        const blanksToFill = new Set<string>(); // "partIndex:matchIndex" 형식

        nameFieldPositions.forEach(namePos => {
          let foundBlank = false;

          // 같은 part에서 "성명 :" 이후의 공백 찾기
          const samePart = richTextValue.richText[namePos.partIndex];
          if (samePart.text) {
            const remainingText = samePart.text.substring(namePos.textIndex);
            const blankMatch = remainingText.match(/\s{15,}/);
            if (blankMatch) {
              const actualIndex = namePos.textIndex + blankMatch.index!;
              blanksToFill.add(`${namePos.partIndex}:${actualIndex}`);
              foundBlank = true;
            }
          }

          // 같은 part에서 못 찾았으면 다음 part들에서 찾기
          if (!foundBlank) {
            for (let i = namePos.partIndex + 1; i < richTextValue.richText.length; i++) {
              const nextPart = richTextValue.richText[i];
              if (nextPart.text && nextPart.text.match(/\s{15,}/)) {
                const match = nextPart.text.match(/\s{15,}/);
                blanksToFill.add(`${i}:${match!.index!}`);
                break; // 첫 번째 공백만 채우고 중단
              }
            }
          }
        });

        // 이제 richText를 다시 구성하면서 표시된 공백들을 근로자명으로 교체
        richTextValue.richText.forEach((part, partIndex) => {
          if (!part.text) {
            newRichText.push(part);
            return;
          }

          // 이 part에 교체할 공백이 있는지 확인
          const blanksInThisPart = Array.from(blanksToFill)
            .filter(key => key.startsWith(`${partIndex}:`))
            .map(key => parseInt(key.split(':')[1]))
            .sort((a, b) => a - b);

          if (blanksInThisPart.length === 0) {
            newRichText.push(part);
          } else {
            // 이 part를 분할해서 처리
            let lastIndex = 0;

            blanksInThisPart.forEach(blankIndex => {
              const blankMatch = part.text!.substring(blankIndex).match(/\s{15,}/);
              if (!blankMatch) return;

              const blankEnd = blankIndex + blankMatch[0].length;

              // 공백 이전 텍스트 (원본 스타일)
              if (blankIndex > lastIndex) {
                newRichText.push({
                  ...part,
                  text: part.text!.substring(lastIndex, blankIndex)
                });
              }

              // 근로자명 (#002060)
              newRichText.push({
                font: { ...part.font, color: { argb: 'FF002060' } },
                text: `            ${workerName}            `
              });

              lastIndex = blankEnd;
            });

            // 마지막 남은 텍스트 (원본 스타일)
            if (lastIndex < part.text!.length) {
              newRichText.push({
                ...part,
                text: part.text!.substring(lastIndex)
              });
            }
          }
        });

        cell.value = { richText: newRichText };
      } else if (mode === 'last') {
        // 'last' 모드: 마지막 긴 공백만 교체
        // 먼저 모든 공백 위치를 찾음
        const allMatches: Array<{ partIndex: number; matchIndex: number; matchLength: number; match: RegExpMatchArray }> = [];
        richTextValue.richText.forEach((part, partIndex) => {
          if (part.text) {
            const matches = Array.from(part.text.matchAll(/\s{15,}/g));
            matches.forEach(match => {
              allMatches.push({ partIndex, matchIndex: match.index!, matchLength: match[0].length, match });
            });
          }
        });

        if (allMatches.length > 0) {
          const lastMatchInfo = allMatches[allMatches.length - 1];
          const newRichText: ExcelJS.RichText[] = [];

          richTextValue.richText.forEach((part, partIndex) => {
            if (partIndex === lastMatchInfo.partIndex && part.text) {
              // 마지막 매치가 있는 part 처리
              const beforeText = part.text.substring(0, lastMatchInfo.matchIndex);
              const afterText = part.text.substring(lastMatchInfo.matchIndex + lastMatchInfo.matchLength);

              if (beforeText) {
                newRichText.push({ ...part, text: beforeText });
              }

              newRichText.push({
                font: { ...part.font, color: { argb: 'FF002060' } },
                text: `            ${workerName}            `
              });

              if (afterText) {
                newRichText.push({ ...part, text: afterText });
              }
            } else {
              // 다른 part는 그대로 유지
              newRichText.push(part);
            }
          });

          cell.value = { richText: newRichText };
        }
      } else {
        // 'first' 또는 'all' 모드
        const newRichText: ExcelJS.RichText[] = [];
        let totalReplaceCount = 0;

        for (const part of richTextValue.richText) {
          if (part.text && part.text.match(/\s{15,}/) && (mode === 'all' || totalReplaceCount === 0)) {
            // 이 part에 긴 공백이 있으면 분리해서 처리
            const regex = /\s{15,}/g;
            let lastIndex = 0;
            let match;

            while ((match = regex.exec(part.text)) !== null) {
              // mode가 'first'이고 이미 한 번 교체했으면 중단
              if (mode === 'first' && totalReplaceCount > 0) {
                break;
              }

              // 빈칸 앞부분 (원본 스타일)
              if (match.index > lastIndex) {
                newRichText.push({
                  ...part,
                  text: part.text.substring(lastIndex, match.index)
                });
              }

              // 근로자명 (#002060)
              newRichText.push({
                font: { ...part.font, color: { argb: 'FF002060' } },
                text: `            ${workerName}            `
              });

              lastIndex = regex.lastIndex;
              totalReplaceCount++;
            }

            // 마지막 남은 텍스트 (원본 스타일)
            if (lastIndex < part.text.length) {
              newRichText.push({
                ...part,
                text: part.text.substring(lastIndex)
              });
            }
          } else {
            // 빈칸이 없거나 이미 교체했으면 그대로 유지
            newRichText.push(part);
          }
        }

        cell.value = { richText: newRichText };
      }
    } else {
      // 원본 값이 없거나 다른 타입인 경우: 근로자명만 #002060으로 입력
      cell.value = workerName;
      cell.font = {
        ...cell.font,
        color: { argb: 'FF002060' }
      };
    }
  }

  /**
   * 셀에 검정색 텍스트로 값 설정
   */
  private setCellWithBlackText(
    worksheet: ExcelJS.Worksheet,
    cellAddress: string,
    value: string
  ): void {
    const cell = worksheet.getCell(cellAddress);
    cell.value = value;

    // 폰트 색상을 검정색으로 명시적으로 설정
    cell.font = {
      ...cell.font,
      color: { argb: 'FF000000' } // 검정색
    };
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

    // 인쇄 영역을 51번 행까지 설정
    this.setPrintArea(worksheet);

    // 계약 월 시트만 남기고 나머지 시트는 완전히 삭제
    const targetSheetName = worksheet.name;

    // 삭제할 시트 목록 수집 (역순으로 삭제하기 위해)
    const sheetsToRemove: string[] = [];
    workbook.worksheets.forEach((sheet) => {
      if (sheet.name !== targetSheetName) {
        sheetsToRemove.push(sheet.name);
      }
    });

    // 시트 삭제
    sheetsToRemove.forEach((sheetName) => {
      workbook.removeWorksheet(sheetName);
    });

    return await workbook.xlsx.writeBuffer();
  }

  /**
   * 인쇄 영역을 J열, 51번 행까지 설정
   */
  private setPrintArea(worksheet: ExcelJS.Worksheet): void {
    // 인쇄 영역을 A1:J51로 설정 (J열, 51번 행까지 포함)
    worksheet.pageSetup.printArea = 'A1:J51';
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
