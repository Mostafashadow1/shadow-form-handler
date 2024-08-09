
# shadow-form-handler

## Overview

Welcome to **shadow-form-handler**, the ultimate toolkit for effortless form handling and validation in JavaScript and TypeScript! Whether you're building simple forms or complex multi-step processes, our lightweight library empowers you to create seamless user experiences with minimal code.

## 🚀 Key Features

1. **Dynamic Field Management**: Effortlessly add, remove, and modify form fields at runtime, giving you full control over your form's structure.
2. **Flexible Validation**: Leverage both schema-based and custom validation rules to ensure your forms are always accurate and reliable.
3. **Error Handling**: Enjoy built-in error display with customizable styling to match your application's design.
4. **Event Management**: Seamlessly integrate form events and custom event listeners for a responsive user experience.
5. **Hooks System**: Utilize an extensible architecture that allows for custom behavior at various stages of the form lifecycle.
6. **Multiple Validation Modes**: Choose from different validation strategies, including on submit and real-time validation, to suit your needs.
7. **Asynchronous Validation**: Perform asynchronous validations with ease, complete with timeout handling for a smooth user experience.
8. **Dependent Field Validation**: Set up validations that depend on the values of other fields, ensuring complex form logic is handled effortlessly.


## 🎯 Key Benefits

1. **Reduced Development Time:** Streamline form creation and validation with minimal code.
2. **Enhanced User Experience:** Provide instant feedback with real-time validation.
3. **Flexibility:** Easily adapt to changing requirements with dynamic field management.
4. **Powerful Validation:** Combine schema-based and custom validators for complex scenarios.
5. **Asynchronous Support:** Handle server-side validations seamlessly.
6. **Event-Driven Architecture:** Extend functionality with hooks and custom event listeners.
7. **Customizable UI:** Tailor error messages and styles to match your design.

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
<script src="https://cdn.jsdelivr.net/gh/Mostafashadow1/shadow-form-handler/dist/shadow-form-handler.js"></script>
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

## Simple Example 
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
 <script src="https://cdn.jsdelivr.net/gh/Mostafashadow1/shadow-form-handler/dist/shadow-form-handler.js"></script>
  <script src="./index.js"></script>

</body>
</html>

```
```javascript
const { FormHandler , required , minLength , maxLength } = shadowFormHandler;
const formHandler = new FormHandler();
 
// Register a field
formHandler.register({
  id: 'username',
  schemaValidation: [
    required('Username is required'),
    minLength(3, 'Username must be at least 3 characters long'),
    maxLength(15 , 'Username must be less than 15 characters '),
  ]
});

// Set up form submission
formHandler.submitHandler('myForm', (values) => {
  console.log('Form submitted with values:', values);
});
```

## Core Components

### Methods

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

- **`addHooks(hooks: Hooks)`**: 
  - **Purpose**: Add custom hooks for form lifecycle events.
  - **Usage**: 
    ```typescript
    formHandler.addHooks({ 
      beforeValidate:  (fields) => console.log( "beforeValidate", fields),
      afterValidate:(fields) => console.log("after validated" , fields),
      onValueChange: (field, fields) => console.log(field , fields),
    });
    ```

- **`addCustomEventListener(id: string, event: string, listener: EventListener)`**: 
  - **Purpose**: Add a custom event listener to a field.
  - **Usage**: 
    ```typescript
    formHandler.addCustomEventListener('username', 'focus', () => console.log('Username field focused'));
    ```
---

### Built-in Validation Rules

The package comes with several pre-defined validation rules:

- **`required(message: string = "This field is required.")`**: Ensures the field is not empty.
  - **Parameters**: 
   `message`: The error message to display if validation fails. Defaults to "This field is required."

- **`minLength(length: number, message: string = "This field must be at least {length} characters long.")`**: Checks if the value meets the minimum length.
  - **Parameters**: 
    - `length`: The minimum length required.
    - `message`: The error message to display if validation fails. Defaults to "This field must be at least {length} characters long."

- **`maxLength(length: number, message: string = "This field must be no more than {length} characters long.")`**: Checks if the value doesn't exceed the maximum length.
  - **Parameters**: 
    - `length`: The maximum length allowed.
    - `message`: The error message to display if validation fails. Defaults to "This field must be no more than {length} characters long."

- **`pattern(regex: RegExp, message: string = "This field does not match the required pattern.")`**: Validates the value against a regular expression.
  - **Parameters**: 
    - `regex`: The regular expression pattern to match.
    - `message`: The error message to display if validation fails. Defaults to "This field does not match the required pattern."

- **`email(message: string = "This field must be a valid email address.")`**: Checks if the value is a valid email format.
  - **Parameters**: 
    - `message`: The error message to display if validation fails. Defaults to "This field must be a valid email address."
  - **Returns**: A function that validates if the value is a valid email.



## 🛠 Advanced Features

### Custom Validation 

Create complex validation rules with ease:

```javascript

 // Set validation mode
