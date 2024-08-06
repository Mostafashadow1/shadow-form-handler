import { FormHandler } from './cors/FormHandler';
import { required, minLength, maxLength, pattern, email } from "./validators/ValidationRules";

// Make FormHandler and validators available globally in browser environments
if (typeof window !== 'undefined') {
  (window as any).shadowFormHandler = {
    FormHandler,
    required,
    minLength,
    maxLength,
    pattern,
    email
  };
}

export { FormHandler, required, minLength, maxLength, pattern, email };