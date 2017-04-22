const q1s_input = require('./q1s_input').q1s_input;
const input_construct_callback = require('./lib/input_construct_callback').input_construct_callback;


class q1s_checkbox extends q1s_input {
    constructor(obj) {
        obj.inputAttributes = obj.inputAttributes || {};
        obj.inputAttributes.type = "checkbox";
        obj.styles = obj.styles || {};
        super(obj);
        this.constructCallback = (elem, options) => {
            elem.className += " q1sCheckbox ";
            input_construct_callback(elem, options);
            elem.label.addEventListener('click', function(){
                elem.input.checked = elem.input.checked;
            });
            elem.setValue = (value) => {
                elem.input.checked = value;
            }
            elem.returnValue = () => {
                return this.returnValue.call(elem.input, "checked");
            };
            return elem;
        }
    }
}

const checkbox_input = new q1s_checkbox({
    name: "checkbox-input"
});

module.exports = {
    q1s_checkbox,
    checkbox_input
}
