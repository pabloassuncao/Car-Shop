import { Request, Response } from 'express';
import Service from '../services';

export interface RequestWithBody<T> extends Request {
  body: T;
}

abstract class Controller<T> {
  abstract route: string;

  constructor(protected service: Service<T>) { }

  abstract create(
    req: RequestWithBody<T>,
    res: Response<T>,
  ): Promise<typeof res | void>;

  read = async (
    _req: Request,
    res: Response<T[]>,
  ): Promise<typeof res> => {
    const objs = await this.service.read();
    return res.status(200).json(objs);
  };

  readOne = async (
    req: Request<{ id: string; }>,
    res: Response<T>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    const obj = await this.service.readOne(id);
    return res.status(200).json(obj);
  };

  abstract update(
    req: RequestWithBody<T>,
    res: Response<T>,
  ): Promise<typeof res | void>;

  abstract delete(
    req: Request<{ id: string; }>,
    res: Response<T>,
  ): Promise<typeof res>;
}

export default Controller;
