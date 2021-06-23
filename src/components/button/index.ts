import Block from '../../core/block';
import { template } from './template';

export class Button extends Block {
  constructor(props: {}) {
    super("button", props);
  }

  render() {
    return template(this.props);
  }
}
