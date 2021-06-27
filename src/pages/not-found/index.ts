import {ErrorBlock} from '../../components';
import {render} from '../../utils';

const page = new ErrorBlock({
  classNames: 'error-block',
  title: '404',
  description: 'Не туда попали',
  linkText: 'Назад к чатам',
});

render('.app', page);
