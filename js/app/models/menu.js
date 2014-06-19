App.Models.MenuItem = Backbone.Model.extend({
    title: 'Default Title',
    link: '',
    isSelected: false
});

App.Collections.MenuItems = Backbone.Collection.extend({
    model: App.Models.MenuItem,

    select: function(link) {
        this.each(function(menuItem) {
            menuItem.set({isSelected: (menuItem.get('link') === link)});
        });
    }
});
