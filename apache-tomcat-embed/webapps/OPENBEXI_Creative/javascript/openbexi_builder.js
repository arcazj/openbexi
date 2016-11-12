/* This notice must be untouched at all times.

 Copyright (c) 2005-2013 JC Arcaz. All rights reserved.
 OPEN OPENBEXI htmlbuilder library for generating dynanic HTML page and html code source from browsers.
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

var dirty_flag = false;
var current_scroll_top = 0;
var newChildTop = 0;
var newChildLeft = 0;
var divPropertiesTop = "136px";
var divPropertiesLeft = "36px";
var divPropertiesWidth = "0px";
var divPropertiesHeight = "1500px";
var openbexi_object = new Array();
var openbexiPopup_menu = null;
var openbexiExplorer = null;
var openbexiBody = null;
var openbexi_system = new openbexi_system();
var HTMLTemplateObj = null;
var loadingElt = null;
var openbexi_code_version = "5.0 Beta";
var ob_first_update = true;

var ob_sub_menu_editor_current_left = "0px";

var default_ob_menu_height = "750px";
var _ob_menu_widget_w = "600px";
var _ob_menu_widget_h = "500px";
var _ob_menu_widget_x = "200px";
var _ob_menu_widget_y = "400px";

var _ob_menu_CSS_w = "600px";
var _ob_menu_CSS_h = "500px";
var _ob_menu_CSS_x = "300px";
var _ob_menu_CSS_y = "500px";

var _ob_menu_debugging_w = "750px";
var _ob_menu_debugging_h = "400px";
var _ob_menu_debugging_x = "100px";
var _ob_menu_debugging_y = "400px";

var _ob_menu_FileBrowser_w = "600px";
var _ob_menu_FileBrowser_h = "500px";
var _ob_menu_FileBrowser_x = "400px";
var _ob_menu_FileBrowser_y = "600px";

var _ob_menu_PictureBrowser_w = "790px";
var _ob_menu_PictureBrowser_h = "450px";
var _ob_menu_PictureBrowser_x = "100px";
var _ob_menu_PictureBrowser_y = "150px";

var _ob_menu_TemplateBrowser_w = "600px";
var _ob_menu_TemplateBrowser_h = "500px";
var _ob_menu_TemplateBrowser_x = "400px";
var _ob_menu_TemplateBrowser_y = "600px";

var _ob_menu_RequestBrowser_w = "450px";
var _ob_menu_RequestBrowser_h = "450px";
var _ob_menu_RequestBrowser_x = "10px";
var _ob_menu_RequestBrowser_y = "150px";

var _ob_menu_JavascriptBrowser_w = "250px";
var _ob_menu_JavascriptBrowser_h = "840px";
var _ob_menu_JavascriptBrowser_x = "972px";
var _ob_menu_JavascriptBrowser_y = "150px";

var _ob_menu_SQLBrowser_w = "600px";
var _ob_menu_SQLBrowser_h = "500px";
var _ob_menu_SQLBrowser_x = "200px";
var _ob_menu_SQLBrowser_y = "200px";

var _ob_menu_FTPBrowser_w = "600px";
var _ob_menu_FTPBrowser_h = "500px";
var _ob_menu_FTPBrowser_x = "200px";
var _ob_menu_FTPBrowser_y = "200px";

var ob_minimize_menu_list = [];
var ob_maximize_menu_list = [];

var openbexi_mouse_event = [
    ['none'],
    ['onload'],
    ['onclick'],
    ['ondblclick'],
    ['onmouseover'],
    ['onmouseout'],
    ['onmousedown'],
    ['onmouseup'],
    ['onmousemove'],
    ['onChange'],
    ['onValueSelected']
];
var openbexi_grid_mouse_event = [
    ['none'],
    ['oncellclick'],
    ['onload'],
    ['onclick'],
    ['ondblclick'],
    ['onmouseover'],
    ['onmouseout'],
    ['onmousedown'],
    ['onmouseup'],
    ['onmousemove'],
    ['onChange'],
    ['onValueSelected']
];
var openbexi_body_mouse_event = [
    ['none'],
    ['onresize'],
    ['onscroll'],
    ['onunload'],
    ['onload']
];

var ob_menu_pictures = null;
var ob_menu_SQL = null;
var ob_menu_video = null;
var ob_menu_widget = [];
var ob_menu_widget_for_page = [
    ['gallery', 'ob_menu_widget_page', '', 'openbexiNavigator.drop_widget(event,\'page\');', '', 'this.src=\'gif/page_standby_x64.png\';this.title=openbexi_lang(\'Page\');', 'this.src=\'gif/page_x64.png\';', 'Page', 'gif/page_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_box', '', 'openbexiNavigator.drop_widget(event,\'box\');', '', 'this.src=\'gif/box_standby_x64.png\';this.title=openbexi_lang(\'Box\');', 'this.src=\'gif/box_x64.PNG\';', 'Box', 'gif/box_x64.PNG', '64px', '64px'],
    ['gallery', 'ob_menu_widget_link', '', 'openbexiNavigator.drop_widget(event,\'link\');', '', 'this.src=\'gif/link_standby_x64.png\';this.title=openbexi_lang(\'Link\');', 'this.src=\'gif/link_x64.png\';', 'Link', 'gif/link_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_button', '', 'openbexiNavigator.drop_widget(event,\'button\');', '', 'this.src=\'gif/button_standby_x64.png\';this.title=openbexi_lang(\'Button\');', 'this.src=\'gif/button_x64.png\';', 'Button', 'gif/button_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_DOJO_editor', '', 'openbexiNavigator.drop_widget(event,\'text_edit\');', '', 'this.src=\'gif/text_edit_standby_x64.png\';this.title=openbexi_lang(\'DOJO_Editor\');', 'this.src=\'gif/text_edit_x64.png\';', 'Text', 'gif/text_edit_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_image', '', 'openbexiNavigator.browse_picture(\'images\',\'none\',null,\'tree\',true,true);', '', 'this.src=\'gif/image_standby_x64.png\';this.title=openbexi_lang(\'Image\');', 'this.src=\'gif/image_x64.png\';', 'Image', 'gif/image_x64.png', '64px', '64px', "cursor:pointer", ''],
    ['gallery', 'ob_menu_widget_list', '', 'openbexiNavigator.drop_widget(event,\'list\');', '', 'this.src=\'gif/list_standby_x64.png\';this.title=openbexi_lang(\'List\');', 'this.src=\'gif/list_x64.png\';', 'List', 'gif/list_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_tree', '', 'openbexiNavigator.drop_widget(event,\'tree\');', '', 'this.src=\'gif/tree_standby_x64.png\';this.title=openbexi_lang(\'Tree\');', 'this.src=\'gif/tree_x64.png\';', 'Tree', 'gif/tree_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_chartFlow', '', 'openbexiNavigator.drop_widget(event,\'chartFlow\');', '', 'this.src=\'gif/chartFlow_standby_x64.png\';this.title=openbexi_lang(\'Dynamic Flowchart\');', 'this.src=\'gif/chartFlow_x64.png\';', 'Dynamic Flowchart', 'gif/chartFlow_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_form', '', 'openbexiNavigator.drop_widget(event,\'form\');', '', 'this.src=\'gif/form_standby_x64.png\';this.title=openbexi_lang(\'Form\');', 'this.src=\'gif/form_x64.png\';', 'Form', 'gif/form_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_calendar', '', 'openbexiNavigator.drop_widget(event,\'calendar\');', '', 'this.src=\'gif/calendar_standby_x64.png\';this.title=openbexi_lang(\'Calendar\');', 'this.src=\'gif/calendar_x64.png\';', 'Calendar', 'gif/calendar_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_dygraphs', '', 'openbexiNavigator.drop_widget(event,\'dygraphs\');', '', 'this.src=\'gif/dygraphs_x64.png\';this.title=openbexi_lang(\'Dygraphs\');', 'this.src=\'gif/dygraphs_x64.png\';', 'dygraphs', 'gif/dygraphs_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_chartPie', '', 'openbexiNavigator.drop_widget(event,\'chartPie\');', '', 'this.src=\'gif/chartPie_x64.png\';this.title=openbexi_lang(\'ChartPie\');', 'this.src=\'gif/chartPie_x64.png\';', 'ChartPie', 'gif/chartPie_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_chartBar', '', 'openbexiNavigator.drop_widget(event,\'chartBar\');', '', 'this.src=\'gif/chartBar_standby_x64.png\';this.title=openbexi_lang(\'ChartBar\');', 'this.src=\'gif/chartBar_x64.png\';', 'ChartBar', 'gif/chartBar_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_chartLine', '', 'openbexiNavigator.drop_widget(event,\'chartLine\');', '', 'this.src=\'gif/chartLine_standby_x64.png\';this.title=openbexi_lang(\'ChartLine\');', 'this.src=\'gif/chartLine_x64.png\';', 'ChartLine', 'gif/chartLine_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_clock', '', 'openbexiNavigator.drop_widget(event,\'clock\');', '', 'this.src=\'gif/clock_standby_x64.png\';this.title=openbexi_lang(\'Clock\');', 'this.src=\'gif/clock_x64.png\';', 'Clock', 'gif/clock_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_grid', '', 'openbexiNavigator.drop_widget(event,\'grid\');', '', 'this.src=\'gif/grid_standby_x64.png\';this.title=openbexi_lang(\'Grid\');', 'this.src=\'gif/grid_x64.png\';', 'Grid', 'gif/grid_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_gridx', '', 'openbexiNavigator.drop_widget(event,\'gridx\');', '', 'this.src=\'gif/gridX_standby_x64.png\';this.title=openbexi_lang(\'GridX\');', 'this.src=\'gif/gridX_x64.png\';', 'GridX', 'gif/gridX_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_fisheye', '', 'openbexiNavigator.drop_widget(event,\'fisheye\');', '', 'this.src=\'gif/fisheye_standby_x64.png\';this.title=openbexi_lang(\'Fisheye\');', 'this.src=\'gif/fisheye_x64.png\';', 'Fisheye', 'gif/fisheye_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_simile', '', 'openbexiNavigator.drop_widget(event,\'simile\');', '', 'this.src=\'gif/simile_standby_x64.png\';this.title=openbexi_lang(\'Simile\');', 'this.src=\'gif/simile_x64.png\';', 'Simile', 'gif/simile_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_copyright', '', 'openbexiNavigator.drop_widget(event,\'copyright\');', '', 'this.src=\'gif/copyright_standby_x64.png\';this.title=openbexi_lang(\'Copyright\');', 'this.src=\'gif/copyright_x64.png\';', 'Copyright', 'gif/copyright_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_video', '', 'openbexiNavigator.browse_picture(\'video\',\'none\',null,\'tree\',true,true);', '', 'this.src=\'gif/video_standby_x64.png\';this.title=openbexi_lang(\'Video\');', 'this.src=\'gif/video_x64.png\';', 'Video', 'gif/video_x64.png', '64px', '64px', "cursor:pointer", '']
];
var ob_menu_widget_for_template = [
    ['gallery', 'ob_menu_widget_relative_page', '', 'openbexiNavigator.drop_widget(event,\'relative_page\');', '', 'this.src=\'gif/relative_page_standby_x64.png\';this.title=openbexi_lang(\'Relative_page\');', 'this.src=\'gif/relative_page_x64.png\';', 'Relative page', 'gif/relative_page_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_page', '', 'openbexiNavigator.drop_widget(event,\'page\');', '', 'this.src=\'gif/page_standby_x64.png\';this.title=openbexi_lang(\'Page\');', 'this.src=\'gif/page_x64.png\';', 'Page', 'gif/page_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_box', '', 'openbexiNavigator.drop_widget(event,\'box\');', '', 'this.src=\'gif/box_standby_x64.png\';this.title=openbexi_lang(\'Box\');', 'this.src=\'gif/box_x64.PNG\';', 'Box', 'gif/box_x64.PNG', '64px', '64px'],
    ['gallery', 'ob_menu_widget_link', '', 'openbexiNavigator.drop_widget(event,\'link\');', '', 'this.src=\'gif/link_standby_x64.png\';this.title=openbexi_lang(\'Link\');', 'this.src=\'gif/link_x64.png\';', 'Link', 'gif/link_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_button', '', 'openbexiNavigator.drop_widget(event,\'button\');', '', 'this.src=\'gif/button_standby_x64.png\';this.title=openbexi_lang(\'Button\');', 'this.src=\'gif/button_x64.png\';', 'Button', 'gif/button_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_DOJO_editor', '', 'openbexiNavigator.drop_widget(event,\'text_edit\');', '', 'this.src=\'gif/text_edit_standby_x64.png\';this.title=openbexi_lang(\'DOJO_Editor\');', 'this.src=\'gif/text_edit_x64.png\';', 'Text', 'gif/text_edit_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_image', '', 'openbexiNavigator.browse_picture(\'images\',\'none\',null,\'tree\',true,true);', '', 'this.src=\'gif/image_standby_x64.png\';this.title=openbexi_lang(\'Image\');', 'this.src=\'gif/image_x64.png\';', 'Image', 'gif/image_x64.png', '64px', '64px', "cursor:pointer", ''],
    ['gallery', 'ob_menu_widget_list', '', 'openbexiNavigator.drop_widget(event,\'list\');', '', 'this.src=\'gif/list_standby_x64.png\';this.title=openbexi_lang(\'List\');', 'this.src=\'gif/list_x64.png\';', 'List', 'gif/list_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_tree', '', 'openbexiNavigator.drop_widget(event,\'tree\');', '', 'this.src=\'gif/tree_standby_x64.png\';this.title=openbexi_lang(\'Tree\');', 'this.src=\'gif/tree_x64.png\';', 'Tree', 'gif/tree_x64.png', '64px', '64px'],
    //['gallery', 'ob_menu_widget_chartFlow', '', 'openbexiNavigator.drop_widget(event,\'chartFlow\');', '', 'this.src=\'gif/chartFlow_standby_x64.png\';this.title=openbexi_lang(\'Dynamic Flowchart\');', 'this.src=\'gif/chartFlow_x64.png\';', 'Dynamic Flowchart', 'gif/chartFlow_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_calendar', '', 'openbexiNavigator.drop_widget(event,\'calendar\');', '', 'this.src=\'gif/calendar_standby_x64.png\';this.title=openbexi_lang(\'Calendar\');', 'this.src=\'gif/calendar_x64.png\';', 'Calendar', 'gif/calendar_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_dygraphs', '', 'openbexiNavigator.drop_widget(event,\'dygraphs\');', '', 'this.src=\'gif/dygraphs_x64.png\';this.title=openbexi_lang(\'Dygraphs\');', 'this.src=\'gif/dygraphs_x64.png\';', 'dygraphs', 'gif/dygraphs_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_chartPie', '', 'openbexiNavigator.drop_widget(event,\'chartPie\');', '', 'this.src=\'gif/chartPie_x64.png\';this.title=openbexi_lang(\'ChartPie\');', 'this.src=\'gif/chartPie_x64.png\';', 'ChartPie', 'gif/chartPie_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_chartBar', '', 'openbexiNavigator.drop_widget(event,\'chartBar\');', '', 'this.src=\'gif/chartBar_standby_x64.png\';this.title=openbexi_lang(\'ChartBar\');', 'this.src=\'gif/chartBar_x64.png\';', 'ChartBar', 'gif/chartBar_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_chartLine', '', 'openbexiNavigator.drop_widget(event,\'chartLine\');', '', 'this.src=\'gif/chartLine_standby_x64.png\';this.title=openbexi_lang(\'ChartLine\');', 'this.src=\'gif/chartLine_x64.png\';', 'ChartLine', 'gif/chartLine_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_clock', '', 'openbexiNavigator.drop_widget(event,\'clock\');', '', 'this.src=\'gif/clock_standby_x64.png\';this.title=openbexi_lang(\'Clock\');', 'this.src=\'gif/clock_x64.png\';', 'Clock', 'gif/clock_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_fisheye', '', 'openbexiNavigator.drop_widget(event,\'fisheye\');', '', 'this.src=\'gif/fisheye_standby_x64.png\';this.title=openbexi_lang(\'Fisheye\');', 'this.src=\'gif/fisheye_x64.png\';', 'Fisheye', 'gif/fisheye_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_simile', '', 'openbexiNavigator.drop_widget(event,\'simile\');', '', 'this.src=\'gif/simile_standby_x64.png\';this.title=openbexi_lang(\'Simile\');', 'this.src=\'gif/simile_x64.png\';', 'Simile', 'gif/simile_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_copyright', '', 'openbexiNavigator.drop_widget(event,\'copyright\');', '', 'this.src=\'gif/copyright_standby_x64.png\';this.title=openbexi_lang(\'Copyright\');', 'this.src=\'gif/copyright_x64.png\';', 'Copyright', 'gif/copyright_x64.png', '64px', '64px'],
    ['gallery', 'ob_menu_widget_video', '', 'openbexiNavigator.browse_picture(\'video\',\'none\',null,\'tree\',true,true);', '', 'this.src=\'gif/video_standby_x64.png\';this.title=openbexi_lang(\'Video\');', 'this.src=\'gif/video_x64.png\';', 'Video', 'gif/video_x64.png', '64px', '64px', "cursor:pointer", '']
];


var ob_save_project_page_name2 = [
    ['tree', 'ob_tree', '', '', '', '', '', '', '', '', '', '', '']
];
var ob_create_project = [
    ['menu_RequestBrowser', 'ob_menu_RequestBrowser', '', '', '', '', '', 'Create project', '', '500px', '300px', '', ''],
    ['window_left', 'ob_menu_RequestBrowser_sub_left', '', '', '', '', '', '', '', '', '', 'overflow: hidden;position:absolute;width:0%;', ''],
    ['end_window_left', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_body', 'ob_menu_RequestBrowser_sub', '', '', '', '', '', '', '', '', '', 'overflow: auto;position:absolute;width:100%;', ''],
    ['form', 'ob_form', '', '', '', '', '', '', '', '', '', 'position:absolute;left:0px;', ''],
    ['fieldset', 'ob_fieldset', '', '', '', '', '', '', '', '', '', '', ''],
    ['legend', '', '', '', '', '', '', 'Create a new project', '', '', '', '', ''],
    ['input', 'bexicontext_project_name', 'this.style.background=\'red\';', '', '', '', '', 'New project name', '', '', '', 'background-image: url(\"gif/fading_background_2_red.png\");', '1'],
    ['end_fieldset', 'ob_fieldset', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_form', '', '', '', '', '', '', ' name', '', '', '', '', ''],
    ['end_window_body', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_foot', 'ob_menu_RequestBrowser_sub_foot', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow: hidden;position:absolute;height:40%', ''],
    ['set_button', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['ok', '', 'onclick="openbexiNavigator.create_new_project();openbexiNavigator.window_factory(event,\'ob_menu_RequestBrowser\',null,\'hidden\');"', '', 'onmousedown="src=\'gif/ob_ok_down.png\';"', 'onmouseover="src=\'gif/ob_ok_on.png\';"', 'onmouseout="src=\'gif/ob_ok.png\';"', 'Save', '', '', '', '', ''],
    ['cancel', '', 'onclick="openbexiNavigator.window_factory(event,\'ob_menu_RequestBrowser\',null,\'hidden\');"', '', 'onmousedown="src=\'gif/ob_cancel_down.png\';"', 'onmouseover="src=\'gif/ob_cancel_on.png\';"', 'onmouseout="src=\'gif/ob_cancel.png\';"', 'Cancel', '', '', '', '', ''],
    ['endset_button', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_window_foot', '', '', '', '', '', '', '', '', '', '', '', '']
];
var ob_save_project_page_name = [
    ['menu_RequestBrowser', 'ob_menu_RequestBrowser', '', '', '', '', '', 'Save project', '', '760px', '450px', '', ''],
    ['window_left', 'ob_menu_RequestBrowser_sub_left', '', '', '', '', '', '', '', '', '', 'overflow: auto;position:absolute;width:35%;', ''],
    ['tree', 'ob_menu_RequestBrowser_sub_left', '', '', '', '', '', 'Save', '', '', '', '', ''],
    ['end_window_left', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_body', 'ob_menu_RequestBrowser_sub', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow: auto;position:absolute;width:95%;', ''],
    ['form', 'ob_form', '', '', '', '', '', '', '', '', '', 'position:absolute;left:0px;', ''],
    ['fieldset', 'ob_fieldset', '', '', '', '', '', '', '', '', '', '', ''],
    ['legend', '', '', '', '', '', '', 'Save project web page', '', '', '', '', ''],
    ['input', 'bexicontext_project_name', '', '', '', '', '', 'Project name', '', '', '', '', '1'],
    ['input', 'bexicontext_page_name', '', '', '', '', '', 'Page name', '', '', '', '', '1'],
    ['sep', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_fieldset', 'ob_fieldset', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_form', '', '', '', '', '', '', ' name', '', '', '', '', ''],
    ['end_window_body', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_foot', 'ob_menu_RequestBrowser_sub_foot', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow: hidden;position:absolute;height:25%', ''],
    ['set_button', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['ok', '', 'onclick="openbexiNavigator.save_project(event,ob_create_project);"', '', 'onmousedown="src=\'gif/ob_ok_down.png\';"', 'onmouseover="src=\'gif/ob_ok_on.png\';"', 'onmouseout="src=\'gif/ob_ok.png\';"', 'Save', '', '', '', '', ''],
    ['cancel', '', 'onclick="openbexiNavigator.window_factory(event,\'ob_menu_RequestBrowser\',null,\'hidden\');"', '', 'onmousedown="src=\'gif/ob_cancel_down.png\';"', 'onmouseover="src=\'gif/ob_cancel_on.png\';"', 'onmouseout="src=\'gif/ob_cancel.png\';"', 'Cancel', '', '', '', '', ''],
    ['endset_button', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_window_foot', '', '', '', '', '', '', '', '', '', '', '', '']
];
var ob_save_as_template = [
    ['menu_RequestBrowser', 'ob_menu_RequestBrowser', '', '', '', '', '', 'Save As Template', '', '490px', '370px', '', ''],
    ['window_left', 'ob_menu_RequestBrowser_sub_left', '', '', '', '', '', '', '', '', '', 'overflow: auto;position:absolute;width:0%;', ''],
    ['end_window_left', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_body', 'ob_menu_RequestBrowser_sub', '', '', '', '', '', '', '', '', '', 'overflow: auto;position:absolute;width:100%;', ''],
    ['form', 'ob_form', '', '', '', '', '', '', '', '', '', '', ''],
    ['fieldset', 'ob_fieldset', '', '', '', '', '', '', '', '', '', '', ''],
    ['legend', '', '', '', '', '', '', 'Save as template', '', '', '', '', ''],
    ['input', 'ob_theme_template', 'this.style.background=\'red\';', '', '', '', '', 'Theme', '', '', '', 'background-image: url(\"gif/fading_background_2_red.png\");', '1'],
    ['input', 'ob_template_name', 'this.style.background=\'red\';', '', '', '', '', 'Template name', '', '', '', 'background-image: url(\"gif/fading_background_2_red.png\");', '1'],
    ['sep', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_fieldset', 'ob_fieldset', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_form', '', '', '', '', '', '', ' name', '', '', '', '', ''],
    ['end_window_body', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_foot', 'ob_menu_RequestBrowser_sub_foot', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow: hidden;position:absolute;height:35%', ''],
    ['set_button', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['ok', '', 'onclick="openbexiNavigator.SaveAsTemplate();"', '', 'onmousedown="src=\'gif/ob_ok_down.png\';"', 'onmouseover="src=\'gif/ob_ok_on.png\';"', 'onmouseout="src=\'gif/ob_ok.png\';"', 'Save', '', '', '', '', ''],
    ['cancel', '', 'onclick="openbexiNavigator.window_factory(event,\'ob_menu_RequestBrowser\',null,\'hidden\');"', '', 'onmousedown="src=\'gif/ob_cancel_down.png\';"', 'onmouseover="src=\'gif/ob_cancel_on.png\';"', 'onmouseout="src=\'gif/ob_cancel.png\';"', 'Cancel', '', '', '', '', ''],
    ['endset_button', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_window_foot', '', '', '', '', '', '', '', '', '', '', '', '']
];
var ob_publish_page = [
    ['menu_RequestBrowser', 'ob_menu_RequestBrowser', '', '', '', '', '', 'Publish web page', '', '840px', '540px', '', ''],
    ['window_left', 'ob_menu_RequestBrowser_sub_left', '', '', '', '', '', '', '', '', '', 'overflow: auto;position:absolute;width:35%;', ''],
    ['ftp_tree', 'ob_menu_RequestBrowser_sub_left', '', '', '', '', '', 'Save', '', '', '', '', ''],
    ['end_window_left', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_body', 'ob_menu_RequestBrowser_sub', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow: auto;position:absolute;width:95%;', ''],
    ['form', 'ob_form', '', '', '', '', '', '', '', '', '', 'position:absolute;left:0px;', ''],
    ['fieldset', 'ob_fieldset', '', '', '', '', '', '', '', '', '', '', ''],
    ['legend', '', '', '', '', '', '', 'Publish web page to:', '', '', '', '', ''],
    ['input_website', 'bexicontext_website', 'onclick="openbexiNavigator.removeSftpConnection(null)"', '', 'onKeyPress="openbexiNavigator.saveSftp()"', '', '', 'Web site name', '', '', '', '', '1'],
    ['input', 'bexicontext_hostname', '', '', 'onKeyPress="openbexiNavigator.saveSftp(event,\'bexicontext_hostname\')"', '', '', 'Host name (Ip)', '', '', '', '', '1'],
    ['input', 'bexicontext_username', '', '', 'onKeyPress="openbexiNavigator.saveSftp(event,\'bexicontext_username\')"', '', '', 'User name', '', '', '', '', '1'],
    ['input_passwd', 'bexicontext_passwd', '', '', 'onKeyPress="openbexiNavigator.saveSftp(event,\'bexicontext_passwd\')"', '', '', 'Password', '', '', '', '', '1'],
    ['input', 'bexicontext_PublicKey', '', '', 'onKeyPress="openbexiNavigator.saveSftp(event,\'bexicontext_PublicKey\')"', '', '', 'Public key', '', '', '', '', '1'],
    ['input', 'bexicontext_SocketTin', '', '', 'onKeyPress="openbexiNavigator.saveSftp(event,\'bexicontext_SocketTin\')"', '', '', 'Socket tin', '', '', '', '', '1'],
    ['input', 'bexicontext_path', '', '', 'onKeyPress="openbexiNavigator.saveSftp(event,\'bexicontext_path\')"', '', '', 'Path', '', '', '', '', '1'],
    ['input_hidden', 'bexicontext_connection', '', '', '"', '', '', 'Connection', '', '', '', '', '1'],
    ['end_fieldset', 'ob_fieldset', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_form', '', '', '', '', '', '', ' name', '', '', '', '', ''],
    ['end_window_body', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_foot', 'ob_menu_RequestBrowser_sub_foot', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow: visible;position:absolute;width:100%;height:25%', ''],
    ['set_button', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['ok', '', 'onclick="openbexiNavigator.publish(\'save_before_publishing\');"', '', 'onmousedown="src=\'gif/ob_ok_down.png\';"', 'onmouseover="src=\'gif/ob_ok_on.png\';"', 'onmouseout="src=\'gif/ob_ok.png\';"', 'Publish web page', '', '', '', '', ''],
    ['publish_project', '', 'onclick="openbexiNavigator.publish(\'save_project_before_publishing\');"', '', 'onmousedown="src=\'gif/foldernet_down.png\';"', 'onmouseover="src=\'gif/foldernet_on.png\';"', 'onmouseout="src=\'gif/foldernet.png\';"', 'Publish project', '', '', '', '', ''],
    ['cancel', '', 'onclick="openbexiNavigator.window_factory(event,\'ob_menu_RequestBrowser\',null,\'hidden\');"', '', 'onmousedown="src=\'gif/ob_cancel_down.png\';"', 'onmouseover="src=\'gif/ob_cancel_on.png\';"', 'onmouseout="src=\'gif/ob_cancel.png\';"', 'Cancel', '', '', '', '', ''],
    ['endset_button', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_window_foot', '', '', '', '', '', '', '', '', '', '', '', '']
];
var ob_SQL_database = [
    ['menu_RequestBrowser', 'ob_menu_RequestBrowser', '', '', '', '', '', 'SQL database', '', '820px', '500px', '', ''],
    ['window_left', 'ob_menu_RequestBrowser_sub_left', '', '', '', '', '', '', '', '', '', 'overflow: auto;position:absolute;width:35%;', ''],
    ['sql_tree', 'ob_menu_RequestBrowser_sub_left', '', '', '', '', '', 'SQL', '', '', '', '', ''],
    ['end_window_left', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_body', 'ob_menu_RequestBrowser_sub', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow: auto;position:absolute;width:95%;', ''],
    ['form', 'ob_form', '', '', '', '', '', '', '', '', '', 'position:absolute;left:0px;', ''],
    ['fieldset', 'ob_fieldset', '', '', '', '', '', '', '', '', '', '', ''],
    ['legend', '', '', '', '', '', '', 'Connect to SQL database:', '', '', '', '', ''],
    ['input_database', 'bexicontext_database', 'onclick="openbexiNavigator.removeDatabase(null)"', '', 'onKeyPress="openbexiNavigator.saveDatabase(event,\'bexicontext_database\')"', '', '', 'Database name', '', '', '', '', '1'],
    ['input', 'bexicontext_url', '', '', 'onKeyPress="openbexiNavigator.saveDatabase(event,\'bexicontext_url\')"', '', '', 'URL', '', '', '', '', '1'],
    ['input', 'bexicontext_username', '', '', 'onKeyPress="openbexiNavigator.saveDatabase(event,\'bexicontext_username\')"', '', '', 'User name', '', '', '', '', '1'],
    ['input_passwd', 'bexicontext_passwd', '', '', 'onKeyPress="openbexiNavigator.saveDatabase(event,\'bexicontext_passwd\')"', '', '', 'Password', '', '', '', '', '1'],
    ['input', 'bexicontext_driver', '', '', 'onKeyPress="openbexiNavigator.saveDatabase(event,\'exicontext_driver\')"', '', '', 'Driver', '', '', '', '', '1'],
    ['input_hidden', 'bexicontext_connection', '', '', '"', '', '', 'Connection', '', '', '', '', '1'],
    ['sep', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_fieldset', 'ob_fieldset', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_form', '', '', '', '', '', '', ' name', '', '', '', '', ''],
    ['end_window_body', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['window_foot', 'ob_menu_RequestBrowser_sub_foot', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow: visible;position:absolute;width:100%;height:25%', ''],
    ['set_button', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['ok', '', 'onclick="openbexiNavigator.saveDatabase(event,null)"', '', 'onmousedown="src=\'gif/ob_ok_down.png\';"', 'onmouseover="src=\'gif/ob_ok_on.png\';"', 'onmouseout="src=\'gif/ob_ok.png\';"', 'Save', '', '', '', '', ''],
    ['cancel', '', 'onclick="openbexiNavigator.window_factory(event,\'ob_menu_RequestBrowser\',null,\'hidden\');"', '', 'onmousedown="src=\'gif/ob_cancel_down.png\';"', 'onmouseover="src=\'gif/ob_cancel_on.png\';"', 'onmouseout="src=\'gif/ob_cancel.png\';"', 'Cancel', '', '', '', '', ''],
    ['endset_button', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_window_foot', '', '', '', '', '', '', '', '', '', '', '', '']
];
var ob_delete_projects = [
    ['menu_RequestBrowser', 'ob_menu_RequestBrowser', '', '', '', '', '', 'Delete projects - Web pages', '', '780px', '420px', '', ''],
    ['window_left', 'ob_menu_RequestBrowser_sub_left', '', '', '', '', '', '', '', '', '', 'overflow: auto;position:absolute;width:35%;', ''],
    ['tree', 'ob_menu_RequestBrowser_sub_left', '', '', '', '', '', 'Delete', '', '', '', '', ''],
    ['end_window_left', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_body', 'ob_menu_RequestBrowser_sub', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow: auto;position:absolute;width:95%;', ''],
    ['form', 'ob_form', '', '', '', '', '', '', '', '', '', 'position:absolute;left:0px;', ''],
    ['fieldset', 'ob_fieldset', '', '', '', '', '', '', '', '', '', '', ''],
    ['legend', '', '', '', '', '', '', 'Delete selected projects or selected web pages ...', '', '', '', '', ''],
    ['input', 'bexicontext_project_name', '', '', '', '', '', 'Project name', '', '', '', '', '1'],
    ['input', 'bexicontext_page_name', '', '', '', '', '', 'Page name', '', '', '', '', '1'],
    ['sep', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_fieldset', 'ob_fieldset', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_form', '', '', '', '', '', '', ' name', '', '', '', '', ''],
    ['end_window_body', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_foot', 'ob_menu_RequestBrowser_sub_foot', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow: hidden;position:absolute;height:30%', ''],
    ['set_button', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['ok', '', 'onclick="openbexiNavigator.removeWebPages(event);"', '', 'onmousedown="src=\'gif/ob_ok_down.png\';"', 'onmouseover="src=\'gif/ob_ok_on.png\';"', 'onmouseout="src=\'gif/ob_ok.png\';"', 'Remove web page', '', '', '', '', ''],
    ['remove_project', '', 'onclick="openbexiNavigator.removeProject(event);"', '', 'onmousedown="src=\'gif/foldernet_down.png\';"', 'onmouseover="src=\'gif/foldernet_on.png\';"', 'onmouseout="src=\'gif/foldernet.png\';"', 'Remove project', '', '', '', '', ''],
    ['cancel', '', 'onclick="openbexiNavigator.window_factory(event,\'ob_menu_RequestBrowser\',null,\'hidden\');"', '', 'onmousedown="src=\'gif/ob_cancel_down.png\';"', 'onmouseover="src=\'gif/ob_cancel_on.png\';"', 'onmouseout="src=\'gif/ob_cancel.png\';"', 'Cancel', '', '', '', '', ''],
    ['endset_button', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_window_foot', '', '', '', '', '', '', '', '', '', '', '', '']
];
var ob_body_wizard = [
    ['menu_RequestBrowser', 'ob_menu_RequestBrowser', '', '', '', '', '', 'Wizard - Help', '', '550px', '630px', '', ''],
    ['window_left', 'ob_menu_RequestBrowser_sub_left', '', '', '', '', '', '', '', '', '', 'overflow: auto;position:absolute;width:0%;', ''],
    ['end_window_left', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_body', 'ob_menu_RequestBrowser_sub', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow: auto;position:absolute;width:100%;', ''],
    ['form', 'ob_form', '', '', '', '', '', '', '', '', '', '', ''],
    ['fieldset', 'ob_fieldset', '', '', '', '', '', '', '', '', '', 'background:url(gif/fading_background_11.png)', ''],
    ['legend', '', '', '', '', '', '', 'Wizard assistance', '', '', '', '', ''],
    ['message', 'bexicontext_open_project', 'onclick="openbexiNavigator.window_factory(event,\'ob_menu_FileBrowser\',null,\'minimize\');"', '', '', '', '', 'Open_project', 'gif/ob_open_project_x64.png', '', '', '', '1'],
    ['message', 'bexicontext_new_project', 'onclick="openbexiNavigator.window_factory(null, \'ob_menu_RequestBrowser\', ob_create_project, \'maximize\');"', '', '', '', '', 'Open_new_project', 'gif/open_new_project_x64.png', '', '', '', '1'],
    ['message', 'bexicontext_go_project', 'onclick="openbexiNavigator.go_to_the_last_webPage(event);"', '', '', '', '', 'Open_last_web_page', 'gif/ob_go_x64.png', '', '', '', '1'],
    ['end_fieldset', 'ob_fieldset', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_form', '', '', '', '', '', '', ' name', '', '', '', '', ''],
    ['form', 'ob_form', '', '', '', '', '', '', '', '', '', '', ''],
    ['fieldset', 'ob_fieldset', '', '', '', '', '', '', '', '', '', 'background:url(gif/fading_background_18.png)', ''],
    ['message', 'bexicontext_open_template', 'onclick="openbexiNavigator.window_factory(event,\'ob_menu_CSS\',null,\'minimize\');"', '', '', '', '', 'Open_template', 'gif/ob_template_x64.png', '', '', '', '1'],
    ['end_fieldset', 'ob_fieldset', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_form', '', '', '', '', '', '', ' name', '', '', '', '', ''],

    ['form', 'ob_form', '', '', '', '', '', '', '', '', '', '', ''],
    ['fieldset', 'ob_fieldset', '', '', '', '', '', '', '', '', '', 'background:url(gif/fading_background_50x1200.png)', ''],
    ['legend', '', '', '', '', '', '', 'SaveAsTemplate ...', '', '', '', '', ''],
    ['message', 'bexicontext_open_project', 'onclick="openbexiNavigator.window_factory(event,\'ob_menu_CSS\',null,\'minimize\');openbexiNavigator.window_factory(null, \'ob_menu_RequestBrowser\', ob_save_as_template, \'maximize\');"', '', '', '', '', 'Save current page as template', 'gif/ob_template_x64.png', '', '', '', '1'],
    ['end_fieldset', 'ob_fieldset', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_form', '', '', '', '', '', '', ' name', '', '', '', '', ''],
    ['end_window_body', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_foot', 'ob_menu_RequestBrowser_sub_foot', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow: hidden;position:absolute;height:0%', ''],
    ['end_window_foot', '', '', '', '', '', '', '', '', '', '', '', '']
];

var ob_menu_CSS = [];
//var ob_menu_CSS = [
//['tree','ob_CSS_tree','','','','','','','','','','',''],
//];
var ob_menu_debugging = [];
var ob_menu_FileBrowser = [];
var ob_menu_PictureBrowser = [];
var ob_menu_TemplateBrowser = [];
var ob_menu_RequestBrowser = [];
var ob_menu_JavascriptBrowser = [];
var ob_menu_SQLBrowser = [];
var ob_menu_FTPBrowser = [];
var openbexi_debugging = 1;
var openbexi_debugging_boundary = 200;
var openbexi_debugging_text = "";

function __openbexi_debugC(f, text) {
    try {
        if (!ob_debug_openbexi || document.getElementById("ob_menu_debugging") == null) return;
        if (document.getElementById("ob_menu_debugging").style.visibility == "hidden") return;
        if (openbexi_debugging > openbexi_debugging_boundary) openbexiNavigator.clear_debugger();
        openbexi_debugging_text = (openbexi_debugging - 1) + " - " + f + ":" + text + "\n";
        if (ob_menu_debugging_exception && text.match("Exception:")) {
            openbexi_debugging++;
            document.getElementById("ob_menu_debugging").innerHTML += "<div style='color:#990099" + ";position:absolute;overflow:visible;top:" + (openbexi_debugging * 20) + "px;left:5px;width:100%;height:20px'><img src='gif/exception_x16.png' ><b>" + " " + openbexi_debugging_text + "</b></div>";
        } else if (ob_menu_debugging_error && text.match("Error:")) {
            openbexi_debugging++;
            document.getElementById("ob_menu_debugging").innerHTML += "<div style='color:red" + ";position:absolute;overflow:visible;top:" + (openbexi_debugging * 20) + "px;left:5px;width:100%;height:20px'><img src='gif/error_x16.png' ><b>" + " " + openbexi_debugging_text + "</b></div>";
        } else if (ob_menu_debugging_warning && text.match("Warning:")) {
            openbexi_debugging++;
            document.getElementById("ob_menu_debugging").innerHTML += "<div style='color:#FF6633" + ";position:absolute;overflow:visible;top:" + (openbexi_debugging * 20) + "px;left:5px;width:100%;height:20px'><img src='gif/warning_x16.png' ><b>" + " " + openbexi_debugging_text + "</b></div>";
        } else if (ob_menu_debugging_data && text.match("Data:")) {
            openbexi_debugging++;
            document.getElementById("ob_menu_debugging").innerHTML += "<div style='color:black ;position:absolute;overflow:visible;top:" + (openbexi_debugging * 20) + "px;left:5px;width:100%;height:20px'><img src='gif/data_x16.png' ><b>" + " " + openbexi_debugging_text + "</b></div>";
        } else if (ob_menu_debugging_event && text.match("Event:")) {
            openbexi_debugging++;
            document.getElementById("ob_menu_debugging").innerHTML += "<div style='color:black ;position:absolute;overflow:visible;top:" + (openbexi_debugging * 20) + "px;left:5px;width:100%;height:20px'><img src='gif/event_x16.png' ><b>" + " " + openbexi_debugging_text + "</b></div>";
        } else if (ob_menu_debugging_function && text.match("Function:")) {
            openbexi_debugging++;
            document.getElementById("ob_menu_debugging").innerHTML += "<div style='color:#B89F3D ;position:absolute;overflow:visible;top:" + (openbexi_debugging * 20) + "px;left:5px;width:100%;height:20px'><img src='gif/function_x16.png' ><b>" + " " + openbexi_debugging_text + "</b></div>";
        } else if (ob_menu_debugging_classe && text.match("Classe:")) {
            openbexi_debugging++;
            document.getElementById("ob_menu_debugging").innerHTML += "<div style='color:#669900 ;position:absolute;overflow:visible;top:" + (openbexi_debugging * 20) + "px;left:5px;width:100%;height:20px'><img src='gif/classe_x16.png' ><b>" + " " + openbexi_debugging_text + "</b></div>";
        } else if (ob_menu_debugging_html && text.match("Html:")) {
            document.getElementById("ob_menu_debugging").innerHTML = "";
            document.getElementById("ob_menu_debugging").innerHTML += "<form><textarea style='position:absolute;overflow:auto;top:40px;width:100%;height:100%'>" + text.replace("Html:", "") + "</textarea></form>";
        } else {
            if (ob_menu_debugging_info) {
                openbexi_debugging++;
                document.getElementById("ob_menu_debugging").innerHTML += "<div style='color:black;position:absolute;overflow:visible;top:" + (openbexi_debugging * 20) + "px;left:5px;width:100%;height:20px'> <img src='gif/info_x16.png' >" + ". " + openbexi_debugging_text + "</div>";
            }
        }
    } catch (e) {
    }
}
;
var _ob_dhtml_debug_src = "";
function ob_set_debugger_on_log(event, div, type) {
    if (div.src.match(RegExp("_standby_"))) {
        div.src = "gif/" + type + "_standby_on_x32.png";
        openbexiNavigator.top_frame_message("Open " + type + " log", "40px");
    }
    else {
        div.src = "gif/" + type + "_on_x32.png";
        openbexiNavigator.top_frame_message("Close " + type + " log", "40px");
    }
}
;
function ob_set_debugger_out_log(event, div, type) {
    if (div.src.match(RegExp("_standby_")))
        div.src = "gif/" + type + "_standby_x32.png";
    else
        div.src = "gif/" + type + "_x32.png";
}
;
function ob_set_debugger_down_log(event, div, type) {
    if (div.src.match(RegExp('_standby_')))
        div.src = "gif/" + type + "_standby_down_x32.png";
    else
        div.src = "gif/" + type + "_down_x32.png";
}
;
function ob_set_debugger_log(event, div) {
    openbexi_stopEventPropagation(event);
    if (div.src.match(RegExp("exception_standby"))) {
        ob_menu_debugging_exception = true;
        div.src = "gif/exception_x32.png";
    } else if (div.src.match(RegExp("exception_"))) {
        ob_menu_debugging_exception = false;
        div.src = "gif/exception_standby_x32.png";
    } else if (div.src.match(RegExp("error_standby_"))) {
        ob_menu_debugging_error = true;
        div.src = "gif/error_x32.png";
    } else if (div.src.match(RegExp("error_"))) {
        ob_menu_debugging_error = false;
        div.src = "gif/error_standby_x32.png";
    } else if (div.src.match(RegExp("warning_standby_"))) {
        ob_menu_debugging_warning = true;
        div.src = "gif/warning_x32.png";
    } else if (div.src.match(RegExp("warning_"))) {
        ob_menu_debugging_warning = false;
        div.src = "gif/warning_standby_x32.png";
    } else if (div.src.match(RegExp("classe_standby_"))) {
        ob_menu_debugging_classe = true;
        div.src = "gif/classe_x32.png";
    } else if (div.src.match(RegExp("classe_"))) {
        ob_menu_debugging_classe = false;
        div.src = "gif/classe_standby_";
    } else if (div.src.match(RegExp("function_standby_"))) {
        ob_menu_debugging_function = true;
        div.src = "gif/function_x32.png";
    } else if (div.src.match(RegExp("function_"))) {
        ob_menu_debugging_function = false;
        div.src = "gif/function_standby_x32.png";
    } else if (div.src.match(RegExp("data_standby_"))) {
        ob_menu_debugging_data = true;
        div.src = "gif/data_x32.png";
    } else if (div.src.match(RegExp("data_"))) {
        ob_menu_debugging_data = false;
        div.src = "gif/data_standby_x32.png";
    } else if (div.src.match(RegExp("event_standby_"))) {
        ob_menu_debugging_event = true;
        div.src = "gif/event_x32.png";
    } else if (div.src.match(RegExp("event_"))) {
        ob_menu_debugging_event = false;
        div.src = "gif/event_standby_x32.png";
    } else if (div.src.match(RegExp("info_standby"))) {
        ob_menu_debugging_info = true;
        div.src = "gif/info_x32.png";
    } else {
        ob_menu_debugging_info = false;
        div.src = "gif/info_standby_x32.png";
    }
}
;
function ob_dhtml_debug(function_name) {
    if (!ob_debug_navigator) return;
    var ob_bug = false;
    var src = "";
    for (var i = 0; i < dd.elements.length; i++) {
        var obj = dd.elements[i].id;
        var parent = "null";
        var parent_ddx = 0;
        var parent_ddy = 0;
        var px = 0;
        var py = 0;
        if (dd.elements[obj].parent != null) {
            parent = dd.elements[obj].parent.id;
            parent_ddx = dd.elements[parent].x;
            parent_ddy = dd.elements[parent].y;
            px = parseInt(document.getElementById(parent).style.left);
            py = parseInt(document.getElementById(parent).style.top);
        }
        var ddx = dd.elements[obj].x;
        var ddy = dd.elements[obj].y;
        var ddw = dd.elements[obj].w;
        var ddh = dd.elements[obj].h;
        var ddz = dd.elements[obj].z;
        var x = parseInt(document.getElementById(obj).style.left);
        var y = parseInt(document.getElementById(obj).style.top);
        var w = parseInt(document.getElementById(obj).style.width);
        var h = parseInt(document.getElementById(obj).style.height);
        var z = parseInt(document.getElementById(obj).style.zIndex);
        if (obj == "ob_menu_widget_link" || obj == "ob_menu_widget") {
            //if (x != parseInt(ddx - parent_ddx) || y != parseInt(ddy - parent_ddy) || w != ddw || h != ddh || z != ddz) {
            src += "parent=" + parent + " top=" + py + "-->" + parent_ddy + " left=" + px + "-->" + parent_ddx + " child=" + obj + " : top= " + y + "--->" + parseInt(ddy - parent_ddy);
            src += " left= " + x + "--->" + parseInt(ddx - parent_ddx);
            src += " w= " + w + "--->" + ddw;
            src += " h= " + h + "--->" + ddh;
            src += " z= " + z + "--->" + ddz + "\n";
            ob_bug = true;
            //}
        }
    }
    if (ob_bug) {
        _ob_dhtml_debug_src = function_name + " :" + src + _ob_dhtml_debug_src;
    }
}
function openbexi_xmldoc() {
    var openbexi_xmlRequest = null;
    var openbexi_xmldoc = null;
    var openbexi_xmlElt;
    if (document.implementation && document.implementation.createDocument) {
        openbexi_xmldoc = document.implementation.createDocument("", "", null);
        openbexi_xmldoc.async = false;
    }
    else if (window.ActiveXObject) {
        openbexi_xmldoc = new ActiveXObject("Microsoft.XMLDOM");
        openbexi_xmldoc.async = false;
    }
    else {
        alert('Your browser can\'t handle the file:' + openbexi_xmldoc);
        return;
    }
    return openbexi_xmldoc;
}
function openbexi_creative_start() {
    var ob_start;
    try {
        var xmlDoc;
        xmlDoc = openbexi_xmldoc();
        xmlDoc.load("ob_start.xml");
        clearTimeout(ob_start);
        window.location = "http://localhost:8282/openbexi.do";
        return null;
    }
    catch (e) {
        //alert("openbexi_loadXMLFile:" + e.message);
    }
    ob_start = setTimeout(function () {
        openbexi_creative_start()
    }, 500);
}
String.prototype.ob_trim = function () {
    return this.replace(/^\s*/, "").replace(/\s*$/, "");
}
var openbexi_tickets = new Array();
function ob_get_ticket_download_time(ticket) {
    try {
        for (var i = openbexi_tickets.length - 1; i >= 0; i--) {
            if (openbexi_tickets[i].id == ticket) {
                // in secondes
                return (new Date().getTime() - parseInt(openbexi_tickets[i].time)) / 1000;
            }
        }
    } catch (e) {
    }
    return 0;
}
function ob_check_tickets(ticket) {
    try {
        for (var i = openbexi_tickets.length - 1; i >= 0; i--) {
            if (openbexi_tickets[i].id == ticket) {
                this.download_time = new Date().getTime() - parseInt(openbexi_tickets[i].time);
                if (openbexi_tickets[i].timeout < this.download_time) {
                    return false;
                }
                return true;
            }
        }
    } catch (e) {
    }
    return true;
}
function ob_update_tickets(ticket) {
    for (var i = openbexi_tickets.length - 1; i >= 0; i--) {
        if (openbexi_tickets[i].id == openbexi_tickets.id) {
            openbexi_tickets[i] = openbexi_tickets;
        }
    }
}
function ob_save_tickets(ticket) {
    var ticketC = ob_get_ticket(ticket.id);
    if (ticketC != null) return;
    var length = openbexi_tickets.length;
    openbexi_tickets[length] = ticket;
}
function ob_get_ticket(name) {
    for (var i = openbexi_tickets.length - 1; i >= 0; i--) {
        if (openbexi_tickets[i].id == name) {
            return openbexi_tickets[i];
        }
    }
    return null;
}
var openbexi_ticket = function (id, timeout, request) {
    this.time = new Date().getTime();
    this.id = id;
    this.timeout = timeout;
    this.request = request;
    this.download_time = 0;
}

