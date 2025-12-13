import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import { workerStorage } from '../../services/workerStorage';

interface AddWorkerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface WorkerFormData {
  name: string;
  residentNumber: string;
  address: string;
  phone: string;
}

const AddWorkerModal: React.FC<AddWorkerModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WorkerFormData>();

  const onSubmit = async (data: WorkerFormData) => {
    try {
      setIsSubmitting(true);
      await workerStorage.create(data);
      reset();
      onSuccess();
      onClose();
    } catch (error) {
      console.error('근로자 추가 실패:', error);
      alert('근로자 추가에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="근로자 추가">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            label="이름"
            placeholder="홍길동"
            {...register('name', { required: '이름을 입력해주세요' })}
            error={errors.name?.message}
          />
        </div>

        <div>
          <Input
            label="주민등록번호"
            placeholder="123456-1234567"
            {...register('residentNumber', {
              required: '주민등록번호를 입력해주세요',
              pattern: {
                value: /^\d{6}-\d{7}$/,
                message: '올바른 형식으로 입력해주세요 (예: 123456-1234567)',
              },
            })}
            error={errors.residentNumber?.message}
          />
        </div>

        <div>
          <Input
            label="주소"
            placeholder="서울시 강남구 테헤란로 123"
            {...register('address', { required: '주소를 입력해주세요' })}
            error={errors.address?.message}
          />
        </div>

        <div>
          <Input
            label="전화번호"
            placeholder="010-1234-5678"
            {...register('phone', {
              required: '전화번호를 입력해주세요',
              pattern: {
                value: /^01\d{1}-\d{3,4}-\d{4}$/,
                message: '올바른 형식으로 입력해주세요 (예: 010-1234-5678)',
              },
            })}
            error={errors.phone?.message}
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? '추가 중...' : '추가'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddWorkerModal;
