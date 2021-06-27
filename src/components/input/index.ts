import Block from '../../core/block';
import {template} from './template';

export type inputType = {
  [key: string]: any
}

export default class Input extends Block {
  constructor(props: inputType) {
    super('div', props);
  }

  render(newProps = this.props) {
    return template(newProps);
  }
}
