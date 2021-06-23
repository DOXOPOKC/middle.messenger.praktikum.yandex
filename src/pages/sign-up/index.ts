import {compile} from 'pug';
import Block, {renderBlock} from '../../core/block';
import {Button} from '../../components/button';
import {Input} from '../../components/input';
import Form from '../../components/form';

const source = `
.dialog
  .dialog__window.dialog__window_medium
    != form
`;

const template = compile(source);

const formProps = {
  classNames: 'form',
  title: 'Регистрация',
  isRow: false,
  firstBtn: (new Button({
    classNames: 'button body-1 text-light',
    attrs: {
      type: 'submit',
    },
    text: 'Зарегистрироваться',
  })).getTemplate(),
  secondBtn: (new Button({
    classNames: 'button button-light caption text-link',
    text: 'Войти',
    attrs: {
      type: 'button',
    },
  })).getTemplate(),
  fields: [
    (new Input({
      classNames: 'input',
      name: 'email',
      type: 'email',
      label: 'Почта',
      value: 'pochta@yandex.ru',
    })).getTemplate(),
    (new Input({
      classNames: 'input',
      name: 'login',
      type: 'text',
      label: 'Логин',
      value: 'ivanivanov',
    })).getTemplate(),
    (new Input({
      classNames: 'input',
      name: 'firstname',
      type: 'text',
      label: 'Имя',
      value: 'Иван',
    })).getTemplate(),
    (new Input({
      classNames: 'input',
      name: 'lastname',
      type: 'text',
      label: 'Фамилия',
      value: 'Иванов',
    })).getTemplate(),
    (new Input({
      classNames: 'input',
      name: 'phone',
      type: 'phone',
      label: 'Телефон',
      value: '+ 7 (909) 967 30 30',
    })).getTemplate(),
    (new Input({
      name: 'second-password',
      type: 'password',
      label: 'Пароль (еще раз)',
      value: 'qweqweqweqwe',
      classes: ['text-error'],
      messages: ['Пароли не совпадают'],
    })).getTemplate(),
  ],
};

class SignUp extends Block {
  constructor() {
    super('div', {
      classNames: 'sign-in',
      form: (new Form(formProps)).getTemplate(),
      events: {
        click: (e: Event) => this.handleClick(e),
      },
    });
  }

  handleClick(e: Event) {
    e.preventDefault();
    console.log(e);
  }

  render() {
    return template(this.props);
  }
}

const page = new SignUp();

renderBlock('.app', page);
