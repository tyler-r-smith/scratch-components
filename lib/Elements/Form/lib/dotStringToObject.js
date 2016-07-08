export function dotStringToObject (string, value, starting_obj) {
    var string = string.split('.');
    var obj = starting_obj || {};
    var currentObj = obj;
    for (var n = 0; n < string.length; n++){
        if (!currentObj[string[n]])
            currentObj[string[n]] = {};
        if (n === string.length - 1 ) {
            currentObj[string[n]] = value || {};
        }
        currentObj = currentObj[string[n]];
    }
    return obj;
}