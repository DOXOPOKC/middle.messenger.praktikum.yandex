import { renderBlock } from '../../core/block';
import { compile } from "pug";
import Block from '../../core/block';
import { Button } from '../../components/button';
import { Input } from '../../components/input';

const source = `
.log-in-block
  h1.log-in-header.basic-header Вход
  form.log-in-form
    .log-in-fields
      != inputLogin
      != inputPassword
    != submitButton
  a.log-in-no-account-link.basic-link(href="/sign_in") Нет аккаунта?
`;

const template = compile(source);

export class LogIn extends Block {
  constructor() {
    super('div', {
      classNames: 'log-in-page',
      submitButton: new Button({
        class: 'log-in-button basic-button',
        type: 'submit',
        text: 'Авторизоваться'
      }),
      loginInput: new Input({
        labelClass: 'basic-label',
        name: 'Логин',
        inputClass: 'login basic-input',
        type: 'text',
        errClass: 'login-err'
      }),
      passwordInput: new Input({
        labelClass: 'basic-label',
        name: 'Пароль',
        inputClass: 'password basic-input',
        type: 'password',
        errClass: 'password-err'
      }),
      events: {
        focusout: (e: Event) => this.handleInputBlur(e),
        click: (e: Event) => this.handleClick(e)
      }
    });
  }

  handleSubmit(e: Event) {
    e.preventDefault();

  }

  handleInputBlur(e: Event) {
    e.stopPropagation();

  }

  handleClick(e: Event) {
    e.preventDefault();
    console.log(e);
  }

  render() {
    const {loginInput, passwordInput, submitButton} = this.props;
    return template({
      inputLogin: loginInput.render(),
      inputPassword: passwordInput.render(),
      submitButton: submitButton.render()
    });
  }
}

const foo = new LogIn();

renderBlock('.app', foo);
