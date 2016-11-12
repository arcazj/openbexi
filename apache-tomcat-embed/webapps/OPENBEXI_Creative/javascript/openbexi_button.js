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

var ob_button_popupAttributes = [
    ['menuitem16', 'this.rename()'           , 'Rename'      , 'gif\/rename_x48.png', '48px', '48px'],
    ['menuitem11', 'openbexi_chartFlow_add_endpoint(event,null,null,null,true,null,\'dynamic\')'     , 'AddEndpoint'  , 'gif\/endpoint_x48.png', '48px', '48px'],
    ['menuitem17', 'openbexiNavigator.javascript(event, false);', 'Add_javascript_to_button', 'gif\/javascript_x48.png', '48px', '48px'],
    ['menuitem18', 'this.backward()'         , 'SendToBack'  , 'gif\/move_backward_x48.png', '48px', '48px'],
    ['menuitem20', 'this.forward()'          , 'BringToFront', 'gif\/move_forward_x48.png', '48px', '48px'],
    ['menuitem25', 'duplicate_HTMLButton(\'vertical\')', 'Duplicate', 'gif\/copyVertical_x48.png', '48px', '48px'],
    ['menuitem25', 'duplicate_HTMLButton(\'horizontal\')', 'Duplicate', 'gif\/copyHorizontal_x48.png', '48px', '48px'],
    ['menuitem25', 'this.removeObject(true);openbexiNavigator.update_menu_editor(null, false);', 'DlgSelectBtnDelete', 'gif\/remove_button_x48.png', '48px', '48px']
];
var ob_button_wizard = [
    ['menu_RequestBrowser', 'ob_menu_RequestBrowser', '', '', '', '', '', 'Wizard - Help', '', '550px', '630px', '', ''],
    ['window_left', 'ob_menu_RequestBrowser_sub_left', '', '', '', '', '', '', '', '', '', 'overflow: auto;position:absolute;width:0%;', ''],
    ['end_window_left', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_body', 'ob_menu_RequestBrowser_sub', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow: auto;position:absolute;width:100%;', ''],
    ['form', 'ob_form', '', '', '', '', '', '', '', '', '', '', ''],
    ['fieldset', 'ob_fieldset', '', '', '', '', '', '', '', '', '', 'background:url(gif/fading_background_11.png)', ''],
    ['legend', '', '', '', '', '', '', 'Rename ...', '', '', '', '', ''],
    ['message', 'bexicontext_open_project', 'onclick="getSelectedBexiObj(null).rename();"', '', '', '', '', 'Rename_button', 'gif/rename_x48.png', '', '', '', '1'],
    ['end_fieldset', 'ob_fieldset', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_form', '', '', '', '', '', '', ' name', '', '', '', '', ''],

    ['window_body', 'ob_menu_RequestBrowser_sub', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow: auto;position:absolute;width:100%;', ''],
    ['form', 'ob_form', '', '', '', '', '', '', '', '', '', '', ''],
    ['fieldset', 'ob_fieldset', '', '', '', '', '', '', '', '', '', 'background:url(gif/fading_background_13_50x1200.png)', ''],
    ['legend', '', '', '', '', '', '', 'Add user actions ... ...', '', '', '', '', ''],
    ['message', 'bexicontext_open_project', 'onclick="getSelectedBexiObj(null).openbexiNavigator.window_factory(null, \'ob_menu_JavascriptBrowser\', ob_menu_javascripts, \'minimize\');openbexi_display_javascript_parameters(event,null,null);"', '', '', '', '', 'Add_triggers', 'gif/javascript_x48.png', '', '', '', '1'],
    ['end_fieldset', 'ob_fieldset', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_form', '', '', '', '', '', '', ' name', '', '', '', '', ''],

    ['form', 'ob_form', '', '', '', '', '', '', '', '', '', '', ''],
    ['fieldset', 'ob_fieldset', '', '', '', '', '', '', '', '', '', 'background:url(gif/fading_background_50x1200.png)', ''],
    ['legend', '', '', '', '', '', '', 'Save as template ...', '', '', '', '', ''],
    ['message', 'bexicontext_open_project', 'onclick="getSelectedBexiObj(null).saveAsTemplate();"', '', '', '', '', 'SaveAsTemplate', 'gif/ob_template_x64.png', '', '', '', '1'],
    ['end_fieldset', 'ob_fieldset', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_form', '', '', '', '', '', '', ' name', '', '', '', '', ''],

    ['form', 'ob_form', '', '', '', '', '', '', '', '', '', '', ''],
    ['fieldset', 'ob_fieldset', '', '', '', '', '', '', '', '', '', 'background:url(gif/fading_background_18.png)', ''],
    ['legend', '', '', '', '', '', '', 'Change CSS ...', '', '', '', '', ''],
    ['message', 'bexicontext_open_template', 'onclick="openbexiNavigator.browse_CSS(null, \'ob_color.CSS\',null,true);"', '', '', '', '', 'Change_color', 'gif/ob_template_x64.png', '', '', '', '1'],
    ['message', 'bexicontext_open_template', 'onclick="openbexiNavigator.browse_CSS(null, \'ob_font.CSS\',null,true);"', '', '', '', '', 'Change_font', 'gif/ob_template_x64.png', '', '', '', '1'],
    ['message', 'bexicontext_open_template', 'onclick="openbexiNavigator.browse_CSS(null, \'ob_font_weight.CSS\',null,true);"', '', '', '', '', 'Change_font_weight', 'gif/ob_template_x64.png', '', '', '', '1'],
    ['message', 'bexicontext_open_template', 'onclick="openbexiNavigator.browse_CSS(null, \'ob_font_size.CSS\',null,true);"', '', '', '', '', 'Change_font_size', 'gif/ob_template_x64.png', '', '', '', '1'],
    ['message', 'bexicontext_open_template', 'onclick="openbexiNavigator.browse_CSS(null, \'ob_font_style.CSS\',null,true);"', '', '', '', '', 'Change_font_style', 'gif/ob_template_x64.png', '', '', '', '1'],
    ['message', 'bexicontext_open_template', 'onclick="openbexiNavigator.browse_CSS(null, \'ob_bg_img_style.CSS\',null,true);"', '', '', '', '', 'Change_background_img', 'gif/ob_template_x64.png', '', '', '', '1'],
    ['message', 'bexicontext_open_template', 'onclick="openbexiNavigator.browse_CSS(null,\'ob_template_style\',null,true);"', '', '', '', '', 'Change_template', 'gif/ob_template_x64.png', '', '', '', '1'],
    ['message', 'bexicontext_open_template', 'onclick="display_CSS_editor();"', '', '', '', '', 'Edit_CSS', 'gif/ob_template_x64.png', '', '', '', '1'],
    ['end_fieldset', 'ob_fieldset', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_form', '', '', '', '', '', '', ' name', '', '', '', '', ''],

    ['end_window_body', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['window_foot', 'ob_menu_RequestBrowser_sub_foot', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow: hidden;position:absolute;height:5%', ''],
    ['end_window_foot', '', '', '', '', '', '', '', '', '', '', '', '']
];

var ob_button_inspectorAttributes = [
    ['editor'         , 'ButtonEditor'   , 'true']
];
var openbexi_button = function (bexiObj, obj, name, top, left, width, height, subtype) {
    try {
        __openbexi_debugC("openbexi_button(" + bexiObj + "," + obj + "," + name + "," + top + "," + left + "," + width + "," + height + "," + subtype + ")", "Classe:");

        this.loading_status = "loaded";
        if (name == null || name == "") name = getNewIdDiv("div");
        if (openbexiNavigator)
            this.openbexiNavigator = openbexiNavigator;
        else
            this.openbexiNavigator = new openbexi_navigator();
        this.name = name;
        this.id = name;
        this.type = "openbexi_button";
        if (subtype != null)
            this.subtype = subtype;
        else
            this.subtype = "";
        if (bexiObj == null) {
            this.parentNodeId = "BODY";
            this.parentType = "openbexi_body";
        }
        else {
            this.parentNodeId = bexiObj.id;
            this.parentType = bexiObj.type;
        }
        var divobj;
        if (obj == null) {
            divobj = new openbexi_div(bexiObj, obj, name, top, left, width, height);
            this.div = divobj.div;
            this.div.type = subtype;
            this.div.setAttribute("CLASSE", "DIV_BUTTON");
            this.div.setAttribute("creation_date", new Date());
            this.parent = this.div.id;
            this.button = this.addButton(subtype, "button" + name.replace("div", ""));
            this.div.selected = false;
            this.setData();
        } else {
            divobj = new openbexi_div(bexiObj, obj, obj.id, top, left, width, height);
            this.div = divobj.div;
            this.parent = this.div.id;
            this.div.setAttribute("CLASSE", "DIV_BUTTON");
            this.div.setAttribute("creation_date", obj.getAttribute("creation_date"));
            this.div.setAttribute("obzindex", obj.getAttribute("obzindex"));
            this.div.setAttribute("ob_template", obj.getAttribute("ob_template"));
            this.button = document.getElementById(name);
            this.getData();
            this.button.title = openbexi_getPageData(null, "url", this.div.id, "url");
            this.div.style.zIndex = obj.getAttribute("obzindex");
        }
        this.genericObject = new openbexi_generic_object(this);
        this.button.setAttribute("CLASSE", "BUTTON");
        this.set_template(this.template, null, null, null);
    } catch (e) {
        __openbexi_debugC("openbexi_button()", "Exception:" + e.message);
    }
};
openbexi_button.prototype.setData = function () {
    openbexi_updatePageData(null, "page", this.div.id, "type", this.type);
    openbexi_updatePageData(null, "page", this.div.id, "subtype", this.subtype);
    openbexi_updatePageData(null, "page", this.div.id, "parentId", this.parentNodeId);
    openbexi_updatePageData(null, "page", this.div.id, "parentType", this.parentType);
    if (this.theme == "" || this.theme == undefined) {
        this.theme = "default";
        this.subtheme = "none";
    }
    openbexi_updatePageData(null, "page", this.div.id, "theme", this.theme);
    openbexi_updatePageData(null, "page", this.div.id, "subtheme", this.subtheme);
    if (this.template == "" || this.template == undefined)  this.template = "template/ob_button/default.css";
    openbexi_updatePageData(null, "page", this.div.id, "template", this.template);
};
openbexi_button.prototype.getData = function () {
    this.type = openbexi_getPageData(null, "page", this.div.id, "type");
    this.subtype = openbexi_getPageData(null, "page", this.div.id, "subtype");
    this.parentNodeId = openbexi_getPageData(null, "page", this.div.id, "parentId");
    this.parentType = openbexi_getPageData(null, "page", this.div.id, "parentType");
    this.theme = openbexi_getPageData(null, "page", this.div.id, "theme");
    this.subtheme = openbexi_getPageData(null, "page", this.div.id, "subtheme");
    this.template = openbexi_getPageData(null, "page", this.div.id, "template");
};
openbexi_button.prototype.set_template = function (css_file, category, action, rsync_canvas) {
    if (css_file == null || css_file == "")return;
    if (action == "open") {
        this.subtheme = css_file;
        openbexi_updatePageData(null, "page", this.div.id, "subtheme", css_file);
        openbexiNavigator.browse_CSS(null, null, this.subtheme, true);
    }
    else {
        this.genericObject.set_template(this, css_file, action, rsync_canvas);
        this.button.setAttribute((document.all ? "className" : "class"), "ob_button_" + this.theme);
        //$ob_jquery('#'+this.div.id).addClass("ob_button_" + this.theme);
    }
};
openbexi_button.prototype.getClass = function () {
    return "ob_button_" + this.theme;
};
openbexi_button.prototype.addButton = function (type, name) {
    var newButton = null;
    var buttext;
    if (type == "Submit") {
        openbexi_updatePageData(null, "page", this.div.id, "subtype", "Submit");
        newButton = document.createElement("button");
        buttext = document.createTextNode("Submit");
        newButton.appendChild(buttext);
    } else {
        newButton = document.createElement("button");
        buttext = document.createTextNode(name.replace("template_", ""));
        newButton.appendChild(buttext);
    }
    newButton.selected = false;
    newButton.id = name.replace("buttontemplate", "template_button");
    newButton.style.width = "100%";
    newButton.style.height = "100%";
    this.div.appendChild(newButton);
    return newButton;
};
openbexi_button.prototype.setSelectedEndpoint = function (objId) {
    openbexiNavigator.window_factory(null, 'ob_menu_CSS', null, 'minimize');
    if (openbexiNavigator) openbexiNavigator.update_menu_editor(this, true);
    this.first_node_selected = true;
};
openbexi_button.prototype.setSelected = function (objId) {
    try {
        this.genericObject.setSelected(objId, this.theme);
        this.openbexiNavigator.update_menu_editor(this, true);
    } catch (e) {
        __openbexi_debugC("openbexi_button.prototype.setSelected()", "Exception:" + e.message);
    }
};
openbexi_button.prototype.setUnSelected = function (objId) {
    try {
        this.genericObject.setUnSelected(objId);
        if (currentBexiObj_selected.type != this.type)
            this.openbexiNavigator.update_menu_editor(this, false);
    } catch (e) {
        __openbexi_debugC("openbexi_button.prototype.setUnSelected()", "Exception:" + e.message);
    }
};
openbexi_button.prototype.getChildrenId = function () {
    var count = 0;
    var list = [];
    list[count++] = this.div.id;
    if (document.getElementById(this.parent) != null || document.getElementById(this.parent) != undefined) {
        for (var j = 0; j < document.getElementById(this.parent).childNodes.length; j++) {
            var childId = document.getElementById(this.parent).childNodes[j].id;
            if (childId != null && childId != "") {
                list[count++] = childId;
            }
        }
    }
    return list;
};
openbexi_button.prototype.pasteText_or_Link = function () {
    if (getBrowser() == "NN6") {
        if (this.openbexiNavigator) this.openbexiNavigator.status("Copy&Paste not supported for this browser", "yellow");
        return;
    }
    try {
        var text = window.clipboardData.getData('Text');
    } catch (e) {
        if (this.openbexiNavigator) this.openbexiNavigator.status("Copy&Paste not supported for this browser", "red");
    }
    var occurHTTP = text.match("http:\/\/|https:\/\/|c:|C:|d:|D:|file:|javascript:void");
    if (occurHTTP == null || occurHTTP.length == 0) {
        if (this.button.childNodes[0])this.button.removeChild(this.button.childNodes[0]);
        this.button.appendChild(document.createTextNode(text));
        if (!this.button.childNodes[0])this.button.innerHTML = text;
    } else {
        this.add_link(text, true);
    }
    my_PickFunc(this.div);
    if (this.openbexiNavigator) this.openbexiNavigator.status("Copy&Paste " + text + " done", "#abff4b");
};
openbexi_button.prototype.rename = function (event) {
    openbexiNavigator.prompt_working = false;
    // Important: add jqi string in the input id, this would stop event propagation to window click
    ob_rename_button.ob_state.title = "Please rename this button:</b></br><input class=\"ob_textarea\" id=\"ob_jqi_rename_button\" type=\"text\" name=\"ob_jqi_rename_button\" size=\"32\" value=\"" + getSelectedBexiObj(null).button.id + "\">";
    ob_rename_button.ob_state.position = {container: '#' + getSelectedBexiObj(null).id, x: 10, y: -145, width: 300, arrow: 'bl'};
    openbexiNavigator.prompt(event, ob_rename_button)
};
openbexi_button.prototype.setAttribute = function (name, value) {
    return this.genericObject.setAttribute(this.getChildrenId(), name, value);
};
openbexi_button.prototype.getText = function () {
    return document.getElementById(this.button.id).innerHTML;
};
openbexi_button.prototype.getPopupAttributes = function () {
    return ob_button_popupAttributes;
};
openbexi_button.prototype.getInspectorAttributes = function () {
    return ob_button_inspectorAttributes;
};
openbexi_button.prototype.innerHTML_and_EVENTS = function () {
};
openbexi_button.prototype.removeObject = function (flag) {
    try {
        if (this.div.getAttribute("ob_template") == "true" && openbexiNavigator.HTML_pageName != "template.html")   return;
        var listIdChild = this.getChildrenId();
        if (listIdChild) {
            for (var j = 0; j < listIdChild.length; j++) {
                openbexi_deletePageData(null, "page", listIdChild[j], "ALL", null);
            }
        }
    }
    catch (e) {
        __openbexi_debugC("openbexi_button.prototype.removeObject()", "Exception:" + e.message);
    }
    try {
        this.genericObject.removeObject(this);
        ob_setDirty_flag(flag);
    } catch (e) {
        __openbexi_debugC("openbexi_button.prototype.removeObject()", "Exception:" + e.message);
    }

};
openbexi_button.prototype.my_PickFunc = function (e) {
    openbexi_stopEventPropagation(e);
    var bexiObj = getSelectedBexiObj(this.id);
    my_PickFunc(bexiObj.div);
};
openbexi_button.prototype.add_function = function (protocole, functionName, ob_doc) {
    if (this.genericObject != null) this.genericObject.add_function(protocole, functionName, ob_doc);
};
openbexi_button.prototype.add_link = function (url, unselect) {
    if (url == null) {
        url = this.genericObject.get_link(this.div.id);
        if (url == "")
            url = prompt(openbexi_lang("enterObjectURL") + ":", "http://");
        else
            url = prompt(openbexi_lang("enterObjectURL") + ":", url);
    }
    if (url != null) {
        if (this.genericObject != null) this.genericObject.add_link(this.div.id, "http", url, "onclick");
        this.button.style.cursor = "pointer";
    }
    if (unselect)  my_PickFunc(this.div);
};
openbexi_button.prototype.delete_link = function (unselect) {
    if (this.genericObject != null) this.genericObject.delete_link(this.div.id);
    this.button.style.cursor = "default";
    if (unselect)my_PickFunc(this.div);
};

openbexi_button.prototype.get_editor = function () {
    var str = "";
    if (this.openbexiNavigator)
        str += this.openbexiNavigator.get_menu_editor(this.getPopupAttributes());
    return str;
};
openbexi_button.prototype.forward = function () {
    if (this.genericObject == null) alert("openbexi_button.prototype.forward:this.genericObject null ");
    return this.genericObject.forward(this.div, "+");
};
openbexi_button.prototype.backward = function () {
    if (this.genericObject == null) alert("openbexi_button.prototype.forward:this.backward null ");
    return this.genericObject.backward(this.div, "-");
};
function replaceText(buttonObj, text) {
    if (buttonObj == null) return;
    buttonObj.removeChild(buttonObj.childNodes[0]);
    buttonObj.appendChild(document.createTextNode(text));
}
openbexi_button.prototype.align_left_auto_arrange = function () {
    return this.genericObject.align_left_auto_arrange(this);
};
openbexi_button.prototype.align_right_auto_arrange = function () {
    return this.genericObject.align_right_auto_arrange(this);
};
openbexi_button.prototype.align_top_auto_arrange = function () {
    return this.genericObject.align_top_auto_arrange(this);
};
openbexi_button.prototype.align_bottom_auto_arrange = function () {
    return this.genericObject.align_bottom_auto_arrange(this);
};
openbexi_button.prototype.vertical_width_auto_resize = function () {
    return this.genericObject.vertical_width_auto_resize(this);
};
openbexi_button.prototype.vertical_height_auto_resize = function () {
    return this.genericObject.vertical_height_auto_resize(this);
};
openbexi_button.prototype.horizontal_width_auto_resize = function () {
    return this.genericObject.horizontal_width_auto_resize(this);
};
openbexi_button.prototype.horizontal_height_auto_resize = function () {
    return this.genericObject.horizontal_height_auto_resize(this);
};
openbexi_button.prototype.vertical_spacing_auto_arrange = function () {
    return this.genericObject.vertical_spacing_auto_arrange(this);
};
openbexi_button.prototype.horizontal_spacing_auto_arrange = function () {
    return this.genericObject.horizontal_spacing_auto_arrange(this);
};
openbexi_button.prototype.undo_auto_arrange = function () {
    return this.genericObject.undo_auto_arrange(this);
};
openbexi_button.prototype.redo_auto_arrange = function () {
    return this.genericObject.redo_auto_arrange(this);
};
openbexi_button.prototype.functions_to_test = function () {
    return this.genericObject.functions_to_test(this.div.id);
};
openbexi_button.prototype.functions_to_load = function () {
    return this.genericObject.functions_to_load(this.div.id);
};
openbexi_button.prototype.head_code = function () {
    return this.genericObject.head_code(this);
};

openbexi_button.prototype.body_code = function () {
    return this.genericObject.body_code(this);
};
openbexi_button.prototype.changeStyle = function (objBexiSource, direction) {
    try {
        this.genericObject.changeStyle(objBexiSource, this, direction);
        openbexi_set_CSS(this.button, openbexi_get_CSS(objBexiSource.button));
    } catch (e) {
        __openbexi_debugC("openbexi_button.prototype.changeStyle()", "Exception:" + e.message);

    }
};

openbexi_button.prototype.functions_to_duplicate = function (bexiObjSelected) {
    this.genericObject.functions_to_duplicate(bexiObjSelected.div.id, this.div.id, this.type);

};
openbexi_button.prototype.wizard = function (bexiObjSelected, direction) {
    // Apply the bexiObjSelected functions to this button
    this.functions_to_duplicate(bexiObjSelected);
    // Apply the bexiObjSelected CSS style to this button
    this.changeStyle(bexiObjSelected, direction);
};
openbexi_button.prototype.saveAsTemplate = function () {
    openbexiNavigator.browse_CSS(null, "ob_template_style", null, true);
    openbexiNavigator.window_factory(null, 'ob_menu_RequestBrowser', ob_save_as_template, 'maximize');
};
