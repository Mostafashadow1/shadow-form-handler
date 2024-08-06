/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/cors/ErrorHandler.ts":
/*!**********************************!*\
  !*** ./src/cors/ErrorHandler.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ErrorHandler: () => (/* binding */ ErrorHandler)\n/* harmony export */ });\n/**\r\n * ErrorHandler class: Manages error display and styling.\r\n */\r\nclass ErrorHandler {\r\n    constructor() {\r\n        this.errorStyles = { property: \" \", value: \"\" };\r\n    }\r\n    /**\r\n     * Set error styles to be applied to error elements.\r\n     * @param {ErrorStyle} style - An error style object to be applied.\r\n     */\r\n    setErrorStyles(style) {\r\n        this.errorStyles = style;\r\n    }\r\n    /**\r\n     * Apply the error styles to a given element.\r\n     * @param element - The element to apply styles to.\r\n     */\r\n    applyStyles(element) {\r\n        for (const [property, value] of Object.entries(this.errorStyles)) {\r\n            element.style[property] = value;\r\n        }\r\n    }\r\n    /**\r\n     * Display errors for all form fields.\r\n     * @param {Field[]} fields - An array of all form fields.\r\n     */\r\n    displayErrors(fields) {\r\n        fields.forEach(field => {\r\n            const errorElement = document.getElementById(`${field.id}-error`);\r\n            if (errorElement) {\r\n                errorElement.textContent = field.error || '';\r\n                this.applyStyles(errorElement);\r\n            }\r\n        });\r\n    }\r\n    /**\r\n     * Clear all error messages.\r\n     */\r\n    clearErrors() {\r\n        const errorElements = document.querySelectorAll('.error-message');\r\n        errorElements.forEach(element => {\r\n            element.textContent = '';\r\n            element.style.display = 'none';\r\n        });\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://shadow-form-handler/./src/cors/ErrorHandler.ts?");

/***/ }),

/***/ "./src/cors/EventManger.ts":
/*!*********************************!*\
  !*** ./src/cors/EventManger.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   EventManager: () => (/* binding */ EventManager)\n/* harmony export */ });\n/**\r\n * EventManager class: Manages form-related events and hooks.\r\n */\r\nclass EventManager {\r\n    constructor(fieldManager, validator, hooksHandler) {\r\n        this.fieldManager = fieldManager;\r\n        this.validator = validator;\r\n        this.hooksHandler = hooksHandler;\r\n    }\r\n    /**\r\n     * Add runtime validation to a form field.\r\n     * @param {string} id - The id of the form field.\r\n     */\r\n    addRuntimeValidation(id) {\r\n        const inputElement = document.getElementById(id);\r\n        if (inputElement) {\r\n            inputElement.addEventListener('input', this.handleInputChange.bind(this));\r\n        }\r\n    }\r\n    /**\r\n     * Handle input change event.\r\n     * @param {Event} event - The input change event.\r\n     */\r\n    async handleInputChange(event) {\r\n        const target = event.target;\r\n        const field = this.fieldManager.getField(target.id);\r\n        const fields = this.fieldManager.getAllFields();\r\n        if (!field)\r\n            return;\r\n        field.value = target.value;\r\n        const hooks = this.hooksHandler.getHooks();\r\n        if (hooks.onValueChange)\r\n            hooks.onValueChange(field, fields);\r\n        await this.validator.validateField(field.id);\r\n    }\r\n    /**\r\n     * Add a custom event listener to a form field.\r\n     * @param {string} id - The id of the form field.\r\n     * @param {string} event - The event type to listen for.\r\n     * @param {EventListener} listener - The event listener function.\r\n     */\r\n    addCustomEventListener(id, event, listener) {\r\n        const inputElement = document.getElementById(id);\r\n        if (!inputElement) {\r\n            console.error(`Input element with id \"${id}\" not found.`);\r\n            return;\r\n        }\r\n        inputElement.addEventListener(event, listener);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://shadow-form-handler/./src/cors/EventManger.ts?");

/***/ }),

