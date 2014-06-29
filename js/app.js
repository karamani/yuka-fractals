window.App = {
    Models: {},
    Collections: {},
    Views: {}
};

window.Router = Backbone.Router.extend({

    appView: null,
    menu: null,

    routes: {
        "": "index",
        "overview": "index",
        "tree": "tree",
        "fern": "fern",
        "julia": "julia"
    },

    initialize: function(data) {
        this.menu = new App.Collections.MenuItems([
            {title: 'Overview', link:"overview", isSelected: true},
            {title: 'Tree', link:"tree", isSelected: false},
            {title: 'Fern', link:"fern", isSelected: false},
            {title: 'Julia', link:"julia", isSelected: false}
        ]);

        this.appView = new App.Views.Main({collection: this.menu});
        this.appView.render();

        return this;
    },

    index: function() {
        this.menu.select('overview');
        this.appView.switchContent('overview');
        return true;
    },

    tree: function() {
        this.menu.select('tree');
        this.appView.switchContent('tree');
        return true;
    },

    fern: function() {
        this.menu.select('fern');
        this.appView.switchContent('fern');
        return true;
    },
    
    julia: function() {
        this.menu.select('julia');
        this.appView.switchContent('julia');
        return true;
    }    
});

$(function() {
    window.app = new Router();
    Backbone.history.start();
});
