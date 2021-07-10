import Block from '../../core/block';
import router from '../../core';
import {Input, Button, Form} from '../../components';
import {checkField} from '../../utils';
import {template} from './template';

const login = new Input({
  classNames: 'input',
  name: 'login',
  type: 'text',
  label: 'Логин',
  value: '',
  classes: [],
  messages: [],
  settings: {withInternalID: true}});

const password = new Input({
  classNames: 'input',
  name: 'password',
  type: 'password',
  label: 'Пароль',
  value: '',
  classes: [],
  messages: [],
  settings: {withInternalID: true},
});

const firstBtn = new Button({
  classNames: 'button body-1 text-light',
  text: 'Авторизоваться',
  attrs: {type: 'submit'},
  settings: {withInternalID: true},
});

const secondBtn = new Button({
  classNames: 'button button_light caption text-link',
  text: 'Нет аккаунта?',
  attrs: {type: 'button'},
  settings: {withInternalID: true},
});

const form = new Form({
  classNames: 'form',
  title: 'Вход',
  isRow: false,
  firstBtn,
  secondBtn,
  fields: [login, password],
  settings: {withInternalID: true},
});

const fieldsMap: { [key: string]: Block } = {
  login,
  password,
};

const handleEvent = (...fields: HTMLInputElement[]) => {
  for (const field of fields) {
    if (fieldsMap[field.name]) {
      checkField(fieldsMap[field.name], field.value, field.name);
    }
  }
};

export default class SignIn extends Block {
  constructor() {
    super('div', {
      classNames: 'sign-in',
      form,
      events: {
        focusout: (e: Event) => {
          e.preventDefault();

          handleEvent(e.target);
        },
        submit: (e: Event) => {
          const login: HTMLInputElement | null = document.querySelector('input[name=\'login\']');
          const password: HTMLInputElement | null = document.querySelector('input[name=\'password\']');

          e.preventDefault();

          handleEvent(login, password);

          router().go('/chats');
        },
      },
    });
  }

  render() {
    return template(this.props);
  }
}
