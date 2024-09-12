import { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import express from 'express';
import { error } from './../interfaces/error';
import cookieParser from 'cookie-parser';
const xss = require('xss-clean');
import helmet from 'helmet';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import bodyParser from 'body-parser';

export const helmetMiddleware = helmet();
export const hppMiddleware = hpp();
export const sanitizeMiddleware = ExpressMongoSanitize();
export const xssMiddleware = xss();
export const bodyParserMiddleware = express.json();
export const morganMiddleware = morgan('dev');
export const cookieParserMiddleware = cookieParser();
export const formParser = express.urlencoded({ extended: true });
export const GlobalErrorHandlerMiddleware = (
  err: error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Error';
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
};
