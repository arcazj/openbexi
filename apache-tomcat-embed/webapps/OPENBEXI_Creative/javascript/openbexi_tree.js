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
 OPEN OPENBEXI htmlbuilder uses dojo 0.4 (BSD License).
 OPEN OPENBEXI htmlbuilder uses FCKeditor 2.4 (GNU General Public License).
 OPEN OPENBEXI htmlbuilder uses query.min.js, jquery-ui.min.js, jQueryRotate.js, jquery.ui.touch-punch.min.js, jquery.jsPlumb-1.5.2-min.js, codemirror.js, fabrics.js
 */


var currentStyleListStyleType = null;
var ListStyleTypeCounter = 0;
var ob_tree_styles_BgImg = null;
var ob_tree_inspectorAttributes = [
    ['editor'         , 'TreeEditor'   , 'true']
];
var ob_tree_popupAttributes = [
    ['menuitem2', 'getSelectedBexiObj(null).showLoadEditor(event);'  , 'loadNewTree', 'gif\/tree_x48.png', '48px', '48px'],
    ['menuitem7', 'getSelectedBexiObj(null).showViewEditor(event);', 'View', 'gif\/ob_view_x48.png', '48px', '48px'],
    //['menuitem8','openbexi_showDataEditor(event)','Data','gif\/ob_data_x48.png','48px','48px'],
    ['menuitem17', 'openbexiNavigator.javascript(event, false);', 'Add_javascript_to_tree'  , 'gif\/javascript_x48.png', '48px', '48px'],
    //['menuitem81','openbexi_getSQLDatabases(event)','SQLDatabases', 'gif\/sql.jpg'              ,'48px','48px'],
    ['menuitem18', 'this.backward()'        , 'SendToBack'           , 'gif\/move_backward_x48.png', '48px', '48px'],
    ['menuitem20', 'this.forward()'         , 'BringToFront'         , 'gif\/move_forward_x48.png' , '48px', '48px'],
    ['menuitem29', 'this.removeObject(true);openbexiNavigator.update_menu_editor(null, false);', 'DlgSelectBtnDelete'   , 'gif\/tree_remove_x48.png'  , '48px', '48px']
];
var ob_tree_load = [
    ['menu_RequestBrowser', 'ob_menu_RequestBrowser', '', '', '', '', '', 'Tree view', '', '560px', '280px', '', ''],
    ['window_left', 'ob_menu_RequestBrowser_sub_left', '', '', '', '', '', '', '', '', '', 'overflow: auto;position:absolute;width:0%;', ''],
    ['end_window_left', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_body', 'ob_menu_RequestBrowser_sub', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow: hidden;position:absolute;width:100%;', ''],
    ['form', 'ob_form', '', '', '', '', '', '', '', '', '', 'position:absolute;left:0px;', ''],
    ['fieldset', 'ob_fieldset', '', '', '', '', '', '', '', '', '', '', ''],
    ['legend', '', '', '', '', '', '', 'Tree editor', '', '', '', '', ''],
    ['input', 'bexicontext_tree_name', '', '', '', '', '', 'JSON tree name', '', '', '', '', '1'],
    ['sep', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_form', '', '', '', '', '', '', ' name', '', '', '', '', ''],
    ['end_window_body', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_foot', 'ob_menu_RequestBrowser_sub_foot', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow: hidden;position:absolute;height:35%', ''],
    ['ok', '', 'onclick="getSelectedBexiObj(null).load_tree_view(event);"', '', 'onmousedown="src=\'gif/ob_ok_down.png\';"', 'onmouseover="src=\'gif/ob_ok_on.png\';"', 'onmouseout="src=\'gif/ob_ok.png\';"', 'Load tree', '', '', '', '', ''],
    ['cancel', '', 'onclick="openbexiNavigator.window_factory(event,\'ob_menu_RequestBrowser\',null,\'hidden\');"', '', 'onmousedown="src=\'gif/ob_cancel_down.png\';"', 'onmouseover="src=\'gif/ob_cancel_on.png\';"', 'onmouseout="src=\'gif/ob_cancel.png\';"', 'Cancel', '', '', '', '', ''],

    ['end_window_foot', '', '', '', '', '', '', '', '', '', '', '', '']
];
var ob_tree_editor = [
    ['menu_RequestBrowser', 'ob_menu_RequestBrowser', '', '', '', '', '', 'Tree view', '', '680px', '610px', '', ''],
    ['window_left', 'ob_menu_RequestBrowser_sub_left', '', '', '', '', '', '', '', '', '', 'overflow: auto;position:absolute;width:0%;', ''],
    ['end_window_left', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_body', 'ob_menu_RequestBrowser_sub', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow: hidden;position:absolute;width:100%;', ''],
    ['form', 'ob_form', '', '', '', '', '', '', '', '', '', 'position:absolute;left:0px;', ''],
    ['fieldset', 'ob_fieldset', '', '', '', '', '', '', '', '', '', 'width:600px', ''],
    ['legend', '', '', '', '', '', '', 'Tree editor', '', '', '', '', ''],
    ['input', 'bexicontext_tree_name', '', '', '', '', '', 'JSON tree name', '', '', '', '', '1'],
    ['textarea', 'bexicontext_tree_body', '', '', '', '', '', 'Body', '', '', '', '', '10'],
    ['sep', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_form', '', '', '', '', '', '', ' name', '', '', '', '', ''],
    ['sep', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['sep', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['sep', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_window_body', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_foot', 'ob_menu_RequestBrowser_sub_foot', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow: hidden;position:absolute;height:25%', ''],
    ['ok', '', 'onclick="getSelectedBexiObj(null).load_tree_view(event);"', '', 'onmousedown="src=\'gif/ob_ok_down.png\';"', 'onmouseover="src=\'gif/ob_ok_on.png\';"', 'onmouseout="src=\'gif/ob_ok.png\';"', 'Save', '', '', '', '', ''],
    ['cancel', '', 'onclick="openbexiNavigator.window_factory(event,\'ob_menu_RequestBrowser\',null,\'hidden\');"', '', 'onmousedown="src=\'gif/ob_cancel_down.png\';"', 'onmouseover="src=\'gif/ob_cancel_on.png\';"', 'onmouseout="src=\'gif/ob_cancel.png\';"', 'Cancel', '', '', '', '', ''],

    ['end_window_foot', '', '', '', '', '', '', '', '', '', '', '', '']
];

var ob_default_json_tree = [
    {
        label: 'node1',
        id: 'node1',
        status: 'none',
        children: [
            {
                label: 'mode1_1',
                id: 'mode1_1',
                status: 'none'
            },
            {
                label: 'mode1_2',
                id: 'mode1_2',
                status: 'none'
            }
        ]
    },
    {
        label: 'node2',
        id: 'node2',
        status: 'none',
        children: [
            {
                label: 'mode2_1',
                id: 'mode2_1',
                status: 'none'
            },
            {
                label: 'mode2_2',
                id: 'mode2_2',
                status: 'none'
            }
        ]
    }  ,
    {
        label: 'node3',
        id: 'node3',
        status: 'none',
        children: [
            {
                label: 'mode3_1',
                id: 'mode3_1',
                status: 'none'
            },
            {
                label: 'mode3_2',
                id: 'mode3_2',
                status: 'none'
            }
        ]
    }
];

function __openbexi_debugC_tree(f, text) {
    try {
        __openbexi_debugC(f, text);
    } catch (e) {
    }
}
var openbexi_tree = function (bexiObj, obj, name, top, left, width, height) {
    try {
        __openbexi_debugC_tree("openbexi_tree(" + bexiObj + "," + obj + "," + name + "," + top + "," + left + "," + width + "," + height + ")", "Classe:");

        var lang_str;
        if (name == null || name == "") name = getNewIdDiv("div");
        if (_CURRENT_OPENBEXI_LANGUAGE == "fr")
            lang_str = "taper votre requete en francais:";
        else
            lang_str = "type your request in English:";
        if (openbexiNavigator)
            this.openbexiNavigator = openbexiNavigator;
        else
            this.openbexiNavigator = new openbexi_navigator();
        this.name = name;
        this.id = name;
        this.type = "openbexi_tree";
        this.query = "";
        this.currentNodeSelected = "";
        if (bexiObj == null)
            this.parentNodeId = "BODY";
        else
            this.parentNodeId = bexiObj.id;
        var divobj = null;
        if (obj == null) {
            divobj = new openbexi_div(bexiObj, obj, name, top, left, width, height);
            this.div = divobj.div;
            this.div.setAttribute("CLASSE", "DIV_TREE");
            this.div.setAttribute("creation_date", new Date());
            this.parent = this.div.id;
            this.div.style.overflow = "auto";
            //this.div.style.border = "1px solid rgb(221, 221, 221)";
            //this.div.style.borderRadius = "1em";
            this.tree_name = "data/json/treeDefault.json";
            this.setData();
            this.tree = this.create_tree("rawdata", ob_default_json_tree, this.div.id, null, null, undefined, undefined);
        } else {
            divobj = new openbexi_div(bexiObj, obj, obj.id, top, left, width, height);
            this.div = divobj.div;
            this.div.setAttribute("CLASSE", "DIV_TREE");
            this.div.setAttribute("creation_date",  obj.getAttribute("creation_date"));
            this.div.setAttribute("obzindex",  obj.getAttribute("obzindex"));
            this.div.setAttribute("ob_template",  obj.getAttribute("ob_template"));
            this.parent = this.div.id;
            this.div.ob_template = obj.getAttribute("ob_template");
            this.getData();
            if (this.tree_name == "data/json/treeDefault.json")
                this.tree = this.create_tree("rawdata", ob_default_json_tree, this.div.id, null, null, undefined, undefined);
            else
                this.tree = this.create_tree("url", this.tree_name, this.div.id, null, null, undefined, undefined);
            this.div.style.zIndex = obj.getAttribute("obzindex");
        }
        this.genericObject = new openbexi_generic_object(this);
        if (obj == null) this.forward();
        this.set_template(this.template, null, null, null);
    } catch (e) {
        __openbexi_debugC_tree("openbexi_tree()", "Exception:" + e.message);
    }
}
openbexi_tree.prototype.setData = function () {
    try {
        openbexi_updatePageData(null, "page", this.div.id, "type", this.type);
        openbexi_updatePageData(null, "page", this.div.id, "subtype", this.subtype);
        openbexi_updatePageData(null, "page", this.div.id, "parentId", this.parentNodeId);
        openbexi_updatePageData(null, "page", this.div.id, "parentType", this.parentType);
        openbexi_updatePageData(null, "page", this.div.id, "tree_name", this.tree_name);
        if (this.theme == "" || this.theme == undefined) {
            this.theme = "claro";
            this.subtheme = "none";
        }
        openbexi_updatePageData(null, "page", this.div.id, "theme", this.theme);
        openbexi_updatePageData(null, "page", this.div.id, "subtheme", this.subtheme);
        if (this.template == "" || this.template == undefined)  this.template = "template/ob_tree/claro.css";
        openbexi_updatePageData(null, "page", this.div.id, "template", this.template);
        openbexi_add_page_image("gif/ob_close_folder_x32.png");
        openbexi_add_page_image("gif/ob_close_folder_x32.png");
    } catch (e) {
    }
}
openbexi_tree.prototype.getData = function () {
    this.type = openbexi_getPageData(null, "page", this.div.id, "type");
    this.subtype = openbexi_getPageData(null, "page", this.div.id, "subtype");
    this.parentNodeId = openbexi_getPageData(null, "page", this.div.id, "parentId");
    this.parentType = openbexi_getPageData(null, "page", this.div.id, "parentType");
    this.theme = openbexi_getPageData(null, "page", this.div.id, "theme");
    this.subtheme = openbexi_getPageData(null, "page", this.div.id, "subtheme");
    this.template = openbexi_getPageData(null, "page", this.div.id, "template");
    this.tree_name = openbexi_getPageData(null, "page", this.div.id, "tree_name");
}
openbexi_tree.prototype.set_template = function (css_file, category, action, rsync_canvas) {
    if (css_file == null || css_file == "")return;
    if (action == "open") {
        this.subtheme = css_file;
        openbexi_updatePageData(null, "page", this.div.id, "subtheme", css_file);
        openbexiNavigator.browse_CSS(null, null, this.subtheme, true);
    }
    else {
        var borderRadius = this.div.style.borderRadius;
        var border = this.div.style.border;
        this.genericObject.set_template(this, css_file, action, rsync_canvas);
        this.div.style.border = border;
        this.div.style.borderRadius = borderRadius;
        this.div.setAttribute((document.all ? "className" : "class"), this.theme);
        try {
            openbexi_load_JS_CSS_file("css/openbexi_icon.css", "css");
        } catch (e) {
        }
    }
}
openbexi_tree.prototype.getClass = function () {
    return "ob_tree_" + this.theme;
}
openbexi_tree.prototype.openbexi_SQLRequest = function (event) {
    var requestList;
    if (document.getElementById("ob_SQLRequestInput"))
        requestList = document.getElementById("ob_SQLRequestInput").value.split(/\.|;|,|\r|\n/);
    openbexi_LNRequest(event, this, null, this.type, null, null, null, requestList[0], "sql", null, null, null, null, null, null, null, "true");
}
openbexi_tree.prototype.openbexi_LNRequest = function (event) {
    var requestList;
    if (document.getElementById("ob_LNRequestInput"))
        requestList = document.getElementById("ob_LNRequestInput").value.split(/\.|;|,|\r|\n/);
    openbexi_LNRequest(event, this, this.type, requestList[0], "LN");
}
openbexi_tree.prototype.addNode = function (text, theme, url) {
    var list = this.getChildrenId();
    var nbNode = list.length - 2;
    var Node = document.createElement("li");
    if (text == null) {
        Node.innerHTML = "Node" + nbNode;
    } else {
        Node.innerHTML = text;
    }
    Node.id = this.div.id.replace(" ", "") + "_" + nbNode;
    Node.setAttribute("selected", "false");
    Node.setAttribute("CLASSE", "NODE");
    if (theme != undefined) Node.setAttribute("class", "li_" + theme);
    if (url != undefined) openbexi_updatePageData(null, "url_0", Node.id, "url", url);
    var listStyleImage = openbexi_getPageData(null, "page", Node.id, "listStyleImage");
    if (listStyleImage != "")Node.style.listStyleImage = listStyleImage;
    //Node.style.backgroundColor = "#90bade";
    this.tree.appendChild(Node);
    return Node;
}
openbexi_tree.prototype.removeNode = function (NodeId) {
    var NodeRemoved = false;
    if (NodeId == null) {
        var listIdChild = this.getChildrenId();
        for (var j = 0; j < listIdChild.length; j++) {
            var child = document.getElementById(listIdChild[j]);
            if (child.getAttribute("selected") && child.getAttribute("CLASSE") == "NODE") {
                this.tree.removeChild(child);
                NodeRemoved = true;
            }
        }
    } else {
        this.tree.removeChild(document.getElementById(NodeId));
        NodeRemoved = true;
    }
    if (!NodeRemoved) {
        alert("openbexi_tree:removeNode(); Please select an Node.");
    }
}
openbexi_tree.prototype.getNodesName = function () {
    var list = "";
    var Nodes = this.tree.getElementsByTagName("li");
    for (var i = 0; i < Nodes.length; i++) {
        list += Nodes[i].innerHTML + "\n";
    }
    return list;
}
openbexi_tree.prototype.setTreeEditor = function () {

    if (document.getElementById("ob_tree_backgroundColor"))document.getElementById("ob_tree_backgroundColor").value = this.div.style.backgroundColor;
    var Nodes = this.tree.getElementsByTagName("li");
    if (document.getElementById("ob_Node_marginBottom"))document.getElementById("ob_Node_marginBottom").value = Nodes[0].style.marginBottom;
    if (document.getElementById("ob_Node_backgroundColor"))document.getElementById("ob_Node_backgroundColor").value = Nodes[0].style.backgroundColor;

    var ob_doc = openbexi_get_documentElement(OPENBEXI_PRIVATE_CONTEXT_XML, "text/xml");
    if (ob_doc) {
        if (document.getElementById("ob_databaseList1"))document.getElementById("ob_databaseList1").innerHTML = get_xml_classe_object_attribut_value(ob_doc, "bexicontext", "database_current", "url");
        if (document.getElementById("bexicontext.database_current.driver"))document.getElementById("bexicontext.database_current.driver").innerHTML = get_xml_classe_object_attribut_value(ob_doc, "bexicontext", "database_current", "driver");
        if (document.getElementById("bexicontext.database_current.url"))document.getElementById("bexicontext.database_current.url").innerHTML = get_xml_classe_object_attribut_value(ob_doc, "bexicontext", "database_current", "url");
        if (document.getElementById("bexicontext.database_current.user"))document.getElementById("bexicontext.database_current.user").innerHTML = get_xml_classe_object_attribut_value(ob_doc, "bexicontext", "database_current", "user");
        if (document.getElementById("bexicontext.database_current.password"))document.getElementById("bexicontext.database_current.password").innerHTML = get_xml_classe_object_attribut_value(ob_doc, "bexicontext", "database_current", "password");
    }
}
openbexi_tree.prototype.setNodeMarginBottom = function (value) {
    var Nodes = this.tree.getElementsByTagName("li");
    for (var i = 0; i < Nodes.length; i++) {
        Nodes[i].style.marginBottom = value;
    }
}
openbexi_tree.prototype.setNodeBackgroundColor = function (color) {
    var Nodes = this.tree.getElementsByTagName("li");
    for (var i = 0; i < Nodes.length; i++) {
        Nodes[i].style.backgroundColor = color;
    }
}
openbexi_tree.prototype.setListName = function (list, theme) {
    this.removeAllNode();
    var newlist = list.split(/\r|\n/);
    for (var i = 0; i < newlist.length; i++) {
        var Node = newlist[i].split(/;|:/);
        if (newlist[i].length > 0 && newlist[i] != " ") {
            this.addNode(Node[0], theme, Node[1]);
        }
    }
}
openbexi_tree.prototype.removeAllNode = function () {
    var listIdChild = this.getChildrenId();
    if (!listIdChild) return;
    for (var j = 0; j < listIdChild.length; j++) {
        var child = document.getElementById(listIdChild[j]);
        if (child && child.getAttribute("CLASSE") == "NODE") {
            this.tree.removeChild(child);
        }
    }
}
openbexi_tree.prototype.getText = function () {
    if (this.node == null) return "";
    if (this.node.firstChild == null) return "";
    return this.node.firstChild.nodeValue;
}
openbexi_tree.prototype.getCreativeLinkAttributes = function () {
    return null;
}
openbexi_tree.prototype.getcreativeAssistantAttributes = function () {
    return null;
}
openbexi_tree.prototype.getPopupAttributes = function () {
    return ob_tree_popupAttributes;
}
openbexi_tree.prototype.getInspectorAttributes = function () {
    return ob_tree_inspectorAttributes;
}
openbexi_tree.prototype.setSelected = function (objId) {
    this.genericObject.setSelected(objId, this.theme);
    openbexiNavigator.update_menu_editor(this, true);
}
openbexi_tree.prototype.setUnSelected = function (objId) {
    try {
        this.genericObject.setUnSelected(objId);
        if (currentBexiObj_selected.type != this.type)
            this.openbexiNavigator.update_menu_editor(this, false);
    } catch (e) {
        __openbexi_debugC("openbexi_tree.prototype.setUnSelected()", "Exception:" + e.message);
    }
}
openbexi_tree.prototype.getChildrenId = function () {
    var count = 0;
    var list = new Array();
    list[count++] = this.div.id;
    list[count++] = this.tree.id;
    try {
        for (var j = 0; j < document.getElementById(this.tree.id).childNodes.length; j++) {
            var childId = document.getElementById(this.tree.id).childNodes[j].id;
            //alert(childId)
            if (childId != null && childId != "") {
                list[count++] = childId;
            }
        }
    } catch (e) {
    }
    return list;
}
openbexi_tree.prototype.add_function = function (protocole, functionName, ob_doc) {
    if (this.genericObject != null) this.genericObject.add_function(protocole, functionName, ob_doc);
}
openbexi_tree.prototype.add_link = function (url) {
    var count = 0;
    var list = new Array();
    list[count++] = this.div.id;
    list[count++] = this.tree.id;
    try {
        for (var j = 0; j < document.getElementById(this.tree.id).childNodes.length; j++) {
            var childId = document.getElementById(this.tree.id).childNodes[j].id;
            var child = document.getElementById(this.tree.id).childNodes[j];
            //alert(childId)
            if (childId != null && childId != "") {
                url = this.genericObject.get_link(childId);
                if (url == "") {
                    url = prompt(openbexi_lang("enterObjectURL for Node " + document.getElementById(this.tree.id).childNodes[j].innerHTML) + ":", "http://");
                    child.title = "";
                }
                else {
                    url = prompt(openbexi_lang("enterObjectURL for Node " + document.getElementById(this.tree.id).childNodes[j].innerHTML) + ":", url);
                    child.title = url;
                }
            }
            if (url != null && url != "" && url != "http://") {
                openbexi_updatePageData(null, "page", this.div.id, "current_Node", childId);
                if (this.genericObject != null) this.genericObject.add_link(childId, "http", url, "onclick");
                child.style.cursor = "pointer";
                child.title = url;
            } else {
                if (url != "http://")  return;
            }
        }
        openbexi_updatePageData(null, "page", this.div.id, "current_Node", "");
    } catch (e) {
    }
}
openbexi_tree.prototype.delete_link = function (unselect) {
    for (var j = 0; j < document.getElementById(this.tree.id).childNodes.length; j++) {
        var childId = document.getElementById(this.tree.id).childNodes[j].id;
        var child = document.getElementById(this.tree.id).childNodes[j];
        if (this.genericObject != null) this.genericObject.delete_link(childId);
        child.style.cursor = "default";
    }
    if (unselect)my_PickFunc(this.div);
}
openbexi_tree.prototype.setAttribute = function (name, value) {
    if (name == "marginBottom")
        this.setNodeMarginBottom(value);
    else {
        var count = 0;
        var list = new Array();
        list[count++] = this.div.id;
        return this.genericObject.setAttribute(list, name, value);
    }
}
openbexi_tree.prototype.setURL = function (objId, eventStr, URL) {
    this.genericObject.setURL(objId, eventStr, URL);
}
openbexi_tree.prototype.unsetURL = function (objId, eventStr, URL) {
    this.genericObject.unsetURL(objId, eventStr, URL);
}
openbexi_tree.prototype.disableURLs = function () {
    this.genericObject.disableURLs();
}
openbexi_tree.prototype.enableURLs = function () {
    this.genericObject.enableURLs();
}
openbexi_tree.prototype.getSrc = function () {
    return "";
}
openbexi_tree.prototype.getURL = function (objId, eventStr) {
    return this.genericObject.getURL(objId, eventStr);
}
openbexi_tree.prototype.pasteText_or_Link = function () {
    var text = window.clipboardData.getData('Text');
}
openbexi_tree.prototype.LNRequest = function () {
    this.genericObject.LNRequest();
}
openbexi_tree.prototype.innerHTML_and_EVENTS = function () {
    return document.getElementById(this.div.id).innerHTML;
}
openbexi_tree.prototype.changeStyle = function (objBexi, direction) {
    this.genericObject.changeStyle(objBexi, this,direction);
}
openbexi_tree.prototype.removeObject = function (flag) {
    //Delete all page data related to list Nodes
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
    this.genericObject.removeObject(this);
    ob_setDirty_flag(flag);
}
openbexi_tree.prototype.my_PickFunc = function (e) {
    openbexi_stopEventPropagation(e);
    var bexiObj = getSelectedBexiObj(this.id);
    my_PickFunc(bexiObj.div);
}
openbexi_tree.prototype.add_function = function (protocole, functionName, ob_doc) {
    if (this.genericObject != null) this.genericObject.add_function(protocole, functionName, ob_doc);
}
openbexi_tree.prototype.get_editor = function () {
    if (this.openbexiNavigator)
        return this.openbexiNavigator.get_menu_editor(this.getPopupAttributes());
    else
        return null;
}
openbexi_tree.prototype.forward = function () {
    return this.genericObject.forward(this.div, "+");
}
openbexi_tree.prototype.backward = function () {
    return this.genericObject.backward(this.div, "-");
}
openbexi_tree.prototype.selectNextNode = function () {
    var found = false;
    var childId = null;
    for (var j = 0; j < document.getElementById(this.tree.id).childNodes.length; j++) {
        childId = document.getElementById(this.tree.id).childNodes[j].id;
        if (found) {
            this.currentNodeSelected = childId;
            return document.getElementById(childId).innerHTML;
        }
        if (childId != null && childId != "") {
            if (this.currentNodeSelected == childId) {
                found = true;
            }
        }
    }
    if (document.getElementById(this.tree.id).childNodes.length != 0) {
        childId = document.getElementById(this.tree.id).childNodes[0].id;
        this.currentNodeSelected = childId;
        return  document.getElementById(childId).innerHTML;
    }
    return "";
}
openbexi_tree.prototype.debug = function () {
    return this.genericObject.debug(this);
}
openbexi_tree.prototype.align_left_auto_arrange = function () {
    return this.genericObject.align_left_auto_arrange(this);
}
openbexi_tree.prototype.align_right_auto_arrange = function () {
    return this.genericObject.align_right_auto_arrange(this);
}
openbexi_tree.prototype.align_top_auto_arrange = function () {
    return this.genericObject.align_top_auto_arrange(this);
}
openbexi_tree.prototype.align_bottom_auto_arrange = function () {
    return this.genericObject.align_bottom_auto_arrange(this);
}
openbexi_tree.prototype.vertical_width_auto_resize = function () {
    return this.genericObject.vertical_width_auto_resize(this);
}
openbexi_tree.prototype.vertical_height_auto_resize = function () {
    return this.genericObject.vertical_height_auto_resize(this);
}
openbexi_tree.prototype.horizontal_width_auto_resize = function () {
    return this.genericObject.horizontal_width_auto_resize(this);
}
openbexi_tree.prototype.horizontal_height_auto_resize = function () {
    return this.genericObject.horizontal_height_auto_resize(this);
}
openbexi_tree.prototype.vertical_spacing_auto_arrange = function () {
    return this.genericObject.vertical_spacing_auto_arrange(this);
}
openbexi_tree.prototype.horizontal_spacing_auto_arrange = function () {
    return this.genericObject.horizontal_spacing_auto_arrange(this);
}
openbexi_tree.prototype.undo_auto_arrange = function () {
    return this.genericObject.undo_auto_arrange(this);
}
openbexi_tree.prototype.redo_auto_arrange = function () {
    return this.genericObject.redo_auto_arrange(this);
}
openbexi_tree.prototype.functions_to_test = function () {
    return this.genericObject.functions_to_test(this.div.id);
}
openbexi_tree.prototype.functions_to_load = function () {
    return this.genericObject.functions_to_load(this.div.id);
}
openbexi_tree.prototype.head_code = function () {
    openbexi_add_javascript(null, "javascript/", "openbexi_tree.js");
    openbexi_add_javascript(null, "dojo/", "*");
    openbexi_add_javascript(null, "dojox/", "*");
    openbexi_add_javascript(null, "dijit/", "*");
    return "";
}
openbexi_tree.prototype.getClass = function () {
    return this.theme;
};
openbexi_tree.prototype.body_code = function () {
    var str = "";
    try {
        var functions = this.genericObject.functions_to_trigger(this.div.id);
        str = str + '        <div CLASSE="' + this.div.getAttribute("CLASSE") + '" id="' + this.div.id + '" ob_template="' + this.div.ob_template + '" obzindex="' + this.div.obzindex + '" creation_date="' + this.div.getAttribute("creation_date") + '" style="' + openbexi_get_CSS_except_CSS3(this.div) + '" ' + functions + '>\n';
        str = str + '        </div>\n';
    } catch (e) {
        __openbexi_debugC("openbexi_tree.prototype.body_code()", "Exception:" + e.message);
    }
    return str;
}
function save_tree_view_CB(responseXML) {
    //alert(responseXML);
    try {
        __openbexi_debugC_tree("save_tree_view_CB(" + responseXML + ")", "Info:");

        if (responseXML == null || responseXML == "") {
            if (openbexiNavigator != undefined) openbexiNavigator.status("openbexi_browse_picture_gallery_CB bug ???");
            __openbexi_debugC_tree("save_tree_view_CB() Exception:", "No answer fron the server");
            openbexi_unloading2();
            return;
        }

        var ob_doc = openbexi_get_documentElement(responseXML, "text/xml");

        var status = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "status", "text");
        if (status != "" && status != "done") {
            __openbexi_debugC_tree("openbexi_dojoGrid_CB() Error:", "status=" + status);
            if (openbexiNavigator != undefined) openbexiNavigator.top_frame_message(status, "50px", "error");
            return;
        }

        var appli_status = get_xml_classe_object_attribut_value(ob_doc, "openbexi_creative", "application", "status");
        if (appli_status != "") __openbexi_debugC_tree("save_tree_view_CB() Info:", "appli_status=" + appli_status);

        var exception = get_xml_classe_object_attribut_value(ob_doc, "openbexi_creative", "application", "exception");
        if (exception != "") __openbexi_debugC_tree("save_tree_view_CB() Exception:", exception);

        var tree_name = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "json", "filename");
        if (tree_name == "") {
            __openbexi_debugC_tree("save_tree_view_CB() file not saved");
            openbexi_unloading2();
            return;
        } else
            openbexi_updatePageData(null, "page", "data", "json", tree_name);

        var div_id = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "div", "name");
        if (div_id == "") {
            __openbexi_debugC_tree("save_tree_view_CB() div_id not found");
            openbexi_unloading2();
            return;
        }

        if (openbexiNavigator != undefined)
            openbexiNavigator.create_tree("url", tree_name, div_id, null, null, undefined, undefined);

    } catch (e) {
        __openbexi_debugC_tree("save_tree_view_CB()", "Exception:" + e.message);
    }
    openbexi_unloading2();
}

var bexicontext_tree_data_editor;
function showViewEditor_CB(responseXML) {
    //alert(responseXML);
    try {
        __openbexi_debugC_tree("showViewEditor_CB(" + responseXML + ")", "Info:");

        if (responseXML == null || responseXML == "") {
            if (openbexiNavigator != undefined) openbexiNavigator.status("openbexi_browse_picture_gallery_CB bug ???");
            __openbexi_debugC_tree("showViewEditor_CB() Exception:", "No answer fron the server");
            openbexi_unloading2();
            return;
        }

        var ob_doc = openbexi_get_documentElement(responseXML, "text/xml");

        var status = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "status", "text");
        if (status != "" && status != "done") {
            __openbexi_debugC_tree("showViewEditor_CB() Info:", "status=" + status);
            if (openbexiNavigator != undefined) openbexiNavigator.top_frame_message(status, "50px", "error");
            openbexi_unloading2();
            return;
        }

        var appli_status = get_xml_classe_object_attribut_value(ob_doc, "openbexi_creative", "application", "status");
        if (appli_status != "") {
            __openbexi_debugC_tree("showViewEditor_CB() Info:", "appli_status=" + appli_status);
        }

        var exception = get_xml_classe_object_attribut_value(ob_doc, "openbexi_creative", "application", "exception");
        if (exception != "") __openbexi_debugC_tree("showViewEditor_CB() Exception:", exception);

        var div_id = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "div", "name");
        if (div_id == "") {
            __openbexi_debugC_tree("showViewEditor_CB() div_id not found");
            openbexi_unloading2();
            return;
        }

        var tree_name = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "json", "filename");
        if (tree_name == "")
            __openbexi_debugC_tree("showViewEditor_CB() file not saved");
        openbexi_updatePageData(null, "page", "data", "json", tree_name);
        openbexi_updatePageData(null, "page", div_id, "tree_name", tree_name);

        var json_text = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "json", "text");

        if (document.getElementById("bexicontext_tree_name")) document.getElementById("bexicontext_tree_name").value = tree_name;
        if (document.getElementById("bexicontext_tree_body")) document.getElementById("bexicontext_tree_body").value = json_text;

        try {
            getSelectedBexiObj(null).tree_name = tree_name;
        } catch (e) {

        }

        if (json_text == "")
            openbexi_create_tree("url", tree_name, div_id, null, null, true, undefined);
        else {
            json_text = json_text.trim().slice(1);
            //json_text = json_text.replace("identifier: 'id', label: 'label', status: 'none', items:", "");
            json_text = json_text.replace(/identifier(.*)items:/, "");
            //json_text = json_text.replace("[]},]}", "[]},]");
            //Remove last "]"
            json_text = json_text.trim().slice(0, -1);
            openbexi_create_tree("data", eval(json_text), div_id, null, null, true, undefined);
        }

        if (appli_status == "CannotReadFile" && json_text == "")
            if (openbexiNavigator != undefined) openbexiNavigator.frame_message("ob_menu_RequestBrowser_text", "Cannot found and load " + tree_name, "error", "40px");
        if (status == "ok" && json_text == "")
            if (openbexiNavigator != undefined) openbexiNavigator.frame_message("ob_menu_RequestBrowser_text", tree_name + " successfully loaded", "info", "40px");
        if (status == "CannotSaveFile")
            if (openbexiNavigator != undefined) openbexiNavigator.frame_message("ob_menu_RequestBrowser_text", "cannot save " + tree_name, "error", "40px");
        if (status == "ok" && json_text != "")
            if (openbexiNavigator != undefined) openbexiNavigator.frame_message("ob_menu_RequestBrowser_text", tree_name + " successfully saved", "info", "40px");

        //Implementing a Syntax-Highlighting with JavaScript Editor from code mirror
        var data = document.getElementById("bexicontext_tree_body").value;
        document.getElementById("bexicontext_tree_body").value = openbexi_formatJsonText(data);
        bexicontext_tree_data_editor = CodeMirror.fromTextArea(document.getElementById("bexicontext_tree_body"), {mode: "javascript", theme: "night", lineNumbers: true, matchBrackets: true, continueComments: "Enter",
            extraKeys: {"Ctrl-Q": "toggleComment"}, onChange: function () {
                clearTimeout(pending);
                setTimeout(update, 50);
            }});
        var totalLines = bexicontext_tree_data_editor.lineCount();
        var totalChars = bexicontext_tree_data_editor.getTextArea().value.length;
        bexicontext_tree_data_editor.autoFormatRange({line: 0, ch: 0}, {line: totalLines, ch: totalChars});
        CodeMirror.commands["goPageUp"](bexicontext_tree_data_editor);

    } catch (e) {
        __openbexi_debugC_tree("showViewEditor_CB()", "Exception:" + e.message);
    }
    openbexi_unloading2();
}
openbexi_tree.prototype.showViewEditor = function (event) {
    try {
        openbexiNavigator.window_factory(event, "ob_menu_RequestBrowser", ob_tree_editor, "maximize");
        this.tree_name = openbexi_getPageData(null, "page", this.div.id, "tree_name");

        if (document.getElementById("bexicontext_tree_name")) document.getElementById("bexicontext_tree_name").value = this.tree_name;

        var doc = null;
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_readJSONRequest");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "project", openbexiNavigator.projectName);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filename", openbexiNavigator.webPageName);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "json", "filename", this.tree_name);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "div", "name", this.div.id);
        var ob_xml = openbexi_get_xmlString(doc);

        var mode_sync = openbexi_synchron();
        openbexi_connect_to_server(null, mode_sync, ob_xml, showViewEditor_CB);

    } catch (e) {
        __openbexi_debugC_tree("openbexi_navigator.prototype.showViewEditor()", "Exception:" + e.message);
    }
}
openbexi_tree.prototype.showLoadEditor = function (event) {
    try {
        openbexiNavigator.window_factory(null, 'ob_menu_RequestBrowser', ob_tree_load, 'maximize');
        document.getElementById("bexicontext_tree_name").value = this.tree_name;

    } catch (e) {
        __openbexi_debugC_tree("openbexi_navigator.prototype.showViewEditor()", "Exception:" + e.message);
    }
}
function openbexi_load_tree_view(div_id, json, tree_name) {

    var doc = null;
    doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_readJSONRequest");
    doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "json", "filename", json);
    doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "div", "name", div_id);
    var ob_xml = openbexi_get_xmlString(doc);

    var mode_sync = openbexi_synchron();
    openbexi_connect_to_server(null, mode_sync, ob_xml, showViewEditor_CB);
    openbexiNavigator.window_factory(event, "ob_menu_RequestBrowser", null, "hidden");
}
openbexi_tree.prototype.load_tree_view = function (event) {
    if (event.target.result == undefined) {
        if (document.getElementById("bexicontext_tree_name")) this.tree_name = document.getElementById("bexicontext_tree_name").value;
        if (this.tree_name == "treeDefault.json") {
            openbexiNavigator.frame_message("ob_menu_RequestBrowser_text", this.tree_name + " already loaded", "warning", "40px");
            return;
        }
        if (document.getElementById("bexicontext_tree_body"))
            openbexi_updatePageData(null, "page", this.div.id, "tree_json", openbexi_unformatJsonText(bexicontext_tree_data_editor.getValue()));
        openbexi_updatePageData(null, "page", this.div.id, "tree_name", this.tree_name);
    } else {
        this.tree_name = openbexi_getPageData(null, "page", this.div.id, "tree_name");
    }

    var doc = null;
    doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_readJSONRequest");
    doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "project", openbexiNavigator.projectName);
    doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filename", openbexiNavigator.webPageName);
    doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "json", "filename", this.tree_name);
    doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "div", "name", this.div.id);
    doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "json", "text", openbexi_getPageData(null, "page", this.div.id, "tree_json"));
    var ob_xml = openbexi_get_xmlString(doc);

    var mode_sync = openbexi_synchron();
    openbexi_connect_to_server(null, mode_sync, ob_xml, showViewEditor_CB);
    openbexiNavigator.window_factory(event, "ob_menu_RequestBrowser", null, "hidden");
    openbexi_deletePageData(null, "page", this.div.id, "tree_json");

}
function openbexi_create_tree(rawdata_type, rawdata, ob_menu, type, collapse_all, expand_node_id, expand_child_node_id) {
    try {
        __openbexi_debugC_tree("openbexi_tree.prototype.create_tree([rawdata ]," + ob_menu + ")", "Info:");
        var modelId;
        var treeId;
        var getIconClass = ob_getCustomIconClass;

        if (ob_menu != null) {
            document.getElementById(ob_menu).style.visibility = "visible";
            document.getElementById(ob_menu).innerHTML = "";
        }

        if (dijit.byId("tree_node_" + ob_menu))dijit.byId("tree_node_" + ob_menu).destroy();
        if (dijit.byId("tree_" + ob_menu))dijit.byId("tree_" + ob_menu).destroy();
        modelId = "tree_node_" + ob_menu;
        treeId = "tree_" + ob_menu;
        var ob_newStore;

        if (rawdata_type == "url") {
            ob_newStore = new dojo.data.ItemFileReadStore({ url: rawdata});
        }
        else {
            ob_newStore = new dojo.data.ItemFileReadStore({
                data: {
                    identifier: 'id',
                    label: 'label',
                    status: 'status',
                    items: rawdata
                }
            });
        }
        var treeModel = new dijit.tree.ForestStoreModel({
            id: modelId,
            store: ob_newStore
        });
        var treeControl = new dijit.Tree({
            id: treeId,
            model: treeModel,
            showRoot: false,
            openOnClick: true,
            getIconClass: eval(getIconClass),
            _createTreeNode: function (args) {
                var tnode = new dijit._TreeNode(args);
                tnode.labelNode.innerHTML = args.label;
                if (collapse_all != undefined) {
                    if (!collapse_all) this._expandNode(tnode);
                    if (collapse_all) this._collapseNode(tnode);
                }
                if (expand_node_id != undefined)
                    if (args.item.id == expand_node_id)
                        this._expandNode(tnode);
                    else
                        this._collapseNode(tnode);
                if (expand_child_node_id != undefined)
                    if (args.item.id == expand_child_node_id)
                        this._expandNode(tnode);
                return tnode;
            }
        });
        if (ob_menu != null) {
            dojo.byId(ob_menu).appendChild(treeControl.domNode);
        }
        return treeControl;

    } catch (e) {
        __openbexi_debugC_tree("openbexi_create_tree()", "Exception:" + e.message);
    }
}
openbexi_tree.prototype.create_tree = function (rawdata_type, rawdata, ob_menu, type, collapse_all, expand_node_id, expand_child_node_id) {
    try {

        __openbexi_debugC_tree("openbexi_create_tree([rawdata]," + ob_menu + ")", "Info:");
        var modelId;
        var treeId;
        var getIconClass = ob_getCustomIconClass;

        if (ob_menu != null) {
            document.getElementById(ob_menu).style.visibility = "visible";
            document.getElementById(ob_menu).innerHTML = "";
        }

        if (dijit.byId("tree_node_" + ob_menu))dijit.byId("tree_node_" + ob_menu).destroy();
        if (dijit.byId("tree_" + ob_menu))dijit.byId("tree_" + ob_menu).destroy();
        modelId = "tree_node_" + ob_menu;
        treeId = "tree_" + ob_menu;
        var ob_newStore;
        if (rawdata_type == "url") {
            ob_newStore = new dojo.data.ItemFileReadStore({ url: rawdata});
            openbexi_updatePageData(null, "page", this.div.id, "tree_name", rawdata);
        }
        else {
            openbexi_updatePageData(null, "page", this.div.id, "tree_name", this.tree_name);
            ob_newStore = new dojo.data.ItemFileReadStore({
                data: {
                    identifier: 'id',
                    label: 'label',
                    status: 'status',
                    items: rawdata
                }
            });
        }
        var treeModel = new dijit.tree.ForestStoreModel({
            id: modelId,
            store: ob_newStore
        });
        var treeControl = new dijit.Tree({
            id: treeId,
            model: treeModel,
            showRoot: false,
            openOnClick: true,
            getIconClass: eval(getIconClass),
            _createTreeNode: function (args) {
                var tnode = new dijit._TreeNode(args);
                tnode.labelNode.innerHTML = args.label;
                if (collapse_all != undefined) {
                    if (!collapse_all) this._expandNode(tnode);
                    if (collapse_all) this._collapseNode(tnode);
                }
                if (expand_node_id != undefined)
                    if (args.item.id == expand_node_id)
                        this._expandNode(tnode);
                    else
                        this._collapseNode(tnode);
                if (expand_child_node_id != undefined)
                    if (args.item.id == expand_child_node_id)
                        this._expandNode(tnode);
                return tnode;
            }
        });
        if (ob_menu != null) {
            dojo.byId(ob_menu).appendChild(treeControl.domNode);
        }
        return treeControl;

    } catch (e) {
        __openbexi_debugC_tree("openbexi_navigator.prototype.create_tree()", "Exception:" + e.message);
    }
}
function ob_getIcon(file, status) {
    try {
        if (status == "transparent")
            return "ob_transparent_icon";
        if (status == "loading")
            return "ob_loading_icon";
        if (status == "__project")
            return "ob_root_path_icon";
        if (status == "__closeFolder")
            return "ob_close_folder";
        if (status == "__trigger")
            return "ob_trigger_icon";
        if (status == "__SQL")
            return "ob_sql_icon";
        if (status == "__newSQL")
            return "ob_sql_icon";
        if (status == "__TABLE")
            return "ob_table_icon";
        if (status == "__LIST")
            return "ob_list_icon";
        if (status == "__FONT")
            return "ob_font_icon";
        if (status == "__ITALIC")
            return "ob_italic_icon";
        if (status == "__TEMPLATE")
            return "ob_template_icon";
        if (status == "__FUNC")
            return "ob_function_icon";
        if (status == "__EDIT")
            return "ob_edit_icon";
        if (status == "__JS")
            return "ob_js_icon";
        if (status == "__ARCHIVES" || file.match(RegExp("^.*\.(archives)$")))
            return "ob_archives_icon";
        if (status.match(RegExp("__info")))
            return  "ob_info_icon";
        if (status.match(RegExp("__ok")))
            return  "ob_ok_icon";
        if (status.match(RegExp("__bug")))
            return  "ob_bug_icon";
        if (status.match(RegExp("__warning")))
            return  "ob_warning_icon";
        if (status.match(RegExp("__error")))
            return  "ob_error_icon";
        if (status.match(RegExp("__satellite")))
            return  "ob_satellite_icon";
        if (status.match(RegExp("__FTP")))
            if (file == "Create a new website0")
                return  "ob_addftp_icon";
            else
                return "ob_ftp_icon";
        if (file.match(RegExp("^.*\.(html|HTML|htm|HTM)$")))
            if (status == "removed")
                return "ob_html_remove_icon";
            else
                return "ob_html_icon";
        else if (file.match(RegExp("ob_color_bg")))
            return "ob_none_icon";
        else if (file.match(RegExp("ob_more")))
            return "ob_color_icon";
        else if (file.match(RegExp("__TABLE")))
            return "ob_table_icon";
        else if (file.match(RegExp("__LIST")))
            return "ob_list_icon";
        else if (file.match(RegExp("__HTML")))
            return "ob_html_icon";
        else if (file.match(RegExp("__EDIT")))
            return "ob_edit_icon";
        else if (file.match(RegExp("^.*\.(exe|bat|sh|csh|bsh|EXE|BAT|SH|CSH)$")))
            return "ob_exe_icon";
        else if (file.match(RegExp("new_project")))
            if (status == "removed")
                return "ob_close_folder_remove";
            else
                return "ob_close_folder";
        else if (file.match(RegExp("ob_close_folder")))
            return "ob_close_folder";
        else if (file.match(RegExp("ob_folder_up")))
            return "ob_folder_up";
        else if (file.match(RegExp("^.*\.(swf|wmv|avi|mpeg|mpg|mpe|movie|mov|qt|avi|AVI|MEPG|MPG|MPE|MOVIE|MOV|QT|AVI)$")))
            if (status == "removed")
                return "ob_video_remove_icon";
            else if (status == "media")
                return file;
            else
                return "ob_video_icon";
        else if (file.match(RegExp("^.*\.(gif|png|jpeg|jpg|tiff|riff|bgi|bmp|svg|GIF|PNG|JPEG|JPG|TIFF|RIFF|BGI|BMP|SVG)$")))
            if (status == "removed")
                return "ob_img_remove_icon";
            else if (status == "media")
                return file;
            else
                return "ob_img_icon";
        else if (file.match(RegExp("^.*\.(doc|DOC)$")))
            if (status == "removed")
                return "ob_doc_remove_icon";
            else
                return "ob_doc_icon";
        else if (file.match(RegExp("^.*\.(sql)$")))
            if (status == "removed")
                return "ob_sql_remove_icon";
            else
                return "ob_sql_icon";
        else if (file.match(RegExp("^.*\.(js|JS)$")))
            if (status == "removed")
                return "ob_js_remove_icon";
            else
                return "ob_js_icon";
        else if (file.match(RegExp("^.*\.(java|JAVA)$")))
            if (status == "removed")
                return "ob_java_remove_icon";
            else
                return "ob_java_icon";
        else if (file.match(RegExp("^.*\.(pdf|PDF)$")))
            if (status == "removed")
                return "ob_pdf_remove_icon";
            else
                return "ob_pdf_icon";
        else if (file.match(RegExp("^.*\.(psd|PSD)$")))
            if (status == "removed")
                return "ob_psd_remove_icon";
            else
                return "ob_psd_icon";
        else if (file.match(RegExp("^.*\.(xml|XML)$")))
            if (status == "removed")
                return "ob_xml_remove_icon";
            else
                return "ob_xml_icon";
        else if (file.match(RegExp("^.*\.(css|CSS)$")))
            if (status == "removed")
                return "ob_css_remove_icon";
            else
                return "ob_css_icon";
        else if (file.match(RegExp("^.*\.(php|PHP)$")))
            if (status == "removed")
                return "ob_php_remove_icon";
            else
                return "ob_php_icon";
        else if (file.match(RegExp("^.*\.(txt|TXT)$")))
            if (status == "removed")
                return "ob_txt_remove_icon";
            else
                return "ob_txt_icon";
        else if (file.match(RegExp("^.*\.(pl|PL)$")))
            return "ob_pl_icon";
        else if (file.match(RegExp("^.*\.(rtf|RTF)$")))
            return "ob_rtf_icon";
        else if (file.match(RegExp("^.*\.(jar|JAR)$")))
            return "ob_jar_icon";
        else if (file.match(RegExp("^.*\.(xls|XLS)$")))
            return "ob_xls_icon";
        else if (file.match(RegExp("^.*\.(rpm|RPM)$")))
            return "ob_rpm_icon";
        else if (file.match(RegExp("ob_root_path")))
            return "ob_root_path_icon";
        else if (file.match(RegExp("^.*\.(zip|ZIP|tar|TAR|gz|GZ|7z|7Z)$")))
            return "ob_zip_icon";
        else if (file.match(RegExp("^.*\.(wav|wave|pls|pcast|mid|mp2|mp3|m3u|m3u8|m4a|m4b|m4p|m4r|m4v|mp4|mod|wma|rm|aac|cda|cdda|ipa|ipg|ipsw|itdb|ite|itl|itlp|itms|itpc|WAV|WAVE|MID|MP2|MP3|MP4|MOD|WMA|RM|AAC|CDA|CDDA|IPA)$")))
            if (status == "removed")
                return "ob_audio_remove_icon";
            else
                return "ob_audio_icon";
        else {
            if (status == "removed")
                return "ob_file_remove_icon";
            else
                return "ob_file_icon";
        }
    } catch (e) {
        //__openbexi_debugC_tree("ob_getIcon()", "Exception:" + e.message);
    }
    return "ob_file_icon";
}
function ob_getSQLIconClass(item, opened) {
    try {
        if (!item || this.model.mayHaveChildren(item)) {
            if (item.status == "__TABLE")
                return (opened ? "ob_table_icon" : "ob_table_icon");
            else
                return (opened ? "ob_sql_icon" : "ob_sql_icon");
        }
        else {
            var ob_newStore = this.model.store;
            return ob_getIcon(ob_newStore.getValue(item, "id"), ob_newStore.getValue(item, "status"));
        }
    } catch (e) {
        __openbexi_debugC_tree("ob_getSQLIconClass()", "Exception:" + e.message);
    }
    return dijitLeaf;
}
;
function ob_getJSIconClass(item, opened) {
    try {
        if (!item || this.model.mayHaveChildren(item))
            return (opened ? "ob_trigger_icon" : "ob_trigger_icon");
        else {
            var ob_newStore = this.model.store;
            return ob_getIcon(ob_newStore.getValue(item, "id"), ob_newStore.getValue(item, "status"));
        }
    } catch (e) {
        __openbexi_debugC_tree("ob_getJSIconClass()", "Exception:" + e.message);
    }
    return dijitLeaf;
}
;
function ob_getFTPIconClass(item, opened) {
    try {
        if (!item || this.model.mayHaveChildren(item))
            return (opened ? "ob_ftp_icon" : "ob_ftp_icon");
        else {
            var ob_newStore = this.model.store;
            return ob_getIcon(ob_newStore.getValue(item, "id"), ob_newStore.getValue(item, "status"));
        }
    } catch (e) {
        __openbexi_debugC_tree("ob_getFTPIconClass()", "Exception:" + e.message);
    }
    return dijitLeaf;
}
;
function ob_getCSSIconClass(item, opened) {
    try {
        if (!item || this.model.mayHaveChildren(item))
            return (opened ? "ob_css_icon" : "ob_css_icon");
        else {
            var ob_newStore = this.model.store;
            if (ob_newStore.getValue(item, "id").match(RegExp("ob_color_bg")))
                return "ob_none_icon";
            else if (ob_newStore.getValue(item, "id").match(RegExp("ob_more")))
                return "ob_color_icon";
            else if (ob_newStore.getValue(item, "id").match(RegExp("ob_background")))
                return "ob_none_icon";
            else if (ob_newStore.getValue(item, "id").match(RegExp("ob_box")))
                return "ob_none_icon";
            else if (ob_newStore.getValue(item, "id").match(RegExp("ob_border")))
                return "ob_none_icon";
            else if (ob_newStore.getValue(item, "id").match(RegExp("opacity")))
                return "ob_none_icon";
            else if (ob_newStore.getValue(item, "id").match(RegExp("ob_font_size")))
                return "ob_none_icon";
            else if (ob_newStore.getValue(item, "id").match(RegExp("ob_template_")))
                return "ob_template_icon";
            else if (ob_newStore.getValue(item, "id").match(RegExp("AlignLeftAutoArrange")))
                return "ob_AlignLeftAutoArrange_icon";
            else if (ob_newStore.getValue(item, "id").match(RegExp("AlignRightAutoArrange")))
                return "ob_AlignRightAutoArrange_icon";
            else if (ob_newStore.getValue(item, "id").match(RegExp("AlignTopAutoArrange")))
                return "ob_AlignTopAutoArrange_icon";
            else if (ob_newStore.getValue(item, "id").match(RegExp("AlignBottomAutoArrange")))
                return "ob_AlignBottomAutoArrange_icon";
            else if (ob_newStore.getValue(item, "id").match(RegExp("VerticalSpacingAutoArrange")))
                return "ob_VerticalSpacingAutoArrange_icon";
            else if (ob_newStore.getValue(item, "id").match(RegExp("HorizontalSpacingAutoArrange")))
                return "ob_HorizontalSpacingAutoArrange_icon";
            else if (ob_newStore.getValue(item, "id").match(RegExp("VerticalWidthAutoResize")))
                return "ob_VerticalWidthAutoResize_icon";
            else if (ob_newStore.getValue(item, "id").match(RegExp("VerticalHeightAutoResize")))
                return "ob_VerticalHeightAutoResize_icon";
            else if (ob_newStore.getValue(item, "id").match(RegExp("HorizontalHeightAutoResize")))
                return "ob_HorizontalHeightAutoResize_icon";
            else if (ob_newStore.getValue(item, "id").match(RegExp("HorizontalWidthAutoResize")))
                return "ob_HorizontalWidthAutoResize_icon";
            else if (ob_newStore.getValue(item, "id").match(RegExp("normal")))
                return "ob_normal_icon";
            else if (ob_newStore.getValue(item, "id").match(RegExp("italic")))
                return "ob_italic_icon";
            else if (ob_newStore.getValue(item, "id").match(RegExp("bold")))
                return "ob_bold_icon";
            else if (ob_newStore.getValue(item, "id").match(RegExp("underline")))
                return "ob_underline_icon";
            else if (ob_newStore.getValue(item, "id").match(RegExp("strikethrough")))
                return "ob_strikethrough_icon";
            else if (ob_newStore.getValue(item, "id").match(RegExp("subscript")))
                return "ob_subscript_icon";
            else if (ob_newStore.getValue(item, "id").match(RegExp("superscript")))
                return "ob_superscript_icon";
            else if (ob_newStore.getValue(item, "id").match(RegExp("justifyLeft")))
                return "ob_justifyLeft_icon";
            else if (ob_newStore.getValue(item, "id").match(RegExp("justifyRight")))
                return "ob_justifyRight_icon";
            else if (ob_newStore.getValue(item, "id").match(RegExp("justifyCenter")))
                return "ob_justifyCenter_icon";
            else if (ob_newStore.getValue(item, "id").match(RegExp("justifyFull")))
                return "ob_justifyFull_icon";
            else if (ob_newStore.getValue(item, "id").match(RegExp("Outdent")))
                return "ob_Outdent_icon";
            else if (ob_newStore.getValue(item, "id").match(RegExp("indent")))
                return "ob_indent_icon";
            else if (ob_newStore.getValue(item, "id").match(RegExp("insertOrderedList")))
                return "ob_insertOrderedList_icon";
            else if (ob_newStore.getValue(item, "id").match(RegExp("insertUnorderedList")))
                return "ob_insertUnorderedList_icon";
            else if (ob_newStore.getValue(item, "id").match(RegExp("insertHorizontalRule")))
                return "ob_insertHorizontalRule_icon";
            else if (ob_newStore.getValue(item, "id").match(RegExp("ob_dirtemplate_")))
                return "ob_close_folder";
            else if (ob_newStore.getValue(item, "id").match(RegExp("ob_css_editor2")))
                return "ob_txt_icon"; else if (ob_newStore.getValue(item, "id").match(RegExp("ob_connection")))
                return "ob_trigger_icon";
            else if (ob_newStore.getValue(item, "id").match(RegExp("^.*\.(html|HTML|htm|HTM)$")))
                return "ob_html_icon";
            else if (ob_newStore.getValue(item, "id").match(RegExp("ob_bg_img_style")))
                return "ob_img_icon";
            else
                return "ob_font_icon";
        }
    } catch (e) {
        __openbexi_debugC_tree("ob_getCSSIconClass()", "Exception:" + e.message);
    }
    return "ob_font_icon";
}
;
function ob_getCustomIconClass(item, opened) {
    try {
        if (!item || this.model.mayHaveChildren(item))
            return (opened ? "ob_open_folder" : "ob_close_folder");
        else {
            var ob_newStore = this.model.store;
            return ob_getIcon(ob_newStore.getValue(item, "id"), ob_newStore.getValue(item, "status"));
        }
    } catch (e) {
        __openbexi_debugC_tree("ob_getCustomIconClass()", "Exception:" + e.message);
    }
    return dijitLeaf;
}
function ob_getIconClass(item, opened) {
    try {
        if (!item || this.model.mayHaveChildren(item)) {
            return (opened ? "ob_open_folder" : "ob_close_folder");
        }
        else {
            var ob_newStore = this.model.store;
            return ob_getIcon(ob_newStore.getValue(item, "id"), ob_newStore.getValue(item, "status"));
        }
    } catch (e) {
        __openbexi_debugC_tree("ob_getCustomIconClass()", "Exception:" + e.message);
    }
    return "ob_close_folder";
}


