$ = require 'jquery'
require 'jquery.transit'
require 'jquery.maskedinput'
require 'slick-carousel'

header           = require './modules/header'
initScrollScenes = require './modules/scroll-scenes'
initTestimonials = require './modules/testimonials'
Graph            = require './modules/graph'
Form             = require './modules/form'
SliderBox        = require './modules/slider-box'

# modules as jQuery plugins
require('./plugins/accordion')($)

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


$ ->

  do header.init
  do initTestimonials
  do initScrollScenes
  require('./modules/map')()

  do makeTopareaInvisible


  $('.faq__list').accordion
    itemSelector: '.faq-item'
    buttonSelector: '.faq-item__button'
    contentSelector: '.faq-item__answer'

  $('.js-question-toggle').on 'click', ->
    formContainer = $('.question__form')
    formContainer.slideToggle 500, ->
      formContainer.toggleClass 'draw'

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


  advantagesSliderBox = new SliderBox '.advantages .slider-box',
    zoomOutTrigger: '.content-layer-1'

  newsSliderbox = new SliderBox '.news .slider-box'

  questionForm = new Form '#question-form'

  callbackForm = new Form '#callback-form'

  graph = new Graph '.stats__graph',
    valuesIncome: [500, 1500, 2350, 3200]
    valuesDemand: [800, 3000, 2000, 200]
    valueLabels: ['Junior QA', 'Middle QA', 'Senior QA', 'QA Tech Lead']
