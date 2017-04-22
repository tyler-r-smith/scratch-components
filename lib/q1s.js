const js_to_css = require('js-to-css').js_to_css;
const Changeling = require("changeling-proxy").Changeling;
const dotString = require('dot-string-to-object').dotStringToObject;
const make_id = require('make-id').make_id;
const _ = require('underscore');

class q1s {
    constructor(obj){
        //Expected to have name & createdCallback
        //Translate all properties passed to this
        for (var n in obj){
            if (obj.hasOwnProperty(n)){
                this[n] = obj[n];
            }
        }

        //Reactive Parents


        //We convert obj.createdCallback into an array
        //This way we can push new functions to it and chain together the creation
        if (typeof this.createdCallback === 'function') {
            this.createdCallback = [this.createdCallback];
        } else if(Array.isArray(this.createdCallback)){
            const created = [];
            for (var n = 0; n < this.createdCallback.length; n++){
                if (typeof this.createdCallback[n] === 'function'){
                    created.push(this.createdCallback[n]);
                } else {
                    console.warn("")
                }
            }
        }
         else{
            //if obj.createdCallback was set to something weird we warn about it in the console,
            //and then set the array to empty. We don't warn if wasn't set, we just initialize the array.
            if (typeof this.createdCallback !== 'undefined')
                console.warn("a q1s object's createdCallback must be either a function or an array");
            this.createdCallback = [];
        }

        if (this.constructCallback) {
            if (typeof this.constructCallback === 'function'){
                this.addFunctionToConstructCallback(this.constructCallback);
            } else if (_.isArray(this.constructCallback)){
                _.each(this.constructCallback, (ƒ) => this.addFunctionToConstructCallback(ƒ));
            }
        }

        //We check to make sure the name has a dash
        //This is a required because we use the name as the html tag
        if (typeof this.name.split('-')[1] === "undefined") {
            this.name = 'x-'+this.name;
        }

        //Generate html as a property of this class
        //This allows us to add function and properties to its parent class
        //Which can then be easily accessed through the standard callback functions.
        let proto = obj._proto || HTMLElement.prototype;
        if (typeof proto === "string" ){
            proto = proto.charAt(0).toUpperCase() + proto.slice(1);
            proto = window["HTML"+proto+"Element"];
            if (proto)
                proto = proto.prototype;
            else {
                console.warn ("unable to resolve prototype for", obj._proto, proto)
                proto = HTMLElement.prototype
            }
        }
        //Create the element and its createdCallback
        this.element = Object.create(proto);
        this.element.parent = this;
        this.element.createdCallback = function () {
            if (this.parent.createShadow !== false) {
                this.shadow = this.createShadowRoot();
                this.parent.shadow = this.shadow;
            }
            this.parent.elements.push(this);
            this.q1sId = "q1s_"+Math.random();
            this.addStateBinding = (key, _id, newElement, bindTo) => {
                if (!this.state)
                    this.state = new Changeling(this);

                return this.parent.addStateBinding.call(this, key, _id, newElement, bindTo);
            };

            //add Q1S functions
            this.prependManyChildren = children => this.parent.prependManyChildren.call(this, children);
            this.insertManyBefore = (children, refrenceNode) => this.parent.insertManyBefore.call(this, children, refrenceNode);
            this.className += " Q1S ";
            this.getElementsByName = name => this.parent.getElementsByName.call(this, name);
            this.parent.createdCallbackAmalgamated.call(this);
            let attributes = {};
            _.each(this.attributes, (att) => {
                if (att.nodeName !== 'class' || att.nodeName !== 'className') {
                    attributes = dotString(att.nodeName, att.nodeValue, {
                        starting_obj: attributes,
                        split: '-',
                    });
                }
            });
            if (attributes) {
                this.parent.constructCallbackAmalgamated(this, attributes);
            }

        };

        //Objects to hold the created elements and instances
        //Currently not being used.
        this.elements = [];
        this.state = new Changeling(this.elements);
        this.instances = {};

        //add the basic q1s functions to the element
    }

    //Callbacks on the elements prototype
    addFunctionToCallback(ƒ){
        this.createdCallback.push(ƒ);
    }
    createdCallbackAmalgamated() {
        const createdCallbacks = this.parent.createdCallback;
        for (let i = 0; i < createdCallbacks.length; i++){
            if (createdCallbacks[i] && typeof createdCallbacks[i] === 'function') {
                createdCallbacks[i].call(this);
            }
        }
    }

