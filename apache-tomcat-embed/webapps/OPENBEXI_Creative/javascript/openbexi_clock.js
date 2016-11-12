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

var ob_plus = "+";
var ob_minus = "-";
var ob_zero = "0";
var ob_none = "none";
var ob_clock_inspectorAttributes = [
    ['editor'        , 'ClockEditor'   , 'true']
];
var ob_clock_popupAttributes = [
    ['menuitem18', 'this.backward();'         , 'SendToBack'  , 'gif\/move_backward_x48.png', '48px', '48px'],
    ['menuitem20', 'this.forward();'          , 'BringToFront', 'gif\/move_forward_x48.png', '48px', '48px'],
    ['menuitem25', 'duplicate_HTMLClock(\'vertical\')', 'Duplicate', 'gif\/copyVertical_x48.png', '48px', '48px'],
    ['menuitem26', 'duplicate_HTMLClock(\'horizontal\')', 'Duplicate', 'gif\/copyHorizontal_x48.png', '48px', '48px'],
    ['menuitem32', 'this.removeObject();openbexiNavigator.update_menu_editor(null, false);'  , 'DlgSelectBtnDelete', 'gif\/clock_delete_x48.png', '48px', '48px'],
    ['sep', null, null, null, null, null]
];
var openbexi_clock = function (bexiObj, obj, name, top, left, width, height) {
    try {
        try {
            __openbexi_debugC("openbexi_clock(" + bexiObj + "," + obj + "," + name + "," + top + "," + left + "," + width + "," + height + ")", "Classe:");
            if (openbexiNavigator)
                this.openbexiNavigator = openbexiNavigator;
            else
                this.openbexiNavigator = new openbexi_navigator();
        } catch (e) {
        }
        this.loading_status = "loaded";
        this.styles_BgImg = null;
        this.name = name;
        this.id = name;
        this.type = "openbexi_clock";

        if (bexiObj == null)
            this.parentNodeId = "BODY";
        else
            this.parentNodeId = bexiObj.id;
        var divobj;
        if (obj == null) {
            divobj = new openbexi_div(bexiObj, obj, name, top, left, width, height);
            this.div = divobj.div;
            this.parent = this.div.id;
            this.div.setAttribute("CLASS", "ob_clock");
            this.div.setAttribute("CLASSE", "DIV_CLOCK");
            this.div.setAttribute("creation_date", new Date());
            this.setData();
        } else {
            divobj = new openbexi_div(bexiObj, obj, obj.id, top, left, width, height);
            this.div = divobj.div;
            this.div.innerHTML = "";
            this.parent = this.div.id;
            this.div.ob_template = obj.getAttribute("ob_template");
            this.div.setAttribute("CLASSE", "DIV_CLOCK");
            this.div.setAttribute("creation_date",  obj.getAttribute("creation_date"));
            this.div.setAttribute("obzindex",  obj.getAttribute("obzindex"));
            this.div.setAttribute("ob_template",  obj.getAttribute("ob_template"));
            this.div.setAttribute("CLASS", "ob_clock");
            this.div.style.zIndex = obj.getAttribute("obzindex");
            this.getData();
        }
        this.genericObject = new openbexi_generic_object(this);
        if (obj == null) this.forward();

        try {
            openbexi_start_clock(this.div.id, null);
        } catch (e) {
        }
        openbexi_add_javascript(null, "javascript/", "openbexi_clock.js");
        this.set_template(this.template, null, null, null);

    } catch (e) {
        __openbexi_debugC("openbexi_clock()", "Exception:" + e.message);
    }
}
openbexi_clock.prototype.setData = function () {
    if (this.theme == "" || this.theme == undefined) {
        this.theme = "default";
        this.subtheme = "none";
    }
    openbexi_updatePageData(null, "page", this.div.id, "theme", this.theme);
    openbexi_updatePageData(null, "page", this.div.id, "subtheme", this.subtheme);
    if (this.template == "" || this.template == undefined)  this.template = "template/ob_clock/default.css";
    openbexi_updatePageData(null, "page", this.div.id, "template", this.template);
}
openbexi_clock.prototype.getData = function () {
    this.theme = openbexi_getPageData(null, "page", this.div.id, "theme");
    this.subtheme = openbexi_getPageData(null, "page", this.div.id, "subtheme");
    this.template = openbexi_getPageData(null, "page", this.div.id, "template");
}
openbexi_clock.prototype.set_template = function (css_file, category, action, rsync_canvas) {
    if (css_file == null || css_file == "")return;
    if (action == "open") {
        this.subtheme = css_file;
        openbexi_updatePageData(null, "page", this.div.id, "subtheme", css_file);
        openbexiNavigator.browse_CSS(null, null, this.subtheme, true);
    }
    else {
        this.genericObject.set_template(this, css_file, action, rsync_canvas);
        this.div.setAttribute((document.all ? "className" : "class"), "ob_clock_" + this.theme);
        //$ob_jquery('#'+this.div.id).addClass("ob_clock_" + this.theme);
    }
}
openbexi_clock.prototype.getClass = function () {
    return "ob_clock_" + this.theme;
};
function openbexi_start_clock(div_id, centerDate) {
    try {

        var refreshIntervalId_sec;
        var refreshIntervalId_min;
        var refreshIntervalId_hour;
        var ob_date;
        var ob_hour;
        var ob_min;
        var ob_sec;
        ob_date = document.createElement("div");
        ob_date.id = div_id + "__date";

        var ul = document.createElement("ul");
        ul.style.width = "200px";
        ul.style.margin = "0px auto";

        ul.style.padding = "0px";
        ul.style.listStyle = "none";
        ul.style.textAlign = "center";
        ul.style.display = "inline";
        ul.style.fontSize = "2em";
        ul.style.font = "Arial, Helvetica, sans-serif";

        ob_hour = document.createElement("li");
        ob_hour.id = div_id + "_hours";
        ob_hour.style.textAlign = "center";
        ob_hour.style.display = "inline";
        ob_hour.style.fontSize = "1em";
        ob_hour.style.font = "Arial, Helvetica, sans-serif";
        var li2 = document.createElement("li");
        li2.id = div_id + "_point";
        li2.style.textAlign = "center";
        li2.style.display = "inline";
        li2.style.fontSize = "1em";
        li2.style.font = "Arial, Helvetica, sans-serif";

        ob_min = document.createElement("li");
        ob_min.id = div_id + "_min";
        ob_min.style.textAlign = "center";
        ob_min.style.display = "inline";
        ob_min.style.fontSize = "1em";
        var li4 = document.createElement("li");
        li4.id = div_id + "_point";
        li4.style.textAlign = "center";
        li4.style.display = "inline";
        li4.style.fontSize = "1em";
        li4.style.font = "Arial, Helvetica, sans-serif";

        ob_sec = document.createElement("li");
        ob_sec.id = div_id + "_sec";
        ob_sec.style.textAlign = "center";
        ob_sec.style.display = "inline";
        ob_sec.style.fontSize = "1em";

        document.getElementById(div_id).appendChild(ob_date);
        document.getElementById(div_id).appendChild(ul);
        ul.appendChild(ob_hour);
        ul.appendChild(li2);
        ul.appendChild(ob_min);
        ul.appendChild(li4);
        ul.appendChild(ob_sec);

        document.getElementById(div_id).appendChild(ob_date);

        clearInterval(refreshIntervalId_sec);
        clearInterval(refreshIntervalId_min);
        clearInterval(refreshIntervalId_hour);

        // Create two variable with the names of the months and days in an array
        var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
        var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]


        if (centerDate != null && centerDate != undefined) {
            $ob_jquery('#' + ob_date.id).html(dayNames[centerDate.getDay()] + " " + centerDate.getDate() + ' ' + monthNames[centerDate.getMonth()] + ' ' + centerDate.getFullYear());
            $ob_jquery("#" + ob_hour.id).html(( centerDate.getHours() < 10 ? "0" : "" ) + centerDate.getHours());
            $ob_jquery("#" + ob_min.id).html(( centerDate.getMinutes() < 10 ? ":0" : ":" ) + centerDate.getMinutes());
            $ob_jquery("#" + ob_sec.id).html(( centerDate.getSeconds() < 10 ? ":0" : ":" ) + centerDate.getSeconds());
        } else {

            // Create a newDate() object
            var newDate = new Date();
            // Extract the current date from Date object
            newDate.setDate(newDate.getDate());
            // Output the day, date, month and year
            $ob_jquery('#' + ob_date.id).html(dayNames[newDate.getDay()] + " " + newDate.getDate() + ' ' + monthNames[newDate.getMonth()] + ' ' + newDate.getFullYear());

            /* later */
            refreshIntervalId_sec = setInterval(function () {
                // Create a newDate() object and extract the seconds of the current time on the visitor's
                var seconds = new Date().getSeconds();
                // Add a leading zero to seconds value
                $ob_jquery("#" + ob_sec.id).html(( seconds < 10 ? ":0" : ":" ) + seconds);
            }, 1000);

            refreshIntervalId_min = setInterval(function () {
                // Create a newDate() object and extract the minutes of the current time on the visitor's
                var minutes = new Date().getMinutes();
                // Add a leading zero to the minutes value
                $ob_jquery("#" + ob_min.id).html(( minutes < 10 ? ":0" : ":" ) + minutes);
            }, 1000);

            refreshIntervalId_hour = setInterval(function () {
                // Create a newDate() object and extract the hours of the current time on the visitor's
                var hours = new Date().getHours();
                // Add a leading zero to the hours value
                $ob_jquery("#" + ob_hour.id).html(( hours < 10 ? "0" : "" ) + hours);
            }, 1000);
        }
    } catch (e) {
        alert(e);
    }

}
openbexi_clock.prototype.getText = function () {
    return this.genericObject.getText();
}
openbexi_clock.prototype.pasteText_or_Link = function () {
    return this.genericObject.getText();
}
openbexi_clock.prototype.getPopupAttributes = function () {
    return ob_clock_popupAttributes;
}
openbexi_clock.prototype.getInspectorAttributes = function () {
    return ob_clock_inspectorAttributes;
}
openbexi_clock.prototype.setSelected = function (objId) {
    this.genericObject.setSelected(objId);
    this.openbexiNavigator.update_menu_editor(this, true);
}
openbexi_clock.prototype.setUnSelected = function (objId) {
    try {
        this.genericObject.setUnSelected(objId);
        if (currentBexiObj_selected.type != this.type)
            this.openbexiNavigator.update_menu_editor(this, false);
    } catch (e) {
        __openbexi_debugC("openbexi_clock.prototype.setUnSelected()", "Exception:" + e.message);
    }
}
openbexi_clock.prototype.getChildrenId = function () {
    return this.genericObject.getChildrenId();
}
openbexi_clock.prototype.setAttribute = function (name, value) {
    return this.genericObject.setAttribute(this.getChildrenId(), name, value);
}
openbexi_clock.prototype.getSrc = function () {
    return "";
}
openbexi_clock.prototype.getURL = function () {
    return "";
}
openbexi_clock.prototype.innerHTML_and_EVENTS = function (objId) {
    var inner = document.getElementById(objId).innerHTML;
    if (getBrowser() == "NN6") {
        var src = this.getSrc();
        if (src != null && src != "") {
            inner = inner.replace("style=", " onclick=\"" + src + "\"" + " style=");
            return inner;
        }
    }
    return inner;
}
openbexi_clock.prototype.changeStyle = function (objBexi, direction) {
    this.genericObject.changeStyle(objBexi, this, direction);
}
openbexi_clock.prototype.removeObject = function () {
    try {
        if(this.div.getAttribute("ob_template")== "true" && openbexiNavigator.HTML_pageName != "template.html")   return;
        var listIdChild = this.getChildrenId();
        if (listIdChild) {
            for (var j = 0; j < listIdChild.length; j++) {
                openbexi_deletePageData(null, "page", listIdChild[j], "ALL", null);
            }
            ;
        }
    }
    catch (e) {
    }
    this.genericObject.removeObject(this);
}
openbexi_clock.prototype.my_PickFunc = function (e) {
    openbexi_stopEventPropagation(e);
    var bexiObj = getSelectedBexiObj(this.id);
    my_PickFunc(bexiObj.div);
}
openbexi_clock.prototype.get_editor = function () {
    var str = "";
    if (this.openbexiNavigator)
        str += this.openbexiNavigator.get_menu_editor(this.getPopupAttributes());
    return str;
}
openbexi_clock.prototype.debug = function () {
    return this.genericObject.debug(this);
}
openbexi_clock.prototype.forward = function () {
    return this.genericObject.forward(this.div, "+");
}
openbexi_clock.prototype.backward = function () {
    return this.genericObject.backward(this.div, "-");
}
openbexi_clock.prototype.align_left_auto_arrange = function () {
    return this.genericObject.align_left_auto_arrange(this);
}
openbexi_clock.prototype.align_right_auto_arrange = function () {
    return this.genericObject.align_right_auto_arrange(this);
}
openbexi_clock.prototype.align_top_auto_arrange = function () {
    return this.genericObject.align_top_auto_arrange(this);
}
openbexi_clock.prototype.align_bottom_auto_arrange = function () {
    return this.genericObject.align_bottom_auto_arrange(this);
}
openbexi_clock.prototype.vertical_width_auto_resize = function () {
    return this.genericObject.vertical_width_auto_resize(this);
}
openbexi_clock.prototype.vertical_height_auto_resize = function () {
    return this.genericObject.vertical_height_auto_resize(this);
}
openbexi_clock.prototype.horizontal_width_auto_resize = function () {
    return this.genericObject.horizontal_width_auto_resize(this);
}
openbexi_clock.prototype.horizontal_height_auto_resize = function () {
    return this.genericObject.horizontal_height_auto_resize(this);
}
openbexi_clock.prototype.vertical_spacing_auto_arrange = function () {
    return this.genericObject.vertical_spacing_auto_arrange(this);
}
openbexi_clock.prototype.horizontal_spacing_auto_arrange = function () {
    return this.genericObject.horizontal_spacing_auto_arrange(this);
}
openbexi_clock.prototype.undo_auto_arrange = function () {
    return this.genericObject.undo_auto_arrange(this);
}
openbexi_clock.prototype.redo_auto_arrange = function () {
    return this.genericObject.redo_auto_arrange(this);
}
openbexi_clock.prototype.resize = function () {
}
openbexi_clock.prototype.head_code = function () {
    return "";
}
openbexi_clock.prototype.body_code = function () {
    return this.genericObject.body_code(this);
}
openbexi_clock.prototype.functions_to_load = function () {
    return "openbexi_start_clock(\'" + this.div.id + "\',null);";
}
