import { Field, ErrorStyle } from '../interfaces/index';
/**
 * ErrorHandler class: Manages error display and styling.
 */
export declare class ErrorHandler {
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
}
