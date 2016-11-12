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

function __openbexi_debugC_Body(f, text) {
    try {
        __openbexi_debugC(f, text);
    } catch (e) {
    }
}
var openbexi_flagTop = false;
var openbexi_flagLeft = false;
var openbexi_body = function (name) {
    try {
        __openbexi_debugC_Body("openbexi_body(" + name + ")", "Classe:");

        this.loading_status = "loaded";
        this.styles_BgImg = null;
        // inspector data
        this.inspectorAttributes = [
            ['editor'            , 'BodyEditor'            , 'true']
        ];
        this.popupAttributes = [
            ['menuitem30'  , 'ob_fadeInBody()', 'Show only template', 'gif\/ob_template_icon.png', '48px', '48px'],
            //['menuitem31'  , 'ob_undofadeInBody()', 'Show template and Page', 'gif\/ob_body_icon.png', '48px', '48px'],
            ['menuitem32'  , 'openbexi_addPageTitle(event)', 'CreatePageTitle', 'gif\/ob_title_x48.png', '48px', '48px'],
            ['menuitem16'  , 'openbexi_addMetaTags(event)' , 'CreateMetaTag', 'gif\/ob_metaTag_x48.png', '48px', '48px'],
            ['menuitem17', 'openbexiNavigator.javascript(event, false);', 'Add_javascript_to_body', 'gif\/javascript_x48.png', '48px', '48px'],
            ['menuitem26'  , 'openbexiNavigator.deleteBodyWebPage(event,false)' , 'RemoveAllItems', 'gif\/ob_trash_x48.png', '48px', '48px']
        ];
        this.popupAttributes2 = [
            ['menuitem32'  , 'openbexi_addPageTitle(event)', 'CreatePageTitle', 'gif\/ob_title_x48.png', '48px', '48px'],
            ['menuitem16'  , 'openbexi_addMetaTags(event)' , 'CreateMetaTag', 'gif\/ob_metaTag_x48.png', '48px', '48px'],
            ['menuitem17', 'openbexiNavigator.javascript(event, false);', 'Add_javascript_to_body', 'gif\/javascript_x48.png', '48px', '48px'],
            ['menuitem26'  , 'openbexiNavigator.deleteBodyWebPage(event,false)' , 'RemoveAllItems', 'gif\/ob_trash_x48.png', '48px', '48px']
        ];

        this.popupLinkAttributes = [];

        //openbexi_body properties
        this.name = name;
        this.id = name;
        this.parent = name;
        this.type = "openbexi_body";
        this.parentNodeId = "BODY";

        this.genericObject = new openbexi_generic_object(this);

    } catch (e) {
        __openbexi_debugC_Body("openbexi_body()", "Exception:" + e.message);
    }
};
openbexi_body.prototype.setAttribute = function (name, value) {
    if (value == "")return;
    if (value == null)value = "";
    if (name == "background") {
        openbexi_updatePageData(null, "page", "body", "backgroundImage", "");
        openbexi_updatePageData(null, "page", "body", name, value);
        document.body.style.background = value;
    } else if (name == "backgroundRepeat") {
        openbexi_updatePageData(null, "page", "body", name, value);
        document.body.style.backgroundRepeat = value;
    } else if (name == "backgroundImage") {
        openbexi_updatePageData(null, "page", "body", name, value);
        document.body.style.background = "";
        openbexi_updatePageData(null, "page", "body", "background", "");
        var image = value.replace("url", "").replace("(", "").replace(")", "");
        document.body.style.backgroundImage = 'url(' + image + ')';
        var backgroundRepeat = openbexi_getPageData(null, "page", "body", "backgroundRepeat");
        if (backgroundRepeat == "")
            this.setAttribute("backgroundRepeat", "repeat");
    } else {
        openbexi_updatePageData(null, "page", "body", name, value);
        eval("document.body." + name + " = \"" + value + "\"");
    }
};

