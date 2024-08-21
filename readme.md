# shadow-form-handler

## Overview

**shadow-form-handler**  is a powerful and flexible form-handling and validation library for JavaScript and TypeScript. It simplifies the process of creating and managing complex forms by providing a rich set of features, an intuitive API, and an extensible architecture. Whether you’re building simple forms or complex multi-step workflows, shadow-form-handler has you covered with robust validation, dynamic field management, and seamless integration capabilities.


## 🚀 Key Features

1. **Dynamic Field Management**:
   - Easily add, remove, and modify form fields at runtime.
   - Specify the position where new fields should be inserted (top, bottom, or a specific index).
   - Disable buttons when adding or removing fields for a better user experience.

2. **Flexible Validation**:
   - Leverage both schema-based and custom validation rules.
   - Utilize built-in validation rules like `required`, `minLength`, `maxLength`, `pattern`, `email`, `range`, and `matches`.
   - Create custom validation rules with asynchronous support.
   - Set up validations that depend on the values of other fields.

3. **Error Handling**:
   - Display error messages for invalid fields with customizable styling.
   - Provide clear and specific error messages to enhance the user experience.
   - Automatically display errors when validation fails.

4. **Event Management**:
   - Attach custom event listeners to form fields (e.g., `input`, `change`, `blur`).
   - Integrate with form events like `onFormSubmitSuccess`, `onFormSubmitFail`, and `onFieldValidationError`.

5. **Hooks System**:
   - Extend the functionality of the form handler by adding custom hooks.
   - Trigger hooks at various stages of the form lifecycle, such as field registration, validation, and submission.
   - Use hooks to implement custom logic, logging, or side effects.

6. **Validation Modes**:
   - Choose between `default` (on form submit) and `runtime` (real-time) validation modes.
   - Automatically add runtime validation to new fields when they are registered.

7. **Asynchronous Validation**:
   - Perform asynchronous validations with ease, such as checking for uniqueness on the server.
   - Implement timeout handling to ensure a smooth user experience.

8. **Dependent Field Validation**:
   - Set up validations that depend on the values of other form fields.
   - Automatically re-validate dependent fields when their dependencies change.

9. **Internationalization and Localization**:
   - Provide translations for validation error messages.
   - Support multiple languages to reach a global audience.
   - Easily add new translations or override existing ones.

## 🎯 Benefits

1. **Reduced Development Time**: Streamline form creation and validation with minimal boilerplate code.
2. **Enhanced User Experience**: Provide instant feedback with real-time validation and clear error messages.
3. **Flexibility**: Easily adapt to changing requirements with dynamic field management and extensible architecture.
4. **Powerful Validation**: Combine schema-based and custom validators to handle complex validation scenarios.
5. **Asynchronous Support**: Seamlessly integrate server-side validations without blocking the UI.
6. **Event-Driven Architecture**: Extend functionality with hooks and custom event listeners.
7. **Customizable UI**: Tailor error messages and styles to match your application's design.
8. **Internationalization**: Support multiple languages for a global reach.

## 📦 Installation

### Using npm

Install the package via npm:

```bash
npm install shadow-form-handler
```

### Using HTML Script Tag

To use **ShadowFormHandler** directly in your HTML file, add the following script tag:

```html
<script src="./node_modules/shadow-form-handler/dist/shadow-form-handler.js"></script>
```

### Using CDN

Alternatively, you can use **ShadowFormHandler** via a CDN by adding this script tag:

```html
<script src="https://cdn.jsdelivr.net/gh/Mostafashadow1/shadow-form-handler@v2.0.1/dist/shadow-form-handler.js"></script>
```

### Using GitHub Releases

You can also download the latest release directly from GitHub. Follow these steps:

