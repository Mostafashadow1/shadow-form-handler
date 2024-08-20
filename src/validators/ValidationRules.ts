import { lang } from "../cors/LanguageManager";

/**
 * Validation rule to check if the value is required.
 * @param message - The error message to display if validation fails. Defaults to "This field is required."
 * @returns A function that validates if the value is non-empty.
 */

export const required = (message?: string) => 
      (value: string) => value.trim() ? null : message || lang.getTranslation('required');
    
/**
 * Validation rule to check if the value meets the minimum length requirement.
 * @param minLength - The minimum length required.
 * @param message - The error message to display if validation fails. Defaults to "This field must be at least {minLength} characters long."
 * @returns A function that validates if the value has the minimum length.
 */
export const minLength = (min: number, message?: string) => 
      (value: string) => value.length >= min ? null : message || lang.getTranslation('minLength', { min });
    
/**
 * Validation rule to check if the value meets the maximum length requirement.
 * @param maxLength - The maximum length allowed.
 * @param message - The error message to display if validation fails. Defaults to "This field must be no more than {maxLength} characters long."
 * @returns A function that validates if the value has the maximum length.
 */
export const maxLength = (max: number, message?: string) => 
      (value: string) => value.length <= max ? null : message || lang.getTranslation('maxLength', { max });
    
/**
 * Validation rule to check if the value matches a regular expression pattern.
 * @param pattern - The regular expression pattern to match.
 * @param message - The error message to display if validation fails. Defaults to "This field does not match the required pattern."
 * @returns A function that validates if the value matches the pattern.
 */
export const pattern = (regex: RegExp, message?: string) => 
      (value: string) => regex.test(value) ? null : message || lang.getTranslation('pattern');
    
/**
 * Validation rule to check if the value is a valid email format.
 * @param message - The error message to display if validation fails. Defaults to "This field must be a valid email address."
 * @returns A function that validates if the value is a valid email.
 */
export const email = (message? : string ) => pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message as any || lang.getTranslation('email'));
    

/**
 * Checks if the value is a number within a specified range.
 * @param {number} min - Minimum value (inclusive).
 * @param {number} max - Maximum value (inclusive).
 * @param {string} [message] - Custom error message.
 */
export const range = (min: number, max: number, message?: string) => 
      (value: string) => {
        const num = parseFloat(value);
        return !isNaN(num) && num >= min && num <= max ? null : message || lang.getTranslation('range', { min, max });
      };

/**
 * Checks if the value matches another field's value.
 * @param {string} fieldToMatch - ID of the field to match against.
 * @param {string} [message] - Custom error message.
 */
export const matches = (fieldToMatch: string, message?: string) => 
      (value: string, formValues?: { [key: string]: string }) => 
        formValues && value === formValues[fieldToMatch] ? null : message || lang.getTranslation('matches', { fieldToMatch });
    
  

