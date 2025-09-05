import * as yup from 'yup';
import parsePhoneNumberFromString from 'libphonenumber-js';


export function indianMobileNumberValidationSchema({
  value,
  required = false,
}: {
  value: string;
  required?: boolean;
}) {
  let schema = yup
    .string()
    .trim()
    .nullable()
    .test('mobile-format', 'Invalid mobile number', val => {
      if (!val || val.trim() === '') return true;
      return /^\+91\s?[6-9]\d{9}$/.test(val);
    });

  if (required) {
    schema = schema.required(`${value} is required`);
  }

  return schema;
}

export function nameValidationSchema({
  fieldName = 'Name',
  required = false,
  minLength = 3,
}: {
  fieldName?: string;
  required?: boolean;
  minLength?: number;
}) {
  const regex = /^[a-zA-ZÀ-ÿ\s.]+$/;

  let schema = yup
    .string()
    .nullable()
    .trim()
    .matches(regex, `Enter valid characters only.`)
    .min(minLength, `${fieldName} must be at least ${minLength} characters.`);

  if (required) {
    schema = schema.required(`${fieldName} is required.`);
  }

  return schema;
}

export function emailValidationSchema({
  fieldName = 'Email',
  required = false,
}: {
  fieldName?: string;
  required?: boolean;
} = {}) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  let schema = yup
    .string()
    .trim()
    .nullable()
    .email(`${fieldName} must be a valid email address.`)
    .matches(regex, `${fieldName} must be a valid email address.`)
    .transform(value => (value === '' ? undefined : value));

  if (required) {
    schema = schema.required(`${fieldName} is required.`);
  }

  return schema;
}

export function mobileNumberValidationSchema({
  value,
  required = false,
  isIndiaNumber = false,
}: {
  value?: string;
  required?: boolean;
  isIndiaNumber?: boolean;
}) {
  return yup
    .string()
    .trim()
    .test(
      'is-valid-mobile',
      'Mobile number not valid',
      function (mobileNumber) {
        const {createError} = this;

        if (!mobileNumber) {
          return !required || createError({message: `${value} is required`});
        }
        if (isIndiaNumber) {
          const phoneNumber = parsePhoneNumberFromString(mobileNumber, 'IN');

          if (!phoneNumber || !phoneNumber.isValid()) {
            return createError({message: `${value} not valid`});
          }
        } else {
          const phoneNumber = parsePhoneNumberFromString(mobileNumber);
          if (!phoneNumber || !phoneNumber.isValid()) {
            return createError({message: `${value} not valid`});
          }
        }
        return true;
      },
    );
}

