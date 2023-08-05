import { type ErrorRequestHandler } from 'express';

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  _req,
  res,
  _next,
) => {
  const { message, data, isOperational } = err;
  err.statusCode = isOperational ? err.statusCode || 500 : 500;
  err.status = isOperational ? err.status || 'error' : 'error';

  if (isOperational) console.error(err);

  res.status(err.statusCode).json({
    status: err.status,
    message: isOperational ? message : 'Something went wrong!',
    data,
  });
};
