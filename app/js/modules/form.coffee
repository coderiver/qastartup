$ = require 'jquery'
# require 'jquery.maskedinput'

class InputField
  defaults =
    validClass: 'is-valid'
    errorClass: 'is-error'
    dirtyClass: 'is-filled'

  constructor: (selector, options = {}) ->
    @init selector
    return @

  init: (selector, options) ->
    @props  = $.extend {}, defaults, options
    @input  = if selector instanceof $ then selector else $(selector)
    @field  = @input.parent()
    @label  = @input.siblings 'label'
    @dirty = no
    @valid  = no
    @error  = no

    if @input[0].type is 'tel' then do @_initPhoneNumberMask
    do @_initEvents

  checkDirty: ->
    val = @input.val()
    if val then @dirty = yes else @dirty = no

  updateClass: ->
    if @dirty
      @field.addClass @props.dirtyClass
    else
      @field.removeClass @props.dirtyClass

    if @valid
      @field.addClass @props.validClass
    else
      @field.removeClass @props.validClass

    if @error
      @field.addClass @props.errorClass
    else
      @field.removeClass @props.errorClass

  reset: ->
    @input.val('')
    @dirty = no
    @valid = no
    @error = no
    do @updateClass

  _initEvents: ->
    @input.on 'blur', =>
      do @checkDirty
      do @updateClass

  _initPhoneNumberMask: ->
    @input.mask "+380 (99) 999-99-99",
      placeholder: "+380 (__) ___-__-__"
      completed: ->
        console.log this



class Form
  @Field: InputField

  constructor: (selector) ->
    @init selector
    return @

  init: (selector) ->
    @form      = if selector instanceof $ then selector else $(selector)
    @wrapper   = @form.parent()
    @submitBtn = @form.find '[type="submit"]'
    @fields    = []
    @valid     = no

    do @_initEvents
    do @_initFeilds
    do @checkStatus


  _initFeilds: ->
    @form.find('input').each (index, input) =>
      @fields.push new InputField(input)

  showMessage: ->
    @wrapper.addClass 'show-msg'

  hideMessage: ->
    @wrapper.removeClass 'show-msg'

  resetFields: ->
    @fields.forEach (field, index) ->
      do field.reset


  checkStatus: ->
    do @_toggleSubmitButton


  _toggleSubmitButton: ->
    if @valid
      @submitBtn.attr 'disabled', ''
    else
      @submitBtn.attr 'disabled', 'disabled'

  _initEvents: ->
    @form.on 'submit', (e) =>
      do e.preventDefault
      do @showMessage

    @wrapper.find('.form-msg .link').on 'click', (e) =>
      do e.preventDefault
      do @hideMessage
      do @resetFields


module.exports = Form
