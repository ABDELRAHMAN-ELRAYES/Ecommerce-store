import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import User from '../models/userModel';
import Tour from '../models/tourModel'

export const renderHome = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const tours = await Tour.find();
    res.status(200).render('home', {
      title: 'Storak | All products',
      tours
    });
  }
);

export const renderLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).render('login', {
      title: 'login',
    });
  }
);

export const renderSignup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).render('signup', {
      title: 'signup',
    });
  }
);
export const renderSearch = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({ email: req.body.search });
    const users = await User.find({ role: { $ne: 'admin' } });
    res.status(200).render('search', {
      title: 'admin | dashboard',
      user,
      users
    });
  }
);
export const renderCreate = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.confirmPassword,
    });
    const users = await User.find({ role: { $ne: 'admin' } });
    res.status(200).render('admin', {
      title: 'admin | dashboard',
      users,
      msg: {
        content: 'Employee is created successfully!.',
        type: 'created-msg',
      },
    });
  }
);
export const renderDelete = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findByIdAndDelete(req.params.id);
    const users = await User.find({ role: { $ne: 'admin' } });
    res.status(200).render('admin', {
      title: 'admin | dashboard',
      users,
      msg: {
        content: 'Employee is deleted successfully!.',
        type: 'deleted-msg',
      },
    });
  }
);
export const renderUpdate = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.params.id);
    res.status(200).render('update', {
      title: 'admin | dashboard',
      user,
    });
  }
);
export const handleUpdate = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const actualUser = await User.findById(req.params.id);

    if (
      actualUser?.name !== req.body.name &&
      actualUser?.email === req.body.email
    ) {
      const user = await User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
      });
    } else if (
      actualUser?.name === req.body.name &&
      actualUser?.email !== req.body.email
    ) {
      const user = await User.findByIdAndUpdate(req.params.id, {
        email: req.body.email,
      });
    } else {
      const user = await User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
      });
    }
    const users = await User.find({ role: { $ne: 'admin' } });
    res.status(200).render('admin', {
      title: 'admin | dashboard',
      users,
      msg: {
        content: 'Employee is updated successfully!.',
        type: 'updated-msg',
      },
    });
  }
);
