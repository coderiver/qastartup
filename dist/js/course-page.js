webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Curriculum, Form, ModalPlayer, Pagination, SliderBox, SliderDuo, TextCarousel, header, initCommonScrollScenes, initMap, initPlayerApi, initSpecificScrollScenes, initTestimonials, openModal, ref, scrollTo, scrollToAnchor;
	
	__webpack_require__(1)(jQuery);
	
	__webpack_require__(2)(jQuery);
	
	header = __webpack_require__(3);
	
	initCommonScrollScenes = __webpack_require__(5);
	
	initSpecificScrollScenes = __webpack_require__(8);
	
	initTestimonials = __webpack_require__(10);
	
	initMap = __webpack_require__(11);
	
	openModal = __webpack_require__(12);
	
	SliderBox = __webpack_require__(14);
	
	initPlayerApi = __webpack_require__(15).initPlayerApi;
	
	ModalPlayer = __webpack_require__(15).ModalPlayer;
	
	Form = __webpack_require__(16);
	
	SliderDuo = __webpack_require__(18);
	
	Curriculum = __webpack_require__(19);
	
	TextCarousel = __webpack_require__(20);
	
	Pagination = __webpack_require__(21);
	
	ref = __webpack_require__(22), scrollTo = ref.scrollTo, scrollToAnchor = ref.scrollToAnchor;
	
	Pace.on('done', function() {
	  return setTimeout(function() {
	    $('.header').addClass('draw');
	    return $('#toparea-video')[0].play();
	  }, 500);
	});
	
	$(document).ready(function() {
	  var advantagesSliderBox, carousel, coachSlider, curriculum;
	  initCommonScrollScenes();
	  initSpecificScrollScenes();
	  header.init();
	  initTestimonials();
	  scrollToAnchor();
	  initMap();
	  new ModalPlayer('#player', '.course-header .play-button');
	  initPlayerApi();
	  $('[data-modal]').on('click', function(e) {
	    e.preventDefault();
	    return openModal($(this).data('modal'));
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
	  carousel = new TextCarousel('.carousel');
	  advantagesSliderBox = new SliderBox('.advantages .slider-box', {
	    zoomOutTrigger: '.content-layer-1'
	  });
	  coachSlider = new SliderDuo('.slider-duo');
	  curriculum = new Curriculum('.curriculum__body');
	  return new Pagination('.pagination');
	});


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var NumberIncrease, SM, ZoomOut;
	
	SM = __webpack_require__(4);
	
	NumberIncrease = __webpack_require__(7);
	
	ZoomOut = __webpack_require__(9);
	
	module.exports = function() {
	  var $offerContainer, offerNumber, topareaVideo;
	  topareaVideo = new ZoomOut('.toparea__video', {
	    minScale: 0.2,
	    minOpacity: 0
	  });
	  SM.addScene({
	    duration: '100%',
	    triggerHook: 'onLeave',
	    triggerElement: 'body'
	  }).on('progress', function(e) {
	    return topareaVideo.zoomOut(e.progress);
	  }).on('end', function(e) {
	    return $('.toparea').toggle();
	  });
	  SM.addScene({
	    duration: '50%',
	    triggerHook: 'onLeave',
	    triggerElement: '.course-header'
	  }).setPin('.course-header__pinned-area', {
	    pushFollowers: false
	  }).on('end', function(e) {
	    return $('.course-header').toggleClass('is-unpinned');
	  });
	  $offerContainer = $('.offer__body');
	  offerNumber = new NumberIncrease($offerContainer.find('.course-note__value > span'), {
	    initValue: 0,
	    targetValue: 87,
	    duration: 2000
	  });
	  SM.addScene({
	    offset: 250,
	    duration: 500,
	    triggerHook: 'onEnter',
	    triggerElement: $offerContainer[0]
	  }).on('start', function(e) {
	    $offerContainer.find('.course-note, .course__head, .course__body').toggleClass('draw');
	    if (e.scrollDirection === 'FORWARD') {
	      return setTimeout(function() {
	        return offerNumber.start();
	      }, 600);
	    }
	  }).on('end', function(e) {
	    return $offerContainer.find('.course__footer').toggleClass('draw');
	  });
	  return $('.faq__list').accordion({
	    itemSelector: '.faq-item',
	    buttonSelector: '.faq-item__button',
	    contentSelector: '.faq-item__answer'
	  });
	};


/***/ },
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var SliderDuo, openModal;
	
	openModal = __webpack_require__(12);
	
	SliderDuo = (function() {
	  var defaults;
	
	  defaults = {
	    modalWindows: true,
	    selectors: {
	      leftSlider: '.slider-duo__left-slides',
	      leftSliderSlide: '.slider-duo__slide-lg',
	      rightSlider: '.slider-duo__right-slides',
	      rightSliderSlide: '.slider-duo__slide-sm',
	      prevButton: '.slider-duo__nav-prev',
	      nextButton: '.slider-duo__nav-next',
	      slideCounter: '.slider-duo__slide-count',
	      infoModal: '#coaches-modal',
	      questionModal: '#modal-question',
	      modalButtons: '.person__buttons .btn'
	    }
	  };
	
	  function SliderDuo(container, options) {
	    if (options == null) {
	      options = {};
	    }
	    this.props = $.extend({}, defaults, options);
	    this.container = container instanceof $ ? container : $(container);
	    this.leftSlider = this.container.find(this.props.selectors.leftSlider);
	    this.rightSlider = this.container.find(this.props.selectors.rightSlider);
	    this.prevButton = this.container.find(this.props.selectors.prevButton);
	    this.nextButton = this.container.find(this.props.selectors.nextButton);
	    this.slideCounter = this.container.find(this.props.selectors.slideCounter);
	    this._initBasicEvents();
	    if (this.props.modalWindows) {
	      this._initModalWindows();
	    }
	    this._initLeftSlider();
	    this._initRightSlider();
	    this._updateSlideCounter();
	  }
	
	  SliderDuo.prototype._initBasicEvents = function() {
	    return this.leftSlider.on('afterChange', (function(_this) {
	      return function(e, slick, currentSlide) {
	        return _this._updateSlideCounter();
	      };
	    })(this));
	  };
	
	  SliderDuo.prototype._initLeftSlider = function() {
	    this.leftSlider.slick({
	      infinite: false,
	      draggable: false,
	      prevArrow: this.prevButton,
	      nextArrow: this.nextButton,
	      focusOnSelect: true,
	      slide: this.props.selectors.leftSliderSlide,
	      asNavFor: this.rightSlider
	    });
	    return this.leftSliderSlickInstance = this.leftSlider.slick('getSlick');
	  };
	
	  SliderDuo.prototype._initRightSlider = function() {
	    return this.rightSlider.slick({
	      infinite: false,
	      arrows: false,
	      draggable: false,
	      focusOnSelect: true,
	      slide: this.props.selectors.rightSliderSlide,
	      asNavFor: this.leftSlider
	    });
	  };
	
	  SliderDuo.prototype._updateSlideCounter = function() {
	    var currentSlide, slideCount;
	    currentSlide = this.leftSliderSlickInstance.currentSlide;
	    slideCount = this.leftSliderSlickInstance.slideCount;
	    return this.slideCounter.html("<span class='current'>" + (currentSlide + 1) + "</span>/" + slideCount);
	  };
	
	  SliderDuo.prototype._initModalWindows = function() {
	    this.infoModal = $(this.props.selectors.infoModal);
	    this.questionModal = $(this.props.selectors.questionModal);
	    this.leftSlider.on('init', (function(_this) {
	      return function(e, slick) {
	        var currentSlideObj;
	        currentSlideObj = $(slick.$slides[slick.currentSlide]);
	        return _this._toggleEventsForModal(null, currentSlideObj);
	      };
	    })(this));
	    return this.leftSlider.on('beforeChange', (function(_this) {
	      return function(e, slick, currentSlide, nextSlide) {
	        var currentSlideObj, nextSlideObj;
	        currentSlideObj = $(slick.$slides[currentSlide]);
	        nextSlideObj = $(slick.$slides[nextSlide]);
	        return _this._toggleEventsForModal(currentSlideObj, nextSlideObj);
	      };
	    })(this));
	  };
	
	  SliderDuo.prototype._toggleEventsForModal = function(currentSlideObj, nextSlideObj) {
	    var $questionTitle, btnModalAbout, btnModalQuestion, btnsSelector, currentSlideBtns, nextSlideBtns, origQuestionModalTitle;
	    btnsSelector = this.props.selectors.modalButtons;
	    origQuestionModalTitle = null;
	    $questionTitle = null;
	    if (currentSlideObj != null) {
	      currentSlideBtns = currentSlideObj.find(btnsSelector);
	      currentSlideBtns.off('click');
	    }
	    nextSlideBtns = nextSlideObj.find(btnsSelector);
	    btnModalAbout = nextSlideBtns.first();
	    btnModalQuestion = nextSlideBtns.last();
	    btnModalAbout.on('click', (function(_this) {
	      return function(e) {
	        e.preventDefault();
	        _this._updateModalContent(nextSlideObj);
	        return openModal(_this.infoModal);
	      };
	    })(this));
	    return btnModalQuestion.on('click', (function(_this) {
	      return function(e) {
	        var toCoach;
	        toCoach = btnModalQuestion.data('modal-question-title');
	        e.preventDefault();
	        return openModal(_this.questionModal, {
	          questionTitle: "<span class='text-gradient'>Задать вопрос</span>\n<br><small class='small text-gradient'>" + toCoach + "</small>"
	        });
	      };
	    })(this));
	  };
	
	  SliderDuo.prototype._updateModalContent = function(currentSlide) {
	    var content;
	    if (typeof currentSlide === 'number') {
	      content = $(this.leftSliderSlickInstance.$slides[currentSlide]).html();
	    } else {
	      content = currentSlide.html();
	    }
	    return this.infoModal.find('.modal__body').html(content);
	  };
	
	  return SliderDuo;
	
	})();
	
	module.exports = SliderDuo;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var Curriculum, SM,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
	
	SM = __webpack_require__(4);
	
	Curriculum = (function() {
	  var defaults;
	
	  defaults = {
	    topOffset: 120,
	    selectors: {
	      pinnedArea: '.curriculum__pinned-area',
	      scrolledArea: '.curriculum__scrolled-area',
	      counter: '.lessons-counter__numbers',
	      section: '.lesson'
	    }
	  };
	
	  function Curriculum(container, options) {
	    if (options == null) {
	      options = {};
	    }
	    this._buildPinnedAreaScene = bind(this._buildPinnedAreaScene, this);
	    this.props = $.extend({}, defaults, options);
	    this.container = container instanceof $ ? container : $(container);
	    this.pinnedArea = this.container.find(this.props.selectors.pinnedArea);
	    this.counter = this.container.find(this.props.selectors.counter);
	    this.sections = this.container.find(this.props.selectors.section);
	    setTimeout(this._buildPinnedAreaScene, 0);
	    this._buildSectionsScenes();
	    this._updateCounter();
	  }
	
	  Curriculum.prototype._updateCounter = function(currentSection) {
	    if (currentSection == null) {
	      currentSection = 1;
	    }
	    if (currentSection === 0) {
	      return;
	    }
	    return this.counter.html("<span class='current'>" + currentSection + "</span><br>из<br>" + this.sections.length);
	  };
	
	  Curriculum.prototype._buildPinnedAreaScene = function() {
	    var duration, lastSection, scrolledAreaHeight;
	    if (this.props.selectors.scrolledArea) {
	      scrolledAreaHeight = this.container.find(this.props.selectors.scrolledArea).outerHeight();
	    } else {
	      scrolledAreaHeight = this.sections.parent().outerHeight();
	    }
	    lastSection = this.sections.last();
	    duration = scrolledAreaHeight - lastSection.outerHeight();
	    return SM.addScene({
	      offset: -this.props.topOffset,
	      duration: duration,
	      triggerHook: 'onLeave',
	      triggerElement: this.sections[0]
	    }).setPin(this.pinnedArea[0]);
	  };
	
	  Curriculum.prototype._buildSectionsScenes = function() {
	    return this.sections.each((function(_this) {
	      return function(i, el) {
	        return SM.addScene({
	          offset: -_this.props.topOffset,
	          triggerHook: 'onLeave',
	          triggerElement: el
	        }).on('start', function(e) {
	          switch (e.scrollDirection) {
	            case 'FORWARD':
	              return _this._updateCounter(i + 1);
	            case 'REVERSE':
	              return _this._updateCounter(i);
	          }
	        });
	      };
	    })(this));
	  };
	
	  return Curriculum;
	
	})();
	
	module.exports = Curriculum;


/***/ },
/* 20 */
/***/ function(module, exports) {

	var TextCarousel;
	
	TextCarousel = (function() {
	  var defaults;
	
	  defaults = {
	    selectors: {
	      carousel: '.carousel__items',
	      carouselSlide: '.carousel__item',
	      text: '.carousel__item-text'
	    },
	    slickOptions: {}
	  };
	
	  function TextCarousel(container, options) {
	    if (options == null) {
	      options = {};
	    }
	    this.props = $.extend({}, defaults, options);
	    this.container = container instanceof $ ? container : $(container);
	    this.carousel = this.container.find(this.props.selectors.carousel);
	    this._initEvents();
	    this._initMainCarousel();
	  }
	
	  TextCarousel.prototype._initEvents = function() {
	    return this.carousel.on('init', (function(_this) {
	      return function(e, slick) {
	        return _this._initTextCarousel(slick.$slides);
	      };
	    })(this));
	  };
	
	  TextCarousel.prototype._initMainCarousel = function() {
	    var defaultOpt, options;
	    defaultOpt = {
	      arrows: false,
	      autoplaySpeed: 5000,
	      slidesToShow: 5,
	      slidesToScroll: 1,
	      slide: this.props.selectors.carouselSlide,
	      draggable: false,
	      initialSlide: 0,
	      focusOnSelect: true,
	      speed: 800
	    };
	    options = $.extend(defaultOpt, this.props.slickOptions);
	    return this.carousel.slick(options);
	  };
	
	  TextCarousel.prototype._initTextCarousel = function(mainSlides) {
	    var selector;
	    selector = this.props.selectors.text;
	    this.textBlock = $('<div />', {
	      'class': 'carousel-text-box'
	    }).appendTo(this.container);
	    mainSlides.each((function(_this) {
	      return function(i, el) {
	        var content;
	        content = $(el).find(selector).html();
	        return _this.textBlock.append($('<div />', {
	          html: content
	        }));
	      };
	    })(this));
	    this.textBlock.slick({
	      arrows: false,
	      draggable: false,
	      speed: 500
	    });
	    return setTimeout((function(_this) {
	      return function() {
	        _this.carousel.slick('slickSetOption', 'asNavFor', _this.textBlock, false);
	        return _this.carousel.slick('slickSetOption', 'autoplay', true, false);
	      };
	    })(this), 0);
	  };
	
	  return TextCarousel;
	
	})();
	
	module.exports = TextCarousel;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var Pagination, SM;
	
	SM = __webpack_require__(4);
	
	Pagination = (function() {
	  function Pagination(selector) {
	    this.container = selector instanceof $ ? selector : $(selector);
	    this.links = this.container.find('.pagination__link');
	    this.anchors = this.links.map(function(i, el) {
	      return $("a[name='" + (el.hash.slice(1)) + "']")[0];
	    });
	    this._buildScrollScenes();
	    console.log(this);
	  }
	
	  Pagination.prototype.toggleActiveItem = function(index) {
	    this.links.filter('.is-active').removeClass('is-active');
	    if (index >= 0) {
	      return this.links.eq(index).addClass('is-active');
	    }
	  };
	
	  Pagination.prototype._buildScrollScenes = function() {
	    return this.anchors.each((function(_this) {
	      return function(i, el) {
	        return SM.addScene({
	          offset: -200,
	          triggerHook: 'onLeave',
	          triggerElement: el
	        }).on('start', function(e) {
	          if (e.scrollDirection === 'FORWARD') {
	            _this.toggleActiveItem(i);
	          }
	          if (e.scrollDirection === 'REVERSE') {
	            return _this.toggleActiveItem(i - 1);
	          }
	        });
	      };
	    })(this));
	  };
	
	  return Pagination;
	
	})();
	
	module.exports = Pagination;


/***/ },
/* 22 */
/***/ function(module, exports) {

	var scrollTo, scrollToAnchor;
	
	scrollTo = function(target, duration, shift, container) {
	  if (duration == null) {
	    duration = 1000;
	  }
	  if (shift == null) {
	    shift = 100;
	  }
	  if (container == null) {
	    container = 'html, body';
	  }
	  $(container).animate({
	    scrollTop: $(target).offset().top - shift
	  }, duration, 'easeOutCubic');
	};
	
	scrollToAnchor = function(duration) {
	  $('a[href^="#"]').on('click', function(e) {
	    var name;
	    e.preventDefault();
	    name = this.hash.slice(1);
	    if (name.length) {
	      return scrollTo("a[name='" + name + "']", duration);
	    }
	  });
	};
	
	module.exports.scrollTo = scrollTo;
	
	module.exports.scrollToAnchor = scrollToAnchor;


/***/ }
]);
//# sourceMappingURL=course-page.js.map