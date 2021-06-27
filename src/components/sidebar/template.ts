import {compile} from 'pug';
import chatUserAvatar from "url:../../assets/img/chatuseravatar.png";


const source = `
.sidebar__header
  a.sidebar__profile-link.body-2 Профиль >
  input.sidebar__search.search(placeholder="Поиск")
.sidebar__chats
  ul.sidebar__list
    li.sidebar__chat
      .sidebar__chat-inner
        .sidebar__avatar.avatar
          img.image(src="${chatUserAvatar}", alt="chat user")
        .sidebar__info
          .sidebar__username Андрей
          .sidebar__last-message.body-2.text-grey Друзья, у меня для вас особенный выпуск новостей!...
        .sidebar__right
          .sidebar__last-message-time.overline-1.text-grey 10:49
          .sidebar__messages-counter.rounded-button.caption.text-light 1
`;

export const template = compile(source);
