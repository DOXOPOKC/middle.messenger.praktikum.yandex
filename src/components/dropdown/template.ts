import { compile } from 'pug';

const source = `
a.dropdown__btn
  img.dropdown__image.image(src=icon)
if actions
  ul.dropdown__submenu
    each action in actions
      li.dropdown__item
        .dropdown__icon
          img.image(src=action.icon)
        span.dropdown__item-text= action.text
`;

export const template = compile(source);
