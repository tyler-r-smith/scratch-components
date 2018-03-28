const q1s = require('../../q1s').q1s;
const q1s_form_validate = require('./lib/Validate.js').q1s_form_validate;
const validate_required = require('./lib/Validate.js').validate_required;
const addClass = require('../../drag-size-dom/lib/class').addClass;

class q1s_input extends q1s {
    constructor(obj){
        obj.styles = obj.styles || {};
        if (!obj.inputAttributes || !obj.inputAttributes.type) {
            console.error("q1s_inputs must have inputAtrributes.type attached to them");
        }
        super(obj);

        const _this = this;
        this.__proto__.q1s_form_validate = q1s_form_validate;
        this.addFunctionToCallback(function(){
            const input_wrapper = this.parent.createAnElement("div");
            const classPrefix = this.parent.classprefix || "";
            input_wrapper.className =  classPrefix + "form_input_wrapper";
            input_wrapper.className +=  " "+classPrefix + "form_input_wrapper_"+this.parent.inputAttributes.type;

            //Create the correct input element type  for the shadow dom
            if (this.parent.inputAttributes.type === 'select')
                this.input = this.parent.createAnElement("select");
            else
                this.input = this.parent.createAnElement("input");

            this.label = this.parent.createAnElement('label');
            this.helperText = this.parent.createAnElement('helperText');

            //Add the attributes to the elements
            if (this.parent.wrapperAttributes)
                this.parent.addAttribute.call(input_wrapper, this.parent.wrapperAttributes);
            if (this.parent.inputAttributes)
                this.parent.addAttribute.call(this.input, this.parent.inputAttributes);
            if (this.parent.labelAttributes)
                this.parent.addAttribute.call(this.label, this.parent.labelAttributes);
            if (this.parent.helperAttributes)
                this.parent.addAttribute.call(this.helperText, this.parent.helperAttributes);


            //Attach the onchange function to the input, and pass its validity to the function.
            this.input.onchange = function() {
                const error = _this.validateInput.call(this);
                if (_this.onchange && typeof _this.onchange === "function")
                    _this.onchange(error)
                const helperText = this.parentNode.querySelector('.form_input_helpertext');
                const inputLabel = this.parentNode.querySelector('.form_input_label');
                if (this.value === "" && hasClass(this, 'has_value')) {
                    removeClass(this, "has_value")
                } else {
                    addClass(this, "has_value")
                }
                if (error) helperText.innerHTML = error.reason;
                else helperText.innerHTML = "";
                _this.submitForm.call(this, "input-change");
    
            }
            this.input.onkeyup = function(){
                if(event.keyCode == 13){
                    _this.submitForm.call(this, "input-enter");
                }
            }
            this.input.className += " form_input_"+this.input.type;

            this.label.setAttribute('for', this.input.id);
            this.label.innerHTML = this.parent.label || "";
            this.label.className += " form_input_label";

            this.helperText.className += " form_input_helpertext";

            input_wrapper.appendChild(this.input);
            input_wrapper.appendChild(this.label);
            input_wrapper.appendChild(this.helperText);

            this.parent.addElementToShadow.call(this, input_wrapper);
        })

        this.constructCallback = (elem, options) =>{
            elem.returnValue = function () {
                return elem.parent.returnValue.call(elem.input, "value");
            };
            options.inputAttributes = options.inputAttributes || options.inputattributes;
            options.labeltAttributes = options.labeltattributes || options.labeltAttributes;
            options.helperAttributes = options.helperattributes || options.helperattributes;
            //Add the attributes to the elements
            if (options.inputAttributes)
                this.addAttribute.call(elem.input, options.inputAttributes);
            if (options.labeltAttributes)
                this.addAttribute.call(elem.label, options.labeltAttributes);
            if (options.helperAttributes)
                this.addAttribute.call(elem.helperText, options.helperAttributes);
            //input_construct_callback(elem, options);

            if (options.label){
                elem.label.innerHTML = options.label;
            }
            return elem;
        }
    }
    validateInput () {
        return q1s_form_validate.apply(this, arguments);
    }
    getInputName(){
        return this.input.name
    }
    setInputValue(value){
        this.input.value = value;
    }
    returnValue(valueProperty, array){
        //Validate Data before moving forward.
        var _error = q1s_input.prototype.validateInput.call(this);
        if (_error)
            return false;

        array = array || true;
        var name = this.name || "";
        var _return = (array) ? [] : {};
        if (typeof valueProperty === 'function')
            valueProperty = valueProperty(this);
        valueProperty = valueProperty || "value";
        if (array) {
            _return[0] = "_DATA."+name; _return[1] = this[valueProperty]
        } else {
            _return[name] = this[valueProperty] || undefined;
        }
        //
        return _return;
    }
    clearInput(){
        const inputType = this.input.type;
        switch (inputType){
            case "checkbox":
                this.input.checked = false;
                break;
            case "select":
                this.selectIndex = 0;
                break;
            case "file":
                this.imageDisplay.style.backgroundImage = null;
            case "text":
            default:
                this.input.value = "";
                break;
        }
    }
    submitForm(type) {
        if (this.parentNode && this.parentNode.parentNode && this.parentNode.parentNode.host && this.parentNode.parentNode.host.parentNode) {
            let host = this.parentNode.parentNode.host.parentNode;
            if (_.isElement(host) && host.getAttribute('is') === 'q1s-form') {
                host.triggerSubmit(type);
            }
        }
    }
    isQ1sInput(){
        return true;
    }
}

module.exports = {
    q1s_input
}
