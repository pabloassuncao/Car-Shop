import { Request, Response } from 'express';
import Controller, { RequestWithBody } from './index';
import MotorcycleService from '../services/MotorcycleService';
import { 
  Motorcycle,
  MotorcycleSchema,
} from '../interfaces/MotorcycleInterface';
import { Err, HttpStatus, Routes } from '../utils';

export default class MotorcycleController extends Controller<Motorcycle> {
  private $route: string;

  constructor(
    service = new MotorcycleService(),
    route = Routes.MOTORCYCLE,
  ) {
    super(service);
    this.$route = route;
  }

  get route() { return this.$route; }

  private static parseChecker(body: object): void {
    const parsed = MotorcycleSchema.safeParse(body);
  
    if (!parsed.success) {
      throw new Err('BAD_REQUEST', parsed.error.message);
    }
  }

  create = async (
    req: RequestWithBody<Motorcycle>,
    res: Response<Motorcycle | null>,
  ): Promise<typeof res> => {
    MotorcycleController.parseChecker(req.body);
    const result = await this.service.create(req.body);
    console.log(result?.status);
    return res.status(201).json(result);
  };

  update = async (
    req: RequestWithBody<Motorcycle>,
    res: Response<Motorcycle>,
  ): Promise<typeof res> => {
    MotorcycleController.parseChecker(req.body);
    await this.service.update(req.params.id, req.body);
    return res.status(200).json(req.body);
  };

  delete = async (
    req: Request<{ id: string; }>,
    res: Response<Motorcycle>,
  ): Promise<typeof res> => {
    await this.service.delete(req.params.id);
    return res.status(HttpStatus.OK_NO_CONTENT).json();
  };
}
