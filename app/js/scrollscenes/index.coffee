# $              = jQuery = require 'jquery'
SM             = require '../modules/scroll-controller'
ZoomOut        = require '../modules/zoom-out'
NumberIncrease = require '../modules/number'

module.exports = ->

  # toparea scrollscene
  topareaVideo = new ZoomOut '.toparea__video'
  SM.addScene
    duration: '100%'
    triggerHook: 'onLeave'
    triggerElement: 'body'
  # .on 'start', (e) ->
  #   $('.header, .toparea').addClass 'draw'
  .on 'progress', (e) ->
    topareaVideo.zoomOut e.progress
  .on 'end', (e) ->
    $('.toparea').toggle()

  # courses scrollscene
  $coursesContainer = $ '.courses__container'
  courcesNumber = new NumberIncrease $coursesContainer.find('.course-note__value > span'),
    initValue: 0
    targetValue: 87
    duration: 2000

  SM.addScene
    offset: 250
    duration: 330
    triggerHook: 'onEnter'
    triggerElement: $coursesContainer[0]
  .on 'start', (e) ->
    $coursesContainer.find('.course__head, .course__body').toggleClass 'draw'
    if e.scrollDirection is 'FORWARD'
      setTimeout ->
        do courcesNumber.start
      , 600
  .on 'end', (e) ->
    $coursesContainer.find('.course__footer').toggleClass 'draw'


  # nomination scrollscene
  $nominationTitle = $ '.nomination .banner-title'
  SM.addScene
    offset: 200
    triggerHook: 'onEnter'
    triggerElement: $nominationTitle[0]
  .on 'start', (e) ->
    $nominationTitle.toggleClass 'draw'
