window.$ = window.jQuery = require 'jquery'

switch location.pathname
  when '/'
    require('./controllers/index')
  when '/course.html'
    require('./controllers/course')
  when '/qastartup/course.html'
    require('./controllers/course')
