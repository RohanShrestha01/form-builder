import type { IUser } from '../models/userModel';

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}
