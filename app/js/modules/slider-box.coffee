$       = require 'jquery'
SM      = require './scroll-controller'
ZoomOut = require './zoom-out'

class SliderBox
  defaults =
    wrapper: 'slider-box-wrapper'
    slider: '.slider'
    sliderTrack: '.slider__track'
    backgroundLayer: '.slider-box__bg'
    zoomOutTrigger: off

  constructor: (selector, options) ->
    @init selector, options
    return @

  init: (selector, options = {}) ->
    @el          = if selector instanceof $ then selector else $(selector)
    @props       = $.extend {}, defaults, options
    @wrapper     = @el.parent()
    @slider      = @el.find @props.slider
    @sliderTrack = @el.find @props.sliderTrack
    @duration    = null

    do @_initSlider
    if @props.zoomOutTrigger
      do @initZoomOutScene
    else
      do @initSimpleScene

  scrollSlider: (progress) ->
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

  initSimpleScene: ->
    SM.addScene
      duration: @duration
      triggerHook: 'onLeave'
      triggerElement: @wrapper[0]
    .on 'progress', (e) =>
      @scrollSlider e.progress
    .setPin @el[0]

  initZoomOutScene: ->
    bg = new ZoomOut @el.find(@props.backgroundLayer)

    # scroll slider
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

    # zoom background
    SM.addScene
      duration: '100%'
      triggerHook: 'onEnter'
      triggerElement: @props.zoomOutTrigger
    .on 'progress', (e) ->
      bg.zoomOut e.progress
    .on 'end', (e) =>
      @el.toggle()


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


module.exports = SliderBox
