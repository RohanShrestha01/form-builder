interface Data {
  [key: string]: string[];
}

export default class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean = true;
  data?: Data;

  constructor(message: string, statusCode: number, data?: Data) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.data = data;

    Error.captureStackTrace(this, this.constructor);
  }
}
