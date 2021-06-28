import {compile} from 'pug';

export const source = `
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

export const template = compile(source);
