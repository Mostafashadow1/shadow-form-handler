import { FieldManager } from './FieldManager';
import { ValidatorManager } from './ValidatorManager';
import { HooksHandler } from './HooksHandler';
/**
 * EventManager class: Manages form-related events and hooks.
 */
export declare class EventManager {
    private fieldManager;
    private validator;
    private hooksHandler;
    constructor(fieldManager: FieldManager, validator: ValidatorManager, hooksHandler: HooksHandler);
    /**
     * Add runtime validation to a form field.
     * @param {string} id - The id of the form field.
     */
    addRuntimeValidation(id: string): void;
    /**
     * Handle input change event.
     * @param {Event} event - The input change event.
     */
    private handleInputChange;
    /**
     * Add a custom event listener to a form field.
     * @param {string} id - The id of the form field.
     * @param {string} event - The event type to listen for.
     * @param {EventListener} listener - The event listener function.
     */
    addCustomEventListener(id: string, event: string, listener: EventListener): void;
}
