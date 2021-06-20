import ErrorBlock from "../../components/errorBlock";
import { render } from "../../utils/renderDOM";

const props = {
  title: "404",
  description: "Не туда попали",
  linkText: "Назад к чатам"
};

const errorBlock = new ErrorBlock(props);

render(".app", errorBlock);
