console.log 'course controller'
# jQuery plugins
require 'jquery.transit'
# require 'slick-carousel'
require 'jquery.easing'
require('../plugins/accordion')(jQuery)
require('../plugins/hover-gallery')(jQuery)

header                   = require '../modules/header'
initCommonScrollScenes   = require '../scrollscenes/common'
initSpecificScrollScenes = require '../scrollscenes/course'
initTestimonials         = require '../modules/testimonials'
initMap                  = require '../modules/map'
openModal                = require '../modules/modal'
initPlayerApi            = require('../modules/player').initPlayerApi
ModalPlayer              = require('../modules/player').ModalPlayer
Form                     = require '../modules/form'

Pace.on 'done', ->
  setTimeout ->
    $('.header').addClass 'draw'
    # $('#toparea-video')[0].play()
  , 500

$(document).ready ->

  do initCommonScrollScenes
  do initSpecificScrollScenes
  do header.init

  # modal youtube player
  # new ModalPlayer '#player', '.course-header .play-button'
  # do initPlayerApi

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
