import { validationResult } from 'express-validator';
import { ErrorResponse } from './errorHandler.js';

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map(err => err.msg).join(', ');
    return next(new ErrorResponse(messages, 400));
  }
  next();
};
