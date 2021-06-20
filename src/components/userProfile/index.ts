import { compile } from "pug";
import Block from "../../core/block/index";
import template from "./template";
import Button from "../button";

export default class UserProfile extends Block {
    constructor() {
        super("div", template, {
            name: "Login 1",
            button: new Button({
                child: "Text 2"
            })
        });
    }

    componentDidMount(oldProps: unknown) {
        setTimeout(() => {
            this.setProps({
                name: "Login 3"
            });
        }, 5000);
    }

    render(): string {
        const fn = compile(this.template);

        return fn({
            userName: this.props.name,
            button: this.props.button.render()
        });
    }
}
