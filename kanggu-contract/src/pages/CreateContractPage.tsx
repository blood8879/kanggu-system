import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { CompanyInfoSection } from '../components/contract/CompanyInfoSection';
import { WorkersSection } from '../components/contract/WorkersSection';
import { excelGenerator } from '../services/excelGenerator';

// Zod validation schema
const contractSchema = z.object({
  companyName: z.string().min(1, '회사명을 입력해주세요'),
  representative: z.string().min(1, '대표자를 입력해주세요'),
  companyAddress: z.string().min(1, '회사 주소를 입력해주세요'),
  siteAddress: z.string().optional(),
  siteManager: z.string().optional(),
  workers: z.array(
    z.object({
      name: z.string().optional(),
      residentNumber: z.string().optional(),
      address: z.string().optional(),
      phone: z.string().optional(),
      // 각 근로자별 계약 조건
      workplace: z.string().optional(),
      jobType: z.string().optional(),
      contractStartDate: z.date().optional(),
      contractEndDate: z.date().optional(),
      dailyWage: z.number().min(0, '일당은 0 이상이어야 합니다').optional(),
    })
  ).min(1, '최소 1명의 근로자가 필요합니다'),
});

type ContractFormValues = z.infer<typeof contractSchema>;

export const CreateContractPage: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });

  const methods = useForm<ContractFormValues>({
    resolver: zodResolver(contractSchema),
    defaultValues: {
      companyName: '㈜강구토건',
      representative: '이진호',
      companyAddress: '서울시 마포구 희우정로16, 8층',
      workers: [{}],
    },
  });

  const onSubmit = async (data: ContractFormValues) => {
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
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">계약서 생성</h1>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CompanyInfoSection />
          </Card>

          <Card>
            <WorkersSection />
          </Card>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => methods.reset()}
              disabled={isGenerating}
            >
              초기화
            </Button>
            <Button type="submit" disabled={isGenerating}>
              {isGenerating ? '생성 중...' : '계약서 생성'}
            </Button>
          </div>
        </form>
      </FormProvider>

      {/* 로딩 오버레이 */}
      {isGenerating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
    </div>
  );
};
