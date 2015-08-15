var Popup = function () {
};

/** Close popup
*
*/
Popup.prototype.close = function () {
    $('#popup').foundation('reveal', 'close');
};

/** Open popup
*
*/
Popup.prototype.open = function () {
    $('#popup').foundation('reveal', 'open');

    $(document).on('close.fndtn.reveal', '[data-reveal]', function () {
        $('#popupcontent').html('');
    });
};

/** Clears content shown in a popup
*
*/
Popup.prototype.clear = function () {
    $('#popupcontent').html('');
};

/** show selection of available roles
*
*/
Popup.prototype.selectRole = function (data) {
    var that = this;
    $('#popupcontent').append("Bitte w&auml;hle eine Rolle aus:<br><br>");
    $.each(data, function (index) {
        var role = data[index];
        var $button = $('<a/>', {
            'class': 'button',
            'id': role.id,
            'text': role.name
        });

        $('#popupcontent').append($button);
        $button.on('click', function () {
            $(that).trigger("role_selected", [role._id]);
            that.close();
        });

    });
};

/** Show message from an questevent
*
*/
Popup.prototype.questEvent = function (data) {
    $('#popupcontent').append(data.html);
};