formHandler.setMode('runtime'); // runtime or default 

// Register a field
formHandler.register({
  id: "password",
  schemaValidation: [
    required() // add mesage optional
  ],
  customValidation: [
    {
      validate: value => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value),
      message: "Password must be at least 8 characters long and include both letters and numbers"
    }
  ]
});

```
### Or use built in Validator like Pattern

```javascript

 // Set validation mode
 formHandler.setMode('runtime'); // runtime or default 
 
formHandler.register({
  id: "password",
  schemaValidation: [
    required('password filed is required'),
    pattern( /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ , "Password must be at least 8 characters long and include both letters and numbers"),
  ]
});
```


### Asynchronous Validation

Perform server-side checks without blocking the UI:

```javascript


formHandler.register({
  id: "username",
  schemaValidation: [
    required('password filed is required'),
  ],
   customValidation: [
    {
      validate: async (value) => {
        // Simulating an API call to check username uniqueness
        const response = await fetch(`/check-username?username=${value}`);  
        return response.ok;
      },
      message: "Username is already taken"
    }
  ]
});
```

### Dependent Field Validation

Validate fields based on the values of other fields:

```javascript

// register password field
formHandler.register({
  id: "password",
  schemaValidation: [
    required('password filed is required'),
    pattern( /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ , "Password must be at least 8 characters long and include both letters and numbers"),
  ]
});

// register confirm-password field
 formHandler.register({
  id: "confirm-password",
  customValidation: [
    {
      validate: value => value === formHandler.getValue('password'),
      message: "Passwords do not match",
      depends: 'password',
    }
  ],
});
```

### Asynchronous Validation With Dependent Field Validation

```javascript
formHandler.register({
  id: 'email',
  customValidation: [{
    validate: async (value) => {
      // Simulating an API call to check email uniqueness
      const response = await fetch(`/api/check-email?email=${value}`);
      return response.ok;
    },
    message: 'This email is already in use',
    depends: 'username'  // This validation will re-run when the 'username' field changes
  }]
});
```

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
  position: 'top' // position of element added : 'top' | 'bottom' | number of element filed like 3 
});


// Remove a field
formHandler.removeField({
  fieldId: 'fieldToRemove',
  disabledId: 'addButton'
});
```

### Adding Custom Hooks

```javascript
formHandler.addHooks({
  beforeValidate: (fields) => {
    console.log('About to validate fields:', fields);
  },
  afterValidate: (fields) => {
    console.log('Validation completed for fields:', fields);
  },
  onValueChange: (field, allFields) => {
    console.log(`Field ${field.id} changed. New value:`, field.value);
  }
});
```

## Error Styling

Customize the appearance of error messages:

```javascript
formHandler.setErrorStyles({
  color: 'red',
  fontStyle: 'italic',
  fontWeight:"bold",
  marginTop: '5px'
});
```


## 💡 Usage Example

