import express, { Request, Response, NextFunction } from 'express';
import {
  morganMiddleware,
  bodyParserMiddleware,
  GlobalErrorHandlerMiddleware,
  cookieParserMiddleware,
  helmetMiddleware,
  hppMiddleware,
  sanitizeMiddleware,
  xssMiddleware,
  formParser,
} from './middlewares/middlewares';
import userRouter from './routes/userRoutes';
import { ErrorType } from './utils/ErrorType';
import path from 'path';
import viewRouter from './routes/viewRoutes';
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(helmetMiddleware);
app.use(hppMiddleware);
app.use(sanitizeMiddleware);
app.use(xssMiddleware);
app.use(morganMiddleware);
app.use(bodyParserMiddleware);
app.use(cookieParserMiddleware);
app.use(formParser);

app.use('/', viewRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new ErrorType(404, `This route provided ${req.originalUrl} not found `));
});
app.use(GlobalErrorHandlerMiddleware);

export default app;
