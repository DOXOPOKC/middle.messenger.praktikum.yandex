import {compile} from 'pug';

const source = `
input.dropdown__input(id=id, type="checkbox", name="menu")
if icon
  button.dropdown__label
    img(src=icon)
if actions
  ul.dropdown__submenu
    each action in actions
      li.dropdown__item
        img(src=action.icon)
        span.dropdown__item-text= action.text
`;

export const template = compile(source);