1. **Navigate to the Releases Page**:
   Go to the [Releases](https://github.com/Mostafashadow1/shadow-form-handler/releases) section of your GitHub repository.

2. **Download the Latest Release**:
   Find the latest release and download the `shadow-form-handler.js` file from the assets section.

3. **Include the Script in Your HTML**:
   Add the downloaded file to your project and include it in your HTML file like this:

```html
<script src="path/to/shadow-form-handler.js"></script>
```


### Simple Form Handling
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Simple Example with shadow-form-handler</title>
  <link rel="stylesheet" href="./styles.css">
  </head>
<body>
  <form id="myForm">
    <div>
      <label for="username">Username:</label>
      <input type="text" id="username" >
      <span id="username-error" class="error-message"></span>
    </div>
    <button type="submit">Submit</button>
  </form>

   <script src="https://cdn.jsdelivr.net/gh/Mostafashadow1/shadow-form-handler@v2.0.1/dist/shadow-form-handler.js"></script>
  <script src="./index.js"></script>

</body>
</html>
```

```javascript
const { FormHandler } = shadowFormHandler;
const formHandler = new FormHandler();

// Register a field
formHandler.register({
  id: 'username',
  initialValue: "",
  schemaValidation: [
    formHandler.validation.required(), // if no message ? show default message
    formHandler.validation.minLength(3, 'Username must be at least 3 characters long'),
    formHandler.validation.maxLength(15, 'Username must be less than 15 characters'),
  ]
});

// Set up form submission
formHandler.submitHandler('myForm', (values) => {
  console.log('Form submitted with values:', values);
});
```


## Core Components

## Methods

### Form Field Methods

- **`register({id: string, initialValue?: string, schemaValidation?: [], customValidation?:[] })`**: 
  - **Purpose**: Register a new form field.
  - **Usage**: 
    ```typescript
    formHandler.register({ id: 'username', initialValue: '', schemaValidation: [], customValidation: [] });
    ```

- **`setMode(newMode: 'default' || 'runtime')`**: 
  - **Purpose**: Set the validation mode (e.g., Default, Runtime).
  - **Usage**: 
    ```typescript
    formHandler.setMode('runtime');
    ```

- **`submitHandler(formId: string, onSubmit?: Function)`**: 
  - **Purpose**: Handle form submission.
  - **Usage**: 
    ```typescript
    formHandler.submitHandler('myForm', (data) => console.log(data));
    ```

- **`getValue(id: string)`**: 
  - **Purpose**: Get the value of a specific field.
  - **Usage**: 
    ```typescript
    const username = formHandler.getValue('username');
    ```

- **`getValues()`**: 
  - **Purpose**: Get values of all fields.
  - **Usage**: 
    ```typescript
    const allValues = formHandler.getValues();
    ```

- **`resetForm()`**: 
  - **Purpose**: Reset all form fields and errors.
  - **Usage**: 
    ```typescript
    formHandler.resetForm();
    ```

- **`removeField({ fieldId: string, disabledId?: string })`**: 
  - **Purpose**: Remove a field dynamically.
  - **Usage**: 
    ```typescript
    formHandler.removeField({ fieldId: 'descraption'});
    ```

- **`addField({containerId: string, fieldId: string, labelText: string, register?: RegisterParams, position?: "top" | "bottom" | number, disabledId?: string })`**: 
  - **Purpose**: Add a new field dynamically.
  - **Usage**: 
    ```typescript
    formHandler.addField({ containerId: 'formContainer', fieldId: 'password', labelText: 'Password', register: { id: 'password', validation: 'required|min:8' }, position: 'bottom' });
    ```

- **`setErrorStyles(style: ErrorStyle)`**: 
  - **Purpose**: Set custom error styles.
  - **Usage**: 
    ```typescript
    formHandler.setErrorStyles({ color: 'red', fontSize: '12px' });
    ```

Sure! Here's the updated section for your README file:

### Methods

#### `addHooks(hooks: Hooks)`

**Purpose**: Add custom hooks for form lifecycle events.
**Usage**:
```typescript
formHandler.addHooks({
  onFormSubmitSuccess: (values) => {
    console.log("Form submitted successfully with values:", values);
  },
  onFormSubmitFail: (errors) => {
    console.error("Form submission failed with errors:", errors);
  },
  onFieldValidationError: (fieldId, error) => {
    if (error) {
      console.warn(`Validation error on field ${fieldId}: ${error}`);
    }
  },
  onFormReset: () => {
    console.log("Form reset successfully");
  },
  beforeFieldRegister: (fieldId, params) => {
    console.log(`Registering field: ${fieldId}`, params);
  },
  afterFieldRegister: (fieldId, params) => {
    console.log(`Field registered: ${fieldId}`, params);
  },
  onValidationStart: (fields) => {
    console.log("Validation started", fields);
  },
  onValidationEnd: (fields) => {
    console.log("Validation ended", fields);
  },
  onValueChange: (fieldId, value) => {
    console.log(fieldId, value);
  },
  onFieldAdd: (fieldId) => {
    console.log(fieldId);
  },
  onFieldRemove: (fieldId) => {
    console.log(fieldId);
  },
  onFocus: (field) => {
    console.log(field);
  },
  onBlur: (field) => {
    console.log(field);
  },
});
```

- **`addCustomEventListener(id: string, event: string, listener: EventListener)`**: 
  - **Purpose**: Add a custom event listener to a field.
  - **Usage**: 
    ```typescript
    formHandler.addCustomEventListener('username', 'focus', () => console.log('Username field focused'));
    ```

### Language Methods

- **`setCurrentLanguage(langCode: string)`**: 
  - **Purpose**: Set the current language.
  - **Usage**: 
    ```typescript
    formHandler.lang.setCurrentLanguage('ar');
    ```

- **`getCurrentLanguage()`**: 
  - **Purpose**: Get the current language.
  - **Usage**: 
    ```typescript
    const currentLang = formHandler.lang.getCurrentLanguage();
    ```

- **`addTranslations(lang: string, translations: { [key: string]: string; })`**: 
  - **Purpose**: Add translations for a specific language.
  - **Usage**: 
    ```typescript
    formHandler.lang.addTranslations('en', {
       'password': 'Password must contain at least one uppercase letter, one lowercase letter, and one number.',
      'confirmPassword' : "Passwords do not match"
    });

    formHandler.lang.addTranslations('ar', {
     'password': 'يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل، وحرف صغير واحد، ورقم واحد.',
     'confirmPassword' : "كلمات المرور غير متطابقة."
    });

    formHandler.lang.addTranslations('es', {
      'password': 'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre.',
      'confirmPassword' : "Les mots de passe ne correspondent pas."
    });
    ```

```typescript
const currentLang = formHandler.lang.getCurrentLanguage();
```




### Built-in Validation Rules

The package provides the following validation rules:

1. **`required(message?: string)`**:
   - Ensures the field is not empty.
   - If no `message` is provided, it will use the translation for the 'required' key, or the default message `"This field is required."`.

2. **`minLength(min: number, message?: string)`**:
   - Checks if the value has at least the minimum length.
   - If no `message` is provided, it will use the translation for the 'minLength' key, or the default message `"This field must be at least {min} characters long."`.

3. **`maxLength(max: number, message?: string)`**:
   - Checks if the value doesn't exceed the maximum length.
   - If no `message` is provided, it will use the translation for the 'maxLength' key, or the default message `"This field must be no more than {max} characters long."`.

4. **`pattern(regex: RegExp, message?: string)`**:
   - Validates the value against a regular expression pattern.
   - If no `message` is provided, it will use the translation for the 'pattern' key, or the default message `"This field does not match the required pattern."`.

5. **`email(message?: string)`**:
   - Checks if the value is a valid email format.
   - If no `message` is provided, it will use the translation for the 'email' key, or the default message `"This field must be a valid email address."`.

6. **`range(min: number, max: number, message?: string)`**:
   - Ensures the value is within a specified range.
   - If no `message` is provided, it will use the translation for the 'range' key, or the default message `"The value must be between {min} and {max}."`.

7. **`matches(fieldToMatch: string, message?: string)`**:
   - Ensures the value matches another field's value.
   - If no `message` is provided, it will use the translation for the 'matches' key, or the default message `"This field must match the {fieldToMatch} field."`.

The validation rules use the `lang.getTranslation()` function to retrieve the appropriate error message. If the translation key is not found, the default message will be used.

### Dynamic Field Management

```javascript
// Add a new field
formHandler.addField({
  containerId: 'formContainer',
  fieldId: 'newField',
  labelText: 'New Field',
  register: {
    initialValue: '',
    schemaValidation: [required('This field is required')]
  },
  position: 'top' // position of element added: 'top' | 'bottom' | number of element filed like 3
});

// Remove a field
formHandler.removeField({
  fieldId: 'fieldToRemove',
  disabledId: 'addButton'
});
```

### Asynchronous Validation

```javascript
formHandler.register({
  id: 'username',
  customValidation: [{
    validate: async (value) => {
      // Simulating an API call to check username uniqueness
      await new Promise(resolve => setTimeout(resolve, 1000));
      return !value.includes('shadow' && 'mostafa mohamed' && 'mostafa');
    },
    message: 'This username is already taken.',
  }]
});
```

### Internationalization and Localization

```javascript

// Set the current language
formHandler.lang.setCurrentLanguage('ar');

// Add translations for different languages
formHandler.lang.addTranslations('en', {
  'required': 'This field is required.',
  'minLength': 'This field must be at least {min} characters long.',
  'maxLength': 'This field must not exceed {max} characters.',
  'email': 'Please enter a valid email address.',
  'range': 'Value must be between {min} and {max}.',
  'matches': 'This field must match {fieldToMatch}.',
});

formHandler.lang.addTranslations('ar', {
  'required': 'هذا الحقل مطلوب.',
  'minLength': 'يجب أن يحتوي هذا الحقل على {min} أحرف على الأقل.',
  'maxLength': 'يجب ألا يتجاوز هذا الحقل {max} حرفًا.',
  'email': 'يرجى إدخال عنوان بريد إلكتروني صالح.',
  'range': 'يجب أن تكون القيمة بين {min} و {max}.',
  'matches': 'يجب أن يتطابق هذا الحقل مع {fieldToMatch}.',
});

```

### Dependent Field Validation With built in 'matches' method

```javascript

formHandler.lang.addTranslations('en', {
  'password': 'Password must contain at least one uppercase letter, one lowercase letter, and one number.',
  'confirmPassword' : "Passwords do not match"

});

formHandler.lang.addTranslations('ar', {
  'password': 'يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل، وحرف صغير واحد، ورقم واحد.',
  'confirmPassword' : "كلمات المرور غير متطابقة."

});

formHandler.lang.addTranslations('es', {
  'password': 'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre.',
  'confirmPassword' : "Les mots de passe ne correspondent pas."
});

formHandler.register({
  id: 'password',
  schemaValidation: [
    formHandler.validation.required(),
    formHandler.validation.minLength(8),
    formHandler.validation.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, formHandler.lang.getTranslation('password'))
  ]
});

