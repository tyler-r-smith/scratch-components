var Changeling = require('changeling-proxy').Changeling;
const q1s = require('../../q1s').q1s;
const q1s_checkbox = require('../../../index').q1s_checkbox;
const checkbox_input = require('../../../index').checkbox_input;

class q1s_many_checkboxes extends q1s {
    constructor(obj){
        super(obj);
        this.addFunctionToCallback(() => {
            const title = this.parent.label || "";
            this.titleElem = document.createElement('p');
            this.titleElem.innerHTML = title;
            this.appendChild(this.titleElem);
            //Reactive components
            this.state = new Changeling();
            this.checkboxWrapper = document.createElement('div');
            this.checkboxWrapper.className += " checkboxWrapper ";
            this.namePrefix = (options.namePrefix) ?  options.namePrefix +'.': "";
            this.state._checkboxes = [];
            this.setAttribute("name", this.namePrefix.slice(0, -1));
            const newKey = this.addStateBinding("_checkboxes_",
                (newValue) => {
                    let id = newValue.value || newValue;
                    return "checkbox_"+this.id+"_"+id;
                },
                (newValue, add, allNew, n) => {
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
                            name: this.namePrefix + value,
                            "data-n": value,
                        }
                    })
                return checkbox;
            });
            this.checkboxes = (checkboxes) => {
                this.state[newKey] = checkboxes;
            };
            this._checkboxes = this.checkboxes;

            this.setCheckboxes = function(object){
                _.each(this.querySelectorAll("checkbox-input"), (checkbox) => {
                    checkbox.input.checked = false;
                });
                _.each(object, (checkbox, key) => {
                    const checkboxes = document.getElementsByName(key);
                    _.each(checkboxes, (checkbox) => {
                        checkbox.input.checked = true;
                    })
                });
            }

            this.formatObjectForCheckboxes = function(object, value, label){
                return this.parent.formatObjectForCheckboxes.call(elem, object, value, label);
            }

            this.returnValue = () => "embedded";
            this.hasInputsEmbedded = () => true;
            return elem;
        });
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

module.exports = {
    q1s_many_checkboxes
}
