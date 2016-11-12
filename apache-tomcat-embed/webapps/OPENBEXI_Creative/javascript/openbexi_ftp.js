/* This notice must be untouched at all times.

Copyright (c) 2005-2013 JC Arcaz. All rights reserved.
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

var _no_name_dojo_editor0_jWebSocketClient = null
var ob_no_name_dojo_editor0_tmp ;
var ob_no_name_dojo_editor0_tmp2;
var ob_no_name_dojo_editor0_tmp_count = 0;

var js = document.createElement('script');
js.setAttribute("type", "text/javascript");
js.setAttribute("src", "jWebSocketClient/res/js/jWebSocket.js");
document.getElementsByTagName("head")[0].appendChild(js);

function OnMessage4_no_name_dojo_editor0_CB(widget_id, aEvent, aToken) {
    if (aToken.time == undefined) return;
    var ob_line_max = 25;
    var text = "<b>" + "<font style='color:green'>" + aToken.time + "</b><br/>";

    if (ob_no_name_dojo_editor0_tmp_count > ob_line_max) {
        ob_no_name_dojo_editor0_tmp_count = 0;
        ob_no_name_dojo_editor0_tmp = ob_no_name_dojo_editor0_tmp2;
        ob_no_name_dojo_editor0_tmp2 = "";
    } else {
        ob_no_name_dojo_editor0_tmp = document.getElementById(widget_id).innerHTML;
        ob_no_name_dojo_editor0_tmp2 = text + ob_no_name_dojo_editor0_tmp2;
        ob_no_name_dojo_editor0_tmp_count++;
    }
    document.getElementById(widget_id).innerHTML = text + ob_no_name_dojo_editor0_tmp;
}

function ob_attach_web_socket( widget_id, widget_type, port, username, passwd, jws_request_type, object ) {
    //Variable declaration and initialization

    var lURL = "ws://localhost:" + port;

    if (jws.browserSupportsWebSockets()) {
        _no_name_dojo_editor0_jWebSocketClient = new jws.jWebSocketJSONClient();
    }
    //Body: Javascript code
    var lRes = _no_name_dojo_editor0_jWebSocketClient.logon(lURL, username, passwd, {
        // OnOpen callback
        OnOpen: function(aEvent) {
        },
        // OnMessage callback
        OnMessage: function(aEvent, aToken) {
            if (widget_type == "openbexi_dojo_editor") OnMessage4_no_name_dojo_editor0_CB(widget_id, aEvent, aToken);
        },
        // OnClose callback
        OnClose: function(aEvent) {
        }
    });

    // request to server
    if (_no_name_dojo_editor0_jWebSocketClient.isConnected()) {
        if (request_type == "requestServerTime")
            lRes = _no_name_dojo_editor0_jWebSocketClient.requestServerTime();
        else if (request_type == "processComplexObject") {
            var lToken = {
                ns: jws.SamplesPlugIn.NS,
                type: "processComplexObject",
                widget_id: widget_id,
                widget_type: widget_type,
                object: {
                }
            };
            _no_name_dojo_editor0_jWebSocketClient.sendToken(lToken, {});
        } else if (request_type == "broadcast") {
            lRes = _no_name_dojo_editor0_jWebSocketClient.broadcastText(
                    ob_object.client, // broadcast to all clients (not limited to a certain pool)
                    ob_object.msg    // broadcast this message
                    );
        } else if (request_type == "sampleListener") {
            lToken = {
                ns: ob_object.name_space,
                type: ob_object.Info
            };
            _no_name_dojo_editor0_jWebSocketClient.sendToken(lToken, {
                OnResponse: function(aToken) {
                    if (widget_type == "openbexi_dojo_editor") OnMessage4_no_name_dojo_editor0_CB(widget_id, aEvent, aToken);
                }
            });
        } else if (request_type == "jdbcSelect") {
            lRes = _no_name_dojo_editor0_jWebSocketClient.jdbcSelect({
                table    : ob_object.table,
                fields    : ob_object.fields,
                order    : ob_object.order,
                where    : ob_object.where,
                group    : ob_object.group,
                having    : ob_object.having
            });
        } else if (request_type == "loadFile") {
            lRes = _no_name_dojo_editor0_jWebSocketClient.fileLoad(ob_object.filename, {});
        } else if (request_type == "saveFile") {
            lRes = _no_name_dojo_editor0_jWebSocketClient.fileSave(ob_object.filename, {});
        } else if (request_type == "cgi") {
            _no_name_dojo_editor0_jWebSocketClient.sendToken({
                ns: "org.jWebSocket.plugins.system",
                type: "send",
                subType: "exec",
                unid: ob_object.unid,
                cmd: ob_object.unid.cmd
            });
        } else {
            lRes = "Unknown request type ..."
        }
    }
}
function exitPage() {
    if (_no_name_dojo_editor0_jWebSocketClient)
        _no_name_dojo_editor0_jWebSocketClient.close({ timeout: 3000 });
}
