# $ = require 'jquery'
# require 'jquery.easing'

class NumberIncrease
  constructor: (selector, options = {}) ->
    @init selector, options

  init: (selector, options) ->
    @el           = $ selector
    @dataString   = if @el.data('number')? then @el.data('number').split(',', 3) else [0, 100, 1000]
    @initValue    = if options.initValue? then options.initValue else parseInt(@dataString[0])
    @targetValue  = if options.targetValue? then options.targetValue else parseInt(@dataString[1])
    @duration     = if options.duration? then options.duration else parseInt(@dataString[2])
    @animated     = no
    do @reset

  start: ->
    @animated = yes
    $({value: @initValue}).animate value: @targetValue,
      duration: @duration
      easing: 'easeOutQuart'
      step: (num) =>
        @_render num

  reset: ->
    @_render @initValue

  _commaSeparateNumber: (val) ->
    val = val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") while (/(\d+)(\d{3})/.test(val.toString()))
    return val

  _render: (value) =>
    @el.text Math.round(value)

module.exports = NumberIncrease
