import ExcelJS from 'exceljs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function checkSheets() {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(path.join(__dirname, 'public/templates/contact_form_after.xlsx'));

  console.log('=== 워크북 시트 정보 ===\n');

  workbook.worksheets.forEach((sheet, index) => {
    console.log(`인덱스 ${index}: "${sheet.name}"`);
    console.log(`  - ID: ${sheet.id}`);
    console.log(`  - State: ${sheet.state}`);
    console.log(`  - 숨김 여부: ${sheet.state === 'hidden' || sheet.state === 'veryHidden'}`);
  });

  console.log('\n=== 현재 workbook.views 설정 ===');
  console.log(JSON.stringify(workbook.views, null, 2));

  console.log('\n=== 월별 시트 이름 매핑 ===');
  const months = [
    '8시간(8hx6)_1월', '8시간(8hx6)_2월', '8시간(8hx6)_3월',
    '8시간(8hx6)_4월', '8시간(8hx6)_5월', '8시간(8hx6)_6월',
    '8시간(8hx6)_7월', '8시간(8hx6)_8월', '8시간(8hx6)_9월',
    '8시간(8hx6)_10월', '8시간(8hx6)_11월', '8시간(8hx6)_12월'
  ];

  months.forEach((sheetName, monthIndex) => {
    const actualIndex = workbook.worksheets.findIndex(ws => ws.name === sheetName);
    console.log(`${monthIndex + 1}월 (${sheetName}): 실제 인덱스 = ${actualIndex}`);
  });

  // 11월 시트로 activeTab 설정 테스트
  console.log('\n=== 11월 시트 activeTab 테스트 ===');
  const nov11Sheet = workbook.getWorksheet('8시간(8hx6)_11월');
  if (nov11Sheet) {
    const nov11Index = workbook.worksheets.findIndex(ws => ws.name === nov11Sheet.name);
    console.log(`11월 시트 이름: ${nov11Sheet.name}`);
    console.log(`11월 시트 인덱스: ${nov11Index}`);

    // activeTab 설정
    workbook.views = [{
      activeTab: nov11Index,
      firstSheet: 0,
      visibility: 'visible'
    }];

    console.log('설정된 activeTab:', nov11Index);

    // 테스트 파일 저장
    await workbook.xlsx.writeFile('test-november.xlsx');
    console.log('\n테스트 파일 저장 완료: test-november.xlsx');
    console.log('이 파일을 열어서 11월 탭이 활성화되어 있는지 확인하세요.');
  }
}

checkSheets().catch(console.error);
