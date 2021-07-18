import Block from '../../core/block';
import router from '../../core';
import WebSocketService from '../../core/webSocket';
import { template } from './template';
import { Dropdown, Sidebar, Dialog, Form, Input, Button } from '../../components';
import ChatsControllerInstance from '../../core/controllers/chats';
import UserController from '../../core/controllers/users';
import store, { storeEventBus } from '../../store';

// Icons
import verticalDotsIcon from 'url:../../assets/icons/vertical-dots.svg';
import attachIcon from 'url:../../assets/icons/attach.svg';
import appendIcon from 'url:../../assets/icons/append.svg';
import deleteIcon from 'url:../../assets/icons/delete.svg';

const input = new Input({
  classNames: 'input',
  name: 'title',
  type: 'text',
  label: 'Название чата',
  value: '',
  classes: [],
  messages: [],
  settings: { withInternalID: true },
});
const login = new Input({
  classNames: 'input',
  name: 'title',
  type: 'text',
  label: 'Логин',
  value: '',
  classes: [],
  messages: [],
  settings: { withInternalID: true },
});
const topDropdown = new Dropdown({
  classNames: 'dropdown dropdown_right dropdown_top',
  id: 'controls-dropdown',
  icon: verticalDotsIcon,
  actions: [
    { icon: appendIcon, text: 'Добавить пользователя', type: 'add-user' },
    { icon: deleteIcon, text: 'Удалить пользователя', type: 'remove-user' },
  ],
});
const bottomDropdown = new Dropdown({
  classNames: 'dropdown dropdown_left dropdown_bottom',
  id: 'controls-dropdown',
  icon: attachIcon,
  actions: [
    { icon: appendIcon, text: 'Фото или Видео', type: 'add-photo-of-video' },
    { icon: deleteIcon, text: 'Файл', type: 'add-file' },
    { icon: deleteIcon, text: 'Локация', type: 'add-location' },
  ],
});
const sidebar = new Sidebar({
  classNames: 'sidebar',
});
const button = new Button({
  classNames: 'button body-1 text-light',
  text: 'Создать чат',
  attrs: { type: 'submit' },
  settings: { withInternalID: true },
});
const addUserDialogBtn = new Button({
  classNames: 'button body-1 text-light',
  text: 'Добавить пользователя',
  attrs: { type: 'submit' },
  settings: { withInternalID: true },
});
const deleteUserDialogBtn = new Button({
  classNames: 'button body-1 text-light',
  text: 'Удалить пользователя',
  attrs: { type: 'submit' },
  settings: { withInternalID: true },
});

const createChatForm = new Form({
  classNames: 'form',
  title: 'Новый чат',
  isRow: false,
  fields: [input],
  firstBtn: button,
  settings: { withInternalID: true },
});
const addUserForm = new Form({
  classNames: 'form',
  title: 'Добавить пользователя',
  isRow: false,
  fields: [login],
  firstBtn: addUserDialogBtn,
  settings: { withInternalID: true },
});
const deleteUserForm = new Form({
  classNames: 'form',
  title: 'Удалить пользователя',
  isRow: false,
  fields: [login],
  firstBtn: deleteUserDialogBtn,
  settings: { withInternalID: true },
});

const dialog = new Dialog({
  classNames: 'dialog',
  hasBackground: false,
  show: false,
  content: createChatForm,
});

let webSocketConnection: WebSocketService;
const hideDialog = (otherProps = {}) => {
  dialog.setProps({ show: false, hasBackground: false, ...otherProps });
  dialog.hide();
};

const showDialog = (otherProps = {}) => {
  dialog.setProps({ show: true, hasBackground: true, ...otherProps });
};

