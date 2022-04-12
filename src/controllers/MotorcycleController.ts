import Controller from './index';
import MotorcycleService from '../services/MotorcycleService';
import { 
  Motorcycle,
  MotorcycleSchema,
} from '../interfaces/MotorcycleInterface';
import { Routes } from '../utils';

export default class MotorcycleController extends Controller<Motorcycle> {
  private $route: string;

  constructor(
    service = new MotorcycleService(),
    route = Routes.MOTORCYCLE,
  ) {
    super(service, MotorcycleSchema);
    this.$route = route;
  }

  get route() { return this.$route; }
}
