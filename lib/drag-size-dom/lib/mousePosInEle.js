export function mousePositionInElemRightAlign (elem, e){
    console.log ("Element position align: ", e.pageX, elem.offsetLeft, e.pageY, elem.offsetTop);
    return {
         pageX: elem.offsetWidth + elem.offsetLeft - e.pageX,
         pageY: elem.offsetHeight+ elem.offsetTop - e.pageY,
        }
}

export function mousePositionInElem (elem, e){
    return {
        pageX: e.pageX  - elem.offsetLeft,
        pageY: e.pageY - elem.offsetTop,
    }
}