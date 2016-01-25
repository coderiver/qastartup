# window.$ = window.jQuery = require 'jquery'

# temporary solution to work on local web server and gh-pages
# DO NOT USE FOR PRODUCTION
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
