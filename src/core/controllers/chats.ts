import store from '../../store';
import APIClient from '../api/http';
import {IUser} from './users';

interface IChat {
	id: number;
	title:	string;
	avatar:	string;
	unread_count:	number;
	last_message: {
		user: IUser;
		time: string;
		content: string;
	};
}

class ChatsController {
	async getAll(shouldFetch = false) {
		let chats: IChat[] | unknown = store.get('chats');

		if (!chats?.length || shouldFetch) {
			chats = await this.fetchAll();

			store.set('chats', chats);
		}

		return chats;
	}

	async fetchAll() {
		try {
			const {response} = await APIClient.get('/chats');

			return JSON.parse(response);
		} catch (error) {
			console.log(error);
		}
	}

	async get(shouldFetch = false) {
		let chat: IUser | any = store.get('chat');

		if (!chat || shouldFetch) {
			chat = await this.fetch(chat?.id);
		}

		return chat;
	}

	async fetch(chatId: number) {
		try {
			const {response} = await APIClient.get(`/chats/${chatId}/common`);

			return JSON.parse(response);
		} catch (error) {
			console.log(error);
		}
	}

	async create(title: string) {
		try {
			await APIClient.post('/chats', {data: {title}});

			return await ChatsControllerInstance.getAll(true);
		} catch (error) {
			console.log(error);
		}
	}

	async addUsers(data) {
		try {
			const {response} = await APIClient.put('/chats/users', {data});

			return JSON.parse(response);
		} catch (error) {
			console.log(error);
		}
	}

	async deleteUser(data) {
		try {
			const {response} = await APIClient.delete('/chats/users', {data});

			return JSON.parse(response);
		} catch (error) {
			console.log(error);
		}
	}

	async getToken(chatId: number) {
		try {
			const {response} = await APIClient.post(`/chats/token/${chatId}`);

			return JSON.parse(response);
		} catch (error) {
			console.log(error);
		}
	}
}

const ChatsControllerInstance = new ChatsController();

export default ChatsControllerInstance;
