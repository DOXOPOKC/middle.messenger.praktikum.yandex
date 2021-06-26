import Block from '../../core/block';
import Button from '../button';
import { template } from './template';

export default class Form extends Block {
  constructor(props: {
    classNames: string,
    firstBtn: Button,
    secondBtn: Button;
    title: string;
    fields: ({
      classes: any[];
      name: string;
      messages: string[];
      label: string;
      type: string;
      value: string
    } | {
      classes: any[];
      name: string;
      messages: any[];
      label: string;
      type: string;
      value: string
    })[]
  }) {
    super('form', props);
  }

  render(newProps = this.props) {
    return template(newProps);
  }
}
