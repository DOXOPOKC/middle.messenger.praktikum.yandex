import { compile } from "pug";
import Block from "../../core/block/index";
import template from "./template";

export default class Button extends Block {
    constructor(props: {
      className?: string;
      child: string;
      events?: { click: (event: any) => void; };
      settings?: { withInternalID: boolean; };
    }) {
        super("button", template, props);
    }

    render(): string {
        const fn = compile(this.template);

        return fn(this.props);
    }
}
