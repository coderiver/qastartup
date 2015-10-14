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
    @form.find('input[type="tel"]').on 'blur', ->
      console.log this.value, this.value.length


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
        phone: /^\+380\s\(\d{2}\)\s\d{3}\-\d{2}\-\d{2}/
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
        console.log this
        _this.onError?()

  showMessage: ->
    showFormMessage @form

  hideMessage: ->
    hideFormMessage @form

  resetFields: ->
    resetFormFields @form

Form.resetFields = (form) ->
  resetFormFields form

# if form is in modal window we need to reset fields after it is closed
$(window).on 'modalClose', (e, modal) ->
  form = modal.find('form')
  if form.length
    Form.resetFields form

module.exports = Form
