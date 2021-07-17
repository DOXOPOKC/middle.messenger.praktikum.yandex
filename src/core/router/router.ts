import Route from './route';

export class Router {
  private routes: Route[] | undefined;
  private history: History | undefined;
  private _currentRoute: Route | null | undefined;
  private readonly _rootQuery: string | undefined;
  private static instance: Router;

  constructor(rootQuery: string) {
    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;
  }

  public static getInstance(): Router {
    if (!Router.instance) {
      Router.instance = new Router('.app');
    }

    return Router.instance;
  }

  use(pathname: string, block: any) {
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