function ob_setDirty_flag(status) {
    dirty_flag = status;
}
function ob_getDirty_flag() {
    return dirty_flag;
}
function protectedObject(objName) {
    if (objName == null) return true;
    if (objName == "") return true;
    if (document.getElementById(objName) == null) return true;
    return document.getElementById(objName).getAttribute("CLASSE") == null;

}
function getNewIdChild(label) {
    var childCounter = 0;
    if (label == undefined)label = "div";
    while (document.getElementById(label + childCounter) != null) {
        childCounter = childCounter + 1;
    }
    return childCounter;
}
function getSelectedBexiCount() {
    return openbexi_object.length;
}
function checkRelativePage() {
    for (var i = 0; i < openbexi_object.length; i++) {
        try {
            if (openbexi_object[i].positionning == "relative") return true;
        } catch (e) {
        }
    }
    return false;
}
function getRelativePage() {
    for (var i = 0; i < openbexi_object.length; i++) {
        try {
            if (openbexi_object[i].positionning == "relative") return openbexi_object[i];
        } catch (e) {
        }
    }
    return null;
}
function setRelativePage() {
    if (checkRelativePage()) {
        var bexiObj = getRelativePage();
        bexiObj.my_PickFunc(null);
    }
}
function getNewIdDiv(label) {
    var divCounter = 0;
    if (openbexiNavigator.HTML_pageName == "template.html") {
        if (label == undefined) label = "template_div";
        else
            label = "template_" + label;
    }
    else {
        if (label == undefined) label = "div";
    }
    while (document.getElementById(label + divCounter) != null) {
        divCounter = divCounter + 1;
    }
    return label + divCounter;
}
function getSelectedBexiObjId() {
    if (currentObjNameSelected == null) return "BODY";
    return currentObjNameSelected;
}
function getSelectedBexiObj(objectId) {
    if (objectId == null) {
        if (currentBexiObj_selected == null) return openbexiBody;
        return currentBexiObj_selected;
    }
    if (objectId == "BODY") {
        return openbexiBody;
    }
    var listIdChildren;
    for (var i = 0; i < openbexi_object.length; i++) {
        try {
            listIdChildren = openbexi_object[i].getChildrenId();
            for (var j = 0; j < listIdChildren.length; j++) {
                if (objectId == listIdChildren[j]) {
                    return openbexi_object[i];
                }
            }
        } catch (e) {
            alert("getChildrenId() method not implemented for " + openbexi_object[i].id + "\nopenbexi_builder.getSelectedBexiObj():" + e.name + ". Error message: " + e.message);
        }
    }
    return openbexiBody;
}
function save_openbexi_object(object, reset) {
    var length = openbexi_object.length;
    if (!protectedObject(object.parent)) {
        openbexi_object[length] = object;
        if (reset && object != null && object.div != undefined) openbexi_reset_all_z(object.div, "add");
    }
}
function getLastObjHeight() {
    for (var i = openbexi_object.length - 1; i >= 0; i--) {
        if (openbexi_object[i].id != "BODY") {
            return openbexi_object[i].div.style.height;
        }
    }
    return 0;
}
function getLastObjWidth() {
    for (var i = openbexi_object.length - 1; i >= 0; i--) {
        if (openbexi_object[i].id != "BODY") {
            return openbexi_object[i].div.style.width;
        }
    }
    return 0;
}
function ob_get_openbexi_object_by_zIndex(zIndex) {
    for (var i = 0; i < openbexi_object.length; i++) {
        if (openbexi_object[i].id != "BODY") {
            if (openbexi_object[i].div.style.zIndex == zIndex) {
                //if (openbexi_object[i].div.obzindex == zIndex) {
                return  openbexi_object[i];
            }
        } else
            return  openbexi_object[i];
    }
    openbexi_reset_all_z(openbexi_object[i].div, "+");
    return openbexi_object[i];
}
function ob_sort_openbexi_object() {
    try {
        var new_openbexi_object = new Array(openbexi_object.length);
        for (var j = 0; j < openbexi_object.length; j++) {
            new_openbexi_object[j] = ob_get_openbexi_object_by_zIndex(j);
        }
        openbexi_object = new_openbexi_object;
    } catch (e) {
        __openbexi_debugC("ob_sort_openbexi_object()", "Exception:" + e.message);
        return  openbexi_object;
    }
    return  openbexi_object;
}

