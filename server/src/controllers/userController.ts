import type { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import catchAsyncError from '../utils/catchAsyncError';
import {
  changePasswordSchema,
  userProfileSchema,
} from '@form-builder/validation';
import AppError from '../utils/appError';
import User from '../models/userModel';
import { compare, hash } from 'bcrypt';
import { cookieOptions } from '../utils/constants';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

/* const multerStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(__dirname, '..', '..', 'public', 'img', 'users'));
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `user-${req.userId}-${Date.now()}.${ext}`);
  },
}); */
const multerStorage = multer.memoryStorage();

const upload = multer({
  storage: multerStorage,
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image')) cb(null, true);
    else cb(new AppError('Not an image! Please upload only images.', 400));
  },
});
export const uploadUserPhoto = upload.single('avatar');

export const resizeUserPhoto = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  if (!req.file) return next();
  if (
    !fs.existsSync(path.join(__dirname, '..', '..', 'public', 'img', 'users'))
  )
    fs.mkdirSync(path.join(__dirname, '..', '..', 'public', 'img', 'users'), {
      recursive: true,
    });

  req.file.filename = `user-${req.userId}-${Date.now()}.jpeg`;

  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(
      path.join(
        __dirname,
        '..',
        '..',
        'public',
        'img',
        'users',
        req.file.filename,
      ),
    );

  next();
};

export const changePassword = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    // Validate change password fields
    const result = await changePasswordSchema.safeParseAsync(req.body);
    if (!result.success)
      return next(
        new AppError(
          'Validation failed!',
          400,
          result.error.flatten().fieldErrors,
        ),
      );
    const { oldPassword, newPassword } = result.data;

    // Get user from collection
    const foundUser = await User.findById(req.userId)
      .select('+password')
      .exec();

    // Check if posted current password is correct
    if (!foundUser || !(await compare(oldPassword, foundUser.password)))
      return next(new AppError('Your current password is incorrect', 401));

    // If correct, update password
    foundUser.password = await hash(newPassword, 12);
    foundUser.passwordChangedAt = new Date();
    foundUser.refreshToken = [];
    await foundUser.save();

    res.clearCookie('refreshToken', cookieOptions);

    res.status(200).json({
      status: 'success',
      message: 'Password changed successfully',
    });
  },
);

export const updateProfile = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    // Validate user profile fields
    const result = await userProfileSchema.safeParseAsync(req.body);
    if (!result.success)
      return next(
        new AppError(
          'Validation failed!',
          400,
          result.error.flatten().fieldErrors,
        ),
      );

    const { name, email } = result.data;
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      {
        name,
        email,
        avatar: req.file
          ? `${req.protocol}://${req.get('host')}/img/users/${
              req.file.filename
            }`
          : req.body.avatar,
      },
      { new: true },
    );

    res.status(200).json({
      status: 'success',
      data: {
        user: {
          id: updatedUser?._id,
          name: updatedUser?.name,
          email: updatedUser?.email,
          avatar: updatedUser?.avatar,
        },
      },
    });
  },
);

export const deleteAccount = catchAsyncError(
  async (req: Request, res: Response) => {
    await User.findByIdAndUpdate(req.userId, {
      isDeleted: true,
      deletedAt: new Date(),
    });

    res.sendStatus(204);
  },
);

export const getProfile = catchAsyncError(
  async (req: Request, res: Response) => {
    const foundUser = await User.findById(req.userId)
      .select('-refreshToken -__v')
      .exec();

    res.status(200).json({
      status: 'success',
      data: {
        user: foundUser,
      },
    });
  },
);
