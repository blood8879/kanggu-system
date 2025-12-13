import { useState } from 'react';
import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { DatePicker } from '../common/DatePicker';
import type { ContractFormData } from '../../types/contract';
import SelectWorkerModal from '../workers/SelectWorkerModal';
import type { Worker } from '../../services/db';

export const WorkersSection = () => {
  const { register, control, setValue } = useFormContext<ContractFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'workers',
  });
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [selectedWorkerIndex, setSelectedWorkerIndex] = useState<number | null>(null);

  const handleLoadWorker = (index: number) => {
    setSelectedWorkerIndex(index);
    setIsSelectModalOpen(true);
  };

  const handleWorkerSelect = (worker: Worker) => {
    if (selectedWorkerIndex !== null) {
      setValue(`workers.${selectedWorkerIndex}.name`, worker.name);
      setValue(`workers.${selectedWorkerIndex}.residentNumber`, worker.residentNumber);
      setValue(`workers.${selectedWorkerIndex}.address`, worker.address);
      setValue(`workers.${selectedWorkerIndex}.phone`, worker.phone);
    }
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">근로자 정보 및 계약 조건</h2>
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
            <div className="flex gap-2">
              <Button
                type="button"
                onClick={() => handleLoadWorker(index)}
                variant="secondary"
                size="sm"
              >
                불러오기
              </Button>
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
          </div>

          {/* 근로자 기본 정보 */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-gray-700">기본 정보</h4>
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

          {/* 계약 조건 */}
          <div className="space-y-3 pt-3 border-t border-gray-200">
            <h4 className="font-medium text-sm text-gray-700">계약 조건</h4>
            <Input
              label="근무지 (선택)"
              {...register(`workers.${index}.workplace` as const)}
            />

            <Input
              label="직종 (선택)"
              {...register(`workers.${index}.jobType` as const)}
            />

            <Controller
              control={control}
              name={`workers.${index}.contractStartDate` as const}
              render={({ field }) => (
                <DatePicker
                  label="계약 시작일 (선택)"
                  value={field.value || null}
                  onChange={(date) => field.onChange(date)}
                  placeholder="날짜 선택"
                />
              )}
            />

            <Input
              label="일당"
              type="number"
              {...register(`workers.${index}.dailyWage` as const, {
                valueAsNumber: true,
              })}
            />
          </div>
        </div>
      ))}

      <SelectWorkerModal
        isOpen={isSelectModalOpen}
        onClose={() => setIsSelectModalOpen(false)}
        onSelect={handleWorkerSelect}
      />
    </section>
  );
};
