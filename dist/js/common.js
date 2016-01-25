/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/ 		if(moreModules[0]) {
/******/ 			installedModules[0] = 0;
/******/ 			return __webpack_require__(0);
/******/ 		}
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		3:0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);
/******/
/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;
/******/
/******/ 			script.src = __webpack_require__.p + "" + chunkId + "." + ({"0":"course-page","1":"main-page"}[chunkId]||chunkId) + ".js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ function(module, exports) {

	module.exports = function($) {
	  var Accordion;
	  Accordion = (function() {
	    function Accordion(element, options) {
	      this.el = element instanceof $ ? element : $(element);
	      this.init(options);
	    }
	
	    Accordion.prototype.init = function(options) {
	      this.items = this.el.find(options.itemSelector);
	      this.buttons = this.el.find(options.buttonSelector);
	      this.contents = this.el.find(options.contentSelector);
	      this.speed = options.speed != null ? options.speed : 300;
	      this.openedItemIndex = null;
	      return this.initEvents();
	    };
	
	    Accordion.prototype.initEvents = function() {
	      return this.buttons.each((function(_this) {
	        return function(index, button) {
	          return $(button).on('click', function() {
	            return _this.toggleItem(index);
	          });
	        };
	      })(this));
	    };
	
	    Accordion.prototype.toggleItem = function(index) {
	      if (index === this.openedItemIndex) {
	        this.closeItem(index);
	        return this.openedItemIndex = null;
	      } else if (this.openedItemIndex !== null) {
	        this.closeItem(this.openedItemIndex);
	        this.openItem(index);
	        return this.openedItemIndex = index;
	      } else {
	        this.openItem(index);
	        return this.openedItemIndex = index;
	      }
	    };
	
	    Accordion.prototype.openItem = function(itemIndex) {
	      $(this.items[itemIndex]).addClass('is-open');
	      return $(this.contents[itemIndex]).slideDown(this.speed, (function(_this) {
	        return function() {
	          return _this.scrollToActiveItem();
	        };
	      })(this));
	    };
	
	    Accordion.prototype.closeItem = function(itemIndex) {
	      $(this.items[itemIndex]).removeClass('is-open');
	      return $(this.contents[itemIndex]).slideUp(this.speed);
	    };
	
	    Accordion.prototype.scrollToActiveItem = function() {
	      return $('html, body').animate({
	        scrollTop: $(this.items[this.openedItemIndex]).offset().top - 90
	      }, 500);
	    };
	
	    return Accordion;
	
	  })();
	  return $.fn.accordion = function(options) {
	    this.each(function(index, el) {
	      return new Accordion(el, options);
	    });
	    return this;
	  };
	};


