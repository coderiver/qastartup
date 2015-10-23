# require 'jquery'
bodyClass = 'is-modal-opened'

module.exports.disable = ->
  $('body')
    .addClass bodyClass
    .css
      overflow: 'hidden'

module.exports.enable = ->
  $('body')
    .removeClass bodyClass
    .css
      overflow: ''
