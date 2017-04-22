const q1s = require('../../q1s.js').q1s;

class q1s_imageWithTitle extends q1s {
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
            this.image = this.shadowRoot.children[0];
            this.titleElem = this.shadowRoot.children[1];
            if (options.image) {
                if (typeof options.image === 'function')
                    options.image = options.image()

                this.image.setAttribute("src", options.image);
            }
            options.imageAttributes = options.imageAttributes || {};
            this.parent.addAttribute.call(this.image, options.imageAttributes);

            if (options.title) {
                if (typeof options.title === 'function')
                    options.title = options.title();    

                this.titleElem.innerHTML = options.title;
            }
        })
    }
}

module.exports = {
    q1s_imageWithTitle,
}
