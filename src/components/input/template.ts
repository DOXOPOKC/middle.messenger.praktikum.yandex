import { compile } from "pug";

export const source = `
label(class=labelClass)
    != name
    input(class=inputClass, type=type)
    div.input-err(class=errClass)
`;

export const template = compile(source);
