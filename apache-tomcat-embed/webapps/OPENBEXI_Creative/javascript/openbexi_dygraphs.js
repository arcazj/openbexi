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
var ob_dygraphs_inspectorAttributes = [
    ['editor'         , 'ImageEditor'   , 'true']
];
var ob_dygraphs_data_editor = [
    ['menu_RequestBrowser', 'ob_menu_RequestBrowser', '', '', '', '', '', 'Dygraphs Data', '', '680px', '590px', '', ''],
    ['window_left', 'ob_menu_RequestBrowser_sub_left', '', '', '', '', '', '', '', '', '', 'overflow: auto;position:absolute;width:0%;', ''],
    ['end_window_left', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_body', 'ob_menu_RequestBrowser_sub', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow:auto;position:absolute;width:100%;', ''],
    ['form', 'ob_form', '', '', '', '', '', '', '', '', '', 'position:absolute;left:0px;', ''],
    ['fieldset', 'ob_fieldset', '', '', '', '', '', '', '', '', '', 'width:600px', ''],
    ['legend', '', '', '', '', '', '', 'Dygraphs Data Editor', '', '', '', '', ''],
    ['textarea', 'bexicontext_dygraphs_data', '', '', '', '', '', 'Data', '', '', '', '', '13'],
    ['end_form', '', '', '', '', '', '', ' name', '', '', '', '', ''],
    ['end_window_body', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_foot', 'ob_menu_RequestBrowser_sub_foot', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow: hidden;position:absolute;height:25%', ''],
    ['sep', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['set_button', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['ok', '', 'onclick="getSelectedBexiObj(null).updateDataDygraphs();"', '', 'onmousedown="src=\'gif/ob_ok_down.png\';"', 'onmouseover="src=\'gif/ob_ok_on.png\';"', 'onmouseout="src=\'gif/ob_ok.png\';"', 'Apply', '', '', '', '', ''],
    ['cancel', '', 'onclick="openbexiNavigator.window_factory(event,\'ob_menu_RequestBrowser\',null,\'hidden\');"', '', 'onmousedown="src=\'gif/ob_cancel_down.png\';"', 'onmouseover="src=\'gif/ob_cancel_on.png\';"', 'onmouseout="src=\'gif/ob_cancel.png\';"', 'Cancel', '', '', '', '', ''],
    ['endset_button', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_window_foot', '', '', '', '', '', '', '', '', '', '', '', '']
];
var ob_dygraphs_view_editor = [
    ['menu_RequestBrowser', 'ob_menu_RequestBrowser', '', '', '', '', '', 'Dygraphs View', '', '680px', '590px', '', ''],
    ['window_left', 'ob_menu_RequestBrowser_sub_left', '', '', '', '', '', '', '', '', '', 'overflow: auto;position:absolute;width:0%;', ''],
    ['end_window_left', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_body', 'ob_menu_RequestBrowser_sub', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow:auto;position:absolute;width:100%;', ''],
    ['form', 'ob_form', '', '', '', '', '', '', '', '', '', 'position:absolute;left:0px;', ''],
    ['fieldset', 'ob_fieldset', '', '', '', '', '', '', '', '', '', 'width:600px', ''],
    ['legend', '', '', '', '', '', '', 'Dygraphs View Editor', '', '', '', '', ''],
    ['textarea', 'bexicontext_dygraphs_view', '', '', '', '', '', 'View', '', '', '', '', '13'],
    ['end_form', '', '', '', '', '', '', ' name', '', '', '', '', ''],
    ['end_window_body', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_foot', 'ob_menu_RequestBrowser_sub_foot', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow: hidden;position:absolute;height:25%', ''],
    ['sep', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['set_button', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['ok', '', 'onclick="getSelectedBexiObj(null).updateViewDygraphs();"', '', 'onmousedown="src=\'gif/ob_ok_down.png\';"', 'onmouseover="src=\'gif/ob_ok_on.png\';"', 'onmouseout="src=\'gif/ob_ok.png\';"', 'Apply', '', '', '', '', ''],
    ['cancel', '', 'onclick="openbexiNavigator.window_factory(event,\'ob_menu_RequestBrowser\',null,\'hidden\');"', '', 'onmousedown="src=\'gif/ob_cancel_down.png\';"', 'onmouseover="src=\'gif/ob_cancel_on.png\';"', 'onmouseout="src=\'gif/ob_cancel.png\';"', 'Cancel', '', '', '', '', ''],
    ['endset_button', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_window_foot', '', '', '', '', '', '', '', '', '', '', '', '']

];
var ob_dygraphs_popupAttributes = [
    ['menuitem11', 'openbexi_chartFlow_add_endpoint(event,null,null,null,true,null,\'dynamic\')'     , 'AddEndpoint'  , 'gif\/endpoint_x48.png', '48px', '48px'],
    ['menuitem7', 'openbexiNavigator.window_factory(null,\'ob_menu_RequestBrowser\',ob_dygraphs_view_editor,\'maximize\');getSelectedBexiObj(null).displayViewDygraphs();', 'View', 'gif\/ob_view_x48.png', '48px', '48px'],
    ['menuitem8', 'openbexiNavigator.window_factory(null,\'ob_menu_RequestBrowser\',ob_dygraphs_data_editor,\'maximize\');getSelectedBexiObj(null).displayDygraphsData();', 'Data', 'gif\/ob_data_x48.png', '48px', '48px'],
    ['menuitem17', 'openbexiNavigator.javascript(event, false);', 'Javascript'  , 'gif\/javascript_x48.png', '48px', '48px'],
    ['menuitem18', 'this.backward()', 'SendToBack', 'gif\/move_backward_x48.png', '48px', '48px'],
    ['menuitem20', 'this.forward()'          , 'BringToFront', 'gif\/move_forward_x48.png', '48px', '48px'],
    ['menuitem25px', 'this.removeObject(true);openbexiNavigator.update_menu_editor(null, false);'  , 'DlgSelectBtnDelete', 'gif\/dygraphs_delete_x48.png', '48px', '48px']
];

var dygraphs_data = "[ [1,10,100], [2,20,80], [3,50,60], [4,70,80] ]";

var dygraphs_view = {
    labels: [ "x", "A", "B" ],
    labelsSeparateLines: true,
    labelsKMB: true,
    legend: "always",
    colors: ["#009900", "#FF1919"],
    title: "Example",
    xlabel: "Date",
    ylabel: "Count",
    axisLineColor: "white",
    drawXGrid: false
}
function __openbexi_debugC_dygraphs(f, text) {
    try {
        __openbexi_debugC(f, text);
    } catch (e) {
    }
}
var openbexi_dygraphs = function (bexiObj, obj, name, type, top, left, width, height, keepProportion) {
    try {
        __openbexi_debugC("openbexi_dygraphs(" + bexiObj + "," + obj + "," + name + "," + type + "," + top + "," + left + "," + width + "," + height + "," + keepProportion + ")", "Classe:");

        this.loading_status = "loaded";
        this.styles_BgDygraphs = null;
        if (keepProportion == undefined)keepProportion = false;
        this.keepProportion = keepProportion;
        if (openbexiNavigator)
            this.openbexiNavigator = openbexiNavigator;
        else
            this.openbexiNavigator = new openbexi_navigator();
        this.name = name;
        this.id = name;
        this.type = "openbexi_dygraphs";
        this.caption = "";
        this.jsonFile = null;
        this.csvFile = null;
        this.selected = "false";
        if (name == null || name == "") name = getNewIdDiv("div");
        if (bexiObj == null)
            this.parentNodeId = "BODY";
        else
            this.parentNodeId = bexiObj.id;
        var divobj;
        if (obj == null) {
            divobj = new openbexi_div(bexiObj, obj, name, top, left, width, height);
            this.div = divobj.div;
            this.parent = this.div.id;
            this.div.setAttribute("CLASSE", "DIV_DYGRAPHS");
            this.div.setAttribute("creation_date", new Date());
            this.dygraphs = document.createElement("TEXTAREA");
            this.dygraphs.setAttribute("id", "textarea_" + name);
            this.dygraphs.setAttribute("CLASSE", "DIV_DYGRAPHS");
            this.dygraphs.type = type;
            this.dygraphs.data_function_name = "dygraphs_" + openbexiNavigator.projectName + "_" + openbexiNavigator.HTML_short_pageName + "_" + this.div.id + "_data";
            this.dygraphs.data = dygraphs_data;
            this.dygraphs.view = JSON.stringify(dygraphs_view);
            this.div.style.borderRadius = "1em";
            this.div.style.backgroundColor = "white";
            this.div.style.opacity = 0.9;
            this.div.style.position = "absolute";
            this.div.style.border = "0.25em solid #ddd";
            this.setData();
            this.dygraphs.instance = this.createDygraphs(false);
        } else {
            divobj = new openbexi_div(bexiObj, obj, obj.id, top, left, width, height);
            this.div = divobj.div;
            this.id = this.div.id;
            this.div.setAttribute("CLASSE", "DIV_DYGRAPHS");
            this.div.style.position = "absolute";
            this.parent = this.div.id;
            this.div.ob_template = obj.getAttribute("ob_template");
            this.dygraphs = document.createElement("TEXTAREA");
            this.dygraphs.setAttribute("id", "textarea_" + name);
            this.dygraphs.setAttribute("CLASSE", "DIV_DYGRAPHS");
            this.div.setAttribute("creation_date", obj.getAttribute("creation_date"));
            this.div.setAttribute("obzindex", obj.getAttribute("obzindex"));
            this.div.setAttribute("ob_template", obj.getAttribute("ob_template"));
            this.dygraphs.type = type;
            this.getData();
            this.dygraphs.instance = this.createDygraphs(false);
            this.div.style.zIndex = obj.getAttribute("obzindex");
        }
        this.genericObject = new openbexi_generic_object(this);
        this.dygraphs.onclick = this.my_PickFunc;
        if (obj == null) this.forward();
        this.set_template(this.template, null, null, null);
    } catch (e) {
        __openbexi_debugC("openbexi_dygraphs()", "Exception:" + e.message);
    }
}
openbexi_dygraphs.prototype.setData = function () {
    this.div.style.cursor = "default";
    openbexi_updatePageData(null, "page", this.div.id, "type", this.type);
    openbexi_updatePageData(null, "dygraphs", this.div.id, "json", this.jsonFile);
    openbexi_updatePageData(null, "dygraphs", this.div.id, "csv", this.csvFile);
    openbexi_updatePageData(null, "dygraphs", this.div.id, "view", this.dygraphs.view);
    openbexi_updatePageData(null, "dygraphs", this.div.id, "data", this.dygraphs.data);
    if (this.theme == "" || this.theme == undefined) {
        this.theme = "default";
        this.subtheme = "none";
    }
    openbexi_updatePageData(null, "page", this.div.id, "theme", this.theme);
    openbexi_updatePageData(null, "page", this.div.id, "subtheme", this.subtheme);
    if (this.template == "" || this.template == undefined)  this.template = "template/ob_dygraphs/default.css";
    openbexi_updatePageData(null, "page", this.div.id, "template", this.template);
}
openbexi_dygraphs.prototype.getData = function () {
    this.dygraphs.type = openbexi_getPageData(null, "page", this.div.id, "type");
    if (this.dygraphs.type == "") this.dygraphs.type = "dygraphs";
    this.dygraphs.data = openbexi_getPageData(null, "dygraphs", this.div.id, "data");
    this.dygraphs.view = openbexi_getPageData(null, "dygraphs", this.div.id, "view");
    this.csvFile = openbexi_getPageData(null, "dygraphs", this.div.id, "csv");
    this.jsonFile = openbexi_getPageData(null, "dygraphs", this.div.id, "json");
    this.theme = openbexi_getPageData(null, "page", this.div.id, "theme");
    this.subtheme = openbexi_getPageData(null, "page", this.div.id, "subtheme");
    this.template = openbexi_getPageData(null, "page", this.div.id, "template");
}
openbexi_dygraphs.prototype.set_template = function (css_file, category, action, rsync_canvas) {
    if (css_file == null || css_file == "")return;
    if (action == "open") {
        this.subtheme = css_file;
        openbexi_updatePageData(null, "page", this.div.id, "subtheme", css_file);
        openbexiNavigator.browse_CSS(null, null, this.subtheme, true);
    }
    else {
        this.genericObject.set_template(this, css_file, action, rsync_canvas);
        this.div.setAttribute((document.all ? "className" : "class"), "ob_dygraphs_" + this.theme);
        //$ob_jquery('#'+this.div.id).addClass("ob_dygraphs_" + this.theme);
    }
}
openbexi_dygraphs.prototype.getClass = function () {
    return "ob_dygraphs_" + this.theme;
}
openbexi_dygraphs.prototype.setSelectedEndpoint = function (objId) {
    openbexiNavigator.window_factory(null, 'ob_menu_CSS', null, 'minimize');
    if (openbexiNavigator) openbexiNavigator.update_menu_editor(this, true);
    this.first_node_selected = true;
}
openbexi_dygraphs.prototype.createDygraphs = function (connect_to_server) {
    try {
        var doc = null;
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "request", "type", "openbexi_DygraphsDataRequest");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "div", "name", this.div.id);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dygraphs", "type", this.dygraphs.type);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "json", "view", this.dygraphs.view);
        if (this.csvFile == null || this.csvFile == "" || this.csvFile == "null")
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "json", "text", this.dygraphs.data);
        else {
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "json", "text", "");
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "csv", "filename", this.csvFile);
        }

        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "project", openbexiNavigator.projectName);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "page", openbexiNavigator.HTML_short_pageName);

        var ob_xml = openbexi_get_xmlString(doc);
        if (connect_to_server) {
            var mode_sync = openbexi_synchron();
            openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_getDygraphs_CB);
        } else {
            return openbexi_getDygraphs_CB(ob_xml);
        }
    } catch (e) {
    }
}
openbexi_dygraphs.prototype.Dygraphs_browseXML = function (event) {
    try {
        openbexiNavigator.mode = "getDygraphsXML";
        openbexiNavigator.display(event, 0);
    } catch (e) {
    }
}
function openbexi_getDygraphs_CB(responseXML) {
    if (responseXML == null || responseXML == "") {
        if (openbexiNavigator != undefined) openbexiNavigator.status("openbexi_browse_picture_gallery_CB bug ???");
        __openbexi_debugC_dygraphs("showViewEditor_CB() Exception:", "No answer fron the server");
        openbexi_unloading2();
        return;
    }
    var ob_doc = openbexi_get_documentElement(responseXML, "text/xml");

    var status = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "status", "text");
    if (status != "" && status != "done") {
        __openbexi_debugC_dygraphs("openbexi_getDygraphs_CB() Info:", "status=" + status);
        if (openbexiNavigator != undefined) openbexiNavigator.top_frame_message(status, "50px", "error");
        openbexi_unloading2();
        return;
    }
    var appli_status = get_xml_classe_object_attribut_value(ob_doc, "openbexi_creative", "application", "status");
    if (appli_status != "") {
        __openbexi_debugC_dygraphs("openbexi_getDygraphs_CB() Info:", "appli_status=" + appli_status);
    }
    var exception = get_xml_classe_object_attribut_value(ob_doc, "openbexi_creative", "application", "exception");
    if (exception != "") __openbexi_debugC_dygraphs("openbexi_getDygraphs_CB() Exception:", exception);

    var request_type = get_xml_classe_object_attribut_value(ob_doc, "ob_request", "request", "type");
    var div_id = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "div", "name");

    var data = "";
    var file = "";
    if (request_type == "openbexi_DygraphsViewRequest") {
        if (getSelectedBexiObj(null).csvFile == null || getSelectedBexiObj(null).csvFile == "" || getSelectedBexiObj(null).csvFile == "null")
            data = getSelectedBexiObj(null).dygraphs.data;
        else {
            file = getSelectedBexiObj(null).csvFile;
        }

    } else {
        file = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "csv", "filename");
        if (file != "") {
            try {
                getSelectedBexiObj(null).csvFile = file;
            } catch (e) {
            }
            openbexi_updatePageData(null, "dygraphs", div_id, "csv", file);
            openbexi_updatePageData(null, "dygraphs", div_id, "json", "");
            openbexi_updatePageData(null, "page", "data", "json", file);
            var data_tmp = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "csv", "text");
            data = openbexi_formatCsvText(data_tmp);
        }
        else {
            file = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "json", "filename");
            try {
                getSelectedBexiObj(null).jsonFile = file;
            } catch (e) {
            }
            openbexi_updatePageData(null, "dygraphs", div_id, "json", file);
            openbexi_updatePageData(null, "dygraphs", div_id, "csv", "");
            data = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "json", "text");

            if (data == "") {
                if (openbexiNavigator != undefined) openbexiNavigator.top_frame_message("Sorry, Cannot read Dygraphs data ...", "50px", "error");
                openbexi_unloading2();
                return;
            }
        }
    }

    var view_tmp = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "json", "view");

    var view = openbexi_stringReplaceAll(view_tmp, "\"[", "[");
    view = openbexi_stringReplaceAll(view, "]\"", "]");
    view = openbexi_stringReplaceAll(view, "\\\"", "\"");

    // div id may not match with selected widget because data may come from external source
    try {
        if (getSelectedBexiObj(null).type != "openbexi_body" && getSelectedBexiObj(null).type != "openbexi_page" && div_id != getSelectedBexiObj(null).div.id)
            div_id = getSelectedBexiObj(null).div.id;
    } catch (e) {
    }

    try {
        // Update Dygraphs database
        getSelectedBexiObj(null).dygraphs.view = view;
        openbexi_updatePageData(null, "dygraphs", div_id, "view", view);
        if (data != "") {
            getSelectedBexiObj(null).dygraphs.data = data;
            openbexi_updatePageData(null, "dygraphs", div_id, "data", data);
        }
    } catch (e) {
    }

    var instance = null;
    document.getElementById(div_id).innerHTML = "";
    //alert(data);
    try {
        if (view == "")
            view = openbexi_getPageData(null, "dygraphs", div_id, "view");
        if (data == "") {
            instance = new Dygraph(
                    document.getElementById(div_id),
                    file,
                    JSON.parse(view)
            );
        } else {
            // Native data used
            new Dygraph(
                    instance = document.getElementById(div_id),
                    eval(data),
                    JSON.parse(view)
            );
        }
    } catch (e) {
    }

    try {
        if (openbexiNavigator) openbexiNavigator.status("Dygraphs updated", "#abff4b");
    } catch (e) {
    }
    openbexi_unloading2();
    return instance;

}
function openbexi_dygraphs_load_Data(div_id, file) {
    try {
        var doc = set_xml_classe_object_attribut_value(null, "ob_request", "request", "type", "openbexi_DygraphsDataRequest");
        var view = openbexi_getPageData(null, "dygraphs", div_id, "view");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "div", "name", div_id);
        if (file.match(RegExp(".csv"))) {
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "csv", "filename", file);
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "csv", "text", "");
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "json", "view", view);
        }
        var ob_xml = openbexi_get_xmlString(doc);
        // Send Dygraphs data request to server
        var mode_sync = openbexi_synchron();
        openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_getDygraphs_CB);

    } catch (e) {
    }
}
openbexi_dygraphs.prototype.load_Data = function (div_id, file, data) {
    try {
        var doc = set_xml_classe_object_attribut_value(null, "ob_request", "request", "type", "openbexi_DygraphsDataRequest");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "project", openbexiNavigator.projectName);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filename", openbexiNavigator.webPageName);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "div", "name", div_id);
        if (file.match(RegExp(".csv"))) {
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "csv", "filename", file);
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "csv", "text", openbexi_unformatCsvText(data));
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "json", "view", this.dygraphs.view);
        } else {
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "json", "filename", file);
            // Detect if it is a json view file
            if (data.match("\"labels") || data.match("\"title\"") || data.match("\"showRoller\"") || data.match("\"rollPeriod\"") || data.match("\"legend\"") || data.match("\"customBars\"") || data.match("\"fractions\"") || data.match("\"errorBars\"") || data.match("\"xAxis") || data.match("\"yAxis") || data.match("\"rangeSelector") || data.match("\"draw")) {
                doc = set_xml_classe_object_attribut_value(null, "ob_request", "request", "type", "openbexi_DygraphsViewRequest");
                doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "json", "view", openbexi_unformatJsonText(data));
                doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "json", "text", openbexi_unformatJsonText(data));
            }
            else {
                doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "json", "text", openbexi_unformatJsonText(data));
                doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "json", "view", this.dygraphs.view);
            }
        }
        var ob_xml = openbexi_get_xmlString(doc);

        // Send Dygraphs data request to server
        var mode_sync = openbexi_synchron();
        openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_getDygraphs_CB);

    } catch (e) {
    }
}
openbexi_dygraphs.prototype.getText = function () {
    return this.caption;
}
openbexi_dygraphs.prototype.pasteText_or_Link = function () {
    var text = window.clipboardData.getData('Text');
    var occurHTTP = text.match("http:\/\/|https:\/\/|c:|C:|d:|D:|file:|javascript:void");
    if (occurHTTP != null && occurHTTP.length != 0) {
        this.add_link(text, true);
    }
}
openbexi_dygraphs.prototype.getPopupAttributes = function () {
    return ob_dygraphs_popupAttributes;
}
openbexi_dygraphs.prototype.getInspectorAttributes = function () {
    return ob_dygraphs_inspectorAttributes;
}
openbexi_dygraphs.prototype.setSelected = function (objId) {
    this.genericObject.setSelected(objId);
    this.openbexiNavigator.update_menu_editor(this, true);
}
openbexi_dygraphs.prototype.setUnSelected = function (objId) {
    try {
        this.genericObject.setUnSelected(objId);
        if (currentBexiObj_selected.type != this.type)
            this.openbexiNavigator.update_menu_editor(this, false);
    } catch (e) {
        __openbexi_debugC("openbexi_dygraphs.prototype.setUnSelected()", "Exception:" + e.message);
    }
}
openbexi_dygraphs.prototype.getChildrenId = function () {
    var count = 0;
    var list = new Array();
    list[count++] = this.div.id;
    var childId = null;
    if (document.getElementById(this.parent) != null || document.getElementById(this.parent) != undefined) {
        for (var j = 0; j < document.getElementById(this.parent).childNodes.length; j++) {
            childId = document.getElementById(this.parent).childNodes[j].id;
            if (childId != null && childId != "") {
                list[count++] = childId;
            }
        }
    }
    return list;
}
openbexi_dygraphs.prototype.setAttribute = function (name, value) {
    return this.genericObject.setAttribute(this.getChildrenId(), name, value);
}
openbexi_dygraphs.prototype.changeStyle = function (objBexi, direction) {
    this.genericObject.changeStyle(objBexi, this, direction);
}
openbexi_dygraphs.prototype.removeObject = function (flag) {
    try {
        if (this.div.getAttribute("ob_template") == "true" && openbexiNavigator.HTML_pageName != "template.html")   return;
        var listIdChild = this.getChildrenId();
        if (listIdChild) {
            for (var j = 0; j < listIdChild.length; j++) {
                openbexi_deletePageData(null, "page", listIdChild[j], "ALL", null);
            }
        }
    }
    catch (e) {
    }
    openbexi_deletePageData(null, "dygraphs", this.div.id, "ALL", null);
    this.genericObject.removeObject(this);
    ob_setDirty_flag(flag);
}
openbexi_dygraphs.prototype.my_PickFunc = function (e) {
    openbexi_stopEventPropagation(e);
    var bexiObj = getSelectedBexiObj(this.id);
    my_PickFunc(bexiObj.div);
}
openbexi_dygraphs.prototype.add_function = function (protocole, functionName, ob_doc) {
    if (this.genericObject != null) this.genericObject.add_function(protocole, functionName, ob_doc);
}
openbexi_dygraphs.prototype.add_link = function (url, unselect) {
    if (url == null) {
        url = this.genericObject.get_link(this.div.id);
        if (url == "") {
            url = prompt(openbexi_lang("enterObjectURL") + ":", "http://");
            this.dygraphs.title = "";
        }
        else {
            url = prompt(openbexi_lang("enterObjectURL") + ":", url);
            this.dygraphs.title = url;
        }
    }
    if (url != null) {
        if (this.genericObject != null) this.genericObject.add_link(this.div.id, "http", url, "onclick");
        this.dygraphs.style.cursor = "pointer";
        this.dygraphs.title = url;
    }
    if (unselect)  my_PickFunc(this.div);
}
openbexi_dygraphs.prototype.delete_link = function (unselect) {
    if (this.genericObject != null) this.genericObject.delete_link(this.div.id);
    this.dygraphs.style.cursor = "default";
    this.dygraphs.title = "";
    if (unselect)my_PickFunc(this.div);
}
openbexi_dygraphs.prototype.debug = function () {
    return this.genericObject.debug(this);
}
openbexi_dygraphs.prototype.innerHTML_and_EVENTS = function () {
    // Remove extra char generated by json stringfy which may cause issue colors
    //     ex; colors: ["#009900","#00DD55","#0033CC","#FF0066"],
    var properties_tmp = this.dygraphs.view;
    var view = openbexi_stringReplaceAll(properties_tmp, "\"[", "[");
    view = openbexi_stringReplaceAll(view, "]\"", "]");
    view = openbexi_stringReplaceAll(view, "\\\"", "\"");

    var str = '      <script type="text/javascript">\n';
    if (this.csvFile == null || this.csvFile == "" || this.csvFile == "null") {
        str += '       new Dygraph( document.getElementById("' + this.div.id + '"),\n';
        str += this.dygraphs.data;
        str += ',';
        str += view;
        str += ')';
    } else {
        str += '       new Dygraph( document.getElementById("' + this.div.id + '"),\n';
        str += '"' + this.csvFile + '"';
        str += ',';
        str += view;
        str += ')';
    }
    str += '      </script>';
    return str;
}
openbexi_dygraphs.prototype.get_editor = function () {
    return openbexiNavigator.get_menu_editor(this.getPopupAttributes());
}
openbexi_dygraphs.prototype.forward = function () {
    return this.genericObject.forward(this.div, "+");
}
openbexi_dygraphs.prototype.backward = function () {
    return this.genericObject.backward(this.div, "-");
}
openbexi_dygraphs.prototype.align_left_auto_arrange = function () {
    return this.genericObject.align_left_auto_arrange(this);
}
openbexi_dygraphs.prototype.align_right_auto_arrange = function () {
    return this.genericObject.align_right_auto_arrange(this);
}
openbexi_dygraphs.prototype.align_top_auto_arrange = function () {
    return this.genericObject.align_top_auto_arrange(this);
}
openbexi_dygraphs.prototype.align_bottom_auto_arrange = function () {
    return this.genericObject.align_bottom_auto_arrange(this);
}
openbexi_dygraphs.prototype.vertical_width_auto_resize = function () {
    return this.genericObject.vertical_width_auto_resize(this);
}
openbexi_dygraphs.prototype.vertical_height_auto_resize = function () {
    return this.genericObject.vertical_height_auto_resize(this);
}
openbexi_dygraphs.prototype.horizontal_width_auto_resize = function () {
    return this.genericObject.horizontal_width_auto_resize(this);
}
openbexi_dygraphs.prototype.horizontal_height_auto_resize = function () {
    return this.genericObject.horizontal_height_auto_resize(this);
}
openbexi_dygraphs.prototype.resize = function () {
    this.createDygraphs();
}
openbexi_dygraphs.prototype.vertical_spacing_auto_arrange = function () {
    return this.genericObject.vertical_spacing_auto_arrange(this);
}
openbexi_dygraphs.prototype.horizontal_spacing_auto_arrange = function () {
    return this.genericObject.horizontal_spacing_auto_arrange(this);
}
openbexi_dygraphs.prototype.undo_auto_arrange = function () {
    return this.genericObject.undo_auto_arrange(this);
}
openbexi_dygraphs.prototype.redo_auto_arrange = function () {
    return this.genericObject.redo_auto_arrange(this);
}
openbexi_dygraphs.prototype.functions_to_load = function () {
    return this.genericObject.functions_to_load(this.div.id);
}
openbexi_dygraphs.prototype.head_code = function () {
    openbexi_add_javascript(null, "javascript/dygraphs/", "dygraph-combined.js");
    openbexi_add_javascript(null, "javascript/", "openbexi_dygraphs.js");
    return this.genericObject.head_code(this);
}
openbexi_dygraphs.prototype.body_code = function () {
    //return this.genericObject.body_code(this);
    var str = "";
    try {
        var inner = this.innerHTML_and_EVENTS();
        var functions = this.genericObject.functions_to_trigger(this.div.id);
        if (this.div.getAttribute(document.all ? "className" : "class") != null)
            str = str + '        <div class="' + this.div.getAttribute(document.all ? "className" : "class") + '" CLASSE="' + this.div.getAttribute("CLASSE") + '" id="' + this.div.id + '" ob_template="' + this.div.ob_template + '" obzindex="' + this.div.obzindex + '" creation_date="' + this.div.getAttribute("creation_date") + '" style="' + openbexi_get_CSS_except_CSS3(this.div) + '" ' + functions + '>\n';
        else
            str = str + '        <div CLASSE="' + this.div.getAttribute("CLASSE") + '" id="' + this.div.id + '" ob_template="' + this.div.ob_template + '" obzindex="' + this.div.obzindex + '" creation_date="' + this.div.getAttribute("creation_date") + '" style="' + openbexi_get_CSS_except_CSS3(this.div) + '" ' + functions + '>\n';

        if (inner != null && inner != "") {
            str = str + "            " + inner + "\n";
        }
        str = str + '        </div>\n';
    } catch (e) {
        __openbexi_debugC("openbexi_dygraphs.prototype.body_code()", "Exception:" + e.message);
    }
    return str;
}
openbexi_dygraphs.prototype.remove = function () {
}
var bexicontext_dygraphs_view_editor;
openbexi_dygraphs.prototype.displayViewDygraphs = function () {
    document.getElementById("bexicontext_dygraphs_view").value = openbexi_formatJsonText(this.dygraphs.view);

    //Implementing a Syntax-Highlighting with JavaScript Editor from code mirror
    bexicontext_dygraphs_view_editor = CodeMirror.fromTextArea(document.getElementById("bexicontext_dygraphs_view"), {mode: "css", theme: "night", lineNumbers: true, matchBrackets: true, tabMode: "indent", onChange: function () {
        clearTimeout(pending);
        setTimeout(update, 400);
    }});
    var totalLines = bexicontext_dygraphs_view_editor.lineCount();
    var totalChars = bexicontext_dygraphs_view_editor.getTextArea().value.length;
    bexicontext_dygraphs_view_editor.autoFormatRange({line: 0, ch: 0}, {line: totalLines, ch: totalChars});
    CodeMirror.commands["goPageUp"](bexicontext_dygraphs_view_editor);
}
openbexi_dygraphs.prototype.updateViewDygraphs = function () {
    this.dygraphs.view = openbexi_unformatJsonText(bexicontext_dygraphs_view_editor.getValue());
    this.createDygraphs(false);
}
var bexicontext_dygraphs_data_editor;
openbexi_dygraphs.prototype.displayDygraphsData = function () {
    if (this.csvFile == null || this.csvFile == "" || this.csvFile == "null")
        document.getElementById("bexicontext_dygraphs_data").value = openbexi_formatJsonText2(this.dygraphs.data);
    else
        document.getElementById("bexicontext_dygraphs_data").value = this.csvFile;

    //Implementing a Syntax-Highlighting with JavaScript Editor from code mirror
    bexicontext_dygraphs_data_editor = CodeMirror.fromTextArea(document.getElementById("bexicontext_dygraphs_data"), {mode: "javascript", theme: "night", lineNumbers: true, matchBrackets: true, tabMode: "indent", onChange: function () {
        clearTimeout(pending);
        setTimeout(update, 400);
    }});
    var totalLines = bexicontext_dygraphs_data_editor.lineCount();
    var totalChars = bexicontext_dygraphs_data_editor.getTextArea().value.length;
    bexicontext_dygraphs_data_editor.autoFormatRange({line: 0, ch: 0}, {line: totalLines, ch: totalChars});
    CodeMirror.commands["goPageUp"](bexicontext_dygraphs_data_editor);
}
openbexi_dygraphs.prototype.updateDataDygraphs = function () {
    if (this.csvFile == null || this.csvFile == "" || this.csvFile == "null")
        this.dygraphs.data = openbexi_unformatJsonText(bexicontext_dygraphs_data_editor.getValue());
    else
        this.csvFile = openbexi_unformatJsonText(bexicontext_dygraphs_data_editor.getValue());
    //this.dygraphs.instance.updateOptions({ 'file': this.dygraphs.data });
    this.createDygraphs(false);
}
function openbexi_formatJsonText(json) {
    var text = openbexi_unformatJsonText(json);
    var textFormated = "";
    for (var i = 0; i < text.length; i++) {
        if ((text[i] == ","))
            textFormated += text[i] + "\n\t";
        else if ((text[i] == "\\"))
            textFormated += "";
        else if (text[i - 1] == "]" && text[i] == "\"")
            textFormated += "";
        else if (text[i + 1] == "[" && text[i] == "\"")
            textFormated += "";
        else
            textFormated += text[i];

    }
    return textFormated;
}
function openbexi_formatJsonText2(json) {
    var text = openbexi_unformatJsonText(json);
    var textFormated = "";
    for (var i = 0; i < text.length; i++) {
        if (text[i - 1] == "]")
            textFormated += text[i] + "\n";
        else
            textFormated += text[i];

    }
    return textFormated;
}
function openbexi_unformatJsonText(text) {
    var textunFormated = "";
    for (var i = 0; i < text.length; i++) {
        if ((text[i] != '\n' && text[i] != '\t' && text[i] != '\r'))
            textunFormated += text[i];
    }
    return textunFormated;
}
function openbexi_unformatCsvText(text) {
    var textUnFormated = "";
    for (var i = 0; i < text.length; i++) {
        if (text[i] != '\n' && text[i] != '\t' && text[i] != '\r')
            textUnFormated += text[i];
        if (text[i] == '\n')
            textUnFormated += "@";
    }

    return textUnFormated;
}
function openbexi_formatCsvText(text) {
    var textUnFormated = "";
    for (var i = 0; i < text.length; i++) {
        if (text[i] == '@')
            textUnFormated += "\n";
        else
            textUnFormated += text[i];
    }
    return textUnFormated;
}
function openbexi_formatCsv2JsonText(text) {
    var textUnFormated = "[[";
    var break_flag = false;
    var first_break = false;
    for (var i = 0; i < text.length; i++) {
        if ((text[i] != '\n' && text[i] != '\t' && text[i] != '\r')) {
            if (first_break) {
                if (break_flag)
                    textUnFormated += ",[";
                textUnFormated += text[i];
                break_flag = false;
            }

        }
        if (text[i] == "\n") {
            break_flag = true;
            if (first_break)
                textUnFormated += "]";
            else
                break_flag = false;
            first_break = true;
        }
    }
    return textUnFormated += "]";
}


