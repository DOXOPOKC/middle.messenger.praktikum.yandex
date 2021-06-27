import render from './render';
import validate from './validation';
import Block from "../core/block";

const checkField = (field: Block, value: string, type: string) => {
  const validation = validate(value, type);

  if (!validation.isValid) {
    field.setProps({value, messages: [validation.errorMessage]});
  } else {
    field.setProps({value, messages: []});
  }
};

function cloneDeep(obj: Record<string, unknown>): Record<string, unknown> {
  const clone: Record<string, unknown> = {};

  for (const i in obj) {
    if (typeof (obj[i]) === 'object' && obj[i] != null) {
      clone[i] = cloneDeep(obj[i]);
    } else {
      clone[i] = obj[i];
    }
  }

  return clone;
}

export {render, validate, cloneDeep, checkField};
