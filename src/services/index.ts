import { ZodError } from 'zod';
import { Model } from '../interfaces/ModelInterface';
import { Err, ErrMsg } from '../utils';

export interface ServiceError {
  error: ZodError;
}
abstract class Service<T> {
  constructor(protected model: Model<T>) { }

  abstract create(obj: T): Promise<T | null>;

  public async read(): Promise<T[]> {
    const res = await this.model.read();
    return res;
  }

  public async readOne(id: string): Promise<T> {
    const res = await this.model.readOne(id);
    if (!res) {
      throw new Err('NOT_FOUND', ErrMsg.ObjNotFound);
    }
    return res;
  }

  public async update(id: string, obj: T): Promise<T | null> {
    const res = await this.model.update(id, obj);
    if (!res) {
      throw new Err('NOT_FOUND', ErrMsg.ObjNotFound);
    }
    return res;
  }

  public async delete(id: string): Promise<T | null> {
    await this.model.readOne(id);
    const res = await this.model.delete(id);
    return res;
  }
}

export default Service;