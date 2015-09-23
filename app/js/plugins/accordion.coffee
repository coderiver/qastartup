module.exports = ($) ->

  class Accordion
    constructor: (element, options) ->
      @el = if element instanceof $ then element else $(element)
      @init(options)

    init: (options) ->
      @items           = @el.find options.itemSelector
      @buttons         = @el.find options.buttonSelector
      @contents        = @el.find options.contentSelector
      @speed           = if options.speed? then options.speed else 300
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
      $(@contents[itemIndex]).slideDown @speed, =>
        do @scrollToActiveItem

    closeItem: (itemIndex) ->
      $(@items[itemIndex]).removeClass 'is-open'
      $(@contents[itemIndex]).slideUp @speed

    scrollToActiveItem: ->
      $('html, body').animate { scrollTop: $(@items[@openedItemIndex]).offset().top - 90 }, 500

  $.fn.accordion = (options) ->
    @.each (index, el) ->
      new Accordion(el, options)
    return @
