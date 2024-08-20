import { Field , ErrorStyle } from '../interfaces/index';
import { FieldManager } from './FieldManager';


/**
 * ErrorManager class: Manages error display and styling.
 */
export class ErrorManager {
  constructor(private fieldManager : FieldManager) {}
  private errorStyles: ErrorStyle  = { property : " " , value : ""}

  /**
   * Set error styles to be applied to error elements.
   * @param {ErrorStyle} style - An error style object to be applied.
   */
  public setErrorStyles(style: ErrorStyle) {
    this.errorStyles =style;
  }

  
  /**
     * Apply the error styles to a given element.
     * @param element - The element to apply styles to.
     */
  public applyStyles(element: HTMLElement) {
      for (const [property, value] of Object.entries(this.errorStyles)) {
        (element.style as any)[property] = value;
      }
  }

  /**
   * Display errors for all form fields.
   * @param {Field[]} fields - An array of all form fields.
   */
  public displayErrors(fields: Field[]) {
    fields.forEach(field => {
      const errorElement = document.getElementById(`${field.id}-error`);
      if (errorElement) {
        errorElement.textContent = field.error || '';
        this.applyStyles(errorElement);
      }
    });
  }

  /**
   * Clear all error messages.
   */
  public clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
      (element as HTMLElement).textContent = '';
    });
  }

   /**
   * Check if any field has errors.
   * @returns {boolean} True if any field has an error, false otherwise.
   */
   public hasErrors(): boolean {
    const fields = this.fieldManager.getAllFields();
    return fields.some(field => field.error !== null);
  }

  /**
   * get all errors and return it 
   * @returns {Array} get all erros
  */
  public getErrors() : {}{
    const fields = this.fieldManager.getAllFields();
    return fields.map(field => {
      return {
        [field.id] : field.error
      }
    })
  }

}
