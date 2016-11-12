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
var ob_link_styles_BgImg = null;
var ob_link_inspectorAttributes = [
    ['editor'         ,'LinkEditor'   ,'true']
];
var ob_link_popupAttributes = [
    ['menuitem16','this.rename()'           ,'Rename'      ,'gif\/rename_x48.png','48px','48px'],
    ['menuitem18','this.backward()'         ,'SendToBack'  ,'gif\/move_backward_x48.png','48px','48px'],
    ['menuitem20','this.forward()'          ,'BringToFront','gif\/move_forward_x48.png','48px','48px'],
    ['menuitem25', 'duplicate_HTMLLink(\'vertical\')', 'Duplicate', 'gif\/copyVertical_x48.png', '48px', '48px'],
    ['menuitem26', 'duplicate_HTMLLink(\'horizontal\')', 'Duplicate', 'gif\/copyHorizontal_x48.png', '48px', '48px'],
    ['menuitem40' ,'this.add_link(null,true)','InsertLink', 'gif\/link_add_x48.png','48px','48px'],
    ['menuitem50' ,'this.delete_link(true)'  ,'RemoveLink', 'gif\/link_delete_x48.png','48px','48px'],
    ['menuitem31', 'this.removeObject(true);openbexiNavigator.update_menu_editor(null, false);','DlgSelectBtnDelete','gif\/hyperlink_delete_x48.png','48px','48px']
];

