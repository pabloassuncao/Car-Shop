import { Request, Response } from 'express';
import Controller, { RequestWithBody } from './index';
import MotorcycleService from '../services/MotorcycleService';
import { 
  Motorcycle,
  MotorcycleSchema,
} from '../interfaces/MotorcycleInterface';
import { Err, HttpStatus, Routes, ErrMsg } from '../utils';

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

  create = async (
    req: RequestWithBody<Motorcycle>,
    res: Response<Motorcycle | null>,
  ): Promise<typeof res> => {
    const parsed = MotorcycleSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new Err('BAD_REQUEST', parsed.error.message);
    }
    const result = await this.service.create(req.body);
    console.log(result?.status);
    return res.status(201).json(result);
  };

  readOne = async (
    req: Request<{ id: string; }>,
    res: Response<Motorcycle>,
  ): Promise<typeof res> => {
    if (req.params.id.length < 24) {
      throw new Err('BAD_REQUEST', ErrMsg.LowID);
    }

    const obj = await this.service.readOne(req.params.id);
    return res.status(200).json(obj);
  };

  read = async (
    _req: Request,
    res: Response<Motorcycle[]>,
  ): Promise<typeof res> => {
    const objs = await this.service.read();
    return res.status(200).json(objs);
  };

  update = async (
    req: RequestWithBody<Motorcycle>,
    res: Response<Motorcycle>,
  ): Promise<typeof res> => {
    if (req.params.id.length < 24) {
      throw new Err('BAD_REQUEST', ErrMsg.LowID);
    }

    const parsed = MotorcycleSchema.safeParse(req.body);
  
    if (!parsed.success) {
      throw new Err('UNAUTHORIZED', parsed.error.message);
    }

    await this.service.update(req.params.id, req.body);
    return res.status(200).json(req.body);
  };

  delete = async (
    req: Request<{ id: string; }>,
    res: Response<Motorcycle>,
  ): Promise<typeof res> => {
    if (req.params.id.length < 24) {
      throw new Err('BAD_REQUEST', ErrMsg.LowID);
    }
    await this.service.delete(req.params.id);
    return res.status(HttpStatus.OK_NO_CONTENT).json();
  };
}
