const q1s = require("../../q1s").q1s;
const Title = require("./Title.js").Title;
const _ = require("underscore");

class Q1SMenu extends q1s {
    constructor (obj) {
        obj.createShadow = false;
        super(obj);
        this.menuTitle = new Title({
            name: obj.name+"menu",
            mainTitleClass: "menuTitle menuTitle--main",
            subTitleClass: "menuTitle menuTitle--sub",
        });
        this.addFunctionToCallback(function() {

            this.appendChild(this.parent.menuTitle.construct({}));
            this.addStateBinding("menu",
                function (item) {
                    return item.name;
                },
                (item) => {
                    if (this.menuItem && _.isFunction(this.menuItem))
                        return this.menuItem(item);
                    else {
                        const elem = document.createElement('p');
                        elem.innerHTML = item.name;
                        elem.item = item;
                        if (item.onClick && _.isFunction(item.onClick)) {
                            elem.addEventListener('click', item.onClick);
                        }

                        return elem;
                    }

                })
        })
    }
};

module.exports = {
    Q1SMenu,
};
