# $ = require 'jquery'

openModal = (selector, options = {}) ->
  modal     = if selector instanceof $ then selector else $(selector)
  closeBtn  = modal.find '.modal__close'

  modal.fadeIn 500, ->
    modal.addClass 'is-open'
    setTimeout ->
      do options.afterOpen if typeof options.afterOpen is 'function'
    , 500

  closeBtn.one 'click', (e) ->
    do e.preventDefault
    do options.beforeClose if typeof options.beforeClose is 'function'
    modal
      .removeClass 'is-open'
      .delay 500
      .fadeOut 500

module.exports = openModal
