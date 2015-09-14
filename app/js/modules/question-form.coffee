$          = require 'jquery'
# require 'jquery-mask-plugin'
# require 'jquery.maskedinput'
require './../lib/jquery.maskedinput'

class QuestionForm
  constructor: ->
    return @

  init: ->
    @container     = $ '.question'
    @formContainer = $ '.question__form'
    @button        = @container.find '.link'
    @form          = $ '#question-form'

    do @_initEvents
    do @initForm

  toggleFormContainer: ->
    @formContainer.slideToggle 300
    setTimeout =>
      @formContainer.toggleClass 'draw'
    , 300

  toggleButtonText: ->
    text    = do @button.text
    altText = @button.data 'alt-text'
    @button.data 'alt-text', text
    @button.text altText

  initForm: ->
    @form.find('input').field()
    phone = @form.find 'input[type="tel"]'
    phone.mask "+380 (99) 999-99-99",
      placeholder: "+380 (__) ___-__-__"


  _initEvents: ->
    @button.on 'click', =>
      do @toggleFormContainer



module.exports = new QuestionForm()
