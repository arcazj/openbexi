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
var ob_div_popupAttributes = [
    //['menuitem12' ,'this.pasteText_or_Link()','PasteText', 'gif\/copy_paste.jpg','48px','48px'],
    ['menuitem8', 'this.insertHTML(event)'        , 'insertHTML'  , 'gif\/ob_edit_html_x48.png', '48px', '48px'],
    ['menuitem18', 'this.backward()'         , 'SendToBack'  , 'gif\/move_backward_x48.png', '48px', '48px'],
    ['menuitem20', 'this.forward()'          , 'BringToFront', 'gif\/move_forward_x48.png', '48px', '48px'],
    ['menuitem25', 'duplicate_HTMLDiv(\'vertical\')', 'Duplicate', 'gif\/copyVertical_x48.png', '48px', '48px'],
    ['menuitem26', 'duplicate_HTMLDiv(\'horizontal\')', 'Duplicate', 'gif\/copyHorizontal_x48.png', '48px', '48px'],
    ['menuitem27', 'this.removeObject(true);openbexiNavigator.update_menu_editor(null, false);', 'DlgSelectBtnDelete', 'gif\/box_delete_x48.png', '48px', '48px']
];
var ob_html_editor = [
    ['menu_RequestBrowser', 'ob_menu_RequestBrowser', '', '', '', '', '', 'HTML Editor', '', '750px', '540px', '', ''],
    ['window_left', 'ob_menu_RequestBrowser_sub_left', '', '', '', '', '', '', '', '', '', 'overflow: auto;position:absolute;width:0%;', ''],
    ['end_window_left', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_body', 'ob_menu_RequestBrowser_sub', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow: hidden;position:absolute;width:100%;', ''],
    ['form', 'ob_form', '', '', '', '', '', '', '', '', '', '', ''],
    ['fieldset', 'ob_fieldset', '', '', '', '', '', '', '', '', '', '', ''],
    ['legend', '', '', '', '', '', '', 'HTML Editor', '', '', '', '', ''],
    ['textarea', 'bexicontext_html_editor', '', '', '', '', '', 'HTML', '', '', '', '', '13'],
    ['end_form', '', '', '', '', '', '', ' name', '', '', '', '', ''],
    ['end_window_body', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_foot', 'ob_menu_RequestBrowser_sub_foot', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow: hidden;position:absolute;height:25%', ''],
    ['set_button', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['ok', '', 'onclick="openbexi_applyHTMLEditor(event);"', '', 'onmousedown="src=\'gif/ob_ok_down.png\';"', 'onmouseover="src=\'gif/ob_ok_on.png\';"', 'onmouseout="src=\'gif/ob_ok.png\';"', 'Apply', '', '', '', '', ''],
    ['cancel', '', 'onclick="openbexiNavigator.window_factory(event,\'ob_menu_RequestBrowser\',null,\'hidden\');"', '', 'onmousedown="src=\'gif/ob_cancel_down.png\';"', 'onmouseover="src=\'gif/ob_cancel_on.png\';"', 'onmouseout="src=\'gif/ob_cancel.png\';"', 'Cancel', '', '', '', '', ''],
    ['endset_button', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_window_foot', '', '', '', '', '', '', '', '', '', '', '', '']
];
var ob_div_inspectorAttributes = [
    ['editor'         , 'DivBoxEditor'   , 'true']
];

var openbexi_div = function (bexiObj, obj, name, top, left, width, height, subtype) {
    try {
        __openbexi_debugC("openbexi_div(" + bexiObj + "," + obj + "," + name + "," + top + "," + left + "," + width + "," + height + ")", "Classe:");

        this.loading_status = "loaded";
        if (openbexiNavigator)
            this.openbexiNavigator = openbexiNavigator;
        else
            this.openbexiNavigator = new openbexi_navigator();

        this.name = name;
        this.id = name;
        this.type = "openbexi_div";
        this.subtype = subtype;
        if (bexiObj == null) {
            this.parentNodeId = "BODY";
            this.parentType = "openbexi_body";
        }
        else {
            this.parentNodeId = bexiObj.id;
            this.parentType = bexiObj.type;
        }
        // create object
        if (obj == null) {
            this.div = document.createElement("div");
            this.div.style.position = "absolute";
            this.div.setAttribute("id", name);
            this.div.setAttribute("CLASSE", "DIV");
            this.div.setAttribute("creation_date", new Date());
            this.div.selected = false;
            this.div.style.top = parseInt(top) + "px";
            this.div.style.left = parseInt(left) + "px";
            if (width != null) this.div.style.width = parseInt(width) + "px";
            if (height != null)this.div.style.height = parseInt(height) + "px";

            this.parent = this.div.id;
            if (bexiObj == null || bexiObj.type == "openbexi_body") {
                document.body.appendChild(this.div);
            } else {
                bexiObj.div.appendChild(this.div);
            }
            this.setData();
        } else {
            this.div = obj;
            this.div.setAttribute("id", name);
            this.parent = this.div.id;
            this.div.ob_template = obj.getAttribute("ob_template");
            this.div.setAttribute("CLASSE", "DIV");
            this.div.setAttribute("creation_date",  obj.getAttribute("creation_date"));
            this.div.setAttribute("obzindex",  obj.getAttribute("obzindex"));
            this.div.setAttribute("ob_template",  obj.getAttribute("ob_template"));
            this.div.selected = false;
            if (bexiObj == null) {
                this.div.style.left = (parseInt(this.div.style.left) + parseInt(divPropertiesWidth)) + "px";
                this.div.style.top = (parseInt(this.div.style.top) + parseInt(divPropertiesTop)) + "px";
            } else {
                this.div.style.left = parseInt(this.div.style.left) + "px";
                this.div.style.top = parseInt(this.div.style.top) + "px";
            }
            this.div.style.zIndex = obj.getAttribute("obzindex");
            this.getData();
        }
        this.genericObject = new openbexi_generic_object(this);
        this.div.onclick = this.my_PickFunc;
        this.div.onmouseover = my_canvas_MouseOverFunc;
        if (this.subtype == "box")
            this.set_template(this.template, null, null, null);

    } catch (e) {
        __openbexi_debugC("openbexi_div()", "Exception:" + e.message);
    }
}
openbexi_div.prototype.setData = function () {
    if (this.id.match("ob_menu"))    return;
    openbexi_updatePageData(null, "page", this.div.id, "type", this.type);
    openbexi_updatePageData(null, "page", this.div.id, "subtype", this.subtype);
    openbexi_updatePageData(null, "page", this.div.id, "parentId", this.parentNodeId);
    openbexi_updatePageData(null, "page", this.div.id, "parentType", this.parentType);
    openbexi_updatePageData(null, "page", this.div.id, "cursor", this.cursor);
    if (this.subtype != "none") {
        if (this.theme == "" || this.theme == undefined) {
            this.theme = "default";
            this.subtheme = "none";
        }
        openbexi_updatePageData(null, "page", this.div.id, "theme", this.theme);
        openbexi_updatePageData(null, "page", this.div.id, "subtheme", this.subtheme);
        if (this.template == "" || this.template == undefined)  this.template = "template/ob_div/default.css";
        openbexi_updatePageData(null, "page", this.div.id, "template", this.template);
    }
}
openbexi_div.prototype.getData = function () {
    this.parentNodeId = openbexi_getPageData(null, "page", this.div.id, "parentId");
    this.parentType = openbexi_getPageData(null, "page", this.div.id, "parentType")
    var cursor = openbexi_getPageData(null, "page", this.div.id, "cursor");
    if (cursor != "")this.cursor = cursor;
    this.subtype = openbexi_getPageData(null, "page", this.div.id, "subtype");
    if (this.subtype == "" || this.subtype == undefined || this.subtype != "box")
        this.subtype = "none";
    if (this.subtype == "box") {
        this.type = openbexi_getPageData(null, "page", this.div.id, "type");
        this.theme = openbexi_getPageData(null, "page", this.div.id, "theme");
        this.subtheme = openbexi_getPageData(null, "page", this.div.id, "subtheme");
        this.template = openbexi_getPageData(null, "page", this.div.id, "template");
    }
}
openbexi_div.prototype.set_template = function (css_file, category, action, rsync_canvas) {
    if (css_file == null || css_file == "")return;
    if (action == "open") {
        this.subtheme = css_file;
        openbexi_updatePageData(null, "page", this.div.id, "subtheme", css_file);
        openbexiNavigator.browse_CSS(null, null, this.subtheme, true);
    }
    else {
        this.genericObject.set_template(this, css_file, action, rsync_canvas);
        this.div.setAttribute((document.all ? "className" : "class"), "ob_div_" + this.theme);
        //$ob_jquery('#'+this.div.id).addClass("ob_div_" + this.theme);
    }
}
openbexi_div.prototype.getClass = function () {
    return "ob_div_" + this.theme;
}
openbexi_div.prototype.setSelected = function (objId) {
    this.genericObject.setSelected(objId, true);
    this.openbexiNavigator.update_menu_editor(this, true);
}
openbexi_div.prototype.setUnSelected = function (objId) {
    try {
        this.genericObject.setUnSelected(objId);
        if (currentBexiObj_selected.type != this.type)
            this.openbexiNavigator.update_menu_editor(this, false);
    } catch (e) {
        __openbexi_debugC("openbexi_div.prototype.setUnSelected()", "Exception:" + e.message);
    }
}
openbexi_div.prototype.getChildrenId = function () {
    return this.genericObject.getChildrenId();
}
openbexi_div.prototype.setAttribute = function (name, value) {
    return this.genericObject.setAttribute(this.getChildrenId(), name, value);
}
openbexi_div.prototype.getText = function () {
    return this.div.firstChild.nodeValue;
}
openbexi_div.prototype.getPopupAttributes = function () {
    return ob_div_popupAttributes;
}
openbexi_div.prototype.getInspectorAttributes = function () {
    return ob_div_inspectorAttributes;
}
openbexi_div.prototype.setAttribute = function (name, value) {
    //this.div.style.align="center";
    return this.genericObject.setAttribute(this.getChildrenId(), name, value);
}
openbexi_div.prototype.setSelectedEndpoint = function (objId) {
    openbexiNavigator.window_factory(null, 'ob_menu_CSS', null, 'minimize');
    if (openbexiNavigator) openbexiNavigator.update_menu_editor(this, true);
    this.first_node_selected = true;
}
openbexi_div.prototype.getSrc = function (objId, eventStr) {
    if (objId == null)objId = this.div.id;
    if (eventStr == null)eventStr = "click";
    var src = this.genericObject.getSrc(objId, eventStr);
    if (src == undefined)
        return "";
    else
        return this.genericObject.getSrc(objId, eventStr);
}
openbexi_div.prototype.pasteText_or_Link = function () {
    if (getBrowser() == "NN6") {
        if (openbexiNavigator) openbexiNavigator.status("Copy&Paste not supported for this browser", "yellow");
        return;
    }
    var text = window.clipboardData.getData('Text');
    var occurHTTP = text.match("http:\/\/|https:\/\/|c:|C:|d:|D:|file:|javascript:void");
    if (occurHTTP == null || occurHTTP.length == 0) {
        var child = this.div.firstChild;
        if (child != null) {
            this.div.removeChild(child);
        }
        var eltA = document.createElement("A");
        eltA.setAttribute("CLASSE", "CLASSEA");
        var idChild = getNewIdChild("A");
        eltA.setAttribute("id", "A" + idChild);
        eltA.setAttribute("name", "A" + idChild);
        eltA.appendChild(document.createTextNode(text));
        this.div.appendChild(eltA);
    } else {
        this.add_link(text, true);
    }
}
openbexi_div.prototype.LNRequest = function () {
    this.genericObject.LNRequest();
}
openbexi_div.prototype.innerHTML_and_IMGS = function (objId) {
    var text = document.getElementById(objId).innerHTML;
    var listIdChild = this.getChildrenId();
    var textTmp = text;
    for (var j = 0; j < listIdChild.length; j++) {
        textTmp = text.replace("id=" + listIdChild[j], "id=" + listIdChild[j] + " ");
    }
    //alert("openbexi_div.prototype.innerHTML_and_IMGS: "+textTmp)
    return textTmp;
}
openbexi_div.prototype.innerHTML_and_EVENTS = function (objId) {
    var inner = document.getElementById(objId).innerHTML;
    if (getBrowser() == "NN6") {
        inner = inner.replace(/onclick=\".+\'\"/gi, "");
        var src = this.getSrc();
        if (src != null && src != "") {
            inner = inner.replace("style=", " onclick=\"" + src + "\"" + " style=");
            return inner;
        }
    }
    return inner;
}
openbexi_div.prototype.changeStyle = function (objBexi,direction) {
    this.genericObject.changeStyle(objBexi, this, direction);
}
openbexi_div.prototype.removeObject = function (flag) {
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
openbexi_div.prototype.my_PickFunc = function (e) {
    openbexi_stopEventPropagation(e);
    var bexiObj = getSelectedBexiObj(this.id);
    my_PickFunc(bexiObj.div);
}
openbexi_div.prototype.add_function = function (protocole, functionName, ob_doc) {
    if (this.genericObject != null) this.genericObject.add_function(protocole, functionName, ob_doc);
}
openbexi_div.prototype.add_link = function (url, unselect) {
    if (url == null) {
        url = this.genericObject.get_link(this.div.id);
        if (url == "")
            url = prompt(openbexi_lang("enterObjectURL") + ":", "http://");
        else
            url = prompt(openbexi_lang("enterObjectURL") + ":", url);
    }
    if (url != null) {
        if (this.genericObject != null) this.genericObject.add_link(this.div.id, "http", url, "onclick");
        this.div.style.cursor = "pointer";
        this.cursor = "pointer";
        openbexi_updatePageData(null, "page", this.div.id, "cursor", this.cursor);
    }
    if (unselect)my_PickFunc(this.div);
}
openbexi_div.prototype.delete_link = function (unselect) {
    if (this.genericObject != null) this.genericObject.delete_link(this.div.id);
    this.img.style.cursor = "default";
    if (unselect)my_PickFunc(this.div);
    this.cursor = "default";
    openbexi_updatePageData(null, "page", this.div.id, "cursor", this.cursor);
}
openbexi_div.prototype.get_editor = function () {
    return openbexiNavigator.get_menu_editor(this.getPopupAttributes());
}
openbexi_div.prototype.forward = function () {
    return this.genericObject.forward(this.div, "+");
}
openbexi_div.prototype.backward = function () {
    return this.genericObject.backward(this.div, "-");
}
openbexi_div.prototype.debug = function () {
    return this.genericObject.debug(this);
}
openbexi_div.prototype.align_left_auto_arrange = function () {
    return this.genericObject.align_left_auto_arrange(this);
}
openbexi_div.prototype.align_right_auto_arrange = function () {
    return this.genericObject.align_right_auto_arrange(this);
}
openbexi_div.prototype.align_top_auto_arrange = function () {
    return this.genericObject.align_top_auto_arrange(this);
}
openbexi_div.prototype.align_bottom_auto_arrange = function () {
    return this.genericObject.align_bottom_auto_arrange(this);
}
openbexi_div.prototype.vertical_width_auto_resize = function () {
    return this.genericObject.vertical_width_auto_resize(this);
}
openbexi_div.prototype.vertical_height_auto_resize = function () {
    return this.genericObject.vertical_height_auto_resize(this);
}
openbexi_div.prototype.horizontal_width_auto_resize = function () {
    return this.genericObject.horizontal_width_auto_resize(this);
}
openbexi_div.prototype.horizontal_height_auto_resize = function () {
    return this.genericObject.horizontal_height_auto_resize(this);
}
openbexi_div.prototype.vertical_spacing_auto_arrange = function () {
    return this.genericObject.vertical_spacing_auto_arrange(this);
}
openbexi_div.prototype.horizontal_spacing_auto_arrange = function () {
    return this.genericObject.horizontal_spacing_auto_arrange(this);
}
openbexi_div.prototype.undo_auto_arrange = function () {
    return this.genericObject.undo_auto_arrange(this);
}
openbexi_div.prototype.redo_auto_arrange = function () {
    return this.genericObject.redo_auto_arrange(this);
}
openbexi_div.prototype.functions_to_load = function () {
    return this.genericObject.functions_to_load(this);
}
openbexi_div.prototype.head_code = function () {
    return this.genericObject.head_code(this);
}
openbexi_div.prototype.body_code = function () {
    return this.genericObject.body_code(this);
}
openbexi_div.prototype.addFrame = function (src) {
    this.div.style.border = "5px solid white";
    this.div.style.overflow = "auto";
    this.div.style.width = "200px";
    this.div.style.height = "100px";
    this.div.innerHTML = '<iframe width="100%" height="100%" src=\"' + src + '\"></iframe>';
}
openbexi_div.prototype.insertHTML = function (event) {
    openbexiNavigator.window_factory(event, 'ob_menu_RequestBrowser', ob_html_editor, 'maximize');
    if (document.getElementById("bexicontext_html_editor"))
        document.getElementById("bexicontext_html_editor").value = this.div.innerHTML;
}
function openbexi_applyHTMLEditor(event) {
    try {
        if (event != null)openbexi_stopEventPropagation(event);
        if (document.getElementById("bexicontext_html_editor")) {
            getSelectedBexiObj(null).div.innerHTML = document.getElementById("bexicontext_html_editor").value;
        }
        openbexiNavigator.window_factory(event, 'ob_menu_RequestBrowser', null, 'hidden');
    } catch (e) {
        __openbexi_debugC("openbexi_applyHTMLEditor()", "Exception:" + e.message);
    }
}