/***/ "./src/cors/FieldManager.ts":
/*!**********************************!*\
  !*** ./src/cors/FieldManager.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   FieldManager: () => (/* binding */ FieldManager)\n/* harmony export */ });\n/**\r\n * FieldManager class: Manages form fields, their values, and related DOM operations.\r\n */\r\nclass FieldManager {\r\n    constructor(hooksHandler) {\r\n        this.hooksHandler = hooksHandler;\r\n        this.fields = [];\r\n    }\r\n    /**\r\n     * Register a new form field.\r\n     * @param {RegisterParams} params - The parameters for registering a field.\r\n     */\r\n    register(params) {\r\n        const { id, schemaValidation, customValidation, initialValue } = params;\r\n        this.fields.push({ id, value: initialValue || '', error: null, schemaValidation, customValidation });\r\n        const inputElement = document.getElementById(id);\r\n        if (!inputElement)\r\n            throw new Error(`Input element with id ${id} not found`);\r\n        if (initialValue) {\r\n            inputElement.value = initialValue;\r\n        }\r\n    }\r\n    /**\r\n      * Dynamically remove a form field.\r\n      * @param {string} fieldId - The id of the form field.\r\n      * @param {string} disabledId -The ID of a button element that should be disabled when the field is added.\r\n      */\r\n    removeField(params) {\r\n        const inputElement = document.getElementById(params.fieldId);\r\n        if (!inputElement) {\r\n            console.error(`Element with id ${params.fieldId} not found.`);\r\n            return;\r\n        }\r\n        // Handle the button state if buttonId is provided\r\n        if (params.disabledId) {\r\n            const button = document.getElementById(params.disabledId);\r\n            if (button) {\r\n                button.disabled = true;\r\n            }\r\n        }\r\n        this.fields = this.fields.filter(f => f.id !== params.fieldId);\r\n        const errorElement = document.getElementById(`${params.fieldId}-error`);\r\n        const label = document.querySelector(`label[for=\"${params.fieldId}\"]`);\r\n        inputElement.remove();\r\n        errorElement?.remove();\r\n        label?.remove();\r\n    }\r\n    /**\r\n     * Add a new form field to the DOM and register it.\r\n     * @param {Object} params - Parameters for adding a new field.\r\n     * @param {string} params.containerId - The ID of the container element where the field should be added.\r\n     * @param {string} params.fieldId - The ID of the new form field.\r\n     * @param {string} params.labelText - The text to display as the label for the form field.\r\n     * @param {RegisterParams} [params.register] - Optional parameters for registering the field.\r\n     * @param {string|number} [params.position] - The position where the new field should be inserted.\r\n     * @param {string} [params.disabledId] - The ID of a button element that should be disabled when the field is added.\r\n     */\r\n    addField(params) {\r\n        // Check if an input with the same ID already exists\r\n        const existingInput = document.getElementById(params.fieldId);\r\n        if (existingInput) {\r\n            console.warn(`Field with id ${params.fieldId} already exists. Skipping creation.`);\r\n            return;\r\n        }\r\n        // Handle the button state if buttonId is provided\r\n        if (params.disabledId) {\r\n            const button = document.getElementById(params.disabledId);\r\n            if (button) {\r\n                button.disabled = true;\r\n            }\r\n        }\r\n        const container = document.getElementById(params.containerId);\r\n        if (!container)\r\n            throw new Error(`Container element with id ${params.containerId} not found`);\r\n        const fieldWrapper = document.createElement('div');\r\n        const label = document.createElement('label');\r\n        const input = document.createElement('input');\r\n        const errorElement = document.createElement('span');\r\n        label.setAttribute('for', params.fieldId);\r\n        label.textContent = params.labelText;\r\n        input.setAttribute('id', params.fieldId);\r\n        input.setAttribute('name', params.fieldId);\r\n        input.setAttribute('type', 'text');\r\n        errorElement.setAttribute('id', `${params.fieldId}-error`);\r\n        errorElement.classList.add('error-message');\r\n        fieldWrapper.appendChild(label);\r\n        fieldWrapper.appendChild(input);\r\n        fieldWrapper.appendChild(errorElement);\r\n        if (!params.position)\r\n            container.appendChild(fieldWrapper);\r\n        else if (params.position === \"top\") {\r\n            container.insertBefore(fieldWrapper, container.firstChild);\r\n        }\r\n        else if (params.position === \"bottom\") {\r\n            container.appendChild(fieldWrapper);\r\n        }\r\n        else if (typeof params.position === \"number\" && params.position >= 0) {\r\n            const existingElement = container.children[params.position];\r\n            if (existingElement)\r\n                container.insertBefore(fieldWrapper, existingElement);\r\n        }\r\n        else {\r\n            throw new Error(`Invalid position value: ${params.position}`);\r\n        }\r\n        this.register({\r\n            id: params.fieldId,\r\n            initialValue: params.register?.initialValue || \"\",\r\n            schemaValidation: params.register?.schemaValidation || [],\r\n            customValidation: params.register?.customValidation || []\r\n        });\r\n    }\r\n    /**\r\n     * Get a field by its ID.\r\n     * @param {string} id - The id of the form field.\r\n     * @returns {Field|undefined} The field object if found, undefined otherwise.\r\n     */\r\n    getField(id) {\r\n        return this.fields.find(field => field.id === id);\r\n    }\r\n    /**\r\n     * Get all form fields.\r\n     * @returns {Field[]} An array of all form fields.\r\n     */\r\n    getAllFields() {\r\n        return this.fields;\r\n    }\r\n    /**\r\n     * Set the value of a form field.\r\n     * @param {string} id - The id of the form field.\r\n     * @param {string} value - The new value to set.\r\n     */\r\n    setValue(id, value) {\r\n        console.log('dd');\r\n        const field = this.getField(id);\r\n        const fields = this.getAllFields();\r\n        if (!field)\r\n            return;\r\n        const hooks = this.hooksHandler.getHooks();\r\n        field.value = value;\r\n    }\r\n    /**\r\n     * Get the value of a form field.\r\n     * @param {string} id - The id of the form field.\r\n     * @returns {string|undefined} The value of the field if found, undefined otherwise.\r\n     */\r\n    getValue(id) {\r\n        const field = this.getField(id);\r\n        return field?.value;\r\n    }\r\n    /**\r\n     * Get all form field values.\r\n     * @returns {Object} An object with all form field ids as keys and their current values as values.\r\n     */\r\n    getValues() {\r\n        const values = {};\r\n        this.fields.forEach(field => {\r\n            values[field.id] = field.value;\r\n        });\r\n        return values;\r\n    }\r\n    /**\r\n     * Reset all form fields to their initial state.\r\n     */\r\n    resetFields() {\r\n        this.fields.forEach(field => {\r\n            field.value = '';\r\n            field.error = null;\r\n            const inputElement = document.getElementById(field.id);\r\n            if (inputElement) {\r\n                inputElement.value = '';\r\n            }\r\n        });\r\n    }\r\n    /**\r\n     * Check if any field has errors.\r\n     * @returns {boolean} True if any field has an error, false otherwise.\r\n     */\r\n    hasErrors() {\r\n        return this.fields.some(field => field.error !== null);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://shadow-form-handler/./src/cors/FieldManager.ts?");

/***/ }),

