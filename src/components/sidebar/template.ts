import {compile} from 'pug';
import chatUserAvatar from '@/assets/img/chatuseravatar.png';
import arrowLeftIcon from '@/assets/icons/arrow-left.svg';

const source = `
if (mini)
  .sidebar__button
    .rounded_button
      img.image(src="${arrowLeftIcon}")
else
  .sidebar__header
    div(style="display: flex;justify-content: space-between; width: 100%;") 
      a.rounded_button.text-light(style="cursor: pointer; width: 24px; height: 24px;") +
      a.sidebar__profile-link.body-2 Профиль >
    input.sidebar__search.search(type="text" name="search" placeholder="Поиск")
  .sidebar__chats
    if (chats)
      ul.sidebar__list
        each chat in chats
          li.sidebar__chat()
            .sidebar__chat-inner(data-chat-id=chat.id)
              .sidebar__avatar.avatar
                img.image(src="${chatUserAvatar}", alt="chat user")
              .sidebar__info
                .sidebar__username= chat.title
                .sidebar__last-message.body-2.text-grey Друзья, у меня для вас особенный выпуск новостей!...
              .sidebar__right
                .sidebar__last-message-time.overline-1.text-grey 10:49
                .sidebar__messages-counter.rounded_button.caption.text-light 1
`;

export const template = compile(source);
