# $              = jQuery = require 'jquery'
SM             = require './scroll-controller'
ZoomOut        = require './zoom-out'
Parallax       = require './parallax'
NumberIncrease = require './number'

module.exports = ->

  $win      = $(window)
  winHeight = $win.height()

  # parallax scenes
  $('[data-parallax]').each (index, el) ->
    $el = $(el)
    parallaxInstance = new Parallax($el)
    SM.addScene
      duration: winHeight + $el.height()
      triggerHook: 'onEnter'
      triggerElement: el
    .on 'progress', (e) ->
      parallaxInstance.move e.progress


  # fadein scrollscene
  $('.fade-in').each (index, el) ->
    SM.addScene
      offset: '20%'
      triggerHook: 'onEnter'
      triggerElement: el
    .on 'start', ->
      $(el).toggleClass 'animate'


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


  # footer scrollscene
  $footer = $ '.footer'
  SM.addScene
    duration: 200
    triggerHook: 'onEnter'
    triggerElement: '#sm-trigger-footer'
  .on 'start', (e) ->
    $footer.toggleClass 'is-fixed'
  .on 'end', (e) ->
    $footer.toggleClass 'draw'


  # courses scrollscene
  $coursesContainer = $ '.courses__container'
  courcesNumber = new Number $coursesContainer.find('.course-note__value > span'),
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


  # nominatin scrollscene
  $nominationTitle = $ '.nomination .banner-title'
  SM.addScene
    offset: 200
    triggerHook: 'onEnter'
    triggerElement: $nominationTitle[0]
  .on 'start', (e) ->
    $nominationTitle.toggleClass 'draw'


  # callback scrollscene
  SM.addScene
    triggerHook: 'onCenter'
    triggerElement: '.callback__frontlayer'
  .setClassToggle '.callback__frontlayer', 'draw'


  # reasons scrollscene
  SM.addScene
    triggerHook: 'onCenter'
    triggerElement: '.reasons__list'
  .setClassToggle '.reasons__list', 'draw'


  # draw borders scrollscenes
  $('.js-draw').each (index, el) ->
    SM.addScene
      offset: $(el).data('sm-offset') or 200
      triggerHook: $(el).data('sm-trigger-hook') or 'onEnter'
      triggerElement: el
    .setClassToggle el, 'draw'

  # increase numbers
  $('[data-number]').each (index, el) ->
    number = new NumberIncrease $(el)
    SM.addScene
      offset: 150
      triggerHook: 'onEnter'
      triggerElement: el
    .on 'start', (e) ->
      do number.start if not number.animated
