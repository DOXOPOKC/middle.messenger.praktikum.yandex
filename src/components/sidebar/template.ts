import {compile} from 'pug';
import '@/assets/img/chatuseravatar.png';
import '@/assets/icons/arrow-left.svg';

const source = `
if (mini)
  .sidebar__button
    .rounded_button
      img.image(src="/assets/arrow-left.svg")
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
                img.image(src="/assets/chatuseravatar.png", alt="chat user")
              .sidebar__info
                .sidebar__username= chat.title
                if (chat.last_message)
                  .sidebar__last-message.body-2.text-grey= chat.last_message.content
              .sidebar__right
                .sidebar__last-message-time.overline-1.text-grey 10:49
                if (chat.unread_count)
                  .sidebar__messages-counter.rounded_button.caption.text-light= chat.unread_count
`;

export const template = compile(source);
