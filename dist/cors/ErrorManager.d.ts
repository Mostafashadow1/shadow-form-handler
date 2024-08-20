import { Field, ErrorStyle } from '../interfaces/index';
import { FieldManager } from './FieldManager';
/**
 * ErrorManager class: Manages error display and styling.
 */
export declare class ErrorManager {
    private fieldManager;
    constructor(fieldManager: FieldManager);
    private errorStyles;
    /**
     * Set error styles to be applied to error elements.
     * @param {ErrorStyle} style - An error style object to be applied.
     */
    setErrorStyles(style: ErrorStyle): void;
    /**
       * Apply the error styles to a given element.
       * @param element - The element to apply styles to.
       */
    applyStyles(element: HTMLElement): void;
    /**
     * Display errors for all form fields.
     * @param {Field[]} fields - An array of all form fields.
     */
    displayErrors(fields: Field[]): void;
    /**
     * Clear all error messages.
     */
    clearErrors(): void;
    /**
    * Check if any field has errors.
    * @returns {boolean} True if any field has an error, false otherwise.
    */
    hasErrors(): boolean;
    /**
     * get all errors and return it
     * @returns {Array} get all erros
    */
    getErrors(): {};
}
