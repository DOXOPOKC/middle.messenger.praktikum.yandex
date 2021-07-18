import router from '../../core';
import Block from '../../core/block';
import { Form, Input, Sidebar } from '../../components';
import UserController from '../../core/controllers/users';
import store, { storeEventBus } from '../../store';
import { template } from './template';

const sidebar = new Sidebar({
  mini: true,
  classNames: 'sidebar sidebar_mini',
});

const emailField = new Input({
  isRow: true,
  classNames: 'input',
  name: 'email',
  type: 'email',
  label: 'Почта',
  value: 'pochta@yandex.ru',
  classes: [],
  messages: [],
  settings: { withInternalID: true },
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
  settings: { withInternalID: true },
});

const firstNameField = new Input({
  isRow: true,
  classNames: 'input',
  name: 'first_name',
  type: 'text',
  label: 'Имя',
  value: 'Иван',
  classes: [],
  messages: [],
  settings: { withInternalID: true },
});

const lastNameField = new Input({
  isRow: true,
  classNames: 'input',
  name: 'second_name',
  type: 'text',
  label: 'Фамилия',
  value: 'Иванов',
  classes: [],
  messages: [],
  settings: { withInternalID: true },
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
  settings: { withInternalID: true },
});

const fields = [
  emailField,
  loginField,
  firstNameField,
  lastNameField,
  phoneField,
];

const formProps = {
  isRow: true,
  classNames: 'form',
  fields,
  settings: { withInternalID: true },
};

const form = new Form(formProps);

export default class Profile extends Block {
  constructor() {
    super('div', {
      classNames: 'profile-page',
      sidebar,
      form,
      actions: [
        { classes: ['text', 'text-link'], text: 'Изменить данные', type: 'change-data' },
        { classes: ['text', 'text-link'], text: 'Изменить пароль', type: 'change-password' },
        { classes: ['text', 'text-error'], text: 'Выйти', type: 'logout' },
      ],
      events: {
        click: async (e: Event) => {
          e.preventDefault();

          const profileDataButton = document.querySelector('a[data-action="change-data"]');
          const profilePasswordButton = document.querySelector('a[data-action="change-password"]');
          const logoutButton = document.querySelector('a[data-action="logout"]');
          const sidebarButton = document.querySelector('.rounded_button');

          if (e.target === sidebarButton) {
            router().go('/');
          }

          if (e.target === profileDataButton) {
            router().go('/change_profile_info');
          }

          if (e.target === profilePasswordButton) {
            router().go('/change_password');
          }

          if (e.target === logoutButton) {
            store.clear();
            await UserController.logout();
          }
        },
      },
    });
  }

  componentDidMount() {
    super.componentDidMount();

    storeEventBus.on('flow:state-updated', () => {
      const user = store.get('user');

      if (user) {
        fields.forEach((field => {
          field.setProps({ value: user[field.props.name] });
        }));
      }
    });
  }

  render() {
    return template(this.props);
  }
}
