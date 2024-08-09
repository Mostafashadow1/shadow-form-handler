(()=>{"use strict";class e{constructor(){this.fields=[]}register(e){const{id:t,schemaValidation:i,customValidation:r,initialValue:n}=e;this.fields.push({id:t,value:n||"",error:null,schemaValidation:i,customValidation:r});const a=document.getElementById(t);if(!a)throw new Error(`Input element with id ${t} not found`);a.addEventListener("input",(({target:t})=>{this.setValue(e.id,t.value)})),n&&(a.value=n)}removeField(e){const t=document.getElementById(e.fieldId);if(!t)return void console.error(`Element with id ${e.fieldId} not found.`);if(e.disabledId){const t=document.getElementById(e.disabledId);t&&(t.disabled=!0)}this.fields=this.fields.filter((t=>t.id!==e.fieldId));const i=document.getElementById(`${e.fieldId}-error`),r=document.querySelector(`label[for="${e.fieldId}"]`);t.remove(),i?.remove(),r?.remove()}addField(e){if(document.getElementById(e.fieldId))return void console.warn(`Field with id ${e.fieldId} already exists. Skipping creation.`);if(e.disabledId){const t=document.getElementById(e.disabledId);t&&(t.disabled=!0)}const t=document.getElementById(e.containerId);if(!t)throw new Error(`Container element with id ${e.containerId} not found`);const i=document.createElement("div"),r=document.createElement("label"),n=document.createElement("input"),a=document.createElement("span");if(r.setAttribute("for",e.fieldId),r.textContent=e.labelText,n.setAttribute("id",e.fieldId),n.setAttribute("name",e.fieldId),n.setAttribute("type","text"),a.setAttribute("id",`${e.fieldId}-error`),a.classList.add("error-message"),i.appendChild(r),i.appendChild(n),i.appendChild(a),e.position)if("top"===e.position)t.insertBefore(i,t.firstChild);else if("bottom"===e.position)t.appendChild(i);else{if(!("number"==typeof e.position&&e.position>=0))throw new Error(`Invalid position value: ${e.position}`);{const r=t.children[e.position];r&&t.insertBefore(i,r)}}else t.appendChild(i);this.register({id:e.fieldId,initialValue:e.register?.initialValue||"",schemaValidation:e.register?.schemaValidation||[],customValidation:e.register?.customValidation||[]})}getField(e){return this.fields.find((t=>t.id===e))}getAllFields(){return this.fields}setValue(e,t){const i=this.getField(e);i&&(i.value=t)}getValue(e){const t=this.getField(e);return t?.value}getValues(){const e={};return this.fields.forEach((t=>{e[t.id]=t.value})),e}resetFields(){this.fields.forEach((e=>{e.value="",e.error=null;const t=document.getElementById(e.id);t&&(t.value="")}))}hasErrors(){return this.fields.some((e=>null!==e.error))}}class t{constructor(e,t,i){this.fieldManager=e,this.errorHandler=t,this.hooksHandler=i}async validateAll(){const e=this.fieldManager.getAllFields(),t=this.hooksHandler.getHooks();t.beforeValidate&&t.beforeValidate(e);for(const t of e)await this.validateField(t.id);t.afterValidate&&t.afterValidate(e)}async validateField(e){const t=this.fieldManager.getField(e);if(!t)return;const i=this.validateFieldSchema(t);if(i)return void this.updateFieldError(t,i);const r=await this.validateCustomValidator(t);this.updateFieldError(t,r)}validateFieldSchema(e){if(e.schemaValidation)for(const t of e.schemaValidation){const i=t(e.value);if(i)return i}return null}async validateCustomValidator(e){if(!e.customValidation)return null;const t=e.customValidation.map((async({validate:t,message:i,depends:r})=>{if("function"!=typeof t)return console.error(`Invalid validate function for field ${e.id}`),"Validation function is not defined correctly.";try{if(!await Promise.race([Promise.resolve(t(e.value)),new Promise(((e,t)=>setTimeout((()=>t(new Error("Validation timeout"))),5e3)))]))return r&&this.setupDependentValidation(e,r,t,i),i}catch(t){return console.error(`Validation error for field ${e.id}:`,t),"Validation timeout"===t?"Validation took too long. Please try again.":"An unexpected error occurred during validation."}return null}));return(await Promise.all(t)).find((e=>null!==e))||null}setupDependentValidation(e,t,i,r){if(!this.fieldManager.getField(t))return;const n=async()=>{try{const t=await Promise.resolve(i(e.value));this.updateFieldError(e,t?null:r)}catch(t){console.error(`Validation error on change for field ${e.id}:`,t),this.updateFieldError(e,"An unexpected error occurred during validation.")}},a=document.getElementById(t);a&&(a.removeEventListener("input",n),a.addEventListener("input",n))}updateFieldError(e,t){e.error=t,this.errorHandler.displayErrors(this.fieldManager.getAllFields())}}class i{constructor(){this.errorStyles={property:" ",value:""}}setErrorStyles(e){this.errorStyles=e}applyStyles(e){for(const[t,i]of Object.entries(this.errorStyles))e.style[t]=i}displayErrors(e){e.forEach((e=>{const t=document.getElementById(`${e.id}-error`);t&&(t.textContent=e.error||"",this.applyStyles(t))}))}clearErrors(){document.querySelectorAll(".error-message").forEach((e=>{e.textContent="",e.style.display="none"}))}}class r{constructor(e,t,i){this.fieldManager=e,this.validator=t,this.hooksHandler=i}addRuntimeValidation(e){const t=document.getElementById(e);t&&t.addEventListener("input",this.handleInputChange.bind(this))}async handleInputChange(e){const t=e.target,i=this.fieldManager.getField(t.id),r=this.fieldManager.getAllFields();if(!i)return;i.value=t.value;const n=this.hooksHandler.getHooks();n.onValueChange&&n.onValueChange(i,r),await this.validator.validateField(i.id)}addCustomEventListener(e,t,i){const r=document.getElementById(e);r?r.addEventListener(t,i):console.error(`Input element with id "${e}" not found.`)}}class n{constructor(){this.hooks={}}addHooks(e){this.hooks={...this.hooks,...e}}getHooks(){return this.hooks}}"undefined"!=typeof window&&(window.shadowFormHandler={FormHandler:class{constructor(){this.mode="default",this.hooksHandler=new n,this.errorHandler=new i,this.fieldManager=new e,this.validator=new t(this.fieldManager,this.errorHandler,this.hooksHandler),this.eventManager=new r(this.fieldManager,this.validator,this.hooksHandler)}register(e){this.fieldManager.register(e),"runtime"===this.mode&&this.eventManager.addRuntimeValidation(e.id)}setMode(e){this.mode=e}submitHandler(e,t){const i=document.getElementById(e);if(!i)throw new Error("Form not found. Please ensure the form ID is correct!");i.addEventListener("submit",(async e=>{e.preventDefault(),await this.validator.validateAll();const i=this.fieldManager.getValues();this.fieldManager.hasErrors()?this.errorHandler.displayErrors(this.fieldManager.getAllFields()):t&&t(i)}))}getValue(e){return this.fieldManager.getValue(e)}getValues(){return this.fieldManager.getValues()}resetForm(){this.fieldManager.resetFields(),this.errorHandler.clearErrors()}removeField(e){this.fieldManager.removeField(e)}addField(e){this.fieldManager.addField(e),"runtime"===this.mode&&this.eventManager.addRuntimeValidation(e.fieldId),this.errorHandler.displayErrors(this.fieldManager.getAllFields())}setErrorStyles(e){this.errorHandler.setErrorStyles(e)}addHooks(e){this.hooksHandler.addHooks(e)}addCustomEventListener(e,t,i){this.eventManager.addCustomEventListener(e,t,i)}},required:(e="This field is required.")=>t=>t?null:e,minLength:(e,t=`This field must be at least ${e} characters long.`)=>i=>i.length<e?t:null,maxLength:(e,t=`This field must be no more than ${e} characters long.`)=>i=>i.length>e?t:null,pattern:(e,t="This field does not match the required pattern.")=>i=>e.test(i)?null:t,email:(e="This field must be a valid email address.")=>t=>/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(t)?null:e})})();