import { compile } from "pug";
import Block, { renderBlock } from '../../core/block';

const source = `
aside.sidebar.sidebar_mini
  .sidebar__button
    .rounded-button
      arrow-left.svg
main.content
  .profile
    .profile__avatar-wrapper.avatar
      .profile__change-avatar
        .blur-background
        span.text-light.avatar__text Поменять аватар
      .profile__avatar
        image.svg
    .profile__title.title Иван
    .profile__main
    .profile__actions
      button.profile__button.button.text-light Сохранить
`;

const template = compile(source);

class Profile extends Block {
  constructor() {
    super('div', {
      classNames: 'profile',
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


const page = new Profile();

renderBlock('.app', page);
