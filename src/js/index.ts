// У кнопки есть index.js, который экспортирует только нужное
import Button from "../components/button/index.ts";
import { render } from "../utils/renderDOM.ts";

const button = new Button({
    className: 'rounded-button',
    child: 'Click me',
});

render(".app", button);

// Через секунду контент изменится сам, достаточно обновить пропсы
setTimeout(() => {
  button.setProps({
    className: 'otherClass',
    child: 'Click me, please',
  });
}, 1000);
