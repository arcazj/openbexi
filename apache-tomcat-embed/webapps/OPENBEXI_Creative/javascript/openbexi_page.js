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
var openbexi_TopCounter = 0;
var openbexi_LeftCounter = 0;
var ob_page_inspectorAttributes = [
    ['editor'            , 'Div/PageEditor'      , 'true']
];
var ob_copyright = "copyright";

var ob_page_popupAttributes = [
    ['menuitem7', 'openbexiNavigator.javascript(event, true);', 'Javascript'  , 'gif\/javascript_x48.png', '48px', '48px'],
    ['menuitem11', 'openbexi_chartFlow_add_endpoint(event,null,null,null,true,null,\'dynamic\')'     , 'AddEndpoint'  , 'gif\/endpoint_x48.png', '48px', '48px'],
    ['menuitem18', 'this.backward()'         , 'SendToBack'  , 'gif\/move_backward_x48.png', '48px', '48px'],
    ['menuitem20', 'this.forward()'          , 'BringToFront', 'gif\/move_forward_x48.png', '48px', '48px'],
    ['menuitem51' , 'this.removePageObjects();openbexiNavigator.update_menu_editor(null, false);'    , 'RemoveAllPageItems', 'gif\/page_delete_elt_x48.png', '48px', '48px'],
    ['menuitem53' , 'this.removeObject(true);openbexiNavigator.update_menu_editor(null, false);'         , 'DlgSelectBtnDelete', 'gif\/page_delete_x48.png', '48px', '48px']
];
var ob_page_popupWidgets = [
    //['gallery','ob_menu_widget_page','','openbexiNavigator.drop_widget(event,\'page\');','','this.src=\'gif/page_standby_x64.png\';this.title=openbexi_lang(\'Page\');','this.src=\'gif/page_x64.png\';','Page','gif/page_x64.png','64px','64px'],
    ['gallery', 'ob_menu_widget_box', '', 'openbexiNavigator.drop_widget(event,\'box\');', '', 'this.src=\'gif/box_standby_x64.png\';this.title=openbexi_lang(\'Box\');', 'this.src=\'gif/box_x64.PNG\';', 'Box', 'gif/box_x64.PNG', '64px', '64px'],
    ['gallery', 'ob_menu_widget_link', '', 'openbexiNavigator.drop_widget(event,\'link\');', '', 'this.src=\'gif/link_standby_x64.png\';this.title=openbexi_lang(\'Link\');', 'this.src=\'gif/link_x64.png\';', 'Link', 'gif/link_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_button', '', 'openbexiNavigator.drop_widget(event,\'button\');', '', 'this.src=\'gif/button_standby_x64.png\';this.title=openbexi_lang(\'Button\');', 'this.src=\'gif/button_x64.png\';', 'Button', 'gif/button_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_text_edit', '', 'openbexiNavigator.drop_widget(event,\'text_edit\');', '', 'this.src=\'gif/text_edit_standby_x64.png\';this.title=openbexi_lang(\'Text\');', 'this.src=\'gif/text_edit_x64.png\';', 'Text', 'gif/text_edit_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_image', '', 'openbexiNavigator.browse_picture(\'images\',\'none\',null,\'tree\',true);', '', 'this.src=\'gif/image_standby_x64.png\';this.title=openbexi_lang(\'Image\');', 'this.src=\'gif/image_x64.png\';', 'Image', 'gif/image_x64.png', '64px', '64px', "cursor:pointer", ''],
    ['gallery', 'ob_menu_widget_chartFlow', '', 'openbexiNavigator.drop_widget(event,\'chartFlow\');', '', 'this.src=\'gif/chartFlow_standby_x64.png\';this.title=openbexi_lang(\'Dynamic Flowchart\');', 'this.src=\'gif/chartFlow_x64.png\';', 'Dynamic Flowchart', 'gif/chartFlow_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_list', '', 'openbexiNavigator.drop_widget(event,\'list\');', '', 'this.src=\'gif/list_standby_x64.png\';this.title=openbexi_lang(\'List\');', 'this.src=\'gif/list_x64.png\';', 'List', 'gif/list_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_tree', '', 'openbexiNavigator.drop_widget(event,\'tree\');', '', 'this.src=\'gif/tree_standby_x64.png\';this.title=openbexi_lang(\'Tree\');', 'this.src=\'gif/tree_x64.png\';', 'Tree', 'gif/tree_x64.png', '64px', '64px'],
    //['gallery','ob_menu_widget_form','','openbexiNavigator.drop_widget(event,\'form\');','','this.src=\'gif/form_standby_x64.png\';this.title=openbexi_lang(\'Form\');','this.src=\'gif/form_x64.png\';','Form','gif/form_x64.png','64px','64px'],
    ['gallery', 'ob_menu_widget_simile', '', 'openbexiNavigator.drop_widget(event,\'simile\');', '', 'this.src=\'gif/simile_standby_x64.png\';this.title=openbexi_lang(\'Simile\');', 'this.src=\'gif/simile_x64.png\';', 'Simile', 'gif/simile_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_calendar', '', 'openbexiNavigator.drop_widget(event,\'calendar\');', '', 'this.src=\'gif/calendar_standby_x64.png\';this.title=openbexi_lang(\'Calendar\');', 'this.src=\'gif/calendar_x64.png\';', 'Calendar', 'gif/calendar_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_dygraphs', '', 'openbexiNavigator.drop_widget(event,\'dygraphs\');', '', 'this.src=\'gif/dygraphs_x64.png\';this.title=openbexi_lang(\'Dygraphs\');', 'this.src=\'gif/dygraphs_x64.png\';', 'dygraphs', 'gif/dygraphs_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_chartPie', '', 'openbexiNavigator.drop_widget(event,\'chartPie\');', '', 'this.src=\'gif/chartPie_x64.png\';this.title=openbexi_lang(\'ChartPie\');', 'this.src=\'gif/chartPie_x64.png\';', 'ChartPie', 'gif/chartPie_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_chartBar', '', 'openbexiNavigator.drop_widget(event,\'chartBar\');', '', 'this.src=\'gif/chartBar_standby_x64.png\';this.title=openbexi_lang(\'ChartBar\');', 'this.src=\'gif/chartBar_x64.png\';', 'ChartBar', 'gif/chartBar_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_chartLine', '', 'openbexiNavigator.drop_widget(event,\'chartLine\');', '', 'this.src=\'gif/chartLine_standby_x64.png\';this.title=openbexi_lang(\'ChartLine\');', 'this.src=\'gif/chartLine_x64.png\';', 'ChartLine', 'gif/chartLine_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_clock', '', 'openbexiNavigator.drop_widget(event,\'clock\');', '', 'this.src=\'gif/clock_standby_x64.png\';this.title=openbexi_lang(\'Clock\');', 'this.src=\'gif/clock_x64.png\';', 'Clock', 'gif/clock_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_grid', '', 'openbexiNavigator.drop_widget(event,\'grid\');', '', 'this.src=\'gif/grid_standby_x64.png\';this.title=openbexi_lang(\'Grid\');', 'this.src=\'gif/grid_x64.png\';', 'Grid', 'gif/grid_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_fisheye', '', 'openbexiNavigator.drop_widget(event,\'fisheye\');', '', 'this.src=\'gif/fisheye_standby_x64.png\';this.title=openbexi_lang(\'Fisheye\');', 'this.src=\'gif/fisheye_x64.png\';', 'Fisheye', 'gif/fisheye_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_copyright', '', 'openbexiNavigator.drop_widget(event,\'copyright\');', '', 'this.src=\'gif/copyright_standby_x64.png\';this.title=openbexi_lang(\'Copyright\');', 'this.src=\'gif/copyright_x64.png\';', 'Copyright', 'gif/copyright_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_video', '', 'openbexiNavigator.browse_picture(\'video\',\'none\',null,\'tree\',true);', '', 'this.src=\'gif/video_standby_x64.png\';this.title=openbexi_lang(\'Video\');', 'this.src=\'gif/video_x64.png\';', 'Video', 'gif/video_x64.png', '64px', '64px', "cursor:pointer", '']
];
function __openbexi_debugC_page(f, text) {
    try {
        __openbexi_debugC(f, text);
    } catch (e) {
    }
}
var openbexi_page = function (bexiObj, obj, name, top, left, width, height, positionning, background) {
    try {
        __openbexi_debugC_page("openbexi_page(" + bexiObj + "," + obj + "," + name + "," + top + "," + left + "," + width + "," + height + "," + positionning + ")", "Classe:");

        this.loading_status = "loaded";
        this.styles_BgImg = null;
        this.name = name;
        this.id = name;
        this.type = "openbexi_page";
        this.positionning = positionning;
        this.jsPlumbInstance = null;

        if (name == null || name == "") name = getNewIdDiv("div");
        if (bexiObj == null) {
            this.parentNodeId = "BODY";
        } else {
            this.parentNodeId = bexiObj.id;
        }
        if (obj == null) {
            this.div = document.createElement("div");
            this.div.setAttribute("id", name);
            this.parent = this.div.id;
            this.div.setAttribute("CLASSE", "DIV_PAGE");
            this.div.setAttribute("creation_date", new Date());
            this.div.selected = false;

            this.div.style.top = parseInt(top) + "px";
            this.div.style.left = parseInt(left) + "px";
            this.div.style.width = parseInt(width) + "px";
            this.div.style.height = parseInt(height) + "px";
            if (positionning == "relative") {
                //this.div.style.margin = "0 auto";
                //this.div.style.position = "relative";
                this.div.style.position = "absolute";
            }
            else {
                this.div.style.position = "absolute";
            }
            this.div.style.border = "0.25em solid rgb(221, 221, 221)";
            this.div.style.borderRadius = "1em";

            if (bexiObj == null) {
                document.body.appendChild(this.div);
                //__openbexi_debugC_page("openbexi_page",document.body.innerHTML)
            } else {
                bexiObj.div.appendChild(this.div);
            }
            this.setData();
        } else {
            this.div = obj;
            this.div.setAttribute("id", name);
            this.parent = this.div.id;
            this.div.ob_template = obj.getAttribute("ob_template");
            this.div.setAttribute("CLASSE", "DIV_PAGE");
            this.div.setAttribute("creation_date", obj.getAttribute("creation_date"));
            this.div.setAttribute("obzindex", obj.getAttribute("obzindex"));
            this.div.setAttribute("ob_template", obj.getAttribute("ob_template"));
            this.div.selected = false;
            this.div.style.position = "absolute";
            this.div.style.top = parseInt(this.div.style.top) + "px";
            if (bexiObj == null) {
                this.div.style.left = (parseInt(this.div.style.left) + parseInt(divPropertiesWidth)) + "px";
                this.div.style.top = (parseInt(this.div.style.top) + parseInt(divPropertiesTop)) + "px";
            }
            this.div.style.zIndex = obj.getAttribute("obzindex");
            this.getData();
        }
        this.genericObject = new openbexi_generic_object(this);
        this.setAttributes();
        this.move_position();
        this.div.onclick = this.my_PickFunc;
        this.set_template(this.template, null, null, null);
    } catch (e) {
        __openbexi_debugC_page("openbexi_page()", "Exception:" + e.message);
    }
    return this;
}
openbexi_page.prototype.getData = function () {
    var type = openbexi_getPageData(null, "page", this.div.id, "type");
    if (type != "") this.type = type;
    var subtype = openbexi_getPageData(null, "page", this.div.id, "subtype");
    if (subtype != "") this.subtype = subtype;
    var positionning = openbexi_getPageData(null, "page", this.div.id, "positionning");
    if (positionning != "")
        this.positionning = positionning;
    else
        this.positionning = "absolute";
    var parentNodeId = openbexi_getPageData(null, "page", this.div.id, "parentId");
    if (parentNodeId != "") this.parentNodeId = parentNodeId;
    var parentType = openbexi_getPageData(null, "page", this.div.id, "parentType");
    if (parentType != "")this.parentType = parentType;
    this.type = openbexi_getPageData(null, "page", this.div.id, "type");
    this.theme = openbexi_getPageData(null, "page", this.div.id, "theme");
    this.subtheme = openbexi_getPageData(null, "page", this.div.id, "subtheme");
    this.template = openbexi_getPageData(null, "page", this.div.id, "template");
}
openbexi_page.prototype.setData = function () {
    this.div.style.cursor = "default";
    openbexi_updatePageData(null, "page", this.div.id, "type", this.type);
    openbexi_updatePageData(null, "page", this.div.id, "subtype", this.subtype);
    openbexi_updatePageData(null, "page", this.div.id, "positionning", this.positionning);
    openbexi_updatePageData(null, "page", this.div.id, "left", this.div.style.left);
    openbexi_updatePageData(null, "page", this.div.id, "margin", this.div.style.margin);
    openbexi_updatePageData(null, "page", this.div.id, "parentId", this.parentNodeId);
    openbexi_updatePageData(null, "page", this.div.id, "parentType", this.parentType);
    if (this.theme == "" || this.theme == undefined) {
        this.theme = "default";
        this.subtheme = "none";
    }
    openbexi_updatePageData(null, "page", this.div.id, "theme", this.theme);
    openbexi_updatePageData(null, "page", this.div.id, "subtheme", this.subtheme);
    if (this.template == "" || this.template == undefined)  this.template = "template/ob_page/default.css";
    openbexi_updatePageData(null, "page", this.div.id, "template", this.template);
}
openbexi_page.prototype.getClass = function () {
    return "ob_page_" + this.theme;
}
openbexi_page.prototype.setSelected = function (objId) {
    this.genericObject.setSelected(objId, true);
    if (openbexiNavigator) {
        openbexiNavigator.update_menu_editor(this, true);
        // if (this.div.ob_template == "false" || openbexiNavigator.HTML_pageName == "template.html"|| this.positionning == "relative")
        openbexiNavigator.window_factory(null, 'ob_menu_widget', this.getPopupWidgets(), 'minimize');
        //openbexi_reset_all_z(document.getElementById(objId), "add");
    }
}
openbexi_page.prototype.setUnSelected = function (objId) {
    try {
        this.genericObject.setUnSelected(objId);
        if (currentBexiObj_selected.type != this.type)
            openbexiNavigator.update_menu_editor(this, false);
    } catch (e) {
        __openbexi_debugC("openbexi_page.prototype.setUnSelected()", "Exception:" + e.message);
    }
}
openbexi_page.prototype.getChildrenId = function () {
    var count = 0;
    var list = new Array();
    list[count++] = this.div.id;
    return list;
}
openbexi_page.prototype.getNewChildrenStyleTop = function () {
    for (var j = document.getElementById(this.parent).childNodes.length - 1; j >= 0; j--) {
        var childId = document.getElementById(this.parent).childNodes[j].id;
        if (childId != null && childId != "") {
            var top = parseInt(document.getElementById(childId).style.top);
            if (parseInt(this.div.style.height) <= parseInt(this.div.style.width)) {
                return top + openbexi_TopCounter;
            } else {
                top = parseInt(document.getElementById(childId).style.top) + parseInt(document.getElementById(childId).style.height) + 2;
                if (parseInt(top) + parseInt(document.getElementById(childId).style.height) < parseInt(this.div.style.height)) {
                    return top + openbexi_TopCounter;
                } else {
                    if (openbexi_TopCounter >= parseInt(this.div.style.height))openbexi_TopCounter = 0;
                    openbexi_LeftCounter = openbexi_LeftCounter + 3;
                    return parseInt(openbexi_TopCounter = openbexi_TopCounter + 3);
                }
            }
        }
    }
    if (openbexi_TopCounter >= parseInt(this.div.style.height))openbexi_TopCounter = 0;
    return parseInt(openbexi_TopCounter = openbexi_TopCounter + 3);
}
openbexi_page.prototype.getNewChildrenStyleLeft = function () {
    for (var j = document.getElementById(this.parent).childNodes.length - 1; j >= 0; j--) {
        var childId = document.getElementById(this.parent).childNodes[j].id;
        if (childId != null && childId != "") {
            var left = parseInt(document.getElementById(childId).style.left);
            if (parseInt(this.div.style.height) >= parseInt(this.div.style.width)) {
                return left;
            } else {
                if (left + parseInt(document.getElementById(childId).style.width) < parseInt(this.div.style.width)) {
                    left += parseInt(document.getElementById(childId).style.width) + 2;
                    return left + openbexi_LeftCounter;
                } else {
                    if (openbexi_LeftCounter >= parseInt(this.div.style.width))openbexi_LeftCounter = 0;
                    openbexi_LeftCounter = openbexi_LeftCounter + 3;
                    return parseInt(5);
                }
            }
        }
    }
    if (openbexi_LeftCounter >= parseInt(this.div.style.height))openbexi_LeftCounter = 0;
    openbexi_LeftCounter = openbexi_LeftCounter + 3;
    return parseInt(5);
}
openbexi_page.prototype.set_template = function (css_file, category, action, rsync_canvas) {
    if (css_file == null || css_file == "")return;
    if (action == "open") {
        this.subtheme = css_file;
        openbexi_updatePageData(null, "page", this.div.id, "subtheme", css_file);
        openbexiNavigator.browse_CSS(null, null, this.subtheme, true);
    }
    else {
        this.genericObject.set_template(this, css_file, action, rsync_canvas);
        this.div.setAttribute((document.all ? "className" : "class"), "ob_page_" + this.theme);
    }
}
openbexi_page.prototype.setSelectedEndpoint = function (objId) {
    openbexiNavigator.window_factory(null, 'ob_menu_CSS', null, 'minimize');
    if (openbexiNavigator) openbexiNavigator.update_menu_editor(this, true);
    this.first_node_selected = true;
}
openbexi_page.prototype.getText = function () {
    return this.div.firstChild.nodeValue;
}
openbexi_page.prototype.getPopupAttributes = function () {
    return ob_page_popupAttributes;
}
openbexi_page.prototype.getPopupWidgets = function () {
    return ob_page_popupWidgets;
}
openbexi_page.prototype.getInspectorAttributes = function () {
    return ob_page_inspectorAttributes;
}
openbexi_page.prototype.setAttribute = function (name, value) {
    return this.genericObject.setAttribute(this.getChildrenId(), name, value);
}
openbexi_page.prototype.setAttributes = function () {
    return this.genericObject.setAttributes(this.div.id);
}
openbexi_page.prototype.setURL = function (objId, eventStr, URL) {
    this.genericObject.setURL(objId, eventStr, URL);
}
openbexi_page.prototype.unsetURL = function (objId, eventStr, URL) {
    this.genericObject.unsetURL(objId, eventStr, URL);
}
openbexi_page.prototype.disableURLs = function () {
    this.genericObject.disableURLs();
}
openbexi_page.prototype.enableURLs = function () {
    this.genericObject.enableURLs();
}
openbexi_page.prototype.getSrc = function () {
    return "";
}
openbexi_page.prototype.pasteText_or_Link = function () {
    this.div.innerHTML = window.clipboardData.getData('Text');
}
openbexi_page.prototype.LNRequest = function () {
}
openbexi_page.prototype.innerHTML_and_EVENTS = function (objId) {
    return document.getElementById(objId).innerHTML;
}
openbexi_page.prototype.changeStyle = function (objBexi,direction) {
    this.genericObject.changeStyle(objBexi, this, direction);
}
openbexi_page.prototype.removeObject = function (flag) {
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
        openbexi_page("openbexi_button.prototype.removeObject()", "Exception:" + e.message);
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
    try {
        this.genericObject.removeObject(this);
        if (openbexiNavigator)
            openbexiNavigator.window_factory(null, 'ob_menu_widget', ob_menu_widget, 'minimize');
        ob_setDirty_flag(flag);
    } catch (e) {
        openbexi_page("openbexi_button.prototype.removeObject()", "Exception:" + e.message);
    }
}
openbexi_page.prototype.removePageObjects = function () {
    this.genericObject.removePageObjects(this);
}
openbexi_page.prototype.my_PickFunc = function (e) {
    openbexi_stopEventPropagation(e);
    var bexiObj = getSelectedBexiObj(this.id);
    my_PickFunc(bexiObj.div);
}
openbexi_page.prototype.add_function = function (protocole, functionName, ob_doc) {
    if (this.genericObject != null) this.genericObject.add_function(protocole, functionName, ob_doc);
}
openbexi_page.prototype.debug = function () {
    return this.genericObject.debug(this);
}
openbexi_page.prototype.get_editor = function () {
    if (openbexiNavigator)
        return openbexiNavigator.get_menu_editor(this.getPopupAttributes());
}
openbexi_page.prototype.forward = function () {
    return this.genericObject.forward(this.div, "+");
}
openbexi_page.prototype.backward = function () {
    return this.genericObject.backward(this.div, "-");
}
openbexi_page.prototype.align_left_auto_arrange = function () {
    return this.genericObject.align_left_auto_arrange(this);
}
openbexi_page.prototype.align_right_auto_arrange = function () {
    return this.genericObject.align_right_auto_arrange(this);
}
openbexi_page.prototype.align_top_auto_arrange = function () {
    return this.genericObject.align_top_auto_arrange(this);
}
openbexi_page.prototype.align_bottom_auto_arrange = function () {
    return this.genericObject.align_bottom_auto_arrange(this);
}
openbexi_page.prototype.vertical_width_auto_resize = function () {
    return this.genericObject.vertical_width_auto_resize(this);
}
openbexi_page.prototype.vertical_height_auto_resize = function () {
    return this.genericObject.vertical_height_auto_resize(this);
}
openbexi_page.prototype.horizontal_width_auto_resize = function () {
    return this.genericObject.horizontal_width_auto_resize(this);
}
openbexi_page.prototype.horizontal_height_auto_resize = function () {
    return this.genericObject.horizontal_height_auto_resize(this);
}
openbexi_page.prototype.vertical_spacing_auto_arrange = function () {
    return this.genericObject.vertical_spacing_auto_arrange(this);
}
openbexi_page.prototype.horizontal_spacing_auto_arrange = function () {
    return this.genericObject.horizontal_spacing_auto_arrange(this);
}
openbexi_page.prototype.undo_auto_arrange = function () {
    return this.genericObject.undo_auto_arrange(this);
}
openbexi_page.prototype.redo_auto_arrange = function () {
    return this.genericObject.redo_auto_arrange(this);
}
openbexi_page.prototype.functions_to_load = function () {
    return "";
}
openbexi_page.prototype.turnToRelative = function () {
    if (this.positionning == "relative") {
        openbexi_updatePageData(null, "page", this.div.id, "margin", this.div.style.margin);
        openbexi_updatePageData(null, "page", this.div.id, "left", this.div.style.left);
        openbexi_updatePageData(null, "page", this.div.id, "top", this.div.style.top);
        this.div.style.position = "relative";
        this.div.style.margin = "0 auto";
        this.div.style.left = "";
    }
}
openbexi_page.prototype.turnToAbsolute = function () {
    if (this.positionning == "relative") {
        this.div.style.position = "absolute";
        this.div.style.margin = openbexi_getPageData(null, "page", this.div.id, "margin");
        this.div.style.left = openbexi_getPageData(null, "page", this.div.id, "left");
        this.div.style.top = openbexi_getPageData(null, "page", this.div.id, "top");
    }
}
openbexi_page.prototype.head_code = function () {
    return "";
}
openbexi_page.prototype.body_code = function () {
    var left;
    if (this.positionning == "relative") {
        this.div.style.position = "relative";
        left = this.div.style.left;
        this.div.style.left = null;
    }
    var inner = "";
    for (var i = 0; i < openbexi_object.length; i++) {
        try {
            if (openbexi_object[i].parentNodeId == this.id)
                inner += openbexi_object[i].body_code();
        } catch (e) {
            __openbexi_debugC("openbexi_page.prototype.body_code()", "Exception:" + e.message);
        }
    }
    var functions = this.genericObject.functions_to_trigger(this.div.id);
    var str = "";
    if (this.div.getAttribute(document.all ? "className" : "class") != null)
        str = str + '        <div class="' + this.div.getAttribute(document.all ? "className" : "class") + '" CLASSE="' + this.div.getAttribute("CLASSE") + '" id="' + this.div.id + '" ob_template="' + this.div.ob_template + '" obzindex="' + this.div.getAttribute("obzindex") + '" creation_date="' + this.div.getAttribute("creation_date") + '" style="' + openbexi_get_CSS_except_CSS3(this.div) + '" ' + functions + '>\n';
    else
        str = str + '        <div CLASSE="' + this.div.getAttribute("CLASSE") + '" id="' + this.div.id + '" ob_template="' + this.div.ob_template + '" obzindex="' + this.div.getAttribute("obzindex") + '" creation_date="' + this.div.getAttribute("creation_date") + '" style="' + openbexi_get_CSS_except_CSS3(this.div) + '" ' + functions + '>\n';

    if (inner != null && inner != "") {
        str = str + "            " + inner + "\n";
    }
    str = str + '        </div>\n';

    if (this.positionning == "relative") {
        this.div.style.position = "absolute";
        this.div.style.left = left;
    }
    return str;
}
openbexi_page.prototype.move_position = function () {
    if (this.positionning == "relative") {
        var new_left = "0px";
        var w = openbexi_getWindowWidth();
        var true_w = parseInt(w) - parseInt(divPropertiesWidth);
        try {
            new_left = parseInt(divPropertiesWidth) + ((true_w - parseInt(this.div.style.width)) / 2);
            this.div.style.left = new_left + "px";
        } catch (e) {

        }
    }
}
