import { FieldManager } from './FieldManager';
import { ErrorHandler } from './ErrorHandler';
import { HooksHandler } from './HooksHandler';
/**
 * Validator class: Handles form field validation.
 */
export declare class Validator {
    private fieldManager;
    private errorHandler;
    private hooksHandler;
    constructor(fieldManager: FieldManager, errorHandler: ErrorHandler, hooksHandler: HooksHandler);
    /**
     * Validate all form fields.
     * @returns {Promise<void>}
     */
    validateAll(): Promise<void>;
    /**
  * Validate a single form field.
  * @param {string} id - The id of the form field to validate.
  * @returns {Promise<void>}
  */
    validateField(id: string): Promise<void>;
    /**
     * Validate a field against its schema validators.
     * @param {Field} field - The form field to validate.
     * @returns {string|null} The error message if validation fails, otherwise null.
     */
    private validateFieldSchema;
    /**
     * Perform custom validations on a given form field.
     * @param {Field} field - The form field to validate.
     * @returns {Promise<string|null>} The error message if validation fails, otherwise null.
     */
    private validateCustomValidator;
    /**
     * Sets up validation for a field that depends on another field's value.
     * @param field - The field that requires validation.
     * @param dependentFieldId - The ID of the field that this field depends on.
     * @param validate - A function that validates the field's value. It returns a boolean or a Promise that resolves to a boolean.
     * @param message - The error message to display if validation fails.
     */
    private setupDependentValidation;
    /**
     * Updates the error message for a field and displays all errors.
     * @param field - The field to update.
     * @param error - The error message to set, or null if there is no error.
     */
    private updateFieldError;
}
