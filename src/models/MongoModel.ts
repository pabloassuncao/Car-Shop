import { Model as M, Document } from 'mongoose';
import { Model } from '../interfaces/ModelInterface';

abstract class MongoModel<T> implements Model<T> {
  constructor(public model: M<T & Document>) { }

  async create(obj: T): Promise<T> {
    const res = await this.model.create({ ...obj });
    return res;
  }

  async read(): Promise<T[]> {
    const res = await this.model.find();
    return res;
  }

  async readOne(id: string): Promise<T | null> {
    const res = await this.model.findById(id);
    return res;
  }

  async delete(id_: string): Promise<T | null> {
    const res = await this.model.findByIdAndDelete(id_);
    return res;
  }

  async update(id_: string, obj: T): Promise<T | null> {
    const res = await this.model.findByIdAndUpdate(id_, obj);
    return res;
  }
}

export default MongoModel;