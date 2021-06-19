// components/button/Button.js

import Block from "../../modules/block/index.ts";
// Ваш реализованный шаблонизатор
import { compile } from "pug";
import { template } from "./template.ts";

export default class Button extends Block {
  constructor(props: object) {
    // Создаём враппер DOM-элемент button
    super("button", props);
  }

  render() {
    // В данном случае render возвращает строкой разметку из шаблонизатора

    const fn = compile(template);
    const html = fn(this.props);

    return html;
  }
}