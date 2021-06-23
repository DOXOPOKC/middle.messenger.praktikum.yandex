import {ErrorBlock} from '../../components/errorBlock';
import {renderBlock} from '../../core/block';

const page = new ErrorBlock({
  classNames: 'error-block',
  title: '500',
  description: 'Мы уже фиксим',
  linkText: 'Назад к чатам',
});

renderBlock('.app', page);
