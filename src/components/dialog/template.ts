export default `
if (hasBackground)
  .blur-background
.dialog__window
  if (content)
    .dialog__content
      != content
  if (actions)
    .dialog__actions
      != actions
  .dialog__messages.messages
    .messages__wrapper
      if (messages)
        each message in messages
          .messages__message.text-error.caption= message
`;
