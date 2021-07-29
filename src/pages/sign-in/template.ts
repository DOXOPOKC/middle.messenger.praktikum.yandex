import {compile} from 'pug';

const source = `
.dialog
  .dialog__window
    != form.getTemplate()
`;

export const template = compile(source);
