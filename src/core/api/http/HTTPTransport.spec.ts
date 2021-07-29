import {HTTPTransport} from './index';

import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

describe.skip('check HTTPTransport', () => {
	let request: HTTPTransport;

	beforeEach(() => {
		request = new HTTPTransport('http://localhost');
	});

	it('check GET', async () => {
		const requestSpy: any = sinon.spy(request, 'request');
		await request.get('/test');

		// @ts-expect-error
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		chai.expect(requestSpy).to.have.been.calledWith('http://localhost/test', {
			method: 'GET',
		});
	});

	it('check POST', async () => {
		const requestSpy = sinon.spy(request, 'request');
		await request.post('/test', {});

		// @ts-expect-error
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		chai.expect(requestSpy).to.have.been.calledWith('http://localhost/test', {
			method: 'POST',
		});
	});

	it('check PUT', async () => {
		const requestSpy = sinon.spy(request, 'request');
		await request.put('/test', {});

		// @ts-expect-error
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		chai.expect(requestSpy).to.have.been.calledWith('http://localhost/test', {
			method: 'PUT',
		});
	});

	it('check DELETE', async () => {
		const requestSpy = sinon.spy(request, 'request');
		await request.delete('/test', {});

		// @ts-expect-error
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		chai.expect(requestSpy).to.have.been.calledWith('http://localhost/test', {
			method: 'DELETE',
		});
	});
});
