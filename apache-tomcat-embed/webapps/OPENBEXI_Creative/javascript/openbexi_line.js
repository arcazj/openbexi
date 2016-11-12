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

var ob_line_inspectorAttributes = [
    ['editor'         ,'LineEditor'   ,'true']
];
var ob_line_popupAttributes = [
    ['menuitem18','this.backward()'         ,'SendToBack'  ,'gif\/move_backward_x48.png','48px','48px'],
    ['menuitem20','this.forward()'          ,'BringToFront','gif\/move_forward_x48.png','48px','48px'],
    ['menuitem27' ,'duplicate_HTMLLine()'  ,'Duplicate',    'gif\/copy_x48.png','25px','25px'],
    ['menuitem35','this.removeObject(true);openbexiNavigator.update_menu_editor(null, false);'   ,'DlgSelectBtnDelete','gif\/no_horizontal.jpg','25px','25px'],
    ['sep',null,null,   null,null,null]
];

var openbexi_line = function(bexiObj, obj, name, top, left, width, height) {
    this.loading_status = "loaded";
    this.styles_BgImg = null;
    this.name = name;
    this.id = name;
    this.type = "openbexi_line";
    if (name == null || name == "") name = getNewIdDiv("div");
    if (bexiObj == null)
        this.parentNodeId = "BODY";
    else
        this.parentNodeId = bexiObj.id;
    var divobj;
    if (obj == null) {
        divobj = new openbexi_div(bexiObj, obj, name, top, left, width, height);
        this.div = divobj.div;
        this.div.setAttribute("CLASSE", "DIV_LINE");
        this.div.setAttribute("creation_date", new Date());
        this.div.style.background = document.body.bgColor;
        this.div.style.border = "0px solid white";
        this.parent = this.div.id;
        this.line = document.createElement("hr");
        this.line.setAttribute("id", name);
        this.line.setAttribute("CLASSE", "LINE");
        this.line.style.width = "100%";
        this.line.style.height = "100%";
        this.div.appendChild(this.line);
    } else {
        divobj = new openbexi_div(bexiObj, obj, obj.id, top, left, width, height);
        this.div = divobj.div;
        this.parent = this.div.id;
        this.div.ob_template = obj.getAttribute("ob_template");
        this.div.setAttribute("CLASSE", "DIV_LINE");
        this.div.setAttribute("creation_date",  obj.getAttribute("creation_date"));
        this.div.setAttribute("obzindex",  obj.getAttribute("obzindex"));
        this.div.setAttribute("ob_template",  obj.getAttribute("ob_template"));
        this.line = document.getElementById(name);
        this.div.style.zIndex = obj.getAttribute("obzindex");
    }
    this.genericObject = new openbexi_generic_object(this);
    if (obj == null) this.forward();
}
openbexi_line.prototype.getText = function() {
    return this.genericObject.getText();
}
openbexi_line.prototype.pasteText_or_Link = function() {
}
openbexi_line.prototype.getPopupAttributes = function() {
    return ob_line_popupAttributes;
}
openbexi_line.prototype.getInspectorAttributes = function() {
    return ob_line_inspectorAttributes;
}
openbexi_line.prototype.setSelected = function(objId) {
    this.genericObject.setSelected(objId);
    if (openbexiNavigator) openbexiNavigator.update_menu_editor(this, true);
}
openbexi_line.prototype.setUnSelected = function(objId) {
    try {
        this.genericObject.setUnSelected(objId);
        if (currentBexiObj_selected.type != this.type)
            this.openbexiNavigator.update_menu_editor(this, false);
    } catch (e) {
        __openbexi_debugC("openbexi_line.prototype.setUnSelected()", "Exception:" + e.message);
    }
}
openbexi_line.prototype.getChildrenId = function() {
    return this.genericObject.getChildrenId();
}
openbexi_line.prototype.setAttribute = function(name, value) {
    return this.genericObject.setAttribute(this.getChildrenId(), name, value);
}
openbexi_line.prototype.getSrc = function() {
    return "";
}
openbexi_line.prototype.getURL = function(objId, eventStr) {
    return this.genericObject.getURL(objId, eventStr);
}
openbexi_line.prototype.innerHTML_and_EVENTS = function(objId) {
    return document.getElementById(objId).innerHTML;
}
openbexi_line.prototype.changeStyle = function(objBexi, direction) {
    this.genericObject.changeStyle(objBexi, this, direction);
}
openbexi_line.prototype.removeObject = function(flag) {
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
    ob_setDirty_flag(flag);
}
openbexi_line.prototype.my_PickFunc = function(e) {
    openbexi_stopEventPropagation(e);
    var bexiObj = getSelectedBexiObj(this.id);
    my_PickFunc(bexiObj.div);
}
openbexi_line.prototype.setData = function() {
}
openbexi_line.prototype.getData = function() {

}
openbexi_line.prototype.get_editor = function() {
    if (openbexiNavigator)
        return openbexiNavigator.get_menu_editor(this.getPopupAttributes());
    else
        return null;
}
openbexi_line.prototype.forward = function() {
    return this.genericObject.forward(this.div, "+");
}
openbexi_line.prototype.backward = function() {
    return this.genericObject.backward(this.div, "-");
}
openbexi_line.prototype.debug = function() {
    return this.genericObject.debug(this);
}
openbexi_line.prototype.align_left_auto_arrange = function() {
    return this.genericObject.align_left_auto_arrange(this);
}
openbexi_line.prototype.align_right_auto_arrange = function() {
    return this.genericObject.align_right_auto_arrange(this);
}
openbexi_line.prototype.align_top_auto_arrange = function() {
    return this.genericObject.align_top_auto_arrange(this);
}
openbexi_line.prototype.align_bottom_auto_arrange = function() {
    return this.genericObject.align_bottom_auto_arrange(this);
}
openbexi_line.prototype.vertical_width_auto_resize = function() {
    return this.genericObject.vertical_width_auto_resize(this);
}
openbexi_line.prototype.vertical_height_auto_resize = function() {
    return this.genericObject.vertical_height_auto_resize(this);
}
openbexi_line.prototype.horizontal_width_auto_resize = function() {
    return this.genericObject.horizontal_width_auto_resize(this);
}
openbexi_line.prototype.horizontal_height_auto_resize = function() {
    return this.genericObject.horizontal_height_auto_resize(this);
}
openbexi_line.prototype.vertical_spacing_auto_arrange = function() {
    return this.genericObject.vertical_spacing_auto_arrange(this);
}
openbexi_line.prototype.horizontal_spacing_auto_arrange = function() {
    return this.genericObject.horizontal_spacing_auto_arrange(this);
}
openbexi_line.prototype.undo_auto_arrange = function() {
    return this.genericObject.undo_auto_arrange(this);
}
openbexi_line.prototype.redo_auto_arrange = function() {
    return this.genericObject.redo_auto_arrange(this);
}
openbexi_line.prototype.functions_to_load = function() {
    return this.genericObject.functions_to_load(this.div.id);
}
openbexi_line.prototype.head_code = function() {
    return this.genericObject.head_code(this);
}
openbexi_line.prototype.body_code = function() {
    return this.genericObject.body_code(this);
}
