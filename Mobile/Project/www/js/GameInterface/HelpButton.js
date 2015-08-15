/**
 * contains and displays the help
 * @param {type} properties
 * @returns {HelpButton}
 */
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

HelpButton.prototype = new Button;

HelpButton.prototype.addEvent = function () {
    $('#helpButton').on('click', function () {
        $('#popup').foundation('reveal', 'open');

        $('#popupcontent').html('<p>Hier wird die Hilfe stehen</p>');

        $(document).on('close.fndtn.reveal', '[data-reveal]', function () {
            $('#popupcontent').html('');
        });
    });
};



