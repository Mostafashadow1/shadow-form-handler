import { Field } from "../interfaces";
export declare class PerformanceOptimizer {
    private debounceTimers;
    /**
     * Debounces a function call.
     * @param {string} key - A unique identifier for the debounced function.
     * @param {Function} fn - The function to debounce.
     * @param {number} delay - The debounce delay in milliseconds.
     */
    debounce(key: string, fn: () => void, delay: number): void;
    /**
     * Batches DOM updates for multiple fields.
     * @param {Field[]} fields - The fields to update.
     * @param {(field: Field) => void} updateFn - The function to call for each field update.
     */
    batchDomUpdates(fields: Field[], updateFn: (field: Field) => void): void;
    /**
     * Efficiently validates multiple fields.
     * @param {Field[]} fields - The fields to validate.
     * @param {(field: Field) => Promise<string | null>} validateFn - The validation function.
     * @returns {Promise<{ [key: string]: string | null }>} A promise that resolves to an object of field errors.
     */
    validateFields(fields: Field[], validateFn: (field: Field) => Promise<string | null>): Promise<{
        [key: string]: string | null;
    }>;
}
