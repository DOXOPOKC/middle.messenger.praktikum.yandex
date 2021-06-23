import { compile } from "pug";
import Block, { renderBlock } from '../../core/block';

const source = `
aside.sidebar.sidebar_mini
  .sidebar__button
    .rounded-button
      include ../../../static/icons/arrow-left.svg
main.content
  .profile
    .profile__avatar-wrapper.avatar
      .profile__change-avatar
        .blur-background
        span.text-light.avatar__text Поменять аватар
      .profile__avatar
        include ../../../static/icons/image.svg
    .profile__title.title Иван
    .profile__main
      +form({ firstBtn: false, secondBtn: false, isRow: true })
    .profile__actions
      .list
        ul.list__inner
          each action in actions
            li.list__item
              span.list__text_left(class=action.classes)= action.label
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