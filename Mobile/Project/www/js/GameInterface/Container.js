var Container = function (properties, GI) {
    this.$container = $('<div/>', {
        class: 'small-12'
    }).appendTo($('#gamecontainer'));
    
    this.map = null;
    this.GI = GI;
    this.buttons = {
        helpButton: null,
        taskButton: null,
        optionButton: null,
        itemButton: null
    };
    
    this.setProperties(properties);
};

/** Sets properties for this Container
*
*/
Container.prototype.setProperties = function (properties) {
    for (var prop in properties) {
        switch (prop) {
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
                if(properties[prop]) {
                    this.addMap();
                }
                break;
        }
    }
};

/** Sets the height of this container in percent
*
*/
Container.prototype.setHeight = function (height) {
    this.$container.css('height', this.convertpCentToPixel(height));
};

/** Sets the background color of this container
*
*/
Container.prototype.setBackgroundColor = function (color) {
    this.$container.css('background-color', color);
};

/** Transforms percent to a pixel value regarding the screen resolution
*
*/
Container.prototype.convertpCentToPixel = function (pCent) {
    var Pixel = $(window).height() / 100 * pCent;
    return Pixel;
};

/**Add a map opject to this container 
*
*/
Container.prototype.addMap = function () {
    this.map = new Map(this.$container);
};

/** Add a Element to this container. Either from type button or label.
*
*/
Container.prototype.addElement = function (element) {
    switch (element.type) {
        case('button'):
            this.addButton(element);
            break;
        case('label'):
            this.addLabel(element);
            break;
    }
};

/**Adds a button to this container
*
*/
Container.prototype.addButton = function (properties) {
    switch(properties.subtype) {
        //button is a helpbutton
        case('help'):
            $button = new HelpButton(properties);
            $button.appendTo(this.$container);
            this.buttons.helpButton = $button;
            break;
        //button is the optionbutton
        case('option'):
            $button = new OptionButton(properties, this.GI);
            $button.appendTo(this.$container);
            $button.css("width", "33.3%");
            this.buttons.optionButton = $button;
            break;
        //button is a taskbutton
        case('task'):
            $button = new TaskButton(properties, this.GI);
            $button.appendTo(this.$container);
            $button.css("width", "33.3%");
            this.buttons.taskButton = $button;
            break;
        //button is a itembutton
        case('item'):
            $button = new ItemButton(properties, this.GI);
            $button.appendTo(this.$container);
            $button.css("width", "33.3%");
            this.buttons.itemButton = $button;
            break;
    }
};

/**Adds a label to this container
*
*/
Container.prototype.addLabel = function (properties) {
    $label = new Label(properties);
    $label.appendTo(this.$container);
};