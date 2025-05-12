/* eslint-disable import/prefer-default-export */
import { serialize } from 'object-to-formdata';
import { parse, stringify } from 'query-string';

export function toFormData(object: object) {
  return JSON.stringify(object);
}

export function toObject(search: string, options: object = {}) {
  return parse(search, {
    arrayFormat: 'bracket',
    parseNumbers: false,
    parseBooleans: true,
    ...options,
  });
}

export function toString(object: object, options: object = {}) {
  const params = stringify(object, {
    arrayFormat: 'bracket',
    skipNull: true,
    skipEmptyString: true,
    ...options,
  });
  return params ? `?${params}` : '';
}

export function serializeParams(object: object) {
  return serialize(object, {
    indices: true,
    booleansAsIntegers: true,
  });
}
