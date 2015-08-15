var Button = function (GI) {
    this.id = 'id';
    this.GI = GI;
    this.$button = $('<a/>', {
        'class': 'button',
        'id': 'id',
        'text': 'text'
    });
};

/** Appends button to a given dom object (ele)
*
*/
Button.prototype.appendTo = function (ele) {
    this.$button.appendTo(ele);
    this.addEvent();
};

/** Changes a css property of the button to a given value
*
*/
Button.prototype.css = function (property, value) {
    this.$button.css(property, value);
}

/** Adds a event to this button (default open popup on click)
*
*/
Button.prototype.addEvent = function () {
    $('#' + this.id).on('click', function () {
        $('#popup').foundation('reveal', 'open');
    });
};

