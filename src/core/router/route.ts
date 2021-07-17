import Block from '../../core/block';
import {render} from '../../utils';

export default class Route {
  private _pathname: string;
  readonly _blockClass: any;
  private _block: Block | null;
  private _props: { [key: string]: any };

  constructor(pathname: string, view: any, props: {}) {
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
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    this._block = new this._blockClass();

    render(this._props.rootQuery, this._block!);
  }
}