var openbexi_link = function(bexiObj, obj, name, top, left, width, height) {
    try {
        __openbexi_debugC("openbexi_link(" + bexiObj + "," + obj + "," + name + "," + top + "," + left + "," + width + "," + height + ")", "Classe:");

        this.loading_status = "loaded";
        if (openbexiNavigator)
            this.openbexiNavigator = openbexiNavigator;
        else
            this.openbexiNavigator = new openbexi_navigator();
        this.verticalFlag = false;
        this.name = name;
        this.id = name;
        this.type = "openbexi_link";
        if (name == null || name == "") name = getNewIdDiv("div");
        if (bexiObj == null)
            this.parentNodeId = "BODY";
        else
            this.parentNodeId = bexiObj.id;

        var divobj = null;
        if (obj == null) {
            divobj = new openbexi_div(bexiObj, obj, name, top, left, width, height);
            this.div = divobj.div;
            this.parent = this.div.id;
            this.div.setAttribute("CLASSE", "DIV_LINK");
            this.div.setAttribute("creation_date", new Date());
            this.div.style.background = document.body.bgColor;
            this.div.style.border = "3px solid white";
            this.link = this.addLink("link" + name.replace("div", ""));
            this.Linktext = document.createTextNode("link" + name.replace("div", "").replace("template_", ""));
            this.link.appendChild(this.Linktext);
            this.div.appendChild(this.link);
            this.setData();

        } else {
            divobj = new openbexi_div(bexiObj, obj, obj.id, top, left, width, height);
            this.div = divobj.div;
            this.div.setAttribute("CLASSE", "DIV_LINK");
            this.div.setAttribute("creation_date",  obj.getAttribute("creation_date"));
            this.div.setAttribute("obzindex",  obj.getAttribute("obzindex"));
            this.div.setAttribute("ob_template",  obj.getAttribute("ob_template"));
            this.parent = this.div.id;
            this.div.ob_template = obj.getAttribute("ob_template");
            this.link = document.getElementById(name);
            this.link.setAttribute("CLASSE", "LINK");
            this.link.title = openbexi_getPageData(null, "url", this.div.id, "url");
            this.link.href = "javascript:void(0);";
            this.div.style.zIndex = obj.getAttribute("obzindex");
            this.getData();
        }
        this.genericObject = new openbexi_generic_object(this);
        this.set_template(this.template, null, null, null);
        if (obj == null) this.forward();
    } catch (e) {
        __openbexi_debugC("openbexi_link()", "Exception:" + e.message);
    }
}
openbexi_link.prototype.setData = function() {
    openbexi_updatePageData(null, "page", this.div.id, "type", this.type);
    openbexi_updatePageData(null, "page", this.div.id, "parentId", this.parentNodeId);
    openbexi_updatePageData(null, "page", this.div.id, "parentType", this.parentType);
    if (this.theme == "" || this.theme == undefined) {
        this.theme = "default";
        this.subtheme = "none";
    }
    openbexi_updatePageData(null, "page", this.div.id, "theme", this.theme);
    openbexi_updatePageData(null, "page", this.div.id, "subtheme", this.subtheme);
    if (this.template == "" || this.template == undefined)  this.template = "template/ob_link/default.css";
    openbexi_updatePageData(null, "page", this.div.id, "template", this.template);
};
openbexi_link.prototype.getData = function() {
    this.type = openbexi_getPageData(null, "page", this.div.id, "type");
    this.parentNodeId = openbexi_getPageData(null, "page", this.div.id, "parentId");
    this.parentType = openbexi_getPageData(null, "page", this.div.id, "parentType");
    this.theme = openbexi_getPageData(null, "page", this.div.id, "theme");
    this.subtheme = openbexi_getPageData(null, "page", this.div.id, "subtheme");
    this.template = openbexi_getPageData(null, "page", this.div.id, "template");
}
openbexi_link.prototype.set_template = function(css_file, category, action, rsync_canvas) {
    if (css_file == null || css_file == "")return;
    if (action == "open") {
        this.subtheme = css_file;
        openbexi_updatePageData(null, "page", this.div.id, "subtheme", css_file);
        openbexiNavigator.browse_CSS(null, null, this.subtheme, true);
    }
    else {
        this.genericObject.set_template(this, css_file, action, rsync_canvas);
        this.link.setAttribute((document.all ? "className" : "class"), "ob_link_" + this.theme);
        //$ob_jquery('#'+this.link.id).addClass("ob_link_" + this.theme);
    }
}
openbexi_link.prototype.get_template = function() {
    return this.template;
};
openbexi_link.prototype.getClass = function() {
    return "ob_link_" + this.theme;
};
openbexi_link.prototype.getText = function() {
    if (document.getElementById(this.link.id).firstChild != null) {
        return document.getElementById(this.link.id).firstChild.nodeValue;
    }
}
openbexi_link.prototype.addLink = function(name) {
    var newLink = document.createElement("a");
    newLink.setAttribute("CLASSE", "LINK");
    newLink.selected = false;
    newLink.setAttribute("id", name);
    newLink.setAttribute("href", "javascript:void(0);");

    if (this.verticalFlag) {
        newLink.style.width = "100%";
    } else {
        newLink.style.width = "80";
    }
    newLink.style.height = "20";
    newLink.style.border = "0px solid white";
    if (this.parentNodeId == "BODY")
        newLink.style.background = document.body.bgColor;
    else
        newLink.style.background = document.getElementById(this.parentNodeId).style.background;
    return newLink;
}
openbexi_link.prototype.updatePopupAttributes = function(source, target) {
    for (var i = 0; i < ob_link_popupAttributes.length; i++) {
        if (ob_link_popupAttributes[i][2] == source) {
            ob_link_popupAttributes[i][2] = target;
            return;
        }
    }
}
openbexi_link.prototype.setVerticalHorizontalAlignment = function() {
    var listIdChild = this.getChildrenId();
    for (var j = 0; j < listIdChild.length; j++) {
        if (document.getElementById(listIdChild[j]).getAttribute("CLASSE") == "LINK") {
            if (document.getElementById(listIdChild[j]).style.width == "100%") {
                this.verticalFlag = true;
                document.getElementById(listIdChild[j]).style.width = "80";
            } else {
                document.getElementById(listIdChild[j]).style.width = "100%";
            }
        }
    }
    if (this.verticalFlag) {
        this.updatePopupAttributes("horizontal alignment", "vertical alignment");
        this.div.style.width = (80 * listIdChild.length);
    } else {
        this.updatePopupAttributes("vertical alignment", "horizontal alignment");
        this.div.style.width = "80";
    }
    this.div.style.height = "20";
}
openbexi_link.prototype.setSelected = function(objId) {
    this.genericObject.setSelected(objId, true);
    if (this.openbexiNavigator) this.openbexiNavigator.update_menu_editor(this, true);
}
openbexi_link.prototype.setUnSelected = function(objId) {
    try {
        this.genericObject.setUnSelected(objId);
        if (currentBexiObj_selected.type != this.type)
            this.openbexiNavigator.update_menu_editor(this, false);
    } catch (e) {
        __openbexi_debugC("openbexi_link.prototype.setUnSelected()", "Exception:" + e.message);
    }
}
openbexi_link.prototype.getChildrenId = function() {
    var count = 0;
    var list = new Array();
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
}
openbexi_link.prototype.setAttribute = function(name, value) {
    return this.genericObject.setAttribute(this.getChildrenId(), name, value);
}
openbexi_link.prototype.getPopupAttributes = function() {
    return ob_link_popupAttributes;
}
openbexi_link.prototype.getInspectorAttributes = function() {
    return ob_link_inspectorAttributes;
}
openbexi_link.prototype.pasteText_or_Link = function() {
    var text = "";
    if (getBrowser() == "NN6") {
        if (this.openbexiNavigator) this.openbexiNavigator.status("Copy&Paste not supported for this browser", "yellow");
        return;
    }
    try {
        text = window.clipboardData.getData('Text');
    } catch (e) {
        if (this.openbexiNavigator) this.openbexiNavigator.status("Copy&Paste not supported for this browser", "red");
    }
    var occurHTTP = text.match('http:\/\/|https:\/\/|c:|C:|d:|D:|file:|javascript:void');
    if (occurHTTP == null || occurHTTP.length == 0) {
        if (this.link.childNodes[0])this.link.removeChild(this.link.childNodes[0]);
        this.link.appendChild(document.createTextNode(text));
        if (!this.link.childNodes[0])this.link.innerHTML = text;
    } else {
        this.add_link(text, true);
    }
    my_PickFunc(this.div);
    if (this.openbexiNavigator) this.openbexiNavigator.status("Copy&Paste " + text + " done", "#abff4b");
}
openbexi_link.prototype.changeStyle = function(objBexiSource,direction) {
    try {
        this.genericObject.changeStyle(objBexiSource, this, direction);
        openbexi_set_CSS(this.link, openbexi_get_CSS(objBexiSource.link));
    } catch (e) {
        __openbexi_debugC("openbexi_button.prototype.changeStyle()", "Exception:" + e.message);

    }
}
openbexi_link.prototype.removeObject = function(flag) {
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
openbexi_link.prototype.my_PickFunc = function(e) {
    openbexi_stopEventPropagation(e);
    var bexiObj = getSelectedBexiObj(this.id);
    my_PickFunc(bexiObj.div);
}
openbexi_link.prototype.add_link = function(url, unselect) {
    if (url == null) {
        var urlText = openbexi_getPageData(null, "url_0", this.div.id, "url");
        if (urlText == "") {
            url = prompt(openbexi_lang("enterObjectURL") + ":", "http://");
            this.link.title = "";
        }
        else {
            url = prompt(openbexi_lang("enterObjectURL") + ":", urlText);
            this.link.title = url;
        }
    }
    if (url != null) {
        openbexi_updatePageData(null, "url_0", this.div.id, "url", url);
        this.link.style.cursor = "pointer";
        this.link.title = url;
    }
    if (unselect)  my_PickFunc(this.div);
}
openbexi_link.prototype.delete_link = function(unselect) {
    var urlText = openbexi_getPageData(null, "url_0", this.div.id, "url");
    openbexi_deletePageData(null, "url_0", this.div.id, "url", urlText);
    this.link.style.cursor = "default";
    this.link.title = "";
    if (unselect)my_PickFunc(this.div);
}
openbexi_link.prototype.add_function = function(protocole, functionName, ob_doc) {
    if (this.genericObject != null) this.genericObject.add_function(protocole, functionName, ob_doc);
}
openbexi_link.prototype.debug = function() {
    if (this.genericObject != null) return this.genericObject.debug(this);
}
openbexi_link.prototype.rename = function() {
    openbexiNavigator.prompt_working = false;
    // Important: add jqi string in the input id, this would stop event propagation to window click
    ob_rename_link.ob_state.title = "Please rename this link:</b></br><input class=\"ob_textarea\" id=\"ob_jqi_rename_link\" type=\"text\" name=\"ob_jqi_rename_link\" size=\"32\" value=\"" + "link" + getSelectedBexiObj(null).id.replace("div", "") + "\">";
    ob_rename_link.ob_state.position = {container: '#' + getSelectedBexiObj(null).id, x: 10, y: -145, width: 300, arrow: 'bl'};
    openbexiNavigator.prompt(event, ob_rename_link);
}
openbexi_link.prototype.get_editor = function() {
    var str = "";
    //str = '   <INPUT type="text" id=nameImput NAME="nameImput" VALUE=' + this.getText();
    //str += '                         style=" WIDTH:95%; background: #ffffcc;"';
    //str += '                         onKeyPress="return open_bexi_updateText(event);">';
    if (this.openbexiNavigator)
        str += this.openbexiNavigator.get_menu_editor(this.getPopupAttributes());
    return str;
}
openbexi_link.prototype.innerHTML_and_EVENTS = function() {
    var inner = "";
    var protocole = openbexi_getPageData(null, "url_0", this.div.id, "protocole");
    if (protocole == "javascript") {
        var functions = this.genericObject.functions_to_trigger(this.div.id);
        if (functions != "")
            inner = '            <link class=\"ob_link\"  ' + functions + ' CLASSE="' + this.link.getAttribute("CLASS") + '" id="' + this.link.id + '" style="' + openbexi_get_CSS(this.link) + '">' + document.getElementById(this.link.id).innerHTML + '</link>\n';
        else
            inner = document.getElementById(this.div.id).innerHTML;
        return inner;
    } else if (protocole == "http") {
        inner = "";
        var url = openbexi_getPageData(null, "url_0", this.div.id, "url");
        if (url != "")
            inner = '            <link class=\"ob_link\" href=\'' + url + '\'\" CLASSE="' + this.link.getAttribute("CLASSE") + '" id="' + this.link.id + '" style="' + openbexi_get_CSS(this.link) + '">' + document.getElementById(this.link.id).innerHTML + '</link>\n';
        else
            inner = document.getElementById(this.div.id).innerHTML;
        return inner;
    }
    else {
        return document.getElementById(this.div.id).innerHTML;
    }
}
openbexi_link.prototype.forward = function() {
    return this.genericObject.forward(this.div, "+");
}
openbexi_link.prototype.backward = function() {
    return this.genericObject.backward(this.div, "-");
}
openbexi_link.prototype.align_left_auto_arrange = function() {
    return this.genericObject.align_left_auto_arrange(this);
}
openbexi_link.prototype.align_right_auto_arrange = function() {
    return this.genericObject.align_right_auto_arrange(this);
}
openbexi_link.prototype.align_top_auto_arrange = function() {
    return this.genericObject.align_top_auto_arrange(this);
}
openbexi_link.prototype.align_bottom_auto_arrange = function() {
    return this.genericObject.align_bottom_auto_arrange(this);
}
openbexi_link.prototype.vertical_width_auto_resize = function() {
    return this.genericObject.vertical_width_auto_resize(this);
}
openbexi_link.prototype.vertical_height_auto_resize = function() {
    return this.genericObject.vertical_height_auto_resize(this);
}
openbexi_link.prototype.horizontal_width_auto_resize = function() {
    return this.genericObject.horizontal_width_auto_resize(this);
}
openbexi_link.prototype.horizontal_height_auto_resize = function() {
    return this.genericObject.horizontal_height_auto_resize(this);
}
openbexi_link.prototype.vertical_spacing_auto_arrange = function() {
    return this.genericObject.vertical_spacing_auto_arrange(this);
}
openbexi_link.prototype.horizontal_spacing_auto_arrange = function() {
    return this.genericObject.horizontal_spacing_auto_arrange(this);
}
openbexi_link.prototype.undo_auto_arrange = function() {
    return this.genericObject.undo_auto_arrange(this);
}
openbexi_link.prototype.redo_auto_arrange = function() {
    return this.genericObject.redo_auto_arrange(this);
}
openbexi_link.prototype.functions_to_load = function() {
    return this.genericObject.functions_to_load(this.div.id);
}
openbexi_link.prototype.head_code = function() {
    return this.genericObject.head_code(this);
}
openbexi_link.prototype.body_code = function() {
    var href = openbexi_getPageData(null, "url_0", this.div.id, "url");
    if (href == "")
        this.link.href = "javascript:void(0)";
    else
        this.link.href = href;
    return this.genericObject.body_code(this);
}
function replaceText(linkObj, text) {
    if (linkObj == null) return;
    linkObj.removeChild(linkObj.childNodes[0]);
    linkObj.appendChild(document.createTextNode(text));
}
