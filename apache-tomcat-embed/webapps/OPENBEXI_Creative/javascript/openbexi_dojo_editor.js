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

 */
var ob_copyright = "copyright";
// popup data
ob_DOJO_editor_popupAttributes_not_editable = [
    ['menuitem1', 'this.turnToEdit()', 'Turn on editor', 'gif\/edit_mode_x48.png', '48px', '48px'],
    ['menuitem8', 'openbexi_chartFlow_add_endpoint(event,null,null,null,true,null,\'dynamic\')'     , 'AddEndpoint'  , 'gif\/endpoint_x48.png', '48px', '48px'],
    ['menuitem17', 'openbexiNavigator.javascript(event, true);'           , 'Javascript'  , 'gif\/javascript_x48.png', '48px', '48px'],
    ['menuitem82', 'getSelectedBexiObj(null).showLoadEditor(event);', 'Browse RSS', 'gif\/rss_x48.png', '48px', '48px'],
    ['menuitem18', 'this.backward()'         , 'SendToBack'  , 'gif\/move_backward_x48.png', '48px', '48px'],
    ['menuitem20', 'this.forward()'          , 'BringToFront', 'gif\/move_forward_x48.png', '48px', '48px'],
    ['menuitem78', 'this.removeObject(true);openbexiNavigator.update_menu_editor(null, false);'  , 'DlgSelectBtnDelete', 'gif\/text_edit_delete_x48.png', '48px', '48px'],
];
var ob_DOJO_editor_popupAttributes = [
    ['menuitem1', 'this.turnOffEdit()', 'Turn off editor', 'gif\/edit_off_mode_x48.png', '48px', '48px'],
    ['menuitem53' , 'openbexiNavigator.create_tree(\'rawdata\', openbexiNavigator.ob_CSS_editor_json_tree, \'ob_menu_CSS_sub\', null, true, undefined, \'ob_color.CSS\');', 'BGColor', 'gif\/background_color_x48.png', '48px', '48px'],
    ['menuitem20' , 'openbexiNavigator.create_tree(\'rawdata\', openbexiNavigator.ob_CSS_editor_json_tree, \'ob_menu_CSS_sub\', null, true, undefined, \'ob_font.CSS\');', 'Font', 'gif\/ob_font_x32.png', '48px', '48px'],
    ['menuitem10', 'dijit.byId(\'ob_dojo_editor\').execCommand(\'undo\')', 'Undo', 'gif\/undo_x48.png', '48px', '48px'],
    ['menuitem12' , 'dijit.byId(\'ob_dojo_editor\').execCommand(\'redo\')'      , 'Redo', 'gif\/redo_x48.png', '48px', '48px'],
    ['menuitem14' , 'this.add_link(event)'                                      , 'Link', 'gif\/link_add_x48.png', '48px', '48px'],
    ['menuitem13' , 'this.delete_link(event)'                                   , 'Unlink', 'gif\/link_delete_x48.png', '48px', '48px'],
    ['menuitem23' , 'dijit.byId(\'ob_dojo_editor\').execCommand(\'cut\')'       , 'Cut', 'gif\/cut_x48.png', '48px', '48px'],
    ['menuitem24' , 'dijit.byId(\'ob_dojo_editor\').execCommand(\'copy\')'      , 'Copy', 'gif\/copy_x48.png', '48px', '48px'],
    ['menuitem25' , 'dijit.byId(\'ob_dojo_editor\').execCommand(\'past\')'      , 'Past', 'gif\/paste_x48.png', '48px', '48px'],
    ['menuitem35' , 'dijit.byId(\'ob_dojo_editor\').execCommand(\'selectAll\')' , 'SelectAll', 'gif\/select_all_x48.png', '48px', '48px']
];
var ob_rss_load = [
    ['menu_RequestBrowser', 'ob_menu_RequestBrowser', '', '', '', '', '', 'RSS view', '', '560px', '280px', '', ''],
    ['window_left', 'ob_menu_RequestBrowser_sub_left', '', '', '', '', '', '', '', '', '', 'overflow: auto;position:absolute;width:0%;', ''],
    ['end_window_left', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_body', 'ob_menu_RequestBrowser_sub', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow: hidden;position:absolute;width:100%;', ''],
    ['form', 'ob_form', '', '', '', '', '', '', '', '', '', 'position:absolute;left:0px;', ''],
    ['fieldset', 'ob_fieldset', '', '', '', '', '', '', '', '', '', '', ''],
    ['legend', '', '', '', '', '', '', 'RSS editor', '', '', '', '', ''],
    ['input', 'bexicontext_rss_name', '', '', '', '', '', 'RSS name', '', '', '', '', '1'],
    ['sep', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_form', '', '', '', '', '', '', ' name', '', '', '', '', ''],
    ['end_window_body', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_foot', 'ob_menu_RequestBrowser_sub_foot', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow: hidden;position:absolute;height:35%', ''],
    ['ok', '', 'onclick="getSelectedBexiObj(null).load_rss_view(event);"', '', 'onmousedown="src=\'gif/ob_ok_down.png\';"', 'onmouseover="src=\'gif/ob_ok_on.png\';"', 'onmouseout="src=\'gif/ob_ok.png\';"', 'Load RSS', '', '', '', '', ''],
    ['cancel', '', 'onclick="openbexiNavigator.window_factory(event,\'ob_menu_RequestBrowser\',null,\'hidden\');"', '', 'onmousedown="src=\'gif/ob_cancel_down.png\';"', 'onmouseover="src=\'gif/ob_cancel_on.png\';"', 'onmouseout="src=\'gif/ob_cancel.png\';"', 'Cancel', '', '', '', '', ''],

    ['end_window_foot', '', '', '', '', '', '', '', '', '', '', '', '']
];
var openbexi_DOJOeditor_CSS = [
    ['Style'],
    ['FontName'],
    ['FontSize']
    //['FontFormat'],
];
var openbexi_dojo_editor = function (bexiObj, obj, name, top, left, width, height, subtype, text) {
    try {
        __openbexi_debugC("openbexi_dojo_editor(" + bexiObj + "," + obj + "," + name + "," + top + "," + left + "," + width + "," + height + "," + subtype + "," + text + ")", "Classe:");

        this.styles_BgImg = null;
        this.overflow_type = "hidden";
        this.inspectorAttributes = [
            ['editor'                  , 'DOJOeditor'            , 'true'],
            ['textEditor'              , 'DOJOeditor'            , 'true']
        ];
        this.creativeTemplateAttributes = [];
        this.creativeLinkAttributes = [];
        this.creativeAssistantAttributes = [];

        if (openbexiNavigator)
            this.openbexiNavigator = openbexiNavigator;
        else
            this.openbexiNavigator = new openbexi_navigator();
        this.openbexiNavigator.reset();
        //openbexi properties
        this.oDOJOeditor = null;
        this.mode = "not_editable";
        this.name = name;
        this.id = name;
        this.load_completed = false;
        this.type = "openbexi_dojo_editor";
        this.CSS_DOJO = null;
        this.CSS_DIV = null;
        this.bexiParent = bexiObj;
        this.subtype = subtype;
        if (bexiObj == null)
            this.parentNodeId = "BODY";
        else
            this.parentNodeId = bexiObj.id;
        this.theme = "default";
        var divobj;
        if (obj == null) {
            // create object
            divobj = new openbexi_div(bexiObj, obj, name, top, left, width, height);
            this.div = divobj.div;
            this.div.setAttribute("id", name);
            this.div.setAttribute("CLASSE", "DIV_DOJOTEXTAREA");
            this.div.setAttribute("creation_date", new Date());
            this.parent = this.div.id;
            this.div.style.borderRadius = "1em";
            this.div.style.backgroundColor = "white";
            this.div.style.opacity = 0.9;
            this.div.style.position = "absolute";
            this.rss = "data/rss/rss_example_2.0.xml";
            if (text == null)
                this.div.style.border = "0.25em solid #ddd";
            else
                this.div.style.border = "0px solid black";
            this.text = null;
            this.setData();
        } else {
            divobj = new openbexi_div(bexiObj, obj, obj.id, top, left, width, height);
            this.div = divobj.div;
            this.div.setAttribute("id", name);
            this.div.setAttribute("CLASSE", "DIV_DOJOTEXTAREA");
            this.div.setAttribute("creation_date", obj.getAttribute("creation_date"));
            this.div.setAttribute("obzindex", obj.getAttribute("obzindex"));
            this.div.setAttribute("ob_template", obj.getAttribute("ob_template"));
            this.parent = this.div.id;
            this.div.ob_template = obj.getAttribute("ob_template");
            this.dojo_editor = null;
            this.text = null;
            this.div.style.zIndex = obj.getAttribute("obzindex");
            this.getData();
        }
        var nodeText = null;
        if (text == null) {
            nodeText = document.createTextNode("Write or copy and paste your text here!");
            this.div.appendChild(nodeText);
        }
        if (text != null && text != "") {
            nodeText = document.createTextNode(text);
            this.div.appendChild(nodeText);
        }
        this.htmlText = this.div.innerHTML;
        this.genericObject = new openbexi_generic_object(this);
        if (obj == null) this.forward();

        this.width = this.div.width;
        this.height = this.div.height;
        this.top = this.div.top;
        this.left = this.div.left;
        this.border = this.div.border;
        this.set_template(this.template, null, null, null);
    } catch (e) {
        __openbexi_debugC("openbexi_dojo_editor()", "Exception:" + e.message);
    }
}
openbexi_dojo_editor.prototype.setData = function () {
    this.div.style.cursor = "default";
    openbexi_updatePageData(null, "page", this.div.id, "type", this.type);
    openbexi_updatePageData(null, "DOJOeditor", this.div.id, "subtype", this.subtype);
    openbexi_updatePageData(null, "page", this.div.id, "parentId", this.parentNodeId);
    openbexi_updatePageData(null, "page", this.div.id, "parentType", this.parentType);
    openbexi_updatePageData(null, "page", this.div.id, "cursor", this.cursor);
    openbexi_updatePageData(null, "page", this.div.id, "rss", this.rss);
    if (this.theme == "" || this.theme == undefined) {
        this.theme = "default";
        this.subtheme = "none";
    }
    openbexi_updatePageData(null, "page", this.div.id, "theme", this.theme);
    if (this.template == "" || this.template == undefined)  this.template = "template/ob_dojo_editor/default.css";
    openbexi_updatePageData(null, "page", this.div.id, "template", this.template);
}
openbexi_dojo_editor.prototype.getData = function () {
    this.subtype = openbexi_getPageData(null, "DOJOeditor", this.div.id, "subtype");
    var type = openbexi_getPageData(null, "page", this.div.id, "type");
    if (type != "") {
        if (type == "openbexi_FCK_editor")   type = "openbexi_dojo_editor";
        this.type = type;
    }
    var parentNodeId = openbexi_getPageData(null, "page", this.div.id, "parentId");
    if (parentNodeId != "") this.parentNodeId = parentNodeId;
    var parentType = openbexi_getPageData(null, "page", this.div.id, "parentType");
    if (parentType != "")this.parentType = parentType;
    var cursor = openbexi_getPageData(null, "page", this.div.id, "cursor");
    if (cursor != "")this.cursor = cursor;
    this.theme = openbexi_getPageData(null, "page", this.div.id, "theme");
    this.subtheme = openbexi_getPageData(null, "page", this.div.id, "subtheme");
    this.template = openbexi_getPageData(null, "page", this.div.id, "template");
    this.rss = openbexi_getPageData(null, "page", this.div.id, "RSS");
    this.rss_filename = openbexi_getPageData(null, "page", this.div.id, "RSS");
    if (this.rss_filename != "") {
        this.load_rss_view(null);
    }
}
openbexi_dojo_editor.prototype.set_template = function (css_file, category, action, rsync_canvas) {
    if (css_file == null || css_file == "")return;
    if (action == "open") {
        this.subtheme = css_file;
        openbexi_updatePageData(null, "page", this.div.id, "subtheme", css_file);
        openbexiNavigator.browse_CSS(null, null, this.subtheme, true);
    }
    else {
        this.genericObject.set_template(this, css_file, action, rsync_canvas);
        this.div.setAttribute((document.all ? "className" : "class"), "ob_dojo_editor_" + this.theme);
        //$ob_jquery('#'+this.div.id).addClass("ob_dojo_editor_" + this.theme);
    }
}
openbexi_dojo_editor.prototype.getClass = function () {
    return "ob_dojo_editor_" + this.theme;
}
openbexi_dojo_editor.prototype.disabledLink = function () {
    var div = document.getElementById(this.id);
    var inner = div.innerHTML;
    div.innerHTML = inner.replace(/href/g, "href_ob");
}
openbexi_dojo_editor.prototype.enableLink = function () {
    var div = document.getElementById(this.id);
    var inner = div.innerHTML;
    div.innerHTML = inner.replace(/href_ob/g, "href");
}
openbexi_dojo_editor.prototype.getText = function () {
    return this.genericObject.getText();
}
openbexi_dojo_editor.prototype.pasteText_or_Link = function () {
}
openbexi_dojo_editor.prototype.getCreativeTemplateAttributes = function () {
    return this.creativeTemplateAttributes;
}
openbexi_dojo_editor.prototype.getCreativeLinkAttributes = function () {
    return this.creativeLinkAttributes;
}
openbexi_dojo_editor.prototype.getcreativeAssistantAttributes = function () {
    return this.creativeAssistantAttributes;
}
openbexi_dojo_editor.prototype.getPopupAttributes = function () {
    if (this.mode == "editable")
        return ob_DOJO_editor_popupAttributes;
    else
        return ob_DOJO_editor_popupAttributes_not_editable;
}
openbexi_dojo_editor.prototype.getInspectorAttributes = function () {
    return this.inspectorAttributes;
}
openbexi_dojo_editor.prototype.setSelected = function (objId) {
    try {
        this.genericObject.setSelected(objId, true);
        if (this.mode != "editable")
            this.openbexiNavigator.update_menu_editor(this, true);
        else {
            try {
                document.getElementById("ob_sub_menu_editor").innerHTML = this.get_editor();
                openbexiNavigator.create_tree("rawdata", openbexiNavigator.ob_CSS_editor_json_tree, "ob_menu_CSS_sub", null, true, undefined, "ob_color.CSS");
                this.div.innerHTML = "";
                var textfield = document.createElement("textarea");
                this.div.style.overflow = "hidden";
                this.div.appendChild(textfield);

                var editor = new dijit.Editor({
                    id: "ob_dojo_editor",
                    name: "ob_dojo_editor",
                    height: "9999px",
                    plugins: [],
                    onChange: function () {
                    }
                }, textfield);
                editor.startup();
                editor.setValue(this.htmlText);
                editor.onLoadDeferred.addCallback(function () {
                            ob_setDirty_flag(true);
                            var bexiObj = getSelectedBexiObj();
                            if (bexiObj != null && bexiObj.type == "openbexi_dojo_editor") {
                                bexiObj.load_completed = true;
                                bexiObj.dojo_editor = dijit.byId('ob_dojo_editor');
                                openbexi_disable_selection(false);
                                if (ob_rect != null) ob_rect.set('selectable', false);
                                ob_canvas.item(0).hasRotatingPoint = false;
                                ob_canvas.item(0).hasBorders = false;
                                ob_canvas.item(0).hasBorders = false;
                                ob_canvas.item(0).set({
                                    transparentCorners: true
                                });
                                ob_canvas.renderAll();

                                openbexi_reset_all_z(null, null);

                                // Simulate ob_rect frame
                                var ob_rect_frame;
                                if (bexiObj.parentNodeId == "BODY") {
                                    ob_rect_frame = document.getElementById("ob_rect_frame");
                                    if (ob_rect_frame == undefined) {
                                        ob_rect_frame = document.createElement("div");
                                        ob_rect_frame.setAttribute("id", "ob_rect_frame");
                                        ob_rect_frame.style.border = "2px dotted red";
                                        ob_rect_frame.style.position = "absolute";
                                        document.body.appendChild(ob_rect_frame);
                                    }
                                    ob_rect_frame.style.top = ob_rect.top - 2 + "px";
                                    ob_rect_frame.style.left = ob_rect.left - 2 + "px";
                                    ob_rect_frame.style.width = ob_rect.width + "px";
                                    ob_rect_frame.style.height = ob_rect.height + "px";
                                    ob_rect_frame.style.visibility = "visible";
                                    ob_rect_frame.style.zIndex = bexiObj.div.style.zIndex - 1;
                                } else {
                                    ob_rect_frame = document.getElementById(bexiObj.id + "ob_rect_frame");
                                    if (ob_rect_frame == undefined) {
                                        ob_rect_frame = document.createElement("div");
                                        ob_rect_frame.setAttribute("id", bexiObj.id + "ob_rect_frame");
                                        ob_rect_frame.style.border = "2px dotted red";
                                        ob_rect_frame.style.position = "absolute";
                                        document.getElementById(bexiObj.parentNodeId).appendChild(ob_rect_frame);
                                    }
                                    ob_rect_frame.style.top = ob_rect.top - parseFloat(document.getElementById(bexiObj.parentNodeId).style.top) - ((parseFloat(document.getElementById(bexiObj.parentNodeId).offsetWidth) - parseFloat(document.getElementById(bexiObj.parentNodeId).style.width))) + 1 + "px";
                                    ob_rect_frame.style.left = ob_rect.left - parseFloat(document.getElementById(bexiObj.parentNodeId).style.left) - ((parseFloat(document.getElementById(bexiObj.parentNodeId).offsetHeight) - parseFloat(document.getElementById(bexiObj.parentNodeId).style.height))) + 1 + "px";
                                    ob_rect_frame.style.width = ob_rect.width + "px";
                                    ob_rect_frame.style.height = ob_rect.height + "px";
                                    ob_rect_frame.style.visibility = "visible";
                                    ob_rect_frame.style.zIndex = bexiObj.div.style.zIndex - 1;
                                }
                            }
                        }
                );
            }
            catch (e) {
                __openbexi_debugC("openbexi_dojo_editor.prototype.setSelected", "Exception:" + e.message);
            }
        }
    }
    catch (e) {
        __openbexi_debugC("openbexi_dojo_editor.prototype.setSelected", "Exception:" + e.message);
    }
}
openbexi_dojo_editor.prototype.setUnSelected = function (objId) {
    try {
        if (ob_disable_selection) return;

        this.genericObject.setUnSelected(objId);
        if (currentBexiObj_selected.type != this.type)
            this.openbexiNavigator.update_menu_editor(this, false);

        if (this.load_completed) {
            this.load_completed = false;
            if (this.mode == "editable") {
                try {
                    this.htmlText = dijit.byId('ob_dojo_editor').getValue();
                    dijit.byId("ob_dojo_editor").destroy();
                    this.mode = "not_editable";
                    var bexiObj = getSelectedBexiObj(objId);
                    if (bexiObj.parentNodeId == "BODY") {
                        if (document.getElementById("ob_rect_frame") != undefined)
                            document.getElementById("ob_rect_frame").style.visibility = "hidden";
                    }
                    else {
                        if (document.getElementById(bexiObj.id + "ob_rect_frame") != undefined)
                            document.getElementById(bexiObj.id + "ob_rect_frame").style.visibility = "hidden";
                    }
                } catch (e) {
                    alert("openbexi_dojo_editor.prototype.setUnSelected ():" + e.name + ". Error message: " + e.message);
                }
                try {
                    this.set_CSS_div();
                } catch (e) {
                }
            }
        }
        //this.openbexiNavigator.window_factory(null, 'ob_menu_CSS', null, 'hidden');
    } catch (e) {
        __openbexi_debugC("openbexi_dojo_editor.prototype.setUnSelected", "Exception:" + e.message);
    }
}
openbexi_dojo_editor.prototype.setSelectedEndpoint = function (objId) {
    openbexiNavigator.window_factory(null, 'ob_menu_CSS', null, 'minimize');
    if (openbexiNavigator) openbexiNavigator.update_menu_editor(this, true);
    this.first_node_selected = true;
}
openbexi_dojo_editor.prototype.set_CSS_div = function () {
    this.div.innerHTML = this.htmlText;
    this.width = this.div.style.width;
    this.height = this.div.style.height;
    this.top = this.div.style.top;
    this.left = this.div.style.left;
    this.border = this.div.style.border;
    this.div.style.position = "absolute";
    this.div.style.overflow = this.overflow_type;
    this.div.style.width = this.width;
    this.div.style.height = this.height;
    this.div.style.top = this.top;
    this.div.style.left = this.left;
    if (this.div.style.border == null || this.div.style.border == undefined)this.div.style.border = this.border;
}
openbexi_dojo_editor.prototype.enableOverflow = function () {
    this.overflow_type = "";
}
openbexi_dojo_editor.prototype.disableOverflow = function () {
    this.overflow_type = "hidden";
}
openbexi_dojo_editor.prototype.getChildrenId = function () {
    var count = 0;
    var list = new Array();
    list[count++] = this.div.id;
    return list;
}
openbexi_dojo_editor.prototype.setAttribute = function (property, value) {
    try {
        if (this.mode == "editable") {
            if (property == "color") {
                dijit.byId('ob_dojo_editor').execCommand('foreColor', value);
            }
            else if (property == "background") {
                dijit.byId('ob_dojo_editor').execCommand('hiliteColor', value);
            }
            else if (property == "FontName" || property == "fontFamily") {
                dijit.byId('ob_dojo_editor').execCommand('FontName', value, null);
            }
            else if (property == "FontSize" || property == "fontSize") {
                dijit.byId('ob_dojo_editor').execCommand('FontSize', value, null);
            } else
                dijit.byId('ob_dojo_editor').execCommand(value);
        } else {
            return this.genericObject.setAttribute(this.getChildrenId(), property, value);
        }
    } catch (e) {
        __openbexi_debugC("openbexi_dojo_editor.prototype.setAttribute()", "Exception:" + e.message);
    }
}
openbexi_dojo_editor.prototype.getSrc = function () {
    return "";
}
openbexi_dojo_editor.prototype.innerHTML_and_EVENTS = function (objId) {
    return document.getElementById(objId).innerHTML;
}
openbexi_dojo_editor.prototype.changeStyle = function (objBexi, direction) {
    this.genericObject.changeStyle(objBexi, this, direction);
}
openbexi_dojo_editor.prototype.removeObject = function (flag) {
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
    }
    // Clean up old ref.
    try {
        openbexi_deletePageData(null, this.div.id, "ALL", "ALL", null);
    }
    catch (e) {
        __openbexi_debugC_page("openbexi_chartFlow.prototype.removeObject()", "Exception:" + e.message);
    }
    try {
        jsPlumb.removeAllEndpoints(this.div.id);
    }
    catch (e) {
        __openbexi_debugC_page("openbexi_chartFlow.prototype.removeObject()", "Exception:" + e.message);
    }
    this.genericObject.removeObject(this);
    ob_setDirty_flag(flag);
}
openbexi_dojo_editor.prototype.my_PickFunc = function (e) {
    openbexi_stopEventPropagation(e);
    var bexiObj = getSelectedBexiObj(this.id);
    my_PickFunc(bexiObj.div);
}
openbexi_dojo_editor.prototype.add_link = function (event, url) {
    try {
        openbexi_stopEventPropagation(event);
        if (url == null) {
            var urlText = openbexi_getPageData(null, "url_0", this.div.id, "url");
            if (urlText == "") {
                url = prompt(openbexi_lang("enterObjectURL") + ":", "http://");
                this.div.title = "";
            }
            else {
                url = prompt(openbexi_lang("enterObjectURL") + ":", urlText);
                this.div.title = url;
            }
        }
        if (url != null) {
            dijit.byId('ob_dojo_editor').execCommand('createLink', url);
            this.div.title = url;
        }
    } catch (e) {
        __openbexi_debugC("openbexi_dojo_editor.prototype.add_link()", "Exception: " + e.message);
    }
}
openbexi_dojo_editor.prototype.delete_link = function (event) {
    try {
        openbexi_stopEventPropagation(event);
        this.div.title = "";
        dijit.byId('ob_dojo_editor').execCommand('unlink');
    } catch (e) {
        __openbexi_debugC("openbexi_dojo_editor.prototype.add_link()", "Exception: " + e.message);
    }
}
openbexi_dojo_editor.prototype.add_function = function (protocole, functionName, ob_doc) {
    if (this.genericObject != null) this.genericObject.add_function(protocole, functionName, ob_doc);
}
openbexi_dojo_editor.prototype.get_editor = function () {
    return this.openbexiNavigator.get_menu_editor(this.getPopupAttributes());
}
openbexi_dojo_editor.prototype.disableOverflow = function () {
    this.overflow_type = "hidden";
    this.div.style.overflow = this.overflow_type;
    this.updatePopupAttributes("DisableOverflow", "EnableOverflow", "this.enableOverflow()", "gif\/overflow.jpg", false);
    my_PickFunc(this.div);
}
openbexi_dojo_editor.prototype.enableOverflow = function () {
    this.overflow_type = "";
    this.div.style.overflow = this.overflow_type;
    this.updatePopupAttributes("EnableOverflow", "DisableOverflow", "this.disableOverflow()", "gif\/no_overflow.jpg", false);
    my_PickFunc(this.div);
}
openbexi_dojo_editor.prototype.updatePopupAttributes = function (text, new_text, new_fcn, new_img, updateInspector) {
    if (this.genericObject != null) {
        this.genericObject.updatePopupAttributes(this, text, new_text, new_fcn, new_img, this.inspectorAttributes[0][1], updateInspector);
    }
}
openbexi_dojo_editor.prototype.forward = function () {
    return this.genericObject.forward(this.div, "+");
}
openbexi_dojo_editor.prototype.backward = function () {
    return this.genericObject.backward(this.div, "-");
}
openbexi_dojo_editor.prototype.debug = function () {
    return this.genericObject.debug(this);
}
openbexi_dojo_editor.prototype.align_left_auto_arrange = function () {
    return this.genericObject.align_left_auto_arrange(this);
}
openbexi_dojo_editor.prototype.align_right_auto_arrange = function () {
    return this.genericObject.align_right_auto_arrange(this);
}
openbexi_dojo_editor.prototype.align_top_auto_arrange = function () {
    return this.genericObject.align_top_auto_arrange(this);
}
openbexi_dojo_editor.prototype.align_bottom_auto_arrange = function () {
    return this.genericObject.align_bottom_auto_arrange(this);
}
openbexi_dojo_editor.prototype.vertical_width_auto_resize = function () {
    return this.genericObject.vertical_width_auto_resize(this);
}
openbexi_dojo_editor.prototype.vertical_height_auto_resize = function () {
    return this.genericObject.vertical_height_auto_resize(this);
}
openbexi_dojo_editor.prototype.horizontal_width_auto_resize = function () {
    return this.genericObject.horizontal_width_auto_resize(this);
}
openbexi_dojo_editor.prototype.horizontal_height_auto_resize = function () {
    return this.genericObject.horizontal_height_auto_resize(this);
}
openbexi_dojo_editor.prototype.vertical_spacing_auto_arrange = function () {
    return this.genericObject.vertical_spacing_auto_arrange(this);
}
openbexi_dojo_editor.prototype.horizontal_spacing_auto_arrange = function () {
    return this.genericObject.horizontal_spacing_auto_arrange(this);
}
openbexi_dojo_editor.prototype.undo_auto_arrange = function () {
    return this.genericObject.undo_auto_arrange(this);
}
openbexi_dojo_editor.prototype.redo_auto_arrange = function () {
    return this.genericObject.redo_auto_arrange(this);
}
openbexi_dojo_editor.prototype.functions_to_load = function () {
    return this.genericObject.functions_to_load(this.div.id);
}
openbexi_dojo_editor.prototype.head_code = function () {
    openbexi_add_javascript(null, "javascript/", "openbexi_dojo_editor.js");
    return this.genericObject.head_code(this);
}
openbexi_dojo_editor.prototype.body_code = function () {
    return this.genericObject.body_code(this);
}
openbexi_dojo_editor.prototype.turnToEdit = function () {
    this.mode = "editable";
    openbexi_disable_selection(true);
    this.setSelected(this.div.id);
}
openbexi_dojo_editor.prototype.turnOffEdit = function () {
    my_PickFunc('BODY');
}
openbexi_dojo_editor.prototype.creativeEditor = function (creativeAttributes) {
    var left = parseInt(this.div.style.left);
    var editor_top = parseInt(this.div.style.top) + parseInt(this.div.style.height);
    this.genericObject.get_creative_editor("divLinkEditor", creativeAttributes, editor_top, left);
    openbexi_openCreativeEditor("divLinkEditor");
    this.setListEditor();
}
openbexi_dojo_editor.prototype.moveLabel = function () {
    var dojoId = this.div.id.replace("label_", "");
    var divDojo = document.getElementById(dojoId);
    if (divDojo != null) {
        var delta = 5;
        //var delta =parseInt(document.getElementById(dojoId).style.left)-(parseInt(this.div.style.left)+parseInt(this.div.style.width));
        divDojo.style.left = (parseInt(this.div.style.left) + parseInt(this.div.style.width) + delta) + "px";
        divDojo.style.top = this.div.style.top;
    }
}
openbexi_dojo_editor.prototype.resizeLabel = function () {
    var dojoId = this.div.id.replace("label_", "");
    var divDojo = document.getElementById(dojoId);
    if (divDojo != null) {
        var delta = 5;
        //var delta =parseInt(document.getElementById(dojoId).style.left)-(parseInt(this.div.style.left)+parseInt(this.div.style.width));
        divDojo.style.left = (parseInt(this.div.style.left) + parseInt(this.div.style.width) + delta) + "px";
        divDojo.style.top = this.div.style.top;
    }
}
openbexi_dojo_editor.prototype.setDefaultRSS = function () {
    try {
        this.div.innerHTML = '<div class=ob_rss_title id="' + this.div.id + '_rssTitleTemplate">(::Title::)<br/><a class=ob_rss_link href="(::Link::)"><h2 class=ob_rss_description>(::Description::)</h2></a></div><div class=ob_rss_body id="' + this.div.id + '_rssBodyTemplate"><a class=ob_rss_link_body href="(::Link::)"><b class=ob_rss_title_body>(::Title::)</b></a> <b class=ob_rss_pubdate_body>(::Pubdate::)</b><br/><font class=ob_rss_description_body >(::Description::)</font><hr class=ob_shade noshade/><br/>';
        //this.div.innerHTML = '<div class=ob_rss_title id="' + this.div.id + '_rssTitleTemplate">(::Title::)<br/><a class=ob_rss_link href="(::Link::)"><h2 class=ob_rss_description>(::Description::)</h2></a></div><div class=ob_rss_body id="' + this.div.id + '_rssBodyTemplate"><a class=ob_rss_link_body href="(::Link::)"><b class=ob_rss_title_body>(::Title::)</b></a> <b class=ob_rss_pubdate_body>(::Pubdate::)</b><br/><font class=ob_rss_description_body >(::Description::)</font><hr noshade/><br/>';
    } catch (e) {
    }
}
openbexi_dojo_editor.prototype.browseRSS = function (event) {
    try {
        this.setDefaultRSS();
        if (this.openbexiNavigator) this.openbexiNavigator.mode = "getRSS";
        if (this.openbexiNavigator) this.openbexiNavigator.display(event, 0);
    } catch (e) {
    }
}

