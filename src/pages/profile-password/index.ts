import Block from '../../core/block';
import { Button, Form, Input, Sidebar } from '../../components';
import { template } from './template';
import UserController from '../../core/controllers/users';
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

const oldPasswordField = new Input({
  isRow: true,
  classNames: 'input',
  name: 'oldPassword',
  type: 'password',
  label: 'Старый пароль',
  value: '',
  classes: [],
  messages: [],
  settings: { withInternalID: true },
});

const newPasswordField = new Input({
  isRow: true,
  classNames: 'input',
  name: 'newPassword',
  type: 'password',
  label: 'Новый пароль',
  value: '',
  classes: [],
  messages: [],
  settings: { withInternalID: true },
});

const repeatPasswordField = new Input({
  isRow: true,
  classNames: 'input',
  name: 'repeatPassword',
  type: 'password',
  label: 'Повторите новый пароль',
  value: '',
  classes: [],
  settings: { withInternalID: true },
});

const formProps = {
  isRow: true,
  classNames: 'form',
  firstBtn,
  fields: [
    oldPasswordField,
    newPasswordField,
    repeatPasswordField,
  ],
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

            console.log(data);

            await UserController.changePassword(Object.fromEntries(data.entries()));

            router().go('/profile');
          }
        },
      },
    });
  }

  render() {
    return template(this.props);
  }
}
