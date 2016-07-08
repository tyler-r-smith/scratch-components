export default function input_construct_callback(elem, options) {
    elem.label = elem.shadowRoot.children[0].children[0];
    elem.input = elem.shadowRoot.children[0].children[1];
    elem.helperText = elem.shadowRoot.children[0].children[2];
    elem.returnValue = (v) =>  elem.parent.returnValue.call(elem.input, undefined, v);
    elem.getInputName = elem.parent.getInputName.call(elem);
    elem.setValue = value => elem.parent.setInputValue.call(elem, value);
    if (options) {
        if (options.inputAttributes) {
            elem.parent.addAttribute.call(elem.input, options.inputAttributes);
        }
        if (options.label) {
            elem.label.innerHTML = options.label;
        }
    }
}