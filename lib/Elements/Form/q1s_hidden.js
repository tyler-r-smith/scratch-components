const q1s_input = require('./q1s_input').q1s_input;

class q1s_hiddenInput extends q1s_input {
     constructor(obj) {
         super(obj);
         this.hiddenStyleString = "opacity: 0; margin: 0; padding: 0; width: 0; height: 0";
         this.addFunctionToCallback(function() {
             this.input.setAttribute("data-clear", "false");
             this.input.setAttribute("style", this.parent.hiddenStyleString);
             this.input.setAttribute("hidden", "hidden");
             this.input.setAttribute("disabled", "disabled");
             this.setAttribute("style", this.parent.hiddenStyleString);
         })
     }
     clearInput(){
        //do not clear;
     }
}

module.exports = {
    q1s_hiddenInput
}
