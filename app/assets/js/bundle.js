//Namespace declaration
var SNOWDAY = {};
//SnowDay Data Models
SNOWDAY.MODELS = {
    //Flake Class
    Flake: function(options) {
        var self = this,
            _speed = 0,
            _position = {
                x: 0,
                y: 0
            },
            _blur = 0,
            _size = 0,
            _scene = options.Scene || null,
            _sceneWidth = _scene.offsetWidth,
            _dx = 5,
            _dy = 5,
            _flakeDOM = {};
        _ctx = options.Context || null;

        var XOFFSET = 2;
        //Here is where the snowflake is initialized.
        self.init = function() {
            var minSize = 10,
                maxSize = 20,
                minBlur = 0.5,
                maxBlur = 1;

            _position.x = Math.floor(Math.random() * (_sceneWidth - XOFFSET) + XOFFSET);
            _size = Math.floor(Math.random() * (maxSize - minSize) + minSize);
            _blur = Math.floor(Math.random() * (maxBlur - minBlur) + minBlur);

            self.render();

        };
        //Here is where the element is rendered
        self.render = function() {
            var unit = 'px';
            var flakeDOM = document.createElement('div');
            flakeDOM.className = 'snowflake';
            flakeDOM.style.width = _size + unit;
            flakeDOM.style.height = _size + unit;
            flakeDOM.style.opacity = _blur;
            flakeDOM.style.left = _position.x + unit;
            flakeDOM.style.top = _position.y + unit;
            _flakeDOM = flakeDOM;
            _scene.appendChild(_flakeDOM);
            self.animate();

        };
        //Here is where the element is rendered but within a canvas
        self.renderInCanvas = function() {
            _ctx.beginPath();
            _ctx.arc(_position.x, _position.y, _size, 0, 2 * Math.PI, false);
            _ctx.fillStyle = 'rgba(255,255,255,' + blur + ')';
            _ctx.fill();
        };
        //Animation method
        self.animate = function() {
            var $flake = _flakeDOM;

            var tl = new TimelineLite();

            tl.to($flake, 1, {
                    x: '+=' + _dx,
                    y: '+=' + _dy
                })
                .to($flake, 1, {
                    x: '-=' + _dx,
                    y: '+=' + _dy
                });

        };
        //Constructor.
        (function() {
            self.init();
        })();
    },
    //SnowScene Class 
    SnowScene: function(options) {
        var self = this,
            _sceneInDOM = options.SceneRef || null;
        var _animationInterval = function() {};
        var BATCHTIME = 3000;
        var FLAKEBATCH = 20;

        //Function that generates x amount of snow flakes 
        self.letItSnow = function() {
            setInterval(function() {
                for (var x = 0; x < FLAKEBATCH; x++) {
                    var flake = new SNOWDAY.MODELS.Flake({
                        Scene: _sceneInDOM
                    });
                }
            }, BATCHTIME);

        };
        //Constructor
        (function() {
            self.letItSnow();
        })();
    }
};
//Referencing modles inside SNOWDAY namespace
var USING_SNOWDAY = SNOWDAY.MODELS;

window.onload = function() {

    var snowScenesDOM = document.getElementsByClassName('snowscene');
    //Instantiating all SnowScenes Objects
    for (var idx = 0; idx < snowScenesDOM.length; idx++) {
        var snowScene = new USING_SNOWDAY.SnowScene({
            SceneRef: snowScenesDOM[idx]
        });
    }
};