Here's a comprehensive example demonstrating the power of shadow-form-handler:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
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
      </form>
    
       <script  src=https://cdn.jsdelivr.net/gh/Mostafashadow1/shadow-form-handler/dist/shadow-form-handler.js></script>
      <script src="./index.js">
      </script>
</body>
</html>

  ```

  ```javascript
 const { FormHandler, required, minLength, maxLength, pattern, email } = shadowFormHandler;
    const formHandler = new FormHandler();
    
    // Set validation mode 
    formHandler.setMode('runtime');

    // Add hooks for validation events
    formHandler.addHooks({
      beforeValidate: (fields) => console.log("beforeValidate", fields),
      afterValidate: (fields) => console.log("after validated", fields),
      onValueChange: (field, fields) => console.log( field, fields),
    });

    // Set custom error styles
    formHandler.setErrorStyles({
      color: 'red',
      fontWeight: 'bold',
    });

    
    // Registering form fields
    formHandler.register({
      id: "firstname",
      initialValue: "",
      schemaValidation: [
        required("firstname is required"),
        maxLength(10), // if don't pass message , will show default message
        minLength(3 , "Firstname must be more than 3 characters")
      ],
    });

    formHandler.register({
      id: "lastname",
      initialValue: "",
      schemaValidation: [
        required("last name is required"),
        maxLength(10, "Lastname must be less than 10 characters"),
        minLength(4 , "Lastname must be more than 4 characters")
      ]
    });

    formHandler.register({
      id: "username",
      initialValue: "initial value",
      schemaValidation: [required("Username is required")],
       customValidation: [
       { validate: async (value) => new Promise(resolve => resolve(value !== "duplicate")), message: "Username must be unique" }]
    });

    formHandler.register({
      id: "email",
      initialValue: "",
      schemaValidation: [
        required("This input is required"),
        email("email is not valid")
      ],
      
    });

    formHandler.register({
      id: "password",
      schemaValidation: [
        required('password filed is required'),
        pattern( /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ , "Password must be at least 8 characters long and include both letters and numbers"),
      ]
    });
    
    // register confirm-password field
     formHandler.register({
      id: "confirm-password",
      customValidation: [
        {
          validate: value => value === formHandler.getValue('password'),
          message: "Passwords do not match",
          depends: 'password',
        }
      ],
    });

  
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
        schemaValidation:[required('input must be required')],
        customValidation:[{validate : value => value.length <= 10 , message:"input must less than 10"}],
        },
        position:3,
        disabledId:"addDescription",
    })
});

    // Removing a field dynamically
    document.getElementById('removeUsername').addEventListener('click', () => {
      formHandler.removeField( {fieldId : "username" , disabledId:"removeUsername"} );
    });

```
   

## 🛠️ Best Practices
1. **Clear Error Messages**: Always provide clear and specific error messages for each validation rule to enhance user understanding.
2. **Asynchronous Validations**: Use asynchronous validations sparingly to avoid performance issues. Ensure they are necessary and optimized.
3. **Error Handling**: Implement proper error handling for asynchronous operations to manage potential issues gracefully.
4. **Utilize Hooks**: Leverage hooks to extend functionality without modifying the core logic, ensuring maintainability and flexibility.
5. **Regular Resets**: Regularly reset the form to clear old data and errors, maintaining a fresh state for new submissions.

## 🔧 Troubleshooting

- **Validation Issues**: If fields are not being validated, ensure they are properly registered with the correct validation rules.
- **Runtime Validation**: For runtime validation issues, verify that the correct mode (`default` or `runtime`) is set.
- **Event Listeners**: If custom event listeners are not firing, check the element IDs and event types to ensure they are correctly specified.


## 🤝 Contributing

Contributions to the FormHandler package are welcome! Please refer to the contributing guidelines in the repository for more information on how to submit pull requests, report issues, or request features.




## 📄 License
This package is released under the MIT License. See the LICENSE file in the package repository for more details.
```