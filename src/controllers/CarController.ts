import Controller from './index';
import CarService from '../services/CarService';
import { Car, CarSchema } from '../interfaces/CarInterface';
import { Routes } from '../utils';

export default class CarController extends Controller<Car> {
  private $route: string;

  constructor(
    service = new CarService(),
    route = Routes.CARS,
  ) {
    super(service, CarSchema);
    this.$route = route;
  }

  get route() { return this.$route; }
}
