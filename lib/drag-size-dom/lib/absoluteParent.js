const absoluteParent = function (ele) {
    while (ele.parentNode.tagName !== "HTML") {
        ele = ele.parentNode;

        if(ele.style.position !== "static" && ele.style.position !== '') {
            break;
        }
    }
    return ele;
}

module.exports = {
    absoluteParent
};