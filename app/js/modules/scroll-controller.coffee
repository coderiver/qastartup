scrollmagic      = require 'scrollmagic'

scrollController = new scrollmagic.Controller
  container: 'body'
  loglevel: 2

module.exports =
  addScene: (props) ->
    scene = new scrollmagic.Scene(props)
    scrollController.addScene scene
    return scene


