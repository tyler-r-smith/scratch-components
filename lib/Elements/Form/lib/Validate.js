import {_error} from './error.js';

export default q1s_form_validate = function() {
    if (typeof this.value === 'undefined') {
        console.warn("q1s_form_validate must be run on an object with a value property.")
    }
    var availble_constraints = [
        validate_required,
        validate_minlength,
        validate_maxlength,
        validate_pattern,
        validate_type
    ]
    for (var n = 0; n < availble_constraints.length;  n++){
        const error = availble_constraints[n].apply(this)
        if (error !== true) {
            return error;
            break;
        }
    }

}

export function validate_required (required, value) {
    required = required || this.required;
    value = value || this.value;
    if (this.required === false || (typeof value !== 'undefined' && value != ''))
        return true
    else
        return  new _error ("value-required", "This field is required"); 
}
export function validate_minlength (min_length, value) {
    min_length = min_length || this.minLength || false;
    value = value || this.value;
    if (min_length === false || min_length === -1 || (value.length && value.length >= min_length))
        return true
    else
        return new _error("value-to-short", "This field needs to be at least "+min_length+" characters.")
}
export function validate_maxlength (max_length, value) {
    max_length = max_length || this.maxLength || false;
    value = value || this.value;
    if (max_length === false || max_length === -1 || (value.length && value.length <= max_length))
        return true
    else
        return new _error("value-to-long", "This field can not be longer than "+max_length+" characters.")
}
export function validate_pattern (pattern, value) {
    value = value || this.value;
    pattern = pattern || this.pattern;
    var regex = new RegExp(pattern);
    if (value.match && value.match(regex) !== null)
        return true
    else {
        if (this.humanPattern) 
            return new _error("value-pattern-mismatch", "This filed must have "+this.humanPattern);
        else
            return new _error("value-pattern-mismatch", "This filed is not properly formatted");
    }
}
export function validate_type (type, value) {
    
}
