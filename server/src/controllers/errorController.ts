import { type ErrorRequestHandler } from 'express';
import { logEvents } from '../middleware/logger';

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  _next,
) => {
  const { message, data, errors, isOperational } = err;
  err.statusCode = isOperational ? err.statusCode || 500 : 500;
  err.status = isOperational ? err.status || 'error' : 'error';

  logEvents(
    `${message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    'errorLog.log',
  );

  if (!isOperational) console.error(err);

  res.status(err.statusCode).json({
    status: err.status,
    message: isOperational ? message : 'Something went wrong!',
    data,
    errors,
  });
};
