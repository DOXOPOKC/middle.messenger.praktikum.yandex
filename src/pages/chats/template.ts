import {compile} from 'pug';
import messageCamera from 'url:../../assets/img/message-camera.png';
import chatUserAvatar from 'url:../../assets/img/chatuseravatar.png';
import messageDone from 'url:../../assets/icons/message-done.svg';
import arrowLeft from 'url:../../assets/icons/arrow-left.svg';

const source = `
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
        .chat__date.text-grey 19 июня
        ul.chat__messages
          li.chat__message.chat__message_from
            .chat__message-content
              p.chat__message-content-text
                | Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.
                br
                br
                | Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.
              .chat__message-info
                .chat__message-time.overline-1.text-grey 11:56
          li.chat__message.chat__message_image
            img.image(
              src="${messageCamera}",
              alt="Фото камеры в сообщении от Вадима"
            )
          li.chat__message.chat__message_to
            .chat__message-content
              p.chat__message-content-text.body-2 Круто!
              .chat__message-info
                .chat__message-status
                  img(src="${messageDone}")
                span.chat__message-time.overline-1.text-link 12:00
    .chat__controls
      .chat__attach
        != bottomDropdown
      input.chat__input(placeholder="Сообщение")
      .chat__send-button
        button.rounded_button
          img(src="${arrowLeft}")
`;

export const template = compile(source);
