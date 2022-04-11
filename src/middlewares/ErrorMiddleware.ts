import { NextFunction, Request, Response } from 'express';
import { Err, ERR_CODES } from '../utils';

export default function ErrorHandler(
  err: Err,
  __req: Request,
  res: Response,
  next: NextFunction,
) {
  const status = ERR_CODES[err.code];
  console.log('ERROOOOOOO', status, err);

  if (status) {
    return res.status(+status).json({ message: err.message }).end();
  }

  return next(err);
}
