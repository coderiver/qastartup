jQuery           = $ = require 'jquery'
SM               = require './scroll-controller'
events           = require './events'

class Header
  constructor: ->
    return @

  init: ->
    @el = $ '.header'
    do @_buildScene
    events.emit 'headerInit', @
    console.log @

  makeFixed: ->
    @el.addClass 'is-fixed'
    @el.addClass 'animate-step-1'

  makeStatic: ->
    @el.removeClass 'animate-step-1'
    setTimeout =>
      @el.removeClass 'is-fixed'
    , 300


  _buildScene: ->
    @scrollScene = SM.addScene
      duration: 200
      triggerElement: '.out'
      triggerHook: 'onLeave'
    .on 'end', (e) =>
      console.log @
      if e.scrollDirection is 'FORWARD'
        do @makeFixed
      else if e.scrollDirection is 'REVERSE'
        do @makeStatic





module.exports = new Header()
