/**
 * Validation rule to check if the value is required.
 * @param message - The error message to display if validation fails.
 * @returns A function that validates if the value is non-empty.
 */
export const required = (message: string) => (value: string) => !value ? message : null;

/**
 * Validation rule to check if the value meets the minimum length requirement.
 * @param minLength - The minimum length required.
 * @param message - The error message to display if validation fails.
 * @returns A function that validates if the value has the minimum length.
 */
export const minLength = (minLength: number, message: string) => (value: string) => value.length < minLength ? message : null;

/**
 * Validation rule to check if the value meets the maximum length requirement.
 * @param maxLength - The maximum length allowed.
 * @param message - The error message to display if validation fails.
 * @returns A function that validates if the value has the maximum length.
 */
export const maxLength = (maxLength: number, message: string) => (value: string) => value.length > maxLength ? message : null;

/**
 * Validation rule to check if the value matches a regular expression pattern.
 * @param pattern - The regular expression pattern to match.
 * @param message - The error message to display if validation fails.
 * @returns A function that validates if the value matches the pattern.
 */
export const pattern = (pattern: RegExp, message: string) => (value: string) => !pattern.test(value) ? message : null;

/**
 * Validation rule to check if the value is a valid email format.
 * 
 * @param message - The error message to display if validation fails.
 * @returns A function that validates if the value is a valid email.
 */
export const email = (message: string) => (value: string) => !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ? message : null;