formHandler.register({
  id: 'confirm-password',
  schemaValidation: [
    formHandler.validation.required(),
    formHandler.validation.matches('password' , formHandler.lang.getTranslation('confirmPassword'))
  ]
});

```
### in this approach we prefer uses dependencies
```javascript
formHandler.register({
  id: 'confirm-password',
  dependencies: ['password'], 
  customValidation: [{
    validate: (value, formValues) => value === formValues.password,
    message: formHandler.lang.getTranslation('confirmPassword')
  }]
});
```



### Hooks System

- **`onFormSubmitSuccess(values)`**: Triggered when the form is successfully submitted.
  - **Parameters**: 
    - `values`: The values submitted in the form.
  - **Example**:
    ```typescript
    onFormSubmitSuccess: (values) => {
      console.log("Form submitted successfully with values:", values);
    }
    ```

- **`onFormSubmitFail(errors)`**: Triggered when the form submission fails.
  - **Parameters**: 
    - `errors`: The errors encountered during submission.
  - **Example**:
    ```typescript
    onFormSubmitFail: (errors) => {
      console.error("Form submission failed with errors:", errors);
    }
    ```

- **`onFieldValidationError(fieldId, error)`**: Triggered when a field validation error occurs.
  - **Parameters**: 
    - `fieldId`: The ID of the field with the error.
    - `error`: The validation error message.
  - **Example**:
    ```typescript
    onFieldValidationError: (fieldId, error) => {
      if (error) {
        console.warn(`Validation error on field ${fieldId}: ${error}`);
      }
    }
    ```

- **`onFormReset()`**: Triggered when the form is reset.
  - **Example**:
    ```typescript
    onFormReset: () => {
      console.log("Form reset successfully");
    }
    ```

- **`beforeFieldRegister(fieldId, params)`**: Triggered before a field is registered.
  - **Parameters**: 
    - `fieldId`: The ID of the field being registered.
    - `params`: The parameters for the field registration.
  - **Example**:
    ```typescript
    beforeFieldRegister: (fieldId, params) => {
      console.log(`Registering field: ${fieldId}`, params);
    }
    ```

- **`afterFieldRegister(fieldId, params)`**: Triggered after a field is registered.
  - **Parameters**: 
    - `fieldId`: The ID of the field being registered.
    - `params`: The parameters for the field registration.
  - **Example**:
    ```typescript
    afterFieldRegister: (fieldId, params) => {
      console.log(`Field registered: ${fieldId}`, params);
    }
    ```

- **`onValidationStart(fields)`**: Triggered when validation starts.
  - **Parameters**: 
    - `fields`: The fields being validated.
  - **Example**:
    ```typescript
    onValidationStart: (fields) => {
      console.log("Validation started", fields);
    }
    ```

- **`onValidationEnd(fields)`**: Triggered when validation ends.
  - **Parameters**: 
    - `fields`: The fields that were validated.
  - **Example**:
    ```typescript
    onValidationEnd: (fields) => {
      console.log("Validation ended", fields);
    }
    ```

- **`onValueChange(fieldId, value)`**: Triggered when a field value changes.
  - **Parameters**: 
    - `fieldId`: The ID of the field.
    - `value`: The new value of the field.
  - **Example**:
    ```typescript
    onValueChange: (fieldId, value) => {
      console.log(fieldId, value);
    }
    ```

- **`onFieldAdd(fieldId)`**: Triggered when a field is added.
  - **Parameters**: 
    - `fieldId`: The ID of the field being added.
  - **Example**:
    ```typescript
    onFieldAdd: (fieldId) => {
      console.log(fieldId);
    }
    ```

- **`onFieldRemove(fieldId)`**: Triggered when a field is removed.
  - **Parameters**: 
    - `fieldId`: The ID of the field being removed.
  - **Example**:
    ```typescript
    onFieldRemove: (fieldId) => {
      console.log(fieldId);
    }
    ```

- **`onFocus(field)`**: Triggered when a field gains focus.
  - **Parameters**: 
    - `field`: The field that gained focus.
  - **Example**:
    ```typescript
    onFocus: (field) => {
      console.log(field);
    }
    ```

- **`onBlur(field)`**: Triggered when a field loses focus.
  - **Parameters**: 
    - `field`: The field that lost focus.
  - **Example**:
    ```typescript
    onBlur: (field) => {
      console.log(field);
    }
    ```



## 💡 Usage Example

Here's a comprehensive example demonstrating the power of shadow-form-handler:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Enhanced Form Validation Example</title>
  <link rel="stylesheet" href="./styles.css">
</head>
<body>
 
  <form id="myForm">

    <div>
      <label for="firstname">Firstname:</label>
      <input type="text" id="firstname" >
      <span id="firstname-error" class="error-message"></span>
    </div>
    <div>
      <label for="lastname">Lastname:</label>
      <input type="text" id="lastname" >
      <span id="lastname-error" class="error-message"></span>
    </div>
    <div>
      <label for="age">Age:</label>
      <input type="number" id="age" >
      <span id="age-error" class="error-message"></span>
    </div>
    <div>
      <label for="username">Username:</label>
      <input type="text" id="username" >
      <span id="username-error" class="error-message"></span>
    
    </div>
    <div>
      <label for="email">Email:</label>
      <input type="text" id="email" >
      <span id="email-error" class="error-message"></span>
    </div>
    <div>
      <label for="password">Password:</label>
      <input type="password" id="password" >
      <span id="password-error" class="error-message"></span>
    </div>
    <div>
      <label for="confirm-password">Confirm Password:</label>
      <input type="password" id="confirm-password" >
      <span id="confirm-password-error" class="error-message"></span>
    </div>
    <button type="submit">Submit</button>
    <button type="button" id="removeUsername">Remove Username Field</button>
    <button type="button" id="addDescription">Add Description Field</button>
    <button type="button" id="resetform">Reset Form</button>
  </form>
 
<script src="https://cdn.jsdelivr.net/gh/Mostafashadow1/shadow-form-handler@v2.0.1/dist/shadow-form-handler.js"></script>
  <script src="./index.js"></script>
</body>
</html>

  ```

  ```javascript
const { FormHandler} = shadowFormHandler;
const formHandler = new FormHandler();
formHandler.setMode('runtime'); // runtime or default 

formHandler.lang.getCurrentLanguage();
// Add translations
formHandler.lang.addTranslations('en', {
  'required': 'This field is required.',
  'minLength': 'This field must be at least {min} characters long.',
  'maxLength': 'This field must not exceed {max} characters.',
  'email': 'Please enter a valid email address.',
  'range': 'Value must be between {min} and {max}.',
  'matches': 'This field must match {fieldToMatch}.',
});

formHandler.lang.addTranslations('ar', {
  'required': 'هذا الحقل مطلوب.',
  'minLength': 'يجب أن يحتوي هذا الحقل على {min} أحرف على الأقل.',
  'maxLength': 'يجب ألا يتجاوز هذا الحقل {max} حرفًا.',
  'email': 'يرجى إدخال عنوان بريد إلكتروني صالح.',
  'range': 'يجب أن تكون القيمة بين {min} و {max}.',
  'matches': 'يجب أن يتطابق هذا الحقل مع {fieldToMatch}.',
});

formHandler.lang.addTranslations('es', {
  'required': 'Este campo es obligatorio.',
  'minLength': 'Este campo debe tener al menos {min} caracteres.',
  'maxLength': 'Este campo no debe exceder los {max} caracteres.',
  'email': 'Por favor, introduce una dirección de correo electrónico válida.',
  'range': 'El valor debe estar entre {min} y {max}.',
  'matches': 'Este campo debe coincidir con {fieldToMatch}.',
});


formHandler.lang.setCurrentLanguage('ar')

formHandler.setErrorStyles({
  color: "red",
  marginTop:2,
})
formHandler.register({
  id: "firstname",
  initialValue: "",
  schemaValidation: [
    formHandler.validation.required(),
    formHandler.validation.maxLength(10),
    formHandler.validation.minLength(4)
  ]
});
formHandler.register({
  id: "lastname",
  initialValue: "",
  schemaValidation: [
    formHandler.validation.required(),
    formHandler.validation.maxLength(10),
    formHandler.validation.minLength(4)
  ]
});

formHandler.lang.addTranslations('en', {
  'usernameTaken': 'This username is already taken.'
});

formHandler.lang.addTranslations('ar', {
  'usernameTaken': 'اسم المستخدم هذا مستخدم بالفعل.'
});

formHandler.lang.addTranslations('es', {
  'usernameTaken': 'Este nombre de usuario ya está en uso.'
});

formHandler.register({
  id: "username",
  dependencies: ['email'],
  schemaValidation: [formHandler.validation.required() , formHandler.validation.minLength(3),
    formHandler.validation.maxLength(20)],
   customValidation: [
    {
      validate: async (value) => {
        // Simulate an API call to check if the email is already registered
        await new Promise(resolve => setTimeout(resolve, 1000));
        return !value.includes('shadow' && 'mostafa mohamed' && 'mostafa');
      },
      message: formHandler.lang.getTranslation('usernameTaken'),
    }
   ]
});



formHandler.register({
  id: 'email',
  schemaValidation: [
    formHandler.validation.required(),
    formHandler.validation.email()
  ]
});

formHandler.lang.addTranslations('en', {
  'password': 'Password must contain at least one uppercase letter, one lowercase letter, and one number.',
  'confirmPassword' : "Passwords do not match"

});

formHandler.lang.addTranslations('ar', {
  'password': 'يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل، وحرف صغير واحد، ورقم واحد.',
  'confirmPassword' : "كلمات المرور غير متطابقة."

});

formHandler.lang.addTranslations('es', {
  'password': 'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre.',
  'confirmPassword' : "Les mots de passe ne correspondent pas."
});

formHandler.register({
  id: 'password',
  schemaValidation: [
    formHandler.validation.required(),
    formHandler.validation.minLength(8),
    formHandler.validation.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, formHandler.lang.getTranslation('password'))
  ]
});


formHandler.register({
  id: 'confirm-password',
  schemaValidation: [
    formHandler.validation.required(),
    formHandler.validation.matches('password' , formHandler.lang.getTranslation('confirmPassword'))
  ]
});

formHandler.register({
  id: 'confirm-password',
  dependencies: ['password'],
  customValidation: [{
    validate: (value, formValues) => value === formValues.password,
    message: formHandler.lang.getTranslation('confirmPassword')
  }]
});

formHandler.register({
  id: 'age',
  schemaValidation: [
    formHandler.validation.required(),
    formHandler.validation.range(18, 100)
  ]
});

// Adding hooks for validation events
formHandler.addHooks({
  onFormSubmitSuccess: (values) => {
    console.log("Form submitted successfully with values:", values);
  },
  onFormSubmitFail: (errors) => {
    console.error("Form submission failed with errors:", errors);
  },
  onFieldValidationError: (fieldId, error) => {
    if(error) {
      console.warn(`Validation error on field ${fieldId}: ${error}`);
    }
  },
  onFormReset: () => {
    console.log(`form reseted susccfully`);
  },
  beforeFieldRegister: (fieldId, params) => {
    console.log(`Registering field: ${fieldId}`, params);
  },
  afterFieldRegister: (fieldId, params) => {
    console.log(`Field registered: ${fieldId}`, params);
  },
  onValidationStart:  (fields) => {
    console.log( "beforeValidate", fields),
  },
  onValidationEnd:(fields) => {
    console.log("after validated" , fields)
  },
  onValueChange: (fieldId, value) => {
    console.log(fieldId , value)
  },
  onFieldAdd:(fieldId) => {
    console.log(fieldId)
  },
  onFieldRemove:(fieldId) => {
    console.log(fieldId)
  },
  onFocus:(field) => {
    console.log(field)
  },
  onBlur:(field) => {
    console.log(field)
  },
})


// Adding custom event listener
formHandler.addCustomEventListener("email", "blur", (event) => {
  console.log("Email input lost focus", event);
});

// Handling form submission
formHandler.submitHandler('myForm', (values) => {
  console.log('Form submitted with values:', values);
});

// Adding a field dynamically
document.getElementById('addDescription').addEventListener('click', () => {
formHandler.addField({
    containerId:'myForm',
    fieldId:'description',
    labelText:'Description',
    register:{
    initialValue:'',
    schemaValidation:[formHandler.validation.required()],
    },
    position:3,
    disabledId:"addDescription",
    register:{
      initialValue: "",
      schemaValidation: [
        formHandler.validation.required(),
        formHandler.validation.maxLength(10),
        formHandler.validation.minLength(4)
      ],
      customValidation:[]
  }
})
});

// Removing a field dynamically
document.getElementById('removeUsername').addEventListener('click', () => {
  formHandler.removeField( {fieldId : "username" , disabledId:"removeUsername"} );
});


// Removing a field dynamically
document.getElementById('resetform').addEventListener('click', () => {
  formHandler.resetForm()
});
```
## 🛠️ Best Practices

1. **Clear Error Messages**: Provide clear and specific error messages for each validation rule to enhance the user's understanding.
2. **Asynchronous Validations**: Use asynchronous validations sparingly to avoid performance issues. Ensure they are necessary and optimized.
3. **Error Handling**: Implement proper error handling for asynchronous operations to manage potential issues gracefully.
4. **Utilize Hooks**: Leverage hooks to extend functionality without modifying the core logic, ensuring maintainability and flexibility.
5. **Regular Resets**: Regularly reset the form to clear old data and errors, maintaining a fresh state for new submissions.

## 🔧 Troubleshooting

- **Validation Issues**: If fields are not being validated, ensure they are properly registered with the correct validation rules.
- **Runtime Validation**: For runtime validation issues, verify that the correct mode (`default` or `runtime`) is set.
- **Event Listeners**: If custom event listeners are not firing, check the element IDs and event types to ensure they are correctly specified.

## 🤝 Contributing

Contributions to the `shadow-form-handler` package are welcome! Please refer to the contributing guidelines in the repository for more information on how to submit pull requests, report issues, or request features.

## 📄 License

This package is released under the MIT License. See the LICENSE file in the package repository for more details.