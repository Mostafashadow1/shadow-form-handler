
// SchemaValidator type: A function that takes a string value and returns a string error message or null if valid.
export type SchemaValidator = (value: string , formValues : {[key : string ]  : string}) => string | null;

// Define an enum for the mode
export const  enum Mode {
    
    Default = "default",
    Runtime = "runtime"
  }

// Validator interface: Represents a custom validator with a validate function and an error message.
export interface CustomValidator {
  validate: (value: string , formValues : {[key : string] : string}) => boolean;
  message: string;
}

// Field interface: Represents a form field with its properties.
export interface Field {
  id: string;
  value: string;
  error: string | null;
  customValidation?: Array<CustomValidator>;
  schemaValidation?: Array<SchemaValidator>;
  dependencies?: string[]; // New property to store dependent field IDs

}

// Hooks interface: Represents hooks for various form validation stages.
export interface Hooks {
  onFormSubmitSuccess?: (values: { [key: string]: string }) => void;
  onFormSubmitFail?: (errors: { [key: string]: string }) => void;
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

// RegisterParams interface: Parameters for registering a form field.
export interface RegisterParams {
  id: string;
  initialValue?: string;
  schemaValidation?: Array<SchemaValidator>;
  customValidation?: Array<CustomValidator>;
  dependencies?: string[]; // New property to store dependent field IDs

}

// ErrorStyle interface: Represents CSS styles for error elements.
export interface ErrorStyle {
  property: string;
  value: string;
}

export interface addFieldParams  {
   containerId: string, 
   fieldId: string, 
   labelText: string,
   register?: RegisterParams,
   position?: "top" | "bottom" | number, 
   disabledId?: string 
}

 