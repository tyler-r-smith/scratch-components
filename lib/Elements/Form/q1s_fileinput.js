const q1s_input = require('./q1s_input').q1s_input;
const readUrl = require('./lib/readFileInput').readURL;
const readBinaryString = require('./lib/readFileInput').readBinaryString;

class q1s_fileinput extends q1s_input {
    constructor(obj){
        obj.inputAttributes = obj.inputAttributes || {};
        obj.inputAttributes.type = "file";
        super(obj)
        this.addFunctionToCallback(function() {
            this.imageDisplay = document.createElement('div');
            this.imageDisplay.className = 'form_input_imageDisplay';
            this.input.parentNode.insertBefore(this.imageDisplay, this.input);
            this.className += " q1sInput ";
            this.returnValue = (v) => this.parent.returnValue.call(this.input, undefined, v);

            this.input.FileData = {};
            this.input.FileData.file = 'nothing here :(';
            this.input.onchange = () => {
                readUrl(this.input, this.imageDisplay);
                readBinaryString(this.input, this.input.FileData);
            };
            const _this = this;
            new Drop({
                target: this.imageDisplay,
                content: function () {
                    const image = document.createElement('img');
                    //readUrl(_this.input, image, false);
                    image.className = "imageDisplayLarge";
                    return image;
                },
                position: 'bottom left',
                openOn: 'hover',
                remove: true,
                tetherOptions: {
                    constraints: [
                        {
                            to: 'scrollParent',
                            pin: true
                        },
                        {
                            to: 'window',
                            attachment: 'together'
                        }
                    ]
                }
            });
        });
    }
    returnValue() {
        var _error = q1s_input.prototype.validateInput.call(this);
        return ["_FILES."+this.name, this.FileData.file]
    }
}

module.exports = {
    q1s_fileinput
}
