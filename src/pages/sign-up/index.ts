import Block from '../../core/block';
import {Input, Button, Form} from '../../components';
import {render, checkField} from '../../utils';
import {template} from './template';

const emailField = new Input({
  classNames: 'input',
  name: 'email',
  type: 'email',
  label: 'Почта',
  value: 'pochta@yandex.ru',
  classes: [],
  messages: [],
  settings: {withInternalID: true},
});

const loginField = new Input({
  classNames: 'input',
  name: 'login',
  type: 'text',
  label: 'Логин',
  value: 'ivanivanov',
  classes: [],
  messages: [],
  settings: {withInternalID: true}
});

const firstNameField = new Input({
  classNames: 'input',
  name: 'firstname',
  type: 'text',
  label: 'Имя',
  value: 'Иван',
  classes: [],
  messages: [],
  settings: {withInternalID: true}
});

const lastNameField = new Input({
  classNames: 'input',
  name: 'lastname',
  type: 'text',
  label: 'Фамилия',
  value: 'Иванов',
  classes: [],
  messages: [],
  settings: {withInternalID: true}
});

const phoneField = new Input({
  classNames: 'input',
  name: 'phone',
  type: 'phone',
  label: 'Телефон',
  value: '+ 7 (909) 967 30 30',
  classes: [],
  messages: [],
  settings: {withInternalID: true}
});

const passwordField = new Input({
  name: 'second-password',
  type: 'password',
  label: 'Пароль',
  value: 'qweqweqweqwe',
  classes: [],
  messages: [],
  settings: {withInternalID: true}
});

const secondPasswordField = new Input({
  name: 'second-password',
  type: 'password',
  label: 'Пароль (еще раз)',
  value: 'qweqweqweqwe',
  classes: ['text-error'],
  messages: ['Пароли не совпадают'],
  settings: {withInternalID: true}
});

const firstBtn = new Button({
  classNames: 'button body-1 text-light',
  text: 'Зарегистрироваться',
  attrs: { type: 'submit' },
  settings: {withInternalID: true}
});

const secondBtn = new Button({
  classNames: 'button button_light caption text-link',
  text: 'Войти',
  attrs: {type: 'button'},
  settings: {withInternalID: true}
});

const formProps = {
  classNames: 'form',
  title: 'Регистрация',
  isRow: false,
  firstBtn,
  secondBtn,
  fields: [
    emailField,
    loginField,
    firstNameField,
    lastNameField,
    phoneField,
    passwordField,
    secondPasswordField,
  ],
};

const form = new Form(formProps);

class SignUp extends Block {
  constructor() {
    super('div', {
      classNames: 'sign-in',
      form,
      events: {
        focusout: (e: Event) => {
          const {name, value} = e.target;

          e.preventDefault();

          console.log(e);

          if (name === 'login') {
            // checkField(firstField, value, 'password');
          }

          if (name === 'password') {
            // checkField(secondField, value, 'password');
          }
        },
        submit: (e: Event) => {
          const login = document.querySelector('input[name=\'login\']');
          const password = document.querySelector('input[name=\'password\']');

          console.log(e);

          e.preventDefault();

          if (login) {
            // checkField(firstField, login.value, 'login');
          }

          if (password) {
            // checkField(secondField, password.value, 'password');
          }
        },
      }
    });
  }

  render() {
    return template(this.props);
  }
}

const page = new SignUp();

render('.app', page);
