import { addFieldParams, Field,  RegisterParams } from '../interfaces/index';

/**
 * FieldManager class: Manages form fields, their values, and related DOM operations.
 */
export class FieldManager {
  private fields: Field[] = [];
  /**
   * Register a new form field.
   * @param {RegisterParams} params - The parameters for registering a field.
   */
  public register(params: RegisterParams) {
    const { id, schemaValidation, customValidation, initialValue } = params;
    this.fields.push({ id, value: initialValue || '', error: null, schemaValidation, customValidation });
    const inputElement = document.getElementById(id) as HTMLInputElement;
    if (!inputElement) throw new Error(`Input element with id ${id} not found`);
    inputElement.addEventListener('input' , ({target}) => {
      this.setValue(params.id , (target as HTMLInputElement).value)
    })
    this
    if (initialValue) {
      inputElement.value = initialValue;
    }
  }

 /**
   * Dynamically remove a form field.
   * @param {string} fieldId - The id of the form field.
   * @param {string} disabledId -The ID of a button element that should be disabled when the field is added.
   */
  public removeField(params : {fieldId : string , disabledId:string}) {
    const inputElement = document.getElementById(params.fieldId) as HTMLInputElement;
    if (!inputElement) {
      console.error(`Element with id ${params.fieldId} not found.`);
      return;
    }
    // Handle the button state if buttonId is provided
   if (params.disabledId) {
    const button = document.getElementById(params.disabledId) as HTMLButtonElement;
    if (button) {
      button.disabled = true;
    }
  }
    this.fields = this.fields.filter(f => f.id !== params.fieldId);
    const errorElement = document.getElementById(`${params.fieldId}-error`);
    const label = document.querySelector(`label[for="${params.fieldId}"]`);
    
    inputElement.remove();
    errorElement?.remove();
    label?.remove();
  }

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
  public addField(params:addFieldParams) {
    // Check if an input with the same ID already exists
    const existingInput = document.getElementById(params.fieldId) as HTMLInputElement;
    if (existingInput) {
      console.warn(`Field with id ${params.fieldId} already exists. Skipping creation.`);
      return;
    }
   // Handle the button state if buttonId is provided
   if (params.disabledId) {
    const button = document.getElementById(params.disabledId) as HTMLButtonElement;
    if (button) {
      button.disabled = true;
    }
  }

  const container = document.getElementById(params.containerId);
  if (!container) throw new Error(`Container element with id ${params.containerId} not found`);

  const fieldWrapper = document.createElement('div');
  const label = document.createElement('label');
  const input = document.createElement('input');
  const errorElement = document.createElement('span');

  label.setAttribute('for', params.fieldId);
  label.textContent = params.labelText;
  input.setAttribute('id', params.fieldId);
  input.setAttribute('name', params.fieldId);
  input.setAttribute('type', 'text');
  errorElement.setAttribute('id', `${params.fieldId}-error`);
  errorElement.classList.add('error-message');

  fieldWrapper.appendChild(label);
  fieldWrapper.appendChild(input);
  fieldWrapper.appendChild(errorElement);
 if(!params.position) container.appendChild(fieldWrapper)
  else if(params.position === "top") {
    container.insertBefore(fieldWrapper, container.firstChild)
  } else if(params.position === "bottom") {
    container.appendChild(fieldWrapper)
  }else if(typeof params.position === "number" && params.position >= 0) {
    const existingElement = container.children[params.position];
    if(existingElement) container.insertBefore(fieldWrapper , existingElement);
  }else {
    throw new Error(`Invalid position value: ${params.position}`);

  }
  this.register({
    id: params.fieldId,
    initialValue: params.register?.initialValue || "",
    schemaValidation: params.register?.schemaValidation || [],
    customValidation: params.register?.customValidation || []
  });

 
}

  /**
   * Get a field by its ID.
   * @param {string} id - The id of the form field.
   * @returns {Field|undefined} The field object if found, undefined otherwise.
   */
  public getField(id: string): Field | undefined {
    return this.fields.find(field => field.id === id);
  }

  /**
   * Get all form fields.
   * @returns {Field[]} An array of all form fields.
   */
  public getAllFields(): Field[] {
    return this.fields;
  }

  /**
   * Set the value of a form field.
   * @param {string} id - The id of the form field.
   * @param {string} value - The new value to set.
   */
  public setValue(id: string, value: string) {
    const field = this.getField(id);
    if(!field) return;
    field.value = value;
    
  }

  /**
   * Get the value of a form field.
   * @param {string} id - The id of the form field.
   * @returns {string|undefined} The value of the field if found, undefined otherwise.
   */
  public getValue(id: string): string | undefined {
    const field = this.getField(id);
    return field?.value;
  }

  /**
   * Get all form field values.
   * @returns {Object} An object with all form field ids as keys and their current values as values.
   */
  public getValues(): { [key: string]: string } {
    const values: { [key: string]: string } = {};
    this.fields.forEach(field => {
      values[field.id] = field.value;
    });
    return values;
  }

  /**
   * Reset all form fields to their initial state.
   */
  public resetFields() {
    this.fields.forEach(field => {
      field.value = '';
      field.error = null;
      const inputElement = document.getElementById(field.id) as HTMLInputElement;
      if (inputElement) {
        inputElement.value = '';
      }
    });
  }

  /**
   * Check if any field has errors.
   * @returns {boolean} True if any field has an error, false otherwise.
   */
  public hasErrors(): boolean {
    return this.fields.some(field => field.error !== null);
  }
}