function getBexiObjParent(bexiObj) {
    if (bexiObj == null || bexiObj.div == null) return null;
    for (var i = 0; i < openbexi_object.length; i++) {
        if (openbexi_object[i].div != null) {
            for (var j = 0; j < openbexi_object[i].div.childNodes.length; j++) {
                if (openbexi_object[i].div.childNodes[j] != null && openbexi_object[i].div.childNodes[j].id != undefined) {
                    //alert("j="+j+" openbexi_object.length=" + openbexi_object.length + "\nbexiObj.id=" + bexiObj.id + "\nbexiObj.div.id=" + bexiObj.div.id + "\nopenbexi_object[i].id=" + openbexi_object[i].id + "\nopenbexi_object[i].parent=" + openbexi_object[i].parent + "\nopenbexi_object[i].div.childNodes[j].id=" + openbexi_object[i].div.childNodes[j].id + "\ntype=" + openbexi_object[i].type)
                    if (openbexi_object[i].div.childNodes[j].id == bexiObj.div.id) {
                        return  openbexi_object[i];
                    }
                }
            }
        }
    }
    return null;
}
function add_HTMLFisheye(bexiObjParentSelected, x, y) {
    try {
        if (getBrowser() == "ie7") {
            alert("sorry, OPENBEXI fails to load \"dojo fisheyes\" in your current browser with native XMLHTTP enabled.\nTo fix this problem you have to disable native XMLHTTP support in advanced security options in IE7\n \nFrom your browser main toolBar go to Tools- Internet Options - Advanced - and uncheck \"Enable native XMLHTTP support\"\nImportant: Restart your browser ");
            return null;
        }
        if (bexiObjParentSelected == null) {
            lastBexiObj_duplicated = null;
            bexiObjParentSelected = getSelectedBexiObj(null);
        }
        // manage object position inside document
        manageContext(x, y);
        // Create a new page object
        var newIdPage = getNewIdDiv("div");
        var divobj = new openbexi_fisheye(bexiObjParentSelected, null, newIdPage, newChildTop, newChildLeft, "700px", "80px");
        save_openbexi_object(divobj, "true");
        lastBexiObj_duplicated = null;
        if (ob_first_update) {
            ob_first_update = false;
        }
    } catch (e) {
        __openbexi_debugC("add_HTMLFisheye()", "Exception:" + e.message);
    }
    return divobj;
}
function duplicate_HTMLChartFlow(direction) {
    try {
        var divSelected = getSelectedBexiObj(null);
        var bexiObjParentSelected = getSelectedBexiObj(divSelected.parentNodeId);
        var divobj = add_HTMLChartFlow(bexiObjParentSelected, null, null);
        lastBexiObj_duplicated = divobj;
        divobj.changeStyle(divSelected, direction);
        lastBexiObj_duplicated.my_PickFunc();
    } catch (e) {
        __openbexi_debugC("duplicate_HTMLDiv()", "Exception:" + e.message);
    }
}
function add_HTMLChartFlow(bexiObjParentSelected, top, left) {
    try {
        // Create a new page object
        var newChartFlow = getNewIdDiv("div");
        var chartFlow = new openbexi_chartFlow(bexiObjParentSelected, null, newChartFlow, left, top, "80px", "80px", "absolute", "fading_background_12_H.png", true);
        save_openbexi_object(chartFlow, "true");
        lastBexiObj_duplicated = null;
        if (ob_first_update) {
            ob_first_update = false;

        }
        openbexi_save_background(null, chartFlow.div.id, chartFlow.background_path, chartFlow.background_filename, null);
    } catch (e) {
        __openbexi_debugC("add_HTMLChartFlow()", "Exception:" + e.message);
    }
    return chartFlow;
}
function add_HTMLPage(bexiObjParentSelected, top, left, background) {
    try {
        // Create a new page object
        var newIdPage = getNewIdDiv("div");
        var page = new openbexi_page(bexiObjParentSelected, null, newIdPage, left, top, "250px", "400px", "absolute", background);
        save_openbexi_object(page, "true");
        lastBexiObj_duplicated = null;
        if (ob_first_update) {
            ob_first_update = false;

        }
        openbexi_save_background(null, page.div.id, page.background_path, page.background_filename, null);
    } catch (e) {
        __openbexi_debugC("add_HTMLPage()", "Exception:" + e.message);
    }
    return page;
}
function add_HTMLRelativePage(bexiObjParentSelected, background) {
    try {
        if (openbexiNavigator.working) return null;
        // manage object position inside document
        manageContext("0px", "0px");
        // Create a new page object
        var newIdPage = getNewIdDiv("div");
        var page = new openbexi_page(bexiObjParentSelected, null, newIdPage, divPropertiesTop, divPropertiesWidth, "700px", "2500px", "relative", background);
        save_openbexi_object(page, "true");
        lastBexiObj_duplicated = null;
        if (ob_first_update) {
            ob_first_update = false;

        }
        openbexi_save_background(null, page.div.id, page.background_path, page.background_filename, null);
    } catch (e) {
        __openbexi_debugC("add_HTMLRelativePage()", "Exception:" + e.message);
    }
    return page;
}
function add_HTMLTimeline(bexiObjParentSelected, top, left) {
    try {
        if (bexiObjParentSelected == null) {
            lastBexiObj_duplicated = null;
            bexiObjParentSelected = getSelectedBexiObj(null);
        }
        // Create a new page object
        var newIdTimeline = getNewIdDiv("div");
        var timelineobj = new openbexi_timeline(bexiObjParentSelected, null, newIdTimeline, left, top, "850px", "400px", "timeline");
        save_openbexi_object(timelineobj, "true");
        lastBexiObj_duplicated = null;
        if (ob_first_update)
            ob_first_update = false;

    } catch (e) {
        __openbexi_debugC("add_HTMLTimeline()", "Exception:" + e.message);
    }
    return timelineobj;
}
function add_HTMLForm(bexiObjParentSelected, top, left, background) {
    try {
        if (bexiObjParentSelected == null) {
            lastBexiObj_duplicated = null;
            bexiObjParentSelected = getSelectedBexiObj(null);
        }
        // Create a new page object
        var newIdForm = getNewIdDiv("div");
        var formobj = new openbexi_form(bexiObjParentSelected, null, newIdForm, left, top, "700px", "440px");
        save_openbexi_object(formobj, "true");
        lastBexiObj_duplicated = null;
        if (ob_first_update) {
            ob_first_update = false;

        }
        openbexi_save_background(null, formobj.div.id, formobj.background_path, formobj.background_filename, null);
    } catch (e) {
        __openbexi_debugC("add_HTMLForm()", "Exception:" + e.message);
    }
    return formobj;
}
function add_HTMLDiv(bexiObjParentSelected, top, left, subtype) {
    try {
        if (bexiObjParentSelected == null) {
            lastBexiObj_duplicated = null;
            bexiObjParentSelected = getSelectedBexiObj(null);
        }
        // Create a new div object
        var newIdDiv = getNewIdDiv("div");
        var divobj = new openbexi_div(bexiObjParentSelected, null, newIdDiv, left, top, "100px", "50px", subtype);
        save_openbexi_object(divobj, "true");
        if (ob_first_update) {
            ob_first_update = false;

        }
    } catch (e) {
        __openbexi_debugC("add_HTMLDiv()", "Exception:" + e.message);
    }
    return divobj;
}
function duplicate_HTMLDiv(direction) {
    try {
        var divSelected = getSelectedBexiObj(null);
        var bexiObjParentSelected = getSelectedBexiObj(divSelected.parentNodeId);
        var divobj = add_HTMLDiv(bexiObjParentSelected, null, null, "box");
        lastBexiObj_duplicated = divobj;
        divobj.changeStyle(divSelected, direction);
        lastBexiObj_duplicated.my_PickFunc();
    } catch (e) {
        __openbexi_debugC("duplicate_HTMLDiv()", "Exception:" + e.message);
    }
}
function add_HTMLButton(bexiObjParentSelected, subtype, top, left) {
    try {
        if (bexiObjParentSelected == null) {
            lastBexiObj_duplicated = null;
            bexiObjParentSelected = getSelectedBexiObj(null);
        }
        var idChild = getNewIdDiv("div");
        var button = new openbexi_button(bexiObjParentSelected, null, idChild, left, top, "80px", "30px", subtype);
        save_openbexi_object(button, "true");
        if (ob_first_update) {
            ob_first_update = false;

        }
    } catch (e) {
        __openbexi_debugC("add_HTMLButton()", "Exception:" + e.message);
    }
    return button;
}
function duplicate_HTMLButton(direction) {
    try {
        var buttonSelected = getSelectedBexiObj(null);
        var bexiObjParentSelected = getSelectedBexiObj(buttonSelected.parentNodeId);
        var button = add_HTMLButton(bexiObjParentSelected, null, null, null);
        lastBexiObj_duplicated = button;
        button.wizard(buttonSelected, direction);
        button.my_PickFunc();
    } catch (e) {
        __openbexi_debugC("duplicate_HTMLButton()", "Exception:" + e.message);
    }
}
function add_HTMLTextfield(bexiObjParentSelected, text, x, y) {
    try {
        if (text == undefined) text = null;
        return  add_HTMLDojo(null, "dijit.form.TextBox", "TextBox", text, bexiObjParentSelected, null, null);
    } catch (e) {
        __openbexi_debugC("add_HTMLTextfield()", "Exception:" + e.message);
    }
    return null;
}
function add_dojo_editor(bexiObjParentSelected, text2, top, left) {
    try {
        if (bexiObjParentSelected == null) {
            lastBexiObj_duplicated = null;
            bexiObjParentSelected = getSelectedBexiObj(null);
        }
        var idChild = getNewIdDiv("div");
        var width = "400px";
        var height = "300px";
        var year;
        try {
            var t = new Date();
            year = t.getFullYear();
        } catch (e) {
            y = "2014";
        }

        var copyright = "© " + year + ".  All Rights Reserved";

        if (text2 == undefined || text2 == null) {
            text2 = null;
            copyright = null;
        } else {
            if (text2.match("copyright")) {
                width = "300px";
                height = "30px";
                copyright = prompt("enter the copyright text:\nex: © " + year + ".  All Rights Reserved.", copyright);
                if (copyright == null)copyright = "© " + year + ".  All Rights Reserved";
            }
        }
        var text = new openbexi_dojo_editor(bexiObjParentSelected, null, idChild, left, top, width, height, "none", copyright);
        save_openbexi_object(text, "true");
        if (ob_first_update) {
            ob_first_update = false;

        }
    } catch (e) {
        __openbexi_debugC("add_dojo_editor()", "Exception:" + e.message);
    }
    return text;
}
function duplicate_DOJO_editor(direction) {
    try {
        var textSelected = getSelectedBexiObj(null);
        var bexiObjParentSelected = getSelectedBexiObj(textSelected.parentNodeId);
        var text = add_dojo_editor(bexiObjParentSelected, null, null, null);
        lastBexiObj_duplicated = text;
        text.changeStyle(textSelected, direction);
        lastBexiObj_duplicated.my_PickFunc();
    } catch (e) {
        __openbexi_debugC("duplicate_DOJO_editor()", "Exception:" + e.message);
    }
}
function add_HTMLBlog(x, y) {
    alert(openbexi_lang("NotImplemented") + "\n Go to http://sourceforge.net/projects/ob-htmlbuilder, if you want to become a ob-htmlbuilder developer");
}
function add_HTMLLink(bexiObjParentSelected, top, left) {
    try {
        if (bexiObjParentSelected == null) {
            lastBexiObj_duplicated = null;
            bexiObjParentSelected = getSelectedBexiObj(null);
        }
        var idChild = getNewIdDiv("div");
        var link = new openbexi_link(bexiObjParentSelected, null, idChild, left, top, "80px", "30px");
        save_openbexi_object(link, "true");
        if (ob_first_update) {
            ob_first_update = false;

        }
    } catch (e) {
        __openbexi_debugC("add_HTMLLink()", "Exception:" + e.message);
    }
    return link;
}
function duplicate_HTMLLink(direction) {
    try {
        var linkSelected = getSelectedBexiObj(null);
        var bexiObjParentSelected = getSelectedBexiObj(linkSelected.parentNodeId);
        var link = add_HTMLLink(bexiObjParentSelected, null, null);
        lastBexiObj_duplicated = link;
        link.changeStyle(linkSelected, direction);
        lastBexiObj_duplicated.my_PickFunc();
    } catch (e) {
        __openbexi_debugC("duplicate_HTMLLink()", "Exception:" + e.message);
    }
}
function add_HTMLTree(bexiObjParentSelected, top, left) {
    var tree;
    try {
        if (bexiObjParentSelected == null) {
            lastBexiObj_duplicated = null;
            bexiObjParentSelected = getSelectedBexiObj(null);
        }
        var idChild = getNewIdDiv("div");
        tree = new openbexi_tree(bexiObjParentSelected, null, idChild, left, top, "200px", "300px");
        save_openbexi_object(tree, "true");
        if (ob_first_update) {
            ob_first_update = false;

        }
    } catch (e) {
        __openbexi_debugC("add_HTMLTree()", "Exception:" + e.message);
    }
    return tree;
}
function add_HTMLList(bexiObjParentSelected, top, left) {
    try {
        if (bexiObjParentSelected == null) {
            lastBexiObj_duplicated = null;
            bexiObjParentSelected = getSelectedBexiObj(null);
        }
        var idChild = getNewIdDiv("div");
        var list = new openbexi_list(bexiObjParentSelected, null, idChild, left, top, "100px", "100px");
        save_openbexi_object(list, "true");
        if (ob_first_update) {
            ob_first_update = false;

        }
    } catch (e) {
        __openbexi_debugC("add_HTMLList()", "Exception:" + e.message);
    }
    return list;
}
function duplicate_HTMLList(direction) {
    try {
        var listSelected = getSelectedBexiObj(null);
        var bexiObjParentSelected = getSelectedBexiObj(listSelected.parentNodeId);
        var list = add_HTMLList(bexiObjParentSelected, null, null);
        lastBexiObj_duplicated = list;
        list.changeStyle(listSelected, direction);
        lastBexiObj_duplicated.my_PickFunc();
    } catch (e) {
        __openbexi_debugC("duplicate_HTMLList()", "Exception:" + e.message);
    }
}
function add_HTMLCalendar(bexiObjParentSelected, top, left) {
    try {
        //alert("Sorry, Dojo 1.x calendar not implemented");
        //return;
        if (getBrowser() == "ie7") {
            alert("sorry, OPENBEXI fails to load \"dojo calandar\" in your current browser with native XMLHTTP enabled.\nTo fix this problem you have to disable native XMLHTTP support in advanced security options in IE7\n \nFrom your browser main toolBar go to Tools- Internet Options - Advanced - and uncheck \"Enable native XMLHTTP support\"\nImportant: Restart your browser\nImportant: Restart your browser ");
            return null;
        }
        if (bexiObjParentSelected == null) {
            lastBexiObj_duplicated = null;
            bexiObjParentSelected = getSelectedBexiObj(null);
        }
        var idChild = getNewIdDiv("div");
        var calendar = new openbexi_calendar(bexiObjParentSelected, null, idChild, left, top, "186px", "215px");
        save_openbexi_object(calendar, "true");
        if (ob_first_update) {
            ob_first_update = false;

        }
    } catch (e) {
        __openbexi_debugC("add_HTMLCalendar()", "Exception:" + e.message);
    }
    return calendar;
}
function duplicate_HTMLCalendar(direction) {
    try {
        var calendarSelected = getSelectedBexiObj(null);
        var bexiObjParentSelected = getSelectedBexiObj(calendarSelected.parentNodeId);
        var calendar = add_HTMLCalendar(bexiObjParentSelected, null, null);
        lastBexiObj_duplicated = calendar;
        calendar.changeStyle(calendarSelected, direction);
        lastBexiObj_duplicated.my_PickFunc();
    } catch (e) {
        __openbexi_debugC("duplicate_HTMLCalendar()", "Exception:" + e.message);
    }
}
function add_HTMLClock(bexiObjParentSelected, top, left) {
    try {
        if (getBrowser() == "ie7") {
            alert("sorry, OPENBEXI fails to load \"dojo load\" in your current browser with native XMLHTTP enabled.\nTo fix this problem you have to disable native XMLHTTP support in advanced security options in IE7\n \nFrom your browser main toolBar go to Tools- Internet Options - Advanced - and uncheck \"Enable native XMLHTTP support\"\nImportant: Restart your browser ");
            return null;
        }
        if (bexiObjParentSelected == null) {
            lastBexiObj_duplicated = null;
            bexiObjParentSelected = getSelectedBexiObj(null);
        }
        var idChild = getNewIdDiv("div");
        var clock = new openbexi_clock(bexiObjParentSelected, null, idChild, left, top, "240px", "74px");
        save_openbexi_object(clock, "true");
        if (ob_first_update) {
            ob_first_update = false;

        }
    } catch (e) {
        __openbexi_debugC("add_HTMLClock()", "Exception:" + e.message);
    }
    return clock;
}
function duplicate_HTMLClock(direction) {
    try {
        var clockSelected = getSelectedBexiObj(null);
        var bexiObjParentSelected = getSelectedBexiObj(clockSelected.parentNodeId);
        var clock = add_HTMLClock(bexiObjParentSelected, null, null);
        lastBexiObj_duplicated = clock;
        clock.changeStyle(clockSelected, direction);
        lastBexiObj_duplicated.my_PickFunc();
    } catch (e) {
        __openbexi_debugC("duplicate_HTMLClock()", "Exception:" + e.message);
    }
}
function add_HTMLChartPie() {
    add_HTMLChart("pie");
}
function add_HTMLChartBar() {
    add_HTMLChart("bar");
}
function add_HTMLChartLine() {
    add_HTMLChart("line");
}
function add_HTMLChart(type, bexiObjParentSelected, fileName, width, height, keepProportion, top, left) {
    try {
        loadingElt = "IMG";
        if (width == null)  width = "400px";
        if (height == null)  height = "300px";
        if (bexiObjParentSelected == null) {
            lastBexiObj_duplicated = null;
            bexiObjParentSelected = getSelectedBexiObj(null);
        }
        // create object
        var idChild = getNewIdDiv("div");
        var chart = new openbexi_chart(bexiObjParentSelected, null, idChild, type, left, top, width, height, keepProportion);
        save_openbexi_object(chart, "true");
        if (ob_first_update) {
            ob_first_update = false;

        }
    } catch (e) {
        __openbexi_debugC("add_HTMLImg()", "Exception:" + e.message);
    }
    return chart;
}
function add_HTMLDygraphs(type, bexiObjParentSelected, fileName, width, height, keepProportion, top, left) {
    try {
        if (width == null)  width = "700px";
        if (height == null)  height = "400px";
        if (bexiObjParentSelected == null) {
            lastBexiObj_duplicated = null;
            bexiObjParentSelected = getSelectedBexiObj(null);
        }
        // create object
        var idChild = getNewIdDiv("div");
        var dygraphs = new openbexi_dygraphs(bexiObjParentSelected, null, idChild, type, left, top, width, height, keepProportion);
        save_openbexi_object(dygraphs, "true");
        if (ob_first_update) {
            ob_first_update = false;

        }
    } catch (e) {
        __openbexi_debugC("add_HTMLImg()", "Exception:" + e.message);
    }
    return dygraphs;
}
function add_HTMLImg(bexiObjParentSelected, fileName, width, height, keepProportion, top, left, source_path2, new_filename2) {
    try {
        if (openbexiNavigator.working) {
            __openbexi_debugC("add_HTMLImg()", "Information:" + fileName + " canceled", "black");
            return null;
        }
        __openbexi_debugC("add_HTMLImg()", "Information:" + fileName, "black");
        //An img is already selected, just update URL
        if (getSelectedBexiObj(null).type == "openbexi_img") {
            //getSelectedBexiObj(null).updateURLs(null, fileName);
            //return;
        }
        if (fileName != undefined) {
            if (openbexiNavigator.css_mode == "backgroundImage") {
                if (currentObjNameSelected == null)
                    openbexi_save_background(null, null, "", filename, null);
                else
                    openbexi_save_background(null, getSelectedBexiObj(null).div.id, "", filename, null);
                alert("add_HTMLImg:Please remove this code")
                return null;
            }
        }
        loadingElt = "IMG";
        if (width == null)  width = "130px";
        if (height == null)  height = "62px";
        if (bexiObjParentSelected == null) {
            lastBexiObj_duplicated = null;
            bexiObjParentSelected = getSelectedBexiObj(null);
        }
        // create object
        manageContext(top, left);
        if (fileName == null || fileName == "undefined") {
            fileName = "gif/no-photo.jpg";
        }
        var idChild = getNewIdDiv("div");
        var img = new openbexi_img(bexiObjParentSelected, null, idChild, fileName, newChildTop, newChildLeft, width, height, keepProportion);
        save_openbexi_object(img, "true");
        if (ob_first_update) {
            ob_first_update = false;

        }
        if (bexiObjParentSelected && bexiObjParentSelected.type == "openbexi_fisheye")
            bexiObjParentSelected.manageFisheyeItem(null, null, null);

        if (new_filename2 != undefined && fileName == "gif/no-photo.jpg") {
            var new_filename3 = new_filename2.replace("gifPlus\/", "");
            var filename = openbexi_system.openbexi_stringReplaceAll(new_filename3, "-##-", " ");
            var source_path = openbexi_system.openbexi_stringReplaceAll(source_path2, "-##-", " ");
            img.save_image(null, source_path, filename, null);
        }
    } catch (e) {
        __openbexi_debugC("add_HTMLImg()", "Exception:" + e.message);
    }
    return img;
}
function duplicate_HTMLImg(direction) {
    try {
        var imgSelected = getSelectedBexiObj(null);
        var bexiObjParentSelected = getSelectedBexiObj(imgSelected.parentNodeId);
        var img = add_HTMLImg(bexiObjParentSelected, imgSelected.img.src, null, null, true, undefined, undefined, null, null);
        lastBexiObj_duplicated = img;
        img.changeStyle(imgSelected, direction);
        lastBexiObj_duplicated.my_PickFunc();
    } catch (e) {
        __openbexi_debugC("duplicate_HTMLImg()", "Exception:" + e.message);
    }
}
function add_HTMLMedia(bexiObjParentSelected, fileName, top, left) {
    try {
        if (openbexiNavigator.working) {
            __openbexi_debugC("add_HTMLMedia()", "Information:" + fileName + " canceled", "black");
            return null;
        }
        __openbexi_debugC("add_HTMLImg()", "Information:" + fileName, "black");
        loadingElt = "MEDIA";
        var w = "200px";
        var h = "200px";
        if (getSelectedBexiObj(null).type == "openbexi_medias") {
            w = getSelectedBexiObj(null).div.style.width;
            h = getSelectedBexiObj(null).div.style.height;
            x = getSelectedBexiObj(null).div.style.top;
            y = getSelectedBexiObj(null).div.style.left;
            getSelectedBexiObj(null).removeObject(true);
        }
        if (bexiObjParentSelected == null) {
            lastBexiObj_duplicated = null;
            bexiObjParentSelected = getSelectedBexiObj(null);
        }
        if (fileName == null || fileName == "undefined") {
            fileName = "gif/ob_video_x32.png";
        }
        var idChild = getNewIdDiv("div");
        var medias = new openbexi_medias(bexiObjParentSelected, null, idChild, fileName, left, top, w, h);
        save_openbexi_object(medias, "true");
        if (ob_first_update) {
            ob_first_update = false;

        }
    } catch (e) {
        __openbexi_debugC("add_HTMLMedia()", "Exception:" + e.message);
    }
    return medias;
}
function add_HTMLGalerie(x, y) {
    try {
        manageContext(x, y);
        document.all.imageFile.click();
        document.getElementById("warningMsgDiv").style.visibility = "visible";

        var img = new Array();
        var idChildCount = getNewIdDiv("div");
        var newPath = getfile(document.all.imageFile.value).ParentFolder;
        img = getfolder(newPath);
        for (var i = 0; i < img.length; i++) {
            var idChild = "img" + idChildCount;
            //document.getElementById("warningMsgA").value = "Loading " + img[i] + " " + "(" + i + "/" + img.length + ")";
            var picture = new openbexi_img(null, idChild, img[i]);
            save_openbexi_object(picture, "true");
            idChildCount = idChildCount + 1;
        }
        document.getElementById("warningMsgDiv").style.visibility = "hidden";
        lastBexiObj_duplicated = null;
        if (ob_first_update) {
            ob_first_update = false;

        }
    } catch (e) {
        __openbexi_debugC("add_HTMLGalerie()", "Exception:" + e.message);
    }
}
function add_HTMLDojo(classname, type, subtype, label2, bexiObjParentSelected, table, attribut, x, y) {
    try {
        if (getBrowser() == "ie7") {
            alert("sorry, OPENBEXI fails to load \"dojo dojo\" in your current browser with native XMLHTTP enabled.\nTo fix this problem you have to disable native XMLHTTP support in advanced security options in IE7\n \nFrom your browser main toolBar go to Tools- Internet Options - Advanced - and uncheck \"Enable native XMLHTTP support\"\nImportant: Restart your browser ");
            return null;
        }
        if (bexiObjParentSelected == null) {
            lastBexiObj_duplicated = null;
            bexiObjParentSelected = getSelectedBexiObj(null);
        }
        manageContext(x, y);
        // label
        var left = newChildLeft;
        var idChildDojo = getNewIdDiv("div");
        var labelName = label2;
        var labelDojo = null;
        if (type != "dojox.grid.Grid" && type != "GridX") {
            if (label2 == null) {
                var label1 = "label";
                if (subtype == "UsZip")
                    label1 = "UsZip:";
                if (subtype == "DateTextBox")
                    label1 = "Date:";
                if (subtype == "Password")
                    label1 = "Password:";
                labelName = prompt("enter the field name:\nExample: last name, first name, adress, etc...", label1);
                labelName = openbexi_clearText(labelName);
                if (labelName == null || labelName == "") labelName = "";
                label2 = labelName;
            }
            if (labelName == "")labelName = "label";
            var idChildlabel = "label_" + idChildDojo;
            labelDojo = new openbexi_dojo_editor(bexiObjParentSelected, null, idChildlabel, newChildTop, newChildLeft, "90px", "25px", "label", label2);
            save_openbexi_object(labelDojo, "true");
            labelDojo.div.style.border = "none";
            if (bexiObjParentSelected.id == "BODY")
                labelDojo.div.style.background = document.body.background;
            else
                labelDojo.div.style.background = bexiObjParentSelected.div.style.background;
            labelDojo.div.innerHTML = "<B>" + label2 + "</B>";
            left = (parseInt(labelDojo.div.style.left) + parseInt(labelDojo.div.style.width) + parseInt(5)) + "px";
        }
        //body
        var dojo = new openbexi_dojo(classname, type, subtype, bexiObjParentSelected, null, idChildDojo, newChildTop, left, "90px", "25px", table, attribut);
        save_openbexi_object(dojo, "true");
        if (bexiObjParentSelected.id == "BODY")
            dojo.div.style.background = document.body.background;
        else
            dojo.div.style.background = bexiObjParentSelected.div.style.background;
        if (ob_first_update) {
            ob_first_update = false;
        }
    } catch (e) {
        __openbexi_debugC("add_HTMLDojo()", "Exception:" + e.message);
    }
    return dojo;
}
function selectNextObj() {
    try {
        lastBexiObj_duplicated = null;
        var selectedFound = false;
        if (getSelectedBexiObj(null).id == "BODY") {
            selectedFound = true;
        }
        for (var i = 0; i < openbexi_object.length; i++) {
            if (openbexi_object[i].id != "BODY") {
                try {
                    var childrenId = openbexi_object[i].getChildrenId();
                    for (var j = 0; j < childrenId.length; j++) {
                        if (selectedFound) {
                            currentObjNameSelected = openbexi_object[i].setSelected(childrenId[j]);
                            return;
                        }
                        if (document.getElementById(childrenId[j]).getAttribute("selected")) {
                            selectedFound = true;
                            openbexi_object[i].setUnSelected();
                        }
                    }
                } catch (e) {
                    alert("method not implemented for " + openbexi_object[i].id + "\nopenbexi_builder.selectNextObj():" + e.name + ". Error message: " + e.message);
                }
            }
        }
        currentObjNameSelected = null;
    } catch (e) {
        __openbexi_debugC("selectNextObj()", "Exception:" + e.message);
    }
}
function selectPreviousObj() {
    try {
        lastBexiObj_duplicated = null;
        var selectedFound = false;
        if (getSelectedBexiObj(null).id == "BODY") {
            selectedFound = true;
        }
        for (var i = openbexi_object.length - 1; i >= 0; i--) {
            if (openbexi_object[i].id != "BODY") {
                try {
                    var childrenId = openbexi_object[i].getChildrenId();
                    for (var j = childrenId.length - 1; j >= 0; j--) {
                        //alert("currentObjNameSelected=" + currentObjNameSelected + " objIdFound=" + objIdFound + " openbexi_object[i]=" + openbexi_object[i].id);
                        if (selectedFound) {
                            currentObjNameSelected = openbexi_object[i].setSelected(childrenId[j]);
                            return;
                        }
                        if (document.getElementById(childrenId[j]).getAttribute("selected")) {
                            selectedFound = true;
                            openbexi_object[i].setUnSelected();
                        }
                    }
                } catch (e) {
                    alert("method not implemented for " + openbexi_object[i].id + "\nopenbexi_builder.selectNextObj():" + e.name + ". Error message: " + e.message);
                }
            }
        }
        currentObjNameSelected = null;
    } catch (e) {
        __openbexi_debugC("selectPreviousObj()", "Exception:" + e.message);
    }
}
function manageContext(x, y) {
    ob_setDirty_flag(true);
    try {
        if (x != undefined && y != undefined) {
            newChildTop = y;
            newChildLeft = x;
        } else {
            var parentBexiObj = null;
            if (lastBexiObj_duplicated != null) {
                parentBexiObj = getSelectedBexiObj(lastBexiObj_duplicated.parentNodeId);
            } else {
                parentBexiObj = getSelectedBexiObj(null);
            }
            if (parentBexiObj != null) {
                newChildTop = parentBexiObj.getNewChildrenStyleTop() + "px";
                newChildLeft = parentBexiObj.getNewChildrenStyleLeft() + "px";
            } else {
                newChildTop = openbexiBody.getNewChildrenStyleTop() + "px";
                newChildLeft = openbexiBody.getNewChildrenStyleLeft() + "px";
            }
        }
    } catch (e) {
        __openbexi_debugC("manageContext()", e.message);
    }
    //alert("manageContext: newChildTop="+newChildTop+" newChildLeft="+newChildLeft);
}
var if_dojo = false;
function openbexi_check_if_dojo() {
    try {
        if (if_dojo) return true;
        for (var i = 0; i < openbexi_object.length; i++) {
            try {
                if (openbexi_object[i].type == "openbexi_chartFlow" || openbexi_object[i].type == "openbexi_tree" || openbexi_object[i].type == "openbexi_dojo" || openbexi_object[i].type == "openbexi_fisheye" || openbexi_object[i].type == "openbexi_form" || openbexi_object[i].type == "openbexi_calendar" || openbexi_object[i].type == "openbexi_clock") return true;

            } catch (e) {
                __openbexi_debugC("openbexi_check_if_dojo()", e.message);
            }
        }
    } catch (e) {
        __openbexi_debugC("openbexi_check_if_dojo()", "Exception:" + e.message);
    }
    return false;
}
var if_chartflow = false;
function openbexi_check_if_chartflow() {
    try {
        if (if_chartflow) return true;
        for (var i = 0; i < openbexi_object.length; i++)
            if (document.getElementById(openbexi_object[i].div.id).ob_endpoints != undefined && document.getElementById(openbexi_object[i].div.id).ob_endpoints.length > 0) {
                if_chartflow = true;
                return true;
            }
    } catch (e) {
        __openbexi_debugC("openbexi_check_if_chartflow()", "Exception:" + e.message);
    }
    return false;
}
function openbexi_get_css_header() {
    try {
        var html_head = "";
        var pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
        for (var i = 0; i < openbexi_object.length; i++) {
            if (openbexi_object[i].id != "lefttop" && openbexi_object[i].id != "righttop" && openbexi_object[i].id != "rightbottom" && openbexi_object[i].id != "leftbottom") {
                var cssFile = get_xml_classe_object_attribut_value(pageDoc, "page", openbexi_object[i].div.id, "template");
                html_head += '   <link rel="stylesheet" href=\"' + cssFile + '\" type="text/css">';
            }
        }
    } catch (e) {
        __openbexi_debugC("openbexi_get_css_header()", "Exception:" + e.message);
    }
    return html_head;
}
function openbexi_get_javascript_specific_header(filter) {
    try {
        var html_head = "";
        var pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
        var javascripts = get_xml_classe_object_attributes(pageDoc, "page", "javascript");
        if (javascripts != null) {
            for (var i = 0; i < javascripts.length; i++) {
                var javascriptFile = get_xml_classe_object_attribut_value(pageDoc, "page", "javascript", javascripts[i].getAttribute("name"));
                if (javascriptFile.match(filter))
                    html_head += '   <script type="text/javascript" src=\"' + javascriptFile + '\"></script>';
            }
        }
    } catch (e) {
        __openbexi_debugC("openbexi_get_javascript_specific_header()", "Exception:" + e.message);
    }
    return html_head;
}
function openbexi_get_javascript_header() {
    try {
        var html_head = "";
        openbexi_add_javascript(null, "javascript/", "prototype.js");
        openbexi_add_javascript(null, "javascript/", "scriptaculous.js");
        openbexi_add_javascript(null, "javascript/", "effects.js");
        openbexi_add_javascript(null, "javascript/", "slider.js");
        openbexi_add_javascript(null, "javascript/", "openbexi_xml.js");
        var pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
        var javascripts = get_xml_classe_object_attributes(pageDoc, "page", "javascript");
        if (javascripts != null) {
            for (var i = 0; i < javascripts.length; i++) {
                var javascriptFile = get_xml_classe_object_attribut_value(pageDoc, "page", "javascript", javascripts[i].getAttribute("name"));
                if (javascriptFile != "*")
                    html_head += '   <script type="text/javascript" src=\"' + javascriptFile + '\"></script>';
            }
        }
    } catch (e) {
        __openbexi_debugC("openbexi_get_javascript_header()", "Exception:" + e.message);
    }
    return html_head;
}
function openbexi_get_head_code(type, subtype) {
    try {
        for (var i = 0; i < openbexi_object.length; i++) {
            try {
                if (openbexi_object[i].type == type && subtype == null) return openbexi_object[i];
                if (openbexi_object[i].type == type && openbexi_object[i].div.getAttribute("SUBCLASSE") == subtype) return openbexi_object[i];
            } catch (e) {
                __openbexi_debugC("openbexi_get_head_code()", e.message);
            }
        }
    } catch (e) {
        __openbexi_debugC("openbexi_get_javascript_header()", "Exception:" + e.message);
    }
    return null;
}
function openbexi_get_functions_onunload() {
    try {
        var onunload = "";
        for (var i = 0; i < openbexi_object.length; i++) {
            try {
                var fct = openbexi_object[i].functions_to_load();
                if (fct.match("ob_attach_web_socket")) {
                    onunload += " ob_exitPage(\'" + openbexi_object[i].div.id + "\'); ";
                }
            } catch (e) {
                __openbexi_debugC("openbexi_get_functions_onunload()", e.message);
            }
        }
    } catch (e) {
        __openbexi_debugC("openbexi_get_functions_onunload()", "Exception:" + e.message);
    }
    return onunload;
}
function openbexi_get_functions_to_load() {
    try {
        var onload = "";
        for (var i = 0; i < openbexi_object.length; i++) {
            try {
                onload += openbexi_object[i].functions_to_load();
            } catch (e) {
                __openbexi_debugC("openbexi_get_functions_to_load()", e.message);
            }
        }
    } catch (e) {
        __openbexi_debugC("openbexi_get_functions_to_load()", "Exception:" + e.message);
    }
    return onload;
}
function openbexi_get_functions_to_triggerFromBody() {
    try {
        var html_body = "";

        var genericObject = new openbexi_generic_object(null);

        // onload case
        var functions_to_load = "";
        for (var j = 0; j < openbexi_object.length; j++) {
            if (openbexi_object[j].type == "openbexi_timeline")
                functions_to_load += openbexi_object[j].functions_to_load();
            else if (openbexi_object[j].type == "openbexi_chart")
                functions_to_load += openbexi_object[j].functions_to_load();
            else {
                var urlCount = ob_getFunctionCounter(openbexi_object[j].div.id);
                for (var i = 0; i < urlCount; i++) {
                    functions_to_load += genericObject.functions_to_load(openbexi_object[j].div.id, i, null);
                }
            }
        }
        urlCount = ob_getFunctionCounter("BODY");
        for (i = 0; i < urlCount; i++) {
            functions_to_load += genericObject.functions_to_load("BODY", i, "onload");
        }

        if (functions_to_load != "" && openbexi_check_if_chartflow())
            html_body += 'onLoad=\"' + functions_to_load + '\";openbexi_rebuildChartFlow() ';
        if (functions_to_load != "" && !openbexi_check_if_chartflow())
            html_body += 'onLoad=\"' + functions_to_load + '\" ';
        if (functions_to_load == "" && openbexi_check_if_chartflow())
            html_body += 'onLoad=\"' + "openbexi_rebuildChartFlow(\'static\')" + '\" ';


        // onunload case
        var functions_to_before_on_load = openbexi_get_functions_onunload();
        var functions_to_unload = "";
        for (i = 0; i < urlCount; i++) {
            functions_to_unload += genericObject.functions_to_load("BODY", i, "onunload");
        }
        if (functions_to_load != "")
            html_body += 'onunload=\"' + functions_to_before_on_load + functions_to_unload + '\" ';
        else if (functions_to_unload != "")
            html_body += 'onunload=\"' + functions_to_unload + '\" ';

        // onresize case
        var functions_to_onresize = "";
        for (i = 0; i < urlCount; i++) {
            functions_to_onresize += genericObject.functions_to_load("BODY", i, "onresize");
        }
        if (functions_to_onresize != "")
            html_body += 'onresize=\"' + functions_to_onresize + '\" ';

        // onscroll case
        var functions_to_onscroll = "";
        for (i = 0; i < urlCount; i++) {
            functions_to_onscroll += genericObject.functions_to_load("BODY", i, "onscroll");
        }
        if (functions_to_onscroll != "")
            html_body += 'onscroll=\"' + functions_to_onscroll + '\" ';

    } catch (e) {
        __openbexi_debugC("openbexi_get_functions_to_triggerFromBody()", "Exception:" + e.message);
    }
    return html_body;
}
function reconcile_OPENBEXI_PAGES_DATA_XML(OPENBEXI_TEMPLATE_DATA_XML) {
    try {
        var ob_widgets_att_value;
        var ob_urls_att_value;
        var ob_url_att_value;
        var docTemplate = openbexi_get_documentElement(OPENBEXI_TEMPLATE_DATA_XML, "text/xml");
        var docPage = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
        var ob_widgets = get_xml_classe_objects(docTemplate, "page");
        for (var i = 0; i < ob_widgets.length; i++) {
            var ob_widgets_att = get_xml_classe_objects(docTemplate, "page", ob_widgets[i]);
            for (var j = 0; j < ob_widgets_att.length; j++) {
                ob_widgets_att_value = get_xml_classe_object_attribut_value(docTemplate, "page", ob_widgets[i], ob_widgets_att[j]);
                set_xml_classe_object_attribut_value(docPage, "page", ob_widgets[i], ob_widgets_att[j], ob_widgets_att_value);
            }
            var ob_urls_att = get_xml_classe_objects(docTemplate, "urls", ob_widgets[i]);
            for (j = 0; j < ob_urls_att.length; j++) {
                ob_urls_att_value = get_xml_classe_object_attribut_value(docTemplate, "urls", ob_widgets[i], ob_urls_att[j]);
                set_xml_classe_object_attribut_value(docPage, "urls", ob_widgets[i], ob_urls_att[j], ob_urls_att_value);
            }
            var urlCount = 0;
            while (true) {
                var ob_url_att = get_xml_classe_objects(docTemplate, "url_" + urlCount, ob_widgets[i]);
                if (ob_url_att == "") break;
                ob_url_att_value = get_xml_classe_object_attribut_value(docTemplate, "url_" + urlCount, ob_widgets[i], ob_url_att);
                set_xml_classe_object_attribut_value(docPage, "url_" + urlCount, ob_widgets[i], ob_url_att, ob_url_att_value);
                urlCount++;
            }
        }
        OPENBEXI_PAGES_DATA_XML = openbexi_get_xmlString(docPage);
    } catch (e) {
        __openbexi_debugC("reconcile_OPENBEXI_PAGES_DATA_XML()", "Exception:" + e.message);
    }
}
function openbexi_build_OPENBEXI_TEMPLATE_DATA_XML() {
    try {
        var docTemplate = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
        for (var i = 0; i < openbexi_object.length; i++) {
            if (openbexi_object[i].div.ob_template != "true") {
                var urlCount = ob_getFunctionCurrentIndex(openbexi_object[i].div.id);
                if (urlCount == -1) urlCount = 0;
                for (var j = 0; j <= urlCount; j++)
                    docTemplate = delete_xml_classe_object(docTemplate, "url_" + j, openbexi_object[i].div.id);
                docTemplate = delete_xml_classe_object(docTemplate, "page", openbexi_object[i].div.id);
                docTemplate = delete_xml_classe_object(docTemplate, "urls", openbexi_object[i].div.id);
            }
        }
    } catch (e) {
        __openbexi_debugC("openbexi_build_OPENBEXI_TEMPLATE_DATA_XML()", "Exception:" + e.message);
    }
    return openbexi_get_xmlString(docTemplate);
}
function openbexi_write_head_HTML() {
    try {
        //var html_head = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\n<HTML>\n';
        //var html_head ='<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">'
        if (openbexiNavigator) openbexiNavigator.status("Building Head page ...", "#abff4b");
        //var html_head = '<?xml version="1.0"?>\n';
        var html_head = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">';
        html_head += '<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">\n';
        //html_head += '<!'+parseInt(Math.random() * 99999999)+'>\n';
        html_head += '<head>\n';

        // add css template file
        html_head += openbexi_get_css_header();

        // Fixed IE bug with replace to avoid extra <\n> return
        // set OPENBEXI_PUBLIC_CONTEXT_XML
        html_head += '   <script type="text/javascript">';
        html_head += '      var OPENBEXI_PUBLIC_CONTEXT_XML = \'' + OPENBEXI_PUBLIC_CONTEXT_XML.replace("</openbexiCreative>", "</openbexiCreative>\'</script>\n");
        html_head += '   <script type="text/javascript">';

        // set OPENBEXI_PRIVATE_CONTEXT_XML
        var docXML = openbexi_clearXMLFile_passwd(OPENBEXI_PRIVATE_CONTEXT_XML);
        html_head += '      var OPENBEXI_PRIVATE_CONTEXT_XML = \'' + docXML.replace("</openbexiCreative>", "</openbexiCreative>\'</script>\n");

        for (var i = 0; i < openbexi_object.length; i++) {
            try {
                //if (openbexiNavigator) openbexiNavigator.status("Building Head data page ..." + i, "#abff4b");
                openbexi_object[i].setData();
            }
            catch (e) {
                __openbexi_debugC("openbexi_write_head_HTML()", e.message);
            }
        }

        // set OPENBEXI_PAGES_DATA_XML
        html_head += '   <script type="text/javascript">';
        html_head += '      var OPENBEXI_PAGES_DATA_XML = \'' + OPENBEXI_PAGES_DATA_XML.replace("</openbexiCreative>", "</openbexiCreative>\'</script>\n");

        if (openbexi_check_if_dojo()) {
            html_head += '   <style type="text/css">\n';
            //html_head += '          @import "dojo/resources/dojo.css";\n';
            html_head += '          @import "dojox/grid/resources/Grid.css";\n';
            html_head += '          @import "dojox/widget/FisheyeList/FisheyeList.css";\n';
            html_head += '   </style>\n';
            html_head += '   <script type="text/javascript">var djConfig = {isDebug: false, parseOnLoad: true, extraLocale: [\'en - us\']};</script>\n';
            html_head += '   <script type="text/javascript" src="dojo/dojo.js"></script>\n';
            html_head += '   <script type="text/javascript" src="dijit/dijit.js"></script>\n';
            html_head += '   <script type="text/javascript" src="dijit/_Calendar.js"></script>\n';

            var bexi_dojo = openbexi_get_head_code("openbexi_dojo", null);
            if (bexi_dojo != null) {
                html_head += bexi_dojo.head_code();
            }
            html_head += '   <script type="text/javascript">\n';
            html_head += '          dojo.require("dijit.form.TextBox");\n';
            html_head += '          dojo.require("dijit.form.ComboBox");\n';
            html_head += '          dojo.require("dijit.form.CheckBox");\n';
            html_head += '          dojo.require("dijit.form.ValidationTextBox");\n';
            html_head += '          dojo.require("dijit.form.NumberTextBox");\n';
            html_head += '          dojo.require("dijit.form.CurrencyTextBox");\n';
            html_head += '          dojo.require("dijit.form.DateTextBox");\n';
            html_head += '          dojo.require("dojo.currency");\n';
            html_head += '          dojo.require("dojo.data.ItemFileReadStore");\n';
            html_head += '          dojo.require("dojo.data.ItemFileWriteStore");\n';
            html_head += '          dojo.require("dijit.Tree");\n';
            html_head += '          dojo.require("dojox.grid.EnhancedGrid");\n';
            html_head += '          dojo.require("dojox.data.CsvStore");\n';
            html_head += '          dojo.require("dojox.widget.FisheyeList");\n';
            html_head += '          dojo.require("dojo.date.locale");\n';
            html_head += '          dojo.require("dojo.parser");\n';
            html_head += '   </script>\n';
        }

        var functions_to_load = openbexi_get_functions_to_load();
        if (functions_to_load != "")
        // <script type="text/javascript"> dojo.addOnLoad(functionInvoker() { start_digital("clock0"); start_digital("clock1");}); </script>
            html_head += '   <script type="text/javascript"> dojo.addOnLoad(function() {' + functions_to_load + '}); </script>\n';

        if (openbexi_check_if_chartflow()) {
            html_head += '   <link rel="stylesheet" href="javascript/jsPlumb/jsPlumb.css">\n';
            html_head += '   <script type="text/javascript" src="javascript/jquery/jquery.min.js"></script>\n';
            html_head += '   <script type="text/javascript" src="javascript/jquery/jquery-ui.min.js"></script>\n';
            html_head += '   <script type="text/javascript"src="javascript/jsPlumb/jquery.jsPlumb-1.5.2-min.js"></script>\n';
            html_head += '   <script type="text/javascript" src="javascript/openbexi_chartFlow.js"></script>\n';
        }

        var bexi_tree = openbexi_get_head_code("openbexi_tree", null);
        if (bexi_tree != null) {
            html_head += bexi_tree.head_code();
        }
        var bexi_chartFlow = openbexi_get_head_code("openbexi_chartFlow", null);
        if (bexi_chartFlow != null) {
            html_head += bexi_chartFlow.head_code();
        }
        var bexi_list = openbexi_get_head_code("openbexi_list", null);
        if (bexi_list != null) {
            html_head += bexi_list.head_code();
        }
        var bexi_fisheye = openbexi_get_head_code("openbexi_fisheye", null);
        if (bexi_fisheye != null) {
            html_head += bexi_fisheye.head_code();
        }
        var bexi_timeline = openbexi_get_head_code("openbexi_timeline", null);
        if (bexi_timeline != null) {
            html_head += bexi_timeline.head_code();
        }
        bexi_clock = openbexi_get_head_code("openbexi_clock", "digital");
        if (bexi_clock != null) {
            html_head += bexi_clock.head_code();
        }
        var bexi_calendar = openbexi_get_head_code("openbexi_calendar", null);
        if (bexi_calendar != null) {
            html_head += bexi_calendar.head_code();
        }
        var bexi_editor = openbexi_get_head_code("openbexi_dojo_editor", null);
        if (bexi_editor != null) {
            html_head += bexi_editor.head_code();
        }
        var bexi_chart = openbexi_get_head_code("openbexi_chart", null);
        if (bexi_chart != null) {
            html_head += bexi_chart.head_code();
        }
        var bexi_dygraphs = openbexi_get_head_code("openbexi_dygraphs", null);
        if (bexi_dygraphs != null) {
            html_head += bexi_dygraphs.head_code();
        }
        // add all javascripts header for all widgets;
        html_head += openbexi_get_javascript_header();

        var flagButtonTab = true;
        for (var l = 0; l < openbexi_object.length; l++) {
            if (openbexi_object[l].type == "openbexi_tree") {
                html_head += "       <script type=\"text/javascript\">";
                html_head += "       function prepare() {";
                html_head += "       var getIconClass = ob_getCustomIconClass;";
                html_head += "       var store = new dojo.data.ItemFileReadStore({";
                html_head += "           url:\"" + openbexi_object[l].tree_name + "\"";
                html_head += "       });";
                html_head += "       var treeModel = new dijit.tree.ForestStoreModel({store: store});";
                html_head += "       var treeControl = new dijit.Tree({";
                html_head += "           model: treeModel,showRoot: false,openOnClick:true,getIconClass:eval(getIconClass),";
                html_head += "           _createTreeNode: function(args) {";
                html_head += "               var tnode = new dijit._TreeNode(args);";
                html_head += "              tnode.labelNode.innerHTML = args.label;";
                html_head += "              return tnode;";
                html_head += "          }";
                html_head += "       },\"" + openbexi_object[l].div.id + "\");";
                html_head += "       }";
                html_head += "       dojo.addOnLoad(prepare);";
                html_head += "       </script>";
            }

            if (openbexi_object[l].subtype == "dojox.grid.Grid")  html_head += openbexi_object[l].view_and_model();
        }
        // Add CSS properties
        html_head += openbexi_build_CSS();

        html_head += '   </head>\n';
        html_head += '\n';
        if (openbexiNavigator) openbexiNavigator.status("Head page built done", "#abff4b");
        return html_head;
    } catch (e) {
        __openbexi_debugC("openbexi_write_head_HTML()", "Exception:" + e.message);
        return null;
    }
}
function write_body_HTML() {
    try {
        var html_body = "";

        var theme = openbexi_getPageData(null, "page", "overall", "theme");
        var background = openbexi_getPageData(null, "page", "body", "background");
        var backgroundImage = openbexi_getPageData(null, "page", "body", "backgroundImage");
        if (theme == "")theme = "claro";
        var body_str = '    <body class=' + theme + ' style="';
        if (background != "")
            body_str += 'background:' + background + ';';
        if (backgroundImage != "")
            body_str += ' background-image:url(' + backgroundImage + ') ';
        body_str += '" ';
        html_body += body_str + " " + openbexi_get_functions_to_triggerFromBody();
        html_body += '>\n';

        return html_body;
    } catch (e) {
        __openbexi_debugC("write_body_HTML()", "Exception:" + e.message);
        return null;
    }
}
function write_end_HTML() {
    try {
        var html_end = '';
        html_end += '    </body>\n';
        html_end += '</html>\n';
        return html_end;
    } catch (e) {
        __openbexi_debugC("write_end_HTML()", "Exception:" + e.message);
        return null;
    }
}
function get_HTML_page() {
    try {
        openbexi_updatePageData(null, "page", "version", "code", openbexi_code_version);
        var htmlCode = openbexi_write_head_HTML();
        htmlCode += write_body_HTML();
        for (var i = 0; i < openbexi_object.length; i++) {
            try {
                if (openbexi_object[i].parentNodeId == "BODY") {
                    if (!openbexi_object[i].id.match("left|right"))
                        htmlCode += openbexi_object[i].body_code();
                }
            } catch (e1) {
                __openbexi_debugC("get_HTML_page()", "Exception:" + e1.message + " obj=" + openbexi_object[i].id + " obj type=" + openbexi_object[i].type);
            }
        }
        htmlCode += write_end_HTML();
        return htmlCode;
    } catch (e) {
        __openbexi_debugC("get_HTML_page()", "Exception:" + e.message);
        return null;
    }
}
function openbexi_Print() {
    alert(openbexi_lang("NotImplemented"));
}
function load_openbexiBuilder() {
    try {
        load_openbexiBody();
        //var file = openbexi_get_href_directory(window.location.href) + "private_bexicontext.xml";
        var doc = null;
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_contextRequest");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "xml", "ob_type", "OPENBEXI_PRIVATE_CONTEXT_XML");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "xml", "filename", "private_bexicontext.xml");
        var ob_xml = openbexi_get_xmlString(doc);
        var mode_sync = openbexi_synchron();
        openbexi_connect_to_server(null, mode_sync, ob_xml, load_openbexiBuilder_CB);
    }
    catch (e) {
        alert("load_openbexiBuilder():" + e.message + "\nfile=" + file);
    }
}
function load_openbexiBuilder_CB(responseXML) {
    try {
        var ob_doc;
        openbexiNavigator = new openbexi_navigator("main_navigator");
        if (responseXML != null)ob_doc = openbexi_get_documentElement(responseXML, "text/xml");
        openbexi_set_OPENBEXI_PRIVATE_CONTEXT_XML(get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "OPENBEXI_PRIVATE_CONTEXT_XML", "text"));
        if (OPENBEXI_PRIVATE_CONTEXT_XML == null || OPENBEXI_PRIVATE_CONTEXT_XML == "") openbexi_set_OPENBEXI_PRIVATE_CONTEXT_XML(OPENBEXI_PUBLIC_CONTEXT_XML);

        ob_doc = openbexi_get_documentElement(OPENBEXI_PRIVATE_CONTEXT_XML, "text/xml");
        var lang = get_xml_classe_object_attribut_value(ob_doc, "bexicontext", "language", "name");
        if (lang == "")lang = "en";
        openbexi_setLanguage(lang);
        //load_openbexiObject(null, true, true);

        if (screen.width > 1350)
            window.resizeTo(1350, screen.height);
        else
            window.resizeTo(screen.width, screen.height);
        window.moveTo(0, 0);
        if (openbexiNavigator) {
            openbexiNavigator.top_frame_message("Open BEXI : " + openbexi_code_version, "45px", "info");
            openbexiNavigator.update_menu_editor(openbexiBody, false);
            openbexiNavigator.project(null);
            openbexiNavigator.set_working_status(false);
            openbexiNavigator.go_to_the_last_webPage(null);
        }
    } catch (e) {
        __openbexi_debugC("load_openbexiBuilder_CB()", "Exception:" + e.message);
    }
}
function openbexi_load_hiddenDiv() {
    try {
        var str = '';
        str += '<div id=preloadLYR';
        str += '     style="Z-INDEX: 999; LEFT: 1px; VISIBILITY: hidden; WIDTH: 360px; POSITION: absolute; TOP: 1px; HEIGHT: 115px">';
        str += '    <IMG height=60 width=60>';
        str += '<\/div>';
        document.body.innerHTML += str;
    } catch (e) {
        __openbexi_debugC("openbexi_load_hiddenDiv()", "Exception:" + e.message);
    }
}
function load_openbexiBody() {
    try {
        openbexiBody = new openbexi_body("BODY", false);
        save_openbexi_object(openbexiBody, "false");
    } catch (e) {
        __openbexi_debugC("load_openbexiBody()", "Exception:" + e.message);
    }
}
function load_openbexiObject(myDocumentElementdiv, reloadGrip, optimize) {
    //var ob_debug1 = "";
    if (reloadGrip == undefined) reloadGrip = true;
    var findObj = false;
    if (myDocumentElementdiv == null) myDocumentElementdiv = document.getElementsByTagName("div");

    var background = openbexi_getPageData(null, "page", "body", "background");
    getSelectedBexiObj("BODY").setAttribute("background", background);
    var bgColor = openbexi_getPageData(null, "page", "body", "bgColor");
    if (bgColor == "null" || bgColor == "")    bgColor = "#ffffff";
    getSelectedBexiObj("BODY").setAttribute("bgColor", bgColor);
    var backgroundImage = openbexi_getPageData(null, "page", "body", "backgroundImage");
    if (backgroundImage == "") {
        if (background == "")  background = "#ffffff"
        getSelectedBexiObj("BODY").setAttribute("background", background);
    } else
        getSelectedBexiObj("BODY").setAttribute("backgroundImage", backgroundImage);
    var backgroundRepeat = openbexi_getPageData(null, "page", "body", "backgroundRepeat");
    if (backgroundRepeat == "null" || backgroundRepeat == "")    backgroundRepeat = "none";
    getSelectedBexiObj("BODY").setAttribute("backgroundRepeat", backgroundRepeat);

    for (var i = 0; i < myDocumentElementdiv.length; i++) {
        try {
            var idObj = myDocumentElementdiv.item(i).id;
            //ob_debug1 += i + ":" + idObj + "\n";
            if (optimize && idObj == "preloadLYR")break;
            if (!protectedObject(idObj)) {
                //ob_debug1 += "  " + idObj + "\n";
                findObj = true;
                var objDiv = document.getElementById(idObj);
                var objDivId = null;
                if (objDiv != null)objDivId = objDiv.id;
                var objChild = objDiv.childNodes[0];
                if (objDiv.childNodes.length > 1 && objChild.id == undefined) objChild = objDiv.childNodes[1];
                var objChildId = null;
                if (objChild != null)objChildId = objChild.id;
                var objParentDiv = objDiv.parentNode;
                var bexiObjectParent = null;
                var objParentDivId = null;
                if (objParentDiv != null) {
                    objParentDivId = objParentDiv.id;
                    if (objParentDivId != "" && objParentDivId != "undefined") {
                        bexiObjectParent = getSelectedBexiObj(objParentDivId);
                    }
                }
                if (objDiv.getAttribute("CLASSE") == "DIV") {
                    var div = new openbexi_div(bexiObjectParent, objDiv, objDivId, 0, 0, 0, 0);
                    save_openbexi_object(div, false);
                }
                else if (objDiv.getAttribute("CLASSE") == "DIV_BUTTON") {
                    var button = new openbexi_button(bexiObjectParent, objDiv, objChildId, 0, 0, 0, 0);
                    save_openbexi_object(button, false);
                }
                else if (objDiv.getAttribute("CLASSE") == "DIV_CLOCK") {
                    var clock = new openbexi_clock(bexiObjectParent, objDiv, objDivId, 0, 0, 0, 0);
                    save_openbexi_object(clock, false);
                }
                else if (objDiv.getAttribute("CLASSE") == "DIV_CALENDAR") {
                    var calendar = new openbexi_calendar(bexiObjectParent, objDiv, objDivId, 0, 0, 0, 0);
                    save_openbexi_object(calendar, false);
                }
                else if (objDiv.getAttribute("CLASSE") == "DIV_FISHEYE") {
                    var fisheye = new openbexi_fisheye(bexiObjectParent, objDiv, objDivId, 0, 0, 0, 0);
                    save_openbexi_object(fisheye, false);
                }
                else if (objDiv.getAttribute("CLASSE") == "DIV_TIMELINE") {
                    var timeline = new openbexi_timeline(bexiObjectParent, objDiv, objDivId, 0, 0, 0, 0);
                    save_openbexi_object(timeline, false);
                }
                else if (objDiv.getAttribute("CLASSE") == "DIV_CHART") {
                    var chart = new openbexi_chart(bexiObjectParent, objDiv, objChildId, objChild.src, 0, 0, 0, 0, true);
                    save_openbexi_object(chart, false);
                }
                else if (objDiv.getAttribute("CLASSE") == "DIV_DYGRAPHS") {
                    var dygraphs = new openbexi_dygraphs(bexiObjectParent, objDiv, objChildId, objChild.src, 0, 0, 0, 0, true);
                    save_openbexi_object(dygraphs, false);
                }
                else if (objDiv.getAttribute("CLASSE") == "DIV_IMG") {
                    var img;
                    if (reloadGrip) {
                        if (objChildId != null) {
                            img = new openbexi_img(bexiObjectParent, objDiv, objChildId, objChild.src, 0, 0, 0, 0, true);
                        } else {
                            img = new openbexi_img(bexiObjectParent, objDiv, null, null, 0, 0, 0, 0, true);
                        }
                        save_openbexi_object(img, false);
                    }
                    if (objChildId != null) {
                        img = new openbexi_img(bexiObjectParent, objDiv, objChildId, objChild.src, 0, 0, 0, 0, true);
                    } else {
                        img = new openbexi_img(bexiObjectParent, objDiv, null, null, 0, 0, 0, 0, true);
                    }
                    save_openbexi_object(img, false);
                }
                else if (objDiv.getAttribute("CLASSE") == "DIV_LINE") {
                    var line = new openbexi_line(bexiObjectParent, objDiv, objChildId, 0, 0, 0, 0);
                    save_openbexi_object(line, false);
                }
                else if (objDiv.getAttribute("CLASSE") == "DIV_LINK") {
                    var link = new openbexi_link(bexiObjectParent, objDiv, objChildId, 0, 0, 0, 0);
                    save_openbexi_object(link, false);
                }
                else if (objDiv.getAttribute("CLASSE") == "DIV_LIST") {
                    var list = new openbexi_list(bexiObjectParent, objDiv, objChildId, 0, 0, 0, 0);
                    save_openbexi_object(list, false);
                }
                else if (objDiv.getAttribute("CLASSE") == "DIV_TREE") {
                    var tree = new openbexi_tree(bexiObjectParent, objDiv, objDivId, 0, 0, 0, 0);
                    save_openbexi_object(tree, false);
                }
                else if (objDiv.getAttribute("CLASSE") == "DIV_CHARTFLOW") {
                    var chartflow = new openbexi_chartFlow(bexiObjectParent, objDiv, objDivId, 0, 0, 0, 0, true);
                    save_openbexi_object(chartflow, false);
                }
                else if (objDiv.getAttribute("CLASSE") == "DIV_MEDIAS") {
                    var medias = new openbexi_medias(bexiObjectParent, objDiv, objChildId, "", 0, 0, 0, 0);
                    save_openbexi_object(medias, false);
                }
                else if (objDiv.getAttribute("CLASSE") == "DIV_PAGER") {
                    var pager = new openbexi_pager(bexiObjectParent, objDiv, objDivId, 0, 0, 0, 0, 0, 10, "dynamic");
                    save_openbexi_object(pager, false);
                }
                else if (objDiv.getAttribute("CLASSE") == "DIV_DOJOTEXTAREA" || objDiv.getAttribute("CLASSE") == "DIV_FCKTEXTAREA") {
                    var textF = new openbexi_dojo_editor(bexiObjectParent, objDiv, objDivId, 0, 0, 0, 0, "none", "");
                    save_openbexi_object(textF, false);
                }
                else if (objDiv.getAttribute("CLASSE") == "DIV_FORM") {
                    var form = new openbexi_form(bexiObjectParent, objDiv, objDivId, 0, 0, 0, 0);
                    save_openbexi_object(form);
                }
                else if (objDiv.getAttribute("CLASSE") == "DIV_DOJO") {
                    var dojo = new openbexi_dojo(null, null, null, bexiObjectParent, objDiv, objChildId, 0, 0, 0, 0, "");
                    save_openbexi_object(dojo, false);
                }
                else if (objDiv.getAttribute("CLASSE") == "DIV_PAGE") {
                    var page = new openbexi_page(bexiObjectParent, objDiv, objDivId, 0, 0, 0, 0, undefined);
                    save_openbexi_object(page, false);
                } else {
                    //alert("load_openbexiObject: Sorry cannot load the widget " + objChildId + " from " + idObj)
                }

                //objDiv.style.zIndex = objDiv.obzindex;
                //if (objDiv.style.zIndex == "" || objDiv.style.zIndex == null || objDiv.style.zIndex == undefined) objDiv.obzindex = 0;
                //if (parseInt(objDiv.obzindex) < 0)objDiv.obzindex = 0;
            }
        } catch (e) {
            __openbexi_debugC("load_openbexiObject()", e.message);
        }
    }
    //there rebuild charflow if any
    try {
        if (openbexiNavigator) openbexiNavigator.set_ob_menus_MaxLeft();
        jsPlumb.reset();
        openbexi_rebuildChartFlow("dynamic");
    } catch (e) {
        __openbexi_debugC("load_openbexiObject()", e.message);
    }
    //There set up the right widget menu
    try {
        if (openbexiNavigator && openbexiNavigator.HTML_pageName == "template.html")
            ob_menu_widget = ob_menu_widget_for_template;
        else if (openbexi_getWebPrivateData(null, "bexicontext", "ob_navigator", "mode") == "ob_template")
            ob_menu_widget = ob_menu_widget_for_template;
        else
            ob_menu_widget = ob_menu_widget_for_page;
    } catch (e) {
        __openbexi_debugC("load_openbexiObject()", e.message);
    }
    try {
        ob_sort_openbexi_object();
    } catch (e) {
        __openbexi_debugC("load_openbexiObject()", e.message);
    }
}

