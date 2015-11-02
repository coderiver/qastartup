# $ = require 'jquery'
toggleBodyScroll = require '../modules/toggle-scroll'

openModal = (selector, options = {}) ->
  modal    = if selector instanceof $ then selector else $(selector)
  closeBtn = modal.find '.modal__close, .js-modal-close'
  { beforeOpen, afterOpen, beforeClose, afterClose, questionTitle } = options

  beforeOpen?()
  # change title for question in modal window
  if questionTitle
    title = modal.find '.question__title'
    origTitleText = title.html()
    title.html questionTitle

  toggleBodyScroll.disable()

  modal.fadeIn 500, ->
    modal.addClass 'is-open'
    modal.find('.modal__body').scrollTop(0)
    setTimeout ->
      modal.addClass 'draw'
      afterOpen?()
      $(window).trigger 'modalOpen', [modal]
    , 500

  # closeBtn.one 'click', (e) ->
  closeBtn.one 'click', (e) ->
    e.preventDefault()
    beforeClose?()
    toggleBodyScroll.enable()
    closeBtn.off 'click'
    modal
      .removeClass 'is-open draw'
      .delay 500
      .fadeOut 500, ->
        afterClose?()
        # change title to original value for question in modal window
        if questionTitle
          title.html origTitleText
        $(window).trigger 'modalClose', [modal]

module.exports = openModal
