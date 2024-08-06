import { Hooks } from '../interfaces/index';
export declare class HooksHandler {
    private hooks;
    /**
     * Add hooks for form events.
     * @param {Hooks} hooks - Hooks to be added.
     */
    addHooks(hooks: Hooks): void;
    /**
     * get all hooks
     *.
     */
    getHooks(): Hooks;
}
