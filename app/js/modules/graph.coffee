$        = require 'jquery'
s        = require 'snapsvg'
# throttle = require 'lodash/function/throttle'
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


  drawPointOnGraph: =>
    @pointsGroup = @paper.g()
    @labelsGroup = @paper.g()

    @pointsGroup.addClass 'graph-points'
    @labelsGroup.addClass 'graph-labels'

    @points = @currentState.points.map (point, index) =>
      return @pointsGroup
        .circle point.x, point.y, 0
        .attr
          class: 'graph-point'
          fill: '#20d8a2'
        .animate { r: @props.pointRadius }, 1000, mina.elastic

    @points = @currentState.points.map (point, index) =>
      return @labelsGroup
        .text point.x, point.y, @props.valueLabels[index]
        .attr
          class: 'graph-point-label'
          fontSize: 14
          opacity: 0
        .transform 't53 -60'
        .animate { opacity: 1 }, 500


  render: (rerender = off) ->
    do @_calculations
    do @drawGrid
    do @drawPaths
    if rerender
      do @renderState
      do @drawPointOnGraph
    else
      setTimeout =>
        @changeState @stateIncome, @drawPointOnGraph
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

    divisionValueX = minWidth / (@props.valuesIncome.length + 1)
    divisionValueY = @props.height / @props.yMax

    coordinates = (value, index) =>
      return {
        x: @paddingX + divisionValueX * (index + 1)
        y: @props.height - value * divisionValueY
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

# $(document).ready(function(){


#   var s = Snap('#svgLine');

#   var points1 = [0,10,20,30,50,10,100,150,125,160,190,40,50];
#   var points2 = [100,50,75,150,10,20,50,60,70,100,120,90,10];
#   var points3 = [50,75,60,30,75,100,120,140,305,160,10,20,100];

#   function makeGrid(){

#     var dataLength = points1.length;
#     var allData = points1.concat(points2, points3);
#     var maxValue = Math.max.apply(null, allData);
#     var minValue = Math.min.apply(null, allData);


#     if (maxValue > $('#svgLine').height()){
#       $('#svgLine').height(maxValue+10);
#     }

#     // Creates the vertical lines in the graph
#     for (var i=0; i<dataLength; i++) {
#       var x = i*100;
#       var xLine = s.line(x, minValue-10, x, maxValue+10).attr({
#         stroke: "#ccc",
#         strokeWidth: 0.25
#       });
#     }

#     // Creates the horizontal lines in the graph
#     var w = dataLength*100;
#     var delimiter = 50;
#     var values = (maxValue+10)-(minValue-10);
#     var offset = ((maxValue+10)%delimiter);
#     for (var i=values; i > 0; i--){
#       if ((i-offset) % delimiter === 0){ // Change where lines appear by changing the delimiter (10 for every 10 units, 50 for 50, etc.)
#         var yLine = s.line(0, i, w, i).attr({
#           stroke: '#ccc',
#           strokeWidth: 0.25
#         });
#       }
#     }

#   }

#   makeGrid();


#   function convertToPath(points){
#     var path = '';

#     for (var i=0; i<points.length; i++){
#       var x = i*100;
#       var y = -points[i]+$('#svgLine').height(); // Convert points to how we like to view graphs
#       if (i===0){
#         path += 'M'+x+','+y+' R';
#       }
#       else if (i===points.length-1){
#         path += x+','+y;
#       }
#       else {
#         path += x+','+y+',';
#       }
#     }
#     return path;
#   }

#   function makePath(data, color){
#     var pathString = convertToPath(data);
#     var graphHeight = $('#svgLine').height();
#     var fillString = pathString+' V'+graphHeight+' H0 Z';

#     function getDefaultPath(isFill){
#       var defaultPathString = 'M0,'+graphHeight+' H';


#       for (var i=0; i<data.length; i++) {
#         if (i!==0){
#           defaultPathString += i*100+' ';
#         }
#       }

#       if(isFill){
#         defaultPathString += 'V'+graphHeight+' H0 Z';
#       }
#       return defaultPathString;
#     }

#     var path = s.path(getDefaultPath()).attr({
#       stroke: color,
#       strokeWidth: 2,
#       fill: 'transparent'
#     });

#     var fill = s.path(getDefaultPath(true)).attr({
#       fill: color,
#       fillOpacity: 0.25
#     });

#     path.animate({ path: pathString },500);
#     fill.animate({ path: fillString },500);

#   }

#   makePath(points1, 'red');
#   makePath(points2, 'blue');

#   $('#add-green').on('click', function(){
#     makePath(points3,'green');
#   });

# });
