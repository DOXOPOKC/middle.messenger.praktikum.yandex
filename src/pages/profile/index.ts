import Block from '../../core/block';
import {Form, Input} from '../../components';
import {render} from '../../utils';
import {template} from './template';


const emailField = new Input({
  isRow: true,
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
  isRow: true,
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
  isRow: true,
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
  isRow: true,
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
  isRow: true,
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
  isRow: true,
  classNames: 'input',
  name: 'second-password',
  type: 'password',
  label: 'Пароль',
  value: 'qweqweqweqwe',
  classes: [],
  messages: [],
  settings: {withInternalID: true}
});

const secondPasswordField = new Input({
  isRow: true,
  classNames: 'input',
  name: 'second-password',
  type: 'password',
  label: 'Пароль (еще раз)',
  value: 'qweqweqweqwe',
  classes: [],
  settings: {withInternalID: true}
});

const formProps = {
  classNames: 'form',
  fields: [
    emailField,
    loginField,
    firstNameField,
    lastNameField,
    phoneField,
    passwordField,
    secondPasswordField,
  ],
  settings: {withInternalID: true}
};

const form = new Form(formProps);

class Profile extends Block {
  constructor() {
    super('div', {
      classNames: 'profile-page',
      form,
      actions: [
        { classes: ["text", "text-link"], text: 'Изменить данные' },
        { classes: ["text", "text-link"], text: 'Изменить пароль' },
        { classes: ["text", "text-error"], text: 'Выйти' },
      ],
      events: {
        click: (e: Event) => {
          console.log(e);
        },
      },
    });
  }

  render() {
    return template(this.props);
  }
}

const page = new Profile();

render('.app', page);