/***/ "./src/cors/FormHandler.ts":
/*!*********************************!*\
  !*** ./src/cors/FormHandler.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   FormHandler: () => (/* binding */ FormHandler)\n/* harmony export */ });\n/* harmony import */ var _FieldManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FieldManager */ \"./src/cors/FieldManager.ts\");\n/* harmony import */ var _Validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Validator */ \"./src/cors/Validator.ts\");\n/* harmony import */ var _ErrorHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ErrorHandler */ \"./src/cors/ErrorHandler.ts\");\n/* harmony import */ var _EventManger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./EventManger */ \"./src/cors/EventManger.ts\");\n/* harmony import */ var _HooksHandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./HooksHandler */ \"./src/cors/HooksHandler.ts\");\n\r\n\r\n\r\n\r\n\r\n/**\r\n * FormHandler class: Manages form validation, registration, and submission.\r\n */\r\nclass FormHandler {\r\n    constructor() {\r\n        this.mode = \"default\" /* Mode.Default */;\r\n        this.hooksHandler = new _HooksHandler__WEBPACK_IMPORTED_MODULE_4__.HooksHandler();\r\n        this.errorHandler = new _ErrorHandler__WEBPACK_IMPORTED_MODULE_2__.ErrorHandler();\r\n        this.fieldManager = new _FieldManager__WEBPACK_IMPORTED_MODULE_0__.FieldManager(this.hooksHandler);\r\n        this.validator = new _Validator__WEBPACK_IMPORTED_MODULE_1__.Validator(this.fieldManager, this.errorHandler, this.hooksHandler);\r\n        this.eventManager = new _EventManger__WEBPACK_IMPORTED_MODULE_3__.EventManager(this.fieldManager, this.validator, this.hooksHandler);\r\n    }\r\n    /**\r\n     * Register a form field with initial value and validators.\r\n     * @param {RegisterParams} params - The parameters for registering a field.\r\n     */\r\n    register(params) {\r\n        this.fieldManager.register(params);\r\n        if (this.mode === \"runtime\" /* Mode.Runtime */) {\r\n            this.eventManager.addRuntimeValidation(params.id);\r\n        }\r\n    }\r\n    /**\r\n     * Set the mode for the form handler.\r\n     * @param {Mode} newMode - The new mode to set.\r\n     */\r\n    setMode(newMode) {\r\n        this.mode = newMode;\r\n    }\r\n    /**\r\n     * Handle form submission.\r\n     * @param {string} formId - The ID of the form element.\r\n     * @param {Function} [onSubmit] - Optional custom submission handler.\r\n     */\r\n    submitHandler(formId, onSubmit) {\r\n        const form = document.getElementById(formId);\r\n        if (!form)\r\n            throw new Error(\"Form not found. Please ensure the form ID is correct!\");\r\n        form.addEventListener('submit', async (e) => {\r\n            e.preventDefault();\r\n            await this.validator.validateAll();\r\n            const values = this.fieldManager.getValues();\r\n            const hasErrors = this.fieldManager.hasErrors();\r\n            if (hasErrors) {\r\n                this.errorHandler.displayErrors(this.fieldManager.getAllFields());\r\n            }\r\n            else if (onSubmit) {\r\n                onSubmit(values);\r\n            }\r\n        });\r\n    }\r\n    /**\r\n     * Get the current value of a form field.\r\n     * @param {string} id - The id of the form field.\r\n     * @returns {string|undefined} The value of the form field.\r\n     */\r\n    getValue(id) {\r\n        return this.fieldManager.getValue(id);\r\n    }\r\n    /**\r\n     * Get all form field values.\r\n     * @returns {Object} An object with all form field ids as keys and their current values as values.\r\n     */\r\n    getValues() {\r\n        return this.fieldManager.getValues();\r\n    }\r\n    /**\r\n     * Reset the form fields and errors.\r\n     */\r\n    resetForm() {\r\n        this.fieldManager.resetFields();\r\n        this.errorHandler.clearErrors();\r\n    }\r\n    /**\r\n     * Dynamically remove a form field.\r\n     * @param {string} fieldId - The id of the form field.\r\n     * @param {string} disabledId -The ID of a button element that should be disabled when the field is added.\r\n     */\r\n    removeField(params) {\r\n        this.fieldManager.removeField(params);\r\n    }\r\n    /**\r\n     * Dynamically add a form field to a specific position in the container.\r\n     * @param {Object} params - Parameters for adding a new field.\r\n     * @param {string} params.containerId - The ID of the container element where the field should be added.\r\n     * @param {string} params.fieldId - The ID of the new form field.\r\n     * @param {string} params.labelText - The text to display as the label for the form field.\r\n     * @param {RegisterParams} [params.register] - Optional parameters for registering the field.\r\n     * @param {string|number} [params.position] - The position where the new field should be inserted.\r\n     * @param {string} [params.disabled] - The ID of a button element that should be disabled when the field is added.\r\n     */\r\n    addField(params) {\r\n        this.fieldManager.addField(params);\r\n        if (this.mode === \"runtime\" /* Mode.Runtime */) {\r\n            this.eventManager.addRuntimeValidation(params.fieldId);\r\n        }\r\n        this.errorHandler.displayErrors(this.fieldManager.getAllFields());\r\n    }\r\n    /**\r\n     * Set error styles to be applied to error elements.\r\n     * @param {ErrorStyle} style - An error style object to be applied.\r\n     */\r\n    setErrorStyles(style) {\r\n        this.errorHandler.setErrorStyles(style);\r\n    }\r\n    /**\r\n     * Add hooks for the form handler.\r\n     * @param {Hooks} hooks - Hooks to be set.\r\n     */\r\n    addHooks(hooks) {\r\n        this.hooksHandler.addHooks(hooks);\r\n    }\r\n    /**\r\n     * Attach a custom event listener to a form field.\r\n     * @param {string} id - The id of the form field.\r\n     * @param {string} event - The event type (e.g., 'input', 'change').\r\n     * @param {EventListener} listener - The event listener function.\r\n     */\r\n    addCustomEventListener(id, event, listener) {\r\n        this.eventManager.addCustomEventListener(id, event, listener);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://shadow-form-handler/./src/cors/FormHandler.ts?");

