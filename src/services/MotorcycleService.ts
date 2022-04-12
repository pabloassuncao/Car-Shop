import { Motorcycle } from '../interfaces/MotorcycleInterface';
import Service from '.';
import MotorcycleModel from '../models/MotorcycleModel';

class MotorcycleService extends Service<Motorcycle> {
  constructor(model = new MotorcycleModel()) {
    super(model);
  }

  public async create(obj: Motorcycle): Promise<Motorcycle | null> {
    const res = await this.model.create(obj);
    return res;
  }

  public async read(): Promise<Motorcycle[]> {
    const res = await this.model.read();
    return res;
  }

  public async delete(id: string): Promise<Motorcycle | null> {
    await this.model.readOne(id);
    const res = await this.model.delete(id);
    return res;
  }
}

export default MotorcycleService;