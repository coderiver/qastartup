$ = jQuery = require 'jquery'
# require 'jquery.transit'

class ZoomOut
  defaults =
    minScale: 0.6
    minOpacity: 0.3

  constructor: (selector, options) ->
    @init selector, options
    return @

  init: (selector, options = {}) ->
    @props        = $.extend defaults, options
    @el           = if selector instanceof jQuery then selector else $(selector)
    @scaleDelta   = 1 - @props.minScale
    @opacityDelta = 1 - @props.minOpacity

  zoomOut: (progress) ->
    scaleValue = 1 - @scaleDelta * progress
    # @el.stop().transition
    #   transform: "scale3d(#{scaleValue}, #{scaleValue}, 1)"
    #   opacity: 1 - @opacityDelta * progress
    # , 50, 'linear'
    @el.css
      transform: "scale3d(#{scaleValue}, #{scaleValue}, 1)"
      opacity: 1 - @opacityDelta * progress


module.exports = ZoomOut