/***/ }),

/***/ "./src/cors/HooksHandler.ts":
/*!**********************************!*\
  !*** ./src/cors/HooksHandler.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   HooksHandler: () => (/* binding */ HooksHandler)\n/* harmony export */ });\nclass HooksHandler {\r\n    constructor() {\r\n        this.hooks = {};\r\n    }\r\n    /**\r\n     * Add hooks for form events.\r\n     * @param {Hooks} hooks - Hooks to be added.\r\n     */\r\n    addHooks(hooks) {\r\n        this.hooks = { ...this.hooks, ...hooks };\r\n    }\r\n    /**\r\n     * get all hooks\r\n     *.\r\n     */\r\n    getHooks() {\r\n        return this.hooks;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://shadow-form-handler/./src/cors/HooksHandler.ts?");

/***/ }),

/***/ "./src/cors/Validator.ts":
/*!*******************************!*\
  !*** ./src/cors/Validator.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Validator: () => (/* binding */ Validator)\n/* harmony export */ });\n/**\r\n * Validator class: Handles form field validation.\r\n */\r\nclass Validator {\r\n    constructor(fieldManager, errorHandler, hooksHandler) {\r\n        this.fieldManager = fieldManager;\r\n        this.errorHandler = errorHandler;\r\n        this.hooksHandler = hooksHandler;\r\n    }\r\n    /**\r\n     * Validate all form fields.\r\n     * @returns {Promise<void>}\r\n     */\r\n    async validateAll() {\r\n        const fields = this.fieldManager.getAllFields();\r\n        const hooks = this.hooksHandler.getHooks();\r\n        if (hooks.beforeValidate)\r\n            hooks.beforeValidate(fields);\r\n        for (const field of fields) {\r\n            await this.validateField(field.id);\r\n        }\r\n        if (hooks.afterValidate)\r\n            hooks.afterValidate(fields);\r\n    }\r\n    /**\r\n  * Validate a single form field.\r\n  * @param {string} id - The id of the form field to validate.\r\n  * @returns {Promise<void>}\r\n  */\r\n    async validateField(id) {\r\n        const field = this.fieldManager.getField(id);\r\n        if (!field)\r\n            return;\r\n        // First, check schema validation\r\n        const schemaError = this.validateFieldSchema(field);\r\n        if (schemaError) {\r\n            this.updateFieldError(field, schemaError);\r\n            return;\r\n        }\r\n        // If no schema error, proceed with custom validation\r\n        const customError = await this.validateCustomValidator(field);\r\n        this.updateFieldError(field, customError);\r\n    }\r\n    /**\r\n     * Validate a field against its schema validators.\r\n     * @param {Field} field - The form field to validate.\r\n     * @returns {string|null} The error message if validation fails, otherwise null.\r\n     */\r\n    validateFieldSchema(field) {\r\n        if (field.schemaValidation) {\r\n            for (const validator of field.schemaValidation) {\r\n                const error = validator(field.value);\r\n                if (error)\r\n                    return error;\r\n            }\r\n        }\r\n        return null;\r\n    }\r\n    /**\r\n     * Perform custom validations on a given form field.\r\n     * @param {Field} field - The form field to validate.\r\n     * @returns {Promise<string|null>} The error message if validation fails, otherwise null.\r\n     */\r\n    async validateCustomValidator(field) {\r\n        if (!field.customValidation)\r\n            return null;\r\n        // Create an array of promises for each custom validation\r\n        const validationPromises = field.customValidation.map(async ({ validate, message, depends }) => {\r\n            if (typeof validate !== 'function') {\r\n                console.error(`Invalid validate function for field ${field.id}`);\r\n                return 'Validation function is not defined correctly.';\r\n            }\r\n            try {\r\n                // Run the validation with a 5-second timeout\r\n                const result = await Promise.race([\r\n                    Promise.resolve(validate(field.value)),\r\n                    new Promise((_, reject) => setTimeout(() => reject(new Error('Validation timeout')), 5000))\r\n                ]);\r\n                if (!result) {\r\n                    // If validation fails, set up dependent validation if needed\r\n                    if (depends) {\r\n                        this.setupDependentValidation(field, depends, validate, message);\r\n                    }\r\n                    return message;\r\n                }\r\n            }\r\n            catch (error) {\r\n                console.error(`Validation error for field ${field.id}:`, error);\r\n                return error === 'Validation timeout'\r\n                    ? 'Validation took too long. Please try again.'\r\n                    : 'An unexpected error occurred during validation.';\r\n            }\r\n            return null;\r\n        });\r\n        // Run all validations in parallel and return the first error found (if any)\r\n        const errors = await Promise.all(validationPromises);\r\n        return errors.find(error => error !== null) || null;\r\n    }\r\n    /**\r\n     * Sets up validation for a field that depends on another field's value.\r\n     * @param field - The field that requires validation.\r\n     * @param dependentFieldId - The ID of the field that this field depends on.\r\n     * @param validate - A function that validates the field's value. It returns a boolean or a Promise that resolves to a boolean.\r\n     * @param message - The error message to display if validation fails.\r\n     */\r\n    setupDependentValidation(field, dependentFieldId, validate, message) {\r\n        const dependentField = this.fieldManager.getField(dependentFieldId);\r\n        if (!dependentField)\r\n            return;\r\n        // Function to validate the field on change\r\n        const validateOnChange = async () => {\r\n            try {\r\n                const result = await Promise.resolve(validate(field.value));\r\n                this.updateFieldError(field, result ? null : message);\r\n            }\r\n            catch (error) {\r\n                console.error(`Validation error on change for field ${field.id}:`, error);\r\n                this.updateFieldError(field, 'An unexpected error occurred during validation.');\r\n            }\r\n        };\r\n        // Add event listener to dependent field\r\n        const dependentElement = document.getElementById(dependentFieldId);\r\n        if (dependentElement) {\r\n            dependentElement.removeEventListener('input', validateOnChange);\r\n            dependentElement.addEventListener('input', validateOnChange);\r\n        }\r\n    }\r\n    /**\r\n     * Updates the error message for a field and displays all errors.\r\n     * @param field - The field to update.\r\n     * @param error - The error message to set, or null if there is no error.\r\n     */\r\n    updateFieldError(field, error) {\r\n        field.error = error;\r\n        this.errorHandler.displayErrors(this.fieldManager.getAllFields());\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://shadow-form-handler/./src/cors/Validator.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   FormHandler: () => (/* reexport safe */ _cors_FormHandler__WEBPACK_IMPORTED_MODULE_0__.FormHandler),\n/* harmony export */   email: () => (/* reexport safe */ _validators_ValidationRules__WEBPACK_IMPORTED_MODULE_1__.email),\n/* harmony export */   maxLength: () => (/* reexport safe */ _validators_ValidationRules__WEBPACK_IMPORTED_MODULE_1__.maxLength),\n/* harmony export */   minLength: () => (/* reexport safe */ _validators_ValidationRules__WEBPACK_IMPORTED_MODULE_1__.minLength),\n/* harmony export */   pattern: () => (/* reexport safe */ _validators_ValidationRules__WEBPACK_IMPORTED_MODULE_1__.pattern),\n/* harmony export */   required: () => (/* reexport safe */ _validators_ValidationRules__WEBPACK_IMPORTED_MODULE_1__.required)\n/* harmony export */ });\n/* harmony import */ var _cors_FormHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cors/FormHandler */ \"./src/cors/FormHandler.ts\");\n/* harmony import */ var _validators_ValidationRules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./validators/ValidationRules */ \"./src/validators/ValidationRules.ts\");\n\r\n\r\n// Make FormHandler and validators available globally in browser environments\r\nif (typeof window !== 'undefined') {\r\n    window.shadowFormHandler = {\r\n        FormHandler: _cors_FormHandler__WEBPACK_IMPORTED_MODULE_0__.FormHandler,\r\n        required: _validators_ValidationRules__WEBPACK_IMPORTED_MODULE_1__.required,\r\n        minLength: _validators_ValidationRules__WEBPACK_IMPORTED_MODULE_1__.minLength,\r\n        maxLength: _validators_ValidationRules__WEBPACK_IMPORTED_MODULE_1__.maxLength,\r\n        pattern: _validators_ValidationRules__WEBPACK_IMPORTED_MODULE_1__.pattern,\r\n        email: _validators_ValidationRules__WEBPACK_IMPORTED_MODULE_1__.email\r\n    };\r\n}\r\n\r\n\n\n//# sourceURL=webpack://shadow-form-handler/./src/index.ts?");

/***/ }),