export default class Chats extends Block {
  constructor() {
    super('div', {
      classNames: 'chats',
      sidebar,
      topDropdown,
      bottomDropdown,
      prettyDate: (dateStr: string) => {
        const date = new Date(dateStr);
        const hours = date.getHours();
        const minutes = date.getMinutes();

        return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
      },
      events: {
        input: async (e: Event) => {
          const searchInput: HTMLInputElement | null = document.querySelector('input.sidebar__search.search');

          if (e.target === searchInput) {
            const users = await UserController.searchUser(e.target.value);
          }
        },
        submit: async (e: Event) => {
          e.preventDefault();

          const dialogInput: HTMLInputElement | null = document.querySelector('input[name="title"]');
          const dialogForm: HTMLInputElement | null = document.querySelector(`[data-id='${createChatForm.getUUID()}']`);
          const addUserDialogForm: HTMLInputElement | null = document.querySelector(`[data-id='${addUserForm.getUUID()}']`);
          const deleteUserDialogForm: HTMLInputElement | null = document.querySelector(`[data-id='${deleteUserForm.getUUID()}']`);
          const chatForm: HTMLInputElement | null = document.querySelector('form.chat__form');

          console.log(e);

          if (e.target === chatForm && webSocketConnection) {
            try {
              const chatFormInput = e.target.firstChild;

              await webSocketConnection.send({ content: chatFormInput.value, type: 'message' });
            } catch (error) {
              console.log(error);
            }
          }

          if (e.target === dialogForm && dialogInput) {
            try {
              await ChatsControllerInstance.create(dialogInput.value);
            } catch (error) {
              console.log(error);
            }
          }

          if (e.target === addUserDialogForm && dialogInput) {
            try {
              const login = dialogInput.value;
              const users = await UserController.searchUser(login);
              const chatId = store.get('chatId');

              await ChatsControllerInstance.addUsers({ users: users.map(user => user.id), chatId });
            } catch (error) {
              console.log(error);
            }
          }

          if (e.target === deleteUserDialogForm && dialogInput) {
            try {
              const login = dialogInput.value;
              const users = await UserController.searchUser(login);
              const chatId = store.get('chatId');

              await ChatsControllerInstance.deleteUser({ users: users.map(user => user.id), chatId });
            } catch (error) {
              console.log(error);
            }
          }
        },
        click: async (e: Event) => {
          // TODO: брать createChatButton из .sidebar__header
          const profileButton = document.querySelector('a.sidebar__profile-link.body-2');
          const createChatButton = document.querySelector('a.rounded_button.text-light');
          const dialogBackground = document.querySelector('.blur-background');
          const addUserBtn = document.querySelector('[data-action="add-user"]');
          const deleteUserBtn = document.querySelector('[data-action="remove-user"]');

          console.log(e);

          if (e.target.offsetParent.className === 'sidebar__chat-inner') {
            const chatElement = e.target.offsetParent;
            const user = await UserController.getUser(true);
            const { chatId } = chatElement.dataset;
            const { token } = await ChatsControllerInstance.getToken(chatId);

            store.set('messages', []);
            store.set('chatId', chatId);
            store.set('token', token);

            webSocketConnection = new WebSocketService(user.id, chatId, token);

            storeEventBus.on('flow:state-updated', () => {
              const messages = store.get('messages');

              this.setProps({ sidebar, messages, userId: user.id });
            });
          }

          if (e.target === profileButton) {
            router().go('/profile');
          }

          if (e.target === deleteUserBtn) {
            showDialog({ content: deleteUserForm });
            this.setProps({ dialog });
          }

          if (e.target === addUserBtn) {
            showDialog({ content: addUserForm });
            this.setProps({ dialog });
          }

          if (e.target === dialogBackground) {
            hideDialog();
            this.setProps({ dialog: null });
          }

          if (e.target === createChatButton) {
            showDialog();
            this.setProps({ dialog });
          }

          if (e.target?.className === 'dropdown__btn') {
            const dropdown = e.target;
            const dropdownList = dropdown.nextElementSibling;

            if (dropdownList.style.display) {
              dropdownList.style.display = dropdownList.style.display === 'none' ? 'block' : 'none';
            } else {
              dropdownList.style.display = 'block';
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
