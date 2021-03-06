# $ = jQuery = require 'jquery'

class Parallax
  defaults =
    delta: -100
    shift: 0

  constructor: (selector, options) ->
    @init selector, options
    return @

  init: (selector, options = {}) ->
    @el = if selector instanceof jQuery then selector else $(selector)

    htmlOptions = do @htmlData

    @props = $.extend {}, defaults, htmlOptions, options

    if @props.shift
      @el.css
        top: "#{@props.shift}px"

  htmlData: ->
    obj = {}
    data = @el.data('parallax')
    if $.isNumeric(data)
      obj.delta = data
    else if typeof data is 'object'
      obj = data
    return obj

  move: (progress) ->
    val = Math.round(@props.delta * progress)
    @el.css
      transform: "translate3d(0, #{val}px, 0)"


module.exports = Parallax