function openbexi_nextItem() {
    try {
        if (getSelectedBexiObj(null).id != "BODY") {
            document.getElementById("nameImput").value = getSelectedBexiObj(null).selectNextItem();
        }
    } catch (e) {
        __openbexi_debugC("openbexi_nextItem()", "Exception:" + e.message);
    }
}
function detectPaste(event) {
    try {
        if (event) {
            var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
        }
        if (keyCode == 22 && (window || window.clipboardData) == undefined) {
            if (openbexiNavigator) openbexiNavigator.status("Copy&Paste not supported for this browser", "red");
            return;
        }
        // Setup debugger
        //alert(keyCode)
        if (keyCode == 43) {
            //_OPENBEXI__DEBUG = !_OPENBEXI__DEBUG;
        }
        // Ctrl V -->>> Insert text or HTML code
        if (keyCode == 22) {
            if (window.clipboardData.getData('Text') == null || window.clipboardData == '') return;
            try {
                getSelectedBexiObj(null).pasteText_or_Link();
            } catch (e) {
                alert("detectPaste for " + getSelectedBexiObjId() + "\nopenbexi_builder.pasteText_or_Link():" + e.name + ". Error message: " + e.message);
            }
        }
        // Shift D -->>> duplicate widget
        if (keyCode == 68 && event.x > parseInt(divPropertiesWidth)) {
            try {
                if (getSelectedBexiObj(null).type == "openbexi_body") {
                    currentObjNameSelected = previousObjNameSelected;
                    currentBexiObj_selected = previousBexiObj_selected;
                }
                previousObjNameSelected = currentObjNameSelected;
                previousBexiObj_selected = currentBexiObj_selected;
                if (getSelectedBexiObj(null).type == "openbexi_div") duplicate_HTMLDiv("vertical");
                if (getSelectedBexiObj(null).type == "openbexi_form") alert(openbexi_lang("NotImplemented"));
                if (getSelectedBexiObj(null).type == "openbexi_list") duplicate_HTMLList("vertical");
                if (getSelectedBexiObj(null).type == "openbexi_tree") alert(openbexi_lang("NotImplemented"));
                if (getSelectedBexiObj(null).type == "openbexi_chartFlow") duplicate_HTMLChartFlow("vertical");
                if (getSelectedBexiObj(null).type == "openbexi_dygraphs") alert(openbexi_lang("NotImplemented"));
                if (getSelectedBexiObj(null).type == "openbexi_button") duplicate_HTMLButton("vertical");
                if (getSelectedBexiObj(null).type == "openbexi_text") alert(openbexi_lang("NotImplemented"));
                if (getSelectedBexiObj(null).type == "openbexi_dojo_editor") alert(openbexi_lang("NotImplemented"));
                if (getSelectedBexiObj(null).type == "openbexi_link") duplicate_HTMLLink("vertical");
                if (getSelectedBexiObj(null).type == "openbexi_img") alert(openbexi_lang("NotImplemented"));
                if (getSelectedBexiObj(null).type == "openbexi_clock") duplicate_HTMLClock("vertical");
                if (getSelectedBexiObj(null).type == "openbexi_calendar") duplicate_HTMLCalendar("vertical");
                if (getSelectedBexiObj(null).type == "openbexi_fisheye") alert(openbexi_lang("NotImplemented"));
                if (getSelectedBexiObj(null).type == "openbexi_timeline") alert(openbexi_lang("NotImplemented"));
                if (getSelectedBexiObj(null).type == "openbexi_medias") alert(openbexi_lang("NotImplemented"));
            } catch (e) {
                alert("detectPaste:" + e.name + ". Error message: " + e.message + "\ncurrentObjNameSelected:" + currentObjNameSelected);
            }
        }
    } catch (e) {
        __openbexi_debugC("detectPaste()", "Exception:" + e.message);
    }
}
function ob_move_HTML_page(page) {
    //openbexiExplorer.print_HTML_pageName("ob_move_HTML_page");
    if (page == null) return;
    window.location = page;
    //window.open(page);
}
function openbexi_new_HTML_page() {
    try {
        //openbexiExplorer.print_HTML_pageName("openbexi_new_HTML_page");
        if (openbexiNavigator) {
            var url = openbexiNavigator.getDefaultUrl(null);
            ob_move_HTML_page(url);
        }
    } catch (e) {
        __openbexi_debugC("openbexi_new_HTML_page()", "Exception:" + e.message);
    }
}
// IE HACK: Define _importNode for IE since it doesnt support importNode
// Thanks to Name: Xavier Amado  Location: Capital Federal, Buenos Aires, Argentina
if (!document.importNode) {
    document._importNode = function (oNode, bImportChildren) {
        var oNew;

        if (oNode.nodeType == 1) {
            oNew = document.createElement(oNode.nodeName);

            for (var i = 0; i < oNode.attributes.length; i++) {
                if (oNode.attributes[i].nodeValue != null && oNode.attributes[i].nodeValue != '') {
                    var attrName = oNode.attributes[i].name;

                    if (attrName == "class")
                        oNew.setAttribute("className", oNode.attributes[i].value);
                    else
                        oNew.setAttribute(attrName, oNode.attributes[i].value);
                }
            }

            if (oNode.style != null && oNode.style.cssText != null)
                oNew.style.cssText = oNode.style.cssText;
        }
        else if (oNode.nodeType == 3) {
            oNew = document.createTextNode(oNode.nodeValue);
        }

        if (bImportChildren && oNode.hasChildNodes()) {
            for (var oChild = oNode.firstChild; oChild; oChild = oChild.nextSibling) {
                oNew.appendChild(document._importNode(oChild, true));
            }
        }

        return oNew;
    }
}
// IE HACK (end)

