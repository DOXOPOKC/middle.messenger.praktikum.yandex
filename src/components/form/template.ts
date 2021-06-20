export default `
form.form
  h1.form__title.title= title
  .form__main
    if (!isRow)
      each field in fields
        .input
          label.input__label.form__label(for=field.name)= field.label
          input.input__field.body-1(
            class=field.classes
            type=field.type,
            value=field.value,
            name=field.name
          )
          .messages
            .messages__wrapper
              if (field.messages)
                each message in field.messages
                  .messages__message.text-error.overline-2= message
    else
      .list
        ul.list__inner
          each field in fields
            li.list__item
              label.list__text_left= field.label
              input.list__text_right(
                type=field.type,
                value=field.value,
                name=field.name
              )
  .form__actions
    if (firstBtn)
      button.button.body-1.text-light(type="submit")= firstBtnLabel
    if (secondBtn)
      button.button.button-light.caption.text-link(type="button")= secondBtnLabel
`;
