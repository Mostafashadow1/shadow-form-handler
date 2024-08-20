import { FieldManager } from './FieldManager';
import { ValidatorManager } from './ValidatorManager';
import { ErrorManager } from './ErrorManager';
import { EventManager } from './EventManger';
import { Mode, Hooks, RegisterParams, ErrorStyle, addFieldParams } from '../interfaces/index';
import { HooksHandler } from './HooksHandler';
import * as validation from "../validators/ValidationRules";
import { lang } from './LanguageManager';

/**
 * FormHandler class: Manages form validation, registration, and submission.
 */

export class FormHandler {
  private fieldManager: FieldManager;
  private hooksHandler : HooksHandler;
  private validatorManager: ValidatorManager;
  private errorManager: ErrorManager;
  private eventManager: EventManager;
  private mode: Mode = Mode.Default;
 /**
   * Built-in validation that can be used directly.
   */
 public validation = validation;
  /**
   * Built-in lang that can be used directly.
   */
 public lang = lang;

  constructor() {
    this.hooksHandler = new HooksHandler();
    this.fieldManager = new FieldManager();
    this.errorManager = new ErrorManager(this.fieldManager);
    this.validatorManager = new ValidatorManager(this.fieldManager , this.errorManager , this.hooksHandler);
    this.eventManager = new EventManager(this.fieldManager, this.validatorManager , this.hooksHandler);
  }

  /**
   * Register a form field with initial value and validators.
   * @param {RegisterParams} params - The parameters for registering a field.
   */
  public register(params: RegisterParams) {
    this.hooksHandler.triggerHook('beforeFieldRegister' , params.id , params)
    this.fieldManager.register(params);
    console.log(this.mode)

    if (this.mode === Mode.Runtime) {
      this.eventManager.addRuntimeValidation(params.id);
    }
    this.hooksHandler.triggerHook("afterFieldRegister" , params.id , params)

    this.attachFocusBlurListeners(params.id)
    // // Set up validation for this field and its dependencies
    if(params.dependencies) {
      this.setupFieldValidation(params.id);

    }
}

  /**
   * Set up validation for a field and its dependencies.
   * @param {string} fieldId - The ID of the field to set up validation for.
   */
  private setupFieldValidation(fieldId: string) {
    const field = this.fieldManager.getField(fieldId);
    if (!field) return;

    const inputElement = document.getElementById(fieldId) as HTMLInputElement;
    if (inputElement) {
      inputElement.addEventListener('input', () => {
        this.validatorManager.validateField(fieldId);
      });
    }

    // Set up validation for dependent fields
    if (field.dependencies) {
      field.dependencies.forEach(depId => {
        const depElement = document.getElementById(depId) as HTMLInputElement;
        if (depElement) {
          depElement.addEventListener('input', () => {
            this.validatorManager.validateField(fieldId);
          });
        }
      });
    }
  }

  /**
   * Set the mode for the form handler.
   * @param {Mode} newMode - The new mode to set.
   */
  public setMode(newMode: Mode) {
    this.mode = newMode;
  }

  /**
   * Handle form submission.
   * @param {string} formId - The ID of the form element.
   * @param {Function} [onSubmit] - Optional custom submission handler.
   */
  public submitHandler(formId: string, onSubmit?: (values: { [key: string]: string }) => void) {
    const form = document.getElementById(formId) as HTMLFormElement;
    if (!form) throw new Error("Form not found. Please ensure the form ID is correct!");
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      await this.validatorManager.validateAll();
      const values = this.fieldManager.getValues();
      const hasErrors = this.errorManager.hasErrors()
      if (hasErrors) {
        this.errorManager.displayErrors(this.fieldManager.getAllFields());
        this.hooksHandler.triggerHook('onFormSubmitFail' , this.errorManager.getErrors())        
      } else if (onSubmit) {
        onSubmit(values);
        this.hooksHandler.triggerHook("onFormSubmitSuccess", values)

      }
    });
  }



  /**
   * Get the current value of a form field.
   * @param {string} id - The id of the form field.
   * @returns {string|undefined} The value of the form field.
   */
  public getValue(id: string): string | undefined {
    return this.fieldManager.getValue(id);
  }

  /**
   * Get all form field values.
   * @returns {Object} An object with all form field ids as keys and their current values as values.
   */
  public getValues(): { [key: string]: string } {
    return this.fieldManager.getValues();
  }

  /**
   * Reset the form fields and errors.
   */
  public resetForm() {
    this.fieldManager.resetFields();
    this.errorManager.clearErrors();
    this.hooksHandler.triggerHook('onFormReset')
  }

  /**
   * Dynamically remove a form field.
   * @param {string} fieldId - The id of the form field.
   * @param {string} disabledId -The ID of a button element that should be disabled when the field is added.
   */
  public removeField(params : {fieldId : string , disabledId:string}) {
    this.fieldManager.removeField(params);
    this.hooksHandler.triggerHook('onFieldRemove' , params.fieldId)
  }

  /**
   * Dynamically add a form field to a specific position in the container.
   * @param {Object} params - Parameters for adding a new field.
   * @param {string} params.containerId - The ID of the container element where the field should be added.
   * @param {string} params.fieldId - The ID of the new form field.
   * @param {string} params.labelText - The text to display as the label for the form field.
   * @param {RegisterParams} [params.register] - Optional parameters for registering the field.
   * @param {string|number} [params.position] - The position where the new field should be inserted.
   * @param {string} [params.disabled] - The ID of a button element that should be disabled when the field is added.
   */
  public addField(params: addFieldParams) {
    this.fieldManager.addField(params);
    if (this.mode === Mode.Runtime) {
      this.eventManager.addRuntimeValidation(params.fieldId);
    }
    this.errorManager.displayErrors(this.fieldManager.getAllFields());
    this.hooksHandler.triggerHook("onFieldAdd" , params.fieldId)

  }

  /**
   * Set error styles to be applied to error elements.
   * @param {ErrorStyle} style - An error style object to be applied.
   */
  public setErrorStyles(style: ErrorStyle) {
    this.errorManager.setErrorStyles(style);
  }

  /**
   * Add hooks for the form handler.
   * @param {Hooks} hooks - Hooks to be set.
   */
  public addHooks(hooks: Hooks) {
    this.hooksHandler.addHooks(hooks);
  }

  /**
   * Attach a custom event listener to a form field.
   * @param {string} id - The id of the form field.
   * @param {string} event - The event type (e.g., 'input', 'change').
   * @param {EventListener} listener - The event listener function.
   */
  public addCustomEventListener(id: string, event: string, listener: EventListener) {
    this.eventManager.addCustomEventListener(id, event, listener);
  }

 /**
   * Attaches focus and blur event listeners to an input field.
   * @param {id} id - The parameters required to register the field.
   */
 public attachFocusBlurListeners(id: string): void {
  const inputElement = document.getElementById(id) as HTMLInputElement;

  if (inputElement) {
    // Attach focus event listener
    inputElement.addEventListener('focus', () => {
      const field = this.fieldManager.getField(id);
      if (field) {
        this.hooksHandler.triggerHook('onFocus', field);
      }
    });

    // Attach blur event listener
    inputElement.addEventListener('blur', () => {
      const field = this.fieldManager.getField(id);
      if (field) {
        this.hooksHandler.triggerHook('onBlur', field);
      }
    });
  } else {
    console.warn(`Input element with id "${id}" not found.`);
  }
}


}