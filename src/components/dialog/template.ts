import {compile} from 'pug';

export const source = `
if (hasBackground)
  .blur-background
.dialog__window(class=show ? 'visible' : 'hidden')
  if (content)
    .dialog__content
      != content.getTemplate()
  if (actions)
    .dialog__actions
      each action in actions
        != action.getTemplate()
  .dialog__messages.messages
    .messages__wrapper
      if (messages)
        each message in messages
          .messages__message.text-error.caption= message
`;

export const template = compile(source);
