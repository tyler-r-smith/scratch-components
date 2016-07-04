import {q1s as a} from './lib/q1s.js'
import {q1s_form as _form} from './lib/Elements/Form/q1s_form.js'
import {q1s_input as _input} from './lib/Elements/Form/q1s_input.js'
import {q1s_checkbox as _checkbox, checkbox_input as cx_input} from './lib/Elements/Form/q1s_checkbox.js'
import {q1s_many_checkboxes as many_checkbox} from './lib/Elements/Form/q1s_many_checkboxes.js' 
import {q1s_select as _select} from './lib/Elements/Form/q1s_select.js'
import {q1s_fileinput as _file} from './lib/Elements/Form/q1s_fileinput.js'
import {q1s_hiddenInput as hidden} from './lib/Elements/Form/q1s_hidden.js'
import {q1s_dragable as drag} from './lib/Elements/Maliable/Dragable.js'
import {q1s_imageWithTitle as imtitle} from './lib/Elements/Gallery/imageWithTitle'
import {q1s_gallery as gallery} from './lib/Elements/Gallery/Gallery'

import input_styles from './lib/css/q1s_inputs.js'
import checkbox_styles from './lib/css/q1s_checkboxes.js'

export const q1s = a;
export const q1s_form = _form;
export const q1s_input = _input;
export const q1s_checkbox = _checkbox;
export const q1s_many_checkbox = many_checkbox;
export const checkbox_input = cx_input;
export const q1s_select = _select;
export const q1s_fileinput = _file;
export const q1s_hiddenInput = hidden;
export const q1s_drag = drag;
export const q1s_imageWithTitle = imtitle;
export const q1s_gallery = gallery;

export const q1s_css_inputStyles = input_styles;
export const q1s_css_checkbox_styles = checkbox_styles;

export default class xq1s extends q1s {
    constructor(obj){
        super(obj);
        //console.log(this);
    }
}
