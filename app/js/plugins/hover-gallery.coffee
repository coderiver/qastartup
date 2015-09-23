# $ = require 'jquery'

class HoverGallery
  defaults =
    containerClass: 'hover-galery-container'
    imageClass: 'hover-gallery-image'
    triggerClass: 'hover-gallery-trigger'
    visibleClass: 'visible'
    srcAttr: 'data-image-src'

  constructor: (selector, options = {}) ->
    @props     = $.extend {}, defaults, options
    @triggers  = selector
    @container = $(@props.container).addClass @props.containerClass
    do @_init
    return @

  _init: ->
    @images = $ []
    @triggers.each (index, trigger) =>
      trigger = $ trigger
      timeout = null
      src = trigger.attr @props.srcAttr

      img = $ '<div/>',
        "class": @props.imageClass
        css:
          backgroundImage: "url(#{src})"

      @images.push img[0]
      img.appendTo @container

      trigger
        .addClass @props.triggerClass
        .on 'mouseenter', (e) =>
          timeout = setTimeout =>
            img.addClass @props.visibleClass
          , 300
        .on 'mouseleave', (e) =>
          clearTimeout timeout
          img.removeClass @props.visibleClass


module.exports = ($) ->
  $.fn.hoverGallery = (options) ->
    new HoverGallery this, options
    return this
