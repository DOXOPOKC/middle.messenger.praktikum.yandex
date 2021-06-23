import Block from '../../core/block';
import { template } from './template';

export class Button extends Block {
  constructor(props: {}) {
    super("div", props);
  }

  render() {
    return template(this.props);
  }
}
