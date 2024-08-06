// src/interfaces/index.ts

// SchemaValidator type: A function that takes a string value and returns a string error message or null if valid.
export type SchemaValidator = (value: string) => string | null;

// Define an enum for the mode
export const  enum Mode {
    
  Default = "default",
    Runtime = "runtime"
  }

// Validator interface: Represents a custom validator with a validate function and an error message.
export interface CustomValidator {
  validate: (value: string) => boolean;
  message: string;
  depends? :string;
}

// Field interface: Represents a form field with its properties.
export interface Field {
  id: string;
  value: string;
  error: string | null;
  customValidation?: Array<CustomValidator>;
  schemaValidation?: Array<SchemaValidator>;
}

// Hooks interface: Represents hooks for various form validation stages.
export interface Hooks {
  beforeValidate?: (fields: Field[]) => void;
  afterValidate?: (fields: Field[]) => void;
  onValueChange?: (field: Field, fields: Field[]) => void;
}

// RegisterParams interface: Parameters for registering a form field.
export interface RegisterParams {
  id: string;
  initialValue?: string;
  schemaValidation?: Array<SchemaValidator>;
  customValidation?: Array<CustomValidator>;
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

 