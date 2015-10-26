window.$ = window.jQuery = require 'jquery'

switch location.pathname
  when '/'
    require './controllers/index'
  when '/course.html'
    require './controllers/course'
  # for github pages
  when '/qastartup/'
    require './controllers/index'
  when '/qastartup/course.html'
    require './controllers/course'
