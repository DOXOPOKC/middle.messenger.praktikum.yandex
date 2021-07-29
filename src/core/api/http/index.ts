type PlainObject<T = unknown> = {
	[k in string]: T;
};

export type Options = {
	data?: PlainObject;
	method?: string;
	headers?: PlainObject;
	timeout?: number;
} | PlainObject;

export function queryStringify(data: unknown) {
	const keys = Object.keys(data);
	// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
	return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
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

	get = async (url: string, options?: Options) => options ? this.request(this.baseURL + url + queryStringify(options?.data), {
		...options,
		method: METHODS.GET,
	}, options.timeout)
		: this.request(this.baseURL + url, {method: METHODS.GET});

	put = async (url: string, options: Options = {}) => this.request(this.baseURL + url, {...options, method: METHODS.PUT}, options.timeout);

	post = async (url: string, options: Options = {}) => this.request(this.baseURL + url, {...options, method: METHODS.POST}, options.timeout);

	delete = async (url: string, options: Options) => this.request(this.baseURL + url, {...options, method: METHODS.DELETE}, options.timeout);

	request = async (url: string, options: Options = {}, timeout: number | unknown = 5000) => {
		const {method, data, headers} = options;

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			if (typeof method === 'string') {
				xhr.open(method, url);
			}

			xhr.setRequestHeader('content-type', 'application/json');
			xhr.withCredentials = true;

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

			if (method === METHODS.GET || !data) {
				xhr.send();
			} else if (!headers) {
				xhr.send(JSON.stringify(data));
			} else {
				// @ts-expect-error
				xhr.send(data);
			}
		});
	};
}

const APIClient = new HTTPTransport(baseUrl);

export default APIClient;
