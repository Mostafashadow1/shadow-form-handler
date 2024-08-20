import { addFieldParams, Field, RegisterParams } from '../interfaces/index';
/**
 * FieldManager class: Manages form fields, their values, and related DOM operations.
 */
export declare class FieldManager {
    private fields;
    /**
     * Register a new form field.
     * @param {RegisterParams} params - The parameters for registering a field.
     */
    register(params: RegisterParams): void;
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
     * Add a new form field to the DOM and register it.
     * @param {Object} params - Parameters for adding a new field.
     * @param {string} params.containerId - The ID of the container element where the field should be added.
     * @param {string} params.fieldId - The ID of the new form field.
     * @param {string} params.labelText - The text to display as the label for the form field.
     * @param {RegisterParams} [params.register] - Optional parameters for registering the field.
     * @param {string|number} [params.position] - The position where the new field should be inserted.
     * @param {string} [params.disabledId] - The ID of a button element that should be disabled when the field is added.
     */
    addField(params: addFieldParams): void;
    /**
     * Get a field by its ID.
     * @param {string} id - The id of the form field.
     * @returns {Field|undefined} The field object if found, undefined otherwise.
     */
    getField(id: string): Field | undefined;
    /**
     * Get all form fields.
     * @returns {Field[]} An array of all form fields.
     */
    getAllFields(): Field[];
    /**
     * Set the value of a form field.
     * @param {string} id - The id of the form field.
     * @param {string} value - The new value to set.
     */
    setValue(id: string, value: string): void;
    /**
     * Get the value of a form field.
     * @param {string} id - The id of the form field.
     * @returns {string|undefined} The value of the field if found, undefined otherwise.
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
     * Reset all form fields to their initial state.
     */
    resetFields(): void;
}
