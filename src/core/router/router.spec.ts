import {assert} from 'chai';
import Block, {IProps} from '../block';
import {render} from '../../utils';

class Route {
	_pathname: string;
	readonly _blockClass: any;
	private _block: Block | null;
	private readonly _props: Record<string, any>;

	constructor(pathname: string, view: any, props: IProps) {
		this._pathname = pathname;
		this._blockClass = view;
		this._block = null;
		this._props = props;
	}

	navigate(pathname: string) {
		if (this.match(pathname)) {
			this._pathname = pathname;
			this.render();
		}
	}

	leave(): void {
		const root = document.querySelector(this._props.rootQuery);

		if (root) {
			root.removeChild(this._block?.element);
		}

		this._block = null;
	}

	match(pathname: string) {
		return pathname === this._pathname;
	}

	render() {
		this._block = new this._blockClass();

		render(this._props.rootQuery, this._block);
	}
}

class Router {
	routes: Route[] | undefined;
	private readonly history: History | undefined;
	private _currentRoute: Route | null | undefined;
	private readonly _rootQuery: string | undefined;

	constructor(rootQuery: string) {
		this.routes = [];
		this.history = window.history;
		this._currentRoute = null;
		this._rootQuery = rootQuery;
	}

	use(pathname: string, block: Block) {
		const route = new Route(pathname, block, {rootQuery: this._rootQuery});

		this.routes?.push(route);

		return this;
	}

	start() {
		window.onpopstate = () => {
			this._onRoute(window.location.pathname);
		};

		this._onRoute(window.location.pathname);
	}

	_onRoute(pathname: string) {
		const route = this.getRoute(pathname);

		if (!route) {
			this.go('/404'); return;
		}

		if (this._currentRoute) {
			this._currentRoute.leave();
		}

		this._currentRoute = route;
		route.render();
	}

	go(pathname: string) {
		this.history?.pushState({}, '', pathname);
		this._onRoute(pathname);
	}

	back() {
		this.history?.back();
		this._onRoute(window.location.pathname);
	}

	forward() {
		this.history?.forward();
		this._onRoute(window.location.pathname);
	}

	getRoute(pathname: string) {
		return this.routes?.find(route => route.match(pathname));
	}
}

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

		assert.exists(router);
	});

	it('check route', () => {
		const router = new Router('.app');
		router.use('/first-test', new TestBlock({}));

		const {routes} = router;
		assert.lengthOf(routes, 1, 'Added a route');
		assert.equal(routes[0]._pathname, '/first-test');
	});
});
