import Form from '../../components/form/index';
import Dialog from '../../components/dialog/index';
import {compile} from 'pug';
import Block, {renderBlock} from '../../core/block';
import {Button} from '../../components/button';
import {Input} from '../../components/input';

const source = `
.dialog
  .dialog__window.dialog__window_medium
    != form
`;

const template = compile(source);

const formProps = {
  classNames: 'form',
  title: 'Вход',
  isRow: false,
  firstBtn: (new Button({
    classNames: 'button body-1 text-light',
    attrs: {
      type: 'submit',
    },
    text: 'Авторизоваться',
  })).getTemplate(),
  secondBtn: (new Button({
    classNames: 'button button-light caption text-link',
    text: 'Нет аккаунта?',
    attrs: {
      type: 'button',
    },
  })).getTemplate(),
  fields: [
    (new Input({
      classNames: 'input',
      name: 'login',
      type: 'text',
      label: 'Логин',
      value: 'ivanivanov',
      classes: [],
      messages: ['Неверный логин'],
    })).getTemplate(),
    (new Input({
      classNames: 'input',
      name: 'password',
      type: 'password',
      label: 'Пароль',
      value: 'qweqweqweqwe',
      classes: [],
      messages: [],
    })).getTemplate(),
  ],
};

class SignIn extends Block {
  constructor() {
    super('div', {
      classNames: 'sign-in',
      form: (new Form(formProps)).getTemplate(),
      events: {
        focusout: (e: Event) => this.handleInputBlur(e),
        click: (e: Event) => this.handleClick(e),
      },
    });
  }

  handleSubmit(e: Event) {
    e.preventDefault();
    console.log(e);
  }

  handleInputBlur(e: Event) {
    e.stopPropagation();
    console.log(e);
  }

  handleClick(e: Event) {
    e.preventDefault();
    console.log(e);
  }

  render() {
    return template(this.props);
  }
}

// Const dialogProps = {
//   hasBackground: false,
//   title: '123',
//   titleClasses: ['123'],
//   content: form.render(),
//   actions: null,
//   messages: null
// }

// const dialog = new Dialog(dialogProps);

const signInPage = new SignIn();

renderBlock('.app', signInPage);
