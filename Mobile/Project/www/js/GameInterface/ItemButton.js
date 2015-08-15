var ItemButton = function (properties, GI) {
    var _class = 'button radius';
    if (properties.align) {
        _class += ' ' + properties.align;
    }
    
    this.GI = GI;
    
    this.$button = $('<a/>', {
        'class': _class,
        'id': 'itemButton',
        'text': properties.text
    });
    this.$button.css('font-size', '75%');
};

/** Itembutton extends Button
*
*/
ItemButton.prototype = new Button;

/** Add a Event to itembutton. Open popup with information on click.
*
*/
ItemButton.prototype.addEvent = function () {
    $('#itemButton').on('click', function () {
        $('#popup').foundation('reveal', 'open');

        $('#popupcontent').html('<p>Hier werden die Items stehen</p>');

        $(document).on('close.fndtn.reveal', '[data-reveal]', function () {
            $('#popupcontent').html('');
        });
    });
};




