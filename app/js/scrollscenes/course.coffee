SM             = require '../modules/scroll-controller'
NumberIncrease = require '../modules/number'
ZoomOut        = require '../modules/zoom-out'

module.exports = ->

  # toparea scrollscene
  topareaVideo = new ZoomOut '.toparea__video',
    minScale: 0.2
    minOpacity: 0

  SM.addScene
    duration: '100%'
    triggerHook: 'onLeave'
    triggerElement: 'body'
  .on 'progress', (e) ->
    topareaVideo.zoomOut e.progress
  .on 'end', (e) ->
    $('.toparea').toggle()

  SM.addScene
    duration: '50%'
    triggerHook: 'onLeave'
    triggerElement: '.course-header'
  .setPin '.course-header__pinned-area', pushFollowers: no
  .on 'end', (e) ->
    $('.course-header').toggleClass 'is-unpinned'
