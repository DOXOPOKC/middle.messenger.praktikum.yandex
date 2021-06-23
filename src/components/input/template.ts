import { compile } from "pug";

export const source = `
label.input__label.form__label(for=name)= label
  input.input__field.body-1(
    class=classes
    type=type,
    value=value,
    name=name
  )
  .messages
    .messages__wrapper
      if (messages)
        each message in messages
          .messages__message.text-error.overline-2= message
`;

export const template = compile(source);
