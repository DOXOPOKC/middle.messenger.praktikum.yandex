import store from '../../store';
import APIClient from '../api/http';

export interface IUser {
	id: number;
	firstName:	string;
	secondName:	string;
	displayName:	string | null;
	login:	string;
	email:	string;
	phone:	string;
	avatar:	string | null;
}

const resourceURL = 'https://ya-praktikum.tech/api/v2/resources/';

class UserSController {
	public async getUser(shouldFetch = false) {
		let user: IUser | unknown = store.get('user');

		if (!user && shouldFetch) {
			user = await this.fetchUser();
		}

		return user;
	}

	public async fetchUser() {
		try {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const {response} = await APIClient.get('/auth/user');
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const user: IUser = JSON.parse(response);

			if (user.avatar) {
				user.avatar = `${resourceURL}${user.avatar}`;
			}

			store.set('user', user);

			return user;
		} catch (error: unknown) {
			console.log(error);
		}
	}

	public async searchUser(login: string) {
		try {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const {response} = await APIClient.post('/user/search', {data: {login}});

			// eslint-disable-next-line @typescript-eslint/no-unsafe-return
			return JSON.parse(response);
		} catch (error: unknown) {
			console.log(error);
		}
	}

	public async changeUserProfile(data) {
		try {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			await APIClient.put('/user/profile', {data});
		} catch (error: unknown) {
			console.log(error);
		}
	}

	public async changePassword(data) {
		try {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			await APIClient.put('/user/password', {data});
		} catch (error: unknown) {
			console.log(error);
		}
	}

	public async updateAvatar(data) {
		try {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const {response} = await APIClient.put('/user/profile/avatar', {data, headers: null, isFormData: true});
			const user = JSON.parse(response);

			user.avatar = `${resourceURL}/${user.avatar}`;

			store.set('user', user);
		} catch (error: unknown) {
			console.log(error);
		}
	}

	public async logout() {
		try {
			await APIClient.post('/auth/logout');
		} catch (error: unknown) {
			console.log(error);
		}
	}
}

const UsersControllerInstance = new UserSController();

export default UsersControllerInstance;