    //Create this element
    construct(options){
        options = options || {};
        let elem;
        //Register the element first if it has not been.
        if (this.registered !== true)
            this.register();

        let id = options.id || undefined;
        //Construct the element with the appropriate prototype
        //This is necessary to allow extensions of current dom elements.
        if (this._proto) {
            elem = this.createAnElement(this._proto, id, this.instances);
            elem.setAttribute("is", this.name);
            elem.parent = this;
            this.element.createdCallback.call(elem);
        } else {
            elem = this.createAnElement(this.name, id, this.instances);
        }
        elem.addStyles = () => {
            const styleElement = this.styleSheet(applyStyles);
            //If there is no shadowRoot we place it directly in the object
            //Otherwise we place it in th shadowroot
            if (!elem.shadowRoot) {
                if (elem.hasChildNodes()){
                    elem.insertBefore(styleElement, elem.childNodes[0])
                } else {
                    elem.appendChild(styleElement);
                }
            } else {
                if (elem.shadowRoot.children[0]) {
                    elem.shadowRoot.insertBefore(styleElement, elem.childNodes[0])
                }
                else {
                    elem.shadowRoot.appendChild(styleElement);
                }
            }
        }

        //If there is a styleObject add it to the element
        //We default to the style object passed on construct, otherwise we use
        //the one that was initiated when creating the object;
        let applyStyles = options.styles || this.styles;
        if (applyStyles) {
            elem.addStyles(applyStyles)
        }

        //Add any attributes to the elem that have been defined in the options.
        if (options && options.attributes) {
            this.addAttribute.call(elem, options.attributes);
        }

        //Set up reactive changes.
        //elem.state = new Changeling(elem);
        //elem.addStateBinding = (key, _id, newElement, bindTo) => {
         //  return this.addStateBinding.call(elem, key, _id, newElement, bindTo);
        //}
        
        //Add built in functions to this element
        elem.prependManyChildren = children => this.prependManyChildren.call(elem, children);
        elem.insertManyBefore = (children, refrenceNode) => this.insertManyBefore.call(elem, children, refrenceNode);
        elem.className += " Q1S ";
        elem.getElementsByName = name => this.getElementsByName.call(elem, name);
        if (typeof options.callback === 'function') {
            elem = this.constructCallbackAmalgamated(elem, options);
            return options.callback(elem, options)
        } else
            return this.constructCallbackAmalgamated(elem, options);
    }
    
    //Bind elements to specific state[key] arrays;
    //Key is the stat.key
    //_id is the specific id of the array index
    //newElement is the element to return
    //bindTo is optional and you can pass an element here to bind it to it.
    addStateBinding(key, _id, newElement, bindTo){

        const elem = bindTo || this;
        const stateId = elem.state._id;
        if (!stateId) {
            console.error("the bindTo in State Binding must have an id property. This is either the fourth parameter or the value of 'this'.");
            return false;
        }
        if (typeof newElement !== 'function') {
            console.error("addStateBinding's thrid parmater newElement must be a function which returns an element");
            return false;
        }
        if (typeof key !== 'string') {
            console.error("addStateBinding's first parmaeter, key , must be a string")
            return false
        }
        const createId = function(_id, elem, n){
            let removeId;
            if (typeof _id === 'function')
                removeId = _id(elem, n);
            else if (typeof _id === 'string')
                if (_id === "this")
                    return elem;
                else
                    removeId = elem[_id];
            else
                removeId = n;
            return removeId
        };

        this.state.bind(key, elem, (newValue, oldValue, property) => {

            if (bindTo && _.isElement(bindTo)){
                var reactiveElemArray = bindTo;
            } else {
                var reactiveElemArray = (_.isElement(this)) ? this : this.elements;
            }

            reactiveElemArray = (_.isArray(reactiveElemArray)) ? reactiveElemArray : [reactiveElemArray];
            for (var i = 0; i < reactiveElemArray.length; i++) {
                var reactiveElem = reactiveElemArray[i];
                let remove, add;
                if (_.isString(newValue)) {
                    newValue = [newValue];
                }
                if (!_.isArray(newValue) && !_.isArray(oldValue)) {
                    console.error("Element state binding must be passed at least one array.", newValue, oldValue);
                    return false;
                }
                //TODO: Add better comparisons for collections rather than just basic arrays.
                if (oldValue && _.isObject(oldValue[0])) {
                    console.warn("Forced to remove all objects and replace.");
                    remove = oldValue;
                    add = newValue;
                } else {
                    remove = _.difference(oldValue, newValue);
                    add = _.difference(newValue, oldValue);
                }
                for (var n = 0; n < remove.length; n++) {
                    const removeId = createId(_id, remove[n], n);
                    var elemToRemove = reactiveElem.querySelector("#" + removeId);
                    if (elemToRemove) {
                        elemToRemove.parentNode.removeChild(elemToRemove)
                    }
                }
                for (var n = 0; n < add.length; n++) {
                    if (add[n]) {
                        const addId = createId(_id, add[n], n);
                        const newElem = newElement(add[n], add, newValue, n);

                        if (_.isElement(newElem)) {
                            newElem.setAttribute('id', addId);
                            reactiveElem.appendChild(newElem);
                        }
                    }
                }
            }
        })
        elem.key = (newValue) => {
            elem.state[key] = newValue;
        };
        return key+"_"+stateId;
    }

