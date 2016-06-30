#q1s Components

q1s Components is a web component framework. It allows for easy creation of html templates, and css using the web component standard.

####List of included components

Component | Function | Base Component    
:------------- |:-------------|:-------------
q1s|Basic Component | HTMLElement Prototype
form|extends forms | q1s
input|Text numerical inputs | q1s
hidden|Hidden text inputs | input
select|select inputs | input
file_input|Upload files | input
checkbox|single checkboxes | input
many_checkbox|Multiple checkboxes | q1s
draggable| Draggable and Resizeable | q1s
imageWithTitle | an img with a title | q1s
gallery | a collection of imgaeWithTitles | q1s

####Basic Syntax
~~~js
import {q1s} from 'q1s_components'

//Define and create a title component
const component = new q1s({
  name: "x-tagname"
})

//construct the element and append it to the body
document.body.appendChild(component.construct())
~~~
Produces:
~~~html
<html>
  <head>
  </head>
  <body>
    <x-tagname></x-tagname>
  </body>
</html>
~~~
##q1s methods
|Methods|Parameters|Use|Attached to constructed elements|
|:----|:----|:----|:----|
|construct|object|construct a dom element from the class|false|
|addFunctionToConstructCallback|function|Add a function to the elem.contruct() function|false|
|addAttribute|object|Add attributes to an element|true|
|addToShadow|tag, html|create an element, set the inner html to html and then add it to the shadow root|false||
|addElementToShadow|elem|append an already created element to the sahdow|false|
|addStateBinding|key, _id, newElement, bindTo|Adds reactivty to the element. (see the deatialed info)|true|
|createAnElement|tag, id, store_here|create an element (store_here is optional, see detail for more info)|false|
|changeHtml|elem, html|change the inner html of an element|false|
|addElement|element, id, store_here|add an element to this class. It is stored in an array on this or store_here|false|
|register|none|Register this q1s_component with the dom. This is called by default on the first instance on construct|false|
|styleSheet|js_css_object|create a style element from a json css element|false|
|getElementsByName|name|searches the dom for the name|true|
|prependManyChildren|array|prepend many elements (from an array) to the elem|true|
|insertManyBefore|array, node|insert many elements before node|true|
|isQ1s|none|returns true|true|

##new q1s(options)
|Option|Value|Default|Discription|Required|
|:----|:----|:----|:----|:----|
|createShadow|boolean|true|Add a shadow root to the element|true|
|createdCallback|function|none|append or add a function the html created callback|false|
|_proto|string/HTMLElement prototype|HTMLElement.prototype|Define the base prototype for the element. Can either be the prototype it self or the default tag name|false|

##q1s.construct(options)
|Option|Value|Default|Discription|Required|
|:----|:----|:----|:----|:----|
|attributes|object|none|Add addtributes to the created elem|false|


####q1s.addFunctionToConstructCallback(func);
The functions are called in the order in which they were added to the component. They are always passed two variables:

**elem**: the newly created element.

**options**: the options passed to q1s.construct(options);

all functions must return elem; If they do not this will break the chain and no element will actually be created from q1s.construct();

i.e.
```js
component.addFunctionToConstructCallback(function(elem, options){
  const info = options.info || "Hello World"
  elem.addToShadow('p', info);
  return elem;
})
document.append(component.construct());
document.append(component.construct({info: "Display This"}));
```
Produces:
```html
  <body>
    <x-tagname>
      #shadowRoot
        <p>Hello World</p>
    </x-tagname>
    <x-tagname>
      #shadowRoot
        <p>Display This</p>
    </x-tagname>
  </body>
```

###Methods:
These methods can be used either on the returned elem from q1s.construct() or in a function passed to q1s.addFunctionToConstructCallback(function)
####elem.addStateBinding(key, _id, newElement, elem)###
**key (string):** 
the state key to add a reactive function to. when elem.state[key] changes it will
add and remove the appropriate elements created with newElement. It is expected
that _.isArray(elem.state[key]) === true

**_id (string or function):**
each item from the elem.state[key] array must have a unique id. Here you can pass a string,
which will be read as elem.state[key][_id] or you can run a function with will return the string
id for the element. DO NOT USE Math.Random, it is important that each item have an _id which is 
specific to it. This is how it knows which to item to remove.
    
**newElement (function):**
this element will be appended to elem's children with NODE.appendChild().
this is passed four pieces of data: (add[n], add, newValue, n)
add[n]: the specific value from the new array
add: all the items which are being added
newValue: the new value of elem.state[key]
n: the index of the new item

**elem (q1s Element)**
pass a different elem with which to run all the functions from;
elem = elem || this;

i.e. 
```js
  const data = [
    {_id: "asd3rfafdf": name: "Bob"},
    {_id: "bdahlfeze": name: "Tyler"}
  ]
  const NameList = new q1s({
    name: "name-list:",
    createShadow: false
  })
  NameList.addFunctionToConstructCallback((elem, options) => {
    elem.key = elem.addStateBinding("names", "_id", function(doc){
      var newElem = document.createElement("p");
      newElem.InnerHTML = doc.name;
      return newElem;
    }
    return elem;
  });
  var NameListElem = NameList.construct()
  NameList.state[NameListElem.key] = data;
  document.body.appendChild(NameListElem);
```
Produces:
```html
  <body>
    <name-list>
      <p id="asd3rfafdf">Bob</p>
      <p id="bdahlfeze">Tyler</p>
    </name-list>
  </body>
```
If you then change the state key
```js
  NameList.state[NameListElem.key] = [
    {_id: "zasdfeAfd": name: "Michael"},
    {_id: "bdahlfeze": name: "Tyler"}
  ]
```
The dom will automatically update to:
```html
  <body>
    <name-list>
      <p id="zasdfeAfd">Michael</p>
      <p id="bdahlfeze">Tyler</p>
    </name-list>
  </body>
```
