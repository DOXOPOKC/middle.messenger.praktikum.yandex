import Block, { IProps } from '../../core/block';
import { template } from './template';

export default class Button extends Block {
  constructor(props: IProps) {
    super('button', props);
  }

  render(newProps = this.props) {
    return template(newProps);
  }
}
