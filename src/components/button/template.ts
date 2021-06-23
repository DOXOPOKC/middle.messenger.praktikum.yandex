import { compile } from "pug";

const source = `
button(class="#{className}")
    != text`;

export const template = compile(source);
