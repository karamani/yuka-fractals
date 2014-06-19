App.Views.Main = Backbone.View.extend({

    el: "body",
    currentView: null,
    views: [],

    initialize: function () {
        _.bindAll(this, 'render', 'switchContent');
        this.views = [
            {name: "overview", view: App.Views.Ovarview},
            {name: "tree", view: App.Views.TreeFractalCanvas},
            {name: "fern", view: App.Views.FernFractalCanvas}
        ];
    },

    switchContent: function (link) {
        delete(this.currentView);
        _.each(this.views, function (element) {
            if (element.name === link) {
                this.currentView = new element.view();
            }
        }, this);

        if (this.currentView !== null) {
            $(".fractal-canvas").children().remove();
            $(".fractal-canvas").append(this.currentView.render().el);
        }
    },

    render: function () {
        var menu = new App.Views.Menu({collection: this.collection});
        $(".sidebar").append(menu.render().el);
    }
});
