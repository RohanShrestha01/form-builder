import { type Response, type Request, type NextFunction } from 'express';
import { hash, compare } from 'bcrypt';
import { registerSchema } from '@form-builder/validation';
import { sign } from 'jsonwebtoken';

import User from '../models/userModel';
import catchAsyncError from '../utils/catchAsyncError';
import AppError from '../utils/appError';
import {
  accessTokenExpiresIn,
  cookieOptions,
  refreshTokenExpiresIn,
} from '../utils/constants';

const signAccessToken = (id: string) =>
  sign({ id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: accessTokenExpiresIn,
  });

export const signRefreshToken = (id: string) =>
  sign({ id }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: refreshTokenExpiresIn,
  });

export const signUp = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await registerSchema.safeParseAsync(req.body);
    if (!result.success)
      return next(
        new AppError(
          'Validation failed!',
          400,
          result.error.flatten().fieldErrors,
        ),
      );

    const user = await User.findOne({ email: result.data.email }).exec();
    if (user)
      return next(
        new AppError('User already exists!', 409, {
          email: ['Email already exists'],
        }),
      );

    const { name, email } = result.data;
    const password = await hash(result.data.password, 12);

    const newUser = await User.create({ name, email, password });

    const newRefreshToken = signRefreshToken(newUser._id.toString());
    newUser.refreshToken = [newRefreshToken];
    await newUser.save();

    res.cookie('refreshToken', newRefreshToken, cookieOptions);

    res.status(201).json({
      status: 'success',
      accessToken: signAccessToken(newUser._id.toString()),
      data: {
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          avatar: newUser.avatar,
        },
      },
    });
  },
);

export const login = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { cookies } = req;
    const { email, password } = req.body;

    if (!email || !password)
      return next(new AppError('Please provide email and password!', 400));

    const user = await User.findOne({ email }).select('+password').exec();
    if (!user || !(await compare(password, user.password)))
      return next(new AppError('Incorrect email or password!', 401));

    const newRefreshToken = signRefreshToken(user._id.toString());
    let newRefreshTokenArray = !cookies?.refreshToken
      ? user.refreshToken
      : user.refreshToken.filter(r => r !== cookies.refreshToken);
    if (cookies?.refreshToken) {
      /* For this scenario: 
        1) User logs in but never uses refresh token and does not log out
        2) Refresh token is stolen
        3) If 1 and 2 happen, reuse detection is needed to clear all refresh tokens when user logs in 
      */
      const foundToken = await User.findOne({
        refreshToken: cookies.refreshToken,
      }).exec();
      // Detected refresh token reuse
      if (!foundToken) newRefreshTokenArray = [];

      res.clearCookie('refreshToken', cookieOptions);
    }

    user.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    await user.save();

    res.cookie('refreshToken', newRefreshToken, cookieOptions);

    res.status(200).json({
      status: 'success',
      accessToken: signAccessToken(user._id.toString()),
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        },
      },
    });
  },
);

export const logout = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) return res.sendStatus(204);

  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie('refreshToken', cookieOptions);
    return res.sendStatus(204);
  }

  foundUser.refreshToken = foundUser.refreshToken.filter(
    r => r !== refreshToken,
  );
  await foundUser.save();

  res.clearCookie('refreshToken', cookieOptions);
  res.sendStatus(204);
};
