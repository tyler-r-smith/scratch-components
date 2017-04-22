const addClass = require('./lib/class.js').addClass;
const removeClass = require('./lib/class.js').removeClass;
const hasClass = require('./lib/class.js').hasClass;
const mousePositionInElem = require('./lib/mousePosInEle.js').mousePositionInElem;
const mousePositionInElemRightAlign = require('./lib/mousePosInEle.js').mousePositionInElemRightAlign;
const absoluteParent = require('./lib/absoluteParent.js');

class Drag {
    constructor(elem, options) {
        options = options || {};
        this.options = options;
        this.elem = elem;
        this.mouseUp = (e) => {
            removeClass(elem, "dragging");
            document.removeEventListener('mousemove', this.mouseMove);
            document.removeEventListener('mouseup', this.mouseUp);
            if (typeof options.dragEnd === 'function')
                options.dragEnd.call(this, elem, e);
        };
        this.mouseMove = (e) => {
            let parent = absoluteParent(this.elem);
            let mousePos = mousePositionInElem(parent, e);
            let top = mousePos.pageY - this.elem.offsetHeight / 2;
            let left = mousePos.pageX - this.elem.offsetWidth / 2;
            if (hasClass(parent, "constrainDrag")) {

                if (left < 0) left = 0;
                if (left + this.elem.offsetWidth > parent.offsetWidth) left = parent.offsetWidth - this.elem.offsetWidth;
                if (top < 0) top = 0;
                if (top + this.elem.offsetHeight > parent.offsetHeight) left = parent.offsetHeight - this.elem.offsetHeight;
            }
            this.elem.style.top = top +"px";
            this.elem.style.left = left + "px";
            if (typeof options.dragging === 'function')
                options.dragging(elem, e);
        };
        this.resizeMouseMove = (e) => {
            let parent = absoluteParent(this.elem);
            let mousePosParent = mousePositionInElem(parent, e);
            let width = mousePosParent.pageX - this.elem.offsetLeft;
            let height = mousePosParent.pageY - this.elem.offsetTop;
            if (this.elem.resizeConstrain)
                height = width / this.elem.resizeConstrain;

            this.elem.style.width = width + "px";
            this.elem.style.height = height + "px";
        };
        this.resizeMouseUp = (e) => {
            removeClass(elem, "resizing");
            document.removeEventListener('mousemove', this.resizeMouseMove);
            document.removeEventListener('mouseup', this.resizeMouseUp);
            if (typeof options.resizeEnd === 'function')
                options.resizeEnd.call(this, elem, e);  
        };
        this.elem.addEventListener('mousedown', (e)=>{
            if (options.resize) {
                var parent = absoluteParent(this.elem);
                var mousePosParent = mousePositionInElem(parent, e);
                let mousePos = mousePositionInElemRightAlign(this.elem, mousePosParent);

                if (mousePos.pageX <= 15 && mousePos.pageY <= 15) {
                    const width = mousePosParent.pageX - this.elem.offsetLeft;
                    const height = mousePosParent.pageY - this.elem.offsetTop;
                    addClass(elem, "resizing");
                    
                    document.addEventListener('mousemove', this.resizeMouseMove);
                    document.addEventListener('mouseup', this.resizeMouseUp);
                    
                    if (typeof options.resizeStart === 'function')
                        options.resizeStart.call(this, elem, e);
                    
                    this.elem.style.width = width + "px";
                    this.elem.style.height = height + "px";
                    return false;
                }
            }

            this.elem.style.position = 'absolute';
            addClass(elem, "dragging");
            document.addEventListener('mousemove', this.mouseMove);
            document.addEventListener('mouseup', this.mouseUp);
            if (typeof options.dragStart === 'function')
                options.dragStart.call(this, elem, e);
        })
    }
}

module.exports = {
    Drag
}
