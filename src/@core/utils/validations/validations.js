import { extend, localize } from 'vee-validate'
import {
  required as rule_required,
  email as rule_email,
  min as rule_min,
  confirmed as rule_confirmed,
  regex as rule_regex,
  between as rule_between,
  alpha as rule_alpha,
  integer as rule_integer,
  digits as rule_digits,
  alpha_dash as rule_alpha_dash,
  alpha_num as rule_alpha_num,
  length as rule_length,
  image as rule_image,
} from 'vee-validate/dist/rules'

import { messages as messagePt } from 'vee-validate/dist/locale/pt_BR'

// eslint-disable-next-line object-curly-newline
import { validatorPositive, validatorUrlValidator, validatorPassword, validatorCreditCard } from './validators'

extend('required', {
  ...rule_required,
  message: messagePt.required,
})
extend('email', {
  ...rule_email,
  message: messagePt.email,
})
extend('regex', {
  ...rule_regex,
  message: messagePt.regex,
})
extend('min', {
  ...rule_min,
  message: messagePt.min,
})
extend('confirmed', {
  ...rule_confirmed,
  message: messagePt.confirmed,
})
extend('between', {
  ...rule_between,
  message: messagePt.between,
})
extend('alpha', {
  ...rule_alpha,
  message: messagePt.alpha,
})
extend('integer', {
  ...rule_integer,
  message: messagePt.integer,
})
extend('digits', {
  ...rule_digits,
  message: messagePt.digits,
})
extend('alpha_dash', {
  ...rule_alpha_dash,
  message: messagePt.alpha_dash,
})
extend('alpha_num', {
  ...rule_alpha_num,
  message: messagePt.alpha_num,
})
extend('length', {
  ...rule_length,
  message: messagePt.length,
})
extend('image', {
  ...rule_image,
  message: messagePt.image,
})

// ////////////////////////////////////////////////////////
// General
// ////////////////////////////////////////////////////////

export const positive = extend('positive', {
  validate: validatorPositive,
  message: 'Please enter positive number!',
})

export const credit = extend('credit-card', {
  validate: validatorCreditCard,
  message: 'It is not valid credit card!',
})

export const password = extend('password', {
  validate: validatorPassword,
  message: 'Your {_field_} must contain at least one uppercase, one lowercase, one special character and one digit',
})

export const url = extend('url', {
  validate: validatorUrlValidator,
  message: 'URL is invalid',
})

// Install English and Arabic localizations.
// localize({
//   en: {
//     messages: en.messages,
//     names: {
//       email: 'Email',
//       password: 'Password',
//     },
//     fields: {
//       password: {
//         min: '{_field_} is too short, you want to get hacked?',
//       },
//     },
//   },
//   ar: {
//     messages: ar.messages,
//     names: {
//       email: 'البريد الإلكتروني',
//       password: 'كلمة السر',
//     },
//     fields: {
//       password: {
//         min: 'كلمة السر قصيرة جداً سيتم اختراقك',
//       },
//     },
//   },
// })
// ////////////////////////////////////////////////////////
// NOTE:
// Quasar validation for reference only
// Remove this note once development is finished and make sure to
// to convert all of them in veevalidate version
// ////////////////////////////////////////////////////////

// export const required = (val) => {
//   return (val && val.length > 0) || '*Field is required'
// }

// export const required_obj = (obj) => {
//   if (obj === null || obj === undefined) return '*Field is required'
//   return (Object.entries(obj).length > 0 && obj.constructor === Object) || '*Field is required'
// }

// export const no_blank_spaces_arr = (arr) => {
//   return arr.every(val => (val.trim() && val.trim().length > 0)) || 'Blank Spaces are not allowed'
// }

// export const url = val => {
//   // If blank return
//   if (val === undefined || val === null || val.length === 0) return true

//   // Used
//   // https://stackoverflow.com/questions/4314741/url-regex-validation

//   // Other
//   // https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
//   // https://www.w3resource.com/javascript-exercises/javascript-regexp-exercise-9.php
//   // https://www.geeksforgeeks.org/how-to-validate-url-using-regular-expression-in-javascript/

//   /* eslint-disable no-useless-escape */
//   const re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/
//   /* eslint-enable no-useless-escape */
//   return re.test(val) || 'URL is invalid'
// }

// export const date = val => {

//   // If blank return
//   if (val === undefined || val === null || val.length === 0) return true

//   // https://github.com/quasarframework/quasar/blob/dev/ui/src/utils/patterns.js
//   return /^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(val) || 'Date is invalid'
// }

// export const max = (val, max) => {

//   // If blank return
//   if (val === undefined || val === null) return true

//   return val.length <= max || `More than ${max} characters are not allowed`
// }

// export const max_arr = (val, max) => {
//   return val.length <= max || `More than ${max} values are not allowed`
// }

// export const min = (val, min) => {

//   // If blank return
//   if (val === undefined || val === null || val.length === 0) return true

//   return val.length >= min || `Minimum ${min} characters are required`
// }

// export const num_range = (val, min, max) => {

//   // If blank return
//   if (val === undefined || val === null || val.length === 0) return true

//   const msg = 'Value is invalid'
//   if (min === null) return val <= max || msg
//   else if (max === null) return val >= min || msg
//   else return (val >= min && val <= max) || msg
// }
