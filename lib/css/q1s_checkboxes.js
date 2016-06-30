import {form_input_wrapper, form_input_label} from './q1s_inputs';

const checkbox_input_label = _.omit(form_input_label);
checkbox_input_label.cursor = "pointer";
checkbox_input_label["vertical-align"] = "top";


export default checkbox_styles = {
    ".form_input_wrapper": form_input_wrapper,
    ".form_input_helpertext": {
        display: "none"
    },
    ".form_input_wrapper_checkbox": {
        display: "inline-block",
        width: "auto",
        ".form_input_label": {
            "font-size": "1em"
        }
    },
    ".form_input_checkbox": {
        display: "inline-block",
        width: "20px",
        height: "20px",
    },
    ".form_input_label": checkbox_input_label
}