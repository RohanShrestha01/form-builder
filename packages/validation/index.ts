import z from 'zod';

export const registerSchema = z
  .object({
    name: z.string().trim().min(1, 'Please tell us your name').max(30),
    email: z
      .string()
      .min(1, 'Please provide your email')
      .email('Please enter a valid email'),
    password: z
      .string()
      .nonempty('Please provide a password')
      .min(8, 'Password must be at least 8 characters')
      .regex(new RegExp('.*[A-Z].*'), 'Must contain a uppercase character')
      .regex(new RegExp('.*[a-z].*'), 'Must contain a lowercase character')
      .regex(new RegExp('.*\\d.*'), 'Must contain a number')
      .regex(
        new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
        'Must contain a special character',
      ),
    cPassword: z.string(),
  })
  .refine(({ password, cPassword }) => password === cPassword, {
    path: ['cPassword'],
    message: 'Password and Confirm password must match',
  });
