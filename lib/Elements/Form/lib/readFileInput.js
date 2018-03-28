const readURL = function(input, display, background) {
    background = (typeof background !== 'undefined') ? background : true;
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (file) {
            if (background === true)
                display.style["background-image"] = 'url('+file.target.result+')';
            else
                display.setAttribute('src', file.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

const readBinaryString = function(input, attach) {
    const method = 'readAsBinaryString';
    const encoding = 'binary';
    const fileReader = new FileReader();
    const _file = input.files[0];
    fileReader.onload = function(file) {

        var fileData = {
            name: _file.name,
            type: _file.type,
            lastModifiedDate: _file.lastModifiedDate,
            size: _file.size
        };
        //
        attach.file = {
            blob: file.srcElement.result,
            fileData: fileData,
            encoding: encoding
        };
    };
    //
    return fileReader[method](_file);
}

module.exports = {
    readURL,
    readBinaryString
}
