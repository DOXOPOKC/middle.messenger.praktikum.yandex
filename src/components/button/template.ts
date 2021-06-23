import { compile } from "pug";

const source = `
!= text
`;

export const template = compile(source);
