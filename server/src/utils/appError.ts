interface Errors {
  [key: string]: string[];
}

export default class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean = true;
  errors?: Errors;

  constructor(message: string, statusCode: number, errors?: Errors) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}
