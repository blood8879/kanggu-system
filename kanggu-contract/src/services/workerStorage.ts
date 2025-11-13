import { db, type Worker } from './db';

export class WorkerStorageService {
  async create(worker: Omit<Worker, 'id'>): Promise<number> {
    const id = await db.workers.add(worker);
    return id as number;
  }

  async getAll(): Promise<Worker[]> {
    return await db.workers.toArray();
  }

  async getById(id: number): Promise<Worker | undefined> {
    return await db.workers.get(id);
  }

  async update(id: number, worker: Partial<Omit<Worker, 'id'>>): Promise<number> {
    return await db.workers.update(id, worker);
  }

  async delete(id: number): Promise<void> {
    await db.workers.delete(id);
  }
}

export const workerStorage = new WorkerStorageService();
