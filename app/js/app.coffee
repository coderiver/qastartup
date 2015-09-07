Graph = require './modules/graph'
$     = require 'jquery'

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
