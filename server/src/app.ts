import express, { Application, type ErrorRequestHandler } from 'express';
import bodyParser from 'body-parser';

import userRouter from './routes/userRoutes';

const app: Application = express();

app.use(bodyParser.json());

app.use('/api/v1/users', userRouter);

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
app.use(globalErrorHandler);

export default app;
