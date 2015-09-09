$                = require 'jquery'
header           = require './modules/header'
graph            = require './modules/graph'
events           = require './modules/events'
initScrollScenes = require './modules/scroll-scenes'

require './modules/accordion'
require './modules/draw-button'

$ ->
  $ '.faq__list'
    .accordion
      itemSelector: '.faq-item'
      buttonSelector: '.faq-item__button'
      contentSelector: '.faq-item__answer'


  $ '.question'
    .accordion
      itemSelector: '.question'
      buttonSelector: '.link'
      contentSelector: '.question__form'

  do header.init
  do initScrollScenes
