import { q1s_input } from './q1s_input';
import input_construct_callback from './lib/input_construct_callback.js'
import readUrl, {readBinaryString} from './lib/readFileInput'
import Drop from 'tether-drop'

export class q1s_fileinput extends q1s_input {
    constructor(obj){
        obj.inputAttributes = obj.inputAttributes || {};
        obj.inputAttributes.type = "file";
        super(obj)
        this.addFunctionToCallback(function(){
            this.imageDisplay = document.createElement('div');
            this.imageDisplay.className = 'form_input_imageDisplay';
            this.input.parentNode.insertBefore(this.imageDisplay, this.input);
        });
        this.constructCallback = (elem, options) =>{
            elem.label = elem.shadowRoot.children[0].children[0];
            elem.imageDisplay = elem.shadowRoot.children[0].children[1];
            elem.input = elem.shadowRoot.children[0].children[2];
            elem.helperText = elem.shadowRoot.children[0].children[3];
            elem.returnValue = (v) =>  elem.parent.returnValue.call(elem.input, undefined, v);

            elem.input.FileData = {};
            elem.input.FileData.file = 'nothing here :(';
            elem.input.onchange = () => {
                readUrl(elem.input, elem.imageDisplay);
                readBinaryString(elem.input, elem.input.FileData);
            };
            new Drop({
                target: elem.imageDisplay,
                content: function(){
                    const image = document.createElement('img');
                    readUrl(elem.input, image, false);
                    image.className = "imageDisplayLarge";
                    return image;
                },
                position: 'bottom left',
                openOn: 'hover',
                remove: true,
                tetherOptions: {constraints: [
                    {
                        to: 'scrollParent',
                        pin: true
                    },
                    {
                        to: 'window',
                        attachment: 'together'
                    }
                ]}
            });
            
            
            if (options) {
                if (options.inputAttributes) {
                    elem.parent.addAttribute.call(elem.input, options.inputAttributes);
                }
                if (options.label) {
                    elem.label.innerHTML = options.label;
                }
            }

            return elem;
        }
    }
    returnValue() {
        var _error = q1s_input.prototype.validateInput.call(this);
        return ["_FILES."+this.name, this.FileData.file]
    }
}