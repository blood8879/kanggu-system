import React, { useState, useEffect } from 'react';
import { workerStorage } from '../services/workerStorage';
import type { Worker } from '../services/db';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';

export const WorkersPage: React.FC = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    loadWorkers();
  }, []);

  const loadWorkers = async () => {
    const allWorkers = await workerStorage.getAll();
    setWorkers(allWorkers);
  };

  const handleDelete = async (id: number | undefined) => {
    if (!id) return;
    if (!confirm('정말 삭제하시겠습니까?')) return;
    await workerStorage.delete(id);
    await loadWorkers();
  };

  // Pagination
  const totalPages = Math.ceil(workers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentWorkers = workers.slice(startIndex, endIndex);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">근로자 관리</h1>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-2 py-2 text-left">이름</th>
                <th className="px-2 py-2 text-left">주민번호</th>
                <th className="px-2 py-2 text-left">주소</th>
                <th className="px-2 py-2 text-left">전화번호</th>
                <th className="px-2 py-2 text-left">작업</th>
              </tr>
            </thead>
            <tbody>
              {currentWorkers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-2 py-4 text-center text-gray-500">
                    등록된 근로자가 없습니다.
                  </td>
                </tr>
              ) : (
                currentWorkers.map((worker) => (
                  <tr key={worker.id} className="border-b border-gray-100">
                    <td className="px-2 py-2">{worker.name}</td>
                    <td className="px-2 py-2">{worker.residentNumber}</td>
                    <td className="px-2 py-2">{worker.address}</td>
                    <td className="px-2 py-2">{worker.phone}</td>
                    <td className="px-2 py-2">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(worker.id)}
                      >
                        삭제
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-4">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              이전
            </Button>
            <span className="px-2 py-2">
              {currentPage} / {totalPages}
            </span>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              다음
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};
