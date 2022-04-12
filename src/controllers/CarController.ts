import { Request, Response } from 'express';
import Controller, { RequestWithBody } from './index';
import CarService from '../services/CarService';
import { Car, CarSchema } from '../interfaces/CarInterface';
import { Err, HttpStatus, Routes } from '../utils';

export default class CarController extends Controller<Car> {
  private $route: string;

  constructor(
    service = new CarService(),
    route = Routes.CARS,
  ) {
    super(service);
    this.$route = route;
  }

  private static parseChecker(body: object): void {
    const parsed = CarSchema.safeParse(body);
  
    if (!parsed.success) {
      throw new Err('BAD_REQUEST', parsed.error.message);
    }
  }

  get route() { return this.$route; }

  create = async (
    req: RequestWithBody<Car>,
    res: Response<Car | null>,
  ): Promise<typeof res> => {
    CarController.parseChecker(req.body);
    const result = await this.service.create(req.body);
    console.log(result?.status);
    return res.status(201).json(result);
  };

  update = async (
    req: RequestWithBody<Car>,
    res: Response<Car>,
  ): Promise<typeof res> => {
    CarController.parseChecker(req.body);
    await this.service.update(req.params.id, req.body);
    return res.status(200).json(req.body);
  };

  delete = async (
    req: Request<{ id: string; }>,
    res: Response<Car>,
  ): Promise<typeof res> => {
    await this.service.delete(req.params.id);
    return res.status(HttpStatus.OK_NO_CONTENT).json();
  };
}
