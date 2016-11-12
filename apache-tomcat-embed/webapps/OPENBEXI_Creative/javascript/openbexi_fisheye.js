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

var backgroundImageCounter = 0;
var ob_fisheye_styles_BgImg = [
    [''],
    ['gif/back1.jng'],
    ['gif/fadePurple4.jpg'],
    ['gif/fadeYellow4.jpg'],
    ['gif/fadeGreen2.jpg'],
    [''],
    ['gif/fadeCream2.jpg'],
    ['gif/fadeLight.jpg'],
    ['gif/fadePink1.png'],
    ['gif/fadePurple3.jpg'],
    ['gif/fadeYellow4.jpg'],
    [''],
    ['gif/fadeGreen3.jpg'],
    ['gif/fadeRed3.jpg'],
    ['gif/fadeYellow3.jpg'],
    ['rainbowBg_openbexi2.jpg'],
    ['gif/fadeBlue3.jpg']
];

var ob_fisheye_inspectorAttributes = [
    ['editor'         , 'fisheyeEditor'   , 'true']
];
var ob_fisheyeAttributes = [
    ['horizontal_orientation', 'horizontal', ""],
    ['vertical_orientation', 'vertical', ""],
    ['effectUnits', 'effectUnits', ""],
    ['itemPadding', 'itemPadding', ""],
    ['labelEdge', 'labelEdge', ""],
    ['attachEdge', 'attachEdge', ""]
];
var ob_fisheye_popupAttributes = [
    ['menuitem18', 'this.backward()', 'SendToBack'  , 'gif\/move_backward_x48.png', '48px', '48px'],
    ['menuitem20', 'this.forward()', 'BringToFront', 'gif\/move_forward_x48.png', '48px', '48px'],
    ['menuitem3' , 'openbexiNavigator.browse_picture(\'images\',\'none\',null,\'tree\',true);', 'InsertImage', 'gif\/eye_x48.png', '48px', '48px'],
    ['menuitem6'  , 'this.getProperties(event)', 'Properties', 'gif\/properties_x48.png', '48px', '48px'],
    ['menuitem51' , 'this.removePageObjects()', 'RemoveAllPageItems', 'gif\/page_delete_elt_x48.png', '48px', '48px'],
    ['menuitem53' , 'this.removeObject();openbexiNavigator.update_menu_editor(null, false);', 'DlgSelectBtnDelete', 'gif\/fisheye_delete_x48.png', '48px', '48px']
];
var openbexi_fisheye = function (bexiObj, obj, name, top, left, width, height) {
    try {
        __openbexi_debugC("openbexi_fisheye(" + obj + "," + name + "," + top + "," + left + "," + width + "," + height + ")", "Classe:");

        this.loading_status = "loaded";
        if (openbexiNavigator)
            this.openbexiNavigator = openbexiNavigator;
        else
            this.openbexiNavigator = new openbexi_navigator();
        this.name = name;
        this.id = name;
        this.type = "openbexi_fisheye";
        this.parentNodeId = "BODY";
        this.itemWidth = "54";
        this.itemHeight = "54";
        this.itemMaxWidth = "200";
        this.itemMaxHeight = "200";
        this.orientation = "horizontal";
        this.effectUnits = "2";
        this.itemPadding = "10";
        this.attachEdge = "top";
        this.labelEdge = "bottom";
        this.enableCrappySvgSupport = "false";
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
            this.div.setAttribute("id", name);
            this.parent = this.div.id;
            this.div.setAttribute("CLASSE", "DIV_FISHEYE");
            this.div.setAttribute("CLASS", "outerbar");
            this.div.setAttribute("creation_date", new Date());
            this.div.selected = false;
            this.div.style.top = parseInt(top) + "px";
            this.div.style.left = parseInt(left) + "px";
            this.div.style.width = parseInt(width) + "px";
            this.div.style.height = parseInt(height) + "px";
            this.div.style.position = "absolute";
            this.div.style.border = "1px solid rgb(221, 221, 221)";
            this.div.style.borderRadius = "1em";
            if (bexiObj == null || bexiObj.type == "openbexi_body") {
                document.body.appendChild(this.div);
                //__openbexi_debugC_page("openbexi_page",document.body.innerHTML)
            } else {
                bexiObj.div.appendChild(this.div);
            }
        } else {
            this.div = obj;
            this.div.setAttribute("id", name);
            this.parent = this.div.id;
            this.div.ob_template = obj.getAttribute("ob_template");
            this.div.setAttribute("CLASSE", "DIV_FISHEYE");
            this.div.setAttribute("creation_date", obj.getAttribute("creation_date"));
            this.div.setAttribute("obzindex", obj.getAttribute("obzindex"));
            this.div.setAttribute("ob_template", obj.getAttribute("ob_template"));
            this.div.selected = false;
            this.div.style.top = parseInt(this.div.style.top) + parseInt(divPropertiesTop) + "px";
            this.div.style.left = (parseInt(this.div.style.left) + parseInt(divPropertiesWidth)) + "px";
            this.getData();
            this.manageFisheyeItem(null, null, null);
            this.div.style.zIndex = obj.getAttribute("obzindex");
        }
        this.genericObject = new openbexi_generic_object(this);
        //ADD_DHTML(name + CURSOR_MOVE);
        this.div.onclick = this.my_PickFunc;
        this.div.onmouseover = my_canvas_MouseOverFunc;
        this.set_template(this.template, null, null, null);
    } catch (e) {
        __openbexi_debugC("openbexi_fisheye()", "Exception:" + e.message);
    }
    return this;
};

