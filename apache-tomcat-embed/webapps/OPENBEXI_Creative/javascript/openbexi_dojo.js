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
var ob_dojo_view_editor = [
    ['menu_RequestBrowser', 'ob_menu_RequestBrowser', '', '', '', '', '', 'Dojo Editor', '', '850px', '540px', '', ''],
    ['window_left', 'ob_menu_RequestBrowser_sub_left', '', '', '', '', '', '', '', '', '', 'overflow: auto;position:absolute;width:0%;', ''],
    ['end_window_left', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_body', 'ob_menu_RequestBrowser_sub', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow: hidden;position:absolute;width:100%;', ''],
    ['form', 'ob_form', '', '', '', '', '', '', '', '', '', 'position:absolute;left:0px;', ''],
    ['fieldset', 'ob_fieldset', '', '', '', '', '', '', '', '', '', 'width:800px', ''],
    ['legend', '', '', '', '', '', '', 'Dojo View Editor', '', '', '', '', ''],
    ['textarea', 'bexicontext_dojo_view', '', '', '', '', '', 'View', '', '', '', '', '13'],
    ['sep', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_form', '', '', '', '', '', '', ' name', '', '', '', '', ''],
    ['sep', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['sep', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['sep', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_window_body', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_foot', 'ob_menu_RequestBrowser_sub_foot', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow: hidden;position:absolute;height:25%', ''],
    ['ok', '', 'onclick="openbexi_applyViewEditor(event);"', '', 'onmousedown="src=\'gif/ob_ok_down.png\';"', 'onmouseover="src=\'gif/ob_ok_on.png\';"', 'onmouseout="src=\'gif/ob_ok.png\';"', 'Apply', '', '', '', '', ''],
    ['cancel', '', 'onclick="openbexiNavigator.window_factory(event,\'ob_menu_RequestBrowser\',null,\'hidden\');"', '', 'onmousedown="src=\'gif/ob_cancel_down.png\';"', 'onmouseover="src=\'gif/ob_cancel_on.png\';"', 'onmouseout="src=\'gif/ob_cancel.png\';"', 'Cancel', '', '', '', '', ''],

    ['end_window_foot', '', '', '', '', '', '', '', '', '', '', '', '']
];
var ob_dojo_data_editor = [
    ['menu_RequestBrowser', 'ob_menu_RequestBrowser', '', '', '', '', '', 'Dojo Editor', '', '750px', '540px', '', ''],
    ['window_left', 'ob_menu_RequestBrowser_sub_left', '', '', '', '', '', '', '', '', '', 'overflow: auto;position:absolute;width:0%;', ''],
    ['end_window_left', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_body', 'ob_menu_RequestBrowser_sub', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow: hidden;position:absolute;width:100%;', ''],
    ['form', 'ob_form', '', '', '', '', '', '', '', '', '', 'position:absolute;left:0px;', ''],
    ['fieldset', 'ob_fieldset', '', '', '', '', '', '', '', '', '', 'width:650px', ''],
    ['legend', '', '', '', '', '', '', 'Dojo Data Editor', '', '', '', '', ''],
    ['textarea', 'bexicontext_dojo_data', '', '', '', '', '', 'Data', '', '', '', '', '13'],
    ['sep', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_form', '', '', '', '', '', '', ' name', '', '', '', '', ''],
    ['sep', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['sep', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['sep', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_window_body', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_foot', 'ob_menu_RequestBrowser_sub_foot', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow: hidden;position:absolute;height:25%', ''],
    ['ok', '', 'onclick="openbexi_applyDataEditor();"', '', 'onmousedown="src=\'gif/ob_ok_down.png\';"', 'onmouseover="src=\'gif/ob_ok_on.png\';"', 'onmouseout="src=\'gif/ob_ok.png\';"', 'Apply', '', '', '', '', ''],
    ['cancel', '', 'onclick="openbexiNavigator.window_factory(event,\'ob_menu_RequestBrowser\',null,\'hidden\');"', '', 'onmousedown="src=\'gif/ob_cancel_down.png\';"', 'onmouseover="src=\'gif/ob_cancel_on.png\';"', 'onmouseout="src=\'gif/ob_cancel.png\';"', 'Cancel', '', '', '', '', ''],

    ['end_window_foot', '', '', '', '', '', '', '', '', '', '', '', '']
];
var ob_dojo_property_editor = [
    ['menu_RequestBrowser', 'ob_menu_RequestBrowser', '', '', '', '', '', 'Grid editor properties', '', '430px', '420px', '', ''],
    ['window_left', 'ob_menu_RequestBrowser_sub_left', '', '', '', '', '', '', '', '', '', 'overflow: auto;position:absolute;width:0%;', ''],
    ['end_window_left', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_body', 'ob_menu_RequestBrowser_sub', '', '', '', '', '', '', '', '', '', 'overflow: hidden;position:absolute;width:100%;', ''],
    ['form', 'ob_form', '', '', '', '', '', '', '', '', '', 'position:absolute;left:0px;', ''],
    ['fieldset', 'ob_fieldset', '', '', '', '', '', '', '', '', '', '', ''],
    ['legend', '', '', '', '', '', '', 'Grid editor properties', '', '', '', '', ''],
    ['input', 'ob_grid_rowCount', 'this.style.background=\'red\';', '', '', '', '', 'row count', '', '', '', 'background-image: url(\"gif/fading_background_2_red.png\");', '1'],
    ['sep', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['input', 'ob_grid_autoWidth', 'this.style.background=\'red\';', '', '', '', '', 'autoWidth', '', '', '', 'background-image: url(\"gif/fading_background_2_red.png\");', '1'],
    ['input', 'ob_grid_selectionMode', 'this.style.background=\'red\';', '', '', '', '', 'selectionMode', '', '', '', 'background-image: url(\"gif/fading_background_2_red.png\");', '1'],
    ['input', 'ob_grid_clientSort', 'this.style.background=\'red\';', '', '', '', '', 'clientSort', '', '', '', 'background-image: url(\"gif/fading_background_2_red.png\");', '1'],
    ['input', 'ob_grid_columnReordering', 'this.style.background=\'red\';', '', '', '', '', 'columnReordering', '', '', '', 'background-image: url(\"gif/fading_background_2_red.png\");', '1'],
    ['input', 'ob_grid_rowSelector', 'this.style.background=\'red\';', '', '', '', '', 'rowSelector', '', '', '', 'background-image: url(\"gif/fading_background_2_red.png\");', '1'],
    ['end_fieldset', 'ob_fieldset', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_form', '', '', '', '', '', '', ' name', '', '', '', '', ''],
    ['sep', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_window_body', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_foot', 'ob_menu_RequestBrowser_sub_foot', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow: hidden;position:absolute;height:25%', ''],
    ['ok', '', 'onclick="openbexi_SaveGridProperties(event);"', '', 'onmousedown="src=\'gif/ob_ok_down.png\';"', 'onmouseover="src=\'gif/ob_ok_on.png\';"', 'onmouseout="src=\'gif/ob_ok.png\';"', 'Save', '', '', '', '', ''],
    ['cancel', '', 'onclick="openbexiNavigator.window_factory(event,\'ob_menu_RequestBrowser\',null,\'hidden\');"', '', 'onmousedown="src=\'gif/ob_cancel_down.png\';"', 'onmouseover="src=\'gif/ob_cancel_on.png\';"', 'onmouseout="src=\'gif/ob_cancel.png\';"', 'Cancel', '', '', '', '', ''],
    ['end_window_foot', '', '', '', '', '', '', '', '', '', '', '', '']
];
var ob_load_csv = [
    ['menu_RequestBrowser', 'ob_menu_RequestBrowser', '', '', '', '', '', 'CSV browser', '', '430px', '400px', '', ''],
    ['window_left', 'ob_menu_RequestBrowser_sub_left', '', '', '', '', '', '', '', '', '', 'overflow: auto;position:absolute;width:0%;', ''],
    ['end_window_left', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_body', 'ob_menu_RequestBrowser_sub', '', '', '', '', '', '', '', '', '', 'overflow: hidden;position:absolute;width:100%;', ''],
    ['form', 'ob_form', '', '', '', '', '', '', '', '', '', 'position:absolute;left:0px;', ''],
    ['fieldset', 'ob_fieldset', '', '', '', '', '', '', '', '', '', '', ''],
    ['legend', '', '', '', '', '', '', 'Load csv file', '', '', '', '', ''],
    ['input', 'bexicontext_csv_mode', '', '', '', '', '', 'local or remote', '', '', '', '', '13'],
    ['input', 'bexicontext_csv_path', 'this.style.background=\'red\';', '', '', '', '', 'CSV file path', '', '', '', 'background-image: url(\"gif/fading_background_2_red.png\");', '1'],
    ['input', 'bexicontext_csv_file', 'this.style.background=\'red\';', '', '', '', '', 'CSV file name', '', '', '', 'background-image: url(\"gif/fading_background_2_red.png\");', '1'],
    ['input', 'bexicontext_csv_extension', 'this.style.background=\'red\';', '', '', '', '', 'CSV file extension', '', '', '', 'background-image: url(\"gif/fading_background_2_red.png\");', '1'],
    ['input', 'bexicontext_csv_separator', 'this.style.background=\'red\';', '', '', '', '', 'CSV separator', '', '', '', 'background-image: url(\"gif/fading_background_2_red.png\");', '1'],
    ['sep', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_fieldset', 'ob_fieldset', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_form', '', '', '', '', '', '', ' name', '', '', '', '', ''],
    ['end_window_body', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_foot', 'ob_menu_RequestBrowser_sub_foot', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow: hidden;position:absolute;height:25%', ''],
    ['ok', '', 'onclick="openbexi_loadCSV();openbexiNavigator.window_factory(event,\'ob_menu_RequestBrowser\',null,\'hidden\');"', '', 'onmousedown="src=\'gif/ob_ok_down.png\';"', 'onmouseover="src=\'gif/ob_ok_on.png\';"', 'onmouseout="src=\'gif/ob_ok.png\';"', 'Save', '', '', '', '', ''],
    ['cancel', '', 'onclick="openbexiNavigator.window_factory(event,\'ob_menu_RequestBrowser\',null,\'hidden\');"', '', 'onmousedown="src=\'gif/ob_cancel_down.png\';"', 'onmouseover="src=\'gif/ob_cancel_on.png\';"', 'onmouseout="src=\'gif/ob_cancel.png\';"', 'Cancel', '', '', '', '', ''],
    ['end_window_foot', '', '', '', '', '', '', '', '', '', '', '', '']
];
var ob_dojoType = [
    ['dojox.grid.Grid', 'Grid/Table'],
    ['dijit.form.CheckBox', 'CheckBox'],
    ['dijit.form.TextBox', 'TextBox'],
    ['dijit.form.ComboBox', 'ComboBox'],
    ['dijit.form.CurrencyTextBox', 'CurrencyTextBox'],
    ['dijit.form.ValidationTextBox', 'ValidationTextBox'],
    ['dijit.form.DateTextBox', 'DateTextBox'],
    ['dijit.form.NumberTextBox', 'Integer'],
    ['dijit.form.ValidationTextBox', 'UsZip'],
    ['dijit.form.ValidationTextBox', 'url'],
    ['dijit.form.ValidationTextBox', 'Image'],
    ['dijit.form.TextBox', 'Password']
];
var ob_dojo_inspectorAttributes = [
    ['editor'         , 'DojoEditor'   , 'true']
];
var ob_dojo_popupAttributes = [
    ['menuitem6', 'this.getProperties(event)    ' , 'tools', 'gif\/properties_x48.png', '48px', '48px'],
    ['menuitem18' , 'openbexi_get_dojo_type(event)', 'dojoType', 'gif\/dojo_x48.png', '48px', '48px'],
    ['menuitem9' , 'this.show_pager()'            , 'pager', 'gif\/Enext_small.png', '48px', '48px'],
    ['menuitem18', 'this.backward()'         , 'SendToBack'  , 'gif\/move_backward_x48.png', '48px', '48px'],
    ['menuitem20', 'this.forward()'          , 'BringToFront', 'gif\/move_forward_x48.png', '48px', '48px'],
    ['menuitem41', 'this.removeObject(true);openbexiNavigator.update_menu_editor(null, false);' , 'DojoDelete'  , 'gif\/remove_dojo_x48.png', '48px', '48px']
];
var ob_dojo_popupGridAttributes = [
    ['menuitem7', 'openbexi_showViewEditor(event);', 'View', 'gif\/ob_view_x48.png', '48px', '48px'],
    ['menuitem8', 'openbexi_showDataEditor(event)', 'Data', 'gif\/ob_data_x48.png', '48px', '48px'],
    ['menuitem10', 'openbexi_showPropertyEditor(event)', 'Properties', 'gif\/properties_x48.png', '48px', '48px'],
    ['menuitem11', 'openbexiNavigator.window_factory(null, \'ob_menu_SQLBrowser\', null, \'minimize\');', 'SQLDatabases', 'gif\/ob_sql_x48.png', '48px', '48px'],
    ['menuitem13', 'openbexi_showEventCSVEditor();', 'CSVFile', 'gif\/ob_csv_x48.png', '48px', '48px'],
    ['menuitem17', 'openbexiNavigator.javascript(event);'           , 'Add_javascript_to_grid'  , 'gif\/javascript_x48.png', '48px', '48px'],
    ['menuitem19' , 'this.show_pager()'            , 'pager', 'gif\/Enext_small.png', '48px', '48px'],
    ['menuitem21', 'this.backward()'         , 'SendToBack'  , 'gif\/move_backward_x48.png', '48px', '48px'],
    ['menuitem24', 'this.forward()'          , 'BringToFront', 'gif\/move_forward_x48.png', '48px', '48px'],
    ['menuitem41', 'this.removeObject(true);openbexiNavigator.update_menu_editor(null, false);' , 'GridDelete'  , 'gif\/table_table_delete_x48.png', '48px', '48px']
];
var ob_dojo_popupComboAttributes = [
    ['menuitem1', 'display_list_editor()', 'ListEditor', 'gif\/list_editor_x48.png', '48px', '48px'],
    ['menuitem6', 'this.getProperties(event)', 'properties', 'gif\/properties_x48.png', '48px', '48px'],
    ['sep', null, null, null, null, null],
    ['menuitem18', 'this.backward()'         , 'SendToBack'  , 'gif\/send_back_x48.png', '48px', '48px'],
    ['menuitem20', 'this.forward()'          , 'BringToFront', 'gif\/send_forward_x48.png', '48px', '48px'],
    ['menuitem41', 'this.removeObject(true);openbexiNavigator.update_menu_editor(null, false);' , 'DojoDelete', 'gif\/remove_dojo_x48.png', '48px', '48px'],
    ['sep', null, null, null, null, null]
];

var ob_dojo_popupLinkAttributes = [];

var openbexi_dojo = function (classname, subtype, subsubtype, bexiObjParent, obj, name, top, left, width, height, table, attribut) {
    try {
        __openbexi_debugC("openbexi_dojo(" + classname + "," + subtype + "," + subsubtype + "," + bexiObjParent + "," + obj + "," + name + "," + top + "," + left + "," + width + "," + height + "," + table + "," + attribut + ")", "Classe:");

        this.loading_status = "loaded";
        if (openbexiNavigator)
            this.openbexiNavigator = openbexiNavigator;
        else
            this.openbexiNavigator = new openbexi_navigator();
        this.name = name;
        this.id = name;
        this.type = "openbexi_dojo";
        this.subtype = subtype;
        this.subsubtype = subsubtype;
        this.bexiParent = bexiObjParent;
        if (name == null || name == "") name = getNewIdDiv("div");
        if (bexiObjParent != null) {
            this.parentNodeId = bexiObjParent.id;
            this.parentType = bexiObjParent.type;
            this.grandParendNodeId = getSelectedBexiObj(this.parentNodeId).parentNodeId;
        } else {
            this.parentNodeId = "BODY";
            this.parentType = "openbexi_body";
            this.grandParendNodeId = "none";
        }
        var divobj;
        if (obj == null) {
            divobj = new openbexi_div(bexiObjParent, obj, name, top, left, width, height);
            this.div = divobj.div;
            this.div.setAttribute("CLASSE", "DIV_DOJO");
            this.div.setAttribute("SUBCLASSE", subtype);
            this.div.setAttribute("creation_date", new Date());
            this.parent = this.div.id;
            if (this.subtype == "dojox.grid.Grid" || this.subtype == "GridX") {
                this.div.style.height = "320px";
                this.div.style.width = "650px";
            } else {
                this.div.style.width = width;
                this.div.style.height = height;
            }
            if (table != null && attribut != null)
                this.div.name = table + "." + attribut;
            else
                this.div.name = name;
            this.div.style.border = "1px white";
            this.view1 = null;
            if (this.subtype == "dojox.grid.Grid" || this.subtype == "GridX") {
                openbexi_updatePageData(null, "page", this.div.id, "data_0", "Column0,Column1,Column2");
                openbexi_updatePageData(null, "page", this.div.id, "data_1", "none,none,none");
                openbexi_updatePageData(null, "page", this.div.id, "data_2", "none,none,none");
                openbexi_updatePageData(null, "page", this.div.id, "data_3", "none,none,none");
                this.rowCount = 10;
                this.pager_init(bexiObjParent, obj, name, this.rowCount);
            }
        } else {
            divobj = new openbexi_div(bexiObjParent, obj, obj.id, top, left, width, height);
            this.div = divobj.div;
            this.parent = this.div.id;
            this.div.ob_template = obj.getAttribute("ob_template");
            this.div.setAttribute("CLASSE", "DIV_DOJO");
            this.div.setAttribute("creation_date", obj.getAttribute("creation_date"));
            this.div.setAttribute("obzindex", obj.getAttribute("obzindex"));
            this.div.setAttribute("ob_template", obj.getAttribute("ob_template"));
            this.div.innerHTML = "";
            this.getData();
            this.div.setAttribute("SUBCLASSE", this.subtype);
            this.div.style.zIndex = obj.getAttribute("obzindex");
        }
        this.setData();
        this.create_DOJO();
        this.genericObject = new openbexi_generic_object(this);
        if (obj == null) this.forward();
        this.reload_model_and_data(this.div.id);
        this.set_template(this.template, null, null, null);
    } catch (e) {
        __openbexi_debugC("openbexi_dojo()", "Exception:" + e.message);
    }
};
openbexi_dojo.prototype.setData = function () {
    this.div.style.cursor = "default";
    openbexi_updatePageData(null, "page", this.div.id, "type", this.type);
    openbexi_updatePageData(null, "page", this.div.id, "subtype", this.subtype);
    openbexi_updatePageData(null, "page", this.div.id, "parentId", this.parentNodeId);
    openbexi_updatePageData(null, "page", this.div.id, "parentType", this.parentType);
    openbexi_updatePageData(null, "page", this.div.id, "divname", this.div.name);
    if (this.subtype == null || this.subtype == "") {
        this.subtype = "dijit.form.TextBox";
    }
    if (this.subsubtype == null || this.subsubtype == "") {
        this.subsubtype = "TextBox";
    }
    openbexi_updatePageData(null, "page", this.subtype, "template", "default");
    if (this.subtype == "dojox.grid.Grid" || this.subtype == "GridX") {
        openbexi_updatePageData(null, "page", this.div.id, "rowCount", this.rowCount);
        this.pager.maxItems = this.rowCount;
        if (this.theme == "" || this.theme == undefined)  this.theme = "tundra";
        openbexi_updatePageData(null, "page", this.div.id, "theme", this.theme);
        if (this.template == "" || this.template == undefined)  this.template = "dijit/themes/tundra/tundra.css";
        openbexi_updatePageData(null, "page", this.div.id, "template", this.template);
        this.set_template(this.theme);
        openbexi_updatePageData(null, "page", this.div.id, "data_change", "false");
        //this.col=3
        //openbexi_updatePageData(null, this.subtype, this.div.id, "col", this.col);
    }
    if (this.subtype == "dijit.form.ComboBox") {
        this.autoComplete = "";
        openbexi_updatePageData(null, this.subtype, this.div.id, "autoComplete", this.autoComplete);
        this.value = "";
        openbexi_updatePageData(null, this.subtype, this.div.id, "value", this.value);
        this.store = "";
        openbexi_updatePageData(null, this.subtype, this.div.id, "store", this.store);
    }
    if (this.subtype == "dijit.form.CheckBox") {
        this.value = "false";
        openbexi_updatePageData(null, this.subtype, this.div.id, "value", this.value);
    }
    if (this.subtype == "dijit.form.DateTextBox") {
        this.value = "";
        openbexi_updatePageData(null, this.subtype, this.div.id, "value", this.value);
    }
    if (this.subtype == "dijit.form.NumberTextBox") {
        openbexi_updatePageData(null, this.subtype, this.div.id, "value", this.value);
        this.required = "false";
        openbexi_updatePageData(null, this.subtype, this.div.id, "required", this.required);
        this.invalidMessage = "Number required.";
        openbexi_updatePageData(null, this.subtype, this.div.id, "invalidMessage", this.invalidMessage);
    }
    if (this.subtype == "dijit.form.TextBox" || this.subtype == "dijit.form.ValidationTextBox") {
        this.value = "";
        openbexi_updatePageData(null, this.subtype, this.div.id, "value", this.value);
        this.trim = "true";
        openbexi_updatePageData(null, this.subtype, this.div.id, "trim", this.trim);
        openbexi_updatePageData(null, this.subtype, "trim", "example", "true or false");
        this.required = "false";
        openbexi_updatePageData(null, this.subtype, this.div.id, "required", this.required);
        openbexi_updatePageData(null, this.subtype, "required", "example", "true or false");
        this.signed = "false";
        openbexi_updatePageData(null, this.subtype, this.div.id, "signed", this.signed);
        openbexi_updatePageData(null, this.subtype, "signed", "example", "true or false");
        this.invalidMessage = "";
        openbexi_updatePageData(null, this.subtype, this.div.id, "invalidMessage", this.invalidMessage);
        this.missingMessage = "";
        openbexi_updatePageData(null, this.subtype, this.div.id, "missingMessage", this.missingMessage);
        this.separator = "";
        openbexi_updatePageData(null, this.subtype, this.div.id, "separator", this.separator);
        if (this.subsubtype == "ValidationTextBox") {
            openbexi_updatePageData(null, this.subtype, this.div.id, "regExp", "");
        }
        if (this.subsubtype == "UsZip") {
            this.regExp = "\\d{5}";
            openbexi_updatePageData(null, this.subtype, this.div.id, "regExp", "\\d{5}");
            this.invalidMessage = "Invalid US ZIP code, example: 20852";
            openbexi_updatePageData(null, this.subtype, this.div.id, "invalidMessage", this.invalidMessage);
        }
    }
    openbexi_updatePageData(null, "page", this.div.id, "subtype", this.subtype);
    openbexi_updatePageData(null, "page", this.div.id, "subsubtype", this.subsubtype);
}
openbexi_dojo.prototype.getData = function () {
    this.type = openbexi_getPageData(null, "page", this.div.id, "type");
    this.parentNodeId = openbexi_getPageData(null, "page", this.div.id, "parentId");
    this.parentType = openbexi_getPageData(null, "page", this.div.id, "parentType");
    this.subtype = openbexi_getPageData(null, "page", this.div.id, "subtype");
    this.subsubtype = openbexi_getPageData(null, "page", this.div.id, "subsubtype");
    this.template = openbexi_getPageData(null, "page", this.subtype, "template");
    this.div.name = openbexi_getPageData(null, "page", this.div.id, "divname");
    if (this.subtype == "dojox.grid.Grid" || this.subtype == "GridX") {
        this.rowCount = openbexi_getPageData(null, "page", this.div.id, "rowCount");
        var pager = getSelectedBexiObj(this.div.id + "_pager");
        this.pager = pager.div;
        this.pager.maxItems = this.rowCount;
        this.view1 = openbexi_getPageData(null, "page", this.div.id, "view");
        this.theme = openbexi_getPageData(null, "page", this.div.id, "theme");
        this.template = openbexi_getPageData(null, "page", this.div.id, "template");
    }
    if (this.subtype == "dijit.form.ComboBox") {
        this.autoComplete = openbexi_getPageData(null, this.subtype, this.div.id, "autoComplete");
        this.value = openbexi_getPageData(null, this.subtype, this.div.id, "value");
        this.store = openbexi_getPageData(null, this.subtype, this.div.id, "store");
    }
    if (this.subtype == "dijit.form.CheckBox") {
        this.value = openbexi_getPageData(null, this.subtype, this.div.id, "value");
    }
    if (this.subtype == "dijit.form.DateTextBox") {
        this.value = openbexi_getPageData(null, this.subtype, this.div.id, "value");
    }
    if (this.subtype == "dijit.form.NumberTextBox") {
        this.value = openbexi_getPageData(null, this.subtype, this.div.id, "value");
    }
    if (this.subtype == "dijit.form.TextBox" || this.subtype == "dijit.form.ValidationTextBox") {
        this.trim = openbexi_getPageData(null, this.subtype, this.div.id, "trim");
        this.value = openbexi_getPageData(null, this.subtype, this.div.id, "value");
        this.required = openbexi_getPageData(null, this.subtype, this.div.id, "required");
        this.signed = openbexi_getPageData(null, this.subtype, this.div.id, "signed");
        this.invalidMessage = openbexi_getPageData(null, this.subtype, this.div.id, "invalidMessage");
        this.missingMessage = openbexi_getPageData(null, this.subtype, this.div.id, "missingMessage");
        this.separator = openbexi_getPageData(null, this.subtype, this.div.id, "separator");
        if (this.subsubtype == "ValidationTextBox" || this.subsubtype == "UsZip") {
            this.regExp = openbexi_getPageData(null, this.subtype, this.div.id, "regExp");
        }
    }
}
openbexi_dojo.prototype.set_template = function (css_file, category, action, rsync_canvas) {
    if (css_file == null || css_file == "")return;
    //if (css_file.match("template/ob_grid")) {
    this.template = css_file;
    this.theme = this.template.replace("template/ob_grid/", "");
    this.theme = this.theme.replace(".css", "");

    openbexi_updatePageData(null, "page", this.div.id, "theme", this.theme);
    openbexi_updatePageData(null, "page", this.div.id, "template", this.template);
    if (document.getElementById("dojo_" + this.div.id))document.getElementById("dojo_" + this.div.id).setAttribute((document.all ? "className" : "class"), this.theme);
    try {
        openbexi_load_JS_CSS_file(this.template, "css");
    } catch (e) {
    }
    //} else {
    //this.template = "dijit/themes/" + css_file + "/" + css_file + ".css";
    //this.theme = css_file;
    //}
};
openbexi_dojo.prototype.getClass = function () {
    return "ob_dojo_" + this.theme;
}
openbexi_dojo.prototype.setSelected = function (objId) {
    this.genericObject.setSelected(objId, true);
    if (this.openbexiNavigator) {
        this.openbexiNavigator.update_menu_editor(this, true);
    }
};
openbexi_dojo.prototype.setUnSelected = function (objId) {
    try {
        this.genericObject.setUnSelected(objId);
        if (currentBexiObj_selected.type != this.type)
            this.openbexiNavigator.update_menu_editor(this, false);
    } catch (e) {
        __openbexi_debugC("openbexi_dojo.prototype.setUnSelected()", "Exception:" + e.message);
    }
}
openbexi_dojo.prototype.getChildrenId = function () {
    var count = 0;
    var list = new Array();
    list[count++] = this.div.id;
    if (document.getElementById(this.parent) != null || document.getElementById(this.parent) != undefined) {
        for (var j = 0; j < document.getElementById(this.parent).childNodes.length; j++) {
            var childId = document.getElementById(this.parent).childNodes[j].id;
            if (childId != null && childId != "") {
                list[count++] = childId;
            }
        }
    }
    return list;
};
openbexi_dojo.prototype.getComboItemsName = function () {
    try {
        if (this.subtype != "dijit.form.ComboBox") return "";
        var items = "";
        if (this.textBox.dataProvider._data == null || this.textBox.dataProvider._data == "") return "";
        var dataTmp = this.textBox.dataProvider._data.toString();
        var data = dataTmp.split(/\.|;|,|\r|\n/);
        for (var i = 0; i < data.length - 1; i++) {
            items += data[i] + "\n";
            i++;
        }
    } catch (e) {
        //alert(e.message);
        return "";
    }
    return items;
};
openbexi_dojo.prototype.getCombofirstItemsName = function () {
    try {
        if (this.subtype != "dijit.form.ComboBox") return "none";
        if (this.textBox.dataProvider._data == null || this.textBox.dataProvider._data == "") return "none";
        var dataTmp = this.textBox.dataProvider._data.toString();
        var data = dataTmp.split(/\.|;|,|\r|\n/);
        return data[0];
    } catch (e) {
        //alert(e.message);
        return "none";
    }
};
openbexi_dojo.prototype.pasteText_or_Link = function (text) {
    if (this.subtype != "dijit.form.ComboBox") return;
    if (text == null || text == undefined) text = window.clipboardData.getData('Text');
    this.firstValue = "none";
    var data = text.split(/\.|;|,|\r|\n/);

    var comboList = '\[\n';
    for (var i = 0; i < data.length - 1; i++) {
        if (data[i] != undefined && data[i] != "") comboList += '   \[\"' + data[i] + '\",\"' + data[i] + '\"\]\,\n';
    }
    if (data.length > 0) {
        this.firstValue = data[0];
        if (data[data.length - 1] != undefined && data[data.length - 1] != "") {
            comboList += '   \[\"' + data[data.length - 1] + '\",\"' + data[data.length - 1] + '\"\]\n';
        }
    } else {
        this.firstValue = "none";
        comboList += '\[none\"\]\n';
    }
    comboList += '\]\n';
    // Save the new Javascript file
    var filename = this.openbexiNavigator.openbexi_home_directory + "table/" + this.div.id + ".js";
    var ob_err = openbexi_WriteToFile(filename, comboList);
    if (this.openbexiNavigator != null && ob_err != null) {
        if (this.openbexiNavigator) this.openbexiNavigator.status(ob_err, "red");
    }
    this.dojoAttributes = [
        ['autocomplete', 'false', "true or false"],
        ['value', this.firstValue, "default:" + this.firstValue],
        ['srore', '' + 'table/' + this.div.id + '.js']
    ];
    this.create_DOJO();
    my_PickFunc(this.div);
};
openbexi_dojo.prototype.setAttribute = function (name, value) {
    return this.genericObject.setAttribute(this.getChildrenId(), name, value);
};
openbexi_dojo.prototype.getText = function () {
    //return document.getElementById(this.textfield.id).firstChild.nodeValue
    return "";
};
openbexi_dojo.prototype.getPopupAttributes = function () {
    if (this.subtype == "dijit.form.ComboBox")
        return ob_dojo_popupComboAttributes;
    else if (this.subtype == "dojox.grid.Grid" || this.subtype == "GridX")
        return ob_dojo_popupGridAttributes;
    else
        return ob_dojo_popupAttributes;
};
openbexi_dojo.prototype.getInspectorAttributes = function () {
    return ob_dojo_inspectorAttributes;
};
openbexi_dojo.prototype.getSrc = function (objId, eventStr) {
    if (objId == null)objId = this.edit.id;
    return this.genericObject.getSrc(objId, eventStr);
};
openbexi_dojo.prototype.innerHTML_and_EVENTS = function (objId) {
    return document.getElementById(objId).innerHTML;
};
openbexi_dojo.prototype.changeStyle = function (objBexi, direction) {
    this.genericObject.changeStyle(objBexi, this, direction);
};
openbexi_dojo.prototype.removeObject = function (flag) {
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
    if (dijit.byId("dojo_" + this.div.id))
        dijit.byId("dojo_" + this.div.id).destroy();
    this.genericObject.removeObject(this);
    try {
        if (this.pager)getSelectedBexiObj(this.pager.id).removeObject();
    } catch (e) {
    }
    ob_setDirty_flag(flag);
};
openbexi_dojo.prototype.move = function () {
    var divLabel = document.getElementById("label_" + this.div.id);
    if (divLabel != null) {
        ob_delta = parseInt(this.div.style.left) - (parseInt(divLabel.style.left) + parseInt(divLabel.style.width));
        divLabel.style.top = this.div.style.top;
    }
};
openbexi_dojo.prototype.my_PickFunc = function (e) {
    openbexi_stopEventPropagation(e);
    var bexiObj = getSelectedBexiObj(this.id);
    my_PickFunc(bexiObj.div);
};
openbexi_dojo.prototype.add_function = function (protocole, functionName, ob_doc) {
    if (this.genericObject != null) this.genericObject.add_function(protocole, functionName, ob_doc);
};
openbexi_dojo.prototype.add_link = function () {
};
openbexi_dojo.prototype.get_editor = function () {
    var str = "";
    if (this.openbexiNavigator)
        return this.openbexiNavigator.get_menu_editor(this.getPopupAttributes());
    return str;
};
openbexi_dojo.prototype.get_link_editor = function () {
    var str = "";
    if (this.genericObject != null) {
        str += this.genericObject.get_link_editor(this.getPopupLinkAttributes());
    }
    return str;
};
openbexi_dojo.prototype.forward = function () {
    return this.genericObject.forward(this.div, "+");
};
openbexi_dojo.prototype.backward = function () {
    return this.genericObject.backward(this.div, "-");
};
openbexi_dojo.prototype.debug = function () {
    return this.genericObject.debug(this);
};
openbexi_dojo.prototype.align_left_auto_arrange = function () {
    return this.genericObject.align_left_auto_arrange(this);
};
openbexi_dojo.prototype.align_right_auto_arrange = function () {
    return this.genericObject.align_right_auto_arrange(this);
};
openbexi_dojo.prototype.align_top_auto_arrange = function () {
    return this.genericObject.align_top_auto_arrange(this);
};
openbexi_dojo.prototype.align_bottom_auto_arrange = function () {
    return this.genericObject.align_bottom_auto_arrange(this);
};
openbexi_dojo.prototype.vertical_width_auto_resize = function () {
    return this.genericObject.vertical_width_auto_resize(this);
};
openbexi_dojo.prototype.vertical_height_auto_resize = function () {
    return this.genericObject.vertical_height_auto_resize(this);
};
openbexi_dojo.prototype.horizontal_width_auto_resize = function () {
    return this.genericObject.horizontal_width_auto_resize(this);
};
openbexi_dojo.prototype.horizontal_height_auto_resize = function () {
    return this.genericObject.horizontal_height_auto_resize(this);
};
openbexi_dojo.prototype.vertical_spacing_auto_arrange = function () {
    return this.genericObject.vertical_spacing_auto_arrange(this);
};
openbexi_dojo.prototype.horizontal_spacing_auto_arrange = function () {
    return this.genericObject.horizontal_spacing_auto_arrange(this);
};
openbexi_dojo.prototype.undo_auto_arrange = function () {
    return this.genericObject.undo_auto_arrange(this);
};
openbexi_dojo.prototype.redo_auto_arrange = function () {
    return this.genericObject.redo_auto_arrange(this);
};
openbexi_dojo.prototype.view_and_model = function () {
    var str = "   <script type=\"text/javascript\">\n";
    try {
        str += "       var " + this.div.id + "_data=\"";
        var count = 0;
        var data_cvs;
        while (true) {
            data_cvs = openbexi_getPageData(null, "page", this.div.id, "data_" + count++);
            if (data_cvs == "")break;
            str += data_cvs + "\\n";
        }
        str += "\";\n";
        str += "       var " + this.div.id + "_view1 = " + openbexi_unformatText(this.view1) + "\n";
    } catch (e) {
        __openbexi_debugC("openbexi_dojo.prototype.view_and_model()", "Exception: " + e.message);
    }
    var rowSelector = openbexi_getPageData(null, "page", this.div.id, "rowSelector");
    var clientSort = openbexi_getPageData(null, "page", this.div.id, "clientSort");
    if (clientSort == "true")
        clientSort = true;
    else
        clientSort = false;
    var columnReordering = openbexi_getPageData(null, "page", this.div.id, "columnReordering");
    if (columnReordering == "true")
        columnReordering = true;
    else
        columnReordering = false;
    var selectionMode = openbexi_getPageData(null, "page", this.div.id, "selectionMode");
    var autoWidth = openbexi_getPageData(null, "page", this.div.id, "autoWidth");
    if (autoWidth == "true")
        autoWidth = true;
    else
        autoWidth = false;
    str += "\n       dojo.addOnLoad(function(){\n";
    str += "\n          var store_" + this.div.id + " = new dojox.data.CsvStore({data: " + this.div.id + "_data});\n";
    str += "\n          var grid_" + this.div.id + " = new dojox.grid.EnhancedGrid({name: 'dojo_" + this.div.id + "',id:'dojo_" + this.div.id + "',query: {Column0: '*'},store: store_" + this.div.id + ",clientSort: " + clientSort + ",autoWidth: " + autoWidth + ",columnReordering: " + columnReordering + ",selectionMode: '" + selectionMode + "',rowSelector: '" + rowSelector + "',structure: " + this.div.id + "_view1}, document.createElement('div'));\n";
    str += "\n          dojo.byId('dojo_" + this.div.id + "').appendChild(grid_" + this.div.id + ".domNode);\n";

    for (var i = 0; i < ob_getFunctionCounter(this.div.id); i++) {
        var fct = this.genericObject.get_onClickCell_function(this.div.id, i);
        if (fct != "") {
            str += "\n          grid_" + this.div.id + ".onCellClick = function (e){\n";
            str += "\n          " + fct;
            str += "\n};\n";
        }
    }
    str += "\n          grid_" + this.div.id + ".startup();\n";
    str += "\n       });\n";
    try {
        openbexi_updatePageData(null, "page", this.div.id, "view", openbexi_unformatText(this.view1));
    } catch (e) {
        __openbexi_debugC("openbexi_dojo.prototype.view_and_model()", "Exception: " + e.message);
    }
    str += "       </script>\n";
    return str;
};
openbexi_dojo.prototype.head_code = function () {
    var str = "";
    //if (this.subtype == "dojox.grid.Grid") {
    if (this.subtype == "dojox.grid.Grid" || this.subtype == "GridX")
        str += '   <script type="text/javascript" src="js/public/SQL_refresh.js"></script>' + "\n";
    str += '   <script type="text/javascript" src="javascript/openbexi_LN.js"></script>' + "\n";
    str += this.genericObject.head_code(this);
    str += '   <script type="text/javascript" src="javascript/openbexi_navigator.js"></script>' + "\n";
    str += '   <script type="text/javascript" src="javascript/openbexi_pager.js"></script>' + "\n";
    //}
    return str;
};
openbexi_dojo.prototype.body_code = function () {
    //var value = openbexi_getPageData(null, this.subtype, this.div.id, "value");
    if (this.dojo != null && this.dojo.domNode != null) this.div.style.background = this.dojo.domNode.style.background;
    var str = "";

    str += '               <div CLASSE="' + this.div.getAttribute("CLASSE") + '" name="' + this.div.name + '" id="' + this.div.id + '" ob_template="' + this.ob_template + '" creation_date="' + this.div.getAttribute("creation_date") + '" style="' + openbexi_get_CSS(this.div) + '" >\n';

    if (this.subtype == "dojox.grid.Grid" || this.subtype == "GridX") {
        str += '                <div name="dojo_' + this.div.id + '\" id="dojo_' + this.div.id + '" ob_template="' + this.ob_template + '" creation_date="' + this.div.getAttribute("creation_date") + '" style=\"width: 100%; height: 100%;"></div>';
    }
    else if (this.subtype == "dijit.form.CheckBox") {
        str += '         		    <input id=\"text_' + this.div.id + '" name="' + this.div.name + '" type="checkbox" style=\" background:' + this.div.style.background + '\" \n';
    }
    else if (this.subtype == "dijit.form.ComboBox") {
        str += '         		    <input id=\"text_' + this.div.id + '" name="' + this.div.name + '" type="text" dojoType="' + this.subtype + '" creation_date="' + this.div.getAttribute("creation_date") + '" type="text"  style="width:100%;height:100%; background:' + this.div.style.background + '\" \n';
    }
    else {
        if (this.subsubtype == "Password")
            str += '         		    <input id=\"text_' + this.div.id + '" name="' + this.div.name + '" type="password" dojoType="' + this.subtype + '" creation_date="' + this.div.getAttribute("creation_date") + '" lowercase="true" style=\"width:100%;height:100%; background:' + this.div.style.background + '\" \n';
        else if (this.subsubtype == "Image")
            str += '         		    ' + this.div.innerHTML + '\n';
        else if (this.subsubtype == "url")
            str += '         		    ' + this.div.innerHTML + '\n';
        else
            str += '         		    <input id=\"text_' + this.div.id + '" name="' + this.div.name + '" type="text" dojoType="' + this.subtype + '" creation_date="' + this.div.getAttribute("creation_date") + '" lowercase="true" style=\"width:100%;height:100%; background:' + this.div.style.background + '\" \n';
    }
    var pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
    var atts = get_xml_classe_object_attributesName(pageDoc, this.subtype, this.div.id);
    if (atts != null && this.subtype != "dojox.grid.Grid" && this.subsubtype != "Image" && this.subsubtype != "url") {
        for (var i = 0; i < atts.length; i++) {
            str += '         		        ' + atts[i] + '="' + get_xml_classe_object_attribut_value(pageDoc, this.subtype, this.div.id, atts[i]) + '"\n ';
        }
    }
    if ((this.subtype != "dojox.grid.Grid" || this.subtype == "GridX") && this.subsubtype != "Image" && this.subsubtype != "url")str += '>\n';

    str += '                </div>\n';
    return str;
};
openbexi_dojo.prototype.functions_to_load = function () {
    if (this.subtype == "dojox.grid.Grid" || this.subtype == "GridX")
        return this.genericObject.functions_to_load(this.div.id);
    else
        return "";
};
openbexi_dojo.prototype.create_DOJO = function () {
    var txt;
    this.dojo = null;
    var div = this.div.id;
    try {
        if (this.subtype == "GridX" || this.subtype == "GridX") {
            //alert("Sorry gridX is not implemented yet");
            //return;

            require([
                'gridx/Grid',
                'gridx/core/model/cache/Sync',
                'gridx/tests/support/data/MusicData',
                'gridx/tests/support/stores/Memory',
                'gridx/allModules'
            ], function (Grid, Cache, dataSource, storeFactory, mods) {
                var columnSetIdx = 0;
                var create = function () {
                    if (!window.grid) {
                        var store = storeFactory({
                            dataSource: dataSource,
                            size: 100
                        });
                        var layout = dataSource.layouts[columnSetIdx];
                        var gridX = new Grid({
                            id: "dojo_" + div,
                            cacheClass: Cache,
                            store: store,
                            structure: layout,
                            modules: [
                                mods.VirtualVScroller
                            ]
                        });

                        try {

                            gridX.placeAt(div);
                            document.getElementById("dojo_" + div).style.width = "100%";
                            document.getElementById("dojo_" + div).style.height = "100%";
                            gridX.startup();
                            getSelectedBexiObj(null).dojo = gridX;

                        } catch (e) {
                            alert("openbexi_dojo.prototype.create_DOJO:" + e.message);
                        }
                    }
                };

                create();


            });
        } else if (this.subtype == "dojox.grid.Grid") {
            var count = 0;
            var data_cvs;
            var data_grid = "";
            this.grid_data = 'Column0,Column1,Column2\nnone,none,none\nnone,none,none\nnone,none,none\nnone,none,none\n';
            while (true) {
                data_cvs = openbexi_getPageData(null, "page", this.div.id, "data_" + count++);
                if (data_cvs == "")break;
                data_grid += data_cvs + "\n";
            }
            var storeGrid = openbexi_getStoreData(data_grid, "csv", ",");
            if (this.view1 == null) this.view1 = openbexi_getStrView(null);
            var jsonView = openbexi_getJsonView(this.view1);

            // Set up propertie
            var autoWidth = openbexi_getPageData(null, "page", this.div.id, "autoWidth");
            if (autoWidth == "") {
                autoWidth = "true";
                openbexi_updatePageData(null, "page", this.div.id, "autoWidth", autoWidth);
            }
            if (autoWidth == "true")
                autoWidth = true;
            else
                autoWidth = false;
            var selectionMode = openbexi_getPageData(null, "page", this.div.id, "selectionMode");
            if (selectionMode == "") {
                selectionMode = "single";
                openbexi_updatePageData(null, "page", this.div.id, "selectionMode", selectionMode);
            }
            var clientSort = openbexi_getPageData(null, "page", this.div.id, "clientSort");
            if (clientSort == "") {
                clientSort = "true";
                openbexi_updatePageData(null, "page", this.div.id, "clientSort", clientSort);
            }
            if (clientSort == "true")
                clientSort = true;
            else
                clientSort = false;
            var columnReordering = openbexi_getPageData(null, "page", this.div.id, "columnReordering");
            if (columnReordering == "") {
                columnReordering = "true";
                openbexi_updatePageData(null, "page", this.div.id, "columnReordering", columnReordering);
            }
            if (columnReordering == "true")
                columnReordering = true;
            else
                columnReordering = false;
            var rowSelector = openbexi_getPageData(null, "page", this.div.id, "rowSelector");
            if (rowSelector == "") {
                rowSelector = "20px";
                openbexi_updatePageData(null, "page", this.div.id, "rowSelector", rowSelector);
            }
            try {
                this.dojo = new dojox.grid.EnhancedGrid({
                    name: this.div.name,
                    div_id: this.div.id,
                    id: "dojo_" + this.div.id,
                    className: this.theme,
                    query: {Column0: '*'},
                    store: storeGrid,
                    structure: jsonView,
                    autoWidth: autoWidth,
                    selectionMode: selectionMode,
                    clientSort: clientSort,
                    columnReordering: columnReordering,
                    rowSelector: rowSelector,
                    onMoveColumn: function ob_moveColumn() {
                        var model = "";
                        for (var i = 0; i < this.layout.cells.length; i++) {
                            if (i == 0)
                                model += this.layout.cells[i].name;
                            else
                                model += "," + this.layout.cells[i].name;
                        }
                        __openbexi_debugC("ob_moveColumn()", "Warning:" + model);
                        openbexi_updatePageData(null, "page", this.div_id, "model", model);
                        if (openbexi_getPageData(null, "page", this.div_id, "csv_file") != "") {
                            openbexiNavigator.working = false;
                            openbexi_loadCSV(this.div_id, null);
                        } else {
                            openbexiNavigator.working = false;
                            var sql_table = openbexi_getPageData(null, "page", this.div_id, "sql_table");
                            var sql_request = openbexi_getPageData(null, "page", this.div_id, "sql_request");
                            model = openbexi_getPageData(null, "page", this.div_id, "model");
                            if (sql_request != "")
                                openbexi_LNRequest(null, null, this.div_id, "openbexi_dojo", null, null, "create_form", sql_table, undefined, sql_request, "sql", null, null, null, null, null, "true", model);
                        }
                    },
                    onHeaderCellClick: function ob_onHeaderCellClick(e) {
                        __openbexi_debugC("onHeaderCellClick()", "Warning: " + e.cellIndex);
                    },
                    onHeaderCellMouseOut: function ob_onHeaderCellMouseOut() {
                        var widths = "";
                        for (var i = 0; i < this.layout.cells.length; i++) {
                            if (i == 0)
                                widths += this.layout.cells[i].unitWidth;
                            else
                                widths += "," + this.layout.cells[i].unitWidth;
                        }
                        __openbexi_debugC("onHeaderCellMouseOut()", "Warning: widths=" + widths);
                        openbexi_updatePageData(null, "page", this.div_id, "column_widths", widths);

                    }
                }, document.createElement('div'));
            } catch (e) {
                alert(e.message);
            }
            try {
                if (this.dojo != null && this.dojo.domNode != null) {
                    dojo.byId(this.div.id).appendChild(this.dojo.domNode);
                    this.dojo.startup();
                }
            } catch (e) {
                alert("openbexi_dojo.prototype.create_DOJO:" + e.message);
            }
        } else if (this.subtype == "dijit.form.CheckBox") {
            txt = document.createElement('input');
            txt.setAttribute('type', 'checkbox');
            txt.setAttribute('dojotype', 'dijit.form.CheckBox');
            txt.setAttribute('id', 'dojo_' + this.div.id);
            txt.setAttribute('name', 'dojo_' + this.div.id);
            this.div.appendChild(txt);
            //dojo bug ???
            //this.dojo = new dijit.form.CheckBox({
            //value: 'on',
            //name: this.div.name,
            //id:"dojo_" + this.div.id,
            //checked:"checked"
            //}, txt);
        } else if (this.subtype == "dijit.form.ComboBox") {
            var options = new dojo.data.ItemFileWriteStore({data: {identifier: 'name', items: []}});
            options.newItem({name: '1'});
            options.newItem({name: '2'});
            options.newItem({name: '3'});
            txt = document.createElement('input');
            txt.setAttribute('type', 'text');
            this.div.appendChild(txt);
            this.dojo = new dijit.form.ComboBox({
                value: '1',
                name: this.div.name,
                id: "dojo_" + this.div.id,
                store: options,
                searchAttr: "name"
                //onChange:checkCombo
            }, txt);
            this.dojo.domNode.style.width = "100%";
            this.dojo.domNode.style.height = "100%";
        } else if (this.subtype == "dijit.form.NumberTextBox") {
            txt = document.createElement('input');
            txt.setAttribute('type', 'text');
            this.div.appendChild(txt);
            this.dojo = new dijit.form.NumberTextBox({
                value: this.value,
                name: this.div.name,
                id: "dojo_" + this.div.id,
                //promptMessage: "Enter a value between -20000 and +20000",
                invalidMessage: this.invalidMessage,
                required: this.required
                //constraints:"{min:-20000,max:20000,places:0}"
            }, txt);
        } else if (this.subtype == "dijit.form.CurrencyTextBox") {
            txt = document.createElement('input');
            txt.setAttribute('type', 'text');
            this.div.appendChild(txt);
            this.dojo = new dijit.form.NumberTextBox({
                //value: '0',
                name: this.div.name,
                id: "dojo_" + this.div.id,
                //promptMessage: "Enter a value between -20000 and +20000",
                //invalidMessage: "Invalid amount.  Include dollar sign, commas, and cents.",
                currency: "USD",
                required: "true",
                constraints: "{fractional:true}"
            }, txt);
        } else if (this.subtype == "dijit.form.ValidationTextBox") {
            txt = document.createElement('input');
            if (this.subsubtype == "Image") {
                this.div.innerHTML = '<input id =' + "dojo_" + this.div.id + ' type="image" name=' + this.div.name + ' src="gif/no-photo.jpg" value="NO" style="height:100%;width:100%;" />';
            } else if (this.subsubtype == "url") {
                this.div.innerHTML = '<input id =' + "dojo_" + this.div.id + ' type="url" name=' + this.div.name + ' href="javascript:void(0)" style="height:100%;width:100%;" />';
            } else {
                txt.setAttribute('type', 'text');
                this.div.appendChild(txt);
                this.dojo = new dijit.form.ValidationTextBox({
                    //value: '',
                    name: this.div.name,
                    id: "dojo_" + this.div.id,
                    regExp: this.regExp,
                    required: this.required,
                    invalidMessage: this.invalidMessage
                }, txt);
            }
        } else if (this.subtype == "dijit.form.TextBox") {
            txt = document.createElement('input');
            //txt.setAttribute('class', 'medium');
            if (this.subsubtype == "Password")
                txt.setAttribute('type', 'password');
            else
                txt.setAttribute('type', 'text');
            this.div.appendChild(txt);
            if (this.subsubtype == "TextBox") {
                this.dojo = new dijit.form.TextBox({
                    value: '',
                    name: this.div.name,
                    id: "dojo_" + this.div.id
                }, txt);
            }
        } else if (this.subtype == "dijit.form.DateTextBox") {
            txt = document.createElement('input');
            txt.setAttribute('type', 'text');
            this.div.appendChild(txt);
            this.dojo = new dijit.form.DateTextBox({
                value: '',
                name: this.div.name,
                id: "dojo_" + this.div.id
            }, txt);
        } else {
            alert("Sorry, Dojo widget not yet implemented");
        }
        if (this.dojo != null && this.dojo.domNode != null) {
            this.dojo.domNode.style.width = "100%";
            this.dojo.domNode.style.height = "100%";
            this.dojo.domNode.style.background = this.div.style.background;
        }
    } catch (e) {
        alert("Sorry, cannot create a " + this.subsubtype + " DOJO widget.\ncreate_DOJO:" + e.name + ". Error message: " + e.message);
    }
};

openbexi_dojo.prototype.getProperties = function (event) {
    var popupId = "popup_menu0";
    if (!openbexiPopup_menu) openbexiPopup_menu = new openbexi_popup_menu(popupId);
    openbexiPopup_menu.removeAllItemMenu();
    var pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
    var atts = get_xml_classe_object_attributesName(pageDoc, this.subtype, this.div.id);
    if (atts != null) {
        for (var i = 0; i < atts.length; i++) {
            openbexiPopup_menu.addItemMenu(popupId + "_" + i, 'openbexi_set_dojo_attribute("' + this.subtype + '' + '","' + this.div.id + '' + '","' + atts[i] + '")', atts[i]);
        }
    }
    openbexiPopup_menu.addSep();
    openbexiPopup_menu.addItemMenu(popupId + "_close", 'openbexiPopup_menu.hideMenu(event)', "close");
    openbexiPopup_menu.showMenu3(event, popupId, divPropertiesWidth, true, "0px", "0px");
};
openbexi_dojo.prototype.getCSS = function (e) {
    openbexi_showCSSEditor(e);
};
openbexi_dojo.prototype.setView = function (index, att, width) {
    if (att == "width")
        (eval(this.view1).cells[0])[index].width = width;
};
openbexi_dojo.prototype.pager_init = function (bexiObj, obj, name, maxItems) {
    var divobjHeadP = new openbexi_pager(bexiObj, obj, name + "_pager", "0px", "2px", "25px", "15px", "23px", maxItems, "dynamic");
    this.pager = divobjHeadP.div;
    //this.pager.style.visibility = "hidden";
    save_openbexi_object(divobjHeadP, true);
    this.pager_move();
};
openbexi_dojo.prototype.show_pager = function (event) {
    var divobjHeadP = getSelectedBexiObj(this.div.id + "_pager");
    this.pager = divobjHeadP.div;
    if (this.pager == null || this.pager == undefined) {
        return;
    }
    if (this.pager.style.visibility == "visible") {
        divobjHeadP.hide(event);
    }
    else {
        divobjHeadP.display(event);
    }
};
openbexi_dojo.prototype.pager_move = function () {
    if (this.pager == null || this.pager == undefined || this.pager == "BODY") {
        var divobjHeadP = getSelectedBexiObj(this.div.id + "_pager");
        this.pager = divobjHeadP.div;
        return;
    }
    this.pager.style.top = (parseInt(this.div.style.top) + parseInt(this.div.style.height) + 10) + "px";
    this.pager.style.left = (parseInt(this.div.style.left)) + "px";
    this.pager.style.width = (parseInt(this.div.style.width)) + "px";
    this.pager.style.height = "23px";
};
openbexi_dojo.prototype.openbexi_stringReplaceAll = function (str, from, to) {
    if (from == "") return str;
    if (from == to) return str;
    try {
        var idx = str.indexOf(from);
        while (idx > -1) {
            str = str.replace(from, to);
            idx = str.indexOf(from);
        }
        return str;
    } catch (e) {
        //alert("\nopenbexi_system.prototype.openbexi_stringReplaceAll():" + e.name + ". Error message: " + e.message);
        return null;
    }
};
openbexi_dojo.prototype.updateView = function (view) {
    try {
        var div_id = this.div.id;
        var grid = dijit.byId("dojo_" + div_id);
        var layout = openbexi_getJsonView(view);
        grid.setStructure(layout);
        getSelectedBexiObj(div_id).view1 = openbexi_getStrView(layout);

        // Update column_widths and hidden
        var widths = "";
        var hiddens = "";
        var formatters = "";
        for (var i = 0; i < layout[0].length; i++) {
            if (i == 0) {
                widths += layout[0][i].width;
                hiddens += layout[0][i].hidden;
                formatters += layout[0][i].formatter;
            }
            else {
                widths += "," + layout[0][i].width;
                hiddens += "," + layout[0][i].hidden;
                formatters += "," + layout[0][i].formatter;
            }
        }

        openbexi_updatePageData(null, "page", div_id, "column_hiddens", hiddens);
        openbexi_updatePageData(null, "page", div_id, "column_widths", widths);
        openbexi_updatePageData(null, "page", div_id, "column_formatters", formatters);

    } catch (e) {
        __openbexi_debugC("openbexi_dojo.prototype.updateView", "Exception:" + e.message);
    }
};
openbexi_dojo.prototype.reload_model_and_data = function (div_id) {
    try {
        if (div_id == null)
            div_id = getSelectedBexiObj(null).div.id;
    } catch (e) {
        __openbexi_debugC("openbexi_dojo.prototype.reload_model_and_data", "Exception:" + e.message);
    }
    try {
        if (openbexi_getPageData(null, "page", div_id, "csv_file") != "") {
            openbexiNavigator.working = false;
            openbexi_loadCSV(div_id, null);
        } else {
            openbexiNavigator.working = false;
            var sql_table = openbexi_getPageData(null, "page", div_id, "sql_table");
            var sql_request = openbexi_getPageData(null, "page", div_id, "sql_request");
            var model = openbexi_getPageData(null, "page", div_id, "model");
            if (sql_request != "")
                openbexi_LNRequest(null, null, div_id, "openbexi_dojo", null, null, "create_form", sql_table, undefined, sql_request, "sql", null, null, null, null, null, "true", model);
        }
    } catch (e) {
        __openbexi_debugC("openbexi_dojo.prototype.reload_model_and_data", "Exception:" + e.message);
    }
};
function openbexi_set_dojo_type(subtype, subsubtype) {
    if (getSelectedBexiObj(null).type == "openbexi_dojo") {
        var bexiObj = getSelectedBexiObj(null);
        if (dijit.byId("dojo_" + bexiObj.div.id))
            dijit.byId("dojo_" + bexiObj.div.id).destroy();
        bexiObj.subtype = subtype;
        bexiObj.subsubtype = subsubtype;
        bexiObj.div.innerHTML = "";
        bexiObj.setData();
        bexiObj.create_DOJO();
    }
    else {
        add_HTMLDojo(null, subtype, subsubtype, null, null, null, null);
    }
}
;
function openbexi_get_dojo_type(event) {
    var popupId = "popup_menu0";
    if (!openbexiPopup_menu) openbexiPopup_menu = new openbexi_popup_menu(popupId);
    openbexiPopup_menu.removeAllItemMenu();
    for (var i = 0; i < ob_dojoType.length; i++) {
        openbexiPopup_menu.addItemMenu(popupId + "_" + i, 'openbexi_set_dojo_type("' + ob_dojoType[i][0] + '' + '","' + ob_dojoType[i][1] + '")', ob_dojoType[i][1]);
    }
    openbexiPopup_menu.addSep();
    openbexiPopup_menu.addItemMenu(popupId + "_close", 'openbexiPopup_menu.hideMenu(event)', "close");
    openbexiPopup_menu.showMenu3(event, popupId, divPropertiesWidth, true, "0px", "0px");
}
;
function openbexi_set_dojo_attribute(dojo_type, dojo_id, attribute) {
    try {
        var current_value = openbexi_getPageData(null, dojo_type, dojo_id, attribute);
        var example = openbexi_getPageData(null, dojo_type, attribute, "example");
        var new_value = prompt("enter " + attribute + "\nexample: " + example, current_value);
        new_value = openbexi_clearText(new_value);
        if (new_value == null || new_value == "") new_value = current_value;
        openbexi_updatePageData(null, dojo_type, dojo_id, attribute, new_value);
    } catch (e) {
        alert("Sorry, cannot set up the " + attribute + " attribute for " + dojo_id + "\nopenbexi_set_dojo_attribute:" + e.name + ". Error message: " + e.message);
    }
}
var bexicontext_dojo_view_editor;
function openbexi_showViewEditor(event) {
    var grid_bexi = getSelectedBexiObj(null);
    if (grid_bexi.div == null || grid_bexi.div == undefined || grid_bexi.subtype != "dojox.grid.Grid" || this.subtype == "GridX") {
        return;
    }
    openbexiNavigator.window_factory(event, 'ob_menu_RequestBrowser', ob_dojo_view_editor, 'maximize');
    if (document.getElementById("bexicontext_dojo_view"))
        document.getElementById("bexicontext_dojo_view").value = openbexi_formatText(grid_bexi.view1, false, true);
    //Implementing a Syntax-Highlighting with JavaScript Editor from code mirror
    bexicontext_dojo_view_editor = CodeMirror.fromTextArea(document.getElementById("bexicontext_dojo_view"), {mode: "javascript", theme: "night", lineNumbers: true, matchBrackets: true, tabMode: "indent", onChange: function () {
        clearTimeout(pending);
        setTimeout(update, 400);
    }});
}

function openbexi_applyViewEditor(event) {
    try {
        if (event != null)openbexi_stopEventPropagation(event);
        if (document.getElementById("bexicontext_dojo_view")) {
            var div_id = getSelectedBexiObj(null).div.id;
            var data = bexicontext_dojo_view_editor.getValue();
            getSelectedBexiObj(null).updateView(data);
            getSelectedBexiObj(null).reload_model_and_data(div_id);
        }
    } catch (e) {
        __openbexi_debugC("openbexi_applyViewEditor", "Exception:" + e.message);
    }
}
var bexicontext_dojo_data_editor;
function openbexi_showDataEditor(event) {
    try {
        if (event != null)openbexi_stopEventPropagation(event);
        var grid_bexi = getSelectedBexiObj(null);
        var div_id = grid_bexi.div.id;
        if (grid_bexi.div == null || grid_bexi.div == undefined || grid_bexi.subtype != "dojox.grid.Grid" || this.subtype == "GridX") {
            return;
        }
        openbexiNavigator.window_factory(event, 'ob_menu_RequestBrowser', ob_dojo_data_editor, 'maximize');
        if (document.getElementById("bexicontext_dojo_data")) {
            var count = 1;
            var data_cvs = "";
            while (true) {
                var data = openbexi_getPageData(null, "page", div_id, "data_" + count++);
                if (data == "")break;
                data_cvs += data + "\n";
            }
            document.getElementById("bexicontext_dojo_data").value = data_cvs + "\n";
            //Implementing a Syntax-Highlighting with JavaScript Editor from code mirror
            bexicontext_dojo_data_editor = CodeMirror.fromTextArea(document.getElementById("bexicontext_dojo_data"), {mode: "javascript", theme: "night", lineNumbers: true, matchBrackets: true, tabMode: "indent", onChange: function () {
                clearTimeout(pending);
                setTimeout(update, 400);
            }});

        }
    } catch (e) {
        __openbexi_debugC("openbexi_showDataEditor", "Exception:" + e.message);
    }
}
;
function openbexi_applyDataEditor(event) {
    try {
        if (event != null)openbexi_stopEventPropagation(event);
        if (document.getElementById("bexicontext_dojo_data")) {
            var div_id = getSelectedBexiObj(null).div.id;
            var data = openbexi_getPageData(null, "page", div_id, "data_0") + "\n";
            data += bexicontext_dojo_data_editor.getValue();
            var grid = dijit.byId("dojo_" + div_id);
            var data_grid = openbexi_getStoreData(data, "csv", ",");
            grid.setStore(data_grid);
            openbexi_getCsvData(div_id, data_grid, true);
        }
    } catch (e) {
        __openbexi_debugC("openbexi_applyDataEditor", "Exception:" + e.message);
    }
}
;
function openbexi_showEventCSVEditor(event) {
    if (event) openbexi_stopEventPropagation(event);

    var div_id = getSelectedBexiObj(null).div.id;
    openbexiNavigator.window_factory(event, 'ob_menu_RequestBrowser', ob_load_csv, 'maximize');

    //mode
    if (document.getElementById("bexicontext_csv_mode")) {
        if (openbexi_getPageData(null, "page", div_id, "mode") == "")
            document.getElementById("bexicontext_csv_mode").value = "local";
        else
            document.getElementById("bexicontext_csv_mode").value = openbexi_getPageData(null, "page", div_id, "mode");
    }

    //file
    if (document.getElementById("bexicontext_csv_file"))
        document.getElementById("bexicontext_csv_file").value = openbexi_getPageData(null, "page", div_id, "csv_file");

    //path
    if (document.getElementById("bexicontext_csv_path"))
        document.getElementById("bexicontext_csv_path").value = openbexi_getPageData(null, "page", div_id, "csv_path");

    //extension
    if (document.getElementById("bexicontext_csv_extension")) {
        if (openbexi_getPageData(null, "page", div_id, "extension") == "")
            document.getElementById("bexicontext_csv_extension").value = ".csv";
        else
            document.getElementById("bexicontext_csv_extension").value = openbexi_getPageData(null, "page", div_id, "extension");
    }

    //separator
    if (document.getElementById("bexicontext_csv_separator")) {
        if (openbexi_getPageData(null, "page", div_id, "separator") == "")
            document.getElementById("bexicontext_csv_separator").value = ",";
        else
            document.getElementById("bexicontext_csv_separator").value = openbexi_getPageData(null, "page", div_id, "separator");
    }

}
;
function openbexi_showPropertyEditor(event) {
    try {
        openbexiNavigator.window_factory(event, 'ob_menu_RequestBrowser', ob_dojo_property_editor, 'maximize');
        var grid_bexi = getSelectedBexiObj(null);
        var div_id = grid_bexi.div.id;
        if (grid_bexi.div == null || grid_bexi.div == undefined || grid_bexi.subtype != "dojox.grid.Grid" || this.subtype == "GridX") {
            return;
        }
        if (document.getElementById("ob_grid_rowCount"))
            document.getElementById("ob_grid_rowCount").value = openbexi_getPageData(null, "page", div_id, "rowCount");
        if (document.getElementById("ob_grid_autoWidth"))
            document.getElementById("ob_grid_autoWidth").value = openbexi_getPageData(null, "page", div_id, "autoWidth");
        if (document.getElementById("ob_grid_selectionMode"))
            document.getElementById("ob_grid_selectionMode").value = openbexi_getPageData(null, "page", div_id, "selectionMode");
        if (document.getElementById("ob_grid_clientSort"))
            document.getElementById("ob_grid_clientSort").value = openbexi_getPageData(null, "page", div_id, "clientSort");
        if (document.getElementById("ob_grid_columnReordering"))
            document.getElementById("ob_grid_columnReordering").value = openbexi_getPageData(null, "page", div_id, "columnReordering");
        if (document.getElementById("ob_grid_rowSelector"))
            document.getElementById("ob_grid_rowSelector").value = openbexi_getPageData(null, "page", div_id, "rowSelector");
    } catch (e) {
        __openbexi_debugC("openbexi_showPropertyEditor()", "Exception:" + e.message);
    }
}
;
function openbexi_SaveGridProperties(event) {
    var div_id = getSelectedBexiObj(null).div.id;
    if (document.getElementById("ob_grid_rowCount")) {
        getSelectedBexiObj(null).rowCount = document.getElementById("ob_grid_rowCount").value;
        openbexi_updatePageData(null, "page", div_id, "rowCount", document.getElementById("ob_grid_rowCount").value);
    }
    if (document.getElementById("ob_grid_autoWidth"))
        openbexi_updatePageData(null, "page", div_id, "autoWidth", document.getElementById("ob_grid_autoWidth").value);
    if (document.getElementById("ob_grid_selectionMode"))
        openbexi_updatePageData(null, "page", div_id, "selectionMode", document.getElementById("ob_grid_selectionMode").value);
    if (document.getElementById("ob_grid_clientSort"))
        openbexi_updatePageData(null, "page", div_id, "clientSort", document.getElementById("ob_grid_clientSort").value);
    if (document.getElementById("ob_grid_columnReordering"))
        openbexi_updatePageData(null, "page", div_id, "columnReordering", document.getElementById("ob_grid_columnReordering").value);
    if (document.getElementById("ob_grid_rowSelector"))
        openbexi_updatePageData(null, "page", div_id, "rowSelector", document.getElementById("ob_grid_rowSelector").value);
    openbexiNavigator.window_factory(event, 'ob_menu_RequestBrowser', null, 'hidden');

    openbexi_set_dojo_type(getSelectedBexiObj(null).subtype, getSelectedBexiObj(null).subsubtype);
    getSelectedBexiObj(null).reload_model_and_data(div_id);
}



