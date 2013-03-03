window.ProgressbarListView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        var progressbars = this.model.models;
        var len = progressbars.length;
        var startPos = (this.options.page - 1) * 8;
        var endPos = Math.min(startPos + 8, len);

        $(this.el).html('<ul class="thumbnails"></ul>');
        //debugger;
        for (var i = startPos; i < endPos; i++) {
            $('.thumbnails', this.el).append(new ProgressbarListItemView({model: progressbars[i]}).render().el);
        }

        $(this.el).append(new Paginator({model: this.model, page: this.options.page}).render().el);

        return this;
    }
});

window.ProgressbarListItemView = Backbone.View.extend({

    tagName: "li",

    initialize: function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});
