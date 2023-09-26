import { type NextFunction, type Request, type Response } from 'express';
import catchAsyncError from '../utils/catchAsyncError';
import Form from '../models/formModel';
import AppError from '../utils/appError';

export const getAllForms = catchAsyncError(
  async (req: Request, res: Response) => {
    const forms = await Form.find({ user: req.userId });

    res.status(200).json({
      status: 'success',
      data: {
        forms,
      },
    });
  },
);

export const createForm = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, elements } = req.body;

    if (!name)
      return next(new AppError('Please provide the name of the form!', 400));

    const newForm = await Form.create({
      name,
      elements: elements ?? [],
      user: req.userId,
    });

    res.status(201).json({
      status: 'success',
      data: {
        form: newForm,
      },
    });
  },
);
