import {compile} from 'pug';

import chatUserAvatar from '@/assets/img/chatuseravatar.png';
import messageDone from '@/assets/icons/message-done.svg';
import arrowLeft from '@/assets/icons/arrow-left.svg';

const source = `
if (dialog)
  != dialog.getTemplate()
!= sidebar.getTemplate()
main.content_chat
  .chat
    .chat__header
      .chat__user
        .chat__avatar.avatar
          img.image(
            src="/assets/chatuseravatar.png",
            alt="chat user"
          )
        span.chat__username Чат
      .chat__header-dropdown
        != topDropdown.getTemplate()
    .chat__content
      .chat__block
      if messages
        ul.chat__messages
          each message in messages
            li.chat__message(class=userId == message.user_id ? "chat__message_to" : "chat__message_from", asd=userId, dsa=message.user_id)
              .chat__message-content
                p.chat__message-content-text= message.content
                .chat__message-info
                  if message.is_read
                    .chat__message-status
                      img(src="/assets/message-done.svg")
                  span.chat__message-time.overline-1.text-link #{prettyDate(message.time)}
    .chat__controls
      .chat__attach
        != bottomDropdown.getTemplate()
      form.chat__form
        input.chat__input(placeholder="Сообщение")
        .chat__send-button
          button.rounded_button(type="submit")
            img(src="/assets/arrow-left.svg")
`;

export const template = compile(source);
