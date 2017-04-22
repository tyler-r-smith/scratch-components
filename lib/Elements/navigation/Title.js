const q1s = require("../../q1s.js").q1s;

class Title extends q1s {
    constructor(obj){
        obj.createShadow = false;
        super (obj);
        this.addStateBinding("title", function(item){
            return "menu"+item;
        }, function(item, newArray, array, n){

            var createElem, className;
            if (array[0] === item){
                createElem = obj.mainTitle || "h3";
                className = obj.mainTitleClass || "title title--main";
            } else {
                createElem = obj.subTitle || "h5";
                className = obj.subTitleClass || "title title--sub";
            }
            const elem = document.createElement(createElem);

            elem.innerHTML = item;
            elem.className = className;
            return elem;
        })
    }
}

module.exports = {
    Title,
}
