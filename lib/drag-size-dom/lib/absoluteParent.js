export function absoluteParent(ele) {
    while (ele.parentNode.tagName !== "HTML") {
        ele = ele.parentNode;
        console.log(ele.tagName, ele.style.position);
        if(ele.style.position !== "static" && ele.style.position !== '') {
            break;
        }
    }
    return ele;
}