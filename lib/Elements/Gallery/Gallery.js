import {q1s} from '../../q1s.js'; 
import {q1s_imageWithTitle} from './imageWithTitle.js'

export class q1s_gallery extends q1s{
    constructor(options){
        super(options);
        this.urlPrefix = options.urlPrefix || "";
        this.ImageForList = options.ImageForList || new q1s_imageWithTitle({
                name: 'gallery-image',
            })
        
        this.constructImage = options.constructImage || this.constructImage || function(newValue){
            return this.ImageForList.construct({
                image: this.urlPrefix+newValue.url,
                title: newValue.name,
                attributes: {
                    "id": newValue._id,
                    "data-id": newValue._id
                }
            });
        };
        this.addFunctionToConstructCallback((elem, options) => {
            var newKey = elem.addStateBinding("gallery", (newValue) => "img_"+newValue._id, (newValue) => {
                const imageItem = this.constructImage(newValue, options);
                return imageItem
            });
            elem.gallery = (gallery) => {
                elem.state[newKey] = gallery;
            }
            if (options.galleryTitle) {
                elem.galleryTitle = document.createElement("p");
                elem.galleryTitle.innerHTML = options.galleryTitle;
                elem.galleryTitle.className = " galleryTitle "
                const appendOn = elem.shodowRoot || elem;
                if (appendOn.children[0]) {
                    appendOn.insertBefore(elem.galleryTitle, appendOn.children[0])
                }
                else {
                    appendOn.appendChild(elem.galleryTitle);
                }
            }
            return elem;
        })
    }
}