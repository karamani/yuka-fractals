App.Views.Ovarview = Backbone.View.extend({
    el: ".fractal-canvas",
    tagName:  'div',
    className: "fractal-canvas",

    initialize: function() {
        _.bindAll(this, 'render');
    },

    render: function() {
        this.$el.html(
            '<h1>Overview</h1>'
            + '<p>This is fractals rendering demo.</p>'
            + '<p>To learn more about fractals, please visit the website: '
            + '<a href="http://en.wikipedia.org/wiki/Fractal">http://en.wikipedia.org/wiki/Fractal</a></p>');
        return this;
    },
    
    refresh: function() {
        this.$el.children().remove();
        this.render();
        return this;
    }    
});
