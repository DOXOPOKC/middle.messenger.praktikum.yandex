import {compile} from 'pug';
import arrowLeftIcon from "url:../../assets/icons/arrow-left.svg";
import profileIcon from "url:../../assets/icons/image.svg";

const source = `
aside.sidebar.sidebar_mini
  .sidebar__button
    .rounded-button
      img.image(src="${arrowLeftIcon}")
main.content
  .profile
    .profile__avatar-wrapper.avatar
      .profile__change-avatar
        .blur-background
        span.text-light.avatar__text Поменять аватар
      .profile__avatar
        img.image(src="${profileIcon}")
    .profile__title.title Иван
    .profile__main
      != form
    .profile__actions
      .list
        ul.list__inner
          each action in actions
            li.list__item
              a.list__text_left(class=action.classes href="#")= action.text
`;

export const template = compile(source);
