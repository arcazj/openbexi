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

 Note:
 OPEN OPENBEXI htmlbuilder uses ActiveWidgets Grid 1.0.0 (GNU General Public License).
 OPEN OPENBEXI htmlbuilder uses FCKeditor 2.3 (GNU General Public License).
 OPEN OPENBEXI htmlbuilder uses the DHTML libraries from www.walterzorn.com for resizing and dragging pictures and layers (LGPL).
 */
var ob_directory;
var ob_div_id;
var ob_css_text;
var ob_text_regex_filter;
var ob_lighting_selection;
var ob_lighting_selection_color;

function replaceAll(txt, replace, with_this) {
    return txt.replace(new RegExp(replace, 'g'), with_this);
}

function ob_file_open_CB(responseXML) {
    try {
        if (responseXML == null || responseXML == "") {
            return;
        }
        var doc = openbexi_get_documentElement(responseXML, "text/xml");
        var filename = get_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filename");
        var div_id = get_xml_classe_object_attribut_value(doc, "ob_explorer", "gui", "divName");
        var text = get_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "text");
        if (document.getElementById(div_id)) {
            document.getElementById(div_id).style.overflow = "auto";
            document.getElementById(div_id).innerHTML = text;
        }

    } catch (e) {
    }
}
function ob_file_open(filename) {
    var doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_readFILERequest");
    doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filename", filename);
    doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "path", ob_directory);
    doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "gui", "divName", ob_div_id);
    doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "ob_css_text", ob_css_text);
    doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "text_regex_filter", ob_text_regex_filter);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "ob_lighting_selection", ob_lighting_selection);
    doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "ob_lighting_selection_color", ob_lighting_selection_color);

    var ob_xml = openbexi_get_xmlString(doc);

    var mode_sync = openbexi_synchron();

    openbexi_connect_to_server(null, mode_sync, ob_xml, ob_file_open_CB, null);
}
function ob_file_viewer_CB(responseXML) {
    try {
        if (responseXML == null || responseXML == "") {
            return;
        }
        doc = openbexi_get_documentElement(responseXML, "text/xml");
        var status = get_xml_classe_object_attribut_value(doc, "ob_explorer", "status", "text");
        var appli_status = get_xml_classe_object_attribut_value(doc, "openbexi_creative", "application", "status");
        var exception = get_xml_classe_object_attribut_value(doc, "openbexi_creative", "application", "exception");
        var file_count = get_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "objectCount");
        var ob_end = 0;
        if (file_count != "")
            ob_end = parseInt(file_count);
        ob_div_id = get_xml_classe_object_attribut_value(doc, "ob_explorer", "gui", "divName");
        var html_code = get_xml_classe_object_attribut_value(doc, "ob_explorer", "request", "html_code");
        ob_directory = get_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "path");
        ob_css_text = get_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "css_text");
        ob_text_regex_filter = get_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "text_regex_filter");
        ob_lighting_selection = get_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "lighting_selection");
        ob_lighting_selection_color = get_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "lighting_selection_color");

        var name;
        document.getElementById(ob_div_id).innerHTML ="";
        for (var j = 0; j < ob_end; j++) {
            try {

                name = get_xml_classe_object_attribut_value(doc, "ob_explorer", "file_" + j, "filename");
                if (document.getElementById(ob_div_id))
                    document.getElementById(ob_div_id).innerHTML += html_code.replace("$output", "onclick=ob_file_open(\'" + name + "\')").replace("$output", name);

            } catch (e) {
                alert(e);
            }
        }

    } catch (e) {
    }
}
function ob_file_viewer(widget_id, div_id, directory, filter, html_code, css_text, text_regex_filter,lighting_selection,lighting_selection_color) {
    //Variable declaration and initialization
    var doc;

    //Body: Javascript code
    try {

        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_ExplorerRequest");
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "subtype", "local");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filter", filter);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "filter", "");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "path", directory);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "type", "");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filename", "");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "maxItems", 9999);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "posCurrentItem", 0);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "nextPreviousStatus", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "pager", "number", 0);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "gui", "divName", div_id);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "request", "html_code", html_code);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "css_text", css_text);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "text_regex_filter", text_regex_filter);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "lighting_selection", lighting_selection);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "lighting_selection_color", lighting_selection_color);

        var ob_xml = openbexi_get_xmlString(doc);

        var mode_sync = openbexi_synchron();

        openbexi_connect_to_server(null, mode_sync, ob_xml, ob_file_viewer_CB, null);
    } catch (e) {
    }
}