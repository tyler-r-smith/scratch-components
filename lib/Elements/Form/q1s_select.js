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
            const newKey = elem.addStateBinding( "options", "this", (optionString) => {
                let text = (typeof optionString === 'string') ? optionString : optionString.string;
                let value = (typeof optionString === 'string') ? optionString : optionString.value;
                return new Option(text, value)
            }, elem.input);
            elem.options = (options) => {
                elem.state[newKey] = options;
            };
            return elem;
        }
    }
}