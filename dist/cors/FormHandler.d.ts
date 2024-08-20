import { Mode, Hooks, RegisterParams, ErrorStyle, addFieldParams } from '../interfaces/index';
import * as validation from "../validators/ValidationRules";
/**
 * FormHandler class: Manages form validation, registration, and submission.
 */
export declare class FormHandler {
    private fieldManager;
    private hooksHandler;
    private validatorManager;
    private errorManager;
    private eventManager;
    private mode;
    /**
      * Built-in validation that can be used directly.
      */
    validation: typeof validation;
    /**
     * Built-in lang that can be used directly.
     */
    lang: import("./LanguageManager").LanguageManager;
    constructor();
    /**
     * Register a form field with initial value and validators.
     * @param {RegisterParams} params - The parameters for registering a field.
     */
    register(params: RegisterParams): void;
    /**
     * Set up validation for a field and its dependencies.
     * @param {string} fieldId - The ID of the field to set up validation for.
     */
    private setupFieldValidation;
    /**
     * Set the mode for the form handler.
     * @param {Mode} newMode - The new mode to set.
     */
    setMode(newMode: Mode): void;
    /**
     * Handle form submission.
     * @param {string} formId - The ID of the form element.
     * @param {Function} [onSubmit] - Optional custom submission handler.
     */
    submitHandler(formId: string, onSubmit?: (values: {
        [key: string]: string;
    }) => void): void;
    /**
     * Get the current value of a form field.
     * @param {string} id - The id of the form field.
     * @returns {string|undefined} The value of the form field.
     */
    getValue(id: string): string | undefined;
    /**
     * Get all form field values.
     * @returns {Object} An object with all form field ids as keys and their current values as values.
     */
    getValues(): {
        [key: string]: string;
    };
    /**
     * Reset the form fields and errors.
     */
    resetForm(): void;
    /**
     * Dynamically remove a form field.
     * @param {string} fieldId - The id of the form field.
     * @param {string} disabledId -The ID of a button element that should be disabled when the field is added.
     */
    removeField(params: {
        fieldId: string;
        disabledId: string;
    }): void;
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
    addField(params: addFieldParams): void;
    /**
     * Set error styles to be applied to error elements.
     * @param {ErrorStyle} style - An error style object to be applied.
     */
    setErrorStyles(style: ErrorStyle): void;
    /**
     * Add hooks for the form handler.
     * @param {Hooks} hooks - Hooks to be set.
     */
    addHooks(hooks: Hooks): void;
    /**
     * Attach a custom event listener to a form field.
     * @param {string} id - The id of the form field.
     * @param {string} event - The event type (e.g., 'input', 'change').
     * @param {EventListener} listener - The event listener function.
     */
    addCustomEventListener(id: string, event: string, listener: EventListener): void;
    /**
      * Attaches focus and blur event listeners to an input field.
      * @param {id} id - The parameters required to register the field.
      */
    attachFocusBlurListeners(id: string): void;
}
