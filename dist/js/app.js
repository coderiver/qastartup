(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Graph, ModalPlayer, SliderBox, header, initMap, initPlayerApi, initScrollScenes, initTestimonials, makeTopareaInvisible, makeTopareaVisible, openModal, showFormMessage, toparea;

window.$ = window.jQuery = require('jquery');

require('jquery.transit');

require('jquery.maskedinput');

require('slick-carousel');

require('validetta');

require('jquery.easing');

require('./plugins/accordion')(jQuery);

require('./plugins/input-field')(jQuery);

require('./plugins/hover-gallery')(jQuery);

header = require('./modules/header');

initScrollScenes = require('./modules/scroll-scenes');

initTestimonials = require('./modules/testimonials');

initMap = require('./modules/map');

Graph = require('./modules/graph');

SliderBox = require('./modules/slider-box');

openModal = require('./modules/modal');

initPlayerApi = require('./modules/player').initPlayerApi;

ModalPlayer = require('./modules/player').ModalPlayer;

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

showFormMessage = function(form) {
  form.parent().addClass('show-msg');
  return setTimeout(function() {
    form.find('input,textarea').val('');
    return form.find('.field').removeClass('is-filled');
  }, 500);
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
  header.init();
  initTestimonials();
  initScrollScenes();
  initMap();
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
  $('input[type="tel"]').mask("?+380 (99) 999-99-99", {
    placeholder: "+380 (__) ___-__-__"
  });
  $('form input,form textarea').inputField();
  autosize($('textarea'));
  $('input[data-validetta="required"]').on('keyup', function(e) {
    if ($(this).val() !== '') {
      if ($(this).parents('.is-error').length > 0) {
        return $(this).parents('.is-error').removeClass('is-error');
      }
    }
  });
  $('form').validetta({
    showErrorMessages: false,
    errorClass: 'is-error',
    validClass: 'is-valid',
    realTime: true,
    onValid: function(e) {
      var form;
      e.preventDefault();
      form = $(this.form);
      alert('form valid');
      return showFormMessage(form);
    },
    onError: function(e) {
      return alert('form error');
    }
  });
  $('.form-msg-text .link').on('click', function(e) {
    e.preventDefault();
    return $(this).parents('.show-msg').removeClass('show-msg');
  });
  $('.news .slider-item__title').hoverGallery({
    container: '.news__bg'
  });
  return $('[data-modal]').on('click', function(e) {
    e.preventDefault();
    return openModal($(this).data('modal'));
  });
});


},{"./modules/graph":2,"./modules/header":3,"./modules/map":4,"./modules/modal":5,"./modules/player":8,"./modules/scroll-scenes":10,"./modules/slider-box":11,"./modules/testimonials":12,"./plugins/accordion":14,"./plugins/hover-gallery":15,"./plugins/input-field":16,"jquery":"jquery","jquery.easing":"jquery.easing","jquery.maskedinput":"jquery.maskedinput","jquery.transit":"jquery.transit","slick-carousel":"slick-carousel","validetta":"validetta"}],2:[function(require,module,exports){
var Graph, SM, debounce, s,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

s = require('snapsvg');

SM = require('./scroll-controller');

debounce = require('lodash/function/debounce');

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


},{"./scroll-controller":9,"lodash/function/debounce":18,"snapsvg":"snapsvg"}],3:[function(require,module,exports){
var Header, SM,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

SM = require('./scroll-controller');

Header = (function() {
  function Header() {
    this._menuButtonClickHandler = bind(this._menuButtonClickHandler, this);
    this.fixed = false;
    this.opened = false;
    return this;
  }

  Header.prototype.init = function() {
    this.el = $('.header');
    this.hamburger = this.el.find('.hamburger');
    this.logo = this.el.find('.logo');
    this.buttonOne = this.el.find('.btn').first();
    this.menu = this.el.find('.header__nav');
    this._initEvents();
    return this._buildScene();
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
      offset: 190,
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

module.exports = new Header();


},{"./scroll-controller":9}],4:[function(require,module,exports){
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



},{}],5:[function(require,module,exports){
var openModal;

openModal = function(selector, options) {
  var closeBtn, modal;
  if (options == null) {
    options = {};
  }
  modal = selector instanceof $ ? selector : $(selector);
  closeBtn = modal.find('.modal__close');
  modal.fadeIn(500, function() {
    modal.addClass('is-open');
    return setTimeout(function() {
      modal.addClass('draw');
      return typeof options.afterOpen === "function" ? options.afterOpen() : void 0;
    }, 500);
  });
  return closeBtn.one('click', function(e) {
    e.preventDefault();
    if (typeof options.beforeClose === "function") {
      options.beforeClose();
    }
    return modal.removeClass('is-open draw').delay(500).fadeOut(500);
  });
};

module.exports = openModal;


},{}],6:[function(require,module,exports){
var Number,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Number = (function() {
  function Number(selector, options) {
    if (options == null) {
      options = {};
    }
    this._render = bind(this._render, this);
    this.init(selector, options);
  }

  Number.prototype.init = function(selector, options) {
    this.el = $(selector);
    this.dataString = this.el.data('number') != null ? this.el.data('number').split(',', 3) : [0, 100, 1000];
    this.initValue = options.initValue != null ? options.initValue : parseInt(this.dataString[0]);
    this.targetValue = options.targetValue != null ? options.targetValue : parseInt(this.dataString[1]);
    this.duration = options.duration != null ? options.duration : parseInt(this.dataString[2]);
    this.animated = false;
    return this.reset();
  };

  Number.prototype.start = function() {
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

  Number.prototype.reset = function() {
    return this._render(this.initValue);
  };

  Number.prototype._commaSeparateNumber = function(val) {
    while (/(\d+)(\d{3})/.test(val.toString())) {
      val = val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }
    return val;
  };

  Number.prototype._render = function(value) {
    return this.el.text(Math.round(value));
  };

  return Number;

})();

module.exports = Number;


},{}],7:[function(require,module,exports){
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


},{}],8:[function(require,module,exports){
var EVENT_NAME, ModalPlayer, openModal,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

openModal = require('./modal');

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


},{"./modal":5}],9:[function(require,module,exports){
var scrollController, scrollmagic;

scrollmagic = require('scrollmagic');

scrollController = new scrollmagic.Controller({
  container: 'body',
  loglevel: 2
});

module.exports = {
  addScene: function(props) {
    var scene;
    scene = new scrollmagic.Scene(props);
    scrollController.addScene(scene);
    return scene;
  }
};


},{"scrollmagic":"scrollmagic"}],10:[function(require,module,exports){
var Number, Parallax, SM, ZoomOut;

SM = require('./scroll-controller');

ZoomOut = require('./zoom-out');

Parallax = require('./parallax');

Number = require('./number');

module.exports = function() {
  var $coursesContainer, $footer, $nominationTitle, $win, courcesNumber, topareaVideo, winHeight;
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
  $footer = $('.footer');
  SM.addScene({
    duration: 200,
    triggerHook: 'onEnter',
    triggerElement: '#sm-trigger-footer'
  }).on('start', function(e) {
    return $footer.toggleClass('is-fixed');
  }).on('end', function(e) {
    return $footer.toggleClass('draw');
  });
  $coursesContainer = $('.courses__container');
  courcesNumber = new Number($coursesContainer.find('.course-note__value > span'), {
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
  SM.addScene({
    offset: 200,
    triggerHook: 'onEnter',
    triggerElement: $nominationTitle[0]
  }).on('start', function(e) {
    return $nominationTitle.toggleClass('draw');
  });
  SM.addScene({
    triggerHook: 'onCenter',
    triggerElement: '.callback__frontlayer'
  }).setClassToggle('.callback__frontlayer', 'draw');
  SM.addScene({
    triggerHook: 'onCenter',
    triggerElement: '.reasons__list'
  }).setClassToggle('.reasons__list', 'draw');
  $('.js-draw').each(function(index, el) {
    return SM.addScene({
      offset: $(el).data('sm-offset') || 200,
      triggerHook: $(el).data('sm-trigger-hook') || 'onEnter',
      triggerElement: el
    }).setClassToggle(el, 'draw');
  });
  return $('[data-number]').each(function(index, el) {
    var number;
    number = new Number($(el));
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


},{"./number":6,"./parallax":7,"./scroll-controller":9,"./zoom-out":13}],11:[function(require,module,exports){
var SM, SliderBox, ZoomOut;

SM = require('./scroll-controller');

ZoomOut = require('./zoom-out');

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
      boxSizing: 'content-box',
      paddingBottom: this.duration
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
      boxSizing: '',
      paddingBottom: ''
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
    return this.duration = trackWidth - sliderWidth;
  };

  return SliderBox;

})();

module.exports = SliderBox;


},{"./scroll-controller":9,"./zoom-out":13}],12:[function(require,module,exports){
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


},{}],13:[function(require,module,exports){
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


},{}],14:[function(require,module,exports){
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


},{}],15:[function(require,module,exports){
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


},{}],16:[function(require,module,exports){
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


},{}],17:[function(require,module,exports){
var getNative = require('../internal/getNative');

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

},{"../internal/getNative":19}],18:[function(require,module,exports){
var isObject = require('../lang/isObject'),
    now = require('../date/now');

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

},{"../date/now":17,"../lang/isObject":23}],19:[function(require,module,exports){
var isNative = require('../lang/isNative');

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

},{"../lang/isNative":22}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
var isObject = require('./isObject');

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

},{"./isObject":23}],22:[function(require,module,exports){
var isFunction = require('./isFunction'),
    isObjectLike = require('../internal/isObjectLike');

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

},{"../internal/isObjectLike":20,"./isFunction":21}],23:[function(require,module,exports){
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

},{}]},{},[1])


//# sourceMappingURL=app.js.map
