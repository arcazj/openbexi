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
var countJAVAtest = 0;
function ob_java_function(widget_id, triggerId, targetId, packageName, className, functionName) {
    //Variable declaration and initialization
    var lang = "";
    var pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
    if (pageDoc == null)
        lang = get_xml_classe_object_attribut_value(pageDoc, "url", triggerId, "lang");
    if (lang == "") lang = "en";
    _CURRENT_OPENBEXI_LANGUAGE = "en";
    var widget_type = openbexi_getPageData(pageDoc, "page", targetId, "type");

    //Body: Javascript code
    openbexi_updatePageData(pageDoc, "ob_request", "request", "type", "openbexi_functionJavaRequest");
    openbexi_updatePageData(pageDoc, "ob_request", "request", "packageName", packageName);
    openbexi_updatePageData(pageDoc, "ob_request", "request", "className", className);
    openbexi_updatePageData(pageDoc, "ob_request", "request", "functionName", functionName);
    openbexi_updatePageData(pageDoc, "ob_request", "request", "parameter_count", "1");
    openbexi_updatePageData(pageDoc, "ob_request", "request", "parameter_0", "testing message:" + countJAVAtest++);
    openbexi_updatePageData(pageDoc, "ob_request", "request", "targetId", targetId);

    try {
        if (widget_type == "openbexi_dojo_editor") {
            openbexi_connect_to_server(null, false, pageDoc, openbexi_DOJOEditor_CB);
        } else {
            alert("Sorry, feature not implemented for " + bexiType);
        }
    } catch (e) {
        alert("Not connected to database");
    }
}
