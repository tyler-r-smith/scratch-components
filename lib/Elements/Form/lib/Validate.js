const _error = require('./error')._error;

const q1s_form_validate = function() {
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

const validate_required = function (required, value) {
    required = required || this.required;
    value = value || this.value;
    if (this.required === false || (typeof value !== 'undefined' && value != ''))
        return true
    else
        return  new _error ("value-required", "This field is required"); 
}
const validate_minlength = function (min_length, value) {
    min_length = min_length || this.minLength || false;
    value = value || this.value;
    if (min_length === false || min_length === -1 || (value.length && value.length >= min_length))
        return true
    else
        return new _error("value-to-short", "This field needs to be at least "+min_length+" characters.")
}
const validate_maxlength = function  (max_length, value) {
    max_length = max_length || this.maxLength || false;
    value = value || this.value;
    if (max_length === false || max_length === -1 || (value.length && value.length <= max_length))
        return true
    else
        return new _error("value-to-long", "This field can not be longer than "+max_length+" characters.")
}
const validate_pattern = function (pattern, value) {
    value = value || this.value;
    pattern = pattern || this.pattern;
    var regex = new RegExp(pattern);
    if (regex.test(value.match))
        return true
    else {
        if (this.humanPattern) 
            return new _error("value-pattern-mismatch", this.humanPattern);
        else
            return new _error("value-pattern-mismatch", "This filed is not properly formatted");
    }
}
const validate_type = function (type, value) {
    
}

module.exports = {
    q1s_form_validate,
    validate_required,
    validate_minlength,
    validate_maxlength,
    validate_pattern,
    validate_type,
}
