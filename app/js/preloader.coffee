pace = require './lib/pace.custom'

preloader      = document.getElementById 'preloader'
preloaderFront = document.querySelector '.preloader__frontlayer'

hidePreloader = (cb = -> ) ->
  setTimeout ->
    preloader.classList.add 'fade-out'
  , 300
  setTimeout ->
    preloader.setAttribute 'hidden', 'hidden'
  , 800

if preloader
  pace.on 'update', (progress) ->
    preloaderFront.style.width = "#{progress}%"

  pace.on 'done', ->
    do hidePreloader

pace.start()

# module.exports = pace
