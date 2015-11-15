/*global window, mraid, requestAnimationFrame*/

(function() {
 
  'use strict';
 
  var LMD_ADS = function() {

    var options = {
      frame_step: 1,
      max_frame: 320,
      direction: 1,
      debug: window.debug || false
    },
      config,
      num_frame = 0,
      debug_log = '',
      $body = document.getElementsByTagName('body')[0],
      $scene,
      $ads_container = document.getElementById('ads-in-content'),
      $container,
      $debug,
      isIOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent),

      init = function() {

        window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

        initScene();
        
        if (options.debug) {
          initDebugMode();
        }

        if (mraidEnabled()) {
          mraidReady();
        }
      },
      
      initScene = function() {
        var scene = window.scene,
          template = '';
          
        config = scene.config;

        config.max_height = config.max_height || config.min_height;
        
        if (scene.templateLandscape && isLandscapeOriented()) {
          template = scene.templateLandscape;
        }
        else {
          template = scene.template || scene.templatePortrait;
        }

        $ads_container.innerHTML = template + '<div class="lmd-ads-debug" id="lmd-ads-debug"></div>';

        $body.style.backgroundColor = config.bg_color || '#eef1f5';
        $debug = document.getElementById('lmd-ads-debug');
        $scene = document.getElementById('lmd-ads-' + config.scene);
        $container = document.getElementById('lmd-ads-container-' + config.scene);
      },

      isLandscapeOriented = function() {
        return mraidEnabled() ? parseInt(mraid.getOrientation(), 10) !== 0 : window.innerWidth > window.innerHeight;
      },

      mraidReady = function() {
        if (mraid.getState() === 'loading') {
          mraid.addEventListener('ready', initialize);
        } else {
          window.onload = function() {
            initialize();
          };
        }
      },

      initDebugMode = function() {

        $ads_container.classList.add('lmd-ads-debug-on');
        $body.style.height = window.innerHeight * 2 + 'px';

        window.onresize = function() {
          $body.style.height = window.innerHeight * 2 + 'px';
          initScene();
        };

        window.onscroll = function() {
          requestAnimationFrame(function() {
            execute(window.pageYOffset / window.innerHeight);
          });
        };

        execute('ratio:1');
        resizeWindow(config.min_height);
      },

      initialize = function() {
        // ratio:1
        mraid.addEventListener('sasReceiveMessage', function(message) {
          requestAnimationFrame(function() {
            execute(message);
          });
        });
        
        mraid.addEventListener('orientationChange', function() {
          initScene();
        });

        execute('ratio:1');
        resizeWindow(config.min_height);
      },

      execute = function(ratio) {

        var h;

        if (config.max_frames && num_frame > config.max_frames) {
          return;
        }

        ratio = ratio.toString();

        if (ratio.toString().substring(0, 5) === 'ratio') {
          ratio = parseFloat(ratio.substring(6, ratio.length)).toFixed(2);
        } else {
          ratio = parseFloat(ratio).toFixed(2);
        }

        if(ratio < 0 || ratio > 1) {
          return;
        }

        h = Math.floor(config.resize ? config.min_height + (easeInOut(ratio) * (config.max_height - config.min_height)) : config.min_height);

        if (config.resize) {
          resizeWindow(h);
        }


        $scene.classList.remove('state-first-half');
        $scene.classList.remove('state-second-half');

        if (ratio < 0.5) {
          $scene.classList.add('state-first-half');
        } else {
          $scene.classList.add('state-second-half');
        }

        requestAnimationFrame(function() {
          applyEffects(ratio);
        });

        if (options.debug) {
          debug_log = 'message: ' + ratio + '; isIOS: ' + isIOS + '; ';
          debug_log += 'resize: ' + h + '; ';
          debug_log += 'ratio: ' + ratio + '; ';
          debug_log += 'frame: ' + num_frame + '; ';
          log();
        }

        num_frame = num_frame + (options.frame_step * options.direction);
      },

      applyEffects = function(current_ratio) {

        var value, x, y, offset, elems = document.querySelectorAll('.anim-slide'), width;
        forEach(elems, function(el) {
          offset = el.getAttribute('data-offset') || 0;
          value = (((num_frame - offset) + Math.abs(num_frame - offset)) / 2) * (el.getAttribute('data-speed') || 1);
          x = value * (el.getAttribute('data-direction') || -1);
          if (el.getAttribute('data-slideto') && el.getAttribute('data-slideto') < value) {
            return;
          }
          el.style.webkitTransform = 'translateX(' + x + 'px)';
        });

        elems = document.querySelectorAll('.anim-slideXY');
        forEach(elems, function(el) {
          offset = el.getAttribute('data-offset') || 0;
          x = num_frame * (el.getAttribute('data-speed') || 1);
          y = num_frame * (el.getAttribute('data-speedY') || 1);
          if (num_frame < offset) {
            return;
          }
          if (el.getAttribute('data-slideto') && (el.getAttribute('data-slideto') < x || el.getAttribute('data-slideto') < y)) {
            return;
          }
          el.style.webkitTransform = 'translate(' + x * (el.getAttribute('data-direction') || -1) + 'px, ' + y * (el.getAttribute('data-directionY') || -1) + 'px)';
        });
        
        elems = document.querySelectorAll('.anim-fullslide');
        forEach(elems, function(el) {
          width = el.getAttribute('data-fullwidth') || 0;
          if(width > window.innerWidth) {
            value = (1 - easeInOutCubic(current_ratio, 3)) * (width - window.innerWidth);
            x = value * (el.getAttribute('data-direction') || -1);
            el.style.webkitTransform = 'translateX(' + x + 'px)';
          }
        });

        elems = document.querySelectorAll('.anim-scale');
        forEach(elems, function(el) {
          offset = el.getAttribute('data-offset') || 0;
          value = (((num_frame - offset) + Math.abs(num_frame - offset)) / 2) * (el.getAttribute('data-speed') || 1);
          el.style.width = value + 'px';
        });

        elems = document.querySelectorAll('.anim-rotation');
        forEach(elems, function(el) {
          el.style.webkitTransform = 'rotate(' + (num_frame * (el.getAttribute('data-speed') || 1)) % 360 + 'deg)';
        });

        elems = document.querySelectorAll('.anim-fade-in');
        forEach(elems, function(el) {
          offset = el.getAttribute('data-offset') || 0;
          value = (((num_frame - offset) + Math.abs(num_frame - offset)) / 2) * (el.getAttribute('data-speed') || 1);
          el.style.opacity = Math.min(value / 100, 1);
        });

        elems = document.querySelectorAll('.anim-fade-out');
        forEach(elems, function(el) {
          el.style.opacity = 1 - Math.min(num_frame * (el.getAttribute('data-speed') || 1) / 100, 1);
        });

        elems = document.querySelectorAll('.anim-fade-inout');
        forEach(elems, function(el) {
          el.style.opacity = easeInOut(current_ratio, el.getAttribute('data-center'), el.getAttribute('data-width'));
        });

        elems = document.querySelectorAll('.anim-fade-easeinout');
        forEach(elems, function(el) {
          el.style.opacity = easeInOut(current_ratio, el.getAttribute('data-center'), el.getAttribute('data-width'));
        });

        elems = document.querySelectorAll('.anim-fade-easeoutin');
        forEach(elems, function(el) {
          el.style.opacity = 1 - easeInOut(current_ratio, el.getAttribute('data-center'), el.getAttribute('data-width'));
        });

      },

      resizeWindow = function(h) {
        $container.style.height = h + 'px';
        $container.style.marginTop = '-' + h/2 + 'px';
        if (mraidEnabled()) {
          if (isIOS) {
            mraid.setResizeProperties({
              width: config.width || window.innerWidth,
              height: h
            });
            mraid.resize();
          } else {
            mraid.sasSendMessage(h);
          }

        }
      },

      mraidEnabled = function() {
        return typeof mraid !== 'undefined';
      },

      forEach = function(array, callback, scope) {
        for (var i = 0; i < array.length; i++) {
          callback.call(scope, array[i], i); // passes back stuff we need
        }
      },

      inOut = function(i) {
        return Math.sin(i * Math.PI);
      },

      easeInOut = function(i, center, width) {
        center = center || 0.5;
        width = width || 1;
        return Math.exp(-1 * (Math.pow((i - center), 2) / Math.pow(0.25 * width, 2)));
      },
      
      easeInOutCubic = function (x, pow) { 
        return Math.pow(x, pow) / (Math.pow(x, pow) + Math.pow((1 - x), pow));
      },

      log = function() {
        $debug.innerHTML = debug_log;
      };

    return {
      init: init
    };

  };

  window.LMD_ADS = new LMD_ADS();
  window.LMD_ADS.init();
})();