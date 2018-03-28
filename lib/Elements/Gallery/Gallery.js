const q1s = require('../../q1s.js').q1s;
const q1s_imageWithTitle = require('./imageWithTitle.js');

class q1s_gallery extends q1s{
    constructor(obj){   
        super(obj);
        this.urlPrefix = obj.urlPrefix || "";
        this.ImageForList = obj.ImageForList || new q1s_imageWithTitle({
                name: 'gallery-image',
            })
        var parent = this;
        this.addFunctionToCallback(() => {
            var options = options || {};
            this.parent = parent;
            this.constructImage = this.parent.constructImage || function(newValue){
                    return this.ImageForList.construct({
                        image: this.urlPrefix+newValue.url,
                        title: newValue.name,
                        attributes: {
                            "data-id": newValue._id
                        }
                    });
                };
            var newKey = this.addStateBinding("gallery", (newValue) => "img_"+newValue._id, (newValue, addN, add, n) => {
                const imageItem = this.constructImage(newValue, options, n);
                return imageItem
            });
            this.gallery = (gallery) => {
                this.state[newKey] = gallery;
            }
            if (options.galleryTitle) {
                this.galleryTitle = document.createElement("p");
                this.galleryTitle.innerHTML = options.galleryTitle;
                this.galleryTitle.className = " galleryTitle ";
                const appendOn = this.shodowRoot || this;
                if (appendOn.children[0]) {
                    appendOn.insertBefore(this.galleryTitle, appendOn.children[0])
                }
                else {
                    appendOn.appendChild(this.galleryTitle);
                }
            }
            return this;
        })
    }
}

module.exports = {
    q1s_gallery
}
