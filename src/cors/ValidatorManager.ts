import { FieldManager } from './FieldManager';
import { Field } from '../interfaces/index';
import { ErrorManager } from './ErrorManager';
import { HooksHandler } from './HooksHandler';

/**
 * ValidatorManager class: Handles form field validation.
 */
export class ValidatorManager {
  constructor(private fieldManager: FieldManager , private errorManager : ErrorManager , private hooksHandler : HooksHandler ) {}

  /**
   * Validate all form fields.
   * @returns {Promise<void>}
   */
  public async validateAll() {
    const fields = this.fieldManager.getAllFields();
    this.hooksHandler.triggerHook("onValidationStart" , fields)
    for (const field of fields) {
      await this.validateField(field.id);
    }
    this.hooksHandler.triggerHook("onValidationEnd" , fields)
  }


     /**
   * Validate a single form field.
   * @param {string} id - The id of the form field to validate.
   * @returns {Promise<void>}
   */
     public async validateField(id: string): Promise<void> {
      const field = this.fieldManager.getField(id);
      if (!field) return;
      const formValues = this.fieldManager.getValues();
         // First, check schema validation
    const schemaError = this.validateFieldSchema(field, formValues);
    if (schemaError) {
      this.updateFieldError(field, schemaError);
      this.hooksHandler.triggerHook('onFieldValidationError', id, schemaError);
      return;
    }
     // If no schema error, proceed with custom validation
     const customError = await this.validateCustomValidator(field, formValues);
     this.updateFieldError(field, customError);
     if (customError) {
       this.hooksHandler.triggerHook('onFieldValidationError', id, customError);
     }

    }
 
 
  /**
   * Validate a field against its schema validators.
   * @param {Field} field - The form field to validate.
   * @param {{ [key: string]: string }} formValues - The current values of all form fields.
   * @returns {string|null} The error message if validation fails, otherwise null.
   */
  private validateFieldSchema(field: Field , formValues: { [key: string]: string }): string | null {
    if (field.schemaValidation) {
      for (const validator of field.schemaValidation) {
        const error = validator(field.value , formValues);
        if (error) return error;
      }
    }
    return null;
  }
    /**
   * Perform custom validations on a given form field.
   * @param {Field} field - The form field to validate.
   * @param {{ [key: string]: string }} formValues - The current values of all form fields.
   * @returns {Promise<string|null>} The error message if validation fails, otherwise null.
   */
    private async validateCustomValidator(field: Field, formValues: { [key: string]: string }): Promise<string | null> {
      if (!field.customValidation) return null;
  
      for (const { validate, message } of field.customValidation) {
        try {
          const isValid = await Promise.race([
            Promise.resolve(validate(field.value, formValues)),
            new Promise<boolean>((_, reject) => setTimeout(() => reject(new Error('Validation timeout')), 5000))
          ]);
  
          if (!isValid) {
            return message;
          }
        } catch (error) {
          console.error(`Validation error for field ${field.id}:`, error);
          return (error as any).message === 'Validation timeout'
            ? 'Validation took too long. Please try again.'
            : 'An unexpected error occurred during validation.';
        }
      }
  
      return null;
    }

 
   /**
   * Sets up validation for a field that depends on another field's value.
   * @param {string} fieldId - The ID of the field that depends on others.
   * @param {string[]} dependencies - The IDs of the fields this field depends on.
   */
   public setupDependencyListeners(fieldId: string, dependencies: string[]) {
    dependencies.forEach(depId => {
      const depElement = document.getElementById(depId) as HTMLInputElement;
      if (depElement) {
        depElement.addEventListener('input', () => {
          this.validateField(fieldId)
        });
      }
    });
  }

  /**
   * Updates the error message for a field and displays all errors.
   * @param {Field} field - The field to update.
   * @param {string | null} error - The error message to set, or null if there is no error.
   */
  private updateFieldError(field: Field, error: string | null): void {
    field.error = error;
    this.errorManager.displayErrors(this.fieldManager.getAllFields());
  }
}

  
