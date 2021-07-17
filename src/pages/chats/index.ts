import Block from '../../core/block';
import WebSocketService from '../../core/webSocket';
import { template } from './template';
import { Dropdown, Sidebar, Dialog, Form, Input, Button } from '../../components';
import ChatsControllerInstance from '../../core/controllers/chats';

// Icons
import verticalDotsIcon from 'url:../../assets/icons/vertical-dots.svg';
import attachIcon from 'url:../../assets/icons/attach.svg';
import appendIcon from 'url:../../assets/icons/append.svg';
import deleteIcon from 'url:../../assets/icons/delete.svg';
import APIClient from '../../core/api/http';
import router from '../../core';
import store, { storeEventBus } from '../../store';
import UserController from '../../core/controllers/users';

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

const topDropdown = new Dropdown({
  classNames: 'dropdown dropdown_right dropdown_top',
  id: 'controls-dropdown',
  icon: verticalDotsIcon,
  actions: [
    { icon: appendIcon, text: 'qwe' },
    { icon: deleteIcon, text: 'ewq' },
  ],
});

const bottomDropdown = new Dropdown({
  classNames: 'dropdown dropdown_left dropdown_bottom',
  id: 'controls-dropdown',
  icon: attachIcon,
  actions: [
    { icon: appendIcon, text: 'qwe' },
    { icon: deleteIcon, text: 'ewq' },
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

const form = new Form({
  classNames: 'form',
  title: 'Новый чат',
  isRow: false,
  fields: [input],
  firstBtn: button,
  settings: { withInternalID: true },
});

const dialog = new Dialog({
  classNames: 'dialog hidden',
  hasBackground: false,
  show: false,
  content: form,
});

let webSocketConnection: WebSocketService;
const hideDialog = () => {
  dialog.setProps({ show: false, hasBackground: false });
  dialog.hide();
};

const showDialog = () => {
  dialog.setProps({ show: true, hasBackground: true });
  dialog.show();
};

export default class Chats extends Block {
  constructor() {
    super('div', {
      classNames: 'chats',
      dialog,
      sidebar,
      topDropdown,
      bottomDropdown,
      events: {
        submit: async (e: Event) => {
          e.preventDefault();

          const dialogInput: HTMLInputElement | null = document.querySelector('input[name="title"]');
          const dialogForm: HTMLInputElement | null = document.querySelector(`[data-id='${form.getUUID()}']`);
          const chatForm: HTMLInputElement | null = document.querySelector('form.chat__form');

          if (e.target === chatForm && dialogInput && webSocketConnection) {
            try {
              const chatFormInput = e.target.firstChild;
              await webSocketConnection.send({
                content: chatFormInput.value,
                type: 'message',
              });
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
        },
        click: async (e: Event) => {
          // TODO: брать createChatButton из .sidebar__header
          const createChatButton = document.querySelector('a.rounded_button.text-light');
          const dialogBackground = document.querySelector('.blur-background');

          if (e.target.offsetParent.className === 'sidebar__chat-inner') {
            const chatElement = e.target.offsetParent;
            const user = await UserController.getUser(true);
            const { chatId } = chatElement.dataset;
            const { token } = await ChatsControllerInstance.getToken(chatId);

            webSocketConnection = new WebSocketService(user.id, chatId, token);

            storeEventBus.on('flow:state-updated', () => {
              const messages = store.get('messages');

              this.setProps({ sidebar, messages });
            });
          }

          if (e.target === dialogBackground) {
            hideDialog();
          }

          if (e.target === createChatButton) {
            showDialog();
          }

          if (e.target?.className === 'dropdown__image image') {
            const dropdown = e.target.parentNode;
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
