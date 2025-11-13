import Dexie, { type EntityTable } from 'dexie';

export interface Worker {
  id?: number;
  name: string;
  residentNumber: string;
  address: string;
  phone: string;
}

const db = new Dexie('KangguContractDB') as Dexie & {
  workers: EntityTable<Worker, 'id'>;
};

// Schema version 1
db.version(1).stores({
  workers: '++id, name, residentNumber, phone',
});

export { db };
