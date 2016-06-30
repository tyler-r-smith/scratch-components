import {q1s} from '../../q1s.js'
import {dotStringToObject} from 'meteor/tylerrsmith:functionhelpers';

export class q1s_form extends q1s {
    constructor(obj){
        obj._proto = 'form';
        obj.constructCallbackAppend = obj.constructCallback || false;
        super(obj)
        this.addFunctionToCallback(function(){

        });
        
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
        
        this.constructCallback = (elem, options) => {
            elem.parent = this;
            elem.addEventListener("submit", (e) => {
                e.preventDefault();
                const data = elem.parent.aggregateData.call(elem);
                //console.log(data);
                for (var n = 0; n < this.submitCallback.length; n++){
                    if (_.isFunction(this.submitCallback[n]))
                        this.submitCallback[n].call(elem, data);
                }
                return false;
            });
            elem.triggerSubmit = (type) => {
                this.triggerSubmit.call(elem, type)
            };
            elem.setFieldsValue = values => elem.parent.setFieldsValue.call(elem, values);

            if (_.isFunction(this.constructCallbackAppend))
                return this.constructCallbackAppend(elem, options);
            return elem;
        };
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
            if (NodesToIterate[0].parent && NodesToIterate[0].parent.isQ1s()) {
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
                            console.log(innerElement, key, value[key])
                            innerElement.setValue(value[key][secondaryKey])
                        }
                    }
                }
                else
                {
                    console.log(formElement, key, value[key])
                    formElement.setValue(value[key])
                }
            }
        }
    }
    clearFields () {
        var NodesToIterate = Array.prototype.slice.apply(this.childNodes);
        while (NodesToIterate[0]) {
            console.log(NodesToIterate);
            if (NodesToIterate[0].parent && NodesToIterate[0].parent.isQ1s()) {
                if (NodesToIterate[0].hasInputsEmbedded && NodesToIterate[0].hasInputsEmbedded())
                    NodesToIterate.splice(NodesToIterate.length, 0, ...Array.prototype.slice.apply(NodesToIterate[0].childNodes));
                else if (NodesToIterate[0].getAttribute("data-clear") !== "false")
                    NodesToIterate[0].parent.clearInput.call(NodesToIterate[0]);
            }
            NodesToIterate.splice(0, 1)
        }
    }
    
}