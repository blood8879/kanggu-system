import { useFormContext } from 'react-hook-form';
import { Input } from '../common/Input';
import type { ContractFormData } from '../../types/contract';

export const CompanyInfoSection = () => {
  const { register } = useFormContext<ContractFormData>();

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">회사 정보</h2>

      <Input
        label="회사명"
        {...register('companyName')}
        required
      />

      <Input
        label="대표자"
        {...register('representative')}
        required
      />

      <Input
        label="회사 주소"
        {...register('companyAddress')}
        required
      />

      <Input
        label="현장 주소 (선택)"
        {...register('siteAddress')}
      />

      <Input
        label="현장 소장 (선택)"
        {...register('siteManager')}
      />
    </section>
  );
};
