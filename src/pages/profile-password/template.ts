import {compile} from 'pug';
import profileIcon from '@/assets/icons/image.svg';

const source = `
!= sidebar.getTemplate()
main.content
  .profile
    .profile__avatar-wrapper.avatar
      if (shouldAvatar)
        .profile__change-avatar
          .blur-background
          span.text-light.avatar__text Поменять аватар
      if (avatar)
        .profile__avatar.profile__avatar_full
          img.image(src=avatar)
      else
        .profile__avatar
          img.image(src="${profileIcon}")
    if (title)
      .profile__title.title= title
    .profile__main
      != form.getTemplate()
    if (actions)
      .profile__actions
        .list
          ul.list__inner
            each action in actions
              li.list__item
                a.list__text_left(class=action.classes href="#")= action.text
`;

export const template = compile(source);
