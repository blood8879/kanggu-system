import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { startOfMonth, endOfMonth } from 'date-fns';
import { Input } from '../common/Input';
import type { ContractFormData } from '../../types/contract';

export const ContractInfoSection = () => {
  const { register, watch, setValue } = useFormContext<ContractFormData>();
  const contractStartDate = watch('contractStartDate');

  // 계약 시작일이 변경되면 계약 종료일을 해당 월의 마지막 날로 자동 설정
  // 날짜를 선택하지 않으면 이번 달 1일부터 말일까지로 설정
  useEffect(() => {
    if (contractStartDate) {
      const startDate = new Date(contractStartDate);
      const endDate = endOfMonth(startDate);
      setValue('contractEndDate', endDate);
    } else {
      // 날짜를 선택하지 않은 경우 이번 달 1일로 설정
      const today = new Date();
      const firstDayOfMonth = startOfMonth(today);
      const lastDayOfMonth = endOfMonth(today);
      setValue('contractStartDate', firstDayOfMonth);
      setValue('contractEndDate', lastDayOfMonth);
    }
  }, [contractStartDate, setValue]);

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">계약 조건</h2>

      <Input
        label="근무지 (선택)"
        {...register('workplace')}
      />

      <Input
        label="직종 (선택)"
        {...register('jobType')}
      />

      <Input
        label="계약 시작일 (선택)"
        type="date"
        {...register('contractStartDate', {
          valueAsDate: true,
        })}
      />

      <Input
        label="계약 종료일"
        type="date"
        {...register('contractEndDate', {
          valueAsDate: true,
        })}
        disabled
        className="bg-gray-100"
      />

      <Input
        label="일당"
        type="number"
        {...register('dailyWage', {
          valueAsNumber: true,
        })}
        required
      />
    </section>
  );
};
