import {HTTPTransport} from './index';

import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

describe('check HTTPTransport', () => {
	let request: HTTPTransport;

	beforeEach(() => {
		request = new HTTPTransport('http://localhost');
	});

	it('check GET', () => {
		const requestSpy = sinon.spy(request, 'request');
		request.get('/test');
		// @ts-expect-error
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		expect(requestSpy).to.have.been.calledWith('http://localhost/test', {
			method: 'GET',
		});
	});

	it('check POST', () => {
		const requestSpy = sinon.spy(request, 'request');
		request.post('/test', {});

		// @ts-expect-error
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		expect(requestSpy).to.have.been.calledWith('http://localhost/test', {
			method: 'POST',
		});
	});

	it('check PUT', () => {
		const requestSpy = sinon.spy(request, 'request');
		request.put('/test', {});
		// @ts-expect-error
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		expect(requestSpy).to.have.been.calledWith('http://localhost/test', {
			method: 'PUT',
		});
	});

	it('check DELETE', () => {
		const requestSpy = sinon.spy(request, 'request');
		request.delete('/test', {});
		// @ts-expect-error
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		expect(requestSpy).to.have.been.calledWith('http://localhost/test', {
			method: 'DELETE',
		});
	});
});
