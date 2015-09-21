module.exports = ($) ->

  class InputField
    defaults =
      dirtyClass: 'is-filled'

    constructor: (selector, options = {}) ->
      @init selector, options
      return @

    init: (selector, options) ->
      @props = $.extend {}, defaults, options
      @input = if selector instanceof $ then selector else $(selector)
      @field = @input.parent()
      @label = @input.siblings 'label'

      do @_initEvents

    checkDirty: ->
      val = do @input.val
      if val
        @field.addClass @props.dirtyClass
      else
        @field.removeClass @props.dirtyClass

    _initEvents: ->
      @input.on 'blur', =>
        do @checkDirty


  $.fn.inputField = (options) ->
    this.each (index, el) ->
      new InputField el, options
