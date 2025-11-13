import { useFormContext, useFieldArray } from 'react-hook-form';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import type { ContractFormData } from '../../types/contract';

export const WorkersSection = () => {
  const { register, control } = useFormContext<ContractFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'workers',
  });

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">근로자 정보</h2>
        <Button
          type="button"
          onClick={() => append({})}
          variant="secondary"
        >
          근로자 추가
        </Button>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="border border-gray-300 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">근로자 {index + 1}</h3>
            {fields.length > 1 && (
              <Button
                type="button"
                onClick={() => remove(index)}
                variant="secondary"
                size="sm"
              >
                삭제
              </Button>
            )}
          </div>

          <Input
            label="이름"
            {...register(`workers.${index}.name` as const)}
          />

          <Input
            label="주민등록번호"
            {...register(`workers.${index}.residentNumber` as const)}
            placeholder="000000-0000000"
          />

          <Input
            label="주소"
            {...register(`workers.${index}.address` as const)}
          />

          <Input
            label="연락처"
            {...register(`workers.${index}.phone` as const)}
            placeholder="010-0000-0000"
          />
        </div>
      ))}
    </section>
  );
};
