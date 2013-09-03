/**
 * @preserve jquery.fullscreen 1.1.4
 * https://github.com/kayahr/jquery-fullscreen-plugin
 * Copyright (C) 2012 Klaus Reimer <k@ailis.de>
 * Licensed under the MIT license
 * (See http://www.opensource.org/licenses/mit-license)
 */

 
(function() {

/**
 * Sets or gets the fullscreen state.
 * 
 * @param {boolean=} state
 *            True to enable fullscreen mode, false to disable it. If not
 *            specified then the current fullscreen state is returned.
 * @return {boolean|Element|jQuery|null}
 *            When querying the fullscreen state then the current fullscreen
 *            element (or true if browser doesn't support it) is returned
 *            when browser is currently in full screen mode. False is returned
 *            if browser is not in full screen mode. Null is returned if 
 *            browser doesn't support fullscreen mode at all. When setting 
 *            the fullscreen state then the current jQuery selection is 
 *            returned for chaining.
 * @this {jQuery}
 */
function fullScreen(state)
{
    var e, func, doc;
    
    // Do nothing when nothing was selected
    if (!this.length) return this;
    
    // We only use the first selected element because it doesn't make sense
    // to fullscreen multiple elements.
    e = (/** @type {Element} */ this[0]);
    
    // Find the real element and the document (Depends on whether the
    // document itself or a HTML element was selected)
    if (e.ownerDocument)
    {
        doc = e.ownerDocument;
    }
    else
    {
        doc = e;
        e = doc.documentElement;
    }
    
    // When no state was specified then return the current state.
    if (state == null)
    {
        // When fullscreen mode is not supported then return null
        if (!((/** @type {?Function} */ doc["cancelFullScreen"])
            || (/** @type {?Function} */ doc["webkitCancelFullScreen"])
            || (/** @type {?Function} */ doc["mozCancelFullScreen"])))
        {
            return null;
        }
        
        // Check fullscreen state
        state = !!doc["fullScreen"]
            || !!doc["webkitIsFullScreen"]
            || !!doc["mozFullScreen"];
        if (!state) return state;
        
        // Return current fullscreen element or "true" if browser doesn't
        // support this
        return (/** @type {?Element} */ doc["fullScreenElement"])
            || (/** @type {?Element} */ doc["webkitCurrentFullScreenElement"])
            || (/** @type {?Element} */ doc["mozFullScreenElement"])
            || state;
    }
    
    // When state was specified then enter or exit fullscreen mode.
    if (state)
    {
        // Enter fullscreen
        func = (/** @type {?Function} */ e["requestFullScreen"])
            || (/** @type {?Function} */ e["webkitRequestFullScreen"])
            || (/** @type {?Function} */ e["mozRequestFullScreen"]);
        if (func) 
        {
            if (Element["ALLOW_KEYBOARD_INPUT"])
                func.call(e, Element["ALLOW_KEYBOARD_INPUT"]);
            else
                func.call(e);
        }
        return this;
    }
    else
    {
        // Exit fullscreen
        func = (/** @type {?Function} */ doc["cancelFullScreen"])
            || (/** @type {?Function} */ doc["webkitCancelFullScreen"])
            || (/** @type {?Function} */ doc["mozCancelFullScreen"]);
        if (func) func.call(doc);
        return this;
    }
}

/**
 * Toggles the fullscreen mode.
 * 
 * @return {!jQuery}
 *            The jQuery selection for chaining.
 * @this {jQuery}
 */
function toggleFullScreen()
{
    return (/** @type {!jQuery} */ fullScreen.call(this, 
        !fullScreen.call(this)));
}

/**
 * Handles the browser-specific fullscreenchange event and triggers
 * a jquery event for it.
 *
 * @param {?Event} event
 *            The fullscreenchange event.
 */
function fullScreenChangeHandler(event)
{
    jQuery(document).trigger(new jQuery.Event("fullscreenchange"));
}

/**
 * Handles the browser-specific fullscreenerror event and triggers
 * a jquery event for it.
 *
 * @param {?Event} event
 *            The fullscreenerror event.
 */
function fullScreenErrorHandler(event)
{
    jQuery(document).trigger(new jQuery.Event("fullscreenerror"));
}

/**
 * Installs the fullscreenchange event handler.
 */
function installFullScreenHandlers()
{
    var e, change, error;
    
    // Determine event name
    e = document;
    if (e["webkitCancelFullScreen"])
    {
        change = "webkitfullscreenchange";
        error = "webkitfullscreenerror";
    }
    else if (e["mozCancelFullScreen"])
    {
        change = "mozfullscreenchange";
        error = "mozfullscreenerror";
    }
    else 
    {
        change = "fullscreenchange";
        error = "fullscreenerror";
    }

    // Install the event handlers
    jQuery(document).bind(change, fullScreenChangeHandler);
    jQuery(document).bind(error, fullScreenErrorHandler);
}

jQuery.fn["fullScreen"] = fullScreen;
jQuery.fn["toggleFullScreen"] = toggleFullScreen;
installFullScreenHandlers();

})();
/*
 * QueryLoader v2 - A simple script to create a preloader for images
 *
 * For instructions read the original post:
 * http://www.gayadesign.com/diy/queryloader2-preload-your-images-with-ease/
 *
 * Copyright (c) 2011 - Gaya Kessler
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Version:  2.3
 * Last update: 13-06-2013
 *
 */

