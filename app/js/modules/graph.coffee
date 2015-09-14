$        = require 'jquery'
s        = require 'snapsvg'
SM       = require './scroll-controller'
debounce = require 'lodash/function/debounce'

class Graph
  defaults =
    valuesIncome: [500, 1500, 2350, 3200]
    valuesDemand: [1000, 2650, 2000, 500]
    valuesInitial: null
    valueLabels: ['Junior QA', 'Middle QA', 'Senior QA', 'QA Tech Lead']
    buttonIncome: $('.stats__buttons button').first()
    buttonDemand: $('.stats__buttons button').last()
    width: '100%'
    maxWidth: 1140
    minWidth: 1140
    height: 400
    paddingY: 50
    pointRadius: 3.5
    yStart: 0
    yMax: 4000
    yStep: 500

  constructor: (selector, options) ->
    @init selector, options

  init: (selector, options = {}) ->
    @container    = document.querySelector selector
    @props        = $.extend {}, defaults, options
    @paper        = s @props.width, @props.height
    @buttonIncome = if @props.buttonIncome instanceof $ then @props.buttonIncome else $(@props.buttonIncome)
    @buttonDemand = if @props.buttonDemand instanceof $ then @props.buttonDemand else $(@props.buttonDemand)
    @stateInitial = { name: 'initial' }
    @stateIncome  = { name: 'income' }
    @stateDemand  = { name: 'demand' }
    @currentState = @stateInitial

    @props.valuesInitial ?= @props.valuesIncome.map -> return 0

    @paper.appendTo @container

    do @_initEvents
    do @render

    console.log @


  drawGrid: ->
    axisYGroup = @axisYGroup = @paper.g()
    gridGroup  = @gridGroup = @paper.g()
    initialX   = @paddingX
    height     = @props.height

    axisYGroup.attr
      class: 'graph-axis-y'

    gridGroup
      .addClass 'graph-grid'
      .attr
        strokeWidth: 1

    range = (i for i in [@props.yStart..@props.yMax] by @props.yStep)

    drawLineBefore = (x, y) ->
      gridGroup.line x - 27, y, 0, y

    drawLineAfter = (x, y) ->
      gridGroup.line x + 73, y, '100%', y

    for value, index in range
      y = height - index * height / (range.length - 1)
      axisYGroup
        .text initialX, y, "$#{value}"
        .attr
          alignmentBaseline: 'middle'
          class: 'graph-axis-label'
      drawLineBefore initialX, y
      drawLineAfter initialX, y


  render: (rerender = off) ->
    do @_calculations
    do @drawGrid
    do @drawPaths
    if rerender
      do @renderState
      do @drawPoints
    else
      setTimeout =>
        @changeState @stateIncome, @drawPoints
      , 1000


  refresh: =>
    return if $(window).width() <= @props.minWidth
    do @paper.clear
    @render on


  drawPaths: (state = @stateInitial) ->
    @graphGroup = @paper.g()
    gradient    = @paper.gradient("l(1, 1, 1, 1)#20d8a2-#21e0c7")

    @graphGroup.attr
      class: 'graph-path'

    @line = @graphGroup
      .path(state.linePath)
      .attr
        stroke: '#20d8a2'
        strokeWidth: 2
        fill: 'none'
        class: 'graph-path-line'

    @fill = @graphGroup
      .path(state.fillPath)
      .attr
        fill: gradient
        opacity: 0.2
        class: 'graph-path-fill'


  drawPoints: =>
    @currentState.points.map (point, index) =>
      setTimeout =>
        @_drawPoint point.x, point.y, @props.valueLabels[index]
      , 500 * index


  changeState: (state, cb = -> ) ->
    @line.animate { path: state.linePath }, 500, mina.easein, cb
    @fill.animate { path: state.fillPath }, 500, mina.easein
    @currentState = state


  renderState: (state = @currentState) ->
    @line.attr path: state.linePath
    @fill.attr path: state.fillPath


  _initEvents: ->
    $(window).on 'resize', debounce(@refresh, 200, leading: true).bind(@)

    @buttonIncome.on 'click', (e) =>
      do e.preventDefault
      @buttonDemand.removeClass 'is-active'
      @buttonIncome.addClass 'is-active'
      @changeState @stateIncome

    @buttonDemand.on 'click', (e) =>
      do e.preventDefault
      @buttonDemand.addClass 'is-active'
      @buttonIncome.removeClass 'is-active'
      @changeState @stateDemand


  _calculations: ->
    width          = @paper.node.clientWidth
    maxWidth       = @props.maxWidth
    minWidth       = Math.min(maxWidth, width)
    @paddingX      = if width > maxWidth then (width - maxWidth) / 2 else 0

    @divisionValueX = minWidth / (@props.valuesIncome.length + 1)
    @divisionValueY = @props.height / @props.yMax

    coordinates = (value, index) =>
      return {
        x: @paddingX + @divisionValueX * (index + 1)
        y: @props.height - value * @divisionValueY
      }

    # calc coordinates for each point on graph on different state
    @stateInitial.points = @props.valuesInitial.map coordinates
    @stateIncome.points  = @props.valuesIncome.map coordinates
    @stateDemand.points  = @props.valuesDemand.map coordinates

    # create pathStroke for line path for each state
    @stateInitial.linePath = @_pointsToSVGPath @stateInitial.points, null, 'bottom'
    @stateIncome.linePath  = @_pointsToSVGPath @stateIncome.points
    @stateDemand.linePath  = @_pointsToSVGPath @stateDemand.points

    # create pathStroke for fill path for each state
    @stateInitial.fillPath = @_pointsToSVGPath @stateInitial.points, true, 'bottom'
    @stateIncome.fillPath  = @_pointsToSVGPath @stateIncome.points, true
    @stateDemand.fillPath  = @_pointsToSVGPath @stateDemand.points, true


  _drawPoint: (x, y, labelText) ->
    point = @paper
      .circle x, y, 0
      .attr
        class: 'graph-point'
        fill: '#20d8a2'

    line = @paper
      .path "M#{x} #{y}L#{x + 35} #{y - 60}L#{x + 45} #{y - 60}"
      .attr
        class: 'graph-point-line'
        stroke: 'rgba(255, 255, 255, 0.5)'
        strokeWidth: 1
        fill: 'none'

    lineLength = line.getTotalLength()
    line.attr
      strokeDashoffset: lineLength
      strokeDasharray: lineLength

    label = @paper
      .text x, y, labelText
      .attr
        class: 'graph-point-label'
        fontSize: 14
        opacity: 0
        alignmentBaseline: 'middle'
      .transform 't53 -60'

    # animations
    point.animate { r: @props.pointRadius }, 2000, mina.elastic
    line.animate { strokeDashoffset: 0 }, 500, mina.linear, ->
      label.animate { opacity: 1 }, 1000, mina.linear

    pointGroup = @paper.g(line, label, point)
    pointGroup.addClass 'graph-point-group'

    return pointGroup


  _pointsToSVGPath: (points, closePath, lastPoint = 'top') ->
    pathStroke = "M0 #{@props.height} R"

    for point in points
      pathStroke += "#{point.x} #{point.y} "

    if lastPoint is 'top'
      pathStroke += "#{@paper.node.clientWidth} 0 "
    else if lastPoint is 'bottom'
      pathStroke += "#{@paper.node.clientWidth} #{@props.height} "

    if closePath
      pathStroke += "V#{@props.height} Z"

    return pathStroke


module.exports = Graph
