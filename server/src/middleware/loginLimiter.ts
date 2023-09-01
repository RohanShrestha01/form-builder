import rateLimit from 'express-rate-limit';
import { logEvents } from './logger';

const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: {
    message:
      'Too many login attempts from this IP, please try again in a minute!',
  },
  handler: (req, res, _next, options) => {
    logEvents(
      `Too many requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
      'errorLog.log',
    );
    res.status(options.statusCode).send(options.message);
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export default loginLimiter;
