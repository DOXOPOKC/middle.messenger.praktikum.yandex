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

// const loginApi = new LoginAPI();
// const userLoginValidator = validateLoginFields(validateRules);

class UserSController {
  // public async login(data: LoginFormModel) {
  //   try {
  //     // Запускаем крутилку
  //
  //     const validateData = userLoginValidator(data);
  //
  //     if (!validateData.isCorrect) {
  //       throw new Error(validateData);
  //     }
  //
  //     const userID = loginApi.request(prepareDataToRequest(data));
  //
  //     RouteManagement.go('/chats');
  //
  //     // Останавливаем крутилку
  //   } catch (error) {
  //     // TO DO YOUR DEALS WITH ERROR
  //   }
  // }

  public async getUser(fetch = false) {
    let user: IUser | unknown = store.get('user');

    if (!user && fetch) {
      user = await this.fetchUser();
    }

    // console.log(user);

    return user;
  }

  public async fetchUser() {
    try {
      const { response } = await APIClient.get('/auth/user');

      return JSON.parse(response);
    } catch (error) {
      console.log(error);
    }
  }
}

const UsersControllerInstance = new UserSController();

export default UsersControllerInstance;
