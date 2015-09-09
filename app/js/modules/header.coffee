jQuery           = $ = require 'jquery'
SM               = require './scroll-controller'
events           = require './events'

class Header
  constructor: ->
    @fixed = no
    @opened = no
    return @

  # public methods
  init: ->
    @el        = $ '.header'
    @hamburger = @el.find '.hamburger'
    @logo      = @el.find '.logo'
    @buttonOne = @el.find('.btn').first()
    @menu      = @el.find('.header__nav')

    do @_initEvents
    do @_buildScene
    console.log @

  menuButtonClickHandler: (e) =>
    if not @opened
      do @open
    else
      do @close

  open: ->
    @hamburger.addClass 'is-active'
    @el.addClass 'open-step-1'
    setTimeout =>
      @el.addClass 'open-step-2'
    , 300
    setTimeout =>
      do @drawBordersInMenu
    , 600
    @opened = yes

  close: ->
    @hamburger.removeClass 'is-active'
    @el.removeClass 'open-step-2'
    setTimeout =>
      @el.removeClass 'open-step-1'
      do @removeBordersInMenu
    , 300
    @opened = no

  makeFixed: ->
    @el.removeClass 'draw'
    @el.addClass 'is-fixed'
    do @removeBordersInTopRow
    setTimeout =>
      @el.addClass 'animate'
    , 0
    setTimeout =>
      do @drawBordersInTopRow
    , 300
    @fixed = yes

  makeStatic: ->
    @el.removeClass 'animate'
    setTimeout =>
      @el.removeClass 'is-fixed'
    , 300
    @fixed = no

  drawBordersInTopRow: ->
    @logo.addClass 'draw'
    @buttonOne.addClass 'draw'

  removeBordersInTopRow: ->
    @logo.removeClass 'draw'
    @buttonOne.removeClass 'draw'

  drawBordersInMenu: ->
    @menu.addClass 'draw'

  removeBordersInMenu: ->
    @menu.removeClass 'draw'

  # private methods
  _initEvents: ->
    @hamburger.on 'click', @menuButtonClickHandler

  _buildScene: ->
    @scrollScene = SM.addScene
      duration: 150
      triggerElement: '.out'
      triggerHook: 'onLeave'
    .on 'end', (e) =>
      console.log @
      if e.scrollDirection is 'FORWARD'
        do @makeFixed
      else if e.scrollDirection is 'REVERSE'
        do @makeStatic
        if @opened
          do @close


module.exports = new Header()