openbexi_body.prototype.getPopupAttributes = function () {
    if (openbexiNavigator != null && openbexiNavigator.HTML_pageName == "template.html")
        return   this.popupAttributes2;
    return this.popupAttributes;
};
openbexi_body.prototype.set_template = function (webpage, category, action) {
    if (action == "open")
        openbexiNavigator.open_web_template_page(category, webpage);
    else
        openbexiNavigator.get_web_template_page(category);
};
openbexi_body.prototype.getPopupLinkAttributes = function () {
    return this.popupLinkAttributes;
};
openbexi_body.prototype.getInspectorAttributes = function () {
    return this.inspectorAttributes;
};
openbexi_body.prototype.getText = function () {
    return "";
};
openbexi_body.prototype.setObjSelected = function () {
};
openbexi_body.prototype.setSelected = function (objId) {
    try {
        //this.genericObject.setUnSelected(objId);
        getSelectedBexiObj(null).setUnSelected(objId);
    } catch (e) {
        __openbexi_debugC("openbexi_body.prototype.setSelected()", "Exception:" + e.message);
    }
    try {
        if (currentBexiObj_selected != null && currentBexiObj_selected.type != this.type)
            openbexiNavigator.update_menu_editor(this, false);
    } catch (e) {
        __openbexi_debugC("openbexi_body.prototype.setSelected()", "Exception:" + e.message);
    }
};
openbexi_body.prototype.setUnSelected = function () {
};
openbexi_body.prototype.getChildrenId = function () {
    var count = 0;
    var list = new Array();
    list[count++] = this.id;
    return list;
};
openbexi_body.prototype.pasteText_or_Link = function () {
};
openbexi_body.prototype.getNewChildrenStyleTop = function () {

    for (var i = openbexi_object.length - 1; i >= 0; i--) {
        var childId = openbexi_object[i].div.id;
        if (!protectedObject(childId) && childId != "form0_pager" && getBexiObjParent(getSelectedBexiObj(childId)) == null) {
            if (!childId.match("dojo") || !childId.match("combo_dojo") || (childId.match("label"))) {
                var top = parseInt(document.getElementById(childId).style.top) + parseInt(document.getElementById(childId).style.height) + 2;
                if (parseInt(top) < parseInt(divPropertiesTop) || parseInt(top) > openbexi_getDocumentHeight()) {
                    openbexi_flagTop = true;
                    return parseInt(10) + parseInt(divPropertiesTop);
                }
                else {
                    openbexi_flagTop = false;
                    return top;
                }
            }
        }
    }
    return parseInt(10) + parseInt(divPropertiesTop);
};
openbexi_body.prototype.getNewChildrenStyleLeft = function () {
    var divPropertie = 0;
    var myDocumentElementdiv = document.getElementsByTagName("div");
    if (document.getElementById("divProperties")) {
        if (document.getElementById("divProperties").style.visibility == "visible") {
            divPropertie = document.getElementById("divProperties").style.width;
        }
    } else {
        divPropertie = divPropertiesWidth;
    }
    for (var i = myDocumentElementdiv.length - 1; i >= 0; i--) {
        var childId = myDocumentElementdiv.item(i).id;
        if (!protectedObject(childId) && getBexiObjParent(getSelectedBexiObj(childId)) == null) {
            if (!childId.match("dojo") || childId.match("label")) {
                var left = parseInt(document.getElementById(childId).style.left);
                if (parseInt(left) <= parseInt(divPropertie))return parseInt(10) + parseInt(divPropertie);
                if (parseInt(left) < openbexi_getDocumentWidth()) return left;
            }
        }
    }
    return parseInt(10) + parseInt(divPropertie);
};
openbexi_body.prototype.removeObjects = function () {
    try {
        try {
            this.setAttribute("backgroundImage", null);
            this.setAttribute("background", null);
            this.setAttribute("bgColor", null);
        } catch (e) {
        }
        openbexi_deletePageData(null, "page", "ALL", "ALL", null);
    } catch (e) {
    }
    //this.genericObject.removeObjects();
    this.genericObject.removePageObjects();
    this.setUnSelected();
};
openbexi_body.prototype.debug = function () {
    return this.genericObject.debug(this);
};
openbexi_body.prototype.get_editor = function () {
    return openbexiNavigator.get_menu_editor(this.getPopupAttributes());
};
openbexi_body.prototype.get_link_editor = function () {
    return "";
};
openbexi_body.prototype.align_left_auto_arrange = function () {
    return this.genericObject.align_left_auto_arrange(this);
};
openbexi_body.prototype.align_right_auto_arrange = function () {
    return this.genericObject.align_right_auto_arrange(this);
};
openbexi_body.prototype.align_top_auto_arrange = function () {
    return this.genericObject.align_top_auto_arrange(this);
};
openbexi_body.prototype.align_bottom_auto_arrange = function () {
    return this.genericObject.align_bottom_auto_arrange(this);
};
openbexi_body.prototype.vertical_width_auto_resize = function () {
    return this.genericObject.vertical_width_auto_resize(this);
};
openbexi_body.prototype.vertical_height_auto_resize = function () {
    return this.genericObject.vertical_height_auto_resize(this);
};
openbexi_body.prototype.horizontal_width_auto_resize = function () {
    return this.genericObject.horizontal_width_auto_resize(this);
};
openbexi_body.prototype.horizontal_height_auto_resize = function () {
    return this.genericObject.horizontal_height_auto_resize(this);
};
openbexi_body.prototype.vertical_spacing_auto_arrange = function () {
    return this.genericObject.vertical_spacing_auto_arrange(this);
};
openbexi_body.prototype.horizontal_spacing_auto_arrange = function () {
    return this.genericObject.horizontal_spacing_auto_arrange(this);
};
openbexi_body.prototype.undo_auto_arrange = function () {
    return this.genericObject.undo_auto_arrange(this);
};
openbexi_body.prototype.redo_auto_arrange = function () {
    return this.genericObject.redo_auto_arrange(this);
};
openbexi_body.prototype.functions_to_load = function () {
    return this.genericObject.functions_to_load("BODY");
};
openbexi_body.prototype.head_code = function () {
    return this.genericObject.head_code(this);
};
openbexi_body.prototype.body_code = function () {
    return this.genericObject.body_code(this);
};
openbexi_body.prototype.my_PickFunc = function () {
};
openbexi_body.prototype.show_HTMLTemplate = function () {
    alert("openbexi_body.prototype.show_HTMLTemplate: TBD");
};
openbexi_body.prototype.saveAsTemplate = function () {
    openbexiNavigator.window_factory(null, 'ob_menu_RequestBrowser', ob_save_as_template, 'maximize');
};
openbexi_body.prototype.add_function = function (protocole, functionName, ob_doc) {
    if (this.genericObject != null) this.genericObject.add_function(protocole, functionName, ob_doc);
};

