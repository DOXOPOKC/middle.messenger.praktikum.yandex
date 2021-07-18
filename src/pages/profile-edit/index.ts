import Block from '../../core/block';
import { Button, Form, Input, Sidebar } from '../../components';
import UserController from '../../core/controllers/users';
import store, { storeEventBus } from '../../store';
import { template } from './template';
import router from '../../core';

const firstBtn = new Button({
  classNames: 'button body-1 text-light button_profile',
  text: 'Сохранить',
  attrs: { type: 'submit' },
  settings: { withInternalID: true },
});

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
  value: '',
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
  value: '',
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
  value: '',
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
  value: '',
  classes: [],
  messages: [],
  settings: { withInternalID: true },
});

const userNameField = new Input({
  isRow: true,
  classNames: 'input',
  name: 'display_name',
  type: 'text',
  label: 'Имя в чате',
  value: '',
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
  value: '',
  classes: [],
  messages: [],
  settings: { withInternalID: true },
});

const fields = [
  emailField,
  loginField,
  firstNameField,
  lastNameField,
  userNameField,
  phoneField,
];

const formProps = {
  isRow: true,
  classNames: 'form',
  firstBtn,
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
      events: {
        click: async (e: Event) => {
          const sidebarButton = document.querySelector('.rounded_button');
          e.preventDefault();

          if (e.target === sidebarButton) {
            router().go('/profile');
          }
        },
        submit: async (e: Event) => {
          const formElement: HTMLInputElement | null = document.querySelector(`[data-id='${form.getUUID()}']`);

          e.preventDefault();

          if (e.target === formElement) {
            const data = new FormData(formElement);

            await UserController.changeUserProfile(Object.fromEntries(data.entries()));

            router().go('/profile');
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
