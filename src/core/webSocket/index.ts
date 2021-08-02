import store from '../../store';

type messagePayload = {
	content: string;
	type: string;
};

export default class WebSocketService {
	private static instance: WebSocketService;
	private readonly socket;

	constructor(userId?: string, chatId?: number, chatToken?: string) {
		if (userId && chatId && chatToken) {
			this.socket?.close();
			this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${chatToken}`);
			this.socket.addEventListener('open', this.onOpen.bind(this));
			this.socket.addEventListener('message', this.onMessage.bind(this));
			this.socket.addEventListener('error', this.onError.bind(this));
			this.socket.addEventListener('close', this.onClose.bind(this));
		}
	}

	public static getInstance(): WebSocketService {
		if (!WebSocketService.instance) {
			WebSocketService.instance = new WebSocketService();
		}

		return WebSocketService.instance;
	}

	send(payload: messagePayload): void {
		this.socket?.send(JSON.stringify(payload));
	}

	onOpen(): void {
		this.send({
			content: '0',
			type: 'get old',
		});
	}

	onMessage(event: unknown): void {
		const newMessages = JSON.parse(event.data);
		const oldMessages = store.get('messages') || [];
		const messages = oldMessages.concat(newMessages);

		store.set('messages', messages.sort((a, b) => {
			const firstTime = new Date(a.time);
			const secondTime = new Date(b.time);

			return firstTime - secondTime;
		}));
	}

	onError(event: any): void {
		console.log('Error: ', event.message);
	}

	onClose(event: any): void {
		if (event.wasClean) {
			console.log('Connection closed');
		} else {
			console.log('Connection interrupted');
		}

		console.log(`Event code: ${event.code}`);
		console.log(`Event reason: ${event.reason}`);
	}
}
