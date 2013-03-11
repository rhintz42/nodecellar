window.Wine = Backbone.Model.extend({

    urlRoot: "/wines",

    idAttribute: "_id",

    initialize: function () {
        this.validators = {};

        this.validators.name = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a name"};
        };

        this.validators.grapes = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a grape variety"};
        };

        this.validators.country = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a country"};
        };
    },

    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
    },

    // TODO: Implement Backbone's standard validate() method instead.
    validateAll: function () {

        var messages = {};

        for (var key in this.validators) {
            if(this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }

        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
    },

    defaults: {
        _id: null,
        name: "",
        grapes: "",
        country: "USA",
        region: "California",
        year: "",
        description: "",
        picture: null
    }
});

window.WineCollection = Backbone.Collection.extend({

    model: Wine,

    url: "/wines"

});

window.Progressbar = Backbone.Model.extend({

    urlRoot: "/progressbars",

    idAttribute: "_id",

    initialize: function () {
        this.validators = {};

        this.validators.name = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a name"};
        };

        this.validators.minValue = function (value) {
            return value > 0 ? {isValid: true} : {isValid: false, message: "You must enter a min value"};
        };

        this.validators.maxValue = function (value) {
            return value > 0 ? {isValid: true} : {isValid: false, message: "You must enter a max value"};
        };
    },

    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
    },

    // TODO: Implement Backbone's standard validate() method instead.
    validateAll: function () {

        var messages = {};

        for (var key in this.validators) {
            if(this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }

        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
    },

    defaults: {
        _id: null,
        name: "",
        minValue: 0,
        maxValue: 100,
        currentValue: 0,
        description: "",
        picture: null
    }
});

window.ProgressbarCollection = Backbone.Collection.extend({

    model: Progressbar,

    url: "/progressbars"

});

//-----------------------------------------------------------------
//THIS IS A TEST TO SEE WHAT I CAN DO WITH IMPORTS FOR KINETICJS
//------------------------------------------------------------------
function addFillRectangle(x, y, width, height, fill, name) {
    //var stage = group.getStage();
    //var layer = group.getLayer();

    var rect = new Kinetic.Rect({
        x: x,
        y: y,
        width: width,
        height: height,
        fill: fill,
        name: name,
        stroke: 'black',
        strokeWidth: 4,
        draggable: true
    });


    return rect;
}
