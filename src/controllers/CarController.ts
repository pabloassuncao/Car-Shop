import { Request, Response } from 'express';
import Controller, { RequestWithBody } from './index';
import CarService from '../services/CarService';
import { Car, CarSchema } from '../interfaces/CarInterface';
import { Err, HttpStatus, Routes, ErrMsg } from '../utils';

export default class CarsController extends Controller<Car> {
  private $route: string;

  constructor(
    service = new CarService(),
    route = Routes.CARS,
  ) {
    super(service);
    this.$route = route;
  }

  get route() { return this.$route; }

  create = async (
    req: RequestWithBody<Car>,
    res: Response<Car | null>,
  ): Promise<typeof res> => {
    const parsed = CarSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new Err('BAD_REQUEST', parsed.error.message);
    }
    const result = await this.service.create(req.body);
    console.log(result?.status);
    return res.status(201).json(result);
  };

  readOne = async (
    req: Request<{ id: string; }>,
    res: Response<Car>,
  ): Promise<typeof res> => {
    if (req.params.id.length < 24) {
      throw new Err('BAD_REQUEST', ErrMsg.LowID);
    }

    const obj = await this.service.readOne(req.params.id);
    return res.status(200).json(obj);
  };

  read = async (
    _req: Request,
    res: Response<Car[]>,
  ): Promise<typeof res> => {
    const objs = await this.service.read();
    return res.status(200).json(objs);
  };

  update = async (
    req: RequestWithBody<Car>,
    res: Response<Car>,
  ): Promise<typeof res> => {
    if (req.params.id.length < 24) {
      throw new Err('BAD_REQUEST', ErrMsg.LowID);
    }

    const parsed = CarSchema.safeParse(req.body);
  
    if (!parsed.success) {
      throw new Err('UNAUTHORIZED', parsed.error.message);
    }

    await this.service.update(req.params.id, req.body);
    return res.status(200).json(req.body);
  };

  delete = async (
    req: Request<{ id: string; }>,
    res: Response<Car>,
  ): Promise<typeof res> => {
    if (req.params.id.length < 24) {
      throw new Err('BAD_REQUEST', ErrMsg.LowID);
    }
    await this.service.delete(req.params.id);
    return res.status(HttpStatus.OK_NO_CONTENT).json();
  };
}
