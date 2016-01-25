# ScrollMagic = require 'scrollmagic'

scrollController = new ScrollMagic.Controller
  container: 'body'
  loglevel: 2

module.exports =
  addScene: (props) ->
    scene = new ScrollMagic.Scene(props)
    scrollController.addScene scene
    return scene


