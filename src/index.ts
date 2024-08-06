import { FormHandler } from './cors/FormHandler';
import {required , minLength , maxLength  , pattern , email } from "./validators/ValidationRules"

// Make FormtHandler and validators available globally
(window as any).shadowFormHandler = {
  FormHandler,
  required,
  minLength,
  maxLength,
  pattern ,
  email
};