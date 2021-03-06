const COLORS = require("./lib/css_variables").COLORS;

const form_input_wrapper = {
    width: "100%",
    height: "auto",
    "padding": "10px 5px",
    "margin": "4px auto",
    "border-radius": "5px",
    "float": "left",
    "box-sizing": "border-box",
    "label": {
        padding: "3px",
        "font-size": "1.3em",
        "margin": "5px auto"
    }
};

const form_input = {
    form_input: {
        margin: "3px auto",
        padding: "10px",
        display: "block",
        width: "100%",
        "font-size": "1em",
        "box-sizing": "border-box"
    },
    form_input_text: {
        "background-color": "#fff"
    }
};

const form_input_helpertext = {
    display: "block",
    "font-size": ".9em",
    color: COLORS.red,
    "padding": "2px",
    "min-height": "1em",
}

const form_input_label = {
    
}

const combindedStyles = {
    "div": {
      "box-sizing": "border-box"
    },
    ".form_input_wrapper": form_input_wrapper,
    ".form_input_text": form_input.form_input_text,
    ".form_input_checkbox": {
        width: "auto",
        display: "inline-block"
    },
    '.form_input_helpertext': form_input_helpertext,
    '.form_input_imageDisplay': {
        height:  "50px",
        width:  "50px",
        "background-image":  'url("")',
        "background-position": "center",
        "background-repeat": "no-repeat",
        "background-size":  "contain",
        "background-position":  "50% 50%",
        "margin-left":  "28px",
        "border": "1px solid black",
        "border-radius": "5px",
        "padding": "2px",
        cursor: "pointer"
    },
    '.form_input_imageDisplay:hover': {
        "border": "1px solid blue"
    }
}

combindedStyles[".form_input_wrapper"].input = form_input.form_input;
combindedStyles[".form_input_wrapper"].select = form_input.form_input;
const input_styles = combindedStyles;

module.exports = {
    form_input_wrapper,
    form_input,
    form_input_helpertext,
    form_input_label,
    input_styles
}