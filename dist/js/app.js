!function t(e,n,i){function r(s,a){if(!n[s]){if(!e[s]){var l="function"==typeof require&&require;if(!a&&l)return l(s,!0);if(o)return o(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var p=n[s]={exports:{}};e[s][0].call(p.exports,function(t){var n=e[s][1][t];return r(n?n:t)},p,p.exports,t,e,n,i)}return n[s].exports}for(var o="function"==typeof require&&require,s=0;s<i.length;s++)r(i[s]);return r}({1:[function(t,e,n){var i,r,o,s,a,l,u,p,c,h,d,f,m;window.$=window.jQuery=t("jquery"),t("jquery.transit"),t("jquery.maskedinput"),t("slick-carousel"),t("validetta"),t("jquery.easing"),t("./plugins/accordion")(jQuery),t("./plugins/input-field")(jQuery),t("./plugins/hover-gallery")(jQuery),s=t("./modules/header"),u=t("./modules/scroll-scenes"),p=t("./modules/testimonials"),a=t("./modules/map"),i=t("./modules/graph"),o=t("./modules/slider-box"),d=t("./modules/modal"),l=t("./modules/player").initPlayerApi,r=t("./modules/player").ModalPlayer,m=$(".toparea__inner, .header"),c=function(){return m.addClass("hide")},h=function(){return m.addClass("transition").removeClass("hide"),setTimeout(function(){return m.removeClass("transition").addClass("draw")},1500)},f=function(t){return t.parent().addClass("show-msg"),setTimeout(function(){return t.find("input").val(""),t.find(".field").removeClass("is-filled")},500)},Pace.on("done",function(){return $("#toparea-video")[0].play(),setTimeout(function(){return h()},1e3)}),$(document).ready(function(){var t,e;return c(),s.init(),p(),u(),a(),e=new i(".stats__graph",{values1:[500,1500,2350,3200],values2:[456,1140,720,187],valueLabels:["Junior QA","Middle QA","Senior QA","QA Tech Lead"]}),new r("#player",".toparea .play-button"),l(),$(".faq__list").accordion({itemSelector:".faq-item",buttonSelector:".faq-item__button",contentSelector:".faq-item__answer"}),$(".js-question-toggle").on("click",function(){var t;return t=$(".question__form"),t.slideToggle(500,function(){return t.toggleClass("draw")})}),$(".partners__list").slick({slidesToShow:5,slidesToScroll:1,speed:1e3,autoplay:!0,autoplaySpeed:3e3,pauseOnHover:!1,slide:".partners__partner",prevArrow:'<button type="button" class="carousel-prev"></button>',nextArrow:'<button type="button" class="carousel-next"></button>'}),t=new o(".advantages .slider-box",{zoomOutTrigger:".content-layer-1"}),$('input[type="tel"]').mask("+380 (99) 999-99-99",{placeholder:"+380 (__) ___-__-__"}),$("form input").inputField(),$("form").validetta({showErrorMessages:!1,errorClass:"is-error",validClass:"is-valid",realTime:!0,onValid:function(t){var e;return t.preventDefault(),e=$(this.form),alert("form valid"),f(e)},onError:function(t){return alert("form error")}}),$(".form-msg-text .link").on("click",function(t){return t.preventDefault(),$(this).parents(".show-msg").removeClass("show-msg")}),$(".news .slider-item__title").hoverGallery({container:".news__bg"}),$("[data-modal]").on("click",function(t){return t.preventDefault(),d($(this).data("modal"))})})},{"./modules/graph":2,"./modules/header":3,"./modules/map":4,"./modules/modal":5,"./modules/player":8,"./modules/scroll-scenes":10,"./modules/slider-box":11,"./modules/testimonials":12,"./plugins/accordion":14,"./plugins/hover-gallery":15,"./plugins/input-field":16,jquery:"jquery","jquery.easing":"jquery.easing","jquery.maskedinput":"jquery.maskedinput","jquery.transit":"jquery.transit","slick-carousel":"slick-carousel",validetta:"validetta"}],2:[function(t,e,n){var i,r,o,s,a=function(t,e){return function(){return t.apply(e,arguments)}};s=t("snapsvg"),r=t("./scroll-controller"),o=t("lodash/function/debounce"),i=function(){function t(t,e){this._drawPoints=a(this._drawPoints,this),this.refresh=a(this.refresh,this),this.init(t,e)}var e;return e={values1:[500,1500,2350,3200],values2:[456,1140,720,187],valuesInitial:null,valueLabels:["Junior QA","Middle QA","Senior QA","QA Tech Lead"],button1:$(".stats__buttons button").first(),button2:$(".stats__buttons button").last(),width:"100%",maxWidth:1140,minWidth:1140,height:400,paddingY:20,pointRadius:3.5,yMax1:4e3,yStep1:500,yMax2:1600,eventName:"graphReady"},t.prototype.init=function(t,n){var i;return null==n&&(n={}),this.props=$.extend({},e,n),this.minY=this.props.paddingY,this.maxY=this.props.height+this.props.paddingY,this.paper=s(this.props.width,this.props.height+2*this.props.paddingY),this.container=t instanceof $?t:$(t),this.button1=this.props.button1 instanceof $?this.props.button1:$(this.props.button1),this.button2=this.props.button2 instanceof $?this.props.button2:$(this.props.button2),this.stateInitial={name:"initial"},this.state1={name:"state1"},this.state2={name:"state2"},this.currentState=this.stateInitial,this.active=!1,this.isReady=!1,this.inProgress=!1,null==(i=this.props).valuesInitial&&(i.valuesInitial=this.props.values1.map(function(){return 0})),this.paper.node.style.display="block",this.paper.node.style.marginTop=-this.props.paddingY,this.paper.node.style.marginBottom=-this.props.paddingY,this.paper.prependTo(this.container[0]),this._initEvents(),this._buildScene(),this.renderInitialState()},t.prototype.changeState=function(t,e,n){var i;return null==e&&(e=800),i=mina.easein,this.inProgress||t.name===this.currentState.name?void 0:(this.inProgress=!0,this.line.animate({path:t.linePath},e,i),this.fill.animate({path:t.fillPath},e,i,function(t){return function(){return t.inProgress=!1,"function"==typeof n?n():void 0}}(this)),this.currentState.axisYGroup.animate({opacity:0},e/2,i,function(){return t.axisYGroup.animate({opacity:1},e/2,i)}),null!=this.pointsGroups&&this.pointsGroups.forEach(function(n){return function(i,r){return n._changePointPosition(t,r,e)}}(this)),this.currentState=t)},t.prototype.activate=function(){return this.changeState(this.state1,null,this._drawPoints),this.active=!0},t.prototype.render=function(t){return null==t&&(t=!1),this._calculations(),this._drawGrid(),this._drawPaths(),t?(this._refreshState(),this._drawPoints(!1)):(setTimeout(function(t){return function(){return t.changeState(t.state1,null,t._drawPoints)}}(this),1e3),this.active=!0)},t.prototype.renderInitialState=function(){return this._calculations(),this._drawGrid(),this._drawPaths(this.stateInitial)},t.prototype.refresh=function(){return $(window).width()<=this.props.minWidth?void 0:(this.paper.clear(),this._calculations(),this.currentState.name===this.stateInitial.name?this.renderInitialState():(this._drawGrid(),this._drawPaths(this.currentState),this._showAxisY(),this._drawPoints(!1)))},t.prototype._refreshState=function(t){return null==t&&(t=this.currentState),this.line.attr({path:t.linePath}),this.fill.attr({path:t.fillPath}),this._showAxisY(t)},t.prototype._drawGrid=function(){var t,e,n,i,r,o,s,a,l,u,p,c,h,d,f,m,g;for(e=this.state1.axisYGroup=this.stateInitial.axisYGroup=this.paper.g(),n=this.state2.axisYGroup=this.paper.g(),o=this.gridGroup=this.paper.g(),u=this.paddingX,s=this.props.height,t={alignmentBaseline:"middle",fontSize:14,fill:"rgba(255, 255, 255, 0.3)","class":"graph-axis-label"},e.attr({"class":"graph-axis-y",opacity:0}),n.attr({"class":"graph-axis-y",opacity:0}),o.addClass("graph-grid").attr({stroke:"#F7F7F7",opacity:.1,strokeWidth:1}),h=function(){var t,e,n,i;for(i=[],a=t=0,e=this.props.yMax1,n=this.props.yStep1;n>0?e>=t:t>=e;a=t+=n)i.push(a);return i}.call(this),d=function(){var t,e,n,i;for(i=[],a=t=0,e=this.props.yMax2,n=this.props.yMax2/(h.length-1);n>0?e>=t:t>=e;a=t+=n)i.push(a);return i}.call(this),r=function(t,e){return o.line(t-27,e,0,e)},i=function(t,e){return o.line(t+73,e,"100%",e)},f=[],l=p=0,c=h.length;c>p;l=++p)m=h[l],g=this.minY+s-l*s/(h.length-1),e.text(u,g,"$"+m).attr(t),n.text(u,g,""+d[l]).attr(t),r(u,g),f.push(i(u,g));return f},t.prototype._drawPaths=function(t){var e;return null==t&&(t=this.stateInitial),this.graphGroup=this.paper.g(),e=this.paper.gradient("l(1, 1, 1, 1)#20d8a2-#21e0c7"),this.graphGroup.attr({"class":"graph-path"}),this.line=this.graphGroup.path(t.linePath).attr({stroke:"#20d8a2",strokeWidth:2,fill:"none","class":"graph-path-line"}),this.fill=this.graphGroup.path(t.fillPath).attr({fill:e,opacity:.2,"class":"graph-path-fill"})},t.prototype._drawPoints=function(t,e){var n;return null==t&&(t=!0),null==e&&(e=!1),n=t&&e?500:0,this.pointsGroups=[],this.currentState.points.forEach(function(e){return function(i,r,o){return setTimeout(function(){var n;return n=e._drawPoint(i.x,i.y,e.props.valueLabels[r],t),e.pointsGroups.push(n),r===o.length-1?($(window).trigger(e.props.eventName),e.isReady=!0):void 0},n*r)}}(this)),this.pointsGroups},t.prototype._drawPoint=function(t,e,n,i){var r,o,s,a,l;return null==i&&(i=!0),a=this.paper.circle(t,e,0).attr({"class":"graph-point",fill:"#20d8a2"}),o=this.paper.path("M"+t+" "+e+"L"+(t+35)+" "+(e-60)+"L"+(t+45)+" "+(e-60)).attr({"class":"graph-point-line",stroke:"rgba(255, 255, 255, 0.5)",strokeWidth:1,fill:"none"}),s=o.getTotalLength(),o.attr({strokeDashoffset:s,strokeDasharray:s}),r=this.paper.text(t,e,n).attr({"class":"graph-point-label",fontSize:14,opacity:0,fill:"#FFF",alignmentBaseline:"middle"}).transform("t53 -60"),i?(a.animate({r:this.props.pointRadius},2e3,mina.elastic),o.animate({strokeDashoffset:0},500,mina.linear,function(){return r.animate({opacity:1},1e3,mina.linear)})):(a.attr({r:this.props.pointRadius}),o.attr({strokeDashoffset:0}),r.attr({opacity:1})),l=this.paper.g(o,r,a),l.addClass("graph-point-group"),l},t.prototype._showAxisY=function(t){return null==t&&(t=this.currentState),t.axisYGroup.attr({opacity:1})},t.prototype._initEvents=function(){return $(window).on("resize",o(this.refresh,200).bind(this)),$(window).one(this.props.eventName,function(t){return function(){return t.button1.on("click",function(e){return e.preventDefault(),t.button2.removeClass("is-active"),t.button1.addClass("is-active"),t.changeState(t.state1)}),t.button2.on("click",function(e){return e.preventDefault(),t.button2.addClass("is-active"),t.button1.removeClass("is-active"),t.changeState(t.state2)})}}(this))},t.prototype._calculations=function(){var t,e,n,i;return i=this.container[0].clientWidth,e=this.props.maxWidth,n=Math.min(e,i),this.paddingX=i>e?(i-e)/2:0,this.divisionValueX=n/(this.props.values1.length+1),this.divisionValueY=this.props.height/this.props.yMax1,t=function(t){return function(e,n,i){return null==i&&(i=1),{x:t.paddingX+t.divisionValueX*(n+1),y:t.minY+t.props.height-e*i*t.divisionValueY}}}(this),this.stateInitial.yMultiplier=1,this.state1.yMultiplier=1,this.state2.yMultiplier=this.props.yMax1/this.props.yMax2,this.stateInitial.points=this.props.valuesInitial.map(function(e){return function(n,i){return t(n,i,e.stateInitial.yMultiplier)}}(this)),this.state1.points=this.props.values1.map(function(e){return function(n,i){return t(n,i,e.state1.yMultiplier)}}(this)),this.state2.points=this.props.values2.map(function(e){return function(n,i){return t(n,i,e.state2.yMultiplier)}}(this)),this.stateInitial.linePath=this._pointsToSVGPath(this.stateInitial.points,!1,"bottom"),this.state1.linePath=this._pointsToSVGPath(this.state1.points),this.state2.linePath=this._pointsToSVGPath(this.state2.points,!1,"bottom"),this.stateInitial.fillPath=this._pointsToSVGPath(this.stateInitial.points,!0,"bottom"),this.state1.fillPath=this._pointsToSVGPath(this.state1.points,!0),this.state2.fillPath=this._pointsToSVGPath(this.state2.points,!0,"bottom")},t.prototype._changePointPosition=function(t,e,n){var i,r;return null==n&&(n=1e3),i=t.points[e].y-this.currentState.points[e].y,r=this.pointsGroups[e],r.stop().animate({transform:"t0,"+i+"..."},n,mina.easein)},t.prototype._pointsToSVGPath=function(t,e,n){var i,r,o,s;for(null==n&&(n="top"),o="M0 "+this.maxY+" R",i=0,r=t.length;r>i;i++)s=t[i],o+=s.x+" "+s.y+" ";return"top"===n?o+=this.container[0].clientWidth+" "+this.minY+" ":"bottom"===n&&(o+=this.container[0].clientWidth+" "+this.maxY+" "),e&&(o+="V"+this.maxY+" Z"),o},t.prototype._buildScene=function(){return r.addScene({triggerHook:"onCenter",triggerElement:this.container[0]}).on("start",function(t){return function(e){return t.container.addClass("show-graph"),t.active?void 0:t.activate()}}(this))},t}(),e.exports=i},{"./scroll-controller":9,"lodash/function/debounce":18,snapsvg:"snapsvg"}],3:[function(t,e,n){var i,r,o=function(t,e){return function(){return t.apply(e,arguments)}};r=t("./scroll-controller"),i=function(){function t(){return this._menuButtonClickHandler=o(this._menuButtonClickHandler,this),this.fixed=!1,this.opened=!1,this}return t.prototype.init=function(){return this.el=$(".header"),this.hamburger=this.el.find(".hamburger"),this.logo=this.el.find(".logo"),this.buttonOne=this.el.find(".btn").first(),this.menu=this.el.find(".header__nav"),this._initEvents(),this._buildScene()},t.prototype.open=function(){return this.hamburger.addClass("is-active"),this.el.addClass("open-step-1"),setTimeout(function(t){return function(){return t.el.addClass("open-step-2")}}(this),100),setTimeout(function(t){return function(){return t._drawBordersInMenu()}}(this),600),this.opened=!0},t.prototype.close=function(){return this.hamburger.removeClass("is-active"),this.el.removeClass("open-step-2"),setTimeout(function(t){return function(){return t.el.removeClass("open-step-1"),t._removeBordersInMenu()}}(this),400),this.opened=!1},t.prototype.makeFixed=function(){return this.el.addClass("fixed"),this.el.removeClass("draw"),this._removeBordersInTopRow(),setTimeout(function(t){return function(){return t.el.addClass("animate")}}(this),0),setTimeout(function(t){return function(){return t._drawBordersInTopRow()}}(this),300),this.fixed=!0},t.prototype.makeStatic=function(){return this.el.removeClass("animate"),setTimeout(function(t){return function(){return t.el.removeClass("fixed"),t.el.addClass("draw"),t._removeBordersInTopRow()}}(this),300),this.fixed=!1},t.prototype.animateIn=function(){return this.el.addClass("animate"),setTimeout(function(t){return function(){return t._drawBordersInTopRow()}}(this),300)},t.prototype.animateOut=function(){return this.el.removeClass("animate"),setTimeout(function(t){return function(){return t._removeBordersInTopRow()}}(this),300)},t.prototype._initEvents=function(){return this.hamburger.on("click",this._menuButtonClickHandler)},t.prototype._menuButtonClickHandler=function(t){return this.opened?this.close():this.open()},t.prototype._drawBordersInTopRow=function(){return this.logo.addClass("draw"),this.buttonOne.addClass("draw")},t.prototype._removeBordersInTopRow=function(){return this.logo.removeClass("draw"),this.buttonOne.removeClass("draw")},t.prototype._drawBordersInMenu=function(){return this.menu.addClass("draw")},t.prototype._removeBordersInMenu=function(){return this.menu.removeClass("draw")},t.prototype._buildScene=function(){return this.scrollScene=r.addScene({offset:190,duration:"100%",triggerElement:"body",triggerHook:"onLeave"}).on("end",function(t){return function(e){return"FORWARD"===e.scrollDirection?t.makeFixed():"REVERSE"===e.scrollDirection?(t.opened&&t.close(),t.makeStatic()):void 0}}(this))},t}(),e.exports=new i},{"./scroll-controller":9}],4:[function(t,e,n){function i(t,e){for(var n=[],i=new google.maps.MarkerImage("img/svg/map-marker.svg",null,null,null,new google.maps.Size(40,58)),r=0;r<e.length;r++){var o=e[r],s=new google.maps.LatLng(o[0],o[1]),a=new google.maps.Marker({position:s,map:t,icon:i,title:o[3].head,zIndex:o[2]});a.infoContent=o[3],n.push(a)}return n}function r(t,e){for(var n=0;n<t.length;n++)google.maps.event.addListener(t[n],"click",function(){var t=o(this.infoContent);e.setContent(t),e.open(a,this)})}function o(t){return'<ul class="marker-info"><li class="marker-info__head">'+t.head+'</li><li class="marker-info__address">'+t.address+'</li><li class="marker-info__tel">'+t.tel+"</li></ul>"}function s(){var t=document.createElement("script");t.type="text/javascript",t.src="https://maps.googleapis.com/maps/api/js?v=3&signed_in=false&callback=initMapInContactsArea",document.body.appendChild(t)}var a,l,u;u=[{featureType:"all",elementType:"labels.text.fill",stylers:[{saturation:36},{color:"#000000"},{lightness:40}]},{featureType:"all",elementType:"labels.text.stroke",stylers:[{visibility:"on"},{color:"#000000"},{lightness:16}]},{featureType:"all",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"administrative",elementType:"geometry.fill",stylers:[{color:"#000000"},{lightness:20}]},{featureType:"administrative",elementType:"geometry.stroke",stylers:[{color:"#000000"},{lightness:17},{weight:1.2}]},{featureType:"landscape",elementType:"geometry",stylers:[{color:"#000000"},{lightness:20}]},{featureType:"poi",elementType:"geometry",stylers:[{color:"#000000"},{lightness:21}]},{featureType:"road.highway",elementType:"geometry.fill",stylers:[{color:"#000000"},{lightness:17}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{color:"#000000"},{lightness:29},{weight:.2}]},{featureType:"road.arterial",elementType:"geometry",stylers:[{color:"#000000"},{lightness:18}]},{featureType:"road.local",elementType:"geometry",stylers:[{color:"#000000"},{lightness:16}]},{featureType:"transit",elementType:"geometry",stylers:[{color:"#000000"},{lightness:19}]},{featureType:"transit.station.rail",elementType:"all",stylers:[{lightness:"19"},{gamma:"1.00"},{hue:"#00ffc5"},{saturation:"0"}]},{featureType:"transit.station.rail",elementType:"geometry",stylers:[{visibility:"off"},{weight:"0.01"},{color:"#65e7b6"}]},{featureType:"transit.station.rail",elementType:"geometry.fill",stylers:[{visibility:"on"}]},{featureType:"transit.station.rail",elementType:"geometry.stroke",stylers:[{visibility:"off"},{saturation:"-5"}]},{featureType:"transit.station.rail",elementType:"labels",stylers:[{visibility:"on"}]},{featureType:"transit.station.rail",elementType:"labels.text.stroke",stylers:[{visibility:"off"}]},{featureType:"water",elementType:"geometry",stylers:[{color:"#000000"},{lightness:17}]}],l=[[50.453,30.44596,1,{head:"Учебный центр «QAStartUP»",address:"Адрес: Вадима Гетьмана, 1-Б",tel:"Телефон: (096) 255-45-49, (093) 615-30-90"}]],window.initMapInContactsArea=function(){var t={zoom:16,disableDefaultUI:!0,scrollwheel:!1,center:new google.maps.LatLng(50.45487,30.435763),styles:u};a=new google.maps.Map(document.getElementById("map"),t);var e=i(a,l),n=new google.maps.InfoWindow;r(e,n)},e.exports=s},{}],5:[function(t,e,n){var i;i=function(t,e){var n,i;return null==e&&(e={}),i=t instanceof $?t:$(t),n=i.find(".modal__close"),i.fadeIn(500,function(){return i.addClass("is-open"),setTimeout(function(){return i.addClass("draw"),"function"==typeof e.afterOpen?e.afterOpen():void 0},500)}),n.one("click",function(t){return t.preventDefault(),"function"==typeof e.beforeClose&&e.beforeClose(),i.removeClass("is-open draw").delay(500).fadeOut(500)})},e.exports=i},{}],6:[function(t,e,n){var i,r=function(t,e){return function(){return t.apply(e,arguments)}};i=function(){function t(t,e){null==e&&(e={}),this._render=r(this._render,this),this.init(t,e)}return t.prototype.init=function(t,e){return this.el=$(t),this.dataString=null!=this.el.data("number")?this.el.data("number").split(",",3):[0,100,1e3],this.initValue=null!=e.initValue?e.initValue:parseInt(this.dataString[0]),this.targetValue=null!=e.targetValue?e.targetValue:parseInt(this.dataString[1]),this.duration=null!=e.duration?e.duration:parseInt(this.dataString[2]),this.animated=!1,this.reset()},t.prototype.start=function(){return this.animated=!0,$({value:this.initValue}).animate({value:this.targetValue},{duration:this.duration,easing:"easeOutQuart",step:function(t){return function(e){return t._render(e)}}(this)})},t.prototype.reset=function(){return this._render(this.initValue)},t.prototype._commaSeparateNumber=function(t){for(;/(\d+)(\d{3})/.test(t.toString());)t=t.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1,");return t},t.prototype._render=function(t){return this.el.text(Math.round(t))},t}(),e.exports=i},{}],7:[function(t,e,n){var i;i=function(){function t(t,e){return this.init(t,e),this}var e;return e={delta:-100,shift:0},t.prototype.init=function(t,n){var i;return null==n&&(n={}),this.el=t instanceof jQuery?t:$(t),i=this.htmlData(),this.props=$.extend({},e,i,n),this.props.shift?this.el.css({top:this.props.shift+"px"}):void 0},t.prototype.htmlData=function(){var t,e;return e={},t=this.el.data("parallax"),$.isNumeric(t)?e.delta=t:"object"==typeof t&&(e=t),e},t.prototype.move=function(t){var e;return e=Math.round(this.props.delta*t),this.el.css({transform:"translate3d(0, "+e+"px, 0)"})},t}(),e.exports=i},{}],8:[function(t,e,n){var i,r,o,s=function(t,e){return function(){return t.apply(e,arguments)}};o=t("./modal"),i="YTAPIReady",e.exports.initPlayerApi=function(){var t,e;return e=document.createElement("script"),e.src="https://www.youtube.com/iframe_api",t=document.getElementsByTagName("script")[0],t.parentNode.insertBefore(e,t),window.onYouTubeIframeAPIReady=function(){return $(window).trigger(i)}},e.exports.ModalPlayer=r=function(){function t(t,e,n){return null==n&&(n={}),this.pauseVideo=s(this.pauseVideo,this),this.playVideo=s(this.playVideo,this),this.init(t,e,n),this}return t.prototype.init=function(t,e,n){return this.videoContainer=t instanceof $?t:$(t),this.triggerElement=e instanceof $?e:$(e),this.modal=this.videoContainer.parents(".modal"),this.videoId=n.videoId||this.videoContainer.attr("data-video-id")||"xEhaVhta7sI",this.player=null,this._initEvents()},t.prototype.playVideo=function(){return this.player?this.player.playVideo():void 0},t.prototype.pauseVideo=function(){return this.player?this.player.pauseVideo():void 0},t.prototype._buildPlayer=function(){return this.player=new YT.Player(this.videoContainer[0],{height:"100%",width:"100%",videoId:this.videoId})},t.prototype._initEvents=function(){return $(window).on(i,function(t){return function(){return t._buildPlayer()}}(this)),this.triggerElement.on("click",function(t){return function(e){return e.preventDefault(),o(t.modal,{afterOpen:t.playVideo,beforeClose:t.pauseVideo})}}(this))},t}()},{"./modal":5}],9:[function(t,e,n){var i,r;r=t("scrollmagic"),i=new r.Controller({container:"body",loglevel:2}),e.exports={addScene:function(t){var e;return e=new r.Scene(t),i.addScene(e),e}}},{scrollmagic:"scrollmagic"}],10:[function(t,e,n){var i,r,o,s;o=t("./scroll-controller"),s=t("./zoom-out"),r=t("./parallax"),i=t("./number"),e.exports=function(){var t,e,n,a,l,u,p;return a=$(window),p=a.height(),$("[data-parallax]").each(function(t,e){var n,i;return n=$(e),i=new r(n),o.addScene({duration:p+n.height(),triggerHook:"onEnter",triggerElement:e}).on("progress",function(t){return i.move(t.progress)})}),$(".fade-in").each(function(t,e){return o.addScene({offset:"20%",triggerHook:"onEnter",triggerElement:e}).on("start",function(){return $(e).toggleClass("animate")})}),u=new s(".toparea__video"),o.addScene({duration:"100%",triggerHook:"onLeave",triggerElement:"body"}).on("progress",function(t){return u.zoomOut(t.progress)}).on("end",function(t){return $(".toparea").toggle()}),e=$(".footer"),o.addScene({duration:200,triggerHook:"onEnter",triggerElement:"#sm-trigger-footer"}).on("start",function(t){return e.toggleClass("is-fixed")}).on("end",function(t){return e.toggleClass("draw")}),t=$(".courses__container"),l=new i(t.find(".course-note__value > span"),{initValue:0,targetValue:87,duration:2e3}),o.addScene({offset:250,duration:330,triggerHook:"onEnter",triggerElement:t[0]}).on("start",function(e){return t.find(".course__head, .course__body").toggleClass("draw"),"FORWARD"===e.scrollDirection?setTimeout(function(){return l.start()},600):void 0}).on("end",function(e){return t.find(".course__footer").toggleClass("draw")}),n=$(".nomination .banner-title"),o.addScene({offset:200,triggerHook:"onEnter",triggerElement:n[0]}).on("start",function(t){return n.toggleClass("draw")}),o.addScene({triggerHook:"onCenter",triggerElement:".callback__frontlayer"}).setClassToggle(".callback__frontlayer","draw"),o.addScene({triggerHook:"onCenter",triggerElement:".reasons__list"}).setClassToggle(".reasons__list","draw"),$(".js-draw").each(function(t,e){return o.addScene({offset:$(e).data("sm-offset")||200,triggerHook:$(e).data("sm-trigger-hook")||"onEnter",triggerElement:e}).setClassToggle(e,"draw")}),$("[data-number]").each(function(t,e){var n;return n=new i($(e)),o.addScene({offset:150,triggerHook:"onEnter",triggerElement:e}).on("start",function(t){return n.animated?void 0:n.start()})})}},{"./number":6,"./parallax":7,"./scroll-controller":9,"./zoom-out":13}],11:[function(t,e,n){var i,r,o;i=t("./scroll-controller"),o=t("./zoom-out"),r=function(){function t(t,e){return this.init(t,e),this}var e;return e={wrapper:"slider-box-wrapper",slider:".slider",sliderTrack:".slider__track",backgroundLayer:".slider-box__bg",zoomOutTrigger:!1},t.prototype.init=function(t,n){return null==n&&(n={}),this.el=t instanceof $?t:$(t),this.props=$.extend({},e,n),this.wrapper=this.el.parent(),this.slider=this.el.find(this.props.slider),this.sliderTrack=this.el.find(this.props.sliderTrack),this.duration=null,this._initSlider(),this.props.zoomOutTrigger?this.initZoomOutScene():this.initSimpleScene()},t.prototype.scrollSlider=function(t){return this.sliderTrack.css({x:-this.duration*t})},t.prototype.makeFixed=function(){return this.el.css({position:"fixed",top:0,left:0,right:0}),this.wrapper.css({height:this.el.outerHeight(),boxSizing:"content-box",paddingBottom:this.duration})},t.prototype.makeStatic=function(){return this.el.css({position:"",top:"",left:"",right:""}),this.wrapper.css({height:"",boxSizing:"",paddingBottom:""})},t.prototype.initSimpleScene=function(){return i.addScene({duration:this.duration,triggerHook:"onLeave",triggerElement:this.wrapper[0]}).on("progress",function(t){return function(e){return t.scrollSlider(e.progress)}}(this)).setPin(this.el[0])},t.prototype.initZoomOutScene=function(){var t;return t=new o(this.el.find(this.props.backgroundLayer)),i.addScene({duration:this.duration,triggerHook:"onLeave",triggerElement:this.wrapper[0]}).on("start",function(t){return function(e){return"FORWARD"===e.scrollDirection&&t.makeFixed(),"REVERSE"===e.scrollDirection?t.makeStatic():void 0}}(this)).on("progress",function(t){return function(e){return t.scrollSlider(e.progress)}}(this)),i.addScene({duration:"100%",triggerHook:"onEnter",triggerElement:this.props.zoomOutTrigger}).on("progress",function(e){return t.zoomOut(e.progress)}).on("end",function(t){return function(e){return t.el.toggle()}}(this))},t.prototype._initSlider=function(){var t,e,n;return t=this.slider.outerHeight(),this.slider.css({height:t}),this.sliderTrack.css({position:"absolute",top:0,left:0}),e=this.slider.outerWidth(),n=this.sliderTrack.outerWidth(),this.duration=n-e},t}(),e.exports=r},{"./scroll-controller":9,"./zoom-out":13}],12:[function(t,e,n){e.exports=function(){var t,e,n,i,r,o;return t=$(".testimonials"),n=t.find(".testimonials__more"),e=t.find(".testimonials__buttons .link"),i=t.find(".testimonial .link"),e.on("click",function(e){return e.preventDefault(),n.slideDown(300),setTimeout(function(){return t.addClass("is-show-more")},500)}),i.on("click",function(t){return t.preventDefault(),o(this)}),r=function(t){var e,n;return n=t.text(),e=t.data("alt-text"),t.text(e),t.data("alt-text",n)},o=function(t){var e,n,i,o;return n=$(t).parents(".testimonial"),i=n.find(".testimonial__text"),e=n.hasClass("is-expanded")?!0:!1,o=i[0].scrollHeight,e?i.animate({height:120},500,function(){return i.css({height:""}),r($(t))}):i.animate({height:o},500,function(){return r($(t))}),n.toggleClass("is-expanded")}}},{}],13:[function(t,e,n){var i;i=function(){function t(t,e){return this.init(t,e),this}var e;return e={minScale:.6,minOpacity:.3},t.prototype.init=function(t,n){return null==n&&(n={}),this.props=$.extend(e,n),this.el=t instanceof jQuery?t:$(t),this.scaleDelta=1-this.props.minScale,this.opacityDelta=1-this.props.minOpacity},t.prototype.zoomOut=function(t){var e;return e=1-this.scaleDelta*t,this.el.css({transform:"scale3d("+e+", "+e+", 1)",opacity:1-this.opacityDelta*t})},t}(),e.exports=i},{}],14:[function(t,e,n){e.exports=function(t){var e;return e=function(){function e(e,n){this.el=e instanceof t?e:t(e),this.init(n)}return e.prototype.init=function(t){return this.items=this.el.find(t.itemSelector),this.buttons=this.el.find(t.buttonSelector),this.contents=this.el.find(t.contentSelector),this.speed=null!=t.speed?t.speed:300,this.openedItemIndex=null,this.initEvents()},e.prototype.initEvents=function(){return this.buttons.each(function(e){return function(n,i){return t(i).on("click",function(){return e.toggleItem(n)})}}(this))},e.prototype.toggleItem=function(t){return t===this.openedItemIndex?(this.closeItem(t),this.openedItemIndex=null):null!==this.openedItemIndex?(this.closeItem(this.openedItemIndex),this.openItem(t),this.openedItemIndex=t):(this.openItem(t),this.openedItemIndex=t)},e.prototype.openItem=function(e){return t(this.items[e]).addClass("is-open"),t(this.contents[e]).slideDown(this.speed,function(t){return function(){return t.scrollToActiveItem()}}(this))},e.prototype.closeItem=function(e){return t(this.items[e]).removeClass("is-open"),t(this.contents[e]).slideUp(this.speed)},e.prototype.scrollToActiveItem=function(){return t("html, body").animate({scrollTop:t(this.items[this.openedItemIndex]).offset().top-90},500)},e}(),t.fn.accordion=function(t){return this.each(function(n,i){return new e(i,t)}),this}}},{}],15:[function(t,e,n){var i;i=function(){function t(t,n){return null==n&&(n={}),this.props=$.extend({},e,n),this.triggers=t,this.container=$(this.props.container).addClass(this.props.containerClass),this._init(),this}var e;return e={containerClass:"hover-galery-container",imageClass:"hover-gallery-image",triggerClass:"hover-gallery-trigger",visibleClass:"visible",srcAttr:"data-image-src"},t.prototype._init=function(){return this.images=$([]),this.triggers.each(function(t){return function(e,n){var i,r,o;return n=$(n),o=null,r=n.attr(t.props.srcAttr),i=$("<div/>",{"class":t.props.imageClass,css:{backgroundImage:"url("+r+")"}}),t.images.push(i[0]),i.appendTo(t.container),n.addClass(t.props.triggerClass).on("mouseenter",function(e){return o=setTimeout(function(){return i.addClass(t.props.visibleClass)},300)}).on("mouseleave",function(e){return clearTimeout(o),i.removeClass(t.props.visibleClass)})}}(this))},t}(),e.exports=function(t){return t.fn.hoverGallery=function(t){return new i(this,t),this}}},{}],16:[function(t,e,n){e.exports=function(t){var e;return e=function(){function e(t,e){return null==e&&(e={}),this.init(t,e),this}var n;return n={dirtyClass:"is-filled"},e.prototype.init=function(e,i){return this.props=t.extend({},n,i),this.input=e instanceof t?e:t(e),this.field=this.input.parent(),this.label=this.input.siblings("label"),this._initEvents()},e.prototype.checkDirty=function(){var t;return t=this.input.val(),t?this.field.addClass(this.props.dirtyClass):this.field.removeClass(this.props.dirtyClass)},e.prototype._initEvents=function(){return this.input.on("blur",function(t){return function(){return t.checkDirty()}}(this))},e}(),t.fn.inputField=function(t){return this.each(function(n,i){return new e(i,t)})}}},{}],17:[function(t,e,n){var i=t("../internal/getNative"),r=i(Date,"now"),o=r||function(){return(new Date).getTime()};e.exports=o},{"../internal/getNative":19}],18:[function(t,e,n){function i(t,e,n){function i(){y&&clearTimeout(y),d&&clearTimeout(d),_=0,d=y=v=void 0}function l(e,n){n&&clearTimeout(n),d=y=v=void 0,e&&(_=o(),f=t.apply(g,h),y||d||(h=g=void 0))}function u(){var t=e-(o()-m);0>=t||t>e?l(v,d):y=setTimeout(u,t)}function p(){l(b,y)}function c(){if(h=arguments,m=o(),g=this,v=b&&(y||!x),w===!1)var n=x&&!y;else{d||x||(_=m);var i=w-(m-_),r=0>=i||i>w;r?(d&&(d=clearTimeout(d)),_=m,f=t.apply(g,h)):d||(d=setTimeout(p,i))}return r&&y?y=clearTimeout(y):y||e===w||(y=setTimeout(u,e)),n&&(r=!0,f=t.apply(g,h)),!r||y||d||(h=g=void 0),f}var h,d,f,m,g,y,v,_=0,w=!1,b=!0;if("function"!=typeof t)throw new TypeError(s);if(e=0>e?0:+e||0,n===!0){var x=!0;b=!1}else r(n)&&(x=!!n.leading,w="maxWait"in n&&a(+n.maxWait||0,e),b="trailing"in n?!!n.trailing:b);return c.cancel=i,c}var r=t("../lang/isObject"),o=t("../date/now"),s="Expected a function",a=Math.max;
e.exports=i},{"../date/now":17,"../lang/isObject":23}],19:[function(t,e,n){function i(t,e){var n=null==t?void 0:t[e];return r(n)?n:void 0}var r=t("../lang/isNative");e.exports=i},{"../lang/isNative":22}],20:[function(t,e,n){function i(t){return!!t&&"object"==typeof t}e.exports=i},{}],21:[function(t,e,n){function i(t){return r(t)&&a.call(t)==o}var r=t("./isObject"),o="[object Function]",s=Object.prototype,a=s.toString;e.exports=i},{"./isObject":23}],22:[function(t,e,n){function i(t){return null==t?!1:r(t)?p.test(l.call(t)):o(t)&&s.test(t)}var r=t("./isFunction"),o=t("../internal/isObjectLike"),s=/^\[object .+?Constructor\]$/,a=Object.prototype,l=Function.prototype.toString,u=a.hasOwnProperty,p=RegExp("^"+l.call(u).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");e.exports=i},{"../internal/isObjectLike":20,"./isFunction":21}],23:[function(t,e,n){function i(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}e.exports=i},{}]},{},[1]);
//# sourceMappingURL=app.js.map