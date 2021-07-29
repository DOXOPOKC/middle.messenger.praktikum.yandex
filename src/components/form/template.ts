import {compile} from 'pug';

export const source = `
if (title)
  h1.form__title.title= title
.form__main
  if (!isRow)
    each field in fields
      != field.getTemplate()
  else
    .list
      ul.list__inner
        each field in fields
          li.list__item
            != field.getTemplate()
.form__actions
  if (firstBtn)
    != firstBtn.getTemplate()
  if (secondBtn)
    != secondBtn.getTemplate()
`;

export const template = compile(source);
