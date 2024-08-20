import { Hooks } from '../interfaces/index';
export declare class HooksHandler {
    private hooks;
    /**
     * Add hooks for form events.
     * @param {Hooks} hooks - Hooks to be added.
     */
    addHooks(hooks: Hooks): void;
    /**
     * Get all hooks.
     * @returns {Hooks} - The hooks object.
     */
    getHooks(): Hooks;
    /**
     * Get a specific hook by name.
     * @param {keyof Hooks} hookName - The name of the hook to retrieve.
     * @returns {Function | undefined} - The hook function or undefined if not found.
     */
    getHook(hookName: keyof Hooks): ((values: {
        [key: string]: string;
    }) => void) | ((errors: {
        [key: string]: string;
    }) => void) | ((fieldId: string, error: string) => void) | (() => void) | ((fieldId: string, params: import("../interfaces/index").RegisterParams) => void) | ((fieldId: string, params: import("../interfaces/index").RegisterParams) => void) | ((field: import("../interfaces/index").Field) => void) | ((field: import("../interfaces/index").Field) => void) | ((fieldId: string, value: string) => void) | ((fields: import("../interfaces/index").Field[]) => void) | ((fields: import("../interfaces/index").Field[]) => void) | ((fieldId: string) => void) | ((fieldId: string) => void) | undefined;
    /**
     * Trigger a specific hook.
     * @param {keyof Hooks} hookName - The name of the hook to trigger.
     * @param {...any} args - Arguments to pass to the hook.
     */
    triggerHook(hookName: keyof Hooks, ...args: any): void;
}
