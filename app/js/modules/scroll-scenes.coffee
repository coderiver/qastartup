$        = jQuery = require 'jquery'
SM       = require './scroll-controller'
ZoomOut  = require './zoom-out'
Parallax = require './parallax'

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


  # toparea scrollscene
  topareaVideo = new ZoomOut '.toparea__video'
  SM.addScene
    duration: '100%'
    triggerHook: 'onLeave'
    triggerElement: 'body'
  .on 'start', (e) ->
    $('.header, .toparea').addClass 'draw'
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
  SM.addScene
    offset: 100
    triggerHook: 'onCenter'
    triggerElement: '.courses__container'
  .on 'start', (e) ->
    $coursesContainer.toggleClass 'draw'


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


