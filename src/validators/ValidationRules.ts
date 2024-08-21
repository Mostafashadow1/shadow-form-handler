import { lang } from "../cors/LanguageManager";

/**
 * Validation rule to check if the value is required.
 * @param {string} [message] - The error message to display if validation fails. Defaults to the translation for 'required'.
 * @returns A function that validates if the value is non-empty.
 */
export const required = (message?: string) =>
  (value: string) => value.trim() ? null : message || lang.getTranslation('required', {}, 'This field is required.');

/**
 * Validation rule to check if the value meets the minimum length requirement.
 * @param {number} min - The minimum length required.
 * @param {string} [message] - The error message to display if validation fails. Defaults to the translation for 'minLength'.
 * @returns A function that validates if the value has the minimum length.
 */
export const minLength = (min: number, message?: string) =>
  (value: string) => value.length >= min ? null : message || lang.getTranslation('minLength', { min }, `This field must be at least ${min} characters long.`);

/**
 * Validation rule to check if the value meets the maximum length requirement.
 * @param {number} max - The maximum length allowed.
 * @param {string} [message] - The error message to display if validation fails. Defaults to the translation for 'maxLength'.
 * @returns A function that validates if the value has the maximum length.
 */
export const maxLength = (max: number, message?: string) =>
  (value: string) => value.length <= max ? null : message || lang.getTranslation('maxLength', { max }, `This field must be no more than ${max} characters long.`);

/**
 * Validation rule to check if the value matches a regular expression pattern.
 * @param {RegExp} pattern - The regular expression pattern to match.
 * @param {string} [message] - The error message to display if validation fails. Defaults to the translation for 'pattern'.
 * @returns A function that validates if the value matches the pattern.
 */
export const pattern = (regex: RegExp, message?: string) =>
  (value: string) => regex.test(value) ? null : message || lang.getTranslation('pattern', {}, 'This field does not match the required pattern.');

/**
 * Validation rule to check if the value is a valid email format.
 * @param {string} [message] - The error message to display if validation fails. Defaults to the translation for 'email'.
 * @returns A function that validates if the value is a valid email.
 */
export const email = (message?: string) =>
  pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message || lang.getTranslation('email', {}, 'This field must be a valid email address.'));

/**
 * Checks if the value is a number within a specified range.
 * @param {number} min - Minimum value (inclusive).
 * @param {number} max - Maximum value (inclusive).
 * @param {string} [message] - The error message to display if validation fails. Defaults to the translation for 'range'.
 */
export const range = (min: number, max: number, message?: string) =>
  (value: string) => {
    const num = parseFloat(value);
    return !isNaN(num) && num >= min && num <= max ? null : message || lang.getTranslation('range', { min, max }, `The value must be between ${min} and ${max}.`);
  };

/**
 * Checks if the value matches another field's value.
 * @param {string} fieldToMatch - ID of the field to match against.
 * @param {string} [message] - The error message to display if validation fails. Defaults to the translation for 'matches'.
 */
export const matches = (fieldToMatch: string, message?: string) =>
  (value: string, formValues?: { [key: string]: string }) =>
    formValues && value === formValues[fieldToMatch] ? null : message || lang.getTranslation('matches', { fieldToMatch }, `This field must match the ${fieldToMatch} field.`);

