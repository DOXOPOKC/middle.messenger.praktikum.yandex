import {compile} from 'pug';

export const source = `
if (isAvatar)
  label.file-uploader(for=name)= label
  input(type="file" id=name name=name accept="image/png" required)
else if (isRow)
  label.list__text_left(for=name)= label
    input.list__text_right(
      class=classes
      value=value
      type=type
      name=name
      required=required
    )
else
  label.input__label.form__label(for=name)= label
    input.input__field.body-1(
      class=classes
      type=type
      value=value
      name=name
      required=required
    )
    .messages
      .messages__wrapper
        if (messages.length)
          each message in messages
            .messages__message.text-error.overline-2
              !=message
`;

export const template = compile(source);
