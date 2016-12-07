//Namespace declaration
var SNOWDAY = {};
//SnowDay Data Models
SNOWDAY.MODELS = {
    //Flake Class
    Flake: function (options) {
        var self = this,
            _speed = 0,
            _position = {
                x: 0,
                y: -20
            },
            _blur = 0,
            _size = 0,
            _scene = options.Scene || null,
            _sceneWidth = _scene.offsetWidth,
            _dx = 5,
            _dy = 5,
            _flakeDOM = {},
            _ctx = options.Context || null,
            _flakeTL = new TimelineMax({repeat:-1,yoyo:true}),
            _animationDuration = options.animationDuration,
            _animationClass = options.animationClass;

        var XOFFSET = 2;
        //Here is where the snowflake is initialized.
        self.init = function () {
            var minSize = 5,
                maxSize = 10,
                minBlur = 0.5,
                maxBlur = 1;

            _position.x = Math.floor(Math.random() * (_sceneWidth - XOFFSET) + XOFFSET);
            _size = Math.floor(Math.random() * (maxSize - minSize) + minSize);
            _blur = Math.random() * (maxBlur - minBlur) + minBlur;

            self.render();

        };
        //Here is where the element is rendered
        self.render = function () {
            var unit = 'px';
            var flakeDOM = document.createElement('div');
            flakeDOM.className = 'snowflake';
            flakeDOM.style.width = _size + unit;
            flakeDOM.style.height = _size + unit;
            flakeDOM.style.filter =  'blur('+_size/7+'px)';
            //flakeDOM.style.opacity = _blur;
            flakeDOM.style.left = _position.x + unit;
            flakeDOM.style.top = _position.y + unit;
            _flakeDOM = flakeDOM;
            _scene.appendChild(_flakeDOM);

            var flakeTM = TweenMax.to($(_flakeDOM),_animationDuration/1000,{y:($(_scene).height()+50)});
            
            _flakeTL.fromTo($(_flakeDOM),2,{x:'-=20',ease:Power1.easeInOut},{x:'+=20',ease:Power1.easeInOut},"START");
            self.animate();

        };
        //Here is where the element is rendered but within a canvas
        self.renderInCanvas = function () {
            _ctx.beginPath();
            _ctx.arc(_position.x, _position.y, _size, 0, 2 * Math.PI, false);
            _ctx.fillStyle = 'rgba(255,255,255,' + blur + ')';
            _ctx.fill();
        };
        //Animation method
        self.animate = function () {
            
        var $flake = _flakeDOM;

         setTimeout(function(){
                $($flake).remove();
                console.log('removed');
            },_animationDuration);
        };
        //Constructor.
        (function () {
            self.init();
        })();
    },
    //SnowScene Class
    SnowScene: function (options) {
        var self = this,
            _sceneInDOM = options.SceneRef || null;
        var _animationInterval = function () {};
        var BATCHTIME = 100;
        var FLAKEBATCH = 20;

        //Function that generates x amount of snow flakes
        self.letItSnow = function () {
            setInterval(function () {
             //   for (var x = 0; x < FLAKEBATCH; x++) {
                    var flake = new SNOWDAY.MODELS.Flake({
                        Scene: _sceneInDOM,
                        animationDuration:40000
                    });
               // }
            }, BATCHTIME);

        };
        //Constructor
        (function () {
           self.letItSnow();
        })();
    }
};