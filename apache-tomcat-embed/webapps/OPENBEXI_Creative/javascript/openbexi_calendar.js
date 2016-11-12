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
var ob_calendar_inspectorAttributes = [
    ['editor'        ,'CalendarEditor'   ,'true']
];
var ob_calendar_popupAttributes = [
    ['menuitem17','openbexiNavigator.javascript(event, true);','Javascript'  ,'gif\/javascript_x48.png','48px','48px'],
    ['menuitem18','this.backward()'         ,'SendToBack'  ,'gif\/move_backward_x48.png','48px','48px'],
    ['menuitem20','this.forward()'          ,'BringToFront','gif\/move_forward_x48.png','48px','48px'],
    ['menuitem30','this.removeObject();openbexiNavigator.update_menu_editor(null, false);' ,'DlgSelectBtnDelete','gif\/calendar_delete_x48.png','48px','48px'],
    ['sep',null,null,   null,null,null]
];
var openbexi_calendar = function(bexiObj, obj, name, top, left, width, height) {
    try {
        __openbexi_debugC("openbexi_calendar(" + bexiObj + "," + obj + "," + name + "," + top + "," + left + "," + width + "," + height + ")", "Classe:");

        if (openbexiNavigator)
            this.openbexiNavigator = openbexiNavigator;
        else
            this.openbexiNavigator = new openbexi_navigator();
        this.loading_status = "loaded";
        this.styles_BgImg = null;
        this.name = name;
        this.id = name;
        this.type = "openbexi_calendar";
        this.subtype = "dijit";
        this.dojo = null;
        if (bexiObj == null)
            this.parentNodeId = "BODY";
        else
            this.parentNodeId = bexiObj.id;
        var divobj;
        if (obj == null) {
            divobj = new openbexi_div(bexiObj, obj, name, top, left, width, height);
            this.div = divobj.div;
            this.parent = this.div.id;
            this.div.style.border = "1px solid white";
            if (getBrowser() == "NN6")this.div.style.background = "transparent repeat scroll 0%;";
            this.div.setAttribute("CLASSE", "DIV_CALENDAR");
            this.div.setAttribute("creation_date", new Date());
            this.setData();
        } else {
            divobj = new openbexi_div(bexiObj, obj, obj.id, top, left, width, height);
            this.div = divobj.div;
            this.div.innerHTML = "";
            this.parent = this.div.id;
            this.div.setAttribute("CLASSE", "DIV_CALENDAR");
            this.div.setAttribute("creation_date",  obj.getAttribute("creation_date"));
            this.div.setAttribute("obzindex",  obj.getAttribute("obzindex"));
            this.div.setAttribute("ob_template",  obj.getAttribute("ob_template"));
            this.div.style.zIndex = obj.getAttribute("obzindex");
            this.getData();
        }
        this.genericObject = new openbexi_generic_object(this);
        if (obj == null) this.forward();
        this.set_template(this.template, null, null, null);
        this.updateToDojo(this.theme);
    } catch (e) {
        __openbexi_debugC("openbexi_calendar()", "Exception:" + e.message);
    }
};
openbexi_calendar.prototype.setData = function() {
    openbexi_updatePageData(null, "page", this.div.id, "type", this.type);
    if (this.theme == "" || this.theme == undefined) {
        this.theme = "claro";
        this.subtheme = "none";
    }
    openbexi_updatePageData(null, "page", this.div.id, "theme", this.theme);
    openbexi_updatePageData(null, "page", this.div.id, "subtheme", this.subtheme);
    if (this.template == "" || this.template == undefined)  this.template = "template/ob_calendar/claro.css";
    openbexi_updatePageData(null, "page", this.div.id, "template", this.template);
};
openbexi_calendar.prototype.getData = function() {
    this.type = openbexi_getPageData(null, "page", this.div.id, "type");
    this.theme = openbexi_getPageData(null, "page", this.div.id, "theme");
    this.subtheme = openbexi_getPageData(null, "page", this.div.id, "subtheme");
    this.template = openbexi_getPageData(null, "page", this.div.id, "template");
};
openbexi_calendar.prototype.set_template = function(css_file, category, action, rsync_canvas) {
    if (css_file == null || css_file == "")return;
    if (action == "open") {
        this.subtheme = css_file;
        openbexi_updatePageData(null, "page", this.div.id, "subtheme", css_file);
        openbexiNavigator.browse_CSS(null, null, this.subtheme, true);
    }
    else {
        this.genericObject.set_template(this, css_file, action, rsync_canvas);
        this.div.setAttribute((document.all ? "className" : "class"), this.theme);
        //$ob_jquery('#'+this.div.id).addClass(this.theme);
    }
};
openbexi_calendar.prototype.getClass = function() {
    return "ob_calendar_" + this.theme;
};
openbexi_calendar.prototype.updateToDojo = function() {
    try {
        var txt = document.createElement('input');
        //txt.setAttribute("dayWidth", "abbr");

        if (this.subtype == "dijit") {
            txt.setAttribute("dojoType", "dijit._Calendar");
            this.div.appendChild(txt);
            this.dojo = new dijit._Calendar({}, txt);
        }
        if (this.subtype == "Calendar3Pane") {
            txt.setAttribute("dojoType", "dojox.widget.Calendar3Pane");
            this.div.appendChild(txt);
            this.dojo = new dojox.widget.Calendar3Pane({}, txt);
        }
        if (this.subtype == "MonthlyCalendar") {
            txt.setAttribute("dojoType", "dojox.widget.MonthlyCalendar");
            this.div.appendChild(txt);
            this.dojo = new dojox.widget.MonthlyCalendar({}, txt);
        }
        if (this.subtype == "YearlyCalendar") {
            txt.setAttribute("dojoType", "dojox.widget.YearlyCalendar");
            this.div.appendChild(txt);
            this.dojo = new dojox.widget.YearlyCalendar({}, txt);
        }
        this.dojo.domNode.style.width = "100%";
        this.dojo.domNode.style.height = "100%";
    } catch(e) {
        alert("openbexi_calendar.prototype.updateToDojo: " + e.name + ". Error message: " + e.message);
    }
};
openbexi_calendar.prototype.getText = function() {
    return this.genericObject.getText();
};
openbexi_calendar.prototype.pasteText_or_Link = function() {
    return this.genericObject.getText();
};
openbexi_calendar.prototype.getPopupAttributes = function() {
    return ob_calendar_popupAttributes;
};
openbexi_calendar.prototype.getInspectorAttributes = function() {
    return ob_calendar_inspectorAttributes;
};
openbexi_calendar.prototype.setSelected = function(objId) {
    this.genericObject.setSelected(objId, this.theme);
    this.openbexiNavigator.update_menu_editor(this, true);
};
openbexi_calendar.prototype.setUnSelected = function(objId) {
    try {
        this.genericObject.setUnSelected(objId);
        if (currentBexiObj_selected.type != this.type)
            this.openbexiNavigator.update_menu_editor(this, false);
    } catch (e) {
        __openbexi_debugC("openbexi_calendar.prototype.setUnSelected()", "Exception:" + e.message);
    }
}
openbexi_calendar.prototype.getChildrenId = function() {
    return this.genericObject.getChildrenId();
};
openbexi_calendar.prototype.setAttribute = function(name, value) {
    return this.genericObject.setAttribute(this.getChildrenId(), name, value);
};
openbexi_calendar.prototype.setURL = function(objId, eventStr, URL) {
    this.genericObject.setURL(objId, eventStr, URL);
};
openbexi_calendar.prototype.unsetURL = function(objId, eventStr, URL) {
    this.genericObject.unsetURL(objId, eventStr, URL);
};
openbexi_calendar.prototype.disableURLs = function() {
    this.genericObject.disableURLs();
};
openbexi_calendar.prototype.enableURLs = function() {
    this.genericObject.enableURLs();
};
openbexi_calendar.prototype.getSrc = function() {
    return "";
};
openbexi_calendar.prototype.getURL = function() {
    return "";
};
openbexi_calendar.prototype.add_function = function(protocole, functionName, ob_doc) {
    if (this.genericObject != null) this.genericObject.add_function(protocole, functionName, ob_doc);
};
openbexi_calendar.prototype.innerHTML_and_EVENTS = function(objId) {
    var inner = document.getElementById(objId).innerHTML;
    if (getBrowser() == "NN6") {
        var src = this.getSrc();
        if (src != null && src != "") {
            inner = inner.replace("style=", " onclick=\"" + src + "\"" + " style=");
            return inner;
        }
    }
    return inner;
};
openbexi_calendar.prototype.changeStyle = function(objBexi, direction) {
    this.genericObject.changeStyle(objBexi, this, direction);
    this.theme = objBexi.theme;
    this.subtheme = objBexi.subtheme;
    this.template = objBexi.template;
};
openbexi_calendar.prototype.removeObject = function() {
    try {
        if(this.div.getAttribute("ob_template")== "true" && openbexiNavigator.HTML_pageName != "template.html")   return;
        var listIdChild = this.getChildrenId();
        if (listIdChild) {
            for (var j = 0; j < listIdChild.length; j++) {
                openbexi_deletePageData(null, "page", listIdChild[j], "ALL", null);
            }
        }
    }
    catch (e) {
    }
    this.genericObject.removeObject(this);
};
openbexi_calendar.prototype.my_PickFunc = function(e) {
    openbexi_stopEventPropagation(e);
    var bexiObj = getSelectedBexiObj(this.id);
    my_PickFunc(bexiObj.div);
};
openbexi_calendar.prototype.get_editor = function() {
    return openbexiNavigator.get_menu_editor(this.getPopupAttributes());
};
openbexi_calendar.prototype.debug = function() {
    return this.genericObject.debug(this);
};
openbexi_calendar.prototype.forward = function() {
    return this.genericObject.forward(this.div, "+");
};
openbexi_calendar.prototype.backward = function() {
    return this.genericObject.backward(this.div, "-");
};
openbexi_calendar.prototype.align_left_auto_arrange = function() {
    return this.genericObject.align_left_auto_arrange(this);
};
openbexi_calendar.prototype.align_right_auto_arrange = function() {
    return this.genericObject.align_right_auto_arrange(this);
};
openbexi_calendar.prototype.align_top_auto_arrange = function() {
    return this.genericObject.align_top_auto_arrange(this);
};
openbexi_calendar.prototype.align_bottom_auto_arrange = function() {
    return this.genericObject.align_bottom_auto_arrange(this);
};
openbexi_calendar.prototype.vertical_width_auto_resize = function() {
    return this.genericObject.vertical_width_auto_resize(this);
};
openbexi_calendar.prototype.vertical_height_auto_resize = function() {
    return this.genericObject.vertical_height_auto_resize(this);
};
openbexi_calendar.prototype.horizontal_width_auto_resize = function() {
    return this.genericObject.horizontal_width_auto_resize(this);
};
openbexi_calendar.prototype.horizontal_height_auto_resize = function() {
    return this.genericObject.horizontal_height_auto_resize(this);
};
openbexi_calendar.prototype.vertical_spacing_auto_arrange = function() {
    return this.genericObject.vertical_spacing_auto_arrange(this);
};
openbexi_calendar.prototype.horizontal_spacing_auto_arrange = function() {
    return this.genericObject.horizontal_spacing_auto_arrange(this);
};
openbexi_calendar.prototype.undo_auto_arrange = function() {
    return this.genericObject.undo_auto_arrange(this);
};
openbexi_calendar.prototype.redo_auto_arrange = function() {
    return this.genericObject.redo_auto_arrange(this);
};
openbexi_calendar.prototype.resize = function() {
    if (this.dojo) {
        this.dojo.domNode.style.width = this.div.style.width;
        this.dojo.domNode.style.height = this.div.style.height;
    }
};
openbexi_calendar.prototype.head_code = function() {
    return "";
};
openbexi_calendar.prototype.get_template = function() {
    return this.template;
};
openbexi_calendar.prototype.body_code = function() {
    var str = "";
    var functions = this.genericObject.functions_to_trigger(this.div.id);
    str += '        <div id="report_date" style="visibility:hidden;"></DIV>\n';
    str += '        <div class="' + this.theme + '" CLASSE="' + this.div.getAttribute("CLASSE") + '" id="' + this.id + '" ob_template="' + this.ob_template + '" obzindex="' + this.div.obzindex + '" creation_date="' +this.div.getAttribute("creation_date") + '" STYLE="' + openbexi_get_CSS(this.div) + '">\n';
    if (this.subtype == "dijit") str += '            <input style="width:100%;height:100%;" dojoType="dijit._Calendar" ' + functions + '>\n';
    if (this.subtype == "Calendar3Pane")  str += '            <input style="width:100%;height:100%;" dojoType="dojox.widget.Calendar3Pane" ' + functions + '>\n';
    if (this.subtype == "MonthlyCalendar") str += '            <input style="width:100%;height:100%;" dojoType="dojox.widget.MonthlyCalendar" ' + functions + '>\n';
    if (this.subtype == "YearlyCalendar")str += '            <input style="width:100%;height:100%;" dojoType="dojox.widget.YearlyCalendar" ' + functions + '>\n';
    str += '        </div>\n';
    return str;
};
openbexi_calendar.prototype.functions_to_load = function() {
    return "";
};
