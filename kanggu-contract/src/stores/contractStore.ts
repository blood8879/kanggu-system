import { create } from 'zustand';
import type { ContractFormData, Worker } from '../types/contract';

interface ContractStore {
  contractData: ContractFormData;
  updateContractData: (data: Partial<ContractFormData>) => void;
  addWorker: () => void;
  removeWorker: (index: number) => void;
  updateWorker: (index: number, worker: Worker) => void;
  resetForm: () => void;
}

const DEFAULT_VALUES: ContractFormData = {
  companyName: '㈜강구토건',
  representative: '이진호',
  companyAddress: '서울시 마포구 희우정로16, 8층',
  workers: [{}], // 최소 1명
  dailyWage: 160000,
  contractStartDate: new Date(),
};

export const useContractStore = create<ContractStore>((set) => ({
  contractData: DEFAULT_VALUES,
  updateContractData: (data) =>
    set((state) => ({
      contractData: { ...state.contractData, ...data },
    })),
  addWorker: () =>
    set((state) => ({
      contractData: {
        ...state.contractData,
        workers: [...state.contractData.workers, {}],
      },
    })),
  removeWorker: (index) =>
    set((state) => ({
      contractData: {
        ...state.contractData,
        workers: state.contractData.workers.filter((_, i) => i !== index),
      },
    })),
  updateWorker: (index, worker) =>
    set((state) => ({
      contractData: {
        ...state.contractData,
        workers: state.contractData.workers.map((w, i) =>
          i === index ? worker : w
        ),
      },
    })),
  resetForm: () => set({ contractData: DEFAULT_VALUES }),
}));
