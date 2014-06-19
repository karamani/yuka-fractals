App.Views.Ovarview = Backbone.View.extend({
    tagName:  'div',
    className: "fractal-canvas",

    initialize: function() {
        _.bindAll(this, 'render');
    },

    render: function() {
        this.$el.html('<span>Overview!</span>');
        return this;
    }
});
