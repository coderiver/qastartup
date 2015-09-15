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
    paddingY: 20
    pointRadius: 3.5
    yStart: 0
    yMax: 4000
    yStep: 500
    eventName: 'graphReady'


  constructor: (selector, options) ->
    @init selector, options


  init: (selector, options = {}) ->
    @props        = $.extend {}, defaults, options
    @minY         = @props.paddingY
    @maxY         = @props.height + @props.paddingY
    @paper        = s @props.width, (@props.height + @props.paddingY * 2)
    @container    = if selector instanceof $ then selector else $(selector)
    @buttonIncome = if @props.buttonIncome instanceof $ then @props.buttonIncome else $(@props.buttonIncome)
    @buttonDemand = if @props.buttonDemand instanceof $ then @props.buttonDemand else $(@props.buttonDemand)
    @stateInitial = { name: 'initial' }
    @stateIncome  = { name: 'income' }
    @stateDemand  = { name: 'demand' }
    @currentState = @stateInitial
    @active       = off
    @isReady      = no
    @inProgress   = no

    @props.valuesInitial ?= @props.valuesIncome.map -> return 0

    @paper.node.style.display      = 'block'
    @paper.node.style.marginTop    = -@props.paddingY
    @paper.node.style.marginBottom = -@props.paddingY

    @paper.prependTo @container[0]

    do @_initEvents
    do @_buildScene


  changeState: (state, duration = 1000, cb) ->
    return if @inProgress
    @inProgress = on
    @line.animate { path: state.linePath }, duration, mina.easein
    @fill.animate { path: state.fillPath }, duration, mina.easein, =>
      @inProgress = off
      @currentState = state
      cb() if typeof cb is 'function'

    if @pointsGroups?
      @pointsGroups.forEach (group, index) =>
        @_changePointPosition state, index, duration



  render: (rerender = off) ->
    do @_calculations
    do @_drawGrid
    do @_drawPaths
    if rerender
      do @_renderState
      @_drawPoints off
    else
      setTimeout =>
        @changeState @stateIncome, 1000, @_drawPoints
      , 1000
    @active = on


  refresh: =>
    return if $(window).width() <= @props.minWidth
    do @paper.clear
    @render on


  _drawGrid: ->
    axisYGroup = @axisYGroup = @paper.g()
    gridGroup  = @gridGroup = @paper.g()
    initialX   = @paddingX
    height     = @props.height

    axisYGroup.attr
      class: 'graph-axis-y'

    gridGroup
      .addClass 'graph-grid'
      .attr
        stroke: '#F7F7F7'
        opacity: 0.1
        strokeWidth: 1

    range = (i for i in [@props.yStart..@props.yMax] by @props.yStep)

    drawLineBefore = (x, y) ->
      gridGroup.line x - 27, y, 0, y

    drawLineAfter = (x, y) ->
      gridGroup.line x + 73, y, '100%', y

    for value, index in range
      y = @minY + height - index * height / (range.length - 1)
      axisYGroup
        .text initialX, y, "$#{value}"
        .attr
          alignmentBaseline: 'middle'
          fontSize: 14
          fill: 'rgba(255, 255, 255, 0.3)'
          class: 'graph-axis-label'
      drawLineBefore initialX, y
      drawLineAfter initialX, y


  _drawPaths: (state = @stateInitial) ->
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


  _drawPoints: (animations = on) =>
    timeout =  if animations is on then 500 else 0
    @pointsGroups = []

    @currentState.points.forEach (point, index, arr) =>
      setTimeout =>
        group = @_drawPoint point.x, point.y, @props.valueLabels[index], animations
        @pointsGroups.push group
        $(window).trigger @props.eventName if index is arr.length - 1
      , timeout * index

    return @pointsGroups


  _drawPoint: (x, y, labelText, animations = on) ->
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
        fill: '#FFF'
        alignmentBaseline: 'middle'
      .transform 't53 -60'

    # animations
    if animations
      point.animate { r: @props.pointRadius }, 2000, mina.elastic
      line.animate { strokeDashoffset: 0 }, 500, mina.linear, ->
        label.animate { opacity: 1 }, 1000, mina.linear
    else
      point.attr r: @props.pointRadius
      line.attr strokeDashoffset: 0
      label.attr opacity: 1

    pointGroup = @paper.g line, label, point
    pointGroup.addClass 'graph-point-group'

    return pointGroup


  _renderState: (state = @currentState) ->
    @line.attr path: state.linePath
    @fill.attr path: state.fillPath


  _initEvents: ->
    $(window).one @props.eventName, =>
      @isReady = yes

      $(window).on 'resize', debounce(@refresh, 200).bind(@)

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
    width           = @container[0].clientWidth
    maxWidth        = @props.maxWidth
    minWidth        = Math.min(maxWidth, width)
    @paddingX       = if width > maxWidth then (width - maxWidth) / 2 else 0

    @divisionValueX = minWidth / (@props.valuesIncome.length + 1)
    @divisionValueY = @props.height / @props.yMax

    # function to transform values in coordinates
    coordinates = (value, index) =>
      return {
        x: @paddingX + @divisionValueX * (index + 1)
        y: @minY + @props.height - value * @divisionValueY
      }

    # calc coordinates for each point on graph on different state
    @stateInitial.points = @props.valuesInitial.map coordinates
    @stateIncome.points  = @props.valuesIncome.map coordinates
    @stateDemand.points  = @props.valuesDemand.map coordinates

    # create pathStroke for line path for each state
    @stateInitial.linePath = @_pointsToSVGPath @stateInitial.points, false, 'bottom'
    @stateIncome.linePath  = @_pointsToSVGPath @stateIncome.points
    @stateDemand.linePath  = @_pointsToSVGPath @stateDemand.points, false, 'bottom'

    # create pathStroke for fill path for each state
    @stateInitial.fillPath = @_pointsToSVGPath @stateInitial.points, true, 'bottom'
    @stateIncome.fillPath  = @_pointsToSVGPath @stateIncome.points, true
    @stateDemand.fillPath  = @_pointsToSVGPath @stateDemand.points, true, 'bottom'


  _changePointPosition: (state, pointIndex, duration = 1000) ->
    delta = state.points[pointIndex].y - @currentState.points[pointIndex].y
    point = @pointsGroups[pointIndex]
    point.stop().animate { transform: "t0,#{delta}..." }, duration, mina.easein


  _pointsToSVGPath: (points, closePath, lastPoint = 'top') ->
    pathStroke = "M0 #{@maxY} R"

    for point in points
      pathStroke += "#{point.x} #{point.y} "

    if lastPoint is 'top'
      pathStroke += "#{@container[0].clientWidth} #{@minY} "
    else if lastPoint is 'bottom'
      pathStroke += "#{@container[0].clientWidth} #{@maxY} "

    if closePath
      pathStroke += "V#{@maxY} Z"

    return pathStroke


  _buildScene: ->
    SM.addScene
      triggerHook: 'onCenter'
      triggerElement: @container[0]
    .on 'start', (e) =>
      @container.addClass 'show-graph'
      if not @active
        do @render



module.exports = Graph
