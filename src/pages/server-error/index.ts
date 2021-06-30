import {ErrorBlock} from '../../components';
import {render} from '../../utils';

const page = new ErrorBlock({
  classNames: 'error-block',
  title: '500',
  description: 'Мы уже фиксим',
  linkText: 'Назад к чатам',
});

render('.app', page);
