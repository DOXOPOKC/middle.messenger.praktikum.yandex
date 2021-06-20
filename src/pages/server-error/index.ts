import ErrorBlock from "../../components/errorBlock";
import { render } from "../../utils/renderDOM";

const props = {
  title: "500",
  description: "Мы уже фиксим",
  linkText: "Назад к чатам"
};

const errorBlock = new ErrorBlock(props);

render(".app", errorBlock);
