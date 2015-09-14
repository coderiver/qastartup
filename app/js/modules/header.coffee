jQuery = $ = require 'jquery'
SM     = require './scroll-controller'

class Header
  constructor: ->
    @fixed = no
    @opened = no
    return @

  init: ->
    @el        = $ '.header'
    @hamburger = @el.find '.hamburger'
    @logo      = @el.find '.logo'
    @buttonOne = @el.find('.btn').first()
    @menu      = @el.find('.header__nav')

    do @_initEvents
    do @_buildScene

  open: ->
    @hamburger.addClass 'is-active'
    @el.addClass 'open-step-1'
    setTimeout =>
      @el.addClass 'open-step-2'
    , 100
    setTimeout =>
      do @_drawBordersInMenu
    , 600
    @opened = yes

  close: ->
    @hamburger.removeClass 'is-active'
    @el.removeClass 'open-step-2'
    setTimeout =>
      @el.removeClass 'open-step-1'
      do @_removeBordersInMenu
    , 400
    @opened = no

  makeFixed: ->
    @el.addClass 'fixed'
    @el.removeClass 'draw'
    do @_removeBordersInTopRow
    setTimeout =>
      @el.addClass 'animate'
    , 0
    setTimeout =>
      do @_drawBordersInTopRow
    , 300
    @fixed = yes

  makeStatic: ->
    @el.removeClass 'animate'
    setTimeout =>
      @el.removeClass 'fixed'
      @el.addClass 'draw'
      do @_removeBordersInTopRow
    , 300
    @fixed = no

  animateIn: ->
    @el.addClass 'animate'
    setTimeout =>
      do @_drawBordersInTopRow
    , 300

  animateOut: ->
    @el.removeClass 'animate'
    setTimeout =>
      do @_removeBordersInTopRow
    , 300

  _initEvents: ->
    @hamburger.on 'click', @_menuButtonClickHandler

  _menuButtonClickHandler: (e) =>
    if not @opened
      do @open
    else
      do @close

  _drawBordersInTopRow: ->
    @logo.addClass 'draw'
    @buttonOne.addClass 'draw'

  _removeBordersInTopRow: ->
    @logo.removeClass 'draw'
    @buttonOne.removeClass 'draw'

  _drawBordersInMenu: ->
    @menu.addClass 'draw'

  _removeBordersInMenu: ->
    @menu.removeClass 'draw'

  _buildScene: ->
    @scrollScene = SM.addScene
      offset: 190
      duration: '100%'
      triggerElement: 'body'
      triggerHook: 'onLeave'
    .on 'end', (e) =>
      if e.scrollDirection is 'FORWARD'
        do @makeFixed
      else if e.scrollDirection is 'REVERSE'
        if @opened then do @close
        do @makeStatic


module.exports = new Header()
