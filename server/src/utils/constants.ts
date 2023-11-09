import type { CookieOptions } from 'express';

export const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  'https://easyformbuilder.netlify.app',
];

export const accessTokenExpiresIn = '1h';
export const refreshTokenExpiresIn = '7d';

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'none',
  secure: true,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};
