import { Hooks } from '../interfaces/index';

export class HooksHandler {
    private hooks: Hooks = {};

    /**
     * Add hooks for form events.
     * @param {Hooks} hooks - Hooks to be added.
     */
    public addHooks(hooks: Hooks) {
        this.hooks = hooks;
    }

    /**
     * Get all hooks.
     * @returns {Hooks} - The hooks object.
     */
    public getHooks() {
        return this.hooks;
    }

    /**
     * Get a specific hook by name.
     * @param {keyof Hooks} hookName - The name of the hook to retrieve.
     * @returns {Function | undefined} - The hook function or undefined if not found.
     */
    public getHook(hookName: keyof Hooks) {
        return this.hooks[hookName];
    }
    
    /**
     * Trigger a specific hook.
     * @param {keyof Hooks} hookName - The name of the hook to trigger.
     * @param {...any} args - Arguments to pass to the hook.
     */
    public triggerHook(hookName: keyof Hooks, ...args: any) {
        const hook = this.getHook(hookName);
        if (hook) {
            (hook as Function)(...args);
        }
    }

    
}
