const q1s = require('../../q1s.js').q1s;
const dotStringToObject = require("./lib/dotStringToObject.js").dotStringToObject;
const _ = require('underscore');

class q1s_form extends q1s {
    constructor(obj){
        obj._proto = 'form';
        obj.constructCallbackAppend = obj.constructCallback || false;
        obj.createShadow = obj.createShadow || false;
        super(obj)
        this.addFunctionToCallback(function(){});
        
        if (this.submitCallback) {
            if (_.isFunction(this.submitCallback)){
                this.submitCallback = [this.submitCallback];
            } else if (!_.isArray(this.submitCallback)){
                if (!typeof this.submitCallback === 'undefined')
                    console.warn("submitCallback must be either an array or an object");
                    
                this.submitCallback = [];
            }
        } else {
            this.submitCallback = [];
        }

        this.addFunctionToCallback(function () {
            //The Initial submit function
            this.addEventListener("submit", (e) => {
                e.preventDefault();
                const data = this.parent.aggregateData.call(this);
                //
                const submitCallbacks = _.union(this.submitCallback, this.parent.submitCallback);
                for (var n = submitCallbacks.length - 1; n >= 0; n--){
                    if (_.isFunction(submitCallbacks[n]))
                        submitCallbacks[n].call(this, data);
                }
                this.clearFields();
                return false;
            });
            this.addFunctionToSubmitCallback = (ƒ) => this.parent.addFunctionToSubmitCallback.call(this, ƒ);

            this.triggerSubmit = (type) => {
                this.triggerSubmit.call(this, type)
            };
            this.setFieldsValue = values => this.parent.setFieldsValue.call(this, values);

            this.clearFields = _ => this.parent.clearFields.call(this);


            if (_.isFunction(this.constructCallbackAppend))
                return this.constructCallbackAppend(this, options);
        });
        this.allowedTriggers =  this.allowedTriggers || ['input-enter'];
    }
    addFunctionToSubmitCallback(ƒ) {
        if (_.isArray(this.submitCallback)){
            this.submitCallback.push(ƒ)
        } else {
            this.submitCallback = [ƒ]
        }
    }
    triggerSubmit(type) {
        let allowedTriggers = this.allowedTriggers || this.parent.allowedTriggers;
        if (_.isArray(allowedTriggers) && allowedTriggers.indexOf(type) !== -1) {
            if (this) {
                var submit = this.querySelector('input[type="submit"]')
                if (_.isElement(submit) && submit.click)
                    submit.click();
            }
        }
    }
    aggregateData(){
        var data = {};
        let error = false;
        var NodesToIterate = Array.prototype.slice.apply(this.childNodes);
        while (NodesToIterate[0]) {
            if (NodesToIterate[0].parent && ((NodesToIterate[0].parent.isQ1sInput &&NodesToIterate[0].parent.isQ1sInput()) || (NodesToIterate[0].parent.isQ1sInput && NodesToIterate[0].parent.isQ1sInput()) )) {
                var _nodeValue =   NodesToIterate[0].returnValue();
                if (_nodeValue === "embedded")
                    NodesToIterate.splice(NodesToIterate.length, 0, ...Array.prototype.slice.apply(NodesToIterate[0].childNodes));
                else if (_nodeValue !== false && _nodeValue[1] !== false) {
                    data = dotStringToObject(_nodeValue[0], _nodeValue[1], data);
                } else if (_nodeValue[1] !== false)
                    error = true;
            }
            NodesToIterate.splice(0, 1)
        }

        if (error)
            return false;
        return data;
    }
    setFieldsValue(value){
        for (var key in value){
            let formElement = this.getElementsByName(key);
            if (formElement) {
                if (_.isObject(value[key])){
                    for (var secondaryKey in value[key]){
                        let innerElement = formElement.getElementsByName(secondaryKey)
                        if (innerElement) {
                            innerElement.setValue(value[key][secondaryKey])
                        }
                    }
                }
                else
                {
                    formElement.setValue(value[key])
                }
            }
        }
    }
    clearFields () {
        var NodesToIterate = Array.prototype.slice.apply(this.childNodes);
        while (NodesToIterate[0]) {
            if (NodesToIterate[0].parent && NodesToIterate[0].parent.isQ1s()) {
                if (NodesToIterate[0].hasInputsEmbedded && NodesToIterate[0].hasInputsEmbedded())
                    NodesToIterate.splice(NodesToIterate.length, 0, ...Array.prototype.slice.apply(NodesToIterate[0].childNodes));
                else if (NodesToIterate[0].getAttribute("data-clear") !== "false" && NodesToIterate[0].parent.clearInput)
                    NodesToIterate[0].parent.clearInput.call(NodesToIterate[0]);
            }
            NodesToIterate.splice(0, 1)
        }
    }
}

module.exports = {
    q1s_form
}
