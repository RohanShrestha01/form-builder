import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import app from './app';

mongoose.connect(process.env.DATABASE!);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});
