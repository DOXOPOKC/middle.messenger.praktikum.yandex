import { ErrorBlock } from '../../components';

export default class NotFound extends ErrorBlock {
  constructor() {
    super({
      classNames: 'error-block',
      title: '404',
      description: 'Не туда попали',
      linkText: 'Назад к чатам',
    });
  }
}
