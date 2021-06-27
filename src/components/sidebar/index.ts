import Block from '../../core/block';
import {template} from './template';

export default class Sidebar extends Block {
  constructor(props: {}) {
    super('aside', props);
  }

  render(newProps = this.props) {
    return template(newProps);
  }
}
