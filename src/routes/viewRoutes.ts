import { Router } from 'express';
import {
  renderCreate,
  renderDelete,
  renderHome,
  renderLogin,
  renderSearch,
  renderSignup,
  renderUpdate,
  handleUpdate,
} from './../controllers/viewControllers';

const viewRouter = Router();
viewRouter.route('/').get(renderHome).post(renderCreate);
viewRouter.route('/user/:id').post(renderDelete);
viewRouter.route('/edit-user/:id').get(renderUpdate).post(handleUpdate);
viewRouter.route('/user').post(renderSearch);
viewRouter.route('/login').get(renderLogin);
viewRouter.route('/signup').get(renderSignup);

export default viewRouter;
