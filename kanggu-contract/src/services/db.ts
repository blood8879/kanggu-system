import Dexie, { type EntityTable } from 'dexie';
import type { Worker as ContractWorker } from '../types/contract';

export interface Worker {
  id?: number;
  name: string;
  residentNumber: string;
  address: string;
  phone: string;
}

// Form data에서 DB로 변환하는 헬퍼
export function toDBWorker(worker: ContractWorker): Omit<Worker, 'id'> {
  return {
    name: worker.name || '',
    residentNumber: worker.residentNumber || '',
    address: worker.address || '',
    phone: worker.phone || '',
  };
}

const db = new Dexie('KangguContractDB') as Dexie & {
  workers: EntityTable<Worker, 'id'>;
};

// Schema version 1
db.version(1).stores({
  workers: '++id, name, residentNumber, phone',
});

export { db };
