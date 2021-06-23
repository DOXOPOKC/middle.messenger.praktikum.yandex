import Block from "../../core/block";
import {template} from "./template";

export class ErrorBlock extends Block {
  constructor(props: {
    classNames: string;
    title: string;
    description: string;
    linkText: string;
  }) {
    super("div", props);
  }

  render(): string {
    return template(this.props);
  }
}
