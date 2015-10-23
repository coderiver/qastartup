# $ = require 'jquery'
# require 'slick-carousel'

class TextCarousel

  defaults =
    selectors:
      carousel: '.carousel__items'
      carouselSlide: '.carousel__item'
      text: '.carousel__item-text'
    slickOptions: {}

  constructor: (container, options = {}) ->
    @props     = $.extend {}, defaults, options
    @container = if container instanceof $ then container else $(container)
    @carousel  = @container.find @props.selectors.carousel

    @_initEvents()
    @_initMainCarousel()

  _initEvents: ->
    @carousel.on 'init', (e, slick) =>
      @_initTextCarousel slick.$slides

  _initMainCarousel: ->
    defaultOpt =
      arrows: no
      autoplaySpeed: 5000
      slidesToShow: 5
      slidesToScroll: 1
      slide: @props.selectors.carouselSlide
      draggable: no
      initialSlide: 0
      focusOnSelect: yes
      speed: 800

    options = $.extend defaultOpt, @props.slickOptions

    @carousel.slick options

  _initTextCarousel: (mainSlides) ->
    selector   = @props.selectors.text
    @textBlock = $('<div />', { 'class': 'carousel-text-box' }).appendTo(@container)

    mainSlides.each (i, el) =>
      content = $(el).find(selector).html()
      @textBlock.append $('<div />', { html: content } )

    @textBlock.slick
      arrows: no
      draggable: no
      speed: 500

    setTimeout =>
      @carousel.slick 'slickSetOption', 'asNavFor', @textBlock, no
      @carousel.slick 'slickSetOption', 'autoplay', yes, no
    , 0




module.exports = TextCarousel


