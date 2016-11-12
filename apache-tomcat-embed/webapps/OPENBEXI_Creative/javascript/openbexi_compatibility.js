/* This notice must be untouched at all times.

Copyright (c) 2005-2013 JC Arcaz. All rights reserved.
 OPEN OPENBEXI HTML Builder for generating dynanic HTML page and html code source from browsers.
updated: September 28 2013 version 5.0
 The latest version is available at http://www.openbexi.com

 This program is free software; you can redistribute it and/or
 modify it under the terms of the GNU General Public License
 as published by the Free Software Foundation; either version 2
 of the License, or (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program; if not, write to the Free Software
 Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

 Note:
 OPEN OPENBEXI htmlbuilder uses dojo Toolkit (http://dojotoolkit.org/).
 OPEN OPENBEXI htmlbuilder uses query.min.js, jquery-ui.min.js, jQueryRotate.js, jquery.ui.touch-punch.min.js, jquery.jsPlumb-1.5.2-min.js, codemirror.js, fabrics.js
 */

function getOpera() {
    if (/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
        return true;
    }
    return false;
}
var ob_browser = null;
function getBrowser() {
    if (ob_browser != null) return ob_browser;
    if (document.layers) {
        ob_browser = "NN4";
        return "NN4";
    }
    if (document.all) {
        if (window.XMLHttpRequest) {
            ob_browser = "ie7";
            return "ie7"
        } else {
            var str = navigator.userAgent;
            // Detect MSIE 6.0 from navigator.userAgent
            if (str.match("MSIE 6.0")) {
                ob_browser = "ie6";
                return "ie6";
            }
            ob_browser = "ie7_no_XMLHttpRequest";
            return "ie7_no_XMLHttpRequest"
        }
    }// Should work for safari too.
    if (!document.all && document.getElementById) {
        ob_browser = "NN6";
        return "NN6";
    }
    alert("getBrowser(): Unknown browser. Please you should use a Firefox or internet explorer browser!");
    ob_browser = "NN6";
    return "NN6";
}
function getMouseY(e) {
    var y = 0;
    if (getBrowser() == "NN6") {
        y = e.pageY;
    } else {
        y = event.clientY + document.body.scrollTop;
    }
    // catch possible negative values in NS4
    if (y < 0) {
        y = 0
    }
    return parseInt(y) + "px";
}
function getMouseX(e) {
    var x = 0;
    if (getBrowser() == "NN6") {
        x = e.pageX;
    } else {
        x = event.clientX;
    }
    // catch possible negative values in NS4
    if (x < 0) {
        x = 0
    }
    return parseInt(x) + "px";
}
function openbexi_opacity(img, opacity) {
    try {
        $(img.id).css({ opacity:opacity });
    } catch  (e) {
    }

}
function openbexi_getWindowWidth() {
    if (getBrowser() == "NN6") {
        return window.innerWidth;
    } else {
        return document.body.offsetWidth;
    }
}
function openbexi_getWindowHeight() {
    if (getBrowser() == "NN6") {
        return window.innerHeight;
    } else {
        return document.body.offsetHeight;
    }
}
function openbexi_getDocumentWidth() {
    if (typeof( window.innerWidth ) == 'number') {
        return parseInt(window.innerWidth);
        //Non-IE
    } else if (document.documentElement && document.documentElement.clientWidth) {
        return parseInt(document.documentElement.clientWidth);
        //IE 6+ in 'standards compliant mode'
    } else if (document.body && ( document.body.clientWidth)) {
        return parseInt(document.body.clientWidth);
        //IE 4 compatible
    }
    alert("getBrowser(): Unknown browser. Please you should use internet explorer!");
    return 0;
}
function openbexi_getDocumentHeight() {
    if (typeof( window.innerHeight ) == 'number') {
        return parseInt(window.innerHeight);
        //Non-IE
    } else if (document.documentElement && document.documentElement.clientHeight) {
        return parseInt(document.documentElement.clientHeight);
        //IE 6+ in 'standards compliant mode'
    } else if (document.body && ( document.body.clientHeight  )) {
        return parseInt(document.body.clientHeight);
        //IE 4 compatible
    }
    alert("getBrowser(): Unknown browser. Please you should use internet explorer!");
    return 0;
}
function openbexi_get_OS() {
    var version = navigator.appVersion;
    if (version.toLowerCase().indexOf("win") != -1) return "windows";
    else if (version.toLowerCase().indexOf("mac") != -1) return "mac";
    else if (version.toLowerCase().indexOf("linux") != -1) return "linux";
        else return "others";
}

// Define there FCKLang,ob_Lang, and openbexi_lang() for HTML page built with a previous version
var FCKLang =
{
}
var ob_Lang =
{
}