/***/ },
/* 2 */
/***/ function(module, exports) {

	var HoverGallery;
	
	HoverGallery = (function() {
	  var defaults;
	
	  defaults = {
	    containerClass: 'hover-galery-container',
	    imageClass: 'hover-gallery-image',
	    triggerClass: 'hover-gallery-trigger',
	    visibleClass: 'visible',
	    srcAttr: 'data-image-src'
	  };
	
	  function HoverGallery(selector, options) {
	    if (options == null) {
	      options = {};
	    }
	    this.props = $.extend({}, defaults, options);
	    this.triggers = selector;
	    this.container = $(this.props.container).addClass(this.props.containerClass);
	    this._init();
	    return this;
	  }
	
	  HoverGallery.prototype._init = function() {
	    this.images = $([]);
	    return this.triggers.each((function(_this) {
	      return function(index, trigger) {
	        var img, src, timeout;
	        trigger = $(trigger);
	        timeout = null;
	        src = trigger.attr(_this.props.srcAttr);
	        img = $('<div/>', {
	          "class": _this.props.imageClass,
	          css: {
	            backgroundImage: "url(" + src + ")"
	          }
	        });
	        _this.images.push(img[0]);
	        img.appendTo(_this.container);
	        return trigger.addClass(_this.props.triggerClass).on('mouseenter', function(e) {
	          return timeout = setTimeout(function() {
	            return img.addClass(_this.props.visibleClass);
	          }, 300);
	        }).on('mouseleave', function(e) {
	          clearTimeout(timeout);
	          return img.removeClass(_this.props.visibleClass);
	        });
	      };
	    })(this));
	  };
	
	  return HoverGallery;
	
	})();
	
	module.exports = function($) {
	  return $.fn.hoverGallery = function(options) {
	    new HoverGallery(this, options);
	    return this;
	  };
	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Header, SM,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
	
	SM = __webpack_require__(4);
	
	Header = (function() {
	  function Header() {
	    this._menuButtonClickHandler = bind(this._menuButtonClickHandler, this);
	    this.fixed = false;
	    this.opened = false;
	    return this;
	  }
	
	  Header.prototype.init = function(options) {
	    this.options = options != null ? options : {};
	    this.el = $('.header');
	    this.hamburger = this.el.find('.hamburger');
	    this.logo = this.el.find('.logo');
	    this.buttonOne = this.el.find('.btn').first();
	    this.menu = this.el.find('.header__nav');
	    this._initEvents();
	    this._buildScene();
	    return this;
	  };
	
	  Header.prototype.open = function() {
	    this.hamburger.addClass('is-active');
	    this.el.addClass('open-step-1');
	    setTimeout((function(_this) {
	      return function() {
	        return _this.el.addClass('open-step-2');
	      };
	    })(this), 100);
	    setTimeout((function(_this) {
	      return function() {
	        return _this._drawBordersInMenu();
	      };
	    })(this), 600);
	    return this.opened = true;
	  };
	
	  Header.prototype.close = function() {
	    this.hamburger.removeClass('is-active');
	    this.el.removeClass('open-step-2');
	    setTimeout((function(_this) {
	      return function() {
	        _this.el.removeClass('open-step-1');
	        return _this._removeBordersInMenu();
	      };
	    })(this), 400);
	    return this.opened = false;
	  };
	
	  Header.prototype.makeFixed = function() {
	    this.el.addClass('fixed');
	    this.el.removeClass('draw');
	    this._removeBordersInTopRow();
	    setTimeout((function(_this) {
	      return function() {
	        return _this.el.addClass('animate');
	      };
	    })(this), 0);
	    setTimeout((function(_this) {
	      return function() {
	        return _this._drawBordersInTopRow();
	      };
	    })(this), 300);
	    return this.fixed = true;
	  };
	
	  Header.prototype.makeStatic = function() {
	    this.el.removeClass('animate');
	    setTimeout((function(_this) {
	      return function() {
	        _this.el.removeClass('fixed');
	        _this.el.addClass('draw');
	        return _this._removeBordersInTopRow();
	      };
	    })(this), 300);
	    return this.fixed = false;
	  };
	
	  Header.prototype.animateIn = function() {
	    this.el.addClass('animate');
	    return setTimeout((function(_this) {
	      return function() {
	        return _this._drawBordersInTopRow();
	      };
	    })(this), 300);
	  };
	
	  Header.prototype.animateOut = function() {
	    this.el.removeClass('animate');
	    return setTimeout((function(_this) {
	      return function() {
	        return _this._removeBordersInTopRow();
	      };
	    })(this), 300);
	  };
	
	  Header.prototype._initEvents = function() {
	    return this.hamburger.on('click', this._menuButtonClickHandler);
	  };
	
	  Header.prototype._menuButtonClickHandler = function(e) {
	    if (!this.opened) {
	      return this.open();
	    } else {
	      return this.close();
	    }
	  };
	
	  Header.prototype._drawBordersInTopRow = function() {
	    this.logo.addClass('draw');
	    return this.buttonOne.addClass('draw');
	  };
	
	  Header.prototype._removeBordersInTopRow = function() {
	    this.logo.removeClass('draw');
	    return this.buttonOne.removeClass('draw');
	  };
	
	  Header.prototype._drawBordersInMenu = function() {
	    return this.menu.addClass('draw');
	  };
	
	  Header.prototype._removeBordersInMenu = function() {
	    return this.menu.removeClass('draw');
	  };
	
	  Header.prototype._buildScene = function() {
	    return this.scrollScene = SM.addScene({
	      offset: this.options.offset || 0,
	      duration: '100%',
	      triggerElement: 'body',
	      triggerHook: 'onLeave'
	    }).on('end', (function(_this) {
	      return function(e) {
	        if (e.scrollDirection === 'FORWARD') {
	          return _this.makeFixed();
	        } else if (e.scrollDirection === 'REVERSE') {
	          if (_this.opened) {
	            _this.close();
	          }
	          return _this.makeStatic();
	        }
	      };
	    })(this));
	  };
	
	  return Header;
	
	})();
	
	module.exports = new Header;


/***/ },
/* 4 */
/***/ function(module, exports) {

	var scrollController;
	
	scrollController = new ScrollMagic.Controller({
	  container: 'body',
	  loglevel: 2
	});
	
	module.exports = {
	  addScene: function(props) {
	    var scene;
	    scene = new ScrollMagic.Scene(props);
	    scrollController.addScene(scene);
	    return scene;
	  }
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var NumberIncrease, Parallax, SM;
	
	SM = __webpack_require__(4);
	
	Parallax = __webpack_require__(6);
	
	NumberIncrease = __webpack_require__(7);
	
	module.exports = function() {
	  var $footer, $win, winHeight;
	  $win = $(window);
	  winHeight = $win.height();
	  $('[data-parallax]').each(function(index, el) {
	    var $el, parallaxInstance;
	    $el = $(el);
	    parallaxInstance = new Parallax($el);
	    return SM.addScene({
	      duration: winHeight + $el.height(),
	      triggerHook: 'onEnter',
	      triggerElement: el
	    }).on('progress', function(e) {
	      return parallaxInstance.move(e.progress);
	    });
	  });
	  $('.fade-in').each(function(index, el) {
	    return SM.addScene({
	      offset: '20%',
	      triggerHook: 'onEnter',
	      triggerElement: el
	    }).on('start', function() {
	      return $(el).toggleClass('animate');
	    });
	  });
	  $footer = $('.footer');
	  SM.addScene({
	    duration: 200,
	    triggerHook: 'onEnter',
	    triggerElement: '#sm-trigger-footer'
	  }).on('start', function(e) {
	    $footer.toggleClass('is-fixed');
	    return $('body').toggleClass('footer-is-visible');
	  }).on('end', function(e) {
	    return $footer.toggleClass('draw');
	  });
	  $('.js-draw').each(function(index, el) {
	    return SM.addScene({
	      offset: $(el).data('sm-offset') || 200,
	      triggerHook: $(el).data('sm-trigger-hook') || 'onEnter',
	      triggerElement: el
	    }).setClassToggle(el, 'draw');
	  });
	  return $('[data-number]').each(function(index, el) {
	    var number;
	    number = new NumberIncrease($(el));
	    return SM.addScene({
	      offset: 150,
	      triggerHook: 'onEnter',
	      triggerElement: el
	    }).on('start', function(e) {
	      if (!number.animated) {
	        return number.start();
	      }
	    });
	  });
	};


/***/ },
/* 6 */
/***/ function(module, exports) {

	var Parallax;
	
	Parallax = (function() {
	  var defaults;
	
	  defaults = {
	    delta: -100,
	    shift: 0
	  };
	
	  function Parallax(selector, options) {
	    this.init(selector, options);
	    return this;
	  }
	
	  Parallax.prototype.init = function(selector, options) {
	    var htmlOptions;
	    if (options == null) {
	      options = {};
	    }
	    this.el = selector instanceof jQuery ? selector : $(selector);
	    htmlOptions = this.htmlData();
	    this.props = $.extend({}, defaults, htmlOptions, options);
	    if (this.props.shift) {
	      return this.el.css({
	        top: this.props.shift + "px"
	      });
	    }
	  };
	
	  Parallax.prototype.htmlData = function() {
	    var data, obj;
	    obj = {};
	    data = this.el.data('parallax');
	    if ($.isNumeric(data)) {
	      obj.delta = data;
	    } else if (typeof data === 'object') {
	      obj = data;
	    }
	    return obj;
	  };
	
	  Parallax.prototype.move = function(progress) {
	    var val;
	    val = Math.round(this.props.delta * progress);
	    return this.el.css({
	      transform: "translate3d(0, " + val + "px, 0)"
	    });
	  };
	
	  return Parallax;
	
	})();
	
	module.exports = Parallax;


/***/ },
/* 7 */
/***/ function(module, exports) {

	var NumberIncrease,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
	
	NumberIncrease = (function() {
	  function NumberIncrease(selector, options) {
	    if (options == null) {
	      options = {};
	    }
	    this._render = bind(this._render, this);
	    this.init(selector, options);
	  }
	
	  NumberIncrease.prototype.init = function(selector, options) {
	    this.el = $(selector);
	    this.dataString = this.el.data('number') != null ? this.el.data('number').split(',', 3) : [0, 100, 1000];
	    this.initValue = options.initValue != null ? options.initValue : parseInt(this.dataString[0]);
	    this.targetValue = options.targetValue != null ? options.targetValue : parseInt(this.dataString[1]);
	    this.duration = options.duration != null ? options.duration : parseInt(this.dataString[2]);
	    this.animated = false;
	    return this.reset();
	  };
	
	  NumberIncrease.prototype.start = function() {
	    this.animated = true;
	    return $({
	      value: this.initValue
	    }).animate({
	      value: this.targetValue
	    }, {
	      duration: this.duration,
	      easing: 'easeOutQuart',
	      step: (function(_this) {
	        return function(num) {
	          return _this._render(num);
	        };
	      })(this)
	    });
	  };
	
	  NumberIncrease.prototype.reset = function() {
	    return this._render(this.initValue);
	  };
	
	  NumberIncrease.prototype._commaSeparateNumber = function(val) {
	    while (/(\d+)(\d{3})/.test(val.toString())) {
	      val = val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
	    }
	    return val;
	  };
	
	  NumberIncrease.prototype._render = function(value) {
	    return this.el.text(Math.round(value));
	  };
	
	  return NumberIncrease;
	
	})();
	
	module.exports = NumberIncrease;


/***/ },
/* 8 */,
/* 9 */
/***/ function(module, exports) {

	var ZoomOut;
	
	ZoomOut = (function() {
	  var defaults;
	
	  defaults = {
	    minScale: 0.6,
	    minOpacity: 0.3
	  };
	
	  function ZoomOut(selector, options) {
	    this.init(selector, options);
	    return this;
	  }
	
	  ZoomOut.prototype.init = function(selector, options) {
	    if (options == null) {
	      options = {};
	    }
	    this.props = $.extend(defaults, options);
	    this.el = selector instanceof jQuery ? selector : $(selector);
	    this.scaleDelta = 1 - this.props.minScale;
	    return this.opacityDelta = 1 - this.props.minOpacity;
	  };
	
	  ZoomOut.prototype.zoomOut = function(progress) {
	    var scaleValue;
	    scaleValue = 1 - this.scaleDelta * progress;
	    return this.el.css({
	      transform: "scale3d(" + scaleValue + ", " + scaleValue + ", 1)",
	      opacity: 1 - this.opacityDelta * progress
	    });
	  };
	
	  return ZoomOut;
	
	})();
	
	module.exports = ZoomOut;


/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = function() {
	  var container, moreBtn, moreContainer, readMoreBtn, toggleButtonText, toggleReadMore;
	  container = $('.testimonials');
	  moreContainer = container.find('.testimonials__more');
	  moreBtn = container.find('.testimonials__buttons .link');
	  readMoreBtn = container.find('.testimonial .link');
	  moreBtn.on('click', function(e) {
	    e.preventDefault();
	    moreContainer.slideDown(300);
	    return setTimeout(function() {
	      return container.addClass('is-show-more');
	    }, 500);
	  });
	  readMoreBtn.on('click', function(e) {
	    e.preventDefault();
	    return toggleReadMore(this);
	  });
	  toggleButtonText = function(button) {
	    var buttonALtText, buttonText;
	    buttonText = button.text();
	    buttonALtText = button.data('alt-text');
	    button.text(buttonALtText);
	    return button.data('alt-text', buttonText);
	  };
	  return toggleReadMore = function(context) {
	    var expanded, testimonial, text, textHeight;
	    testimonial = $(context).parents('.testimonial');
	    text = testimonial.find('.testimonial__text');
	    expanded = testimonial.hasClass('is-expanded') ? true : false;
	    textHeight = text[0].scrollHeight;
	    if (expanded) {
	      text.animate({
	        height: 120
	      }, 500, function() {
	        text.css({
	          height: ''
	        });
	        return toggleButtonText($(context));
	      });
	    } else {
	      text.animate({
	        height: textHeight
	      }, 500, function() {
	        return toggleButtonText($(context));
	      });
	    }
	    return testimonial.toggleClass('is-expanded');
	  };
	};


/***/ },
/* 11 */
/***/ function(module, exports) {

	var map, pointsOnMap, mapStyle;
	
	mapStyle = [
	  {
	    "featureType": "all",
	    "elementType": "labels.text.fill",
	    "stylers": [
	      {
	        "saturation": 36
	      },
	      {
	        "color": "#000000"
	      },
	      {
	        "lightness": 40
	      }
	    ]
	  },
	  {
	    "featureType": "all",
	    "elementType": "labels.text.stroke",
	    "stylers": [
	      {
	        "visibility": "on"
	      },
	      {
	        "color": "#000000"
	      },
	      {
	        "lightness": 16
	      }
	    ]
	  },
	  {
	    "featureType": "all",
	    "elementType": "labels.icon",
	    "stylers": [
	      {
	        "visibility": "off"
	      }
	    ]
	  },
	  {
	    "featureType": "administrative",
	    "elementType": "geometry.fill",
	    "stylers": [
	      {
	        "color": "#000000"
	      },
	      {
	        "lightness": 20
	      }
	    ]
	  },
	  {
	    "featureType": "administrative",
	    "elementType": "geometry.stroke",
	    "stylers": [
	      {
	        "color": "#000000"
	      },
	      {
	        "lightness": 17
	      },
	      {
	        "weight": 1.2
	      }
	    ]
	  },
	  {
	    "featureType": "landscape",
	    "elementType": "geometry",
	    "stylers": [
	      {
	        "color": "#000000"
	      },
	      {
	        "lightness": 20
	      }
	    ]
	  },
	  {
	    "featureType": "poi",
	    "elementType": "geometry",
	    "stylers": [
	      {
	        "color": "#000000"
	      },
	      {
	        "lightness": 21
	      }
	    ]
	  },
	  {
	    "featureType": "road.highway",
	    "elementType": "geometry.fill",
	    "stylers": [
	      {
	        "color": "#000000"
	      },
	      {
	        "lightness": 17
	      }
	    ]
	  },
	  {
	    "featureType": "road.highway",
	    "elementType": "geometry.stroke",
	    "stylers": [
	      {
	        "color": "#000000"
	      },
	      {
	        "lightness": 29
	      },
	      {
	        "weight": 0.2
	      }
	    ]
	  },
	  {
	    "featureType": "road.arterial",
	    "elementType": "geometry",
	    "stylers": [
	      {
	        "color": "#000000"
	      },
	      {
	        "lightness": 18
	      }
	    ]
	  },
	  {
	    "featureType": "road.local",
	    "elementType": "geometry",
	    "stylers": [
	      {
	        "color": "#000000"
	      },
	      {
	        "lightness": 16
	      }
	    ]
	  },
	  {
	    "featureType": "transit",
	    "elementType": "geometry",
	    "stylers": [
	      {
	        "color": "#000000"
	      },
	      {
	        "lightness": 19
	      }
	    ]
	  },
	  {
	    "featureType": "transit.station.rail",
	    "elementType": "all",
	    "stylers": [
	      {
	        "lightness": "19"
	      },
	      {
	        "gamma": "1.00"
	      },
	      {
	        "hue": "#00ffc5"
	      },
	      {
	        "saturation": "0"
	      }
	    ]
	  },
	  {
	    "featureType": "transit.station.rail",
	    "elementType": "geometry",
	    "stylers": [
	      {
	        "visibility": "off"
	      },
	      {
	        "weight": "0.01"
	      },
	      {
	        "color": "#65e7b6"
	      }
	    ]
	  },
	  {
	    "featureType": "transit.station.rail",
	    "elementType": "geometry.fill",
	    "stylers": [
	      {
	        "visibility": "on"
	      }
	    ]
	  },
	  {
	    "featureType": "transit.station.rail",
	    "elementType": "geometry.stroke",
	    "stylers": [
	      {
	        "visibility": "off"
	      },
	      {
	        "saturation": "-5"
	      }
	    ]
	  },
	  {
	    "featureType": "transit.station.rail",
	    "elementType": "labels",
	    "stylers": [
	      {
	        "visibility": "on"
	      }
	    ]
	  },
	  {
	    "featureType": "transit.station.rail",
	    "elementType": "labels.text.stroke",
	    "stylers": [
	      {
	        "visibility": "off"
	      }
	    ]
	  },
	  {
	    "featureType": "water",
	    "elementType": "geometry",
	    "stylers": [
	      {
	        "color": "#000000"
	      },
	      {
	        "lightness": 17
	      }
	    ]
	  }
	]
	
	pointsOnMap = [
	    [50.453000, 30.445960, 1, {
	        'head'    : 'Учебный центр «QAStartUP»',
	        'address' : 'Адрес: Вадима Гетьмана, 1-Б',
	        'tel'     : 'Телефон: (096) 255-45-49, (093) 615-30-90'
	    }],
	];
	
	// Function return array of markers that was create from "locations" and added to "map"
	function setMarkers(map, locations) {
	    var markers = [];
	    var image = new google.maps.MarkerImage('img/svg/map-marker.svg', null, null, null, new google.maps.Size(40,58));
	    for (var i = 0; i < locations.length; i++) {
	        var point    = locations[i];
	        var myLatlng = new google.maps.LatLng(point[0], point[1]);
	        var marker   = new google.maps.Marker({
	            position : myLatlng,
	            map      : map,
	            icon     : image,
	            title    : point[3].head,
	            zIndex   : point[2]
	        });
	        marker.infoContent = point[3];
	        markers.push(marker);
	    }
	    return markers;
	}
	
	// After function is complete all marker in array will contain object with info for infowindow
	function setInfoWindowContent(arrayOfMarkers, infoWindow) {
	    for (var i = 0; i < arrayOfMarkers.length; i++) {
	        google.maps.event.addListener(arrayOfMarkers[i], 'click', function() {
	            var content = composeInfoWindowContent(this.infoContent);
	            infoWindow.setContent(content);
	            infoWindow.open(map, this);
	        });
	    }
	}
	
	function composeInfoWindowContent(data) {
	    return '<ul class="marker-info">' +
	            '<li class="marker-info__head">'     + data.head    + '</li>' +
	            '<li class="marker-info__address">'  + data.address + '</li>' +
	            '<li class="marker-info__tel">'      + data.tel     + '</li>' +
	        '</ul>';
	    }
	
	window.initMapInContactsArea = function initMap() {
	    var mapOptions = {
	        zoom: 16,
	        disableDefaultUI: true,
	        scrollwheel: false,
	        center: new google.maps.LatLng(50.454870, 30.435763),
	        styles: mapStyle
	    };
	
	    map = new google.maps.Map(document.getElementById('map'), mapOptions);
	
	    var mapMarkers = setMarkers(map, pointsOnMap);
	    var mapInfoWindow = new google.maps.InfoWindow();
	
	    setInfoWindowContent(mapMarkers, mapInfoWindow);
	}
	
	function loadScript() {
	    var script = document.createElement('script');
	    script.type = 'text/javascript';
	    script.src = 'https://maps.googleapis.com/maps/api/js?v=3' +
	      '&signed_in=false&callback=initMapInContactsArea';
	    document.body.appendChild(script);
	}
	
	module.exports = loadScript;
	
	


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var openModal, toggleBodyScroll;
	
	toggleBodyScroll = __webpack_require__(13);
	
	openModal = function(selector, options) {
	  var afterClose, afterOpen, beforeClose, beforeOpen, closeBtn, modal, origTitleText, questionTitle, title;
	  if (options == null) {
	    options = {};
	  }
	  modal = selector instanceof $ ? selector : $(selector);
	  closeBtn = modal.find('.modal__close, .js-modal-close');
	  beforeOpen = options.beforeOpen, afterOpen = options.afterOpen, beforeClose = options.beforeClose, afterClose = options.afterClose, questionTitle = options.questionTitle;
	  if (typeof beforeOpen === "function") {
	    beforeOpen();
	  }
	  if (questionTitle) {
	    title = modal.find('.question__title');
	    origTitleText = title.html();
	    title.html(questionTitle);
	  }
	  toggleBodyScroll.disable();
	  modal.fadeIn(500, function() {
	    modal.addClass('is-open');
	    modal.find('.modal__body').scrollTop(0);
	    return setTimeout(function() {
	      modal.addClass('draw');
	      if (typeof afterOpen === "function") {
	        afterOpen();
	      }
	      return $(window).trigger('modalOpen', [modal]);
	    }, 500);
	  });
	  return closeBtn.one('click', function(e) {
	    e.preventDefault();
	    if (typeof beforeClose === "function") {
	      beforeClose();
	    }
	    toggleBodyScroll.enable();
	    closeBtn.off('click');
	    return modal.removeClass('is-open draw').delay(500).fadeOut(500, function() {
	      if (typeof afterClose === "function") {
	        afterClose();
	      }
	      if (questionTitle) {
	        title.html(origTitleText);
	      }
	      return $(window).trigger('modalClose', [modal]);
	    });
	  });
	};
	
	module.exports = openModal;


/***/ },
/* 13 */
/***/ function(module, exports) {

	var bodyClass;
	
	bodyClass = 'is-modal-opened';
	
	module.exports.disable = function() {
	  return $('body').addClass(bodyClass).css({
	    overflow: 'hidden'
	  });
	};
	
	module.exports.enable = function() {
	  return $('body').removeClass(bodyClass).css({
	    overflow: ''
	  });
	};


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var SM, SliderBox, ZoomOut;
	
	SM = __webpack_require__(4);
	
	ZoomOut = __webpack_require__(9);
	
	SliderBox = (function() {
	  var defaults;
	
	  defaults = {
	    wrapper: 'slider-box-wrapper',
	    slider: '.slider',
	    sliderTrack: '.slider__track',
	    backgroundLayer: '.slider-box__bg',
	    zoomOutTrigger: false
	  };
	
	  function SliderBox(selector, options) {
	    this.init(selector, options);
	    return this;
	  }
	
	  SliderBox.prototype.init = function(selector, options) {
	    if (options == null) {
	      options = {};
	    }
	    this.el = selector instanceof $ ? selector : $(selector);
	    this.props = $.extend({}, defaults, options);
	    this.wrapper = this.el.parent();
	    this.slider = this.el.find(this.props.slider);
	    this.sliderTrack = this.el.find(this.props.sliderTrack);
	    this.duration = null;
	    this._initSlider();
	    if (this.props.zoomOutTrigger) {
	      return this.initZoomOutScene();
	    } else {
	      return this.initSimpleScene();
	    }
	  };
	
	  SliderBox.prototype.scrollSlider = function(progress) {
	    return this.sliderTrack.css({
	      x: -this.duration * progress
	    });
	  };
	
	  SliderBox.prototype.makeFixed = function() {
	    this.el.css({
	      position: 'fixed',
	      top: 0,
	      left: 0,
	      right: 0
	    });
	    return this.wrapper.css({
	      height: this.el.outerHeight(),
	      boxSizing: 'content-box'
	    });
	  };
	
	  SliderBox.prototype.makeStatic = function() {
	    this.el.css({
	      position: '',
	      top: '',
	      left: '',
	      right: ''
	    });
	    return this.wrapper.css({
	      height: '',
	      boxSizing: ''
	    });
	  };
	
	  SliderBox.prototype.initSimpleScene = function() {
	    return SM.addScene({
	      duration: this.duration,
	      triggerHook: 'onLeave',
	      triggerElement: this.wrapper[0]
	    }).on('progress', (function(_this) {
	      return function(e) {
	        return _this.scrollSlider(e.progress);
	      };
	    })(this)).setPin(this.el[0]);
	  };
	
	  SliderBox.prototype.initZoomOutScene = function() {
	    var bg;
	    bg = new ZoomOut(this.el.find(this.props.backgroundLayer));
	    SM.addScene({
	      duration: this.duration,
	      triggerHook: 'onLeave',
	      triggerElement: this.wrapper[0]
	    }).on('start', (function(_this) {
	      return function(e) {
	        if (e.scrollDirection === 'FORWARD') {
	          _this.makeFixed();
	        }
	        if (e.scrollDirection === 'REVERSE') {
	          return _this.makeStatic();
	        }
	      };
	    })(this)).on('progress', (function(_this) {
	      return function(e) {
	        return _this.scrollSlider(e.progress);
	      };
	    })(this));
	    return SM.addScene({
	      duration: '100%',
	      triggerHook: 'onEnter',
	      triggerElement: this.props.zoomOutTrigger
	    }).on('progress', function(e) {
	      return bg.zoomOut(e.progress);
	    }).on('end', (function(_this) {
	      return function(e) {
	        return _this.el.toggle();
	      };
	    })(this));
	  };
	
	  SliderBox.prototype._initSlider = function() {
	    var sliderHeight, sliderWidth, trackWidth;
	    sliderHeight = this.slider.outerHeight();
	    this.slider.css({
	      height: sliderHeight
	    });
	    this.sliderTrack.css({
	      position: 'absolute',
	      top: 0,
	      left: 0
	    });
	    sliderWidth = this.slider.outerWidth();
	    trackWidth = this.sliderTrack.outerWidth();
	    this.duration = trackWidth - sliderWidth;
	    return this.wrapper.css({
	      paddingBottom: this.duration
	    });
	  };
	
	  return SliderBox;
	
	})();
	
	module.exports = SliderBox;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var EVENT_NAME, ModalPlayer, openModal,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
	
	openModal = __webpack_require__(12);
	
	EVENT_NAME = 'YTAPIReady';
	
	module.exports.initPlayerApi = function() {
	  var firstScriptTag, tag;
	  tag = document.createElement('script');
	  tag.src = "https://www.youtube.com/iframe_api";
	  firstScriptTag = document.getElementsByTagName('script')[0];
	  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	  return window.onYouTubeIframeAPIReady = function() {
	    return $(window).trigger(EVENT_NAME);
	  };
	};
	
	module.exports.ModalPlayer = ModalPlayer = (function() {
	  function ModalPlayer(element, triggerElement, options) {
	    if (options == null) {
	      options = {};
	    }
	    this.pauseVideo = bind(this.pauseVideo, this);
	    this.playVideo = bind(this.playVideo, this);
	    this.init(element, triggerElement, options);
	    return this;
	  }
	
	  ModalPlayer.prototype.init = function(element, triggerElement, options) {
	    this.videoContainer = element instanceof $ ? element : $(element);
	    this.triggerElement = triggerElement instanceof $ ? triggerElement : $(triggerElement);
	    this.modal = this.videoContainer.parents('.modal');
	    this.videoId = options.videoId || this.videoContainer.attr('data-video-id') || 'xEhaVhta7sI';
	    this.player = null;
	    return this._initEvents();
	  };
	
	  ModalPlayer.prototype.playVideo = function() {
	    if (this.player) {
	      return this.player.playVideo();
	    }
	  };
	
	  ModalPlayer.prototype.pauseVideo = function() {
	    if (this.player) {
	      return this.player.pauseVideo();
	    }
	  };
	
	  ModalPlayer.prototype._buildPlayer = function() {
	    return this.player = new YT.Player(this.videoContainer[0], {
	      height: '100%',
	      width: '100%',
	      videoId: this.videoId
	    });
	  };
	
	  ModalPlayer.prototype._initEvents = function() {
	    $(window).on(EVENT_NAME, (function(_this) {
	      return function() {
	        return _this._buildPlayer();
	      };
	    })(this));
	    return this.triggerElement.on('click', (function(_this) {
	      return function(e) {
	        e.preventDefault();
	        return openModal(_this.modal, {
	          afterOpen: _this.playVideo,
	          beforeClose: _this.pauseVideo
	        });
	      };
	    })(this));
	  };
	
	  return ModalPlayer;

	})();


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var Form, hideFormMessage, resetFormFields, showFormMessage;
	
	__webpack_require__(17)(jQuery);
	
	showFormMessage = function(form) {
	  return form.parent().addClass('show-msg');
	};
	
	hideFormMessage = function(form) {
	  return form.parent().removeClass('show-msg');
	};
	
	resetFormFields = function(form) {
	  form.find('input, textarea').val('').filter('textarea').css('height', '');
	  return form.find('.field').removeClass('is-filled is-valid is-error');
	};
	
	Form = (function() {
	  function Form(selector, options) {
	    if (options == null) {
	      options = {};
	    }
	    this.form = selector instanceof $ ? selector : $(selector);
	    this.onValid = options.onValid, this.onError = options.onError;
	    this.form.attr('autocomplete', 'off');
	    this.initPhoneField();
	    this.initInputField();
	    this.initTextareaAutosize();
	    this.initValidation();
	    this.initEvents();
	    return this;
	  }
	
	  Form.prototype.initEvents = function() {
	    this.form.parent().find('.form-msg-text .link').on('click', (function(_this) {
	      return function(e) {
	        return _this.hideMessage();
	      };
	    })(this));
	    return this.form.find('input, textarea').on('focus', function(e) {
	      return $(this).parent().removeClass('is-error');
	    });
	  };
	
	  Form.prototype.initPhoneField = function() {
	    return this.form.find('input[type="tel"]').mask("+380 (99) 999-99-99", {
	      placeholder: "+380 (__) ___-__-__",
	      autoclear: false
	    });
	  };
	
	  Form.prototype.initInputField = function() {
	    return this.form.find('input, textarea').inputField();
	  };
	
	  Form.prototype.initTextareaAutosize = function() {
	    return autosize(this.form.find('textarea'));
	  };
	
	  Form.prototype.initValidation = function() {
	    var _this;
	    _this = this;
	    return this.form.validetta({
	      showErrorMessages: false,
	      errorClass: 'is-error',
	      validClass: 'is-valid',
	      realTime: true,
	      validators: {
	        regExp: {
	          phone: {
	            pattern: /^\+380\s\(\d{2}\)\s\d{3}\-\d{2}\-\d{2}/,
	            errorMessage: 'Phone number is not valid!'
	          }
	        }
	      },
	      onValid: function(e) {
	        e.preventDefault();
	        if (typeof _this.onValid === "function") {
	          _this.onValid();
	        }
	        _this.showMessage();
	        return setTimeout(function() {
	          return _this.resetFields();
	        }, 500);
	      },
	      onError: function(e) {
	        e.preventDefault();
	        return typeof _this.onError === "function" ? _this.onError() : void 0;
	      }
	    });
	  };
	
	  Form.prototype.showMessage = function() {
	    return showFormMessage(this.form);
	  };
	
	  Form.prototype.hideMessage = function() {
	    return hideFormMessage(this.form);
	  };
	
	  Form.prototype.resetFields = function() {
	    return resetFormFields(this.form);
	  };
	
	  return Form;
	
	})();
	
	Form.resetFields = function(form) {
	  return resetFormFields(form);
	};
	
	Form.showMessage = function(form) {
	  return showFormMessage(form);
	};
	
	Form.hideMessage = function(form) {
	  return hideFormMessage(form);
	};
	
	$(window).on('modalClose', function(e, modal) {
	  var form;
	  form = modal.find('form');
	  if (form.length) {
	    Form.resetFields(form);
	    if (form.parent('.show-msg').length) {
	      return Form.hideMessage(form);
	    }
	  }
	});
	
	module.exports = Form;


/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = function($) {
	  var InputField;
	  InputField = (function() {
	    var defaults;
	
	    defaults = {
	      dirtyClass: 'is-filled'
	    };
	
	    function InputField(selector, options) {
	      if (options == null) {
	        options = {};
	      }
	      this.init(selector, options);
	      return this;
	    }
	
	    InputField.prototype.init = function(selector, options) {
	      this.props = $.extend({}, defaults, options);
	      this.input = selector instanceof $ ? selector : $(selector);
	      this.field = this.input.parent();
	      this.label = this.input.siblings('label');
	      return this._initEvents();
	    };
	
	    InputField.prototype.checkDirty = function() {
	      var val;
	      val = this.input.val();
	      if (val) {
	        return this.field.addClass(this.props.dirtyClass);
	      } else {
	        return this.field.removeClass(this.props.dirtyClass);
	      }
	    };
	
	    InputField.prototype._initEvents = function() {
	      return this.input.on('blur', (function(_this) {
	        return function() {
	          return _this.checkDirty();
	        };
	      })(this));
	    };
	
	    return InputField;
	
	  })();
	  return $.fn.inputField = function(options) {
	    return this.each(function(index, el) {
	      return new InputField(el, options);
	    });
	  };
	};


/***/ }
/******/ ]);
//# sourceMappingURL=common.js.map