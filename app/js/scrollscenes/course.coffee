SM             = require '../modules/scroll-controller'
NumberIncrease = require '../modules/number'
ZoomOut        = require '../modules/zoom-out'

module.exports = ->

  # toparea scrollscene
  topareaVideo = new ZoomOut '.toparea__video',
    minScale: 0.2
    minOpacity: 0

  SM.addScene
    duration: '100%'
    triggerHook: 'onLeave'
    triggerElement: 'body'
  .on 'progress', (e) ->
    topareaVideo.zoomOut e.progress
  .on 'end', (e) ->
    $('.toparea').toggle()

  SM.addScene
    duration: '50%'
    triggerHook: 'onLeave'
    triggerElement: '.course-header'
  .setPin '.course-header__pinned-area', pushFollowers: no
  .on 'end', (e) ->
    $('.course-header').toggleClass 'is-unpinned'

  # course offer scene
  $offerContainer = $ '.offer__body'
  offerNumber = new NumberIncrease $offerContainer.find('.course-note__value > span'),
    initValue: 0
    targetValue: 87
    duration: 2000

  SM.addScene
    offset: 250
    duration: 500
    triggerHook: 'onEnter'
    triggerElement: $offerContainer[0]
  .on 'start', (e) ->
    $offerContainer.find('.course-note, .course__head, .course__body').toggleClass 'draw'
    if e.scrollDirection is 'FORWARD'
      setTimeout ->
        do offerNumber.start
      , 600
  .on 'end', (e) ->
    $offerContainer.find('.course__footer').toggleClass 'draw'


  # faq accordion
  $('.faq__list').accordion
    itemSelector: '.faq-item'
    buttonSelector: '.faq-item__button'
    contentSelector: '.faq-item__answer'

