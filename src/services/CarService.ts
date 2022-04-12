import { Car } from '../interfaces/CarInterface';
import Service from '.';
import CarModel from '../models/CarModel';

class CarService extends Service<Car> {
  constructor(model = new CarModel()) {
    super(model);
  }
}

export default CarService;