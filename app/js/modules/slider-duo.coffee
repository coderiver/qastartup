# require 'jquery'
# require 'slick-carousel'
openModal = require '../modules/modal'

# $('.slider-duo__slide-lg .person').each (index, el) ->
#   elem = $ el
#   elem.find('.person__footer .btn').first().on 'click', (e) ->
#     elem.find('.person__more').slideToggle()

class SliderDuo

  defaults =
    selectors:
      leftSlider: '.slider-duo__left-slides'
      leftSliderSlide: '.slider-duo__slide-lg'
      rightSlider: '.slider-duo__right-slides'
      rightSliderSlide: '.slider-duo__slide-sm'
      prevButton: '.slider-duo__nav-prev'
      nextButton: '.slider-duo__nav-next'
      slideCounter: '.slider-duo__slide-count'
      modal: '#coaches-modal'

  constructor: (container, options = {}) ->
    @props        = $.extend {}, defaults, options
    @container    = if container instanceof $ then container else $(container)
    @leftSlider   = @container.find @props.selectors.leftSlider
    @rightSlider  = @container.find @props.selectors.rightSlider
    @prevButton   = @container.find @props.selectors.prevButton
    @nextButton   = @container.find @props.selectors.nextButton
    @slideCounter = @container.find @props.selectors.slideCounter
    @modal        = $ @props.selectors.modal

    @_initEvents()
    @_initLeftSlider()
    @_initRightSlider()
    @_updateSlideCounter()
    @_initEventsForModal()
    console.log @


  _initEvents: ->
    @leftSlider.on 'afterChange', (e, slick, currentSlide) =>
      @_updateSlideCounter()

  _initEventsForModal: ->
    @leftSlider.on 'beforeChange', (e, slick, currentSlide, nextSlide) =>
      currentBtns = $(slick.$slides[currentSlide]).find '.person__footer .btn'
      nextBtns    = $(slick.$slides[nextSlide]).find '.person__footer .btn'
      currentBtns.off 'click'
      nextBtns.first().on 'click', (e) =>
        e.preventDefault()
        @_updateModalContent nextSlide
        openModal @modal
      nextBtns.last().on 'click', (e) =>
        e.preventDefault()
        @_updateModalContent nextSlide
        openModal @modal
        console.log 'second btn'

  _initLeftSlider: ->
    @leftSlider.slick
      infinite: off
      draggable: off
      prevArrow: @prevButton
      nextArrow: @nextButton
      focusOnSelect: on
      slide: @props.selectors.leftSliderSlide
      asNavFor: @rightSlider

    @leftSliderSlickInstance = @leftSlider.slick 'getSlick'

  _initRightSlider: ->
    @rightSlider.slick
      infinite: off
      arrows: off
      draggable: off
      focusOnSelect: on
      slide: @props.selectors.rightSliderSlide
      asNavFor: @leftSlider

  _updateSlideCounter: ->
    currentSlide = @leftSliderSlickInstance.currentSlide
    slideCount   = @leftSliderSlickInstance.slideCount
    @slideCounter.html "<span class='current'>#{currentSlide + 1}</span>/#{slideCount}"

  _initModal: ->
    @modal = $ @props.selectors.modal

  _updateModalContent: (currentSlide) ->
    if typeof currentSlide is 'number'
      content = $(@leftSliderSlickInstance.$slides[currentSlide]).html()
    else
      content = currentSlide.html()
    @modal.find('.modal__body').html content


module.exports = SliderDuo
