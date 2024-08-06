(()=>{"use strict";var e={12:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ErrorHandler=void 0;var n=function(){function e(){this.errorStyles={property:" ",value:""}}return e.prototype.setErrorStyles=function(e){this.errorStyles=e},e.prototype.applyStyles=function(e){for(var t=0,n=Object.entries(this.errorStyles);t<n.length;t++){var r=n[t],i=r[0],o=r[1];e.style[i]=o}},e.prototype.displayErrors=function(e){var t=this;e.forEach((function(e){var n=document.getElementById("".concat(e.id,"-error"));n&&(n.textContent=e.error||"",t.applyStyles(n))}))},e.prototype.clearErrors=function(){document.querySelectorAll(".error-message").forEach((function(e){e.textContent="",e.style.display="none"}))},e}();t.ErrorHandler=n},818:function(e,t){var n=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(i,o){function a(e){try{s(r.next(e))}catch(e){o(e)}}function l(e){try{s(r.throw(e))}catch(e){o(e)}}function s(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,l)}s((r=r.apply(e,t||[])).next())}))},r=this&&this.__generator||function(e,t){var n,r,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function l(l){return function(s){return function(l){if(n)throw new TypeError("Generator is already executing.");for(;o&&(o=0,l[0]&&(a=0)),a;)try{if(n=1,r&&(i=2&l[0]?r.return:l[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,l[1])).done)return i;switch(r=0,i&&(l=[2&l[0],i.value]),l[0]){case 0:case 1:i=l;break;case 4:return a.label++,{value:l[1],done:!1};case 5:a.label++,r=l[1],l=[0];continue;case 7:l=a.ops.pop(),a.trys.pop();continue;default:if(!((i=(i=a.trys).length>0&&i[i.length-1])||6!==l[0]&&2!==l[0])){a=0;continue}if(3===l[0]&&(!i||l[1]>i[0]&&l[1]<i[3])){a.label=l[1];break}if(6===l[0]&&a.label<i[1]){a.label=i[1],i=l;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(l);break}i[2]&&a.ops.pop(),a.trys.pop();continue}l=t.call(e,a)}catch(e){l=[6,e],r=0}finally{n=i=0}if(5&l[0])throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}([l,s])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.EventManager=void 0;var i=function(){function e(e,t,n){this.fieldManager=e,this.validator=t,this.hooksHandler=n}return e.prototype.addRuntimeValidation=function(e){var t=document.getElementById(e);t&&t.addEventListener("input",this.handleInputChange.bind(this))},e.prototype.handleInputChange=function(e){return n(this,void 0,void 0,(function(){var t,n,i,o;return r(this,(function(r){switch(r.label){case 0:return t=e.target,n=this.fieldManager.getField(t.id),i=this.fieldManager.getAllFields(),n?(n.value=t.value,(o=this.hooksHandler.getHooks()).onValueChange&&o.onValueChange(n,i),[4,this.validator.validateField(n.id)]):[2];case 1:return r.sent(),[2]}}))}))},e.prototype.addCustomEventListener=function(e,t,n){var r=document.getElementById(e);r?r.addEventListener(t,n):console.error('Input element with id "'.concat(e,'" not found.'))},e}();t.EventManager=i},165:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.FieldManager=void 0;var n=function(){function e(e){this.hooksHandler=e,this.fields=[]}return e.prototype.register=function(e){var t=e.id,n=e.schemaValidation,r=e.customValidation,i=e.initialValue;this.fields.push({id:t,value:i||"",error:null,schemaValidation:n,customValidation:r});var o=document.getElementById(t);if(!o)throw new Error("Input element with id ".concat(t," not found"));i&&(o.value=i)},e.prototype.removeField=function(e){var t=document.getElementById(e.fieldId);if(t){if(e.disabledId){var n=document.getElementById(e.disabledId);n&&(n.disabled=!0)}this.fields=this.fields.filter((function(t){return t.id!==e.fieldId}));var r=document.getElementById("".concat(e.fieldId,"-error")),i=document.querySelector('label[for="'.concat(e.fieldId,'"]'));t.remove(),null==r||r.remove(),null==i||i.remove()}else console.error("Element with id ".concat(e.fieldId," not found."))},e.prototype.addField=function(e){var t,n,r;if(document.getElementById(e.fieldId))console.warn("Field with id ".concat(e.fieldId," already exists. Skipping creation."));else{if(e.disabledId){var i=document.getElementById(e.disabledId);i&&(i.disabled=!0)}var o=document.getElementById(e.containerId);if(!o)throw new Error("Container element with id ".concat(e.containerId," not found"));var a=document.createElement("div"),l=document.createElement("label"),s=document.createElement("input"),u=document.createElement("span");if(l.setAttribute("for",e.fieldId),l.textContent=e.labelText,s.setAttribute("id",e.fieldId),s.setAttribute("name",e.fieldId),s.setAttribute("type","text"),u.setAttribute("id","".concat(e.fieldId,"-error")),u.classList.add("error-message"),a.appendChild(l),a.appendChild(s),a.appendChild(u),e.position)if("top"===e.position)o.insertBefore(a,o.firstChild);else if("bottom"===e.position)o.appendChild(a);else{if(!("number"==typeof e.position&&e.position>=0))throw new Error("Invalid position value: ".concat(e.position));var d=o.children[e.position];d&&o.insertBefore(a,d)}else o.appendChild(a);this.register({id:e.fieldId,initialValue:(null===(t=e.register)||void 0===t?void 0:t.initialValue)||"",schemaValidation:(null===(n=e.register)||void 0===n?void 0:n.schemaValidation)||[],customValidation:(null===(r=e.register)||void 0===r?void 0:r.customValidation)||[]})}},e.prototype.getField=function(e){return this.fields.find((function(t){return t.id===e}))},e.prototype.getAllFields=function(){return this.fields},e.prototype.setValue=function(e,t){console.log("dd");var n=this.getField(e);this.getAllFields(),n&&(this.hooksHandler.getHooks(),n.value=t)},e.prototype.getValue=function(e){var t=this.getField(e);return null==t?void 0:t.value},e.prototype.getValues=function(){var e={};return this.fields.forEach((function(t){e[t.id]=t.value})),e},e.prototype.resetFields=function(){this.fields.forEach((function(e){e.value="",e.error=null;var t=document.getElementById(e.id);t&&(t.value="")}))},e.prototype.hasErrors=function(){return this.fields.some((function(e){return null!==e.error}))},e}();t.FieldManager=n},830:function(e,t,n){var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(i,o){function a(e){try{s(r.next(e))}catch(e){o(e)}}function l(e){try{s(r.throw(e))}catch(e){o(e)}}function s(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,l)}s((r=r.apply(e,t||[])).next())}))},i=this&&this.__generator||function(e,t){var n,r,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function l(l){return function(s){return function(l){if(n)throw new TypeError("Generator is already executing.");for(;o&&(o=0,l[0]&&(a=0)),a;)try{if(n=1,r&&(i=2&l[0]?r.return:l[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,l[1])).done)return i;switch(r=0,i&&(l=[2&l[0],i.value]),l[0]){case 0:case 1:i=l;break;case 4:return a.label++,{value:l[1],done:!1};case 5:a.label++,r=l[1],l=[0];continue;case 7:l=a.ops.pop(),a.trys.pop();continue;default:if(!((i=(i=a.trys).length>0&&i[i.length-1])||6!==l[0]&&2!==l[0])){a=0;continue}if(3===l[0]&&(!i||l[1]>i[0]&&l[1]<i[3])){a.label=l[1];break}if(6===l[0]&&a.label<i[1]){a.label=i[1],i=l;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(l);break}i[2]&&a.ops.pop(),a.trys.pop();continue}l=t.call(e,a)}catch(e){l=[6,e],r=0}finally{n=i=0}if(5&l[0])throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}([l,s])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.FormHandler=void 0;var o=n(165),a=n(726),l=n(12),s=n(818),u=n(466),d=function(){function e(){this.mode="default",this.hooksHandler=new u.HooksHandler,this.errorHandler=new l.ErrorHandler,this.fieldManager=new o.FieldManager(this.hooksHandler),this.validator=new a.Validator(this.fieldManager,this.errorHandler,this.hooksHandler),this.eventManager=new s.EventManager(this.fieldManager,this.validator,this.hooksHandler)}return e.prototype.register=function(e){this.fieldManager.register(e),"runtime"===this.mode&&this.eventManager.addRuntimeValidation(e.id)},e.prototype.setMode=function(e){this.mode=e},e.prototype.submitHandler=function(e,t){var n=this,o=document.getElementById(e);if(!o)throw new Error("Form not found. Please ensure the form ID is correct!");o.addEventListener("submit",(function(e){return r(n,void 0,void 0,(function(){var n;return i(this,(function(r){switch(r.label){case 0:return e.preventDefault(),[4,this.validator.validateAll()];case 1:return r.sent(),n=this.fieldManager.getValues(),this.fieldManager.hasErrors()?this.errorHandler.displayErrors(this.fieldManager.getAllFields()):t&&t(n),[2]}}))}))}))},e.prototype.getValue=function(e){return this.fieldManager.getValue(e)},e.prototype.getValues=function(){return this.fieldManager.getValues()},e.prototype.resetForm=function(){this.fieldManager.resetFields(),this.errorHandler.clearErrors()},e.prototype.removeField=function(e){this.fieldManager.removeField(e)},e.prototype.addField=function(e){this.fieldManager.addField(e),"runtime"===this.mode&&this.eventManager.addRuntimeValidation(e.fieldId),this.errorHandler.displayErrors(this.fieldManager.getAllFields())},e.prototype.setErrorStyles=function(e){this.errorHandler.setErrorStyles(e)},e.prototype.addHooks=function(e){console.log("hooks"),this.hooksHandler.addHooks(e)},e.prototype.addCustomEventListener=function(e,t,n){this.eventManager.addCustomEventListener(e,t,n)},e}();t.FormHandler=d},466:function(e,t){var n=this&&this.__assign||function(){return n=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},n.apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0}),t.HooksHandler=void 0;var r=function(){function e(){this.hooks={}}return e.prototype.addHooks=function(e){this.hooks=n(n({},this.hooks),e)},e.prototype.getHooks=function(){return this.hooks},e}();t.HooksHandler=r},726:function(e,t){var n=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(i,o){function a(e){try{s(r.next(e))}catch(e){o(e)}}function l(e){try{s(r.throw(e))}catch(e){o(e)}}function s(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,l)}s((r=r.apply(e,t||[])).next())}))},r=this&&this.__generator||function(e,t){var n,r,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function l(l){return function(s){return function(l){if(n)throw new TypeError("Generator is already executing.");for(;o&&(o=0,l[0]&&(a=0)),a;)try{if(n=1,r&&(i=2&l[0]?r.return:l[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,l[1])).done)return i;switch(r=0,i&&(l=[2&l[0],i.value]),l[0]){case 0:case 1:i=l;break;case 4:return a.label++,{value:l[1],done:!1};case 5:a.label++,r=l[1],l=[0];continue;case 7:l=a.ops.pop(),a.trys.pop();continue;default:if(!((i=(i=a.trys).length>0&&i[i.length-1])||6!==l[0]&&2!==l[0])){a=0;continue}if(3===l[0]&&(!i||l[1]>i[0]&&l[1]<i[3])){a.label=l[1];break}if(6===l[0]&&a.label<i[1]){a.label=i[1],i=l;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(l);break}i[2]&&a.ops.pop(),a.trys.pop();continue}l=t.call(e,a)}catch(e){l=[6,e],r=0}finally{n=i=0}if(5&l[0])throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}([l,s])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.Validator=void 0;var i=function(){function e(e,t,n){this.fieldManager=e,this.errorHandler=t,this.hooksHandler=n}return e.prototype.validateAll=function(){return n(this,void 0,void 0,(function(){var e,t,n,i,o;return r(this,(function(r){switch(r.label){case 0:e=this.fieldManager.getAllFields(),(t=this.hooksHandler.getHooks()).beforeValidate&&t.beforeValidate(e),n=0,i=e,r.label=1;case 1:return n<i.length?(o=i[n],[4,this.validateField(o.id)]):[3,4];case 2:r.sent(),r.label=3;case 3:return n++,[3,1];case 4:return t.afterValidate&&t.afterValidate(e),[2]}}))}))},e.prototype.validateField=function(e){return n(this,void 0,void 0,(function(){var t,n,i;return r(this,(function(r){switch(r.label){case 0:return(t=this.fieldManager.getField(e))?(n=this.validateFieldSchema(t))?(this.updateFieldError(t,n),[2]):[4,this.validateCustomValidator(t)]:[2];case 1:return i=r.sent(),this.updateFieldError(t,i),[2]}}))}))},e.prototype.validateFieldSchema=function(e){if(e.schemaValidation)for(var t=0,n=e.schemaValidation;t<n.length;t++){var r=(0,n[t])(e.value);if(r)return r}return null},e.prototype.validateCustomValidator=function(e){return n(this,void 0,void 0,(function(){var t,i=this;return r(this,(function(o){switch(o.label){case 0:return e.customValidation?(t=e.customValidation.map((function(t){var o=t.validate,a=t.message,l=t.depends;return n(i,void 0,void 0,(function(){var t;return r(this,(function(n){switch(n.label){case 0:if("function"!=typeof o)return console.error("Invalid validate function for field ".concat(e.id)),[2,"Validation function is not defined correctly."];n.label=1;case 1:return n.trys.push([1,3,,4]),[4,Promise.race([Promise.resolve(o(e.value)),new Promise((function(e,t){return setTimeout((function(){return t(new Error("Validation timeout"))}),5e3)}))])];case 2:return n.sent()?[3,4]:(l&&this.setupDependentValidation(e,l,o,a),[2,a]);case 3:return t=n.sent(),console.error("Validation error for field ".concat(e.id,":"),t),[2,"Validation timeout"===t?"Validation took too long. Please try again.":"An unexpected error occurred during validation."];case 4:return[2,null]}}))}))})),[4,Promise.all(t)]):[2,null];case 1:return[2,o.sent().find((function(e){return null!==e}))||null]}}))}))},e.prototype.setupDependentValidation=function(e,t,i,o){var a=this;if(this.fieldManager.getField(t)){var l=function(){return n(a,void 0,void 0,(function(){var t,n;return r(this,(function(r){switch(r.label){case 0:return r.trys.push([0,2,,3]),[4,Promise.resolve(i(e.value))];case 1:return t=r.sent(),this.updateFieldError(e,t?null:o),[3,3];case 2:return n=r.sent(),console.error("Validation error on change for field ".concat(e.id,":"),n),this.updateFieldError(e,"An unexpected error occurred during validation."),[3,3];case 3:return[2]}}))}))},s=document.getElementById(t);s&&(s.removeEventListener("input",l),s.addEventListener("input",l))}},e.prototype.updateFieldError=function(e,t){e.error=t,this.errorHandler.displayErrors(this.fieldManager.getAllFields())},e}();t.Validator=i},100:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.email=t.pattern=t.maxLength=t.minLength=t.required=void 0,t.required=function(e){return void 0===e&&(e="This field is required."),function(t){return t?null:e}},t.minLength=function(e,t){return void 0===t&&(t="This field must be at least ".concat(e," characters long.")),function(n){return n.length<e?t:null}},t.maxLength=function(e,t){return void 0===t&&(t="This field must be no more than ".concat(e," characters long.")),function(n){return n.length>e?t:null}},t.pattern=function(e,t){return void 0===t&&(t="This field does not match the required pattern."),function(n){return e.test(n)?null:t}},t.email=function(e){return void 0===e&&(e="This field must be a valid email address."),function(t){return/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(t)?null:e}}}},t={};function n(r){var i=t[r];if(void 0!==i)return i.exports;var o=t[r]={exports:{}};return e[r].call(o.exports,o,o.exports,n),o.exports}var r={};(()=>{var e=r;Object.defineProperty(e,"__esModule",{value:!0});var t=n(830),i=n(100);window.shadowFormHandler={FormHandler:t.FormHandler,required:i.required,minLength:i.minLength,maxLength:i.maxLength,pattern:i.pattern,email:i.email}})(),module.exports=r})();