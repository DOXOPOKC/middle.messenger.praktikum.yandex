import * as chai from 'chai';
import Block, {IProps} from '../block';
import {Router} from './index';

class TestBlock extends Block {
	constructor(props) {
		super('div', props);
	}

	render() {
		return `<div class="first-test">1</div>`;
	}
}

describe('check Router', () => {
	it('init', () => {
		const router = new Router('.app');

		chai.assert.exists(router);
	});

	it('check route', () => {
		const router = new Router('.app');
		router.use('/first-test', new TestBlock({}));

		// @ts-expect-error
		const {routes} = router;
		chai.assert.lengthOf(routes, 1, 'Added a route');
		chai.assert.equal(routes[0]._pathname, '/first-test');
	});
});
