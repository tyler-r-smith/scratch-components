const Q1S = require('./lib/q1s.js').q1s;
const _ = require('underscore');

class LayoutY extends Q1S {
    constructor(obj) {
        super(obj);
        this.addFunctionToCallback(function constructLayoutY() {
            this.heightPercentage = obj.heightPercentage || 1; // function or number;
            this.fixedReducedHeight = obj.fixedReducedHeight || 0; // function or number;
            if (this.heightPercentage === 1 && this.fixedReducedHeight > 0){
                this.style.height = `calc(100% - ${this.fixedReducedHeight}px)`;
            } else {
                this.windowChange = () => {
                    const fixedReducedHeight = (typeof this.fixedReducedHeight === 'function') ?
                        this.fixedReducedHeight() :
                        this.fixedReducedHeight;
                    const heightPercentage = (typeof this.heightPercentage === 'function') ?
                        this.heightPercentage() :
                        this.heightPercentage;
                    const height = (typeof this.maxHeight === 'function') ?
                        this.maxHeight() :
                    this.maxHeight ||
                        document.body.clientHeight;
                    if (heightPercentage === 1 && fixedReducedHeight > 0) {
                        this.style.height = `calc(100% - ${fixedReducedHeight}px)`;
                    } else {
                        const elemHeight = (height - fixedReducedHeight) * heightPercentage;
                        this.style.height = elemHeight + "px";
                    }
                };
                window.addEventListener('resize', this.windowChange);
                this.windowChange();
            }
        });
    }
}

class LayoutMinusX extends LayoutY {
    constructor(obj) {
        super(obj);
        this.addFunctionToCallback(function () {
            this.fixedReducedHeight = () => {
                let reduce = 0;
                const _ = require('underscore');

                _.each(this.minus, (value) => {

                    if (_.isElement(value)) {
                        reduce += value.clientHeight;
                    }
                });
                return reduce;
            };
        });
    }
}


module.exports = {
    Q1S: Q1S,
    Q1SForm: require('./lib/Elements/Form/q1s_form.js').q1s_form,
    Q1SInput: require('./lib/Elements/Form/q1s_input.js').q1s_input,
    Q1SCheckbox: require('./lib/Elements/Form/q1s_checkbox').checkbox_input,
    Q1SManyCheckbox: require('./lib/Elements/Form/q1s_many_checkboxes').q1s_many_checkboxes,
    Q1SSelect: require('./lib/Elements/Form/q1s_select').q1s_select,
    Q1SFileInput: require("./lib/Elements/Form/q1s_fileinput").q1s_fileinput,
    Q1SHiddenInput: require('./lib/Elements/Form/q1s_hidden').q1s_hiddenInput,
    Q1SDrag: require('./lib/Elements/Maliable/Dragable').q1s_dragable,
    Q1SImageWithTitle: require('./lib/Elements/Gallery/imageWithTitle').q1s_imageWithTitle,
    Q1SGallery: require("./lib/Elements/Gallery/Gallery").q1s_gallery,
    Q1SMenu: require("./lib/Elements/navigation/menu").Q1SMenu,
    Q1SLayoutY:LayoutY,
    Q1SLayoutMinusX:LayoutMinusX,
}
