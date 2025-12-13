import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { workerStorage } from '../../services/workerStorage';
import type { Worker } from '../../services/db';

interface SelectWorkerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (worker: Worker) => void;
}

const SelectWorkerModal: React.FC<SelectWorkerModalProps> = ({ isOpen, onClose, onSelect }) => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadWorkers();
    }
  }, [isOpen]);

  const loadWorkers = async () => {
    setIsLoading(true);
    try {
      const allWorkers = await workerStorage.getAll();
      setWorkers(allWorkers);
    } catch (error) {
      console.error('근로자 목록 로드 실패:', error);
      alert('근로자 목록을 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredWorkers = workers.filter((worker) =>
    worker.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (worker: Worker) => {
    onSelect(worker);
    setSearchTerm('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="근로자 선택">
      <div className="space-y-4">
        <Input
          placeholder="이름으로 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {isLoading ? (
          <div className="text-center py-8 text-gray-500">로딩 중...</div>
        ) : filteredWorkers.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {searchTerm ? '검색 결과가 없습니다.' : '등록된 근로자가 없습니다.'}
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            <table className="w-full">
              <thead className="sticky top-0 z-10 bg-[var(--color-luxury-card-bg)] border-b border-gray-200">
                <tr>
                  <th className="px-2 py-2 text-left text-sm">이름</th>
                  <th className="px-2 py-2 text-left text-sm">주민번호</th>
                  <th className="px-2 py-2 text-left text-sm">전화번호</th>
                  <th className="px-2 py-2 text-left text-sm">작업</th>
                </tr>
              </thead>
              <tbody>
                {filteredWorkers.map((worker) => (
                  <tr
                    key={worker.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-2 py-2 text-sm">{worker.name}</td>
                    <td className="px-2 py-2 text-sm">{worker.residentNumber}</td>
                    <td className="px-2 py-2 text-sm">{worker.phone}</td>
                    <td className="px-2 py-2">
                      <Button size="sm" onClick={() => handleSelect(worker)}>
                        선택
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-end pt-4">
          <Button variant="secondary" onClick={onClose}>
            닫기
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SelectWorkerModal;
