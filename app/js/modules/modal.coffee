# $ = require 'jquery'

openModal = (selector) ->
  modal     = if selector instanceof $ then selector else $(selector)
  closeBtn  = modal.find '.modal__close'

  modal.fadeIn 500, ->
    modal.addClass 'is-open'

  closeBtn.one 'click', (e) ->
    do e.preventDefault
    modal
      .removeClass 'is-open'
      .delay 500
      .fadeOut 500

module.exports = openModal
