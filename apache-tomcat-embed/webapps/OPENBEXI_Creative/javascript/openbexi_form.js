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

var openbexi_FormTopCounter = 0;
var openbexi_FormLeftCounter = 0;
var ob_submitB = "Submit";
var ob_form_inspectorAttributes = [
    ['editor'            , 'FormEditor'            , 'true']
];
var ob_form_creativeTemplateAttributes = [];
var ob_form_popupAttributes = [
    ['menuitem15', 'this.add_fieldset()'          , 'FieldSet', 'gif\/form_head_x48.png', '48px', '48px'],
    ['menuitem16', 'this.add_messageBox()'        , 'messageBox', 'gif\/form_foot_x48.png', '48px', '48px'],
    //['menuitem18','openbexi_get_dojo_type(event)','dojoType',          'gif\/dojo_x48.png',           '48px','48px'],
    ['menuitem35', 'this.show_pager()'            , 'pager', 'gif\/Enext_small.png', '48px', '48px'],
    ['menuitem17', 'openbexiNavigator.window_factory(event,\'ob_menu_JavascriptBrowser\',null,\'minimize\');'           , 'Add_javascript_to_button'  , 'gif\/javascript_x48.png', '48px', '48px'],
    ['menuitem81', 'openbexiNavigator.window_factory(null, \'ob_menu_SQLBrowser\', null, \'minimize\');', 'SQLDatabases', 'gif\/sql.jpg', '48px', '48px'],
    ['menuitem18', 'this.backward()'              , 'SendToBack'  , 'gif\/move_backward_x48.png', '48px', '48px'],
    ['menuitem20', 'this.forward()'               , 'BringToFront', 'gif\/move_forward_x48.png', '48px', '48px'],
    ['menuitem46', 'this.duplicate()'             , 'Duplicate', 'gif\/copy_x48.png', '48px', '48px'],
    ['menuitem51', 'this.removePageObjects();openbexiNavigator.update_menu_editor(null, false);'     , 'RemoveAllPageItems', 'gif\/page_delete_elt_x48.png', '48px', '48px'],
    ['menuitem53', 'this.removeObject(true);openbexiNavigator.update_menu_editor(null, false);'      , 'DlgSelectBtnDelete', 'gif\/form_delete_x48.png', '48px', '48px']
];
var ob_form_popupWidgets = [
    ['gallery', 'ob_menu_widget_grid', '', 'openbexiNavigator.drop_widget(event,\'grid\');', '', 'this.src=\'gif/grid_standby_x64.png\';this.title=openbexi_lang(\'Grid\');', 'this.src=\'gif/grid_x64.png\';', 'Grid', 'gif/grid_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_textbox', '', 'openbexiNavigator.drop_widget(event,\'textbox\');', '', 'this.src=\'gif/textbox_standby_x64.png\';this.title=openbexi_lang(\'Textbox\');', 'this.src=\'gif/textbox_x64.png\';', 'Textbox', 'gif/textbox_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_checkBox', '', 'openbexiNavigator.drop_widget(event,\'checkBox\');', '', 'this.src=\'gif/checkBox_standby_x64.png\';this.title=openbexi_lang(\'CheckBox\');', 'this.src=\'gif/checkBox_x64.png\';', 'CheckBox', 'gif/checkBox_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_comboBox', '', 'openbexiNavigator.drop_widget(event,\'comboBox\');', '', 'this.src=\'gif/combobox_standby_x64.png\';this.title=openbexi_lang(\'ComboBox\');', 'this.src=\'gif/combobox_x64.png\';', 'ComboBox', 'gif/combobox_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_currencyTextBox', '', 'openbexiNavigator.drop_widget(event,\'currencyTextBox\');', '', 'this.src=\'gif/textbox_standby_x64.png\';this.title=openbexi_lang(\'currencyTextBox\');', 'this.src=\'gif/currencyBox_x64.png\';', 'CurrencyTextBox', 'gif/currencyBox_x64.png', '64px', '64px'],
    //['gallery','ob_menu_widget_validationTextBox','','openbexiNavigator.drop_widget(event,\'validationTextBox\');','','this.src=\'gif/textbox_standby_x64.png\';this.title=openbexi_lang(\'Textbox\');','this.src=\'gif/validationBox_x64.png\';','ValidationTextBox','gif/validationBox_x64.png','64px','64px'],
    ['gallery', 'ob_menu_widget_dateTextBox', '', 'openbexiNavigator.drop_widget(event,\'dateTextBox\');', '', 'this.src=\'gif/datebox_standby_x64.png\';this.title=openbexi_lang(\'DateTextBox\');', 'this.src=\'gif/datebox_x64.png\';', 'DateTextBox', 'gif/datebox_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_integer', '', 'openbexiNavigator.drop_widget(event,\'integer\');', '', 'this.src=\'gif/textbox_standby_x64.png\';this.title=openbexi_lang(\'Integer\');', 'this.src=\'gif/integerBox_x64.png\';', 'Integer', 'gif/integerBox_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_UsZip', '', 'openbexiNavigator.drop_widget(event,\'UsZip\');', '', 'this.src=\'gif/textbox_standby_x64.png\';this.title=openbexi_lang(\'US Zip Code\');', 'this.src=\'gif/UsZip_x64.png\';', 'US Zip Code', 'gif/UsZip_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_url', '', 'openbexiNavigator.drop_widget(event,\'url\');', '', 'this.src=\'gif/url_standby_x64.png\';this.title=openbexi_lang(\'URL\');', 'this.src=\'gif/url_x64.png\';', 'URL', 'gif/url_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_img', '', 'openbexiNavigator.drop_widget(event,\'image\');', '', 'this.src=\'gif/ob_img_standby_x64.png\';this.title=openbexi_lang(\'Image\');', 'this.src=\'gif/ob_img_x64.png\';', 'Image', 'gif/ob_img_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_password', '', 'openbexiNavigator.drop_widget(event,\'password\');', '', 'this.src=\'gif/password_standby_x64.png\';this.title=openbexi_lang(\'Password\');', 'this.src=\'gif/password_x64.png\';', 'Password', 'gif/password_x64.png', '64px', '64px'],

    ['gallery', 'ob_menu_widget_box', '', 'openbexiNavigator.drop_widget(event,\'box\');', '', 'this.src=\'gif/box_standby_x64.png\';this.title=openbexi_lang(\'Box\');', 'this.src=\'gif/box_x64.PNG\';', 'Box', 'gif/box_x64.PNG', '64px', '64px'],
    ['gallery', 'ob_menu_widget_image', '', 'openbexiNavigator.browse_picture(\'images\',\'none\',null,\'tree\',true);', '', 'this.src=\'gif/image_standby_x64.png\';this.title=openbexi_lang(\'Image\');', 'this.src=\'gif/image_x64.png\';', 'Image', 'gif/image_x64.png', '64px', '64px', "cursor:pointer", ''],
    ['gallery', 'ob_menu_widget_link', '', 'openbexiNavigator.drop_widget(event,\'link\');', '', 'this.src=\'gif/link_standby_x64.png\';this.title=openbexi_lang(\'Link\');', 'this.src=\'gif/link_x64.png\';', 'Link', 'gif/link_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_button', '', 'openbexiNavigator.drop_widget(event,\'button\');', '', 'this.src=\'gif/button_standby_x64.png\';this.title=openbexi_lang(\'Button\');', 'this.src=\'gif/button_x64.png\';', 'Button', 'gif/button_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_text_edit', '', 'openbexiNavigator.drop_widget(event,\'text_edit\');', '', 'this.src=\'gif/text_edit_standby_x64.png\';this.title=openbexi_lang(\'Text\');', 'this.src=\'gif/text_edit_x64.png\';', 'Text', 'gif/text_edit_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_chartPie', '', 'openbexiNavigator.drop_widget(event,\'chartPie\');', '', 'this.src=\'gif/chartPie_x64.png\';this.title=openbexi_lang(\'ChartPie\');', 'this.src=\'gif/chartPie_x64.png\';', 'ChartPie', 'gif/chartPie_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_chartBar', '', 'openbexiNavigator.drop_widget(event,\'chartBar\');', '', 'this.src=\'gif/chartBar_standby_x64.png\';this.title=openbexi_lang(\'ChartBar\');', 'this.src=\'gif/chartBar_x64.png\';', 'ChartBar', 'gif/chartBar_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_chartLine', '', 'openbexiNavigator.drop_widget(event,\'chartLine\');', '', 'this.src=\'gif/chartLine_standby_x64.png\';this.title=openbexi_lang(\'ChartLine\');', 'this.src=\'gif/chartLine_x64.png\';', 'ChartLine', 'gif/chartLine_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_calendar', '', 'openbexiNavigator.drop_widget(event,\'calendar\');', '', 'this.src=\'gif/calendar_standby_x64.png\';this.title=openbexi_lang(\'Calendar\');', 'this.src=\'gif/calendar_x64.png\';', 'Calendar', 'gif/calendar_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_clock', '', 'openbexiNavigator.drop_widget(event,\'clock\');', '', 'this.src=\'gif/clock_standby_x64.png\';this.title=openbexi_lang(\'Clock\');', 'this.src=\'gif/clock_x64.png\';', 'Clock', 'gif/clock_x64.png', '64px', '64px'],
];
var openbexi_form = function (bexiObj, obj, name, top, left, width, height, background) {
    try {
        __openbexi_debugC("openbexi_form(" + bexiObj + "," + obj + "," + name + "," + top + "," + left + "," + width + "," + height + ")", "Classe:");

        this.loading_status = "loaded";
        this.styles_BgImg = null;
        // inspector data : [Inspector widget,  functionInvoker ,  visible]

        //openbexi_form properties
        if (name == null || name == "") name = getNewIdDiv("div");
        if (openbexiNavigator)
            this.openbexiNavigator = openbexiNavigator;
        else
            this.openbexiNavigator = new openbexi_navigator();

        this.name = name;
        this.id = name;
        this.formName = null;
        this.type = "openbexi_form";
        if (bexiObj == null) {
            this.parentNodeId = "BODY";
            this.parentType = "openbexi_body";
        }
        else {
            this.parentNodeId = bexiObj.id;
            this.parentType = bexiObj.type;
        }
        if (obj == null) {
            this.div = document.createElement("div");
            this.div.setAttribute("id", this.name);
            this.parent = this.div.id;
            this.div.setAttribute("CLASSE", "DIV_FORM");
            this.div.setAttribute("creation_date", new Date());
            this.div.selected = false;
            this.div.style.top = parseInt(top) + "px";
            this.div.style.left = parseInt(left) + "px";
            this.div.style.width = parseInt(width) + "px";
            this.div.style.height = parseInt(height) + "px";
            this.div.style.position = "absolute";
            this.div.style.border = "0.25em solid rgb(221, 221, 221)";
            this.div.style.borderRadius = "1em";
            if (background == null || background == undefined) {
                background = openbexi_getPageData(null, "page", name, "background");
                if (background == "") background = "fading_background_8.png";
            }
            this.background_path = "background/";
            this.background_filename = background;
            this.div.style.background = "url(" + this.background_path + this.background_filename + ")";
            openbexi_updatePageData(null, "page", name, "background", this.background_path + this.background_filename);
            openbexi_add_page_image(this.background_path + this.background);

            this.parent = this.div.id;
            this.form = document.createElement("form");
            this.form.id = "form_" + this.div.id;
            if (bexiObj == null || bexiObj.type == "openbexi_body") {
                document.body.appendChild(this.div);
            } else {
                bexiObj.div.appendChild(this.div);
            }
            this.pager = this.pager_init(bexiObj, obj, this.id);
            this.show_pager();
            this.setData();
        } else {
            this.div = obj;
            this.formName = this.div.name;
            this.div.setAttribute("id", name);
            this.parent = this.div.id;
            this.div.ob_template = obj.getAttribute("ob_template");
            this.div.setAttribute("CLASSE", "DIV_FORM");
            this.div.setAttribute("creation_date", obj.getAttribute("creation_date"));
            this.div.setAttribute("obzindex", obj.getAttribute("obzindex"));
            this.div.setAttribute("ob_template", obj.getAttribute("ob_template"));
            this.div.selected = false;
            //this.div.style.top = parseInt(this.div.style.top) + "px";
            if (bexiObj == null) {
                this.div.style.left = (parseInt(this.div.style.left) + parseInt(divPropertiesWidth)) + "px";
                this.div.style.top = (parseInt(this.div.style.top) + parseInt(divPropertiesTop)) + "px";
            }
            this.form = document.createElement("form");
            this.form.id = "form_" + this.div.id;
            this.formName = document.getElementById("formName_" + this.div.id);
            this.messageBox = document.getElementById("messageBox_" + this.div.id);
            this.div.style.zIndex = obj.getAttribute("obzindex");
            this.getData();
        }
        this.genericObject = new openbexi_generic_object(this);
        this.div.onclick = this.my_PickFunc;
        this.div.onmouseover = my_canvas_MouseOverFunc;
        if (obj == null) this.forward();
    } catch (e) {
        __openbexi_debugC("openbexi_form()", "Exception:" + e.message);
    }
    return this;
}
openbexi_form.prototype.setData = function () {
    openbexi_updatePageData(null, "page", this.div.id, "type", this.type);
    openbexi_updatePageData(null, "page", this.div.id, "subtype", this.subtype);
    openbexi_updatePageData(null, "page", this.div.id, "parentId", this.parentNodeId);
    openbexi_updatePageData(null, "page", this.div.id, "parentType", this.parentType);
    openbexi_updatePageData(null, "page", this.div.id, "fieldsetText", this.fieldsetText);
    openbexi_updatePageData(null, "page", this.div.id, "messageText", this.messageText);
    this.template = openbexi_getPageData(null, "page", "css", this.div.id);
    if (this.template == "" || this.template == undefined)  this.template = "template/ob_form/default.css";
}
openbexi_form.prototype.getData = function () {
    this.type = openbexi_getPageData(null, "page", this.div.id, "type");
    this.subtype = openbexi_getPageData(null, "page", this.div.id, "subtype");
    this.parentNodeId = openbexi_getPageData(null, "page", this.div.id, "parentId");
    this.parentType = openbexi_getPageData(null, "page", this.div.id, "parentType");
    this.fieldsetText = openbexi_getPageData(null, "page", this.div.id, "fieldsetText");
    this.messageText = openbexi_getPageData(null, "page", this.div.id, "messageText");
    this.template = openbexi_getPageData(null, "page", "css", this.div.id);
    var pager = getSelectedBexiObj(this.div.id + "_pager");
    this.pager = pager.div;
}
openbexi_form.prototype.getClass = function () {
    return "ob_form_" + this.theme;
}
openbexi_form.prototype.pager_init = function (bexiObj, obj, name) {
    var divobjHeadP = new openbexi_pager(bexiObj, obj, name + "_pager", "0px", "2px", "25px", "15px", "23px", 10, "dynamic");
    save_openbexi_object(divobjHeadP);
    return divobjHeadP.div;
}
openbexi_form.prototype.show_pager = function (event) {
    var divobjHeadP = getSelectedBexiObj(this.div.id + "_pager");
    if (this.pager == null || this.pager == undefined) {
        return;
    }
    if (this.pager.style.visibility == "visible" || this.pager.style.visibility == "") {
        divobjHeadP.hide(event);
        this.pager.style.visibility = "hidden";
    }
    else {
        this.pager.style.visibility = "visible";
        divobjHeadP.display(event);
    }
    this.pager_move();
}
openbexi_form.prototype.pager_move = function () {
    if (this.pager == null || this.pager == undefined || this.pager == "BODY") {
        var divobjHeadP = getSelectedBexiObj(this.div.id + "_pager");
        this.pager = divobjHeadP.div;
        return;
    }
    this.pager.style.top = (parseInt(this.div.style.top) + parseInt(this.div.style.height) + 10) + "px";
    this.pager.style.left = (parseInt(this.div.style.left)) + "px";
    this.pager.style.width = (parseInt(this.div.style.width)) + "px";
    this.pager.style.height = "23px";
}
openbexi_form.prototype.setSelected = function (objId) {
    this.genericObject.setSelected(objId);
    if (this.openbexiNavigator) {
        this.openbexiNavigator.update_menu_editor(this, true);
        this.openbexiNavigator.window_factory(null, 'ob_menu_widget', this.getPopupWidgets(), 'minimize');
    }
}
openbexi_form.prototype.setUnSelected = function (objId) {
    try {
        this.genericObject.setUnSelected(objId);
        if (currentBexiObj_selected.type != this.type)
            this.openbexiNavigator.update_menu_editor(this, false);
        openbexi_closeCreativeEditor("creativeFormEditor");
    } catch (e) {
        __openbexi_debugC("openbexi_form.prototype.setUnSelected()", "Exception:" + e.message);
    }
}
openbexi_form.prototype.getChildrenId = function () {
    var count = 0;
    var list = new Array();
    list[count++] = this.div.id;
    return list;
}
openbexi_form.prototype.lookVertical = function () {
    var firstTopChild = "0px";
    var firstCurrentLeft = "10px";
    var currentTop = "0px";
    for (var j = 0; j < document.getElementById(this.parent).childNodes.length; j++) {
        var childId = document.getElementById(this.parent).childNodes[j].id;
        if (childId != undefined) {
            var bexiObj = getSelectedBexiObj(childId);
            try {
                var occur = childId.match("label_");
                if (bexiObj.type == "openbexi_dojo_editor" && occur != null) {
                    if (firstTopChild == "0px") {
                        firstCurrentLeft = document.getElementById(childId).style.left;
                        firstTopChild = document.getElementById(childId).style.top;
                        currentTop = firstTopChild;
                    }
                    document.getElementById(childId).style.top = currentTop;
                    document.getElementById(childId).style.left = firstCurrentLeft;
                }
                if (bexiObj.type == "openbexi_dojo") {
                    document.getElementById(childId).style.top = currentTop;
                    document.getElementById(childId).style.left = parseInt(document.getElementById(childId).style.width) + 15 + "px";
                    currentTop = parseInt(currentTop) + parseInt(document.getElementById(childId).style.height) + 4 + "px";
                }
            } catch (e) {

            }
        }
    }
}
openbexi_form.prototype.lookHorizontal = function () {
    var firstTopChild = "0px";
    var currentLeft = "10px";
    for (var j = 0; j < document.getElementById(this.parent).childNodes.length; j++) {
        var childId = document.getElementById(this.parent).childNodes[j].id;
        if (childId != undefined) {
            var bexiObj = getSelectedBexiObj(childId);
            try {
                var occur = childId.match("label_");
                if (bexiObj.type == "openbexi_dojo_editor" && occur != null) {
                    document.getElementById(childId).style.left = currentLeft;
                    currentLeft = parseInt(currentLeft) + parseInt(document.getElementById(childId).style.width) + 10 + "px";
                    if (firstTopChild == "0px")  firstTopChild = document.getElementById(childId).style.top;
                    document.getElementById(childId).style.top = firstTopChild;
                }
                if (bexiObj.type == "openbexi_dojo") {
                    document.getElementById(childId).style.left = currentLeft;
                    currentLeft = parseInt(currentLeft) + parseInt(document.getElementById(childId).style.width) + 10 + "px";
                    if (firstTopChild == "0px")  firstTopChild = document.getElementById(childId).style.top;
                    document.getElementById(childId).style.top = firstTopChild;
                }
            } catch (e) {

            }
        }
    }
}
openbexi_form.prototype.getNewChildrenStyleTop = function () {
    if (document.getElementById(this.parent).childNodes.length < 2) return 32;
    for (var j = document.getElementById(this.parent).childNodes.length - 1; j >= 0; j--) {
        var childId = document.getElementById(this.parent).childNodes[j].id;
        if (childId != null && childId != "") {
            var top = parseInt(document.getElementById(childId).style.top) + parseInt(document.getElementById(childId).style.height) + 2;
            if (parseInt(top) + parseInt(document.getElementById(childId).style.height) < parseInt(this.div.style.height)) {
                return top + openbexi_FormTopCounter + 2;
            } else {
                if (openbexi_FormTopCounter >= parseInt(this.div.style.height))openbexi_FormTopCounter = 0;
                openbexi_FormLeftCounter = openbexi_FormLeftCounter + 10;
                return parseInt(openbexi_FormTopCounter = openbexi_FormTopCounter + 3);
            }
        }
    }
    if (openbexi_FormTopCounter >= parseInt(this.div.style.height))openbexi_FormTopCounter = 0;
    return parseInt(openbexi_FormTopCounter = openbexi_FormTopCounter + 3);
}
openbexi_form.prototype.getNewChildrenStyleLeft = function () {
    return(openbexi_FormLeftCounter + 10);
}
openbexi_form.prototype.getText = function () {
    return this.div.firstChild.nodeValue;
}
openbexi_form.prototype.getCreativeTemplateAttributes = function () {
    return ob_form_creativeTemplateAttributes;
}
openbexi_form.prototype.getPopupAttributes = function () {
    return ob_form_popupAttributes;
}
openbexi_form.prototype.getPopupWidgets = function () {
    return ob_form_popupWidgets;
}
openbexi_form.prototype.getInspectorAttributes = function () {
    return ob_form_inspectorAttributes;
}
openbexi_form.prototype.setAttribute = function (name, value) {
    return this.genericObject.setAttribute(this.getChildrenId(), name, value);
}
openbexi_form.prototype.setURL = function (objId, eventStr, URL) {
    this.genericObject.setURL(objId, eventStr, URL);
}
openbexi_form.prototype.unsetURL = function (objId, eventStr, URL) {
    this.genericObject.unsetURL(objId, eventStr, URL);
}
openbexi_form.prototype.disableURLs = function () {
    this.genericObject.disableURLs();
}
openbexi_form.prototype.enableURLs = function () {
    this.genericObject.enableURLs();
}
openbexi_form.prototype.getSrc = function (objId, eventStr) {
    return "";
}
openbexi_form.prototype.pasteText_or_Link = function () {
    this.div.innerHTML = window.clipboardData.getData('Text');
}
openbexi_form.prototype.LNRequest = function () {
}
openbexi_form.prototype.changeStyle = function (objBexi, direction) {
    this.genericObject.changeStyle(objBexi, this,direction);
}
openbexi_form.prototype.removeObject = function (flag) {
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
        openbexi_page("openbexi_form.prototype.removeObject()", "Exception:" + e.message);
    }
    this.genericObject.removeObject(this);
    var tabId = this.div.getAttribute("tabId");
    try {
        if (tabId && tabId != undefined)
            if (this.parentNodeId != "BODY")getSelectedBexiObj(this.parentNodeId).removeTab(tabId);
    } catch (e) {
        openbexi_page("openbexi_form.prototype.removeObject()", "Exception:" + e.message);
    }
    try {
        if (this.pager)getSelectedBexiObj(this.pager.id).removeObject();
    } catch (e) {
        openbexi_page("openbexi_form.prototype.removeObject()", "Exception:" + e.message);
    }
    try {
        this.genericObject.removeObject(this);
        if (this.openbexiNavigator)
            this.openbexiNavigator.window_factory(null, 'ob_menu_widget', ob_menu_widget, 'minimize');
        ob_setDirty_flag(flag);
    } catch (e) {
        openbexi_page("openbexi_form.prototype.removeObject()", "Exception:" + e.message);
    }
}
openbexi_form.prototype.removePageObjects = function () {
    this.genericObject.removePageObjects(this);
}
openbexi_form.prototype.my_PickFunc = function (e) {
    openbexi_stopEventPropagation(e);
    var bexiObj = getSelectedBexiObj(this.id);
    my_PickFunc(bexiObj.div);
}
openbexi_form.prototype.add_function = function (protocole, functionName, ob_doc) {
    if (this.genericObject != null) this.genericObject.add_function(protocole, functionName, ob_doc);
}
openbexi_form.prototype.debug = function () {
    return this.genericObject.debug(this);
}
openbexi_form.prototype.get_editor = function () {
    var str = "";
    //str = '   <tr><font size=2 ><b>form name:</b></font><input type="text" id=formNameImput NAME="formNameImput" VALUE=' + this.fieldsetText;
    //str += '                         style=" width:75%; background: #ffffcc;"';
    //str += '                         onKeyPress="return getSelectedBexiObj(null).set_form_name(event);"></tr>';
    if (this.openbexiNavigator)
        str += this.openbexiNavigator.get_menu_editor(this.getPopupAttributes());
    return str;
}
openbexi_form.prototype.get_link_editor = function () {
    return "";
}
openbexi_form.prototype.set_form_name = function (e) {
    var formName = document.getElementById("formNameImput").value;
    formName = openbexi_clearText(formName);
    this.fieldsetText = formName;
    document.getElementById("formNameImput").value = this.fieldsetText;
    openbexi_updatePageData(null, "page", this.div.id, "fieldsetText", this.fieldsetText);
    if (this.formName)this.formName.innerHTML = "<B>" + this.fieldsetText + "</B>";
}
openbexi_form.prototype.forward = function () {
    return this.genericObject.forward(this.div, "+");
}
openbexi_form.prototype.backward = function () {
    return this.genericObject.backward(this.div, "-");
}
openbexi_form.prototype.set_template = function (css_file) {
    this.template = css_file;
    openbexi_updatePageData(null, "page", "css", this.div.id, this.template);
    ob_load_css(css_file);
    if (css_file == "default" || css_file == "vertical_1") {
        this.lookVertical()
    }
    else if (css_file == "horizontal_1") {
        this.lookHorizontal();
    }
    else {
    }
}
openbexi_form.prototype.duplicate = function () {
    if (this.openbexiNavigator) this.openbexiNavigator.status("Working ...", "yellow");
    var text = "";
    var childTop = "0px";
    var childLeft = "0px";
    var childCSS = "";
    var bexiForm = add_HTMLForm(null);
    var ob_top = bexiForm.div.style.top;
    var ob_left = bexiForm.div.style.left;
    openbexi_set_CSS(bexiForm.div, openbexi_get_CSS(this.div));
    bexiForm.div.style.top = ob_top;
    bexiForm.div.style.left = ob_left;

    for (var j = 0; j < document.getElementById(this.parent).childNodes.length; j++) {
        var childId = document.getElementById(this.parent).childNodes[j].id;
        if (childId != undefined) {
            var bexiObj = getSelectedBexiObj(childId);
            try {
                if (bexiObj.type == "openbexi_dojo_editor") {
                    text = bexiObj.div.innerHTML;
                    childTop = bexiObj.div.style.top;
                    childLeft = bexiObj.div.style.left;
                    childCSS = openbexi_get_CSS(bexiObj.div);
                    var occur = childId.match("label_");
                    if (occur == null) {
                        var bexiFCK = add_dojo_editor(bexiForm, null);
                        bexiFCK.div.innerHTML = text;
                        openbexi_set_CSS(bexiFCK.div, childCSS);
                    }
                }
                if (bexiObj.type == "openbexi_dojo") {
                    var bexiDojo = add_HTMLDojo(null, bexiObj.subtype, bexiObj.subsubtype, text, bexiForm, null, null);
                    openbexi_set_CSS(bexiDojo.div, openbexi_get_CSS(bexiObj.div));
                    openbexi_set_CSS(getSelectedBexiObj("label_" + bexiDojo.id).div, childCSS);
                    bexiDojo.resize();
                }
                if (bexiObj.type == "openbexi_button") {
                    var bexiButton = add_HTMLButton(bexiForm, bexiObj.div.subtype);
                    openbexi_set_CSS(bexiButton.div, openbexi_get_CSS(bexiObj.div));
                }
                if (bexiObj.type == "openbexi_img") {
                    var bexiImg = add_HTMLImg(bexiForm, bexiObj.img.src, null, null, true);
                    openbexi_set_CSS(bexiImg.div, openbexi_get_CSS(bexiObj.div));
                }
                if (bexiObj.type == "openbexi_link") {
                    var bexiLink = add_HTMLLink(bexiForm);
                    openbexi_set_CSS(bexiLink.div, openbexi_get_CSS(bexiObj.div));
                }
            }
            catch (e) {

            }
            ob_setDirty_flag(true);
        }
    }
    bexiForm.div.style.top = ob_top;
    bexiForm.div.style.left = ob_left;
    bexiForm.my_PickFunc();
}
openbexi_form.prototype.align_left_auto_arrange = function () {
    return this.genericObject.align_left_auto_arrange(this);
}
openbexi_form.prototype.align_right_auto_arrange = function () {
    return this.genericObject.align_right_auto_arrange(this);
}
openbexi_form.prototype.align_top_auto_arrange = function () {
    return this.genericObject.align_top_auto_arrange(this);
}
openbexi_form.prototype.align_bottom_auto_arrange = function () {
    return this.genericObject.align_bottom_auto_arrange(this);
}
openbexi_form.prototype.vertical_width_auto_resize = function () {
    return this.genericObject.vertical_width_auto_resize(this);
}
openbexi_form.prototype.vertical_height_auto_resize = function () {
    return this.genericObject.vertical_height_auto_resize(this);
}
openbexi_form.prototype.horizontal_width_auto_resize = function () {
    return this.genericObject.horizontal_width_auto_resize(this);
}
openbexi_form.prototype.horizontal_height_auto_resize = function () {
    return this.genericObject.horizontal_height_auto_resize(this);
}
openbexi_form.prototype.vertical_spacing_auto_arrange = function () {
    return this.genericObject.vertical_spacing_auto_arrange(this);
}
openbexi_form.prototype.horizontal_spacing_auto_arrange = function () {
    return this.genericObject.horizontal_spacing_auto_arrange(this);
}
openbexi_form.prototype.undo_auto_arrange = function () {
    return this.genericObject.undo_auto_arrange(this);
}
openbexi_form.prototype.redo_auto_arrange = function () {
    return this.genericObject.redo_auto_arrange(this);
}
openbexi_form.prototype.head_code = function () {
    openbexi_add_javascript(null, "javascript/", "openbexi_navigator.js");
    openbexi_add_javascript(null, "javascript/", "openbexi_pager.js");
    return "";
}
openbexi_form.prototype.functions_to_load = function () {
    return this.genericObject.functions_to_load(this.div.id);
}
openbexi_form.prototype.body_code = function () {
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
    return str;
}
openbexi_form.prototype.delete_edge_text = function (divId) {
    if (divId != null) {
        var div = document.getElementById(divId);
        if (div != null) {
            getSelectedBexiObj(divId).removeObject();
        }
    }
}
openbexi_form.prototype.add_messageBox = function () {
    var flag = false;
    if (this.messageBox == null) {
        flag = true;
        var messageBox = new openbexi_dojo_editor(this, null, "messageBox_" + this.div.id, (parseInt(this.div.style.height) - 26) + "px", "0px", this.div.style.width, "26px", "messageBox", "messageBox");
        save_openbexi_object(messageBox);
        this.messageBox = messageBox.div;
        this.messageText = "<B>" + "Status:" + "</B>"
        openbexi_updatePageData(null, "page", this.div.id, "messageText", this.messageText);

    }
    if (this.messageBox != null) {
        this.messageBox.style.background = "#e8e8e8";
        this.messageBox.style.border = "none";
        this.messageBox.innerHTML = "<B>" + this.messageText + "</B>";
    }
}
openbexi_form.prototype.add_fieldset = function () {
    var flag = false;
    if (this.formName == null) {
        flag = true;
        var formName = new openbexi_dojo_editor(this, null, "formName_" + this.div.id, "0px", "0px", this.div.style.width, "26px", "formName", "formName");
        save_openbexi_object(formName);
        this.formName = formName.div;
        this.fieldsetText = prompt("Please, enter form name:", "");
        this.fieldsetText = openbexi_clearText(this.fieldsetText);
        if (this.fieldsetText == null) this.fieldsetText = "";
        openbexi_updatePageData(null, "page", this.div.id, "fieldsetText", this.fieldsetText);
    }
    if (this.formName != null) {
        this.formName.style.background = "#c3ffcb";
        this.formName.style.visibility = "visible";
        this.formName.style.border = "none";
        this.formName.innerHTML = "<B>" + this.fieldsetText + "</B>";
    }
}
openbexi_form.prototype.remove_fieldset = function () {
    this.formName.style.visibility = "hidden";
}
openbexi_form.prototype.openbexi_submit_method = function (combo) {
    alert("openbexi_form.prototype.openbexi_submit_method TBD")
    return document.getElementById(combo.id).value;
}
openbexi_form.prototype.creativeEditor = function (creativeAttributes) {
    var left = parseInt(this.div.style.left);
    var editor_top = parseInt(this.div.style.top) + parseInt(this.div.style.height);
    this.genericObject.get_creative_editor("creativeFormEditor", creativeAttributes, editor_top, left);
    openbexi_openCreativeEditor("creativeFormEditor");
}
function openbexi_setup_connection(e) {
    document.getElementById("SaveFrame").setAttribute("CLASSE", "Not connected");
    document.getElementById("buttonConnection").style.backgroundImage = 'url("gif\/NetworkNoConnection.gif")';
}
