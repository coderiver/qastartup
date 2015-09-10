$          = require 'jquery'
InputField = require './input-field'
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
    console.log @

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
    phone = @form.find 'input[type="tel"]'
    phoneField = new InputField phone
    phone.mask "+380 (99) 999-99-99",
      # translation:
      #   'Z':
      #     pattern: /[0-9]/
      # clearIfNotMatch: true
      placeholder: "+380 (__) ___-__-__"
    # phone.on 'focus', ->
    #   value = do phone.val
    #   if not value
    #     phone.val '+380 ('


  _initEvents: ->
    @button.on 'click', =>
      do @toggleFormContainer
      do @toggleButtonText



module.exports = new QuestionForm()
