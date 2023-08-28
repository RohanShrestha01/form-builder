import type { Request, Response, NextFunction } from 'express';
import { allowedOrigins } from '../utils/constants';

const credentials = (req: Request, res: Response, next: NextFunction) => {
  if (allowedOrigins.includes(req.headers.origin!))
    res.header('Access-Control-Allow-Credentials', 'true');

  next();
};

export default credentials;