openbexi_fisheye.prototype.setData = function () {
    openbexi_updatePageData(null, "page", this.div.id, "type", this.type);
    openbexi_updatePageData(null, "page", this.div.id, "subtype", this.subtype);
    openbexi_updatePageData(null, "page", this.div.id, "parentId", this.parentNodeId);
    openbexi_updatePageData(null, "page", this.div.id, "parentType", this.parentType);
    openbexi_updatePageData(null, "page", this.div.id, "cursor", this.cursor);
    openbexi_updatePageData(null, "fisheye", this.div.id, "orientation", this.orientation);
    openbexi_updatePageData(null, "fisheye", this.div.id, "itemWidth", this.itemWidth);
    openbexi_updatePageData(null, "fisheye", this.div.id, "itemHeight", this.itemHeight);
    openbexi_updatePageData(null, "fisheye", this.div.id, "itemMaxWidth", this.itemMaxWidth);
    openbexi_updatePageData(null, "fisheye", this.div.id, "itemMaxHeight", this.itemMaxHeight);
    openbexi_updatePageData(null, "fisheye", this.div.id, "effectUnits", this.effectUnits);
    openbexi_updatePageData(null, "fisheye", this.div.id, "itemPadding", this.itemPadding);
    openbexi_updatePageData(null, "fisheye", this.div.id, "attachEdge", this.attachEdge);
    openbexi_updatePageData(null, "fisheye", this.div.id, "labelEdge", this.labelEdge);
    if (this.theme == "" || this.theme == undefined) {
        this.theme = "default";
        this.subtheme = "none";
    }
    openbexi_updatePageData(null, "page", this.div.id, "theme", this.theme);
    openbexi_updatePageData(null, "page", this.div.id, "subtheme", this.subtheme);
    if (this.template == "" || this.template == undefined)  this.template = "template/ob_button/default.css";
    openbexi_updatePageData(null, "page", this.div.id, "template", this.template);
};
openbexi_fisheye.prototype.getData = function () {
    this.parentNodeId = openbexi_getPageData(null, "page", this.div.id, "parentId");
    this.parentType = openbexi_getPageData(null, "page", this.div.id, "parentType")
    var cursor = openbexi_getPageData(null, "page", this.div.id, "cursor");
    if (cursor != "")this.cursor = cursor;
    this.type = openbexi_getPageData(null, "page", this.div.id, "type");
    this.subtype = openbexi_getPageData(null, "page", this.div.id, "subtype");
    if (this.subtype == "" || this.subtype == undefined || this.subtype != "box")
        this.subtype = "none";
    var orientation = openbexi_getPageData(null, "fisheye", this.div.id, "orientation");
    if (orientation != "") this.orientation = orientation;
    var itemWidth = openbexi_getPageData(null, "fisheye", this.div.id, "itemWidth");
    if (itemWidth != "") this.itemWidth = itemWidth;
    var itemHeight = openbexi_getPageData(null, "fisheye", this.div.id, "itemHeight");
    if (itemHeight != "") this.itemHeight = itemHeight;
    var itemMaxWidth = openbexi_getPageData(null, "fisheye", this.div.id, "itemMaxWidth");
    if (itemMaxWidth != "") this.itemMaxWidth = itemMaxWidth;
    var itemMaxHeight = openbexi_getPageData(null, "fisheye", this.div.id, "itemMaxHeight");
    if (itemMaxHeight != "") this.itemMaxHeight = itemMaxHeight;
    var effectUnits = openbexi_getPageData(null, "fisheye", this.div.id, "effectUnits");
    if (effectUnits != "") this.effectUnits = effectUnits;
    var itemPadding = openbexi_getPageData(null, "fisheye", this.div.id, "itemPadding");
    if (itemPadding != "") this.itemPadding = itemPadding;
    var attachEdge = openbexi_getPageData(null, "fisheye", this.div.id, "attachEdge");
    if (attachEdge != "") this.attachEdge = attachEdge;
    var labelEdge = openbexi_getPageData(null, "fisheye", this.div.id, "labelEdge");
    if (labelEdge != "") this.labelEdge = labelEdge;
    this.theme = openbexi_getPageData(null, "page", this.div.id, "theme");
    this.subtheme = openbexi_getPageData(null, "page", this.div.id, "subtheme");
    this.template = openbexi_getPageData(null, "page", this.div.id, "template");
};
openbexi_fisheye.prototype.set_template = function (css_file, category, action, rsync_canvas) {
    if (css_file == null || css_file == "")return;
    if (action == "open") {
        this.subtheme = css_file;
        openbexi_updatePageData(null, "page", this.div.id, "subtheme", css_file);
        openbexiNavigator.browse_CSS(null, null, this.subtheme, true);
    }
    else {
        this.genericObject.set_template(this, css_file, action, rsync_canvas);
        this.div.setAttribute((document.all ? "className" : "class"), "ob_fisheye_" + this.theme);
        //$ob_jquery('#'+this.div.id).addClass("ob_fisheye_" + this.theme);
    }
}
openbexi_fisheye.prototype.getClass = function () {
    return "ob_fisheye_" + this.theme;
}
openbexi_fisheye.prototype.addFisheyeItem = function (image) {
    var widthChild = 0;
    if (this.orientation == "horizontal") {
        widthChild = (parseInt(this.div.style.height) - (parseInt(this.div.style.height) / 5)) + "px";
    } else {
        widthChild = (parseInt(this.div.style.width) - (parseInt(this.div.style.width) / 5)) + "px";
    }
    var eye = add_HTMLImg(null, image, widthChild, widthChild, false);
    this.manageFisheyeItem(parseInt(widthChild), parseInt(widthChild), parseInt(this.itemPadding));
    eye.forward();
    eye.div.style.background = this.div.style.background;
};
openbexi_fisheye.prototype.manageFisheyeItem = function (widthChild, heightChild, padding) {
    //var strD = "";
    try {
        if (padding) this.itemPadding = parseInt(padding);
        if (widthChild) this.itemWidth = widthChild;
        if (heightChild) this.itemHeight = heightChild;
        if (!padding) padding = parseInt(this.itemPadding);
        if (!widthChild) widthChild = parseInt(this.itemWidth);
        if (!heightChild) heightChild = parseInt(this.itemHeight);
        //alert(this.itemPadding+" "+this.itemWidth+" "+this.itemHeight)
        var countChildTmp = document.getElementById(this.parent).childNodes.length;
        var countChild = 0;
        for (var l = 0; l < countChildTmp; l++) {
            child = document.getElementById(this.parent).childNodes[l];
            if (child != null && child.id != undefined && child.style != null && child.style != undefined) {
                countChild++;
            }
        }
        if (countChild == 0)return;
        if (this.orientation == "horizontal") {
            var WidthChilds = countChild * (widthChild + padding);
            var currentLeft = parseInt((parseInt(this.div.style.width) / 2) - WidthChilds / 2);
            for (var i = 0; i < countChildTmp; i++) {
                child = document.getElementById(this.parent).childNodes[i];
                if (child != null && child.type != "dojox.widget.FisheyeList" && child.type != "dojox.widget.FisheyeListItem" && child.id != undefined && child.style != null && child.style != undefined) {
                    child.style.top = parseInt((parseInt(this.div.style.height) / 10)) + "px";
                    child.style.left = parseInt(currentLeft) + "px";
                    child.style.width = parseInt(this.itemWidth) + "px";
                    child.style.height = parseInt(this.itemHeight) + "px";
                    currentLeft = currentLeft + widthChild + padding;
                }
            }
        } else {
            var currentTop = padding;
            for (var j = 0; j < countChild; j++) {
                var child = document.getElementById(this.parent).childNodes[j];
                if (child != null && child.id != undefined && child.style != null && child.style != undefined) {
                    child.style.top = parseInt(currentTop) + "px";
                    child.style.left = parseInt((parseInt(this.div.style.width) / 10)) + "px";
                    child.style.width = parseInt(this.itemWidth) + "px";
                    child.style.height = parseInt(this.itemHeight) + "px";
                    currentTop = currentTop + heightChild + padding;
                }
            }
        }
        //openbexi_sync_dd(this.div);
        //openbexi_showGrips();
    } catch (e) {
        __openbexi_debugC("openbexi_fisheye.prototype.manageFisheyeItem()", "Exception:" + e.message);
    }
};
openbexi_fisheye.prototype.setSelected = function (objId) {
    this.genericObject.setSelected(objId, true);
    if (this.openbexiNavigator) {
        this.openbexiNavigator.update_menu_editor(this, true);
        this.openbexiNavigator.working = false;
        this.openbexiNavigator.browse_picture('images', 'none', null, 'tree', true, true);
    }
};
openbexi_fisheye.prototype.setUnSelected = function (objId) {
    try {
        this.genericObject.setUnSelected(objId);
        if (currentBexiObj_selected.type != this.type)
            this.openbexiNavigator.update_menu_editor(this, false);
    } catch (e) {
        __openbexi_debugC("openbexi_fisheye.prototype.setUnSelected()", "Exception:" + e.message);
    }
}
openbexi_fisheye.prototype.getChildrenId = function () {
    var count = 0;
    var list = new Array();
    list[count++] = this.div.id;
    return list;
};
openbexi_fisheye.prototype.getNewChildrenStyleTop = function () {
    try {
        var openbexi_LeftCounter = 0;
        var openbexi_TopCounter = 0;
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
    } catch (e) {
        __openbexi_debugC("openbexi_fisheye.prototype.getNewChildrenStyleTop()", "Exception:" + e.message);
    }
    return parseInt(openbexi_TopCounter = openbexi_TopCounter + 3);
};
openbexi_fisheye.prototype.getNewChildrenStyleLeft = function () {
    try {
        var openbexi_LeftCounter = 0;
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
    } catch (e) {
        __openbexi_debugC("openbexi_fisheye.prototype.getNewChildrenStyleLeft()", "Exception:" + e.message);
    }
    return parseInt(5);
};
openbexi_fisheye.prototype.getText = function () {
    return this.div.firstChild.nodeValue;
};
openbexi_fisheye.prototype.getPopupAttributes = function () {
    return ob_fisheye_popupAttributes;
};
openbexi_fisheye.prototype.getInspectorAttributes = function () {
    return ob_fisheye_inspectorAttributes;
};
openbexi_fisheye.prototype.setAttribute = function (name, value) {
    return this.genericObject.setAttribute(this.getChildrenId(), name, value);
};
openbexi_fisheye.prototype.getSrc = function () {
    return "";
};
openbexi_fisheye.prototype.pasteText_or_Link = function () {
    this.div.innerHTML = window.clipboardData.getData('Text');
};
openbexi_fisheye.prototype.LNRequest = function () {
};
openbexi_fisheye.prototype.innerHTML_and_EVENTS = function (objId) {
    return document.getElementById(objId).innerHTML;
};
openbexi_fisheye.prototype.changeStyle = function (objBexi, direction) {
    this.genericObject.changeStyle(objBexi, this,direction);
};
openbexi_fisheye.prototype.removeObject = function () {
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
    if (this.name == "shortFooter" || this.name == "leftNavigation") {
        alert("NotImplemented");
        return;
    }
    this.genericObject.removeObject(this);
};
openbexi_fisheye.prototype.removePageObjects = function () {
    this.genericObject.removePageObjects(this);
};
openbexi_fisheye.prototype.my_PickFunc = function (e) {
    openbexi_stopEventPropagation(e);
    var bexiObj = getSelectedBexiObj(this.id);
    my_PickFunc(bexiObj.div);
};
openbexi_fisheye.prototype.debug = function () {
    return this.genericObject.debug(this);
};
openbexi_fisheye.prototype.get_editor = function () {
    return this.openbexiNavigator.get_menu_editor(this.getPopupAttributes());
};
openbexi_fisheye.prototype.forward = function () {
    return this.genericObject.forward(this.div, "+");
};
openbexi_fisheye.prototype.backward = function () {
    return this.genericObject.backward(this.div, "-");
};
openbexi_fisheye.prototype.align_left_auto_arrange = function () {
    return this.genericObject.align_left_auto_arrange(this);
};
openbexi_fisheye.prototype.align_right_auto_arrange = function () {
    return this.genericObject.align_right_auto_arrange(this);
};
openbexi_fisheye.prototype.align_top_auto_arrange = function () {
    return this.genericObject.align_top_auto_arrange(this);
};
openbexi_fisheye.prototype.align_bottom_auto_arrange = function () {
    return this.genericObject.align_bottom_auto_arrange(this);
};
openbexi_fisheye.prototype.vertical_width_auto_resize = function () {
    return this.genericObject.vertical_width_auto_resize(this);
};
openbexi_fisheye.prototype.vertical_height_auto_resize = function () {
    return this.genericObject.vertical_height_auto_resize(this);
};
openbexi_fisheye.prototype.horizontal_width_auto_resize = function () {
    return this.genericObject.horizontal_width_auto_resize(this);
};
openbexi_fisheye.prototype.horizontal_height_auto_resize = function () {
    return this.genericObject.horizontal_height_auto_resize(this);
};
openbexi_fisheye.prototype.vertical_spacing_auto_arrange = function () {
    return this.genericObject.vertical_spacing_auto_arrange(this);
};
openbexi_fisheye.prototype.horizontal_spacing_auto_arrange = function () {
    return this.genericObject.horizontal_spacing_auto_arrange(this);
};
openbexi_fisheye.prototype.undo_auto_arrange = function () {
    return this.genericObject.undo_auto_arrange(this);
};
openbexi_fisheye.prototype.redo_auto_arrange = function () {
    return this.genericObject.redo_auto_arrange(this);
};
openbexi_fisheye.prototype.setOrientationH = function () {
    if (this.orientation == "vertical") {
        var h = this.div.style.height;
        this.div.style.height = this.div.style.width;
        this.div.style.width = h;
    }
    this.orientation = "horizontal";
    this.manageFisheyeItem(null, null, null);
    this.my_PickFunc();
    my_canvas_PickFunc(this.id);
};
openbexi_fisheye.prototype.setOrientationV = function () {
    if (this.orientation == "horizontal") {
        var h = this.div.style.height;
        this.div.style.height = this.div.style.width;
        this.div.style.width = h;
    }
    this.orientation = "vertical";
    this.manageFisheyeItem(null, null, null);
    this.my_PickFunc();
    my_canvas_PickFunc(this.id);
};
openbexi_fisheye.prototype.setEffectUnits = function () {
    var effectUnits = prompt("enter effectUnits:", "2");
    effectUnits = openbexi_clearText(effectUnits);
    if (effectUnits == null || effectUnits == "") effectUnits = "2";
    this.effectUnits = effectUnits;
};
openbexi_fisheye.prototype.setItemPadding = function () {
    var itemPadding = prompt("enter itemPadding:", "10");
    itemPadding = openbexi_clearText(itemPadding);
    if (itemPadding == null || itemPadding == "") itemPadding = "10";
    this.manageFisheyeItem(null, null, parseInt(this.itemPadding));
};
openbexi_fisheye.prototype.setAttachEdge = function () {
    var attachEdge = prompt("enter attachEdge (center, left, right, top, bottom):", "bottom");
    attachEdge = openbexi_clearText(attachEdge);
    if (attachEdge == null || attachEdge == "") attachEdge = "bottom";
    if (attachEdge != "center" && attachEdge != "left" && attachEdge != "right" && attachEdge != "top" && attachEdge != "bottom") {
        alert("\"" + attachEdge + "\" is not valid!\nthe \"bottom\" default value is used");
        attachEdge = "bottom";
    }
    this.attachEdge = attachEdge;
};
openbexi_fisheye.prototype.setLabelEdge = function () {
    var labelEdge = prompt("enter labelEdge (center, left, right, top, bottom):", "bottom");
    labelEdge = openbexi_clearText(labelEdge);
    if (labelEdge == null || labelEdge == "") labelEdge = "bottom";
    if (labelEdge != "center" && labelEdge != "left" && labelEdge != "right" && labelEdge != "top" && labelEdge != "bottom") {
        alert("\"" + labelEdge + "\" is not valid!\nthe \"bottom\" default value is used");
        labelEdge = "bottom";
    }
    this.labelEdge = labelEdge;
};
openbexi_fisheye.prototype.head_code = function () {
    var str = "";
    str += '    <script> function load_app(page) {window.location = page;}</script>\n';
    str += '    <style type="text/css">\n';
    str += '        .dojoxFisheyeListBar  {\n';
    str += '            margin: 0 auto;\n';
    str += '            text-align: center;}\n';
    str += '        .outerbar {\n';
    str += '            text-align: center;\n';
    str += '            position: absolute;\n';
    str += '            left: 0px;\n';
    str += '            top: 0px;\n';
    str += '            width: 100%;\n';
    str += '            border-bottom:2px solid #333;}\n';
    str += '        .page {\n';
    str += '            padding: 50px 20px 20px 20px;\n';
    str += '         }\n';
    str += '    </style>\n';
    return str;
};
openbexi_fisheye.prototype.functions_to_load = function () {
    return this.genericObject.functions_to_load(this.div.id);
};
openbexi_fisheye.prototype.body_code = function () {
    try {
        var str = "";

        var widthPlus = parseInt(this.itemWidth) + (parseInt(this.itemWidth) / 3);
        var heightPlus = parseInt(this.itemHeight) + (parseInt(this.itemHeight) / 3);
        str += '        <div class="outerbar ' + this.div.getAttribute(document.all ? "className" : "class") + '" CLASSE="' + this.div.getAttribute("CLASSE") + '" id="' + this.id + '" ob_template="' + this.div.ob_template + '" obzindex="' + this.div.obzindex + '" creation_date="' + this.div.getAttribute("creation_date") + '" STYLE="' + openbexi_get_CSS(this.div) + '">\n';
        str += '            <div dojoType="dojox.widget.FisheyeList"\n';
        str += '                itemWidth=' + parseInt(widthPlus) + ' itemHeight=' + parseInt(heightPlus) + '\n';
        str += '                itemMaxWidth=' + this.itemMaxWidth + ' itemMaxHeight=' + this.itemMaxHeight + '\n';
        str += '                orientation=' + this.orientation + '\n';
        str += '                effectUnits=' + this.effectUnits + '\n';
        str += '                itemPadding=' + this.itemPadding + '\n';
        str += '                attachEdge=' + this.attachEdge + '\n';
        str += '                labelEdge=' + this.labelEdge + '\n';
        str += '                enableCrappySvgSupport=' + this.enableCrappySvgSupport + '>\n';
        var img = null;
        var url = null;
        for (var j = 0; j < openbexi_object.length; j++) {
            if (openbexi_object[j].parentNodeId == this.id) {
                var base64 = null;
                img = openbexi_getPageData(null, "page", openbexi_object[j].div.id, "file");
                url = openbexi_getPageData(null, "url_0", openbexi_object[j].div.id, "url");
                if (openbexi_getPageData(null, "img", openbexi_object[j].div.id, "base64") == "true")
                    base64 = openbexi_object[j].img.src;
                str += this.body_FisheyeListItem_code(openbexi_object[j].div.id, img, base64, url, openbexi_object[j].caption);
            }
        }
        str += '          </div>\n';
        for (j = 0; j < openbexi_object.length; j++) {
            if (openbexi_object[j].parentNodeId == this.id) {
                openbexi_object[j].div.style.visibility = "hidden";
                str += openbexi_object[j].body_code(openbexi_object[j]);
                openbexi_object[j].div.style.visibility = "visible";
            }
        }
        //Next line: Fixing eyes blinking issue by adding a large hidden div
        str += '        </div>\n\n<div class="page" style="visibility:hidden;width:2000px;height:2000px"></DIV>\n';
    } catch (e) {
        __openbexi_debugC("openbexi_fisheye.prototype.body_code()", "Exception:" + e.message);
    }
    return str;
};
openbexi_fisheye.prototype.body_FisheyeListItem_code = function (divId, img, base64, url_src, caption) {
    try {
        if (img == null || img == undefined) img = "images/dot.png";
        if (caption == null || caption == undefined) caption = "none";

        var img_source = img;
        if (base64 != null)
            img_source = base64;
        else {
            var occur = img_source.match(this.openbexiNavigator.hrefPath);
            if (occur != null)
                img_source = openbexi_removePath(img, true);
        }

        var str = "";
        if (url_src != null && url_src != "")
            str += '                <div dojoType="dojox.widget.FisheyeListItem" onClick="load_app(\'' + url_src + '\')"\n';
        else {
            var functions = this.genericObject.functions_to_trigger(divId);
            if (functions != "")
                str += '                <div dojoType="dojox.widget.FisheyeListItem" ' + functions + ' \n';
            else
                str += '                <div dojoType="dojox.widget.FisheyeListItem" onClick="javascript:void(null);\"\n';

        }
        str += '                    iconSrc=\"' + img_source + '\" label=\"' + caption + '\">\n';
        str += '                </div>\n';
    } catch (e) {
        __openbexi_debugC("openbexi_fisheye.prototype.body_FisheyeListItem_code()", "Exception:" + e.message);
    }
    return str;
}
;
openbexi_fisheye.prototype.proto = function () {
    this.div.innerHTML = "";
    var parentNode = document.getElementById(this.div.id);
    var outerBar = document.createElement("div");
    outerBar.setAttribute("id", "outerbar");
    outerBar.setAttribute("class", "outerbar");
    //outerBar.setAttribute("position", "absolute");
    var clock = dojo.widget.createWidget("FisheyeList", {
        id: "actionMenu",
        itemWidth: 50,
        itemHeight: 50,
        itemMaxWidth: 200,
        itemMaxHeight: 200,
        orientation: "horizontal",
        effectUnits: 2,
        itemPadding: 10,
        attachEdge: "top",
        labelEdge: "bottom",
        conservativeTrigger: "false"
        //enableCrappySvgSupport:"false"

    }, dojo.byId('outerbar'));

    var child1 = new dojox.widget.FisheyeListItem({
        id: "child1",
        iconSrc: "gif/fr.jpg",
        label: "View route"
    });
    /*var child2 = dojo.widget.createWidget("FisheyeListItem", {
     id: "child1",
     iconSrc: "gif/0.gif",
     label: "View route"
     });*/
    clock.addChild(child1);
    //clock.addChild(child2);
    outerBar.appendChild(clock.domNode);
    //clock.postCreate();
    //alert(clock.domNode.innerHTML) ;
    parentNode.appendChild(outerBar);
};
openbexi_fisheye.prototype.getProperties = function (event) {
    var popupId = "popup_menu0";
    if (!openbexiPopup_menu) openbexiPopup_menu = new openbexi_popup_menu(popupId);
    openbexiPopup_menu.removeAllItemMenu();
    for (var i = 0; i < ob_fisheyeAttributes.length; i++) {
        openbexiPopup_menu.addItemMenu(popupId + "_" + i, 'openbexi_set_fisheye_Properties("' + ob_fisheyeAttributes[i][0] + '")', ob_fisheyeAttributes[i][0]);
    }
    openbexiPopup_menu.addSep();
    openbexiPopup_menu.addItemMenu(popupId + "_close", 'openbexiPopup_menu.hideMenu(event)', "close");
    openbexiPopup_menu.showMenu3(event, popupId, divPropertiesWidth, true, "0px", "0px");
};
function openbexi_set_fisheye_Properties(property) {
    var bexiObj = getSelectedBexiObj(null);
    try {
        if (property == "horizontal_orientation") bexiObj.setOrientationH();
        if (property == "vertical_orientation") bexiObj.setOrientationV();
        if (property == "effectUnits") bexiObj.setEffectUnits();
        if (property == "itemPadding") bexiObj.setItemPadding();
        if (property == "attachEdge") bexiObj.setAttachEdge();
        if (property == "labelEdge") bexiObj.setLabelEdge();

    } catch (e) {
        alert("Sorry, cannot set up the " + property + " property for " + bexiObj.id + "\nopenbexi_set_fisheye_Properties:" + e.name + ". Error message: " + e.message);
    }
}
;
