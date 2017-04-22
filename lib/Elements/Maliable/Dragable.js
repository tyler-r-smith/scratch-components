const q1s = require("../../q1s").q1s;
const DRAG = require('../../drag-size-dom/index.js').Drag;

class q1s_dragable extends q1s{
    constructor(obj){
        super(obj);
        const DRAGOptions = obj.DRAGOptions || {};
        DRAGOptions.resize = DRAGOptions.resize || true;
        this.addFunctionToCallback((elem) => {
            elem.DRAG = new DRAG(elem, DRAGOptions);
            return elem;
        })
    }
}

module.exports = {
    q1s_dragable,
}
