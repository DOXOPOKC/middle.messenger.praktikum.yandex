import {compile} from 'pug';

const source = `
.dialog
  .dialog__window
    != form
`;

export const template = compile(source);
