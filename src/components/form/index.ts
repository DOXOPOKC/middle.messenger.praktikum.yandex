import Block from '../../core/block';
import {template} from './template';

export default class Form extends Block {
  constructor(props: { [key: string]: any, settings: { withInternalID: boolean }; classNames: string; title: string; fields: Block[]; isRow: boolean }) {
    super('form', props);
  }

  render(newProps = this.props) {
    return template(newProps);
  }
}
