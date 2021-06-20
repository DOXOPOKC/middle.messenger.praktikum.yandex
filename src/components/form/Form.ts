import { compile } from "pug";
import Block from "../../core/block/index";
import template from "./template";

export default class Form extends Block {
  constructor(props: {
    firstBtnLabel: string;
    secondBtnLabel: string;
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
    super("form", template, props);
  }

  componentDidMount() {
    this.getContent().setAttribute("class", "form");
  }

  render(): string {
    const fn = compile(this.template);

    return fn(this.props);
  }
}
