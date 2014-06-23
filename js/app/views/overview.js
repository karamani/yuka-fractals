App.Views.Ovarview = Backbone.View.extend({
    el: ".fractal-canvas",
    tagName:  'div',
    className: "fractal-canvas",

    initialize: function() {
        _.bindAll(this, 'render');
    },

    render: function() {
        this.$el.html('<span>Overview!</span>');
        return this;
    },
    
    refresh: function() {
        this.$el.children().remove();
        this.render();
        return this;
    }    
});
