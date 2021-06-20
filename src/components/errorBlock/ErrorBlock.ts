import { compile } from "pug";
import Block from "../../core/block/index";
import template from "./template";

export default class ErrorBlock extends Block {
  constructor(props: {
    title: string;
    description: string;
    linkText: string;
  }) {
    super("div", template, props);
  }

  componentDidMount() {
    this.getContent().setAttribute("class", "error-block");
  }

  render(): string {
    const fn = compile(this.template);

    return fn(this.props);
  }
}
