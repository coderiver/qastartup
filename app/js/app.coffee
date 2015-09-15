$ = require 'jquery'
require 'jquery.transit'

header           = require './modules/header'
questionForm     = require './modules/question-form'
initScrollScenes = require './modules/scroll-scenes'
initTestimonials = require './modules/testimonials'
Graph            = require './modules/graph'
SliderBox        = require './modules/slider-box'

# modules as jQuery plugins
require('./plugins/input-field')($)
require('./plugins/accordion')($)
require './plugins/draw-button'

$ ->

  do header.init
  do questionForm.init
  do initTestimonials
  do initScrollScenes

  $('.faq__list').accordion
    itemSelector: '.faq-item'
    buttonSelector: '.faq-item__button'
    contentSelector: '.faq-item__answer'

  advantagesSliderBox = new SliderBox '.advantages .slider-box',
    zoomOutTrigger: '.content-layer-1'

  newsSliderbox = new SliderBox '.news .slider-box'

  graph = new Graph '.stats__graph',
    valuesIncome: [500, 1500, 2350, 3200]
    valuesDemand: [800, 3000, 2000, 200]
    valueLabels: ['Junior QA', 'Middle QA', 'Senior QA', 'QA Tech Lead']


