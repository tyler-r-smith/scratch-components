import {q1s_checkbox, checkbox_input} from '/imports/q1s-components'
import {q1s} from '../../q1s';
import {Changeling} from '/imports/api/Changeling.js'

export class q1s_many_checkboxes extends q1s {
    constructor(obj){
        super(obj);
        this.constructCallback = (elem, options) => {
            const title = options.label || "";
            elem.titleElem = document.createElement('p');
            elem.titleElem.innerHTML = title;
            elem.appendChild(elem.titleElem);
            //Reactive components
            elem.state = new Changeling();
            elem.checkboxWrapper = document.createElement('div');
            elem.checkboxWrapper.className += " checkboxWrapper ";
            elem.namePrefix = (options.namePrefix) ?  options.namePrefix +'.': "";
            elem.state._checkboxes = [];
            elem.setAttribute("name", elem.namePrefix.slice(0, -1));
            const newKey = elem.addStateBinding("_checkboxes_", (newValue) => {
                let id = newValue.value || newValue;
                return elem.id+"_"+id;
            }, (newValue, add, allNew, n) => {
                if (!newValue || (newValue.enabled && newValue.enabled === false))
                    return false;
                var value = newValue.value || allNew.indexOf(newValue);
                var label = newValue.label || newValue;
                var checkbox = checkbox_input.construct({
                    label: label,
                    attributes: {
                        name: value
                    },
                    styles: this.checkboxStyles || {},
                    inputAttributes: {
                        value: label,
                        name: elem.namePrefix + value,
                        "data-n": value,
                    }
                })
                return checkbox;
            });
            elem.checkboxes = (checkboxes) => {
                elem.state[newKey] = checkboxes;
            };
            elem._checkboxes = elem.checkboxes;

            elem.setCheckboxes = function(object){
                _.each(elem.querySelectorAll("checkbox-input"), (checkbox) => {
                    checkbox.input.checked = false;
                });
                _.each(object, (checkbox, key) => {
                    const checkboxes = document.getElementsByName(key);
                    _.each(checkboxes, (checkbox) => {
                        checkbox.input.checked = true;
                    })
                });
            }

            elem.formatObjectForCheckboxes = function(object, value, label){
                return elem.parent.formatObjectForCheckboxes.call(elem, object, value, label);
            }

            elem.returnValue = () => "embedded";
            elem.hasInputsEmbedded = () => true;
            return elem;
        }
    }
    formatObjectForCheckboxes(object, value, label){
        let options = [];
        _.each(object, function(thing){
            options.push({
                value: thing[value],
                label: thing[label]
            })
        });
        if (typeof this.checkboxes === 'function')
            return this.checkboxes(options);

        return options;
    }
}
