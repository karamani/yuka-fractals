App.Views.FractalCanvas = Backbone.View.extend({

    el: ".fractal-canvas",
    tagName:  'div',
    className: "fractal-canvas",
    
    context: null,
    
    events: {
        "click .refreshButton" : "refresh"
    },
 
    initialize: function() {
        _.bindAll(this, 'render');
    },

    renderToolbar: function() {
        this.$el.html(this.$el.html() + '<div style="float:both;"><input class="refreshButton" type="button" value="Обновить"/></div>')  
    },
    
    renderCanvas: function() {
        this.$el.html(this.$el.html() + '<canvas id="fractalCanvas" width="1000" height="900" style="border:1px solid #000000;"></canvas>');
    },

    initContext: function() {
        this.context = this.$el.find("#fractalCanvas").get(0).getContext("2d");
        this.context.fillStyle = "#408040";
    },

    renderFractal: function() { },

    render: function() {
        this.renderToolbar();
        this.renderCanvas();
        this.initContext();
        this.renderFractal();
        return this;
    },
    
    refresh: function() {
        this.$el.children().remove();
        this.render();
        return this;
    }    
});

App.Views.FernFractalCanvas = App.Views.FractalCanvas.extend({

    initialize: function() {
        App.Views.FractalCanvas.prototype.initialize.call(this);
        App.Views.FernFractalCanvas.prototype.renderFractal = function() {
            this.fern(400, 800);
        }
    },

    fern: function(startX, startY) {
        var x = 1.0;
        var y = 1.0;
        for (var i = 0; i < 64000; i++) {
            var p = Math.random();
            var t = x;
            if (p <= 0.85) {
                x = 0.84 * x + 0.04 * y;
                y = 0.04 * t + 0.85 * y + 1.6;
            } else if (p < 0.93) {
                x = 0.20 * x - 0.26 * y;
                y = 0.26 * t + 0.212 * y + 0.44;
            } else if (p < 0.99) {
                x = -0.15 * x + 0.28 * y;
                y = 0.26 * t + 0.24 * y + 0.44;
            } else {
                x = 0.0;
                y = 0.16 * y;
            }
            var readyX = startX + Math.round(100 * x) + 1;
            var readyY = startY - (Math.round(60 * y) + 1);
            this.context.fillRect(readyX, readyY, 1, 1);
        }
    }
});

App.Views.TreeFractalCanvas = App.Views.FractalCanvas.extend({

    initialize: function() {
        App.Views.FractalCanvas.prototype.initialize.call(this);
        App.Views.TreeFractalCanvas.prototype.renderFractal = function() {
            this.tree(500, 750, 3 * 3.14 / 2, 200);
        }
    },

    tree: function(x, y, a, l) {

        if (l < 0) {
            return;
        }

        var x1 = Math.round(x + l * Math.cos(a));
        var y1 = Math.round(y + l * Math.sin(a));
        var p = (l > 100) ? 100 : l;

        this.context.beginPath();

        if (p < 60) {
            this.context.strokeStyle = (Math.random() > 0.5) ? "#408040" : "#40FF40";
            for (var i = 0; i <= 3; i++) {
                this.context.moveTo(x + i, y);
                this.context.lineTo(x1, y1);
            }
        } else {
            this.context.strokeStyle = "#804040";
            for (var i = 0; i <= Math.floor(p / 6); i++) {
                this.context.moveTo(x + i - Math.floor(p / 12), y);
                this.context.lineTo(x1, y1);
            }
        }

        this.context.stroke();

        for (var i = 0; i <= 9 - Math.random() * 9; i++) {
            var s = Math.random() * (l - Math.floor(l / 6)) + Math.floor(l / 6);
            var a1 = a + 1.6 * (0.5 - Math.random());
            var x1 = Math.floor(x + s * Math.cos(a));
            var y1 = Math.floor(y + s * Math.sin(a));
            this.tree(x1, y1, a1, p - 5 - Math.random() * 15);
        }
    }
});
