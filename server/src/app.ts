import express, { Application } from 'express';
import bodyParser from 'body-parser';

import userRouter from './routes/userRoutes';

const app: Application = express();

app.use(bodyParser.json());

app.use('/api/v1/users', userRouter);

export default app;
