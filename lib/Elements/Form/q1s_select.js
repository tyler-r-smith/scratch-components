const q1s_input = require('./q1s_input.js').q1s_input;
var Changeling = require('changeling-proxy').Changeling;

class q1s_select extends q1s_input {
    constructor(obj){
        obj.inputAttributes = obj.inputAttributes || {};
        obj.inputAttributes.type = "select";
        super(obj);

        this.addFunctionToCallback(function (elem, options) {
            this.state = new Changeling();
            this.state.options = [];
            this.input.state = new Changeling();
            this.input.addStateBinding = this.addStateBinding.bind(this.input);

            const newKey = this.addStateBinding( "options",
                /* the Id for the elements */
                (newvalue) => {
                    if (typeof newvalue === 'string')
                        return "q1s_"+newvalue.replace(':', "");
                    else
                        return "q1s_" + newvalue.value.replace(':', "");
                },
                /* The returned Elements */
                (optionString) => {
                    let text = (typeof optionString === 'string') ? optionString : optionString.text;
                    let value = (typeof optionString === 'string') ? optionString : optionString.value;
                    const option = new Option(text, value);
                    return option;
                },
                /* Even though we running the state binding on the parent elem, we bind it to the input elem */
                this.input);

            this.formatObjectForOptions = function(object, value, text){
                return this.parent.formatObjectForOptions.call(elem, object, value, text)
            };

            this.input.setAttribute("type", "select");
        })
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

module.exports = {
    q1s_select
}
