$ = require 'jquery'
require 'jquery.transit'

header           = require './modules/header'
questionForm     = require './modules/question-form'
initScrollScenes = require './modules/scroll-scenes'
Graph            = require './modules/graph'
SliderBox        = require './modules/slider-box'
# SmoothScroll     = require './modules/smooth-scroll'

# modules as jQuery plugins
require('./plugins/input-field')($)
require('./plugins/accordion')($)
require './plugins/draw-button'

$ ->
  # new SmoothScroll 'body'

  $('.faq__list').accordion
    itemSelector: '.faq-item'
    buttonSelector: '.faq-item__button'
    contentSelector: '.faq-item__answer'

  advantagesSliderBox = new SliderBox '.advantages .slider-box',
    zoomOutTrigger: '.content-layer-1'

  newsSliderbox = new SliderBox '.news .slider-box'

  graph = new Graph '.stats__graph'

  do header.init
  do questionForm.init
  do initScrollScenes
