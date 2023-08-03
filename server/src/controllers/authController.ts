import { type Response, type Request } from 'express';
import User from '../models/userModel';
import catchAsyncError from '../utils/catchAsyncError';

export const signUp = catchAsyncError(async (req: Request, res: Response) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
});
