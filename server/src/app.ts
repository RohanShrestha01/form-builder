import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRouter from './routes/authRoutes';
import userRouter from './routes/userRoutes';
import AppError from './utils/appError';
import { globalErrorHandler } from './controllers/errorController';
import verifyJWT from './middleware/verifyJWT';
import { allowedOrigins } from './utils/constants';
import credentials from './middleware/credentials';
import logger from './middleware/logger';

const app: Application = express();

app.use(logger);

app.use(credentials);
app.use(cors({ origin: allowedOrigins }));

app.use(cookieParser());
app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use(verifyJWT);
app.use('/api/v1/user', userRouter);

app.all('*', (req, _res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
