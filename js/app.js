!function t(e,n,i){function r(s,a){if(!n[s]){if(!e[s]){var u="function"==typeof require&&require;if(!a&&u)return u(s,!0);if(o)return o(s,!0);var l=new Error("Cannot find module '"+s+"'");throw l.code="MODULE_NOT_FOUND",l}var c=n[s]={exports:{}};e[s][0].call(c.exports,function(t){var n=e[s][1][t];return r(n?n:t)},c,c.exports,t,e,n,i)}return n[s].exports}for(var o="function"==typeof require&&require,s=0;s<i.length;s++)r(i[s]);return r}({1:[function(t,e,n){var i,r,o,s,a,u,l;i=t("jquery"),t("jquery.transit"),s=t("./modules/header"),l=t("./modules/question-form"),a=t("./modules/scroll-scenes"),u=t("./modules/testimonials"),r=t("./modules/graph"),o=t("./modules/slider-box"),t("./plugins/input-field")(i),t("./plugins/accordion")(i),t("./plugins/draw-button"),i(function(){var t,e,n;return s.init(),l.init(),u(),a(),i(".faq__list").accordion({itemSelector:".faq-item",buttonSelector:".faq-item__button",contentSelector:".faq-item__answer"}),t=new o(".advantages .slider-box",{zoomOutTrigger:".content-layer-1"}),n=new o(".news .slider-box"),e=new r(".stats__graph",{valuesIncome:[500,1500,2350,3200],valuesDemand:[800,3e3,2e3,200],valueLabels:["Junior QA","Middle QA","Senior QA","QA Tech Lead"]})})},{"./modules/graph":3,"./modules/header":4,"./modules/question-form":6,"./modules/scroll-scenes":8,"./modules/slider-box":9,"./modules/testimonials":10,"./plugins/accordion":12,"./plugins/draw-button":13,"./plugins/input-field":14,jquery:"jquery","jquery.transit":"jquery.transit"}],2:[function(t,e,n){!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e("object"==typeof n?t("jquery"):jQuery)}(function(t){var e,n=navigator.userAgent,i=/iphone/i.test(n),r=/chrome/i.test(n),o=/android/i.test(n);t.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},autoclear:!0,dataName:"rawMaskFn",placeholder:"_"},t.fn.extend({caret:function(t,e){var n;return 0===this.length||this.is(":hidden")?void 0:"number"==typeof t?(e="number"==typeof e?e:t,this.each(function(){this.setSelectionRange?this.setSelectionRange(t,e):this.createTextRange&&(n=this.createTextRange(),n.collapse(!0),n.moveEnd("character",e),n.moveStart("character",t),n.select())})):(this[0].setSelectionRange?(t=this[0].selectionStart,e=this[0].selectionEnd):document.selection&&document.selection.createRange&&(n=document.selection.createRange(),t=0-n.duplicate().moveStart("character",-1e5),e=t+n.text.length),{begin:t,end:e})},unmask:function(){return this.trigger("unmask")},mask:function(n,s){var a,u,l,c,p,h,d,f;if(!n&&this.length>0){a=t(this[0]);var m=a.data(t.mask.dataName);return m?m():void 0}return s=t.extend({autoclear:t.mask.autoclear,placeholder:t.mask.placeholder,completed:null},s),u=t.mask.definitions,l=[],c=d=n.length,p=null,t.each(n.split(""),function(t,e){"?"==e?(d--,c=t):u[e]?(l.push(new RegExp(u[e])),null===p&&(p=l.length-1),c>t&&(h=l.length-1)):l.push(null)}),this.trigger("unmask").each(function(){function a(){if(s.completed){for(var t=p;h>=t;t++)if(l[t]&&j[t]===m(t))return;s.completed.call(T)}}function m(t){return s.placeholder.charAt(t<s.placeholder.length?t:0)}function g(t){for(;++t<d&&!l[t];);return t}function v(t){for(;--t>=0&&!l[t];);return t}function y(t,e){var n,i;if(!(0>t)){for(n=t,i=g(e);d>n;n++)if(l[n]){if(!(d>i&&l[n].test(j[i])))break;j[n]=j[i],j[i]=m(i),i=g(i)}C(),T.caret(Math.max(p,t))}}function b(t){var e,n,i,r;for(e=t,n=m(t);d>e;e++)if(l[e]){if(i=g(e),r=j[e],j[e]=n,!(d>i&&l[i].test(r)))break;n=r}}function x(){var t=T.val(),e=T.caret();if(f&&f.length&&f.length>t.length){for(I(!0);e.begin>0&&!l[e.begin-1];)e.begin--;if(0===e.begin)for(;e.begin<p&&!l[e.begin];)e.begin++;T.caret(e.begin,e.begin)}else{for(I(!0);e.begin<d&&!l[e.begin];)e.begin++;T.caret(e.begin,e.begin)}a()}function _(){I(),T.val()!=q&&T.change()}function k(t){if(!T.prop("readonly")){var e,n,r,o=t.which||t.keyCode;f=T.val(),8===o||46===o||i&&127===o?(e=T.caret(),n=e.begin,r=e.end,r-n===0&&(n=46!==o?v(n):r=g(n-1),r=46===o?g(r):r),S(n,r),y(n,r-1),t.preventDefault()):13===o?_.call(this,t):27===o&&(T.val(q),T.caret(0,I()),t.preventDefault())}}function w(e){if(!T.prop("readonly")){var n,i,r,s=e.which||e.keyCode,u=T.caret();if(!(e.ctrlKey||e.altKey||e.metaKey||32>s)&&s&&13!==s){if(u.end-u.begin!==0&&(S(u.begin,u.end),y(u.begin,u.end-1)),n=g(u.begin-1),d>n&&(i=String.fromCharCode(s),l[n].test(i))){if(b(n),j[n]=i,C(),r=g(n),o){var c=function(){t.proxy(t.fn.caret,T,r)()};setTimeout(c,0)}else T.caret(r);u.begin<=h&&a()}e.preventDefault()}}}function S(t,e){var n;for(n=t;e>n&&d>n;n++)l[n]&&(j[n]=m(n))}function C(){T.val(j.join(""))}function I(t){var e,n,i,r=T.val(),o=-1;for(e=0,i=0;d>e;e++)if(l[e]){for(j[e]=m(e);i++<r.length;)if(n=r.charAt(i-1),l[e].test(n)){j[e]=n,o=e;break}if(i>r.length){S(e+1,d);break}}else j[e]===r.charAt(i)&&i++,c>e&&(o=e);return t?C():c>o+1?s.autoclear||j.join("")===D?(T.val()&&T.val(""),S(0,d)):C():(C(),T.val(T.val().substring(0,o+1))),c?e:p}var T=t(this),j=t.map(n.split(""),function(t,e){return"?"!=t?u[t]?m(e):t:void 0}),D=j.join(""),q=T.val();T.data(t.mask.dataName,function(){return t.map(j,function(t,e){return l[e]&&t!=m(e)?t:null}).join("")}),T.one("unmask",function(){T.off(".mask").removeData(t.mask.dataName)}).on("focus.mask",function(){if(!T.prop("readonly")){clearTimeout(e);var t;q=T.val(),t=I(),e=setTimeout(function(){T.get(0)===document.activeElement&&(C(),t==n.replace("?","").length?T.caret(0,t):T.caret(t))},10)}}).on("blur.mask",_).on("keydown.mask",k).on("keypress.mask",w).on("input.mask paste.mask",function(){T.prop("readonly")||setTimeout(function(){var t=I(!0);T.caret(t),a()},0)}),r&&o&&T.off("input.mask").on("input.mask",x),I()})}})})},{jquery:"jquery"}],3:[function(t,e,n){var i,r,o,s,a,u=function(t,e){return function(){return t.apply(e,arguments)}};i=t("jquery"),a=t("snapsvg"),o=t("./scroll-controller"),s=t("lodash/function/debounce"),r=function(){function t(t,e){this._drawPoints=u(this._drawPoints,this),this.refresh=u(this.refresh,this),this.init(t,e)}var e;return e={valuesIncome:[500,1500,2350,3200],valuesDemand:[1e3,2650,2e3,500],valuesInitial:null,valueLabels:["Junior QA","Middle QA","Senior QA","QA Tech Lead"],buttonIncome:i(".stats__buttons button").first(),buttonDemand:i(".stats__buttons button").last(),width:"100%",maxWidth:1140,minWidth:1140,height:400,paddingY:20,pointRadius:3.5,yStart:0,yMax:4e3,yStep:500,eventName:"graphReady"},t.prototype.init=function(t,n){var r;return null==n&&(n={}),this.props=i.extend({},e,n),this.minY=this.props.paddingY,this.maxY=this.props.height+this.props.paddingY,this.paper=a(this.props.width,this.props.height+2*this.props.paddingY),this.container=t instanceof i?t:i(t),this.buttonIncome=this.props.buttonIncome instanceof i?this.props.buttonIncome:i(this.props.buttonIncome),this.buttonDemand=this.props.buttonDemand instanceof i?this.props.buttonDemand:i(this.props.buttonDemand),this.stateInitial={name:"initial"},this.stateIncome={name:"income"},this.stateDemand={name:"demand"},this.currentState=this.stateInitial,this.active=!1,this.isReady=!1,this.inProgress=!1,null==(r=this.props).valuesInitial&&(r.valuesInitial=this.props.valuesIncome.map(function(){return 0})),this.paper.node.style.display="block",this.paper.node.style.marginTop=-this.props.paddingY,this.paper.node.style.marginBottom=-this.props.paddingY,this.paper.prependTo(this.container[0]),this._initEvents(),this._buildScene()},t.prototype.changeState=function(t,e,n){return null==e&&(e=1e3),this.inProgress?void 0:(this.inProgress=!0,this.line.animate({path:t.linePath},e,mina.easein),this.fill.animate({path:t.fillPath},e,mina.easein,function(e){return function(){return e.inProgress=!1,e.currentState=t,"function"==typeof n?n():void 0}}(this)),null!=this.pointsGroups?this.pointsGroups.forEach(function(n){return function(i,r){return n._changePointPosition(t,r,e)}}(this)):void 0)},t.prototype.render=function(t){return null==t&&(t=!1),this._calculations(),this._drawGrid(),this._drawPaths(),t?(this._renderState(),this._drawPoints(!1)):setTimeout(function(t){return function(){return t.changeState(t.stateIncome,1e3,t._drawPoints)}}(this),1e3),this.active=!0},t.prototype.refresh=function(){return i(window).width()<=this.props.minWidth?void 0:(this.paper.clear(),this.render(!0))},t.prototype._drawGrid=function(){var t,e,n,i,r,o,s,a,u,l,c,p,h,d;for(t=this.axisYGroup=this.paper.g(),i=this.gridGroup=this.paper.g(),a=this.paddingX,r=this.props.height,t.attr({"class":"graph-axis-y"}),i.addClass("graph-grid").attr({stroke:"#F7F7F7",opacity:.1,strokeWidth:1}),c=function(){var t,e,n,i,r;for(r=[],o=t=e=this.props.yStart,n=this.props.yMax,i=this.props.yStep;i>0?n>=t:t>=n;o=t+=i)r.push(o);return r}.call(this),n=function(t,e){return i.line(t-27,e,0,e)},e=function(t,e){return i.line(t+73,e,"100%",e)},p=[],s=u=0,l=c.length;l>u;s=++u)h=c[s],d=this.minY+r-s*r/(c.length-1),t.text(a,d,"$"+h).attr({alignmentBaseline:"middle",fontSize:14,fill:"rgba(255, 255, 255, 0.3)","class":"graph-axis-label"}),n(a,d),p.push(e(a,d));return p},t.prototype._drawPaths=function(t){var e;return null==t&&(t=this.stateInitial),this.graphGroup=this.paper.g(),e=this.paper.gradient("l(1, 1, 1, 1)#20d8a2-#21e0c7"),this.graphGroup.attr({"class":"graph-path"}),this.line=this.graphGroup.path(t.linePath).attr({stroke:"#20d8a2",strokeWidth:2,fill:"none","class":"graph-path-line"}),this.fill=this.graphGroup.path(t.fillPath).attr({fill:e,opacity:.2,"class":"graph-path-fill"})},t.prototype._drawPoints=function(t){var e;return null==t&&(t=!0),e=t===!0?500:0,this.pointsGroups=[],this.currentState.points.forEach(function(n){return function(r,o,s){return setTimeout(function(){var e;return e=n._drawPoint(r.x,r.y,n.props.valueLabels[o],t),n.pointsGroups.push(e),o===s.length-1?i(window).trigger(n.props.eventName):void 0},e*o)}}(this)),this.pointsGroups},t.prototype._drawPoint=function(t,e,n,i){var r,o,s,a,u;return null==i&&(i=!0),a=this.paper.circle(t,e,0).attr({"class":"graph-point",fill:"#20d8a2"}),o=this.paper.path("M"+t+" "+e+"L"+(t+35)+" "+(e-60)+"L"+(t+45)+" "+(e-60)).attr({"class":"graph-point-line",stroke:"rgba(255, 255, 255, 0.5)",strokeWidth:1,fill:"none"}),s=o.getTotalLength(),o.attr({strokeDashoffset:s,strokeDasharray:s}),r=this.paper.text(t,e,n).attr({"class":"graph-point-label",fontSize:14,opacity:0,fill:"#FFF",alignmentBaseline:"middle"}).transform("t53 -60"),i?(a.animate({r:this.props.pointRadius},2e3,mina.elastic),o.animate({strokeDashoffset:0},500,mina.linear,function(){return r.animate({opacity:1},1e3,mina.linear)})):(a.attr({r:this.props.pointRadius}),o.attr({strokeDashoffset:0}),r.attr({opacity:1})),u=this.paper.g(o,r,a),u.addClass("graph-point-group"),u},t.prototype._renderState=function(t){return null==t&&(t=this.currentState),this.line.attr({path:t.linePath}),this.fill.attr({path:t.fillPath})},t.prototype._initEvents=function(){return i(window).one(this.props.eventName,function(t){return function(){return t.isReady=!0,i(window).on("resize",s(t.refresh,200).bind(t)),t.buttonIncome.on("click",function(e){return e.preventDefault(),t.buttonDemand.removeClass("is-active"),t.buttonIncome.addClass("is-active"),t.changeState(t.stateIncome)}),t.buttonDemand.on("click",function(e){return e.preventDefault(),t.buttonDemand.addClass("is-active"),t.buttonIncome.removeClass("is-active"),t.changeState(t.stateDemand)})}}(this))},t.prototype._calculations=function(){var t,e,n,i;return i=this.container[0].clientWidth,e=this.props.maxWidth,n=Math.min(e,i),this.paddingX=i>e?(i-e)/2:0,this.divisionValueX=n/(this.props.valuesIncome.length+1),this.divisionValueY=this.props.height/this.props.yMax,t=function(t){return function(e,n){return{x:t.paddingX+t.divisionValueX*(n+1),y:t.minY+t.props.height-e*t.divisionValueY}}}(this),this.stateInitial.points=this.props.valuesInitial.map(t),this.stateIncome.points=this.props.valuesIncome.map(t),this.stateDemand.points=this.props.valuesDemand.map(t),this.stateInitial.linePath=this._pointsToSVGPath(this.stateInitial.points,!1,"bottom"),this.stateIncome.linePath=this._pointsToSVGPath(this.stateIncome.points),this.stateDemand.linePath=this._pointsToSVGPath(this.stateDemand.points,!1,"bottom"),this.stateInitial.fillPath=this._pointsToSVGPath(this.stateInitial.points,!0,"bottom"),this.stateIncome.fillPath=this._pointsToSVGPath(this.stateIncome.points,!0),this.stateDemand.fillPath=this._pointsToSVGPath(this.stateDemand.points,!0,"bottom")},t.prototype._changePointPosition=function(t,e,n){var i,r;return null==n&&(n=1e3),i=t.points[e].y-this.currentState.points[e].y,r=this.pointsGroups[e],r.stop().animate({transform:"t0,"+i+"..."},n,mina.easein)},t.prototype._pointsToSVGPath=function(t,e,n){var i,r,o,s;for(null==n&&(n="top"),o="M0 "+this.maxY+" R",i=0,r=t.length;r>i;i++)s=t[i],o+=s.x+" "+s.y+" ";return"top"===n?o+=this.container[0].clientWidth+" "+this.minY+" ":"bottom"===n&&(o+=this.container[0].clientWidth+" "+this.maxY+" "),e&&(o+="V"+this.maxY+" Z"),o},t.prototype._buildScene=function(){return o.addScene({triggerHook:"onCenter",triggerElement:this.container[0]}).on("start",function(t){return function(e){return t.container.addClass("show-graph"),t.active?void 0:t.render()}}(this))},t}(),e.exports=r},{"./scroll-controller":7,jquery:"jquery","lodash/function/debounce":16,snapsvg:"snapsvg"}],4:[function(t,e,n){var i,r,o,s,a=function(t,e){return function(){return t.apply(e,arguments)}};s=i=t("jquery"),o=t("./scroll-controller"),r=function(){function t(){return this._menuButtonClickHandler=a(this._menuButtonClickHandler,this),this.fixed=!1,this.opened=!1,this}return t.prototype.init=function(){return this.el=i(".header"),this.hamburger=this.el.find(".hamburger"),this.logo=this.el.find(".logo"),this.buttonOne=this.el.find(".btn").first(),this.menu=this.el.find(".header__nav"),this._initEvents(),this._buildScene()},t.prototype.open=function(){return this.hamburger.addClass("is-active"),this.el.addClass("open-step-1"),setTimeout(function(t){return function(){return t.el.addClass("open-step-2")}}(this),100),setTimeout(function(t){return function(){return t._drawBordersInMenu()}}(this),600),this.opened=!0},t.prototype.close=function(){return this.hamburger.removeClass("is-active"),this.el.removeClass("open-step-2"),setTimeout(function(t){return function(){return t.el.removeClass("open-step-1"),t._removeBordersInMenu()}}(this),400),this.opened=!1},t.prototype.makeFixed=function(){return this.el.addClass("fixed"),this.el.removeClass("draw"),this._removeBordersInTopRow(),setTimeout(function(t){return function(){return t.el.addClass("animate")}}(this),0),setTimeout(function(t){return function(){return t._drawBordersInTopRow()}}(this),300),this.fixed=!0},t.prototype.makeStatic=function(){return this.el.removeClass("animate"),setTimeout(function(t){return function(){return t.el.removeClass("fixed"),t.el.addClass("draw"),t._removeBordersInTopRow()}}(this),300),this.fixed=!1},t.prototype.animateIn=function(){return this.el.addClass("animate"),setTimeout(function(t){return function(){return t._drawBordersInTopRow()}}(this),300)},t.prototype.animateOut=function(){return this.el.removeClass("animate"),setTimeout(function(t){return function(){return t._removeBordersInTopRow()}}(this),300)},t.prototype._initEvents=function(){return this.hamburger.on("click",this._menuButtonClickHandler)},t.prototype._menuButtonClickHandler=function(t){return this.opened?this.close():this.open()},t.prototype._drawBordersInTopRow=function(){return this.logo.addClass("draw"),this.buttonOne.addClass("draw")},t.prototype._removeBordersInTopRow=function(){return this.logo.removeClass("draw"),this.buttonOne.removeClass("draw")},t.prototype._drawBordersInMenu=function(){return this.menu.addClass("draw")},t.prototype._removeBordersInMenu=function(){return this.menu.removeClass("draw")},t.prototype._buildScene=function(){return this.scrollScene=o.addScene({offset:190,duration:"100%",triggerElement:"body",triggerHook:"onLeave"}).on("end",function(t){return function(e){return"FORWARD"===e.scrollDirection?t.makeFixed():"REVERSE"===e.scrollDirection?(t.opened&&t.close(),t.makeStatic()):void 0}}(this))},t}(),e.exports=new r},{"./scroll-controller":7,jquery:"jquery"}],5:[function(t,e,n){var i,r,o;i=o=t("jquery"),r=function(){function t(t,e){return this.init(t,e),this}var e;return e={delta:-100,shift:0},t.prototype.init=function(t,n){var r;return null==n&&(n={}),this.el=t instanceof o?t:i(t),r=this.htmlData(),this.props=i.extend({},e,r,n),this.props.shift?this.el.css({top:this.props.shift+"px"}):void 0},t.prototype.htmlData=function(){var t,e;return e={},t=this.el.data("parallax"),i.isNumeric(t)?e.delta=t:"object"==typeof t&&(e=t),e},t.prototype.move=function(t){var e;return e=Math.round(this.props.delta*t),this.el.css({transform:"translate3d(0, "+e+"px, 0)"})},t}(),e.exports=r},{jquery:"jquery"}],6:[function(t,e,n){var i,r;i=t("jquery"),t("./../lib/jquery.maskedinput"),r=function(){function t(){return this}return t.prototype.init=function(){return this.container=i(".question"),this.formContainer=i(".question__form"),this.button=this.container.find(".link"),this.form=i("#question-form"),this._initEvents(),this.initForm()},t.prototype.toggleFormContainer=function(){return this.formContainer.slideToggle(300),setTimeout(function(t){return function(){return t.formContainer.toggleClass("draw")}}(this),300)},t.prototype.toggleButtonText=function(){var t,e;return e=this.button.text(),t=this.button.data("alt-text"),this.button.data("alt-text",e),this.button.text(t)},t.prototype.initForm=function(){var t;return this.form.find("input").field(),t=this.form.find('input[type="tel"]'),t.mask("+380 (99) 999-99-99",{placeholder:"+380 (__) ___-__-__"})},t.prototype._initEvents=function(){return this.button.on("click",function(t){return function(){return t.toggleFormContainer()}}(this))},t}(),e.exports=new r},{"./../lib/jquery.maskedinput":2,jquery:"jquery"}],7:[function(t,e,n){var i,r;r=t("scrollmagic"),i=new r.Controller({container:"body",loglevel:2}),e.exports={addScene:function(t){var e;return e=new r.Scene(t),i.addScene(e),e}}},{scrollmagic:"scrollmagic"}],8:[function(t,e,n){var i,r,o,s,a;i=a=t("jquery"),o=t("./scroll-controller"),s=t("./zoom-out"),r=t("./parallax"),e.exports=function(){var t,e,n,a,u,l;return a=i(window),l=a.height(),i("[data-parallax]").each(function(t,e){var n,s;return n=i(e),s=new r(n),o.addScene({duration:l+n.height(),triggerHook:"onEnter",triggerElement:e}).on("progress",function(t){return s.move(t.progress)})}),i(".fade-in").each(function(t,e){return o.addScene({offset:"20%",triggerHook:"onEnter",triggerElement:e}).on("start",function(){return i(e).toggleClass("animate")})}),u=new s(".toparea__video"),o.addScene({duration:"100%",triggerHook:"onLeave",triggerElement:"body"}).on("start",function(t){return i(".header, .toparea").addClass("draw")}).on("progress",function(t){return u.zoomOut(t.progress)}).on("end",function(t){return i(".toparea").toggle()}),e=i(".footer"),o.addScene({duration:200,triggerHook:"onEnter",triggerElement:"#sm-trigger-footer"}).on("start",function(t){return e.toggleClass("is-fixed")}).on("end",function(t){return e.toggleClass("draw")}),t=i(".courses__container"),o.addScene({offset:100,triggerHook:"onCenter",triggerElement:".courses__container"}).on("start",function(e){return t.toggleClass("draw")}),n=i(".nomination .banner-title"),o.addScene({offset:200,triggerHook:"onEnter",triggerElement:n[0]}).on("start",function(t){return n.toggleClass("draw")}),o.addScene({triggerHook:"onCenter",triggerElement:".callback__frontlayer"}).setClassToggle(".callback__frontlayer","draw"),o.addScene({triggerHook:"onCenter",triggerElement:".reasons__list"}).setClassToggle(".reasons__list","draw"),i(".js-draw").each(function(t,e){return o.addScene({offset:i(e).data("sm-offset")||0,triggerHook:"onCenter",triggerElement:e}).setClassToggle(e,"draw")})}},{"./parallax":5,"./scroll-controller":7,"./zoom-out":11,jquery:"jquery"}],9:[function(t,e,n){var i,r,o,s;i=t("jquery"),r=t("./scroll-controller"),s=t("./zoom-out"),o=function(){function t(t,e){return this.init(t,e),this}var e;return e={wrapper:"slider-box-wrapper",slider:".slider",sliderTrack:".slider__track",backgroundLayer:".slider-box__bg",zoomOutTrigger:!1},t.prototype.init=function(t,n){return null==n&&(n={}),this.el=t instanceof i?t:i(t),this.props=i.extend({},e,n),this.wrapper=this.el.parent(),this.slider=this.el.find(this.props.slider),this.sliderTrack=this.el.find(this.props.sliderTrack),this.duration=null,this._initSlider(),this.props.zoomOutTrigger?this.initZoomOutScene():this.initSimpleScene()},t.prototype.scrollSlider=function(t){return this.sliderTrack.css({x:-this.duration*t})},t.prototype.makeFixed=function(){return this.el.css({position:"fixed",top:0,left:0,right:0}),this.wrapper.css({height:this.el.outerHeight(),boxSizing:"content-box",paddingBottom:this.duration})},t.prototype.makeStatic=function(){return this.el.css({position:"",top:"",left:"",right:""}),this.wrapper.css({height:"",boxSizing:"",paddingBottom:""})},t.prototype.initSimpleScene=function(){return r.addScene({duration:this.duration,triggerHook:"onLeave",triggerElement:this.wrapper[0]}).on("progress",function(t){return function(e){return t.scrollSlider(e.progress)}}(this)).setPin(this.el[0])},t.prototype.initZoomOutScene=function(){var t;return t=new s(this.el.find(this.props.backgroundLayer)),r.addScene({duration:this.duration,triggerHook:"onLeave",triggerElement:this.wrapper[0]}).on("start",function(t){return function(e){return"FORWARD"===e.scrollDirection&&t.makeFixed(),"REVERSE"===e.scrollDirection?t.makeStatic():void 0}}(this)).on("progress",function(t){return function(e){return t.scrollSlider(e.progress)}}(this)),r.addScene({duration:"100%",triggerHook:"onEnter",triggerElement:this.props.zoomOutTrigger}).on("progress",function(e){return t.zoomOut(e.progress)}).on("end",function(t){return function(e){return t.el.toggle()}}(this))},t.prototype._initSlider=function(){var t,e,n;return t=this.slider.outerHeight(),this.slider.css({height:t}),this.sliderTrack.css({position:"absolute",top:0,left:0}),e=this.slider.outerWidth(),n=this.sliderTrack.outerWidth(),this.duration=n-e},t}(),e.exports=o},{"./scroll-controller":7,"./zoom-out":11,jquery:"jquery"}],10:[function(t,e,n){var i;i=t("jquery"),e.exports=function(){var t,e,n,r,o,s;return t=i(".testimonials"),n=t.find(".testimonials__more"),e=t.find(".testimonials__buttons .link"),r=t.find(".testimonial .link"),e.on("click",function(e){return e.preventDefault(),n.slideDown(300),setTimeout(function(){return t.addClass("is-show-more")},500)}),r.on("click",function(t){return t.preventDefault(),s(this)}),o=function(t){var e,n;return n=t.text(),e=t.data("alt-text"),t.text(e),t.data("alt-text",n)},s=function(t){var e,n,r,s;return n=i(t).parents(".testimonial"),r=n.find(".testimonial__text"),e=n.hasClass("is-expanded")?!0:!1,s=r[0].scrollHeight,e?r.animate({height:120},500,function(){return r.css({height:""}),o(i(t))}):r.animate({height:s},500,function(){return o(i(t))}),n.toggleClass("is-expanded")}}},{jquery:"jquery"}],11:[function(t,e,n){var i,r,o;i=o=t("jquery"),r=function(){function t(t,e){return this.init(t,e),this}var e;return e={minScale:.6,minOpacity:.3},t.prototype.init=function(t,n){return null==n&&(n={}),this.props=i.extend(e,n),this.el=t instanceof o?t:i(t),this.scaleDelta=1-this.props.minScale,this.opacityDelta=1-this.props.minOpacity},t.prototype.zoomOut=function(t){var e;return e=1-this.scaleDelta*t,this.el.css({transform:"scale3d("+e+", "+e+", 1)",opacity:1-this.opacityDelta*t})},t}(),e.exports=r},{jquery:"jquery"}],12:[function(t,e,n){e.exports=function(t){var e;return e=function(){function e(e,n){this.el=e instanceof t?e:t(e),this.init(n)}return e.prototype.init=function(t){var e;return this.items=this.el.find(t.itemSelector),this.buttons=this.el.find(t.buttonSelector),this.contents=this.el.find(t.contentSelector),this.speed=null!=(e=t.speed)?e:300,this.openedItemIndex=null,this.initEvents()},e.prototype.initEvents=function(){return this.buttons.each(function(e){return function(n,i){return t(i).on("click",function(){return e.toggleItem(n)})}}(this))},e.prototype.toggleItem=function(t){return t===this.openedItemIndex?(this.closeItem(t),this.openedItemIndex=null):null!==this.openedItemIndex?(this.closeItem(this.openedItemIndex),this.openItem(t),this.openedItemIndex=t):(this.openItem(t),this.openedItemIndex=t)},e.prototype.openItem=function(e){return t(this.items[e]).addClass("is-open"),t(this.contents[e]).slideDown(this.speed)},e.prototype.closeItem=function(e){return t(this.items[e]).removeClass("is-open"),t(this.contents[e]).slideUp(this.speed)},e}(),t.fn.accordion=function(t){return this.each(function(n,i){return new e(i,t)})}}},{}],13:[function(t,e,n){e.exports=function(){var t,e,n;return t=document.getElementsByTagName("body")[0],e=document.createElement("button"),e.innerHTML="Toggle draw",e.style.position="fixed",e.style.top="0",e.style.right="0",e.style.padding="10px",e.style.backgroundColor="gray",e.style.zIndex="9999",t.appendChild(e),n=!1,e.addEventListener("click",function(i){return n=!n,t.classList.toggle("draw"),n?e.style.backgroundColor="green":e.style.backgroundColor="gray"})}()},{}],14:[function(t,e,n){e.exports=function(t){var e;return e=function(){function e(t){return this.init(t),this}return e.prototype.init=function(e){return this.input=e instanceof t?e:t(e),this.field=this.input.parents(".field"),this.label=this.input.siblings("label"),this._initEvents()},e.prototype.checkDirty=function(){var t;return t=this.input.val(),t?this.field.addClass("is-filled"):this.field.removeClass("is-filled")},e.prototype._initEvents=function(){return this.input.on("blur",function(t){return function(){return t.checkDirty()}}(this))},e}(),t.fn.field=function(){return this.each(function(t,n){return new e(n)})}}},{}],15:[function(t,e,n){var i=t("../internal/getNative"),r=i(Date,"now"),o=r||function(){return(new Date).getTime()};e.exports=o},{"../internal/getNative":17}],16:[function(t,e,n){function i(t,e,n){function i(){v&&clearTimeout(v),d&&clearTimeout(d),b=0,d=v=y=void 0}function u(e,n){n&&clearTimeout(n),d=v=y=void 0,e&&(b=o(),f=t.apply(g,h),v||d||(h=g=void 0))}function l(){var t=e-(o()-m);0>=t||t>e?u(y,d):v=setTimeout(l,t)}function c(){u(_,v)}function p(){if(h=arguments,m=o(),g=this,y=_&&(v||!k),x===!1)var n=k&&!v;else{d||k||(b=m);var i=x-(m-b),r=0>=i||i>x;r?(d&&(d=clearTimeout(d)),b=m,f=t.apply(g,h)):d||(d=setTimeout(c,i))}return r&&v?v=clearTimeout(v):v||e===x||(v=setTimeout(l,e)),n&&(r=!0,f=t.apply(g,h)),!r||v||d||(h=g=void 0),f}var h,d,f,m,g,v,y,b=0,x=!1,_=!0;if("function"!=typeof t)throw new TypeError(s);if(e=0>e?0:+e||0,n===!0){var k=!0;_=!1}else r(n)&&(k=!!n.leading,x="maxWait"in n&&a(+n.maxWait||0,e),_="trailing"in n?!!n.trailing:_);return p.cancel=i,p}var r=t("../lang/isObject"),o=t("../date/now"),s="Expected a function",a=Math.max;e.exports=i},{"../date/now":15,"../lang/isObject":21}],17:[function(t,e,n){function i(t,e){var n=null==t?void 0:t[e];return r(n)?n:void 0}var r=t("../lang/isNative");e.exports=i},{"../lang/isNative":20}],18:[function(t,e,n){function i(t){return!!t&&"object"==typeof t}e.exports=i},{}],19:[function(t,e,n){function i(t){return r(t)&&a.call(t)==o}var r=t("./isObject"),o="[object Function]",s=Object.prototype,a=s.toString;e.exports=i},{"./isObject":21}],20:[function(t,e,n){function i(t){return null==t?!1:r(t)?c.test(u.call(t)):o(t)&&s.test(t)}var r=t("./isFunction"),o=t("../internal/isObjectLike"),s=/^\[object .+?Constructor\]$/,a=Object.prototype,u=Function.prototype.toString,l=a.hasOwnProperty,c=RegExp("^"+u.call(l).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");e.exports=i},{"../internal/isObjectLike":18,"./isFunction":19}],21:[function(t,e,n){function i(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}e.exports=i},{}]},{},[1]);
//# sourceMappingURL=app.js.map