/* This notice must be untouched at all times.
 
Copyright (c) 2005-2011 JC Arcaz. All rights reserved.
 OPEN OPENBEXI HTML Builder for generating dynanic HTML page and html code source from browsers.
updated: Janvier 03  2011 version 3.1
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
 */
 
function ob_form_submit( widget_id, widget_type, query, query_type, database_driver, database_url, database_user, database_passwd, action ) {
    //Variable declaration and initialization
    var lang = "";
    var pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
    if (pageDoc == null || database_url == null || database_url == "")
        lang = get_xml_classe_object_attribut_value(pageDoc, "url", widget_id, "lang");
    if (lang == "") lang = "en";
    _CURRENT_OPENBEXI_LANGUAGE = "en";
 
    var parentId = null;
    var parentType = null;
    var table = null;
    var formInputs = null;
    var pager_obj = null;
 
    try {
        //Body: Javascript code
        if (action == "") action = "Edit";
        if (action == "New" || action == "Search" || action == "Add" || action == "Delete" || action == "Submit" || action == "Update") {
            parentId = get_xml_classe_object_attribut_value(pageDoc, "page", widget_id, "parentId");
            parentType = get_xml_classe_object_attribut_value(pageDoc, "page", widget_id, "parentType");
            table = get_xml_classe_object_attribut_value(pageDoc, "url", widget_id, "table");
            if (table == "")table = get_xml_classe_object_attribut_value(pageDoc, "url", parentId, "table");
            formInputs = document.getElementById(parentId).getElementsByTagName("input");
            if (formInputs == null)return;
        }
        if (action == "New") {
            for (var m = 0; m < formInputs.length; m++) {
                var occur = formInputs[m].name.match(table + ".");
                if (occur != null) {
                    formInputs[m].value = "";
                }
            }
        }
        if (action == "Search") {
            pager_obj = document.getElementById(parentId + "_pager");
            query = openbexi_getSearchSQLQuery(parentId, widget_id);
            if (query == null) {
                if (document.getElementById("messageBox_" + parentId) != undefined)document.getElementById("messageBox_" + parentId).innerHTML = "<B>" + "Cannot search this item, SQL or natural language request error" + "</B>"
                return;
            }
            action = "pager";
            if (document.getElementById("messageBox_" + parentId) != undefined)document.getElementById("messageBox_" + parentId).innerHTML = "<B>" + "Searching ..." + "</B>"
        }
        if (action == "Delete") {
            pager_obj = document.getElementById(parentId + "_pager");
            query = openbexi_getDeleteSQLQuery(parentId, widget_id);
            if (query == null) {
                if (document.getElementById("messageBox_" + parentId) != undefined)document.getElementById("messageBox_" + parentId).innerHTML = "<B>" + "Cannot delete this item, SQL or natural language request error" + "</B>"
                return;
            }
            if (document.getElementById("messageBox_" + parentId) != undefined)document.getElementById("messageBox_" + parentId).innerHTML = "<B>" + "Deleting ..." + "</B>"
 
        }
        if (action == "Add") {
            pager_obj = document.getElementById(parentId + "_pager");
            query = openbexi_getAddSQLQuery(parentId, widget_id);
            if (query == null) {
                if (document.getElementById("messageBox_" + parentId) != undefined)document.getElementById("messageBox_" + parentId).innerHTML = "<B>" + "Cannot add this item, SQL or natural language request error" + "</B>"
                return;
            }
            if (document.getElementById("messageBox_" + parentId) != undefined)document.getElementById("messageBox_" + parentId).innerHTML = "<B>" + "Inserting ..." + "</B>"
        }
        if (action == "Submit" || action == "Update") {
            pager_obj = document.getElementById(parentId + "_pager");
            query = openbexi_getUpdateSQLQuery(parentId, widget_id);
            if (query == null) {
                if (document.getElementById("messageBox_" + parentId) != undefined)document.getElementById("messageBox_" + parentId).innerHTML = "<B>" + "Cannot update this item, SQL or natural language request error" + "</B>"
                return;
            }
            if (document.getElementById("messageBox_" + parentId) != undefined)document.getElementById("messageBox_" + parentId).innerHTML = "<B>" + "Updating ..." + "</B>"
        }
        if (action == "Edit") {
            pager_obj = document.getElementById(widget_id + "_pager");
            query = openbexi_getEditSQLQuery(parentId, widget_id);
            if (query == null) {
                if (document.getElementById("messageBox_" + widget_id) != undefined)document.getElementById("messageBox_" + widget_id).innerHTML = "<B>" + "Cannot edit this page, SQL or natural language request error" + "</B>"
                if (document.getElementById("messageBox_" + parentId) != undefined)document.getElementById("messageBox_" + parentId).innerHTML = "<B>" + "Cannot edit this page, SQL or natural language request error" + "</B>"
                return;
            }
            if (document.getElementById("messageBox_" + widget_id) != undefined)document.getElementById("messageBox_" + widget_id).innerHTML = "<B>" + "Editing ..." + "</B>"
            if (document.getElementById("messageBox_" + parentId) != undefined)document.getElementById("messageBox_" + parentId).innerHTML = "<B>" + "Editing ..." + "</B>"
        }
        if (pager_obj) {
            pager_obj = new openbexi_pager(null, pager_obj, widget_id + "_pager", "0px", "2px", "25px", "15px", "23px", 10, "static");
            pager_obj.posCurrentItem = 0;
            pager_obj.widget_id = widget_id;
            pager_obj.widget_type = widget_type;
            pager_obj.query = query;
            pager_obj.driver = database_driver;
            pager_obj.url = database_url;
            pager_obj.user = database_user;
            pager_obj.passwd = database_passwd;
            pager_obj.maxItems = 1;
        }
        if (action != "New")
            setTimeout(function() {
                openbexi_LNRequest(null, null, widget_id, widget_type, null, null, action, null, null, query, query_type, database_driver, database_url, database_user, database_passwd, null, "false");
            }, 10);
    }
    catch   (e)
    {
        alert("Not connected to database")
    }
}
