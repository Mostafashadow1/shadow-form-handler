export type SchemaValidator = (value: string) => string | null;
export declare const enum Mode {
    Default = "default",
    Runtime = "runtime"
}
export interface CustomValidator {
    validate: (value: string) => boolean;
    message: string;
    depends?: string;
}
export interface Field {
    id: string;
    value: string;
    error: string | null;
    customValidation?: Array<CustomValidator>;
    schemaValidation?: Array<SchemaValidator>;
}
export interface Hooks {
    beforeValidate?: (fields: Field[]) => void;
    afterValidate?: (fields: Field[]) => void;
    onValueChange?: (field: Field, fields: Field[]) => void;
}
export interface RegisterParams {
    id: string;
    initialValue?: string;
    schemaValidation?: Array<SchemaValidator>;
    customValidation?: Array<CustomValidator>;
}
export interface ErrorStyle {
    property: string;
    value: string;
}
export interface addFieldParams {
    containerId: string;
    fieldId: string;
    labelText: string;
    register?: RegisterParams;
    position?: "top" | "bottom" | number;
    disabledId?: string;
}
