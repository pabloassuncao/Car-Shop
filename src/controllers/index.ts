import { Request, Response } from 'express';
import Service from '../services';
import { HttpStatus } from '../utils';

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

  async read(
    _req: Request,
    res: Response<T[]>,
  ): Promise<typeof res> {
    const objs = await this.service.read();
    return res.status(HttpStatus.OK).json(objs);
  }

  async readOne(
    req: Request<{ id: string; }>,
    res: Response<T>,
  ): Promise<typeof res | void> {
    const { id } = req.params;
    const objs = await this.service.readOne(id);
    return res.status(HttpStatus.OK).json(objs).end();
  }

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
