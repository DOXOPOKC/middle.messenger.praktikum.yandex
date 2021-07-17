import {compile} from 'pug';
import messageCamera from 'url:../../assets/img/message-camera.png';
import chatUserAvatar from 'url:../../assets/img/chatuseravatar.png';
import messageDone from 'url:../../assets/icons/message-done.svg';
import arrowLeft from 'url:../../assets/icons/arrow-left.svg';

const source = `
if (dialog)
  != dialog
!= sidebar
main.content_chat
  .chat
    .chat__header
      .chat__user
        .chat__avatar.avatar
          img.image(
            src="${chatUserAvatar}",
            alt="chat user"
          )
        span.chat__username Вадим
      .chat__header-dropdown
        != topDropdown
    .chat__content
      .chat__block
      if messages
        .chat__date.text-grey 19 июня
        ul.chat__messages
          each message in messages
            li= message.content
    .chat__controls
      .chat__attach
        != bottomDropdown
      form.chat__form
        input.chat__input(placeholder="Сообщение")
        .chat__send-button
          button.rounded_button(type="submit")
            img(src="${arrowLeft}")
`;

export const template = compile(source);
