import {compile} from 'pug';

export const source = `
h1.form__title.title= title
.form__main
  if (!isRow)
    each field in fields
      != field
  else
    .list
      ul.list__inner
        each field in fields
          li.list__item
            label.list__text_left= field.label
            input.list__text_right(
              type=field.type,
              value=field.value,
              name=field.name
            )
.form__actions
  if (firstBtn)
    != firstBtn
  if (secondBtn)
    != secondBtn
`;

export const template = compile(source);
