import {q1s} from '../../q1s.js'

export class q1s_imageWithTitle extends q1s {
    constructor(obj){
        super(obj);
        this.addFunctionToCallback(() => {
            const image = document.createElement('img');
            if (this.imageAttributes)
                this.addAttribute.call(image, imageAttributes);
            this.addElementToShadow(image)

            const title = document.createElement('p');
            if (this.titleAttributes)
                this.addAttribute.call(title, this.titleAttributes)
            this.addElementToShadow(title);
        });
        this.addFunctionToConstructCallback(function(elem, options){
            elem.image = elem.shadowRoot.children[0];
            elem.titleElem = elem.shadowRoot.children[1];
            if (options.image) {
                if (typeof options.image === 'function')
                    options.image = options.image()

                elem.image.setAttribute("src", options.image);
            }
            options.imageAttributes = options.imageAttributes || {};
            elem.parent.addAttribute.call(elem.image, options.imageAttributes);

            if (options.title) {
                if (typeof options.title === 'function')
                    options.title = options.title();    

                elem.titleElem.innerHTML = options.title;
            }
            return elem;
        })
    }
}