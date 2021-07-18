import { Router } from './router';
import {
  Chats,
  NotFound,
  Profile,
  ProfileEdit,
  ProfilePassword,
  ServerError,
  SignIn,
  SignUp,
} from '../pages';

let routerInstance: Router;

export default function router() {
  if (!routerInstance) {
    routerInstance = new Router('.app');

    routerInstance
      .use('/sign_in', SignIn)
      .use('/sign_up', SignUp)
      .use('/change_password', ProfilePassword)
      .use('/change_profile_info', ProfileEdit)
      .use('/', Chats)
      .use('/profile', Profile)
      .use('/404', NotFound)
      .use('/500', ServerError)
      .start();
  }

  return routerInstance;
}

router();
