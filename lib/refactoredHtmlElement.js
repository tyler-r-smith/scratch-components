class refactoredHtmlElement {
    constructor(){
        this.__proto__ = Object.create(HTMLElement.prototype);
        this.createdCallback = () => {
            this.createdCallbackAmalgamated();
        };
    }
}

module.exports = {
    refactoredHtmlElement
}
