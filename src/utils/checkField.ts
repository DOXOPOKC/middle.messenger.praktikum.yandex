import Block from '../core/block';
import validate from './validation';

export default (field: Block, value: string, type: string): void => {
  const validation = validate(value, type);

  if (!validation.isValid) {
    field.setProps({ value, messages: [validation.errorMessage] });
  } else {
    field.setProps({ value, messages: [] });
  }
};
