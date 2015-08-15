var HelpButton = function (properties) {
    var _class = 'button radius tiny ';
    if (properties.align) {
        _class += ' ' + properties.align;
    }

    this.$button = $('<a/>', {
        'class': _class,
        'id': 'helpButton',
        'text': 'Hilfe'
    });
};

/**Helpbutton extends button
*
*/
HelpButton.prototype = new Button;

/** Add a Event to helpbutton. Open popup with information on click.
*
*/
HelpButton.prototype.addEvent = function () {
    $('#helpButton').on('click', function () {
        $('#popup').foundation('reveal', 'open');

        $('#popupcontent').html('<p>Hier wird die Hilfe stehen</p>');

        $(document).on('close.fndtn.reveal', '[data-reveal]', function () {
            $('#popupcontent').html('');
        });
    });
};



