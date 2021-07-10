import {ErrorBlock} from '../../components';

export default class ServerError extends ErrorBlock {
  constructor() {
    super({
      classNames: 'error-block',
      title: '500',
      description: 'Мы уже фиксим',
      linkText: 'Назад к чатам',
    });
  }
}
