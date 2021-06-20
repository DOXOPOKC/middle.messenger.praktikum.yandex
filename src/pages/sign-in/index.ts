import Form from "../../components/form/index";
import Dialog from "../../components/dialog/index";
import { render } from "../../utils/renderDOM";

const formProps = {
  firstBtn: true,
  secondBtn: true,
  isRow: false,

  title: "Вход",
  firstBtnLabel: "Авторизоваться",
  secondBtnLabel: "Нет аккаунта?",
  fields: [
    {
      name: "login",
      type: "text",
      label: "Логин",
      value: "ivanivanov",
      classes: [],
      messages: ["Неверный логин"]
    },
    {
      name: "password",
      type: "password",
      label: "Пароль",
      value: "qweqweqweqwe",
      classes: [],
      messages: []
    }
  ]
};
const form = new Form(formProps);

const dialogProps = {
  hasBackground: false,
  title: '123',
  titleClasses: ['123'],
  content: form.render(),
  actions: null,
  messages: null
}
console.log('123');

const dialog = new Dialog(dialogProps);

// render(".app", dialog);
