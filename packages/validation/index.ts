import z from 'zod';

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
    password: z
      .string({ required_error: 'Please provide a password' })
      .min(8, 'Password must be at least 8 characters')
      .regex(new RegExp('.*[A-Z].*'), 'Must contain a uppercase character')
      .regex(new RegExp('.*[a-z].*'), 'Must contain a lowercase character')
      .regex(new RegExp('.*\\d.*'), 'Must contain a number')
      .regex(
        new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
        'Must contain a special character',
      ),
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
    newPassword: z
      .string({ required_error: 'Please provide new password' })
      .regex(new RegExp('.*[A-Z].*'), 'Must contain a uppercase character')
      .regex(new RegExp('.*[a-z].*'), 'Must contain a lowercase character')
      .regex(new RegExp('.*\\d.*'), 'Must contain a number')
      .regex(
        new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
        'Must contain a special character',
      )
      .min(8, 'Password must be at least 8 characters'),
    cNewPassword: z.string({
      required_error: 'Please confirm your new password',
    }),
  })
  .refine(({ newPassword, cNewPassword }) => newPassword === cNewPassword, {
    path: ['cNewPassword'],
    message: 'New password and Confirm password must match',
  });
