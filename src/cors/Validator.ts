import { FieldManager } from './FieldManager';
import { Field, Hooks } from '../interfaces/index';
import { ErrorHandler } from './ErrorHandler';
import { HooksHandler } from './HooksHandler';

/**
 * Validator class: Handles form field validation.
 */
export class Validator {
  constructor(private fieldManager: FieldManager , private errorHandler : ErrorHandler , private hooksHandler : HooksHandler) {}

  /**
   * Validate all form fields.
   * @returns {Promise<void>}
   */
  public async validateAll() {
      const fields = this.fieldManager.getAllFields();
      const hooks : Hooks = this.hooksHandler.getHooks();
    if(hooks.beforeValidate) hooks.beforeValidate(fields);
    for (const field of fields) {
      await this.validateField(field.id);
    }
    if(hooks.afterValidate) hooks.afterValidate(fields);

  }


     /**
   * Validate a single form field.
   * @param {string} id - The id of the form field to validate.
   * @returns {Promise<void>}
   */
     public async validateField(id: string): Promise<void> {
      const field = this.fieldManager.getField(id);
      if (!field) return;
  
      // First, check schema validation
      const schemaError = this.validateFieldSchema(field);
      if (schemaError) {
        this.updateFieldError(field, schemaError);
        return;
      }
  
      // If no schema error, proceed with custom validation
      const customError = await this.validateCustomValidator(field);
      this.updateFieldError(field, customError);
    }
 
  /**
   * Validate a field against its schema validators.
   * @param {Field} field - The form field to validate.
   * @returns {string|null} The error message if validation fails, otherwise null.
   */
  private validateFieldSchema(field: Field): string | null {
    if (field.schemaValidation) {
      for (const validator of field.schemaValidation) {
        const error = validator(field.value);
        if (error) return error;
      }
    }
    return null;
  }

  /**
   * Perform custom validations on a given form field.
   * @param {Field} field - The form field to validate.
   * @returns {Promise<string|null>} The error message if validation fails, otherwise null.
   */
    private async validateCustomValidator(field: Field): Promise<string | null> {
      if (!field.customValidation) return null;
  
      // Create an array of promises for each custom validation
      const validationPromises = field.customValidation.map(async ({ validate, message, depends }) => {
        if (typeof validate !== 'function') {
          console.error(`Invalid validate function for field ${field.id}`);
          return 'Validation function is not defined correctly.';
        }
  
        try {
          // Run the validation with a 5-second timeout
          const result = await Promise.race([
            Promise.resolve(validate(field.value)),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Validation timeout')), 5000))
          ]);
  
          if (!result) {
            // If validation fails, set up dependent validation if needed
            if (depends) {
              this.setupDependentValidation(field, depends, validate, message);
            }
            return message;
          }
        } catch (error) {
          console.error(`Validation error for field ${field.id}:`, error);
          return error === 'Validation timeout'
            ? 'Validation took too long. Please try again.'
            : 'An unexpected error occurred during validation.';
        }
  
        return null;
      });
  
      // Run all validations in parallel and return the first error found (if any)
      const errors = await Promise.all(validationPromises);
      return errors.find(error => error !== null) || null;
    }
    
  /**
   * Sets up validation for a field that depends on another field's value.
   * @param field - The field that requires validation.
   * @param dependentFieldId - The ID of the field that this field depends on.
   * @param validate - A function that validates the field's value. It returns a boolean or a Promise that resolves to a boolean.
   * @param message - The error message to display if validation fails.
   */
  private setupDependentValidation(
    field: Field,
    dependentFieldId: string,
    validate: (value: string) => boolean | Promise<boolean>,
    message: string
  ) {
    const dependentField = this.fieldManager.getField(dependentFieldId);
    if (!dependentField) return;

    // Function to validate the field on change
    const validateOnChange = async () => {
      try {
        const result = await Promise.resolve(validate(field.value));
        this.updateFieldError(field, result ? null : message);
      } catch (error) {
        console.error(`Validation error on change for field ${field.id}:`, error);
        this.updateFieldError(field, 'An unexpected error occurred during validation.');
      }
    };

    // Add event listener to dependent field
    const dependentElement = document.getElementById(dependentFieldId) as HTMLInputElement;
    if (dependentElement) {
      dependentElement.removeEventListener('input', validateOnChange);
      dependentElement.addEventListener('input', validateOnChange);
    }
  }

  /**
   * Updates the error message for a field and displays all errors.
   * @param field - The field to update.
   * @param error - The error message to set, or null if there is no error.
   */
  private updateFieldError(field: Field, error: string | null) {
    field.error = error;
    this.errorHandler.displayErrors(this.fieldManager.getAllFields());
  }

  }
  
