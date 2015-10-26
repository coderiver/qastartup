window.$ = window.jQuery = require 'jquery'

switch location.pathname
  when '/' or '/qastartup/'
    require('./controllers/index')
  when '/course.html' or '/qastartup/course.html'
    require('./controllers/course')
