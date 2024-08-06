const { FormHandler, required, minLength, maxLength, pattern, email } = shadowFormHandler;
const formHandler = new FormHandler();
// Set validation mode
formHandler.setMode('runtime');

// Adding hooks for validation events
formHandler.addHooks({
  beforeValidate:  (fields) => console.log( "beforeValidate", fields),
  afterValidate:(fields) => console.log("after validated" , fields),
  onValueChange: (field, fields) =>(fields) => console.log(fields),
})
// Setting error styles
formHandler.setErrorStyles({
  color: 'red',
  fontWeight: 'bold',
});


// Registering form fields
formHandler.register({
  id: "firstname",
  initialValue: "",
  schemaValidation: [
    required(),
    maxLength(10, "Firstname must be less than 10 characters"),
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
  schemaValidation: [required("This input is required")]
});

formHandler.register({
  id: "confirm-password",
  schemaValidation: [
    required("This input is required")
  ],
  customValidation: [
    {
      validate: value => value === formHandler.getValue('password'),
      message: "Passwords do not match",
      depends:'password',
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