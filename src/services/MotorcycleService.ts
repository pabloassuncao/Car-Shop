import { Motorcycle } from '../interfaces/MotorcycleInterface';
import Service from '.';
import MotorcycleModel from '../models/MotorcycleModel';

class MotorcycleService extends Service<Motorcycle> {
  constructor(model = new MotorcycleModel()) {
    super(model);
  }
}

export default MotorcycleService;