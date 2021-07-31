type PlainObject<T = unknown> = {
	[k in string]: T;
};

export type Options = {
	data?: PlainObject;
	method?: string;
	headers?: PlainObject;
	timeout?: number;
	options?: string;
} | PlainObject;

export function queryStringify(data: unknown) {
	const keys = Object.keys(data);
	// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
	return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
}

function setHeader(xhr: XMLHttpRequest, header: string): void {
	switch (header) {
		case 'json':
			xhr.setRequestHeader('content-type', 'application/json');
			break;
		case 'form-data':
			xhr.setRequestHeader('content-type', 'multipart/form-data');
			break;
	}
}

export const baseUrl = 'https://ya-praktikum.tech/api/v2';

enum METHODS {
	GET = 'GET',
	PUT = 'PUT',
	POST = 'POST',
	DELETE = 'DELETE',
}

export class HTTPTransport {
	baseURL: string;

	constructor(baseURL = '') {
		this.baseURL = baseURL;
	}

	get = async (url: string, options?: Options): Promise<XMLHttpRequest> => options
		? this.request(this.baseURL + url + queryStringify(options?.data), {...options, method: METHODS.GET}, options.timeout)
		: this.request(this.baseURL + url, {method: METHODS.GET});

	put = async (url: string, options: Options = {}): Promise<XMLHttpRequest> =>
		this.request(this.baseURL + url, {...options, method: METHODS.PUT}, options.timeout);

	post = async (url: string, options: Options = {}): Promise<XMLHttpRequest> =>
		this.request(this.baseURL + url, {...options, method: METHODS.POST}, options.timeout);

	delete = async (url: string, options: Options = {}): Promise<XMLHttpRequest> =>
		this.request(this.baseURL + url, {...options, method: METHODS.DELETE}, options.timeout);

	request = async (
	  url: string,
		options: Options = {},
		timeout: number | unknown = 5000,
	): Promise<XMLHttpRequest> => {
		const {method, data, headers} = options;

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			if (typeof method === 'string') {
				xhr.open(method, url);
			}

			if (typeof timeout === 'number') {
				xhr.timeout = timeout;
			}

			xhr.onload = () => {
				if (xhr.status === 200) {
					resolve(xhr);
				} else {
					reject(new Error(`Error ${xhr.status}: ${xhr.statusText}`));
				}
			};

			xhr.onabort = reject;
			xhr.onerror = reject;
			xhr.ontimeout = reject;
			xhr.withCredentials = true;

			if (headers) {
        Object.entries(headers).forEach(header => {
					xhr.setRequestHeader(header[0], header[1]);
				});
			} else if (headers !== null) {
				xhr.setRequestHeader('Content-Type', 'application/json');
			}

			if (method === METHODS.GET || !data) {
				xhr.send();
			} else {
				xhr.send(data);
			}
		});
	};
}

const APIClient = new HTTPTransport(baseUrl);

export default APIClient;
