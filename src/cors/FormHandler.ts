import { FieldManager } from './FieldManager';
import { Validator } from './Validator';
import { ErrorHandler } from './ErrorHandler';
import { EventManager } from './EventManger';
import { Mode, Hooks, RegisterParams, ErrorStyle, addFieldParams } from '../interfaces/index';
import { HooksHandler } from './HooksHandler';

/**
 * FormHandler class: Manages form validation, registration, and submission.
 */
export class FormHandler {
  private fieldManager: FieldManager;
  private hooksHandler : HooksHandler;
  private validator: Validator;
  private errorHandler: ErrorHandler;
  private eventManager: EventManager;
  private mode: Mode = Mode.Default;

  constructor() {
    this.hooksHandler = new HooksHandler();
    this.errorHandler = new ErrorHandler();
    this.fieldManager = new FieldManager(this.hooksHandler);
    this.validator = new Validator(this.fieldManager , this.errorHandler , this.hooksHandler);
    this.eventManager = new EventManager(this.fieldManager, this.validator , this.hooksHandler);
  }

  /**
   * Register a form field with initial value and validators.
   * @param {RegisterParams} params - The parameters for registering a field.
   */
  public register(params: RegisterParams) {
    this.fieldManager.register(params);
    if (this.mode === Mode.Runtime) {
      this.eventManager.addRuntimeValidation(params.id);
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
      await this.validator.validateAll();
      const values = this.fieldManager.getValues();
      const hasErrors = this.fieldManager.hasErrors();
      if (hasErrors) {
        this.errorHandler.displayErrors(this.fieldManager.getAllFields());
      } else if (onSubmit) {
        onSubmit(values);
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
    this.errorHandler.clearErrors();
  }

  /**
   * Dynamically remove a form field.
   * @param {string} fieldId - The id of the form field.
   * @param {string} disabledId -The ID of a button element that should be disabled when the field is added.
   */
  public removeField(params : {fieldId : string , disabledId:string}) {
    this.fieldManager.removeField(params);
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
    this.errorHandler.displayErrors(this.fieldManager.getAllFields());
  }

  /**
   * Set error styles to be applied to error elements.
   * @param {ErrorStyle} style - An error style object to be applied.
   */
  public setErrorStyles(style: ErrorStyle) {
    this.errorHandler.setErrorStyles(style);
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
}