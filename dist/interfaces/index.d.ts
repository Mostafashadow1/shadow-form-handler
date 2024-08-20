export type SchemaValidator = (value: string, formValues: {
    [key: string]: string;
}) => string | null;
export declare const enum Mode {
    Default = "default",
    Runtime = "runtime"
}
export interface CustomValidator {
    validate: (value: string, formValues: {
        [key: string]: string;
    }) => boolean;
    message: string;
}
export interface Field {
    id: string;
    value: string;
    error: string | null;
    customValidation?: Array<CustomValidator>;
    schemaValidation?: Array<SchemaValidator>;
    dependencies?: string[];
}
export interface Hooks {
    onFormSubmitSuccess?: (values: {
        [key: string]: string;
    }) => void;
    onFormSubmitFail?: (errors: {
        [key: string]: string;
    }) => void;
    onFieldValidationError?: (fieldId: string, error: string) => void;
    onFormReset?: () => void;
    beforeFieldRegister?: (fieldId: string, params: RegisterParams) => void;
    afterFieldRegister?: (fieldId: string, params: RegisterParams) => void;
    onFocus?: (field: Field) => void;
    onBlur?: (field: Field) => void;
    onValueChange?: (fieldId: string, value: string) => void;
    onValidationStart?: (fields: Field[]) => void;
    onValidationEnd?: (fields: Field[]) => void;
    onFieldAdd?: (fieldId: string) => void;
    onFieldRemove?: (fieldId: string) => void;
}
export interface RegisterParams {
    id: string;
    initialValue?: string;
    schemaValidation?: Array<SchemaValidator>;
    customValidation?: Array<CustomValidator>;
    dependencies?: string[];
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
