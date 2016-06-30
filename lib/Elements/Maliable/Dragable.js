import {q1s} from '../../q1s.js';
import {DRAG} from '/imports/drag-size-dom/index.js'

export class q1s_dragable extends q1s{
    constructor(obj){
        super(obj);
        const DRAGOptions = obj.DRAGOptions || {};
        DRAGOptions.resize = DRAGOptions.resize || true;
        this.constructCallback = (elem, options) => {
            elem.DRAG = new DRAG(elem, DRAGOptions);
            return elem;
        }
    }
}