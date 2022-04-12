import { Car } from '../interfaces/CarInterface';
import Service from '.';
import CarModel from '../models/CarModel';

class CarService extends Service<Car> {
  constructor(model = new CarModel()) {
    super(model);
  }

  public async create(obj: Car): Promise<Car | null> {
    const res = await this.model.create(obj);
    return res;
  }

  public async delete(id: string): Promise<Car | null> {
    CarService.idChecker(id);
    await this.readOne(id);
    const res = await this.model.delete(id);
    return res;
  }
}

export default CarService;