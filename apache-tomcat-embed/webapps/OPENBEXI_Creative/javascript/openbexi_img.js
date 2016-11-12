/* This notice must be untouched at all times.

 Copyright (c) 2005-2013 JC Arcaz. All rights reserved.
 OPEN OPENBEXI htmlbuilder library for generating dynanic HTML page and html code source from browsers.
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
var ob_img_inspectorAttributes = [
    ['editor'         , 'ImageEditor'   , 'true']
];
var ob_img_popupAttributes = [
    ['menuitem10', 'openbexiNavigator.javascript(event, false);', 'Add_javascript_to_image'  , 'gif\/javascript_x48.png', '48px', '48px'],
    ['menuitem11', 'openbexi_chartFlow_add_endpoint(event,null,null,null,true,null,\'dynamic\')'     , 'AddEndpoint'  , 'gif\/endpoint_x48.png', '48px', '48px'],
    ['menuitem14' , 'this.showURLs(event)'       , 'updateURL', 'gif\/ob_url_x48.png', '48px', '48px'],
    ['menuitem18', 'this.backward()'         , 'SendToBack'  , 'gif\/move_backward_x48.png', '48px', '48px'],
    ['menuitem20', 'this.forward()'          , 'BringToFront', 'gif\/move_forward_x48.png', '48px', '48px'],
    ['menuitem25', 'duplicate_HTMLImg(\'vertical\')', 'Duplicate', 'gif\/copyVertical_x48.png', '48px', '48px'],
    ['menuitem26', 'duplicate_HTMLImg(\'horizontal\')', 'Duplicate', 'gif\/copyHorizontal_x48.png', '48px', '48px'],
    ['menuitem40' , 'this.add_link(null,false)', 'InsertLink', 'gif\/link_add_x48.png', '48px', '48px'],
    ['menuitem50' , 'this.delete_link(true)'  , 'RemoveLink', 'gif\/link_delete_x48.png', '48px', '48px'],
    ['menuitem70', 'this.removeObject(true);openbexiNavigator.update_menu_editor(null, false);', 'DlgSelectBtnDelete', 'gif\/image_delete_x48.png', '48px', '48px']
];
var ob_eyes_popupAttributes = [
    ['menuitem16', 'this.getCaption(event)', 'Caption'      , 'gif\/rename_x48.png', '48px', '48px'],
    ['menuitem17', 'openbexiNavigator.javascript(event, false);', 'Javascript'  , 'gif\/javascript_x48.png', '48px', '48px'],
    ['menuitem01' , 'this.showURLs(event)'       , 'updateURL', 'gif\/ob_url_x48.png', '48px', '48px'],
    ['menuitem40' , 'this.add_link(null,false)', 'InsertLink', 'gif\/link_add_x48.png', '48px', '48px'],
    ['menuitem50' , 'this.delete_link(true)'  , 'RemoveLink', 'gif\/link_delete_x48.png', '48px', '48px'],
    ['menuitem70', 'this.removeObject(true);openbexiNavigator.update_menu_editor(null, false);', 'DlgSelectBtnDelete', 'gif\/image_delete_x48.png', '48px', '48px']
];
var ob_img_url_editor = [
    ['menu_RequestBrowser', 'ob_menu_RequestBrowser', '', '', '', '', '', 'URL Editor', '', '500px', '540px', '', ''],
    ['window_left', 'ob_menu_RequestBrowser_sub_left', '', '', '', '', '', '', '', '', '', 'overflow: auto;position:absolute;width:0%;', ''],
    ['end_window_left', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_body', 'ob_menu_RequestBrowser_sub', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow: hidden;position:absolute;width:100%;', ''],
    ['form', 'ob_form', '', '', '', '', '', '', '', '', '', '', ''],
    ['fieldset', 'ob_fieldset', '', '', '', '', '', '', '', '', '', '', ''],
    ['legend', '', '', '', '', '', '', 'URL Editor', '', '', '', '', ''],
    ['textarea', 'bexicontext_url_data', '', '', '', '', '', 'Url list (if rollover):', '', '', '', '', '13'],
    ['sep', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_form', '', '', '', '', '', '', ' name', '', '', '', '', ''],
    ['sep', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['sep', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['sep', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_window_body', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_foot', 'ob_menu_RequestBrowser_sub_foot', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow: hidden;position:absolute;height:25%', ''],
    ['ok', '', 'onclick="openbexi_applyURLsEditor(event);openbexiNavigator.window_factory(event,\'ob_menu_RequestBrowser\',null,\'hidden\');"', '', 'onmousedown="src=\'gif/ob_ok_down.png\';"', 'onmouseover="src=\'gif/ob_ok_on.png\';"', 'onmouseout="src=\'gif/ob_ok.png\';"', 'Apply', '', '', '', '', ''],
    ['cancel', '', 'onclick="openbexiNavigator.window_factory(event,\'ob_menu_RequestBrowser\',null,\'hidden\');"', '', 'onmousedown="src=\'gif/ob_cancel_down.png\';"', 'onmouseover="src=\'gif/ob_cancel_on.png\';"', 'onmouseout="src=\'gif/ob_cancel.png\';"', 'Cancel', '', '', '', '', ''],

    ['end_window_foot', '', '', '', '', '', '', '', '', '', '', '', '']
];
function __openbexi_debugC_Img(f, text) {
    try {
        __openbexi_debugC(f, text);
    } catch (e) {
    }
}
function preloadImgWait(parent, currentImage, keepProportion) {
    if (currentImage == null) return;
    if (!currentImage.complete) {
        setTimeout(function () {
            preloadImgWait(parent, currentImage, keepProportion);
        }, 200);
    } else {
        document.getElementById(parent).appendChild(currentImage);
        if (parseInt(currentImage.width) != 0) {
            if (!keepProportion) {
                //var height = (119 / parseInt(currentImage.width)) * parseInt(currentImage.height);
                //document.getElementById(parent).style.height = height + "px";
            }
            currentImage.style.width = "100%";
            currentImage.style.height = "100%";
        }
    }
}
function bexiError() {
}
var openbexi_img = function (bexiObj, obj, name, fileNameT, top, left, width, height, keepProportion) {
    try {
        __openbexi_debugC_Img("openbexi_img(" + bexiObj + "," + obj + "," + name + "," + fileNameT + "," + top + "," + left + "," + width + "," + height + "," + keepProportion + ")", "Classe:");

        this.loading_status = "loaded";
        this.styles_BgImg = null;
        this.keepProportion = keepProportion;
        if (name == null || name == "") name = getNewIdDiv("div");
        if (openbexiNavigator)
            this.openbexiNavigator = openbexiNavigator;
        else
            this.openbexiNavigator = new openbexi_navigator();
        this.name = name;
        this.id = name;
        this.type = "openbexi_img";
        this.caption = "";
        this.base64 = "false";
        this.selected = "false";
        if (bexiObj == null)
            this.parentNodeId = "BODY";
        else
            this.parentNodeId = bexiObj.id;

        var fileName = fileNameT;
        var divobj;
        if (obj == null) {
            divobj = new openbexi_div(bexiObj, obj, name, top, left, width, height);
            this.div = divobj.div;
            this.parent = this.div.id;
            this.div.setAttribute("CLASSE", "DIV_IMG");
            this.div.setAttribute("creation_date", new Date());
            this.img = document.createElement("img");
            this.img.setAttribute("id", name + "_img");
            this.img.setAttribute("CLASSE", "IMG");
            this.img.src = fileName;
            if (bexiObj != null && bexiObj.type == "openbexi_fisheye")
                preloadImgWait(this.parent, this.img, false);
            else
                preloadImgWait(this.parent, this.img, this.keepProportion);
            this.setData();

        } else {
            divobj = new openbexi_div(bexiObj, obj, obj.id, top, left, width, height);
            this.div = divobj.div;
            this.div.style.visibility = "visible";
            this.div.setAttribute("CLASSE", "DIV_IMG");
            this.div.setAttribute("creation_date",  obj.getAttribute("creation_date"));
            this.div.setAttribute("obzindex",  obj.getAttribute("obzindex"));
            this.div.setAttribute("ob_template",  obj.getAttribute("ob_template"));
            this.parent = this.div.id;
            this.div.ob_template = obj.getAttribute("ob_template");
            if (name != null) {
                this.img = document.getElementById(name);
                this.img.src = fileName;
            } else {
                this.img = document.createElement("img");
                this.img.setAttribute("id", "img" + this.div.id);
                this.name = "img" + this.div.id;
                this.id = "img" + this.div.id;
                this.img.setAttribute("CLASSE", "IMG");
                this.img.src = fileName;
                preloadImgWait(this.parent, this.img, this.keepProportion);
            }
            this.div.style.zIndex = obj.getAttribute("obzindex");
            this.getData();
            this.img.title = openbexi_getPageData(null, "url", this.div.id, "url");

        }
        this.img.onError = bexiError();

        this.genericObject = new openbexi_generic_object(this);
        this.img.setAttribute("class", "ob_image");
        this.set_template(this.template, null, null, null);
        //if (obj == null) this.forward();

    } catch (e) {
        __openbexi_debugC_Img("openbexi_img()", "Exception:" + e.message);
    }
}
openbexi_img.prototype.setData = function () {
    this.div.style.cursor = "default";
    openbexi_updatePageData(null, "img", this.div.id, "id", this.img.id);
    openbexi_updatePageData(null, "img", this.div.id, "caption", this.caption);
    openbexi_updatePageData(null, "img", this.div.id, "selected", this.selected);
    openbexi_updatePageData(null, "img", this.div.id, "base64", this.base64);
    if (this.theme == "" || this.theme == undefined) {
        this.theme = "default";
        this.subtheme = "none";
    }
    openbexi_updatePageData(null, "page", this.div.id, "theme", this.theme);
    openbexi_updatePageData(null, "page", this.div.id, "subtheme", this.subtheme);
    if (this.template == "" || this.template == undefined)  this.template = "template/ob_img/default.css";
    openbexi_updatePageData(null, "page", this.div.id, "template", this.template);
}
openbexi_img.prototype.getData = function () {
    var caption = openbexi_getPageData(null, "img", this.div.id, "caption");
    if (caption != "") this.caption = caption;
    var selected = openbexi_getPageData(null, "img", this.div.id, "selected");
    if (selected != "") this.selected = selected;
    var base64 = openbexi_getPageData(null, "img", this.div.id, "base64");
    if (base64 != "") this.base64 = base64;
    var rollOver = openbexi_getPageData(null, "page", this.div.id, "rollOver");
    if (rollOver == "true") {
        var new_urls = new Array();
        var pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
        var imgs_div = get_xml_classe_object_attributes(pageDoc, "imgs", this.div.id);
        if (imgs_div != null) {
            for (var i = 0; i < imgs_div.length; i++) {
                new_urls[i] = get_xml_classe_object_attribut_value(pageDoc, "imgs", this.div.id, imgs_div[i].getAttribute("name"));
            }
        }
        openbexi_RollOverImg(this.img, new_urls, 0, true);
    }
    this.theme = openbexi_getPageData(null, "page", this.div.id, "theme");
    this.subtheme = openbexi_getPageData(null, "page", this.div.id, "subtheme");
    this.template = openbexi_getPageData(null, "page", this.div.id, "template");
}
openbexi_img.prototype.set_template = function (css_file, category, action, rsync_canvas) {
    if (css_file == null || css_file == "")return;
    if (action == "open") {
        this.subtheme = css_file;
        openbexi_updatePageData(null, "page", this.div.id, "subtheme", css_file);
        openbexiNavigator.browse_CSS(null, null, this.subtheme, true);
    }
    else {
        this.genericObject.set_template(this, css_file, action, rsync_canvas);
        this.div.setAttribute((document.all ? "className" : "class"), "ob_img_" + this.theme);
        //$ob_jquery('#'+this.div.id).addClass("ob_img_" + this.theme);
    }
}
openbexi_img.prototype.getClass = function () {
    return "ob_img_" + this.theme;
};
openbexi_img.prototype.getText = function () {
    return this.caption;
}
openbexi_img.prototype.getCaption = function () {
    this.caption = prompt(openbexi_lang("Enter_caption") + ":", this.caption);
    openbexi_updatePageData(null, "img", this.div.id, "caption", this.caption);
}
openbexi_img.prototype.pasteText_or_Link = function () {
    var text = window.clipboardData.getData('Text');
    var occurHTTP = text.match("http:\/\/|https:\/\/|c:|C:|d:|D:|file:|javascript:void");
    if (occurHTTP != null && occurHTTP.length != 0) {
        this.add_link(text, true);
    }
}
openbexi_img.prototype.getPopupAttributes = function () {
    var parentBexi = getSelectedBexiObj(this.parentNodeId);
    if (parentBexi != null && parentBexi.type == "openbexi_fisheye")
        return  ob_eyes_popupAttributes;
    return ob_img_popupAttributes;
}
openbexi_img.prototype.getInspectorAttributes = function () {
    return ob_img_inspectorAttributes;
}
openbexi_img.prototype.setSelected = function (objId) {
    this.genericObject.setSelected(objId);
    this.openbexiNavigator.update_menu_editor(this, true);
}
openbexi_img.prototype.setUnSelected = function (objId) {
    try {
        this.genericObject.setUnSelected(objId);
        if (currentBexiObj_selected.type != this.type)
            this.openbexiNavigator.update_menu_editor(this, false);
    } catch (e) {
        __openbexi_debugC("openbexi_img.prototype.setUnSelected()", "Exception:" + e.message);
    }
}
openbexi_img.prototype.getChildrenId = function () {
    var count = 0;
    var list = new Array();
    list[count++] = this.div.id;
    var childId = null;
    if (document.getElementById(this.parent) != null || document.getElementById(this.parent) != undefined) {
        for (var j = 0; j < document.getElementById(this.parent).childNodes.length; j++) {
            childId = document.getElementById(this.parent).childNodes[j].id;
            if (childId != null && childId != "") {
                list[count++] = childId;
            }
        }
    }
    return list;
}
openbexi_img.prototype.setAttribute = function (name, value) {
    return this.genericObject.setAttribute(this.getChildrenId(), name, value);
}
openbexi_img.prototype.changeStyle = function (objBexiSource, direction) {
    this.genericObject.changeStyle(objBexiSource, this,direction);
}
openbexi_img.prototype.setSelectedEndpoint = function (objId) {
    openbexiNavigator.window_factory(null, 'ob_menu_CSS', null, 'minimize');
    if (openbexiNavigator) openbexiNavigator.update_menu_editor(this, true);
    this.first_node_selected = true;
}
openbexi_img.prototype.removeObject = function (flag) {
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
    // Clean up old ref.
    try {
        openbexi_deletePageData(null, this.div.id, "ALL", "ALL", null);
    }
    catch (e) {
        __openbexi_debugC_page("openbexi_img.prototype.removeObject()", "Exception:" + e.message);
    }
    try {
        jsPlumb.removeAllEndpoints(this.div.id);
    }
    catch (e) {
        __openbexi_debugC_page("openbexi_img.prototype.removeObject()", "Exception:" + e.message);
    }
    this.genericObject.removeObject(this);
    ob_setDirty_flag(flag);
}
openbexi_img.prototype.my_PickFunc = function (e) {
    openbexi_stopEventPropagation(e);
    var bexiObj = getSelectedBexiObj(this.id);
    my_PickFunc(bexiObj.div);
}
openbexi_img.prototype.add_function = function (protocole, functionName, ob_doc) {
    if (this.genericObject != null) this.genericObject.add_function(protocole, functionName, ob_doc);
}
openbexi_img.prototype.add_link = function (url, unselect) {
    if (url == null) {
        url = this.genericObject.get_link(this.div.id);
        if (url == "") {
            url = prompt(openbexi_lang("enterObjectURL") + ":", "http://");
            this.img.title = "";
        }
        else {
            url = prompt(openbexi_lang("enterObjectURL") + ":", url);
            this.img.title = url;
        }
    }
    if (url != null) {
        if (this.genericObject != null) this.genericObject.add_link(this.div.id, "http", url, "onclick");
        this.img.style.cursor = "pointer";
        this.img.title = url;
    }
    if (unselect)  my_PickFunc(this.div);
}
openbexi_img.prototype.delete_link = function (unselect) {
    if (this.genericObject != null) this.genericObject.delete_link(this.div.id);
    this.img.style.cursor = "default";
    this.img.title = "";
    if (unselect)my_PickFunc(this.div);
}
openbexi_img.prototype.debug = function () {
    return this.genericObject.debug(this);
}
openbexi_img.prototype.innerHTML_and_EVENTS = function () {
    var occur = null;
    var imgPath;
    if (openbexi_getPageData(null, "img", this.div.id, "base64") == "true" || this.img.src.match(";base64")) {
        imgPath = this.img.src;
        openbexi_updatePageData(null, "img", this.div.id, "base64", "true");
    }
    else {
        imgPath = openbexi_getPageData(null, "page", this.div.id, "file");
        if (imgPath == "") {
            imgPath = openbexi_getPageData(null, "imgs", this.div.id, "file_0");
            openbexi_updatePageData(null, "page", this.div.id, "file", imgPath);
        }
    }
    if (this.openbexiNavigator)
        occur = imgPath.match(this.openbexiNavigator.hrefPath);
    if (occur != null) imgPath = openbexi_removePath(this.img.src, true);
    var inner = "";
    var protocole = openbexi_getPageData(null, "url_0", this.div.id, "protocole");
    if (protocole == "javascript") {
        var functions = this.genericObject.functions_to_trigger(this.div.id);
        if (functions != "")
            inner = '            <img src=\"' + imgPath + '\" class=\"ob_img\"  ' + functions + ' CLASSE="' + this.img.getAttribute("CLASSE") + '" id="' + this.img.id + '" style="' + openbexi_get_CSS(this.img) + '">' + document.getElementById(this.img.id).innerHTML + '\n';
        else
            inner = '            <img src=\"' + imgPath + '\" class=\"ob_img\"  CLASSE="' + this.img.getAttribute("CLASSE") + '" id="' + this.img.id + '" style="' + openbexi_get_CSS(this.img) + '">' + document.getElementById(this.img.id).innerHTML + '\n';
        //__openbexi_debugC_Img("openbexi_img.prototype.innerHTML_and_EVENTS ", document.getElementById(this.div.id).innerHTML + "\n\n\n" + inner)
        return inner;
    } else if (protocole == "http") {
        inner = "";
        var url = openbexi_getPageData(null, "url_0", this.div.id, "url");
        var event = openbexi_getPageData(null, "url_0", this.div.id, "event");
        if (url != "")
            inner = '            <img src=\"' + imgPath + '\" class=\"ob_img\" ' + event + '=\"window.location=\'' + url + '\'\" CLASSE="' + this.img.getAttribute("CLASSE") + '" id="' + this.img.id + '" style="' + openbexi_get_CSS(this.img) + '">' + document.getElementById(this.img.id).innerHTML + '\n';
        else
            inner = '<img src=\"' + imgPath + '\" class=\"ob_img\"  CLASSE="' + this.img.getAttribute("CLASSE") + '" id="' + this.img.id + '" style="' + openbexi_get_CSS(this.img) + '">' + document.getElementById(this.img.id).innerHTML + '\n';
        return inner;
    }
    else {
        return '<img src=\"' + imgPath + '\" class=\"ob_img\"  CLASSE="' + this.img.getAttribute("CLASSE") + '" id="' + this.img.id + '" style="' + openbexi_get_CSS(this.img) + '">' + document.getElementById(this.img.id).innerHTML + '\n';
    }
}
openbexi_img.prototype.get_editor = function () {
    if (this.openbexiNavigator)
        return this.openbexiNavigator.get_menu_editor(this.getPopupAttributes());
    else
        return null;
}
openbexi_img.prototype.forward = function () {
    return this.genericObject.forward(this.div, "+");
}
openbexi_img.prototype.backward = function () {
    return this.genericObject.backward(this.div, "-");
}
openbexi_img.prototype.align_left_auto_arrange = function () {
    return this.genericObject.align_left_auto_arrange(this);
}
openbexi_img.prototype.align_right_auto_arrange = function () {
    return this.genericObject.align_right_auto_arrange(this);
}
openbexi_img.prototype.align_top_auto_arrange = function () {
    return this.genericObject.align_top_auto_arrange(this);
}
openbexi_img.prototype.align_bottom_auto_arrange = function () {
    return this.genericObject.align_bottom_auto_arrange(this);
}
openbexi_img.prototype.vertical_width_auto_resize = function () {
    return this.genericObject.vertical_width_auto_resize(this);
}
openbexi_img.prototype.vertical_height_auto_resize = function () {
    return this.genericObject.vertical_height_auto_resize(this);
}
openbexi_img.prototype.horizontal_width_auto_resize = function () {
    return this.genericObject.horizontal_width_auto_resize(this);
}
openbexi_img.prototype.horizontal_height_auto_resize = function () {
    return this.genericObject.horizontal_height_auto_resize(this);
}
openbexi_img.prototype.vertical_spacing_auto_arrange = function () {
    return this.genericObject.vertical_spacing_auto_arrange(this);
}
openbexi_img.prototype.horizontal_spacing_auto_arrange = function () {
    return this.genericObject.horizontal_spacing_auto_arrange(this);
}
openbexi_img.prototype.undo_auto_arrange = function () {
    return this.genericObject.undo_auto_arrange(this);
}
openbexi_img.prototype.redo_auto_arrange = function () {
    return this.genericObject.redo_auto_arrange(this);
}
openbexi_img.prototype.functions_to_load = function () {
    return this.genericObject.functions_to_load(this.div.id);
}
openbexi_img.prototype.head_code = function () {
    return this.genericObject.head_code(this);
}
openbexi_img.prototype.body_code = function () {
    return this.genericObject.body_code(this);
}
openbexi_img.prototype.showURLs = function (event) {
    var URLs = "";
    try {
        var rollOver = openbexi_getPageData(null, "page", this.div.id, "rollOver");
        if (rollOver == "true") {
            var pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
            var imgs_div = get_xml_classe_object_attributes(pageDoc, "imgs", this.div.id);
            if (imgs_div != null) {
                for (var i = 0; i < imgs_div.length; i++) {
                    var imgFile = get_xml_classe_object_attribut_value(pageDoc, "imgs", this.div.id, imgs_div[i].getAttribute("name"));
                    if (imgFile !== "")URLs += imgFile + ";\n";
                }
            }
        } else {
            if (openbexi_getPageData(null, "img", this.div.id, "base64") == "true" || this.img.src.match(";base64")) {
                URLs = this.img.src;
                openbexi_updatePageData(null, "img", this.div.id, "base64", "true");
            }
            else
                URLs = openbexi_getPageData(null, "page", this.div.id, "file") + ";";
        }
        openbexi_showURLImgEditor(event, URLs);
    } catch (e) {
        __openbexi_debugC_Img("openbexi_img.prototype.showURLs()", "Exception:" + e.message);
    }
}
openbexi_img.prototype.updateURLs = function (event, url_list) {
    var count = 0;
    try {
        var new_urls = new Array();
        var urls = url_list.split(";");
        if (urls != null || urls[0] != undefined)this.img.src = urls[0];
        var rollOver = openbexi_getPageData(null, "page", this.div.id, "rollOver");
        if (rollOver == "true") {
            var pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
            delete_xml_classe_object(pageDoc, "imgs", this.div.id);
            openbexi_set_OPENBEXI_PAGES_DATA_XML(openbexi_get_xmlString(pageDoc));

            for (var i = 0; i < urls.length; i++) {
                var img = urls[i].replace("\n", "");
                if (img != "") {
                    this.add(urls[i].replace("\n", ""));
                    new_urls[count] = img;
                    openbexi_add_page_image(img);
                    count++;
                }
            }
            if (count > 1) {
                openbexi_updatePageData(null, "page", this.div.id, "rollOver", "true");
                openbexi_RollOverImg(this.img, new_urls, 0, true);
            }
        }
        else if (url_list.match(";base64")) {
            this.img.src = url_list;
            openbexi_updatePageData(null, "img", this.div.id, "base64", "true");
        }
        else {
            this.img.src = urls[0].replace("\n", "");
            openbexi_updatePageData(null, "page", this.div.id, "file", urls[0].replace("\n", ""));
            this.add(urls[0].replace("\n", ""));
            openbexi_updatePageData(null, "img", this.div.id, "base64", "false");
        }
    } catch (e) {
        __openbexi_debugC_Img("openbexi_img.prototype.updateURLs()", "Exception:" + e.message);
    }
}
openbexi_img.prototype.add = function (img) {
    if (img) img = img.replace(this.openbexiNavigator.hrefPath, "");
    openbexi_add_page_image(img);
    openbexi_add_page_rollover_image(this.div.id, img);
}
openbexi_img.prototype.remove = function () {
}

function openbexi_formatURL(URL, tab, ret) {
    var textFormated = "";
    for (var i = 0; i < URL.length; i++) {
        if ((URL[i] == "{"))
            textFormated += "\n\t" + URL[i];
        else if ((URL[i] == "[" && ret))
            textFormated += "\n" + URL[i];
        else if ((URL[i] == "]" && ret))
            textFormated += "\n" + URL[i];
        else if ((URL[i] == "," && tab && ret))
            textFormated += "\n\t" + URL[i];
        else
            textFormated += URL[i];

    }
    return textFormated;
}
function openbexi_showURLImgEditor(event, URLs) {
    if (event) openbexi_stopEventPropagation(event);
    openbexiNavigator.window_factory(event, 'ob_menu_RequestBrowser', ob_img_url_editor, 'maximize');
    if (document.getElementById("bexicontext_url_data"))
        document.getElementById("bexicontext_url_data").value = openbexi_formatURL(URLs, true, true);
}
function openbexi_applyURLsEditor(event) {
    if (event) openbexi_stopEventPropagation(event);
    if (document.getElementById("bexicontext_url_data"))
        getSelectedBexiObj(null).updateURLs(event, document.getElementById("bexicontext_url_data").value);
    openbexiNavigator.window_factory(event, "ob_menu_RequestBrowser", null, "hidden");
}
function openbexi_RollOverImg(img, urls, count, first) {
    if (first) {
        clearTimeout(img.goRoolOver);
    }
    img.src = urls[count];
    count++;
    if (count >= urls.length) count = 0;
    img.goRoolOver = setTimeout(function () {
        openbexi_RollOverImg(img, urls, count, false);
    }, 8000);
}
function openbexi_add_page_image(img) {
    try {
        // Do not add http img
        if (!img) return;
        if (img.match(RegExp("http:|https:"))) return;

        // Remove href if any
        if (img) img = img.replace(this.openbexiNavigator.hrefPath, "");

        var pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
        //Add in page list
        img = img.replace(this.openbexiNavigator.hrefPath, "");
        var imgs = get_xml_classe_object_attributes(pageDoc, "page", "img");
        var already_in_list = false;
        if (imgs != null) {
            for (var i = 0; i < imgs.length; i++) {
                var imgFile = get_xml_classe_object_attribut_value(pageDoc, "page", "img", imgs[i].getAttribute("name"));
                if (imgFile == img) {
                    already_in_list = true;
                }
            }
        }
        var count = 0;
        if (imgs) count = imgs.length;
        if (!already_in_list)set_xml_classe_object_attribut_value(pageDoc, "page", "img", "file_" + count, img);
        openbexi_set_OPENBEXI_PAGES_DATA_XML(openbexi_get_xmlString(pageDoc));
    } catch (e) {
        __openbexi_debugC_Img("openbexi_add_page_image() Exception:" + e.message);
    }
}
function openbexi_add_page_rollover_image(divId, img) {
    //Add in div list (for roll over feature)
    try {
        var pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
        var imgs_div = get_xml_classe_object_attributes(pageDoc, "imgs", divId);
        var already_in_div_list = false;
        if (imgs_div != null) {
            for (var i = 0; i < imgs_div.length; i++) {
                var imgFile = get_xml_classe_object_attribut_value(pageDoc, "imgs", divId, imgs_div[i].getAttribute("name"));
                if (imgFile == img) {
                    already_in_div_list = true;
                }
            }
        }
        var count = 0;
        if (imgs_div) count = imgs_div.length;
        if (!already_in_div_list)set_xml_classe_object_attribut_value(pageDoc, "imgs", divId, "file_" + count, img);
        openbexi_set_OPENBEXI_PAGES_DATA_XML(openbexi_get_xmlString(pageDoc));
    } catch (e) {
        __openbexi_debugC_Img("openbexi_add_page_rollover_image() Exception:" + e.message);
    }
}
function save_image_CB(responseXML) {
    try {
        __openbexi_debugC_Img("save_image_CB(" + responseXML + ")", "Info:");

        if (responseXML == null || responseXML == "") {
            if (openbexiNavigator) openbexiNavigator.status("save_image_CB bug ???");
            __openbexi_debugC_Img("save_image_CB() Exception:", "No answer from the server");
            openbexi_unloading2();
            return;
        }

        var ob_doc = openbexi_get_documentElement(responseXML, "text/xml");

        var status = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "status", "text");
        if (status != "" && status != "done") {
            __openbexi_debugC_Img("save_image_CB() Info:", "status=" + status);
            openbexiNavigator.top_frame_message(status, "50px", "error");
            return;
        }

        var appli_status = get_xml_classe_object_attribut_value(ob_doc, "openbexi_creative", "application", "status");
        if (appli_status != "") {
            __openbexi_debugC_Img("save_image_CB() Info:", "appli_status=" + appli_status);
        }

        var exception = get_xml_classe_object_attribut_value(ob_doc, "openbexi_creative", "application", "exception");
        if (exception != "") __openbexi_debugC_Img("save_image_CB() Exception:", exception);

        var div_id = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "div", "name");
        var filename = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "image", "filename");
        var project = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "dir", "project");

        if (div_id == "") {
            __openbexi_debugC_Img("save_image_CB() div_id not found", "Error");
            openbexi_unloading2();
            return;
        }
        if (appli_status == "CannotSaveFile") {
            openbexiNavigator.top_frame_message("Cannot save " + filename, "30px", "warning");
            return;
        }

        if (filename == "" || project == "")return;
        getSelectedBexiObj(div_id).img.src = "project/" + project + "/gif/" + filename;
        getSelectedBexiObj(div_id).add("project/" + project + "/" + "/gif/" + filename);
        //preloadImgWait(getSelectedBexiObj(div_id).parent, getSelectedBexiObj(div_id).img, getSelectedBexiObj(div_id).keepProportion);
        openbexi_updatePageData(null, "page", div_id, "file", "project/" + project + "/" + "/gif/" + filename);

        //Resize image
        try {
            var width = parseInt(get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "image", "width"));
            var heigth = parseInt(get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "image", "heigth"));
            if (parseInt(width) >= 450) {
                heigth = heigth / (parseInt(width) / 450);
                width = 450;
            }
            getSelectedBexiObj(div_id).div.style.width = width + "px";
            getSelectedBexiObj(div_id).div.style.height = heigth + "px";
            //openbexi_sync_dd(getSelectedBexiObj(div_id).div);
            //moveGripsToCorners();
            __openbexi_debugC_Img("save_image_CB()", "Warning: filename=" + filename + " widthImg=" + width + "  heightImg=" + heigth);
        } catch (e) {
            __openbexi_debugC_Img("save_image_CB()", "Exception:" + e.message);
        }

        if (appli_status == "ok")
            openbexiNavigator.top_frame_message(filename + " successfully saved", "30px", "info");

    } catch (e) {
        __openbexi_debugC_Img("save_image_CB()", "Exception:" + e.message);
    }
    openbexi_unloading2();

}
openbexi_img.prototype.save_image = function (e, path_source, filename, codec) {
    try {
        openbexi_stopEventPropagation(e);
        var doc = null;
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_saveFileRequest");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "project", openbexiNavigator.projectName);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "image", "filename", filename);
        if (path_source != null) doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "image", "path_source", path_source);
        if (codec != null) doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "image", "codec", codec);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "div", "name", this.div.id);
        var ob_xml = openbexi_get_xmlString(doc);

        var mode_sync = openbexi_synchron();
        openbexi_connect_to_server(null, mode_sync, ob_xml, save_image_CB);
    } catch (e) {
        __openbexi_debugC_Img("openbexi_img.prototype.save_image()", "Exception:" + e.message);
    }
}



