// src/index.ts

import { FormHandler } from './core/FormHandler';
import { required, minLength, maxLength, pattern, email } from "./validators/validationRules";

// Make FormHandler and validators available globally
(window as any).shadowFormHandler = {
  FormHandler,
  required,
  minLength,
  maxLength,
  pattern,
  email
};
