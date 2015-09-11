$        = require 'jquery'
throttle = require 'lodash/function/throttle'
debounce = require 'lodash/function/debounce'

class SmoothScroll
  defaults =
    scrollTime: 300
    easing: 'swing'

  constructor: (selector, options = {}) ->
    @container = if selector instanceof $ then selector else $(selector)
    @props     = $.extend {}, defaults, options

    do @_initEvents
    return @


  scroll: (e) ->
    if e.originalEvent.deltaY
      delta = Math.round e.originalEvent.deltaY
    else if e.originalEvent.detail
      delta = e.originalEvent.detail * 40
    else
      return

    console.log delta

    scrollPos   = $(document).scrollTop()
    finalScroll = scrollPos + delta

    do e.preventDefault

    @container.stop().animate
      scrollTop: finalScroll
    , @props.scrollTime, @props.easing


  _initEvents: ->
    @container.on 'mousewheel', (e) =>
      # do throttle =>
      #   @scroll e
      # , 1000
      @scroll e


module.exports = SmoothScroll
