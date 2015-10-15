SM             = require '../modules/scroll-controller'
NumberIncrease = require '../modules/number'
ZoomOut        = require '../modules/zoom-out'

module.exports = ->

  # toparea scrollscene
  topareaVideo = new ZoomOut '.toparea__video'
  SM.addScene
    duration: '100%'
    triggerHook: 'onLeave'
    triggerElement: 'body'
  .on 'progress', (e) ->
    topareaVideo.zoomOut e.progress
  .on 'end', (e) ->
    $('.toparea').toggle()
