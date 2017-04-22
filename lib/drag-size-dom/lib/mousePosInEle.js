const mousePositionInElemRightAlign = function  (elem, e){

    return {
         pageX: elem.offsetWidth + elem.offsetLeft - e.pageX,
         pageY: elem.offsetHeight+ elem.offsetTop - e.pageY,
        }
}

const mousePositionInElem = function (elem, e){
    return {
        pageX: e.pageX  - elem.offsetLeft,
        pageY: e.pageY - elem.offsetTop,
    }
}

module.exports = {
    mousePositionInElemRightAlign,
    mousePositionInElem,
}