(function($) {
	/*Browser detection patch*/
	jQuery.browser = {};
	jQuery.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
	jQuery.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
	jQuery.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
	jQuery.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());

    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (elt /*, from*/) {
            var len = this.length >>> 0;
            var from = Number(arguments[1]) || 0;
            from = (from < 0)
                ? Math.ceil(from)
                : Math.floor(from);
            if (from < 0)
                from += len;

            for (; from < len; from++) {
                if (from in this &&
                    this[from] === elt)
                    return from;
            }
            return -1;
        };
    }

    var qLimages = [];
    var qLbgimages = [];
    var qLdone = 0;
    var qLdestroyed = false;

    var qLparent = "";
    var qLimageContainer = "";
    var qLoverlay = "";
    var qLbar = "";
    var qLpercentage = "";
    var qLimageCounter = 0;
    var qLstart = 0;

    var qLoptions = {
        onComplete: function () {},
        backgroundColor: "#000",
        barColor: "#fff",
        overlayId: 'qLoverlay',
        barHeight: 1,
        percentage: false,
        deepSearch: true,
        completeAnimation: "fade",
        minimumTime: 500,
        onLoadComplete: function () {
            if (qLoptions.completeAnimation == "grow") {
                var animationTime = 500;
                var currentTime = new Date();
                if ((currentTime.getTime() - qLstart) < qLoptions.minimumTime) {
                    animationTime = (qLoptions.minimumTime - (currentTime.getTime() - qLstart));
                }

                $(qLbar).stop().animate({
                    "width": "100%"
                }, animationTime, function () {
                    $(this).animate({
                        top: "0%",
                        width: "100%",
                        height: "100%"
                    }, 500, function () {
                        $('#'+qLoptions.overlayId).fadeOut(500, function () {
                            $(this).remove();
                            qLoptions.onComplete();
                        })
                    });
                });
            } else {
                $('#'+qLoptions.overlayId).fadeOut(500, function () {
                    $('#'+qLoptions.overlayId).remove();
                    qLoptions.onComplete();
                });
            }
        }
    };

    var afterEach = function (element) {
        //set parent
        qLparent = element;

        //start timer
        qLdestroyed = false;
        var currentTime = new Date();
        qLstart = currentTime.getTime();

        if (qLimages.length > 0) {
            createPreloadContainer();
            createOverlayLoader();
        } else {
            //no images == instant exit
            destroyQueryLoader();
        }
    };

    var createPreloadContainer = function() {
        qLimageContainer = $("<div></div>").appendTo("body").css({
            display: "none",
            width: 0,
            height: 0,
            overflow: "hidden"
        });
        
        for (var i = 0; qLbgimages.length > i; i++) {
            $.ajax({
                url: qLbgimages[i],
                type: 'HEAD',
                complete: function (data) {
                    if (!qLdestroyed) {
                        addImageForPreload(this['url']);
                    }
                }
            });
        }        	

    };

    var addImageForPreload = function(url) {
        var image = $("<img />").attr("src", url).appendTo(qLimageContainer);
        bindLoadEvent(image);
    };

    var bindLoadEvent = function (element) {
        qLimageCounter++;
        element.bind("load error", function () {
            completeImageLoading();
        });
    }

    var completeImageLoading = function () {
        qLdone++;

        var percentage = (qLdone / qLimageCounter) * 100;
        $(qLbar).stop().animate({
            width: percentage + "%",
            minWidth: percentage + "%"
        }, 200);

        if (qLoptions.percentage == true) {
            $(qLpercentage).text(Math.ceil(percentage) + "%");
        }

        if (qLdone == qLimageCounter) {
            destroyQueryLoader();
        }
    };

    var destroyQueryLoader = function () {
        $(qLimageContainer).remove();
        qLdestroyed = true;
        qLoptions.onLoadComplete();
    };

    var createOverlayLoader = function () {
        var overlayPosition = "absolute";
        if (qLparent.prop("tagName") == "BODY") {
            overlayPosition = "fixed";
        } else {
            qLparent.css("position", "relative");
        }

        qLoverlay = $("<div id='"+qLoptions.overlayId+"'></div>").css({
            width: "100%",
            height: "100%",
            backgroundColor: qLoptions.backgroundColor,
            backgroundPosition: "fixed",
            position: overlayPosition,
            zIndex: 666999,
            top: 0,
            left: 0
        }).appendTo(qLparent);
        qLbar = $("<div id='qLbar'></div>").css({
            height: qLoptions.barHeight + "px",
            marginTop: "-" + (qLoptions.barHeight / 2) + "px",
            backgroundColor: qLoptions.barColor,
            width: "0%",
            position: "absolute",
            top: "50%"
        }).appendTo(qLoverlay);
        if (qLoptions.percentage == true) {
            qLpercentage = $("<div id='qLpercentage'></div>").text("0%").css({
                height: "40px",
                width: "100px",
                position: "absolute",
                fontSize: "3em",
                top: "50%",
                left: "50%",
                marginTop: "-" + (59 + qLoptions.barHeight) + "px",
                textAlign: "center",
                marginLeft: "-50px",
                color: qLoptions.barColor
            }).appendTo(qLoverlay);
        }
        if (!qLimages.length) {
        	destroyQueryLoader()
        }
    };

    var findImageInElement = function (element) {
        var url = "";
        var obj = $(element);
        var type = "normal";

        if (obj.css("background-image") != "none") {
            var url = obj.css("background-image");
            var type = "background";
        } else if (typeof(obj.attr("src")) != "undefined" && element.nodeName.toLowerCase() == "img") {
            var url = obj.attr("src");
        }

        if (url.indexOf("gradient") == -1) {
            url = url.replace(/url\(\"/g, "");
            url = url.replace(/url\(/g, "");
            url = url.replace(/\"\)/g, "");
            url = url.replace(/\)/g, "");

            var urls = url.split(", ");

            for (var i = 0; i < urls.length; i++) {
                if (urls[i].length > 0 && qLimages.indexOf(urls[i]) == -1 && !urls[i].match(/^(data:)/i)) {
                    var extra = "";
                    if ($.browser.msie && $.browser.version < 9) {
                        extra = "?" + Math.floor(Math.random() * 3000);

                        qLbgimages.push(urls[i] + extra);
                        qLimages.push(urls[i]);
                    } else {
                        qLimages.push(urls[i]);

                        if (type == "background") {
                            qLbgimages.push(urls[i] + extra);
                        } else {
                            bindLoadEvent(obj);
                        }
                    }
                }
            }
        }
    }

    $.fn.queryLoader2 = function(options) {
        if(options) {
            $.extend(qLoptions, options );
        }

        this.each(function() {
            findImageInElement(this);
            if (qLoptions.deepSearch == true) {
                $(this).find("*:not(script)").each(function() {
                    findImageInElement(this);
                });
            }
        });

        afterEach(this);

        return this;
    };

    //browser detect
    var BrowserDetect = {
        init: function () {
            this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
            this.version = this.searchVersion(navigator.userAgent)
                || this.searchVersion(navigator.appVersion)
                || "an unknown version";
            this.OS = this.searchString(this.dataOS) || "an unknown OS";
        },
        searchString: function (data) {
            for (var i=0;i<data.length;i++)	{
                var dataString = data[i].string;
                var dataProp = data[i].prop;
                this.versionSearchString = data[i].versionSearch || data[i].identity;
                if (dataString) {
                    if (dataString.indexOf(data[i].subString) != -1)
                        return data[i].identity;
                }
                else if (dataProp)
                    return data[i].identity;
            }
        },
        searchVersion: function (dataString) {
            var index = dataString.indexOf(this.versionSearchString);
            if (index == -1) return;
            return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
        },
        dataBrowser: [
            {
                string: navigator.userAgent,
                subString: "Chrome",
                identity: "Chrome"
            },
            { 	string: navigator.userAgent,
                subString: "OmniWeb",
                versionSearch: "OmniWeb/",
                identity: "OmniWeb"
            },
            {
                string: navigator.vendor,
                subString: "Apple",
                identity: "Safari",
                versionSearch: "Version"
            },
            {
                prop: window.opera,
                identity: "Opera",
                versionSearch: "Version"
            },
            {
                string: navigator.vendor,
                subString: "iCab",
                identity: "iCab"
            },
            {
                string: navigator.vendor,
                subString: "KDE",
                identity: "Konqueror"
            },
            {
                string: navigator.userAgent,
                subString: "Firefox",
                identity: "Firefox"
            },
            {
                string: navigator.vendor,
                subString: "Camino",
                identity: "Camino"
            },
            {		// for newer Netscapes (6+)
                string: navigator.userAgent,
                subString: "Netscape",
                identity: "Netscape"
            },
            {
                string: navigator.userAgent,
                subString: "MSIE",
                identity: "Explorer",
                versionSearch: "MSIE"
            },
            {
                string: navigator.userAgent,
                subString: "Gecko",
                identity: "Mozilla",
                versionSearch: "rv"
            },
            { 		// for older Netscapes (4-)
                string: navigator.userAgent,
                subString: "Mozilla",
                identity: "Netscape",
                versionSearch: "Mozilla"
            }
        ],
        dataOS : [
            {
                string: navigator.platform,
                subString: "Win",
                identity: "Windows"
            },
            {
                string: navigator.platform,
                subString: "Mac",
                identity: "Mac"
            },
            {
                string: navigator.userAgent,
                subString: "iPhone",
                identity: "iPhone/iPod"
            },
            {
                string: navigator.platform,
                subString: "Linux",
                identity: "Linux"
            }
        ]

    };
    BrowserDetect.init();
    jQuery.browser.version = BrowserDetect.version;
})(jQuery);
/*!
 * Pause jQuery plugin v0.1
 *
 * Copyright 2010 by Tobia Conforto <tobia.conforto@gmail.com>
 *
 * Based on Pause-resume-animation jQuery plugin by Joe Weitzel
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 2 of the License, or(at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this program; if not, write to the Free Software Foundation, Inc., 51
 * Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 */
/* Changelog:
 *
 * 0.1    2010-06-13  Initial release
 */

(function() {
  var $ = jQuery,
    pauseId = 'jQuery.pause',
    uuid = 1,
    oldAnimate = $.fn.animate,
    anims = {};

  function now() { return new Date().getTime(); }

  $.fn.animate = function(prop, speed, easing, callback) {
    var optall = $.speed(speed, easing, callback);
    optall.complete = optall.old; // unwrap callback
    return this.each(function() {
      // check pauseId
      if (! this[pauseId])
        this[pauseId] = uuid++;
      // start animation
      var opt = $.extend({}, optall);
      oldAnimate.apply($(this), [prop, $.extend({}, opt)]);
      // store data
      anims[this[pauseId]] = {
        run: true,
        prop: prop,
        opt: opt,
        start: now(),
        done: 0
      };
    });
  };

  $.fn.pause = function() {
    return this.each(function() {
      // check pauseId
      if (! this[pauseId])
        this[pauseId] = uuid++;
      // fetch data
      var data = anims[this[pauseId]];
      if (data && data.run) {
        data.done += now() - data.start;
        if (data.done > data.opt.duration) {
          // remove stale entry
          delete anims[this[pauseId]];
        } else {
          // pause animation
          $(this).stop();
          data.run = false;
        }
      }
    });
  };

  $.fn.resume = function() {
    return this.each(function() {
      // check pauseId
      if (! this[pauseId])
        this[pauseId] = uuid++;
      // fetch data
      var data = anims[this[pauseId]];
      if (data && ! data.run) {
        // resume animation
        data.opt.duration -= data.done;
        data.done = 0;
        data.run = true;
        data.start = now();
        oldAnimate.apply($(this), [data.prop, $.extend({}, data.opt)]);
      }
    });
  };
})();
/*! skrollr 0.6.10 (2013-07-30) | Alexander Prinzhorn - https://github.com/Prinzhorn/skrollr | Free to use under terms of MIT license */

(function(e,t,r){"use strict";function n(r){if(o=t.documentElement,a=t.body,M(),ot=this,r=r||{},ct=r.constants||{},r.easing)for(var n in r.easing)U[n]=r.easing[n];dt=r.edgeStrategy||"set",lt={beforerender:r.beforerender,render:r.render},st=r.forceHeight!==!1,st&&(Ft=r.scale||1),ut=r.smoothScrolling!==!1,pt=r.smoothScrollingDuration||A,gt={targetTop:ot.getScrollTop()},qt=(r.mobileCheck||function(){return/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent||navigator.vendor||e.opera)})(),qt?(it=t.getElementById("skrollr-body"),it&&nt(),j(),St(o,[y,S],[T])):St(o,[y,b],[T]),ot.refresh(),ht(e,"resize orientationchange",function(){var e=o.clientWidth,t=o.clientHeight;(t!==zt||e!==Vt)&&(zt=t,Vt=e,Ot=!0)});var i=R();return function l(){X(),i(l)}(),ot}var o,a,i=e.skrollr={get:function(){return ot},init:function(e){return ot||new n(e)},VERSION:"0.6.10"},l=Object.prototype.hasOwnProperty,s=e.Math,c=e.getComputedStyle,f="touchstart",u="touchmove",p="touchcancel",g="touchend",m="skrollable",d=m+"-before",v=m+"-between",h=m+"-after",y="skrollr",T="no-"+y,b=y+"-desktop",S=y+"-mobile",k="linear",w=1e3,x=6e-4,A=200,E="start",F="end",C="center",D="bottom",H="___skrollable_id",V=/^\s+|\s+$/g,z=/^data(?:-(_\w+))?(?:-?(-?\d+))?(?:-?(start|end|top|center|bottom))?(?:-?(top|center|bottom))?$/,O=/\s*([\w\-\[\]]+)\s*:\s*(.+?)\s*(?:;|$)/gi,P=/^([a-z\-]+)\[(\w+)\]$/,q=/-([a-z])/g,I=function(e,t){return t.toUpperCase()},B=/[\-+]?[\d]*\.?[\d]+/g,_=/\{\?\}/g,G=/rgba?\(\s*-?\d+\s*,\s*-?\d+\s*,\s*-?\d+/g,L=/[a-z\-]+-gradient/g,N="",$="",M=function(){var e=/^(?:O|Moz|webkit|ms)|(?:-(?:o|moz|webkit|ms)-)/;if(c){var t=c(a,null);for(var n in t)if(N=n.match(e)||+n==n&&t[n].match(e))break;if(!N)return N=$="",r;N=N[0],"-"===N.slice(0,1)?($=N,N={"-webkit-":"webkit","-moz-":"Moz","-ms-":"ms","-o-":"O"}[N]):$="-"+N.toLowerCase()+"-"}},R=function(){var t=e.requestAnimationFrame||e[N.toLowerCase()+"RequestAnimationFrame"],r=xt();return(qt||!t)&&(t=function(t){var n=xt()-r,o=s.max(0,1e3/60-n);e.setTimeout(function(){r=xt(),t()},o)}),t},U={begin:function(){return 0},end:function(){return 1},linear:function(e){return e},quadratic:function(e){return e*e},cubic:function(e){return e*e*e},swing:function(e){return-s.cos(e*s.PI)/2+.5},sqrt:function(e){return s.sqrt(e)},outCubic:function(e){return s.pow(e-1,3)+1},bounce:function(e){var t;if(.5083>=e)t=3;else if(.8489>=e)t=9;else if(.96208>=e)t=27;else{if(!(.99981>=e))return 1;t=91}return 1-s.abs(3*s.cos(1.028*e*t)/t)}};n.prototype.refresh=function(e){var n,o,a=!1;for(e===r?(a=!0,at=[],Pt=0,e=t.getElementsByTagName("*")):e=[].concat(e),n=0,o=e.length;o>n;n++){var i=e[n],l=i,s=[],c=ut,f=dt;if(i.attributes){for(var u=0,p=i.attributes.length;p>u;u++){var g=i.attributes[u];if("data-anchor-target"!==g.name)if("data-smooth-scrolling"!==g.name)if("data-edge-strategy"!==g.name){var d=g.name.match(z);if(null!==d){var v=d[1];v=v&&ct[v.substr(1)]||0;var h=(0|d[2])+v,y=d[3],T=d[4]||y,b={offset:h,props:g.value,element:i};s.push(b),y&&y!==E&&y!==F?(b.mode="relative",b.anchors=[y,T]):(b.mode="absolute",y===F?b.isEnd=!0:(b.frame=h*Ft,delete b.offset))}}else f=g.value;else c="off"!==g.value;else if(l=t.querySelector(g.value),null===l)throw'Unable to find anchor target "'+g.value+'"'}if(s.length){var S,k,w;!a&&H in i?(w=i[H],S=at[w].styleAttr,k=at[w].classAttr):(w=i[H]=Pt++,S=i.style.cssText,k=bt(i)),at[w]={element:i,styleAttr:S,classAttr:k,anchorTarget:l,keyFrames:s,smoothScrolling:c,edgeStrategy:f},St(i,[m],[])}}}for(yt(),n=0,o=e.length;o>n;n++){var x=at[e[n][H]];x!==r&&(Z(x),K(x))}return ot},n.prototype.relativeToAbsolute=function(e,t,r){var n=o.clientHeight,a=e.getBoundingClientRect(),i=a.top,l=a.bottom-a.top;return t===D?i-=n:t===C&&(i-=n/2),r===D?i+=l:r===C&&(i+=l/2),i+=ot.getScrollTop(),0|i+.5},n.prototype.animateTo=function(e,t){t=t||{};var n=xt(),o=ot.getScrollTop();return ft={startTop:o,topDiff:e-o,targetTop:e,duration:t.duration||w,startTime:n,endTime:n+(t.duration||w),easing:U[t.easing||k],done:t.done},ft.topDiff||(ft.done&&ft.done.call(ot,!1),ft=r),ot},n.prototype.stopAnimateTo=function(){ft&&ft.done&&ft.done.call(ot,!0),ft=r},n.prototype.isAnimatingTo=function(){return!!ft},n.prototype.setScrollTop=function(t,r){return r===!0&&(Dt=t,mt=!0),qt?It=s.min(s.max(t,0),Et):e.scrollTo(0,t),ot},n.prototype.getScrollTop=function(){return qt?It:e.pageYOffset||o.scrollTop||a.scrollTop||0},n.prototype.on=function(e,t){return lt[e]=t,ot},n.prototype.off=function(e){return delete lt[e],ot};var j=function(){var t,n,i,l,c,m,d,v,h,y,T;ht(o,[f,u,p,g].join(" "),function(e){e.preventDefault();var o=e.changedTouches[0];switch(l=o.clientY,c=o.clientX,h=e.timeStamp,e.type){case f:t&&t.blur(),ot.stopAnimateTo(),t=e.target,n=m=l,i=c,v=h;break;case u:d=l-m,T=h-y,ot.setScrollTop(It-d,!0),m=l,y=h;break;default:case p:case g:var a=n-l,b=i-c,S=b*b+a*a;if(49>S)return t.focus(),t.click(),r;t=r;var k=d/T;k=s.max(s.min(k,3),-3);var w=s.abs(k/x),A=k*w+.5*x*w*w,E=ot.getScrollTop()-A,F=0;E>Et?(F=(Et-E)/A,E=Et):0>E&&(F=-E/A,E=0),w*=1-F,ot.animateTo(E,{easing:"outCubic",duration:w})}}),e.scrollTo(0,0),o.style.overflow=a.style.overflow="hidden"},W=function(){var e,t,r,n,o,a,i,l,c;for(l=0,c=at.length;c>l;l++)for(e=at[l],t=e.element,r=e.anchorTarget,n=e.keyFrames,o=0,a=n.length;a>o;o++)i=n[o],"relative"===i.mode&&(rt(t),i.frame=ot.relativeToAbsolute(r,i.anchors[0],i.anchors[1])-i.offset,rt(t,!0)),st&&!i.isEnd&&i.frame>Et&&(Et=i.frame);for(Et=s.max(Et,Tt()),l=0,c=at.length;c>l;l++){for(e=at[l],n=e.keyFrames,o=0,a=n.length;a>o;o++)i=n[o],i.isEnd&&(i.frame=Et-i.offset);e.keyFrames.sort(At)}},Y=function(e,t){for(var r=0,n=at.length;n>r;r++){var o,a,s=at[r],c=s.element,f=s.smoothScrolling?e:t,u=s.keyFrames,p=u[0].frame,g=u[u.length-1].frame,y=p>f,T=f>g,b=u[y?0:u.length-1];if(y||T){if(y&&-1===s.edge||T&&1===s.edge)continue;switch(St(c,[y?d:h],[d,v,h]),s.edge=y?-1:1,s.edgeStrategy){case"reset":rt(c);continue;case"ease":f=b.frame;break;default:case"set":var S=b.props;for(o in S)l.call(S,o)&&(a=tt(S[o].value),i.setStyle(c,o,a));continue}}else 0!==s.edge&&(St(c,[m,v],[d,h]),s.edge=0);for(var k=0,w=u.length-1;w>k;k++)if(f>=u[k].frame&&u[k+1].frame>=f){var x=u[k],A=u[k+1];for(o in x.props)if(l.call(x.props,o)){var E=(f-x.frame)/(A.frame-x.frame);E=x.props[o].easing(E),a=et(x.props[o].value,A.props[o].value,E),a=tt(a),i.setStyle(c,o,a)}break}}},X=function(){Ot&&(Ot=!1,yt());var e,t,n=ot.getScrollTop(),o=xt();if(ft)o>=ft.endTime?(n=ft.targetTop,e=ft.done,ft=r):(t=ft.easing((o-ft.startTime)/ft.duration),n=0|ft.startTop+t*ft.topDiff),ot.setScrollTop(n,!0);else if(!qt){var a=gt.targetTop-n;a&&(gt={startTop:Dt,topDiff:n-Dt,targetTop:n,startTime:Ht,endTime:Ht+pt}),gt.endTime>=o&&(t=U.sqrt((o-gt.startTime)/pt),n=0|gt.startTop+t*gt.topDiff)}if(qt&&it&&i.setStyle(it,"transform","translate(0, "+-It+"px) "+vt),mt||Dt!==n){Ct=n>=Dt?"down":"up",mt=!1;var l={curTop:n,lastTop:Dt,maxTop:Et,direction:Ct},s=lt.beforerender&&lt.beforerender.call(ot,l);s!==!1&&(Y(n,ot.getScrollTop()),Dt=n,lt.render&&lt.render.call(ot,l)),e&&e.call(ot,!1)}Ht=o},Z=function(e){for(var t=0,r=e.keyFrames.length;r>t;t++){for(var n,o,a,i,l=e.keyFrames[t],s={};null!==(i=O.exec(l.props));)a=i[1],o=i[2],n=a.match(P),null!==n?(a=n[1],n=n[2]):n=k,o=o.indexOf("!")?J(o):[o.slice(1)],s[a]={value:o,easing:U[n]};l.props=s}},J=function(e){var t=[];return G.lastIndex=0,e=e.replace(G,function(e){return e.replace(B,function(e){return 100*(e/255)+"%"})}),$&&(L.lastIndex=0,e=e.replace(L,function(e){return $+e})),e=e.replace(B,function(e){return t.push(+e),"{?}"}),t.unshift(e),t},K=function(e){var t,r,n={};for(t=0,r=e.keyFrames.length;r>t;t++)Q(e.keyFrames[t],n);for(n={},t=e.keyFrames.length-1;t>=0;t--)Q(e.keyFrames[t],n)},Q=function(e,t){var r;for(r in t)l.call(e.props,r)||(e.props[r]=t[r]);for(r in e.props)t[r]=e.props[r]},et=function(e,t,r){var n,o=e.length;if(o!==t.length)throw"Can't interpolate between \""+e[0]+'" and "'+t[0]+'"';var a=[e[0]];for(n=1;o>n;n++)a[n]=e[n]+(t[n]-e[n])*r;return a},tt=function(e){var t=1;return _.lastIndex=0,e[0].replace(_,function(){return e[t++]})},rt=function(e,t){e=[].concat(e);for(var r,n,o=0,a=e.length;a>o;o++)n=e[o],r=at[n[H]],r&&(t?(n.style.cssText=r.dirtyStyleAttr,St(n,r.dirtyClassAttr)):(r.dirtyStyleAttr=n.style.cssText,r.dirtyClassAttr=bt(n),n.style.cssText=r.styleAttr,St(n,r.classAttr)))},nt=function(){vt="translateZ(0)",i.setStyle(it,"transform",vt);var e=c(it),t=e.getPropertyValue("transform"),r=e.getPropertyValue($+"transform"),n=t&&"none"!==t||r&&"none"!==r;n||(vt="")};i.setStyle=function(e,t,r){var n=e.style;if(t=t.replace(q,I).replace("-",""),"zIndex"===t)n[t]=""+(0|r);else if("float"===t)n.styleFloat=n.cssFloat=r;else try{N&&(n[N+t.slice(0,1).toUpperCase()+t.slice(1)]=r),n[t]=r}catch(o){}};var ot,at,it,lt,st,ct,ft,ut,pt,gt,mt,dt,vt,ht=i.addEvent=function(t,r,n){var o=function(t){return t=t||e.event,t.target||(t.target=t.srcElement),t.preventDefault||(t.preventDefault=function(){t.returnValue=!1}),n.call(this,t)};r=r.split(" ");for(var a=0,i=r.length;i>a;a++)t.addEventListener?t.addEventListener(r[a],n,!1):t.attachEvent("on"+r[a],o)},yt=function(){var e=ot.getScrollTop();Et=0,st&&!qt&&(a.style.height="auto"),W(),st&&!qt&&(a.style.height=Et+o.clientHeight+"px"),qt?ot.setScrollTop(s.min(ot.getScrollTop(),Et)):ot.setScrollTop(e,!0),mt=!0},Tt=function(){var e=it&&it.offsetHeight||0,t=s.max(e,a.scrollHeight,a.offsetHeight,o.scrollHeight,o.offsetHeight,o.clientHeight);return t-o.clientHeight},bt=function(t){var r="className";return e.SVGElement&&t instanceof e.SVGElement&&(t=t[r],r="baseVal"),t[r]},St=function(t,n,o){var a="className";if(e.SVGElement&&t instanceof e.SVGElement&&(t=t[a],a="baseVal"),o===r)return t[a]=n,r;for(var i=t[a],l=0,s=o.length;s>l;l++)i=wt(i).replace(wt(o[l])," ");i=kt(i);for(var c=0,f=n.length;f>c;c++)-1===wt(i).indexOf(wt(n[c]))&&(i+=" "+n[c]);t[a]=kt(i)},kt=function(e){return e.replace(V,"")},wt=function(e){return" "+e+" "},xt=Date.now||function(){return+new Date},At=function(e,t){return e.frame-t.frame},Et=0,Ft=1,Ct="down",Dt=-1,Ht=xt(),Vt=0,zt=0,Ot=!1,Pt=0,qt=!1,It=0})(window,document);
$('.start').on('click',function (e) {
  e.preventDefault();

  var target = this.hash,
  $target = $(target);

  var $body = $('html, body')
  var $pause = $('.pause')
  var $resume = $('.resume')
  var $back = $('.back')

  $body.stop().animate({
      'scrollTop': $target.offset().top
  }, 90000, 'swing', function () {
      window.location.hash = target;
  });

  $pause.on('click', function(){
    $body.pause();
    $(this).fadeOut();
    $resume.fadeIn();
    return false;
  });

  $resume.on('click', function(){
    $body.resume();
    $(this).fadeOut();
    $pause.fadeIn();
    return false;
  });

  $back.on('click', function(){
    location.relaod(true);
  });


});

// $('.info').on('mouseenter', function(){
//   var data = $(this).attr("data-info");
//   var infoReveal = $('<div id="infoReveal" />')

//   infoReveal.appendTo('#infoBar');
//   infoReveal.html(data);
//   $('#infoBar').stop().fadeIn();

// });

// $('.info').on('mouseleave', function(){
//   var data = $(this).attr("data-info");
//   $("#infoReveal").remove();
//   $('#infoBar').stop().fadeOut();
// })



$('.info').on('mouseenter', function(){
  var infoBoxContent = $(this).attr("data-info");
  var infoClass = $(this).attr('data-class');
  var infoBox = $('<div>').append(infoBoxContent).addClass('infoReveal');
  infoBox.appendTo('#infoBar');
  $("#infoBar").addClass(infoClass);
});
$('.info').on('mouseleave', function(){
  var infoClass = $(this).attr('data-class');
  $("#infoBar").removeClass(infoClass);
  $('.infoReveal').remove();
});


