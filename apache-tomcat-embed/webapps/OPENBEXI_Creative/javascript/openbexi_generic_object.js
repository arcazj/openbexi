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

var ob_config_auto_arrange_id = null;
var ob_config_auto_arrange_top = null;
var ob_config_auto_arrange_left = null;
var ob_config_auto_arrange_height = null;
var ob_config_auto_arrange_width = null;
var desactiveStyle = true;

var openbexi_generic_object = function (bexiObj) {
    if (bexiObj == null) {
        this.name = "none";
        return;
    }
    this.name = bexiObj.name;
    this.id = bexiObj.name;
    this.type = bexiObj.type;
    this.selected = bexiObj.selected;
    // events and functions variable
    this.codes = new Array();
    this.types = new Array();
    // create object
    this.div = bexiObj.div;
    this.parent = bexiObj.parent;
};
openbexi_generic_object.prototype.setSelected = function (objId, theme) {
    try {
        //__openbexi_debugC("openbexi_generic_object.prototype.setSelected(" + objId + "," + theme + ")", " Warning:" + previousObjNameSelected + "          " + currentObjNameSelected + "----" + previousBexiObj_selected + "     " + currentBexiObj_selected);
        document.getElementById(objId).selected = true;
        openbexi_set_draggable(objId, true);
        if (document.getElementById("ob_error_popup"))document.getElementById("ob_error_popup").style.visibility = "hidden";
        if (document.getElementById('ob_menu_widget') != null && document.getElementById('ob_menu_widget').style.visibility != "hidden")
            openbexiNavigator.window_factory(null, 'ob_menu_widget', ob_menu_widget, "hidden");
        if (openbexiNavigator.css_editor_mode == "text") {
            if (document.getElementById('ob_menu_CSS') != null && document.getElementById('ob_menu_CSS').style.visibility != "hidden")
                openbexiNavigator.window_factory(null, 'ob_menu_CSS', null, "hidden");
            display_CSS_editor();
        } else {
            if (document.getElementById('ob_menu_RequestBrowser') != null && document.getElementById('ob_menu_RequestBrowser').style.visibility != "hidden")
                openbexiNavigator.window_factory(null, 'ob_menu_RequestBrowser', null, "hidden");
            if (document.getElementById('ob_menu_PictureBrowser') != null && document.getElementById('ob_menu_PictureBrowser').style.visibility != "hidden")
                openbexiNavigator.window_factory(null, 'ob_menu_PictureBrowser', null, "hidden");
            if (previousBexiObj_selected == null || (previousBexiObj_selected != null && currentBexiObj_selected != null && previousBexiObj_selected.type != currentBexiObj_selected.type && currentBexiObj_selected.type != "openbexi_page" && currentBexiObj_selected.type != "openbexi_form"))
                openbexiNavigator.window_factory(null, 'ob_menu_CSS', null, 'minimize');
        }
        if (document.getElementById(objId).ob_endpoints != undefined)  jsPlumb.repaintEverything();
    } catch (e) {
        __openbexi_debugC("openbexi_generic_object.prototype.setSelected(" + objId + "," + theme + ") Exception:" + e.message);
    }
};
openbexi_generic_object.prototype.setUnSelected = function (objId) {
    try {
        //__openbexi_debugC("openbexi_generic_object.prototype.setUnSelected(" + objId + ")", " Warning:" + previousObjNameSelected + "          " + currentObjNameSelected);
        if (document.getElementById(objId))document.getElementById(objId).selected = false;
        openbexi_set_draggable(objId, false);
        document.getElementById("ob_error_popup").style.visibility = "hidden";
        if (document.getElementById('ob_menu_JavascriptBrowser') != null && document.getElementById('ob_menu_JavascriptBrowser').style.visibility != "hidden")
            openbexiNavigator.window_factory(null, 'ob_menu_JavascriptBrowser', null, "hidden");
        if (document.getElementById('ob_menu_RequestBrowser') != null && document.getElementById('ob_menu_RequestBrowser').style.visibility != "hidden")
            openbexiNavigator.window_factory(null, 'ob_menu_RequestBrowser', null, "hidden");
        if (checkRelativePage())
            if (document.getElementById('ob_menu_widget') != null && document.getElementById('ob_menu_widget').style.visibility != "hidden")
                openbexiNavigator.window_factory(null, 'ob_menu_widget', ob_menu_widget, "hidden");
        //else
        //openbexiNavigator.window_factory(null, 'ob_menu_widget', ob_menu_widget, 'minimize');
        if (previousObjNameSelected == currentObjNameSelected)
            if (document.getElementById('ob_menu_CSS') != null && document.getElementById('ob_menu_CSS').style.visibility != "hidden")
                openbexiNavigator.window_factory(null, 'ob_menu_CSS', null, "hidden");
        if (document.getElementById(objId).ob_endpoints != undefined)  jsPlumb.repaintEverything();
    } catch (e) {
        __openbexi_debugC("openbexi_generic_object.prototype.setUnSelected(" + objId + ") Exception:" + e.message);
    }
};
openbexi_generic_object.prototype.getChildrenId = function () {
    try {
        var count = 0;
        var list = new Array();
        list[count++] = this.div.id;
        return list;
    } catch (e) {
        __openbexi_debugC("openbexi_generic_object.prototype.getChildrenId()() Exception:" + e.message);
    }
};
openbexi_generic_object.prototype.setAttribute = function (listIdChild, name, value) {
    try {
        ob_setDirty_flag(true);
        var widgetIdList = null;
        if (document.getElementById("ob_labelWidgetId") != null && document.getElementById("ob_labelWidgetId").value != "BODY") {
            var widgetId = document.getElementById("ob_labelWidgetId").value;
            widgetIdList = widgetId.split(".");
            widgetIdList = widgetIdList[widgetIdList.length - 1].split(".");
        } else {
            widgetIdList = listIdChild;
        }
        if (widgetIdList != null) {
            for (var j = 0; j < widgetIdList.length; j++) {
                try {
                    if (name == "backgroundImage") {
                        openbexi_updatePageData(null, "page", widgetIdList[0], "backgroundImage", value);
                        openbexi_updatePageData(null, "page", widgetIdList[0], "background", "");
                        document.getElementById(widgetIdList[0]).style.background = "";
                        eval("document.getElementById(widgetIdList[j]).style." + name + " = \"url(" + value + ")\"");
                    }
                    else if (name == "background") {
                        openbexi_updatePageData(null, "page", widgetIdList[0], "background", value);
                        openbexi_updatePageData(null, "page", widgetIdList[0], "backgroundImage", "");
                        document.getElementById(widgetIdList[0]).style.backgroundImage = "";
                        eval("document.getElementById(widgetIdList[j]).style." + name + " = \"" + value + "\"");
                    }
                    else if (name == "backgroundRepeat") {
                        openbexi_updatePageData(null, "page", widgetIdList[0], "backgroundRepeat", value);
                        eval("document.getElementById(widgetIdList[j]).style." + name + " = \"" + value + "\"");
                    } else {
                        eval("document.getElementById(widgetIdList[j]).style." + name + " = \"" + value + "\"");
                    }

                } catch (e) {
                    __openbexi_debugC("openbexi_generic_object.prototype.setAttribute() Exception:() Exception:" + e.message);
                }
            }
        }
    } catch (e) {
        __openbexi_debugC("openbexi_generic_object.prototype.setAttribute() Exception:" + e.message);
    }
}
openbexi_generic_object.prototype.setAttributes = function (div_id) {
    try {
        var background = openbexi_getPageData(null, "page", div_id, "background");
        if (background != "")
            eval("document.getElementById(div_id).style.background = \"" + background + "\"");
        var backgroundImage = openbexi_getPageData(null, "page", div_id, "backgroundImage");
        if (backgroundImage != "")
            eval("document.getElementById(div_id).style.backgroundImage = \"url(" + backgroundImage + ")\"");
        var backgroundRepeat = openbexi_getPageData(null, "page", div_id, "backgroundRepeat");
        if (backgroundRepeat != "")
            eval("document.getElementById(div_id).style.backgroundRepeat = \"" + backgroundRepeat + "\"");
    } catch (e) {
        __openbexi_debugC("openbexi_generic_object.prototype.setAttributes() Exception:" + e.message);
    }
}
openbexi_generic_object.prototype.getText = function () {
    return "";
}
openbexi_generic_object.prototype.pasteText_or_Link = function (text) {
}
openbexi_generic_object.prototype.LNRequest = function () {
    document.getElementById("LNRequestDiv").style.visibility = "visible";
}
openbexi_generic_object.prototype.delete_openbexi_object = function (objectId) {
    try {
        //if(objectId=="BODY") return;
        var openbexi_object_tmp = new Array();
        var currentObject = null;
        var count = 0;
        for (var i = 0; i < openbexi_object.length; i++) {
            currentObject = openbexi_object[i];
            if (currentObject != undefined) {
                if (currentObject.id != objectId) {
                    openbexi_object_tmp[count++] = currentObject;
                } else {
                    if (currentObject.div != null && dd.elements[currentObject.div.id] != undefined)dd.elements[currentObject.div.id].del();
                    //openbexi_debugAllText = objectId + " deleted\n" + openbexi_debugAllText;
                }
            }
        }
        openbexi_object = openbexi_object_tmp;
        //openbexi_deletePageData(null, "page", objectId, "ALL", null);
        //for (var i = 0; i < openbexi_object.length; i++) {
        //if (protectedObject_and_grips(openbexi_object[i].div.id) == false) {
        //openbexi_debugAllText = openbexi_object[i].id + " " + openbexi_object[i].div.id + "\n" + openbexi_debugAllText;
        //}
        //}
        //for (var i = 0; i < dd.elements.length; i++) {
        //if (protectedObject_and_grips(dd.elements[i].id) == false) {
        //openbexi_debugAllText = "----------->>>dd=" + dd.elements[i].id + "\n" + openbexi_debugAllText;
        //}
        //}
        //openbexi_debugAllText = "---------------------------------bexi=" + openbexi_object.length + " " + "dd=" + dd.elements.length + "-----------------------------------------------------\n" + openbexi_debugAllText;
        //__openbexi_debugC("delete_openbexi_object", openbexi_debugAllText);
    } catch (e) {
        __openbexi_debugC("openbexi_generic_object.prototype.delete_openbexi_object()", "Exception:" + e.message);
    }
};
openbexi_generic_object.prototype.removeObject = function (selectedBexiObj) {
    //ob_setDirty_flag(true);
    //Delete all page data related to list items
    try {
        openbexi_reset_all_z(selectedBexiObj.div, "remove");
        if (selectedBexiObj == null) {
            selectedBexiObj = getSelectedBexiObj(null);
        }
        this.removePageObjects(selectedBexiObj);

        if (selectedBexiObj.parentNodeId == "BODY") {
            document.body.removeChild(selectedBexiObj.div);
        } else {
            var parent = document.getElementById(selectedBexiObj.parentNodeId);
            if (parent != null || parent != undefined)
                parent.removeChild(selectedBexiObj.div);
            //else
            //alert("openbexi_generic_object.prototype.removeObject:parent null or undefined for " + selectedBexiObj.div.id)
        }
        this.delete_openbexi_object(selectedBexiObj.id);
        openbexi_delete_all_link(selectedBexiObj.parent);
        openbexi_delete_all_link(selectedBexiObj.div.id);
        openbexi_reset();
        if (ob_canvas != null) ob_canvas.clear();

    } catch (e) {
        __openbexi_debugC("openbexi_generic_object.prototype.removeObject() Exception:" + e.message);
        //alert("cannot remove a " + selectedBexiObj.id + " element. Sorry.\nCheck if the latest OPEN OPENBEXI Html builder version fixes this problem\nopenbexi_generic_object.prototype.removeObject():" + e.name + ". Error message: " + e.message);
    }
};
openbexi_generic_object.prototype.removePageObjects = function (selectedBexiObj) {
    try {
        var count = 0;
        //ob_setDirty_flag(true);
        if (selectedBexiObj == null) {
            selectedBexiObj = getSelectedBexiObj(null);
        }
        var objBexiArray = new Array();
        for (var i = 0; i < openbexi_object.length; i++) {
            if (openbexi_object[i] != undefined && openbexi_object[i].id != "BODY") {
                if (openbexi_object[i].div != null) {
                    if (openbexi_object[i].parentNodeId == selectedBexiObj.id) {
                        objBexiArray[count] = openbexi_object[i];
                        count += 1;
                    }
                }
            }
        }
        for (var j = 0; j < objBexiArray.length; j++) {
            try {
                objBexiArray[j].removeObject(false);
            } catch (e) {
                __openbexi_debugC("openbexi_generic_object.prototype.removePageObjects()", "Exception:" + e.message);
            }
        }
    } catch (e) {
        __openbexi_debugC("openbexi_generic_object.prototype.removePageObjects()", "Exception:" + e.message);
    }
};
openbexi_generic_object.prototype.removeObjects = function () {
    var objBexiArray = new Array();
    var count = 0;
    var countPage = 0;
    try {
        openbexiBody.setAttribute("backgroundImage", "");
        openbexiBody.setAttribute("background", "");
        openbexiBody.setAttribute("bgColor", "");
    } catch (e) {
    }

    for (var i = 0; i < openbexi_object.length; i++) {
        if (openbexi_object[i] != undefined && openbexi_object[i].id != "BODY") {
            if (openbexiNavigator)openbexiNavigator.status("removing " + openbexi_object[i].id, "#abff4b");
            objBexiArray[count] = openbexi_object[i];
            count += 1;
        }
    }
    for (var j = 0; j < objBexiArray.length; j++) {
        try {
            this.removeObject(objBexiArray[j]);
        } catch (e) {
            __openbexi_debugC("openbexi_generic_object.prototype.removeObjects() Exception:" + e.message);
        }
    }
    /*if (openbexi_object.length > 4) {
     try {
     this.removeObjects();
     } catch(e) {
     __openbexi_debugC("openbexi_generic_object.prototype.removeObjects() Exception:" + e.message);
     }
     }*/
    //Clean up all page data
    try {
        openbexi_deletePageData(null, "page", "ALL", "ALL", null);
    } catch (e) {
        __openbexi_debugC("openbexi_generic_object.prototype.removeObjects() Exception:" + e.message);
    }
    if (openbexiNavigator)openbexiNavigator.status("removed all objects", "#abff4b");
};
openbexi_generic_object.prototype.getSrc = function () {
    return "";
};
openbexi_generic_object.prototype.debug = function (bexiObject) {
    var dText = "-->bexiObject.name=" + bexiObject.name + "\n";
    dText += "-->bexiObject.id=" + bexiObject.id + "\n";
    dText += "-->bexiObject.mode=" + bexiObject.mode + "\n";
    dText += "-->bexiObject.parentNodeId=" + bexiObject.parentNodeId + "\n";
    dText += "-->document.getElementById(bexiObject.parent).parentNode.id = " + document.getElementById(bexiObject.parent).parentNode.id + "\n";
    dText += "-->document.getElementById(bexiObject.parent).parentNode.CLASSE = " + document.getElementById(bexiObject.parent).parentNode.CLASSE + "\n";
    dText += "-->bexiObject.parent=" + bexiObject.parent + " selected=" + document.getElementById(bexiObject.parent).selected + "\n";
    var listIdChild = bexiObject.getChildrenId();
    for (var j = 0; j < listIdChild.length; j++) {
        dText += "---------->child" + j + "=" + listIdChild[j] + "\n";
    }
    return dText;
};
openbexi_generic_object.prototype.get_editor = function (popupAttributes) {
    try {
        //alert("openbexi_generic_object.prototype.get_editor for:"+getSelectedBexiObj(null).id)
        var count = 0;
        var currentFcn = null;
        var str = '<table   align=center  style=" margin-top:1px; width:99%; "><tr>';
        for (var i = 0; i < popupAttributes.length; i++) {
            if (popupAttributes[i][0] == "sep" || count > 5) {
                if (i != 0) {
                    str += '<tr><\/table>';
                }
                count = 0;
                str += '<table align=center style=" margin-top:1px; width:99%;"><tr>';
            }
            if (popupAttributes[i][1] != null && popupAttributes[i][2] != null && popupAttributes[i][3] != null) {
                currentFcn = popupAttributes[i][1].replace("this", "getSelectedBexiObj(null)");
                var text = openbexi_lang(popupAttributes[i][2]);
                str += '    <td><button title="' + text + '" type="img"';
                str += '                style="border:1px solid black;cursor:pointer; background: url(' + popupAttributes[i][3] + ');  width: ' + popupAttributes[i][4] + '; height:' + popupAttributes[i][5] + '"';
                if (getBrowser() == "ie6" || getBrowser() == "ie7" || getBrowser() == "ie7_no_XMLHttpRequest") {
                    str += '                onmouseover="this.style.border=\'2px solid black\';" ';
                    str += '                onmouseout="this.style.border=\'1px solid black\';" ';
                    str += '                onmouseup="this.style.border=\'1px solid black\';" ';
                    str += '                onmousedown="this.style.border=\'4px solid black\';" ';
                    str += '                onClick="' + currentFcn + '"><\/button><\/td>';
                }
                else {
                    str += '                onmouseover="this.style.border=\'2px solid black\';" ';
                    str += '                onmouseout="this.style.border=\'1px solid black\';" ';
                    str += '                onmousedown="this.style.border=\'4px solid black\';" ';
                    str += '                onmouseup="this.style.border=\'1px solid black\';" ';
                    str += '                onClick="' + currentFcn + '\"><\/button><\/td>';
                }
                count++;
            }
        }
        str += '<tr><\/table>';
        //alert(str)
        return str;
    } catch (e) {
        __openbexi_debugC("openbexi_generic_object.prototype.get_editor()", "Exception:" + e.message);
        return "";
    }
};
var selectedCreativeTab = null;
var creativeTabs = null;
function ob_showCreativePanel(e, name, tabname) {
    var panel = document.getElementById(name);
    var tab = document.getElementById(tabname);
    if (selectedCreativeTab) {
        selectedCreativeTab.style.backgroundColor = '';
        selectedCreativeTab.style.paddingTop = '';
        selectedCreativeTab.style.paddingBottom = '';
    }
    selectedCreativeTab = tab;
    selectedCreativeTab.style.backgroundColor = 'white';
    selectedCreativeTab.style.paddingTop = '6px';
    selectedCreativeTab.style.marginTop = '0px';
    for (i = 0; i < creativeTabs.length; i++) {
        if (document.getElementById(creativeTabs[i])) document.getElementById(creativeTabs[i]).style.display = (name == creativeTabs[i]) ? 'block' : 'none';
    }
    return false;
}
;
openbexi_generic_object.prototype.get_creative_editor = function (editorName, creativeAttributes, top, left) {
    //var debug_str="";
    var height = 20;
    var previousHeight = 20;
    var currentFcn = null;
    var flag = false;
    for (var i = 0; i < creativeAttributes.length; i++) {
        if (i == 0) {
            if (creativeAttributes[i][6]) height += parseInt(creativeAttributes[i][6]);
        }
        if (i > 0 && flag) {
            flag = false;
            if (creativeAttributes[i][6]) height += parseInt(creativeAttributes[i][6]);
        }
        if (creativeAttributes[i][0] == "sep") {
            height += 10;
            flag = true;
        }
        if (creativeAttributes[i][2] == "endtab") {
            if (previousHeight < height)previousHeight = height;
            //debug_str+="\n================================endtab============== h= "+height+"==============\n";
            height = 30;
        }
        //debug_str+="\n"+creativeAttributes[i][0]+" "+creativeAttributes[i][2]+" "+creativeAttributes[i][6]+"        --------------------->height="+height;
    }
    if (previousHeight < height)previousHeight = height;
    var heightClose = previousHeight + 30;
    var heightEditor = previousHeight + 75;
    //__openbexi_debugC("get_creative_editor", debug_str);

    var div = document.getElementById(editorName);
    if (div) document.body.removeChild(div);
    div = document.createElement("div");
    div.style.visibility = "visible";
    div.id = editorName;
    if (heightEditor < 570) {
        div.style.height = heightEditor + "px";
        div.style.overflow = "hidden";
    } else {
        div.style.height = '560px';
        div.style.overflow = "auto";
    }
    div.style.left = left + "px";
    div.style.width = "0px";
    div.style.zIndex = 998;
    div.style.border = "darkseagreen 3px ridge";

    div.style.top = top + "px";
    div.style.position = "absolute";
    //div.style.fontSize = "12px";
    div.style.background = "url(gif\/fadeGreen2.jpg)";
    div.onclick = my_PickFuncLinkEditor;
    document.body.appendChild(div);
    var str = "";
    creativeTabs = null;
    creativeTabs = new Array();
    selectedCreativeTab = null;
    for (i = 0; i < creativeAttributes.length; i++) {
        if ((i == creativeAttributes.length - 1 && creativeAttributes[i][2] != "endtabber")) {
            str += '</tr></table>';
            str += '<div  align="center" style=" left: 5px; width: 100%;POSITION: absolute; TOP: ' + heightClose + 'px; height: 100%"></div>';
        }
        if (creativeAttributes[i][2] == "tabber") str += '<div  id="tabberCreative" style=" left: 0px; width: 100%; cursor: default; POSITION: absolute; TOP: 0px; height: 100%">';
        if (creativeAttributes[i][2] == "tab") {
            str += '<button onclick=\'ob_showCreativePanel(event,\"panTabber' + creativeAttributes[i][0] + '\",\"tabbutton' + creativeAttributes[i][0] + '\")\' CLASSE="tab" id=\"tabbutton' + creativeAttributes[i][0] + '\" style="background: ' + creativeAttributes[i][7] + '; width: ' + creativeAttributes[i][5] + '; height:' + creativeAttributes[i][6] + ';">' + creativeAttributes[i][3] + '</button>';
            var display = "block";
            if (creativeAttributes[i][0] != "1")  display = "none"
            str += '<div  id=\"panTabber' + creativeAttributes[i][0] + '\" name="no_name"  style="display:' + display + '; left: 0px; width: 100%; cursor: default; POSITION: absolute; TOP: 25px; height: 100%">';
            str += '<table align=center style=" margin-top:' + "12px" + '; width:99%;"><tr align=center>';
            creativeTabs[creativeTabs.length] = "panTabber" + creativeAttributes[i][0];
        }
        if (creativeAttributes[i][2] == "endtabber")str += '</div>';
        if (creativeAttributes[i][2] == "endtab") str += '</tr></table></div>';

        if (creativeAttributes[i][0] == "sep" && i != 0 && i != creativeAttributes.length - 1) {
            if (creativeAttributes[i - 1][2] != "tab" && creativeAttributes[i - 1][2] != "fieldset") str += '</tr>';
            if (creativeAttributes[i - 1][2] == "fieldset" || creativeAttributes[i - 1][2] == "endfieldset") str += '<table align=center style=" width:99%;"><tr align=center>';
            str += '<tr></tr><tr></tr><tr  align=center>';
        }
        if (creativeAttributes[i][0] == "sep" && i == 0) str += '<table align=center style=" margin-top:' + creativeAttributes[i][6] + '; width:99%;"><tr align=center>';
        if (creativeAttributes[i][0] == "sep" && i == creativeAttributes.length - 1)  str += '</tr></table>';
        if (creativeAttributes[i][0] == "vertiSep")  str += '<td></td>';

        if (creativeAttributes[i][1] != null && creativeAttributes[i][2] != null && creativeAttributes[i][3] != null) {
            currentFcn = creativeAttributes[i][1].replace("this", "getSelectedBexiObj(null)");
            var text = openbexi_lang(creativeAttributes[i][3]);
            if (creativeAttributes[i][2] == "button") {
                str += '    <td><button id=' + creativeAttributes[i][0] + ' name=' + creativeAttributes[i][0] + ' title="' + text + '"';
                str += '                style=" cursor:pointer; background: url(' + creativeAttributes[i][4] + ');  width: ' + creativeAttributes[i][5] + '; height:' + creativeAttributes[i][6] + ';"';
                if (getBrowser() == "ie6" || getBrowser() == "ie7" || getBrowser() == "ie7_no_XMLHttpRequest")
                    str += '                onClick="' + currentFcn + '"></button></td>';
                else
                    str += '                onmouseup="' + currentFcn + '"></button></td>';
            }
            if (creativeAttributes[i][2] == "buttonText") {
                str += '    <td><button id=' + creativeAttributes[i][0] + ' name=' + creativeAttributes[i][0] + ' title="' + text + '"';
                str += '                style="border:darkseagreen 1px ridge; background: ' + creativeAttributes[i][7] + ';cursor:pointer;   width: ' + creativeAttributes[i][5] + '; height:' + creativeAttributes[i][6] + ';"';
                if (getBrowser() == "ie6" || getBrowser() == "ie7" || getBrowser() == "ie7_no_XMLHttpRequest")
                    str += '                onClick="' + currentFcn + '">' + creativeAttributes[i][4] + '</button></td>';
                else
                    str += '                onmouseup="' + currentFcn + '">' + creativeAttributes[i][4] + '</button></td>';
            }
            if (creativeAttributes[i][2] == "label") {
                str += '    <td><div style=" background: ' + creativeAttributes[i][7] + ';width: ' + creativeAttributes[i][5] + '; height:' + creativeAttributes[i][6] + '">' + creativeAttributes[i][4] + '</div></td>';
            }
            if (creativeAttributes[i][2] == "text") {
                str += '    <td><INPUT id=' + creativeAttributes[i][0] + ' name=' + creativeAttributes[i][0] + ' title="' + text + '" value="' + creativeAttributes[i][4] + '" type="text"';
                str += '                style=" background: ' + creativeAttributes[i][7] + ';width: ' + creativeAttributes[i][5] + '; height:' + creativeAttributes[i][6] + ';"';
                if (getBrowser() == "ie6" || getBrowser() == "ie7" || getBrowser() == "ie7_no_XMLHttpRequest")
                    str += '                onKeyPress="' + currentFcn + '">' + creativeAttributes[i][4] + '</td>';
                else
                    str += '                onKeyPress="' + currentFcn + '">' + creativeAttributes[i][4] + '</td>';
            }
            if (creativeAttributes[i][2] == "chooseFile") {
                str += '    <td><input id="ob_choosefile_creative" type="file" value="" ';
                str += '    style=" background: ' + creativeAttributes[i][7] + ';width: ' + creativeAttributes[i][5] + '; height:' + creativeAttributes[i][6] + '"></td>';
            }
            if (creativeAttributes[i][2] == "textarea") {
                str += '    <td><textarea id=' + creativeAttributes[i][0] + ' name=' + creativeAttributes[i][0] + ' title="' + text + '" type="text"';
                str += '                style=" overflow:auto; background: ' + creativeAttributes[i][7] + ';width: ' + creativeAttributes[i][5] + '; height:' + creativeAttributes[i][6] + '"></textarea></td>';
            }
            if (creativeAttributes[i][2] == "checkbox") {
                str += '    <td><INPUT id=' + creativeAttributes[i][0] + ' name=' + creativeAttributes[i][0] + ' title="' + text + '" type="checkbox"';
                str += '                style=" background: ' + creativeAttributes[i][7] + ';width: ' + creativeAttributes[i][5] + '; height:' + creativeAttributes[i][6] + '">' + creativeAttributes[i][4] + '</td>';
            }
            if (creativeAttributes[i][2] == "img") {
                str += '    <td><div id=' + creativeAttributes[i][0] + ' name=' + creativeAttributes[i][0] + ' title="' + text + '" style="background: ' + creativeAttributes[i][7] + ';width: ' + creativeAttributes[i][5] + '; height:' + creativeAttributes[i][6] + '">';
                str += '            <img src="' + creativeAttributes[i][4] + '" style="' + 'cursor:pointer;;width: ' + creativeAttributes[i][5] + '; border:darkseagreen 1px ridge; background:height:' + creativeAttributes[i][6] + ';"';
                if (getBrowser() == "ie6" || getBrowser() == "ie7" || getBrowser() == "ie7_no_XMLHttpRequest")
                    str += '                onClick="' + currentFcn + '">';
                else
                    str += '                onmouseup="' + currentFcn + '">';
                str += '        </div></td>';
            }
            if (creativeAttributes[i][2] == "combo") {
                str += '    <td><button id=' + creativeAttributes[i][0] + ' name=' + creativeAttributes[i][0] + ' title="' + text + '"';
                str += '                style=" background: ' + creativeAttributes[i][7] + ';cursor:pointer;   width: ' + creativeAttributes[i][5] + '; height:' + creativeAttributes[i][6] + '"';
                if (getBrowser() == "ie6" || getBrowser() == "ie7" || getBrowser() == "ie7_no_XMLHttpRequest")
                    str += '                onClick="' + currentFcn + '">' + creativeAttributes[i][4] + '</button></td>';
                else
                    str += '                onmouseup="' + currentFcn + '">' + creativeAttributes[i][4] + '</button></td>';
            }
            if (creativeAttributes[i][2] == "fieldset") {
                str += '<table align=center style="background:' + creativeAttributes[i][7] + '; width:99%;"><tr align=center>';
                str += '            <sp id=\"' + creativeAttributes[i][0] + '\" style="background: ' + creativeAttributes[i][7] + '; width: ' + creativeAttributes[i][5] + '; height: ' + creativeAttributes[i][6] + '" ><strong>' + creativeAttributes[i][4] + '</strong></sp>\n';
                str += '</tr></table>';
            }
            if (creativeAttributes[i][2] == "openbexiCreative") {
                str += '<table align=center style="background:' + creativeAttributes[i][7] + '; width:99%;"><tr align=center>';
                str += '<button  id="ob_creative_button"  onclick="getSelectedBexiObj(null).creativeEditor(getSelectedBexiObj(null).getcreativeAssistantAttributes())" style="cursor: pointer;font-size:14pt;background: black; color: white;font-family: \'Monotype Corsiva\'"><strong><font color=#ff00ff>O</font><font color=#00ff00>p</font><font color=#e069ff>e</font><font color=#ffff00>n</font><font color=#ffccc0>bexi</font> <font color=#ffffff>Creative</font></strong></button>'
                str += '</tr></table>';
            }
            if (creativeAttributes[i][2] == "endfieldset") {
                if (creativeAttributes[i - 1][0] == "sep") str += '</tr></table>';
                str += '<table align=center style="background: ' + creativeAttributes[i][7] + '; width:99%;"><tr align=center>';
                str += '            <sp id=\"' + creativeAttributes[i][0] + '\" style="background: ' + creativeAttributes[i][7] + '; width: ' + creativeAttributes[i][5] + '; height: ' + creativeAttributes[i][6] + '" ></sp>\n';
                str += '</tr></table>';
            }
        }
    }
    div.innerHTML = str;
    //__openbexi_debugC("get_creative_editor", str);
};
openbexi_generic_object.prototype.updatePopupAttributes = function (bexiObject, text, new_text, new_fcn, new_img) {
    for (var i = 0; i < bexiObject.popupAttributes.length; i++) {
        if (bexiObject.popupAttributes[i][2] == text) {
            bexiObject.popupAttributes[i][1] = new_fcn;
            bexiObject.popupAttributes[i][2] = new_text;
            bexiObject.popupAttributes[i][3] = new_img;
        }
    }
};
openbexi_generic_object.prototype.forward = function (div, zaction) {
    try {
        if (ob_canvas != null && getSelectedBexiObj(div.id).parentNodeId != "BODY")   ob_canvas.clear();
        openbexi_reset_all_z(div, zaction);
    } catch (e) {
    }
    //ob_sort_openbexi_object();
};
openbexi_generic_object.prototype.backward = function (div, zaction) {
    try {
        if (ob_canvas != null && getSelectedBexiObj(div.id).parentNodeId != "BODY")   ob_canvas.clear();
        openbexi_reset_all_z(div, zaction);
        //ob_sort_openbexi_object();
    } catch (e) {
    }
};
function ob_save_config_auto_arrange() {
    try {
        var count = 0;
        ob_config_auto_arrange_id = new Array();
        ob_config_auto_arrange_top = new Array();
        ob_config_auto_arrange_left = new Array();
        ob_config_auto_arrange_width = new Array();
        ob_config_auto_arrange_height = new Array();
        for (var i = 0; i < openbexi_object.length; i++) {
            if (openbexi_object[i] != undefined && openbexi_object[i].id != "BODY") {
                ob_config_auto_arrange_id[count] = openbexi_object[i].div.id;
                ob_config_auto_arrange_top[count] = openbexi_object[i].div.style.top;
                ob_config_auto_arrange_left[count] = openbexi_object[i].div.style.left;
                ob_config_auto_arrange_height[count] = openbexi_object[i].div.style.height;
                ob_config_auto_arrange_width[count] = openbexi_object[i].div.style.width;
                count += 1;
            }
        }
    } catch (e) {
        __openbexi_debugC("ob_save_config_auto_arrange()", "Exception:" + e.message);
    }
}
;
function ob_restore_config_auto_arrange() {
    try {
        if (ob_config_auto_arrange_id == null)return;
        for (var i = 0; i < ob_config_auto_arrange_id.length; i++) {
            var id = ob_config_auto_arrange_id[i];
            document.getElementById(id).style.top = ob_config_auto_arrange_top[i];
            document.getElementById(id).style.left = ob_config_auto_arrange_left[i];
            document.getElementById(id).style.height = ob_config_auto_arrange_height[i];
            document.getElementById(id).style.width = ob_config_auto_arrange_width[i];
            //openbexi_sync_WZ_xywhObject(document.getElementById(id));
        }
        //openbexi_sync_WZ_xywhObjects();
    } catch (e) {
        __openbexi_debugC("ob_restore_config_auto_arrange()", "Exception:" + e.message);
    }
}
;
function ob_top_selection(t) {
    try {
        var min , x;
        for (var i = 0; i < t.length - 1; i++) {
            min = i;
            for (var j = i + 1; j < t.length; j++) {
                if (parseInt(t[j].div.style.top) < parseInt(t[min].div.style.top)) min = j;
            }
            if (min != i) {
                x = t[i];
                t[i] = t[min];
                t[min] = x;
            }
        }
    } catch (e) {
        __openbexi_debugC("ob_top_selection()", "Exception:" + e.message);
    }
    return t;
}
;
function ob_get_lower_top_bexiObject(bexiObject) {
    try {
        var objBexiArray = new Array();

        var topBexiObject = parseInt(bexiObject.div.style.top);
        var heightBexiObject = parseInt(bexiObject.div.style.height);
        var widthBexiObject = parseInt(bexiObject.div.style.width);
        var leftBexiObject = parseInt(bexiObject.div.style.left);
        var rightBexiObject = leftBexiObject + widthBexiObject;
        // sort by top and weight
        var count = 0;
        var found = false;
        var lowerTop = 0;
        var lowerBexiobject = null;

        for (var i = 0; i < openbexi_object.length; i++) {
            if (openbexi_object[i] != undefined && openbexi_object[i].id != "BODY" && bexiObject.parentNodeId == openbexi_object[i].parentNodeId) {
                found = false;
                var topCurBexiObject = parseInt(openbexi_object[i].div.style.top);
                var widthCurBexiObject = parseInt(openbexi_object[i].div.style.width);
                var leftCurBexiObject = parseInt(openbexi_object[i].div.style.left);
                var rightCurBexiObject = leftCurBexiObject + widthCurBexiObject;
                lowerTop = topCurBexiObject;
                lowerBexiobject = openbexi_object[i];
                //str += openbexi_object[i].div.id + " " + openbexi_object[i].div.style.top + " '" + openbexi_object[i].div.style.background + "\n";
                if ((leftCurBexiObject >= leftBexiObject && rightBexiObject >= leftCurBexiObject ) || (leftCurBexiObject <= leftBexiObject && leftBexiObject <= rightCurBexiObject )) {
                    for (var j = 0; j < openbexi_object.length; j++) {
                        if (openbexi_object[i] != undefined && openbexi_object[i].id != "BODY" && openbexi_object[i].div.id != openbexi_object[j].div.id && topBexiObject < topCurBexiObject) {
                            var topCur2BexiObject = parseInt(openbexi_object[j].div.style.top);
                            if (lowerTop >= topCur2BexiObject) {
                                lowerTop = topCur2BexiObject;
                                lowerBexiobject = openbexi_object[i];
                                found = true;
                            }
                        }
                    }
                    if (found) {
                        objBexiArray[count] = lowerBexiobject;
                        count += 1;
                    }
                }
            }
        }
        var sorted_objBexiArray = ob_top_selection(objBexiArray);
        //var text = "";
        //for (var i = 0; i < sorted_objBexiArray.length; i++) {
        //text += sorted_objBexiArray[i].id + " id=" + sorted_objBexiArray[i].div.id + "   top=" + sorted_objBexiArray[i].div.style.top + "\n";
        //}
        //__openbexi_debugC("ob_get_lower_top_bexiObject", text);
    } catch (e) {
        __openbexi_debugC("ob_get_lower_top_bexiObject()", "Exception:" + e.message);
    }
    return sorted_objBexiArray;
}
;
function ob_left_selection(t) {
    try {
        var min , x;
        for (var i = 0; i < t.length - 1; i++) {
            min = i;
            for (var j = i + 1; j < t.length; j++) {
                if (parseInt(t[j].div.style.left) < parseInt(t[min].div.style.left)) min = j;
            }
            if (min != i) {
                x = t[i];
                t[i] = t[min];
                t[min] = x;
            }
        }
    } catch (e) {
        __openbexi_debugC("ob_left_selection()", "Exception:" + e.message);
    }
    return t;
}
;
function ob_get_lower_left_bexiObject(bexiObject) {
    try {
        var objBexiArray = new Array();
        var topBexiObject = parseInt(bexiObject.div.style.top);
        var heightBexiObject = parseInt(bexiObject.div.style.height);
        var bottomBexiObject = topBexiObject + heightBexiObject;
        var widthBexiObject = parseInt(bexiObject.div.style.width);
        var leftBexiObject = parseInt(bexiObject.div.style.left);
        var rightBexiObject = leftBexiObject + widthBexiObject;
        // sort by top and weight
        var count = 0;
        var found = false;
        var lowerLeft = 0;
        var lowerBexiobject = null;

        for (var i = 0; i < openbexi_object.length; i++) {
            if (openbexi_object[i] != undefined && openbexi_object[i].id != "BODY" && bexiObject.parentNodeId == openbexi_object[i].parentNodeId) {
                found = false;
                var topCurBexiObject = parseInt(openbexi_object[i].div.style.top);
                var widthCurBexiObject = parseInt(openbexi_object[i].div.style.width);
                var heightCurBexiObject = parseInt(openbexi_object[i].div.style.height);
                var leftCurBexiObject = parseInt(openbexi_object[i].div.style.left);
                var rightCurBexiObject = leftCurBexiObject + widthCurBexiObject;
                var bottomCurBexiObject = topCurBexiObject + heightCurBexiObject;
                lowerLeft = leftCurBexiObject;
                lowerBexiobject = openbexi_object[i];
                if ((topCurBexiObject >= topBexiObject && bottomBexiObject >= topCurBexiObject ) || (topCurBexiObject <= topBexiObject && topBexiObject <= bottomCurBexiObject )) {
                    for (var j = 0; j < openbexi_object.length; j++) {
                        if (openbexi_object[i] != undefined && openbexi_object[i].id != "BODY" && openbexi_object[i].div.id != openbexi_object[j].div.id && leftBexiObject < leftCurBexiObject) {
                            var leftCur2BexiObject = parseInt(openbexi_object[j].div.style.left);
                            if (lowerLeft > leftCur2BexiObject) {
                                lowerLeft = leftCur2BexiObject;
                                lowerBexiobject = openbexi_object[i];
                                found = true;
                            }
                        }
                    }
                    if (found) {
                        objBexiArray[count] = lowerBexiobject;
                        count += 1;
                    }
                }
            }
        }
        var sorted_objBexiArray = ob_left_selection(objBexiArray);
        //var text = "";
        //for (var i = 0; i < sorted_objBexiArray.length; i++) {
        //text += sorted_objBexiArray[i].id + " id=" + sorted_objBexiArray[i].div.id + "   left=" + sorted_objBexiArray[i].div.style.left + "\n";
        //}
        //__openbexi_debugC("ob_get_lower_top_bexiObject", text);
    } catch (e) {
        __openbexi_debugC("ob_get_lower_left_bexiObject()", "Exception:" + e.message);
    }
    return sorted_objBexiArray;
}
;
openbexi_generic_object.prototype.align_left_auto_arrange = function (bexiObject) {
    try {
        if (bexiObject == openbexiBody) return;
        ob_save_config_auto_arrange();
        var objBexiArray = ob_get_lower_top_bexiObject(bexiObject);
        var topCurBexiObject = parseInt(bexiObject.div.style.top);
        var heightCurBexiObject = parseInt(bexiObject.div.style.height);
        var leftCurBexiObject = parseInt(bexiObject.div.style.left);
        for (var i = 0; i < objBexiArray.length; i++) {
            if (objBexiArray[i].type == bexiObject.type) {
                objBexiArray[i].div.style.left = leftCurBexiObject + "px";
                topCurBexiObject = parseInt(objBexiArray[i].div.style.top);
                heightCurBexiObject = parseInt(objBexiArray[i].div.style.height);
            }
        }
    } catch (e) {
        __openbexi_debugC("openbexi_generic_object.prototype.align_left_auto_arrange()", "Exception:" + e.message);
    }
};
openbexi_generic_object.prototype.align_right_auto_arrange = function (bexiObject) {
    try {
        if (bexiObject == openbexiBody) return;
        ob_save_config_auto_arrange();
        var objBexiArray = ob_get_lower_top_bexiObject(bexiObject);
        var topCurBexiObject = parseInt(bexiObject.div.style.top);
        var heightCurBexiObject = parseInt(bexiObject.div.style.height);
        var widthCurBexiObject = parseInt(bexiObject.div.style.width);
        var leftCurBexiObject = parseInt(bexiObject.div.style.left);
        var rightCurBexiObject = leftCurBexiObject + widthCurBexiObject;

        for (var i = 0; i < objBexiArray.length; i++) {
            if (objBexiArray[i].type == bexiObject.type) {
                objBexiArray[i].div.style.left = (rightCurBexiObject - parseInt(objBexiArray[i].div.style.width)) + "px";
                topCurBexiObject = parseInt(objBexiArray[i].div.style.top);
                heightCurBexiObject = parseInt(objBexiArray[i].div.style.height);
            }
        }
    } catch (e) {
        __openbexi_debugC("openbexi_generic_object.prototype.align_right_auto_arrange()", "Exception:" + e.message);
    }
};
openbexi_generic_object.prototype.align_top_auto_arrange = function (bexiObject) {
    try {
        if (bexiObject == openbexiBody) return;
        ob_save_config_auto_arrange();
        var objBexiArray = ob_get_lower_left_bexiObject(bexiObject);

        var widthCurBexiObject = parseInt(bexiObject.div.style.width);
        var leftCurBexiObject = parseInt(bexiObject.div.style.left);
        var topBexiObject = parseInt(bexiObject.div.style.top);
        for (var i = 0; i < objBexiArray.length; i++) {
            if (objBexiArray[i].type == bexiObject.type) {
                objBexiArray[i].div.style.top = topBexiObject + "px";
                leftCurBexiObject = parseInt(objBexiArray[i].div.style.left);
                widthCurBexiObject = parseInt(objBexiArray[i].div.style.width);
            }
        }
    } catch (e) {
        __openbexi_debugC("openbexi_generic_object.prototype.align_top_auto_arrange()", "Exception:" + e.message);
    }
};
openbexi_generic_object.prototype.align_bottom_auto_arrange = function (bexiObject) {
    try {
        if (bexiObject == openbexiBody) return;
        ob_save_config_auto_arrange();
        var objBexiArray = ob_get_lower_left_bexiObject(bexiObject);
        var widthCurBexiObject = parseInt(bexiObject.div.style.width);
        var leftCurBexiObject = parseInt(bexiObject.div.style.left);
        var topBexiObject = parseInt(bexiObject.div.style.top);
        var heightBexiObject = parseInt(bexiObject.div.style.height);
        var bottomCurBexiObject = topBexiObject + heightBexiObject;
        for (var i = 0; i < objBexiArray.length; i++) {
            if (objBexiArray[i].type == bexiObject.type) {
                objBexiArray[i].div.style.top = (bottomCurBexiObject - parseInt(objBexiArray[i].div.style.height)) + "px";
                leftCurBexiObject = parseInt(objBexiArray[i].div.style.left);
                widthCurBexiObject = parseInt(objBexiArray[i].div.style.width);
            }
        }
    } catch (e) {
        __openbexi_debugC("openbexi_generic_object.prototype.align_bottom_auto_arrange()", "Exception:" + e.message);
    }
};
openbexi_generic_object.prototype.vertical_height_auto_resize = function (bexiObject) {
    try {
        if (bexiObject == openbexiBody) return;
        ob_save_config_auto_arrange();
        var objBexiArrayT = ob_get_lower_top_bexiObject(bexiObject);
        var topCurBexiObject = parseInt(bexiObject.div.style.top);
        var heightBexiObject = parseInt(bexiObject.div.style.height);
        var leftBexiObject = parseInt(bexiObject.div.style.left);
        var heightCurBexiObject = heightBexiObject;
        var spacing = 0;
        for (var i = 0; i < objBexiArrayT.length; i++) {
            if (objBexiArrayT[i].type == bexiObject.type) {
                spacing = parseInt(objBexiArrayT[i].div.style.top) - (topCurBexiObject + heightCurBexiObject);
                bottomCurBexiObject = topCurBexiObject + heightBexiObject + spacing;
                objBexiArrayT[i].div.style.top = bottomCurBexiObject + "px";
                objBexiArrayT[i].div.style.left = leftBexiObject + "px";
                objBexiArrayT[i].div.style.height = heightBexiObject + "px";
                topCurBexiObject = parseInt(objBexiArrayT[i].div.style.top);
                heightCurBexiObject = parseInt(objBexiArrayT[i].div.style.height);
            }
        }
    } catch (e) {
        __openbexi_debugC("openbexi_generic_object.prototype.vertical_height_auto_resize()", "Exception:" + e.message);
    }
};
openbexi_generic_object.prototype.vertical_width_auto_resize = function (bexiObject) {
    try {
        if (bexiObject == openbexiBody) return;
        ob_save_config_auto_arrange();
        var objBexiArrayT = ob_get_lower_top_bexiObject(bexiObject);
        var topCurBexiObject = parseInt(bexiObject.div.style.top);
        var widthtBexiObject = parseInt(bexiObject.div.style.width);
        var heightBexiObject = parseInt(bexiObject.div.style.height);
        var leftBexiObject = parseInt(bexiObject.div.style.left);
        var heightCurBexiObject = heightBexiObject;
        var spacing = 0;
        for (var i = 0; i < objBexiArrayT.length; i++) {
            if (objBexiArrayT[i].type == bexiObject.type) {
                spacing = parseInt(objBexiArrayT[i].div.style.top) - (topCurBexiObject + heightCurBexiObject);
                bottomCurBexiObject = topCurBexiObject + heightCurBexiObject + spacing;
                objBexiArrayT[i].div.style.top = bottomCurBexiObject + "px";
                objBexiArrayT[i].div.style.left = leftBexiObject + "px";
                objBexiArrayT[i].div.style.width = widthtBexiObject + "px";
                topCurBexiObject = parseInt(objBexiArrayT[i].div.style.top);
                heightCurBexiObject = parseInt(objBexiArrayT[i].div.style.height);
            }
        }
    } catch (e) {
        __openbexi_debugC("openbexi_generic_object.prototype.vertical_width_auto_resize()", "Exception:" + e.message);
    }
};

