import type { NextFunction, Request } from 'express';
import { verify } from 'jsonwebtoken';

import User from '../models/userModel';
import catchAsyncError from '../utils/catchAsyncError';
import AppError from '../utils/appError';

const verifyJWT = catchAsyncError(
  async (req: Request, _, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token)
      return next(
        new AppError(
          'You are not logged in! Please log in to get access.',
          401,
        ),
      );
    verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, decoded) => {
      if (err) return next(new AppError('Invalid token!', 403));
      const { id, iat } = decoded as { id: string; iat: number };

      User.findById(id).then(user => {
        // Check if user still exists
        if (!user)
          return next(
            new AppError(
              'The user belonging to this token no longer exist.',
              401,
            ),
          );
        // Check if user changed password after the token was issued
        if (
          user.passwordChangedAt &&
          user.passwordChangedAt.getTime() > iat * 1000
        )
          return next(
            new AppError(
              'User recently changed password! Please log in again',
              401,
            ),
          );
      });

      req.userId = id;
      next();
    });
  },
);

export default verifyJWT;
