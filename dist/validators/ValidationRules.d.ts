/**
 * Validation rule to check if the value is required.
 * @param message - The error message to display if validation fails. Defaults to "This field is required."
 * @returns A function that validates if the value is non-empty.
 */
export declare const required: (message?: string) => (value: string) => string | null;
/**
 * Validation rule to check if the value meets the minimum length requirement.
 * @param minLength - The minimum length required.
 * @param message - The error message to display if validation fails. Defaults to "This field must be at least {minLength} characters long."
 * @returns A function that validates if the value has the minimum length.
 */
export declare const minLength: (minLength: number, message?: string) => (value: string) => string | null;
/**
 * Validation rule to check if the value meets the maximum length requirement.
 * @param maxLength - The maximum length allowed.
 * @param message - The error message to display if validation fails. Defaults to "This field must be no more than {maxLength} characters long."
 * @returns A function that validates if the value has the maximum length.
 */
export declare const maxLength: (maxLength: number, message?: string) => (value: string) => string | null;
/**
 * Validation rule to check if the value matches a regular expression pattern.
 * @param pattern - The regular expression pattern to match.
 * @param message - The error message to display if validation fails. Defaults to "This field does not match the required pattern."
 * @returns A function that validates if the value matches the pattern.
 */
export declare const pattern: (pattern: RegExp, message?: string) => (value: string) => string | null;
/**
 * Validation rule to check if the value is a valid email format.
 * @param message - The error message to display if validation fails. Defaults to "This field must be a valid email address."
 * @returns A function that validates if the value is a valid email.
 */
export declare const email: (message?: string) => (value: string) => string | null;
