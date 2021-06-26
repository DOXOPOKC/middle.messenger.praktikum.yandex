import Form from '../../components/form/index';
import Dialog from '../../components/dialog/index';
import { compile } from 'pug';
import { render } from '../../utils';
import Block from '../../core/block';
import {Button} from '../../components/button';
import { Input } from '../../components/input';

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
      value: '',
      classes: [],
      messages: [],
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
        focusin: (e: Event) => this.onfocus(e),
        focusout: (e: Event) => this.onBlur(e),
        submit: (e: Event) => {
          e.preventDefault();

          console.log('submitted')
        },
      },
    });
  }

  onBlur(e: Event) {
    e.preventDefault();

    if (e.target.name === 'login') {
      console.log('login', e.target)
    }

    if (e.target.name === 'password') {
      console.log('password', e.target)
    }
  }

  onfocus(e: Event) {
    e.preventDefault();

    if (e.target.name === 'login') {
      console.log('login', e.target)
    }

    if (e.target.name === 'password') {
      console.log('password', e.target)
    }
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

render('.app', signInPage);
