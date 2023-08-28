import type { NextFunction, Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';

import User from '../models/userModel';
import catchAsyncError from '../utils/catchAsyncError';
import AppError from '../utils/appError';

const refreshTokenHandler = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken as string;
    if (!refreshToken) return next(new AppError('No refresh token!', 401));

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) return next(new AppError('Invalid refresh token!', 403));

    verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, (err, decoded) => {
      if (err || foundUser._id.toString() !== (decoded as { id: string }).id)
        return next(new AppError('Invalid refresh token!', 403));

      const accessToken = sign(
        { id: foundUser._id.toString() },
        process.env.ACCESS_TOKEN_SECRET!,
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
        },
      );

      res.status(200).json({
        status: 'success',
        accessToken,
      });
    });
  },
);

export default refreshTokenHandler;
