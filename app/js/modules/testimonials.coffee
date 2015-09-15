$ = require 'jquery'

module.exports = ->
  container = $ '.testimonials'
  moreContainer = container.find '.testimonials__more'
  moreBtn       = container.find '.testimonials__buttons .link'
  readMoreBtn   = container.find '.testimonial .link'

  moreBtn.on 'click', (e) ->
    do e.preventDefault
    moreContainer.slideDown 300
    setTimeout ->
      container.addClass 'is-show-more'
    , 500


  readMoreBtn.on 'click', (e) ->
    do e.preventDefault
    toggleReadMore this

  toggleButtonText = (button) ->
    buttonText    = button.text()
    buttonALtText = button.data('alt-text')
    button.text buttonALtText
    button.data 'alt-text', buttonText

  toggleReadMore = (context) ->
    testimonial   = $(context).parents '.testimonial'
    text          = testimonial.find '.testimonial__text'
    expanded      = if testimonial.hasClass 'is-expanded' then yes else no
    textHeight    = text[0].scrollHeight

    if expanded
      text.animate { height: 120 }, 500, ->
        text.css height: ''
        toggleButtonText $(context)

    else
      text.animate { height: textHeight} , 500, ->
        toggleButtonText $(context)

    testimonial.toggleClass 'is-expanded'

