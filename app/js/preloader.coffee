pace = require './lib/pace.custom'
pace.start()

preloader = document.getElementById 'preloader'
preloaderFront = document.querySelector '.preloader__frontlayer'

pace.on 'update', (progress) ->
  preloaderFront.style.width = "#{progress}%"

pace.on 'done', ->
  do hidePreloader

hidePreloader = (cb = -> ) ->
  preloader.classList.add 'fade-out'
  setTimeout ->
    preloader.setAttribute 'hidden', 'hidden'
  , 500

module.exports = pace
