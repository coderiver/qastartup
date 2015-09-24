# $ = require 'jquery'

openModal = (selector, options = {}) ->
  modal     = if selector instanceof $ then selector else $(selector)
  closeBtn  = modal.find '.modal__close'

  modal.fadeIn 500, ->
    modal.addClass 'is-open'
    setTimeout ->
      modal.addClass 'draw'
      options.afterOpen?()
    , 500

  closeBtn.one 'click', (e) ->
    do e.preventDefault
    options.beforeClose?()
    modal
      .removeClass 'is-open draw'
      .delay 500
      .fadeOut 500

module.exports = openModal
