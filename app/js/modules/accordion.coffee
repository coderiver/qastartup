$ = jQuery = require 'jquery'

module.export = (->

  class Accordion
    constructor: (element, options) ->
      @el = if element instanceof jQuery then element else $(element)
      @init(options)

    init: (options) ->
      @items           = @el.find options.itemSelector
      @buttons         = @el.find options.buttonSelector
      @contents        = @el.find options.contentSelector
      @speed           = options.speed ? 300
      @openedItemIndex = null
      do @initEvents

    initEvents: ->
      @buttons.each (index, button) =>
        $(button).on 'click', =>
          @toggleItem(index)

    toggleItem: (index) ->
      if index is @openedItemIndex
        @closeItem(index)
        @openedItemIndex = null
      else if @openedItemIndex isnt null
        @closeItem(@openedItemIndex)
        @openItem(index)
        @openedItemIndex = index
      else
        @openItem(index)
        @openedItemIndex = index

    openItem: (itemIndex) ->
      $(@items[itemIndex]).addClass 'is-open'
      $(@contents[itemIndex]).slideDown @speed

    closeItem: (itemIndex) ->
      $(@items[itemIndex]).removeClass 'is-open'
      $(@contents[itemIndex]).slideUp @speed


  $.fn.accordion = (options) ->
    @.each (index, el) ->
      new Accordion(el, options)

)($)
