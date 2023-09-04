import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';

dotenv.config();

process.on('uncaughtException', err => {
  console.log(err.name, err.message);
  process.exit(1);
});

mongoose
  .connect(process.env.DATABASE!)
  .then(() => console.log('DB connection successful!'))
  .catch(() => console.error('DB connection failed!'));

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});

process.on('unhandledRejection', err => {
  if (err instanceof Error) console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
