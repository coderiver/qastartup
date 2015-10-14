# $ = require 'jquery'

openModal = (selector, options = {}) ->
  modal     = if selector instanceof $ then selector else $(selector)
  closeBtn  = modal.find '.modal__close'
  { beforeOpen, afterOpen, beforeClose, afterClose } = options

  beforeOpen?()

  modal.fadeIn 500, ->
    modal.addClass 'is-open'
    setTimeout ->
      modal.addClass 'draw'
      afterOpen?()
      $(window).trigger 'modalOpen', [modal]
    , 500

  closeBtn.one 'click', (e) ->
    do e.preventDefault
    beforeClose?()
    modal
      .removeClass 'is-open draw'
      .delay 500
      .fadeOut 500, ->
        afterClose?()
        $(window).trigger 'modalClose', [modal]

module.exports = openModal
