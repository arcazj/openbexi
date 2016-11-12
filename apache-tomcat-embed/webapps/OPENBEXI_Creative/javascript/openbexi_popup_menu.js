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

var ie5 = (document.getElementById && document.all);
var n6 = (document.getElementById && !document.all);
var fade_index = 15;

var openbexi_popup_menu = function(name) {
    //openbexi_popup_menu properties
    this.name = name;
    this.id = name;
    this.x = "0px";
    this.y = "0px";
    this.maxItems = 10;
    this.posCurrentItem = 0;
    this.type = "openbexi_popup_menu";
    if (document.getElementById(name) == null) {
        if (ie5)
            document.body.innerHTML = document.body.innerHTML + "<DIV align=center onclick=\'openbexi_stopEventPropagation(event)\' class=" + name + " id=" + name + "></DIV>";
        else
            document.body.innerHTML = document.body.innerHTML + "<DIV align=center onmousedown=\'openbexi_stopEventPropagation(event)\' class=" + name + " id=" + name + "></DIV>";
        this.menu = document.getElementById(name);
        return this;
    }
};
openbexi_popup_menu.prototype.addItemMenu = function(menuitemId, fnc, text) {
    if (ie5)
        document.getElementById(this.id).innerHTML = document.getElementById(this.id).innerHTML + '<A id=' + menuitemId + ' class=menuitem onclick=\'' + fnc + '\' href="javascript:void(0);">' + text + '</A>';
    else
        document.getElementById(this.id).innerHTML = document.getElementById(this.id).innerHTML + '<A id=' + menuitemId + ' class=menuitem onmousedown=\'' + fnc + '\' href="javascript:void(0);">' + text + '</A>';

};
openbexi_popup_menu.prototype.addNextPreviousItemMenu = function(menuitemId, previousfnc, nextFnc) {
    if (ie5)
        document.getElementById(this.id).innerHTML = document.getElementById(this.id).innerHTML + '<table style="width:100%;height:100%;"><tr><td  style="width:50%;"><A style="text-align: center;cursor:pointer;border:1px solid green;" align=center id=' + menuitemId + '1 class=menuitem onclick=\'' + previousfnc + '\' href="javascript:void(0);">' + "previous" + '</A></td><td  ><A style="text-align: center;cursor:pointer;border:1px solid green;" align=center id=' + menuitemId + '2 class=menuitem onclick=\'' + nextFnc + '\' href="javascript:void(0);">' + "next" + '</A></td></tr></table>';
    else
        document.getElementById(this.id).innerHTML = document.getElementById(this.id).innerHTML + '<table style="width:100%;height:100%;"><tr><td  style="width:50%;"><A style="text-align: center;cursor:pointer;border:1px solid green;" align=center id=' + menuitemId + '1 class=menuitem onmousedown=\'' + previousfnc + '\' href="javascript:void(0);">' + "previous" + '</A></td><td  ><A style="text-align: center;cursor:pointer;border:1px solid green;" align=center id=' + menuitemId + '2 class=menuitem onmousedown=\'' + nextFnc + '\' href="javascript:void(0);">' + "next" + '</A></td></tr></table>';

};
openbexi_popup_menu.prototype.addCloseItemMenu = function(menuitemId, fnc) {
    if (ie5)
        document.getElementById(this.id).innerHTML = document.getElementById(this.id).innerHTML + '<table style="width:100%;height:100%;"><tr><td  style="width:100%;"><A style="text-align: center;cursor:pointer;border:1px solid green;" align=center id=' + menuitemId + ' class=menuitem onclick=\'' + fnc + '\' href="javascript:void(0);">' + "close" + '</A></td></tr></table>';
    else
        document.getElementById(this.id).innerHTML = document.getElementById(this.id).innerHTML + '<table style="width:100%;height:100%;"><tr><td  style="width:100%;"><A style="text-align: center;cursor:pointer;border:1px solid green;" align=center id=' + menuitemId + ' class=menuitem onmousedown=\'' + fnc + '\' href="javascript:void(0);">' + "close" + '</A></td></tr></table>';
    //__openbexi_debugC("addCloseItemMenu", menuitemId + "\n" + fnc + "\ndocument.getElementById(this.id).innerHTML");
};
openbexi_popup_menu.prototype.addSep = function(e, sepId) {
    if (ie5)
        document.getElementById(this.id).innerHTML = document.getElementById(this.id).innerHTML + '<hr ' + sepId + 'class=seperator></hr>';
    else
        document.getElementById(this.id).innerHTML = document.getElementById(this.id).innerHTML + '<hr ' + sepId + 'class=seperator></hr>';

};
openbexi_popup_menu.prototype.removeItemMenu = function(itemMenu) {
    var child = document.getElementById(itemMenu);
    if (child != null) {
        document.getElementById(this.id).removeChild(child);
    }
};
openbexi_popup_menu.prototype.removeAllItemMenu = function() {
    document.getElementById(this.id).innerHTML = '';
};
openbexi_popup_menu.prototype.hideMenu = function(e) {
    if (e)openbexi_stopEventPropagation(e);
    document.getElementById(this.id).style.visibility = "hidden";
    //__openbexi_debugC("openbexi_popup_menu.prototype.hideMenu", e);
};
openbexi_popup_menu.prototype.showMenu = function(event, popupId) {
    //document.getElementById("pageNameImput").value=n6 +"   "+ event.which;
    //if (getBrowser() != "ie")   return;
    var popup;
    fade_index = 15;
    if (document.getElementById("divHelp") != null) document.getElementById("divHelp").style.visibility = "hidden";
    if (document.getElementById) {
        popup = document.getElementById(popupId);
        //var str = "ie5=" + ie5 + " n6=" + n6 + " event.type=" + event.type + "\nevent.which=" + event.which + "\nevent.target=" + event.target;
        //__openbexi_debugC("openbexi_popup_menu.prototype.showMenu", str);
        if ((ie5 && event.type == "contextmenu") || (n6 && event.which == 3)) {
            popup.style.visibility = "visible";
            popup.style.left = parseInt(event.clientX) + "px";
            popup.style.top = parseInt(event.clientY) + "px";
            openbexi_removeFocus();
            fadeIn(popupId);
            document.getElementById(popupId).style.zIndex = 99999;
            return false;
        }
        if ((ie5 && event.type == "click") || (n6 && event.which == 1 && event.target.Contains != undefined && !event.target.Contains("javascript"))) {
            popup.style.visibility = "hidden";
            // Reset previous zIndex
            popup.style.zIndex = openbexi_reset_all_z(null, null);
            fade_index = 0;
            return false;
        }
    }
};
openbexi_popup_menu.prototype.showMenu3 = function(event, popupId, width, fade, mouse_x, mouse_y) {
    //if (getBrowser() != "ie")   return;
    var x,y,popup;
    fade_index = 25;
    x = "0px";
    y = "0px";
    if (event == null || event == undefined) {
        if (mouse_x == null || mouse_x == "")
            x = "0px";
        else
            x = mouse_x;
        if (mouse_y == null || mouse_y == "")
            y = "0px";
        else
            y = mouse_y;
    } else {
        if (n6) {
            x = parseInt(event.clientX) + "px";
            y = parseInt(event.clientY) + "px";
        } else {
            x = parseInt(window.event.clientX) + "px";
            y = parseInt(window.event.clientY) + "px";
        }
    }
    popup = document.getElementById(popupId);
    popup.style.visibility = "visible";
    popup.style.left = x;
    popup.style.top = y;
    popup.style.width = "260px";
    popup.style.border = "1px solid green";
    popup.style.zIndex = 9999;
    //popup.style.border = "none";
    if (fade)
        fadeIn(popupId);
    else {
        fade_index = 92;
        if (ie5) {
            popup.filters.alpha.opacity = fade_index;
        }
        if (n6) {
            popup.style.MozOpacity = fade_index / 100;
        }
    }
    document.getElementById(popupId).style.zIndex = 99999;
    //__openbexi_debugC("openbexi_popup_menu.prototype.showMenu3",popup.innerHTML )
    return false;
};

document.oncontextmenu = new Function("return false");

function fadeIn(popupId) {
    var popup = document.getElementById(popupId);
    popup.style.visibility = "visible";
    if (ie5 || n6) {
        if (ie5) {
            popup.filters.alpha.opacity = fade_index;
        }
        if (n6) {
            popup.style.MozOpacity = fade_index / 100;
        }
        fade_index += 21;
        goIn = setTimeout(function() {
            fadeIn(popupId);
        }, 25);
        if (fade_index >= 99) {
            clearTimeout(goIn);
            //document.getElementById("popup_menu0").focus();
        }
    }
}
;


