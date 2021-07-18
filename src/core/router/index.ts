import Block, { IProps } from '../../core/block';
import { render } from '../../utils';
import UserController from '../controllers/users';

export class Route {
  _pathname: string;
  readonly _blockClass: any;
  private _block: Block | null;
  private _props: { [key: string]: any };

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

export class Router {
  private routes: Route[] | undefined;
  private history: History | undefined;
  private _currentRoute: Route | null | undefined;
  private readonly _rootQuery: string | undefined;

  constructor(rootQuery: string) {
    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;
  }

  async beforeEnter() {
    const isAuthRoute = this._currentRoute?._pathname === '/sign_in' || this._currentRoute?._pathname === '/sign_up';

    try {
      const user = await UserController.getUser(true);

      if (!user && !isAuthRoute) {
        return this.go('/sign_in');
      }

      if (user && isAuthRoute) {
        return this.go('/');
      }
    } catch (error) {
      console.log(error);
    }
  }

  use(pathname: string, block: Block) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });

    this.routes?.push(route);

    return this;
  }

  async start() {
    window.onpopstate = () => {
      this._onRoute(window.location.pathname);
    };

    this._onRoute(window.location.pathname);
    await this.beforeEnter();
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      return this.go('/404');
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
