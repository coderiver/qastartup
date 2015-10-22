# require 'jquery'
# require 'slick-carousel'

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

  constructor: (container, options = {}) ->
    @props = $.extend {}, defaults, options
    @container = if container instanceof $ then container else $(container)
    @leftSlider = @container.find @props.selectors.leftSlider
    @rightSlider = @container.find @props.selectors.rightSlider
    @prevButton = @container.find @props.selectors.prevButton
    @nextButton = @container.find @props.selectors.nextButton
    @_initLeftSlider()
    @_initRightSlider()
    @_initSlideCounter()
    console.log @

  _initLeftSlider: ->
    # @leftSlider = @container.find @props.selectors.leftSlider
    @leftSlider.slick
      infinite: off
      draggable: off
      prevArrow: @prevButton
      nextArrow: @nextButton
      focusOnSelect: on
      slide: @props.selectors.leftSliderSlide
      asNavFor: @rightSlider

    @leftSliderSlickInstance = @leftSlider.slick 'getSlick'

  _initRightSlider: =>
    # @rightSlider = @container.find @props.selectors.rightSlider
    @rightSlider.slick
      infinite: off
      arrows: off
      draggable: off
      focusOnSelect: on
      slide: @props.selectors.rightSliderSlide
      asNavFor: @leftSlider

    @rightSliderSlickInstance = @rightSlider.slick 'getSlick'

  _initSlideCounter: ->
    @slideCounter = @container
      .find(@props.selectors.slideCounter)
      .empty()
      .html("<em class='current'>1232</em>/05")


module.exports = SliderDuo
