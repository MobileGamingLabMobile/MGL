var OptionButton = function (properties, GI) {
    var _class = 'button radius';
    if (properties.align) {
        _class += ' ' + properties.align;
    }
    
    this.GI = GI;

    this.$button = $('<a/>', {
        'class': _class,
        'id': 'optionButton',
        'text': properties.text
    });
    this.$button.css('font-size', '75%');
};

/** Optionbutton extends Button
*
*/
OptionButton.prototype = new Button;

/** Add a Event to optionbutton. Open popup with information on click.
*
*/
OptionButton.prototype.addEvent = function () {
    $('#optionButton').on('click', function () {
        $('#popup').foundation('reveal', 'open');

        $('#popupcontent').html('<p>Hier werden die Optionen stehen</p>');

        $(document).on('close.fndtn.reveal', '[data-reveal]', function () {
            $('#popupcontent').html('');
        });
    });
};