openbexi_dojo_editor.prototype.load_rss_view = function (event) {
    try {
        var ob_rssFeed = "";
        var doc = null;
        openbexi_stopEventPropagation(event);
        if (document.getElementById("bexicontext_rss_name")) {
            ob_rssFeed = document.getElementById("bexicontext_rss_name").value;
            openbexi_updatePageData(null, "page", this.div.id, "RSS", ob_rssFeed);
        } else {
            ob_rssFeed = openbexi_getPageData(null, "page", this.div.id, "RSS");
        }

        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_readRSSRequest");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "project", openbexiNavigator.projectName);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filename", openbexiNavigator.HTML_short_pageName);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "div", "name", this.div.id);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "xml", "ob_type", "XML");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "xml", "filename", ob_rssFeed);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "xml", "div_id", this.div.id);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "xml", "Body", this.div.id + "_rssBodyTemplate");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "xml", "Title", this.div.id + "_rssTitleTemplate");
        var ob_xml = openbexi_get_xmlString(doc);
        var mode_sync = openbexi_synchron();
        openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_readRSS_CB);
    }
    catch (e) {
        alert("openbexi_readRSS:" + e.message + "\rss=" + ob_rssFeed);
    }
}
openbexi_dojo_editor.prototype.showLoadEditor = function (event) {
    try {
        openbexiNavigator.window_factory(null, 'ob_menu_RequestBrowser', ob_rss_load, 'maximize');
        document.getElementById("bexicontext_rss_name").value = this.rss;
        this.browseRSS(event);
    } catch (e) {
        __openbexi_debugC_tree("openbexi_dojo_editor.prototype.showViewEditor()", "Exception:" + e.message);
    }
}

