Graph = require 'modules/graph'

body = document.getElementsByTagName('body')[0]
button = document.createElement 'button'
button.innerHTML = "Toggle draw"
button.style.position = "fixed"
button.style.top = "0"
button.style.right = "0"
button.style.padding = "10px"
button.style.backgroundColor = "red"
button.style.zIndex = "9999"
body.appendChild button

button.addEventListener 'click', (e) ->
  body.classList.toggle 'draw'
