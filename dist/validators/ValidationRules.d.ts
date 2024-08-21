/**
 * Validation rule to check if the value is required.
 * @param {string} [message] - The error message to display if validation fails. Defaults to the translation for 'required'.
 * @returns A function that validates if the value is non-empty.
 */
export declare const required: (message?: string) => (value: string) => string | null;
/**
 * Validation rule to check if the value meets the minimum length requirement.
 * @param {number} min - The minimum length required.
 * @param {string} [message] - The error message to display if validation fails. Defaults to the translation for 'minLength'.
 * @returns A function that validates if the value has the minimum length.
 */
export declare const minLength: (min: number, message?: string) => (value: string) => string | null;
/**
 * Validation rule to check if the value meets the maximum length requirement.
 * @param {number} max - The maximum length allowed.
 * @param {string} [message] - The error message to display if validation fails. Defaults to the translation for 'maxLength'.
 * @returns A function that validates if the value has the maximum length.
 */
export declare const maxLength: (max: number, message?: string) => (value: string) => string | null;
/**
 * Validation rule to check if the value matches a regular expression pattern.
 * @param {RegExp} pattern - The regular expression pattern to match.
 * @param {string} [message] - The error message to display if validation fails. Defaults to the translation for 'pattern'.
 * @returns A function that validates if the value matches the pattern.
 */
export declare const pattern: (regex: RegExp, message?: string) => (value: string) => string | null;
/**
 * Validation rule to check if the value is a valid email format.
 * @param {string} [message] - The error message to display if validation fails. Defaults to the translation for 'email'.
 * @returns A function that validates if the value is a valid email.
 */
export declare const email: (message?: string) => (value: string) => string | null;
/**
 * Checks if the value is a number within a specified range.
 * @param {number} min - Minimum value (inclusive).
 * @param {number} max - Maximum value (inclusive).
 * @param {string} [message] - The error message to display if validation fails. Defaults to the translation for 'range'.
 */
export declare const range: (min: number, max: number, message?: string) => (value: string) => string | null;
/**
 * Checks if the value matches another field's value.
 * @param {string} fieldToMatch - ID of the field to match against.
 * @param {string} [message] - The error message to display if validation fails. Defaults to the translation for 'matches'.
 */
export declare const matches: (fieldToMatch: string, message?: string) => (value: string, formValues?: {
    [key: string]: string;
} | undefined) => string | null;
