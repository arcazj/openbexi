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
 
function ob_testing( widget_id, widget_source, widget_target, width ) {
    //Variable declaration and initialization
    var lang = "";
    var pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
    var privateDoc = openbexi_get_documentElement(OPENBEXI_PRIVATE_CONTEXT_XML, "text/xml");
    if (pageDoc == null)
        lang = get_xml_classe_object_attribut_value(pageDoc, "url", widget_target, "lang");
    if (lang == "") lang = "en";
    _CURRENT_OPENBEXI_LANGUAGE = "en";
 
    pageDoc = set_xml_classe_object_attribut_value(pageDoc, "bexicontext", "language", "name", "en");
    pageDoc = set_xml_classe_object_attribut_value(pageDoc, "ob_request", "request", "type", "openbexi_TestRequest");
    pageDoc = set_xml_classe_object_attribut_value(pageDoc, "ob_request", "request", "test_name", test_name);
    pageDoc = set_xml_classe_object_attribut_value(pageDoc, "ob_request", test_name, widget_source, widget_source);
    pageDoc = set_xml_classe_object_attribut_value(pageDoc, "ob_request", test_name, widget_target, widget_target);
    pageDoc = set_xml_classe_object_attribut_value(pageDoc, "ob_explorer", "list", "maxItems", "15");
    pageDoc = set_xml_classe_object_attribut_value(pageDoc, "ob_explorer", "list", "posCurrentItem", "0");
    pageDoc = set_xml_classe_object_attribut_value(pageDoc, "ob_explorer", "list", "nextPreviousStatus", "none");
 
    var bexiType = get_xml_classe_object_attribut_value(pageDoc, "page", widget_target, "type");
    var subtype = get_xml_classe_object_attribut_value(pageDoc, "page", widget_target, "subtype");
    var parentId = get_xml_classe_object_attribut_value(pageDoc, "page", widget_target, "parentId");
    var url = get_xml_classe_object_attribut_value(privateDoc, "ob_database", "databaseCurrent", "url");
    var user = get_xml_classe_object_attribut_value(privateDoc, "ob_database", "databaseCurrent", "user");
    var passwd = get_xml_classe_object_attribut_value(privateDoc, "ob_database", "databaseCurrent", "passwd");
    var driver = get_xml_classe_object_attribut_value(privateDoc, "ob_database", "databaseCurrent", "driver");
 
 
    pageDoc = set_xml_classe_object_attribut_value(pageDoc, "ob_request", "object", "id", widget_target);
    pageDoc = set_xml_classe_object_attribut_value(pageDoc, "ob_request", "object", "type", bexiType);
 
    var ob_xml = openbexi_get_xmlString(pageDoc);
 
    var pager_obj = document.getElementById(widget_target + "_pager");
    if (pager_obj) pager_obj = new openbexi_pager(null, pager_obj, widget_target + "_pager", "0px", "2px", "25px", "15px", "23px", 10, "static");
    pager_obj.posCurrentItem = 0;
    pager_obj.widget_id = widget_target;
    pager_obj.widget_type = bexiType;
    pager_obj.query = "select * from page";
    pager_obj.driver = driver;
    pager_obj.url = url;
    pager_obj.user = user;
    pager_obj.passwd = passwd;
 
    //Body: Javascript code
    var mode_sync = false;
    if (bexiType == "openbexi_list") {
        openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_List_CB);
    } else   if (bexiType == "openbexi_dojo") {
        if (subtype == "dojox.grid.Grid")
            openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_dojoGrid_CB);
    } else   if (bexiType == "openbexi_dojo_editor") {
        openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_FCK_editor_CB);
    } else   if (bexiType == "openbexi_form" || parentType == "openbexi_form") {
        openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_Form_CB);
    } else
        return;
}
}
