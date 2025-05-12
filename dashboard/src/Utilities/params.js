/* eslint-disable import/prefer-default-export */
import { serialize } from 'object-to-formdata';
import queryString from 'query-string';

function isRestricted(keys, restrictedName) {
  return keys.includes(restrictedName);
}

function parseFields(fields, single = false) {
  if (!fields?.length) return '';
  return `${single ? '?' : '&'}fields=${fields.join(',')}`;
}

function parseCount(count, single = false) {
  if (typeof count === 'undefined') return '';
  return `${single ? '?' : '&'}count=${count}`;
}

function parseWith(withField, single = false) {
  if (!withField?.length) return '';
  return `${single ? '?' : '&'}with=${withField.join(',')}`;
}

function parseModification(param) {
  if (!param) return '';
  return `/${param.join('/')}`;
}

function parseSimple(params) {
  if (Object.keys(params).length > 0) {
    return `?${Object.entries(params)
      .filter(([, value]) => {
        if (value) {
          if (Array.isArray(value)) {
            return value.length;
          }
          return value;
        }
        return value;
      })
      .reduce((acc, [key, value]) => {
        let item;
        if (typeof value === 'boolean') {
          acc.push(`${key}=${value ? '1' : '0'}`);
        } else if (value) {
          if (Array.isArray(value)) {
            item = value
              .map((valueItem) => {
                return `${key}[]=${valueItem}`;
              })
              .join('&');
          } else item = `${key}=${value}`;
          acc.push(item);
        }
        return acc;
      }, [])
      .join('&')}`;
  }
  return '';
}

export function parse(params) {
  if (!params) return '';
  const keys = Object.keys(params);
  if (!keys || !keys.length) return '';
  if (keys.length === 1) {
    if (isRestricted(keys, 'modification'))
      return parseModification(params.modification);
    if (isRestricted(keys, 'fields')) return parseFields(params.fields, true);
    if (isRestricted(keys, 'count')) return parseCount(params.count, true);
    if (isRestricted(keys, 'with')) return parseWith(params.with, true);
    return parseSimple(params, true);
  }
  const { fields, with: withField, modification, count, ...rest } = params;
  const { length: restLength } = Object.keys(rest);
  return `${parseModification(modification)}${parseSimple(rest)}${parseFields(
    fields,
    !restLength
  )}${parseCount(count, !(restLength || fields?.length))}${parseWith(
    withField,
    !(restLength || fields?.length || count)
  )}`;
}

export function toFormData(object) {
  return JSON.stringify(object);
}

export function toObject(search) {
  return queryString.parse(search, {
    arrayFormat: 'bracket',
    parseNumbers: false,
    parseBooleans: true,
  });
}

export function toString(object) {
  return queryString.stringify(object, {
    arrayFormat: 'bracket',
    skipNull: true,
    skipEmptyString: true,
  });
}

export function serializeParams(object) {
  return serialize(object, {
    indices: true,
    booleansAsIntegers: true,
  });
}
