webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Form, Graph, ModalPlayer, SliderBox, header, initCommonScrollScenes, initMap, initPlayerApi, initSpecificScrollScenes, initTestimonials, makeTopareaInvisible, makeTopareaVisible, openModal, toparea;
	
	__webpack_require__(1)(jQuery);
	
	__webpack_require__(2)(jQuery);
	
	header = __webpack_require__(3);
	
	initCommonScrollScenes = __webpack_require__(5);
	
	initSpecificScrollScenes = __webpack_require__(23);
	
	initTestimonials = __webpack_require__(10);
	
	initMap = __webpack_require__(11);
	
	Graph = __webpack_require__(24);
	
	SliderBox = __webpack_require__(14);
	
	openModal = __webpack_require__(12);
	
	initPlayerApi = __webpack_require__(15).initPlayerApi;
	
	ModalPlayer = __webpack_require__(15).ModalPlayer;
	
	Form = __webpack_require__(16);
	
	toparea = $('.toparea__inner, .header');
	
	makeTopareaInvisible = function() {
	  return toparea.addClass('hide');
	};
	
	makeTopareaVisible = function() {
	  toparea.addClass('transition').removeClass('hide');
	  return setTimeout(function() {
	    return toparea.removeClass('transition').addClass('draw');
	  }, 1500);
	};
	
	Pace.on('done', function() {
	  $('#toparea-video')[0].play();
	  return setTimeout(function() {
	    return makeTopareaVisible();
	  }, 1000);
	});
	
	$(document).ready(function() {
	  var advantagesSliderBox, graph;
	  makeTopareaInvisible();
	  initTestimonials();
	  initCommonScrollScenes();
	  initSpecificScrollScenes();
	  initMap();
	  header.init({
	    offset: 190
	  });
	  graph = new Graph('.stats__graph', {
	    values1: [500, 1500, 2350, 3200],
	    values2: [456, 1140, 720, 187],
	    valueLabels: ['Junior QA', 'Middle QA', 'Senior QA', 'QA Tech Lead']
	  });
	  new ModalPlayer('#player', '.toparea .play-button');
	  initPlayerApi();
	  $('.faq__list').accordion({
	    itemSelector: '.faq-item',
	    buttonSelector: '.faq-item__button',
	    contentSelector: '.faq-item__answer'
	  });
	  $('.js-question-toggle').on('click', function() {
	    var formContainer;
	    formContainer = $('.question__form');
	    return formContainer.slideToggle(500, function() {
	      return formContainer.toggleClass('draw');
	    });
	  });
	  $('.partners__list').slick({
	    slidesToShow: 5,
	    slidesToScroll: 1,
	    speed: 1000,
	    autoplay: true,
	    autoplaySpeed: 3000,
	    pauseOnHover: false,
	    slide: '.partners__partner',
	    prevArrow: '<button type="button" class="carousel-prev"></button>',
	    nextArrow: '<button type="button" class="carousel-next"></button>'
	  });
	  advantagesSliderBox = new SliderBox('.advantages .slider-box', {
	    zoomOutTrigger: '.content-layer-1'
	  });
	  $('form').each(function(index, el) {
	    return new Form(el, {
	      onValid: function() {
	        return alert('Form valid!');
	      },
	      onError: function() {
	        return alert('Form error!');
	      }
	    });
	  });
	  $('.news .slider-item__title').hoverGallery({
	    container: '.news__bg'
	  });
	  return $('[data-modal]').on('click', function(e) {
	    e.preventDefault();
	    return openModal($(this).data('modal'));
	  });
	});


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var NumberIncrease, SM, ZoomOut;
	
	SM = __webpack_require__(4);
	
	ZoomOut = __webpack_require__(9);
	
	NumberIncrease = __webpack_require__(7);
	
	module.exports = function() {
	  var $coursesContainer, $nominationTitle, courcesNumber, topareaVideo;
	  topareaVideo = new ZoomOut('.toparea__video');
	  SM.addScene({
	    duration: '100%',
	    triggerHook: 'onLeave',
	    triggerElement: 'body'
	  }).on('progress', function(e) {
	    return topareaVideo.zoomOut(e.progress);
	  }).on('end', function(e) {
	    return $('.toparea').toggle();
	  });
	  $coursesContainer = $('.courses__container');
	  courcesNumber = new NumberIncrease($coursesContainer.find('.course-note__value > span'), {
	    initValue: 0,
	    targetValue: 87,
	    duration: 2000
	  });
	  SM.addScene({
	    offset: 250,
	    duration: 330,
	    triggerHook: 'onEnter',
	    triggerElement: $coursesContainer[0]
	  }).on('start', function(e) {
	    $coursesContainer.find('.course__head, .course__body').toggleClass('draw');
	    if (e.scrollDirection === 'FORWARD') {
	      return setTimeout(function() {
	        return courcesNumber.start();
	      }, 600);
	    }
	  }).on('end', function(e) {
	    return $coursesContainer.find('.course__footer').toggleClass('draw');
	  });
	  $nominationTitle = $('.nomination .banner-title');
	  return SM.addScene({
	    offset: 200,
	    triggerHook: 'onEnter',
	    triggerElement: $nominationTitle[0]
	  }).on('start', function(e) {
	    return $nominationTitle.toggleClass('draw');
	  });
	};


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var Graph, SM, debounce, s,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
	
	s = window.Snap;
	
	SM = __webpack_require__(4);
	
	debounce = __webpack_require__(25);
	
	Graph = (function() {
	  var defaults;
	
	  defaults = {
	    values1: [500, 1500, 2350, 3200],
	    values2: [456, 1140, 720, 187],
	    valuesInitial: null,
	    valueLabels: ['Junior QA', 'Middle QA', 'Senior QA', 'QA Tech Lead'],
	    button1: $('.stats__buttons button').first(),
	    button2: $('.stats__buttons button').last(),
	    width: '100%',
	    maxWidth: 1140,
	    minWidth: 1140,
	    height: 400,
	    paddingY: 20,
	    pointRadius: 3.5,
	    yMax1: 4000,
	    yStep1: 500,
	    yMax2: 1600,
	    eventName: 'graphReady'
	  };
	
	  function Graph(selector, options) {
	    this._drawPoints = bind(this._drawPoints, this);
	    this.refresh = bind(this.refresh, this);
	    this.init(selector, options);
	  }
	
	  Graph.prototype.init = function(selector, options) {
	    var base;
	    if (options == null) {
	      options = {};
	    }
	    this.props = $.extend({}, defaults, options);
	    this.minY = this.props.paddingY;
	    this.maxY = this.props.height + this.props.paddingY;
	    this.paper = s(this.props.width, this.props.height + this.props.paddingY * 2);
	    this.container = selector instanceof $ ? selector : $(selector);
	    this.button1 = this.props.button1 instanceof $ ? this.props.button1 : $(this.props.button1);
	    this.button2 = this.props.button2 instanceof $ ? this.props.button2 : $(this.props.button2);
	    this.stateInitial = {
	      name: 'initial'
	    };
	    this.state1 = {
	      name: 'state1'
	    };
	    this.state2 = {
	      name: 'state2'
	    };
	    this.currentState = this.stateInitial;
	    this.active = false;
	    this.isReady = false;
	    this.inProgress = false;
	    if ((base = this.props).valuesInitial == null) {
	      base.valuesInitial = this.props.values1.map(function() {
	        return 0;
	      });
	    }
	    this.paper.node.style.display = 'block';
	    this.paper.node.style.marginTop = -this.props.paddingY;
	    this.paper.node.style.marginBottom = -this.props.paddingY;
	    this.paper.prependTo(this.container[0]);
	    this._initEvents();
	    this._buildScene();
	    return this.renderInitialState();
	  };
	
	  Graph.prototype.changeState = function(state, duration, cb) {
	    var easing;
	    if (duration == null) {
	      duration = 800;
	    }
	    easing = mina.easein;
	    if (this.inProgress || state.name === this.currentState.name) {
	      return;
	    }
	    this.inProgress = true;
	    this.line.animate({
	      path: state.linePath
	    }, duration, easing);
	    this.fill.animate({
	      path: state.fillPath
	    }, duration, easing, (function(_this) {
	      return function() {
	        _this.inProgress = false;
	        if (typeof cb === 'function') {
	          return cb();
	        }
	      };
	    })(this));
	    this.currentState.axisYGroup.animate({
	      opacity: 0
	    }, duration / 2, easing, function() {
	      return state.axisYGroup.animate({
	        opacity: 1
	      }, duration / 2, easing);
	    });
	    if (this.pointsGroups != null) {
	      this.pointsGroups.forEach((function(_this) {
	        return function(group, index) {
	          return _this._changePointPosition(state, index, duration);
	        };
	      })(this));
	    }
	    return this.currentState = state;
	  };
	
	  Graph.prototype.activate = function() {
	    this.changeState(this.state1, null, this._drawPoints);
	    return this.active = true;
	  };
	
	  Graph.prototype.render = function(rerender) {
	    if (rerender == null) {
	      rerender = false;
	    }
	    this._calculations();
	    this._drawGrid();
	    this._drawPaths();
	    if (rerender) {
	      this._refreshState();
	      return this._drawPoints(false);
	    } else {
	      setTimeout((function(_this) {
	        return function() {
	          return _this.changeState(_this.state1, null, _this._drawPoints);
	        };
	      })(this), 1000);
	      return this.active = true;
	    }
	  };
	
	  Graph.prototype.renderInitialState = function() {
	    this._calculations();
	    this._drawGrid();
	    return this._drawPaths(this.stateInitial);
	  };
	
	  Graph.prototype.refresh = function() {
	    if ($(window).width() <= this.props.minWidth) {
	      return;
	    }
	    this.paper.clear();
	    this._calculations();
	    if (this.currentState.name === this.stateInitial.name) {
	      return this.renderInitialState();
	    } else {
	      this._drawGrid();
	      this._drawPaths(this.currentState);
	      this._showAxisY();
	      return this._drawPoints(false);
	    }
	  };
	
	  Graph.prototype._refreshState = function(state) {
	    if (state == null) {
	      state = this.currentState;
	    }
	    this.line.attr({
	      path: state.linePath
	    });
	    this.fill.attr({
	      path: state.fillPath
	    });
	    return this._showAxisY(state);
	  };
	
	  Graph.prototype._drawGrid = function() {
	    var axisLabelAttr, axisYGroup1, axisYGroup2, drawLineAfter, drawLineBefore, gridGroup, height, i, index, initialX, j, len, range1, range2, results, value, y;
	    axisYGroup1 = this.state1.axisYGroup = this.stateInitial.axisYGroup = this.paper.g();
	    axisYGroup2 = this.state2.axisYGroup = this.paper.g();
	    gridGroup = this.gridGroup = this.paper.g();
	    initialX = this.paddingX;
	    height = this.props.height;
	    axisLabelAttr = {
	      alignmentBaseline: 'middle',
	      fontSize: 14,
	      fill: 'rgba(255, 255, 255, 0.3)',
	      "class": 'graph-axis-label'
	    };
	    axisYGroup1.attr({
	      "class": 'graph-axis-y',
	      opacity: 0
	    });
	    axisYGroup2.attr({
	      "class": 'graph-axis-y',
	      opacity: 0
	    });
	    gridGroup.addClass('graph-grid').attr({
	      stroke: '#F7F7F7',
	      opacity: 0.1,
	      strokeWidth: 1
	    });
	    range1 = (function() {
	      var j, ref, ref1, results;
	      results = [];
	      for (i = j = 0, ref = this.props.yMax1, ref1 = this.props.yStep1; ref1 > 0 ? j <= ref : j >= ref; i = j += ref1) {
	        results.push(i);
	      }
	      return results;
	    }).call(this);
	    range2 = (function() {
	      var j, ref, ref1, results;
	      results = [];
	      for (i = j = 0, ref = this.props.yMax2, ref1 = this.props.yMax2 / (range1.length - 1); ref1 > 0 ? j <= ref : j >= ref; i = j += ref1) {
	        results.push(i);
	      }
	      return results;
	    }).call(this);
	    drawLineBefore = function(x, y) {
	      return gridGroup.line(x - 27, y, 0, y);
	    };
	    drawLineAfter = function(x, y) {
	      return gridGroup.line(x + 73, y, '100%', y);
	    };
	    results = [];
	    for (index = j = 0, len = range1.length; j < len; index = ++j) {
	      value = range1[index];
	      y = this.minY + height - index * height / (range1.length - 1);
	      axisYGroup1.text(initialX, y, "$" + value).attr(axisLabelAttr);
	      axisYGroup2.text(initialX, y, "" + range2[index]).attr(axisLabelAttr);
	      drawLineBefore(initialX, y);
	      results.push(drawLineAfter(initialX, y));
	    }
	    return results;
	  };
	
	  Graph.prototype._drawPaths = function(state) {
	    var gradient;
	    if (state == null) {
	      state = this.stateInitial;
	    }
	    this.graphGroup = this.paper.g();
	    gradient = this.paper.gradient("l(1, 1, 1, 1)#20d8a2-#21e0c7");
	    this.graphGroup.attr({
	      "class": 'graph-path'
	    });
	    this.line = this.graphGroup.path(state.linePath).attr({
	      stroke: '#20d8a2',
	      strokeWidth: 2,
	      fill: 'none',
	      "class": 'graph-path-line'
	    });
	    return this.fill = this.graphGroup.path(state.fillPath).attr({
	      fill: gradient,
	      opacity: 0.2,
	      "class": 'graph-path-fill'
	    });
	  };
	
	  Graph.prototype._drawPoints = function(animations, sequence) {
	    var timeout;
	    if (animations == null) {
	      animations = true;
	    }
	    if (sequence == null) {
	      sequence = false;
	    }
	    timeout = animations && sequence ? 500 : 0;
	    this.pointsGroups = [];
	    this.currentState.points.forEach((function(_this) {
	      return function(point, index, arr) {
	        return setTimeout(function() {
	          var group;
	          group = _this._drawPoint(point.x, point.y, _this.props.valueLabels[index], animations);
	          _this.pointsGroups.push(group);
	          if (index === arr.length - 1) {
	            $(window).trigger(_this.props.eventName);
	            return _this.isReady = true;
	          }
	        }, timeout * index);
	      };
	    })(this));
	    return this.pointsGroups;
	  };
	
	  Graph.prototype._drawPoint = function(x, y, labelText, animations) {
	    var label, line, lineLength, point, pointGroup;
	    if (animations == null) {
	      animations = true;
	    }
	    point = this.paper.circle(x, y, 0).attr({
	      "class": 'graph-point',
	      fill: '#20d8a2'
	    });
	    line = this.paper.path("M" + x + " " + y + "L" + (x + 35) + " " + (y - 60) + "L" + (x + 45) + " " + (y - 60)).attr({
	      "class": 'graph-point-line',
	      stroke: 'rgba(255, 255, 255, 0.5)',
	      strokeWidth: 1,
	      fill: 'none'
	    });
	    lineLength = line.getTotalLength();
	    line.attr({
	      strokeDashoffset: lineLength,
	      strokeDasharray: lineLength
	    });
	    label = this.paper.text(x, y, labelText).attr({
	      "class": 'graph-point-label',
	      fontSize: 14,
	      opacity: 0,
	      fill: '#FFF',
	      alignmentBaseline: 'middle'
	    }).transform('t53 -60');
	    if (animations) {
	      point.animate({
	        r: this.props.pointRadius
	      }, 2000, mina.elastic);
	      line.animate({
	        strokeDashoffset: 0
	      }, 500, mina.linear, function() {
	        return label.animate({
	          opacity: 1
	        }, 1000, mina.linear);
	      });
	    } else {
	      point.attr({
	        r: this.props.pointRadius
	      });
	      line.attr({
	        strokeDashoffset: 0
	      });
	      label.attr({
	        opacity: 1
	      });
	    }
	    pointGroup = this.paper.g(line, label, point);
	    pointGroup.addClass('graph-point-group');
	    return pointGroup;
	  };
	
	  Graph.prototype._showAxisY = function(state) {
	    if (state == null) {
	      state = this.currentState;
	    }
	    return state.axisYGroup.attr({
	      opacity: 1
	    });
	  };
	
	  Graph.prototype._initEvents = function() {
	    $(window).on('resize', debounce(this.refresh, 200).bind(this));
	    return $(window).one(this.props.eventName, (function(_this) {
	      return function() {
	        _this.button1.on('click', function(e) {
	          e.preventDefault();
	          _this.button2.removeClass('is-active');
	          _this.button1.addClass('is-active');
	          return _this.changeState(_this.state1);
	        });
	        return _this.button2.on('click', function(e) {
	          e.preventDefault();
	          _this.button2.addClass('is-active');
	          _this.button1.removeClass('is-active');
	          return _this.changeState(_this.state2);
	        });
	      };
	    })(this));
	  };
	
	  Graph.prototype._calculations = function() {
	    var coordinates, maxWidth, minWidth, width;
	    width = this.container[0].clientWidth;
	    maxWidth = this.props.maxWidth;
	    minWidth = Math.min(maxWidth, width);
	    this.paddingX = width > maxWidth ? (width - maxWidth) / 2 : 0;
	    this.divisionValueX = minWidth / (this.props.values1.length + 1);
	    this.divisionValueY = this.props.height / this.props.yMax1;
	    coordinates = (function(_this) {
	      return function(value, index, multiplier) {
	        if (multiplier == null) {
	          multiplier = 1;
	        }
	        return {
	          x: _this.paddingX + _this.divisionValueX * (index + 1),
	          y: _this.minY + _this.props.height - value * multiplier * _this.divisionValueY
	        };
	      };
	    })(this);
	    this.stateInitial.yMultiplier = 1;
	    this.state1.yMultiplier = 1;
	    this.state2.yMultiplier = this.props.yMax1 / this.props.yMax2;
	    this.stateInitial.points = this.props.valuesInitial.map((function(_this) {
	      return function(value, index) {
	        return coordinates(value, index, _this.stateInitial.yMultiplier);
	      };
	    })(this));
	    this.state1.points = this.props.values1.map((function(_this) {
	      return function(value, index) {
	        return coordinates(value, index, _this.state1.yMultiplier);
	      };
	    })(this));
	    this.state2.points = this.props.values2.map((function(_this) {
	      return function(value, index) {
	        return coordinates(value, index, _this.state2.yMultiplier);
	      };
	    })(this));
	    this.stateInitial.linePath = this._pointsToSVGPath(this.stateInitial.points, false, 'bottom');
	    this.state1.linePath = this._pointsToSVGPath(this.state1.points);
	    this.state2.linePath = this._pointsToSVGPath(this.state2.points, false, 'bottom');
	    this.stateInitial.fillPath = this._pointsToSVGPath(this.stateInitial.points, true, 'bottom');
	    this.state1.fillPath = this._pointsToSVGPath(this.state1.points, true);
	    return this.state2.fillPath = this._pointsToSVGPath(this.state2.points, true, 'bottom');
	  };
	
	  Graph.prototype._changePointPosition = function(state, pointIndex, duration) {
	    var delta, point;
	    if (duration == null) {
	      duration = 1000;
	    }
	    delta = state.points[pointIndex].y - this.currentState.points[pointIndex].y;
	    point = this.pointsGroups[pointIndex];
	    return point.stop().animate({
	      transform: "t0," + delta + "..."
	    }, duration, mina.easein);
	  };
	
	  Graph.prototype._pointsToSVGPath = function(points, closePath, lastPoint) {
	    var j, len, pathStroke, point;
	    if (lastPoint == null) {
	      lastPoint = 'top';
	    }
	    pathStroke = "M0 " + this.maxY + " R";
	    for (j = 0, len = points.length; j < len; j++) {
	      point = points[j];
	      pathStroke += point.x + " " + point.y + " ";
	    }
	    if (lastPoint === 'top') {
	      pathStroke += this.container[0].clientWidth + " " + this.minY + " ";
	    } else if (lastPoint === 'bottom') {
	      pathStroke += this.container[0].clientWidth + " " + this.maxY + " ";
	    }
	    if (closePath) {
	      pathStroke += "V" + this.maxY + " Z";
	    }
	    return pathStroke;
	  };
	
	  Graph.prototype._buildScene = function() {
	    return SM.addScene({
	      triggerHook: 'onCenter',
	      triggerElement: this.container[0]
	    }).on('start', (function(_this) {
	      return function(e) {
	        _this.container.addClass('show-graph');
	        if (!_this.active) {
	          return _this.activate();
	        }
	      };
	    })(this));
	  };
	
	  return Graph;
	
	})();
	
	module.exports = Graph;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(26),
	    now = __webpack_require__(27);
	
	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * Creates a debounced function that delays invoking `func` until after `wait`
	 * milliseconds have elapsed since the last time the debounced function was
	 * invoked. The debounced function comes with a `cancel` method to cancel
	 * delayed invocations. Provide an options object to indicate that `func`
	 * should be invoked on the leading and/or trailing edge of the `wait` timeout.
	 * Subsequent calls to the debounced function return the result of the last
	 * `func` invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
	 * on the trailing edge of the timeout only if the the debounced function is
	 * invoked more than once during the `wait` timeout.
	 *
	 * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options] The options object.
	 * @param {boolean} [options.leading=false] Specify invoking on the leading
	 *  edge of the timeout.
	 * @param {number} [options.maxWait] The maximum time `func` is allowed to be
	 *  delayed before it's invoked.
	 * @param {boolean} [options.trailing=true] Specify invoking on the trailing
	 *  edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // avoid costly calculations while the window size is in flux
	 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	 *
	 * // invoke `sendMail` when the click event is fired, debouncing subsequent calls
	 * jQuery('#postbox').on('click', _.debounce(sendMail, 300, {
	 *   'leading': true,
	 *   'trailing': false
	 * }));
	 *
	 * // ensure `batchLog` is invoked once after 1 second of debounced calls
	 * var source = new EventSource('/stream');
	 * jQuery(source).on('message', _.debounce(batchLog, 250, {
	 *   'maxWait': 1000
	 * }));
	 *
	 * // cancel a debounced call
	 * var todoChanges = _.debounce(batchLog, 1000);
	 * Object.observe(models.todo, todoChanges);
	 *
	 * Object.observe(models, function(changes) {
	 *   if (_.find(changes, { 'user': 'todo', 'type': 'delete'})) {
	 *     todoChanges.cancel();
	 *   }
	 * }, ['delete']);
	 *
	 * // ...at some point `models.todo` is changed
	 * models.todo.completed = true;
	 *
	 * // ...before 1 second has passed `models.todo` is deleted
	 * // which cancels the debounced `todoChanges` call
	 * delete models.todo;
	 */
	function debounce(func, wait, options) {
	  var args,
	      maxTimeoutId,
	      result,
	      stamp,
	      thisArg,
	      timeoutId,
	      trailingCall,
	      lastCalled = 0,
	      maxWait = false,
	      trailing = true;
	
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  wait = wait < 0 ? 0 : (+wait || 0);
	  if (options === true) {
	    var leading = true;
	    trailing = false;
	  } else if (isObject(options)) {
	    leading = !!options.leading;
	    maxWait = 'maxWait' in options && nativeMax(+options.maxWait || 0, wait);
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }
	
	  function cancel() {
	    if (timeoutId) {
	      clearTimeout(timeoutId);
	    }
	    if (maxTimeoutId) {
	      clearTimeout(maxTimeoutId);
	    }
	    lastCalled = 0;
	    maxTimeoutId = timeoutId = trailingCall = undefined;
	  }
	
	  function complete(isCalled, id) {
	    if (id) {
	      clearTimeout(id);
	    }
	    maxTimeoutId = timeoutId = trailingCall = undefined;
	    if (isCalled) {
	      lastCalled = now();
	      result = func.apply(thisArg, args);
	      if (!timeoutId && !maxTimeoutId) {
	        args = thisArg = undefined;
	      }
	    }
	  }
	
	  function delayed() {
	    var remaining = wait - (now() - stamp);
	    if (remaining <= 0 || remaining > wait) {
	      complete(trailingCall, maxTimeoutId);
	    } else {
	      timeoutId = setTimeout(delayed, remaining);
	    }
	  }
	
	  function maxDelayed() {
	    complete(trailing, timeoutId);
	  }
	
	  function debounced() {
	    args = arguments;
	    stamp = now();
	    thisArg = this;
	    trailingCall = trailing && (timeoutId || !leading);
	
	    if (maxWait === false) {
	      var leadingCall = leading && !timeoutId;
	    } else {
	      if (!maxTimeoutId && !leading) {
	        lastCalled = stamp;
	      }
	      var remaining = maxWait - (stamp - lastCalled),
	          isCalled = remaining <= 0 || remaining > maxWait;
	
	      if (isCalled) {
	        if (maxTimeoutId) {
	          maxTimeoutId = clearTimeout(maxTimeoutId);
	        }
	        lastCalled = stamp;
	        result = func.apply(thisArg, args);
	      }
	      else if (!maxTimeoutId) {
	        maxTimeoutId = setTimeout(maxDelayed, remaining);
	      }
	    }
	    if (isCalled && timeoutId) {
	      timeoutId = clearTimeout(timeoutId);
	    }
	    else if (!timeoutId && wait !== maxWait) {
	      timeoutId = setTimeout(delayed, wait);
	    }
	    if (leadingCall) {
	      isCalled = true;
	      result = func.apply(thisArg, args);
	    }
	    if (isCalled && !timeoutId && !maxTimeoutId) {
	      args = thisArg = undefined;
	    }
	    return result;
	  }
	  debounced.cancel = cancel;
	  return debounced;
	}
	
	module.exports = debounce;


/***/ },
/* 26 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	module.exports = isObject;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(28);
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeNow = getNative(Date, 'now');
	
	/**
	 * Gets the number of milliseconds that have elapsed since the Unix epoch
	 * (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @category Date
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => logs the number of milliseconds it took for the deferred function to be invoked
	 */
	var now = nativeNow || function() {
	  return new Date().getTime();
	};
	
	module.exports = now;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var isNative = __webpack_require__(29);
	
	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}
	
	module.exports = getNative;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(30),
	    isObjectLike = __webpack_require__(31);
	
	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);
	
	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}
	
	module.exports = isNative;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(26);
	
	/** `Object#toString` result references. */
	var funcTag = '[object Function]';
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 which returns 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}
	
	module.exports = isFunction;


/***/ },
/* 31 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	module.exports = isObjectLike;


/***/ }
]);
//# sourceMappingURL=main-page.js.map