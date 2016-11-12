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
var ob_list_styles_BgImg = null;
var ob_list_inspectorAttributes = [
    ['editor'         ,'ListEditor'   ,'true']
];
var ob_list_popupAttributes = [
    ['menuitem1', 'display_list_editor()', 'ListEditor', 'gif\/list_editor_x48.png',  '48px','48px'],
    ['menuitem40' ,'this.add_link(null,false)','InsertLink', 'gif\/link_add_x48.png','48px','48px'],
    ['menuitem17','openbexiNavigator.javascript(event, false);','Javascript'  ,'gif\/javascript_x48.png','48px','48px'],
    ['menuitem50' ,'this.delete_link(true)'  ,'RemoveLink', 'gif\/link_delete_x48.png','48px','48px'],
    ['menuitem81', 'openbexiNavigator.window_factory(null, \'ob_menu_SQLBrowser\', null, \'minimize\');','SQLDatabases', 'gif\/sql.jpg',    '48px','48px'],
    ['menuitem18','this.backward()'         ,'SendToBack'  ,'gif\/move_backward_x48.png','48px','48px'],
    ['menuitem20','this.forward()'          ,'BringToFront','gif\/move_forward_x48.png','48px','48px'],
    //['menuitem28','duplicate_HTMLList()', 'Duplicate',          'gif\/copy_x48.png',   '48px','48px'],
    ['menuitem29','this.removeObject(true);openbexiNavigator.update_menu_editor(null, false);',  'DlgSelectBtnDelete','gif\/list_delete_x48.png',     '48px','48px']
];
var ob_list_editor = [
    ['menu_RequestBrowser','ob_menu_RequestBrowser','','','','','','List Editor','','500px','500px','',''],
    ['window_left','ob_menu_RequestBrowser_sub_left','','','','','','','','','','overflow: auto;position:absolute;width:0%;',''],
    ['end_window_left','','','','','','','','','','','',''],

    ['window_body','ob_menu_RequestBrowser_sub','','','','','','','','','','border-left:1px solid gray;overflow: auto;position:absolute;width:100%;',''],
    ['form','ob_form','','','','','','','','','','position:absolute;left:0px;',''],
    ['fieldset','ob_fieldset','','','','','','','','','','',''],
    ['legend','','','','','','','List Editor','','','','',''],
    ['textarea','bexicontext_list_data','','','','','','Items','','','','','13'],
    ['end_form','','','','','','',' name','','','','',''],
    ['end_window_body','','','','','','','','','','','',''],

    ['window_foot','ob_menu_RequestBrowser_sub_foot','','','','','','','','','','border-left:1px solid gray;overflow: hidden;position:absolute;height:30%',''],
    ['set_button','','','','','','','','','','','',''],
    ['ok','','onclick="update_list_editor();"','','onmousedown="src=\'gif/ob_ok_down.png\';"','onmouseover="src=\'gif/ob_ok_on.png\';"','onmouseout="src=\'gif/ob_ok.png\';"','Apply','','','','',''],
    ['cancel','','onclick="openbexiNavigator.window_factory(event,\'ob_menu_RequestBrowser\',null,\'hidden\');"','','onmousedown="src=\'gif/ob_cancel_down.png\';"','onmouseover="src=\'gif/ob_cancel_on.png\';"','onmouseout="src=\'gif/ob_cancel.png\';"','Cancel','','','','',''],
    ['endset_button','','','','','','','','','','','',''],
    ['end_window_foot','','','','','','','','','','','','']
];

