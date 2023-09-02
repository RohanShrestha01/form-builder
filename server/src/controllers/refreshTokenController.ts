import type { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import User from '../models/userModel';
import catchAsyncError from '../utils/catchAsyncError';
import AppError from '../utils/appError';
import { cookieOptions } from '../utils/constants';
import { signAccessToken, signRefreshToken } from './authController';

const refreshTokenHandler = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken as string;
    if (!refreshToken) return next(new AppError('No refresh token!', 401));
    res.clearCookie('refreshToken', cookieOptions);

    const foundUser = await User.findOne({ refreshToken }).exec();

    // Detected refresh token reuse
    if (!foundUser) {
      verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET!,
        async (err, decoded) => {
          if (err) return next(new AppError('Invalid refresh token!', 403));
          const hackedUser = await User.findOne({
            _id: (decoded as { id: string }).id,
          }).exec();
          if (hackedUser) {
            hackedUser.refreshToken = [];
            await hackedUser.save();
          }
        },
      );
      return next(new AppError('Invalid refresh token!', 403));
    }

    const newRefreshTokenArray = foundUser.refreshToken.filter(
      r => r !== refreshToken,
    );

    verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!,
      async (err, decoded) => {
        if (err) {
          foundUser.refreshToken = [...newRefreshTokenArray];
          await foundUser.save();
        }
        if (err || foundUser._id.toString() !== (decoded as { id: string }).id)
          return next(new AppError('Invalid refresh token!', 403));

        const accessToken = signAccessToken(foundUser._id.toString());

        const newRefreshToken = signRefreshToken(foundUser._id.toString());
        foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
        await foundUser.save();

        res.cookie('refreshToken', newRefreshToken, cookieOptions);

        res.status(200).json({
          status: 'success',
          accessToken,
        });
      },
    );
  },
);

export default refreshTokenHandler;
