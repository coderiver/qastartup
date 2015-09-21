window.$ = window.jQuery = require 'jquery'
# jQuery plugins
require 'jquery.transit'
require 'jquery.maskedinput'
require 'slick-carousel'
require 'validetta'
require('./plugins/accordion')(jQuery)
require('./plugins/input-field')(jQuery)

header           = require './modules/header'
initScrollScenes = require './modules/scroll-scenes'
initTestimonials = require './modules/testimonials'
openModal        = require './modules/modal'
Graph            = require './modules/graph'
SliderBox        = require './modules/slider-box'

toparea = $('.toparea__inner, .header')

makeTopareaInvisible = ->
  toparea.addClass 'hide'

makeTopareaVisible = ->
  toparea
    .addClass 'transition'
    .removeClass 'hide'
  setTimeout ->
    toparea
      .removeClass 'transition'
      .addClass 'draw'
  , 1500

showFormMessage = (form) ->
  form.parent().addClass 'show-msg'
  # reset fields
  setTimeout ->
    form.find('input').val('')
    form.find('.field').removeClass 'is-filled'
  , 500

# start play video and show toparea after preloader
Pace.on 'done', ->
  $('#toparea-video')[0].play()
  setTimeout ->
    do makeTopareaVisible
  , 1000


$ ->

  do header.init
  do initTestimonials
  do initScrollScenes
  do makeTopareaInvisible
  # require('./modules/map')()


  $('.faq__list').accordion
    itemSelector: '.faq-item'
    buttonSelector: '.faq-item__button'
    contentSelector: '.faq-item__answer'

  $('.js-question-toggle').on 'click', ->
    formContainer = $('.question__form')
    formContainer.slideToggle 500, ->
      formContainer.toggleClass 'draw'

  # partners carousel
  $('.partners__list').slick
    slidesToShow: 5
    slidesToScroll: 1
    speed: 1000
    autoplay: true
    autoplaySpeed: 3000
    pauseOnHover: false
    slide: '.partners__partner'
    prevArrow: '<button type="button" class="carousel-prev"></button>'
    nextArrow: '<button type="button" class="carousel-next"></button>'

  # slider boxes
  newsSliderbox = new SliderBox '.news .slider-box'
  advantagesSliderBox = new SliderBox '.advantages .slider-box',
    zoomOutTrigger: '.content-layer-1'


  # forms
  $('input[type="tel"]').mask "+380 (99) 999-99-99", { placeholder: "+380 (__) ___-__-__" }
  $('form input').inputField()
  $('form').validetta
    showErrorMessages: false
    errorClass: 'is-error'
    validClass: 'is-valid'
    realTime: true
    onValid: (e) ->
      do e.preventDefault
      form = $ this.form
      alert 'form valid'
      # send form to server over $.ajax and show success message
      showFormMessage form
    onError: (e) ->
      alert 'form error'

  # hide form message
  $('.form-msg-text .link').on 'click', (e) ->
    do e.preventDefault
    $(this).parents('.show-msg').removeClass 'show-msg'



  # graph
  graph = new Graph '.stats__graph',
    valuesIncome: [500, 1500, 2350, 3200]
    valuesDemand: [800, 3000, 2000, 200]
    valueLabels: ['Junior QA', 'Middle QA', 'Senior QA', 'QA Tech Lead']

  # modal window
  $('[data-modal]').on 'click', (e) ->
    do e.preventDefault
    openModal $(this).data('modal')
