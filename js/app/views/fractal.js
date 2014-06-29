App.Views.FractalCanvas = Backbone.View.extend({

    el: ".fractal-canvas",
    tagName:  'div',
    className: "fractal-canvas",
    
    context: null,
    canvasWidth: 0,
    canvasHeight: 0,
    canvasData: null,
    
    events: {
        "click .refreshButton" : "refresh"
    },
 
    initialize: function() {
        _.bindAll(this, 'render');
    },

    renderToolbar: function() {
        this.$el.html(this.$el.html() + '<div style="float:both;"><input class="refreshButton" type="button" value="Обновить"/></div>');
        return this;
    },
    
    renderCanvas: function() {
        this.$el.html(this.$el.html() + '<canvas id="fractalCanvas" width="1000" height="800" style="border:1px solid #000000;"></canvas>');
        return this;
    },

    initContext: function() {
        this.context = this.$el.find("#fractalCanvas").get(0).getContext("2d");
        this.context.fillStyle = "#408040";
        this.canvasWidth = this.context.canvas.width;
        this.canvasHeight = this.context.canvas.height;
        this.canvasData = this.context.getImageData(0, 0, this.canvasWidth, this.canvasHeight);      
        return this;
    },

    renderFractal: function() { },

    render: function() {
        this.renderToolbar();
        this.renderCanvas();
        this.initContext();
        var startTimeMs = this.startWork();
        this.renderFractal();
        this.stopWork(startTimeMs);
        return this;
    },
    
    startWork: function() {
        var d = new Date();
        return d.getTime();
    },
    
    stopWork: function(startTimeMs) {
        var d = new Date();
        var duration = d.getTime() - startTimeMs;
        this.context.fillText("Time: " + duration + " ms", 850, 20);
    },
    
    refresh: function() {
        this.$el.children().remove();
        this.render();
        return this;
    },
    
    drawPixel: function(x, y, r, g, b, a) {
        var index = (x + y * this.canvasWidth) * 4;
        this.canvasData.data[index + 0] = r;
        this.canvasData.data[index + 1] = g;
        this.canvasData.data[index + 2] = b;
        this.canvasData.data[index + 3] = a;
    },
    
    updateCanvas: function() {
        this.context.putImageData(this.canvasData, 0, 0);  
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
            this.drawPixel(readyX, readyY, 0, 128, 0, 255);
        }
        this.updateCanvas();
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

App.Views.JuliaFractalCanvas = App.Views.FractalCanvas.extend({

    initialize: function() {
        App.Views.FractalCanvas.prototype.initialize.call(this);
        App.Views.JuliaFractalCanvas.prototype.renderFractal = function() {
            this.julia();
        }
    },

    julia: function() {
        var fact = 1.0;
	      var const_scr = 1.0;
       
        var npix = this.context.canvas.width;
        var npiy = this.context.canvas.height;
       
        var pmin = 0 - (Math.random() * 0.05 + 0.74); //-0.74356;
	      var qmin = Math.random() * 0.15 + 0.1; //0.11135;
	      var xmin = -2.0;
	      var xmax = 2.0;
	      var ymin = -2.0;
	      var ymax = 2.0;
	      var kcolor = 255;
 
	      if (fact > 1.0 || fact <= 0.0) {
		        fact = 1.0;
	      } else {
		        npix = Math.floor(npix * fact);
		        npiy = Math.floor(npiy * fact);
	      }
	      var ypy = npiy - 0.5;
	      // Переменные deltax и deltay соответсвуют разности максимальных и 
	      // минимальных значений х и у, поделенной на длину экрана.
	      var deltax = (xmax - xmin) / (npix - 1);
	      var deltay = (ymax - ymin) / (npiy - 1);
 
	      // Программа в двух циклах for - по х и у проходит по всем пикселам рисунка.
	      // Переменная np будет соответствовать текущему значению х, а переменная nq - значению у.
	      // При каждом проходе внешнего цикла переменной х0 присваивается значение, равное
	      // минимальному значению х плюс текущее значение счетчика, умноженное на приращение х.
	      for (var np = 0; np <= npix - 1; np++) {
		        var x0 = xmin + np * deltax;
		        // Аналогично и во внутреннем цикле вычисляется значение у0.
		        // Далее идет установка вычисленных значений в х и у и обнуление k.
		        for (var nq = 0; nq <= npiy - 1; nq++) {
			          var y0 = ymin + nq * deltay;
			          var x = x0;
			          var y = y0;
			          var k = 0;
			          // Цикл do, рисующий составляющие фрактал точки.
			          // Повторяется, пока пока значения r и k не превосходят kcolor,
			          // установленного ранее равным 255.
			          do {
				            // Вычисление действительной и мнимой части комплексного числа Z,
				            // для представления которого мы двумя переменными типа double.
				            // Переменная xkp1 содержит действительную часть комплексного числа,
                    // а ykp1 - мнимую.
				            var xkp1 = (x + y) * (x - y) + pmin;
				            var ya = x * y;
				            var ykp1 = ya + ya + qmin;
				            var r = xkp1 * xkp1 + ykp1 * ykp1; // Возведение обеих частей в квадрат и сложение.
				            k++;
            				// Если r больше максимального значения, то точка фрактала стремится
            				// к бесконечности и закрашивается цветом, определяемым значением k
            				// и выводится в позиции, заданной координатами np и nq.
            				if (r <= kcolor) {		              					
              					var xp = const_scr * np;
              					var yp = nq;
                        this.drawPixel(xp, yp, k, 0, 0, 255);
            				}
            				// Если значение k равно максимальному, то точка стремится к центру,
            				// она рисуется красным.
            				if (k == kcolor) {
              					xp = const_scr * np;
              					yp = nq;
                        this.drawPixel(xp, yp, 255, 0, 0, 255);
            				}
            				x = xkp1;
            				y = ykp1;
        		    } while (r <= kcolor && k <= kcolor);
		        }
	      }
        this.updateCanvas();
    },
});
