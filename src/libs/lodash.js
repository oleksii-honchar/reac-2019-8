import get from 'lodash/get';
import includes from 'lodash/includes';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';
import isBoolean from 'lodash/isBoolean';
import isNumber from 'lodash/isNumber';
import isFunction from 'lodash/isFunction';
import keys from 'lodash/keys';
import last from 'lodash/last';
import map from 'lodash/map';
import pick from 'lodash/pick';
import set from 'lodash/set';
import uniq from 'lodash/uniq';
import trim from 'lodash/trim';
import uniqueId from 'lodash/uniqueId';
import isUndefined from 'lodash/isUndefined';

const isDefined = (...args) => !isUndefined(...args);

export const _ = {
  get,
  includes,
  isEqual,
  isEmpty,
  isBoolean,
  isString,
  isArray,
  isNumber,
  isFunction,
  isObject,
  keys,
  last,
  map,
  pick,
  set,
  uniq,
  trim,
  uniqueId,
  isUndefined,
  isDefined,
};
