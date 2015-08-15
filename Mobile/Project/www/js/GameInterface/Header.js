var Header = function (properties, GI) {
    this.$container = $('<div/>', {
        class: 'small-12'
    }).appendTo($('#gamecontainer'));
    
    this.$map = null;
    this.GI = GI;
    this.setProperties(properties);
};

/** Header extends container
*
*/
Header.prototype = new Container;

/** Set properties of header
*
*/
Header.prototype.setProperties = function (properties) {
    var that = this;
    for (var prop in properties) {
        switch (prop) {
            case('gamename'):
                $headline = $('<h2>' + properties[prop] + '</h2>');
                $headline.appendTo(this.$container);
                $('#quitbutton').on('click', function () {
                    //TODO: Disconnect socket
                    window.window.location.href = "#gameselection";
                    //that.GI.socket.disconnect();
                });
                break;
            case('background'):
                if (properties[prop]) {
                    this.setBackgroundColor(properties[prop]);
                }
                break;
            case('height'):
                if (properties[prop]) {
                    this.setHeight(properties[prop]);
                }
                break;
            case('elements'):
                var elements = properties[prop];
                for (var element in elements) {
                    this.addElement(elements[element]);
                }
                break;
            case('map'):
                this.addMap();
                break;
        }
    }
};