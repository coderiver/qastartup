# $ = require 'jquery'
# require 'jquery.easing'

scrollTo = (target, duration = 1000, shift = 100, container = 'html, body') ->
  $(container).animate
    scrollTop: $(target).offset().top - shift
  , duration, 'easeOutCubic'

# smooth scroll to anchor link
scrollToAnchor = (duration) ->
  $('a[href^="#"]').on 'click', (e) ->
    e.preventDefault()
    name = this.hash.slice(1)
    if name.length
      scrollTo "a[name='#{name}']", duration

module.exports.scrollTo       = scrollTo
module.exports.scrollToAnchor = scrollToAnchor