openbexi_generic_object.prototype.horizontal_width_auto_resize = function (bexiObject) {
    try {
        if (bexiObject == openbexiBody) return;
        ob_save_config_auto_arrange();
        var objBexiArrayL = ob_get_lower_left_bexiObject(bexiObject);
        var widthCurBexiObject = parseInt(bexiObject.div.style.width);
        var leftCurBexiObject = parseInt(bexiObject.div.style.left);
        var topBexiObject = parseInt(bexiObject.div.style.top);
        var bottomCurBexiObject = 0;
        for (var i = 0; i < objBexiArrayL.length; i++) {
            if (objBexiArrayL[i].type == bexiObject.type) {
                spacing = parseInt(objBexiArrayL[i].div.style.left) - (leftCurBexiObject + widthCurBexiObject);
                rightCurBexiObject = leftCurBexiObject + widthCurBexiObject + spacing;
                objBexiArrayL[i].div.style.left = rightCurBexiObject + "px";
                objBexiArrayL[i].div.style.width = widthCurBexiObject + "px";
                leftCurBexiObject = parseInt(objBexiArrayL[i].div.style.left);
                widthCurBexiObject = parseInt(objBexiArrayL[i].div.style.width);
            }
        }
    } catch (e) {
        __openbexi_debugC("openbexi_generic_object.prototype.horizontal_width_auto_resize()", "Exception:" + e.message);
    }
};
openbexi_generic_object.prototype.horizontal_height_auto_resize = function (bexiObject) {
    try {
        if (bexiObject == openbexiBody) return;
        ob_save_config_auto_arrange();
        var objBexiArrayL = ob_get_lower_left_bexiObject(bexiObject);
        var heightBexiObject = parseInt(bexiObject.div.style.height);
        var widthCurBexiObject = parseInt(bexiObject.div.style.width);
        var leftCurBexiObject = parseInt(bexiObject.div.style.left);
        var topBexiObject = parseInt(bexiObject.div.style.top);
        var bottomCurBexiObject = 0;
        for (var i = 0; i < objBexiArrayL.length; i++) {
            if (objBexiArrayL[i].type == bexiObject.type) {
                spacing = parseInt(objBexiArrayL[i].div.style.left) - (leftCurBexiObject + widthCurBexiObject);
                rightCurBexiObject = leftCurBexiObject + widthCurBexiObject + spacing;
                objBexiArrayL[i].div.style.left = rightCurBexiObject + "px";
                objBexiArrayL[i].div.style.height = heightBexiObject + "px";
                leftCurBexiObject = parseInt(objBexiArrayL[i].div.style.left);
                widthCurBexiObject = parseInt(objBexiArrayL[i].div.style.width);
            }
        }
    } catch (e) {
        __openbexi_debugC("openbexi_generic_object.prototype.horizontal_height_auto_resize()", "Exception:" + e.message);
    }
};
openbexi_generic_object.prototype.vertical_spacing_auto_arrange = function (bexiObject) {
    try {
        if (bexiObject == openbexiBody) return;
        var spacing = prompt(openbexi_lang("typeVerticalSpacing"), "2");
        if (spacing == null || spacing == undefined || spacing == "" || isNaN(spacing)) spacing = 2;
        spacing = parseInt(spacing);
        ob_save_config_auto_arrange();
        var objBexiArray = ob_get_lower_top_bexiObject(bexiObject);
        var topCurBexiObject = parseInt(bexiObject.div.style.top);
        var heightCurBexiObject = parseInt(bexiObject.div.style.height);
        var bottomCurBexiObject = 0;
        for (var i = 0; i < objBexiArray.length; i++) {
            if (objBexiArray[i].type == bexiObject.type) {
                bottomCurBexiObject = topCurBexiObject + heightCurBexiObject + spacing;
                objBexiArray[i].div.style.top = bottomCurBexiObject + "px";
                topCurBexiObject = parseInt(objBexiArray[i].div.style.top);
                heightCurBexiObject = parseInt(objBexiArray[i].div.style.height);
            }
        }
    } catch (e) {
        __openbexi_debugC("openbexi_generic_object.prototype.vertical_spacing_auto_arrange()", "Exception:" + e.message);
    }
};
openbexi_generic_object.prototype.horizontal_spacing_auto_arrange = function (bexiObject) {
    try {
        if (bexiObject == openbexiBody) return;
        var spacing = prompt(openbexi_lang("typeHeightColumn"), bexiObject.div.style.height);
        if (spacing == null || spacing == undefined || spacing == "" || isNaN(spacing)) spacing = parseInt(bexiObject.div.style.height);
        spacing = parseInt(spacing);
        ob_save_config_auto_arrange();
        var objBexiArray = ob_get_lower_left_bexiObject(bexiObject);
        var widthCurBexiObject = parseInt(bexiObject.div.style.width);
        var leftCurBexiObject = parseInt(bexiObject.div.style.left);
        var topBexiObject = parseInt(bexiObject.div.style.top);
        var bottomCurBexiObject = 0;
        for (var i = 0; i < objBexiArray.length; i++) {
            if (objBexiArray[i].type == bexiObject.type) {
                var rightCurBexiObject = leftCurBexiObject + widthCurBexiObject + spacing;
                objBexiArray[i].div.style.left = rightCurBexiObject + "px";
                leftCurBexiObject = parseInt(objBexiArray[i].div.style.left);
                widthCurBexiObject = parseInt(objBexiArray[i].div.style.width);
            }
        }
    } catch (e) {
        __openbexi_debugC("openbexi_generic_object.prototype.horizontal_spacing_auto_arrange()", "Exception:" + e.message);
    }
};
openbexi_generic_object.prototype.undo_auto_arrange = function () {
    try {
        ob_restore_config_auto_arrange();
    } catch (e) {
        __openbexi_debugC("openbexi_generic_object.prototype.undo_auto_arrange()", "Exception:" + e.message);
    }
};
openbexi_generic_object.prototype.redo_auto_arrange = function () {
    if (openbexiNavigator)openbexiNavigator.status("NotImplemented", "orange");
};
openbexi_generic_object.prototype.head_code = function () {
    try {
        for (var i = 0; i < openbexi_object.length; i++) {
            try {
                var fct = openbexi_object[i].functions_to_load();
                if (fct.match("ob_attach_web_socket")) {
                    openbexi_add_javascript(null, "javascript/", "openbexi_websocket.js");
                    break;
                }
            } catch (e) {
                __openbexi_debugC("head_code()", e.message);
            }
        }
        openbexi_add_javascript(null, "javascript/", "openbexi_xml.js");
        openbexi_add_javascript(null, "javascript/", "openbexi_json.js");
        return "";
    } catch (e) {
        __openbexi_debugC("openbexi_generic_object.prototype.head_code()", "Exception:" + e.message);
    }
};
openbexi_generic_object.prototype.body_code = function (bexiObject) {
    var str = "";
    try {
        var inner = bexiObject.div.innerHTML;
        var functions = bexiObject.genericObject.functions_to_trigger(bexiObject.div.id);
        if (bexiObject.div.getAttribute(document.all ? "className" : "class") != null)
            str = str + '        <div class="' + bexiObject.div.getAttribute(document.all ? "className" : "class") + '" CLASSE="' + bexiObject.div.getAttribute("CLASSE") + '" id="' + bexiObject.div.id + '" ob_template="' + bexiObject.div.ob_template + '" obzindex="' + bexiObject.div.getAttribute("obzindex") + '" creation_date="' + bexiObject.div.getAttribute("creation_date") + '" style="' + openbexi_get_CSS_except_CSS3(bexiObject.div) + '" ' + functions + '>\n';
        else
            str = str + '        <div CLASSE="' + bexiObject.div.getAttribute("CLASSE") + '" id="' + bexiObject.div.id + '" ob_template="' + bexiObject.div.ob_template + '" obzindex="' + bexiObject.div.getAttribute("obzindex") + '" creation_date="' + bexiObject.div.getAttribute("creation_date") + '" style="' + openbexi_get_CSS_except_CSS3(bexiObject.div) + '" ' + functions + '>\n';

        if (inner != null && inner != "") {
            str = str + "            " + inner + "\n";
        }
        str = str + '        </div>\n';
    } catch (e) {
        __openbexi_debugC("openbexi_generic_object.prototype.body_code()", "Exception:" + e.message);
    }
    return str;
};
function function_to_trigger(objectSelected) {
    try {
        var functions = "";
        var urlCount = ob_getFunctionCurrentIndex(objectSelected);
        if (urlCount == -1) urlCount = 0;
        var pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
        var found_trigger = true;
        var trigger = get_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "trigger");
        var functionName = get_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "functionName");
        var parameterCount = get_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "parameterCount");
        if (parameterCount == "") parameterCount = 0;
        if (found_trigger) {
            functions = functions + " " + trigger + " = \"" + functionName + "(\'";
            found_trigger = false;
        }
        else
            functions = functions + " " + functionName + "(\'";
        for (var p = 0; p < parseInt(parameterCount); p++) {
            var parameterName = get_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "parameterName_" + p);
            var value = get_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, parameterName);
            if (p == 0)functions = functions + value;
            else functions = functions + "\', \'" + value;
        }
        functions = functions + "\'); ";
        if (!found_trigger) functions = functions + "\" ";
        //functions=functions.replace("'arguments[0]'","arguments[0]");
        functions = openbexi_system.openbexi_stringReplaceAll(functions, "'arguments[0]'", "arguments[0]");
    } catch (e) {
        __openbexi_debugC("function_to_trigger", "Exception:" + e.message);
    }
    return functions;
}
;
openbexi_generic_object.prototype.functions_to_duplicate = function (objectSelected, clone, type) {
    try {
        var urlCount = ob_getFunctionCounter(objectSelected);
        var ob_mouse_event = [
            ['onclick'],
            ['ondblclick'],
            ['onmouseover'],
            ['onmouseout'],
            ['onmousedown'],
            ['onmouseup'],
            ['onmousemove'],
            ['onChange'],
            ['onValueSelected'],
            ['onscroll']
        ];
        var pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
        var protocole = get_xml_classe_object_attribut_value(pageDoc, "url_0", objectSelected, "protocole");
        pageDoc = set_xml_classe_object_attribut_value(pageDoc, "url_0", clone, "protocole", protocole);
        for (var t = 0; t < ob_mouse_event.length; t++) {
            for (var i = 0; i <= urlCount; i++) {
                var trigger = get_xml_classe_object_attribut_value(pageDoc, "url_" + i, objectSelected, "trigger");
                pageDoc = set_xml_classe_object_attribut_value(pageDoc, "url_" + i, clone, "trigger", trigger);
                if (trigger == ob_mouse_event[t]) {
                    var functionName = get_xml_classe_object_attribut_value(pageDoc, "url_" + i, objectSelected, "functionName");
                    pageDoc = set_xml_classe_object_attribut_value(pageDoc, "url_" + i, clone, "functionName", functionName);
                    var parameterCount = get_xml_classe_object_attribut_value(pageDoc, "url_" + i, objectSelected, "parameterCount");
                    pageDoc = set_xml_classe_object_attribut_value(pageDoc, "url_" + i, clone, "parameterCount", parameterCount);
                    if (parameterCount == "") parameterCount = 0;
                    for (var p = 0; p < parseInt(parameterCount); p++) {
                        var parameterName = get_xml_classe_object_attribut_value(pageDoc, "url_" + i, objectSelected, "parameterName_" + p);
                        pageDoc = set_xml_classe_object_attribut_value(pageDoc, "url_" + i, clone, "parameterName_" + p, parameterName);
                        var value = get_xml_classe_object_attribut_value(pageDoc, "url_" + i, objectSelected, parameterName);
                        if (value == objectSelected)  value = clone;
                        if (type == "openbexi_button") {
                            var child = document.getElementById(objectSelected).childNodes[0].id;
                            if (value == child)  value = document.getElementById(clone).childNodes[0].id;
                        }
                        pageDoc = set_xml_classe_object_attribut_value(pageDoc, "url_" + i, clone, parameterName, value);
                    }
                }
            }
        }
        pageDoc = set_xml_classe_object_attribut_value(pageDoc, "urls", clone, "index", urlCount);
        OPENBEXI_PAGES_DATA_XML = openbexi_get_xmlString(pageDoc);
    }
    catch (e) {
        __openbexi_debugC("openbexi_generic_object.prototype.functions_to_duplicate() Exception:" + e.message);
    }
    return "OK";
};
function functions_to_trigger(objectSelected) {
    try {
        var functions = "";
        var urlCount = ob_getFunctionCounter(objectSelected);
        var ob_mouse_event = [
            ['onclick'],
            ['ondblclick'],
            ['onmouseover'],
            ['onmouseout'],
            ['onmousedown'],
            ['onmouseup'],
            ['onmousemove'],
            ['onChange'],
            ['onValueSelected'],
            ['onscroll']
        ];
        var pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
        for (var t = 0; t < ob_mouse_event.length; t++) {
            var found_trigger = true;
            for (var i = 0; i <= urlCount; i++) {
                var trigger = get_xml_classe_object_attribut_value(pageDoc, "url_" + i, objectSelected, "trigger");
                if (trigger == ob_mouse_event[t]) {
                    var functionName = get_xml_classe_object_attribut_value(pageDoc, "url_" + i, objectSelected, "functionName");
                    var parameterCount = get_xml_classe_object_attribut_value(pageDoc, "url_" + i, objectSelected, "parameterCount");
                    if (parameterCount == "") parameterCount = 0;
                    if (found_trigger) {
                        functions = functions + " " + trigger + " = \"" + functionName + "(\'";
                        found_trigger = false;
                    }
                    else
                        functions = functions + " " + functionName + "(\'";
                    for (var p = 0; p < parseInt(parameterCount); p++) {
                        var parameterName = get_xml_classe_object_attribut_value(pageDoc, "url_" + i, objectSelected, "parameterName_" + p);
                        var value = get_xml_classe_object_attribut_value(pageDoc, "url_" + i, objectSelected, parameterName);
                        if (p == 0)functions = functions + value;
                        else functions = functions + "\', \'" + value;
                    }
                    functions = functions + "\'); ";
                }
            }
            if (!found_trigger) functions = functions + "\" ";
        }
        functions = openbexi_system.openbexi_stringReplaceAll(functions, "'arguments[0]'", "arguments[0]");
    } catch (e) {
        __openbexi_debugC("functions_to_trigger() Exception:" + e.message);
    }
    return functions;
}
;
openbexi_generic_object.prototype.functions_to_trigger = function (bexiObjectId) {
    try {
        return     functions_to_trigger(bexiObjectId);
    } catch (e) {
        __openbexi_debugC("openbexi_generic_object.prototype.functions_to_trigger() Exception:" + e.message);
        return "";
    }
};
openbexi_generic_object.prototype.get_onClickCell_function = function (bexiObjectId, urlCount) {
    try {
        var pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
        var trigger = get_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, bexiObjectId, "trigger");
        if (trigger == "oncellclick") {
            var functionName = get_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, bexiObjectId, "functionName");
            if (functionName == "" || functionName == undefined) return "";
            var parameterCount = get_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, bexiObjectId, "parameterCount");
            if (parameterCount == "") parameterCount = 0;
            functionName = functionName + "('";
            for (var p = 0; p < parseInt(parameterCount); p++) {
                var parameterName = get_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, bexiObjectId, "parameterName_" + p);
                var value = get_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, bexiObjectId, parameterName);
                if (p == 0)functionName = functionName + value;
                else functionName = functionName + "', '" + value;
            }
            return functionName + "');";
        }
    } catch (e) {
        __openbexi_debugC("openbexi_generic_object.prototype.get_onClickCell_function() Exception:" + e.message);
    }
    return "";
};
openbexi_generic_object.prototype.functions_to_load = function (bexiObjectId, index, trigger) {
    try {
        var pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
        var urlCount = index;
        if (index == undefined) urlCount = ob_getFunctionIndex(bexiObjectId, null, null);
        var current_trigger = get_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, bexiObjectId, "trigger");
        if (trigger == undefined) trigger = current_trigger;
        if (current_trigger == trigger)
            if (trigger == "onload" || trigger == "onscroll" || trigger == "onresize" || trigger == "onunload") {
                var functionName = get_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, bexiObjectId, "functionName");
                if (functionName == "" || functionName == undefined) return "";
                var parameterCount = get_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, bexiObjectId, "parameterCount");
                if (parameterCount == "") parameterCount = 0;
                functionName = functionName + "('";
                for (var p = 0; p < parseInt(parameterCount); p++) {
                    var parameterName = get_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, bexiObjectId, "parameterName_" + p);
                    var value = get_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, bexiObjectId, parameterName);
                    if (p == 0)functionName = functionName + value;
                    else functionName = functionName + "', '" + value;
                }
                return functionName + "');";
            }
    } catch (e) {
        __openbexi_debugC("openbexi_generic_object.prototype.functions_to_load() Exception:" + e.message);
    }
    return "";
};
function ob_getFunctionCurrentIndex(objectSelected) {
    try {
        var urlCount = openbexi_getPageData(null, "urls", objectSelected, "index");
        if (urlCount == "")   return "-1";
    } catch (e) {
        __openbexi_debugC("ob_getFunctionCurrentIndex() Exception:" + e.message);
    }
    return  urlCount;
}
function ob_setFunctionCurrentIndex(objectSelected, index) {
    try {
        openbexi_updatePageData(null, "urls", objectSelected, "index", index);
    } catch (e) {
        __openbexi_debugC("ob_getFunctionCurrentIndex() Exception:" + e.message);
    }
}
;
function ob_getFunctionCounter(objectSelected) {
    try {
        var pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
        var urlCounter = 0;
        while (get_xml_classe_object_attribut_value(pageDoc, "url_" + urlCounter, objectSelected, "functionName") != "") {
            urlCounter = urlCounter + 1;
        }
    } catch (e) {
        __openbexi_debugC("ob_getFunctionCounter() Exception:" + e.message);
    }
    return urlCounter;
}
;
function ob_getFunctionIndex(objectSelected, functionName, trigger) {
    try {
        var urlCounter = 0;
        if (functionName != null) {
            var pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
            while (get_xml_classe_object_attributes(pageDoc, "url_" + urlCounter, objectSelected) != null) {
                urlCounter = urlCounter + 1;
            }
            for (var i = 0; i < urlCounter; i++) {
                if (get_xml_classe_object_attribut_value(pageDoc, "url_" + urlCounter, objectSelected, trigger) != "") {
                    return i;
                }
            }
        }
    } catch (e) {
        __openbexi_debugC("ob_getFunctionIndex() Exception:" + e.message);
    }
    return "0";
}
function openbexi_add_javascript(pageDoc, path, scriptName) {
    try {
        if (pageDoc == null)
            pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
        if (path == "")path = "js/";
        if (path == "no_path")path = "";
        // update page data, if a new javascript file is used than add this new one to the javascript list
        var javascripts = get_xml_classe_object_attributes(pageDoc, "page", "javascript");
        var already_in_list = false;
        if (javascripts != null) {
            for (var i = 0; i < javascripts.length; i++) {
                var javascriptFile = get_xml_classe_object_attribut_value(pageDoc, "page", "javascript", javascripts[i].getAttribute("name"));
                if (javascriptFile == path + scriptName) {
                    already_in_list = true;
                }
            }
        }
        var count = 0;
        if (javascripts) count = javascripts.length;
        if (!already_in_list)set_xml_classe_object_attribut_value(pageDoc, "page", "javascript", "file_" + count, path + scriptName);
        if (pageDoc != null)OPENBEXI_PAGES_DATA_XML = openbexi_get_xmlString(pageDoc);
    } catch (e) {
        __openbexi_debugC("openbexi_add_javascript() Exception:" + e.message);
    }
    return pageDoc;
}
openbexi_generic_object.prototype.add_function = function (protocole, functionName, ob_doc) {
    // check for parameter if any
    try {
        var pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
        var ob_lang = openbexi_get_documentElement(OPENBEXI_PRIVATE_CONTEXT_XML, "text/xml");
        var lang = get_xml_classe_object_attribut_value(ob_lang, "bexicontext", "language", "name");

        if (protocole == "javascript") {
            var scriptName = functionName + ".js";
            var path = "project/" + openbexiNavigator.projectName + "/js/";
            var objectSelected = get_xml_classe_object_attribut_value(ob_doc, "ob_request", "request", "objectSelected");
            try {
                if (objectSelected == "") objectSelected = getSelectedBexiObj(null).div.id;
            }
            catch (e) {
                objectSelected = "BODY";
            }
            var objectType = get_xml_classe_object_attribut_value(pageDoc, "page", objectSelected, "type");
            var objectParent = get_xml_classe_object_attribut_value(pageDoc, "page", objectSelected, "parentId");
            var parentType = get_xml_classe_object_attribut_value(pageDoc, "page", objectSelected, "parentType");
            var current_item = openbexi_getPageData(null, "page", objectSelected, "current_item");
            if (current_item != "") {
                objectSelected = current_item;
                objectType = "item";
            }
            if (objectParent == "")objectParent = "BODY";
            if (parentType == "")objectParent = "openbexi_body";
            var group = get_xml_classe_object_attribut_value(ob_doc, "file", "js", "group");
            // add javascript in the page database
            openbexi_add_javascript(pageDoc, path, scriptName);

            // update objectSelected
            var urlCount = ob_getFunctionCurrentIndex(objectSelected);
            if (urlCount == -1) urlCount = 0;
            set_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "functionName", functionName);
            set_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "scriptName", path + scriptName);
            set_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "protocole", protocole);

            // Check if objectSelected has already a trigger, if none set up the default one (click)
            var trigger = get_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "trigger");
            if (trigger == "" || trigger == "none") {
                trigger = "onclick";
                if (objectSelected == "BODY" || objectType == "openbexi_dojo" || objectType == "openbexi_list" || objectType == "openbexi_tree" || objectType == "openbexi_form")
                    trigger = "onload";
            }
            set_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "trigger", trigger);
            var specification = get_xml_classe_object_attribut_value(ob_doc, "file", "js", "specification_" + lang);
            set_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "specification", specification);
            var parameterCount = get_xml_classe_object_attribut_value(ob_doc, "file", "js", "parameterCount");
            if (parameterCount == "") parameterCount = 0;
            set_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "parameterCount", parameterCount);
            for (var p = 0; p < parseInt(parameterCount); p++) {
                var parameterName = get_xml_classe_object_attribut_value(ob_doc, "file", "js", "parameterName_" + p);
                var parameterType = get_xml_classe_object_attribut_value(ob_doc, "file", "js", "parameterType_" + p);
                var parameterSpecification = get_xml_classe_object_attribut_value(ob_doc, "file", "js", "parameterSpecification_" + p + "_" + lang);
                var parameterValue = get_xml_classe_object_attribut_value(ob_doc, "file", "js", "parameterDefault_" + p);
                if (parameterName == "widget_id") {
                    parameterValue = objectSelected;
                }
                else if (parameterName == "dateCB") {
                    parameterValue = "arguments[0]";
                }
                else if (parameterName == "widget_type") {
                    parameterValue = objectType;
                }
                else if (parameterName == "query") {
                    parameterValue = get_xml_classe_object_attribut_value(pageDoc, "url_0", objectSelected, "query");
                    if (parameterValue == "") parameterValue = get_xml_classe_object_attribut_value(pageDoc, "url_0", objectParent, "query");
                }
                else if (parameterName == "query_type") {
                    parameterValue = "sql";
                }
                else if (parameterName == "database_driver") {
                    parameterValue = get_xml_classe_object_attribut_value(pageDoc, "database", objectSelected, "driver");
                    if (parameterValue == "") parameterValue = get_xml_classe_object_attribut_value(pageDoc, "database", objectParent, "driver");
                }
                else if (parameterName == "database_url") {
                    parameterValue = get_xml_classe_object_attribut_value(pageDoc, "database", objectSelected, "url");
                    if (parameterValue == "")  parameterValue = get_xml_classe_object_attribut_value(pageDoc, "database", objectParent, "url");
                }
                else if (parameterName == "database_user") {
                    parameterValue = get_xml_classe_object_attribut_value(pageDoc, "database", objectSelected, "user");
                    if (parameterValue == "") parameterValue = get_xml_classe_object_attribut_value(pageDoc, "database", objectParent, "user");
                }
                else if (parameterName == "database_passwd") {
                    parameterValue = get_xml_classe_object_attribut_value(pageDoc, "database", objectSelected, "passwd");
                    if (parameterValue == "") parameterValue = get_xml_classe_object_attribut_value(pageDoc, "database", objectParent, "passwd");
                }
                else if (parameterName == "action") {
                    parameterValue = get_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "action");
                    if (parameterValue == "") parameterValue = get_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectParent, "action");
                }
                else {
                    //if (parameterSpecification != "") parameterValue = prompt(parameterSpecification, "");
                    if (functionName == "ob_generic_function" || functionName == "ob_java_function") {
                        parameterValue = parameterValue.replace("('", "(\\\'");
                        parameterValue = parameterValue.replace("')", "\\\')");
                        for (var l = 0; l < parseInt(parameterCount); l++) {
                            parameterValue = parameterValue.replace("','", "\\\',\\\'");
                        }
                        parameterValue = parameterValue.replace('("', '(\\\'');
                        parameterValue = parameterValue.replace('")', '\\\')');
                        for (l = 0; l < parseInt(parameterCount); l++) {
                            parameterValue = parameterValue.replace('","', '\\\',\\\'');
                        }
                    }
                }
                //if (parameterSpecification != ""&& parameterValue=="") parameterValue = prompt(parameterSpecification, "");
                //parameterValue = openbexi_clearText(parameterValue);
                set_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "parameterName_" + p, parameterName);
                set_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "parameterType_" + p, parameterType);
                set_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "parameterSpecification" + p, parameterSpecification);
                if (parameterValue != "") set_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, parameterName, parameterValue);
            }
        }
        OPENBEXI_PAGES_DATA_XML = openbexi_get_xmlString(pageDoc);
    } catch (e) {
        __openbexi_debugC("openbexi_generic_object.prototype.add_function() Exception:" + e.message);
    }
};
openbexi_generic_object.prototype.delete_function = function () {
    alert("TBD");
}
function openbexi_add_SQL_link(objectSelected, objectType, query) {
    // check for parameter if any
    ob_setDirty_flag(true);
    try {
        var index = openbexi_get_indexLink(objectSelected);
        var urlCount = ob_getFunctionCounter(objectSelected);
        if (index != -1) urlCount = index;
        ob_setFunctionCurrentIndex(objectSelected, parseInt(urlCount));
        if (objectType == "openbexi_form")getSelectedBexiObj(objectSelected).add_function("javascript", "ob_form_submit", null);
        if (objectType == "openbexi_dojo")getSelectedBexiObj(objectSelected).add_function("javascript", "SQL_refresh", null);

        // set info not done by  add_function
        var pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
        if (objectType == "openbexi_form") set_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "parameterCount", "9");
        if (objectType == "openbexi_dojo") set_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "parameterCount", "8");
        set_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "parameterName_0", "widget_id");
        set_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "parameterType_0", "string");
        set_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "widget_id", objectSelected);

        set_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "parameterName_1", "widget_type");
        set_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "parameterType_1", "string");
        set_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "widget_type", objectType);

        set_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "parameterName_2", "query");
        set_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "parameterType_2", "string");
        if (objectType == "openbexi_form") set_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "query", "select * from $table");
        if (objectType == "openbexi_dojo")set_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "query", query);
        set_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "parameterName_3", "query_type");
        set_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "parameterType_3", "string");
        set_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "query_type", "sql");

        set_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "parameterName_4", "database_driver");
        set_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "parameterType_4", "string");
        set_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "database_driver", "org.hsqldb.jdbcDriver");

        set_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "parameterName_5", "database_url");
        set_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "parameterType_5", "string");
        set_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "database_url", "jdbc:hsqldb:file:hsqldb/data/test");

        set_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "parameterName_6", "database_user");
        set_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "parameterType_6", "string");
        set_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "database_user", "sa");

        set_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "parameterName_7", "database_passwd");
        set_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "parameterType_7", "string");
        set_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "database_passwd", "");

        if (objectType == "openbexi_form") {
            set_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "parameterName_8", "action");
            set_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "parameterType_8", "string");
            set_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "action", "Edit");
        }

        OPENBEXI_PAGES_DATA_XML = openbexi_get_xmlString(pageDoc);
        return "OK";
    }
    catch (e) {
        __openbexi_debugC("openbexi_add_SQL_link() Exception:" + e.message);
        return null;
    }
}
openbexi_generic_object.prototype.add_link = function (objectSelected, protocole, url) {
    // check for parameter if any
    ob_setDirty_flag(true);
    try {
        var index = openbexi_get_indexLink(objectSelected);
        var urlCount = ob_getFunctionCounter(objectSelected);
        if (index != -1) urlCount = index;
        ob_setFunctionCurrentIndex(objectSelected, parseInt(urlCount));
        getSelectedBexiObj(objectSelected).add_function("javascript", "ob_URL", null);

        // set info not done by  add_function
        var pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
        set_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "specification", "URL link");
        set_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "parameterCount", "1");
        set_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "parameterName_0", "URL");
        set_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "parameterType_0", "string");
        set_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "URL", url);
        OPENBEXI_PAGES_DATA_XML = openbexi_get_xmlString(pageDoc);
        return "OK";
    }
    catch (e) {
        __openbexi_debugC("openbexi_generic_object.prototype.add_link() Exception:" + e.message);
        return null;
    }
};
openbexi_generic_object.prototype.delete_link = function (objectSelected) {
    // check for parameter if any
    ob_setDirty_flag(true);
    try {
        var index = openbexi_get_indexLink(objectSelected);
        ob_setFunctionCurrentIndex(objectSelected, index);
        openbexi_delete_trigger(objectSelected);
        return "OK";
    }
    catch (e) {
        __openbexi_debugC("openbexi_generic_object.prototype.delete_link() Exception:" + e.message);
        return null;
    }
}
openbexi_generic_object.prototype.get_link = function (objectSelected) {
    // check for parameter if any
    try {
        var index = openbexi_get_indexLink(objectSelected);
        var pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
        return  get_xml_classe_object_attribut_value(pageDoc, "url_" + index, objectSelected, "URL");
    }
    catch (e) {
        __openbexi_debugC("openbexi_generic_object.prototype.get_link() Exception:" + e.message);
        return "";
    }
};
function openbexi_get_indexLink(objectSelected) {
    // check for parameter if any
    try {
        var pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
        var urlCount = ob_getFunctionCounter(objectSelected);
        for (var i = 0; i <= urlCount; i++) {
            var trigger2 = get_xml_classe_object_attribut_value(pageDoc, "url_" + i, objectSelected, "trigger");
            var url2 = get_xml_classe_object_attribut_value(pageDoc, "url_" + i, objectSelected, "functionName");
            if (trigger2 == "onclick" && url2 == "ob_URL") {
                return  i;
            }
        }
        return -1;
    }
    catch (e) {
        __openbexi_debugC("openbexi_get_indexLink() Exception:" + e.message);
        return -1;
    }
}
;
function openbexi_delete_all_link(objectSelected) {
    // check for parameter if any
    try {
        var pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
        var urlCount = ob_getFunctionCurrentIndex(objectSelected);
        if (urlCount == -1) urlCount = 0;
        for (var i = 0; i <= urlCount; i++)
            pageDoc = delete_xml_classe_object(pageDoc, "url_" + urlCount, objectSelected);
        pageDoc = delete_xml_classe_object(pageDoc, "urls", objectSelected);
        pageDoc = delete_xml_classe_object(pageDoc, "imgs", objectSelected);
        pageDoc = delete_xml_classe_object(pageDoc, "img", objectSelected);
        pageDoc = delete_xml_classe_object(pageDoc, "DOJOeditor", objectSelected);
        OPENBEXI_PAGES_DATA_XML = openbexi_get_xmlString(pageDoc);
        //ob_setDirty_flag(true);
    } catch (e) {
        __openbexi_debugC("openbexi_delete_all_link() Exception:" + e.message);
    }
}
function openbexi_delete_trigger(objectSelected, index) {
    // check for parameter if any
    try {
        var pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
        var urlDeleted = index;
        if (index == undefined)
            urlDeleted = ob_getFunctionCurrentIndex(objectSelected);
        var urlCounter = ob_getFunctionCounter(objectSelected);
        var foundObjectDeleted = false;
        for (var i = 0; i <= urlCounter; i++) {
            if (foundObjectDeleted) {
                var functionName = get_xml_classe_object_attribut_value(pageDoc, "url_" + i, objectSelected, "functionName");
                set_xml_classe_object_attribut_value(pageDoc, "url_" + (i - 1), objectSelected, "functionName", functionName);
                var scriptName = get_xml_classe_object_attribut_value(pageDoc, "url_" + i, objectSelected, "scriptName");
                set_xml_classe_object_attribut_value(pageDoc, "url_" + (i - 1), objectSelected, "scriptName", scriptName);
                var protocole = get_xml_classe_object_attribut_value(pageDoc, "url_" + i, objectSelected, "protocole");
                set_xml_classe_object_attribut_value(pageDoc, "url_" + (i - 1), objectSelected, "protocole", protocole);
                var trigger = get_xml_classe_object_attribut_value(pageDoc, "url_" + i, objectSelected, "trigger");
                set_xml_classe_object_attribut_value(pageDoc, "url_" + (i - 1), objectSelected, "trigger", trigger);
                var specification = get_xml_classe_object_attribut_value(pageDoc, "url_" + i, objectSelected, "specification");
                set_xml_classe_object_attribut_value(pageDoc, "url_" + (i - 1), objectSelected, "specification", specification);
                var parameterCount = get_xml_classe_object_attribut_value(pageDoc, "url_" + i, objectSelected, "parameterCount");
                set_xml_classe_object_attribut_value(pageDoc, "url_" + (i - 1), objectSelected, "parameterCount", parameterCount);
                for (var p = 0; p < parseInt(parameterCount); p++) {
                    var parameterName = get_xml_classe_object_attribut_value(pageDoc, "url_" + i, objectSelected, "parameterName_" + p);
                    set_xml_classe_object_attribut_value(pageDoc, "url_" + (i - 1), objectSelected, "parameterName_" + p, parameterName);
                    var parameterType = get_xml_classe_object_attribut_value(pageDoc, "url_" + i, objectSelected, "parameterType_" + p);
                    set_xml_classe_object_attribut_value(pageDoc, "url_" + (i - 1), objectSelected, "parameterType_" + p, parameterType);
                    var parameterSpecification = get_xml_classe_object_attribut_value(pageDoc, "url_" + i, objectSelected, "parameterSpecification" + p);
                    set_xml_classe_object_attribut_value(pageDoc, "url_" + (i - 1), objectSelected, "parameterSpecification" + p, parameterSpecification);
                    var parameterValue = get_xml_classe_object_attribut_value(pageDoc, "url_" + i, objectSelected, parameterName);
                    set_xml_classe_object_attribut_value(pageDoc, "url_" + (i - 1), objectSelected, parameterName, parameterValue);
                }
                var message = get_xml_classe_object_attribut_value(pageDoc, "url_" + i, objectSelected, "message");
                set_xml_classe_object_attribut_value(pageDoc, "url_" + (i - 1), objectSelected, "message", message);
            }
            if (i == urlDeleted) {
                //pageDoc = delete_xml_classe_object(pageDoc, "url_" + urlDeleted, objectSelected);
                foundObjectDeleted = true;
                pageDoc = delete_xml_classe_object(pageDoc, "url_" + i, objectSelected);
            }
        }
        urlCounter = urlCounter - 1;
        pageDoc = delete_xml_classe_object(pageDoc, "url_" + urlCounter, objectSelected);
        OPENBEXI_PAGES_DATA_XML = openbexi_get_xmlString(pageDoc);
    } catch (e) {
        __openbexi_debugC("openbexi_delete_trigger() Exception:" + e.message);
    }
}
//var str="";
openbexi_generic_object.prototype.changeStyle = function (objBexiSource, objBexiTarget, direction) {
    try {
        if (direction == null || direction == undefined)  direction = "vertical";
        openbexi_set_CSS(objBexiTarget.div, openbexi_get_CSS(objBexiSource.div));
        var border = 0;
        try {
            border = parseInt(objBexiSource.div.style.border);
            if (isNaN(border)) border = 0;
        } catch (e) {
            border = 0;
        }
        if (direction == "horizontal") {
            objBexiTarget.div.style.left = parseInt(objBexiSource.div.style.left) + 2 * border + parseInt(objBexiSource.div.style.width) + 10 + "px";
            objBexiTarget.div.style.top = objBexiSource.div.style.top;
        } else {
            objBexiTarget.div.style.top = parseInt(objBexiSource.div.style.top) + 2 * border + parseInt(objBexiSource.div.style.height) + 10 + "px";
            objBexiTarget.div.style.left = objBexiSource.div.style.left;
        }
        objBexiTarget.theme = objBexiSource.theme;
        objBexiTarget.subtheme = objBexiSource.subtheme;
        objBexiTarget.template = objBexiSource.template;

        // Copy css/css3
        openbexi_updatePageData(null, "page", objBexiTarget.div.id, "css_border_bg", openbexi_getPageData(null, "page", objBexiSource.div.id, "css_border_bg"));
        openbexi_updatePageData(null, "page", objBexiTarget.div.id, "css3_radius", openbexi_getPageData(null, "page", objBexiSource.div.id, "css3_radius"));
        openbexi_updatePageData(null, "page", objBexiTarget.div.id, "css3_boxShadow", openbexi_getPageData(null, "page", objBexiSource.div.id, "css3_boxShadow"));
        openbexi_updatePageData(null, "page", objBexiTarget.div.id, "css3_gradient", openbexi_getPageData(null, "page", objBexiSource.div.id, "css3_gradient"));
        openbexi_updatePageData(null, "page", objBexiTarget.div.id, "css_opacity", openbexi_getPageData(null, "page", objBexiSource.div.id, "css_opacity"));
        openbexi_updatePageData(null, "page", objBexiTarget.div.id, "css_font", openbexi_getPageData(null, "page", objBexiSource.div.id, "css_font"));

        objBexiTarget.set_template(objBexiTarget.template, null, null, null);

        objBexiTarget.setData();
        ob_setDirty_flag(true);

    } catch (e) {
        __openbexi_debugC("openbexi_generic_object.prototype.changeStyle() Exception:" + e.message);
    }
}
openbexi_generic_object.prototype.set_template = function (bexiObject, css_file, action, canvas_rsync) {
    if (css_file == null || css_file == "undefined" || css_file == "")return;
    try {
        var ob_type = bexiObject.type.replace("openbexi_", "ob_")
        if (!css_file.match("template/" + ob_type)) {
            //* Check if subtheme matches with css_file. if not fix subtheme
            if (!css_file.match(bexiObject.subtheme))
                bexiObject.subtheme = css_file.split("_")[0];

            if (bexiObject.subtheme == undefined || bexiObject.subtheme == "" || bexiObject.subtheme == "none")
                bexiObject.template = "template/" + ob_type + "/" + css_file.replace(".css", "") + ".css";
            else
                bexiObject.template = "template/" + ob_type + "/" + bexiObject.subtheme + "/" + css_file.replace(".css", "") + ".css";
            bexiObject.theme = css_file;
        }
        else {
            bexiObject.template = css_file;
            if (bexiObject.subtheme == undefined || bexiObject.subtheme == "undefined" || bexiObject.subtheme == "" || bexiObject.subtheme == "none" || bexiObject.theme == "default")
                bexiObject.theme = bexiObject.template.replace("template/" + ob_type + "/", "");
            else
                bexiObject.theme = bexiObject.template.replace("template/" + ob_type + "/" + bexiObject.subtheme + "/", "");
            bexiObject.theme = bexiObject.theme.replace(".css", "");
        }
        openbexi_updatePageData(null, "page", bexiObject.div.id, "theme", bexiObject.theme);
        openbexi_updatePageData(null, "page", bexiObject.div.id, "template", bexiObject.template);
        openbexi_updatePageData(null, "page", "css", bexiObject.theme, bexiObject.template);

        if (bexiObject.theme == "default") {
            openbexi_updatePageData(null, "page", bexiObject.div.id, "subtheme", "none");
            bexiObject.subtheme = "none"
        } else
            openbexi_updatePageData(null, "page", bexiObject.div.id, "subtheme", bexiObject.subtheme);
    } catch (e) {
        __openbexi_debugC("openbexi_generic_object.prototype.set_template() Exception:" + e.message);
    }


    // remove inline css if any
    try {
        openbexi_remove_CSS(bexiObject.div.id);
    } catch (e) {
        __openbexi_debugC("openbexi_generic_object.prototype.set_template() Exception:" + e.message);
    }

    // Load css template  and css3 if any
    try {
        openbexi_load_JS_CSS_file(bexiObject.template, "css");
        bexiObject.div.style.cssText += openbexi_getPageData(null, "page", bexiObject.div.id, "css_border_bg");
        bexiObject.div.style.cssText += openbexi_getPageData(null, "page", bexiObject.div.id, "css3_radius");
        bexiObject.div.style.cssText += openbexi_getPageData(null, "page", bexiObject.div.id, "css3_boxShadow");
        bexiObject.div.style.cssText += openbexi_getPageData(null, "page", bexiObject.div.id, "css3_gradient");
        bexiObject.div.style.cssText += openbexi_getPageData(null, "page", bexiObject.div.id, "css_opacity");
        bexiObject.div.style.cssText += openbexi_getPageData(null, "page", bexiObject.div.id, "css_font");
    } catch (e) {
        __openbexi_debugC("openbexi_generic_object.prototype.set_template() Exception:" + e.message);
    }

    if (bexiObject.subtheme == undefined || bexiObject.subtheme == "")
        openbexi_add_page_dir("template/" + ob_type + "/gif/*");
    else
        openbexi_add_page_dir("template/" + ob_type + "/" + bexiObject.subtheme + "/gif/*");
    if (canvas_rsync)
        setTimeout(function () {
            my_canvas_PickFunc(bexiObject.div.id);
        }, 200);
}
function openbexi_add_page_dir(dir) {
    try {
        var pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
        //Add in page list
        var dirs = get_xml_classe_object_attributes(pageDoc, "page", "dir");
        var already_in_list = false;
        if (dirs != null) {
            for (var i = 0; i < dirs.length; i++) {
                var dirFile = get_xml_classe_object_attribut_value(pageDoc, "page", "dir", dirs[i].getAttribute("name"));
                if (dirFile == dir) {
                    already_in_list = true;
                }
            }
        }
        var count = 0
        if (dirs) count = dirs.length;
        if (!already_in_list)set_xml_classe_object_attribut_value(pageDoc, "page", "dir", "file_" + count, dir);
        OPENBEXI_PAGES_DATA_XML = openbexi_get_xmlString(pageDoc);
    } catch (e) {
        __openbexi_debugC("openbexi_add_page_dir() Exception:" + e.message);
    }
}
function openbexi_delete_page_dir() {
}
function openbexi_add_page_data(data) {
    try {
        // Do not add http img
        if (!data) return;
        if (data.match(RegExp("http:|https:"))) return;

        // Remove href if any
        if (data) data = data.replace(this.openbexiNavigator.hrefPath, "");

        var pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
        //Add in page list
        data = data.replace(this.openbexiNavigator.hrefPath, "");
        var data_list = get_xml_classe_object_attributes(pageDoc, "page", "data");
        var already_in_list = false;
        if (data_list != null) {
            for (var i = 0; i < data_list.length; i++) {
                var dataFile = get_xml_classe_object_attribut_value(pageDoc, "page", "data", data_list[i].getAttribute("name"));
                if (dataFile == data) {
                    already_in_list = true;
                }
            }
        }
        var count = 0;
        if (data_list) count = data_list.length;
        if (!already_in_list)set_xml_classe_object_attribut_value(pageDoc, "page", "data", "file_" + count, data);
        openbexi_set_OPENBEXI_PAGES_DATA_XML(openbexi_get_xmlString(pageDoc));
    } catch (e) {
        __openbexi_debugC("openbexi_add_page_data() Exception:" + e.message);
    }
}

