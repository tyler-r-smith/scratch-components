const _error = function(error, reason, options){
    if (typeof error === 'undefined'){
        clog("_error must have an error");
        return false;
    }
    this.error = error;
    this.reason = reason || undefined;
    this.options = options || undefined;
}

module.exports = {
    _error
}
