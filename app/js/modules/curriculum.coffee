# $ = require 'jquery'
SM = require '../modules/scroll-controller'

class Curriculum
  defaults =
    topOffset: 120
    selectors:
      pinnedArea: '.curriculum__pinned-area'
      scrolledArea: '.curriculum__scrolled-area'
      counter: '.lessons-counter__numbers'
      section: '.lesson'

  constructor: (container, options = {}) ->
    @props      = $.extend {}, defaults, options
    @container  = if container instanceof $ then container else $(container)
    @pinnedArea = @container.find @props.selectors.pinnedArea
    @counter    = @container.find @props.selectors.counter
    @sections   = @container.find @props.selectors.section

    setTimeout @_buildPinnedAreaScene, 0
    @_buildSectionsScenes()
    @_updateCounter()

  _updateCounter: (currentSection = 1) ->
    return if currentSection is 0
    @counter.html("<span class='current'>#{currentSection}</span><br>из<br>#{@sections.length}")

  _buildPinnedAreaScene: =>
    if @props.selectors.scrolledArea
      scrolledAreaHeight = @container.find(@props.selectors.scrolledArea).outerHeight()
    else
      scrolledAreaHeight = @sections.parent().outerHeight()
    lastSection          = @sections.last()
    duration             = scrolledAreaHeight - lastSection.outerHeight()

    SM.addScene
      offset: -@props.topOffset
      duration: duration
      triggerHook: 'onLeave'
      triggerElement: @sections[0]
    .setPin @pinnedArea[0]

  _buildSectionsScenes: ->
    @sections.each (i, el) =>
      SM.addScene
        offset: -@props.topOffset
        triggerHook: 'onLeave'
        triggerElement: el
      .on 'start', (e) =>
        switch e.scrollDirection
          when 'FORWARD' then @_updateCounter i + 1
          when 'REVERSE' then @_updateCounter i

module.exports = Curriculum
