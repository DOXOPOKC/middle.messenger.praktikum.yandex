import Block from '../../core/block';
import {Input, Button, Form} from '../../components';
import {render, checkField} from '../../utils';
import {template} from './template';

const firstField = new Input({
  classNames: 'input',
  name: 'login',
  type: 'text',
  label: 'Логин',
  value: '',
  classes: [],
  messages: [],
  settings: {withInternalID: true}});

const secondField = new Input({
  classNames: 'input',
  name: 'password',
  type: 'password',
  label: 'Пароль',
  value: '',
  classes: [],
  messages: [],
  settings: {withInternalID: true}
});

const firstBtn = new Button({
  classNames: 'button body-1 text-light',
  text: 'Авторизоваться',
  attrs: {type: 'submit'},
  settings: {withInternalID: true}
});

const secondBtn = new Button({
  classNames: 'button button-light caption text-link',
  text: 'Нет аккаунта?',
  attrs: {type: 'button'},
  settings: {withInternalID: true}
});

const formProps = {
  classNames: 'form',
  title: 'Вход',
  isRow: false,
  firstBtn,
  secondBtn,
  fields: [firstField, secondField],
  settings: {withInternalID: true}
};

const form = new Form(formProps);

class SignIn extends Block {
  constructor() {
    super('div', {
      classNames: 'sign-in',
      form,
      events: {
        focusout: (e: Event) => {
          const {name, value} = e.target;

          e.preventDefault();

          if (name === 'login') {
            checkField(firstField, value, 'password');
          }

          if (name === 'password') {
            checkField(secondField, value, 'password');
          }
        },
        submit: (e: Event) => {
          const login: HTMLInputElement | null = document.querySelector('input[name=\'login\']');
          const password: HTMLInputElement | null = document.querySelector('input[name=\'password\']');

          e.preventDefault();

          if (login) {
            checkField(firstField, login.value, 'login');
          }

          if (password) {
            checkField(secondField, password.value, 'password');
          }
        },
      },
    });
  }

  render() {
    return template(this.props);
  }
}

const signInPage = new SignIn();

render('.app', signInPage);
