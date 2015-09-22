# $        = require 'jquery'
s        = require 'snapsvg'
SM       = require './scroll-controller'
debounce = require 'lodash/function/debounce'

class Graph
  defaults =
    values1: [500, 1500, 2350, 3200]
    values2: [456, 1140, 720, 187]
    valuesInitial: null
    valueLabels: ['Junior QA', 'Middle QA', 'Senior QA', 'QA Tech Lead']
    button1: $('.stats__buttons button').first()
    button2: $('.stats__buttons button').last()
    width: '100%'
    maxWidth: 1140
    minWidth: 1140
    height: 400
    paddingY: 20
    pointRadius: 3.5
    yMax1: 4000
    yStep1: 500
    yMax2: 1600
    eventName: 'graphReady'


  constructor: (selector, options) ->
    @init selector, options


  init: (selector, options = {}) ->
    @props        = $.extend {}, defaults, options
    @minY         = @props.paddingY
    @maxY         = @props.height + @props.paddingY
    @paper        = s @props.width, (@props.height + @props.paddingY * 2)
    @container    = if selector instanceof $ then selector else $(selector)
    @button1 = if @props.button1 instanceof $ then @props.button1 else $(@props.button1)
    @button2 = if @props.button2 instanceof $ then @props.button2 else $(@props.button2)
    @stateInitial = { name: 'initial' }
    @state1  = { name: 'state1' }
    @state2  = { name: 'state2' }
    @currentState = @stateInitial
    @active       = off
    @isReady      = no
    @inProgress   = no

    @props.valuesInitial ?= @props.values1.map -> return 0

    @paper.node.style.display      = 'block'
    @paper.node.style.marginTop    = -@props.paddingY
    @paper.node.style.marginBottom = -@props.paddingY

    @paper.prependTo @container[0]

    do @_initEvents
    do @_buildScene


  changeState: (state, duration = 800, cb) ->
    easing = mina.easein
    return if @inProgress
    @inProgress = on
    @line.animate { path: state.linePath }, duration, easing
    @fill.animate { path: state.fillPath }, duration, easing, =>
      @inProgress = off
      cb() if typeof cb is 'function'

    @currentState.axisYGroup.animate { opacity: 0 }, duration / 2, easing, ->
      state.axisYGroup.animate { opacity: 1 }, duration / 2, easing

    if @pointsGroups?
      @pointsGroups.forEach (group, index) =>
        @_changePointPosition state, index, duration

    @currentState = state



  render: (rerender = off) ->
    do @_calculations
    do @_drawGrid
    do @_drawPaths
    if rerender
      do @_renderState
      @_drawPoints off
    else
      setTimeout =>
        @changeState @state1, null, @_drawPoints
      , 1000
    @active = on


  refresh: =>
    return if $(window).width() <= @props.minWidth
    do @paper.clear
    @render on


  _drawGrid: ->
    axisYGroup1   = @state1.axisYGroup = @stateInitial.axisYGroup = @paper.g()
    axisYGroup2   = @state2.axisYGroup = @paper.g()
    gridGroup     = @gridGroup = @paper.g()
    initialX      = @paddingX
    height        = @props.height
    axisLabelAttr =
      alignmentBaseline: 'middle'
      fontSize: 14
      fill: 'rgba(255, 255, 255, 0.3)'
      class: 'graph-axis-label'

    axisYGroup1.attr
      class: 'graph-axis-y'
      opacity: 0

    axisYGroup2.attr
      class: 'graph-axis-y'
      opacity: 0

    gridGroup
      .addClass 'graph-grid'
      .attr
        stroke: '#F7F7F7'
        opacity: 0.1
        strokeWidth: 1

    range1 = (i for i in [0..@props.yMax1] by @props.yStep1)
    range2 = (i for i in [0..@props.yMax2] by (@props.yMax2 / (range1.length - 1)))

    drawLineBefore = (x, y) ->
      gridGroup.line x - 27, y, 0, y

    drawLineAfter = (x, y) ->
      gridGroup.line x + 73, y, '100%', y

    for value, index in range1
      y = @minY + height - index * height / (range1.length - 1)
      axisYGroup1
        .text initialX, y, "$#{value}"
        .attr axisLabelAttr
      axisYGroup2
        .text initialX, y, "#{range2[index]}"
        .attr axisLabelAttr
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


  _drawPoints: (animations = on, sequence = off) =>
    timeout =  if animations and sequence then 500 else 0
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
    state.axisYGroup.attr opacity: 1


  _initEvents: ->
    $(window).one @props.eventName, =>
      @isReady = yes

      $(window).on 'resize', debounce(@refresh, 200).bind(@)

      @button1.on 'click', (e) =>
        do e.preventDefault
        @button2.removeClass 'is-active'
        @button1.addClass 'is-active'
        @changeState @state1

      @button2.on 'click', (e) =>
        do e.preventDefault
        @button2.addClass 'is-active'
        @button1.removeClass 'is-active'
        @changeState @state2


  _calculations: ->
    width       = @container[0].clientWidth
    maxWidth    = @props.maxWidth
    minWidth    = Math.min(maxWidth, width)
    @paddingX   = if width > maxWidth then (width - maxWidth) / 2 else 0

    @divisionValueX = minWidth / (@props.values1.length + 1)
    @divisionValueY = @props.height / @props.yMax1

    # function to transform values in coordinates
    coordinates = (value, index, multiplier = 1) =>
      return {
        x: @paddingX + @divisionValueX * (index + 1)
        y: @minY + @props.height - value * multiplier * @divisionValueY
      }

    # calc multiplier for y coordinate for each point on graph in different state
    @stateInitial.yMultiplier = 1
    @state1.yMultiplier       = 1
    @state2.yMultiplier       = @props.yMax1 / @props.yMax2

    # calc coordinates for each point on graph in different state
    @stateInitial.points = @props.valuesInitial.map (value, index) => coordinates(value, index, @stateInitial.yMultiplier)
    @state1.points       = @props.values1.map (value, index) => coordinates(value, index, @state1.yMultiplier)
    @state2.points       = @props.values2.map (value, index) => coordinates(value, index, @state2.yMultiplier)

    # create pathStroke for line path for each state
    @stateInitial.linePath = @_pointsToSVGPath @stateInitial.points, false, 'bottom'
    @state1.linePath       = @_pointsToSVGPath @state1.points
    @state2.linePath       = @_pointsToSVGPath @state2.points, false, 'bottom'

    # create pathStroke for fill path for each state
    @stateInitial.fillPath = @_pointsToSVGPath @stateInitial.points, true, 'bottom'
    @state1.fillPath       = @_pointsToSVGPath @state1.points, true
    @state2.fillPath       = @_pointsToSVGPath @state2.points, true, 'bottom'
    console.log @


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
