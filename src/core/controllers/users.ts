import store from '../../store';
import APIClient from '../api/http';

export interface IUser {
  id: number;
  first_name:	string;
  second_name:	string;
  display_name:	string | null;
  login:	string;
  email:	string;
  phone:	string;
  avatar:	string | null;
}

class UserSController {
  public async getUser(fetch = false) {
    let user: IUser | unknown = store.get('user');

    if (!user && fetch) {
      user = await this.fetchUser();
    }

    return user;
  }

  public async fetchUser() {
    try {
      const { response } = await APIClient.get('/auth/user');
      const user = JSON.parse(response);

      store.set('user', user);
      console.log('1111111111111111', store.get('user'), user);

      return user;
    } catch (error) {
      console.log(error);
    }
  }

  public async searchUser(login: string) {
    try {
      const { response } = await APIClient.post('/user/search', { data: { login } });

      console.log('searchUser', response);

      return JSON.parse(response);
    } catch (error) {
      console.log(error);
    }
  }

  public async changeUserProfile(data) {
    try {
      await APIClient.put('/user/profile', { data });
    } catch (error) {
      console.log(error);
    }
  }

  public async changePassword(data) {
    try {
      await APIClient.put('/user/password', { data });
    } catch (error) {
      console.log(error);
    }
  }

  public async logout() {
    try {
      await APIClient.post('/user/logout');
    } catch (error) {
      console.log(error);
    }
  }
}

const UsersControllerInstance = new UserSController();

export default UsersControllerInstance;
