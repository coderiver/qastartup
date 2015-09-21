# $          = require 'jquery'
openModal  = require './modal'
EVENT_NAME = 'YTAPIReady'

module.exports.initPlayerApi = ->
  tag            = document.createElement 'script'
  tag.src        = "https://www.youtube.com/iframe_api"
  firstScriptTag = document.getElementsByTagName('script')[0]
  firstScriptTag.parentNode.insertBefore tag, firstScriptTag
  window.onYouTubeIframeAPIReady = ->
    $(window).trigger EVENT_NAME


module.exports.ModalPlayer = class ModalPlayer
  constructor: (element, triggerElement, options = {}) ->
    @init element, triggerElement, options
    return @

  init: (element, triggerElement, options) ->
    @videoContainer = if element instanceof $ then element else $(element)
    @triggerElement = if triggerElement instanceof $ then triggerElement else $(triggerElement)
    @modal          = @videoContainer.parents('.modal')
    @videoId        = options.videoId or @videoContainer.attr('data-video-id') or 'xEhaVhta7sI'
    @player         = null
    do @_initEvents

  playVideo: =>
    do @player.playVideo if @player

  pauseVideo: =>
    do @player.pauseVideo if @player

  _buildPlayer: ->
    @player = new YT.Player @videoContainer[0],
      height: '100%'
      width: '100%'
      videoId: @videoId

  _initEvents: ->
    $(window).on EVENT_NAME, =>
      do @_buildPlayer

    @triggerElement.on 'click', (e) =>
      do e.preventDefault
      openModal @modal,
        afterOpen: @playVideo
        beforeClose: @pauseVideo

