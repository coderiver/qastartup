# require 'jquery'
# require 'slick-carousel'
openModal = require '../modules/modal'

class SliderDuo

  defaults =
    modalWindows: on
    selectors:
      leftSlider: '.slider-duo__left-slides'
      leftSliderSlide: '.slider-duo__slide-lg'
      rightSlider: '.slider-duo__right-slides'
      rightSliderSlide: '.slider-duo__slide-sm'
      prevButton: '.slider-duo__nav-prev'
      nextButton: '.slider-duo__nav-next'
      slideCounter: '.slider-duo__slide-count'
      infoModal: '#coaches-modal'
      questionModal: '#modal-question'
      modalButtons: '.person__buttons .btn'

  constructor: (container, options = {}) ->
    @props        = $.extend {}, defaults, options
    @container    = if container instanceof $ then container else $(container)
    @leftSlider   = @container.find @props.selectors.leftSlider
    @rightSlider  = @container.find @props.selectors.rightSlider
    @prevButton   = @container.find @props.selectors.prevButton
    @nextButton   = @container.find @props.selectors.nextButton
    @slideCounter = @container.find @props.selectors.slideCounter

    @_initBasicEvents()
    @_initModalWindows() if @props.modalWindows
    @_initLeftSlider()
    @_initRightSlider()
    @_updateSlideCounter()

  _initBasicEvents: ->
    @leftSlider.on 'afterChange', (e, slick, currentSlide) =>
      @_updateSlideCounter()

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

  _initModalWindows: ->
    @infoModal     = $ @props.selectors.infoModal
    @questionModal = $ @props.selectors.questionModal

    @leftSlider.on 'init', (e, slick) =>
      currentSlideObj = $(slick.$slides[slick.currentSlide])
      @_toggleEventsForModal(null, currentSlideObj)

    @leftSlider.on 'beforeChange', (e, slick, currentSlide, nextSlide) =>
      currentSlideObj = $(slick.$slides[currentSlide])
      nextSlideObj    = $(slick.$slides[nextSlide])
      @_toggleEventsForModal(currentSlideObj, nextSlideObj)

  _toggleEventsForModal: (currentSlideObj, nextSlideObj) ->
    btnsSelector           = @props.selectors.modalButtons
    origQuestionModalTitle = null
    $questionTitle          = null

    if currentSlideObj?
      currentSlideBtns = currentSlideObj.find btnsSelector
      currentSlideBtns.off 'click'

    nextSlideBtns    = nextSlideObj.find btnsSelector
    btnModalAbout    = nextSlideBtns.first()
    btnModalQuestion = nextSlideBtns.last()

    # show modal about coach
    btnModalAbout.on 'click', (e) =>
      e.preventDefault()
      @_updateModalContent nextSlideObj
      openModal @infoModal

    # show modal with question to coach
    btnModalQuestion.on 'click', (e) =>
      toCoach = btnModalQuestion.data 'modal-question-title'
      e.preventDefault()
      openModal @questionModal,
        questionTitle: """
          <span class='text-gradient'>Задать вопрос</span>
          <br><small class='small text-gradient'>#{toCoach}</small>
        """

  _updateModalContent: (currentSlide) ->
    if typeof currentSlide is 'number'
      content = $(@leftSliderSlickInstance.$slides[currentSlide]).html()
    else
      content = currentSlide.html()
    @infoModal.find('.modal__body').html content

module.exports = SliderDuo
