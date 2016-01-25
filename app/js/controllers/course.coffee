# jQuery plugins
# require 'jquery.transit'
# require 'slick-carousel'
# require 'jquery.easing'
require('../plugins/accordion')(jQuery)
require('../plugins/hover-gallery')(jQuery)

header                     = require '../modules/header'
initCommonScrollScenes     = require '../scrollscenes/common'
initSpecificScrollScenes   = require '../scrollscenes/course'
initTestimonials           = require '../modules/testimonials'
initMap                    = require '../modules/map'
openModal                  = require '../modules/modal'
SliderBox                  = require '../modules/slider-box'
initPlayerApi              = require('../modules/player').initPlayerApi
ModalPlayer                = require('../modules/player').ModalPlayer
Form                       = require '../modules/form'
SliderDuo                  = require '../modules/slider-duo'
Curriculum                 = require '../modules/curriculum'
TextCarousel               = require '../modules/text-carousel'
Pagination                 = require '../modules/pagination'
{scrollTo, scrollToAnchor} = require '../modules/scroll-to'

Pace.on 'done', ->
  setTimeout ->
    $('.header').addClass 'draw'
    $('#toparea-video')[0].play()
  , 500

$(document).ready ->

  do initCommonScrollScenes
  do initSpecificScrollScenes
  do header.init
  do initTestimonials
  do scrollToAnchor
  do initMap

  # modal youtube player
  new ModalPlayer '#player', '.course-header .play-button'
  do initPlayerApi

  # open modal windows
  $('[data-modal]').on 'click', (e) ->
    do e.preventDefault
    openModal $(this).data('modal')

  # forms
  $('form').each (index, el) ->
    new Form el,
      onValid: ->
        alert 'Form valid!'
      onError: ->
        alert 'Form error!'

  # course technology
  carousel = new TextCarousel '.carousel'

  # course advantages
  advantagesSliderBox = new SliderBox '.advantages .slider-box',
    zoomOutTrigger: '.content-layer-1'

  # course coaches
  coachSlider = new SliderDuo '.slider-duo'

  # course curriculum
  curriculum = new Curriculum '.curriculum__body'

  new Pagination '.pagination'
