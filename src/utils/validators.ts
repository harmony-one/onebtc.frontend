import * as _ from 'lodash';
import { bitcoinToSatoshi } from '../services/bitcoin';
import utils from 'web3-utils';
import * as bitcoin from 'bitcoinjs-lib';

export function createValidate(
  func: (value: any, data?: any) => boolean,
  error: any,
) {
  return {
    validator(
      rule: any[],
      value: any,
      callback: (errors: any[]) => void,
      storeData?: any,
    ) {
      const errors = [];

      if (func(value, storeData)) {
        errors.push(error);
      }
      callback(errors);
    },
  };
}

interface ValidatorFunc<T = string> {
  (rule: any[], value: T, callback: (errors: any[]) => void): void;
}

export const maxLength = (length: number, msg?: string): ValidatorFunc => (
  _,
  value,
  callback,
) => {
  const errors = [];

  if (value.length > length) {
    const defaultMsg = `Превышена допустимая длина текста (${length} символов)`;
    errors.push(msg || defaultMsg);
  }

  callback(errors);
};

export const maxAmount = (amount: number, msg?: string): ValidatorFunc => (
  _,
  value,
  callback,
) => {
  const errors = [];

  if (value && Number(value) > amount) {
    const defaultMsg = `Exceeded the maximum amount`;
    errors.push(msg || defaultMsg);
  }

  callback(errors);
};

export const minAmount = (amount: number, msg?: string): ValidatorFunc => (
  _,
  value,
  callback,
) => {
  const errors = [];

  if (value && Number(value) < amount) {
    const defaultMsg = `Minimum amount is ${amount}`;
    errors.push(msg || defaultMsg);
  }

  callback(errors);
};

export const isTheSameAs = (fieldName: string, err: string) => {
  return {
    ...createValidate(
      (value, formData) => _.get(formData, fieldName) !== value,
      err,
    ),
    validateType: 'requiredValidator',
  };
};

export const nonEmptyFilesRule = (
  _: any,
  value: File[],
  cb: (errors: any[]) => void,
) => {
  const errors = [];

  if (!value || value.length === 0) {
    errors.push('Прикрепите документы');
  }

  cb(errors);
};

export const isLengthBetween = (minLength: number, maxLength: number) => {
  return {
    validator(
      rule: any[],
      value: string,
      callback: (errors: any[]) => void,
      storeData?: any,
    ) {
      const errors = [];

      if (!value || value.length < minLength || value.length > maxLength) {
        let error = `Длина значения должна быть от ${minLength} до ${maxLength} [${value.length}]`;
        if (minLength === maxLength) {
          error = `Длина значения должна быть ${minLength} [${value.length}]`;
        }
        errors.push(error);
      }

      callback(errors);
    },
    validateType: 'requiredValidator',
  };
};

export const limitLength = (value: string | number, limit = 19) =>
  String(value).slice(0, limit);

export const oneOfLengths = (
  lengths: number[],
  message = `Длина значения может быть ${lengths.join(' или ')} символов`,
) => createValidate(value => !lengths.includes(value.length), message);

export const hasWords = (count: number, message: string) =>
  createValidate((value: string) => {
    if (value) {
      const names = value.split(' ').filter(item => item !== '');
      if (names.length >= count) {
        return false;
      }
    }
    return true;
  }, message);

export const moreThanZero = {
  validator(
    rule: any[],
    value: any,
    callback: (errors: any[]) => void,
    storeData?: any,
  ) {
    const errors = [];

    if (!value || Number(value) <= 0) {
      errors.push('Value must be more than 0');
    }

    callback(errors);
  },
  validateType: 'requiredValidator',
};

export const btcAddressBech32 = createValidate((value: string) => {
  try {
    bitcoin.address.fromBech32(value).data.toString('hex');
    return false;
  } catch (ex) {
    return true;
  }
}, 'Only Native Segwit (BECH32) supported');

export const lessThanSat = (amount, message) => {
  return createValidate((value: string) => {
    return bitcoinToSatoshi(value) > amount;
  }, message);
};

export const moreThenSat = (amount, message) => {
  return createValidate((value: string) => {
    return bitcoinToSatoshi(value) < amount;
  }, message);
};

export const lessThanWei = (amount, message) => {
  return createValidate((value: string) => {
    return utils.toWei(value) > amount;
  }, message);
};
