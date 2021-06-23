import { compile } from "pug";
import Block, { renderBlock } from '../../core/block';

const source = `
aside.sidebar
  .sidebar__header
    a.sidebar__profile-link.body-2 Профиль >
    input.sidebar__search.search(placeholder="Поиск")
  .sidebar__chats
    ul.sidebar__list
      li.sidebar__chat
        .sidebar__chat-inner
          .sidebar__avatar.avatar
            img.image(src="../../../static/img/chatuseravatar.png", alt="chat user")
          .sidebar__info
            .sidebar__username Андрей
            .sidebar__last-message.body-2.text-grey Друзья, у меня для вас особенный выпуск новостей!...
          .sidebar__right
            .sidebar__last-message-time.overline-1.text-grey 10:49
            .sidebar__messages-counter.rounded-button.caption.text-light 1
      li.sidebar__chat
        .sidebar__chat-inner
          .sidebar__avatar.avatar
            img(src="../../../static/img/chatuseravatar.png", alt="chat user")
          .sidebar__info
            .sidebar__username Андрей
            .sidebar__last-message.body-2.text-grey Друзья, у меня для вас особенный выпуск новостей!...
          .sidebar__right
            .sidebar__last-message-time.overline-1.text-grey 10:49
            .sidebar__messages-counter.rounded-button.caption.text-light 1
main.content_chat
  .chat
    .chat__header
      .chat__user
        .chat__avatar.avatar
          img.image(
            src="../../../static/img/chatuseravatar.png",
            alt="chat user"
          )
        span.chat__username Вадим
      .chat__header-dropdown
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
              src="../../../static/img/message-camera.png",
              alt="Фото камеры в сообщении от Вадима"
            )
          li.chat__message.chat__message_to
            .chat__message-content
              p.chat__message-content-text.body-2 Круто!
              .chat__message-info
                .chat__message-status
                  message-done.svg
                span.chat__message-time.overline-1.text-link 12:00
    .chat__controls
      .chat__attach
      input.chat__input(placeholder="Сообщение")
      .chat__send-button
        button.rounded-button
          arrow-left.svg
`;

const template = compile(source);

class Chats extends Block {
  constructor() {
    super('div', {
      classNames: 'chats',
      events: {
        click: (e: Event) => this.handleClick(e)
      }
    });
  }

  handleClick(e: Event) {
    e.preventDefault();
    console.log(e);
  }

  render() {
    return template(this.props);
  }
}


const page = new Chats();

renderBlock('.app', page);
