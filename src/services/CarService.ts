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
}

export default CarService;