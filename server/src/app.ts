import express, { Application } from 'express';
import bodyParser from 'body-parser';

const app: Application = express();

app.use(bodyParser.json());

export default app;
