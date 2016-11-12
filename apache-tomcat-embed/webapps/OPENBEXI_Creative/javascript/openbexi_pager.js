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
var openbexi_pagers = new Array();
function ob_save_pagers(pager) {
    try {
        var pagerC = ob_get_pagers(pager.id);
        if (pagerC != null) return;
        var length = openbexi_pagers.length;
        openbexi_pagers[length] = pager;
    } catch (e) {
        __openbexi_debugC("ob_save_pagers()", "Exception:" + e.message);
    }
}
function ob_get_pagers(name) {
    try {
        for (var i = openbexi_pagers.length - 1; i >= 0; i--) {
            if (openbexi_pagers[i] != null && openbexi_pagers[i].id == name) {
                return openbexi_pagers[i];
            }
        }
    } catch (e) {
        __openbexi_debugC("ob_save_pagers()", "Exception:" + e.message);
    }
    return null;
}
function ob_remove_pagers(name) {
    try {
        for (var i = openbexi_pagers.length - 1; i >= 0; i--) {
            if (openbexi_pagers[i] != null && openbexi_pagers[i].id == name) {
                openbexi_pagers[i] = null;
            }
        }
    } catch (e) {
        __openbexi_debugC("ob_remove_pagers()", "Exception:" + e.message);
    }
    return null;
}
var openbexi_pager = function(bexiObj, obj, name, top, left, width, widthNumber, height, maxItems, mode) {
    try {
        this.styles_BgImg = null;
        this.inspectorAttributes = [
            ['editor'         ,'PagerEditor'   ,'true']
        ];

        // popup data
        this.popupAttributes = [
            ['menuitem12' ,'this.backward()'       ,'SendToBack',   'gif\/send_back.gif','25px','25px'],
            ['menuitem22' ,'this.forward()'        ,'BringToFront', 'gif\/send_forward.gif','25px','25px'],
            ['menuitem35','this.removeObject()'   ,'DlgSelectBtnDelete','gif\/no_horizontal.jpg','25px','25px'],
            //['sep',null,null,   null,null,null],
            //['sep',null,null,   null,null,null],
            //['menuitem81', 'openbexi_getJavascripts(event)','Javascript', 'gif\/file_js_small.jpg',    '32px','32px'],
            ['sep',null,null,   null,null,null]
        ];
        var navigator = ob_get_navigator(name);
        if (navigator == null) {
            navigator = new openbexi_navigator(name, this);
            ob_save_navigators(navigator);
        }
        //openbexi_pager properties
        this.name = name;
        this.id = name;
        this.type = "openbexi_pager";
        this.ButtonNumber = 6;
        this.maxItems = maxItems;
        if (bexiObj == null) {
            this.parentNodeId = "BODY";
            this.parentType = "openbexi_body";
        }
        else {
            this.parentNodeId = bexiObj.id;
            this.parentType = bexiObj.type;
        }
        var divobj = null;
        if (obj == null) {
            // create object
            if (mode == "dynamic") {
                divobj = new openbexi_div(bexiObj, obj, name, top, left, width, height);
                this.div = divobj.div;
                this.div.setAttribute("CLASSE", "DIV_PAGER");
                this.div.id = name;
                this.parent = this.div.id;
                this.div.style.position = "absolute";
                this.div.align = "center";
                this.div.style.border = "0px solid blue";
            }
            else {
                this.div = document.createElement("div");
                this.div.style.position = "absolute";
                this.div.align = "center";
                this.div.id = name + "_pager";
                this.div.style.top = top;
                this.div.style.left = left;
                this.div.style.width = "200px";
                this.div.style.height = height;
            }
            var widthButton = parseInt(width) + "px";
            var widthNumberButton = parseInt(widthNumber) + "px";
            var heightButton = parseInt(height) + "px";
            this.div.style.zIndex = document.getElementById(name).style.zIndex;
            this.explorerPreviousDivBegin = document.createElement("div");
            this.explorerPreviousDivBegin.id = this.div.id + "PreviousDivBegin";
            this.explorerPreviousDivBegin.style.position = "absolute";
            this.explorerPreviousDivBegin.style.cursor = "pointer";
            this.explorerPreviousDivBegin.style.visibility = "visible";
            this.explorerPreviousDivBegin.title = "Begin";
            this.explorerPreviousDivBegin.style.top = "0px";
            this.explorerPreviousDivBegin.style.left = parseInt(left) + "px";
            this.explorerPreviousDivBegin.style.width = widthButton;
            this.explorerPreviousDivBegin.style.height = heightButton;
            this.explorerPreviousDivBegin.style.background = "url(gif\/Bprevious_small.png)";
            this.explorerPreviousDivBegin.align = "center";
            this.explorerPreviousDivBegin.divName = name;
            this.div.appendChild(this.explorerPreviousDivBegin);

            this.explorerPreviousDiv = document.createElement("div");
            this.explorerPreviousDiv.id = this.div.id + "PreviousDiv";
            this.explorerPreviousDiv.style.position = "absolute";
            this.explorerPreviousDiv.style.cursor = "pointer";
            this.explorerPreviousDiv.style.visibility = "visible";
            this.explorerPreviousDiv.title = "Previous";
            this.explorerPreviousDiv.style.top = "0px";
            this.explorerPreviousDiv.style.left = parseInt(this.explorerPreviousDivBegin.style.left) + parseInt(widthButton) + 2 + "px";
            this.explorerPreviousDiv.style.width = widthButton;
            this.explorerPreviousDiv.style.height = heightButton;
            this.explorerPreviousDiv.style.background = "url(gif\/previous_small.png)";
            this.explorerPreviousDiv.align = "center";
            this.explorerPreviousDiv.divName = name;
            this.div.appendChild(this.explorerPreviousDiv);

            var currentleft = this.explorerPreviousDiv.style.left;
            for (i = 0; i < this.ButtonNumber; i++) {
                var explorerNextDiv = document.createElement("div");
                explorerNextDiv.id = this.div.id + "NextDiv" + i;
                explorerNextDiv.style.position = "absolute";
                explorerNextDiv.style.cursor = "pointer";
                explorerNextDiv.style.width = widthNumberButton;
                explorerNextDiv.style.top = "0px";
                if (i == 0)
                    explorerNextDiv.style.left = parseInt(currentleft) + parseInt(widthButton) + 2 + "px";
                else
                    explorerNextDiv.style.left = parseInt(currentleft) + parseInt(widthNumberButton) + 2 + "px";
                explorerNextDiv.style.height = heightButton;
                explorerNextDiv.style.background = "white";
                explorerNextDiv.align = "center";
                var buttextnTmp = document.createTextNode(i);
                explorerNextDiv.appendChild(buttextnTmp);
                currentleft = explorerNextDiv.style.left;
                explorerNextDiv.number = i;
                explorerNextDiv.divName = name;
                explorerNextDiv.onmouseover = function() {
                    this.style.background = "#C2C0C0";
                };
                explorerNextDiv.onmouseout = function() {
                    this.style.background = "";
                };
                explorerNextDiv.onclick = function() {
                    var pager;
                    if (openbexiNavigator.working) return;
                    if (this.divName == "ob_menu_widget") {
                        pager = openbexiNavigator.ob_menu_widget_pager;
                        pager.pager_number = this.number;
                        pager.posCurrentItem = (parseInt(pager.pager_number) * parseInt(pager.maxItems));
                        openbexiNavigator.update_window_body_items(_ob_menuId_focus, ob_menu_widget, true);
                        if (getSelectedBexiObj(null).type == "openbexi_body")
                            openbexiNavigator.update_window_body_items(_ob_menuId_focus, ob_menu_widget, true);
                        else
                            openbexiNavigator.update_window_body_items(_ob_menuId_focus, getSelectedBexiObj(null).getPopupWidgets(), true);
                    } else if (this.divName == "ob_menu_PictureBrowser") {
                        pager = openbexiNavigator.ob_menu_PictureBrowser_pager;
                        pager.pager_number = this.number;
                        pager.posCurrentItem = (parseInt(pager.pager_number) * parseInt(pager.maxItems));
                        if (document.getElementById("ob_menu_PictureBrowser_window_manager_img").src.match(RegExp("_full_")))
                            openbexiNavigator.browse_picture("", "dir", openbexiNavigator.browse_picture_path, "tree", false, false);
                        else
                            openbexiNavigator.browse_picture("", "dir", openbexiNavigator.browse_picture_path, "gallery", false, false);
                    } else if (this.divName == "ob_menu_JavascriptBrowser") {
                        pager = openbexiNavigator.ob_menu_JavascriptBrowser_pager;
                        pager.pager_number = this.number;
                        pager.posCurrentItem = (parseInt(pager.pager_number) * parseInt(pager.maxItems));
                        if (getSelectedBexiObj(null).type == "openbexi_body")
                            openbexiNavigator.update_window_body_items(_ob_menuId_focus, ob_menu_widget, true);
                        else
                            openbexiNavigator.update_window_body_items(_ob_menuId_focus, ob_menu_javascripts, false);
                    } else if (this.divName == "ob_menu_SQLBrowser") {
                        pager = openbexiNavigator.ob_menu_SQLBrowser_pager;
                        pager.pager_number = this.number;
                        pager.posCurrentItem = (parseInt(pager.pager_number) * parseInt(pager.maxItems));
                        if (getSelectedBexiObj(null).type == "openbexi_body")
                            openbexiNavigator.update_window_body_items(_ob_menuId_focus, ob_menu_SQL, true);
                        else
                            openbexiNavigator.update_window_body_items(_ob_menuId_focus, ob_menu_SQL, false);
                    } else {
                        if (ob_get_navigator("main_navigator")) return;
                        pager = ob_get_navigator("main_navigator").pager;
                        var doc = ob_get_navigator("main_navigator").setDataServer(pager.ob_doc, pager.subtype, pager.path, this.number, pager.posCurrentItem, "dir_next", this.fileName,  "cd path", this.divName, ob_get_navigator("main_navigator").maxItems);
                        ob_get_navigator("main_navigator").getdataFromServer(pager.subtype, doc);
                    }
                };
                this.div.appendChild(explorerNextDiv);
            }

            this.explorerNextDiv = document.createElement("div");
            this.explorerNextDiv.id = this.div.id + "NextDiv";
            this.explorerNextDiv.style.position = "absolute";
            this.explorerNextDiv.style.cursor = "pointer";
            this.explorerNextDiv.style.visibility = "visible";
            this.explorerNextDiv.title = "Next";
            this.explorerNextDiv.style.width = widthButton;
            this.explorerNextDiv.style.top = "0px";
            if (currentleft == this.explorerPreviousDiv.style.left)
                this.explorerNextDiv.style.left = parseInt(this.explorerPreviousDiv.style.left) + parseInt(widthButton) + 2 + "px";
            else
                this.explorerNextDiv.style.left = parseInt(currentleft) + parseInt(widthNumberButton) + 2 + "px";
            this.explorerNextDiv.style.height = heightButton;
            this.explorerNextDiv.style.background = "url(gif\/next_small.png)";
            this.explorerNextDiv.align = "center";
            this.explorerNextDiv.divName = name;
            this.div.appendChild(this.explorerNextDiv);

            this.explorerNextDivEnd = document.createElement("div");
            this.explorerNextDivEnd.id = this.div.id + "NextDivEnd";
            this.explorerNextDivEnd.style.position = "absolute";
            this.explorerNextDivEnd.style.cursor = "pointer";
            this.explorerNextDivEnd.style.visibility = "visible";
            this.explorerNextDiv.title = "End";
            this.explorerNextDivEnd.style.top = "0px";
            this.explorerNextDivEnd.style.left = parseInt(this.explorerNextDiv.style.left) + parseInt(widthButton) + 2 + "px";
            this.explorerNextDivEnd.style.width = widthButton;
            this.explorerNextDivEnd.style.height = heightButton;
            this.explorerNextDivEnd.style.background = "url(gif\/Enext_small.png)";
            this.explorerNextDivEnd.align = "center";
            this.explorerNextDivEnd.divName = name;
            this.div.appendChild(this.explorerNextDivEnd);
        }
        else
        {
            if (mode == "dynamic") {
                divobj = new openbexi_div(bexiObj, obj, obj.id, top, left, width, height);
                this.div = divobj.div;
            }
            else
                this.div = obj;
            this.parent = this.div.id;
            this.div.setAttribute("CLASSE", "DIV_PAGER");
            this.explorerPreviousDiv = document.getElementById(this.div.id + "PreviousDiv");
            this.explorerPreviousDivBegin = document.getElementById(this.div.id + "PreviousDivBegin");
            this.explorerNextDiv = document.getElementById(this.div.id + "NextDiv");
            this.explorerNextDivEnd = document.getElementById(this.div.id + "NextDivEnd");
            this.explorerPreviousDiv.divName = name;
            this.explorerPreviousDivBegin.divName = name;
            this.explorerNextDiv.divName = name;
            this.explorerNextDivEnd.divName = name;

        }
        if (mode == "dynamic") {
            this.div.onclick = this.my_PickFunc;
            this.genericObject = new openbexi_generic_object(this);
            if (obj == null) this.forward();
        }
        // ========================Attach on click event to pager================================
        if (this.explorerPreviousDivBegin) this.explorerPreviousDivBegin.onclick = function() {
            var pager;
            try {
                if (openbexiNavigator.working) return;
            } catch (e) {
            }
            if (this.divName == "ob_menu_widget") {
                pager = openbexiNavigator.ob_menu_widget_pager;
                pager.pager_number = 0;
                pager.posCurrentItem = 0;
                if (getSelectedBexiObj(null).type == "openbexi_body")
                    openbexiNavigator.update_window_body_items(_ob_menuId_focus, ob_menu_widget, true);
                else
                    openbexiNavigator.update_window_body_items(_ob_menuId_focus, getSelectedBexiObj(null).getPopupWidgets(), true);
            } else if (this.divName == "ob_menu_PictureBrowser") {
                pager = openbexiNavigator.ob_menu_PictureBrowser_pager;
                pager.pager_number = 0;
                pager.posCurrentItem = 0;
                if (document.getElementById("ob_menu_PictureBrowser_window_manager_img").src.match(RegExp("_full_")))
                    openbexiNavigator.browse_picture("", "dir", openbexiNavigator.browse_picture_path, "tree", false, false);
                else
                    openbexiNavigator.browse_picture("", "dir", openbexiNavigator.browse_picture_path, "gallery", false, false);
            } else if (this.divName == "ob_menu_JavascriptBrowser") {
                pager = openbexiNavigator.ob_menu_JavascriptBrowser_pager;
                pager.pager_number = 0;
                pager.posCurrentItem = 0;
                if (getSelectedBexiObj(null).type == "openbexi_body")
                    openbexiNavigator.update_window_body_items(_ob_menuId_focus, ob_menu_widget, true);
                else
                    openbexiNavigator.update_window_body_items(_ob_menuId_focus, ob_menu_javascripts, false);
            } else if (this.divName == "ob_menu_SQLBrowser") {
                pager = openbexiNavigator.ob_menu_SQLBrowser_pager;
                pager.pager_number = 0;
                pager.posCurrentItem = 0;
                if (getSelectedBexiObj(null).type == "openbexi_body")
                    openbexiNavigator.update_window_body_items(_ob_menuId_focus, ob_menu_SQL, true);
                else
                    openbexiNavigator.update_window_body_items(_ob_menuId_focus, ob_menu_SQL, false);
            } else {
                var navigator = ob_get_navigator(this.divName);
                if (navigator) {
                    pager = navigator.pager;
                    if (pager.pager_number == 0) return;
                    navigator.maxItems = pager.maxItems;
                    var doc = navigator.setDataServer(pager.ob_doc, pager.subtype, pager.path, "previousBegin", pager.posCurrentItem, "dir_previous", this.fileName,  "cd path", this.divName, navigator.maxItems);
                    openbexi_LNRequest(null, null, pager.widget_id, pager.widget_type, null, null, "pager", null, null, pager.query, "sql", pager.driver, pager.url, pager.user, pager.passwd, doc, "false");
                }
            }
        };
        if (this.explorerPreviousDiv) this.explorerPreviousDiv.onclick = function() {
            var pager;
            try {
                if (openbexiNavigator.working) return;
            } catch (e) {
            }
            if (this.divName == "ob_menu_widget") {
                pager = openbexiNavigator.ob_menu_widget_pager;
                pager.pager_number = parseInt(pager.pager_number) - 1;
                if (pager.pager_number < 0) pager.pager_number = 0;
                pager.posCurrentItem = (parseInt(pager.pager_number) * parseInt(pager.maxItems));
                if (getSelectedBexiObj(null).type == "openbexi_body")
                    openbexiNavigator.update_window_body_items(_ob_menuId_focus, ob_menu_widget, true);
                else
                    openbexiNavigator.update_window_body_items(_ob_menuId_focus, getSelectedBexiObj(null).getPopupWidgets(), true);
            } else if (this.divName == "ob_menu_PictureBrowser") {
                pager = openbexiNavigator.ob_menu_PictureBrowser_pager;
                pager.pager_number = parseInt(pager.pager_number) - 1;
                if (pager.pager_number < 0) pager.pager_number = 0;
                pager.posCurrentItem = (parseInt(pager.pager_number) * parseInt(pager.maxItems));
                if (document.getElementById("ob_menu_PictureBrowser_window_manager_img").src.match(RegExp("_full_")))
                    openbexiNavigator.browse_picture("", "dir", openbexiNavigator.browse_picture_path, "tree", false, false);
                else
                    openbexiNavigator.browse_picture("", "dir", openbexiNavigator.browse_picture_path, "gallery", false, false);
                openbexiNavigator.update_window_body_items(_ob_menuId_focus, getSelectedBexiObj(null).getPopupWidgets(), true);
            } else if (this.divName == "ob_menu_JavascriptBrowser") {
                pager = openbexiNavigator.ob_menu_JavascriptBrowser_pager;
                pager.pager_number = parseInt(pager.pager_number) - 1;
                if (pager.pager_number < 0) pager.pager_number = 0;
                pager.posCurrentItem = (parseInt(pager.pager_number) * parseInt(pager.maxItems));
                if (getSelectedBexiObj(null).type == "openbexi_body")
                    openbexiNavigator.update_window_body_items(_ob_menuId_focus, ob_menu_widget, true);
                else
                    openbexiNavigator.update_window_body_items(_ob_menuId_focus, ob_menu_javascripts, false);
            } else if (this.divName == "ob_menu_SQLBrowser") {
                pager = openbexiNavigator.ob_menu_SQLBrowser_pager;
                pager.pager_number = parseInt(pager.pager_number) - 1;
                if (pager.pager_number < 0) pager.pager_number = 0;
                pager.posCurrentItem = (parseInt(pager.pager_number) * parseInt(pager.maxItems));
                if (getSelectedBexiObj(null).type == "openbexi_body")
                    openbexiNavigator.update_window_body_items(_ob_menuId_focus, ob_menu_SQL, true);
                else
                    openbexiNavigator.update_window_body_items(_ob_menuId_focus, ob_menu_SQL, false);
            } else {
                var navigator = ob_get_navigator(this.divName);
                if (navigator) {
                    pager = navigator.pager;
                    navigator.maxItems = pager.maxItems;
                    if (pager.pager_number == 0) return;
                    doc = navigator.setDataServer(pager.ob_doc, pager.subtype, pager.path, "previous", pager.posCurrentItem, "dir_previous", this.fileName, "cd path", this.divName, navigator.maxItems);
                    openbexi_LNRequest(null, null, pager.widget_id, pager.widget_type, null, null, "pager", null, null, pager.query, "sql", pager.driver, pager.url, pager.user, pager.passwd, doc, "false");
                    openbexi_LNRequest(null, null, pager.widget_id, pager.widget_type, null, null, "pager", null, null, pager.query, "sql", pager.driver, pager.url, pager.user, pager.passwd, doc, "false");
                }
            }
        };
        if (obj != null) {
            for (var i = 0; i < this.ButtonNumber; i++) {
                var explorerDiv = document.getElementById(this.div.id + "NextDiv" + i);
                if (explorerDiv) {
                    explorerDiv.number = i;
                    explorerDiv.divName = name;
                    explorerDiv.onclick = function() {
                        var openbexiNavigator = ob_get_navigator(this.divName);
                        if (openbexiNavigator.working) return;
                        if (openbexiNavigator) {
                            var pager = openbexiNavigator.pager;
                            openbexiNavigator.maxItems = pager.maxItems;
                            var doc = openbexiNavigator.setDataServer(pager.ob_doc, pager.subtype, pager.path, this.number, pager.posCurrentItem, "dir_next", this.fileName,  "cd path", this.divName, openbexiNavigator.maxItems);
                            openbexi_LNRequest(null, null, pager.widget_id, pager.widget_type, null, null, "pager", null, null, pager.query, "sql", pager.driver, pager.url, pager.user, pager.passwd, doc, "false");
                        }
                    };
                }
            }
        }
        if (this.explorerNextDiv) this.explorerNextDiv.onclick = function() {
            var pager;
            try {
                if (openbexiNavigator.working) return;
            } catch (e) {
            }
            if (this.divName == "ob_menu_widget") {
                //openbexiNavigator = ob_get_navigator(this.divName);
                pager = openbexiNavigator.ob_menu_widget_pager;
                pager.pager_number = parseInt(pager.pager_number) + 1;
                if (pager.pager_number > pager.objectMaxCount / pager.maxItems) pager.pager_number = parseInt(pager.objectMaxCount / pager.maxItems);
                pager.posCurrentItem = (parseInt(pager.pager_number) * parseInt(pager.maxItems));
                if (getSelectedBexiObj(null).type == "openbexi_body")
                    openbexiNavigator.update_window_body_items(_ob_menuId_focus, ob_menu_widget, true);
                else
                    openbexiNavigator.update_window_body_items(_ob_menuId_focus, getSelectedBexiObj(null).getPopupWidgets(), true);
            } else if (this.divName == "ob_menu_PictureBrowser") {
                pager = openbexiNavigator.ob_menu_PictureBrowser_pager;
                pager.pager_number = parseInt(pager.pager_number) + 1;
                if (pager.pager_number > pager.objectMaxCount / pager.maxItems) pager.pager_number = parseInt(pager.objectMaxCount / pager.maxItems);
                pager.posCurrentItem = (parseInt(pager.pager_number) * parseInt(pager.maxItems));
                if (document.getElementById("ob_menu_PictureBrowser_window_manager_img").src.match(RegExp("_full_")))
                    openbexiNavigator.browse_picture("", "dir", openbexiNavigator.browse_picture_path, "tree", false, false);
                else
                    openbexiNavigator.browse_picture("", "dir", openbexiNavigator.browse_picture_path, "gallery", false, false);
            } else if (this.divName == "ob_menu_JavascriptBrowser") {
                pager = openbexiNavigator.ob_menu_JavascriptBrowser_pager;
                pager.pager_number = parseInt(pager.pager_number) + 1;
                if (pager.pager_number > pager.objectMaxCount / pager.maxItems) pager.pager_number = parseInt(pager.objectMaxCount / pager.maxItems);
                pager.posCurrentItem = (parseInt(pager.pager_number) * parseInt(pager.maxItems));
                if (getSelectedBexiObj(null).type == "openbexi_body")
                    openbexiNavigator.update_window_body_items(_ob_menuId_focus, ob_menu_widget, true);
                else
                    openbexiNavigator.update_window_body_items(_ob_menuId_focus, ob_menu_javascripts, false);
            } else if (this.divName == "ob_menu_SQLBrowser") {
                pager = openbexiNavigator.ob_menu_SQLBrowser_pager;
                pager.pager_number = parseInt(pager.pager_number) + 1;
                if (pager.pager_number > pager.objectMaxCount / pager.maxItems) pager.pager_number = parseInt(pager.objectMaxCount / pager.maxItems);
                pager.posCurrentItem = (parseInt(pager.pager_number) * parseInt(pager.maxItems));
                if (getSelectedBexiObj(null).type == "openbexi_body")
                    openbexiNavigator.update_window_body_items(_ob_menuId_focus, ob_menu_SQL, true);
                else
                    openbexiNavigator.update_window_body_items(_ob_menuId_focus, ob_menu_SQL, false);
            } else {
                var navigator = ob_get_navigator(this.divName);
                if (navigator) {
                    pager = navigator.pager;
                    navigator.maxItems = pager.maxItems;
                    var doc = navigator.setDataServer(pager.ob_doc, pager.subtype, pager.path, "next", pager.posCurrentItem, "dir_next", this.fileName,  "cd path", this.divName, navigator.maxItems);
                    openbexi_LNRequest(null, null, pager.widget_id, pager.widget_type, null, null, "pager", null, null, pager.query, "sql", pager.driver, pager.url, pager.user, pager.passwd, doc, "false");
                }
            }
        };
        if (this.explorerNextDivEnd) this.explorerNextDivEnd.onclick = function() {
            var pager;
            try {
                if (openbexiNavigator.working) return;
            } catch (e) {
            }
            if (this.divName == "ob_menu_widget") {
                pager = openbexiNavigator.ob_menu_widget_pager;
                pager.pager_number = parseInt(pager.objectMaxCount / pager.maxItems);
                pager.posCurrentItem = (parseInt(pager.pager_number) * parseInt(pager.maxItems));
                if (getSelectedBexiObj(null).type == "openbexi_body")
                    openbexiNavigator.update_window_body_items(_ob_menuId_focus, ob_menu_widget, true);
                else
                    openbexiNavigator.update_window_body_items(_ob_menuId_focus, getSelectedBexiObj(null).getPopupWidgets(), true);
            } else if (this.divName == "ob_menu_PictureBrowser") {
                pager = openbexiNavigator.ob_menu_PictureBrowser_pager;
                pager.pager_number = parseInt(pager.objectMaxCount / pager.maxItems);
                pager.posCurrentItem = (parseInt(pager.pager_number) * parseInt(pager.maxItems));
                if (document.getElementById("ob_menu_PictureBrowser_window_manager_img").src.match(RegExp("_full_")))
                    openbexiNavigator.browse_picture("", "dir", openbexiNavigator.browse_picture_path, "tree", false, false);
                else
                    openbexiNavigator.browse_picture("", "dir", openbexiNavigator.browse_picture_path, "gallery", false, false);
            } else if (this.divName == "ob_menu_JavascriptBrowser") {
                pager = openbexiNavigator.ob_menu_JavascriptBrowser_pager;
                pager.pager_number = parseInt(pager.objectMaxCount / pager.maxItems);
                pager.posCurrentItem = (parseInt(pager.pager_number) * parseInt(pager.maxItems));
                if (getSelectedBexiObj(null).type == "openbexi_body")
                    openbexiNavigator.update_window_body_items(_ob_menuId_focus, ob_menu_widget, true);
                else
                    openbexiNavigator.update_window_body_items(_ob_menuId_focus, ob_menu_javascripts, false);
            } else if (this.divName == "ob_menu_SQLBrowser") {
                pager = openbexiNavigator.ob_menu_SQLBrowser_pager;
                pager.pager_number = parseInt(pager.objectMaxCount / pager.maxItems);
                pager.posCurrentItem = (parseInt(pager.pager_number) * parseInt(pager.maxItems));
                if (getSelectedBexiObj(null).type == "openbexi_body")
                    openbexiNavigator.update_window_body_items(_ob_menuId_focus, ob_menu_SQL, true);
                else
                    openbexiNavigator.update_window_body_items(_ob_menuId_focus, ob_menu_SQL, false);
            } else {
                var navigator = ob_get_navigator(this.divName);
                if (navigator) {
                    pager = navigator.pager;
                    navigator.maxItems = pager.maxItems;
                    var doc = navigator.setDataServer(pager.ob_doc, pager.subtype, pager.path, "nextEnd", pager.posCurrentItem, "dir_next", this.fileName, "cd path", this.divName, navigator.maxItems);
                    openbexi_LNRequest(null, null, pager.widget_id, pager.widget_type, null, null, "pager", null, null, pager.query, "sql", pager.driver, pager.url, pager.user, pager.passwd, doc, "false");
                }
            }
        };
        // ========================End attach on click event to pager================================
        ob_save_pagers(this);
    }
    catch
            (e)
    {
        __openbexi_debugC("openbexi_pager()", "Exception:" + e.message);
    }
    return this;
}
openbexi_pager.prototype.setData = function() {
}
openbexi_pager.prototype.hide = function() {
    try {
        document.getElementById(this.div.id).style.visibility = "hidden";
        document.getElementById(this.div.id + "PreviousDivBegin").style.visibility = "hidden";
        document.getElementById(this.div.id + "PreviousDiv").style.visibility = "hidden";
        document.getElementById(this.div.id + "NextDivEnd").style.visibility = "hidden";
        document.getElementById(this.div.id + "NextDiv").style.visibility = "hidden";
        for (var i = 0; i < this.ButtonNumber; i++) {
            document.getElementById(this.div.id + "NextDiv" + i).style.visibility = "hidden";
        }
    } catch (e) {
        __openbexi_debugC("openbexi_pager.prototype.hide()", "Exception:" + e.message);
    }
}
openbexi_pager.prototype.display = function() {
    try {
        document.getElementById(this.div.id).style.visibility = "visible";
        document.getElementById(this.div.id + "PreviousDivBegin").style.visibility = "visible";
        document.getElementById(this.div.id + "PreviousDiv").style.visibility = "visible";
        document.getElementById(this.div.id + "NextDivEnd").style.visibility = "visible";
        document.getElementById(this.div.id + "NextDiv").style.visibility = "visible";
        for (var i = 0; i < this.ButtonNumber; i++) {
            document.getElementById(this.div.id + "NextDiv" + i).style.visibility = "visible";
        }
    } catch (e) {
        __openbexi_debugC("openbexi_pager.prototype.display()", "Exception:" + e.message);
    }
}
openbexi_pager.prototype.update = function(ob_doc) {
    try {
        if (this.pager_number == undefined || this.pager_number == "" || this.pager_number == "none") this.pager_number = "0";
        if (this.pager_number == "previousBegin") this.pager_number = "0";
        if (this.pager_number == "nextEnd")
            this.pager_number = parseInt(this.objectMaxCount) / parseInt(this.maxItems);

        this.posCurrentItem = parseInt(this.pager_number) * parseInt(this.maxItems);

        ob_doc = set_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "list", "posCurrentItem", this.posCurrentItem);
        ob_doc = set_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "pager", "number", this.pager_number);
    } catch (e) {
        __openbexi_debugC("openbexi_pager.prototype.update()", "Exception:" + e.message);
    }
    return ob_doc;
}
openbexi_pager.prototype.setup = function(ob_doc) {
    try {
        this.ob_doc = ob_doc;
        this.subtype = get_xml_classe_object_attribut_value(ob_doc, "ob_request", "request", "subtype");
        if (this.subtype == "delete_webProjects" || this.subtype == "create_webProjects")this.subtype = "webProjects";
        if (this.subtype == "delete_webPages" || this.subtype == "create_webPagess")this.subtype = "webPages";
        this.path = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "dir", "path");
        this.fileName = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "dir", "filename");
        this.objectCount = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file", "objectCount");
        this.objectMaxCount = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file", "objectMaxCount");
        this.path = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "dir", "path");
        this.maxItems = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "list", "maxItems");
        this.posCurrentItem = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "list", "posCurrentItem");
        this.nextPreviousStatus = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "list", "nextPreviousStatus");
        this.nextFlag = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "list", "nextFlag");
        this.previousFlag = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "list", "previousFlag");
        this.pager_number = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "pager", "number");
        // Turn to green the current button number
        if (this.pager_number == "")this.pager_number = "0";
        for (i = 0; i < this.ButtonNumber; i++) {
            if (parseInt(this.pager_number) == i)
                document.getElementById(this.div.id + "NextDiv" + i).style.background = "#C2C0C0";
            else
                document.getElementById(this.div.id + "NextDiv" + i).style.background = "white";
            document.getElementById(this.div.id + "NextDiv" + i).style.visibility = "hidden";
        }
        // Update button rank according posCurrentItem
        var maxRank = (parseInt(this.objectMaxCount) - 1) / parseInt(this.maxItems);
        var endRank = parseInt(this.posCurrentItem) / parseInt(this.maxItems);
        var begingRank = 0;
        if (endRank >= parseInt(this.ButtonNumber)) {
            begingRank = endRank - parseInt(this.ButtonNumber) + 1;
        }
        var count = begingRank;
        var end = parseInt(this.ButtonNumber);
        if (parseInt(maxRank) < end) {
            end = parseInt(maxRank) + 1;
        }
        for (var i = 0; i < end; i++) {
            var statustext = document.createTextNode(count);
            document.getElementById(this.div.id + "NextDiv" + i).removeChild(document.getElementById(this.div.id + "NextDiv" + i).childNodes[0]);
            document.getElementById(this.div.id + "NextDiv" + i).appendChild(statustext);
            document.getElementById(this.div.id + "NextDiv" + i).style.visibility = "visible";
            document.getElementById(this.div.id + "NextDiv" + i).number = count;
            count++;
        }
    } catch (e) {
        __openbexi_debugC("openbexi_pager.prototype.setup()", "Exception:" + e.message);
    }
}
openbexi_pager.prototype.getText = function() {
    return this.genericObject.getText();
}
openbexi_pager.prototype.pasteText_or_Link = function() {
}
openbexi_pager.prototype.getPopupAttributes = function() {
    return this.popupAttributes;
}
openbexi_pager.prototype.getInspectorAttributes = function() {
    return this.inspectorAttributes;
}
openbexi_pager.prototype.setSelected = function(objId) {
    this.genericObject.setSelected(objId, true);
}
openbexi_pager.prototype.setUnSelected = function(objId) {
    this.genericObject.setUnSelected(objId);
}
openbexi_pager.prototype.getChildrenId = function() {
    return this.genericObject.getChildrenId();
}
openbexi_pager.prototype.setAttribute = function(name, value) {
    return this.genericObject.setAttribute(this.getChildrenId(), name, value);
}
openbexi_pager.prototype.setURL = function(objId, eventStr, URL) {
    this.genericObject.setURL(objId, eventStr, URL);
}
openbexi_pager.prototype.unsetURL = function(objId, eventStr, URL) {
    this.genericObject.unsetURL(objId, eventStr, URL);
}
openbexi_pager.prototype.disableURLs = function() {
    this.genericObject.disableURLs();
}
openbexi_pager.prototype.enableURLs = function() {
    this.genericObject.enableURLs();
}
openbexi_pager.prototype.getSrc = function() {
    return "";
}
openbexi_pager.prototype.getURL = function(objId, eventStr) {
    return this.genericObject.getURL(objId, eventStr);
}
openbexi_pager.prototype.innerHTML_and_EVENTS = function(objId) {
    return document.getElementById(objId).innerHTML;
}
openbexi_pager.prototype.changeStyle = function(objBexi, direction) {
    this.genericObject.changeStyle(objBexi, this,direction);
}
openbexi_pager.prototype.removeObject = function() {
    ob_remove_pagers(this.id);
    this.genericObject.removeObject(this);
}
openbexi_pager.prototype.add_function = function(protocole, functionName, ob_doc) {
    if (this.genericObject != null) this.genericObject.add_function(protocole, functionName, ob_doc);
}
openbexi_pager.prototype.my_PickFunc = function(e) {
    openbexi_stopEventPropagation(e);
    var bexiObj = getSelectedBexiObj(this.id);
    my_PickFunc(bexiObj.div);
}
openbexi_pager.prototype.get_editor = function() {
    return this.genericObject.get_editor(this.getPopupAttributes());
}
openbexi_pager.prototype.forward = function() {
    if (ob_canvas != null && getSelectedBexiObj(this.div.id).parentNodeId != "BODY")   ob_canvas.clear();
    openbexi_reset_all_z(this.div, "+");
}
openbexi_pager.prototype.backward = function() {
    if (ob_canvas != null && getSelectedBexiObj(this.div.id).parentNodeId != "BODY")   ob_canvas.clear();
    openbexi_reset_all_z(this.div, "-");
}
openbexi_pager.prototype.debug = function() {
    return this.genericObject.debug(this);
}
openbexi_pager.prototype.align_left_auto_arrange = function() {
    return this.genericObject.align_left_auto_arrange(this);
}
openbexi_pager.prototype.align_right_auto_arrange = function() {
    return this.genericObject.align_right_auto_arrange(this);
}
openbexi_pager.prototype.align_top_auto_arrange = function() {
    return this.genericObject.align_top_auto_arrange(this);
}
openbexi_pager.prototype.align_bottom_auto_arrange = function() {
    return this.genericObject.align_bottom_auto_arrange(this);
}
openbexi_pager.prototype.vertical_width_auto_resize = function() {
    return this.genericObject.vertical_width_auto_resize(this);
}
openbexi_pager.prototype.vertical_height_auto_resize = function() {
    return this.genericObject.vertical_height_auto_resize(this);
}
openbexi_pager.prototype.horizontal_width_auto_resize = function() {
    return this.genericObject.horizontal_width_auto_resize(this);
}
openbexi_pager.prototype.horizontal_height_auto_resize = function() {
    return this.genericObject.horizontal_height_auto_resize(this);
}
openbexi_pager.prototype.vertical_spacing_auto_arrange = function() {
    return this.genericObject.vertical_spacing_auto_arrange(this);
}
openbexi_pager.prototype.horizontal_spacing_auto_arrange = function() {
    return this.genericObject.horizontal_spacing_auto_arrange(this);
}
openbexi_pager.prototype.undo_auto_arrange = function() {
    return this.genericObject.undo_auto_arrange(this);
}
openbexi_pager.prototype.redo_auto_arrange = function() {
    return this.genericObject.redo_auto_arrange(this);
}
openbexi_pager.prototype.functions_to_load = function() {
    return this.genericObject.functions_to_load(this.div.id);
}
openbexi_pager.prototype.head_code = function() {
    return this.genericObject.head_code(this);
}
openbexi_pager.prototype.body_code = function() {
    return this.genericObject.body_code(this);
}
