$ = require 'jquery'

class InputField
  constructor: (selector) ->
    @init selector
    return @

  init: (selector) ->
    @input = if selector instanceof $ then selector else $(selector)
    @field = @input.parents '.field'
    @label = @input.siblings 'label'

    do @_initEvents

  checkDirty: ->
    val = do @input.val
    if val
      console.log val
      @field.addClass 'is-filled'
    else
      @field.removeClass 'is-filled'

  _initEvents: ->
    @input.on 'blur', =>
      do @checkDirty

module.exports = InputField
