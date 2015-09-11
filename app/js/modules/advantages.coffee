$       = require 'jquery'
SM      = require './scroll-controller'
ZoomOut = require './zoom-out'

class Advantages
  constructor: ->
    return @

  init: ->
    @wrapper     = $ '.advantages-wrapper'
    @el          = $ '.advantages'
    @slider      = @el.find '.slider'
    @sliderTrack = @slider.find '.slider__track'
    @duration    = null
    @video       = new ZoomOut '.advantages__video'

    do @_initSlider
    do @_buildScene
    do @_buildZoomOutScene
    console.log @

  scrollSlider: (progress) ->
    # @sliderTrack.stop().transition
    #   x: -@duration * progress
    # , 0, 'linear'
    @sliderTrack.css
      x: -@duration * progress

  makeFixed: ->
    @el.css
      position: 'fixed'
      top: 0
      left: 0
      right: 0
    @wrapper.css
      height: @el.outerHeight()
      boxSizing: 'content-box'
      paddingBottom: @duration

  makeStatic: ->
    @el.css
      position: ''
      top: ''
      left: ''
      right: ''
    @wrapper.css
      height: ''
      boxSizing: ''
      paddingBottom: ''

  _initSlider: ->
    sliderHeight = @slider.outerHeight()

    @slider.css
      height: sliderHeight
    @sliderTrack.css
      position: 'absolute'
      top: 0
      left: 0

    sliderWidth  = @slider.outerWidth()
    trackWidth   = @sliderTrack.outerWidth()

    @duration = trackWidth - sliderWidth

  _buildScene: ->
    SM.addScene
      duration: @duration
      triggerHook: 'onLeave'
      triggerElement: @wrapper[0]
    .on 'start', (e) =>
      if e.scrollDirection is 'FORWARD'
        do @makeFixed
      if e.scrollDirection is 'REVERSE'
        do @makeStatic
    .on 'progress', (e) =>
      @scrollSlider e.progress

  _buildZoomOutScene: ->
    SM.addScene
      duration: '100%'
      triggerHook: 'onEnter'
      triggerElement: '.content-layer-1'
    .on 'progress', (e) =>
      @video.zoomOut e.progress
    .on 'end', (e) =>
      @el.toggle()

module.exports = new Advantages()
