import { q1s_input } from './q1s_input';
import {Changeling} from '/imports/api/Changeling.js'
import input_construct_callback from './lib/input_construct_callback.js'

export class q1s_select extends q1s_input {
    constructor(obj){
        obj.inputAttributes = obj.inputAttributes || {};
        obj.inputAttributes.type = "select";
        super(obj);

        this.constructCallback = (elem, options) => {
            input_construct_callback(elem, options);
            const newKey = elem.addStateBinding( "options", (newvalue) => {
                if (typeof newvalue === 'string')
                    return "q1s_"+newvalue;
                else
                    return "q1s_" + newvalue.value;
            }, (optionString) => {
                let text = (typeof optionString === 'string') ? optionString : optionString.text;
                let value = (typeof optionString === 'string') ? optionString : optionString.value;
                return new Option(text, value)
            }, elem.input);

            elem.options = (options) => {
                elem.state[newKey] = options;
            };

            elem.formatObjectForOptions = function(object, value, text){
                return elem.parent.formatObjectForOptions.call(elem, object, value, text)
            }

            elem.input.setAttribute("type", "select");

            return elem;
        }
    }
    formatObjectForOptions(object, value, text){
        let options = [];
        _.each(object, function(thing){
            options.push({
                value: thing[value],
                text: thing[text]
            })
        });
        if (typeof this.options === 'function')
            return this.options(options);

        return options;
    }
}