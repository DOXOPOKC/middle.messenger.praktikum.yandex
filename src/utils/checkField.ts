import Block from "../core/block";
import validate from "./validation";

export default function checkField(field: Block, value: string, type: string) {
  const validation = validate(value, type);

  if (!validation.isValid) {
    field.setProps({value, messages: [validation.errorMessage]});
  } else {
    field.setProps({value, messages: []});
  }
}
