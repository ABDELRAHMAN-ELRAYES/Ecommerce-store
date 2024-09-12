import express, { Request } from 'express';
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
