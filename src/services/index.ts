import { ZodError } from 'zod';
import { Model } from '../interfaces/ModelInterface';
import { Err, ErrMsg } from '../utils';

export interface ServiceError {
  error: ZodError;
}
abstract class Service<T> {
  constructor(protected model: Model<T>) { }

  protected static idChecker(id: string): void {
    if (id.length < 24) {
      throw new Err('BAD_REQUEST', ErrMsg.LowID);
    }
  }

  abstract create(obj: T): Promise<T | null>;

  public async read(): Promise<T[]> {
    const res = await this.model.read();
    return res;
  }

  public async readOne(id: string): Promise<T> {
    if (id.length < 24) {
      throw new Err('BAD_REQUEST', ErrMsg.LowID);
    }

    const res = await this.model.readOne(id);
    if (!res) {
      throw new Err('NOT_FOUND', ErrMsg.ObjNotFound);
    }
    return res;
  }

  public async update(id: string, obj: T): Promise<T | null> {
    Service.idChecker(id);

    const res = await this.model.update(id, obj);

    if (!res) {
      throw new Err('NOT_FOUND', ErrMsg.ObjNotFound);
    }
    return res;
  }

  abstract delete(id: string): Promise<T | null>;
}

export default Service;