var Label = function (properties) {
    var _class = null;
    if (properties.align) {
        _class = properties.align;
    }
    
    this.$label = $('<div/>', {
        class: _class,
        id: properties.id,
        style: 'margin-left: 7.5em; padding-right: 3.0em background-color: #F5F5F5',
        text: properties.text
    });
}

/** Append this label to a dom object (ele)
*
*/
Label.prototype.appendTo = function (ele) {
    this.$label.appendTo(ele);
};

