import Block from '../../core/block';
import { template } from './template';

export type inputType = {
  [key: string]: any
}

export class Input extends Block {
  constructor(props: inputType) {
    super("div", props);
  }

  render() {
    return template(this.props);
  }
}
