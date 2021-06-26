import Block from '../../core/block';
import { template } from './template';

export default class Button extends Block {
  constructor(props: {}) {
    super('button', props);
  }

  render(newProps = this.props) {
    return template(newProps);
  }
}
