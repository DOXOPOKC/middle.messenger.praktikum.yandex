import {compile} from 'pug';
import Block from '../../core/block';
import template from './template';

export default class Dialog extends Block {
  constructor(props: {
    hasBackground: boolean,
    title: string,
    titleClasses: string[],
    content: string | null,
    actions: string | null,
    messages: string[] | null
  }) {
    super('div', template, props);
  }

  componentDidMount() {
    this.getContent().setAttribute('class', 'dialog');
  }

  render(): string {
    const fn = compile(this.template);

    return fn(this.props);
  }
}
