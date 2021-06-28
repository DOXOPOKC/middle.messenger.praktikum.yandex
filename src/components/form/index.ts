import Block, {IProps} from '../../core/block';
import {template} from './template';

export default class Form extends Block {
  constructor(props: IProps) {
    super('form', props);
  }

  render(newProps = this.props) {
    return template(newProps);
  }
}
