App.Views.Menu = Backbone.View.extend({
    tagName:  'ul',
    className: "nav nav-sidebar",

    initialize: function() {
        _.bindAll(this, 'render');
    },

    render: function() {
        this.collection.each(function(model) {
            var item = new App.Views.MenuItem({model: model});
            this.$el.append(item.render().el);
        }, this);

        return this;
    }
});

App.Views.MenuItem = Backbone.View.extend({
    tagName:  'li',
    events: {
        'click' : 'onClick'
    },

    initialize: function() {
        _.bindAll(this, 'render');
        this.model.on('change:isSelected', this.onSelectedChange, this);
    },

    render: function() {
        this.$el.html('<span style="cursor: pointer;">' + this.model.get('title') + '</span>');
        if (this.model.get('isSelected') === true) {
            this.$el.addClass('active');
        } else {
            this.$el.removeClass('active');
        }
        return this;
    },

    onClick: function(e) {
        app.navigate(this.model.attributes.link, {trigger: true});
    },

    onSelectedChange: function() {
        this.render();
    }
});
