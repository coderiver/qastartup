SM             = require '../modules/scroll-controller'
Parallax       = require '../modules/parallax'
NumberIncrease = require '../modules/number'
# ZoomOut        = require '../modules/zoom-out'

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
