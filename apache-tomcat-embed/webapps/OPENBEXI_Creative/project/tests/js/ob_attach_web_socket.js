/* This notice must be untouched at all times.

 Copyright (c) 2005-2011 JC Arcaz. All rights reserved.
 OPEN OPENBEXI HTML Builder for generating dynanic HTML page and html code source from browsers.
 updated: July 23  2011 version 3.2
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

//var js = document.createElement('script');
//js.setAttribute("type", "text/javascript");
//document.getElementsByTagName("head")[0].appendChild(js);

var lRes;
function OnMessage4_web_page_CB(event) {

}
var ob_line_max = 100;
function OnMessage4_dojo_editor_CB(widget_id, event) {
    try {
        if (event.data == undefined) return;

        if (document.getElementById(widget_id).editor_tmp_count > ob_line_max) {
            document.getElementById(widget_id).editor_tmp_count = 0;
            document.getElementById(widget_id).editor_tmp = document.getElementById(widget_id).editor_tmp2;
            document.getElementById(widget_id).editor_tmp2 = "";
            document.getElementById(widget_id).innerHTML = "";
        } else {
            document.getElementById(widget_id).editor_tmp = document.getElementById(widget_id).innerHTML;
            document.getElementById(widget_id).editor_tmp2 = "<b>" + "<font style='color:black'>" + event.data + "</b><br/>" + document.getElementById(widget_id).editor_tmp2;
            document.getElementById(widget_id).editor_tmp_count++;
        }
        document.getElementById(widget_id).innerHTML = "<b>" + "<font style='color:black'>" + event.data + "</b><br/>" + document.getElementById(widget_id).editor_tmp;
    } catch(e) {
        __openbexi_debugC("openbexi_add_javascript() Exception:" + e.message);
    }
}
function OnMessage4_list_CB(widget_id, event) {
    try {
        if (event.data == undefined) return;
        var list_id = document.getElementById(widget_id).childNodes[1].id;
        var listChild = document.getElementById(list_id).children;
        for (var j = listChild.length - 1; j > 0; j--) {
            listChild[j].innerHTML = listChild[j - 1].innerHTML;
        }
        listChild[0].innerHTML = event.data;
        list_id = null;
        listChild = null;
    } catch(e) {
        __openbexi_debugC("openbexi_add_javascript() Exception:" + e.message);
    }
}
function OnMessage4_timeline_CB(widget_id, event) {
    var mine = "xml";
    var ob_eventSource;
    try {
        if (event.data == undefined) return;
        //alert(event.data)
        ob_eventSource = local_timeline.timeline.getBand(0).getEventSource();
        if (mine == "json_data") {
            ob_eventSource.clear();
            local_timeline.timeline.loadJSON(event.data, function(json, url) {
                ob_eventSource.loadXML(json, url);
            });
        } else if (mine == "xml_data") {
            ob_eventSource.clear();
            local_timeline.timeline.loadXML(event.data, function(xml, url) {
                ob_eventSource.loadXML(xml, url);
            });
        } else {
            ob_eventSource.clear();
            local_timeline.timeline.loadXML(event.data, function(xml, url) {
                ob_eventSource.loadXML(xml, url);
            });
        }

    } catch(e) {
        __openbexi_debugC("openbexi_add_javascript() Exception:" + e.message);
    }
    ob_eventSource = null;
    mine = null;
}
function openbexi_get_ws_document(widget_id, widget_type, URL, username, passwd, jws_request_type, retriever_host, retriever_port, retriever_object, retriever_polling) {
    var doc = set_xml_classe_object_attribut_value(null, "ob_request", "websocket", "widget_id", widget_id);
    doc = set_xml_classe_object_attribut_value(doc, widget_id, "websocket", "widget_type", widget_type);
    doc = set_xml_classe_object_attribut_value(doc, widget_id, "websocket", "URL", URL);
    doc = set_xml_classe_object_attribut_value(doc, widget_id, "websocket", "retriever_host", retriever_host);
    doc = set_xml_classe_object_attribut_value(doc, widget_id, "websocket", "username", username);
    doc = set_xml_classe_object_attribut_value(doc, widget_id, "websocket", "passwd", passwd);
    doc = set_xml_classe_object_attribut_value(doc, widget_id, "websocket", "jws_request_type", jws_request_type);
    doc = set_xml_classe_object_attribut_value(doc, widget_id, "websocket", "retriever_object", retriever_object);
    doc = set_xml_classe_object_attribut_value(doc, widget_id, "websocket", "retriever_port", retriever_port);
    doc = set_xml_classe_object_attribut_value(doc, widget_id, "websocket", "retriever_polling", retriever_polling);
    return openbexi_get_xmlString(doc);
}
function logon(widget_id, widget_type, URL, username, passwd, jws_request_type, retriever_host, retriever_port, retriever_object, retriever_polling) {
    ob_websocket_msg(widget_id, widget_type, "Connecting to the OpenBEXI websocket server ...");

    if ('WebSocket' in window) {
        document.getElementById(widget_id).ws = new WebSocket(URL);
    } else if ('MozWebSocket' in window) {
        document.getElementById(widget_id).ws = new MozWebSocket(URL);
    } else {
        alert('WebSocket is not supported by this browser.');
        return;
    }
    document.getElementById(widget_id).ws.onopen = function () {
        document.getElementById(widget_id).ws.send(openbexi_get_ws_document(widget_id, widget_type, URL, username, passwd, jws_request_type, retriever_host, retriever_port, retriever_object, retriever_polling));
    };
    document.getElementById(widget_id).ws.onmessage = function (event) {
        document.getElementById(widget_id).editor_total_count++;
        if (widget_type == "openbexi_DOJO_editor")
            OnMessage4_dojo_editor_CB(widget_id, event);
        else if (widget_type == "openbexi_list")
            OnMessage4_list_CB(widget_id, event);
        else if (widget_type == "openbexi_timeline")
                OnMessage4_timeline_CB(widget_id, event);
            else
                OnMessage4_web_page_CB(event);
    };
    document.getElementById(widget_id).ws.onclose = function () {
    };
}
function ob_closing_web_socket(widget_id, widget_type) {
    // request to server

    if (!document.getElementById(widget_id).jWebSocketClient.isConnected()) {
        lRes = "ERROR: Unknown request type ...";
        ob_websocket_msg(widget_id, widget_type, lRes);
    }

    if (lRes.msg != "Ok") {
        ob_websocket_msg(widget_id, widget_type, "ERROR: Not connected ...");
    }
}
function ob_websocket_msg(widget_id, widget_type, msg) {
    if (widget_type == "openbexi_DOJO_editor")
        document.getElementById(widget_id).innerHTML = "<b>" + "<font style='color:RED'>" + msg + "</b><br/>";
    else if (widget_type == "openbexi_list") {
        var list_id = document.getElementById(widget_id).childNodes[1].id;
        var listChild = document.getElementById(list_id).children;
        listChild[0].innerHTML = "<b>" + "<font style='color:RED'>" + msg + "</b><br/>";
    } else if (widget_type == "openbexi_timeline") {
    }

}

function ob_exitPage(widget_id, widget_type) {
    try {
        if (document.getElementById(widget_id).ws != null) {
            document.getElementById(widget_id).ws.close();
            document.getElementById(widget_id).ws = null;
        }
        ob_websocket_msg(widget_id, widget_type, document.getElementById(widget_id).username + " has been disconnected from the server ... .");

    } catch(e) {
        //alert("cannot close properly " + widget_id);
    }
}
function ob_attach_web_socket(widget_id, widget_type, URL, username, passwd, jws_request_type, retriever_host, retriever_port, retriever_object, retriever_polling) {
    //Variable declaration and initialization
    ob_websocket_msg(widget_id, widget_type, "Connecting to the OpenBEXI websocket server ...");

    //Init parameter
    document.getElementById(widget_id).jWebSocketClient = null
    document.getElementById(widget_id).editor_tmp = null;
    document.getElementById(widget_id).editor_tmp_count = 0;
    document.getElementById(widget_id).editor_total_count = 0;
    document.getElementById(widget_id).username = username;
    document.getElementById(widget_id).widget_type = widget_type;
    if (URL == null || URL == "" || URL == undefined) URL = "ws://localhost:8080/OPENBEXI_Creative/openbexi_RealTime.do";
    document.getElementById(widget_id).URL = URL;
    document.getElementById(widget_id).retriever_host = retriever_host;
    document.getElementById(widget_id).retriever_port = retriever_port;
    document.getElementById(widget_id).retriever_polling = retriever_polling;
    document.getElementById(widget_id).already_processed = false;

    //Body: Javascript code
    if (passwd == undefined)passwd = "";
    logon(widget_id, widget_type, URL, username, passwd, jws_request_type, retriever_host, retriever_port, retriever_object, retriever_polling);
}