SM = require '../modules/scroll-controller'

class Pagination
  constructor: (selector) ->
    @container = if selector instanceof $ then selector else $(selector)
    @links     = @container.find '.pagination__link'

    @anchors = @links.map (i, el) ->
      return $("a[name='#{el.hash.slice(1)}']")[0]

    @_buildScrollScenes()
    console.log @

  toggleActiveItem: (index) ->
    @links.filter('.is-active').removeClass 'is-active'
    @links.eq(index).addClass 'is-active' if index >= 0

  _buildScrollScenes: ->
    @anchors.each (i, el) =>
      SM.addScene
        offset: -200
        triggerHook: 'onLeave'
        triggerElement: el
      .on 'start', (e) =>
        if e.scrollDirection is 'FORWARD'
          @toggleActiveItem i
        if e.scrollDirection is 'REVERSE'
          @toggleActiveItem i - 1



module.exports = Pagination