function openbexi_open_HTML_page(project, url, ob_doc) {
    try {
        var previous_project = openbexiNavigator.projectName;
        var previous_page = openbexiNavigator.HTML_pageName;
        if (dirty_flag) {
            //var answer = window.confirm("project:" + previous_project + "\npage:" + previous_page + "\nDo you want to save the current WEB page before opening a new one?")
            //if (answer) {
            // openbexi_save_HTML_page(false, "true", "true");
            //}
            ob_savePage.ob_state.html = '<label>project:' + previous_project + '<br />page:' + previous_page + '</label><br />' + 'Do you want to save the current WEB page before opening a new one?</label><br />';
            openbexiNavigator.prompt(null, ob_savePage);
            ob_setDirty_flag(false);
        }
        if (url == null) {
            url = openbexi_system.openbexi_loadBrowser();
        }

        if (ob_doc != null) {

            var genericObject = new openbexi_generic_object(null);
            genericObject.removeObjects();
            var firstNode = document.getElementById("preloadLYR");
            //if (openbexiNavigator) openbexiNavigator.status("Loading page ...", "#abff4b");
            var page_data = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "OPENBEXI_PAGES_DATA_XML", "text");
            if (page_data == "") page_data = OPENBEXI_PRIVATE_CONTEXT_XML;
            openbexi_set_OPENBEXI_PAGES_DATA_XML(page_data);
            var page_template = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "OPENBEXI_TEMPLATE_DATA_XML", "text");
            if (page_template != "") reconcile_OPENBEXI_PAGES_DATA_XML(page_template);
            try {
                var bgColor = openbexi_getPageData(null, "page", "body", "bgColor");
                if (bgColor == "")    bgColor = "#ffffff";
                getSelectedBexiObj("BODY").setAttribute("bgColor", bgColor);
                var background = openbexi_getPageData(null, "page", "body", "background");
                getSelectedBexiObj("BODY").setAttribute("background", background);
                var backgroundRepeat = openbexi_getPageData(null, "page", "body", "backgroundRepeat");
                getSelectedBexiObj("BODY").setAttribute("backgroundRepeat", backgroundRepeat);
                var backgroundImage = openbexi_getPageData(null, "page", "body", "backgroundImage");
                getSelectedBexiObj("BODY").setAttribute("backgroundImage", backgroundImage);
            } catch (e) {
                __openbexi_debugC("openbexi_open_HTML_page()", e.message);
            }
            var iframe = document.createElement("div");
            iframe.innerHTML = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file", "text");
            var iframeTags = iframe.getElementsByTagName("div");
            for (var i = 0; i < iframeTags.length; i++) {
                try {
                    if (iframeTags.item(i).parentNode.id == "") {
                        var newNode;
                        // This is for Firefox/Opera and the later for IE
                        if (document.importNode)
                            newNode = document.importNode(iframeTags.item(i), true);
                        else
                            newNode = document._importNode(iframeTags.item(i), true);
                        document.body.insertBefore(newNode, firstNode);
                    }
                } catch (e) {
                    __openbexi_debugC("openbexi_open_HTML_page()", e.message);
                }
            }
            load_openbexiObject(iframeTags, false, false);
            iframe.innerHTML = "";

            // Read css file
            //openbexi_load_JS_CSS_file("project/" + openbexiNavigator.HTML_short_pageName + "/css/" + openbexiNavigator.HTML_short_pageName + ".css", "css");

            set_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file", "text", "");
            set_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "OPENBEXI_PAGES_DATA_XML", "text", "");
            set_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "OPENBEXI_PRIVATE_CONTEXT_XML", "text", "");
            if (openbexiNavigator.waiting_for_template) {
                var answer = window.confirm("Do you want create a new page from the template:\n" + openbexiNavigator.HTML_pageName + "?");
                if (answer) {
                    openbexiNavigator.HTML_pageName = prompt("Creating a new page from the template: " + openbexiNavigator.HTML_pageName + "\n\nDefault name = no_name\n", "no_name");
                    openbexiNavigator.HTML_pageName = openbexi_clearText(openbexiNavigator.HTML_pageName);
                    if (openbexiNavigator.HTML_pageName == null || openbexiNavigator.HTML_pageName == "") {
                        openbexiNavigator.HTML_pageName = "no_name.html";
                    }
                    openbexiNavigator.HTML_pageName = openbexiNavigator.HTML_pageName.replace("\.html", "");
                    openbexiNavigator.HTML_pageName = openbexi_clearText(openbexiNavigator.HTML_pageName);
                    if (openbexiNavigator.HTML_pageName == null || openbexiNavigator.HTML_pageName == "") {
                        openbexiNavigator.HTML_pageName = "no_name.html";
                    }
                    openbexiNavigator.HTML_pageName = openbexiNavigator.HTML_pageName + ".html";
                    openbexiNavigator.waiting_for_template = false;
                    var doc = openbexiNavigator.setDataServer(ob_doc, "overwrite_HTMLPageFromTemplate", openbexiNavigator.path, "none", 0, "dir", openbexiNavigator.HTML_pageName, "", openbexiNavigator.divName, openbexiNavigator.maxItems);
                    openbexiNavigator.getdataFromServer("overwrite_HTMLPageFromTemplate", doc);
                }
            }
            if (openbexiNavigator.waiting_for_archive) {
                var answer = window.confirm("Do you want to overwrite the current WEB page:\n" + previous_page + " (project:" + previous_project + ")\n\nby the older version:\n" + openbexiNavigator.HTML_pageName + "?");
                if (answer) {
                    openbexiNavigator.waiting_for_archive = false;
                    var doc;
                    if (openbexiNavigator.mode == "archiveTemplates") {
                        doc = openbexiNavigator.setDataServer(ob_doc, "overwrite_HTMLTemplateFromArchive", openbexiNavigator.path, "none", 0, "dir", "", openbexiNavigator.HTML_pageName, openbexiNavigator.divName, openbexiNavigator.maxItems);
                        openbexiNavigator.getdataFromServer("overwrite_HTMLTemplateFromArchive", doc);
                    } else {
                        doc = openbexiNavigator.setDataServer(ob_doc, "overwrite_HTMLPageFromArchive", openbexiNavigator.path, "none", 0, "dir", openbexiNavigator.HTML_pageName, "", openbexiNavigator.divName, openbexiNavigator.maxItems);
                        openbexiNavigator.getdataFromServer("overwrite_HTMLPageFromArchive", doc);
                    }
                }
            }
        }
        else
            setTimeout('ob_move_HTML_page(openbexiNavigator.HTML_pageName)', 1000);
    } catch (e) {
        __openbexi_debugC("openbexi_open_HTML_page()", "Exception:" + e.message);
    }
}
function openbexi_saveAs_HTML_page() {
    try {
        dirty_flag = true;
        document.getElementById("pageNameInput").value = "no_name.html";
        openbexi_save_HTML_page(false, "true", "true");
    } catch (e) {
        __openbexi_debugC("openbexi_saveAs_HTML_page()", "Exception:" + e.message);
    }
}
function openbexi_onunload() {
    try {
        if (dirty_flag) {
            var answer = window.confirm("<b>Current project:</b>" + openbexiNavigator.projectName + "\n<b>Page:</b>" + openbexiNavigator.HTML_pageName + "\nThis page has been recently updated\nDo you want to save this WEB page?");
            if (answer) {
                openbexi_save_HTML_page(false, "true", "true");
            }
            ob_setDirty_flag(false);
        }
    }
    catch (e) {
        __openbexi_debugC("openbexi_onunload()", e.message);
    }
}
function openbexi_onBeforeUnload() {
    try {
        if (dirty_flag) {
            var answer = window.confirm("Project:" + openbexiNavigator.projectName + "\nPage:" + openbexiNavigator.HTML_pageName + "\nThis page has been recently updated\nDo you want to save this WEB page?");
            if (answer) {
                openbexi_save_HTML_page(false, "true", "true");
            }
            ob_setDirty_flag(false);
        }
    }
    catch (e) {
        __openbexi_debugC("openbexi_onBeforeUnload()", e.message);
    }
}
function openbexi_save_bexicontext() {
    try {
        if (openbexiNavigator) {
            openbexi_updateWebPrivateData(null, "bexicontext", "mode", "name", openbexiNavigator.mode);
            openbexi_updateWebPrivateData(null, "bexicontext", "project", "name", openbexiNavigator.projectName);
            openbexi_updateWebPrivateData(null, "bexicontext", "page", "name", openbexiNavigator.HTML_pageName);
            if (openbexiNavigator.mode == "templates")
                openbexi_updateWebPrivateData(null, "bexicontext", "project", "name", openbexiNavigator.templateCategory);
        }
    } catch (e) {
        __openbexi_debugC("openbexi_save_bexicontext()", e.message);
    }
}
function openbexi_save_HTML_page(movePage, alertuser) {
    try {
        if (!dirty_flag && !movePage) {
            return;
        }
        ob_setDirty_flag(false);
        if (alertuser == undefined)  alertuser = "true";
        // Unselect curent item and hide grips if needed
        getSelectedBexiObj(null).setUnSelected(getSelectedBexiObj(null).id);

        // Get page names
        //if (document.getElementById("bexicontext_page_name") != null)
        //openbexiNavigator.HTML_pageName = document.getElementById("bexicontext_page_name").value;
        //openbexiNavigator.HTML_pageName = openbexi_clearText(openbexiNavigator.HTML_pageName);
        openbexiNavigator.set_webPageName(openbexiNavigator.HTML_pageName.replace(".html", ""));
        if (openbexiNavigator.HTML_pageName == null || openbexiNavigator.HTML_pageName == "" || openbexiNavigator.HTML_pageName == "openbexi.do") {
            openbexiNavigator.HTML_pageName = "no_name.html";
        }
        openbexiNavigator.HTML_pageName = openbexiNavigator.HTML_pageName.replace("\.html", "");
        openbexiNavigator.HTML_pageName = openbexi_clearText(openbexiNavigator.HTML_pageName);
        if (openbexiNavigator.HTML_pageName == null || openbexiNavigator.HTML_pageName == "")
            openbexiNavigator.HTML_pageName = "no_name.html";
        openbexiNavigator.HTML_pageName = openbexiNavigator.HTML_pageName + ".html";
        openbexiNavigator.HTML_short_pageName = openbexiNavigator.HTML_pageName.replace(".html", "");

        // Create HTML code
        updateAllDiv(divPropertiesWidth, divPropertiesTop, "-");
        try {
            openbexi_saveChartFlow();
        } catch (e) {
            __openbexi_debugC("openbexi_save_HTML_page()", "Exception:" + e.message);
        }
        var htmlCode = "\n" + get_HTML_page(false);
        updateAllDiv(divPropertiesWidth, divPropertiesTop, "+");

        //openbexi_showHTMLCode();
        var doc = null;
        var navigator_mode = openbexi_getWebPrivateData(null, "bexicontext", "ob_navigator", "mode");
        if (document.getElementById("ob_project"))
            var typeProject = document.getElementById("ob_project").innerHTML;
        if (typeProject.match("Project") != null)
            if (openbexiNavigator) openbexiNavigator.set_mode("projects");
            else if (openbexiNavigator) openbexiNavigator.set_mode("templates");
        if (navigator_mode == "ob_template") {
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "templateCategory", openbexiNavigator.templateCategory);
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "subtype", "webPageTemplates");
        }
        else {
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "project", openbexiNavigator.projectName);
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "subtype", "webPages");
        }
        if (movePage != null) {
            if (movePage) {
                doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_saveFile_and_testRequest");
            } else {
                doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_saveFileRequest");
            }
        } else {
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_save_and_newFileRequest");
        }
        doc = set_xml_classe_object_attribut_value(doc, "file", "html", "name", openbexiNavigator.HTML_pageName);
        //doc = set_xml_classe_object_attribut_value(doc, "file", "xml", "name", "project/" + openbexiNavigator.projectName + "/data/" + openbexiNavigator.HTML_short_pageName + ".xml");
        doc = set_xml_classe_object_attribut_value(doc, "file", "html", "alertuser", alertuser);
        var ob_xml = openbexi_get_xmlString(doc);
        try {
            if (openbexiNavigator) {
                openbexi_save_bexicontext();
            }
            //openbexi_savePageData(null);
            var mode_sync = openbexi_synchron();
            openbexi_connect_to_server(null, mode_sync, ob_xml + htmlCode, openbexi_saveFile_CB, "ob_menu_FileBrowser_head", "Saving Webpage ...");
        } catch (e) {
            __openbexi_debugC("openbexi_save_HTML_page()", "Exception:" + e.message);
        }

    } catch (e) {
        __openbexi_debugC("openbexi_save_HTML_page()", "Exception:" + e.message);
    }
}
function openbexi_saveFile_CB(responseXML) {
    try {
        openbexi_unloading2();

        var ob_doc = openbexi_get_documentElement(responseXML, "text/xml");
        var status = get_xml_classe_object_attribut_value(ob_doc, "openbexi_creative", "application", "status");
        if (status != "ok") {
            __openbexi_debugC("openbexi_saveFile_CB()", "Error:" + "Cannot save file");
            return;
        } else {
            __openbexi_debugC("openbexi_saveFile_CB()", "Info:" + "File successfully saved");
        }
        var subtype = get_xml_classe_object_attribut_value(ob_doc, "ob_request", "request", "subtype");
        var projectName = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "dir", "project");
        var current_page = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "dir", "filename");

        if (openbexiNavigator.mode == "save_before_publishing")
            openbexiNavigator.publish("publish2server");
        else if (openbexiNavigator.mode == "save_project_before_publishing")
            openbexiNavigator.publish("publish_project2server");
        else if (openbexiNavigator.New_HTML_pageName != undefined && openbexiNavigator.New_HTML_pageName != "") {
            openbexiNavigator.open_web_project_page(openbexiNavigator.New_projectName, openbexiNavigator.New_HTML_pageName, false);
            openbexiNavigator.New_HTML_pageName = "";
            openbexiNavigator.New_projectName = "";
        } else if (subtype == "save_new_web_page") {
            openbexiNavigator.open_web_project_page(projectName, current_page, false);
        }
        else {
            var action_type = get_xml_classe_object_attribut_value(ob_doc, "ob_request", "request", "type");
            var url_default = get_xml_classe_object_attribut_value(ob_doc, "file", "html", "url_default");
            ob_setDirty_flag(false);
            //openbexiNavigator.reset_top_frame_message();
            openbexi_savePrivateData(null);
            //openbexi_savePageData(null);
            if (action_type == "openbexi_saveFile_and_testRequest") {
                ob_move_HTML_page(url_default);
            }
            openbexiNavigator.window_factory(null, 'ob_menu_RequestBrowser', null, 'hidden');
            openbexiNavigator.top_frame_message("Project \"" + openbexiNavigator.projectName + "\" successfully saved", "40px", "info");
        }
    }
    catch (e) {
        __openbexi_debugC("openbexi_saveFile_CB()", "Exception:" + e.message);
    }
}
function updateAllDiv(newPosLeft, newPosTop, flag) {
    try {
        var divArray = new Array();
        var count = 0;
        for (var i = 0; i < openbexi_object.length; i++) {
            if (openbexi_object[i].id != "BODY") {
                var objDiv = openbexi_object[i].div;
                var objPage = objDiv.parentNode;
                if (objDiv.id == "" || objDiv.id == "undefined")objDiv = null;
                if (objPage == null || objPage.id == "" || objPage.id == "undefined")objPage = null;
                if (objDiv != null && openbexi_object[i].type != "openbexi_page" && objPage == null) {
                    divArray[count] = openbexi_object[i].parent;
                    count++;
                }
                if (openbexi_object[i].type == "openbexi_page" && openbexi_object[i].parentNodeId == "BODY") {
                    divArray[count] = openbexi_object[i].parent;
                    count++;
                }
                if (objDiv == null && objPage == null && openbexi_object[i].type != "openbexi_page") {
                    divArray[count] = openbexi_object[i].parent;
                    count++;
                }
            }
        }
        for (i = 0; i < count; i++) {
            var id = divArray[i];
            var obj = document.getElementById(id);
            if (flag == "+") {
                obj.style.left = (parseInt(obj.style.left) + parseInt(newPosLeft)) + "px";
                obj.style.top = (parseInt(obj.style.top) + parseInt(newPosTop)) + "px";
            }
            else {
                obj.style.left = (parseInt(obj.style.left) - parseInt(newPosLeft)) + "px";
                obj.style.top = (parseInt(obj.style.top) - parseInt(newPosTop)) + "px";
            }
        }
    } catch (e) {
        __openbexi_debugC("updateAllDiv()", "Exception:" + e.message);
    }
}
function updatePageName(obj, event) {
    try {
        var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
        if (keyCode == 13) {
            openbexiNavigator.HTML_pageName = document.getElementById("pageNameInput").value;
            openbexiNavigator.HTML_pageName = openbexi_clearText(openbexiNavigator.HTML_pageName)
            if (openbexiNavigator.HTML_pageName == null || openbexiNavigator.HTML_pageName == "") {
                openbexiNavigator.HTML_pageName = "no_name.html";
            }
        }
    } catch (e) {
        __openbexi_debugC("updatePageName()", "Exception:" + e.message);
    }
}

function about_us() {
    alert("\nOPEN BEXI htmlbuilder\n  version " + openbexi_code_version + "\n\n The latest version is available at http://www.openbexi.com\n\n contact: htmlbuilder@openbexi.com");
}
function openbexi_error(flag) {
}
function openbexi_update_Properties() {
}
