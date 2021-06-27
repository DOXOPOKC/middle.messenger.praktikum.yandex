import Block from '../../core/block';
import {template} from './template';

export default class Dropdown extends Block {
  constructor(props: {}) {
    super('div', props);
  }

  render(newProps = this.props) {
    return template(newProps);
  }
}
