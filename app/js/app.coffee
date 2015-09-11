$ = require 'jquery'
require 'jquery.transit'

header           = require './modules/header'
graph            = require './modules/graph'
questionForm     = require './modules/question-form'
advantages       = require './modules/advantages'
initScrollScenes = require './modules/scroll-scenes'
SmoothScroll     = require './modules/smooth-scroll'

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

  do header.init
  do questionForm.init
  do advantages.init
  do initScrollScenes
