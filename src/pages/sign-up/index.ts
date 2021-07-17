import Block from '../../core/block';
import { Input, Button, Form } from '../../components';
import { checkField } from '../../utils';
import { template } from './template';
import APIClient from '../../core/api/http';
import router from '../../core';

const email = new Input({
  classNames: 'input',
  name: 'email',
  type: 'email',
  label: 'Почта',
  value: 'doxopokc@yandex.ru',
  classes: [],
  messages: [],
  settings: { withInternalID: true },
});

const login = new Input({
  classNames: 'input',
  name: 'login',
  type: 'text',
  label: 'Логин',
  value: 'doxopokc',
  classes: [],
  messages: [],
  settings: { withInternalID: true },
});

const firstName = new Input({
  classNames: 'input',
  name: 'firstName',
  type: 'text',
  label: 'Имя',
  value: 'Даниил',
  classes: [],
  messages: [],
  settings: { withInternalID: true },
});

const lastName = new Input({
  classNames: 'input',
  name: 'lastName',
  type: 'text',
  label: 'Фамилия',
  value: 'Скороход',
  classes: [],
  messages: [],
  settings: { withInternalID: true },
});

const phone = new Input({
  classNames: 'input',
  name: 'phone',
  type: 'phone',
  label: 'Телефон',
  value: '89999991233',
  classes: [],
  messages: [],
  settings: { withInternalID: true },
});

const password = new Input({
  name: 'password',
  type: 'password',
  label: 'Пароль',
  value: 'diceware1488',
  classes: [],
  messages: [],
  settings: { withInternalID: true },
});

const secondPassword = new Input({
  name: 'secondPassword',
  type: 'password',
  label: 'Пароль (еще раз)',
  value: 'diceware1488',
  classes: [],
  messages: [],
  settings: { withInternalID: true },
});

const firstBtn = new Button({
  classNames: 'button body-1 text-light',
  text: 'Зарегистрироваться',
  attrs: { type: 'submit' },
  settings: { withInternalID: true },
});

const secondBtn = new Button({
  classNames: 'button button_light caption text-link',
  text: 'Войти',
  attrs: { type: 'button' },
  settings: { withInternalID: true },
});

const fieldsMap: { [key: string]: Block } = {
  email,
  login,
  firstName,
  lastName,
  phone,
  password,
};

const formProps = {
  classNames: 'form',
  title: 'Регистрация',
  isRow: false,
  firstBtn,
  secondBtn,
  fields: [
    email,
    login,
    firstName,
    lastName,
    phone,
    password,
    secondPassword,
  ],
};
const form = new Form(formProps);

const handleEvent = (...fields: HTMLInputElement[]) => {
  for (const field of fields) {
    if (fieldsMap[field.name]) {
      checkField(fieldsMap[field.name], field.value, field.name);
    }
  }
};

export default class SignUp extends Block {
  constructor() {
    super('div', {
      classNames: 'sign-in',
      form,
      events: {
        click: (e: Event) => {
          if (e.target.dataset.id === secondBtn.getUUID()) {
            e.preventDefault();

            router().go('/sign_in');
          }
        },
        focusout: (e: Event) => {
          e.preventDefault();

          handleEvent(e.target);
        },
        submit: async (e: Event) => {
          const email = document.querySelector('input[name=\'email\']');
          const login = document.querySelector('input[name=\'login\']');
          const firstName = document.querySelector('input[name=\'firstName\']');
          const lastName = document.querySelector('input[name=\'lastName\']');
          const phone = document.querySelector('input[name=\'phone\']');
          const password = document.querySelector('input[name=\'password\']');

          e.preventDefault();

          if (email && login && firstName && lastName && phone && password) {
            handleEvent(email, login, firstName, lastName, phone, password);

            try {
              const response = await APIClient.post('/auth/signup/', {
                data: {
                  first_name: firstName.value,
                  second_name: lastName.value,
                  email: email.value,
                  login: login.value,
                  phone: phone.value,
                  password: password.value,
                },
              });

              router().go('/');
            } catch (e) {
              console.warn(e);
            }
          }
        },
      },
    });
  }

  render() {
    return template(this.props);
  }
}