var openbexi_list = function(bexiObj, obj, name, top, left, width, height) {
    try {
        __openbexi_debugC("openbexi_list(" + bexiObj + "," + obj + "," + name + "," + top + "," + left + "," + width + "," + height + ")", "Classe:");
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
        this.type = "openbexi_list";
        this.query = "";
        this.currentItemSelected = "";
        if (bexiObj == null)
            this.parentNodeId = "BODY";
        else
            this.parentNodeId = bexiObj.id;
        this.theme = "default";
        var divobj = null;
        if (obj == null) {
            divobj = new openbexi_div(bexiObj, obj, name, top, left, width, height);
            this.div = divobj.div;
            this.div.setAttribute("CLASSE", "DIV_LIST");
            this.div.setAttribute("creation_date", new Date());
            this.parent = this.div.id;
            this.list = null;
            //this.div.style.overflow = "auto";
            this.div.style.border = "none";

            var listItems = null;
            this.list = document.createElement("ul");
            this.list.id = this.id + "_ul";
            this.list.setAttribute("CLASSE", "LIST");
            this.list.setAttribute("selected", "false");
            if (listItems) {
                this.div.appendChild(this.list);
                this.setListName(listItems, this.theme);
            }
            this.item = this.addItem(null, this.theme);
            this.addItem(null, this.theme);
            this.addItem(null, this.theme);
            this.div.appendChild(this.list);
            this.setData();
        } else {
            divobj = new openbexi_div(bexiObj, obj, obj.id, top, left, width, height);
            this.div = divobj.div;
            this.div.setAttribute("CLASSE", "DIV_LIST");
            this.div.setAttribute("creation_date",  obj.getAttribute("creation_date"));
            this.div.setAttribute("obzindex",  obj.getAttribute("obzindex"));
            this.div.setAttribute("ob_template",  obj.getAttribute("ob_template"));
            this.parent = this.div.id;
            this.div.ob_template = obj.getAttribute("ob_template");
            this.list = document.getElementById(name);
            this.item = this.list.firstChild;
            this.getData();
            this.div.style.zIndex = obj.getAttribute("obzindex");
        }
        this.genericObject = new openbexi_generic_object(this);
        if (obj == null) this.forward();
        this.set_template(this.template, null, null, null);
    } catch (e) {
        __openbexi_debugC("openbexi_list()", "Exception:" + e.message);
    }
} ;
openbexi_list.prototype.setData = function() {
    openbexi_updatePageData(null, "page", this.div.id, "type", this.type);
    openbexi_updatePageData(null, "page", this.div.id, "subtype", this.subtype);
    openbexi_updatePageData(null, "page", this.div.id, "parentId", this.parentNodeId);
    openbexi_updatePageData(null, "page", this.div.id, "parentType", this.parentType);
    openbexi_updatePageData(null, "page", this.div.id, "obzindex", this.div.obzindex);
    if (this.theme == "" || this.theme == undefined) {
        this.theme = "default";
        this.subtheme = "none";
    }
    openbexi_updatePageData(null, "page", this.div.id, "theme", this.theme);
    openbexi_updatePageData(null, "page", this.div.id, "subtheme", this.subtheme);
    if (this.template == "" || this.template == undefined)  this.template = "template/ob_list/default_bg_gold.css";
    openbexi_updatePageData(null, "page", this.div.id, "template", this.template);
}
openbexi_list.prototype.getData = function() {
    this.type = openbexi_getPageData(null, "page", this.div.id, "type");
    this.subtype = openbexi_getPageData(null, "page", this.div.id, "subtype");
    this.parentNodeId = openbexi_getPageData(null, "page", this.div.id, "parentId");
    this.parentType = openbexi_getPageData(null, "page", this.div.id, "parentType");
    this.theme = openbexi_getPageData(null, "page", this.div.id, "theme");
    this.subtheme = openbexi_getPageData(null, "page", this.div.id, "subtheme");
    this.template = openbexi_getPageData(null, "page", this.div.id, "template");
}
openbexi_list.prototype.set_template = function(css_file, category, action, rsync_canvas) {
    if (css_file == null || css_file == "")return;
    if (action == "open") {
        this.subtheme = css_file;
        openbexi_updatePageData(null, "page", this.div.id, "subtheme", css_file);
        openbexiNavigator.browse_CSS(null, null, this.subtheme, true);
    }
    else {
        this.genericObject.set_template(this, css_file, action, rsync_canvas);
        //this.div.setAttribute((document.all ? "className" : "class"), "ob_list_" + this.theme);
        //this.div.setAttribute((document.all ? "className" : "class"), "div_" + this.theme);
        this.list.setAttribute((document.all ? "className" : "class"), "ul_" + this.theme);

        var listItems = null;
        if (this.list) {
            listItems = this.getItemsName();
            this.div.removeChild(this.list);
            this.list = null;
        }
        this.list = document.createElement("ul");
        this.list.id = this.id + "_ul";
        this.list.setAttribute("CLASSE", "LIST");
        this.list.setAttribute("selected", "false");
        if (listItems) {
            this.div.appendChild(this.list);
            this.setListName(listItems, this.theme);
        }
    }
    return this.list;
}
openbexi_list.prototype.openbexi_SQLRequest = function(event) {
    var requestList;
    if (document.getElementById("ob_SQLRequestInput"))
        requestList = document.getElementById("ob_SQLRequestInput").value.split(/\.|;|,|\r|\n/);
    openbexi_LNRequest(event, this, null, this.type, null, null, null, requestList[0], "sql", null, null, null, null, null, null, null, "true");
}
openbexi_list.prototype.openbexi_LNRequest = function(event) {
    var requestList;
    if (document.getElementById("ob_LNRequestInput"))
        requestList = document.getElementById("ob_LNRequestInput").value.split(/\.|;|,|\r|\n/);
    openbexi_LNRequest(event, this, this.type, requestList[0], "LN");
}
openbexi_list.prototype.addItem = function(text, theme, url) {
    var list = this.getChildrenId();
    var nbItem = list.length - 2;
    var item = document.createElement("li");
    if (text == null) {
        item.innerHTML = "item" + nbItem;
    } else {
        item.innerHTML = text;
    }
    item.id = this.div.id.replace(" ", "") + "_" + nbItem;
    item.setAttribute("selected", "false");
    item.setAttribute("CLASSE", "ITEM");
    if (theme != undefined) item.setAttribute("class", "li_" + theme);
    if (url != undefined) openbexi_updatePageData(null, "url_0", item.id, "url", url);
    var listStyleImage = openbexi_getPageData(null, "page", item.id, "listStyleImage");
    if (listStyleImage != "")item.style.listStyleImage = listStyleImage;
    //item.style.backgroundColor = "#90bade";
    this.list.appendChild(item);
    return item;
}
openbexi_list.prototype.removeItem = function(itemId) {
    var itemRemoved = false;
    if (itemId == null) {
        var listIdChild = this.getChildrenId();
        for (var j = 0; j < listIdChild.length; j++) {
            var child = document.getElementById(listIdChild[j]);
            if (child.getAttribute("selected") && child.getAttribute("CLASSE") == "ITEM") {
                this.list.removeChild(child);
                itemRemoved = true;
            }
        }
    } else {
        this.list.removeChild(document.getElementById(itemId));
        itemRemoved = true;
    }
    if (!itemRemoved) {
        alert("openbexi_list:removeItem(); Please select an item.");
    }
}
openbexi_list.prototype.getItemsName = function() {
    var list = "";
    var items = this.list.getElementsByTagName("li");
    for (var i = 0; i < items.length; i++) {
        list += items[i].innerHTML + "\n";
    }
    return list;
}
openbexi_list.prototype.setListEditor = function() {

    if (document.getElementById("ob_list_backgroundColor"))document.getElementById("ob_list_backgroundColor").value = this.div.style.backgroundColor;
    var items = this.list.getElementsByTagName("li");
    if (document.getElementById("ob_item_marginBottom"))document.getElementById("ob_item_marginBottom").value = items[0].style.marginBottom;
    if (document.getElementById("ob_item_backgroundColor"))document.getElementById("ob_item_backgroundColor").value = items[0].style.backgroundColor;

    var ob_doc = openbexi_get_documentElement(OPENBEXI_PRIVATE_CONTEXT_XML, "text/xml");
    if (ob_doc) {
        if (document.getElementById("ob_databaseList1"))document.getElementById("ob_databaseList1").innerHTML = get_xml_classe_object_attribut_value(ob_doc, "bexicontext", "database_current", "url");
        if (document.getElementById("bexicontext.database_current.driver"))document.getElementById("bexicontext.database_current.driver").innerHTML = get_xml_classe_object_attribut_value(ob_doc, "bexicontext", "database_current", "driver");
        if (document.getElementById("bexicontext.database_current.url"))document.getElementById("bexicontext.database_current.url").innerHTML = get_xml_classe_object_attribut_value(ob_doc, "bexicontext", "database_current", "url");
        if (document.getElementById("bexicontext.database_current.user"))document.getElementById("bexicontext.database_current.user").innerHTML = get_xml_classe_object_attribut_value(ob_doc, "bexicontext", "database_current", "user");
        if (document.getElementById("bexicontext.database_current.password"))document.getElementById("bexicontext.database_current.password").innerHTML = get_xml_classe_object_attribut_value(ob_doc, "bexicontext", "database_current", "password");
    }
}
openbexi_list.prototype.setItemMarginBottom = function(value) {
    var items = this.list.getElementsByTagName("li");
    for (var i = 0; i < items.length; i++) {
        items[i].style.marginBottom = value;
    }
}
openbexi_list.prototype.setItemBackgroundColor = function(color) {
    var items = this.list.getElementsByTagName("li");
    for (var i = 0; i < items.length; i++) {
        items[i].style.backgroundColor = color;
    }
}
openbexi_list.prototype.setListName = function(list, theme) {
    this.removeAllItem();
    var newlist = list.split(/\r|\n/);
    for (var i = 0; i < newlist.length; i++) {
        var item = newlist[i].split(/;|:/);
        if (newlist[i].length > 0 && newlist[i] != " ") {
            this.addItem(item[0], theme, item[1]);
        }
    }
}
openbexi_list.prototype.removeAllItem = function() {
    var listIdChild = this.getChildrenId();
    if (!listIdChild) return;
    for (var j = 0; j < listIdChild.length; j++) {
        var child = document.getElementById(listIdChild[j]);
        if (child && child.getAttribute("CLASSE") == "ITEM") {
            this.list.removeChild(child);
        }
    }
}
openbexi_list.prototype.getText = function() {
    if (this.item == null) return "";
    if (this.item.firstChild == null) return "";
    return this.item.firstChild.nodeValue;
}
openbexi_list.prototype.getCreativeLinkAttributes = function() {
    return null;
}
openbexi_list.prototype.getcreativeAssistantAttributes = function() {
    return null;
}
openbexi_list.prototype.getPopupAttributes = function() {
    return ob_list_popupAttributes;
}
openbexi_list.prototype.getInspectorAttributes = function() {
    return ob_list_inspectorAttributes;
}
openbexi_list.prototype.setSelected = function(objId) {
    this.genericObject.setSelected(objId, this.theme);
    if (this.openbexiNavigator) this.openbexiNavigator.update_menu_editor(this, true);
}
openbexi_list.prototype.setUnSelected = function(objId) {
    try {
        this.genericObject.setUnSelected(objId);
        if (currentBexiObj_selected.type != this.type)
            this.openbexiNavigator.update_menu_editor(this, false);
    } catch (e) {
        __openbexi_debugC("openbexi_list.prototype.setUnSelected()", "Exception:" + e.message);
    }
    //openbexi_closeCreativeEditor("divLinkEditor");
}
openbexi_list.prototype.getChildrenId = function() {
    var count = 0;
    var list = new Array();
    list[count++] = this.div.id;
    list[count++] = this.list.id;
    try {
        for (var j = 0; j < document.getElementById(this.list.id).childNodes.length; j++) {
            var childId = document.getElementById(this.list.id).childNodes[j].id;
            //alert(childId)
            if (childId != null && childId != "") {
                list[count++] = childId;
            }
        }
    } catch(e) {
    }
    return list;
}
openbexi_list.prototype.add_function = function(protocole, functionName, ob_doc) {
    if (this.genericObject != null) this.genericObject.add_function(protocole, functionName, ob_doc);
}
openbexi_list.prototype.add_link = function(url) {
    var count = 0;
    var list = new Array();
    list[count++] = this.div.id;
    list[count++] = this.list.id;
    try {
        for (var j = 0; j < document.getElementById(this.list.id).childNodes.length; j++) {
            var childId = document.getElementById(this.list.id).childNodes[j].id;
            var child = document.getElementById(this.list.id).childNodes[j];
            //alert(childId)
            if (childId != null && childId != "") {
                url = this.genericObject.get_link(childId);
                if (url == "") {
                    url = prompt(openbexi_lang("enterObjectURL for item " + document.getElementById(this.list.id).childNodes[j].innerHTML) + ":", "http://");
                    child.title = "";
                }
                else {
                    url = prompt(openbexi_lang("enterObjectURL for item " + document.getElementById(this.list.id).childNodes[j].innerHTML) + ":", url);
                    child.title = url;
                }
            }
            if (url != null && url != "" && url != "http://") {
                openbexi_updatePageData(null, "page", this.div.id, "current_item", childId);
                if (this.genericObject != null) this.genericObject.add_link(childId, "http", url, "onclick");
                child.style.cursor = "pointer";
                child.title = url;
            } else {
                if (url != "http://")  return;
            }
        }
        openbexi_updatePageData(null, "page", this.div.id, "current_item", "");
    } catch(e) {
    }
}
openbexi_list.prototype.delete_link = function(unselect) {
    for (var j = 0; j < document.getElementById(this.list.id).childNodes.length; j++) {
        var childId = document.getElementById(this.list.id).childNodes[j].id;
        var child = document.getElementById(this.list.id).childNodes[j];
        if (this.genericObject != null) this.genericObject.delete_link(childId);
        child.style.cursor = "default";
    }
    if (unselect)my_PickFunc(this.div);
}
openbexi_list.prototype.setAttribute = function(name, value) {
    if (name == "marginBottom")
        this.setItemMarginBottom(value);
    else {
        var count = 0;
        var list = new Array();
        list[count++] = this.div.id;
        return this.genericObject.setAttribute(list, name, value);
    }
}
openbexi_list.prototype.setURL = function(objId, eventStr, URL) {
    this.genericObject.setURL(objId, eventStr, URL);
}
openbexi_list.prototype.unsetURL = function(objId, eventStr, URL) {
    this.genericObject.unsetURL(objId, eventStr, URL);
}
openbexi_list.prototype.disableURLs = function() {
    this.genericObject.disableURLs();
}
openbexi_list.prototype.enableURLs = function() {
    this.genericObject.enableURLs();
}
openbexi_list.prototype.getSrc = function() {
    return "";
}
openbexi_list.prototype.getURL = function(objId, eventStr) {
    return this.genericObject.getURL(objId, eventStr);
}
openbexi_list.prototype.pasteText_or_Link = function() {
    var text = window.clipboardData.getData('Text');
    if (this.div.getAttribute("selected") || this.list.getAttribute("selected")) {
        var listIdChild = this.getChildrenId();
        var debugStr = "text=" + text + " ";
        var newItemString = "";
        var count = 2;
        var flagEscape = false;
        for (var i = 0; i < text.length; i++) {
            var c = escape(text.charAt(i));
            debugStr += escape(text.charAt(i));
            if (text.charAt(i) == '#' || text.charAt(i) == '|' || text.charAt(i) == ';' || c == '%20' || c == '%09' || c == '%0A' || c == '%0B' || c == '%09C' || c == '%09D') {
                try {
                    //111;22|2; ;;;;;3333;4444#55;  ;|;66;77
                    //111;22;33 444;ttttttttttttt jjjjj;iiiiiiiiiiiiiiiii

                    //alert(count+" "+listIdChild[count])
                    document.getElementById(listIdChild[count]).innerHTML = newItemString;
                } catch(e) {
                    this.addItem(newItemString, this.theme);
                }
                newItemString = "";
                if (!flagEscape) {
                    count += 1;
                }
                flagEscape = true;
            } else {
                flagEscape = false;
                newItemString = newItemString + text.charAt(i);
            }
        }
        try {
            document.getElementById(listIdChild[count]).innerHTML = newItemString;
        } catch(e) {
            this.addItem(newItemString, this.theme);
        }
    } else {
        this.item.removeChild(this.item.childNodes[0]);
        this.item.appendChild(document.createTextNode(text));
    }
    my_PickFunc(this.div);
}
openbexi_list.prototype.LNRequest = function() {
    this.genericObject.LNRequest();
}
openbexi_list.prototype.innerHTML_and_EVENTS_obsolete = function(objId) {
    return document.getElementById(objId).innerHTML;
}
openbexi_list.prototype.innerHTML_and_EVENTS = function() {
    var inner = '     <ul class=\"' + "ul_" + this.theme + '\" id="' + this.list.id + '" style="' + openbexi_get_CSS(document.getElementById(this.list.id)) + '">' + '\n';
    for (var j = 0; j < document.getElementById(this.list.id).childNodes.length; j++) {
        var childId = document.getElementById(this.list.id).childNodes[j].id;
        //alert(childId)
        if (childId != null && childId != "") {
            var functions = this.genericObject.functions_to_trigger(childId);
            if (functions != "")
                inner += '            <li class=\"' + "li_" + this.theme + '\"  ' + functions + '" id="' + childId + '" style="' + openbexi_get_CSS(document.getElementById(childId)) + '">' + document.getElementById(childId).innerHTML + '</li>\n';
            else
                inner += '            <li class=\"' + "li_" + this.theme + '\" id="' + childId + '" style="' + openbexi_get_CSS(document.getElementById(childId)) + '">' + document.getElementById(childId).innerHTML + '</li>\n';
        }
    }
    inner += '     </ul>\n';
    return inner;
}
openbexi_list.prototype.changeStyle = function(objBexi, direction) {
    var listIdChildTarget = this.getChildrenId();
    var listIdChildSource = objBexi.getChildrenId();
    var innerHTMLTmp = objBexi.div.innerHTML;
    for (var j = 0; j < listIdChildTarget.length; j++) {
        var innerHTMLTmp1 = innerHTMLTmp;
        innerHTMLTmp = openbexi_system.openbexi_stringReplaceAll(innerHTMLTmp1, listIdChildSource[j], listIdChildTarget[j]);
    }
    this.genericObject.changeStyle(objBexi, this,direction);
}
openbexi_list.prototype.removeObject = function(flag) {
    //Delete all page data related to list items
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
openbexi_list.prototype.my_PickFunc = function(e) {
    openbexi_stopEventPropagation(e);
    var bexiObj = getSelectedBexiObj(this.id);
    my_PickFunc(bexiObj.div);
}
openbexi_list.prototype.add_function = function(protocole, functionName, ob_doc) {
    if (this.genericObject != null) this.genericObject.add_function(protocole, functionName, ob_doc, this.query);
}
openbexi_list.prototype.get_editor = function() {
    if (this.openbexiNavigator)
        return this.openbexiNavigator.get_menu_editor(this.getPopupAttributes());
    else
        return null;
}
openbexi_list.prototype.forward = function() {
    return this.genericObject.forward(this.div, "+");
}
openbexi_list.prototype.backward = function() {
    return this.genericObject.backward(this.div, "-");
}
openbexi_list.prototype.selectNextItem = function() {
    var found = false;
    var childId = null;
    for (var j = 0; j < document.getElementById(this.list.id).childNodes.length; j++) {
        childId = document.getElementById(this.list.id).childNodes[j].id;
        if (found) {
            this.currentItemSelected = childId;
            return document.getElementById(childId).innerHTML;
        }
        if (childId != null && childId != "") {
            if (this.currentItemSelected == childId) {
                found = true;
            }
        }
    }
    if (document.getElementById(this.list.id).childNodes.length != 0) {
        childId = document.getElementById(this.list.id).childNodes[0].id;
        this.currentItemSelected = childId;
        return  document.getElementById(childId).innerHTML;
    }
    return "";
}
openbexi_list.prototype.debug = function() {
    return this.genericObject.debug(this);
}
openbexi_list.prototype.align_left_auto_arrange = function() {
    return this.genericObject.align_left_auto_arrange(this);
}
openbexi_list.prototype.align_right_auto_arrange = function() {
    return this.genericObject.align_right_auto_arrange(this);
}
openbexi_list.prototype.align_top_auto_arrange = function() {
    return this.genericObject.align_top_auto_arrange(this);
}
openbexi_list.prototype.align_bottom_auto_arrange = function() {
    return this.genericObject.align_bottom_auto_arrange(this);
}
openbexi_list.prototype.vertical_width_auto_resize = function() {
    return this.genericObject.vertical_width_auto_resize(this);
}
openbexi_list.prototype.vertical_height_auto_resize = function() {
    return this.genericObject.vertical_height_auto_resize(this);
}
openbexi_list.prototype.horizontal_width_auto_resize = function() {
    return this.genericObject.horizontal_width_auto_resize(this);
}
openbexi_list.prototype.horizontal_height_auto_resize = function() {
    return this.genericObject.horizontal_height_auto_resize(this);
}
openbexi_list.prototype.vertical_spacing_auto_arrange = function() {
    return this.genericObject.vertical_spacing_auto_arrange(this);
}
openbexi_list.prototype.horizontal_spacing_auto_arrange = function() {
    return this.genericObject.horizontal_spacing_auto_arrange(this);
}
openbexi_list.prototype.undo_auto_arrange = function() {
    return this.genericObject.undo_auto_arrange(this);
}
openbexi_list.prototype.redo_auto_arrange = function() {
    return this.genericObject.redo_auto_arrange(this);
}
openbexi_list.prototype.functions_to_test = function() {
    return this.genericObject.functions_to_test(this.div.id);
}
openbexi_list.prototype.functions_to_load = function() {
    return this.genericObject.functions_to_load(this.div.id);
}
openbexi_list.prototype.head_code = function() {
    openbexi_add_javascript(null, "javascript/", "openbexi_LN.js");
    openbexi_add_javascript(null, "javascript/", "openbexi_navigator.js");
    openbexi_add_javascript(null, "javascript/", "openbexi_pager.js");
    openbexi_add_javascript(null, "javascript/", "openbexi_xml.js");
    return this.genericObject.head_code(this);
    //return "";
}
openbexi_list.prototype.body_code = function(draft) {
    return this.genericObject.body_code(this);
}
openbexi_list.prototype.creativeEditor2 = function(creativeAttributes) {
    this.openbexiNavigator.selected = "explorersql";
    this.openbexiNavigator.getDatabase(event);
    this.openbexiNavigator.display(null, 0);
}
openbexi_list.prototype.creativeEditor = function(creativeAttributes) {
    var left = parseInt(this.div.style.left);
    var editor_top = parseInt(this.div.style.top) + parseInt(this.div.style.height);
    this.genericObject.get_creative_editor("divLinkEditor", creativeAttributes, editor_top, left);
    //openbexi_openCreativeEditor("divLinkEditor");
    this.setListEditor();
}
var bexicontext_list_data_editor;
function display_list_editor() {
    openbexiNavigator.window_factory(null, 'ob_menu_RequestBrowser', ob_list_editor, 'maximize');
    var list;
    if (getSelectedBexiObj(null).type == "openbexi_tabber") {
        list = getSelectedBexiObj(null).getTabsName();
    }
    if (getSelectedBexiObj(null).type == "openbexi_list") {
        list = getSelectedBexiObj(null).getItemsName();
    }
    if (getSelectedBexiObj(null).type == "openbexi_dojo") {
        list = getSelectedBexiObj(null).getComboItemsName();
    }
    document.getElementById("bexicontext_list_data").value = list;
    //Implementing a Syntax-Highlighting with JavaScript Editor from code mirror
    bexicontext_list_data_editor = CodeMirror.fromTextArea(document.getElementById("bexicontext_list_data"), {mode: "HTML mixed-mode",theme: "night", lineNumbers: true,matchBrackets: true,tabMode: "indent",onChange: function() {
        clearTimeout(pending);
        setTimeout(update, 400);
    }});

}
function update_list_editor() {
    var data = bexicontext_list_data_editor.getValue();
    if (getSelectedBexiObj(null).type == "openbexi_list") {
        getSelectedBexiObj(null).setListName(data, getSelectedBexiObj(null).theme);
    }
    if (getSelectedBexiObj(null).type == "openbexi_dojo") {
        getSelectedBexiObj(null).pasteText_or_Link(data);
    }
}