/***/ "./src/validators/ValidationRules.ts":
/*!*******************************************!*\
  !*** ./src/validators/ValidationRules.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   email: () => (/* binding */ email),\n/* harmony export */   maxLength: () => (/* binding */ maxLength),\n/* harmony export */   minLength: () => (/* binding */ minLength),\n/* harmony export */   pattern: () => (/* binding */ pattern),\n/* harmony export */   required: () => (/* binding */ required)\n/* harmony export */ });\n/**\r\n * Validation rule to check if the value is required.\r\n * @param message - The error message to display if validation fails. Defaults to \"This field is required.\"\r\n * @returns A function that validates if the value is non-empty.\r\n */\r\nconst required = (message = \"This field is required.\") => (value) => !value ? message : null;\r\n/**\r\n * Validation rule to check if the value meets the minimum length requirement.\r\n * @param minLength - The minimum length required.\r\n * @param message - The error message to display if validation fails. Defaults to \"This field must be at least {minLength} characters long.\"\r\n * @returns A function that validates if the value has the minimum length.\r\n */\r\nconst minLength = (minLength, message = `This field must be at least ${minLength} characters long.`) => (value) => value.length < minLength ? message : null;\r\n/**\r\n * Validation rule to check if the value meets the maximum length requirement.\r\n * @param maxLength - The maximum length allowed.\r\n * @param message - The error message to display if validation fails. Defaults to \"This field must be no more than {maxLength} characters long.\"\r\n * @returns A function that validates if the value has the maximum length.\r\n */\r\nconst maxLength = (maxLength, message = `This field must be no more than ${maxLength} characters long.`) => (value) => value.length > maxLength ? message : null;\r\n/**\r\n * Validation rule to check if the value matches a regular expression pattern.\r\n * @param pattern - The regular expression pattern to match.\r\n * @param message - The error message to display if validation fails. Defaults to \"This field does not match the required pattern.\"\r\n * @returns A function that validates if the value matches the pattern.\r\n */\r\nconst pattern = (pattern, message = \"This field does not match the required pattern.\") => (value) => !pattern.test(value) ? message : null;\r\n/**\r\n * Validation rule to check if the value is a valid email format.\r\n * @param message - The error message to display if validation fails. Defaults to \"This field must be a valid email address.\"\r\n * @returns A function that validates if the value is a valid email.\r\n */\r\nconst email = (message = \"This field must be a valid email address.\") => (value) => !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/.test(value) ? message : null;\r\n\n\n//# sourceURL=webpack://shadow-form-handler/./src/validators/ValidationRules.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;