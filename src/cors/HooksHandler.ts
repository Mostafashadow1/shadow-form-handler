import { Hooks } from '../interfaces/index'

export class HooksHandler {
    private hooks: Hooks = {}
    /**
     * Add hooks for form events.
     * @param {Hooks} hooks - Hooks to be added.
     */
    public addHooks(hooks: Hooks) {
        this.hooks = { ...this.hooks, ...hooks }
    }

    /**
     * get all hooks
     *.
     */
    public getHooks() {
        return this.hooks
    }
}
