import { type Response, type Request, type NextFunction } from 'express';
import { hash, compare } from 'bcrypt';
import { registerSchema } from '@form-builder/validation';
import { sign } from 'jsonwebtoken';

import User from '../models/userModel';
import catchAsyncError from '../utils/catchAsyncError';
import AppError from '../utils/appError';

const signAccessToken = (id: string) =>
  sign({ id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: '1h',
  });

const signRefreshToken = (id: string) =>
  sign({ id }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: '7d',
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

    const user = await User.findOne({ email: result.data.email });
    if (user)
      return next(
        new AppError('User already exists!', 409, {
          email: ['Email already exists'],
        }),
      );

    const { name, email } = result.data;
    const password = await hash(result.data.password, 12);

    const newUser = await User.create({ name, email, password });

    const refreshToken = signRefreshToken(newUser._id.toString());
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      status: 'success',
      accessToken: signAccessToken(newUser._id.toString()),
      data: {
        user: newUser,
      },
    });
  },
);

export const login = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password)
      return next(new AppError('Please provide email and password!', 400));

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await compare(password, user.password)))
      return next(new AppError('Incorrect email or password!', 401));

    const refreshToken = signRefreshToken(user._id.toString());
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      status: 'success',
      accessToken: signAccessToken(user._id.toString()),
      data: {
        user,
      },
    });
  },
);
