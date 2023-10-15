import { type NextFunction, type Request, type Response } from 'express';
import catchAsyncError from '../utils/catchAsyncError';
import Form from '../models/formModel';
import AppError from '../utils/appError';

export const getAllForms = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const page = Number(req.query.page) || 0;
    const pageSize = Number(req.query.pageSize) || 10;
    const skip = page * pageSize;
    const searchQuery = req.query.search;

    const query = searchQuery
      ? { user: req.userId, name: { $regex: searchQuery, $options: 'i' } }
      : { user: req.userId };
    const total = await Form.countDocuments(query);

    if (req.query.page && req.query.page !== '0' && skip >= total)
      return next(new AppError('This page does not exist', 404));

    const forms = await Form.find(query)
      .sort(req.query.sort?.toString())
      .skip(skip)
      .limit(pageSize)
      .exec();

    res.status(200).json({
      status: 'success',
      data: {
        forms,
        total,
      },
    });
  },
);

export const deleteForms = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { forms } = req.body;
    if (!forms)
      return next(new AppError('Please provide list of form id!', 400));

    await Form.deleteMany({ _id: { $in: forms } });

    res.sendStatus(204);
  },
);

export const getForm = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const form = await Form.findById(req.params.id);
    if (!form) return next(new AppError('No form found with that ID', 404));

    res.status(200).json({
      status: 'success',
      data: {
        form,
      },
    });
  },
);

export const createForm = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, elements } = req.body;

    if (!name)
      return next(new AppError('Please provide the name of the form!', 400));

    if (elements.length === 0)
      return next(new AppError('Please add some elements to the form!', 400));

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

export const updateForm = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const form = await Form.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!form) return next(new AppError('No form found with that ID', 404));

    res.status(200).json({
      status: 'success',
      data: {
        form,
      },
    });
  },
);

export const deleteForm = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const form = await Form.findByIdAndDelete(req.params.id);
    if (!form) return next(new AppError('No form found with that ID', 404));

    res.sendStatus(204);
  },
);
