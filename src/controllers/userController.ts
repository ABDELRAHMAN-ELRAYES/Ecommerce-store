import { Request, Response, NextFunction } from 'express';
import User from './../models/userModel';
import { catchAsync } from '../utils/catchAsync';
import path from 'path';

export const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find();
    res.status(200).json({
      status: 'success',
      results: users.length,
      users,
    });
  }
);
/* export const renderHome = (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(path.join(__dirname + `/../templates/login.html`));
};
 */
