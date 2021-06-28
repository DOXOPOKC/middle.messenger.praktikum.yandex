import Block from '../../core/block';
import {Button, Form, Input, Sidebar} from '../../components';
import {render} from '../../utils';
import {template} from './template';

const firstBtn = new Button({
  classNames: 'button body-1 text-light button_profile',
  text: 'Сохранить',
  attrs: {type: 'submit'},
  settings: {withInternalID: true},
});

const sidebar = new Sidebar({
  mini: true,
  classNames: 'sidebar sidebar_mini',
});

const oldPasswordField = new Input({
  isRow: true,
  classNames: 'input',
  name: 'old-password',
  type: 'password',
  label: 'Старый пароль',
  value: 'qweqweqwe',
  classes: [],
  messages: [],
  settings: {withInternalID: true},
});

const newPasswordField = new Input({
  isRow: true,
  classNames: 'input',
  name: 'new-password',
  type: 'password',
  label: 'Новый пароль',
  value: 'qweqweqweqwe',
  classes: [],
  messages: [],
  settings: {withInternalID: true},
});

const repeatPasswordField = new Input({
  isRow: true,
  classNames: 'input',
  name: 'repeat-password',
  type: 'password',
  label: 'Повторите новый пароль',
  value: 'qweqweqweqwe',
  classes: [],
  settings: {withInternalID: true},
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
  settings: {withInternalID: true},
};

const form = new Form(formProps);

class Profile extends Block {
  constructor() {
    super('div', {
      classNames: 'profile-page',
      sidebar,
      form,
    });
  }

  render() {
    return template(this.props);
  }
}

const page = new Profile();

render('.app', page);
