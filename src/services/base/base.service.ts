import { BaseRepository } from "@/repositories/base/base.repository";

export abstract class BaseService<T> {
  constructor(protected readonly repository: BaseRepository<T>) {}

  async getAll(): Promise<T[]> {
    return this.repository.findAll();
  }

  async getById(id: string): Promise<T | null> {
    return this.repository.findById(id);
  }
}
