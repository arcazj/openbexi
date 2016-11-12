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
 OPEN OPENBEXI htmlbuilder uses a Syntax-Highlighting JavaScript Editor from Marijn Haverbeke.
 OPEN OPENBEXI htmlbuilder uses query.min.js, jquery-ui.min.js, jQueryRotate.js, jquery.ui.touch-punch.min.js, jquery.jsPlumb-1.5.2-min.js, codemirror.js, fabrics.js
 */
var ob_javascript_Wizard_editor = [
    ['menu_RequestBrowser','ob_menu_RequestBrowser','','','','','','Javascript Wizard Editor','','960px','940px','',''],
    ['window_left','ob_menu_RequestBrowser_sub_left','','','','','','','','','','overflow: auto;position:absolute;width:25%;',''],
    ['javascript_code','ob_menu_RequestBrowser_sub_left','','','','','','','','','','',''],
    ['end_window_left','','','','','','','','','','','',''],

    ['window_body','ob_menu_RequestBrowser_sub','','','','','','','','','','border-left:1px solid gray;overflow: auto;position:absolute;width:73%;',''],
    ['message2','bexicontext_attach_JS','onclick="openbexi_saveJS(event,\'attachJS\');"','','','','','Attach this function to the selected widget:','gif/connect2.gif','','','','1'],
    ['sep','','','','','','','','','','','',''],
    ['form','ob_form','','','','','','','','','','position:absolute;left:0px;',''],
    ['fieldset','ob_fieldset','','','','','','','','','','width:650px',''],
    ['input','bexicontext_js_name','onkeypress="openbexi_update_headJS(event, false)";','','','','','JS function name','','','','width:500px','1'],
    ['input','bexicontext_js_group','";','','','','','JS function group','','','','width:500px','1'],
    ['sep','','','','','','','','','','','',''],
    ['legend','','','','','','','Variable declaration and initialization','','','','',''],
    ['textarea','bexicontext_js_header','','','','','','','','','','width:550px','5'],

    ['legend','','','','','','','Body: Javascript code','','','','',''],
    ['textarea','bexicontext_js_body','','','','','','','','','','width:550px','12'],

    ['legend','','','','','','','Header, callBacks and other functions','','','','',''],
    ['textarea','bexicontext_js_callBack','','','','','','','','','','visibility:visible;width:480px','5'],

    ['end_fieldset','ob_fieldset','','','','','','','','','','width:470px',''],
    ['end_form','','','','','','',' name','','','','',''],
    ['end_window_body','','','','','','','','','','','',''],

    ['window_foot','ob_menu_RequestBrowser_sub_foot','','','','','','','','','','border-left:1px solid gray;overflow: hidden;position:absolute;height:13%',''],
    ['sep','','','','','','','','','','','',''],
    ['set_button','','','','','','','','','','','',''],
    ['save','','onclick="openbexi_saveJS(event,null);"','','onmousedown="src=\'gif/ob_save_down.png\';"','onmouseover="src=\'gif/ob_save_on.png\';"','onmouseout="src=\'gif/ob_save.png\';"','Save','','','','',''],
    ['delete','','onclick="openbexi_deleteJS(event);"','','onmousedown="src=\'gif/ob_trash_down.png\';"','onmouseover="src=\'gif/ob_trash_on.png\';"','onmouseout="src=\'gif/ob_trash.png\';"','Delete','','','','',''],
    ['cancel','','onclick="openbexiNavigator.window_factory(event,\'ob_menu_RequestBrowser\',null,\'hidden\');"','','onmousedown="src=\'gif/ob_cancel_down.png\';"','onmouseover="src=\'gif/ob_cancel_on.png\';"','onmouseout="src=\'gif/ob_cancel.png\';"','Cancel','','','','',''],
    ['endset_button','','','','','','','','','','','',''],
    ['end_window_foot','','','','','','','','','','','','']
];
function openbexi_update_headJS(event, update_spec) {
    try {
        //openbexi_stopEventPropagation(event);
        var count = 0;
        var functionS;
        var new_params = new Array();

        if (document.getElementById("bexicontext_js_name") && document.getElementById("bexicontext_js_name").value == "")
            openbexi_setup_newJS();
        else {
            if ((getBrowser() == "ie6" || getBrowser() == "ie7" || getBrowser() == "ie7_no_XMLHttpRequest") && !event) event = window.event;
            var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
            if (keyCode == 13 || keyCode == 1 || update_spec) {
                var remove_end;
                var params;
                var items;
                try {
                    items = document.getElementById("bexicontext_js_name").value.split("(");
                    if (items.length == 2 && items[0].trim() == "")
                        functionS = "no_name";
                    else if (items.length == 1 && items[0].trim.match(RegExp(')')))
                        functionS = "no_name";
                    else
                        functionS = items[0].trim();
                } catch (e1) {
                    functionS = "no_name";
                }
                try {
                    remove_end = items[1].split(")");
                } catch (e2) {
                }
                try {
                    params = remove_end[0].split(",");
                } catch (e3) {
                    params = new Array();
                    params[0] = "widget_id";
                }

                var function_spec = functionS + " ( ";
                for (var i = 0; i < params.length; i++) {
                    if (params[i].trim() != "") {
                        if (i == 0 && params[i].trim() != "widget_id") {
                            function_spec += "widget_id, " + params[i].trim();
                            new_params[count++] = "widget_id";
                            new_params[count++] = params[i].trim();
                        }
                        else if (i == 0 && params[i].trim() == "widget_id") {
                            function_spec += "widget_id ";
                            new_params[count++] = "widget_id";
                        }
                        else if (i == 0 && params[i].trim() == "") {
                                function_spec += "widget_id ";
                                new_params[count++] = params[i].trim();
                            }
                            else
                                if (params[i].trim() != "widget_id") {
                                    function_spec += ", " + params[i].trim();
                                    new_params[count++] = params[i].trim();
                                }
                    }
                }
                function_spec += " )";
                if (document.getElementById("bexicontext_js_name") && document.getElementById("bexicontext_js_group")) {
                    document.getElementById("bexicontext_js_name").value = function_spec;
                    if (document.getElementById("bexicontext_js_group").value == "") document.getElementById("bexicontext_js_group").value = "myFunctions";
                    openbexi_update_specJS(functionS, document.getElementById("bexicontext_js_group").value, new_params)
                }
            }
        }
    } catch (e) {
        document.getElementById("bexicontext_js_name").value = "no_name ( widget_id )";
        __openbexi_debugC("openbexi_update_headJS()", "Exception:" + e.message);
    }
}
function openbexi_update_js_header(event, type, declaration) {
    try {
        openbexi_stopEventPropagation(event);
        var code = "";

        if (bexicontext_js_header_editor != undefined) {
            document.getElementById("bexicontext_js_header").value = bexicontext_js_header_editor.getValue();
        } else {
            openbexi_setup_newJS();
        }
        bexicontext_js_header_editor.setValue("");

        if (!document.getElementById("bexicontext_js_header").value.match("Variable declaration and initialization"))
            document.getElementById("bexicontext_js_header").value = "//Variable declaration and initialization";

        if (type == "widget_id") code = "var " + declaration + " = " + "openbexi_getPageData(null, \'page\', widget_id,\'" + declaration + "\');";
        if (type == "template") {
            code = "var widget_subtype = " + "openbexi_getPageData(null, \'page\', widget_id, \'subtype\');";
            code += "\nvar template = " + "openbexi_getPageData(null, \'page\', widget_subtype, \'template\');";
        }
        if (type == "lang") {
            code = "_CURRENT_OPENBEXI_LANGUAGE = openbexi_getPageData(null, \'bexicontext\', 'language\', \'name');";
            code += "\n   if (_CURRENT_OPENBEXI_LANGUAGE == \"\") _CURRENT_OPENBEXI_LANGUAGE = \"en\";";
        }

        if (document.getElementById("bexicontext_js_header")) {
            document.getElementById("bexicontext_js_header").value += "\n" + code;
        }
        bexicontext_js_header_editor.setValue(document.getElementById("bexicontext_js_header").value);
    } catch (e) {
        __openbexi_debugC("openbexi_update_js_header()", "Exception:" + e.message);
    }
}
function openbexi_setup_newJS() {
    if (document.getElementById("bexicontext_js_name")) {
        if (document.getElementById("bexicontext_js_name").value == "") {
            document.getElementById("bexicontext_js_name").value = "no_name (widget_id)";
            ob_doc_javascript = null;
            ob_doc_javascript = set_xml_classe_object_attribut_value(ob_doc_javascript, "file", "js", "filename", "no_name");

            document.getElementById("bexicontext_js_group").value = "myFunctions";
            ob_doc_javascript = set_xml_classe_object_attribut_value(ob_doc_javascript, "file", "js", "group", "myFunctions");

            ob_doc_javascript = set_xml_classe_object_attribut_value(ob_doc_javascript, "file", "js", "type", "javascripts");
            ob_doc_javascript = set_xml_classe_object_attribut_value(ob_doc_javascript, "file", "js", "list", "");
            ob_doc_javascript = set_xml_classe_object_attribut_value(ob_doc_javascript, "file", "js", "specification_en", "");
            ob_doc_javascript = set_xml_classe_object_attribut_value(ob_doc_javascript, "file", "js", "specification_fr", "");
            ob_doc_javascript = set_xml_classe_object_attribut_value(ob_doc_javascript, "file", "js", "icon", "default.jpg");
            ob_doc_javascript = set_xml_classe_object_attribut_value(ob_doc_javascript, "file", "js", "parameterCount", "1");
            ob_doc_javascript = set_xml_classe_object_attribut_value(ob_doc_javascript, "file", "js", "parameterName_0", "widget_id");
            ob_doc_javascript = set_xml_classe_object_attribut_value(ob_doc_javascript, "file", "js", "parameterType_0", "string");
            ob_doc_javascript = set_xml_classe_object_attribut_value(ob_doc_javascript, "file", "js", "parameterSpecification_0_en", "Trigger the function from this selected widget");
            ob_doc_javascript = set_xml_classe_object_attribut_value(ob_doc_javascript, "file", "js", "parameterSpecification_0_fr", "Activer la fonction a partir de ce widget selectionné");
            ob_doc_javascript = set_xml_classe_object_attribut_value(ob_doc_javascript, "file", "js", "event", "none");
            ob_doc_javascript = set_xml_classe_object_attribut_value(ob_doc_javascript, "file", "js", "return", "none");
        }
    }

    openbexi_setup_editor();
    if (bexicontext_js_header_editor != undefined)
        bexicontext_js_header_editor.setValue("");
    if (bexicontext_js_body_editor != undefined)
        bexicontext_js_body_editor.setValue("");
    if (bexicontext_js_callBack != undefined)
        bexicontext_js_callBack.setValue("");

}
function openbexi_update_specJS(filename, group, params) {

    var ob_doc_javascript_old = ob_doc_javascript;
    ob_doc_javascript = null;
    ob_doc_javascript = set_xml_classe_object_attribut_value(ob_doc_javascript, "file", "js", "filename", filename);
    ob_doc_javascript = set_xml_classe_object_attribut_value(ob_doc_javascript, "file", "js", "path", "js");

    if (openbexiNavigator) openbexiNavigator.current_JS_selected = filename.replace(".js", "");

    ob_doc_javascript = set_xml_classe_object_attribut_value(ob_doc_javascript, "file", "js", "group", group);
    ob_doc_javascript = set_xml_classe_object_attribut_value(ob_doc_javascript, "file", "js", "parameterCount", params.length);

    var type = get_xml_classe_object_attribut_value(ob_doc_javascript_old, "file", "js", "type");
    var list = get_xml_classe_object_attribut_value(ob_doc_javascript_old, "file", "js", "list");
    var specification_en = get_xml_classe_object_attribut_value(ob_doc_javascript_old, "file", "js", "specification_en");
    var specification_fr = get_xml_classe_object_attribut_value(ob_doc_javascript_old, "file", "js", "specification_fr");
    var icon = get_xml_classe_object_attribut_value(ob_doc_javascript_old, "file", "js", "icon");

    ob_doc_javascript = set_xml_classe_object_attribut_value(ob_doc_javascript, "file", "js", "type", type);
    ob_doc_javascript = set_xml_classe_object_attribut_value(ob_doc_javascript, "file", "js", "list", list);
    ob_doc_javascript = set_xml_classe_object_attribut_value(ob_doc_javascript, "file", "js", "specification_en", specification_en);
    ob_doc_javascript = set_xml_classe_object_attribut_value(ob_doc_javascript, "file", "js", "specification_fr", specification_fr);
    ob_doc_javascript = set_xml_classe_object_attribut_value(ob_doc_javascript, "file", "js", "icon", icon);

    var parameterName;
    var parameterType ;
    var parameterSpecification_en ;
    var parameterSpecification_fr ;

    var old_parameterCount = get_xml_classe_object_attribut_value(ob_doc_javascript_old, "file", "js", "parameterCount");
    for (var i = 0; i < params.length; i++) {
        var found_param = false;
        parameterName = params[i];
        set_xml_classe_object_attribut_value(ob_doc_javascript, "file", "js", "parameterName_" + i, parameterName);

        for (var j = 0; j < parseInt(old_parameterCount); j++) {
            var old_parameterName = get_xml_classe_object_attribut_value(ob_doc_javascript_old, "file", "js", "parameterName_" + j);
            if (old_parameterName == parameterName) {
                found_param = true;
                parameterType = get_xml_classe_object_attribut_value(ob_doc_javascript_old, "file", "js", "parameterType_" + j);
                parameterSpecification_en = get_xml_classe_object_attribut_value(ob_doc_javascript_old, "file", "js", "parameterSpecification_" + j + "_en");
                parameterSpecification_fr = get_xml_classe_object_attribut_value(ob_doc_javascript_old, "file", "js", "parameterSpecification_" + j + "_fr");
                ob_doc_javascript = set_xml_classe_object_attribut_value(ob_doc_javascript, "file", "js", "parameterType_" + i, parameterType);
                ob_doc_javascript = set_xml_classe_object_attribut_value(ob_doc_javascript, "file", "js", "parameterSpecification_" + i + "_en", parameterSpecification_en);
                ob_doc_javascript = set_xml_classe_object_attribut_value(ob_doc_javascript, "file", "js", "parameterSpecification_" + i + "_fr", parameterSpecification_fr);
            }
        }
        if (found_param == false) {
            ob_doc_javascript = set_xml_classe_object_attribut_value(ob_doc_javascript, "file", "js", "parameterType_" + i, "string");
            ob_doc_javascript = set_xml_classe_object_attribut_value(ob_doc_javascript, "file", "js", "parameterSpecification_" + i + "_en", "");
            ob_doc_javascript = set_xml_classe_object_attribut_value(ob_doc_javascript, "file", "js", "parameterSpecification_" + i + "_fr", "");
        }
    }
}
function openbexi_update_js_body(event, action) {
    try {
        openbexi_stopEventPropagation(event);
        var code = "";

        if (document.getElementById("bexicontext_js_name")) {
            if (bexicontext_js_body_editor != undefined) {
                document.getElementById("bexicontext_js_body").value = bexicontext_js_body_editor.getValue();
            } else {
                openbexi_setup_newJS()
            }
            bexicontext_js_body_editor.setValue("");
        }

        if (!document.getElementById("bexicontext_js_body").value.match("Body: Javascript code"))
            document.getElementById("bexicontext_js_body").value = "//Body: Javascript code\n";

        if (document.getElementById("bexicontext_js_body")) {
            if (action == "Add_an_alert") {
                code = "    alert ('<type message here>');\n";
                document.getElementById("bexicontext_js_body").value += "\n" + code;
            }
            if (action == "Effect_Shake") {
                document.getElementById("bexicontext_js_body").value += "//duration 	float value, in seconds, defaults to 0.5\n";
                document.getElementById("bexicontext_js_body").value += "//distance 	integer value, defaults to 20, the number of pixels to move horizontally\n";
                code = "    Effect.Shake(widget_id, { duration: 0.5, distance: 20 });\n";
                document.getElementById("bexicontext_js_body").value += "\n" + code;
            }
            if (action == "Effect_Pulsate") {
                document.getElementById("bexicontext_js_body").value += "//duration 	float value, in seconds, defaults to 2.0\n";
                document.getElementById("bexicontext_js_body").value += "//from 	float value, defaults to 0.0, the minimal opacity during the pulsate, in a value between 0.0 and 1.0. For example, use 0.7 for a mild pulsate\n";
                document.getElementById("bexicontext_js_body").value += "//pulses 	integer value, defaults to 5, the amount of pulses within the duration time\n";
                code = "    Effect.Pulsate(widget_id, { pulses: 5, duration: 2.0 });\n";
                document.getElementById("bexicontext_js_body").value += "\n" + code;
            }
        }
        bexicontext_js_body_editor.setValue(document.getElementById("bexicontext_js_body").value);
    } catch (e) {
        __openbexi_debugC("openbexi_update_js_body()", "Exception:" + e.message);
    }
}
function openbexi_saveJS(event, action) {
    try {
        openbexi_stopEventPropagation(event);

        // Update JS head and spec before saving
        openbexi_update_headJS(event, true);

        var items;
        var value;
        var doc = ob_doc_javascript;
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_saveJSRequest");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "project", openbexiNavigator.projectName);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filename", openbexiNavigator.HTML_short_pageName);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "gui", "divName", getSelectedBexiObjId());

        if (action == "attachJS")
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_saveJSRequest_and_attachJS");

        //########################################################################################

        var count = 0;
        if (document.getElementById("bexicontext_js_callBack") && bexicontext_js_callBack_editor) {
            value = bexicontext_js_callBack_editor.getValue();
            items = value.split("\n");
            for (i = 0; i < items.length; i++) {
                if (items[i] != "") {
                    doc = set_xml_classe_object_attribut_value(doc, "file", "js", "callBack_" + count, items[i]);
                    count++;
                }
            }
        }
        count = 0;
        if (document.getElementById("bexicontext_js_header") && bexicontext_js_header_editor) {
            value = bexicontext_js_header_editor.getValue();
            items = value.split("\n");
            for (var i = 0; i < items.length; i++) {
                if (items[i] != "") {
                    doc = set_xml_classe_object_attribut_value(doc, "file", "js", "header_" + count, items[i]);
                    count++;
                }
            }
        }
        count = 0;
        if (document.getElementById("bexicontext_js_body") && bexicontext_js_body_editor) {
            value = bexicontext_js_body_editor.getValue();
            items = value.split("\n");
            for (i = 0; i < items.length; i++) {
                if (items[i] != "") {
                    doc = set_xml_classe_object_attribut_value(doc, "file", "js", "body_" + count, items[i]);
                    count++;
                }
            }
        }

        var ob_xml = openbexi_get_xmlString(doc);

        var mode_sync = openbexi_synchron();
        openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_saveJS_CB, "ob_menu_FileBrowser_head", "Saving Javascript function ...");
    } catch (e) {
        __openbexi_debugC("openbexi_saveJS()", "Exception:" + e.message);
    }
}
function openbexi_deleteJS(event) {
    try {
        openbexi_stopEventPropagation(event);

        var items;
        var filename = "";
        if (document.getElementById("bexicontext_js_name")) {
            if (document.getElementById("bexicontext_js_name").value == "")
                openbexi_setup_newJS();
        } else
            return;
        var value = document.getElementById("bexicontext_js_name").value;
        items = value.split("(");
        filename = items[0].trim();

        var doc = null;
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_deleteJSRequest");
        doc = set_xml_classe_object_attribut_value(doc, "file", "js", "filename", filename);
        doc = set_xml_classe_object_attribut_value(doc, "file", "js", "path", "js");

        var group = "public";
        if (document.getElementById("bexicontext_js_group") && document.getElementById("bexicontext_js_group").value != "")
            group = document.getElementById("bexicontext_js_group").value;
        doc = set_xml_classe_object_attribut_value(doc, "file", "js", "group", group);

        var ob_xml = openbexi_get_xmlString(doc);

        var mode_sync = openbexi_synchron();
        openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_deleteJS_CB, "ob_menu_FileBrowser_head", "Deleting Javascript function ...");
    } catch (e) {
        __openbexi_debugC("openbexi_deleteJS()", "Exception:" + e.message);
    }
}
function openbexi_saveJS_CB(responseXML) {
    try {
        if (responseXML == null || responseXML == "") {
            if (openbexiNavigator) openbexiNavigator.status("openbexi_saveJS_CB bug ???");
            __openbexi_debugC("openbexi_saveJS_CB() Exception:", "No answer from the server");
            openbexi_unloading2();
            return;
        }
        var ob_doc = openbexi_get_documentElement(responseXML, "text/xml");
        var status = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "status", "text");
        if (status != "" && status != "done") {
            __openbexi_debugC("openbexi_saveJS_CB()", "Info: status=" + status);
            openbexiNavigator.frame_message("ob_menu_RequestBrowser_text", status, "error", "40px");
        }
        var request = get_xml_classe_object_attribut_value(ob_doc, "ob_request", "request", "type");

        openbexi_unloading2();
        var current_JS = get_xml_classe_object_attribut_value(ob_doc, "file", "js", "filename");
        var group = get_xml_classe_object_attribut_value(ob_doc, "file", "js", "group");
        if (request == "openbexi_saveJSRequest_and_attachJS") {
            openbexi_browse_JS_function("ob_menu_JavascriptBrowser", "attachJS", current_JS, group);
        } else {
            openbexi_browse_JS_function("ob_menu_JavascriptBrowser", "none", current_JS, group);
        }
    } catch (e) {
        __openbexi_debugC("openbexi_saveJS_CB()", "Exception:" + e.message);
    }
}
function openbexi_deleteJS_CB(responseXML) {
    try {
        __openbexi_debugC("openbexi_deleteJS_CB(" + responseXML + ")", "Info:");

        if (responseXML == null || responseXML == "") {
            if (openbexiNavigator) openbexiNavigator.status("openbexi_deleteJS_CB bug ???");
            __openbexi_debugC("openbexi_deleteJS_CB() Exception:", "No answer from the server");
            openbexi_unloading2();
            return;
        }
        var ob_doc = openbexi_get_documentElement(responseXML, "text/xml");
        var status = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "status", "text");
        if (status != "" && status != "done") {
            __openbexi_debugC("openbexi_deleteJS_CB()", "Info: status=" + status);
            openbexiNavigator.frame_message("ob_menu_RequestBrowser_text", status, "error", "40px");
        }

        openbexi_unloading2();

        // update tree after deleting an item
        var current_JS = get_xml_classe_object_attribut_value(ob_doc, "file", "js", "filename");
        var group = get_xml_classe_object_attribut_value(ob_doc, "file", "js", "group");
        openbexi_browse_JS_function("ob_menu_JavascriptBrowser", "none", current_JS, group);

    } catch (e) {
        __openbexi_debugC("openbexi_deleteJS_CB()", "Exception:" + e.message);
    }
}
function openbexi_adjust_JS_editor(editor, success) {
    if (success) {
        totalLines = editor.lineCount();
        totalChars = editor.getTextArea().value.length;
        editor.autoFormatRange({line:0, ch:0}, {line:totalLines, ch:totalChars});
        CodeMirror.commands["goPageUp"](editor);
        totalLines = editor.lineCount();
        editor.setSize("100%", (totalLines * 15) + "px");
    } else {
        document.getElementById("label_" + editor).style.visibility = "hidden";
        document.getElementById(editor).style.visibility = "hidden";
        document.getElementById(editor).style.height = "0%";
        document.getElementById(editor).style.width = "0%";
        document.getElementById(editor).rows = 0;
        document.getElementById(editor).cols = 0;
    }
}
var bexicontext_js_header_editor;
var bexicontext_js_body_editor
var bexicontext_js_callBack_editor;
function openbexi_setup_editor() {

    //Implementing a Syntax-Highlighting with JavaScript Editor from code mirror
    bexicontext_js_header_editor = CodeMirror.fromTextArea(document.getElementById("bexicontext_js_header"), {mode: "javascript",theme: "night",lineNumbers: true,matchBrackets: true,tabMode: "indent"});
    openbexi_adjust_JS_editor(bexicontext_js_header_editor, true);

    bexicontext_js_body_editor = CodeMirror.fromTextArea(document.getElementById("bexicontext_js_body"), {mode: "javascript",theme: "night",lineNumbers: true,matchBrackets: true,tabMode: "indent"});
    openbexi_adjust_JS_editor(bexicontext_js_body_editor, true);

    bexicontext_js_callBack_editor = CodeMirror.fromTextArea(document.getElementById("bexicontext_js_callBack"), {mode: "javascript",theme: "night",lineNumbers: true,matchBrackets: true,tabMode: "indent"});
    openbexi_adjust_JS_editor(bexicontext_js_body_editor, true);
}
function openbexi_get_JS_head_body_info_CB(responseXML) {
    try {
        __openbexi_debugC("openbexi_get_JS_head_body_info_CB(" + responseXML + ")", "Info:");
        if (responseXML == null || responseXML == "") {
            if (openbexiNavigator) openbexiNavigator.status("openbexi_get_JS_head_body_info_CB bug ???");
            __openbexi_debugC("openbexi_get_JS_head_body_info_CB() Exception:", "No answer fron the server");
            openbexi_unloading2();
            return;
        }
        ob_doc_javascript = openbexi_get_documentElement(responseXML, "text/xml");
        var status = get_xml_classe_object_attribut_value(ob_doc_javascript, "ob_explorer", "status", "text");
        if (status != "" && status != "done") {
            __openbexi_debugC("openbexi_get_JS_head_body_info_CB()", "Info: status=" + status);
            openbexiNavigator.frame_message("ob_menu_RequestBrowser_text", status, "error", "40px");
        }

        var path = get_xml_classe_object_attribut_value(ob_doc_javascript, "file", "js", "path");
        var filename = get_xml_classe_object_attribut_value(ob_doc_javascript, "file", "js", "filename");
        filename = filename.replace(".js", "");
        if (openbexiNavigator) openbexiNavigator.current_JS_selected = filename;

        var group = get_xml_classe_object_attribut_value(ob_doc_javascript, "file", "js", "group");

        var type = get_xml_classe_object_attribut_value(ob_doc_javascript, "file", "js", "type");
        var list = get_xml_classe_object_attribut_value(ob_doc_javascript, "file", "js", "list");

        var specification_en = get_xml_classe_object_attribut_value(ob_doc_javascript, "file", "js", "specification_en");
        var specification_fr = get_xml_classe_object_attribut_value(ob_doc_javascript, "file", "js", "specification_fr");

        var icon = get_xml_classe_object_attribut_value(ob_doc_javascript, "file", "js", "icon");
        var parameterCount = get_xml_classe_object_attribut_value(ob_doc_javascript, "file", "js", "parameterCount");
        if (parameterCount == "")parameterCount = 0;

        var params = " (";
        var parameterName = new Array();
        var parameterType = new Array();
        var parameterSpecification_en = new Array();
        var parameterSpecification_fr = new Array();
        for (var i = 0; i < parseInt(parameterCount); i++) {
            parameterName[i] = get_xml_classe_object_attribut_value(ob_doc_javascript, "file", "js", "parameterName_" + i);
            if (i != 0)
                params += ", " + parameterName[i];
            else
                params += parameterName[i];
            parameterType[i] = get_xml_classe_object_attribut_value(ob_doc_javascript, "file", "js", "parameterType_" + i);
            parameterSpecification_en[i] = get_xml_classe_object_attribut_value(ob_doc_javascript, "file", "js", "parameterSpecification_" + i + "_en");
            parameterSpecification_fr[i] = get_xml_classe_object_attribut_value(ob_doc_javascript, "file", "js", "parameterSpecification_" + i + "_fr");
        }
        params += " ) {\n";
        var header = "";
        var body = "";
        var callBack = "";
        var count = 0;
        var str;

        while (true) {
            str = get_xml_classe_object_attribut_value(ob_doc_javascript, "file", "js", "callBack_" + count);
            if (str == "") break;
            callBack += str + "\n";
            count++;
        }
        count = 0;
        while (true) {
            str = get_xml_classe_object_attribut_value(ob_doc_javascript, "file", "js", "header_" + count);
            if (str == "") break;
            header += str + "\n";
            count++;
        }
        count = 0;
        while (true) {
            str = get_xml_classe_object_attribut_value(ob_doc_javascript, "file", "js", "body_" + count);
            if (str == "") break;
            body += str + "\n";
            count++;
        }

        var eventS = get_xml_classe_object_attribut_value(ob_doc_javascript, "file", "js", "event");
        var returnS = get_xml_classe_object_attribut_value(ob_doc_javascript, "file", "js", "return");

        // Set up textarea and checkbox
        if (document.getElementById("bexicontext_js_name"))
            document.getElementById("bexicontext_js_name").value = filename + params;
        if (document.getElementById("bexicontext_js_group"))
            document.getElementById("bexicontext_js_group").value = group;
        if (document.getElementById("bexicontext_js_header"))
            document.getElementById("bexicontext_js_header").value = header;
        if (document.getElementById("bexicontext_js_body"))
            document.getElementById("bexicontext_js_body").value = body;
        if (document.getElementById("bexicontext_js_callBack"))
            document.getElementById("bexicontext_js_callBack").value = callBack;

        openbexi_setup_editor();

    } catch (e) {
        __openbexi_debugC("openbexi_get_JS_head_body_info_CB()", "Exception:" + e.message);
    }
    openbexi_unloading2();

}
function openbexi_get_JS_head_body_info(JS_function, group) {
    try {
        __openbexi_debugC("openbexi_get_JS_head_body_info(" + JS_function + ")", "Info:");

        openbexiNavigator.set_mode("getJavascripts");
        openbexiNavigator.window_factory(null, "ob_menu_RequestBrowser", ob_javascript_Wizard_editor, "maximize");
        openbexiNavigator.window_factory(null, "ob_menu_JavascriptBrowser", null, "maximize");

        // Request project directory from server
        var doc = null;
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_getJSHeaderBodyRequest");
        doc = set_xml_classe_object_attribut_value(doc, "file", "js", "path", "js");
        doc = set_xml_classe_object_attribut_value(doc, "file", "js", "filename", JS_function);
        doc = set_xml_classe_object_attribut_value(doc, "file", "js", "group", group);
        doc = set_xml_classe_object_attribut_value(doc, "file", "js", "type", "javascripts");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "project", openbexiNavigator.projectName);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filename", openbexiNavigator.HTML_short_pageName);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "gui", "divName", getSelectedBexiObjId());

        var ob_xml = openbexi_get_xmlString(doc);
        var mode_sync = openbexi_synchron();
        openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_get_JS_head_body_info_CB, "ob_menu_FileBrowser_head", "Loading Javascript header ...");
    } catch (e) {
        __openbexi_debugC("openbexi_get_JS_head_body_info()", "Exception:" + e.message);
    }
}
var ob_doc_javascript;
function openbexi_get_javascript_functions(objectSelected) {
    try {
        __openbexi_debugC("openbexi_get_javascript_functions(" + objectSelected + ")", "Info:");

        var count = 0;
        var trigger;
        var urlCount = ob_getFunctionCurrentIndex(objectSelected);
        if (urlCount == -1) urlCount = 0;
        var functionName = "none";
        var Javascript_tree = "[\n";

        var cout_trigger = 0;
        var trigger_list = new Array();
        while ((functionName = openbexi_getPageData(null, "url_" + count, objectSelected, "functionName")) != "") {
            trigger = openbexi_getPageData(null, "url_" + count, objectSelected, "trigger");
            var found_trigger = false;
            for (var i = 0; i < trigger_list.length; i++) {
                if (trigger_list[i] == trigger) found_trigger = true;
            }
            if (!found_trigger) {
                trigger_list[cout_trigger] = trigger;
                cout_trigger++;
            }
            count++;
        }
        for (var j = 0; j < trigger_list.length; j++) {
            Javascript_tree += " {\n";
            Javascript_tree += " label: '" + '<b style="cursor:pointer;" >' + trigger_list[j] + '</b>' + "',\n";
            Javascript_tree += " id: '" + trigger_list[j] + j + "',\n";
            Javascript_tree += " status: '" + "__trigger" + "',\n";
            Javascript_tree += " children: [\n";
            count = 0;
            while ((functionName = openbexi_getPageData(null, "url_" + count, objectSelected, "functionName")) != "") {
                try {
                    trigger = openbexi_getPageData(null, "url_" + count, objectSelected, "trigger");
                    if (trigger == trigger_list[j]) {
                        Javascript_tree += " { label: '" + '<b style="cursor:pointer;" onclick=openbexi_display_javascript_parameters(event,null,null,\"' + count + '\") >' + functionName + '</b><img style="border-left:18px solid white;border-top:8px solid white;" src="gif/delete_x16.png" onclick=openbexi_deleteJavascriptParameters(event,null,' + count + '); onmousedown=this.src=\"gif/delete_down_x16.png\" onmouseout=this.src=\"gif/delete_x16.png\" onmouseover=this.src=\"gif/delete_on_x16.png\">' + "',\n";
                        Javascript_tree += " id: '" + functionName + count + ".js" + "',\n";
                        Javascript_tree += " javacript: '" + functionName + "',\n";
                        Javascript_tree += " trigger: '" + trigger + "',\n";
                        Javascript_tree += " status: '" + "none" + "',\n";
                        Javascript_tree += " },\n";
                    }
                } catch (e1) {
                    __openbexi_debugC("openbexi_get_javascript_functions()", "Exception:" + e1.message);
                }
                count++;
            }
            Javascript_tree += " ]},\n";
        }
        if (count == 0) {
            Javascript_tree += " { label: '" + '<a style="  style="cursor:pointer;" >' + "No_function_found" + '</a>' + "', id: ' javacript' ,  status: '" + "none" + "'},\n";
        }
        Javascript_tree += "];";
        openbexiNavigator.create_tree("rawdata", eval(Javascript_tree), "ob_menu_RequestBrowser_sub_left", "Javascript_tree", true, null, undefined);

    } catch (e) {
        __openbexi_debugC("openbexi_get_javascript_functions()", "Exception:" + e.message);
    }
}
;
function openbexi_deleteJavascriptParameters(event, objectSelected, index) {
    try {
        openbexi_stopEventPropagation(event);
        if (objectSelected == null)
            try {
                objectSelected = getSelectedBexiObj(null).div.id;
            } catch(e) {
                objectSelected = "BODY";
            }
        openbexi_delete_trigger(objectSelected, index);
        openbexi_display_javascript_parameters(event, null, null, null);
    } catch (e) {
        __openbexi_debugC("openbexi_deleteJavascriptParameters()", "Exception:" + e.message);
    }
}
;
function openbexi_updateJavascriptParameters(event, objectSelected) {
    try {

        if (objectSelected == null)
            try {
                objectSelected = getSelectedBexiObj(null).div.id;
            } catch(e) {
                objectSelected = "BODY";
            }
        if ((getBrowser() == "ie6" || getBrowser() == "ie7" || getBrowser() == "ie7_no_XMLHttpRequest") && !event) event = window.event;
        var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
        if (keyCode == 13 || keyCode == 1) {
            var value;
            var pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
            var urlCount = ob_getFunctionCurrentIndex(objectSelected);
            if (urlCount == -1) urlCount = 0;
            var functionName = get_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "functionName");
            var parameterCount = get_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "parameterCount");
            if (parameterCount == "") parameterCount = 0;
            for (var p = 0; p < parseInt(parameterCount); p++) {
                var parameterName = get_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, "parameterName_" + p);
                if (document.getElementById("parameterValue_" + p))value = document.getElementById("parameterValue_" + p).value;
                if (functionName == "ob_generic_function" || functionName == "ob_java_function") {
                    value = value.replace("('", "(\\\'");
                    value = value.replace("')", "\\\')");
                    for (var l = 0; l < 15; l++) {
                        value = value.replace("','", "\\\',\\\'");
                    }
                    value = value.replace('("', '(\\\'');
                    value = value.replace('")', '\\\')');
                    for (l = 0; l < 15; l++) {
                        value = value.replace('","', '\\\',\\\'');
                    }
                }
                if (parameterName != "" && value != "") set_xml_classe_object_attribut_value(pageDoc, "url_" + urlCount, objectSelected, parameterName, value);
            }
            OPENBEXI_PAGES_DATA_XML = openbexi_get_xmlString(pageDoc);
        }
    } catch (e) {
        __openbexi_debugC("openbexi_updateJavascriptParameters()", "Exception:" + e.message);
    }
}
;
function openbexi_display_javascript_parameters(event, functionName, group, index) {
    try {
        openbexi_stopEventPropagation(event);

        if (index == null) index = 0;
        var objectSelected = "BODY";
        try {
            objectSelected = getSelectedBexiObj(null).div.id;
        } catch(e) {
        }
        if (functionName != null) {
            index = ob_getFunctionCounter(objectSelected);
            ob_setFunctionCurrentIndex(objectSelected, parseInt(index));
            getSelectedBexiObj(null).add_function("javascript", functionName, ob_doc_javascript);
        }
        openbexiNavigator.set_mode("getJavascripts");

        var urlCount = 0;
        if (index == null) {
            urlCount = ob_getFunctionCurrentIndex(objectSelected);
            if (urlCount == -1) urlCount = 0;
        } else {
            ob_setFunctionCurrentIndex(objectSelected, parseInt(index));
            urlCount = index;
        }
        functionName = openbexi_getPageData(null, "url_" + urlCount, objectSelected, "functionName");
        var trigger = openbexi_getPageData(null, "url_" + urlCount, objectSelected, "trigger");
        if (trigger == "") trigger = "OnClick";
        var parameterCount = openbexi_getPageData(null, "url_" + urlCount, objectSelected, "parameterCount");
        if (parameterCount == "") parameterCount = 0;

        var count = 0;
        var ob_javascript = new Array();
        ob_javascript[count] = new Array();
        ob_javascript[count++] = ['menu_RequestBrowser','ob_menu_RequestBrowser','','','','','','Javascript navigator','','800px','600px','',''];
        ob_javascript[count] = new Array();
        ob_javascript[count++] = ['javascript_tree','ob_menu_RequestBrowser_sub_left','','','','','','Save','','','','',''],
                ob_javascript[count] = new Array();
        ob_javascript[count++] = ['window_left','ob_menu_RequestBrowser_sub_left','','','','','','','','','','overflow: auto;position:absolute;width:35%;',''];
        ob_javascript[count] = new Array();
        ob_javascript[count++] = ['end_window_left','','','','','','','','','','','',''];
        ob_javascript[count] = new Array();
        ob_javascript[count++] = ['window_body','ob_menu_RequestBrowser_sub','','','','','','','','','','border-left:1px solid gray;overflow: auto;position:absolute;width:95%;',''];
        ob_javascript[count] = new Array();
        ob_javascript[count++] = ['form','ob_form','','','','','','','','','','position:absolute;left:0px;',''];
        ob_javascript[count] = new Array();
        ob_javascript[count++] = ['fieldset','ob_fieldset','','','','','','','','','','',''];
        ob_javascript[count] = new Array();
        ob_javascript[count++] = ['legend','','','','','','','Javascript function:  ' + functionName + '() parameters','','','','',''];
        ob_javascript[count++] = ['combo',  "ob_combo" ,'onclick="openbexi_getMouseEvent(event, this, \'label_ob_combo\', null, \'\');"','','onmouseover="this.style.border=\'2px solid red\';"','onmouseout="this.style.border=\'1px solid red\';"','', trigger,'','','','visibility:hidden;width:0px;','1',value];

        var parameterName2;
        for (var p = 0; p < parseInt(parameterCount); p++) {
            ob_javascript[count] = new Array();
            var parameterName = openbexi_getPageData(null, "url_" + urlCount, objectSelected, "parameterName_" + p);

            var value = openbexi_getPageData(null, "url_" + urlCount, objectSelected, parameterName);
            if (parameterName == "widget_id") {
                parameterName2 = openbexi_getPageData(null, "url_" + urlCount, objectSelected, "parameterName_" + (p + 1));
                ob_javascript[count++] = ['input_id',  "parameterValue_" + p ,'onclick="openbexi_getBexiObj(event, this, \'' + p + '\', null, \'' + parameterName + '\',\'' + parameterName2 + '\');"','','onkeypress="openbexi_updateJavascriptParameters(event,null);"','','', parameterName,'','','','','1',value];
            } else if (parameterName == "query")
                ob_javascript[count++] = ['input_sql',  "parameterValue_" + p ,'onclick="openbexiNavigator.open_SQL_DataBase(event);"','','onkeypress="openbexi_updateJavascriptParameters(event,null);"','onmouseover="src=\'gif/ob_sql_on_x48.png\';"','onmouseout="src=\'gif/ob_sql_x48.png\';"', parameterName,'','','','','1',value];
            else if (parameterName == "jws_request_type") {
                    ob_javascript[count++] = ['input_jws',  "parameterValue_" + p ,'onclick="open_jws_request_type(event, this, \'' + p + '\', null, \'' + parameterName + '\');"','','onkeypress="openbexi_updateJavascriptParameters(event,null);"','','', parameterName,'','','','','1',value];
                } else if (parameterName == "CSS")
                    ob_javascript[count++] = ['input_css',  "parameterValue_" + p ,'onclick="openbexiNavigator.set_css_mode(\'css_javascript\',\'parameterValue_' + p + '\');openbexiNavigator.window_factory(event,\'ob_menu_CSS\',null,\'minimize\');"','','onkeypress="openbexi_updateJavascriptParameters(event,null);"','onmouseover="src=\'gif/ob_css_on_x48.png\';"','onmouseout="src=\'gif/ob_css_x48.png\';"', parameterName,'','','','','1',value];
                else
                    ob_javascript[count++] = ['input',  "parameterValue_" + p ,'','','onkeypress="openbexi_updateJavascriptParameters(event,\'' + objectSelected + '\');"','','', parameterName,'','','','','1',value];

        }
        ob_javascript[count] = new Array();
        ob_javascript[count++] = ['end_fieldset','','','','','','','','','','','',''];
        ob_javascript[count++] = ['end_form','','','','','','',' name','','','','',''];
        ob_javascript[count] = new Array();
        ob_javascript[count++] = ['end_window_body','','','','','','','','','','','',''];
        ob_javascript[count] = new Array();
        ob_javascript[count++] = ['window_foot','ob_menu_RequestBrowser_sub_foot','','','','','','','','','','border-left:1px solid gray;overflow: hidden;position:absolute;height:25%',''];
        ob_javascript[count] = new Array();
        ob_javascript[count++] = ['ok','','onclick="openbexi_updateJavascriptParameters(event,null);"','','onmousedown="src=\'gif/ob_ok_down.png\';"','onmouseover="src=\'gif/ob_ok_on.png\';"','onmouseout="src=\'gif/ob_ok.png\';"','Apply','','','','',''];
        ob_javascript[count] = new Array();
        ob_javascript[count++] = ['cancel','','onclick="openbexiNavigator.window_factory(event,\'ob_menu_RequestBrowser\',null,\'hidden\');"','','onmousedown="src=\'gif/ob_cancel_down.png\';"','onmouseover="src=\'gif/ob_cancel_on.png\';"','onmouseout="src=\'gif/ob_cancel.png\';"','Cancel','','','','',''];
        ob_javascript[count] = new Array();
        ob_javascript[count++] = ['end_window_foot','','','','','','','','','','','',''];

        if (openbexiNavigator) openbexiNavigator.window_factory(event, 'ob_menu_RequestBrowser', ob_javascript, 'maximize');
    } catch   (e) {
        __openbexi_debugC("openbexi_display_javascript_parameters()", "Exception:" + e.message);
    }
}
;
function openbexi_browse_JS_function_CB(responseXML) {
    try {
        __openbexi_debugC("openbexi_browse_JS_function_CB(" + responseXML + ")", "Info:");
        if (responseXML == null || responseXML == "") {
            if (openbexiNavigator) openbexiNavigator.status("openbexi_browse_JS_function_CB bug ???");
            __openbexi_debugC("openbexi_browse_JS_function_CB()", " Exception: No answer fron the server");
            openbexi_unloading2();
            return;
        }

        var ob_doc = openbexi_get_documentElement(responseXML, "text/xml");

        var status = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "status", "text");
        if (status != "" && status != "done") __openbexi_debugC("openbexi_browse_JS_function_CB()", "Info: status=" + status);

        var request = get_xml_classe_object_attribut_value(ob_doc, "ob_request", "request", "type");

        var appli_status = get_xml_classe_object_attribut_value(ob_doc, "openbexi_creative", "application", "status");
        if (appli_status != "") __openbexi_debugC("openbexi_browse_JS_function_CB()", "Info: appli_status=" + appli_status);

        var exception = get_xml_classe_object_attribut_value(ob_doc, "openbexi_creative", "application", "exception");
        if (exception != "") __openbexi_debugC("openbexi_browse_JS_function_CB()", "Exception: " + exception);

        var ob_menu = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "dir", "ob_menu");
        if (ob_menu == "") __openbexi_debugC("openbexi_browse_JS_function_CB()", "Warning: no ob_menu found");

        var file_count = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file", "objectCount");
        if (file_count == "") __openbexi_debugC("openbexi_browse_JS_function_CB()", "Warning: no project found");
        var ob_end = parseInt(file_count);

        var path = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "dir", "path");
        if (path == "") __openbexi_debugC("openbexi_browse_JS_function_CB()", "Warning: no project path found");
        openbexiNavigator.path = path;

        var JSBrowser_tree = "[\n";
        var JSDir;
        JSBrowser_tree += " {\n";
        JSBrowser_tree += " label: '" + '<b style="cursor:pointer;" onclick=openbexi_display_javascript_parameters(event,null,null,null); >' + "Edit attached JS functions" + '</b>' + "',\n";
        JSBrowser_tree += " id: '" + "newJS__EDIT" + "',\n";
        JSBrowser_tree += " JSDir: '" + "newJS__EDIT" + "',\n";
        JSBrowser_tree += " status: '" + "__EDIT" + "',\n";
        JSBrowser_tree += " },\n";
        JSBrowser_tree += " {\n";
        JSBrowser_tree += " label: '" + '<b style="cursor:pointer;" onclick=openbexiNavigator.window_factory(event,\"ob_menu_RequestBrowser\",ob_javascript_Wizard_editor,\"maximize\");openbexiNavigator.window_factory(event,\"ob_menu_JavascriptBrowser\",null,\"maximize\");openbexi_setup_newJS(); >' + "Create a new JS functions" + '</b>' + "',\n";
        JSBrowser_tree += " id: '" + "editJS__JS" + "',\n";
        JSBrowser_tree += " JSDir: '" + "editJS__JS" + "',\n";
        JSBrowser_tree += " status: '" + "__JS" + "',\n";
        JSBrowser_tree += " },\n";
        for (var j = 0; j < ob_end; j++) {
            // No up directory if list driver case or certain cases
            try {
                JSDir = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file_" + j, "filename");
                JSBrowser_tree += " {\n";
                if (JSDir == "public")
                    JSBrowser_tree += " label: '" + '<b style="cursor:pointer;" >Attach ' + JSDir + ' functions</b>' + "',\n";
                else
                    JSBrowser_tree += " label: '" + '<b style="cursor:pointer;" >Attach ' + JSDir + '</b>' + "',\n";
                JSBrowser_tree += " id: '" + j + JSDir + "',\n";
                JSBrowser_tree += " JSDir: '" + JSDir + "',\n";
                JSBrowser_tree += " status: '" + "status" + "',\n";
                JSBrowser_tree += " children: [\n";
                var maxWebPages = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", JSDir, "objectMaxCount");
                var JSFunction;
                if (parseInt(maxWebPages) == 0)maxWebPages = 1;
                for (var k = 0; k < parseInt(maxWebPages); k++) {
                    JSFunction = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", JSDir + "_" + k, "filename");
                    if (JSFunction == "")  JSFunction = "no_name.js";
                    JSBrowser_tree += " { label: '" + '<a style="cursor:pointer;" onclick=openbexi_get_JS_head_body_info(\"' + JSFunction + '\",\"' + JSDir + '\"); >' + JSFunction + '</a>' + "', id: '" + j + JSFunction + "' , JSFile: '" + JSFunction + "', status: '" + "none" + "'},\n";
                }
                JSBrowser_tree += " ]\n";
                if (j != ob_end - 1) {
                    JSBrowser_tree += " },\n";
                } else {
                    JSBrowser_tree += " }\n";
                }
            } catch (e1) {
                __openbexi_debugC("openbexi_navigator.prototype.openbexi_browse_JS_function_CB()", "Exception:" + e1.message);
            }
        }

        JSBrowser_tree += "];";
        openbexiNavigator.JSBrowser_json_tree = eval(JSBrowser_tree);
        if (openbexiNavigator.JSBrowser_tree_first_start) {
            openbexiNavigator.JSBrowser_tree_first_start = false;
            openbexiNavigator.JSBrowser_tree = openbexiNavigator.create_tree("rawdata", eval(JSBrowser_tree), ob_menu + "_sub", "JS_function_tree", null, true, undefined);
        } else
            openbexiNavigator.JSBrowser_tree = openbexiNavigator.create_tree("rawdata", eval(JSBrowser_tree), ob_menu + "_sub", "JS_function_tree", null, undefined, undefined);

        if (request == "openbexi_ExplorerRequest_and_attachJS") {
            openbexi_unloading2();

            var selected_JS = get_xml_classe_object_attribut_value(ob_doc, "file", "js", "filename");
            var group = get_xml_classe_object_attribut_value(ob_doc, "file", "js", "group");
            openbexi_display_javascript_parameters(null, selected_JS, group, null);
        }
    } catch (e) {
        __openbexi_debugC("openbexi_browse_JS_function_CB()", "Exception:" + e.message);
    }
    openbexi_unloading2();
}
;
function openbexi_browse_JS_function(ob_menu, action, selected_JS, group) {
    try {
        __openbexi_debugC("openbexi_browse_JS_function(" + ob_menu + ")", "Info:");
        var objectSelected = "BODY";
        try {
            objectSelected = getSelectedBexiObj(null).div.id;
        } catch(e) {
        }
        openbexiNavigator.set_mode("getJavascripts");

        // Request JS directory from server
        var doc = null;
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_ExplorerRequest");
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "subtype", "dirJavascripts");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", "js");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "ob_menu", "ob_menu_JavascriptBrowser");
        if (action == "attachJS") {
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_ExplorerRequest_and_attachJS");
            doc = set_xml_classe_object_attribut_value(doc, "file", "js", "filename", selected_JS);
            doc = set_xml_classe_object_attribut_value(doc, "file", "js", "group", group);
        }

        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "type", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filter", openbexiNavigator.dir_filter);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "filter", openbexiNavigator.file_filter);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "maxItems", openbexiNavigator.maxItems);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "posCurrentItem", 0);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "nextPreviousStatus", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "pager", "number", "0");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dirUp", "path", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filename", "");
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "objectType", getSelectedBexiObj(null).type);
        try {
            if (getSelectedBexiObj(null) != openbexiBody)
                doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "objectSelected", objectSelected);
        } catch (e) {
            __openbexi_debugC("openbexi_browse_JS_function()", "Exception:" + e.message);
        }

        var ob_xml = openbexi_get_xmlString(doc);
        var mode_sync = openbexi_synchron();
        openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_browse_JS_function_CB, "ob_menu_FileBrowser_head", "Browsing Javascript functions ...");
    } catch (e) {
        __openbexi_debugC("openbexi_browse_JS_function()", "Exception:" + e.message);
    }
}

