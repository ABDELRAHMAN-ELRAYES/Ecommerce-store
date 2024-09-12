import { Request, Response, NextFunction } from 'express';
import User from './../models/userModel';
import jwt from 'jsonwebtoken';
import { catchAsync } from '../utils/catchAsync';
import { ErrorType } from '../utils/ErrorType';
import cookieParser from 'cookie-parser';
import { promisify } from 'util';

const createToken = (id: string) => {
  return jwt.sign({ id }, <string>process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const sendToken = (user: any, res: Response) => {
  res.cookie('jwt', createToken(user._id), {
    expires: new Date(
      Date.now() + <any>process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  });
};

export const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!Object.keys(req.body).length) {
      return next(new ErrorType(401, 'You must input your data firstly!.'));
    }

    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    sendToken(user, res);
    res
      .status(200)
      .json({ status: 'success', message: 'You signed up successfully!.' });
  }
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.email || !req.body.password) {
      return next(new ErrorType(404, 'Email or password is not found!!.'));
    }
    const users = await User.find({ role: { $ne: 'admin' } });
    const user = await User.findOne({ email: req.body.email }).select(
      '+password'
    );

    if (!user) {
      return next(
        new ErrorType(
          401,
          'User with entered email and password is not found!.'
        )
      );
    }
    const isValid = await user.checkPassword(req.body.password, user.password);
    if (!isValid) {
      return next(
        new ErrorType(401, 'Email or password is not correct ,plz try again!.')
      );
    }

    sendToken(user, res);
    if (user.role === 'admin') {
      res.status(200).render('admin', {
        title: 'admin | dashboard',
        users,
      });
    } else {
      res.status(200).json({
        status: 'success',
        message: 'you are signed in successfully',
      });
    }
  }
);
export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;
    if (!token) {
      return next(
        new ErrorType(401, 'There is no token, your are not authorized')
      );
    }
    const decoded = await promisify(
      (
        token: string,
        jwt_pass: string,
        callback: (err: any, decoded: any) => void
      ) => {
        return jwt.verify(token, jwt_pass, callback);
      }
    )(token, <string>process.env.JWT_SECRET_KEY);

    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new ErrorType(401, 'This user doesnt exist any more!.'));
    }

    if (user.checkPasswordIfChanged(decoded.iat)) {
      return next(
        new ErrorType(
          401,
          'This user password with current token is changed ,plz login again!.'
        )
      );
    }
    req.user = user;
    next();
  }
);
export const strictUser = (...userRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!userRoles.includes(req.user.role)) {
      return next(new ErrorType(401, 'You are not authorized to do that!.'));
    }
    next();
  };
};
