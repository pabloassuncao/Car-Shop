import { Request, Response } from 'express';
import { ZodSchema } from 'zod';
import Service from '../services';
import { Err, HttpStatus } from '../utils';

export interface RequestWithBody<T> extends Request {
  body: T;
}

abstract class Controller<T> {
  abstract route: string;

  constructor(
    protected service: Service<T>,
    protected schema: ZodSchema<T>,
  ) {}

  private parseChecker(body: T): void {
    const parsed = this.schema.safeParse(body);
  
    if (!parsed.success) {
      throw new Err('BAD_REQUEST', parsed.error.message);
    }
  }

  create = async (
    req: RequestWithBody<T>,
    res: Response<T | null>,
  ): Promise<typeof res> => {
    this.parseChecker(req.body);
    const result = await this.service.create(req.body);
    return res.status(HttpStatus.CREATED).json(result);
  };

  read = async (
    _req: Request,
    res: Response<T[]>,
  ): Promise<typeof res> => {
    const objs = await this.service.read();
    return res.status(HttpStatus.OK).json(objs);
  };

  readOne = async (
    req: Request<{ id: string; }>,
    res: Response<T>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    const obj = await this.service.readOne(id);
    return res.status(HttpStatus.OK).json(obj);
  };

  update = async (
    req: RequestWithBody<T>,
    res: Response<T>,
  ): Promise<typeof res> => {
    this.parseChecker(req.body);
    await this.service.update(req.params.id, req.body);
    return res.status(HttpStatus.OK).json(req.body);
  };

  delete = async (
    req: Request<{ id: string; }>,
    res: Response<T>,
  ): Promise<typeof res> => {
    await this.service.delete(req.params.id);
    return res.status(HttpStatus.OK_NO_CONTENT).json();
  };
}

export default Controller;
