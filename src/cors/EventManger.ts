
  import { FieldManager } from './FieldManager';
  import { Validator } from './Validator';
  import { HooksHandler } from './HooksHandler';
  
  /**
   * EventManager class: Manages form-related events and hooks.
   */
  export class EventManager {  
    constructor(
      private fieldManager: FieldManager,
      private validator: Validator,
      private hooksHandler : HooksHandler
      
    ) {}
  
   
  
    /**
     * Add runtime validation to a form field.
     * @param {string} id - The id of the form field.
     */
    public addRuntimeValidation(id: string) {
      const inputElement = document.getElementById(id) as HTMLInputElement;
      if (inputElement) {
        inputElement.addEventListener('input', this.handleInputChange.bind(this));
      }
    }
  
    /**
     * Handle input change event.
     * @param {Event} event - The input change event.
     */
    private async handleInputChange(event: Event) {
      const target = event.target as HTMLInputElement;
      const field = this.fieldManager.getField(target.id);
      const fields = this.fieldManager.getAllFields()
      if(!field) return;
        field.value = target.value;
        const hooks = this.hooksHandler.getHooks();
        if(hooks.onValueChange) hooks.onValueChange(field , fields)
        await this.validator.validateField(field.id);
      
    }
  
    /**
     * Add a custom event listener to a form field.
     * @param {string} id - The id of the form field.
     * @param {string} event - The event type to listen for.
     * @param {EventListener} listener - The event listener function.
     */
    public addCustomEventListener(id: string, event: string, listener: EventListener) {
      const inputElement = document.getElementById(id) as HTMLInputElement;
      if (!inputElement) {
        console.error(`Input element with id "${id}" not found.`);
        return;
      }
      inputElement.addEventListener(event, listener);
    }
  }