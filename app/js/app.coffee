window.$ = window.jQuery = require 'jquery'
# jQuery plugins
require 'jquery.transit'
require 'slick-carousel'
require 'jquery.easing'
# require 'validetta'
# require 'autosize'
# require 'jquery.maskedinput'
# require('./plugins/input-field')(jQuery)
require('./plugins/accordion')(jQuery)
require('./plugins/hover-gallery')(jQuery)

header           = require './modules/header'
initScrollScenes = require './modules/scroll-scenes'
initTestimonials = require './modules/testimonials'
initMap          = require './modules/map'
Graph            = require './modules/graph'
SliderBox        = require './modules/slider-box'
openModal        = require './modules/modal'
initPlayerApi    = require('./modules/player').initPlayerApi
ModalPlayer      = require('./modules/player').ModalPlayer
Form             = require('./modules/form')

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

# start play video and show toparea after preloader
Pace.on 'done', ->
  $('#toparea-video')[0].play()
  setTimeout ->
    do makeTopareaVisible
  , 1000


$(document).ready ->

  do makeTopareaInvisible
  do header.init
  do initTestimonials
  do initScrollScenes
  do initMap


  # graph init
  graph = new Graph '.stats__graph',
    values1: [500, 1500, 2350, 3200]
    values2: [456, 1140, 720, 187]
    valueLabels: ['Junior QA', 'Middle QA', 'Senior QA', 'QA Tech Lead']

  # modal youtube player
  new ModalPlayer '#player', '.toparea .play-button'
  do initPlayerApi


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

  # slider box
  advantagesSliderBox = new SliderBox '.advantages .slider-box',
    zoomOutTrigger: '.content-layer-1'

  # forms
  $('form').each (index, el) ->
    new Form el,
      onValid: ->
        alert 'Form valid!'
      onError: ->
        alert 'Form error!'


  # news gallery
  $('.news .slider-item__title').hoverGallery
    container: '.news__bg'

  # open modal windows
  $('[data-modal]').on 'click', (e) ->
    do e.preventDefault
    openModal $(this).data('modal')

