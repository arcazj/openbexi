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
var ob_chart_inspectorAttributes = [
    ['editor'         , 'ImageEditor'   , 'true']
];
var ob_chart_data_editor = [
    ['menu_RequestBrowser', 'ob_menu_RequestBrowser', '', '', '', '', '', 'Chart Data', '', '680px', '590px', '', ''],
    ['window_left', 'ob_menu_RequestBrowser_sub_left', '', '', '', '', '', '', '', '', '', 'overflow: auto;position:absolute;width:0%;', ''],
    ['end_window_left', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_body', 'ob_menu_RequestBrowser_sub', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow:auto;position:absolute;width:100%;', ''],
    ['form', 'ob_form', '', '', '', '', '', '', '', '', '', 'position:absolute;left:0px;', ''],
    ['fieldset', 'ob_fieldset', '', '', '', '', '', '', '', '', '', 'width:600px', ''],
    ['legend', '', '', '', '', '', '', 'Chart Data Editor', '', '', '', '', ''],
    ['input', 'bexicontext_chart_subtype', '', '', '', '', '', 'Type', '', '', '', '', '1'],
    ['textarea', 'bexicontext_chart_data', '', '', '', '', '', 'Data', '', '', '', '', '13'],
    ['end_form', '', '', '', '', '', '', ' name', '', '', '', '', ''],
    ['end_window_body', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_foot', 'ob_menu_RequestBrowser_sub_foot', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow: hidden;position:absolute;height:25%', ''],
    ['sep', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['set_button', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['ok', '', 'onclick="getSelectedBexiObj(null).updateDataChart();"', '', 'onmousedown="src=\'gif/ob_ok_down.png\';"', 'onmouseover="src=\'gif/ob_ok_on.png\';"', 'onmouseout="src=\'gif/ob_ok.png\';"', 'Apply', '', '', '', '', ''],
    ['cancel', '', 'onclick="openbexiNavigator.window_factory(event,\'ob_menu_RequestBrowser\',null,\'hidden\');"', '', 'onmousedown="src=\'gif/ob_cancel_down.png\';"', 'onmouseover="src=\'gif/ob_cancel_on.png\';"', 'onmouseout="src=\'gif/ob_cancel.png\';"', 'Cancel', '', '', '', '', ''],
    ['endset_button', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_window_foot', '', '', '', '', '', '', '', '', '', '', '', '']
];
var ob_chart_bar_editor = [
    ['menu_RequestBrowser', 'ob_menu_RequestBrowser', '', '', '', '', '', 'Chart Bar View', '', '600px', '770px', '', ''],
    ['window_left', 'ob_menu_RequestBrowser_sub_left', '', '', '', '', '', '', '', '', '', 'overflow: auto;position:absolute;width:0%;', ''],
    ['end_window_left', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_body', 'ob_menu_RequestBrowser_sub', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow:auto;position:absolute;width:100%;', ''],
    ['form', 'ob_form', '', '', '', '', '', '', '', '', '', 'position:absolute;left:0px;', ''],
    ['fieldset', 'ob_fieldset', '', '', '', '', '', '', '', '', '', '', ''],
    ['legend', '', '', '', '', '', '', 'Chart Bar Editor', '', '', '', '', ''],
    ['input', 'bexicontext_output', '', '', '', '', '', 'Output type', '', '', '', '', '1'],
    ['input', 'bexicontext_subtype', '', '', '', '', '', 'subtype', '', '', '', '', '1'],
    ['input', 'bexicontext_title', '', '', '', '', '', 'title', '', '', '', '', '1'],
    ['input', 'bexicontext_subtitle', '', '', '', '', '', 'subtitle', '', '', '', '', '1'],
    ['input', 'bexicontext_legende', '', '', '', '', '', 'legende', '', '', '', '', '1'],
    ['input', 'bexicontext_png', '', '', '', '', '', 'png', '', '', '', '', '1'],
    ['input', 'bexicontext_height', '', '', '', '', '', 'height', '', '', '', '', '1'],
    ['input', 'bexicontext_width', '', '', '', '', '', 'width', '', '', '', '', '1'],
    ['input', 'bexicontext_labelGap', '', '', '', '', '', 'labelGap', '', '', '', '', '1'],
    ['input', 'bexicontext_tooltips', '', '', '', '', '', 'tooltips', '', '', '', '', '1'],
    ['input', 'bexicontext_URLs', '', '', '', '', '', 'URLs', '', '', '', '', '1'],
    ['input', 'bexicontext_seriesPaint', '', '', '', '', '', 'seriesPaint', '', '', '', '', '1'],
    ['input', 'bexicontext_foregroundAlpha', '', '', '', '', '', 'foregroundAlpha', '', '', '', '', '1'],
    ['input', 'bexicontext_background', '', '', '', '', '', 'background', '', '', '', '', '1'],
    ['input', 'bexicontext_panelFont', '', '', '', '', '', 'panelFont', '', '', '', '', '1'],
    ['input', 'bexicontext_subTitleFont', '', '', '', '', '', 'subTitleFont', '', '', '', '', '1'],
    ['input', 'bexicontext_orientation', '', '', '', '', '', 'orientation', '', '', '', '', '1'],
    ['input', 'bexicontext_labelX', '', '', '', '', '', 'labelX', '', '', '', '', '1'],
    ['input', 'bexicontext_labelY', '', '', '', '', '', 'labelY', '', '', '', '', '1'],
    ['end_form', '', '', '', '', '', '', ' name', '', '', '', '', ''],
    ['end_window_body', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_foot', 'ob_menu_RequestBrowser_sub_foot', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow: hidden;position:absolute;height:16%', ''],
    ['sep', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['set_button', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['ok', '', 'onclick="getSelectedBexiObj(null).updateViewChartBar();"', '', 'onmousedown="src=\'gif/ob_ok_down.png\';"', 'onmouseover="src=\'gif/ob_ok_on.png\';"', 'onmouseout="src=\'gif/ob_ok.png\';"', 'Apply', '', '', '', '', ''],
    ['cancel', '', 'onclick="openbexiNavigator.window_factory(event,\'ob_menu_RequestBrowser\',null,\'hidden\');"', '', 'onmousedown="src=\'gif/ob_cancel_down.png\';"', 'onmouseover="src=\'gif/ob_cancel_on.png\';"', 'onmouseout="src=\'gif/ob_cancel.png\';"', 'Cancel', '', '', '', '', ''],
    ['endset_button', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_window_foot', '', '', '', '', '', '', '', '', '', '', '', '']
];
var ob_chart_pie_editor = [
    ['menu_RequestBrowser', 'ob_menu_RequestBrowser', '', '', '', '', '', 'Chart Pie View', '', '500px', '570px', '', ''],
    ['window_left', 'ob_menu_RequestBrowser_sub_left', '', '', '', '', '', '', '', '', '', 'overflow: auto;position:absolute;width:0%;', ''],
    ['end_window_left', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_body', 'ob_menu_RequestBrowser_sub', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow:auto;position:absolute;width:100%;', ''],
    ['form', 'ob_form', '', '', '', '', '', '', '', '', '', 'position:absolute;left:0px;', ''],
    ['fieldset', 'ob_fieldset', '', '', '', '', '', '', '', '', '', '', ''],
    ['legend', '', '', '', '', '', '', 'Chart Pie Editor', '', '', '', '', ''],
    ['input', 'bexicontext_output', '', '', '', '', '', 'Output type', '', '', '', '', '1'],
    ['input', 'bexicontext_subtype', '', '', '', '', '', 'subtype', '', '', '', '', '1'],
    ['input', 'bexicontext_title', '', '', '', '', '', 'title', '', '', '', '', '1'],
    ['input', 'bexicontext_subtitle', '', '', '', '', '', 'subtitle', '', '', '', '', '1'],
    ['input', 'bexicontext_legende', '', '', '', '', '', 'legende', '', '', '', '', '1'],
    ['input', 'bexicontext_png', '', '', '', '', '', 'png', '', '', '', '', '1'],
    ['input', 'bexicontext_height', '', '', '', '', '', 'height', '', '', '', '', '1'],
    ['input', 'bexicontext_width', '', '', '', '', '', 'width', '', '', '', '', '1'],
    ['input', 'bexicontext_labelGap', '', '', '', '', '', 'labelGap', '', '', '', '', '1'],
    ['input', 'bexicontext_explode', '', '', '', '', '', 'explode', '', '', '', '', '1'],
    ['input', 'bexicontext_explodeNumber', '', '', '', '', '', 'explodeNumber', '', '', '', '', '1'],
    ['input', 'bexicontext_tooltips', '', '', '', '', '', 'tooltips', '', '', '', '', '1'],
    ['input', 'bexicontext_URLs', '', '', '', '', '', 'URLs', '', '', '', '', '1'],
    ['input', 'bexicontext_seriesPaint', '', '', '', '', '', 'seriesPaint', '', '', '', '', '1'],
    ['input', 'bexicontext_foregroundAlpha', '', '', '', '', '', 'foregroundAlpha', '', '', '', '', '1'],
    ['input', 'bexicontext_background', '', '', '', '', '', 'background', '', '', '', '', '1'],
    ['input', 'bexicontext_panelFont', '', '', '', '', '', 'panelFont', '', '', '', '', '1'],
    ['input', 'bexicontext_subTitleFont', '', '', '', '', '', 'subTitleFont', '', '', '', '', '1'],
    ['input', 'bexicontext_plotFont', '', '', '', '', '', 'plotFont', '', '', '', '', '1'],
    ['end_form', '', '', '', '', '', '', ' name', '', '', '', '', ''],
    ['end_window_body', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_foot', 'ob_menu_RequestBrowser_sub_foot', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow: hidden;position:absolute;height:16%', ''],
    ['sep', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['set_button', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['ok', '', 'onclick="getSelectedBexiObj(null).updateViewChartPie();"', '', 'onmousedown="src=\'gif/ob_ok_down.png\';"', 'onmouseover="src=\'gif/ob_ok_on.png\';"', 'onmouseout="src=\'gif/ob_ok.png\';"', 'Apply', '', '', '', '', ''],
    ['cancel', '', 'onclick="openbexiNavigator.window_factory(event,\'ob_menu_RequestBrowser\',null,\'hidden\');"', '', 'onmousedown="src=\'gif/ob_cancel_down.png\';"', 'onmouseover="src=\'gif/ob_cancel_on.png\';"', 'onmouseout="src=\'gif/ob_cancel.png\';"', 'Cancel', '', '', '', '', ''],
    ['endset_button', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_window_foot', '', '', '', '', '', '', '', '', '', '', '', '']
];
var ob_chart_line_editor = [
    ['menu_RequestBrowser', 'ob_menu_RequestBrowser', '', '', '', '', '', 'Chart Line View', '', '500px', '820px', '', ''],
    ['window_left', 'ob_menu_RequestBrowser_sub_left', '', '', '', '', '', '', '', '', '', 'overflow: auto;position:absolute;width:0%;', ''],
    ['end_window_left', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_body', 'ob_menu_RequestBrowser_sub', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow:auto;position:absolute;width:100%;', ''],
    ['form', 'ob_form', '', '', '', '', '', '', '', '', '', 'position:absolute;left:0px;', ''],
    ['fieldset', 'ob_fieldset', '', '', '', '', '', '', '', '', '', '', ''],
    ['legend', '', '', '', '', '', '', 'Chart Line Editor', '', '', '', '', ''],
    ['input', 'bexicontext_output', '', '', '', '', '', 'Output type', '', '', '', '', '1'],
    ['input', 'bexicontext_subtype', '', '', '', '', '', 'subtype', '', '', '', '', '1'],
    ['input', 'bexicontext_title', '', '', '', '', '', 'title', '', '', '', '', '1'],
    ['input', 'bexicontext_subtitle', '', '', '', '', '', 'subtitle', '', '', '', '', '1'],
    ['input', 'bexicontext_legende', '', '', '', '', '', 'legende', '', '', '', '', '1'],
    ['input', 'bexicontext_png', '', '', '', '', '', 'png', '', '', '', '', '1'],
    ['input', 'bexicontext_height', '', '', '', '', '', 'height', '', '', '', '', '1'],
    ['input', 'bexicontext_width', '', '', '', '', '', 'width', '', '', '', '', '1'],
    ['input', 'bexicontext_labelGap', '', '', '', '', '', 'labelGap', '', '', '', '', '1'],
    ['input', 'bexicontext_tooltips', '', '', '', '', '', 'tooltips', '', '', '', '', '1'],
    ['input', 'bexicontext_URLs', '', '', '', '', '', 'URLs', '', '', '', '', '1'],
    ['input', 'bexicontext_seriesPaint', '', '', '', '', '', 'seriesPaint', '', '', '', '', '1'],
    ['input', 'bexicontext_foregroundAlpha', '', '', '', '', '', 'foregroundAlpha', '', '', '', '', '1'],
    ['input', 'bexicontext_background', '', '', '', '', '', 'background', '', '', '', '', '1'],
    ['input', 'bexicontext_panelFont', '', '', '', '', '', 'panelFont', '', '', '', '', '1'],
    ['input', 'bexicontext_subTitleFont', '', '', '', '', '', 'subTitleFont', '', '', '', '', '1'],
    ['input', 'bexicontext_orientation', '', '', '', '', '', 'orientation', '', '', '', '', '1'],
    ['input', 'bexicontext_labelX', '', '', '', '', '', 'labelX', '', '', '', '', '1'],
    ['input', 'bexicontext_labelY', '', '', '', '', '', 'labelY', '', '', '', '', '1'],
    ['end_form', '', '', '', '', '', '', ' name', '', '', '', '', ''],
    ['end_window_body', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_foot', 'ob_menu_RequestBrowser_sub_foot', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow: hidden;position:absolute;height:16%', ''],
    ['sep', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['set_button', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['ok', '', 'onclick="getSelectedBexiObj(null).updateViewChartLine();"', '', 'onmousedown="src=\'gif/ob_ok_down.png\';"', 'onmouseover="src=\'gif/ob_ok_on.png\';"', 'onmouseout="src=\'gif/ob_ok.png\';"', 'Apply', '', '', '', '', ''],
    ['cancel', '', 'onclick="openbexiNavigator.window_factory(event,\'ob_menu_RequestBrowser\',null,\'hidden\');"', '', 'onmousedown="src=\'gif/ob_cancel_down.png\';"', 'onmouseover="src=\'gif/ob_cancel_on.png\';"', 'onmouseout="src=\'gif/ob_cancel.png\';"', 'Cancel', '', '', '', '', ''],
    ['endset_button', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_window_foot', '', '', '', '', '', '', '', '', '', '', '', '']
];
var ob_chartPie_popupAttributes = [
    ['menuitem7' , 'openbexiNavigator.window_factory(null,\'ob_menu_RequestBrowser\',ob_chart_pie_editor,\'maximize\');getSelectedBexiObj(null).displayViewChartPie();', 'View', 'gif\/ob_view_x48.png', '48px', '48px'],
    ['menuitem8', 'openbexiNavigator.window_factory(null,\'ob_menu_RequestBrowser\',ob_chart_data_editor,\'maximize\');getSelectedBexiObj(null).displayChartData();', 'Data', 'gif\/ob_data_x48.png', '48px', '48px'],
    ['menuitem35px', 'this.setTimeout(event)' , 'PoolingInterval', 'gif\/settimeout.png', '48px', '48px'],

    ['menuitem31' , 'this.createPieChart(event)'  , 'createPieChart', 'gif\/PieChart.jpg', '48px', '48px'],
    ['menuitem33' , 'this.createPieChart3D(event)'  , 'createPieChart3D', 'gif\/PieChart3D.jpg', '48px', '48px'],
    ['menuitem36' , 'this.createRingChart(event)'  , 'createRingChart', 'gif\/RingChart.jpg', '48px', '48px'],
    //['menuitem42' ,'this.chart_browseXML(event)'        ,'chart_browseXMLDatabase', 'gif\/ob_xml_x48.png','48px','48px'],
    ['menuitem25px', 'this.removeObject(true);openbexiNavigator.update_menu_editor(null, false);'  , 'DlgSelectBtnDelete', 'gif\/chartPie_delete_x48.png', '48px', '48px'],

    ['menuitem18', 'this.backward()', 'SendToBack', 'gif\/move_backward_x48.png', '48px', '48px'],
    ['menuitem20', 'this.forward()'          , 'BringToFront', 'gif\/move_forward_x48.png', '48px', '48px'],

    ['menuitem40' , 'this.add_link(null,false)', 'InsertLink', 'gif\/link_add_x48.png', '48px', '48px'],
    ['menuitem50' , 'this.delete_link(true)'  , 'RemoveLink', 'gif\/link_delete_x48.png', '48px', '48px']
];
var ob_chartBar_popupAttributes = [
    ['menuitem7', 'openbexiNavigator.window_factory(null,\'ob_menu_RequestBrowser\',ob_chart_bar_editor,\'maximize\');getSelectedBexiObj(null).displayViewChartBar();', 'View', 'gif\/ob_view_x48.png', '48px', '48px'],
    ['menuitem8', 'openbexiNavigator.window_factory(null,\'ob_menu_RequestBrowser\',ob_chart_data_editor,\'maximize\');getSelectedBexiObj(null).displayChartData();', 'Data', 'gif\/ob_data_x48.png', '48px', '48px'],
    ['menuitem35px', 'this.setTimeout(event)' , 'PoolingInterval', 'gif\/settimeout.png', '48px', '48px'],

    ['menuitem31' , 'this.createBarChart(event)'  , 'createBarChart', 'gif\/BarChart.jpg', '48px', '48px'],
    ['menuitem33' , 'this.createBarChart3D(event)'  , 'createBarChart3D', 'gif\/BarChart3D.jpg', '48px', '48px'],
    ['menuitem35' , 'this.createStackedBarChart(event)'  , 'createStackedBarChart', 'gif\/StackedBarChart.jpg', '48px', '48px'],
    ['menuitem39' , 'this.createStackedBarChart3D(event)'  , 'createStackedBarChart3D', 'gif\/StackedBarChart3D.jpg', '48px', '48px'],
    //['menuitem42' ,'this.chart_browseXML(event)'        ,'chart_browseXMLDatabase', 'gif\/ob_xml_x48.png','48px','48px'],
    ['menuitem25px', 'this.removeObject(true);openbexiNavigator.update_menu_editor(null, false);'  , 'DlgSelectBtnDelete', 'gif\/chartPie_delete_x48.png', '48px', '48px'],

    ['menuitem18', 'this.backward()', 'SendToBack', 'gif\/move_backward_x48.png', '48px', '48px'],
    ['menuitem20', 'this.forward()'          , 'BringToFront', 'gif\/move_forward_x48.png', '48px', '48px'],

    ['menuitem40' , 'this.add_link(null,false)', 'InsertLink', 'gif\/link_add_x48.png', '48px', '48px'],
    ['menuitem50' , 'this.delete_link(true)'  , 'RemoveLink', 'gif\/link_delete_x48.png', '48px', '48px']
];
var ob_chartLine_popupAttributes = [
    ['menuitem7', 'openbexiNavigator.window_factory(null,\'ob_menu_RequestBrowser\',ob_chart_line_editor,\'maximize\');getSelectedBexiObj(null).displayViewChartLine();', 'View', 'gif\/ob_view_x48.png', '48px', '48px'],
    ['menuitem8', 'openbexiNavigator.window_factory(null,\'ob_menu_RequestBrowser\',ob_chart_data_editor,\'maximize\');getSelectedBexiObj(null).displayChartData();', 'Data', 'gif\/ob_data_x48.png', '48px', '48px'],
    ['menuitem35px', 'this.setTimeout(event)' , 'PoolingInterval', 'gif\/settimeout.png', '48px', '48px'],

    ['menuitem32' , 'this.createLineChart(event)'  , 'createLineChart', 'gif\/LineChart.jpg', '48px', '48px'],
    ['menuitem36' , 'this.createTimeSeriesChart(event)'  , 'createTimeSeriesChart', 'gif\/TimeSeriesChart.jpeg', '48px', '48px'],
    ['menuitem38' , 'this.createAreaChart(event)'  , 'createAreaChart', 'gif\/AreaChart.jpg', '48px', '48px'],
    ['menuitem39' , 'this.createScatterPlot(event)'  , 'createScatterPlot', 'gif\/ScatterPlotChart.jpeg', '48px', '48px'],
    //['menuitem42' ,'this.chart_browseXML(event)'        ,'chart_browseXMLDatabase', 'gif\/ob_xml_x48.png','48px','48px'],
    ['menuitem25px', 'this.removeObject(true);openbexiNavigator.update_menu_editor(null, false);'  , 'DlgSelectBtnDelete', 'gif\/chartPie_delete_x48.png', '48px', '48px'],

    ['menuitem18', 'this.backward()', 'SendToBack', 'gif\/move_backward_x48.png', '48px', '48px'],
    ['menuitem20', 'this.forward()'          , 'BringToFront', 'gif\/move_forward_x48.png', '48px', '48px'],

    ['menuitem40' , 'this.add_link(null,false)', 'InsertLink', 'gif\/link_add_x48.png', '48px', '48px'],
    ['menuitem50' , 'this.delete_link(true)'  , 'RemoveLink', 'gif\/link_delete_x48.png', '48px', '48px']
];

function ob_chart_preloadImgWait(parent, currentImage, keepProportion) {
    if (currentImage == null) return;
    if (!currentImage.complete) {
        setTimeout(function () {
            ob_chart_preloadImgWait(parent, currentImage, keepProportion);
        }, 200);
    } else {
        document.getElementById(parent).appendChild(currentImage);
        if (parseInt(currentImage.width) != 0) {
            if (keepProportion) {
                document.getElementById(parent).style.height = (119 / parseInt(currentImage.width)) * parseInt(currentImage.height) + "px";
            }
            currentImage.style.width = "100%";
            currentImage.style.height = "100%";
        }
    }
}
function ob_chart_bexiError() {
}
var openbexi_chart = function (bexiObj, obj, name, charType, top, left, width, height, keepProportion) {
    try {
        __openbexi_debugC("openbexi_chart(" + bexiObj + "," + obj + "," + name + "," + charType + "," + top + "," + left + "," + width + "," + height + "," + keepProportion + ")", "Classe:");

        this.loading_status = "loaded";
        this.styles_Bgchart = null;
        if (keepProportion == undefined)keepProportion = false;
        this.keepProportion = keepProportion;
        if (name == null || name == "") name = getNewIdDiv("div");
        if (openbexiNavigator)
            this.openbexiNavigator = openbexiNavigator;
        else
            this.openbexiNavigator = new openbexi_navigator();
        this.name = name;
        this.id = name;
        this.type = "openbexi_chart";
        this.caption = "";
        this.XmlFile = null;
        this.selected = "false";
        if (bexiObj == null)
            this.parentNodeId = "BODY";
        else
            this.parentNodeId = bexiObj.id;
        var divobj;
        if (obj == null) {
            var fileName = "./gif/chartPie.png";
            if (charType == "bar")   fileName = "./gif/chartBar.png";
            if (charType == "line")   fileName = "./gif/chartLine.png";
            divobj = new openbexi_div(bexiObj, obj, name, top, left, width, height);
            this.div = divobj.div;
            this.parent = this.div.id;
            this.div.setAttribute("CLASSE", "DIV_CHART");
            if (getBrowser() != "ie6" && getBrowser() != "ie7" && getBrowser() != "ie7_no_XMLHttpRequest") this.div.style.background = "#cacaca";
            this.div.style.border = "0px solid white";
            this.chart = document.createElement("img");
            this.chart.setAttribute("id", name + "_chart");
            this.chart.setAttribute("CLASSE", "CHART");
            this.div.setAttribute("creation_date", new Date());
            this.chart.src = fileName;
            this.chart.type = charType;
            this.chart.subtype = "PieChart3D";
            this.setData("PieChart3D", "");
            this.add(fileName);
            ob_chart_preloadImgWait(this.parent, this.chart, this.keepProportion);
        } else {
            divobj = new openbexi_div(bexiObj, obj, obj.id, top, left, width, height);
            this.div = divobj.div;
            this.div.setAttribute("CLASSE", "DIV_CHART");
            this.div.setAttribute("creation_date",  obj.getAttribute("creation_date"));
            this.div.setAttribute("obzindex",  obj.getAttribute("obzindex"));
            this.div.setAttribute("ob_template",  obj.getAttribute("ob_template"));
            this.parent = this.div.id;
            this.chart = document.getElementById(name);
            this.chart.title = openbexi_getPageData(null, "url", this.div.id, "url");
            this.div.style.zIndex = obj.getAttribute("obzindex");
            this.getData();
        }
        this.chart.onError = ob_chart_bexiError();
        this.genericObject = new openbexi_generic_object(this);
        this.chart.setAttribute("class", "ob_image");
        this.set_template(this.template, null, null, null);
        if (obj == null) this.forward();
    } catch (e) {
        __openbexi_debugC("openbexi_chart()", "Exception:" + e.message);
    }
}
openbexi_chart.prototype.setData = function (chartSubtype) {
    this.div.style.cursor = "default";

    openbexi_deletePageData(null, "chart", this.div.id, "ALL", null);

    openbexi_updatePageData(null, "page", this.div.id, "type", this.type);
    openbexi_updatePageData(null, "chart", this.div.id, "chartId", this.chart.id);
    openbexi_updatePageData(null, "chart", this.div.id, "caption", this.caption);
    openbexi_updatePageData(null, "chart", this.div.id, "selected", this.selected);

    openbexi_updatePageData(null, "chart", this.div.id, "type", this.chart.type);
    openbexi_updatePageData(null, "chart", this.div.id, "output", "png");
    openbexi_updatePageData(null, "chart", this.div.id, "subtype", chartSubtype);
    openbexi_updatePageData(null, "chart", this.div.id, "title", "title1");
    openbexi_updatePageData(null, "chart", this.div.id, "subtitle", "");
    openbexi_updatePageData(null, "chart", this.div.id, "legende", "true");
    openbexi_updatePageData(null, "chart", this.div.id, "height", "300");
    openbexi_updatePageData(null, "chart", this.div.id, "width", "400");
    openbexi_updatePageData(null, "chart", this.div.id, "labelGap", "0.02");
    openbexi_updatePageData(null, "chart", this.div.id, "tooltips", "true");
    openbexi_updatePageData(null, "chart", this.div.id, "URLs", "false");
    openbexi_updatePageData(null, "chart", this.div.id, "seriesPaint", "0;#FFFF00;1;#0000FF;2;#04B404;3;#DF0101");
    openbexi_updatePageData(null, "chart", this.div.id, "foregroundAlpha", "1.0f");
    openbexi_updatePageData(null, "chart", this.div.id, "background", "white");
    openbexi_updatePageData(null, "chart", this.div.id, "panelFont", "SansSherif bold 14");
    openbexi_updatePageData(null, "chart", this.div.id, "subTitleFont", "SansSherif bold 12");
    openbexi_updatePageData(null, "chart", this.div.id, "plotFont", "SansSherif bold 12");

    var imgID = new Date().getTime();
    if (this.chart.type == "pie") {
        openbexi_updatePageData(null, "chart", this.div.id, "png", "chartPie" + imgID + ".png");
        openbexi_updatePageData(null, "chart", this.div.id, "explodeNumber", "1");
        openbexi_updatePageData(null, "chart", this.div.id, "explode", "0.19");
        openbexi_updatePageData(null, "chart", this.div.id, "data_0", "One;33.3;Two;33.3;Three;33.3;");
    }
    if (this.chart.type == "bar") {
        openbexi_updatePageData(null, "chart", this.div.id, "png", "chartBar" + imgID + ".png");
        openbexi_updatePageData(null, "chart", this.div.id, "labelX", "labelX");
        openbexi_updatePageData(null, "chart", this.div.id, "labelY", "labelY");
        openbexi_updatePageData(null, "chart", this.div.id, "orientation", "VERTICAL");
        openbexi_updatePageData(null, "chart", this.div.id, "data_0", "10;first;category1");
        openbexi_updatePageData(null, "chart", this.div.id, "data_1", "30;first;category2");
        openbexi_updatePageData(null, "chart", this.div.id, "data_2", "30;first;category3");
        openbexi_updatePageData(null, "chart", this.div.id, "data_3", "30;first;category4");

        openbexi_updatePageData(null, "chart", this.div.id, "data_4", "10;second;category1");
        openbexi_updatePageData(null, "chart", this.div.id, "data_5", "70;second;category2");
        openbexi_updatePageData(null, "chart", this.div.id, "data_6", "50;second;category3");

        openbexi_updatePageData(null, "chart", this.div.id, "data_7", "10;third;category1");
        openbexi_updatePageData(null, "chart", this.div.id, "data_8", "70;third;category2");
    }
    if (this.chart.type == "line") {
        openbexi_updatePageData(null, "chart", this.div.id, "png", "chartLine" + imgID + ".png");
        openbexi_updatePageData(null, "chart", this.div.id, "labelX", "labelX");
        openbexi_updatePageData(null, "chart", this.div.id, "labelY", "labelY");
        openbexi_updatePageData(null, "chart", this.div.id, "orientation", "VERTICAL");
        openbexi_updatePageData(null, "chart", this.div.id, "data_0", "first;10;11;33;44;22;45;44;21");
        openbexi_updatePageData(null, "chart", this.div.id, "data_1", "second;30;33;44;34;65;23");
        openbexi_updatePageData(null, "chart", this.div.id, "data_2", "third;50;22;34;67;54;28;22;3;44;33");
    }
    if (this.theme == "" || this.theme == undefined)  this.theme = "default";
    openbexi_updatePageData(null, "page", this.div.id, "theme", this.theme);
    openbexi_updatePageData(null, "page", this.div.id, "subtheme", this.subtheme);
    if (this.template == "" || this.template == undefined)  this.template = "template/ob_chart/default.css";
    openbexi_updatePageData(null, "page", this.div.id, "template", this.template);
}
openbexi_chart.prototype.getData = function () {
    var caption = openbexi_getPageData(null, "chart", this.div.id, "caption");
    if (caption != "") this.caption = caption;
    var selected = openbexi_getPageData(null, "chart", this.div.id, "selected");
    if (selected != "") this.selected = selected;
    this.chart.type = openbexi_getPageData(null, "chart", this.div.id, "type");
    if (this.chart.type == "") this.chart.type = "pie";
    this.chart.id = openbexi_getPageData(null, "chart", this.div.id, "chartId");
    this.theme = openbexi_getPageData(null, "page", this.div.id, "theme");
    this.subtheme = openbexi_getPageData(null, "page", this.div.id, "subtheme");
    this.template = openbexi_getPageData(null, "page", this.div.id, "template");
}
openbexi_chart.prototype.set_template = function (css_file, category, action, rsync_canvas) {
    if (css_file == null || css_file == "")return;
    if (action == "open") {
        this.subtheme = css_file;
        openbexi_updatePageData(null, "page", this.div.id, "subtheme", css_file);
        openbexiNavigator.browse_CSS(null, null, this.subtheme, true);
    }
    else {
        this.genericObject.set_template(this, css_file, action, rsync_canvas);
        this.chart.setAttribute((document.all ? "className" : "class"), "ob_chart_" + this.theme);
        //$ob_jquery('#'+this.chart.id).addClass("ob_chart_" + this.theme);
    }
}
openbexi_chart.prototype.getClass = function () {
    return "ob_chart_" + this.theme;
};
openbexi_chart.prototype.requestChart = function () {
    var doc = null;
    doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_ChartRequest");
    doc = set_xml_classe_object_attribut_value(doc, "ob_request", "chart", "id", this.div.id);
    doc = set_xml_classe_object_attribut_value(doc, "ob_request", "chart", "type", this.chart.type);
    doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "project", openbexiNavigator.projectName);
    doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "page", openbexiNavigator.HTML_short_pageName);

    var output = openbexi_getPageData(null, "chart", this.div.id, "output");
    doc = set_xml_classe_object_attribut_value(doc, "chart", this.chart.type, "output", output);
    var subtype = openbexi_getPageData(null, "chart", this.div.id, "subtype");
    doc = set_xml_classe_object_attribut_value(doc, "chart", this.chart.type, "subtype", subtype);
    var title = openbexi_getPageData(null, "chart", this.div.id, "title");
    doc = set_xml_classe_object_attribut_value(doc, "chart", this.chart.type, "title", title);
    var subtitle = openbexi_getPageData(null, "chart", this.div.id, "subtitle");
    doc = set_xml_classe_object_attribut_value(doc, "chart", this.chart.type, "subtitle", subtitle);
    var legende = openbexi_getPageData(null, "chart", this.div.id, "legende");
    doc = set_xml_classe_object_attribut_value(doc, "chart", this.chart.type, "legende", legende);
    var height = openbexi_getPageData(null, "chart", this.div.id, "height");
    doc = set_xml_classe_object_attribut_value(doc, "chart", this.chart.type, "height", height);
    var width = openbexi_getPageData(null, "chart", this.div.id, "width");
    doc = set_xml_classe_object_attribut_value(doc, "chart", this.chart.type, "width", width);
    var labelGap = openbexi_getPageData(null, "chart", this.div.id, "labelGap");
    doc = set_xml_classe_object_attribut_value(doc, "chart", this.chart.type, "labelGap", labelGap);
    var tooltips = openbexi_getPageData(null, "chart", this.div.id, "tooltips");
    doc = set_xml_classe_object_attribut_value(doc, "chart", this.chart.type, "tooltips", tooltips);
    var URLs = openbexi_getPageData(null, "chart", this.div.id, "URLs");
    doc = set_xml_classe_object_attribut_value(doc, "chart", this.chart.type, "URLs", URLs);
    var seriesPaint = openbexi_getPageData(null, "chart", this.div.id, "seriesPaint");
    doc = set_xml_classe_object_attribut_value(doc, "chart", this.chart.type, "seriesPaint", seriesPaint);
    var foregroundAlpha = openbexi_getPageData(null, "chart", this.div.id, "foregroundAlpha");
    doc = set_xml_classe_object_attribut_value(doc, "chart", this.chart.type, "foregroundAlpha", foregroundAlpha);
    var background = openbexi_getPageData(null, "chart", this.div.id, "background");
    doc = set_xml_classe_object_attribut_value(doc, "chart", this.chart.type, "background", background);
    var panelFont = openbexi_getPageData(null, "chart", this.div.id, "panelFont");
    doc = set_xml_classe_object_attribut_value(doc, "chart", this.chart.type, "panelFont", panelFont);
    var subTitleFont = openbexi_getPageData(null, "chart", this.div.id, "subTitleFont");
    doc = set_xml_classe_object_attribut_value(doc, "chart", this.chart.type, "subTitleFont", subTitleFont);
    var plotFont = openbexi_getPageData(null, "chart", this.div.id, "plotFont");
    doc = set_xml_classe_object_attribut_value(doc, "chart", this.chart.type, "plotFont", plotFont);

    var imgID = new Date().getTime();
    var pngOld = openbexi_getPageData(null, "chart", this.div.id, "pngOld");
    openbexi_updatePageData(null, "chart", this.div.id, "png", imgID + ".png");
    doc = set_xml_classe_object_attribut_value(doc, "chart", this.chart.type, "pngOld", pngOld);
    doc = set_xml_classe_object_attribut_value(doc, "chart", this.chart.type, "png", imgID + ".png");

    if (this.chart.type == "pie") {
        var explodeNumber = openbexi_getPageData(null, "chart", this.div.id, "explodeNumber");
        doc = set_xml_classe_object_attribut_value(doc, "chart", this.chart.type, "explodeNumber", explodeNumber);
        var explode = openbexi_getPageData(null, "chart", this.div.id, "explode");
        doc = set_xml_classe_object_attribut_value(doc, "chart", this.chart.type, "explode", explode);
        var data_0 = openbexi_getPageData(null, "chart", this.div.id, "data_0");
        doc = set_xml_classe_object_attribut_value(doc, "chart", this.chart.type, "data_0", data_0);
    }
    if (this.chart.type == "bar" || this.chart.type == "line") {
        var labelX = openbexi_getPageData(null, "chart", this.div.id, "labelX");
        doc = set_xml_classe_object_attribut_value(doc, "chart", this.chart.type, "labelX", labelX);
        var labelY = openbexi_getPageData(null, "chart", this.div.id, "labelY");
        doc = set_xml_classe_object_attribut_value(doc, "chart", this.chart.type, "labelY", labelY);
        var orientation = openbexi_getPageData(null, "chart", this.div.id, "orientation");
        doc = set_xml_classe_object_attribut_value(doc, "chart", this.chart.type, "orientation", orientation);

        var data = "1";
        var count = 0;
        while (data != "") {
            data = openbexi_getPageData(null, "chart", this.div.id, "data_" + count);
            if (data != "") {
                doc = set_xml_classe_object_attribut_value(doc, "chart", this.chart.type, "data_" + count, data);
                count++;
            }
        }
    }

    var ob_xml = openbexi_get_xmlString(doc);
    var mode_sync = openbexi_synchron();
    openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_getChart_CB);
}
openbexi_chart.prototype.chart_browseXML = function (event) {
    try {
        openbexiNavigator.mode = "getChartXML";
        openbexiNavigator.display(event, 0);
    } catch (e) {
    }
}
function openbexi_getChart_CB(responseXML) {
    var ob_doc = openbexi_get_documentElement(responseXML, "text/xml");
    var status = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "status", "text");
    var div_id = get_xml_classe_object_attribut_value(ob_doc, "ob_request", "chart", "id");
    // div id may not match with selected widget because data may come from external source
    if (getSelectedBexiObj(null).type != "openbexi_body" && div_id != getSelectedBexiObj(null).div.id)
        div_id = getSelectedBexiObj(null).div.id;
    var type = get_xml_classe_object_attribut_value(ob_doc, "ob_request", "chart", "type");
    var png = get_xml_classe_object_attribut_value(ob_doc, "chart", type, "png");
    var file = "project/" + openbexiNavigator.projectName + "/gif/" + png;
    try {
        if (status != "OK") {
            png = "ChartNoData.png";
            file = "gif/" + png;
        }
    } catch (e) {
    }
    getSelectedBexiObj(null).add(file);
    openbexi_updatePageData(null, "page", div_id, "filename", file);
    openbexi_updatePageData(null, "chart", div_id, "png", png);
    var height = get_xml_classe_object_attribut_value(ob_doc, "chart", type, "height");
    var width = get_xml_classe_object_attribut_value(ob_doc, "chart", type, "width");
    var chartId = openbexi_getPageData(null, "chart", div_id, "chartId");
    openbexi_updatePageData(null, "chart", div_id, "height", height);
    openbexi_updatePageData(null, "chart", div_id, "width", width);
    openbexi_updatePageData(null, "chart", div_id, "pngOld", png);

    if (width != "" && height != "") {
        var div = document.getElementById(div_id);
        div.style.height = height + "px";
        div.style.width = width + "px";
    }
    if (png != "") {
        var currentImage = document.getElementById(chartId);
        currentImage.src = file;
        currentImage.onError = ob_chart_bexiError();
        function preloadImg(div_id, currentImage) {
            if (currentImage == null) return;
            if (!currentImage.complete) {
                setTimeout(function () {
                    preloadImg(div_id, currentImage);
                }, 200);
            } else {
                document.getElementById(div_id).appendChild(currentImage);
                if (parseInt(currentImage.width) != 0) {
                    currentImage.style.width = "100%";
                    currentImage.style.height = "100%";
                    try {
                        if (openbexiNavigator) openbexiNavigator.status("Chart updated", "#abff4b");
                    } catch (e) {
                    }
                }
            }
        }

        preloadImg(div_id, currentImage);
        try {
            if (openbexiNavigator) openbexiNavigator.status("Chart updated", "#abff4b");
        } catch (e) {
        }

    }
}
function openbexi_readXMLfunction(div_id, subtype, file, chart_data) {
    this.XmlFile = file;
    if (chart_data == undefined) chart_data = "";
    try {
        var doc = set_xml_classe_object_attribut_value(null, "ob_request", "request", "type", "getChartXML");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "project", openbexiNavigator.projectName);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "page", openbexiNavigator.HTML_short_pageName);
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "chart", "xmlFile", file);
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "chart", "xmlData", "true");
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "chart", "filepath", "");
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "chart", "id", div_id);
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "chart", "type", subtype);

        var imgID = new Date().getTime();
        openbexi_updatePageData(null, "chart", div_id, "png", imgID + ".png");
        doc = set_xml_classe_object_attribut_value(doc, "chart", subtype, "png", imgID + ".png");
        var ob_xml = openbexi_get_xmlString(doc);
        var mode_sync = openbexi_synchron();
        openbexi_connect_to_server(null, mode_sync, ob_xml + "/n" + chart_data, openbexi_getChart_CB);
    } catch (e) {
    }

    openbexi_updatePageData(null, "chart", div_id, "type", subtype);
    openbexi_updatePageData(null, "chart", div_id, "xmlFile", file);

}
openbexi_chart.prototype.loadXML = function (file) {
    this.XmlFile = file;
    try {
        var doc = set_xml_classe_object_attribut_value(null, "ob_request", "request", "type", "getChartXML");
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "chart", "xmlFile", file);
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "chart", "id", this.div.id);
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "chart", "type", this.chart.type);
        var ob_xml = openbexi_get_xmlString(doc);
        var mode_sync = openbexi_synchron();
        openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_getChart_CB);
    } catch (e) {
    }
    openbexi_updatePageData(null, "chart", div_id, "type", subtype);
    openbexi_updatePageData(null, "chart", div_id, "xmlFile", file);
}
openbexi_chart.prototype.createChart = function (event, chart_type, subtype) {
    if (event) openbexi_stopEventPropagation(event);
    try {
        this.chart.type = chart_type;
        openbexi_updatePageData(null, "chart", this.div.id, "type", chart_type);
        openbexi_updatePageData(null, "chart", this.div.id, "subtype", subtype);
        this.requestChart();
    } catch (e) {
        alert("Sorry, cannot set up " + subtype + " attribute for " + chart_type + "\createChart:" + e.name + ". Error message: " + e.message);
    }
}
openbexi_chart.prototype.createPieChart = function (event) {
    this.createChart(event, "pie", "PieChart");
}
openbexi_chart.prototype.createPieChart3D = function (event) {
    this.createChart(event, "pie", "PieChart3D");
}
openbexi_chart.prototype.createRingChart = function (event) {
    this.createChart(event, "pie", "RingChart");
}
openbexi_chart.prototype.createStackedBarChart = function (event) {
    this.createChart(event, "bar", "StackedBarChart");
}
openbexi_chart.prototype.createStackedBarChart3D = function (event) {
    this.createChart(event, "bar", "StackedBarChart3D");
}
openbexi_chart.prototype.createBarChart = function (event) {
    this.createChart(event, "bar", "BarChart");
}
openbexi_chart.prototype.createBarChart3D = function (event) {
    this.createChart(event, "bar", "BarChart3D");
}
openbexi_chart.prototype.createLineChart = function (event) {
    this.createChart(event, "line", "LineChart");
}
openbexi_chart.prototype.createTimeSeriesChart = function (event) {
    this.createChart(event, "line", "TimeSeriesChart");
}
openbexi_chart.prototype.createAreaChart = function (event) {
    this.createChart(event, "line", "AreaChart");
}
openbexi_chart.prototype.createScatterPlot = function (event) {
    this.createChart(event, "line", "ScatterPlot");
}
openbexi_chart.prototype.getText = function () {
    return this.caption;
}
openbexi_chart.prototype.pasteText_or_Link = function () {
    var text = window.clipboardData.getData('Text');
    var occurHTTP = text.match("http:\/\/|https:\/\/|c:|C:|d:|D:|file:|javascript:void");
    if (occurHTTP != null && occurHTTP.length != 0) {
        this.add_link(text, true);
    }
}
openbexi_chart.prototype.getPopupAttributes = function () {
    if (this.chart.type == "pie")
        return ob_chartPie_popupAttributes;
    if (this.chart.type == "bar")
        return ob_chartBar_popupAttributes;
    if (this.chart.type == "line")
        return ob_chartLine_popupAttributes;
}
openbexi_chart.prototype.getInspectorAttributes = function () {
    return ob_chart_inspectorAttributes;
}
openbexi_chart.prototype.setSelected = function (objId) {
    this.genericObject.setSelected(objId);
    this.openbexiNavigator.update_menu_editor(this, true);
}
openbexi_chart.prototype.setUnSelected = function (objId) {
    try {
        this.genericObject.setUnSelected(objId);
        if (currentBexiObj_selected.type != this.type)
            this.openbexiNavigator.update_menu_editor(this, false);
    } catch (e) {
        __openbexi_debugC("openbexi_chart.prototype.setUnSelected()", "Exception:" + e.message);
    }
}
openbexi_chart.prototype.getChildrenId = function () {
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
openbexi_chart.prototype.setAttribute = function (name, value) {
    return this.genericObject.setAttribute(this.getChildrenId(), name, value);
}
openbexi_chart.prototype.changeStyle = function (objBexi, direction) {
    this.genericObject.changeStyle(objBexi, this, direction);
}
openbexi_chart.prototype.removeObject = function (flag) {
    try {
        if(this.div.getAttribute("ob_template")== "true" && openbexiNavigator.HTML_pageName != "template.html")   return;
        var listIdChild = this.getChildrenId();
        if (listIdChild) {
            for (var j = 0; j < listIdChild.length; j++) {
                openbexi_deletePageData(null, "page", listIdChild[j], "ALL", null);
            }
        }
    }
    catch (e) {
    }
    openbexi_deletePageData(null, "chart", this.div.id, "ALL", null);
    this.genericObject.removeObject(this);
    ob_setDirty_flag(flag);
}
openbexi_chart.prototype.my_PickFunc = function (e) {
    openbexi_stopEventPropagation(e);
    var bexiObj = getSelectedBexiObj(this.id);
    my_PickFunc(bexiObj.div);
}
openbexi_chart.prototype.add_function = function (protocole, functionName, ob_doc) {
    if (this.genericObject != null) this.genericObject.add_function(protocole, functionName, ob_doc);
}
openbexi_chart.prototype.add_link = function (url, unselect) {
    if (url == null) {
        url = this.genericObject.get_link(this.div.id);
        if (url == "") {
            url = prompt(openbexi_lang("enterObjectURL") + ":", "http://");
            this.chart.title = "";
        }
        else {
            url = prompt(openbexi_lang("enterObjectURL") + ":", url);
            this.chart.title = url;
        }
    }
    if (url != null) {
        if (this.genericObject != null) this.genericObject.add_link(this.div.id, "http", url, "onclick");
        this.chart.style.cursor = "pointer";
        this.chart.title = url;
    }
    if (unselect)  my_PickFunc(this.div);
}
openbexi_chart.prototype.delete_link = function (unselect) {
    if (this.genericObject != null) this.genericObject.delete_link(this.div.id);
    this.chart.style.cursor = "default";
    this.chart.title = "";
    if (unselect)my_PickFunc(this.div);
}
openbexi_chart.prototype.debug = function () {
    return this.genericObject.debug(this);
}
openbexi_chart.prototype.innerHTML_and_EVENTS = function () {
    var inner = "";
    var filename = openbexi_getPageData(null, "page", this.div.id, "filename");
    var protocole = openbexi_getPageData(null, "url_0", this.div.id, "protocole");
    if (protocole == "javascript") {
        var functions = this.genericObject.functions_to_trigger(this.div.id);
        if (functions != "")
            inner = '            <img src=\"' + filename + '\" class=\"ob_chart\"  ' + functions + ' CLASSE="' + this.chart.getAttribute("CLASSE") + '" id="' + this.chart.id + '" style="' + openbexi_get_CSS(this.chart) + '">' + document.getElementById(this.chart.id).innerHTML + '\n';
        else
            inner = '            <img src=\"' + filename + '\" class=\"ob_chart\"  CLASSE="' + this.chart.getAttribute("CLASSE") + '" id="' + this.chart.id + '" style="' + openbexi_get_CSS(this.chart) + '">' + document.getElementById(this.chart.id).innerHTML + '\n';
        //__openbexi_debugC("openbexi_chart.prototype.innerHTML_and_EVENTS ", document.getElementById(this.div.id).innerHTML + "\n\n\n" + inner)
        return inner;
    } else if (protocole == "http") {
        inner = "";
        var url = openbexi_getPageData(null, "url_0", this.div.id, "url");
        var event = openbexi_getPageData(null, "url_0", this.div.id, "event");
        if (url != "")
            inner = '            <img src=\"' + filename + '\" class=\"ob_chart\" ' + event + '=\"window.location=\'' + url + '\'\" CLASSE="' + this.chart.getAttribute("CLASSE") + '" id="' + this.chart.id + '" style="' + openbexi_get_CSS(this.chart) + '">' + document.getElementById(this.chart.id).innerHTML + '\n';
        else
            inner = '<img src=\"' + filename + '\" class=\"ob_chart\"  CLASSE="' + this.chart.getAttribute("CLASSE") + '" id="' + this.chart.id + '" style="' + openbexi_get_CSS(this.chart) + '">' + document.getElementById(this.chart.id).innerHTML + '\n';
        return inner;
    }
    else {
        return '<img src=\"' + filename + '\" class=\"ob_chart\"  CLASSE="' + this.chart.getAttribute("CLASSE") + '" id="' + this.chart.id + '" style="' + openbexi_get_CSS(this.chart) + '">' + document.getElementById(this.chart.id).innerHTML + '\n';
    }
}
openbexi_chart.prototype.get_editor = function () {
    return openbexiNavigator.get_menu_editor(this.getPopupAttributes());
}
openbexi_chart.prototype.forward = function () {
    return this.genericObject.forward(this.div, "+");
}
openbexi_chart.prototype.backward = function () {
    return this.genericObject.backward(this.div, "-");
}
openbexi_chart.prototype.align_left_auto_arrange = function () {
    return this.genericObject.align_left_auto_arrange(this);
}
openbexi_chart.prototype.align_right_auto_arrange = function () {
    return this.genericObject.align_right_auto_arrange(this);
}
openbexi_chart.prototype.align_top_auto_arrange = function () {
    return this.genericObject.align_top_auto_arrange(this);
}
openbexi_chart.prototype.align_bottom_auto_arrange = function () {
    return this.genericObject.align_bottom_auto_arrange(this);
}
openbexi_chart.prototype.vertical_width_auto_resize = function () {
    return this.genericObject.vertical_width_auto_resize(this);
}
openbexi_chart.prototype.vertical_height_auto_resize = function () {
    return this.genericObject.vertical_height_auto_resize(this);
}
openbexi_chart.prototype.horizontal_width_auto_resize = function () {
    return this.genericObject.horizontal_width_auto_resize(this);
}
openbexi_chart.prototype.horizontal_height_auto_resize = function () {
    return this.genericObject.horizontal_height_auto_resize(this);
}
openbexi_chart.prototype.vertical_spacing_auto_arrange = function () {
    return this.genericObject.vertical_spacing_auto_arrange(this);
}
openbexi_chart.prototype.horizontal_spacing_auto_arrange = function () {
    return this.genericObject.horizontal_spacing_auto_arrange(this);
}
openbexi_chart.prototype.undo_auto_arrange = function () {
    return this.genericObject.undo_auto_arrange(this);
}
openbexi_chart.prototype.redo_auto_arrange = function () {
    return this.genericObject.redo_auto_arrange(this);
}
openbexi_chart.prototype.functions_to_load = function () {
    var resync = openbexi_getPageData(null, "page", this.div.id, "resync");
    if (resync)
        return "openbexi_resync_chart(\'" + this.div.id + "\');";
    else
        return this.genericObject.functions_to_load(this.div.id);
}
openbexi_chart.prototype.head_code = function () {
    openbexi_add_javascript(null, "javascript/", "openbexi_chart.js");
    return this.genericObject.head_code(this);
}
openbexi_chart.prototype.body_code = function () {
    return this.genericObject.body_code(this);
}
openbexi_chart.prototype.add = function (chart) {
    if (chart) chart = chart.replace(this.openbexiNavigator.hrefPath, "");
    openbexi_updatePageData(null, "page", this.div.id, "filename", chart);
    openbexi_add_page_image(chart);
}
openbexi_chart.prototype.remove = function () {
}

openbexi_chart.prototype.displayViewChartBar = function () {
    var output = openbexi_getPageData(null, "chart", this.div.id, "output");
    if (output == "")output = "png";
    document.getElementById("bexicontext_output").value = output;

    var subtype = openbexi_getPageData(null, "chart", this.div.id, "subtype");
    if (subtype == "")subtype = "StackedBarChart";
    document.getElementById("bexicontext_subtype").value = subtype;

    var title = openbexi_getPageData(null, "chart", this.div.id, "title");
    if (title == "")title = "title1";
    document.getElementById("bexicontext_title").value = title;

    var subtitle = openbexi_getPageData(null, "chart", this.div.id, "subtitle");
    document.getElementById("bexicontext_subtitle").value = subtitle;

    var legende = openbexi_getPageData(null, "chart", this.div.id, "legende");
    if (legende == "")legende = "true";
    document.getElementById("bexicontext_legende").value = legende;

    var png = openbexi_getPageData(null, "chart", this.div.id, "png");
    if (legende == "")png = "png";
    document.getElementById("bexicontext_png").value = png;

    //var height = openbexi_getPageData(null, "chart", this.div.id, "height");
    //if (height == "")height = "300";
    document.getElementById("bexicontext_height").value = parseInt(this.div.style.height);

    //var width = openbexi_getPageData(null, "chart", this.div.id, "width");
    //if (width == "")width = "400";
    document.getElementById("bexicontext_width").value = parseInt(this.div.style.width);

    var labelGap = openbexi_getPageData(null, "chart", this.div.id, "labelGap");
    if (labelGap == "")labelGap = "0.02";
    document.getElementById("bexicontext_labelGap").value = labelGap;

    var tooltips = openbexi_getPageData(null, "chart", this.div.id, "tooltips");
    if (tooltips == "")tooltips = "true";
    document.getElementById("bexicontext_tooltips").value = tooltips;

    var URLs = openbexi_getPageData(null, "chart", this.div.id, "URLs");
    if (URLs == "")URLs = "true";
    document.getElementById("bexicontext_URLs").value = URLs;

    var seriesPaint = openbexi_getPageData(null, "chart", this.div.id, "seriesPaint");
    if (seriesPaint == "")seriesPaint = "#FFFF00;1;#0000FF;2;#04B404;3;#DF0101";
    document.getElementById("bexicontext_seriesPaint").value = seriesPaint;

    var foregroundAlpha = openbexi_getPageData(null, "chart", this.div.id, "foregroundAlpha");
    if (foregroundAlpha == "")foregroundAlpha = "1.0f";
    document.getElementById("bexicontext_foregroundAlpha").value = foregroundAlpha;

    var panelFont = openbexi_getPageData(null, "chart", this.div.id, "panelFont");
    if (panelFont == "")panelFont = "SansSherif bold 14";
    document.getElementById("bexicontext_panelFont").value = panelFont;

    var subTitleFont = openbexi_getPageData(null, "chart", this.div.id, "subTitleFont");
    if (subTitleFont == "")subTitleFont = "SansSherif bold 12";
    document.getElementById("bexicontext_subTitleFont").value = subTitleFont;

    var background = openbexi_getPageData(null, "chart", this.div.id, "background");
    if (background == "")background = "white";
    document.getElementById("bexicontext_background").value = background;

    var orientation = openbexi_getPageData(null, "chart", this.div.id, "orientation");
    if (orientation == "")orientation = "VERTICAL";
    document.getElementById("bexicontext_orientation").value = orientation;

    var labelX = openbexi_getPageData(null, "chart", this.div.id, "labelX");
    if (labelX == "")labelX = "labelX";
    document.getElementById("bexicontext_labelX").value = labelX;

    var labelY = openbexi_getPageData(null, "chart", this.div.id, "labelY");
    if (labelY == "")labelY = "labelY";
    document.getElementById("bexicontext_labelY").value = labelY;
}
openbexi_chart.prototype.displayViewChartLine = function () {
    var output = openbexi_getPageData(null, "chart", this.div.id, "output");
    if (output == "")output = "png";
    document.getElementById("bexicontext_output").value = output;

    var subtype = openbexi_getPageData(null, "chart", this.div.id, "subtype");
    if (subtype == "")subtype = "StackedBarChart";
    document.getElementById("bexicontext_subtype").value = subtype;

    var title = openbexi_getPageData(null, "chart", this.div.id, "title");
    if (title == "")title = "title1";
    document.getElementById("bexicontext_title").value = title;

    var subtitle = openbexi_getPageData(null, "chart", this.div.id, "subtitle");
    document.getElementById("bexicontext_subtitle").value = subtitle;

    var legende = openbexi_getPageData(null, "chart", this.div.id, "legende");
    if (legende == "")legende = "true";
    document.getElementById("bexicontext_legende").value = legende;

    var png = openbexi_getPageData(null, "chart", this.div.id, "png");
    if (legende == "")png = "png";
    document.getElementById("bexicontext_png").value = png;

    //var height = openbexi_getPageData(null, "chart", this.div.id, "height");
    //if (height == "")height = "300";
    document.getElementById("bexicontext_height").value = parseInt(this.div.style.height);

    //var width = openbexi_getPageData(null, "chart", this.div.id, "width");
    //if (width == "")width = "400";
    document.getElementById("bexicontext_width").value = parseInt(this.div.style.width);

    var labelGap = openbexi_getPageData(null, "chart", this.div.id, "labelGap");
    if (labelGap == "")labelGap = "0.02";
    document.getElementById("bexicontext_labelGap").value = labelGap;

    var tooltips = openbexi_getPageData(null, "chart", this.div.id, "tooltips");
    if (tooltips == "")tooltips = "true";
    document.getElementById("bexicontext_tooltips").value = tooltips;

    var URLs = openbexi_getPageData(null, "chart", this.div.id, "URLs");
    if (URLs == "")URLs = "true";
    document.getElementById("bexicontext_URLs").value = URLs;

    var seriesPaint = openbexi_getPageData(null, "chart", this.div.id, "seriesPaint");
    if (seriesPaint == "")seriesPaint = "#FFFF00;1;#0000FF;2;#04B404;3;#DF0101";
    document.getElementById("bexicontext_seriesPaint").value = seriesPaint;

    var foregroundAlpha = openbexi_getPageData(null, "chart", this.div.id, "foregroundAlpha");
    if (foregroundAlpha == "")foregroundAlpha = "1.0f";
    document.getElementById("bexicontext_foregroundAlpha").value = foregroundAlpha;

    var panelFont = openbexi_getPageData(null, "chart", this.div.id, "panelFont");
    if (panelFont == "")panelFont = "SansSherif bold 14";
    document.getElementById("bexicontext_panelFont").value = panelFont;

    var subTitleFont = openbexi_getPageData(null, "chart", this.div.id, "subTitleFont");
    if (subTitleFont == "")subTitleFont = "SansSherif bold 12";
    document.getElementById("bexicontext_subTitleFont").value = subTitleFont;

    var background = openbexi_getPageData(null, "chart", this.div.id, "background");
    if (background == "")background = "white";
    document.getElementById("bexicontext_background").value = background;

    var orientation = openbexi_getPageData(null, "chart", this.div.id, "orientation");
    if (orientation == "")orientation = "VERTICAL";
    document.getElementById("bexicontext_orientation").value = orientation;

    var labelX = openbexi_getPageData(null, "chart", this.div.id, "labelX");
    if (labelX == "")labelX = "labelX";
    document.getElementById("bexicontext_labelX").value = labelX;

    var labelY = openbexi_getPageData(null, "chart", this.div.id, "labelY");
    if (labelY == "")labelY = "labelY";
    document.getElementById("bexicontext_labelY").value = labelY;
}
openbexi_chart.prototype.displayViewChartPie = function () {
    var output = openbexi_getPageData(null, "chart", this.div.id, "output");
    if (output == "")output = "png";
    document.getElementById("bexicontext_output").value = output;

    var subtype = openbexi_getPageData(null, "chart", this.div.id, "subtype");
    if (subtype == "")subtype = "PieChart3D";
    document.getElementById("bexicontext_subtype").value = subtype;

    var title = openbexi_getPageData(null, "chart", this.div.id, "title");
    if (title == "")title = "title1";
    document.getElementById("bexicontext_title").value = title;

    var subtitle = openbexi_getPageData(null, "chart", this.div.id, "subtitle");
    document.getElementById("bexicontext_subtitle").value = subtitle;

    var legende = openbexi_getPageData(null, "chart", this.div.id, "legende");
    if (legende == "")legende = "true";
    document.getElementById("bexicontext_legende").value = legende;

    var png = openbexi_getPageData(null, "chart", this.div.id, "png");
    if (legende == "")png = "png";
    document.getElementById("bexicontext_png").value = png;

    //var height = openbexi_getPageData(null, "chart", this.div.id, "height");
    //if (height == "")height = "300";
    document.getElementById("bexicontext_height").value = parseInt(this.div.style.height);

    //var width = openbexi_getPageData(null, "chart", this.div.id, "width");
    //if (width == "")width = "400";
    document.getElementById("bexicontext_width").value = parseInt(this.div.style.width);

    var labelGap = openbexi_getPageData(null, "chart", this.div.id, "labelGap");
    if (labelGap == "")labelGap = "0.02";
    document.getElementById("bexicontext_labelGap").value = labelGap;

    var explode = openbexi_getPageData(null, "chart", this.div.id, "explode");
    if (explode == "")explode = "0.19";
    document.getElementById("bexicontext_explode").value = explode;

    var explodeNumber = openbexi_getPageData(null, "chart", this.div.id, "explodeNumber");
    if (explodeNumber == "")explodeNumber = "1";
    document.getElementById("bexicontext_explodeNumber").value = explodeNumber;

    var tooltips = openbexi_getPageData(null, "chart", this.div.id, "tooltips");
    if (tooltips == "")tooltips = "true";
    document.getElementById("bexicontext_tooltips").value = tooltips;

    var URLs = openbexi_getPageData(null, "chart", this.div.id, "URLs");
    if (URLs == "")URLs = "true";
    document.getElementById("bexicontext_URLs").value = URLs;

    var seriesPaint = openbexi_getPageData(null, "chart", this.div.id, "seriesPaint");
    if (seriesPaint == "")seriesPaint = "0;#FFFF00;1;#0000FF;2;#04B404;3;#DF0101";
    document.getElementById("bexicontext_seriesPaint").value = seriesPaint;

    var foregroundAlpha = openbexi_getPageData(null, "chart", this.div.id, "foregroundAlpha");
    if (foregroundAlpha == "")foregroundAlpha = "1.0f";
    document.getElementById("bexicontext_foregroundAlpha").value = foregroundAlpha;

    var panelFont = openbexi_getPageData(null, "chart", this.div.id, "panelFont");
    if (panelFont == "")panelFont = "SansSherif bold 14";
    document.getElementById("bexicontext_panelFont").value = panelFont;

    var subTitleFont = openbexi_getPageData(null, "chart", this.div.id, "subTitleFont");
    if (subTitleFont == "")subTitleFont = "SansSherif bold 12";
    document.getElementById("bexicontext_subTitleFont").value = subTitleFont;

    var plotFont = openbexi_getPageData(null, "chart", this.div.id, "plotFont");
    if (plotFont == "")plotFont = "SansSherif bold 12";
    document.getElementById("bexicontext_plotFont").value = plotFont;

    var background = openbexi_getPageData(null, "chart", this.div.id, "background");
    if (background == "")background = "white";
    document.getElementById("bexicontext_background").value = background;
}
openbexi_chart.prototype.updateViewChartBar = function () {
    var output = openbexi_stringReplaceAll(document.getElementById("bexicontext_output").value, " ", "");
    if (output == "")output = "png";
    openbexi_updatePageData(null, "chart", this.div.id, "output", output);

    var subtype = openbexi_stringReplaceAll(document.getElementById("bexicontext_subtype").value, " ", "");
    if (subtype == "")subtype = "StackedBarChart";
    openbexi_updatePageData(null, "chart", this.div.id, "subtype", subtype);

    var title = openbexi_stringReplaceAll(document.getElementById("bexicontext_title").value, " ", "");
    if (title == "")title = "title1";
    openbexi_updatePageData(null, "chart", this.div.id, "title", title);

    var subtitle = openbexi_stringReplaceAll(document.getElementById("bexicontext_subtitle").value, " ", "");
    openbexi_updatePageData(null, "chart", this.div.id, "subtitle", subtitle);

    var legende = openbexi_stringReplaceAll(document.getElementById("bexicontext_legende").value, " ", "");
    if (legende == "")legende = "true";
    openbexi_updatePageData(null, "chart", this.div.id, "legende", legende);

    var png = openbexi_stringReplaceAll(document.getElementById("bexicontext_png").value, " ", "");
    if (png == "")png = "png";
    openbexi_updatePageData(null, "chart", this.div.id, "png", png);

    var height = openbexi_stringReplaceAll(document.getElementById("bexicontext_height").value, " ", "");
    if (height == "")height = "300";
    openbexi_updatePageData(null, "chart", this.div.id, "height", height);

    var width = openbexi_stringReplaceAll(document.getElementById("bexicontext_width").value, " ", "");
    if (width == "")width = "400";
    openbexi_updatePageData(null, "chart", this.div.id, "width", width);

    var labelGap = openbexi_stringReplaceAll(document.getElementById("bexicontext_labelGap").value, " ", "");
    if (labelGap == "")labelGap = "0.02";
    openbexi_updatePageData(null, "chart", this.div.id, "labelGap", labelGap);

    var tooltips = openbexi_stringReplaceAll(document.getElementById("bexicontext_tooltips").value, " ", "");
    if (tooltips == "")tooltips = "true";
    openbexi_updatePageData(null, "chart", this.div.id, "tooltips", tooltips);

    var URLs = openbexi_stringReplaceAll(document.getElementById("bexicontext_URLs").value, " ", "");
    if (URLs == "")URLs = "false";
    openbexi_updatePageData(null, "chart", this.div.id, "URLs", URLs);

    var seriesPaint = openbexi_stringReplaceAll(document.getElementById("bexicontext_seriesPaint").value, " ", "");
    if (seriesPaint == "")seriesPaint = "#FFFF00;1;#0000FF;2;#04B404;3;#DF0101";
    openbexi_updatePageData(null, "chart", this.div.id, "seriesPaint", seriesPaint);

    var foregroundAlpha = openbexi_stringReplaceAll(document.getElementById("bexicontext_foregroundAlpha").value, " ", "");
    if (foregroundAlpha == "")foregroundAlpha = "1.0f";
    openbexi_updatePageData(null, "chart", this.div.id, "foregroundAlpha", foregroundAlpha);

    var background = openbexi_stringReplaceAll(document.getElementById("bexicontext_background").value, " ", "");
    if (background == "")background = "white";
    openbexi_updatePageData(null, "chart", this.div.id, "background", background);

    var panelFont = document.getElementById("bexicontext_panelFont").value;
    if (panelFont == "")panelFont = "SansSherif bold 14";
    openbexi_updatePageData(null, "chart", this.div.id, "panelFont", panelFont);

    var subTitleFont = document.getElementById("bexicontext_subTitleFont").value;
    if (subTitleFont == "")subTitleFont = "SansSherif bold 12";
    openbexi_updatePageData(null, "chart", this.div.id, "subTitleFont", subTitleFont);

    var orientation = openbexi_stringReplaceAll(document.getElementById("bexicontext_orientation").value, " ", "");
    if (orientation == "")orientation = "VERTICAL";
    openbexi_updatePageData(null, "chart", this.div.id, "orientation", orientation);

    var labelX = openbexi_stringReplaceAll(document.getElementById("bexicontext_labelX").value, " ", "");
    if (labelX == "")labelX = "labelX";
    openbexi_updatePageData(null, "chart", this.div.id, "labelX", labelX);

    var labelY = openbexi_stringReplaceAll(document.getElementById("bexicontext_labelY").value, " ", "");
    if (labelY == "")labelY = "labelY";
    openbexi_updatePageData(null, "chart", this.div.id, "labelY", labelY);

    this.requestChart();
}
openbexi_chart.prototype.updateViewChartPie = function () {
    var output = openbexi_stringReplaceAll(document.getElementById("bexicontext_output").value, " ", "");
    if (output == "")output = "png";
    openbexi_updatePageData(null, "chart", this.div.id, "output", output);

    var subtype = openbexi_stringReplaceAll(document.getElementById("bexicontext_subtype").value, " ", "");
    if (subtype == "")subtype = "PieChart3D";
    openbexi_updatePageData(null, "chart", this.div.id, "subtype", subtype);

    var title = openbexi_stringReplaceAll(document.getElementById("bexicontext_title").value, " ", "");
    if (title == "")title = "title1";
    openbexi_updatePageData(null, "chart", this.div.id, "title", title);


    var subtitle = openbexi_stringReplaceAll(document.getElementById("bexicontext_subtitle").value, " ", "");
    openbexi_updatePageData(null, "chart", this.div.id, "subtitle", subtitle);

    var legende = openbexi_stringReplaceAll(document.getElementById("bexicontext_legende").value, " ", "");
    if (legende == "")legende = "true";
    openbexi_updatePageData(null, "chart", this.div.id, "legende", legende);

    var png = openbexi_stringReplaceAll(document.getElementById("bexicontext_png").value, " ", "");
    if (png == "")png = "png";
    openbexi_updatePageData(null, "chart", this.div.id, "png", png);

    var height = openbexi_stringReplaceAll(document.getElementById("bexicontext_height").value, " ", "");
    if (height == "")height = "300";
    openbexi_updatePageData(null, "chart", this.div.id, "height", height);

    var width = openbexi_stringReplaceAll(document.getElementById("bexicontext_width").value, " ", "");
    if (width == "")width = "400";
    openbexi_updatePageData(null, "chart", this.div.id, "width", width);

    var labelGap = openbexi_stringReplaceAll(document.getElementById("bexicontext_labelGap").value, " ", "");
    if (labelGap == "")labelGap = "0.02";
    openbexi_updatePageData(null, "chart", this.div.id, "labelGap", labelGap);

    var explode = openbexi_stringReplaceAll(document.getElementById("bexicontext_explode").value, " ", "");
    if (explode == "")explode = "0.19";
    openbexi_updatePageData(null, "chart", this.div.id, "explode", explode);

    var explodeNumber = openbexi_stringReplaceAll(document.getElementById("bexicontext_explodeNumber").value, " ", "");
    if (explodeNumber == "")explodeNumber = "1";
    openbexi_updatePageData(null, "chart", this.div.id, "explodeNumber", explodeNumber);

    var tooltips = openbexi_stringReplaceAll(document.getElementById("bexicontext_tooltips").value, " ", "");
    if (tooltips == "")tooltips = "true";
    openbexi_updatePageData(null, "chart", this.div.id, "tooltips", tooltips);

    var URLs = openbexi_stringReplaceAll(document.getElementById("bexicontext_URLs").value, " ", "");
    if (URLs == "")URLs = "false";
    openbexi_updatePageData(null, "chart", this.div.id, "URLs", URLs);

    var seriesPaint = openbexi_stringReplaceAll(document.getElementById("bexicontext_seriesPaint").value, " ", "");
    if (seriesPaint == "")seriesPaint = "0;#FFFF00;1;#0000FF;2;#04B404;3;#DF0101";
    openbexi_updatePageData(null, "chart", this.div.id, "seriesPaint", seriesPaint);

    var foregroundAlpha = openbexi_stringReplaceAll(document.getElementById("bexicontext_foregroundAlpha").value, " ", "");
    if (foregroundAlpha == "")foregroundAlpha = "1.0f";
    openbexi_updatePageData(null, "chart", this.div.id, "foregroundAlpha", foregroundAlpha);

    var panelFont = document.getElementById("bexicontext_panelFont").value;
    if (panelFont == "")panelFont = "SansSherif bold 14";
    openbexi_updatePageData(null, "chart", this.div.id, "panelFont", panelFont);

    var subTitleFont = document.getElementById("bexicontext_subTitleFont").value;
    if (subTitleFont == "")subTitleFont = "SansSherif bold 12";
    openbexi_updatePageData(null, "chart", this.div.id, "subTitleFont", subTitleFont);

    var plotFont = document.getElementById("bexicontext_plotFont").value;
    if (plotFont == "")plotFont = "SansSherif bold 12";
    openbexi_updatePageData(null, "chart", this.div.id, "plotFont", plotFont);

    var background = openbexi_stringReplaceAll(document.getElementById("bexicontext_background").value, " ", "");
    if (background == "")background = "white";
    openbexi_updatePageData(null, "chart", this.div.id, "background", background);

    this.requestChart();
}
openbexi_chart.prototype.updateViewChartLine = function () {
    var output = openbexi_stringReplaceAll(document.getElementById("bexicontext_output").value, " ", "");
    if (output == "")output = "png";
    openbexi_updatePageData(null, "chart", this.div.id, "output", output);

    var subtype = openbexi_stringReplaceAll(document.getElementById("bexicontext_subtype").value, " ", "");
    if (subtype == "")subtype = "StackedBarChart";
    openbexi_updatePageData(null, "chart", this.div.id, "subtype", subtype);

    var title = openbexi_stringReplaceAll(document.getElementById("bexicontext_title").value, " ", "");
    if (title == "")title = "title1";
    openbexi_updatePageData(null, "chart", this.div.id, "title", title);

    var subtitle = openbexi_stringReplaceAll(document.getElementById("bexicontext_subtitle").value, " ", "");
    openbexi_updatePageData(null, "chart", this.div.id, "subtitle", subtitle);

    var legende = openbexi_stringReplaceAll(document.getElementById("bexicontext_legende").value, " ", "");
    if (legende == "")legende = "true";
    openbexi_updatePageData(null, "chart", this.div.id, "legende", legende);

    var png = openbexi_stringReplaceAll(document.getElementById("bexicontext_png").value, " ", "");
    if (png == "")png = "png";
    openbexi_updatePageData(null, "chart", this.div.id, "png", png);

    var height = openbexi_stringReplaceAll(document.getElementById("bexicontext_height").value, " ", "");
    if (height == "")height = "300";
    openbexi_updatePageData(null, "chart", this.div.id, "height", height);

    var width = openbexi_stringReplaceAll(document.getElementById("bexicontext_width").value, " ", "");
    if (width == "")width = "400";
    openbexi_updatePageData(null, "chart", this.div.id, "width", width);

    var labelGap = openbexi_stringReplaceAll(document.getElementById("bexicontext_labelGap").value, " ", "");
    if (labelGap == "")labelGap = "0.02";
    openbexi_updatePageData(null, "chart", this.div.id, "labelGap", labelGap);

    var tooltips = openbexi_stringReplaceAll(document.getElementById("bexicontext_tooltips").value, " ", "");
    if (tooltips == "")tooltips = "true";
    openbexi_updatePageData(null, "chart", this.div.id, "tooltips", tooltips);

    var URLs = openbexi_stringReplaceAll(document.getElementById("bexicontext_URLs").value, " ", "");
    if (URLs == "")URLs = "false";
    openbexi_updatePageData(null, "chart", this.div.id, "URLs", URLs);

    var seriesPaint = openbexi_stringReplaceAll(document.getElementById("bexicontext_seriesPaint").value, " ", "");
    if (seriesPaint == "")seriesPaint = "#FFFF00;1;#0000FF;2;#04B404;3;#DF0101";
    openbexi_updatePageData(null, "chart", this.div.id, "seriesPaint", seriesPaint);

    var foregroundAlpha = openbexi_stringReplaceAll(document.getElementById("bexicontext_foregroundAlpha").value, " ", "");
    if (foregroundAlpha == "")foregroundAlpha = "1.0f";
    openbexi_updatePageData(null, "chart", this.div.id, "foregroundAlpha", foregroundAlpha);

    var panelFont = document.getElementById("bexicontext_panelFont").value;
    if (panelFont == "")panelFont = "SansSherif bold 14";
    openbexi_updatePageData(null, "chart", this.div.id, "panelFont", panelFont);

    var subTitleFont = document.getElementById("bexicontext_subTitleFont").value;
    if (subTitleFont == "")subTitleFont = "SansSherif bold 12";
    openbexi_updatePageData(null, "chart", this.div.id, "subTitleFont", subTitleFont);

    var background = openbexi_stringReplaceAll(document.getElementById("bexicontext_background").value, " ", "");
    if (background == "")background = "white";
    openbexi_updatePageData(null, "chart", this.div.id, "background", background);

    var orientation = openbexi_stringReplaceAll(document.getElementById("bexicontext_orientation").value, " ", "");
    if (orientation == "")orientation = "VERTICAL";
    openbexi_updatePageData(null, "chart", this.div.id, "orientation", orientation);

    var labelX = openbexi_stringReplaceAll(document.getElementById("bexicontext_labelX").value, " ", "");
    if (labelX == "")labelX = "labelX";
    openbexi_updatePageData(null, "chart", this.div.id, "labelX", labelX);

    var labelY = openbexi_stringReplaceAll(document.getElementById("bexicontext_labelY").value, " ", "");
    if (labelY == "")labelY = "labelY";
    openbexi_updatePageData(null, "chart", this.div.id, "labelY", labelY);

    this.requestChart();
}
var bexicontext_chart_data_editor;
openbexi_chart.prototype.displayChartData = function () {
    var textFormated = "";
    var data = "1";
    var count = 0;
    while (data != "") {
        data = openbexi_getPageData(null, "chart", this.div.id, "data_" + count);
        textFormated += data + "\n";
        count++;
    }
    document.getElementById("bexicontext_chart_data").value = textFormated;
    document.getElementById("bexicontext_chart_subtype").value = openbexi_getPageData(null, "chart", this.div.id, "subtype");

    //Implementing a Syntax-Highlighting with JavaScript Editor from code mirror
    bexicontext_chart_data_editor = CodeMirror.fromTextArea(document.getElementById("bexicontext_chart_data"), {mode: "javascript", theme: "night", lineNumbers: true, matchBrackets: true, tabMode: "indent", onChange: function () {
        clearTimeout(pending);
        setTimeout(update, 400);
    }});
}
openbexi_chart.prototype.updateDataChart = function () {
    var data = bexicontext_chart_data_editor.getValue();
    var count = openbexi_getPageData(null, "chart", this.div.id, "dataCount");
    // add new value
    var items = data.split(/\n/);
    count = 0;
    for (var j = 0; j < items.length - 1; j++) {
        if (items[j] != "") {
            openbexi_updatePageData(null, "chart", this.div.id, "data_" + count, items[j]);
            count++;
        }
    }
    openbexi_updatePageData(null, "chart", this.div.id, "dataCount", count);
    this.requestChart();
}
openbexi_chart.prototype.setTimeout = function () {
    var timeout = prompt("timeout: (in seconds - default 60 - timeout canceled if value = 0)", 60);
    this.timeout = timeout;
    if (parseInt(this.timeout) <= 0 || isNaN(this.timeout)) {
        this.timeout = 999999;
        this.resync = "false";
    } else {
        this.timeout = timeout * 1000;
        this.resync = "true";
    }
    openbexi_updatePageData(null, "page", this.div.id, "resync_type", "remote");
    openbexi_updatePageData(null, "page", this.div.id, "timeout", this.timeout);
    openbexi_updatePageData(null, "page", this.div.id, "resync", this.resync);
}
function openbexi_resync_chart(div_id) {
    var resync_type = openbexi_getPageData(null, "page", div_id, "resync_type");
    var resync = openbexi_getPageData(null, "page", div_id, "resync");
    if (resync == "true") {
        var timeout = openbexi_getPageData(null, "page", div_id, "timeout");
        if (resync_type == "local") {
            var chartId = openbexi_getPageData(null, "chart", div_id, "chartId");
            document.getElementById(chartId).src = openbexi_getPageData(null, "page", div_id, "filename");
        } else {
            try {
                var subtype = openbexi_getPageData(null, "chart", div_id, "type");
                var filename = openbexi_getPageData(null, "chart", div_id, "xmlFile");
                var doc = set_xml_classe_object_attribut_value(null, "ob_request", "request", "type", "getChartXML");
                doc = set_xml_classe_object_attribut_value(doc, "ob_request", "chart", "xmlFile", filename);
                doc = set_xml_classe_object_attribut_value(doc, "ob_request", "chart", "id", div_id);
                doc = set_xml_classe_object_attribut_value(doc, "ob_request", "chart", "type", subtype);
                var ob_xml = openbexi_get_xmlString(doc);
                openbexi_connect_to_server(null, false, ob_xml, openbexi_getChart_CB);
            } catch (e) {
            }
        }
        setTimeout(function () {
            openbexi_resync_chart(div_id);
        }, timeout);
    }
}


