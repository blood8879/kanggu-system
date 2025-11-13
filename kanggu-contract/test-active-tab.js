import ExcelJS from 'exceljs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testActiveTabs() {
  console.log('=== 테스트 1: activeTab 속성만 설정 ===');
  {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(path.join(__dirname, 'public/templates/contact_form_after.xlsx'));

    workbook.views = [{
      activeTab: 10,
      firstSheet: 0,
      visibility: 'visible'
    }];

    await workbook.xlsx.writeFile('test1-activetab-only.xlsx');
    console.log('저장 완료: test1-activetab-only.xlsx');
  }

  console.log('\n=== 테스트 2: 기존 views 유지하면서 activeTab 추가 ===');
  {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(path.join(__dirname, 'public/templates/contact_form_after.xlsx'));

    const existingViews = workbook.views && workbook.views.length > 0 ? workbook.views[0] : {};
    workbook.views = [{
      ...existingViews,
      activeTab: 10,
      firstSheet: 0
    }];

    console.log('설정된 views:', JSON.stringify(workbook.views, null, 2));
    await workbook.xlsx.writeFile('test2-preserve-views.xlsx');
    console.log('저장 완료: test2-preserve-views.xlsx');
  }

  console.log('\n=== 테스트 3: worksheet.state 조작 ===');
  {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(path.join(__dirname, 'public/templates/contact_form_after.xlsx'));

    // 모든 시트를 숨기고 11월만 표시
    workbook.worksheets.forEach((sheet, index) => {
      if (index === 10) {
        sheet.state = 'visible';
      }
    });

    await workbook.xlsx.writeFile('test3-worksheet-state.xlsx');
    console.log('저장 완료: test3-worksheet-state.xlsx');
  }

  console.log('\n=== 테스트 4: workbook.properties와 함께 설정 ===');
  {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(path.join(__dirname, 'public/templates/contact_form_after.xlsx'));

    // workbook 속성 설정
    if (!workbook.properties) {
      workbook.properties = {};
    }

    workbook.views = [{
      activeTab: 10,
      firstSheet: 0,
      visibility: 'visible',
      x: 0,
      y: 0,
      width: 25000,
      height: 20000
    }];

    console.log('설정된 views:', JSON.stringify(workbook.views, null, 2));
    await workbook.xlsx.writeFile('test4-with-properties.xlsx');
    console.log('저장 완료: test4-with-properties.xlsx');
  }

  console.log('\n모든 테스트 파일을 열어서 어떤 방법이 작동하는지 확인하세요.');
}

testActiveTabs().catch(console.error);
