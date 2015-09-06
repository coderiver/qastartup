module.exports = (->
  body = document.getElementsByTagName('body')[0]
  button = document.createElement 'button'
  button.innerHTML = "Toggle draw"
  button.style.position = "fixed"
  button.style.top = "0"
  button.style.right = "0"
  button.style.padding = "10px"
  button.style.backgroundColor = "gray"
  button.style.zIndex = "9999"
  body.appendChild button

  status = off

  button.addEventListener 'click', (e) ->
    status = !status
    body.classList.toggle 'draw'
    if status
      button.style.backgroundColor = "green"
    else
      button.style.backgroundColor = "gray"
)()
