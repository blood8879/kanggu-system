import type { Worker } from '../services/db';

export function generateMockWorkers(count: number = 10): Omit<Worker, 'id'>[] {
  const surnames = ['김', '이', '박', '최', '정', '강', '조', '윤', '장', '임'];
  const givenNames = ['민수', '지훈', '성호', '준호', '현우', '영희', '수정', '은지', '지연', '하나'];
  const cities = ['서울시', '부산시', '인천시', '대구시', '대전시', '광주시', '울산시', '수원시', '창원시', '고양시'];
  const districts = ['강남구', '서초구', '송파구', '강동구', '마포구', '용산구', '성동구', '광진구', '동대문구', '중랑구'];

  const workers: Omit<Worker, 'id'>[] = [];

  for (let i = 0; i < count; i++) {
    const birthYear = 1970 + Math.floor(Math.random() * 40);
    const birthMonth = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const birthDay = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
    const genderDigit = Math.random() > 0.5 ? '1' : '2';
    const serialNumber = String(Math.floor(Math.random() * 9000) + 1000);

    workers.push({
      name: `${surnames[i % surnames.length]}${givenNames[i % givenNames.length]}`,
      residentNumber: `${birthYear.toString().slice(2)}${birthMonth}${birthDay}-${genderDigit}${serialNumber}`,
      address: `${cities[i % cities.length]} ${districts[i % districts.length]} ${Math.floor(Math.random() * 999) + 1}번길 ${Math.floor(Math.random() * 99) + 1}`,
      phone: `010-${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`,
    });
  }

  return workers;
}
