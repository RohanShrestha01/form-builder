import { z } from 'zod';

const password = z
  .string({ required_error: 'Please provide a password' })
  .regex(new RegExp('.*[A-Z].*'), 'Must contain a uppercase character')
  .regex(new RegExp('.*[a-z].*'), 'Must contain a lowercase character')
  .regex(new RegExp('.*\\d.*'), 'Must contain a number')
  .regex(
    new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
    'Must contain a special character',
  )
  .min(8, 'Password must be at least 8 characters');

export const registerSchema = z
  .object({
    name: z
      .string({ required_error: 'Please tell us your name' })
      .trim()
      .min(1, 'Please tell us your name')
      .max(30),
    email: z
      .string({ required_error: 'Please provide your email' })
      .email('Please enter a valid email'),
    password,
    cPassword: z.string({ required_error: 'Please confirm your password' }),
  })
  .refine(({ password, cPassword }) => password === cPassword, {
    path: ['cPassword'],
    message: 'Password and Confirm password must match',
  });

export const forgotPasswordSchema = z.object({
  email: z
    .string({ required_error: 'Please provide your email' })
    .email('Please enter a valid email'),
});

export const resetPasswordSchema = z
  .object({
    newPassword: password,
    cNewPassword: z.string({
      required_error: 'Please confirm your new password',
    }),
  })
  .refine(({ newPassword, cNewPassword }) => newPassword === cNewPassword, {
    path: ['cNewPassword'],
    message: 'New password and Confirm password must match',
  });

export const changePasswordSchema = z
  .object({
    oldPassword: z.string({ required_error: 'Please provide old password' }),
    newPassword: password,
    cNewPassword: z.string({
      required_error: 'Please confirm your new password',
    }),
  })
  .refine(({ newPassword, cNewPassword }) => newPassword === cNewPassword, {
    path: ['cNewPassword'],
    message: 'New password and Confirm password must match',
  });

export const userProfileSchema = z.object({
  name: z
    .string({ required_error: 'Please tell us your name' })
    .trim()
    .min(1, 'Please tell us your name')
    .max(30)
    .optional(),
  email: z
    .string({ required_error: 'Please provide your email' })
    .email('Please enter a valid email')
    .optional(),
});
