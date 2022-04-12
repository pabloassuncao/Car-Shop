export interface ErrList {
  readonly BAD_REQUEST: number,
  readonly UNAUTHORIZED: number,
  readonly NOT_FOUND: number,
  readonly CONFLICT: number,
  readonly UNPROCCESSABLE_ENTITY: number,
  readonly 'array.base': number,
  readonly 'array.min': number,
  readonly 'string.empty': number,
  readonly 'string.base': number,
  readonly 'string.min': number,
  readonly 'string.email': number,
  readonly 'any.required': number,
  readonly 'number.min': number,
  readonly 'number.base': number,
}

export enum ErrMsg {
  LowID = 'Id must have 24 hexadecimal characters',
  ObjNotFound = 'Object not found',
}

export class Err extends Error {
  code: keyof ErrList;

  message: string;

  constructor(code: keyof ErrList, message = '') {
    super();
    this.code = code;
    this.message = message;
  }
}

// HTTP response status codes
export enum HttpStatus{
  OK = 200,
  CREATED = 201,
  OK_NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
}

// Errors code
export const ERR_CODES: ErrList = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCCESSABLE_ENTITY: 422,
  'array.base': 422,
  'array.min': 422,
  'string.empty': 422,
  'string.base': 422,
  'string.min': 422,
  'string.email': 422,
  'any.required': 400,
  'number.min': 422,
  'number.base': 422,
};

// Routes
export enum Routes {
  CARS = '/cars',
  MOTORCYCLE = '/motorcycles',
}
