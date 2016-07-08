import {q1s_input} from './q1s_input'
import  input_construct_callback from './lib/input_construct_callback.js';

export class q1s_hiddenInput extends q1s_input {
     constructor(obj) {
         super(obj)
         this.hiddenStyleString = "opacity: 0; margin: 0; padding: 0; width: 0; height: 0";
         this.constructCallback = (elem, options)=>{
             input_construct_callback(elem, options);
             //console.log("Q1S_HIDDEN INPUT");
             elem.input.setAttribute("style", this.hiddenStyleString);
             elem.input.setAttribute("hidden", "hidden");
             elem.input.setAttribute("disabled", "disabled");
             elem.setAttribute("style", this.hiddenStyleString);
             return elem;
         }
     }
}