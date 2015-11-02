require 'jquery.maskedinput'
require 'validetta'
require('../plugins/input-field')(jQuery)
autosize = require 'autosize'

showFormMessage = (form) ->
  form.parent().addClass 'show-msg'

hideFormMessage = (form) ->
  form.parent().removeClass 'show-msg'

resetFormFields = (form) ->
  form.find('input, textarea').val('').filter('textarea').css('height', '')
  form.find('.field').removeClass 'is-filled is-valid is-error'

class Form
  constructor: (selector, options = {}) ->
    @form = if selector instanceof $ then selector else $(selector)
    { @onValid, @onError } = options
    @form.attr 'autocomplete', 'off'
    do @initPhoneField
    do @initInputField
    do @initTextareaAutosize
    do @initValidation
    do @initEvents
    return @

  initEvents: ->
    @form.parent().find('.form-msg-text .link').on 'click', (e) =>
      do @hideMessage

    @form.find('input, textarea').on 'focus', (e) ->
      $(this).parent().removeClass 'is-error'

  initPhoneField: ->
    @form.find('input[type="tel"]').mask "+380 (99) 999-99-99",
      placeholder: "+380 (__) ___-__-__"
      autoclear: false

  initInputField: ->
    @form.find('input, textarea').inputField()

  initTextareaAutosize: ->
    autosize(@form.find('textarea'))

  initValidation: ->
    _this = this
    @form.validetta
      showErrorMessages: false
      errorClass: 'is-error'
      validClass: 'is-valid'
      realTime: true
      validators:
        regExp:
          phone:
            pattern: /^\+380\s\(\d{2}\)\s\d{3}\-\d{2}\-\d{2}/
            errorMessage: 'Phone number is not valid!'
      onValid: (e) ->
        do e.preventDefault
        # alert 'form valid'
        _this.onValid?()
        # send form over $.ajax and show success message
        do _this.showMessage
        setTimeout ->
          do _this.resetFields
        , 500
      onError: (e) ->
        do e.preventDefault
        # alert 'form error'
        _this.onError?()

  showMessage: ->
    showFormMessage @form

  hideMessage: ->
    hideFormMessage @form

  resetFields: ->
    resetFormFields @form

Form.resetFields = (form) ->
  resetFormFields form

Form.showMessage = (form) ->
  showFormMessage form

Form.hideMessage = (form) ->
  hideFormMessage form

# if form is in modal window we need to reset fields after it is closed
$(window).on 'modalClose', (e, modal) ->
  form = modal.find('form')
  if form.length
    Form.resetFields form
    if form.parent('.show-msg').length
      Form.hideMessage form

module.exports = Form
