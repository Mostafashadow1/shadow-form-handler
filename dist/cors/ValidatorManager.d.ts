import { FieldManager } from './FieldManager';
import { ErrorManager } from './ErrorManager';
import { HooksHandler } from './HooksHandler';
/**
 * ValidatorManager class: Handles form field validation.
 */
export declare class ValidatorManager {
    private fieldManager;
    private errorManager;
    private hooksHandler;
    constructor(fieldManager: FieldManager, errorManager: ErrorManager, hooksHandler: HooksHandler);
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
     * @param {{ [key: string]: string }} formValues - The current values of all form fields.
     * @returns {string|null} The error message if validation fails, otherwise null.
     */
    private validateFieldSchema;
    /**
   * Perform custom validations on a given form field.
   * @param {Field} field - The form field to validate.
   * @param {{ [key: string]: string }} formValues - The current values of all form fields.
   * @returns {Promise<string|null>} The error message if validation fails, otherwise null.
   */
    private validateCustomValidator;
    /**
    * Sets up validation for a field that depends on another field's value.
    * @param {string} fieldId - The ID of the field that depends on others.
    * @param {string[]} dependencies - The IDs of the fields this field depends on.
    */
    setupDependencyListeners(fieldId: string, dependencies: string[]): void;
    /**
     * Updates the error message for a field and displays all errors.
     * @param {Field} field - The field to update.
     * @param {string | null} error - The error message to set, or null if there is no error.
     */
    private updateFieldError;
}
