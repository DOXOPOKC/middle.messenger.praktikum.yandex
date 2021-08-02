import HTTP from './http';
import {BaseAPI} from './http/base-api';

const chatMessagesAPIInstance = new HTTP('api/v1/messages');

class ChatMessagesAPI extends BaseAPI {
	request({id}) {
		return chatMessagesAPIInstance.get(`/${id}`);
	}
}