    //Callbacks on element construction
    addFunctionToConstructCallback(ƒ){
        if (typeof(this.constructCallback) === 'function')
            this.constructCallback = [this.constructCallback, ƒ];
        else if (this.constructCallback && this.constructCallback.length){
            this.constructCallback.push(ƒ)
        } else {
            this.constructCallback = [ƒ];
        }
    }
    constructCallbackAmalgamated(elem, options){
        if (typeof(this.constructCallback) === 'function') {
            elem = this.constructCallback(elem, options);
        } else if (this.constructCallback && this.constructCallback.length){
            for (var n = 0; n < this.constructCallback.length; n++) {
                if (typeof this.constructCallback[n] === 'function')
                    elem = this.constructCallback[n](elem, options);
            }
        }
        if (!_.isElement(elem))
            console.error("Elem not returned in construct callback. Instead it received: ", elem);
        return elem;
    }

    //Add attributes to an element from an object
    addAttribute(attributes){
        const addDirectly = ['value', 'onchange', 'onblur'];
        const element = this.element || this;
        for (var n in attributes){
            if (attributes.hasOwnProperty(n)){
                if (n === "classname" || n === "className"){
                    element.className += " "+attributes[n] + " ";
                } else if (n === "style" && typeof attributes[n] === 'object'){
                    for (var i in attributes[n]) {
                        element.style[i] = attributes[n][i];
                    }
                }
                else if (addDirectly.indexOf(n) !== -1) {
                    element[n] = attributes[n];
                }
                else {
                    element.setAttribute(n, attributes[n]);
                }
            }
        }
    }

    //Wrapper functions for adding elements/info to the elements shadow
    addToShadow(tag, html){
        if (!this.shadow) {
            console.error("q1s.addToShadow requires the element to have been created, or to be used in the created callback");
        }
        const element = this.createAnElement(tag);
        this.changeHtml(element, html);
        this.shadow.appendChild(element);
    }
    addElementToShadow(element){
        if (this.shadow)
            this.shadow.appendChild(element);
        else
            this.appendChild(element);
    }

    //Wrappers around standard functions
    //In order to refactor if necessary
    createAnElement(tag, id, store_here){
        store_here = store_here || this.elements;
        const element = document.createElement(tag);
        this.addElement(element, id, store_here);
        return element;
    }
    changeHtml(element, html){
        element.innerHtml = html;
    }

    //Register an element to this
    addElement(element, id, store_here){
        store_here = store_here || this.elements;
        id = id || make_id();
        element.setAttribute('id', id);
        store_here[id] = element;
    }

    //Register the element to the DOM
    //This allows us to use the tag in our HTML templates
    register () {
        const options = {prototype: this.element};
        if (this._proto) {
            options.extends = this._proto;
        }
        document.registerElement(this.name, options);
        this.registered = true;
    }

    //Create a style element from a js object
    styleSheet(js_style_obj){
        const css = js_to_css(js_style_obj);
        const style = document.createElement('style');
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        return style;
    }
    getElementsByName(name){
        var query = "[name='"+name+"']";
        return this.querySelector(query);
    }

    //Prepend and insert arrays
    prependManyChildren(children){
        for (var n = 0; n < children.length; n++){
            if (this.firstNode)
                this.firstNode.insertBefore(children[n]);
            else
                this.appendChild(children[n]);
        }
    }
    insertManyBefore(children, refrenceNode){
        for (var n = 0; n < children.length; n++) {
            this.insertBefore(children[n], refrenceNode);
        }
    }

    //An easy way to check if the element is built with this class
    isQ1s (){
        return true;
    }

}

module.exports = {
    q1s,
}