function openbexi_get_wizard_js_json_tree() {
    try {
        var objectSelected = "BODY";
        try {
            objectSelected = getSelectedBexiObj(null).div.id;
        } catch(e) {
        }
        var wizard_js_json_tree = "[\n";
        // No up directory if list driver case or certain cases
        try {
            wizard_js_json_tree += " {\n";
            wizard_js_json_tree += " label: '" + '<b style="cursor:pointer;" >' + "Header wizard" + '</b>' + "',\n";
            wizard_js_json_tree += " id: '" + j + "header1" + "',\n";
            wizard_js_json_tree += " status: '" + "none" + "',\n";
            wizard_js_json_tree += " children: [\n";
            var pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
            var attNames = get_xml_classe_object_attributesName(pageDoc, "page", objectSelected);
            if (attNames == null || attNames.length == 0) {
                wizard_js_json_tree += " { label: '" + '<a > No header wizard found ... </a>' + "',\n";
                wizard_js_json_tree += " id: '" + j + "header1_" + "',\n";
                wizard_js_json_tree += " status: '" + "none" + "'},\n";
            } else {
                for (var k = 0; k < attNames.length; k++) {
                    var att;
                    att = get_xml_classe_object_attribut_value(pageDoc, "page", objectSelected, attNames[k]);
                    if (att != "" && att != "undefined" && att != "null") {
                        wizard_js_json_tree += " { label: '" + '<a style="cursor:pointer;" onclick=openbexi_update_js_header(event,\"widget_id\",\"' + attNames[k] + '\"); > Declare ' + attNames[k] + ' </a>' + "',\n";
                        wizard_js_json_tree += " id: '" + k + "header1" + "',\n";
                        wizard_js_json_tree += " status: '" + "none" + "'},\n";
                    }
                }
            }
            attNames = get_xml_classe_object_attributesName(pageDoc, "page", "body");
            if (attNames == null || attNames.length == 0) {
                wizard_js_json_tree += " { label: '" + '<a > No body header wizard found ... </a>' + "',\n";
                wizard_js_json_tree += " id: '" + j + "header1_" + "',\n";
                wizard_js_json_tree += " status: '" + "none" + "'},\n";
            } else {
                for (k = 0; k < attNames.length; k++) {
                    att = get_xml_classe_object_attribut_value(pageDoc, "page", "body", attNames[k]);
                    wizard_js_json_tree += " { label: '" + '<a style="cursor:pointer;" onclick=openbexi_update_js_header(event,\"widget_id\",\"' + attNames[k] + '\"); > Declare body ' + attNames[k] + ' </a>' + "',\n";
                    wizard_js_json_tree += " id: '" + k + "header_body1" + "',\n";
                    wizard_js_json_tree += " status: '" + "none" + "'},\n";

                }
            }
            wizard_js_json_tree += " ]\n";
            wizard_js_json_tree += " },\n";
        } catch (e1) {
            __openbexi_debugC("get_wizard_js_json_tree", "Exception:" + e1.message);
        }
        wizard_js_json_tree += " {\n";
        wizard_js_json_tree += " label: '" + '<b>Body wizard</b>' + "',\n";
        wizard_js_json_tree += " id: '" + "function1" + "',\n";
        wizard_js_json_tree += " status: '" + "none" + "',\n";
        wizard_js_json_tree += " children: [";
        wizard_js_json_tree += " {\n";
        wizard_js_json_tree += " label: '" + '<a style="cursor:pointer;" onclick=openbexi_update_js_body(event,\"Add_an_alert\"); > Add an alert </a>' + "',\n";
        wizard_js_json_tree += " id: '" + "function1_0" + "',\n";
        wizard_js_json_tree += " status: '" + "__FUNC" + "',\n";
        wizard_js_json_tree += " },\n";
        wizard_js_json_tree += " {\n";
        wizard_js_json_tree += " label: '" + '<a style="cursor:pointer;" onclick=alert(\"Sorry_not_implemented\"); > Connect to the server </a>' + "',\n";
        wizard_js_json_tree += " id: '" + "function1_1" + "',\n";
        wizard_js_json_tree += " status: '" + "__FUNC" + "',\n";
        wizard_js_json_tree += " },\n";
        wizard_js_json_tree += "]},";
        wizard_js_json_tree += " {\n";
        wizard_js_json_tree += " label: '" + '<b>Body scriptaculous wizard</b>' + "',\n";
        wizard_js_json_tree += " id: '" + "function2" + "',\n";
        wizard_js_json_tree += " status: '" + "none" + "',\n";
        wizard_js_json_tree += " children: [";
        wizard_js_json_tree += " {\n";
        wizard_js_json_tree += " label: '" + '<a style="cursor:pointer;" onclick=openbexi_update_js_body(event,\"Effect_Shake\"); > Effect Shake </a>' + "',\n";
        wizard_js_json_tree += " id: '" + "function2_0" + "',\n";
        wizard_js_json_tree += " status: '" + "__FUNC" + "',\n";
        wizard_js_json_tree += " },\n";
        wizard_js_json_tree += " {\n";
        wizard_js_json_tree += " label: '" + '<a style="cursor:pointer;" onclick=openbexi_update_js_body(event,\"Effect_Pulsate\"); > Effect Pulsate </a>' + "',\n";
        wizard_js_json_tree += " id: '" + "function2_1" + "',\n";
        wizard_js_json_tree += " status: '" + "__FUNC" + "',\n";
        wizard_js_json_tree += " },\n";
        wizard_js_json_tree += "]},";
        wizard_js_json_tree += "];";

        return eval(wizard_js_json_tree);

    } catch(e) {
        __openbexi_debugC("get_wizard_js_json_tree()", "Exception:" + e.message);
    }
}
