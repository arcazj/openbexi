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
 */

function openbexi_websocket_CB() {
    var ob_doc = openbexi_get_documentElement(responseXML, "text/xml");
    var status = get_xml_classe_object_attribut_value(ob_doc, "openbexi_creative", "application", "status");
    var widget_id = get_xml_classe_object_attribut_value(doc, "ob_request", "websocket", "widget_id");
    var hostname = get_xml_classe_object_attribut_value(doc, widget_id, "websocket", "hostname");
    var port = get_xml_classe_object_attribut_value(doc, widget_id, "websocket", "port");
    var username = get_xml_classe_object_attribut_value(doc, widget_id, "websocket", "username");
    var passwd = get_xml_classe_object_attribut_value(doc, widget_id, "websocket", "passwd");
    var jws_request_type = get_xml_classe_object_attribut_value(doc, widget_id, "websocket", "jws_request_type", jws_request_type);
    var object = get_xml_classe_object_attribut_value(doc, widget_id, "websocket", "object", object);
    if (status != "ok") {
    }
}

function openbexi_websocket(widget_id, widget_type, hostname, port, username, passwd, jws_request_type, object, call_back) {
    var doc = null;
    doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_websocketRequest");
    doc = set_xml_classe_object_attribut_value(doc, "ob_request", "websocket", "widget_id", widget_id);
    doc = set_xml_classe_object_attribut_value(doc, widget_id, "websocket", "widget_type", widget_type);
    doc = set_xml_classe_object_attribut_value(doc, widget_id, "websocket", "hostname", hostname);
    doc = set_xml_classe_object_attribut_value(doc, widget_id, "websocket", "port", port);
    doc = set_xml_classe_object_attribut_value(doc, widget_id, "websocket", "username", username);
    doc = set_xml_classe_object_attribut_value(doc, widget_id, "websocket", "passwd", passwd);
    doc = set_xml_classe_object_attribut_value(doc, widget_id, "websocket", "jws_request_type", jws_request_type);
    doc = set_xml_classe_object_attribut_value(doc, widget_id, "websocket", "object", object);
    var ob_xml = openbexi_get_xmlString(doc);
    try {
        var mode_sync = openbexi_synchron();
        if (call_back == null || call_back == undefined)
            return openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_websocket_CB, null);
        else
            return openbexi_connect_to_server(null, mode_sync, ob_xml, call_back, null);
    } catch(e) {
        this.status("Sorry, not connected ...", "red");
        return null;
    }
}
