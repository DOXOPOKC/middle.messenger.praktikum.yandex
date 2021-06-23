import { ErrorBlock } from '../../components/errorBlock';
import { renderBlock } from '../../core/block';


const page = new ErrorBlock({
  classNames: "error-block",
  title: "404",
  description: "Не туда попали",
  linkText: "Назад к чатам"
});

renderBlock('.app', page);
