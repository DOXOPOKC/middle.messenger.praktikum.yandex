import { compile } from "pug";

const source = `
h1.error-block__title.headline= title
p.error-block__description= description
a.error-block__link.caption(href="/")= linkText
`;

export const template = compile(source);
