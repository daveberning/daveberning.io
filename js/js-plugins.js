// LabelFloat.js
!function(e){return}(this),!function(e,t,n){function i(e,t){return typeof e===t}function r(){var e,t,n,r,o,s,a;for(var d in b)if(b.hasOwnProperty(d)){if(e=[],t=b[d],t.name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(r=i(t.fn,"function")?t.fn():t.fn,o=0;o<e.length;o++)s=e[o],a=s.split("."),1===a.length?x[a[0]]=r:(!x[a[0]]||x[a[0]]instanceof Boolean||(x[a[0]]=new Boolean(x[a[0]])),x[a[0]][a[1]]=r),g.push((r?"":"no-")+a.join("-"))}}function o(e){var t=w.className,n=x._config.classPrefix||"";if(T&&(t=t.baseVal),x._config.enableJSClass){var i=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(i,"$1"+n+"js$2")}x._config.enableClasses&&(t+=" "+n+e.join(" "+n),T?w.className.baseVal=t:w.className=t)}function s(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):T?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}function a(){var e=t.body;return e||(e=s(T?"svg":"body"),e.fake=!0),e}function d(e,n,i,r){var o,d,l,u,f="modernizr",p=s("div"),c=a();if(parseInt(i,10))for(;i--;)l=s("div"),l.id=r?r[i]:f+(i+1),p.appendChild(l);return o=s("style"),o.type="text/css",o.id="s"+f,(c.fake?c:p).appendChild(o),c.appendChild(p),o.styleSheet?o.styleSheet.cssText=e:o.appendChild(t.createTextNode(e)),p.id=f,c.fake&&(c.style.background="",c.style.overflow="hidden",u=w.style.overflow,w.style.overflow="hidden",w.appendChild(c)),d=n(p,e),c.fake?(c.parentNode.removeChild(c),w.style.overflow=u,w.offsetHeight):p.parentNode.removeChild(p),!!d}function l(e,t){return!!~(""+e).indexOf(t)}function u(e){return e.replace(/([a-z])-([a-z])/g,function(e,t,n){return t+n.toUpperCase()}).replace(/^-/,"")}function f(e,t){return function(){return e.apply(t,arguments)}}function p(e,t,n){var r;for(var o in e)if(e[o]in t)return n===!1?e[o]:(r=t[e[o]],i(r,"function")?f(r,n||t):r);return!1}function c(e){return e.replace(/([A-Z])/g,function(e,t){return"-"+t.toLowerCase()}).replace(/^ms-/,"-ms-")}function m(t,i){var r=t.length;if("CSS"in e&&"supports"in e.CSS){for(;r--;)if(e.CSS.supports(c(t[r]),i))return!0;return!1}if("CSSSupportsRule"in e){for(var o=[];r--;)o.push("("+c(t[r])+":"+i+")");return o=o.join(" or "),d("@supports ("+o+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return n}function h(e,t,r,o){function a(){f&&(delete V.style,delete V.modElem)}if(o=i(o,"undefined")?!1:o,!i(r,"undefined")){var d=m(e,r);if(!i(d,"undefined"))return d}for(var f,p,c,h,v,y=["modernizr","tspan"];!V.style;)f=!0,V.modElem=s(y.shift()),V.style=V.modElem.style;for(c=e.length,p=0;c>p;p++)if(h=e[p],v=V.style[h],l(h,"-")&&(h=u(h)),V.style[h]!==n){if(o||i(r,"undefined"))return a(),"pfx"==t?h:!0;try{V.style[h]=r}catch(g){}if(V.style[h]!=v)return a(),"pfx"==t?h:!0}return a(),!1}function v(e,t,n,r,o){var s=e.charAt(0).toUpperCase()+e.slice(1),a=(e+" "+L.join(s+" ")+s).split(" ");return i(t,"string")||i(t,"undefined")?h(a,t,r,o):(a=(e+" "+M.join(s+" ")+s).split(" "),p(a,t,n))}function y(e,t,i){return v(e,n,n,t,i)}var g=[],b=[],C={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){b.push({name:e,fn:t,options:n})},addAsyncTest:function(e){b.push({name:null,fn:e})}},x=function(){};x.prototype=C,x=new x;var w=t.documentElement,T="svg"===w.nodeName.toLowerCase(),S="CSS"in e&&"supports"in e.CSS,z="supportsCSS"in e;x.addTest("supports",S||z),x.addTest("formattribute",function(){var e,n=s("form"),i=s("input"),r=s("div"),o="formtest"+(new Date).getTime(),a=!1;n.id=o;try{i.setAttribute("form",o)}catch(d){t.createAttribute&&(e=t.createAttribute("form"),e.nodeValue=o,i.setAttributeNode(e))}return r.appendChild(n),r.appendChild(i),w.appendChild(r),a=n.elements&&1===n.elements.length&&i.form==n,r.parentNode.removeChild(r),a}),x.addTest("placeholder","placeholder"in s("input")&&"placeholder"in s("textarea"));var k=C.testStyles=d;k("#modernizr div {width:100px} #modernizr :last-child{width:200px;display:block}",function(e){x.addTest("lastchild",e.lastChild.offsetWidth>e.firstChild.offsetWidth)},2),k("#modernizr div {width:1px} #modernizr div:nth-child(2n) {width:2px;}",function(e){for(var t=e.getElementsByTagName("div"),n=!0,i=0;5>i;i++)n=n&&t[i].offsetWidth===i%2+1;x.addTest("nthchild",n)},5),x.addTest("cssvalid",function(){return k("#modernizr input{height:0;border:0;padding:0;margin:0;width:10px} #modernizr input:valid{width:50px}",function(e){var t=s("input");return e.appendChild(t),t.clientWidth>10})}),x.addTest("formvalidation",function(){var t=s("form");if(!("checkValidity"in t&&"addEventListener"in t))return!1;if("reportValidity"in t)return!0;var n,i=!1;return x.formvalidationapi=!0,t.addEventListener("submit",function(t){(!e.opera||e.operamini)&&t.preventDefault(),t.stopPropagation()},!1),t.innerHTML='<input name="modTest" required="required" /><button></button>',k("#modernizr form{position:absolute;top:-99999em}",function(e){e.appendChild(t),n=t.getElementsByTagName("input")[0],n.addEventListener("invalid",function(e){i=!0,e.preventDefault(),e.stopPropagation()},!1),x.formvalidationmessage=!!n.validationMessage,t.getElementsByTagName("button")[0].click()}),i});var N=function(){var t=e.matchMedia||e.msMatchMedia;return t?function(e){var n=t(e);return n&&n.matches||!1}:function(t){var n=!1;return d("@media "+t+" { #modernizr { position: absolute; } }",function(t){n="absolute"==(e.getComputedStyle?e.getComputedStyle(t,null):t.currentStyle).position}),n}}();C.mq=N,x.addTest("mediaqueries",N("only all"));var A=s("input"),E="search tel url email datetime date month week time datetime-local number range color".split(" "),_={};x.inputtypes=function(e){for(var i,r,o,s=e.length,a="1)",d=0;s>d;d++)A.setAttribute("type",i=e[d]),o="text"!==A.type&&"style"in A,o&&(A.value=a,A.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(i)&&A.style.WebkitAppearance!==n?(w.appendChild(A),r=t.defaultView,o=r.getComputedStyle&&"textfield"!==r.getComputedStyle(A,null).WebkitAppearance&&0!==A.offsetHeight,w.removeChild(A)):/^(search|tel)$/.test(i)||(o=/^(url|email)$/.test(i)?A.checkValidity&&A.checkValidity()===!1:A.value!=a)),_[e[d]]=!!o;return _}(E),x.addTest("localizednumber",function(){if(!x.inputtypes.number)return!1;if(!x.formvalidation)return!1;var e,n=s("div"),i=a(),r=function(){return w.insertBefore(i,w.firstElementChild||w.firstChild)}();n.innerHTML='<input type="number" value="1.0" step="0.1"/>';var o=n.childNodes[0];r.appendChild(n),o.focus();try{t.execCommand("InsertText",!1,"1,1")}catch(d){}return e="number"===o.type&&1.1===o.valueAsNumber&&o.checkValidity(),r.removeChild(n),i.fake&&r.parentNode.removeChild(r),e});var P="Moz O ms Webkit",L=C._config.usePrefixes?P.split(" "):[];C._cssomPrefixes=L;var M=C._config.usePrefixes?P.toLowerCase().split(" "):[];C._domPrefixes=M;var q={elem:s("modernizr")};x._q.push(function(){delete q.elem});var V={style:q.elem.style};x._q.unshift(function(){delete V.style}),C.testAllProps=v,C.testAllProps=y,x.addTest("cssanimations",y("animationName","a",!0)),x.addTest("borderradius",y("borderRadius","0px",!0)),x.addTest("boxsizing",y("boxSizing","border-box",!0)&&(t.documentMode===n||t.documentMode>7)),x.addTest("csstransforms",function(){return-1===navigator.userAgent.indexOf("Android 2.")&&y("transform","scale(1)",!0)}),x.addTest("csstransforms3d",function(){var e=!!y("perspective","1px",!0),t=x._config.usePrefixes;if(e&&(!t||"webkitPerspective"in w.style)){var n,i="#modernizr{width:0;height:0}";x.supports?n="@supports (perspective: 1px)":(n="@media (transform-3d)",t&&(n+=",(-webkit-transform-3d)")),n+="{#modernizr{width:7px;height:18px;margin:0;padding:0;border:0}}",k(i+n,function(t){e=7===t.offsetWidth&&18===t.offsetHeight})}return e}),x.addTest("preserve3d",y("transformStyle","preserve-3d")),x.addTest("csstransitions",y("transition","all",!0)),r(),o(g),delete C.addTest,delete C.addAsyncTest;for(var W=0;W<x._q.length;W++)x._q[W]();e.Modernizr=x}(window,document);

// flexslider
/*
 * jQuery FlexSlider v2.6.1
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */!function($){var e=!0;$.flexslider=function(t,a){var n=$(t);n.vars=$.extend({},$.flexslider.defaults,a);var i=n.vars.namespace,s=window.navigator&&window.navigator.msPointerEnabled&&window.MSGesture,r=("ontouchstart"in window||s||window.DocumentTouch&&document instanceof DocumentTouch)&&n.vars.touch,o="click touchend MSPointerUp keyup",l="",c,d="vertical"===n.vars.direction,u=n.vars.reverse,v=n.vars.itemWidth>0,p="fade"===n.vars.animation,m=""!==n.vars.asNavFor,f={};$.data(t,"flexslider",n),f={init:function(){n.animating=!1,n.currentSlide=parseInt(n.vars.startAt?n.vars.startAt:0,10),isNaN(n.currentSlide)&&(n.currentSlide=0),n.animatingTo=n.currentSlide,n.atEnd=0===n.currentSlide||n.currentSlide===n.last,n.containerSelector=n.vars.selector.substr(0,n.vars.selector.search(" ")),n.slides=$(n.vars.selector,n),n.container=$(n.containerSelector,n),n.count=n.slides.length,n.syncExists=$(n.vars.sync).length>0,"slide"===n.vars.animation&&(n.vars.animation="swing"),n.prop=d?"top":"marginLeft",n.args={},n.manualPause=!1,n.stopped=!1,n.started=!1,n.startTimeout=null,n.transitions=!n.vars.video&&!p&&n.vars.useCSS&&function(){var e=document.createElement("div"),t=["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"];for(var a in t)if(void 0!==e.style[t[a]])return n.pfx=t[a].replace("Perspective","").toLowerCase(),n.prop="-"+n.pfx+"-transform",!0;return!1}(),n.ensureAnimationEnd="",""!==n.vars.controlsContainer&&(n.controlsContainer=$(n.vars.controlsContainer).length>0&&$(n.vars.controlsContainer)),""!==n.vars.manualControls&&(n.manualControls=$(n.vars.manualControls).length>0&&$(n.vars.manualControls)),""!==n.vars.customDirectionNav&&(n.customDirectionNav=2===$(n.vars.customDirectionNav).length&&$(n.vars.customDirectionNav)),n.vars.randomize&&(n.slides.sort(function(){return Math.round(Math.random())-.5}),n.container.empty().append(n.slides)),n.doMath(),n.setup("init"),n.vars.controlNav&&f.controlNav.setup(),n.vars.directionNav&&f.directionNav.setup(),n.vars.keyboard&&(1===$(n.containerSelector).length||n.vars.multipleKeyboard)&&$(document).bind("keyup",function(e){var t=e.keyCode;if(!n.animating&&(39===t||37===t)){var a=39===t?n.getTarget("next"):37===t?n.getTarget("prev"):!1;n.flexAnimate(a,n.vars.pauseOnAction)}}),n.vars.mousewheel&&n.bind("mousewheel",function(e,t,a,i){e.preventDefault();var s=0>t?n.getTarget("next"):n.getTarget("prev");n.flexAnimate(s,n.vars.pauseOnAction)}),n.vars.pausePlay&&f.pausePlay.setup(),n.vars.slideshow&&n.vars.pauseInvisible&&f.pauseInvisible.init(),n.vars.slideshow&&(n.vars.pauseOnHover&&n.hover(function(){n.manualPlay||n.manualPause||n.pause()},function(){n.manualPause||n.manualPlay||n.stopped||n.play()}),n.vars.pauseInvisible&&f.pauseInvisible.isHidden()||(n.vars.initDelay>0?n.startTimeout=setTimeout(n.play,n.vars.initDelay):n.play())),m&&f.asNav.setup(),r&&n.vars.touch&&f.touch(),(!p||p&&n.vars.smoothHeight)&&$(window).bind("resize orientationchange focus",f.resize),n.find("img").attr("draggable","false"),setTimeout(function(){n.vars.start(n)},200)},asNav:{setup:function(){n.asNav=!0,n.animatingTo=Math.floor(n.currentSlide/n.move),n.currentItem=n.currentSlide,n.slides.removeClass(i+"active-slide").eq(n.currentItem).addClass(i+"active-slide"),s?(t._slider=n,n.slides.each(function(){var e=this;e._gesture=new MSGesture,e._gesture.target=e,e.addEventListener("MSPointerDown",function(e){e.preventDefault(),e.currentTarget._gesture&&e.currentTarget._gesture.addPointer(e.pointerId)},!1),e.addEventListener("MSGestureTap",function(e){e.preventDefault();var t=$(this),a=t.index();$(n.vars.asNavFor).data("flexslider").animating||t.hasClass("active")||(n.direction=n.currentItem<a?"next":"prev",n.flexAnimate(a,n.vars.pauseOnAction,!1,!0,!0))})})):n.slides.on(o,function(e){e.preventDefault();var t=$(this),a=t.index(),s=t.offset().left-$(n).scrollLeft();0>=s&&t.hasClass(i+"active-slide")?n.flexAnimate(n.getTarget("prev"),!0):$(n.vars.asNavFor).data("flexslider").animating||t.hasClass(i+"active-slide")||(n.direction=n.currentItem<a?"next":"prev",n.flexAnimate(a,n.vars.pauseOnAction,!1,!0,!0))})}},controlNav:{setup:function(){n.manualControls?f.controlNav.setupManual():f.controlNav.setupPaging()},setupPaging:function(){var e="thumbnails"===n.vars.controlNav?"control-thumbs":"control-paging",t=1,a,s;if(n.controlNavScaffold=$('<ol class="'+i+"control-nav "+i+e+'"></ol>'),n.pagingCount>1)for(var r=0;r<n.pagingCount;r++){s=n.slides.eq(r),void 0===s.attr("data-thumb-alt")&&s.attr("data-thumb-alt","");var c=""!==s.attr("data-thumb-alt")?c=' alt="'+s.attr("data-thumb-alt")+'"':"";if(a="thumbnails"===n.vars.controlNav?'<img src="'+s.attr("data-thumb")+'"'+c+"/>":'<a href="#">'+t+"</a>","thumbnails"===n.vars.controlNav&&!0===n.vars.thumbCaptions){var d=s.attr("data-thumbcaption");""!==d&&void 0!==d&&(a+='<span class="'+i+'caption">'+d+"</span>")}n.controlNavScaffold.append("<li>"+a+"</li>"),t++}n.controlsContainer?$(n.controlsContainer).append(n.controlNavScaffold):n.append(n.controlNavScaffold),f.controlNav.set(),f.controlNav.active(),n.controlNavScaffold.delegate("a, img",o,function(e){if(e.preventDefault(),""===l||l===e.type){var t=$(this),a=n.controlNav.index(t);t.hasClass(i+"active")||(n.direction=a>n.currentSlide?"next":"prev",n.flexAnimate(a,n.vars.pauseOnAction))}""===l&&(l=e.type),f.setToClearWatchedEvent()})},setupManual:function(){n.controlNav=n.manualControls,f.controlNav.active(),n.controlNav.bind(o,function(e){if(e.preventDefault(),""===l||l===e.type){var t=$(this),a=n.controlNav.index(t);t.hasClass(i+"active")||(a>n.currentSlide?n.direction="next":n.direction="prev",n.flexAnimate(a,n.vars.pauseOnAction))}""===l&&(l=e.type),f.setToClearWatchedEvent()})},set:function(){var e="thumbnails"===n.vars.controlNav?"img":"a";n.controlNav=$("."+i+"control-nav li "+e,n.controlsContainer?n.controlsContainer:n)},active:function(){n.controlNav.removeClass(i+"active").eq(n.animatingTo).addClass(i+"active")},update:function(e,t){n.pagingCount>1&&"add"===e?n.controlNavScaffold.append($('<li><a href="#">'+n.count+"</a></li>")):1===n.pagingCount?n.controlNavScaffold.find("li").remove():n.controlNav.eq(t).closest("li").remove(),f.controlNav.set(),n.pagingCount>1&&n.pagingCount!==n.controlNav.length?n.update(t,e):f.controlNav.active()}},directionNav:{setup:function(){var e=$('<ul class="'+i+'direction-nav"><li class="'+i+'nav-prev"><a class="'+i+'prev" href="#">'+n.vars.prevText+'</a></li><li class="'+i+'nav-next"><a class="'+i+'next" href="#">'+n.vars.nextText+"</a></li></ul>");n.customDirectionNav?n.directionNav=n.customDirectionNav:n.controlsContainer?($(n.controlsContainer).append(e),n.directionNav=$("."+i+"direction-nav li a",n.controlsContainer)):(n.append(e),n.directionNav=$("."+i+"direction-nav li a",n)),f.directionNav.update(),n.directionNav.bind(o,function(e){e.preventDefault();var t;(""===l||l===e.type)&&(t=$(this).hasClass(i+"next")?n.getTarget("next"):n.getTarget("prev"),n.flexAnimate(t,n.vars.pauseOnAction)),""===l&&(l=e.type),f.setToClearWatchedEvent()})},update:function(){var e=i+"disabled";1===n.pagingCount?n.directionNav.addClass(e).attr("tabindex","-1"):n.vars.animationLoop?n.directionNav.removeClass(e).removeAttr("tabindex"):0===n.animatingTo?n.directionNav.removeClass(e).filter("."+i+"prev").addClass(e).attr("tabindex","-1"):n.animatingTo===n.last?n.directionNav.removeClass(e).filter("."+i+"next").addClass(e).attr("tabindex","-1"):n.directionNav.removeClass(e).removeAttr("tabindex")}},pausePlay:{setup:function(){var e=$('<div class="'+i+'pauseplay"><a href="#"></a></div>');n.controlsContainer?(n.controlsContainer.append(e),n.pausePlay=$("."+i+"pauseplay a",n.controlsContainer)):(n.append(e),n.pausePlay=$("."+i+"pauseplay a",n)),f.pausePlay.update(n.vars.slideshow?i+"pause":i+"play"),n.pausePlay.bind(o,function(e){e.preventDefault(),(""===l||l===e.type)&&($(this).hasClass(i+"pause")?(n.manualPause=!0,n.manualPlay=!1,n.pause()):(n.manualPause=!1,n.manualPlay=!0,n.play())),""===l&&(l=e.type),f.setToClearWatchedEvent()})},update:function(e){"play"===e?n.pausePlay.removeClass(i+"pause").addClass(i+"play").html(n.vars.playText):n.pausePlay.removeClass(i+"play").addClass(i+"pause").html(n.vars.pauseText)}},touch:function(){function e(e){e.stopPropagation(),n.animating?e.preventDefault():(n.pause(),t._gesture.addPointer(e.pointerId),T=0,c=d?n.h:n.w,f=Number(new Date),l=v&&u&&n.animatingTo===n.last?0:v&&u?n.limit-(n.itemW+n.vars.itemMargin)*n.move*n.animatingTo:v&&n.currentSlide===n.last?n.limit:v?(n.itemW+n.vars.itemMargin)*n.move*n.currentSlide:u?(n.last-n.currentSlide+n.cloneOffset)*c:(n.currentSlide+n.cloneOffset)*c)}function a(e){e.stopPropagation();var a=e.target._slider;if(a){var n=-e.translationX,i=-e.translationY;return T+=d?i:n,m=T,y=d?Math.abs(T)<Math.abs(-n):Math.abs(T)<Math.abs(-i),e.detail===e.MSGESTURE_FLAG_INERTIA?void setImmediate(function(){t._gesture.stop()}):void((!y||Number(new Date)-f>500)&&(e.preventDefault(),!p&&a.transitions&&(a.vars.animationLoop||(m=T/(0===a.currentSlide&&0>T||a.currentSlide===a.last&&T>0?Math.abs(T)/c+2:1)),a.setProps(l+m,"setTouch"))))}}function i(e){e.stopPropagation();var t=e.target._slider;if(t){if(t.animatingTo===t.currentSlide&&!y&&null!==m){var a=u?-m:m,n=a>0?t.getTarget("next"):t.getTarget("prev");t.canAdvance(n)&&(Number(new Date)-f<550&&Math.abs(a)>50||Math.abs(a)>c/2)?t.flexAnimate(n,t.vars.pauseOnAction):p||t.flexAnimate(t.currentSlide,t.vars.pauseOnAction,!0)}r=null,o=null,m=null,l=null,T=0}}var r,o,l,c,m,f,g,h,S,y=!1,x=0,b=0,T=0;s?(t.style.msTouchAction="none",t._gesture=new MSGesture,t._gesture.target=t,t.addEventListener("MSPointerDown",e,!1),t._slider=n,t.addEventListener("MSGestureChange",a,!1),t.addEventListener("MSGestureEnd",i,!1)):(g=function(e){n.animating?e.preventDefault():(window.navigator.msPointerEnabled||1===e.touches.length)&&(n.pause(),c=d?n.h:n.w,f=Number(new Date),x=e.touches[0].pageX,b=e.touches[0].pageY,l=v&&u&&n.animatingTo===n.last?0:v&&u?n.limit-(n.itemW+n.vars.itemMargin)*n.move*n.animatingTo:v&&n.currentSlide===n.last?n.limit:v?(n.itemW+n.vars.itemMargin)*n.move*n.currentSlide:u?(n.last-n.currentSlide+n.cloneOffset)*c:(n.currentSlide+n.cloneOffset)*c,r=d?b:x,o=d?x:b,t.addEventListener("touchmove",h,!1),t.addEventListener("touchend",S,!1))},h=function(e){x=e.touches[0].pageX,b=e.touches[0].pageY,m=d?r-b:r-x,y=d?Math.abs(m)<Math.abs(x-o):Math.abs(m)<Math.abs(b-o);var t=500;(!y||Number(new Date)-f>t)&&(e.preventDefault(),!p&&n.transitions&&(n.vars.animationLoop||(m/=0===n.currentSlide&&0>m||n.currentSlide===n.last&&m>0?Math.abs(m)/c+2:1),n.setProps(l+m,"setTouch")))},S=function(e){if(t.removeEventListener("touchmove",h,!1),n.animatingTo===n.currentSlide&&!y&&null!==m){var a=u?-m:m,i=a>0?n.getTarget("next"):n.getTarget("prev");n.canAdvance(i)&&(Number(new Date)-f<550&&Math.abs(a)>50||Math.abs(a)>c/2)?n.flexAnimate(i,n.vars.pauseOnAction):p||n.flexAnimate(n.currentSlide,n.vars.pauseOnAction,!0)}t.removeEventListener("touchend",S,!1),r=null,o=null,m=null,l=null},t.addEventListener("touchstart",g,!1))},resize:function(){!n.animating&&n.is(":visible")&&(v||n.doMath(),p?f.smoothHeight():v?(n.slides.width(n.computedW),n.update(n.pagingCount),n.setProps()):d?(n.viewport.height(n.h),n.setProps(n.h,"setTotal")):(n.vars.smoothHeight&&f.smoothHeight(),n.newSlides.width(n.computedW),n.setProps(n.computedW,"setTotal")))},smoothHeight:function(e){if(!d||p){var t=p?n:n.viewport;e?t.animate({height:n.slides.eq(n.animatingTo).innerHeight()},e):t.innerHeight(n.slides.eq(n.animatingTo).innerHeight())}},sync:function(e){var t=$(n.vars.sync).data("flexslider"),a=n.animatingTo;switch(e){case"animate":t.flexAnimate(a,n.vars.pauseOnAction,!1,!0);break;case"play":t.playing||t.asNav||t.play();break;case"pause":t.pause()}},uniqueID:function(e){return e.filter("[id]").add(e.find("[id]")).each(function(){var e=$(this);e.attr("id",e.attr("id")+"_clone")}),e},pauseInvisible:{visProp:null,init:function(){var e=f.pauseInvisible.getHiddenProp();if(e){var t=e.replace(/[H|h]idden/,"")+"visibilitychange";document.addEventListener(t,function(){f.pauseInvisible.isHidden()?n.startTimeout?clearTimeout(n.startTimeout):n.pause():n.started?n.play():n.vars.initDelay>0?setTimeout(n.play,n.vars.initDelay):n.play()})}},isHidden:function(){var e=f.pauseInvisible.getHiddenProp();return e?document[e]:!1},getHiddenProp:function(){var e=["webkit","moz","ms","o"];if("hidden"in document)return"hidden";for(var t=0;t<e.length;t++)if(e[t]+"Hidden"in document)return e[t]+"Hidden";return null}},setToClearWatchedEvent:function(){clearTimeout(c),c=setTimeout(function(){l=""},3e3)}},n.flexAnimate=function(e,t,a,s,o){if(n.vars.animationLoop||e===n.currentSlide||(n.direction=e>n.currentSlide?"next":"prev"),m&&1===n.pagingCount&&(n.direction=n.currentItem<e?"next":"prev"),!n.animating&&(n.canAdvance(e,o)||a)&&n.is(":visible")){if(m&&s){var l=$(n.vars.asNavFor).data("flexslider");if(n.atEnd=0===e||e===n.count-1,l.flexAnimate(e,!0,!1,!0,o),n.direction=n.currentItem<e?"next":"prev",l.direction=n.direction,Math.ceil((e+1)/n.visible)-1===n.currentSlide||0===e)return n.currentItem=e,n.slides.removeClass(i+"active-slide").eq(e).addClass(i+"active-slide"),!1;n.currentItem=e,n.slides.removeClass(i+"active-slide").eq(e).addClass(i+"active-slide"),e=Math.floor(e/n.visible)}if(n.animating=!0,n.animatingTo=e,t&&n.pause(),n.vars.before(n),n.syncExists&&!o&&f.sync("animate"),n.vars.controlNav&&f.controlNav.active(),v||n.slides.removeClass(i+"active-slide").eq(e).addClass(i+"active-slide"),n.atEnd=0===e||e===n.last,n.vars.directionNav&&f.directionNav.update(),e===n.last&&(n.vars.end(n),n.vars.animationLoop||n.pause()),p)r?(n.slides.eq(n.currentSlide).css({opacity:0,zIndex:1}),n.slides.eq(e).css({opacity:1,zIndex:2}),n.wrapup(c)):(n.slides.eq(n.currentSlide).css({zIndex:1}).animate({opacity:0},n.vars.animationSpeed,n.vars.easing),n.slides.eq(e).css({zIndex:2}).animate({opacity:1},n.vars.animationSpeed,n.vars.easing,n.wrapup));else{var c=d?n.slides.filter(":first").height():n.computedW,g,h,S;v?(g=n.vars.itemMargin,S=(n.itemW+g)*n.move*n.animatingTo,h=S>n.limit&&1!==n.visible?n.limit:S):h=0===n.currentSlide&&e===n.count-1&&n.vars.animationLoop&&"next"!==n.direction?u?(n.count+n.cloneOffset)*c:0:n.currentSlide===n.last&&0===e&&n.vars.animationLoop&&"prev"!==n.direction?u?0:(n.count+1)*c:u?(n.count-1-e+n.cloneOffset)*c:(e+n.cloneOffset)*c,n.setProps(h,"",n.vars.animationSpeed),n.transitions?(n.vars.animationLoop&&n.atEnd||(n.animating=!1,n.currentSlide=n.animatingTo),n.container.unbind("webkitTransitionEnd transitionend"),n.container.bind("webkitTransitionEnd transitionend",function(){clearTimeout(n.ensureAnimationEnd),n.wrapup(c)}),clearTimeout(n.ensureAnimationEnd),n.ensureAnimationEnd=setTimeout(function(){n.wrapup(c)},n.vars.animationSpeed+100)):n.container.animate(n.args,n.vars.animationSpeed,n.vars.easing,function(){n.wrapup(c)})}n.vars.smoothHeight&&f.smoothHeight(n.vars.animationSpeed)}},n.wrapup=function(e){p||v||(0===n.currentSlide&&n.animatingTo===n.last&&n.vars.animationLoop?n.setProps(e,"jumpEnd"):n.currentSlide===n.last&&0===n.animatingTo&&n.vars.animationLoop&&n.setProps(e,"jumpStart")),n.animating=!1,n.currentSlide=n.animatingTo,n.vars.after(n)},n.animateSlides=function(){!n.animating&&e&&n.flexAnimate(n.getTarget("next"))},n.pause=function(){clearInterval(n.animatedSlides),n.animatedSlides=null,n.playing=!1,n.vars.pausePlay&&f.pausePlay.update("play"),n.syncExists&&f.sync("pause")},n.play=function(){n.playing&&clearInterval(n.animatedSlides),n.animatedSlides=n.animatedSlides||setInterval(n.animateSlides,n.vars.slideshowSpeed),n.started=n.playing=!0,n.vars.pausePlay&&f.pausePlay.update("pause"),n.syncExists&&f.sync("play")},n.stop=function(){n.pause(),n.stopped=!0},n.canAdvance=function(e,t){var a=m?n.pagingCount-1:n.last;return t?!0:m&&n.currentItem===n.count-1&&0===e&&"prev"===n.direction?!0:m&&0===n.currentItem&&e===n.pagingCount-1&&"next"!==n.direction?!1:e!==n.currentSlide||m?n.vars.animationLoop?!0:n.atEnd&&0===n.currentSlide&&e===a&&"next"!==n.direction?!1:n.atEnd&&n.currentSlide===a&&0===e&&"next"===n.direction?!1:!0:!1},n.getTarget=function(e){return n.direction=e,"next"===e?n.currentSlide===n.last?0:n.currentSlide+1:0===n.currentSlide?n.last:n.currentSlide-1},n.setProps=function(e,t,a){var i=function(){var a=e?e:(n.itemW+n.vars.itemMargin)*n.move*n.animatingTo,i=function(){if(v)return"setTouch"===t?e:u&&n.animatingTo===n.last?0:u?n.limit-(n.itemW+n.vars.itemMargin)*n.move*n.animatingTo:n.animatingTo===n.last?n.limit:a;switch(t){case"setTotal":return u?(n.count-1-n.currentSlide+n.cloneOffset)*e:(n.currentSlide+n.cloneOffset)*e;case"setTouch":return u?e:e;case"jumpEnd":return u?e:n.count*e;case"jumpStart":return u?n.count*e:e;default:return e}}();return-1*i+"px"}();n.transitions&&(i=d?"translate3d(0,"+i+",0)":"translate3d("+i+",0,0)",a=void 0!==a?a/1e3+"s":"0s",n.container.css("-"+n.pfx+"-transition-duration",a),n.container.css("transition-duration",a)),n.args[n.prop]=i,(n.transitions||void 0===a)&&n.container.css(n.args),n.container.css("transform",i)},n.setup=function(e){if(p)n.slides.css({width:"100%","float":"left",marginRight:"-100%",position:"relative"}),"init"===e&&(r?n.slides.css({opacity:0,display:"block",webkitTransition:"opacity "+n.vars.animationSpeed/1e3+"s ease",zIndex:1}).eq(n.currentSlide).css({opacity:1,zIndex:2}):0==n.vars.fadeFirstSlide?n.slides.css({opacity:0,display:"block",zIndex:1}).eq(n.currentSlide).css({zIndex:2}).css({opacity:1}):n.slides.css({opacity:0,display:"block",zIndex:1}).eq(n.currentSlide).css({zIndex:2}).animate({opacity:1},n.vars.animationSpeed,n.vars.easing)),n.vars.smoothHeight&&f.smoothHeight();else{var t,a;"init"===e&&(n.viewport=$('<div class="'+i+'viewport"></div>').css({overflow:"hidden",position:"relative"}).appendTo(n).append(n.container),n.cloneCount=0,n.cloneOffset=0,u&&(a=$.makeArray(n.slides).reverse(),n.slides=$(a),n.container.empty().append(n.slides))),n.vars.animationLoop&&!v&&(n.cloneCount=2,n.cloneOffset=1,"init"!==e&&n.container.find(".clone").remove(),n.container.append(f.uniqueID(n.slides.first().clone().addClass("clone")).attr("aria-hidden","true")).prepend(f.uniqueID(n.slides.last().clone().addClass("clone")).attr("aria-hidden","true"))),n.newSlides=$(n.vars.selector,n),t=u?n.count-1-n.currentSlide+n.cloneOffset:n.currentSlide+n.cloneOffset,d&&!v?(n.container.height(200*(n.count+n.cloneCount)+"%").css("position","absolute").width("100%"),setTimeout(function(){n.newSlides.css({display:"block"}),n.doMath(),n.viewport.height(n.h),n.setProps(t*n.h,"init")},"init"===e?100:0)):(n.container.width(200*(n.count+n.cloneCount)+"%"),n.setProps(t*n.computedW,"init"),setTimeout(function(){n.doMath(),n.newSlides.css({width:n.computedW,marginRight:n.computedM,"float":"left",display:"block"}),n.vars.smoothHeight&&f.smoothHeight()},"init"===e?100:0))}v||n.slides.removeClass(i+"active-slide").eq(n.currentSlide).addClass(i+"active-slide"),n.vars.init(n)},n.doMath=function(){var e=n.slides.first(),t=n.vars.itemMargin,a=n.vars.minItems,i=n.vars.maxItems;n.w=void 0===n.viewport?n.width():n.viewport.width(),n.h=e.height(),n.boxPadding=e.outerWidth()-e.width(),v?(n.itemT=n.vars.itemWidth+t,n.itemM=t,n.minW=a?a*n.itemT:n.w,n.maxW=i?i*n.itemT-t:n.w,n.itemW=n.minW>n.w?(n.w-t*(a-1))/a:n.maxW<n.w?(n.w-t*(i-1))/i:n.vars.itemWidth>n.w?n.w:n.vars.itemWidth,n.visible=Math.floor(n.w/n.itemW),n.move=n.vars.move>0&&n.vars.move<n.visible?n.vars.move:n.visible,n.pagingCount=Math.ceil((n.count-n.visible)/n.move+1),n.last=n.pagingCount-1,n.limit=1===n.pagingCount?0:n.vars.itemWidth>n.w?n.itemW*(n.count-1)+t*(n.count-1):(n.itemW+t)*n.count-n.w-t):(n.itemW=n.w,n.itemM=t,n.pagingCount=n.count,n.last=n.count-1),n.computedW=n.itemW-n.boxPadding,n.computedM=n.itemM},n.update=function(e,t){n.doMath(),v||(e<n.currentSlide?n.currentSlide+=1:e<=n.currentSlide&&0!==e&&(n.currentSlide-=1),n.animatingTo=n.currentSlide),n.vars.controlNav&&!n.manualControls&&("add"===t&&!v||n.pagingCount>n.controlNav.length?f.controlNav.update("add"):("remove"===t&&!v||n.pagingCount<n.controlNav.length)&&(v&&n.currentSlide>n.last&&(n.currentSlide-=1,n.animatingTo-=1),f.controlNav.update("remove",n.last))),n.vars.directionNav&&f.directionNav.update()},n.addSlide=function(e,t){var a=$(e);n.count+=1,n.last=n.count-1,d&&u?void 0!==t?n.slides.eq(n.count-t).after(a):n.container.prepend(a):void 0!==t?n.slides.eq(t).before(a):n.container.append(a),n.update(t,"add"),n.slides=$(n.vars.selector+":not(.clone)",n),n.setup(),n.vars.added(n)},n.removeSlide=function(e){var t=isNaN(e)?n.slides.index($(e)):e;n.count-=1,n.last=n.count-1,isNaN(e)?$(e,n.slides).remove():d&&u?n.slides.eq(n.last).remove():n.slides.eq(e).remove(),n.doMath(),n.update(t,"remove"),n.slides=$(n.vars.selector+":not(.clone)",n),n.setup(),n.vars.removed(n)},f.init()},$(window).blur(function(t){e=!1}).focus(function(t){e=!0}),$.flexslider.defaults={namespace:"flex-",selector:".slides > li",animation:"fade",easing:"swing",direction:"horizontal",reverse:!1,animationLoop:!0,smoothHeight:!1,startAt:0,slideshow:!0,slideshowSpeed:7e3,animationSpeed:600,initDelay:0,randomize:!1,fadeFirstSlide:!0,thumbCaptions:!1,pauseOnAction:!0,pauseOnHover:!1,pauseInvisible:!0,useCSS:!0,touch:!0,video:!1,controlNav:!0,directionNav:!0,prevText:"Previous",nextText:"Next",keyboard:!0,multipleKeyboard:!1,mousewheel:!1,pausePlay:!1,pauseText:"Pause",playText:"Play",controlsContainer:"",manualControls:"",customDirectionNav:"",sync:"",asNavFor:"",itemWidth:0,itemMargin:0,minItems:1,maxItems:0,move:0,allowOneSlide:!0,start:function(){},before:function(){},after:function(){},end:function(){},added:function(){},removed:function(){},init:function(){}},$.fn.flexslider=function(e){if(void 0===e&&(e={}),"object"==typeof e)return this.each(function(){var t=$(this),a=e.selector?e.selector:".slides > li",n=t.find(a);1===n.length&&e.allowOneSlide===!1||0===n.length?(n.fadeIn(400),e.start&&e.start(t)):void 0===t.data("flexslider")&&new $.flexslider(this,e)});var t=$(this).data("flexslider");switch(e){case"play":t.play();break;case"pause":t.pause();break;case"stop":t.stop();break;case"next":t.flexAnimate(t.getTarget("next"),!0);break;case"prev":case"previous":t.flexAnimate(t.getTarget("prev"),!0);break;default:"number"==typeof e&&t.flexAnimate(e,!0)}}}(jQuery);
 /*!
  * headroom.js v0.7.0 - Give your page some headroom. Hide your header until you need it
  * Copyright (c) 2014 Nick Williams - http://wicky.nillia.ms/headroom.js
  * License: MIT
  */

 (function(window, document) {

   'use strict';

   /* exported features */

   var features = {
     bind : !!(function(){}.bind),
     classList : 'classList' in document.documentElement,
     rAF : !!(window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame)
   };
   window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

   /**
    * Handles debouncing of events via requestAnimationFrame
    * @see http://www.html5rocks.com/en/tutorials/speed/animations/
    * @param {Function} callback The callback to handle whichever event
    */
   function Debouncer (callback) {
     this.callback = callback;
     this.ticking = false;
   }
   Debouncer.prototype = {
     constructor : Debouncer,

     /**
      * dispatches the event to the supplied callback
      * @private
      */
     update : function() {
       this.callback && this.callback();
       this.ticking = false;
     },

     /**
      * ensures events don't get stacked
      * @private
      */
     requestTick : function() {
       if(!this.ticking) {
         requestAnimationFrame(this.rafCallback || (this.rafCallback = this.update.bind(this)));
         this.ticking = true;
       }
     },

     /**
      * Attach this as the event listeners
      */
     handleEvent : function() {
       this.requestTick();
     }
   };
   /**
    * Check if object is part of the DOM
    * @constructor
    * @param {Object} obj element to check
    */
   function isDOMElement(obj) {
     return obj && typeof window !== 'undefined' && (obj === window || obj.nodeType);
   }

   /**
    * Helper function for extending objects
    */
   function extend (object /*, objectN ... */) {
     if(arguments.length <= 0) {
       throw new Error('Missing arguments in extend function');
     }

     var result = object || {},
         key,
         i;

     for (i = 1; i < arguments.length; i++) {
       var replacement = arguments[i] || {};

       for (key in replacement) {
         // Recurse into object except if the object is a DOM element
         if(typeof result[key] === 'object' && ! isDOMElement(result[key])) {
           result[key] = extend(result[key], replacement[key]);
         }
         else {
           result[key] = result[key] || replacement[key];
         }
       }
     }

     return result;
   }

   /**
    * Helper function for normalizing tolerance option to object format
    */
   function normalizeTolerance (t) {
     return t === Object(t) ? t : { down : t, up : t };
   }

   /**
    * UI enhancement for fixed headers.
    * Hides header when scrolling down
    * Shows header when scrolling up
    * @constructor
    * @param {DOMElement} elem the header element
    * @param {Object} options options for the widget
    */
   function Headroom (elem, options) {
     options = extend(options, Headroom.options);

     this.lastKnownScrollY = 0;
     this.elem             = elem;
     this.debouncer        = new Debouncer(this.update.bind(this));
     this.tolerance        = normalizeTolerance(options.tolerance);
     this.classes          = options.classes;
     this.offset           = options.offset;
     this.scroller         = options.scroller;
     this.initialised      = false;
     this.onPin            = options.onPin;
     this.onUnpin          = options.onUnpin;
     this.onTop            = options.onTop;
     this.onNotTop         = options.onNotTop;
   }
   Headroom.prototype = {
     constructor : Headroom,

     /**
      * Initialises the widget
      */
     init : function() {
       if(!Headroom.cutsTheMustard) {
         return;
       }

       this.elem.classList.add(this.classes.initial);

       // defer event registration to handle browser
       // potentially restoring previous scroll position
       setTimeout(this.attachEvent.bind(this), 100);

       return this;
     },

     /**
      * Unattaches events and removes any classes that were added
      */
     destroy : function() {
       var classes = this.classes;

       this.initialised = false;
       this.elem.classList.remove(classes.unpinned, classes.pinned, classes.top, classes.initial);
       this.scroller.removeEventListener('scroll', this.debouncer, false);
     },

     /**
      * Attaches the scroll event
      * @private
      */
     attachEvent : function() {
       if(!this.initialised){
         this.lastKnownScrollY = this.getScrollY();
         this.initialised = true;
         this.scroller.addEventListener('scroll', this.debouncer, false);

         this.debouncer.handleEvent();
       }
     },

     /**
      * Unpins the header if it's currently pinned
      */
     unpin : function() {
       var classList = this.elem.classList,
         classes = this.classes;

       if(classList.contains(classes.pinned) || !classList.contains(classes.unpinned)) {
         classList.add(classes.unpinned);
         classList.remove(classes.pinned);
         this.onUnpin && this.onUnpin.call(this);
       }
     },

     /**
      * Pins the header if it's currently unpinned
      */
     pin : function() {
       var classList = this.elem.classList,
         classes = this.classes;

       if(classList.contains(classes.unpinned)) {
         classList.remove(classes.unpinned);
         classList.add(classes.pinned);
         this.onPin && this.onPin.call(this);
       }
     },

     /**
      * Handles the top states
      */
     top : function() {
       var classList = this.elem.classList,
         classes = this.classes;

       if(!classList.contains(classes.top)) {
         classList.add(classes.top);
         classList.remove(classes.notTop);
         this.onTop && this.onTop.call(this);
       }
     },

     /**
      * Handles the not top state
      */
     notTop : function() {
       var classList = this.elem.classList,
         classes = this.classes;

       if(!classList.contains(classes.notTop)) {
         classList.add(classes.notTop);
         classList.remove(classes.top);
         this.onNotTop && this.onNotTop.call(this);
       }
     },

     /**
      * Gets the Y scroll position
      * @see https://developer.mozilla.org/en-US/docs/Web/API/Window.scrollY
      * @return {Number} pixels the page has scrolled along the Y-axis
      */
     getScrollY : function() {
       return (this.scroller.pageYOffset !== undefined)
         ? this.scroller.pageYOffset
         : (this.scroller.scrollTop !== undefined)
           ? this.scroller.scrollTop
           : (document.documentElement || document.body.parentNode || document.body).scrollTop;
     },

     /**
      * Gets the height of the viewport
      * @see http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript
      * @return {int} the height of the viewport in pixels
      */
     getViewportHeight : function () {
       return window.innerHeight
         || document.documentElement.clientHeight
         || document.body.clientHeight;
     },

     /**
      * Gets the height of the document
      * @see http://james.padolsey.com/javascript/get-document-height-cross-browser/
      * @return {int} the height of the document in pixels
      */
     getDocumentHeight : function () {
       var body = document.body,
         documentElement = document.documentElement;

       return Math.max(
         body.scrollHeight, documentElement.scrollHeight,
         body.offsetHeight, documentElement.offsetHeight,
         body.clientHeight, documentElement.clientHeight
       );
     },

     /**
      * Gets the height of the DOM element
      * @param  {Object}  elm the element to calculate the height of which
      * @return {int}     the height of the element in pixels
      */
     getElementHeight : function (elm) {
       return Math.max(
         elm.scrollHeight,
         elm.offsetHeight,
         elm.clientHeight
       );
     },

     /**
      * Gets the height of the scroller element
      * @return {int} the height of the scroller element in pixels
      */
     getScrollerHeight : function () {
       return (this.scroller === window || this.scroller === document.body)
         ? this.getDocumentHeight()
         : this.getElementHeight(this.scroller);
     },

     /**
      * determines if the scroll position is outside of document boundaries
      * @param  {int}  currentScrollY the current y scroll position
      * @return {bool} true if out of bounds, false otherwise
      */
     isOutOfBounds : function (currentScrollY) {
       var pastTop  = currentScrollY < 0,
         pastBottom = currentScrollY + this.getViewportHeight() > this.getScrollerHeight();

       return pastTop || pastBottom;
     },

     /**
      * determines if the tolerance has been exceeded
      * @param  {int} currentScrollY the current scroll y position
      * @return {bool} true if tolerance exceeded, false otherwise
      */
     toleranceExceeded : function (currentScrollY, direction) {
       return Math.abs(currentScrollY-this.lastKnownScrollY) >= this.tolerance[direction];
     },

     /**
      * determine if it is appropriate to unpin
      * @param  {int} currentScrollY the current y scroll position
      * @param  {bool} toleranceExceeded has the tolerance been exceeded?
      * @return {bool} true if should unpin, false otherwise
      */
     shouldUnpin : function (currentScrollY, toleranceExceeded) {
       var scrollingDown = currentScrollY > this.lastKnownScrollY,
         pastOffset = currentScrollY >= this.offset;

       return scrollingDown && pastOffset && toleranceExceeded;
     },

     /**
      * determine if it is appropriate to pin
      * @param  {int} currentScrollY the current y scroll position
      * @param  {bool} toleranceExceeded has the tolerance been exceeded?
      * @return {bool} true if should pin, false otherwise
      */
     shouldPin : function (currentScrollY, toleranceExceeded) {
       var scrollingUp  = currentScrollY < this.lastKnownScrollY,
         pastOffset = currentScrollY <= this.offset;

       return (scrollingUp && toleranceExceeded) || pastOffset;
     },

     /**
      * Handles updating the state of the widget
      */
     update : function() {
       var currentScrollY  = this.getScrollY(),
         scrollDirection = currentScrollY > this.lastKnownScrollY ? 'down' : 'up',
         toleranceExceeded = this.toleranceExceeded(currentScrollY, scrollDirection);

       if(this.isOutOfBounds(currentScrollY)) { // Ignore bouncy scrolling in OSX
         return;
       }

       if (currentScrollY <= this.offset ) {
         this.top();
       } else {
         this.notTop();
       }

       if(this.shouldUnpin(currentScrollY, toleranceExceeded)) {
         this.unpin();
       }
       else if(this.shouldPin(currentScrollY, toleranceExceeded)) {
         this.pin();
       }

       this.lastKnownScrollY = currentScrollY;
     }
   };
   /**
    * Default options
    * @type {Object}
    */
   Headroom.options = {
     tolerance : {
       up : 0,
       down : 0
     },
     offset : 0,
     scroller: window,
     classes : {
       pinned : 'headroom--pinned',
       unpinned : 'headroom--unpinned',
       top : 'headroom--top',
       notTop : 'headroom--not-top',
       initial : 'headroom'
     }
   };
   Headroom.cutsTheMustard = typeof features !== 'undefined' && features.rAF && features.bind && features.classList;

   window.Headroom = Headroom;

 }(window, document));
