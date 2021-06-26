import Block from '../../core/block';
import {template} from './template';

export default class ErrorBlock extends Block {
  constructor(props: {
    classNames: string;
    title: string;
    description: string;
    linkText: string;
  }) {
    super('div', props);
  }

  render(newProps = this.props) {
    return template(newProps);
  }
}
