!function t(e,n,r){function i(s,a){if(!n[s]){if(!e[s]){var l="function"==typeof require&&require;if(!a&&l)return l(s,!0);if(o)return o(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var p=n[s]={exports:{}};e[s][0].call(p.exports,function(t){var n=e[s][1][t];return i(n?n:t)},p,p.exports,t,e,n,r)}return n[s].exports}for(var o="function"==typeof require&&require,s=0;s<r.length;s++)i(r[s]);return i}({1:[function(t,e,n){switch(window.$=window.jQuery=t("jquery"),location.pathname){case"/":t("./controllers/index");break;case"/course.html":t("./controllers/course");break;case"/qastartup/course.html":t("./controllers/course")}},{"./controllers/course":2,"./controllers/index":3,jquery:"jquery"}],2:[function(t,e,n){var r,i,o,s,a,l,u,p,c,d;console.log("course controller"),t("jquery.transit"),t("slick-carousel"),t("jquery.easing"),t("../plugins/accordion")(jQuery),t("../plugins/hover-gallery")(jQuery),s=t("../modules/header"),a=t("../scrollscenes/common"),p=t("../scrollscenes/course"),c=t("../modules/testimonials"),l=t("../modules/map"),d=t("../modules/modal"),o=t("../modules/slider-box"),u=t("../modules/player").initPlayerApi,i=t("../modules/player").ModalPlayer,r=t("../modules/form"),Pace.on("done",function(){return setTimeout(function(){return $(".header").addClass("draw")},500)}),$(document).ready(function(){var t;return a(),p(),s.init(),c(),$("[data-modal]").on("click",function(t){return t.preventDefault(),d($(this).data("modal"))}),$("form").each(function(t,e){return new r(e,{onValid:function(){return alert("Form valid!")},onError:function(){return alert("Form error!")}})}),$(".carousel__items").slick({arrows:!1,slidesToShow:5,slidesToScroll:1,slide:".carousel__item",draggable:!1,initialSlide:0,focusOnSelect:!0,speed:1e3}),t=new o(".advantages .slider-box",{zoomOutTrigger:".content-layer-1"})})},{"../modules/form":4,"../modules/header":6,"../modules/map":7,"../modules/modal":8,"../modules/player":11,"../modules/slider-box":13,"../modules/testimonials":14,"../plugins/accordion":16,"../plugins/hover-gallery":17,"../scrollscenes/common":19,"../scrollscenes/course":20,"jquery.easing":"jquery.easing","jquery.transit":"jquery.transit","slick-carousel":"slick-carousel"}],3:[function(t,e,n){var r,i,o,s,a,l,u,p,c,d,h,f,m,g;t("jquery.transit"),t("slick-carousel"),t("jquery.easing"),t("../plugins/accordion")(jQuery),t("../plugins/hover-gallery")(jQuery),a=t("../modules/header"),l=t("../scrollscenes/common"),c=t("../scrollscenes/index"),d=t("../modules/testimonials"),u=t("../modules/map"),i=t("../modules/graph"),s=t("../modules/slider-box"),m=t("../modules/modal"),p=t("../modules/player").initPlayerApi,o=t("../modules/player").ModalPlayer,r=t("../modules/form"),g=$(".toparea__inner, .header"),h=function(){return g.addClass("hide")},f=function(){return g.addClass("transition").removeClass("hide"),setTimeout(function(){return g.removeClass("transition").addClass("draw")},1500)},Pace.on("done",function(){return $("#toparea-video")[0].play(),setTimeout(function(){return f()},1e3)}),$(document).ready(function(){var t,e;return h(),d(),l(),c(),u(),a.init({offset:190}),e=new i(".stats__graph",{values1:[500,1500,2350,3200],values2:[456,1140,720,187],valueLabels:["Junior QA","Middle QA","Senior QA","QA Tech Lead"]}),new o("#player",".toparea .play-button"),p(),$(".faq__list").accordion({itemSelector:".faq-item",buttonSelector:".faq-item__button",contentSelector:".faq-item__answer"}),$(".js-question-toggle").on("click",function(){var t;return t=$(".question__form"),t.slideToggle(500,function(){return t.toggleClass("draw")})}),$(".partners__list").slick({slidesToShow:5,slidesToScroll:1,speed:1e3,autoplay:!0,autoplaySpeed:3e3,pauseOnHover:!1,slide:".partners__partner",prevArrow:'<button type="button" class="carousel-prev"></button>',nextArrow:'<button type="button" class="carousel-next"></button>'}),t=new s(".advantages .slider-box",{zoomOutTrigger:".content-layer-1"}),$("form").each(function(t,e){return new r(e,{onValid:function(){return alert("Form valid!")},onError:function(){return alert("Form error!")}})}),$(".news .slider-item__title").hoverGallery({container:".news__bg"}),$("[data-modal]").on("click",function(t){return t.preventDefault(),m($(this).data("modal"))})})},{"../modules/form":4,"../modules/graph":5,"../modules/header":6,"../modules/map":7,"../modules/modal":8,"../modules/player":11,"../modules/slider-box":13,"../modules/testimonials":14,"../plugins/accordion":16,"../plugins/hover-gallery":17,"../scrollscenes/common":19,"../scrollscenes/index":21,"jquery.easing":"jquery.easing","jquery.transit":"jquery.transit","slick-carousel":"slick-carousel"}],4:[function(t,e,n){var r,i,o,s,a;t("jquery.maskedinput"),t("validetta"),t("../plugins/input-field")(jQuery),i=t("autosize"),a=function(t){return t.parent().addClass("show-msg")},o=function(t){return t.parent().removeClass("show-msg")},s=function(t){return t.find("input, textarea").val("").filter("textarea").css("height",""),t.find(".field").removeClass("is-filled is-valid is-error")},r=function(){function t(t,e){return null==e&&(e={}),this.form=t instanceof $?t:$(t),this.onValid=e.onValid,this.onError=e.onError,this.initPhoneField(),this.initInputField(),this.initTextareaAutosize(),this.initValidation(),this.initEvents(),this}return t.prototype.initEvents=function(){return this.form.parent().find(".form-msg-text .link").on("click",function(t){return function(e){return t.hideMessage()}}(this)),this.form.find("input, textarea").on("focus",function(t){return $(this).parent().removeClass("is-error")})},t.prototype.initPhoneField=function(){return this.form.find('input[type="tel"]').mask("+380 (99) 999-99-99",{placeholder:"+380 (__) ___-__-__",autoclear:!1})},t.prototype.initInputField=function(){return this.form.find("input, textarea").inputField()},t.prototype.initTextareaAutosize=function(){return i(this.form.find("textarea"))},t.prototype.initValidation=function(){var t;return t=this,this.form.validetta({showErrorMessages:!1,errorClass:"is-error",validClass:"is-valid",realTime:!0,validators:{regExp:{phone:{pattern:/^\+380\s\(\d{2}\)\s\d{3}\-\d{2}\-\d{2}/,errorMessage:"Phone number is not valid!"}}},onValid:function(e){return e.preventDefault(),"function"==typeof t.onValid&&t.onValid(),t.showMessage(),setTimeout(function(){return t.resetFields()},500)},onError:function(e){return e.preventDefault(),"function"==typeof t.onError?t.onError():void 0}})},t.prototype.showMessage=function(){return a(this.form)},t.prototype.hideMessage=function(){return o(this.form)},t.prototype.resetFields=function(){return s(this.form)},t}(),r.resetFields=function(t){return s(t)},r.showMessage=function(t){return a(t)},r.hideMessage=function(t){return o(t)},$(window).on("modalClose",function(t,e){var n;return n=e.find("form"),n.length&&(r.resetFields(n),n.parent(".show-msg").length)?r.hideMessage(n):void 0}),e.exports=r},{"../plugins/input-field":18,autosize:"autosize","jquery.maskedinput":"jquery.maskedinput",validetta:"validetta"}],5:[function(t,e,n){var r,i,o,s,a=function(t,e){return function(){return t.apply(e,arguments)}};s=t("snapsvg"),i=t("./scroll-controller"),o=t("lodash/function/debounce"),r=function(){function t(t,e){this._drawPoints=a(this._drawPoints,this),this.refresh=a(this.refresh,this),this.init(t,e)}var e;return e={values1:[500,1500,2350,3200],values2:[456,1140,720,187],valuesInitial:null,valueLabels:["Junior QA","Middle QA","Senior QA","QA Tech Lead"],button1:$(".stats__buttons button").first(),button2:$(".stats__buttons button").last(),width:"100%",maxWidth:1140,minWidth:1140,height:400,paddingY:20,pointRadius:3.5,yMax1:4e3,yStep1:500,yMax2:1600,eventName:"graphReady"},t.prototype.init=function(t,n){var r;return null==n&&(n={}),this.props=$.extend({},e,n),this.minY=this.props.paddingY,this.maxY=this.props.height+this.props.paddingY,this.paper=s(this.props.width,this.props.height+2*this.props.paddingY),this.container=t instanceof $?t:$(t),this.button1=this.props.button1 instanceof $?this.props.button1:$(this.props.button1),this.button2=this.props.button2 instanceof $?this.props.button2:$(this.props.button2),this.stateInitial={name:"initial"},this.state1={name:"state1"},this.state2={name:"state2"},this.currentState=this.stateInitial,this.active=!1,this.isReady=!1,this.inProgress=!1,null==(r=this.props).valuesInitial&&(r.valuesInitial=this.props.values1.map(function(){return 0})),this.paper.node.style.display="block",this.paper.node.style.marginTop=-this.props.paddingY,this.paper.node.style.marginBottom=-this.props.paddingY,this.paper.prependTo(this.container[0]),this._initEvents(),this._buildScene(),this.renderInitialState()},t.prototype.changeState=function(t,e,n){var r;return null==e&&(e=800),r=mina.easein,this.inProgress||t.name===this.currentState.name?void 0:(this.inProgress=!0,this.line.animate({path:t.linePath},e,r),this.fill.animate({path:t.fillPath},e,r,function(t){return function(){return t.inProgress=!1,"function"==typeof n?n():void 0}}(this)),this.currentState.axisYGroup.animate({opacity:0},e/2,r,function(){return t.axisYGroup.animate({opacity:1},e/2,r)}),null!=this.pointsGroups&&this.pointsGroups.forEach(function(n){return function(r,i){return n._changePointPosition(t,i,e)}}(this)),this.currentState=t)},t.prototype.activate=function(){return this.changeState(this.state1,null,this._drawPoints),this.active=!0},t.prototype.render=function(t){return null==t&&(t=!1),this._calculations(),this._drawGrid(),this._drawPaths(),t?(this._refreshState(),this._drawPoints(!1)):(setTimeout(function(t){return function(){return t.changeState(t.state1,null,t._drawPoints)}}(this),1e3),this.active=!0)},t.prototype.renderInitialState=function(){return this._calculations(),this._drawGrid(),this._drawPaths(this.stateInitial)},t.prototype.refresh=function(){return $(window).width()<=this.props.minWidth?void 0:(this.paper.clear(),this._calculations(),this.currentState.name===this.stateInitial.name?this.renderInitialState():(this._drawGrid(),this._drawPaths(this.currentState),this._showAxisY(),this._drawPoints(!1)))},t.prototype._refreshState=function(t){return null==t&&(t=this.currentState),this.line.attr({path:t.linePath}),this.fill.attr({path:t.fillPath}),this._showAxisY(t)},t.prototype._drawGrid=function(){var t,e,n,r,i,o,s,a,l,u,p,c,d,h,f,m,g;for(e=this.state1.axisYGroup=this.stateInitial.axisYGroup=this.paper.g(),n=this.state2.axisYGroup=this.paper.g(),o=this.gridGroup=this.paper.g(),u=this.paddingX,s=this.props.height,t={alignmentBaseline:"middle",fontSize:14,fill:"rgba(255, 255, 255, 0.3)","class":"graph-axis-label"},e.attr({"class":"graph-axis-y",opacity:0}),n.attr({"class":"graph-axis-y",opacity:0}),o.addClass("graph-grid").attr({stroke:"#F7F7F7",opacity:.1,strokeWidth:1}),d=function(){var t,e,n,r;for(r=[],a=t=0,e=this.props.yMax1,n=this.props.yStep1;n>0?e>=t:t>=e;a=t+=n)r.push(a);return r}.call(this),h=function(){var t,e,n,r;for(r=[],a=t=0,e=this.props.yMax2,n=this.props.yMax2/(d.length-1);n>0?e>=t:t>=e;a=t+=n)r.push(a);return r}.call(this),i=function(t,e){return o.line(t-27,e,0,e)},r=function(t,e){return o.line(t+73,e,"100%",e)},f=[],l=p=0,c=d.length;c>p;l=++p)m=d[l],g=this.minY+s-l*s/(d.length-1),e.text(u,g,"$"+m).attr(t),n.text(u,g,""+h[l]).attr(t),i(u,g),f.push(r(u,g));return f},t.prototype._drawPaths=function(t){var e;return null==t&&(t=this.stateInitial),this.graphGroup=this.paper.g(),e=this.paper.gradient("l(1, 1, 1, 1)#20d8a2-#21e0c7"),this.graphGroup.attr({"class":"graph-path"}),this.line=this.graphGroup.path(t.linePath).attr({stroke:"#20d8a2",strokeWidth:2,fill:"none","class":"graph-path-line"}),this.fill=this.graphGroup.path(t.fillPath).attr({fill:e,opacity:.2,"class":"graph-path-fill"})},t.prototype._drawPoints=function(t,e){var n;return null==t&&(t=!0),null==e&&(e=!1),n=t&&e?500:0,this.pointsGroups=[],this.currentState.points.forEach(function(e){return function(r,i,o){return setTimeout(function(){var n;return n=e._drawPoint(r.x,r.y,e.props.valueLabels[i],t),e.pointsGroups.push(n),i===o.length-1?($(window).trigger(e.props.eventName),e.isReady=!0):void 0},n*i)}}(this)),this.pointsGroups},t.prototype._drawPoint=function(t,e,n,r){var i,o,s,a,l;return null==r&&(r=!0),a=this.paper.circle(t,e,0).attr({"class":"graph-point",fill:"#20d8a2"}),o=this.paper.path("M"+t+" "+e+"L"+(t+35)+" "+(e-60)+"L"+(t+45)+" "+(e-60)).attr({"class":"graph-point-line",stroke:"rgba(255, 255, 255, 0.5)",strokeWidth:1,fill:"none"}),s=o.getTotalLength(),o.attr({strokeDashoffset:s,strokeDasharray:s}),i=this.paper.text(t,e,n).attr({"class":"graph-point-label",fontSize:14,opacity:0,fill:"#FFF",alignmentBaseline:"middle"}).transform("t53 -60"),r?(a.animate({r:this.props.pointRadius},2e3,mina.elastic),o.animate({strokeDashoffset:0},500,mina.linear,function(){return i.animate({opacity:1},1e3,mina.linear)})):(a.attr({r:this.props.pointRadius}),o.attr({strokeDashoffset:0}),i.attr({opacity:1})),l=this.paper.g(o,i,a),l.addClass("graph-point-group"),l},t.prototype._showAxisY=function(t){return null==t&&(t=this.currentState),t.axisYGroup.attr({opacity:1})},t.prototype._initEvents=function(){return $(window).on("resize",o(this.refresh,200).bind(this)),$(window).one(this.props.eventName,function(t){return function(){return t.button1.on("click",function(e){return e.preventDefault(),t.button2.removeClass("is-active"),t.button1.addClass("is-active"),t.changeState(t.state1)}),t.button2.on("click",function(e){return e.preventDefault(),t.button2.addClass("is-active"),t.button1.removeClass("is-active"),t.changeState(t.state2)})}}(this))},t.prototype._calculations=function(){var t,e,n,r;return r=this.container[0].clientWidth,e=this.props.maxWidth,n=Math.min(e,r),this.paddingX=r>e?(r-e)/2:0,this.divisionValueX=n/(this.props.values1.length+1),this.divisionValueY=this.props.height/this.props.yMax1,t=function(t){return function(e,n,r){return null==r&&(r=1),{x:t.paddingX+t.divisionValueX*(n+1),y:t.minY+t.props.height-e*r*t.divisionValueY}}}(this),this.stateInitial.yMultiplier=1,this.state1.yMultiplier=1,this.state2.yMultiplier=this.props.yMax1/this.props.yMax2,this.stateInitial.points=this.props.valuesInitial.map(function(e){return function(n,r){return t(n,r,e.stateInitial.yMultiplier)}}(this)),this.state1.points=this.props.values1.map(function(e){return function(n,r){return t(n,r,e.state1.yMultiplier)}}(this)),this.state2.points=this.props.values2.map(function(e){return function(n,r){return t(n,r,e.state2.yMultiplier)}}(this)),this.stateInitial.linePath=this._pointsToSVGPath(this.stateInitial.points,!1,"bottom"),this.state1.linePath=this._pointsToSVGPath(this.state1.points),this.state2.linePath=this._pointsToSVGPath(this.state2.points,!1,"bottom"),this.stateInitial.fillPath=this._pointsToSVGPath(this.stateInitial.points,!0,"bottom"),this.state1.fillPath=this._pointsToSVGPath(this.state1.points,!0),this.state2.fillPath=this._pointsToSVGPath(this.state2.points,!0,"bottom")},t.prototype._changePointPosition=function(t,e,n){var r,i;return null==n&&(n=1e3),r=t.points[e].y-this.currentState.points[e].y,i=this.pointsGroups[e],i.stop().animate({transform:"t0,"+r+"..."},n,mina.easein)},t.prototype._pointsToSVGPath=function(t,e,n){var r,i,o,s;for(null==n&&(n="top"),o="M0 "+this.maxY+" R",r=0,i=t.length;i>r;r++)s=t[r],o+=s.x+" "+s.y+" ";return"top"===n?o+=this.container[0].clientWidth+" "+this.minY+" ":"bottom"===n&&(o+=this.container[0].clientWidth+" "+this.maxY+" "),e&&(o+="V"+this.maxY+" Z"),o},t.prototype._buildScene=function(){return i.addScene({triggerHook:"onCenter",triggerElement:this.container[0]}).on("start",function(t){return function(e){return t.container.addClass("show-graph"),t.active?void 0:t.activate()}}(this))},t}(),e.exports=r},{"./scroll-controller":12,"lodash/function/debounce":23,snapsvg:"snapsvg"}],6:[function(t,e,n){var r,i,o=function(t,e){return function(){return t.apply(e,arguments)}};i=t("./scroll-controller"),r=function(){function t(){return this._menuButtonClickHandler=o(this._menuButtonClickHandler,this),this.fixed=!1,this.opened=!1,this}return t.prototype.init=function(t){return this.options=null!=t?t:{},this.el=$(".header"),this.hamburger=this.el.find(".hamburger"),this.logo=this.el.find(".logo"),this.buttonOne=this.el.find(".btn").first(),this.menu=this.el.find(".header__nav"),this._initEvents(),this._buildScene(),this},t.prototype.open=function(){return this.hamburger.addClass("is-active"),this.el.addClass("open-step-1"),setTimeout(function(t){return function(){return t.el.addClass("open-step-2")}}(this),100),setTimeout(function(t){return function(){return t._drawBordersInMenu()}}(this),600),this.opened=!0},t.prototype.close=function(){return this.hamburger.removeClass("is-active"),this.el.removeClass("open-step-2"),setTimeout(function(t){return function(){return t.el.removeClass("open-step-1"),t._removeBordersInMenu()}}(this),400),this.opened=!1},t.prototype.makeFixed=function(){return this.el.addClass("fixed"),this.el.removeClass("draw"),this._removeBordersInTopRow(),setTimeout(function(t){return function(){return t.el.addClass("animate")}}(this),0),setTimeout(function(t){return function(){return t._drawBordersInTopRow()}}(this),300),this.fixed=!0},t.prototype.makeStatic=function(){return this.el.removeClass("animate"),setTimeout(function(t){return function(){return t.el.removeClass("fixed"),t.el.addClass("draw"),t._removeBordersInTopRow()}}(this),300),this.fixed=!1},t.prototype.animateIn=function(){return this.el.addClass("animate"),setTimeout(function(t){return function(){return t._drawBordersInTopRow()}}(this),300)},t.prototype.animateOut=function(){return this.el.removeClass("animate"),setTimeout(function(t){return function(){return t._removeBordersInTopRow()}}(this),300)},t.prototype._initEvents=function(){return this.hamburger.on("click",this._menuButtonClickHandler)},t.prototype._menuButtonClickHandler=function(t){return this.opened?this.close():this.open()},t.prototype._drawBordersInTopRow=function(){return this.logo.addClass("draw"),this.buttonOne.addClass("draw")},t.prototype._removeBordersInTopRow=function(){return this.logo.removeClass("draw"),this.buttonOne.removeClass("draw")},t.prototype._drawBordersInMenu=function(){return this.menu.addClass("draw")},t.prototype._removeBordersInMenu=function(){return this.menu.removeClass("draw")},t.prototype._buildScene=function(){return this.scrollScene=i.addScene({offset:this.options.offset||0,duration:"100%",triggerElement:"body",triggerHook:"onLeave"}).on("end",function(t){return function(e){return"FORWARD"===e.scrollDirection?t.makeFixed():"REVERSE"===e.scrollDirection?(t.opened&&t.close(),t.makeStatic()):void 0}}(this))},t}(),e.exports=new r},{"./scroll-controller":12}],7:[function(t,e,n){function r(t,e){for(var n=[],r=new google.maps.MarkerImage("img/svg/map-marker.svg",null,null,null,new google.maps.Size(40,58)),i=0;i<e.length;i++){var o=e[i],s=new google.maps.LatLng(o[0],o[1]),a=new google.maps.Marker({position:s,map:t,icon:r,title:o[3].head,zIndex:o[2]});a.infoContent=o[3],n.push(a)}return n}function i(t,e){for(var n=0;n<t.length;n++)google.maps.event.addListener(t[n],"click",function(){var t=o(this.infoContent);e.setContent(t),e.open(a,this)})}function o(t){return'<ul class="marker-info"><li class="marker-info__head">'+t.head+'</li><li class="marker-info__address">'+t.address+'</li><li class="marker-info__tel">'+t.tel+"</li></ul>"}function s(){var t=document.createElement("script");t.type="text/javascript",t.src="https://maps.googleapis.com/maps/api/js?v=3&signed_in=false&callback=initMapInContactsArea",document.body.appendChild(t)}var a,l,u;u=[{featureType:"all",elementType:"labels.text.fill",stylers:[{saturation:36},{color:"#000000"},{lightness:40}]},{featureType:"all",elementType:"labels.text.stroke",stylers:[{visibility:"on"},{color:"#000000"},{lightness:16}]},{featureType:"all",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"administrative",elementType:"geometry.fill",stylers:[{color:"#000000"},{lightness:20}]},{featureType:"administrative",elementType:"geometry.stroke",stylers:[{color:"#000000"},{lightness:17},{weight:1.2}]},{featureType:"landscape",elementType:"geometry",stylers:[{color:"#000000"},{lightness:20}]},{featureType:"poi",elementType:"geometry",stylers:[{color:"#000000"},{lightness:21}]},{featureType:"road.highway",elementType:"geometry.fill",stylers:[{color:"#000000"},{lightness:17}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{color:"#000000"},{lightness:29},{weight:.2}]},{featureType:"road.arterial",elementType:"geometry",stylers:[{color:"#000000"},{lightness:18}]},{featureType:"road.local",elementType:"geometry",stylers:[{color:"#000000"},{lightness:16}]},{featureType:"transit",elementType:"geometry",stylers:[{color:"#000000"},{lightness:19}]},{featureType:"transit.station.rail",elementType:"all",stylers:[{lightness:"19"},{gamma:"1.00"},{hue:"#00ffc5"},{saturation:"0"}]},{featureType:"transit.station.rail",elementType:"geometry",stylers:[{visibility:"off"},{weight:"0.01"},{color:"#65e7b6"}]},{featureType:"transit.station.rail",elementType:"geometry.fill",stylers:[{visibility:"on"}]},{featureType:"transit.station.rail",elementType:"geometry.stroke",stylers:[{visibility:"off"},{saturation:"-5"}]},{featureType:"transit.station.rail",elementType:"labels",stylers:[{visibility:"on"}]},{featureType:"transit.station.rail",elementType:"labels.text.stroke",stylers:[{visibility:"off"}]},{featureType:"water",elementType:"geometry",stylers:[{color:"#000000"},{lightness:17}]}],l=[[50.453,30.44596,1,{head:"Учебный центр «QAStartUP»",address:"Адрес: Вадима Гетьмана, 1-Б",tel:"Телефон: (096) 255-45-49, (093) 615-30-90"}]],window.initMapInContactsArea=function(){var t={zoom:16,disableDefaultUI:!0,scrollwheel:!1,center:new google.maps.LatLng(50.45487,30.435763),styles:u};a=new google.maps.Map(document.getElementById("map"),t);var e=r(a,l),n=new google.maps.InfoWindow;i(e,n)},e.exports=s},{}],8:[function(t,e,n){var r;r=function(t,e){var n,r,i,o,s,a;return null==e&&(e={}),a=t instanceof $?t:$(t),s=a.find(".modal__close"),o=e.beforeOpen,r=e.afterOpen,i=e.beforeClose,n=e.afterClose,"function"==typeof o&&o(),a.fadeIn(500,function(){return a.addClass("is-open"),setTimeout(function(){return a.addClass("draw"),"function"==typeof r&&r(),$(window).trigger("modalOpen",[a])},500)}),s.one("click",function(t){return t.preventDefault(),"function"==typeof i&&i(),a.removeClass("is-open draw").delay(500).fadeOut(500,function(){return"function"==typeof n&&n(),$(window).trigger("modalClose",[a])})})},e.exports=r},{}],9:[function(t,e,n){var r,i=function(t,e){return function(){return t.apply(e,arguments)}};r=function(){function t(t,e){null==e&&(e={}),this._render=i(this._render,this),this.init(t,e)}return t.prototype.init=function(t,e){return this.el=$(t),this.dataString=null!=this.el.data("number")?this.el.data("number").split(",",3):[0,100,1e3],this.initValue=null!=e.initValue?e.initValue:parseInt(this.dataString[0]),this.targetValue=null!=e.targetValue?e.targetValue:parseInt(this.dataString[1]),this.duration=null!=e.duration?e.duration:parseInt(this.dataString[2]),this.animated=!1,this.reset()},t.prototype.start=function(){return this.animated=!0,$({value:this.initValue}).animate({value:this.targetValue},{duration:this.duration,easing:"easeOutQuart",step:function(t){return function(e){return t._render(e)}}(this)})},t.prototype.reset=function(){return this._render(this.initValue)},t.prototype._commaSeparateNumber=function(t){for(;/(\d+)(\d{3})/.test(t.toString());)t=t.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1,");return t},t.prototype._render=function(t){return this.el.text(Math.round(t))},t}(),e.exports=r},{}],10:[function(t,e,n){var r;r=function(){function t(t,e){return this.init(t,e),this}var e;return e={delta:-100,shift:0},t.prototype.init=function(t,n){var r;return null==n&&(n={}),this.el=t instanceof jQuery?t:$(t),r=this.htmlData(),this.props=$.extend({},e,r,n),this.props.shift?this.el.css({top:this.props.shift+"px"}):void 0},t.prototype.htmlData=function(){var t,e;return e={},t=this.el.data("parallax"),$.isNumeric(t)?e.delta=t:"object"==typeof t&&(e=t),e},t.prototype.move=function(t){var e;return e=Math.round(this.props.delta*t),this.el.css({transform:"translate3d(0, "+e+"px, 0)"})},t}(),e.exports=r},{}],11:[function(t,e,n){var r,i,o,s=function(t,e){return function(){return t.apply(e,arguments)}};o=t("./modal"),r="YTAPIReady",e.exports.initPlayerApi=function(){var t,e;return e=document.createElement("script"),e.src="https://www.youtube.com/iframe_api",t=document.getElementsByTagName("script")[0],t.parentNode.insertBefore(e,t),window.onYouTubeIframeAPIReady=function(){return $(window).trigger(r)}},e.exports.ModalPlayer=i=function(){function t(t,e,n){return null==n&&(n={}),this.pauseVideo=s(this.pauseVideo,this),this.playVideo=s(this.playVideo,this),this.init(t,e,n),this}return t.prototype.init=function(t,e,n){return this.videoContainer=t instanceof $?t:$(t),this.triggerElement=e instanceof $?e:$(e),this.modal=this.videoContainer.parents(".modal"),this.videoId=n.videoId||this.videoContainer.attr("data-video-id")||"xEhaVhta7sI",this.player=null,this._initEvents()},t.prototype.playVideo=function(){return this.player?this.player.playVideo():void 0},t.prototype.pauseVideo=function(){return this.player?this.player.pauseVideo():void 0},t.prototype._buildPlayer=function(){return this.player=new YT.Player(this.videoContainer[0],{height:"100%",width:"100%",videoId:this.videoId})},t.prototype._initEvents=function(){return $(window).on(r,function(t){return function(){return t._buildPlayer()}}(this)),this.triggerElement.on("click",function(t){return function(e){return e.preventDefault(),o(t.modal,{afterOpen:t.playVideo,beforeClose:t.pauseVideo})}}(this))},t}()},{"./modal":8}],12:[function(t,e,n){var r,i;i=t("scrollmagic"),r=new i.Controller({container:"body",loglevel:2}),e.exports={addScene:function(t){var e;return e=new i.Scene(t),r.addScene(e),e}}},{scrollmagic:"scrollmagic"}],13:[function(t,e,n){var r,i,o;r=t("./scroll-controller"),o=t("./zoom-out"),i=function(){function t(t,e){return this.init(t,e),this}var e;return e={wrapper:"slider-box-wrapper",slider:".slider",sliderTrack:".slider__track",backgroundLayer:".slider-box__bg",zoomOutTrigger:!1},t.prototype.init=function(t,n){return null==n&&(n={}),this.el=t instanceof $?t:$(t),this.props=$.extend({},e,n),this.wrapper=this.el.parent(),this.slider=this.el.find(this.props.slider),this.sliderTrack=this.el.find(this.props.sliderTrack),this.duration=null,this._initSlider(),this.props.zoomOutTrigger?this.initZoomOutScene():this.initSimpleScene()},t.prototype.scrollSlider=function(t){return this.sliderTrack.css({x:-this.duration*t})},t.prototype.makeFixed=function(){return this.el.css({position:"fixed",top:0,left:0,right:0}),this.wrapper.css({height:this.el.outerHeight(),boxSizing:"content-box",paddingBottom:this.duration})},t.prototype.makeStatic=function(){return this.el.css({position:"",top:"",left:"",right:""}),this.wrapper.css({height:"",boxSizing:"",paddingBottom:""})},t.prototype.initSimpleScene=function(){return r.addScene({duration:this.duration,triggerHook:"onLeave",triggerElement:this.wrapper[0]}).on("progress",function(t){return function(e){return t.scrollSlider(e.progress)}}(this)).setPin(this.el[0])},t.prototype.initZoomOutScene=function(){var t;return t=new o(this.el.find(this.props.backgroundLayer)),r.addScene({duration:this.duration,triggerHook:"onLeave",triggerElement:this.wrapper[0]}).on("start",function(t){return function(e){return"FORWARD"===e.scrollDirection&&t.makeFixed(),"REVERSE"===e.scrollDirection?t.makeStatic():void 0}}(this)).on("progress",function(t){return function(e){return t.scrollSlider(e.progress)}}(this)),r.addScene({duration:"100%",triggerHook:"onEnter",triggerElement:this.props.zoomOutTrigger}).on("progress",function(e){return t.zoomOut(e.progress)}).on("end",function(t){return function(e){return t.el.toggle()}}(this))},t.prototype._initSlider=function(){var t,e,n;return t=this.slider.outerHeight(),this.slider.css({height:t}),this.sliderTrack.css({position:"absolute",top:0,left:0}),e=this.slider.outerWidth(),n=this.sliderTrack.outerWidth(),this.duration=n-e},t}(),e.exports=i},{"./scroll-controller":12,"./zoom-out":15}],14:[function(t,e,n){e.exports=function(){var t,e,n,r,i,o;return t=$(".testimonials"),n=t.find(".testimonials__more"),e=t.find(".testimonials__buttons .link"),r=t.find(".testimonial .link"),e.on("click",function(e){return e.preventDefault(),n.slideDown(300),setTimeout(function(){return t.addClass("is-show-more")},500)}),r.on("click",function(t){return t.preventDefault(),o(this)}),i=function(t){var e,n;return n=t.text(),e=t.data("alt-text"),t.text(e),t.data("alt-text",n)},o=function(t){var e,n,r,o;return n=$(t).parents(".testimonial"),r=n.find(".testimonial__text"),e=n.hasClass("is-expanded")?!0:!1,o=r[0].scrollHeight,e?r.animate({height:120},500,function(){return r.css({height:""}),i($(t))}):r.animate({height:o},500,function(){return i($(t))}),n.toggleClass("is-expanded")}}},{}],15:[function(t,e,n){var r;r=function(){function t(t,e){return this.init(t,e),this}var e;return e={minScale:.6,minOpacity:.3},t.prototype.init=function(t,n){return null==n&&(n={}),this.props=$.extend(e,n),this.el=t instanceof jQuery?t:$(t),this.scaleDelta=1-this.props.minScale,this.opacityDelta=1-this.props.minOpacity},t.prototype.zoomOut=function(t){var e;return e=1-this.scaleDelta*t,this.el.css({transform:"scale3d("+e+", "+e+", 1)",opacity:1-this.opacityDelta*t})},t}(),e.exports=r},{}],16:[function(t,e,n){e.exports=function(t){var e;return e=function(){function e(e,n){this.el=e instanceof t?e:t(e),this.init(n)}return e.prototype.init=function(t){return this.items=this.el.find(t.itemSelector),this.buttons=this.el.find(t.buttonSelector),this.contents=this.el.find(t.contentSelector),this.speed=null!=t.speed?t.speed:300,this.openedItemIndex=null,this.initEvents()},e.prototype.initEvents=function(){return this.buttons.each(function(e){return function(n,r){return t(r).on("click",function(){return e.toggleItem(n)})}}(this))},e.prototype.toggleItem=function(t){return t===this.openedItemIndex?(this.closeItem(t),this.openedItemIndex=null):null!==this.openedItemIndex?(this.closeItem(this.openedItemIndex),this.openItem(t),this.openedItemIndex=t):(this.openItem(t),this.openedItemIndex=t)},e.prototype.openItem=function(e){return t(this.items[e]).addClass("is-open"),t(this.contents[e]).slideDown(this.speed,function(t){return function(){return t.scrollToActiveItem()}}(this))},e.prototype.closeItem=function(e){return t(this.items[e]).removeClass("is-open"),t(this.contents[e]).slideUp(this.speed)},e.prototype.scrollToActiveItem=function(){return t("html, body").animate({scrollTop:t(this.items[this.openedItemIndex]).offset().top-90},500)},e}(),t.fn.accordion=function(t){return this.each(function(n,r){return new e(r,t)}),this}}},{}],17:[function(t,e,n){var r;r=function(){function t(t,n){return null==n&&(n={}),this.props=$.extend({},e,n),this.triggers=t,this.container=$(this.props.container).addClass(this.props.containerClass),this._init(),this}var e;return e={containerClass:"hover-galery-container",imageClass:"hover-gallery-image",triggerClass:"hover-gallery-trigger",visibleClass:"visible",srcAttr:"data-image-src"},t.prototype._init=function(){return this.images=$([]),this.triggers.each(function(t){return function(e,n){var r,i,o;return n=$(n),o=null,i=n.attr(t.props.srcAttr),r=$("<div/>",{"class":t.props.imageClass,css:{backgroundImage:"url("+i+")"}}),t.images.push(r[0]),r.appendTo(t.container),n.addClass(t.props.triggerClass).on("mouseenter",function(e){return o=setTimeout(function(){return r.addClass(t.props.visibleClass)},300)}).on("mouseleave",function(e){return clearTimeout(o),r.removeClass(t.props.visibleClass)})}}(this))},t}(),e.exports=function(t){return t.fn.hoverGallery=function(t){return new r(this,t),this}}},{}],18:[function(t,e,n){e.exports=function(t){var e;return e=function(){function e(t,e){return null==e&&(e={}),this.init(t,e),this}var n;return n={dirtyClass:"is-filled"},e.prototype.init=function(e,r){
return this.props=t.extend({},n,r),this.input=e instanceof t?e:t(e),this.field=this.input.parent(),this.label=this.input.siblings("label"),this._initEvents()},e.prototype.checkDirty=function(){var t;return t=this.input.val(),t?this.field.addClass(this.props.dirtyClass):this.field.removeClass(this.props.dirtyClass)},e.prototype._initEvents=function(){return this.input.on("blur",function(t){return function(){return t.checkDirty()}}(this))},e}(),t.fn.inputField=function(t){return this.each(function(n,r){return new e(r,t)})}}},{}],19:[function(t,e,n){var r,i,o;o=t("../modules/scroll-controller"),i=t("../modules/parallax"),r=t("../modules/number"),e.exports=function(){var t,e,n;return e=$(window),n=e.height(),$("[data-parallax]").each(function(t,e){var r,s;return r=$(e),s=new i(r),o.addScene({duration:n+r.height(),triggerHook:"onEnter",triggerElement:e}).on("progress",function(t){return s.move(t.progress)})}),$(".fade-in").each(function(t,e){return o.addScene({offset:"20%",triggerHook:"onEnter",triggerElement:e}).on("start",function(){return $(e).toggleClass("animate")})}),t=$(".footer"),o.addScene({duration:200,triggerHook:"onEnter",triggerElement:"#sm-trigger-footer"}).on("start",function(e){return t.toggleClass("is-fixed")}).on("end",function(e){return t.toggleClass("draw")}),$(".js-draw").each(function(t,e){return o.addScene({offset:$(e).data("sm-offset")||200,triggerHook:$(e).data("sm-trigger-hook")||"onEnter",triggerElement:e}).setClassToggle(e,"draw")}),$("[data-number]").each(function(t,e){var n;return n=new r($(e)),o.addScene({offset:150,triggerHook:"onEnter",triggerElement:e}).on("start",function(t){return n.animated?void 0:n.start()})})}},{"../modules/number":9,"../modules/parallax":10,"../modules/scroll-controller":12}],20:[function(t,e,n){var r,i,o;i=t("../modules/scroll-controller"),r=t("../modules/number"),o=t("../modules/zoom-out"),e.exports=function(){var t;return t=new o(".toparea__video",{minScale:.2,minOpacity:0}),i.addScene({duration:"100%",triggerHook:"onLeave",triggerElement:"body"}).on("progress",function(e){return t.zoomOut(e.progress)}).on("end",function(t){return $(".toparea").toggle()}),i.addScene({duration:"50%",triggerHook:"onLeave",triggerElement:".course-header"}).setPin(".course-header__pinned-area",{pushFollowers:!1}).on("end",function(t){return $(".course-header").toggleClass("is-unpinned")})}},{"../modules/number":9,"../modules/scroll-controller":12,"../modules/zoom-out":15}],21:[function(t,e,n){var r,i,o;i=t("../modules/scroll-controller"),o=t("../modules/zoom-out"),r=t("../modules/number"),e.exports=function(){var t,e,n,s;return s=new o(".toparea__video"),i.addScene({duration:"100%",triggerHook:"onLeave",triggerElement:"body"}).on("progress",function(t){return s.zoomOut(t.progress)}).on("end",function(t){return $(".toparea").toggle()}),t=$(".courses__container"),n=new r(t.find(".course-note__value > span"),{initValue:0,targetValue:87,duration:2e3}),i.addScene({offset:250,duration:330,triggerHook:"onEnter",triggerElement:t[0]}).on("start",function(e){return t.find(".course__head, .course__body").toggleClass("draw"),"FORWARD"===e.scrollDirection?setTimeout(function(){return n.start()},600):void 0}).on("end",function(e){return t.find(".course__footer").toggleClass("draw")}),e=$(".nomination .banner-title"),i.addScene({offset:200,triggerHook:"onEnter",triggerElement:e[0]}).on("start",function(t){return e.toggleClass("draw")}),i.addScene({triggerHook:"onCenter",triggerElement:".callback__frontlayer"}).setClassToggle(".callback__frontlayer","draw"),i.addScene({triggerHook:"onCenter",triggerElement:".reasons__list"}).setClassToggle(".reasons__list","draw")}},{"../modules/number":9,"../modules/scroll-controller":12,"../modules/zoom-out":15}],22:[function(t,e,n){var r=t("../internal/getNative"),i=r(Date,"now"),o=i||function(){return(new Date).getTime()};e.exports=o},{"../internal/getNative":24}],23:[function(t,e,n){function r(t,e,n){function r(){y&&clearTimeout(y),h&&clearTimeout(h),w=0,h=y=v=void 0}function l(e,n){n&&clearTimeout(n),h=y=v=void 0,e&&(w=o(),f=t.apply(g,d),y||h||(d=g=void 0))}function u(){var t=e-(o()-m);0>=t||t>e?l(v,h):y=setTimeout(u,t)}function p(){l(b,y)}function c(){if(d=arguments,m=o(),g=this,v=b&&(y||!x),_===!1)var n=x&&!y;else{h||x||(w=m);var r=_-(m-w),i=0>=r||r>_;i?(h&&(h=clearTimeout(h)),w=m,f=t.apply(g,d)):h||(h=setTimeout(p,r))}return i&&y?y=clearTimeout(y):y||e===_||(y=setTimeout(u,e)),n&&(i=!0,f=t.apply(g,d)),!i||y||h||(d=g=void 0),f}var d,h,f,m,g,y,v,w=0,_=!1,b=!0;if("function"!=typeof t)throw new TypeError(s);if(e=0>e?0:+e||0,n===!0){var x=!0;b=!1}else i(n)&&(x=!!n.leading,_="maxWait"in n&&a(+n.maxWait||0,e),b="trailing"in n?!!n.trailing:b);return c.cancel=r,c}var i=t("../lang/isObject"),o=t("../date/now"),s="Expected a function",a=Math.max;e.exports=r},{"../date/now":22,"../lang/isObject":28}],24:[function(t,e,n){function r(t,e){var n=null==t?void 0:t[e];return i(n)?n:void 0}var i=t("../lang/isNative");e.exports=r},{"../lang/isNative":27}],25:[function(t,e,n){function r(t){return!!t&&"object"==typeof t}e.exports=r},{}],26:[function(t,e,n){function r(t){return i(t)&&a.call(t)==o}var i=t("./isObject"),o="[object Function]",s=Object.prototype,a=s.toString;e.exports=r},{"./isObject":28}],27:[function(t,e,n){function r(t){return null==t?!1:i(t)?p.test(l.call(t)):o(t)&&s.test(t)}var i=t("./isFunction"),o=t("../internal/isObjectLike"),s=/^\[object .+?Constructor\]$/,a=Object.prototype,l=Function.prototype.toString,u=a.hasOwnProperty,p=RegExp("^"+l.call(u).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");e.exports=r},{"../internal/isObjectLike":25,"./isFunction":26}],28:[function(t,e,n){function r(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}e.exports=r},{}]},{},[1]);
//# sourceMappingURL=app.js.map