function ob_replace(totalValue, oldValue, newValue) {
    while (totalValue.indexOf(oldValue) > -1)
        totalValue = totalValue.replace(oldValue, newValue);
    return totalValue;
}

function ob_getNode2(TagName, node, items, xmlDoc) {
    try {
        var currentNode = (node == null) ? xmlDoc.getElementsByTagName(TagName) :
                items[node].getElementsByTagName(TagName);
        if (currentNode.length > 0)
            return currentNode[0].firstChild.textContent;
    } catch (e) {
    }
    return null;
}
function ob_getNode(TagName, node, items, xmlDoc) {
    try {
        var currentNode = (node == null) ? xmlDoc.getElementsByTagName(TagName) :
                items[node].getElementsByTagName(TagName);
        if (currentNode.length > 0) {
            var val = "";
            var listOfChildTextNodes;

            var directChildren = currentNode[0].childNodes;
            for (m = 0; m < directChildren.length; m++) {
                /* Found the tag, extract its text value */
                val += listOfChildTextNodes = directChildren[m].nodeValue;
            }
            return val;
        }
    } catch (e) {
    }
    return null;
}
function openbexi_readRSS_CB(responseXML) {
    try {
        if (this.openbexiNavigator) this.openbexiNavigator.reset();
    } catch (e) {
    }

    // Reset RSS before overwritting the new one.
    var ob_doc = openbexi_get_documentElement(responseXML, "text/xml");
    try {
        var div_id = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "xml", "div_id");
        var filename = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "xml", "filename");
        if (filename != "")
            openbexi_updatePageData(null, "page", div_id, "RSS", filename);
        getSelectedBexiObj(null).setDefaultRSS();
    } catch (e) {
    }
    var Body = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "xml", "Body");
    var Title = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "xml", "Title");
    var xmlString = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "xml", "text");
    if (xmlString == "")xmlString = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "xml", "text");
    var rssTitle = document.getElementById(Title);
    var rssBody = document.getElementById(Body);
    var items;

    try {
        var xmlDoc = openbexi_loadXMLDocument(xmlString);
        items = xmlDoc.getElementsByTagName('item');
        if (items.length == 0)items = xmlDoc.getElementsByTagName('description');
        if (items.length == 0) {
            rssTitle.innerHTML = 'Error occured';
            rssBody.innerHTML = 'Sorry, cannot read data' + "<br/>";
        } else {
            openbexi_setRSSTemplates(items, rssTitle, rssBody, xmlDoc);
        }
    }
    catch (e) {
        rssTitle.innerHTML = 'Error occured';
        rssBody.innerHTML = 'Thrown Error:' + e.message + "<br/>";
    }
}
function openbexi_readRSS(div_id, ob_rssFeed, Body, Title) {
    try {
        var doc = null;
        if (ob_rssFeed == null || ob_rssFeed == undefined) ob_rssFeed = openbexi_getPageData(null, "page", div_id, "RSS");
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_readRSSRequest");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "xml", "ob_type", "XML");
        //doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "project", openbexiNavigator.projectName);
        //doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filename", openbexiNavigator.HTML_short_pageName);
        //doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "div", "name", div_id);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "xml", "filename", ob_rssFeed);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "xml", "div_id", div_id);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "xml", "Body", Body);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "xml", "Title", Title);
        var ob_xml = openbexi_get_xmlString(doc);
        var mode_sync = openbexi_synchron();
        openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_readRSS_CB);
    }
    catch (e) {
        alert("openbexi_readRSS:" + e.message + "\rss=" + ob_rssFeed);
    }
}
function openbexi_setRSSTemplates(items, rssTitle, rssBody, xmlDoc) {
    if (rssBody) {
        var buffer = "";
        var node;
        var output;
        for (var i = 0; i < items.length; i++) {
            //rssBody.firstChild.href = "javascript:void(0)";
            node = ob_getNode('link', i, items, xmlDoc);
            if (node == null || node == "javascript:void(0)") {
                rssBody.firstChild.href = "javascript:void(0)";
            }
            output = (document.all) ? ob_replace(rssBody.innerHTML, "(::Link::)", node) : ob_replace(rssBody.innerHTML, "%28::Link::%29", node);
            var title = ob_getNode('title', i, items, xmlDoc);
            if (title != null)
                output = ob_replace(output, "(::Title::)", title);
            else
                output = ob_replace(output, "(::Title::)", "");
            var pubDate = ob_getNode('pubDate', i, items, xmlDoc);
            if (pubDate != null)
                output = ob_replace(output, "(::Pubdate::)", pubDate);
            else
                output = ob_replace(output, "(::Pubdate::)", "");
            var description = ob_getNode('description', i, items, xmlDoc);
            if (description != null)
                output = ob_replace(output, "(::Description::)", description);
            else
                output = ob_replace(output, "(::Description::)", "");
            buffer += output;
        }
        rssBody.innerHTML = buffer;
    }

    if (rssTitle) {
        output = ob_replace(rssTitle.innerHTML, "(::Title::)", ob_getNode('title', null, items, xmlDoc));
        node = ob_getNode('link', null, items, xmlDoc);
        if (node == null) {
            rssTitle.firstChild.href = "javascript:void(0)";
        }
        output = (document.all) ? ob_replace(output, "(::Link::)", node) : ob_replace(output, "%28::Link::%29", node);
        if (ob_getNode('description', null, items, xmlDoc) == null)
            output = ob_replace(output, "(::Description::)", "");
        else
            output = ob_replace(output, "(::Description::)", ob_getNode('description', null, items, xmlDoc));
        rssTitle.innerHTML = output;
    }

}
var ob_disable_selection = false;
function openbexi_disable_selection(flag) {
    ob_disable_selection = flag;
    //document.getElementById("divProperties").disabled = flag;
}

