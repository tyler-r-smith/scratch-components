import { q1s_input } from './q1s_input';
import input_construct_callback from './lib/input_construct_callback.js'
import checkbox_styles from '../../css/q1s_checkboxes'

export class q1s_checkbox extends q1s_input {
    constructor(obj) {
        obj.inputAttributes = obj.inputAttributes || {};
        obj.inputAttributes.type = "checkbox";
        obj.styles = checkbox_styles;
        super(obj);
        this.constructCallback = (elem, options) => {
            input_construct_callback(elem, options);
            elem.label.addEventListener('click', function(){
                elem.input.checked = elem.input.checked;
            });
            elem.setValue = (value) => {
                elem.input.checked = value;
            }
            elem.returnValue = () => {
                //console.log(this.returnValue.call(elem.input, "checked"));
                return this.returnValue.call(elem.input, "checked");
            };
            return elem;
        }
    }
}

export const checkbox_input = new q1s_checkbox({
    name: "checkbox-input"
});