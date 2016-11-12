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

//Constants
var OB_DEBUG = false;
var OB_DEBUG2 = false;

var OB_LOADING = 0;
var OB_LOADED = 1;

var OB_NO_FILTER = 0;
var OB_FILTER_PER_RESSOURCE_TYPE = 1;
var OB_FILTER_PER_EVENT_TYPE = 2;
var OB_FILTER_PER_EVENT_TYPE = [];
var OB_FILTER_PER_EVENT_TYPE = [];

var OB_TIMELINE_SERVER_STANDBY = 0;
var OB_TIMELINE_SERVER_CONNECTED = 1;
var OB_TIMELINE_SERVER_NOT_CONNECTED = 2;

var OB_SHOW_ON = 0;
var OB_SHOW_OFF = 1;

var local_timeline_id;

var ob_monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
var ob_dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var ob_timeline_popupAttributes = [
    ['menuitem2', 'openbexi_showEventXMLEditor(event)'  , 'loadXML', 'gif\/ob_xml_x48.png', '48px', '48px'],
    ['menuitem17', 'openbexiNavigator.javascript(event, false);', 'Add_javascript_to_timeline'  , 'gif\/javascript_x48.png', '48px', '48px'],
    ['menuitem37', 'this.setBubble(event)' , 'setBubble', 'gif\/ob_bubble_x64.png', '48px', '48px'],
    ['menuitem24', 'openbexi_display_event_editor(event)'  , 'addEvent', 'gif\/events.png', '48px', '48px'],
    ['menuitem26', 'this.removeEvents(event)', 'removeEvents', 'gif\/removeEvents.png', '48px', '48px'],
    ['menuitem27', 'this.setZone(event)'  , 'setZones', 'gif\/zones.png', '48px', '48px'],
    ['menuitem30', 'this.editBand(event)'   , 'editBand', 'gif\/bands.png', '48px', '48px'],
    ['menuitem35x', 'this.editThemes(event)'  , 'editThemes', 'gif\/themes.png', '48px', '48px'],
    ['menuitem36', 'this.setTimeout(event)' , 'setTimeout', 'gif\/settimeout.png', '48px', '48px'],
    ['menuitem38', 'this.backward()'          , 'SendToBack'  , 'gif\/move_backward_x48.png', '48px', '48px'],
    ['menuitem40', 'this.forward()'           , 'BringToFront', 'gif\/move_forward_x48.png', '48px', '48px'],
    ['menuitem46', 'this.removeObject(true);openbexiNavigator.update_menu_editor(null, false);', 'DlgSelectBtnDelete', 'gif\/simile_delete_x48.png', '48px', '48px'],
];
var ob_event_editor = [
    ['menu_RequestBrowser', 'ob_menu_RequestBrowser', '', '', '', '', '', 'Event Editor', '', '750px', '550px', '', ''],
    ['window_left', 'ob_menu_RequestBrowser_sub_left', '', '', '', '', '', '', '', '', '', 'overflow: auto;position:absolute;width:0%;', ''],
    ['end_window_left', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_body', 'ob_menu_RequestBrowser_sub', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow: auto;position:absolute;width:100%;', ''],
    ['form', 'ob_form', '', '', '', '', '', '', '', '', '', 'position:absolute;left:0px;', ''],
    ['fieldset', 'ob_fieldset', '', '', '', '', '', '', '', '', '', 'width:650px', ''],
    ['legend', '', '', '', '', '', '', 'Event Editor', '', '', '', '', ''],
    ['textarea', 'bexicontext_event_data', '', '', '', '', '', 'Event', '', '', '', '', '13'],
    ['end_form', '', '', '', '', '', '', ' name', '', '', '', '', ''],
    ['end_window_body', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_foot', 'ob_menu_RequestBrowser_sub_foot', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow: hidden;position:absolute;height:25%', ''],
    ['set_button', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['ok', '', 'onclick="openbexi_update_event_editor();"', '', 'onmousedown="src=\'gif/ob_ok_down.png\';"', 'onmouseover="src=\'gif/ob_ok_on.png\';"', 'onmouseout="src=\'gif/ob_ok.png\';"', 'Apply', '', '', '', '', ''],
    ['cancel', '', 'onclick="openbexiNavigator.window_factory(event,\'ob_menu_RequestBrowser\',null,\'hidden\');"', '', 'onmousedown="src=\'gif/ob_cancel_down.png\';"', 'onmouseover="src=\'gif/ob_cancel_on.png\';"', 'onmouseout="src=\'gif/ob_cancel.png\';"', 'Cancel', '', '', '', '', ''],
    ['endset_button', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_window_foot', '', '', '', '', '', '', '', '', '', '', '', '']
];
var ob_load_events = [
    ['menu_RequestBrowser', 'ob_menu_RequestBrowser', '', '', '', '', '', 'Events browser', '', '550px', '350px', '', ''],
    ['window_left', 'ob_menu_RequestBrowser_sub_left', '', '', '', '', '', '', '', '', '', 'overflow: auto;position:absolute;width:0%;', ''],
    ['end_window_left', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_body', 'ob_menu_RequestBrowser_sub', '', '', '', '', '', '', '', '', '', 'overflow: auto;position:absolute;width:100%;', ''],
    ['form', 'ob_form', '', '', '', '', '', '', '', '', '', 'position:absolute;left:0px;', ''],
    ['fieldset', 'ob_fieldset', '', '', '', '', '', '', '', '', '', '', ''],
    ['legend', '', '', '', '', '', '', 'Load events', '', '', '', '', ''],
    ['input', 'bexicontext_event_mode', '', '', '', '', '', 'local or remote', '', '', '', '', '13'],
    ['input', 'bexicontext_event_xml_data', 'this.style.background=\'red\';', '', '', '', '', 'XML file name', '', '', '', 'background-image: url(\"gif/fading_background_2_red.png\";);', '1'],
    ['sep', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_fieldset', 'ob_fieldset', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_form', '', '', '', '', '', '', ' name', '', '', '', '', ''],
    ['end_window_body', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_foot', 'ob_menu_RequestBrowser_sub_foot', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow: hidden;position:absolute;height:35%', ''],
    ['set_button', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['ok', '', 'onclick="getSelectedBexiObj(null).loadXML(undefined,true);openbexiNavigator.window_factory(event,\'ob_menu_RequestBrowser\',null,\'hidden\');"', '', 'onmousedown="src=\'gif/ob_ok_down.png\';"', 'onmouseover="src=\'gif/ob_ok_on.png\';"', 'onmouseout="src=\'gif/ob_ok.png\';"', 'Save', '', '', '', '', ''],
    ['cancel', '', 'onclick="openbexiNavigator.window_factory(event,\'ob_menu_RequestBrowser\',null,\'hidden\');"', '', 'onmousedown="src=\'gif/ob_cancel_down.png\';"', 'onmouseover="src=\'gif/ob_cancel_on.png\';"', 'onmouseout="src=\'gif/ob_cancel.png\';"', 'Cancel', '', '', '', '', ''],
    ['endset_button', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_window_foot', '', '', '', '', '', '', '', '', '', '', '', '']
];

var ob_timeline_inspectorAttributes = [
    ['editor'         , 'TimelineEditor'   , 'true']
];
function __openbexi_debugC_timeline(f, text) {
    try {
        __openbexi_debugC(f, text);
    } catch (e) {
    }
}
var openbexi_timelines = new Array();
function ob_save_timelines(timeline) {
    try {
        var timelineC = ob_get_timelines(timeline.id);
        if (timelineC != null) return;
        var length = openbexi_timelines.length;
        openbexi_timelines[length] = timeline;
    } catch (e) {
        __openbexi_debugC("ob_save_timelines()", "Exception:" + e.message);
    }
}
function ob_get_timelines(name) {
    try {
        for (var i = openbexi_timelines.length - 1; i >= 0; i--) {
            if (openbexi_timelines[i] != null && openbexi_timelines[i].id == name) {
                return openbexi_timelines[i];
            }
        }
    } catch (e) {
        __openbexi_debugC("ob_get_timelines()", "Exception:" + e.message);
    }
    return null;
}
function ob_remove_timelines(name) {
    try {
        for (var i = openbexi_timelines.length - 1; i >= 0; i--) {
            if (openbexi_timelines[i] != null && openbexi_timelines[i].id == name) {
                openbexi_timelines[i] = null;
            }
        }
    } catch (e) {
        __openbexi_debugC("ob_remove_timelines()", "Exception:" + e.message);
    }
    return null;
}
var openbexi_timeline = function (bexiObj, obj, name, top, left, width, height) {
    try {
        try {
            if (openbexiNavigator)
                this.openbexiNavigator = openbexiNavigator;
            else
                this.openbexiNavigator = new openbexi_navigator();
        } catch (e) {
        }
        this.name = name;
        this.id = name;

        this.index = new Array();

        this.server_status = OB_TIMELINE_SERVER_NOT_CONNECTED;
        this.load = 500;
        this.initLoad = true;
        this.loadingTimer;
        this.loadTime = 0;
        this.eventGetCount = 0;
        this.ob_loaded_interval = 0;
        this.ob_loading_interval = 0;
        this.ob_lost_connection_interval = 0;
        this.reload = true;
        this.load_status = OB_LOADED;

        this.store = null;
        this.range = 100;
        this.current_range = 0;
        this.count_max = 0;
        this.mode = "local";
        this.view_mode = "grant";
        this.template_mode = "themes";
        this.loadFile = "true";
        this.resync = "false";
        this.type = "openbexi_timeline";
        this.EventsXmlFile = "";
        this.timeout = 0;
        this.timeline = null;
        this.start_date = "currentTime";
        this.end_date = "currentTime";
        this.bubble = null;
        this.eventSources = null;
        this.ob_timeline_height = "800px";

        //User/role/group
        this.user = "";
        this.role = "";
        this.group = "";

        //Cursors
        this.resync_cursor = true;
        this.cursor_time = 0;
        this.cursor_default_shift = 1100;
        this.cursor_shift = 1100;
        this.cursorStartDate = -2;
        this.cursorEndDate = 2;
        this.cursorColor = "red";
        this.cursorOffSetColor = "grey";

        //Zones
        this.ZoneCount = 0;
        this.zone = "GMT+0";

        //Overview
        this.overviewHeight = 100;
        this.overviewIntervalUnit = Timeline.DateTime.DAY;
        this.overviewIntervalPixels = 300;
        this.displayOverview = true;
        this.overview = true;
        this.overview_band_position = 0;
        this.overview_previous_band_position = 0;
        this.overviewCursorStartDate = -260;
        this.overviewCursorEndDate = 260;
        this.overviewCursorColor = "red";
        this.overviewCursorOffSetColor = "grey";

        //Bands
        this.intervalUnit = Timeline.DateTime.HOUR;
        this.intervalPixels = 300;
        this.band_count = 1;
        this.band_width = null;
        this.bands = "createDefaultBands";
        this.bands_path = "template/ob_timeline/bands/";

        //Decorators
        this.overviewDecoratorOpacity = 50;
        this.decoratorOpacity = 50;

        //Themes
        this.backgroundBand = "white";
        this.theme = "createDefaultTheme";
        this.theme_path = "template/ob_timeline/themes/";
        this.themeName = "timeline-default";
        this.overviewTrackGap = 4;
        this.overviewTrackHeight = 5;
        this.tapeHeight = 18;
        this.trackHeight = 12;
        this.trackGap = 10;

        //Filters
        this.filter = OB_NO_FILTER;

        //Clock
        this.ob_timeline_menu_height = "64px";
        this.ob_timeline_date = null;
        this.ob_hour = null;
        this.ob_min = null;
        this.ob_sec = null;
        this.refreshIntervalId_clock = null;

        if (name == null || name == "") name = getNewIdDiv("div");
        if (bexiObj == "" && obj == "") {
            this.div = document.getElementById(name);
            this.parent = this.div.id;
            this.getData();
            this.timeline = this.create(this.div.id, this.resync, this.timeout, this.zone, this.EventsXmlFile, true, this.view_mode);
        } else {
            this.loading_status = "loaded";
            if (bexiObj == null) {
                this.parentNodeId = "BODY";
                this.parentType = "openbexi_body";
            }
            else {
                this.parentNodeId = bexiObj.id;
                this.parentType = bexiObj.type;
            }
            var divobj;
            if (obj == null) {
                divobj = new openbexi_div(bexiObj, obj, name, top, left, width, height);
                this.div = divobj.div;
                this.div.style.border = "1px solid white";
                this.div.setAttribute((document.all ? "className" : "class"), this.themeName);
                this.parent = this.div.id;
                this.div.selected = false;
                this.div.style.background = "#f1e1ff";
                this.div.setAttribute("CLASSE", "DIV_TIMELINE");
                this.div.setAttribute("creation_date", new Date());
                this.setData();
            } else {
                divobj = new openbexi_div(bexiObj, obj, obj.id, top, left, width, height);
                this.div = divobj.div;
                this.div.setAttribute("id", name);
                this.parent = this.div.id;
                this.div.ob_template = obj.getAttribute("ob_template");
                this.div.setAttribute("CLASSE", "DIV_TIMELINE");
                this.div.setAttribute("creation_date",  obj.getAttribute("creation_date"));
                this.div.setAttribute("obzindex",  obj.getAttribute("obzindex"));
                this.div.setAttribute("ob_template",  obj.getAttribute("ob_template"));
                this.div.selected = false;
                this.div.style.zIndex = obj.getAttribute("obzindex");
                this.getData();
            }
            this.genericObject = new openbexi_generic_object(this);
            this.div.onclick = this.my_PickFunc;

            this.updateTheme(this.theme + ".js", true);
            openbexiNavigator.working = false;
            this.mode = "local";
            this.loadXML(this.EventsXmlFile);
        }
        //this.set_template(this.template, null, null, null);
    } catch (e) {
    }
    //add resizer if OpenBEXI builder off only
    try {
        if (bexiObj != null) {
            this.build_timeline_menu();
            this.recurring_task();
            this.timeline_search();
            this.timeline_tools();
            this.timeline_zoom();
            this.timeline_slider();
            this.timeline_grant();
            this.timeline_tabular();
            this.digital_clock();
            this.resizer(null);
            this.reset_center();
        }
    } catch (e) {
    }
}
openbexi_timeline.prototype.setData = function () {
    openbexi_updatePageData(null, "page", this.div.id, "type", this.type);
    openbexi_updatePageData(null, "page", this.div.id, "subtype", this.subtype);
    openbexi_updatePageData(null, "page", this.div.id, "mode", this.mode);
    openbexi_updatePageData(null, "page", this.div.id, "parentId", this.parentNodeId);
    openbexi_updatePageData(null, "page", this.div.id, "parentType", this.parentType);
    openbexi_updatePageData(null, "page", this.div.id, "events", this.EventsXmlFile);
    openbexi_updatePageData(null, "page", this.div.id, "timeout", this.timeout);
    openbexi_updatePageData(null, "page", this.div.id, "resync", this.resync);
    openbexi_updatePageData(null, "page", this.div.id, "bands", this.bands);
    openbexi_updatePageData(null, "page", this.div.id, "bands_path", this.bands_path);
    openbexi_updatePageData(null, "page", this.div.id, "zone", this.zone);
    openbexi_updatePageData(null, "page", this.div.id, "themeName", this.themeName);
    openbexi_updatePageData(null, "page", this.div.id, "start_date", this.start_date);
    openbexi_updatePageData(null, "page", this.div.id, "start_end", this.end_date);
    if (this.theme == "" || this.theme == undefined) {
        this.theme = "default";
        this.subtheme = "none";
    }
    openbexi_updatePageData(null, "page", this.div.id, "theme", this.theme);
    openbexi_updatePageData(null, "page", this.div.id, "subtheme", this.subtheme);
    if (this.template == "" || this.template == undefined)  this.template = "template/ob_timeline/default.css";
    openbexi_updatePageData(null, "page", this.div.id, "template", this.template);
}
openbexi_timeline.prototype.getData = function () {
    this.type = openbexi_getPageData(null, "page", this.div.id, "type");
    this.subtype = openbexi_getPageData(null, "page", this.div.id, "subtype");
    this.mode = openbexi_getPageData(null, "page", this.div.id, "mode");
    this.parentNodeId = openbexi_getPageData(null, "page", this.div.id, "parentId");
    this.parentType = openbexi_getPageData(null, "page", this.div.id, "parentType");
    this.template = openbexi_getPageData(null, "page", "css", this.div.id);
    this.EventsXmlFile = openbexi_getPageData(null, "page", this.div.id, "events");
    this.timeout = openbexi_getPageData(null, "page", this.div.id, "timeout");
    this.resync = openbexi_getPageData(null, "page", this.div.id, "resync");
    this.bands = openbexi_getPageData(null, "page", this.div.id, "bands");
    this.bands_path = openbexi_getPageData(null, "page", this.div.id, "bands_path");
    //ob_load_css( this.bands+".js");
    this.zone = openbexi_getPageData(null, "page", this.div.id, "zone");
    this.theme_path = openbexi_getPageData(null, "page", this.div.id, "theme_path");
    //ob_load_css(  this.theme+".js");
    this.themeName = openbexi_getPageData(null, "page", this.div.id, "themeName");
    this.start_date = openbexi_getPageData(null, "page", this.div.id, "start_date");
    this.end_date = openbexi_getPageData(null, "page", this.div.id, "end_date");
    this.theme = openbexi_getPageData(null, "page", this.div.id, "theme");
    this.subtheme = openbexi_getPageData(null, "page", this.div.id, "subtheme");
    this.template = openbexi_getPageData(null, "page", this.div.id, "template");
}
openbexi_timeline.prototype.set_template = function (css_file, category, action, rsync_canvas) {
    if (css_file == null || css_file == "")return;
    if (action == "open") {
        this.subtheme = css_file;
        openbexi_updatePageData(null, "page", this.div.id, "subtheme", css_file);
        openbexiNavigator.browse_CSS(null, null, this.subtheme, true);
    }
    else {
        this.genericObject.set_template(this, css_file, action, rsync_canvas);
        this.div.setAttribute((document.all ? "className" : "class"), "ob_timeline_" + this.theme);
    }
}
openbexi_timeline.prototype.getClass = function () {
    return "ob_timeline_" + this.theme;
}
openbexi_timeline.prototype.recurring_task = function () {
    try {
        if (document.getElementById("ob_li_recurring_task") != null) {
            $ob_jquery('#' + document.getElementById("ob_li_recurring_task").id).live({
                click: function ob_view_click(event, ui) {
                }
            });
        }
    } catch (e) {
    }
}
openbexi_timeline.prototype.timeline_grant = function () {
    try {
        if (document.getElementById(this.div.id + "_timeline_grant") != null) {
            var my_timeline = this;
            var my_pager = document.getElementById(this.div.id + "_timeline_foot");
            var my_tabular = document.getElementById(this.div.id + "_tabular");
            $ob_jquery('#' + document.getElementById(this.div.id + "_timeline_grant").id).live({
                click: function ob_view_click(event, ui) {
                    my_timeline.div.style.visibility = "visible";
                    my_tabular.style.width = "0px";
                    my_tabular.style.height = "0px";
                    my_tabular.style.visibility = "hidden";
                    my_timeline.view_mode = "grant";
                    my_timeline.resizer(null);
                    my_pager.innerHTML = "";
                    //timeline.create_grant(my_timeline.div.id, my_timeline.resync, my_timeline.timeout, my_timeline.zone, my_timeline.EventsXmlFile, true, my_timeline.view_mode);
                }
            });
        }
    } catch (e) {
    }
}
openbexi_timeline.prototype.timeline_tabular = function () {
    try {
        if (document.getElementById(this.div.id + "_timeline_tabular") != null) {
            var my_timeline = this;
            var my_tabular = document.getElementById(this.div.id + "_tabular");
            var my_slider = document.getElementById(this.div.id + "_timeline_slider");
            $ob_jquery('#' + document.getElementById(this.div.id + "_timeline_tabular").id).live({
                click: function ob_view_click(event, ui) {
                    my_slider.style.height = "0px"
                    document.getElementById(my_timeline.div.id).style.visibility = "hidden";
                    document.getElementById(my_timeline.div.id).style.width = "0px";
                    document.getElementById(my_timeline.div.id).style.height = "0px";
                    my_tabular.style.visibility = "visible";
                    my_tabular.style.width = "100%";
                    my_tabular.style.height = "100%";
                    my_timeline.view_mode = "tabular";
                    my_timeline.resizer(null);
                }
            });
        }
    } catch (e) {
    }
}

openbexi_timeline.prototype.timeline_slider = function () {
    try {
        var my_timeline = this.timeline;

        this.events_slider_container = document.getElementById(this.div.id + "_events_slider_container");
        if (this.events_slider_container == null) {
            this.events_slider_container = document.createElement("div");
            this.events_slider_container.id = this.div.id + "_events_slider_container";

            //events_slider_plus_minus_zoom_in
            this.events_slider_plus_minus_zoom_in = document.createElement("div");
            this.events_slider_plus_minus_zoom_in.title = "Zoom +";
            this.events_slider_plus_minus_zoom_in.setAttribute("class", "ob-slider-plusminus ob-slider-plus ob-zoom-in");
            this.events_slider_container.appendChild(this.events_slider_plus_minus_zoom_in);

            //events_slider
            this.events_slider = document.createElement("div");
            this.events_slider.id = this.div.id + "_events_slider";
            this.events_slider.setAttribute("class", "openbexi-slider ui-slider ui-slider-vertical ui-widget ui-widget-content ui-corner-all");
            this.events_slider.style.height = (parseInt(this.div.style.height) - 112) + "px";
            this.events_slider.style.display = "block";
            this.events_slider_container.appendChild(this.events_slider);

            //events_slider_plus_minus_zoom_out
            this.events_slider_plus_minus_zoom_out = document.createElement("div");
            this.events_slider_plus_minus_zoom_out.title = "Zoom -";
            this.events_slider_plus_minus_zoom_out.setAttribute("class", "ob-slider-plusminus ob-slider-minus ob-zoom-out");
            this.events_slider_container.appendChild(this.events_slider_plus_minus_zoom_out);

            //events_slider_pan_button
            this.events_slider_pan_button = document.createElement("div");
            this.events_slider_pan_button.setAttribute("class", "openbexi-pan-buttons");

            this.events_slider_pan_left = document.createElement("div");
            this.events_slider_pan_left.title = "<- Past";
            this.events_slider_pan_left.setAttribute("class", "openbexi-pan-left");
            this.events_slider_pan_left.onclick = function () {
                try {

                } catch (e) {
                    //alert(e);
                }
            };
            this.events_slider_pan_button.appendChild(this.events_slider_pan_left);

            this.events_slider_pan_right = document.createElement("div");
            this.events_slider_pan_right.title = "Future ->";
            this.events_slider_pan_right.setAttribute("class", "openbexi-pan-right");
            this.events_slider_pan_right.onclick = function () {
                try {
                } catch (e) {
                    //alert(e);
                }
            };
            this.events_slider_pan_button.appendChild(this.events_slider_pan_right);

            this.events_slider_container.appendChild(this.events_slider_pan_button);

            document.body.appendChild(this.events_slider_container);

            var ob_last_slider_value = 0;
            if (my_timeline)
                ob_last_slider_value = my_timeline._bandInfos[0].ether._pixelsPerInterval;
            var slider = $ob_jquery('#' + this.events_slider.id).slider({
                orientation: "vertical",
                min: -120,
                max: 1000,
                values: [ 50 ],
                dataHighlight: "true",
                slide: function (event, ui) {
                    try {
                        // Zoom in:
                        //alert(ui.value+"\nob_last_slider_value="+ob_last_slider_value)
                        if (ui.value > 870) return false;
                        if (ui.value < 10) return false;
                        if (ui.value > ob_last_slider_value)
                            my_timeline._bandInfos[0].ether._pixelsPerInterval = ui.value;

                        else
                            my_timeline._bandInfos[0].ether._pixelsPerInterval = ui.value;
                        my_timeline._bands[0].paint();
                        ob_last_slider_value = ui.value;

                    } catch (e) {
                        //alert(e);
                    }
                },
                change: function (event, ui) {
                    try {
                    } catch (e) {
                        //alert(e);
                    }
                }
            });
            this.events_slider_plus_minus_zoom_in.onclick = function () {
                try {
                    if (my_timeline._bandInfos[0].ether._pixelsPerInterval >= 870) return false;
                    my_timeline._bandInfos[0].ether._pixelsPerInterval = my_timeline._bandInfos[0].ether._pixelsPerInterval + 10;
                    my_timeline._bands[0].paint();
                    slider.slider("value", my_timeline._bandInfos[0].ether._pixelsPerInterval + 10);
                } catch (e) {
                    //alert(e);
                }
            }
            this.events_slider_plus_minus_zoom_out.onclick = function () {
                try {
                    if (my_timeline._bandInfos[0].ether._pixelsPerInterval <= 20) return false;
                    my_timeline._bandInfos[0].ether._pixelsPerInterval = my_timeline._bandInfos[0].ether._pixelsPerInterval - 10;
                    my_timeline._bands[0].paint();
                    slider.slider("value", my_timeline._bandInfos[0].ether._pixelsPerInterval - 10);
                } catch (e) {
                    //alert(e);
                }
            }
            this.events_slider_container.style.visibility = "hidden";
        } else {
            /*if (this.events_slider_container.style.visibility == "hidden")
             this.events_slider_container.style.visibility = "visible";
             else
             this.events_slider_container.style.visibility = "hidden";*/
        }
        this.events_slider_container.setAttribute("class", "openbexi-slider-container noselect");
        this.events_slider_container.style.top = (parseInt(document.getElementById(this.div.id).style.top)) + "px";
        this.events_slider_container.style.left = (parseInt(document.getElementById(this.div.id).style.left) + parseInt(document.getElementById(this.div.id).style.width) + 2) + "px";
        if (document.getElementById(this.div.id + "_timeline") != null) {
            //this.events_slider_container.style.top = (parseInt(document.getElementById(this.div.id + "_timeline").style.top)) + "px";
            //this.events_slider_container.style.left = (parseInt(document.getElementById(this.div.id + "_timeline").style.left) + parseInt(document.getElementById(this.div.id + "_timeline").style.width) + 2) + "px";
        }
    } catch (e) {
        alert(e);
    }
}
openbexi_timeline.prototype.timeline_search = function () {

    try {
        if (document.getElementById(this.div.id + "_timeline_search") != null) {
            $ob_jquery('#' + document.getElementById(this.div.id + "_timeline_search").id).live({
                click: function ob_timeline_tools_click(event, ui) {
                    alert("timeline_search clicked (TBD)")
                }
            });
        }
    } catch (e) {
    }
}
openbexi_timeline.prototype.timeline_tools = function () {
    try {
        if (document.getElementById(this.div.id + "_timeline_tools") != null) {
            $ob_jquery('#' + document.getElementById(this.div.id + "_timeline_tools").id).live({
                click: function ob_timeline_tools_click(event, ui) {
                    alert("timeline_tools clicked (TBD)")
                }
            });
        }
    } catch (e) {
    }
}
openbexi_timeline.prototype.timeline_zoom = function () {
    try {
        if (document.getElementById(this.div.id + "_timeline_zoom") != null) {
            var my_timeline = this.timeline;
            $ob_jquery('#' + document.getElementById(this.div.id + "_timeline_zoom").id).live({
                click: function ob_timeline_zoom_click(event, ui) {
                    my_timeline.timeline_slider();
                }
            });
        }
    } catch (e) {
    }
}
function openbexi_timeline_click_pager(div_id, range) {
    var new_current_range;
    if (range == "next") {
        new_current_range = ob_get_timelines(div_id).current_range + ob_get_timelines(div_id).range;
        if (new_current_range >= ob_get_timelines(div_id).count_max)
            new_current_range = ((ob_get_timelines(div_id).count_max / ob_get_timelines(div_id).range) * ob_get_timelines(div_id).range) - ob_get_timelines(div_id).range;
    }
    else if (range == "previous") {
        new_current_range = ob_get_timelines(div_id).current_range - ob_get_timelines(div_id).range;
        if (new_current_range < ob_get_timelines(div_id).range)
            new_current_range = 0;
    }
    else if (range == "last") {
        new_current_range = ((ob_get_timelines(div_id).count_max / ob_get_timelines(div_id).range) * ob_get_timelines(div_id).range) - ob_get_timelines(div_id).range;
    } else
        new_current_range = range;
    if (ob_get_timelines(div_id).current_range != new_current_range) {
        ob_get_timelines(div_id).current_range = new_current_range;
        ob_get_timelines(div_id).create_tabular(null, ob_get_timelines(div_id).current_range);
    }
}
openbexi_timeline.prototype.build_pager = function (count_max) {
    var timeline = this;
    var range = 100;
    if (count_max == undefined) return;
    var count_page = count_max / 100;
    if (count_max > 1500) {
        range = 500;
        count_page = count_max / 500;
    }
    if (count_max > 15000) {
        count_page = count_max / 1000;
        range = 1000;
    }
    if (count_max > 150000) {
        count_page = count_max / 10000;
        range = 10000;
    }
    try {
        if (document.getElementById(this.div.id + "_timeline_foot") != null) {
            var pager = '<div class="ob_timeline_pager">';
            pager += '<div onclick="openbexi_timeline_click_pager(\'' + this.div.id + '\',0)"><img src="gif/Bprevious_small.png"></img></div>';
            pager += '<div onclick="openbexi_timeline_click_pager(\'' + this.div.id + '\',\'previous\')"><img src="gif/previous_small.png"></img></div>';
            for (var i = 0; i < count_page; i++) {
                pager += '<div id="ob_timeline_pager_' + (i * range) + '" title="Go to page ' + (i * range) + '" onclick="openbexi_timeline_click_pager(\'' + this.div.id + '\',' + (i * range) + ')" >' + i * range + '</div>';
            }
            pager += '<div onclick="openbexi_timeline_click_pager(\'' + this.div.id + '\',\'next\')"><img src="gif/next_small.png"></img></div>';
            pager += '<div onclick="openbexi_timeline_click_pager(\'' + this.div.id + '\',\'last\')"><img src="gif/Enext_small.png"></img></div>';
            pager += '</div>';
            document.getElementById(this.div.id + "_timeline_foot").innerHTML = pager;
            document.getElementById(this.div.id + "_timeline_foot").align = "center";
        }
    } catch (e) {
    }
}
openbexi_timeline.prototype.build_timeline_menu = function () {


    /*var ob_div_timeline_scroll_menu = new dojox.mobile.ScrollableView({
     id: this.div.id + "_timeline_scroll_menu"
     }, this.div.id + "_timeline_menu");
     ob_div_timeline_scroll_menu.startup();
     ob_div_timeline_scroll_menu.domNode.setAttribute("class", "ob_timeline_menu"); */

    //Clock
    /*var ob_pane_timeline_menu_clock = new dojox.mobile.Pane(
     {id : this.div.id + "_timeline_menu_clock"
     });
     ob_pane_timeline_menu_clock.placeAt(ob_div_timeline_scroll_menu.containerNode);
     ob_pane_timeline_menu_clock.startup();
     ob_pane_timeline_menu_clock.domNode.setAttribute("class", "ob_pane_timeline_menu_clock"); */

    /*var ob_div_timeline_menu_clock = new dojox.mobile.Pane({
     id: this.div.id + "_timeline_clock" ,
     icon:"gif/box_on_x64.png",
     stateful:true,
     variableHeight:true
     },this.div.id + "_timeline_menu_clock");
     //ob_div_timeline_menu_clock.placeAt(ob_pane_timeline_menu_clock.containerNode);
     ob_div_timeline_menu_clock.startup();
     ob_div_timeline_menu_clock.domNode.setAttribute("class", "ob_div_timeline_menu_clock");*/

    // Go to & Calendar
    /*var ob_accordeon_timeline_reset_center = new dojox.mobile.Accordion(
     {id: this.div.id + "_reset_center2"
     });
     ob_accordeon_timeline_reset_center.placeAt(ob_div_timeline_scroll_menu.containerNode);
     ob_accordeon_timeline_reset_center.startup();
     ob_accordeon_timeline_reset_center.domNode.setAttribute("class", "ob_timeline_main");

     var ob_pane_timeline_reset_center = new dojox.mobile.ContentPane({
     id: this.div.id + "_pane_reset_center" ,
     icon1:"gif/refresh_black_x48.png",
     label:"Go to ...",
     lazy:true
     });
     ob_pane_timeline_reset_center.placeAt(ob_accordeon_timeline_reset_center.containerNode);
     ob_pane_timeline_reset_center.startup();

     var ob_calendar_timeline_reset_center = new dijit.Calendar({
     });
     ob_calendar_timeline_reset_center.placeAt(ob_pane_timeline_reset_center.containerNode);
     ob_calendar_timeline_reset_center.startup();
     */


    /*var ob_ul_timeline_menu = new dojox.mobile.RoundRectList(
     {id : this.div.id + "ul_timeline_menu"
     },"div0_timeline_scroll_menu");
     //ob_ul_timeline_menu.placeAt(ob_div_timeline_scroll_menu.containerNode);
     ob_ul_timeline_menu.startup();
     ob_ul_timeline_menu.domNode.setAttribute("class", "ob_timeline_menu");*/

    //Reset center
    /*var ob_li_reset_center = new dojox.mobile.ListItem({
     id: this.div.id + "_reset_center" ,
     icon:"gif/refresh_black_x48.png",
     label: "Go to current time",
     stateful:true,
     variableHeight:true
     });
     ob_li_reset_center.placeAt(ob_ul_timeline_menu.containerNode);
     ob_li_reset_center.startup();
     ob_li_reset_center.domNode.setAttribute("class", "ob_li_timeline_menu"); */

    //Recurring task
    /*var ob_li_recurring_task = new dojox.mobile.ListItem({
     id: this.div.id + "_recurring_task" ,
     icon:"gif/calendar_black_x48.png",
     label: "Add events",
     stateful:true,
     variableHeight:true
     });
     ob_li_recurring_task.placeAt(ob_ul_timeline_menu.containerNode);
     ob_li_recurring_task.startup();
     ob_li_recurring_task.domNode.setAttribute("class", "ob_li_timeline_menu");

     //Timeline grant
     var ob_li_timeline_grant = new dojox.mobile.ListItem({
     id: this.div.id + "_timeline_grant" ,
     icon:"gif/calendar_grant_black_x48.png",
     label: "Grant view",
     stateful:true,
     variableHeight:true
     });
     ob_li_timeline_grant.placeAt(ob_ul_timeline_menu.containerNode);
     ob_li_timeline_grant.startup();
     ob_li_timeline_grant.domNode.setAttribute("class", "ob_li_timeline_menu");

     //Timeline tabular
     var ob_li_timeline_tabular = new dojox.mobile.ListItem({
     id: this.div.id + "_timeline_tabular" ,
     icon:"gif/calendar_tabular_black_x48.png",
     label: "Tabular view",
     stateful:true,
     variableHeight:true
     });
     ob_li_timeline_tabular.placeAt(ob_ul_timeline_menu.containerNode);
     ob_li_timeline_tabular.startup();
     ob_li_timeline_tabular.domNode.setAttribute("class", "ob_li_timeline_menu");

     //Timeline zoom
     var ob_li_timeline_zoom = new dojox.mobile.ListItem({
     id: this.div.id + "_timeline_zoom" ,
     icon:"gif/zoom_black_x48.png",
     label: "Zoom",
     stateful:true,
     variableHeight:true
     });
     ob_li_timeline_zoom.placeAt(ob_ul_timeline_menu.containerNode);
     ob_li_timeline_zoom.startup();
     ob_li_timeline_zoom.domNode.setAttribute("class", "ob_li_timeline_menu");

     //Timeline search
     var ob_li_timeline_search = new dojox.mobile.ListItem({
     id: this.div.id + "_timeline_search" ,
     icon:"gif/search_black_x48.png",
     label: "Search",
     stateful:true,
     variableHeight:true
     });
     ob_li_timeline_search.placeAt(ob_ul_timeline_menu.containerNode);
     ob_li_timeline_search.startup();
     ob_li_timeline_search.domNode.setAttribute("class", "ob_li_timeline_menu");

     //Timeline tools
     var ob_li_timeline_tools = new dojox.mobile.ListItem({
     id: this.div.id + "_timeline_tools" ,
     icon:"gif/tools_black_x48.png",
     label: "Tools",
     stateful:true,
     variableHeight:true
     });
     ob_li_timeline_tools.placeAt(ob_ul_timeline_menu.containerNode);
     ob_li_timeline_tools.startup();
     ob_li_timeline_tools.domNode.setAttribute("class", "ob_li_timeline_menu");
     */
}
function openbexi_timeline_reset_center(div_id) {
    ob_get_timelines(div_id).reset_center();
}
openbexi_timeline.prototype.reset_center = function () {
    try {
        if (document.getElementById(this.div.id + "_reset_center") != null) {
            var div_id = this.div.id;
            $ob_jquery('#' + document.getElementById(this.div.id + "_reset_center").id).live({
                click: function ob_reset_center_click(event, ui) {
                    ob_get_timelines(div_id).resync_cursor = true;
                    ob_get_timelines(div_id).timeline._bands[0].setCenterVisibleDate(ob_parseDateTime(ob_get_timelines(div_id).cursor_default_shift, "currentTime"));
                    ob_get_timelines(div_id).update_current_time_cursor("currentTime", true);
                }
            });
            this.resync_cursor = true;
            this.timeline._bands[0].setCenterVisibleDate(ob_parseDateTime(this.cursor_default_shift, "currentTime"));
            this.update_current_time_cursor("currentTime", true);
        }
    } catch (e) {
    }
}
function openbexi_timeline_goto(val) {
    try {
        if (val instanceof  Document) {
            var val_tmp = val.documentElement.getAttribute("goto");
            if (val_tmp == null || val_tmp == "")
                return;
            else
                val = val_tmp;
        }

        var dateL = Date.parse(val);
        this.resync_cursor = false;
        //Retreive the timeline id according the calandar id
        var div_id = this.id.split("_");
        var current_band_number = ob_get_timelines(div_id[0]).overview_band_position;
        if (current_band_number > 0)
            current_band_number = 0;
        else
            current_band_number = 1;
        ob_get_timelines(div_id[0]).timeline.getBand(current_band_number).setCenterVisibleDate(dateL);

    } catch (e) {
        current_band_number = ob_get_timelines(local_timeline_id).overview_band_position;
        ob_get_timelines(local_timeline_id).timeline.getBand(current_band_number).setCenterVisibleDate(dateL);
    }
}
openbexi_timeline.prototype.start_clock = function (ob_timeline_date, hour, min, sec, centerDate) {
    try {


        clearInterval(this.refreshIntervalId_clock);

        // Create two variable with the names of the months and days in an array
        var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
        var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]


        if (centerDate != null && centerDate != undefined) {
            $ob_jquery('#' + ob_timeline_date).html(dayNames[centerDate.getDay()] + " " + centerDate.getDate() + ' ' + monthNames[centerDate.getMonth()] + ' ' + centerDate.getFullYear());
            $ob_jquery("#" + hour).html(( centerDate.getHours() < 10 ? "0" : "" ) + centerDate.getHours());
            $ob_jquery("#" + min).html(( centerDate.getMinutes() < 10 ? ":0" : ":" ) + centerDate.getMinutes());
            $ob_jquery("#" + sec).html(( centerDate.getSeconds() < 10 ? ":0" : ":" ) + centerDate.getSeconds());
        } else {

            var newDate;
            var ob_seconds;
            var ob_minutes;
            var ob_hours;
            this.refreshIntervalId_clock = setInterval(function () {
                // Output the day, date, month and year
                newDate = new Date();
                $ob_jquery('#' + ob_timeline_date).html(dayNames[newDate.getDay()] + " " + newDate.getDate() + ' ' + monthNames[newDate.getMonth()] + ' ' + newDate.getFullYear());

                ob_seconds = newDate.getSeconds();
                $ob_jquery("#" + sec).html(( ob_seconds < 10 ? ":0" : ":" ) + ob_seconds);
                ob_minutes = newDate.getMinutes();
                $ob_jquery("#" + min).html(( ob_minutes < 10 ? ":0" : ":" ) + ob_minutes);
                ob_hours = newDate.getHours();
                $ob_jquery("#" + hour).html(( ob_hours < 10 ? "0" : "" ) + ob_hours);
            }, 1000);
        }
    } catch (e) {
        alert(e);
    }

}
openbexi_timeline.prototype.digital_clock = function () {
    try {
        this.digital_clock = document.getElementById(this.div.id + "_digital_clock");
        if (this.digital_clock == null) {
            this.digital_clock = document.createElement("div");
            this.digital_clock.id = this.div.id + "_digital_clock";
            this.digital_clock.setAttribute("CLASS", "ob_timeline_clock");
            this.digital_clock.style.cursor = "pointer";
            this.digital_clock.style.position = "absolute";

            this.ob_timeline_date = document.createElement("div");
            this.ob_timeline_date.id = "ob_timeline_date";

            this.ul = document.createElement("ul");
            this.ul.style.width = "200px";
            this.ul.style.margin = "0px auto";

            this.ul.style.padding = "0px";
            this.ul.style.listStyle = "none";
            this.ul.style.textAlign = "center";
            this.ul.style.display = "inline";
            this.ul.style.fontSize = "2em";
            this.ul.style.font = "Arial, Helvetica, sans-serif";

            //ul li { display:inline; font-size:2em; text-align:center; , Arial, Helvetica, sans-serif;  }
            //ul { width:200px; margin:0 auto; padding:0px; list-style:none; text-align:center; }

            this.ob_hour = document.createElement("li");
            this.ob_hour.id = this.div.id + "_hours";
            this.ob_hour.style.textAlign = "center";
            this.ob_hour.style.display = "inline";
            this.ob_hour.style.fontSize = "1em";
            this.ob_hour.style.font = "Arial, Helvetica, sans-serif";
            this.li2 = document.createElement("li");
            this.li2.id = this.div.id + "_point";
            this.li2.style.textAlign = "center";
            this.li2.style.display = "inline";
            this.li2.style.fontSize = "1em";
            this.li2.style.font = "Arial, Helvetica, sans-serif";
            this.ob_min = document.createElement("li");
            this.ob_min.id = this.div.id + "_min";
            this.ob_min.style.textAlign = "center";
            this.ob_min.style.display = "inline";
            this.ob_min.style.fontSize = "1em";
            this.li4 = document.createElement("li");
            this.li4.id = this.div.id + "_point";
            this.li4.style.textAlign = "center";
            this.li4.style.display = "inline";
            this.li4.style.fontSize = "1em";
            this.li4.style.font = "Arial, Helvetica, sans-serif";
            this.ob_sec = document.createElement("li");
            this.ob_sec.id = this.div.id + "_sec";
            this.ob_sec.style.textAlign = "center";
            this.ob_sec.style.display = "inline";
            this.ob_sec.style.fontSize = "1em";

            this.digital_clock.appendChild(this.ob_timeline_date);
            this.digital_clock.appendChild(this.ul);
            this.ul.appendChild(this.ob_hour);
            this.ul.appendChild(this.li2);
            this.ul.appendChild(this.ob_min);
            this.ul.appendChild(this.li4);
            this.ul.appendChild(this.ob_sec);

            document.getElementById(this.div.id + "_timeline_clock").appendChild(this.digital_clock);
            try {
                this.start_clock(this.ob_timeline_date.id, this.ob_hour.id, this.ob_min.id, this.ob_sec.id, null);
            } catch (e) {
            }
        }
    } catch (e) {
    }
}
openbexi_timeline.prototype.resizer = function (new_timeline_height) {
    try {
        var div_id = this.div.id;
        var my_resizer = document.getElementById(this.div.id + "_resizer");
        var ob_timeline = document.getElementById(this.div.id);
        var ob_timeline_tabular = document.getElementById(this.div.id + "_tabular");
        var ob_timeline_menu = document.getElementById(this.div.id + "_menu_timeline");
        this.ob_timeline_height = new_timeline_height;
        if (new_timeline_height == null || new_timeline_height == undefined)
            this.ob_timeline_height = parseInt(ob_timeline.style.height);
        else
            ob_timeline.style.height = parseInt(new_timeline_height) + "px";

        var ob_timeline_pane = document.getElementById(this.div.id + "_timeline");

        var mode = "normal";
        //Mobile mode
        if (ob_timeline.style.height == "100%")
            mode = "mobile";
        //Mobile mode  inside a div
        if (ob_timeline_pane != null)
            mode = "mobile_inside_div";

        if (mode == "mobile_inside_div") {
            mode = "mobile_inside_div";
        }

        var ob_timeline_foot = document.getElementById(div_id + "_timeline_foot");
        var ob_timeline_menu_foot = document.getElementById(div_id + "_timeline_menu_foot");

        if (my_resizer == null && (mode == "mobile_inside_div" || mode == "normal")) {
            my_resizer = document.createElement("div");
            my_resizer.id = this.div.id + "_resizer";
            my_resizer.style.position = "absolute";
            my_resizer.style.cursor = "nw-resize";
            var my_resizer_img = document.createElement("img");
            my_resizer_img.src = "gif/resizer_x32.png";
            //openbexi_add_page_image("gif/resizer_x32.png");
            my_resizer_img.style.borderRadius = "1em";
            my_resizer.appendChild(my_resizer_img);

            if (this.parentNodeId == "BODY")
                document.body.appendChild(my_resizer);
            else
                document.getElementById(this.parentNodeId).appendChild(my_resizer);

            try {
                $ob_jquery('#' + my_resizer.id).draggable({
                    cursor: 'move',
                    drag: function ob_resizer_drag(event, ui) {

                        // Check boundary
                        if (ui.offset.left < parseInt(ob_timeline.style.left)) {
                            my_resizer.style.left = parseInt(ob_timeline.style.left) + "px";
                            return;
                        }
                        if (ui.offset.top < parseInt(ob_timeline.style.top) + 112) {
                            my_resizer.style.top = (parseInt(ob_timeline.style.top) + 112) + "px";
                            return;
                        }

                        var events_slider_container = document.getElementById(div_id + "_events_slider_container");
                        if (events_slider_container) {
                            events_slider_container.style.left = (parseInt(ui.offset.left) + 34) + "px";
                        }
                        if (mode == "mobile_inside_div") {
                            ob_timeline_pane.style.width = parseInt(ui.offset.left) - parseInt(ob_timeline_pane.style.left) + 42 + "px";
                            ob_timeline_pane.style.height = parseInt(ui.offset.top) - parseInt(ob_timeline_pane.style.top) + 32 + "px";
                            document.getElementById(div_id + "_timeline").style.width = parseInt(ob_timeline_pane.style.width) - 10 + "px";
                            if (ob_get_timelines(div_id).view_mode != "tabular") {
                                document.getElementById(div_id + "_timeline_slider").style.height = parseInt(ob_timeline_pane.style.height) - parseInt(ob_timeline_foot.clientHeight) - 20 + "px";
                                ob_timeline.style.width = parseInt(ob_timeline_pane.style.width) - parseInt(ob_timeline.style.left) - 8 + "px";
                                ob_timeline.style.height = parseInt(ob_timeline_pane.style.height) - parseInt(ob_timeline_foot.clientHeight) - 20 + "px";
                                this.ob_timeline_height = parseInt(ob_timeline.style.height) + "px";
                                ob_timeline_foot.style.top = parseInt(ob_timeline.style.height) + 15 + "px";
                                ob_timeline_menu_foot.style.top = parseInt(ob_timeline.style.height) + 15 + "px";

                                document.getElementById(div_id + "_timeline_menu_icon").style.top = parseInt(document.getElementById(div_id + "_timeline_foot").style.top) + parseInt(document.getElementById(div_id + "_timeline_foot").style.height) - parseInt(document.getElementById(div_id + "_timeline_menu_icon").style.height) - 1 + "px";
                                document.getElementById(div_id + "_timeline_menu_icon").style.left = "5px";
                                document.getElementById(div_id + "_timeline_refresh_icon").style.top = parseInt(document.getElementById(div_id + "_timeline_foot").style.top) + parseInt(document.getElementById(div_id + "_timeline_foot").style.height) - parseInt(document.getElementById(div_id + "_timeline_menu_icon").style.height) - 1 + "px";
                                document.getElementById(div_id + "_timeline_refresh_icon").style.left = (parseInt(document.getElementById(div_id + "_timeline").style.width) / 2) + "px";

                            } else {
                                ob_timeline_tabular.style.width = "98%";
                                ob_timeline_tabular.style.height = parseInt(ob_timeline_pane.style.height) - parseInt(ob_timeline_foot.clientHeight) - 20 + "px";
                                ob_timeline_foot.style.top = parseInt(ob_timeline_tabular.style.height) + 15 + "px";
                                ob_timeline_menu_foot.style.top = parseInt(ob_timeline_tabular.style.height) + 15 + "px";
                                document.getElementById(div_id + "_timeline_menu_icon").style.top = parseInt(document.getElementById(div_id + "_timeline_foot").style.top) + parseInt(document.getElementById(div_id + "_timeline_foot").style.height) - parseInt(document.getElementById(div_id + "_timeline_menu_icon").style.height) - 1 + "px";
                                document.getElementById(div_id + "_timeline_menu_icon").style.left = "5px";
                                document.getElementById(div_id + "_timeline_refresh_icon").style.top = parseInt(document.getElementById(div_id + "_timeline_foot").style.top) + parseInt(document.getElementById(div_id + "_timeline_foot").style.height) - parseInt(document.getElementById(div_id + "_timeline_menu_icon").style.height) - 1 + "px";
                                document.getElementById(div_id + "_timeline_refresh_icon").style.left = "50px";

                            }
                            document.getElementById(div_id + "_scroll_body").style.width = "100%";
                            if (ob_get_timelines(div_id).view_mode != "tabular") {
                                //ob_get_timelines(div_id).timeline.layout();
                                ob_get_timelines(div_id).reset_center();
                            }
                        } else {
                            if (ob_get_timelines(div_id).parentNodeId == "BODY") {
                                ob_timeline.style.width = parseInt(ui.offset.left) - parseInt(ob_timeline.style.left) + 32 + "px";
                                ob_timeline.style.height = parseInt(ui.offset.top) - parseInt(ob_timeline.style.top) + 32 + "px";
                            } else {
                                ob_timeline.style.width = parseInt(my_resizer.style.left) - parseInt(ob_timeline.style.left) + 32 + "px";
                                ob_timeline.style.height = parseInt(my_resizer.style.top) - parseInt(ob_timeline.style.top) + 32 + "px";
                            }
                            ob_get_timelines(div_id).timeline.layout();
                        }
                        if (ob_timeline_menu != null)
                            ob_timeline_menu.style.height = ob_timeline_pane.style.height;

                    },
                    stop: function ob_resizer_stop(event, ui) {
                        // Check boundary
                        if (ui.offset.left < parseInt(ob_timeline.style.left)) {
                            my_resizer.style.left = parseInt(ob_timeline.style.left) + "px";
                            return;
                        }
                        if (ui.offset.top < parseInt(ob_timeline.style.top) + 112) {
                            //my_resizer.style.top = (parseInt(ob_timeline.style.top) + 112) + "px";
                            my_resizer.style.top = parseInt(ob_timeline.style.top) + this.ob_timeline_height - 32 + "px";
                            return;
                        }
                        if (mode == "mobile_inside_div") {
                            ob_timeline_pane.style.width = parseInt(ui.offset.left) - parseInt(ob_timeline_pane.style.left) + 42 + "px";
                            ob_timeline_pane.style.height = parseInt(ui.offset.top) - parseInt(ob_timeline_pane.style.top) + 32 + "px";
                            document.getElementById(div_id + "_timeline").style.width = parseInt(ob_timeline_pane.style.width) - 10 + "px";
                            if (ob_get_timelines(div_id).view_mode != "tabular") {
                                document.getElementById(div_id + "_timeline_slider").style.height = parseInt(ob_timeline_pane.style.height) - parseInt(ob_timeline_foot.clientHeight) - 20 + "px";
                                ob_timeline.style.width = parseInt(ob_timeline_pane.style.width) - parseInt(ob_timeline.style.left) - 8 + "px";
                                ob_timeline.style.height = parseInt(ob_timeline_pane.style.height) - parseInt(ob_timeline_foot.clientHeight) - 20 + "px";
                                this.ob_timeline_height = parseInt(ob_timeline.style.height) + "px";
                                ob_timeline_foot.style.top = parseInt(ob_timeline.style.height) + 15 + "px";
                                ob_timeline_menu_foot.style.top = parseInt(ob_timeline.style.height) + 15 + "px";

                                document.getElementById(div_id + "_timeline_menu_icon").style.top = parseInt(document.getElementById(div_id + "_timeline_foot").style.top) + parseInt(document.getElementById(div_id + "_timeline_foot").style.height) - parseInt(document.getElementById(div_id + "_timeline_menu_icon").style.height) - 1 + "px";
                                document.getElementById(div_id + "_timeline_menu_icon").style.left = "5px";
                                document.getElementById(div_id + "_timeline_refresh_icon").style.top = parseInt(document.getElementById(div_id + "_timeline_foot").style.top) + parseInt(document.getElementById(div_id + "_timeline_foot").style.height) - parseInt(document.getElementById(div_id + "_timeline_menu_icon").style.height) - 1 + "px";
                                document.getElementById(div_id + "_timeline_refresh_icon").style.left = (parseInt(document.getElementById(div_id + "_timeline").style.width) / 2) + "px";

                            } else {
                                ob_timeline_tabular.style.width = "98%";
                                ob_timeline_tabular.style.height = parseInt(ob_timeline_pane.style.height) - parseInt(ob_timeline_foot.clientHeight) - 20 + "px";
                                ob_timeline_foot.style.top = parseInt(ob_timeline_tabular.style.height) + 15 + "px";
                                ob_timeline_menu_foot.style.top = parseInt(ob_timeline_tabular.style.height) + 15 + "px";
                                document.getElementById(div_id + "_timeline_menu_icon").style.top = parseInt(document.getElementById(div_id + "_timeline_foot").style.top) + parseInt(document.getElementById(div_id + "_timeline_foot").style.height) - parseInt(document.getElementById(div_id + "_timeline_menu_icon").style.height) - 1 + "px";
                                document.getElementById(div_id + "_timeline_menu_icon").style.left = "5px";
                                document.getElementById(div_id + "_timeline_refresh_icon").style.top = parseInt(document.getElementById(div_id + "_timeline_foot").style.top) + parseInt(document.getElementById(div_id + "_timeline_foot").style.height) - parseInt(document.getElementById(div_id + "_timeline_menu_icon").style.height) - 1 + "px";
                                document.getElementById(div_id + "_timeline_refresh_icon").style.left = "50px";

                            }
                            document.getElementById(div_id + "_scroll_body").style.width = "100%";
                            if (ob_get_timelines(div_id).view_mode != "tabular") {
                                ob_get_timelines(div_id).timeline.layout();
                                ob_get_timelines(div_id).reset_center();
                            }
                        } else {
                            if (ob_get_timelines(div_id).parentNodeId == "BODY") {
                                ob_timeline.style.width = parseInt(ui.offset.left) - parseInt(ob_timeline.style.left) + 32 + "px";
                                ob_timeline.style.height = parseInt(ui.offset.top) - parseInt(ob_timeline.style.top) + 32 + "px";
                            } else {
                                ob_timeline.style.width = parseInt(my_resizer.style.left) - parseInt(ob_timeline.style.left) + 32 + "px";
                                ob_timeline.style.height = parseInt(my_resizer.style.top) - parseInt(ob_timeline.style.top) + 32 + "px";
                            }
                            ob_get_timelines(div_id).timeline.layout();
                        }
                        if (ob_timeline_menu != null)
                            ob_timeline_menu.style.height = ob_timeline_pane.style.height;

                    },
                    start: function ob_timeline_start(event, ui) {
                    }
                });
            } catch (e) {
                //alert(e)
            }
        }
        if (mode == "normal") {
            my_resizer.style.zIndex = 99999;
            my_resizer.style.top = parseInt(ob_timeline.style.top) + this.ob_timeline_height - 32 + "px";
            my_resizer.style.left = parseInt(ob_timeline.style.left) + parseInt(ob_timeline.style.width) - 32 + "px";
        } else {
            my_resizer.style.zIndex = 99999;
            if (mode == "mobile_inside_div") {
                //var ob_timeline_slider_width = parseInt(document.getElementById(div_id + "_timeline_slider").style.width);
                document.getElementById(div_id + "_timeline_slider").style.height = this.ob_timeline_height + "px";
                my_resizer.style.top = parseInt(ob_timeline_pane.style.top) + parseInt(ob_timeline_pane.style.height) - 32 + "px";
                my_resizer.style.left = parseInt(ob_timeline_pane.style.left) + parseInt(ob_timeline_pane.style.width) - 32 + "px";
                document.getElementById(div_id + "_scroll_body").style.width = "100%";
            }
            if (mode == "mobile")
                my_resizer.style.visibility = "hidden";

            if (this.view_mode != "tabular") {
                if (new_timeline_height == null) {
                    ob_timeline.style.height = parseInt(ob_timeline_pane.style.height) - 75 + "px";
                    ob_timeline_foot.style.top = parseInt(ob_timeline.style.height) + 15 + "px";
                    document.getElementById(div_id + "_timeline_slider").style.height = parseInt(ob_timeline.style.height) + "px";
                    this.ob_timeline_height = parseInt(ob_timeline.style.height) + "px";
                } else {
                    document.getElementById(div_id + "_timeline_slider").style.height = parseInt(ob_timeline.style.height) + 210 + "px";
                }
                ob_timeline.style.width = parseInt(ob_timeline_pane.style.width) - parseInt(ob_timeline.style.left) - 8 + "px";
            } else {
                ob_timeline_tabular.style.height = parseInt(ob_timeline_pane.style.height) - parseInt(ob_timeline_foot.clientHeight) - 20 + "px";
                ob_timeline_tabular.style.width = "98%";
                ob_timeline_foot.style.top = parseInt(ob_timeline_tabular.style.height) + 15 + "px";
            }
            if (ob_timeline_menu != null)
                ob_timeline_menu.style.height = ob_timeline_pane.style.height;
        }
        if (this.view_mode != "tabular") this.layout();
    } catch (e) {
        //alert(e)
    }
}

openbexi_timeline.prototype.setSelected = function (objId) {
    this.genericObject.setSelected(objId, this.themeName);
    if (this.openbexiNavigator) this.openbexiNavigator.update_menu_editor(this, true);
}
openbexi_timeline.prototype.setUnSelected = function (objId) {
    try {
        this.genericObject.setUnSelected(objId);
        if (currentBexiObj_selected.type != this.type)
            this.openbexiNavigator.update_menu_editor(this, false);
    } catch (e) {
        __openbexi_debugC("openbexi_timeline.prototype.setUnSelected()", "Exception:" + e.message);
    }
}
openbexi_timeline.prototype.getChildrenId = function () {
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
}
openbexi_timeline.prototype.pasteText_or_Link = function () {
    return this.genericObject.getText();
}
openbexi_timeline.prototype.setAttribute = function (name, value) {
    return this.genericObject.setAttribute(this.getChildrenId(), name, value);
}
openbexi_timeline.prototype.getText = function () {
    return this.div.firstChild.nodeValue;
}
openbexi_timeline.prototype.getPopupAttributes = function () {
    return ob_timeline_popupAttributes;
}
openbexi_timeline.prototype.getInspectorAttributes = function () {
    return ob_timeline_inspectorAttributes;
}
openbexi_timeline.prototype.innerHTML_and_EVENTS = function () {
    return "";
}
openbexi_timeline.prototype.changeStyle = function (objBexi,direction) {
    this.genericObject.changeStyle(objBexi, this,direction);
}
openbexi_timeline.prototype.removeObject = function (flag) {
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
    this.genericObject.removeObject(this);
    ob_setDirty_flag(flag);
}
openbexi_timeline.prototype.my_PickFunc = function (e) {
    openbexi_stopEventPropagation(e);
    var bexiObj = getSelectedBexiObj(this.id);
    my_PickFunc(bexiObj.div);
}
openbexi_timeline.prototype.add_function = function (protocole, functionName, ob_doc) {
    if (this.genericObject != null) this.genericObject.add_function(protocole, functionName, ob_doc);
}
openbexi_timeline.prototype.debug = function () {
    if (this.genericObject == null) alert("openbexi_timeline.prototype.debug:this.genericObject null ");
    return this.genericObject.debug(this);
}
openbexi_timeline.prototype.get_editor = function () {
    if (this.openbexiNavigator)
        return this.openbexiNavigator.get_menu_editor(this.getPopupAttributes());
    else
        return null;
}
openbexi_timeline.prototype.forward = function () {
    if (this.genericObject == null) alert("openbexi_timeline.prototype.forward:this.genericObject null ");
    return this.genericObject.forward(this.div, "+");
}
openbexi_timeline.prototype.backward = function () {
    if (this.genericObject == null) alert("openbexi_timeline.prototype.forward:this.backward null ");
    return this.genericObject.backward(this.div, "-");
}
function replaceText(timelineObj, text) {
    if (timelineObj == null) return;
    timelineObj.removeChild(timelineObj.childNodes[0]);
    timelineObj.appendChild(document.createTextNode(text));
}
;
openbexi_timeline.prototype.align_left_auto_arrange = function () {
    return this.genericObject.align_left_auto_arrange(this);
}
openbexi_timeline.prototype.align_right_auto_arrange = function () {
    return this.genericObject.align_right_auto_arrange(this);
}
openbexi_timeline.prototype.align_top_auto_arrange = function () {
    return this.genericObject.align_top_auto_arrange(this);
}
openbexi_timeline.prototype.align_bottom_auto_arrange = function () {
    return this.genericObject.align_bottom_auto_arrange(this);
}
openbexi_timeline.prototype.vertical_width_auto_resize = function () {
    return this.genericObject.vertical_width_auto_resize(this);
}
openbexi_timeline.prototype.vertical_height_auto_resize = function () {
    return this.genericObject.vertical_height_auto_resize(this);
}
openbexi_timeline.prototype.horizontal_width_auto_resize = function () {
    return this.genericObject.horizontal_width_auto_resize(this);
}
openbexi_timeline.prototype.horizontal_height_auto_resize = function () {
    return this.genericObject.horizontal_height_auto_resize(this);
}
openbexi_timeline.prototype.vertical_spacing_auto_arrange = function () {
    return this.genericObject.vertical_spacing_auto_arrange(this);
}
openbexi_timeline.prototype.horizontal_spacing_auto_arrange = function () {
    return this.genericObject.horizontal_spacing_auto_arrange(this);
}
openbexi_timeline.prototype.resize = function () {
    this.timeline = null;
    this.timeline = this.create(this.div.id, false, 0, this.zone, undefined, undefined, this.view_mode);
}
openbexi_timeline.prototype.undo_auto_arrange = function () {
    return this.genericObject.undo_auto_arrange(this);
}
openbexi_timeline.prototype.redo_auto_arrange = function () {
    return this.genericObject.redo_auto_arrange(this);
}
openbexi_timeline.prototype.functions_to_test = function () {
    return this.genericObject.functions_to_test(this.div.id);
}
openbexi_timeline.prototype.functions_to_load = function () {
    var fcts = this.genericObject.functions_to_load(this.div.id);
    return "openbexi_createTimeline(null,\'" + this.div.id + "\',\'" + this.EventsXmlFile + "\');" + fcts;
}
openbexi_timeline.prototype.head_code = function () {
    openbexi_add_javascript(null, "javascript/jquery/", "*");
    openbexi_add_javascript(null, "javascript/", "openbexi_xml.js");
    openbexi_add_javascript(null, "javascript/", "openbexi_timeline.js");
    openbexi_add_javascript(null, "javascript/timeline/timeline_js/", "timeline-api.js");
    openbexi_add_javascript(null, "javascript/timeline/", "*");
    this.genericObject.head_code(this);
    var str = "";
    str += '   <script type="text/javascript" >';
    str += '        Timeline_ajax_url="javascript/timeline/timeline_ajax/simile-ajax-api.js";';
    str += '        Timeline_urlPrefix="javascript/timeline/timeline_js/";';
    str += '        Timeline_parameters="bundle=true";';
    str += '   </script>';
    return str;
}

openbexi_timeline.prototype.get_template = function () {
    return this.template;
}
openbexi_timeline.prototype.set_template = function (css_file) {
    if (css_file == null || css_file == "")return;

    if (this.template_mode == "bands") {
        this.updateBands(css_file, true);
        this.loadXML(this.EventsXmlFile);
    }
    else if (this.template_mode == "themes") {
        this.updateTheme(css_file, true);
        this.loadXML(this.EventsXmlFile);
    }
    else if (this.template_mode == "events")
        var foo;
    else {
        if (this.openbexiNavigator) this.template = css_file.replace(this.openbexiNavigator.hrefPath, "");
        openbexi_updatePageData(null, "page", this.div.id, "theme", this.theme);
        openbexi_updatePageData(null, "page", "css", this.theme, this.template);
        ob_load_css(this.template);
        //My way to fix a class IE7 bug;
        if ((getBrowser() == "ie6" || getBrowser() == "ie7" || getBrowser() == "ie7_no_XMLHttpRequest"))
            this.div.innerHTML = this.div.innerHTML;
    }
}
openbexi_timeline.prototype.body_code = function () {
    var functions = this.genericObject.functions_to_trigger(this.div.id);
    var str = '        <div class="' + this.themeName + '" CLASSE="' + this.div.getAttribute("CLASSE") + '" id="' + this.div.id + '" ob_template="' + this.ob_template + '" obzindex="' + this.div.obzindex + '" creation_date="' + this.div.getAttribute("creation_date")+ '" ' + functions + ' style="' + openbexi_get_CSS(this.div) + '">\n';
    str += '        </div>\n';
    return str;
}
openbexi_timeline.prototype.loadXML = function (file, reload) {
    //ex; /data/xml/openbexi_simile.xml
    if (file != undefined)
        if (file == null || file == "") return;
    try {
        if (document.getElementById("bexicontext_event_xml_data")) {
            file = document.getElementById("bexicontext_event_xml_data").value;
            openbexi_updatePageData(null, "page", getSelectedBexiObj(null).div.id, "events", file)
        }
        if (document.getElementById("bexicontext_event_mode")) {
            if (document.getElementById("bexicontext_event_mode").value == "")
                this.mode = "local";
            else
                this.mode = document.getElementById("bexicontext_event_mode").value;
            document.getElementById("bexicontext_event_mode").value = this.mode;
            openbexi_updatePageData(null, "page", getSelectedBexiObj(null).div.id, "mode", this.mode)
        }
    } catch (e) {
    }
    this.EventsXmlFile = file;
    if (this.mode == "local") {
        try {
            openbexi_updatePageData(null, "page", this.div.id, "events", file);
        } catch (e) {
        }
        try {
            var ob_eventSource = this.timeline._bands[0].getEventSource();
        } catch (e) {
        }
        try {
            if (ob_eventSource != null && reload) ob_eventSource.clear();
            this.timeline.loadXML(file, function (xml, url) {
                if (ob_eventSource != null) ob_eventSource.loadXML(xml, url);
            });
        } catch (e) {
            //alert(e);
        }
    } else {
        try {
            var doc = set_xml_classe_object_attribut_value(null, "ob_request", "request", "type", "getTimelineEvents");
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "timeline", "posCurrentEvent", "0");
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "timeline", "eventCount", this.load);
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "timeline", "xmlFile", file);
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "gui", "divName", this.div.id);
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "timeline", "mode", this.mode);
            var ob_xml = openbexi_get_xmlString(doc);
            var mode_sync = openbexi_synchron();
            openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_timeline_loadXML_CB, "openbexi_loadFileBrowserRequest");
        } catch (e) {
            if (this.mode == "local") {
                try {
                    openbexi_updatePageData(null, "page", this.div.id, "events", file);
                    var ob_eventSource = this.timeline._bands[0].getEventSource();
                    if (ob_eventSource != null && reload == true) ob_eventSource.clear();
                    this.timeline.loadXML(file, function (xml, url) {
                        if (ob_eventSource != null) ob_eventSource.loadXML(xml, url);
                    });
                } catch (e) {
                }
            }
        }
    }
}
function openbexi_timeline_loadXML_CB2(responseXML) {
    openbexi_timeline_loadXML_CB(responseXML);
}
function openbexi_timeline_loadXML_CB(responseXML) {
    var doc;
    var ob_xml;
    var mode_sync;
    var ob_eventSource;
    var start;
    var end;
    var latestStart;
    var earliestEnd;
    var isDuration;
    var text;
    var description;
    var image;
    var icon;
    var link;
    var title;
    var hoverText;
    var caption;
    var color;
    var classname;
    var textColor;
    var tapeImage;
    var tapeRepeat;
    var trackNum;

    var ob_doc = openbexi_get_documentElement(responseXML, "text/xml");
    var divName = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "gui", "divName");
    var count = get_xml_classe_object_attribut_value(ob_doc, "event", divName, "count");
    var maxCount = get_xml_classe_object_attribut_value(ob_doc, "event", divName, "maxCount");
    var posCurrentEvent = get_xml_classe_object_attribut_value(ob_doc, "ob_request", "timeline", "posCurrentEvent");
    var iposCurrent = parseInt(posCurrentEvent);
    var reload = get_xml_classe_object_attribut_value(ob_doc, "event", divName, "reload");
    var loadFile = get_xml_classe_object_attribut_value(ob_doc, "event", divName, "loadFile");
    var xmlFile = get_xml_classe_object_attribut_value(ob_doc, "ob_request", "timeline", "xmlFile");
    var xmlCode = get_xml_classe_object_attribut_value(ob_doc, "ob_request", "timeline", "xmlCode");
    var timeline;


    try {
        getSelectedBexiObj(divName).updateTheme(getSelectedBexiObj(divName).theme + ".js", true);
        timeline = getSelectedBexiObj(divName);
    } catch (e) {
        timeline = ob_get_timelines(divName);
    }
    try {
        ob_eventSource = timeline.timeline._bands[0].getEventSource();
        if (reload == "true") {
            ob_eventSource.clear();
        }
    } catch (e) {
    }
    var icount = parseInt(count);
    if (icount == 0 || isNaN(icount)) {
        openbexi_unloading2();
        return;
    }
    var max = parseInt(timeline.load);
    if (parseInt(maxCount) <= iposCurrent + parseInt(timeline.load))  max = iposCurrent + parseInt(count);
    if (timeline.mode == "remote" || timeline.mode == "force_remote") {

        for (var i = iposCurrent; i < iposCurrent + max; i++) {
            try {
                start = get_xml_classe_object_attribut_value(ob_doc, "event", divName + "_" + i, "start");
                end = get_xml_classe_object_attribut_value(ob_doc, "event", divName + "_" + i, "end");
                latestStart = get_xml_classe_object_attribut_value(ob_doc, "event", divName + "_" + i, "latestStart");
                earliestEnd = get_xml_classe_object_attribut_value(ob_doc, "event", divName + "_" + i, "earliestEnd");
                isDuration = get_xml_classe_object_attribut_value(ob_doc, "event", divName + "_" + i, "isDuration");
                text = get_xml_classe_object_attribut_value(ob_doc, "event", divName + "_" + i, "text", text);
                description = get_xml_classe_object_attribut_value(ob_doc, "event", divName + "_" + i, "description");
                image = get_xml_classe_object_attribut_value(ob_doc, "event", divName + "_" + i, "image");
                icon = get_xml_classe_object_attribut_value(ob_doc, "event", divName + "_" + i, "icon");
                link = get_xml_classe_object_attribut_value(ob_doc, "event", divName + "_" + i, "link");
                title = get_xml_classe_object_attribut_value(ob_doc, "event", divName + "_" + i, "title");
                hoverText = get_xml_classe_object_attribut_value(ob_doc, "event", divName + "_" + i, "hoverText");
                caption = get_xml_classe_object_attribut_value(ob_doc, "event", divName + "_" + i, "caption");
                color = get_xml_classe_object_attribut_value(ob_doc, "event", divName + "_" + i, "color");
                classname = get_xml_classe_object_attribut_value(ob_doc, "event", divName + "_" + i, "classname");
                textColor = get_xml_classe_object_attribut_value(ob_doc, "event", divName + "_" + i, "textColor");
                tapeImage = get_xml_classe_object_attribut_value(ob_doc, "event", divName + "_" + i, "tapeImage");
                tapeRepeat = get_xml_classe_object_attribut_value(ob_doc, "event", divName + "_" + i, "tapeRepeat");
                trackNum = get_xml_classe_object_attribut_value(ob_doc, "event", divName + "_" + i, "trackNum");
                timeline.addEvent(start, end, latestStart, earliestEnd, isDuration, title, text, icon, image, link, hoverText, caption, color, classname, textColor, tapeImage, tapeRepeat, trackNum, true);
            } catch (e) {
            }
        }
        ob_eventSource._fire("onAddMany", []);
    }
    if (timeline.mode == "force_remote") {
        try {
            openbexi_unloading2();
        } catch (e) {
        }
        return;
    }

    try {
        if (timeline.mode == "remote") {
            timeline.update(timeline.div.id, false, 0, timeline.zone);
            try {
                iposCurrent = iposCurrent + parseInt(timeline.load);
                if (parseInt(maxCount) >= iposCurrent) {
                    doc = set_xml_classe_object_attribut_value(null, "ob_request", "request", "type", "getTimelineEvents");
                    doc = set_xml_classe_object_attribut_value(doc, "ob_request", "timeline", "xmlFile", xmlFile);
                    doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "gui", "divName", divName);
                    doc = set_xml_classe_object_attribut_value(doc, "ob_request", "timeline", "eventCount", timeline.load);
                    doc = set_xml_classe_object_attribut_value(doc, "ob_request", "timeline", "posCurrentEvent", iposCurrent);
                    doc = set_xml_classe_object_attribut_value(doc, "ob_request", "timeline", "mode", timeline.mode);
                    ob_xml = openbexi_get_xmlString(doc);
                    mode_sync = openbexi_synchron();
                    openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_timeline_loadXML_CB);
                }
            } catch (e) {
            }
        } else if (timeline.mode == "remote_file") {
            //xmlCode="<?xml version='1.0' encoding='UTF-8' ?><data wiki-url='http://simile.mit.edu/shelf/' wiki-section='Simile Jewish Timeline'><event start='Jan 13 2009 16:00:54' end='Jan 13 2009 23:00:54'  title='title1' > att1='att1' att2='att2'</event></data>";
            try {
                var codeEvents = openbexi_get_documentElement(xmlCode, "text/xml");
                ob_eventSource.loadXML(codeEvents, window.location.href);
                iposCurrent = iposCurrent + parseInt(timeline.load);
                if (parseInt(maxCount) >= iposCurrent) {
                    doc = set_xml_classe_object_attribut_value(null, "ob_request", "request", "type", "getTimelineEvents");
                    doc = set_xml_classe_object_attribut_value(doc, "ob_request", "timeline", "xmlFile", xmlFile);
                    doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "gui", "divName", divName);
                    doc = set_xml_classe_object_attribut_value(doc, "ob_request", "timeline", "eventCount", timeline.load);
                    doc = set_xml_classe_object_attribut_value(doc, "ob_request", "timeline", "posCurrentEvent", iposCurrent);
                    doc = set_xml_classe_object_attribut_value(doc, "ob_request", "timeline", "mode", timeline.mode);
                    ob_xml = openbexi_get_xmlString(doc);
                    mode_sync = openbexi_synchron();
                    openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_timeline_loadXML_CB2);
                }
            } catch (e) {
            }
        } else {
            timeline.mode = "local";
            try {
                openbexi_updatePageData(null, "page", divName, "events", xmlFile);
                var ob_eventSource = timeline.timeline._bands[0].getEventSource();
                ob_eventSource.clear();
                timeline.timeline.loadXML(xmlFile, function (xml, url) {
                    ob_eventSource.loadXML(xml, url);
                });
            } catch (e) {
            }
        }
    } catch (e) {
    }
    try {
        openbexi_unloading2();
    } catch (e) {
    }
}
;
openbexi_timeline.prototype.editBand = function () {
    this.template_mode = "bands";
    openbexiNavigator.browse_CSS(null, "ob_template_style", null, true);
}
openbexi_timeline.prototype.updateTheme = function (theme, reload) {
    if (theme == null || theme == undefined || theme == "")
        this.theme = "createDefaultTheme";
    else
        this.theme = theme.replace(".js", "");
    this.div.setAttribute((document.all ? "className" : "class"), this.themeName);
    openbexi_updatePageData(null, "page", this.div.id, "theme", this.theme);
    openbexi_add_javascript(null, this.theme_path, this.theme + ".js");
    this.updateBands(this.bands, reload);
}
openbexi_timeline.prototype.updateBands = function (band, reload) {
    if (band == null || band == undefined || band == "")
        this.bands = "createDefaultBands";
    else
        this.bands = band.replace(".js", "");
    openbexi_updatePageData(null, "page", this.div.id, "bands", this.bands);
    openbexi_add_javascript(null, this.bands_path, this.bands + ".js");

    // Dynamically loading external Timeline band template javascript
    this.timeline = null;
    this.timeline = this.create(this.div.id, this.resync, this.timeout, this.zone, this.EventsXmlFile, reload, this.view_mode);
    if (this.timeline) this.themeName = Timeline.ThemeName;

}
openbexi_timeline.prototype.editZones = function () {

}
openbexi_timeline.prototype.updateZones = function () {

}
openbexi_timeline.prototype.editThemes = function () {
    this.template_mode = "themes";
    openbexiNavigator.browse_CSS(null, "ob_template_style", null, true);
}
openbexi_timeline.prototype.updateThemes = function () {

}
var bexicontext_event_data_editor;
function openbexi_display_event_editor() {
    openbexiNavigator.window_factory(null, 'ob_menu_RequestBrowser', ob_event_editor, 'maximize');
    document.getElementById("bexicontext_event_data").value = getSelectedBexiObj(null).getEventInfos(null);
    //Implementing a Syntax-Highlighting with JavaScript Editor from code mirror
    bexicontext_event_data_editor = CodeMirror.fromTextArea(document.getElementById("bexicontext_event_data"), {mode: "javascript", theme: "night", lineNumbers: true, matchBrackets: true, tabMode: "indent", onChange: function () {
        clearTimeout(pending);
        setTimeout(update, 400);
    }});

}
function openbexi_update_event_editor() {
    var data = bexicontext_event_data_editor.getValue();
    var evts = data.split("\n");
    var start = evts[0].replace("start:", "");
    var end = evts[1].replace("end:", "");
    var latestStart = evts[2].replace("latestStart:", "");
    var earliestEnd = evts[3].replace("earliestEnd:", "");
    var isDuration = evts[4].replace("isDuration:", "");
    var text = evts[5].replace("text:", "");
    var description = evts[6].replace("description:", "");
    var icon = evts[7].replace("icon:", "");
    var image = evts[8].replace("image:", "");
    var link = evts[9].replace("link:", "");
    var hoverText = evts[10].replace("hoverText:", "");
    var caption = evts[11].replace("caption:", "");
    var color = evts[12].replace("color:", "");
    var classname = evts[13].replace("classname:", "");
    var textColor = evts[14].replace("textColor:", "");
    var tapeImage = evts[14].replace("tapeImage:", "");
    var tapeRepeat = evts[16].replace("tapeRepeat:", "");
    var trackNum = evts[17].replace("trackNum:", "");

    var timeline = getSelectedBexiObj(null);
    timeline.addEvent(start, end, latestStart, earliestEnd, isDuration, text, description, icon, image, link, hoverText, caption, color, classname, textColor, tapeImage, tapeRepeat, trackNum, true);
    timeline.create(timeline.div.id, false, 0, timeline.zone, undefined, undefined, timeline.view_mode);
}
openbexi_timeline.prototype.removeEvents = function () {
    var ob_eventSource = this.timeline._bands[0].getEventSource();
    ob_eventSource.clear();
}
openbexi_timeline.prototype.setZone = function () {

    var startCheck = "Invalid Date";
    var start = "currentTime";
    while (startCheck == "Invalid Date") {
        start = prompt("Start date: (exemple: \nDec 05 1926 00:00:00 GMT,\n 1984,\nJan 05 1990,\ncurrentTime)", start);
        if (start != "currentTime") {
            try {
                startCheck = Timeline.DateTime.parseGregorianDateTime(start);
            } catch (e) {
            }
            if (startCheck == "Invalid Date") alert(startCheck);
        }
        else
            startCheck = "";
    }
    this.start_date = start;
    openbexi_updatePageData(null, "page", this.div.id, "start_date", this.start_date);

    if (this.start_date == "currentTime") {
        var zone = openbexi_getPageData(null, "page", this.div.id, "zone", this.zone);
        zone = prompt("Zone: (ex GMT+5)", zone);
        this.zone = zone;
        openbexi_updatePageData(null, "page", this.div.id, "zone", this.zone);
    }
    this.timeline = this.create(this.div.id, this.resync, this.timeout, this.zone, null, true, this.view_mode);
}
openbexi_timeline.prototype.setBubble = function (event) {
    try {
        openbexi_stopEventPropagation(event);
        //my_PickFunc('BODY');
        var customize_bubble = openbexi_getPageData(null, "page", "bubble", "customize_bubble");
        customize_bubble = prompt("Do you want to use your own handler instead of showing the default simile bubble look & fell? \ntype 'yes' or 'no' (default)\n You may type 'none' if you do not want to show up any bubble when users clich on events.", customize_bubble);
        if (customize_bubble == "yes" || customize_bubble == "y")
            openbexi_updatePageData(null, "page", "bubble", "customize_bubble", "yes");
        else if (customize_bubble == "none")
            openbexi_updatePageData(null, "page", "bubble", "customize_bubble", "none");
        else
            openbexi_updatePageData(null, "page", "bubble", "customize_bubble", "no");
    } catch (e) {
        __openbexi_debugC("openbexi_timeline.prototype.setBubble()", "Exception:" + e.message);
    }
}
openbexi_timeline.prototype.fillInfoBubble = function () {
    try {
        (function () {
            var default_fillInfo = Timeline.DefaultEventSource.Event.prototype.fillInfoBubble;
            Timeline.DefaultEventSource.Event.prototype.fillInfoBubble = function (elmt, theme, labeller) {
                var customize_bubble = openbexi_getPageData(null, "page", "bubble", "customize_bubble");
                if (customize_bubble == "none") {
                    return;
                }
                if (customize_bubble == "no") {
                    if (!labeller.isDepthLabeller) {
                        default_fillInfo.apply(this, arguments);
                        return;
                    }
                }
                if (customize_bubble == "yes" || customize_bubble == "") {
                    //this._description could be HTML code;
                    elmt.innerHTML = this._description;
                    setTimeout(function () {
                        if (elmt.parentNode != null) {
                            elmt.parentNode.setAttribute("id", "ob_parent_bubble");
                        }
                    }, 100);
                }
            };
        })();
    } catch (e) {
        __openbexi_debugC("openbexi_timeline.prototype.fillInfoBubble()", "Exception:" + e.message);
    }
}
openbexi_timeline.prototype.setZones = function (event) {
    openbexi_stopEventPropagation(event);
    alert("Sorry, not yet implemted ...");
}
openbexi_timeline.prototype.setTimeout = function () {
    this.timeout = openbexi_getPageData(null, "page", this.div.id, "timeout");
    try {
        if (this.timeout == "")
            this.timeout = 0;
        else
            this.timeout = parseInt(this.timeout) / 1000;
    } catch (e) {
        this.timeout = 0;
    }
    this.timeout = prompt("timeout: (in seconds - default 60 - timeout canceled if value = 0)", this.timeout);
    if (parseInt(this.timeout) <= 0 || isNaN(this.timeout)) {
        this.timeout = 999999;
        this.resync = "false";
    } else {
        this.timeout = this.timeout * 1000;
        this.resync = "true";
    }
    openbexi_updatePageData(null, "page", this.div.id, "timeout", this.timeout);
    openbexi_updatePageData(null, "page", this.div.id, "resync", this.resync);
}
openbexi_timeline.prototype.updateEvents = function () {

}
openbexi_timeline.prototype.deleteEvent = function () {

}
openbexi_timeline.prototype.updateEvent = function () {

}
openbexi_timeline.prototype.saveEvents = function () {
    var events = get_xml_classe_object_attributes(null, "timeline", this.div.id);
    for (var i = 0; i < events.length; i++) {
        openbexi_updatePageData(null, "event", this.div.id + "_" + events[i], "start", evt._start);
        openbexi_updatePageData(null, "event", this.div.id + "_" + events[i], "end", evt._end);
        openbexi_updatePageData(null, "event", this.div.id + "_" + events[i], "latestStart", evt._latestStart);
        openbexi_updatePageData(null, "event", this.div.id + "_" + events[i], "earliestEnd", evt._earliestEnd);
        openbexi_updatePageData(null, "event", this.div.id + "_" + events[i], "isDuration", evt._isDuration);
        openbexi_updatePageData(null, "event", this.div.id + "_" + events[i], "text", text);
        openbexi_updatePageData(null, "event", this.div.id + "_" + events[i], "description", evt._description);
        openbexi_updatePageData(null, "event", this.div.id + "_" + events[i], "image", evt._image);
        openbexi_updatePageData(null, "event", this.div.id + "_" + events[i], "icon", evt._icon);
        openbexi_updatePageData(null, "event", this.div.id + "_" + events[i], "link", evt._link);
        openbexi_updatePageData(null, "event", this.div.id + "_" + events[i], "hoverText", evt._hoverText);
        openbexi_updatePageData(null, "event", this.div.id + "_" + events[i], "caption", evt._caption);
        openbexi_updatePageData(null, "event", this.div.id + "_" + events[i], "color", evt._color);
        openbexi_updatePageData(null, "event", this.div.id + "_" + events[i], "classname", evt._classname);
        openbexi_updatePageData(null, "event", this.div.id + "_" + events[i], "textColor", evt._textColor);
        openbexi_updatePageData(null, "event", this.div.id + "_" + events[i], "tapeImage", evt._tapeImage);
        openbexi_updatePageData(null, "event", this.div.id + "_" + events[i], "tapeRepeat", evt._tapeRepeat);
        openbexi_updatePageData(null, "event", this.div.id + "_" + events[i], "trackNum", evt.trackNum);
    }
}
openbexi_timeline.prototype.saveEvent = function (evt) {
    openbexi_updatePageData(null, "timeline", this.div.id, evt._id, evt._id);
    openbexi_updatePageData(null, "event", this.div.id + "_" + evt._id, "start", evt._start);
    openbexi_updatePageData(null, "event", this.div.id + "_" + evt._id, "end", evt._end);
    openbexi_updatePageData(null, "event", this.div.id + "_" + evt._id, "latestStart", evt._latestStart);
    openbexi_updatePageData(null, "event", this.div.id + "_" + evt._id, "earliestEnd", evt._earliestEnd);
    openbexi_updatePageData(null, "event", this.div.id + "_" + evt._id, "isDuration", evt._isDuration);
    openbexi_updatePageData(null, "event", this.div.id + "_" + evt._id, "text", evt._text);
    openbexi_updatePageData(null, "event", this.div.id + "_" + evt._id, "description", evt._description);
    openbexi_updatePageData(null, "event", this.div.id + "_" + evt._id, "image", evt._image);
    openbexi_updatePageData(null, "event", this.div.id + "_" + evt._id, "icon", evt._icon);
    openbexi_updatePageData(null, "event", this.div.id + "_" + evt._id, "link", evt._link);
    openbexi_updatePageData(null, "event", this.div.id + "_" + evt._id, "hoverText", evt._hoverText);
    openbexi_updatePageData(null, "event", this.div.id + "_" + evt._id, "caption", evt._caption);
    openbexi_updatePageData(null, "event", this.div.id + "_" + evt._id, "color", evt._color);
    openbexi_updatePageData(null, "event", this.div.id + "_" + evt._id, "classname", evt._classname);
    openbexi_updatePageData(null, "event", this.div.id + "_" + evt._id, "textColor", evt._textColor);
    openbexi_updatePageData(null, "event", this.div.id + "_" + evt._id, "tapeImage", evt._tapeImage);
    openbexi_updatePageData(null, "event", this.div.id + "_" + evt._id, "tapeRepeat", evt._tapeRepeat);
    openbexi_updatePageData(null, "event", this.div.id + "_" + evt._id, "trackNum", evt.trackNum);
}

openbexi_timeline.prototype.addEvent = function (start, end, latestStart, earliestEnd, isDuration, text, description, icon, image, link, hoverText, caption, color, classname, textColor, tapeImage, tapeRepeat, trackNum, save) {
    var myhash = new Object();
    myhash.start = new Date(start);
    if (end != "")
        myhash.end = new Date(end);
    myhash.latestStart = new Date(latestStart);
    if (earliestEnd != "")
        myhash.earliestEnd = new Date(earliestEnd);
    myhash.instant = true;
    //if (isDuration == "true")
    //myhash.instant = false;
    myhash.text = text;
    myhash.description = description;
    if (image != "")
        myhash.image = image;
    if (icon != "")
        myhash.icon = icon;
    if (link != "")
        myhash.link = link;
    if (color != "")
        myhash.color = color;
    if (textColor != "")
        myhash.textColor = textColor;
    if (hoverText != "")
        myhash.hoverText = hoverText;
    if (caption != "")
        myhash.caption = caption;
    if (classname != "")
        myhash.classname = classname;
    if (tapeImage != "")
        myhash.tapeImage = tapeImage;
    if (tapeRepeat != "")
        myhash.tapeRepeat = tapeRepeat;
    if (trackNum != "")
        myhash.trackNum = trackNum;
    var evt = new Timeline.DefaultEventSource.Event(myhash);
    try {
        if (this.eventSources == null || this.eventSources == undefined) {
            this.eventSources = this.timeline._bands[0].getEventSource();
        }
    } catch (e) {
        this.eventSources = new Timeline.DefaultEventSource();
    }
    this.eventSources.add(evt);

    if (save) {
        this.saveEvent(evt);
    }
}

function ob_parseDateTime(delta, date) {
    // Use current time if te not defined
    if (date == null, date == undefined || date == "currentTime") {
        date = new Date().getTime();
        return  new Date(date + (delta * 1000));
    } else {
        date = new Date(date).getTime();
        return  new Date(date + (delta * 1000));
    }
}

openbexi_timeline.prototype.loadEvents = function () {
    if (this.mode == "remote") return;
    try {
        var pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
        var events = get_xml_classe_object_attributesName(pageDoc, "timeline", this.div.id);
    } catch (e) {
        return null;
    }
    if (events) {
        for (var i = 0; i < events.length; i++) {
            try {
                var start = openbexi_getPageData(null, "event", this.div.id + "_" + events[i], "start");
                if (start != "") {
                    var end = openbexi_getPageData(null, "event", this.div.id + "_" + events[i], "end");
                    var latestStart = openbexi_getPageData(null, "event", this.div.id + "_" + events[i], "latestStart");
                    var earliestEnd = openbexi_getPageData(null, "event", this.div.id + "_" + events[i], "earliestEnd");
                    var isDuration = openbexi_getPageData(null, "event", this.div.id + "_" + events[i], "isDuration");
                    var text = openbexi_getPageData(null, "event", this.div.id + "_" + events[i], "text");
                    var description = openbexi_getPageData(null, "event", this.div.id + "_" + events[i], "description");
                    var image = openbexi_getPageData(null, "event", this.div.id + "_" + events[i], "image");
                    var icon = openbexi_getPageData(null, "event", this.div.id + "_" + events[i], "icon");
                    var link = openbexi_getPageData(null, "event", this.div.id + "_" + events[i], "link");
                    var hoverText = openbexi_getPageData(null, "event", this.div.id + "_" + events[i], "hoverText");
                    var caption = openbexi_getPageData(null, "event", this.div.id + "_" + events[i], "caption");
                    var color = openbexi_getPageData(null, "event", this.div.id + "_" + events[i], "color");
                    var classname = openbexi_getPageData(null, "event", this.div.id + "_" + events[i], "classname");
                    var textColor = openbexi_getPageData(null, "event", this.div.id + "_" + events[i], "textColor");
                    var tapeImage = openbexi_getPageData(null, "event", this.div.id + "_" + events[i], "tapeImage");
                    var tapeRepeat = openbexi_getPageData(null, "event", this.div.id + "_" + events[i], "tapeRepeat");
                    var trackNum = openbexi_getPageData(null, "event", this.div.id + "_" + events[i], "trackNum");

                    this.addEvent(start, end, latestStart, earliestEnd, isDuration, text, description, icon, image, link, hoverText, caption, color, classname, textColor, tapeImage, tapeRepeat, trackNum, false);
                }
            } catch (e) {
            }
        }
        try {
            //var ob_eventSource = timeline.timeline._bands[0].getEventSource();
            //ob_eventSource._fire("onAddMany", []);
        } catch (e) {
        }
    }
}
function createDefaultTheme() {
    var theme = null;
    try {
        theme = Timeline.ClassicTheme.create();
        Timeline.ThemeName = 'timeline-default';
        theme.event.bubble.width = 450;
        theme.event.bubble.height = 550;
    } catch (e) {
        return theme;
    }
    return theme;
}
function createDarkTheme() {
    var theme = null;
    try {
        theme = Timeline.ClassicTheme.create();
        Timeline.ThemeName = 'timeline-default dark-theme';
        theme.event.bubble.width = 450;
        theme.event.bubble.height = 550;
    } catch (e) {
        return theme;
    }
    return theme;
}
function createGoldTheme() {
    var theme = null;
    try {
        theme = Timeline.ClassicTheme.create();
        Timeline.ThemeName = 'timeline-default gold-theme';
        theme.event.bubble.width = 450;
        theme.event.bubble.height = 550;
    } catch (e) {
        return theme;
    }
    return theme;
}
function createBlueTheme() {
    var theme = null;
    try {
        theme = Timeline.ClassicTheme.create();
        Timeline.ThemeName = 'timeline-default blue-theme';
        theme.event.bubble.width = 450;
        theme.event.bubble.height = 550;
    } catch (e) {
        return theme;
    }
    return theme;
}
function createGreenTheme() {
    var theme = null;
    try {
        theme = Timeline.ClassicTheme.create();
        Timeline.ThemeName = 'timeline-default green-theme';
        theme.event.bubble.width = 450;
        theme.event.bubble.height = 550;
    } catch (e) {
        return theme;
    }
    return theme;
}
function createDefaultBands(currentTime, timezone, eventSources, theme) {
    var bandInfos;
    try {

        var zones = [
            {
                start: ob_parseDateTime(-48 * 3600, "currentTime"),
                end: ob_parseDateTime(48 * 3600, "currentTime"),
                magnify: 3,
                unit: Timeline.DateTime.MINUTE,
                multiple: 5
            }
        ];
        var zones2 = [
            {
                start: ob_parseDateTime(-3 * 3600, "currentTime"),
                end: ob_parseDateTime(3 * 3600, "currentTime"),
                magnify: 8,
                unit: Timeline.DateTime.HOUR,
                multiple: 1
            }
        ];
        bandInfos = [
            Timeline.createHotZoneBandInfo({
                width: "85%",
                intervalUnit: Timeline.DateTime.HOUR,
                intervalPixels: 300,
                zones: zones,
                eventSource: eventSources,
                date: currentTime,
                timeZone: timezone,
                theme: theme
            }),
            Timeline.createBandInfo({
                width: "15%",
                intervalUnit: Timeline.DateTime.DAY,
                intervalPixels: 300,
                //zones:          zones2,
                eventSource: eventSources,
                date: currentTime,
                timeZone: timezone,
                overview: true
                // theme:          2
            })
        ];
        bandInfos[1].syncWith = 0;
        bandInfos[1].highlight = true;

        bandInfos[0].decorators = [
            new Timeline.SpanHighlightDecorator({
                startDate: ob_parseDateTime(-3, "currentTime"),
                endDate: ob_parseDateTime(3, "currentTime"),
                color: "red",
                opacity: 50,
                //startLabel: "",
                //endLabel:   "",
                // theme:      theme,
                cssClass: 't-highlight1'
            })
        ];
        bandInfos[1].decorators = [
            new Timeline.SpanHighlightDecorator({
                startDate: ob_parseDateTime(-10, "currentTime"),
                endDate: ob_parseDateTime(10, "currentTime"),
                color: "red",
                opacity: 50,
                startLabel: "Current day",
                //endLabel:   "",
                // theme:      theme,
                cssClass: 't-highlight1'
            }) ,
            new Timeline.SpanHighlightDecorator({
                startDate: ob_parseDateTime(-12 * 3600, "currentTime"),
                endDate: ob_parseDateTime(12 * 3600, "currentTime"),
                color: "#f0c000",
                opacity: 50,
                //startLabel: "Currentday",
                //endLabel:   "",
                // theme:      theme,
                cssClass: 't-highlight1'
            })
        ];
    } catch (e) {
        return null;
    }
    return bandInfos;
}
openbexi_timeline.prototype.update = function (divId, resync, timeout, zone, events) {
    this.timeline = null;
    this.create(divId, resync, timeout, zone, events, undefined, undefined);
}
var go_Timeline;
openbexi_timeline.prototype.create = function (divId, resync, timeout, zone, events, reload, view) {
    if (view == "tabular")
        return this.create_tabular(null, 0);
    else
        return this.create_grant(divId, resync, timeout, zone, events, reload);
}
openbexi_timeline.prototype.create_tabular = function (xml, range) {

    if (xml != null) {
        this.store = xml;
    }
    else {
        this.current_range = range;
        this.RoundRectList.destroyDescendants()
    }

    if (this.RoundRectList == null) {
        this.RoundRectList = new dojox.mobile.RoundRectList(
                {id: "ob_RoundRectList",
                    selected: true
                }, this.div.id + "_tabular");
        this.RoundRectList.startup();
    } else {
        //this.RoundRectList.destroyDescendants();
    }

    var dateTimeFormat = this.store.documentElement.getAttribute("date-time-format");
    var node = this.store.documentElement.firstChild;
    var added = false;
    var counter = 0;
    var label = "";
    var description;
    var item1;
    this.count_max = 0;
    while (node != null) {
        if (node.nodeType == 1) this.count_max++;
        node = node.nextSibling;
    }
    node = this.store.documentElement.firstChild;
    while (node != null) {
        if (node.nodeType == 1) {
            if (counter >= this.current_range && counter < (this.current_range + this.range)) {
                description = "";
                if (node.firstChild != null && node.firstChild.nodeType == 3) {
                    description = node.firstChild.nodeValue;
                }
                //var instant = (node.getAttribute("isDuration") === null && node.getAttribute("durationEvent") === null) || node.getAttribute("isDuration") == "false" || node.getAttribute("durationEvent") == "false";
                //var evt = new Timeline.DefaultEventSource.Event({id:node.getAttribute("id"),start:parseDateTimeFunction(node.getAttribute("start")),end:parseDateTimeFunction(node.getAttribute("end")),latestStart:parseDateTimeFunction(node.getAttribute("latestStart")),earliestEnd:parseDateTimeFunction(node.getAttribute("earliestEnd")),instant:instant,text:node.getAttribute("title"),description:description,image:this._resolveRelativeURL(node.getAttribute("image"), base),link:this._resolveRelativeURL(node.getAttribute("link"), base),icon:this._resolveRelativeURL(node.getAttribute("icon"), base),color:node.getAttribute("color"),textColor:node.getAttribute("textColor"),hoverText:node.getAttribute("hoverText"),classname:node.getAttribute("classname"),tapeImage:node.getAttribute("tapeImage"),tapeRepeat:node.getAttribute("tapeRepeat"),caption:node.getAttribute("caption"),eventID:node.getAttribute("eventID"),trackNum:node.getAttribute("trackNum")});
                //label = counter+": id:" + node.getAttribute("id") + "\nstart:" + node.getAttribute("start") + "end:" + node.getAttribute("end") + "latestStart:" + node.getAttribute("latestStart") + "earliestEnd:" + node.getAttribute("earliestEnd") + "text:" + node.getAttribute("title") + "description:" + description + "image:" + node.getAttribute("image") + "link:" + node.getAttribute("link") + "icon:" + node.getAttribute("icon") + "color:" + node.getAttribute("color") + "textColor:" + node.getAttribute("textColor") + "hoverText:" + node.getAttribute("hoverText") + "classname:" + node.getAttribute("classname") + "tapeImage:" + node.getAttribute("tapeImage") + "tapeRepeat:" + node.getAttribute("tapeRepeat") + "caption:" + node.getAttribute("caption") + "eventID:" + node.getAttribute("eventID") + "trackNum:" + node.getAttribute("trackNum");
                if (node.getAttribute("end") == null)
                    label = counter + " - " + node.getAttribute("title") + "</br>" + "start: " + node.getAttribute("start") + "</br>" + "description:" + description;
                else
                    label = counter + " - " + node.getAttribute("title") + "</br>" + "start: " + node.getAttribute("start") + "</br>" + "end: " + node.getAttribute("end") + "</br>" + "description:" + description;

                try {
                    item1 = dijit.registry.byId("ob_list_" + counter)
                } catch (e) {
                }
                if (item1 != null) {
                    item1.set("label", label);
                    item1.set("icon", "gif/about_standby_x48.png");
                    item1.set("rightIcon", "gif/timeline_combo.png");
                }
                else {
                    item1 = new dojox.mobile.ListItem({
                        id: "ob_list_" + counter,
                        icon: "gif/about_x48.png",
                        label: label,
                        variableHeight: true
                    });
                    item1.placeAt(this.RoundRectList.containerNode);
                    item1.startup();
                }
                added = true;
                document.getElementById("ob_list_" + counter).style.background = node.getAttribute("color");
            }
            if (counter >= this.current_range + this.range) break;
            counter++;
        }
        node = node.nextSibling;
    }
    if (added) {
        //this.count_max = this.store.documentElement.childElementCount;
        this.build_pager(this.count_max);
        document.getElementById("ob_timeline_pager_" + (this.current_range)).style.background = "white";
    }
    //document.getElementById("ob_RoundRectList").style.background = "orange";
}
openbexi_timeline.prototype.create_grant = function (divId, resync, timeout, zone, events, reload) {
    if (!reload)
        if (this.timeline != null) return;

    //Overwrite default Bubble look&feel
    this.fillInfoBubble(this.div.id);

    var theme;
    //this.band_count = this.timeline._bands.length;
    try {
        if (this.eventSources == null || this.eventSources == undefined) {
            this.eventSources = this.timeline._bands[0].getEventSource();
        }
    } catch (e) {
        this.eventSources = new Timeline.DefaultEventSource();
    }
    var timezone = 0;
    var currentTime;
    if (this.start_date == "currentTime") {
        if (zone != undefined) timezone = zone.replace("GMT+", "");
        if (timezone == undefined) timezone = 0;
        timezone = parseInt(timezone);
        if (isNaN(timezone)) {
            timezone = zone.replace("GMT-", "");
            if (timezone == undefined) timezone = 0;
            timezone = -parseInt(timezone);
        }
        if (isNaN(timezone)) timezone = 0;
        currentTime = ob_parseDateTime(0, "currentTime");
    } else {
        currentTime = ob_parseDateTime(0, this.start_date);
    }
    try {
        try {
            if (reload)openbexi_load_JS_CSS_file(this.theme_path + this.theme + ".js", "js");
            theme = eval(this.theme + "(this.themeName)");
        } catch (e) {
            //alert("Creating " + this.theme + "...");
            theme = eval(this.theme + "(this.themeName)");
        }
        var timeline;
        try {
            this.bands = openbexi_getPageData(null, "page", this.div.id, "bands");
            if (reload)
                openbexi_load_JS_CSS_file(this.bands_path + this.bands + ".js", "js");

            timeline = Timeline.create(document.getElementById(this.div.id), eval(this.bands + "(currentTime, timezone,this.eventSources,theme)"), Timeline.HORIZONTAL);
        } catch (e) {
            //alert("Creating " + this.bands + "...");
            timeline = Timeline.create(document.getElementById(this.div.id), eval(this.bands + "(currentTime, timezone,this.eventSources,theme)"), Timeline.HORIZONTAL);
            //alert("Failed creating " + this.bands);
        }
        this.themeName = Timeline.ThemeName;
        openbexi_updatePageData(null, "page", this.div.id, "themeName", this.themeName);
        //alert("theme:" + theme +"\nthis.theme:" + this.theme + "\nthis.themeName:" + this.themeName+" ("+Timeline.ThemeName+" ---"+theme.event.bubble.width+")" + "\nthis.bands:" + this.bands);
        this.timeline = timeline;
        if (events != null && events != "" && events != "no_load.xml")
            timeline.loadXML(events, function () {
                //timeline.eventSource.loadXML(xml, url);
            });
        if (resync == "true") {
            clearTimeout(centerCurrentTime);
            //setTimeout(function() {
            //go_Timeline = openbexi_createTimeline(this.timeline, divId, events);
            //}, timeout);
            openbexi_centerCurrentTime(this.timeline, currentTime, timeout, timezone);
        }
        //setupFilterHighlightControls(document.getElementById("controls"), timeline, [0,1], theme);
        return timeline;
    } catch (e) {
        return null;
    }
}
openbexi_timeline.prototype.getBandInfos = function () {
    var count = this.timeline.getBandCount();
    var str = "";
    for (var i = 0; i < parseInt(this.timeline.getBandCount()); i++) {
        var band = this.timeline.getBand(i);
        str += "Horizontal:" + this.timeline.isHorizontal() + "\n";
        str += "PixelWidth:" + this.timeline.getPixelWidth() + "\n";
        str += "Pixelength:" + this.timeline.getPixelLength() + "\n";

        str += "Local:" + band.getLocale() + "\n\n";
        str += "ViewLength:" + band.getViewLength() + "\n";
        str += "ViewWidth:" + band.getViewWidth() + "\n";
        str += "PixelOffset:" + band.dateToPixelOffset() + "\n";
        str += "TimeZone:" + band.getTimeZone() + "\n\n";

        str += "Ether:" + this.timeline.getHotZoneEther + "\n";
        str += "LinearEther:" + this.timeline.LinearEther + "\n";
    }

    return str;
}
openbexi_timeline.prototype.getEventInfos = function () {
    var str = "";
    str += "start:" + ob_parseDateTime(0, "currentTime") + "\n";
    str += "end:" + ob_parseDateTime(0, "currentTime") + "\n";
    str += "latestStart:" + ob_parseDateTime(0, "currentTime") + "\n";
    str += "earliestEnd:" + ob_parseDateTime(0, "currentTime") + "\n";
    str += "isDuration:\n";
    str += "text:\n";
    str += "description:\n";
    str += "icon:\n";
    str += "image:\n";
    str += "link:\n";
    str += "hoverText:\n";
    str += "caption:\n";
    str += "color:\n";
    str += "classname:\n";
    str += "textColor:\n";
    str += "tapeImage:\n";
    str += "tapeRepeat:\n";
    str += "trackNum:";
    return str;
}
openbexi_timeline.prototype.update_current_time_cursor = function (time, resync) {
    //var decorator_width = (new Date(this.timeline._bands[0]._decorators[0]._endDate)-new Date(this.timeline._bands[0]._decorators[0]._startDate))/1000;
    for (var i = 0; i < this.timeline._bands.length; i++) {
        if (i == this.overview_band_position) {
            this.timeline._bands[i]._decorators[0]._color = this.overviewCursorColor;
            this.timeline._bands[i]._decorators[0]._startDate = ob_parseDateTime(this.overviewCursorStartDate, "currentTime");
            this.timeline._bands[i]._decorators[0]._endDate = ob_parseDateTime(this.overviewCursorEndDate, "currentTime");
        } else {
            this.timeline._bands[i]._decorators[0]._color = this.cursorColor;
            this.timeline._bands[i]._decorators[0]._startDate = ob_parseDateTime(this.cursorStartDate, "currentTime");
            this.timeline._bands[i]._decorators[0]._endDate = ob_parseDateTime(this.cursorEndDate, "currentTime");
        }
        this.timeline._bands[i]._decorators[0].paint();
    }
    if (!this.resync_cursor) return;
    var current_band_number = 1;
    if (this.overview_band_position > 0)
        current_band_number = 0;
    //this.cursor_default_shift=this.timeline._bands[current_band_number]._ether.dateToPixelOffset(new Date().getTime());
    this.timeline._bands[current_band_number].setCenterVisibleDate(ob_parseDateTime(this.cursor_shift, "currentTime"));
}

openbexi_timeline.prototype.update_cursor = function (time) {
    try {
        for (var i = 0; i < this.timeline._bands.length; i++) {
            if (this.resync_cursor) {
                //Make invisible the cursor
                if (this.timeline._bands[i]._decorators[1]._color == "white") return;
                this.timeline._bands[i]._decorators[1]._color = "white";
                this.timeline._bands[i]._decorators[1]._startDate = ob_parseDateTime(0, time);
                this.timeline._bands[i]._decorators[1]._endDate = ob_parseDateTime(0, time);
            } else {
                if (i == this.overview_band_position) {
                    this.timeline._bands[i]._decorators[1]._color = this.overviewCursorOffSetColor;
                    this.timeline._bands[i]._decorators[1]._startDate = ob_parseDateTime(this.overviewCursorStartDate, time);
                    this.timeline._bands[i]._decorators[1]._endDate = ob_parseDateTime(this.overviewCursorEndDate, time);
                } else {
                    this.timeline._bands[i]._decorators[1]._color = this.cursorOffSetColor;
                    this.timeline._bands[i]._decorators[1]._startDate = ob_parseDateTime(this.cursorStartDate, time);
                    this.timeline._bands[i]._decorators[1]._endDate = ob_parseDateTime(this.cursorEndDate, time);
                }
            }
            this.timeline._bands[i]._decorators[1].paint();
        }
    } catch (e) {
    }
}
openbexi_timeline.prototype.load_Data = function (div_id, file, text, ob_callback) {
    try {

        var doc = null;
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_readDataRequest");
        try {
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "project", openbexiNavigator.projectName);
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filename", openbexiNavigator.webPageName);
        } catch (e) {
        }
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "div", "name", div_id);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "callback", "name", ob_callback);
        if (file.match(RegExp(".js")) && text.match("return bandInfos")) {
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "subtype", "openbexi_readBandInfos");
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "js", "filename", file);
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "js", "keepname", "true");
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "js", "path", "");
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "js", "text", openbexi_unformatJSText(text));
        }
        if (file.match(RegExp(".js")) && text.match("return theme")) {
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "subtype", "openbexi_readTheme");
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "js", "filename", file);
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "js", "keepname", "true");
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "js", "path", "");
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "js", "text", openbexi_unformatJSText(text));
        }
        if (file.match(RegExp(".xml"))) {
            try {
                getSelectedBexiObj(null).EventsXmlFile = pathname + "/" + file;
            } catch (e) {
            }
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "subtype", "openbexi_readFileEvents");
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "xml", "filename", file);
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "xml", "keepname", "true");
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "xml", "path", "");
            if (text != null && text != "")
                doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "xml", "text", openbexi_unformatXMLText(text));
        }
        var ob_xml = openbexi_get_xmlString(doc);

        var mode_sync = openbexi_synchron();
        openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_timeline_load_Data_CB);

    } catch (e) {
    }
}
openbexi_timeline.prototype.load_overViewEvents = function (doc, overviewBand) {
    try {
        var start_load = new Date();
        var description;
        var eventSource = this.timeline.getBand(overviewBand)._eventSource;
        var wikiURL = doc.documentElement.getAttribute("wiki-url");
        var wikiSection = doc.documentElement.getAttribute("wiki-section");
        var dateTimeFormat = doc.documentElement.getAttribute("date-time-format");
        var parseDateTimeFunction = eventSource._events.getUnit().getParser(dateTimeFormat);
        var node = doc.documentElement.firstChild;
        var added = false;
        var base = window.location.hostname;
        var instant;
        var evt;
        //setTimeout(function() {
        while (node != null) {
            if (node.nodeType == 1) {
                description = "";
                if (node.firstChild != null && node.firstChild.nodeType == 3)
                    description = node.firstChild.nodeValue;
                instant = (node.getAttribute("isDuration") === null && node.getAttribute("durationEvent") === null) || node.getAttribute("isDuration") == "false" || node.getAttribute("durationEvent") == "false";
                evt = new Timeline.DefaultEventSource.Event({id: node.getAttribute("id"), start: parseDateTimeFunction(node.getAttribute("start")), end: parseDateTimeFunction(node.getAttribute("end")), latestStart: parseDateTimeFunction(node.getAttribute("latestStart")), earliestEnd: parseDateTimeFunction(node.getAttribute("earliestEnd")), instant: instant, text: node.getAttribute("title"), description: description, image: eventSource._resolveRelativeURL(node.getAttribute("image"), base), link: eventSource._resolveRelativeURL(node.getAttribute("link"), base), icon: eventSource._resolveRelativeURL(node.getAttribute("icon"), base), color: node.getAttribute("color"), textColor: node.getAttribute("textColor"), hoverText: node.getAttribute("hoverText"), classname: node.getAttribute("classname"), tapeImage: node.getAttribute("tapeImage"), tapeRepeat: node.getAttribute("tapeRepeat"), caption: node.getAttribute("caption"), eventID: node.getAttribute("eventID"), trackNum: node.getAttribute("trackNum")});
                evt._node = node;
                //evt.getProperty = function(name) {
                //return Timeline.DefaultEventSource._node.getAttribute(name);
                //};
                //evt.setWikiInfo(wikiURL, wikiSection);
                eventSource._events.add(evt);
                added = true;
            }
            node = node.nextSibling;
        }
        if (added) eventSource._fire("onAddMany", []);
        //}, 0);
        //openbexi_timeline_debug_real_time(this.div.id, "load_overViewEvents: " + ob_get_consumming_time(start_load, new Date()) + " - " + eventSource._events.getCount() + " events", "#158F4A", false);
        this.eventGetCount = eventSource._events.getCount();
    } catch (e) {
        alert("openbexi_timeline.prototype.load_overViewEvents() - Exception:" + e.message);
    }
}
openbexi_timeline.prototype.load_bandEvents = function (doc, band) {
    try {
        var start_load = new Date();
        var description;
        var eventSource = this.timeline.getBand(band)._eventSource;
        var wikiURL = doc.documentElement.getAttribute("wiki-url");
        var wikiSection = doc.documentElement.getAttribute("wiki-section");
        var dateTimeFormat = doc.documentElement.getAttribute("date-time-format");
        var parseDateTimeFunction = eventSource._events.getUnit().getParser(dateTimeFormat);
        var node = doc.documentElement.firstChild;
        var added = false;
        var base = window.location.hostname;
        var instant;
        var evt;
        //setTimeout(function() {
        while (node != null) {
            if (node.nodeType == 1) {
                description = "";
                if (node.firstChild != null && node.firstChild.nodeType == 3)
                    description = "start=" + node.getAttribute("start") + " <br>" + node.firstChild.nodeValue;
                instant = (node.getAttribute("isDuration") === null && node.getAttribute("durationEvent") === null) || node.getAttribute("isDuration") == "false" || node.getAttribute("durationEvent") == "false";
                // If band not define for an event,  use band=1 per default
                if (node.getAttribute("band_position") == band || node.getAttribute("band_position") == null) {
                    evt = new Timeline.DefaultEventSource.Event({id: node.getAttribute("id"), start: parseDateTimeFunction(node.getAttribute("start")), end: parseDateTimeFunction(node.getAttribute("end")), latestStart: parseDateTimeFunction(node.getAttribute("latestStart")), earliestEnd: parseDateTimeFunction(node.getAttribute("earliestEnd")), instant: instant, text: node.getAttribute("title"), description: description, image: eventSource._resolveRelativeURL(node.getAttribute("image"), base), link: eventSource._resolveRelativeURL(node.getAttribute("link"), base), icon: eventSource._resolveRelativeURL(node.getAttribute("icon"), base), color: node.getAttribute("color"), textColor: node.getAttribute("textColor"), hoverText: node.getAttribute("hoverText"), classname: node.getAttribute("classname"), tapeImage: node.getAttribute("tapeImage"), tapeRepeat: node.getAttribute("tapeRepeat"), caption: node.getAttribute("caption"), eventID: node.getAttribute("eventID"), trackNum: node.getAttribute("trackNum")});
                    evt._node = node;
                    // evt.getProperty = function(name) {
                    //return Timeline.DefaultEventSource._node.getAttribute(name);
                    //};
                    //evt.setWikiInfo(wikiURL, wikiSection);
                    eventSource._events.add(evt);
                    added = true;
                }
            }
            node = node.nextSibling;
        }
        if (added) eventSource._fire("onAddMany", []);
        //}, 0);
        //openbexi_timeline_debug_real_time(this.div.id, "load_bandEvents: " + ob_get_consumming_time(start_load, new Date()) + " - " + eventSource._events.getCount() + " events" + " - width:" + Math.round(this.band_width[band]), "#158F4A", false);
    } catch (e) {
        //alert("openbexi_timeline.prototype.load_bandEvents() - Exception:" + e.message);
    }
}
openbexi_timeline.prototype.load_bands_Realtime = function (doc, reload) {
    try {
        //Get band count
        var band_count = parseInt(doc.documentElement.getAttribute("band_count"));
        if (!isNaN(band_count)) {
            if (band_count == 0) band_count = 1;
            this.band_count = band_count;
        }
        this.set_bands_width();

        //setOverviewPosition
        var setOverviewPosition = doc.documentElement.getAttribute("setOverviewPosition");
        if (setOverviewPosition == "bottom")
            this.overview_band_position = this.band_count;
        else if (setOverviewPosition == "top")
            this.overview_band_position = 0;

        if (this.timeline != null && this.timeline._bands != null)
            for (var i = 0; i < this.timeline._bands.length; i++)
                this.timeline.getBand(i).getEventSource().clear();
        this.div.innerHTML = null;
        this.timeline = null;

        //Create bands if needed

        //if (this.timeline == null || this.timeline._bands == null || (this.timeline._bands.length != this.band_count + 1) || (this.overview_previous_band_position != this.overview_band_position)) {
        this.create_bands_Realtime(doc, false);
        this.resync_cursor = true;
        //}

        this.overview_previous_band_position = this.overview_band_position;
        this.band_position = this.band_count;

        if (reload)this.layout();

    } catch (e) {
        //alert(" openbexi_timeline.prototype.load_bands_Realtime() - Exception:" + e.message);
    }
}
openbexi_timeline.prototype.set_overviewHeight_Realtime = function (doc) {
    try {
        var overviewHeight = doc.documentElement.getAttribute("OverviewHeight");
        if (overviewHeight != null && overviewHeight != "")
            this.overviewHeight = overviewHeight;
    } catch (e) {
        //alert("openbexi_timeline.prototype.set_overviewHeight_Realtime() - Exception:" + e.message);
    }
}
openbexi_timeline.prototype.set_backgroundBand_Realtime = function (doc, reload) {
    try {

        var backgroundBand = doc.documentElement.getAttribute("BackgroundBand");
        if (backgroundBand != null && backgroundBand != "")
            this.backgroundBand = backgroundBand;

        for (var i = 0; i < this.timeline._bands.length; i++) {
            //setTimeout(function() {
            $('timeline-band-' + i).style.background = "linear-gradient(" + this.backgroundBand + ")";
            $('timeline-band-' + i).style.background = "-moz-linear-gradient(" + this.backgroundBand + ")";
            $('timeline-band-' + i).style.background = "-webkit-linear-gradient(" + this.backgroundBand + ")";
            $('timeline-band-' + i).style.background = "-o-linear-gradient(" + this.backgroundBand + ")";
            $('timeline-band-' + i).style.background = "-ms-linear-gradient(" + this.backgroundBand + ")";
            //$('timeline-band-' + i).style.backgroundImage = "url(" + this.backgroundBand + ")";
            //$('timeline-band-' + i).style.boxShadow = "0px 0.3em 0.3em rgba(255, 254, 255, 0.592) inset, 0px -0.1em 0.3em rgba(0, 0, 0, 0.15) inset, 0px 0.1em 3px rgb(204, 133, 0), 0px 0.3em 1px rgb(153, 99, 0), 0px 0.5em 5px rgba(0, 0, 0, 0.2);";
            //}, 50);
        }
        if (reload)this.layout();

    } catch (e) {
        //alert("openbexi_timeline.prototype.set_backgroundBand_Realtime() - Exception:" + e.message);
    }
}

openbexi_timeline.prototype.set_theme_Realtime = function (doc, reload) {
    try {

        var trackGap = doc.documentElement.getAttribute("TrackGap");
        if (trackGap == null || trackGap == "")
            trackGap = 10;
        this.trackGap = trackGap;

        var trackHeight = doc.documentElement.getAttribute("TrackHeight");
        if (trackHeight == null || trackHeight == "")
            trackHeight = 12;
        this.trackHeight = trackHeight;

        var tapeHeight = doc.documentElement.getAttribute("TapeHeight");
        if (tapeHeight == null || tapeHeight == "")
            tapeHeight = 18;
        this.tapeHeight = tapeHeight;

        var overviewTrackGap = doc.documentElement.getAttribute("OverviewTrackGap");
        if (overviewTrackGap == null || overviewTrackGap == "")
            overviewTrackGap = 4;
        this.overviewTrackGap = overviewTrackGap;


        var overviewTrackHeight = doc.documentElement.getAttribute("OverviewTrackHeight");
        if (overviewTrackHeight == null || overviewTrackHeight == "")
            overviewTrackHeight = 5;
        this.overviewTrackHeight = overviewTrackHeight;

        for (var i = 0; i < this.band_count + 1; i++) {
            if (i == this.overview_band_position) {
                this.timeline.getBand(i)._bandInfo.theme.event.overviewTrack.gap = this.overviewTrackGap;
                this.timeline.getBand(i)._bandInfo.theme.event.overviewTrack.height = this.overviewTrackHeight;
            } else {
                this.timeline.getBand(i)._bandInfo.theme.event.track.gap = this.trackGap;
                this.timeline.getBand(i)._bandInfo.theme.event.track.height = this.trackHeight;
                this.timeline.getBand(i)._bandInfo.theme.event.tape.height = this.tapeHeight;
            }
        }
        if (reload)this.layout();

    }
    catch (e) {
        alert("openbexi_timeline.prototype.set_theme_Realtime() - Exception:" + e.message);
    }
}

openbexi_timeline.prototype.create_filtered_eventSources = function (doc, filter) {
    //TBD
}
openbexi_timeline.prototype.create_eventSources = function (doc, filter) {
    var description;
    var eventSource;
    var base = window.location.hostname;
    var wikiURL;
    var wikiSection;
    var dateTimeFormat;
    var parseDateTimeFunction;
    var node;
    var added;
    var instant;
    var evt;

    if (filter != null) this.create_filtered_eventSources(doc, filter);
    try {

        var overview_eventSource = this.timeline.getBand(this.overview_band_position)._eventSource;
        for (var i = 0; i < this.band_count + 1; i++) {
            if (this.overview_band_position != i) {
                eventSource = this.timeline.getBand(i)._eventSource;
                wikiURL = doc.documentElement.getAttribute("wiki-url");
                wikiSection = doc.documentElement.getAttribute("wiki-section");
                dateTimeFormat = doc.documentElement.getAttribute("date-time-format");
                parseDateTimeFunction = eventSource._events.getUnit().getParser(dateTimeFormat);
                node = doc.documentElement.firstChild;
                added = false;
                while (node != null) {
                    if (node.nodeType == 1) {
                        description = "";
                        if (node.firstChild != null && node.firstChild.nodeType == 3)
                            description = node.firstChild.nodeValue;
                        instant = (node.getAttribute("isDuration") === null && node.getAttribute("durationEvent") === null) || node.getAttribute("isDuration") == "false" || node.getAttribute("durationEvent") == "false";
                        if (node.getAttribute("band_position") == i) {
                            evt = new Timeline.DefaultEventSource.Event({id: node.getAttribute("id"), start: parseDateTimeFunction(node.getAttribute("start")), end: parseDateTimeFunction(node.getAttribute("end")), latestStart: parseDateTimeFunction(node.getAttribute("latestStart")), earliestEnd: parseDateTimeFunction(node.getAttribute("earliestEnd")), instant: instant, text: node.getAttribute("title"), description: description, image: eventSource._resolveRelativeURL(node.getAttribute("image"), base), link: eventSource._resolveRelativeURL(node.getAttribute("link"), base), icon: eventSource._resolveRelativeURL(node.getAttribute("icon"), base), color: node.getAttribute("color"), textColor: node.getAttribute("textColor"), hoverText: node.getAttribute("hoverText"), classname: node.getAttribute("classname"), tapeImage: node.getAttribute("tapeImage"), tapeRepeat: node.getAttribute("tapeRepeat"), caption: node.getAttribute("caption"), eventID: node.getAttribute("eventID"), trackNum: node.getAttribute("trackNum")});
                            evt._node = node;
                            evt.getProperty = function (name) {
                                return Timeline.DefaultEventSource._node.getAttribute(name);
                            };
                            evt.setWikiInfo(wikiURL, wikiSection);
                            eventSource._events.add(evt);
                            //overview_eventSource._events.add(evt);
                            added = true;
                        }
                    }
                    node = node.nextSibling;
                }
                if (added) eventSource._fire("onAddMany", []);
            }
        }
        //overview_eventSource._fire("onAddMany", []);
    }
    catch (e) {
        alert("openbexi_timeline.prototype.create_eventSources - Exception:" + e.message);
    }
}
openbexi_timeline.prototype.get_bands_width = function (band_count) {
    var eventIdToElmts = this.timeline._bandInfos[band_count].eventPainter._eventIdToElmt;
    var maxTop = 0;
    var visible_session = 0;
    for (var eventIdToElmt in eventIdToElmts) {
        visible_session++;
        eventIdToElmt = eventIdToElmts[eventIdToElmt];
        //openbexi_timeline_debug_real_time2(this.div.id, "id:" + eventIdToElmt.id + "  offsetTop: " + eventIdToElmt.offsetTop + "  session: " + eventIdToElmt.nextSibling.innerText, "green", false);
        if (eventIdToElmt.offsetTop > maxTop)
            maxTop = eventIdToElmt.offsetTop;
    }
    openbexi_timeline_debug_real_time2(this.div.id, "band_count:" + band_count + "  - visible session: " + visible_session + "  - maxTop: " + maxTop, "#D108C0", false);
    return maxTop;
}
openbexi_timeline.prototype.reset_bands_width = function () {
    var new_band_height = Math.round((100 - 12) / this.band_count);
    for (i = 0; i < this.band_count + 1; i++) {
        if (i != this.overview_band_position)
            this.band_width[i] = new_band_height + "%";
        else
            this.band_width[i] = "12%";
    }
}
openbexi_timeline.prototype.set_bands_width = function () {
    try {
        var coef = 1;
        var adjust_height = 0;
        var new_timeline_height = 0;
        var band_width = 0;
        var timeline_height = parseInt(document.getElementById(this.div.id + "_timeline_foot").style.top) - parseInt(document.getElementById(this.div.id).style.top) - 10;
        band_width = new Array(this.band_count + 1);
        this.band_width = new Array(this.band_count + 1);

        for (var i = 0; i < this.band_count + 1; i++) {
            if (i != this.overview_band_position) {
                band_width[i] = parseInt(this.get_bands_width(i)) + parseInt(this.tapeHeight) + parseInt(this.trackHeight) + parseInt(this.trackGap) + 20;
            } else
                band_width[i] = parseInt(this.overviewHeight)
            new_timeline_height += band_width[i];
            //openbexi_timeline_debug_real_time2(this.div.id, "band_width[" + i + "]:" + band_width[i] + " -new_timeline_height:" + new_timeline_height, "blue", false);
        }

        for (i = 0; i < this.band_count + 1; i++) {
            if (i != this.overview_band_position)
                if (new_timeline_height < timeline_height) {
                    coef = parseInt(timeline_height) / parseInt(new_timeline_height);
                    this.band_width[i] = band_width[i] * coef;
                }
                else
                    this.band_width[i] = band_width[i];
            else
                this.band_width[i] = this.overviewHeight;
            adjust_height = parseInt(adjust_height) + parseInt(this.band_width[i]);
            //openbexi_timeline_debug_real_time2(this.div.id, "this.band_width[" + i + "]:" + this.band_width[i] + " -adjust_height:" + adjust_height, "red", false);
        }

        if (new_timeline_height < timeline_height && timeline_height > adjust_height)
            if (this.overview_band_position == 0)
                this.band_width[this.band_count] = parseInt(this.band_width[this.band_count]) + parseInt(timeline_height) - parseInt(adjust_height);
            else
                this.band_width[0] = parseInt(this.band_width[0]) + parseInt(timeline_height) - parseInt(adjust_height);

        adjust_height = 0;
        for (i = 0; i < this.band_count + 1; i++) {
            adjust_height = parseInt(adjust_height) + parseInt(this.band_width[i]);
            openbexi_timeline_debug_real_time2(this.div.id, "this.band_width[" + i + "]:" + this.band_width[i] + " -adjust_height:" + adjust_height, "black", false);
        }

        if (new_timeline_height < timeline_height) {
            document.getElementById(this.div.id).style.height = timeline_height + "px";
            document.getElementById(this.div.id + "_timeline_slider").style.height = timeline_height + "px";
        } else {
            document.getElementById(this.div.id).style.height = new_timeline_height + "px";
            document.getElementById(this.div.id + "_timeline_slider").style.height = new_timeline_height + 220 + "px";
        }
        //openbexi_timeline_debug_real_time2(this.div.id, "timeline_height:" + timeline_height, "#D108C0", false);
        openbexi_timeline_debug_real_time2(this.div.id, "new_timeline_height: " + new_timeline_height, "#D108C0", false);
        //openbexi_timeline_debug_real_time2(this.div.id, "lastB: " + this.band_width[this.overview_band_position], "#D108C0", false);
        //openbexi_timeline_debug_real_time2(this.div.id, "adjust_height:" + adjust_height, "#D108C0", false);
        //openbexi_timeline_debug_real_time2(this.div.id, "timeline_height - adjust_height:" + parseInt(timeline_height - adjust_height), "#D108C0", false);

    } catch (e) {
        //alert("openbexi_timeline.prototype.get_bands_width - Exception:" + e.message);
        this.reset_bands_width();
    }
}
openbexi_timeline.prototype.layout = function () {
    this.timeline.layout();
    //openbexi_timeline_debug_real_time(this.div.id, "timeline.layout: " + ob_get_consumming_time(start_layout, new Date()), "#D108C0", false);
}

openbexi_timeline.prototype.load_Data_Realtime = function (div_id, event) {
    try {
        /*if (this.load_status == OB_LOADING) {
         if (document.getElementById(this.div.id + "_timeline_foot") != null)
         document.getElementById(this.div.id + "_timeline_foot").innerHTML = "<div id=\"" + this.div.id + "_timeline_foot_clock\" style=\"font-size:9px;color:orange;position:absolute;top:20px;\">" + "Cannot load data, refresh rate too high ..." + "</div>";
         alert("Cannot load data, refresh rate too high ...");
         return;
         }*/
        this.load_status = OB_LOADING;
        this.ob_loaded_interval = 0;
        this.ob_loading_interval = 0;
        var start_load = new Date();
        var doc = null;
        var parser = null;

        if (event instanceof  MessageEvent) {
            parser = new DOMParser();
            doc = parser.parseFromString(event.data, 'text/xml');
        }
        else if (event instanceof  Document) {
            doc = event;
        } else {
            if (document.getElementById(this.div.id + "_timeline_foot") != null)
                document.getElementById(this.div.id + "_timeline_foot").innerHTML = "<div id=\"" + this.div.id + "_timeline_foot_clock\" style=\"color:red;position:absolute;left:" + ((parseInt(document.getElementById(this.div.id + "_timeline").style.width) / 4) - 140) + "px;top:10px;\">" + "load_Data_Realtime: Sorry, your browser cannot display events (source not supported by OpenBEXI timeline) ..." + "</div>";
            return;
        }

        //Start loading data
        if (this.initLoad) {

            //set user/role/group
            this.user = doc.documentElement.getAttribute("user");
            this.role = doc.documentElement.getAttribute("role");
            this.group = doc.documentElement.getAttribute("group");

            this.server_status = OB_TIMELINE_SERVER_CONNECTED;
            if (this.initLoad && document.getElementById(div_id + "_timeline_menu_foot_connection") != null)
                document.getElementById(div_id + "_timeline_menu_foot_connection").innerHTML = "<img src='gif/shutdown_green_x32.png' style='font-size:12px;color:black;position:absolute;top:8px;left:25px;width:32px;height:32px;'><div id='div0_timeline_menu_foot_connection_text' style='font-size:16px;color:black;position:absolute;top:14px;left:70px;height:32px;width:200px;'><bold>" + this.user + ", you are connected.</bold></div>"

            this.initLoad = false;
            this.loadingTimer = setInterval(function () {
                if (ob_get_timelines(div_id).server_status == OB_TIMELINE_SERVER_NOT_CONNECTED) {
                    document.getElementById(div_id + "_timeline_menu_foot_connection").innerHTML = "<img src='gif/shutdown_x32.png' style='font-size:12px;color:black;position:absolute;top:8px;left:25px;width:32px;height:32px;'><div id='div0_timeline_menu_foot_connection_text' style='font-size:16px;color:red;position:absolute;top:14px;left:70px;height:32px;width:200px;'><bold>You are not connected. </bold></div>"
                    ob_get_timelines(div_id).ob_lost_connection_interval++;
                    if (ob_get_timelines(div_id).ob_lost_connection_interval < 60)
                        document.getElementById(div_id + "_timeline_menu_foot_clock").innerHTML = "Sorry, you lost the Connection " + ob_get_timelines(div_id).ob_lost_connection_interval + " seconds ago.";
                    else
                        document.getElementById(div_id + "_timeline_menu_foot_clock").innerHTML = "Sorry, you lost the Connection " + Math.round((ob_get_timelines(div_id).ob_lost_connection_interval / 60) * 100) / 100 + " minutes ago.";
                    return;
                }
                if (document.getElementById(div_id + "_timeline_menu_foot_clock") != null)
                    if (parseInt(ob_get_timelines(div_id).ob_loaded_interval) == 0) {
                        document.getElementById(div_id + "_timeline_menu_foot_clock").innerHTML = "Loading events... " + ob_get_timelines(div_id).ob_loading_interval + " seconds";
                        ob_get_timelines(div_id).ob_loading_interval = parseInt(ob_get_timelines(div_id).ob_loading_interval) + 1;
                    }
                    else {
                        document.getElementById(div_id + "_timeline_menu_foot_clock").innerHTML = "Loaded " + ob_get_timelines(div_id).eventGetCount + " events " + ob_get_timelines(div_id).ob_loaded_interval + " seconds ago - (load time:" + ob_get_timelines(div_id).loadTime + " seconds)";
                        ob_get_timelines(div_id).ob_loaded_interval = parseInt(ob_get_timelines(div_id).ob_loaded_interval) + 1;
                    }
            }, 1000);
        }

        //Case overviewHeight_Realtime
        this.set_overviewHeight_Realtime(doc, false);

        //Case loadEvents
        var loadEvents = doc.documentElement.getAttribute("loadEvents");
        if (loadEvents != null && loadEvents == "yes")
            if (this.view_mode == "tabular")
                this.create_tabular(doc, 0);
            else {
                // Load events and sessions
                this.load_bands_Realtime(doc, false);
            }

        // Load events and sessions
        var updateEvents = doc.documentElement.getAttribute("updateEvents");
        if (loadEvents != null && updateEvents == "yes")
            if (this.view_mode == "tabular")
                this.create_tabular(doc, 0);
            else
                this.load_bands_Realtime(doc, false);

        //Load events
        // Load all events for overview and each bands
        this.load_overViewEvents(doc, this.overview_band_position);
        for (i = 0; i < this.band_count + 1; i++)
            if (i != this.overview_band_position)
                this.load_bandEvents(doc, i);

        // Set cursor according the current time
        this.update_current_time_cursor("currentTime", false);

        //Case setBackgroundBand
        this.set_backgroundBand_Realtime(doc, false);

        //Case setTheme
        this.set_theme_Realtime(doc, false);

        //Case goto
        openbexi_timeline_goto(doc);

        this.layout();

        //Relaod events again the first time to adjust bands width
        this.load_status = OB_LOADED;
        if (this.reload) {
            this.reload = false;
            this.load_Data_Realtime(div_id, event);
        }
        this.loadTime = ob_get_consumming_time(start_load, new Date());
        openbexi_timeline_debug_real_time(div_id, "load_Data_Realtime: " + this.loadTime, "#6B0963", false);
        setTimeout(function () {
            ob_get_timelines(div_id).ob_loaded_interval = 1
        }, this.loadTime * 1000);

    } catch (e) {
        alert("openbexi_timeline.prototype.load_Data_Realtime() - Exception:" + e.message);
    }
}
openbexi_timeline.prototype.create_bands_Realtime = function (doc, reload) {
    try {

        var timezone = 0;
        var currentTime = ob_parseDateTime(-2, "currentTime");
        //var currentTime1 = ob_parseDateTime(-2, "currentTime");
        //var currentTime2 = ob_parseDateTime(2, "currentTime");
        //var currentTime3 = ob_parseDateTime(-12 * 3600, "currentTime") ;
        //var currentTime4 = ob_parseDateTime(12 * 3600, "currentTime")
        var theme = eval(this.theme + "(this.themeName)");
        theme.autoWidth = true;

        this.eventSources = new Array(this.band_count + 1);
        for (i = 0; i < this.band_count + 1; i++)
            this.eventSources[i] = new Timeline.DefaultEventSource();

        var func = 'function createDefaultBands_onFly(currentTime, timezone, eventSources, theme) {';
        //func += 'theme.autoWidth  = true;';
        //func += 'theme.autoWidthAnimationTime = "500ms";';
        func += 'try { ';
        func += 'var zones = [ ';
        func += '{ ';
        func += 'start:    ob_parseDateTime(-999999 * 3600), ';
        func += 'end:      ob_parseDateTime(999999 * 3600),';
        func += 'magnify:  3,';
        func += ' unit:     Timeline.DateTime.MINUTE,';
        func += 'multiple: 5';
        func += ' } ';
        func += '];';

        func += 'var bandInfos = [ ';
        for (var i = 0; i < this.band_count + 1; i++) {
            if (i == this.overview_band_position && this.displayOverview) {
                func += '   Timeline.createBandInfo({';
                func += '       width:          ' + this.overviewHeight + ', ';
                func += '       intervalUnit:   ' + this.overviewIntervalUnit + ', ';
                func += '       intervalPixels: ' + this.overviewIntervalPixels + ', ';
                func += '       eventSource:    eventSources[' + i + '], ';
                func += '       date:           currentTime, ';
                func += '       timeZone:       timezone ,  ';
                func += '       overview:          ' + this.overview + ', ';
                func += '}),';
            } else {
                func += '   Timeline.createHotZoneBandInfo({';
                func += '       width:          "' + this.band_width[i] + '", ';
                func += '       intervalUnit:   ' + this.intervalUnit + ', ';
                func += '       intervalPixels: ' + this.intervalPixels + ', ';
                func += '       zones:          zones,';
                func += '       eventSource:    eventSources[' + i + '], ';
                func += '       date:           currentTime,';
                func += '       timeZone:       timezone ,';
                func += '       theme:          theme';
                func += '   }),';
            }
        }
        func += '];';

        for (i = 0; i < this.band_count + 1; i++) {
            if (i == this.overview_band_position && this.displayOverview) {
                func += 'bandInfos[' + i + '].decorators = [';
                func += '    new Timeline.SpanHighlightDecorator({';
                func += '        startDate:  ob_parseDateTime(-10, "currentTime"),';
                func += '        endDate:    ob_parseDateTime(10, "currentTime"),';
                func += '        color:      "red",';
                func += '        opacity: ' + this.overviewDecoratorOpacity + ', ';
                func += '        startLabel: "Current day",';
                func += '        cssClass: "t-highlight1"';
                func += '    }) ,';
                func += '    new Timeline.SpanHighlightDecorator({';
                func += '        startDate:  ob_parseDateTime(-12 * 3600, "currentTime"),';
                func += '        endDate:    ob_parseDateTime(12 * 3600, "currentTime"),';
                func += '        color:      "#f0c000",';
                func += '        opacity:    50,';
                func += '        cssClass: "t-highlight1"';
                func += '    })];';
            } else {
                func += 'bandInfos[' + i + '].decorators = [';
                func += '    new Timeline.SpanHighlightDecorator({';
                func += '        startDate:  ob_parseDateTime(-2, "currentTime"),';
                func += '        endDate:    ob_parseDateTime(2, "currentTime"),';
                func += '        color:      "red",';
                func += '        opacity: ' + this.decoratorOpacity + ', ';
                //func += '        cssClass: "t-highlight1"';
                func += '    }),';
                func += '    new Timeline.SpanHighlightDecorator({';
                func += '        startDate:  ob_parseDateTime(-2, "currentTime"),';
                func += '        endDate:    ob_parseDateTime(2, "currentTime"),';
                func += '        color:      "red",';
                func += '        opacity:    50,';
                //func += '        cssClass: "t-highlight1"';
                func += '    })];';
            }
        }

        if (this.overview_band_position == 0) {
            for (i = 0; i < this.band_count; i++)
                func += 'bandInfos[' + i + '].syncWith = ' + (i + 1) + ';';
        } else {
            for (i = this.band_count; i > 0; i--)
                func += 'bandInfos[' + i + '].syncWith = ' + (i - 1) + ';';
        }
        func += 'bandInfos[' + this.overview_band_position + '].highlight = true;';

        func += '} catch (e) {';
        func += '   return null;';
        func += '}';
        func += 'return bandInfos; ';
        func += '}';

        var fileref = document.createElement('script');
        fileref.setAttribute("type", "text/javascript");
        fileref.setAttribute("src", eval(func));
        //document.getElementsByTagName("head")[0].appendChild(fileref);
        fileref.onload = function () {
            //ob_get_timelines(div_id).timeline = Timeline.create(document.getElementById(this.div.id), eval("createDefaultBands_onFly(currentTime, timezone,this.eventSources,theme)"), Timeline.HORIZONTAL);
        };

        this.timeline = Timeline.create(document.getElementById(this.div.id), eval("createDefaultBands_onFly(currentTime, timezone,this.eventSources,theme)"), Timeline.HORIZONTAL);

        openbexi_addOnScrollListener(this.div.id);

        if (reload)this.layout();
    }
    catch (e) {
        alert("openbexi_timeline.prototype.create_bands_Realtime - Exception:" + e.message);
    }
}

function openbexi_showEventXMLEditor(event) {
    if (event) openbexi_stopEventPropagation(event);
    openbexiNavigator.window_factory(event, 'ob_menu_RequestBrowser', ob_load_events, 'maximize');
    if (document.getElementById("bexicontext_event_xml_data"))
        document.getElementById("bexicontext_event_xml_data").value = openbexi_getPageData(null, "page", getSelectedBexiObj(null).div.id, "events");
    if (document.getElementById("bexicontext_event_mode"))
        document.getElementById("bexicontext_event_mode").value = openbexi_getPageData(null, "page", getSelectedBexiObj(null).div.id, "mode");
}

function openbexi_timeline_browseXML() {
    try {
        if (this.openbexiNavigator) this.openbexiNavigator.mode = "getTimelineEvents";
    } catch (e) {
    }
}

function openbexi_centerTimeline(div_id, year) {
    ob_get_timelines(div_id)._bands[0].setCenterVisibleDate(new Date(year, 0, 1));
}

function openbexi_centerTimeline_byDate(div_id, date) {
    ob_get_timelines(div_id)._bands[0].setCenterVisibleDate(date);
}

var centerCurrentTime;

function openbexi_centerCurrentTime(timeline, date, timeout, timezone) {
    timeline._bands[0].setCenterVisibleDate(date);
    centerCurrentTime = setTimeout(function () {
        date = ob_parseDateTime(0, "currentTime");
        openbexi_centerCurrentTime(timeline, date, timeout, timezone);
    }, timeout);
}

function openbexi_timeline_load_Data_CB(responseXML) {
    //alert(responseXML);
    try {
        __openbexi_debugC_timeline("openbexi_timeline_load_Data_CB(" + responseXML + ")", "Info:");

        if (responseXML == null || responseXML == "") {
            if (openbexiNavigator) openbexiNavigator.status("openbexi_timeline_load_Data_CB bug ???");
            __openbexi_debugC_timeline("openbexi_timeline_load_Data_CB() Exception:", "No answer from the server");
            openbexi_unloading2();
            return;
        }

        var ob_doc = openbexi_get_documentElement(responseXML, "text/xml");

        var status = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "status", "text");
        if (status != "" && status != "done") {
            __openbexi_debugC_timeline("openbexi_timeline_load_Data_CB() Info:", "status=" + status);
            openbexiNavigator.top_frame_message(status, "50px", "error");
            return;
        }

        var appli_status = get_xml_classe_object_attribut_value(ob_doc, "openbexi_creative", "application", "status");
        if (appli_status != "") {
            __openbexi_debugC_timeline("openbexi_timeline_load_Data_CB() Info:", "appli_status=" + appli_status);
        }

        var exception = get_xml_classe_object_attribut_value(ob_doc, "openbexi_creative", "application", "exception");
        if (exception != "") __openbexi_debugC_timeline("openbexi_timeline_load_Data_CB() Exception:", exception);

        var div_id = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "div", "name");
        if (div_id == "") {
            __openbexi_debugC_timeline("openbexi_timeline_load_Data_CB() div_id not found");
            openbexi_unloading2();
            return;
        }
        var subtype = get_xml_classe_object_attribut_value(ob_doc, "ob_request", "request", "subtype");
        var filename = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "xml", "filename");
        //var xml = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "xml", "text");

        if (subtype == "openbexi_readFileEvents") {
            getSelectedBexiObj(div_id).mode = "local";
            openbexi_updatePageData(null, "page", div_id, "mode", "local");
            getSelectedBexiObj(div_id).EventsXmlFile = filename;
            openbexi_updatePageData(null, "page", div_id, "events", filename);
            openbexi_add_page_data(filename);
            getSelectedBexiObj(div_id).loadXML(filename);
        }
        if (subtype == "openbexi_readBandInfos") {
            var bands = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "js", "shortname");
            getSelectedBexiObj(div_id).bands = bands.replace(".js", "");
            getSelectedBexiObj(div_id).bands_path = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "js", "path");
            openbexi_updatePageData(null, "page", div_id, "bands", bands.replace(".js", ""));
            openbexi_updatePageData(null, "page", div_id, "bands_path", getSelectedBexiObj(div_id).bands_path);
            openbexi_add_javascript(null, getSelectedBexiObj(div_id).bands_path, bands);

            // Dynamically loading external Timeline band template javascript
            getSelectedBexiObj(div_id).timeline = null;
            getSelectedBexiObj(div_id).timeline = getSelectedBexiObj(div_id).create(div_id, getSelectedBexiObj(div_id).resync, getSelectedBexiObj(div_id).timeout, getSelectedBexiObj(div_id).zone, getSelectedBexiObj(div_id).EventsXmlFile, "true", getSelectedBexiObj(div_id).view_mode);
            setTimeout(function () {
                getSelectedBexiObj(div_id).timeline = getSelectedBexiObj(div_id).create(div_id, getSelectedBexiObj(div_id).resync, getSelectedBexiObj(div_id).timeout, getSelectedBexiObj(div_id).zone, getSelectedBexiObj(div_id).EventsXmlFile, "true", getSelectedBexiObj(div_id).view_mode);
            }, 750);
            if (getSelectedBexiObj(div_id).timeline) getSelectedBexiObj(div_id).themeName = Timeline.ThemeName;

        }
        if (subtype == "openbexi_readTheme") {
            var theme = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "js", "shortname");
            getSelectedBexiObj(div_id).theme = theme.replace(".js", "");
            getSelectedBexiObj(div_id).theme_path = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "js", "path");
            openbexi_updatePageData(null, "page", div_id, "theme", theme.replace(".js", ""));
            openbexi_updatePageData(null, "page", div_id, "theme_path", getSelectedBexiObj(div_id).theme_path);
            openbexi_add_javascript(null, getSelectedBexiObj(div_id).theme_path, bands);

            // Dynamically loading external Timeline theme template javascript
            getSelectedBexiObj(div_id).timeline = null;
            getSelectedBexiObj(div_id).updateTheme(getSelectedBexiObj(div_id).theme + ".js", true);
            setTimeout(function () {
                getSelectedBexiObj(div_id).updateTheme(getSelectedBexiObj(div_id).theme + ".js", true);
            }, 750);
            if (getSelectedBexiObj(div_id).timeline) getSelectedBexiObj(div_id).themeName = Timeline.ThemeName;
        }


        if (appli_status == "CannotReadFile")
            openbexiNavigator.top_frame_message("Cannot found and load " + filename, "30px", "warning");
        if (appli_status == "CannotSaveFile")
            openbexiNavigator.top_frame_message("Cannot save " + filename, "30px", "warning");
        if (appli_status == "ok")
            openbexiNavigator.top_frame_message(filename + " successfully saved", "30px", "info");

    } catch (e) {
        __openbexi_debugC_timeline("openbexi_timeline_load_Data_CB()", "Exception:" + e.message);
    }
    openbexi_unloading2();

    // execute callback if any
    try {
        var ob_callback = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "ob_callback", "name");
        if (ob_callback != "") {
            ob_callback = "ob_ob_alert";
            eval("new " + ob_callback + ";");
        }
    } catch (e) {
    }

}

function openbexi_unformatJSText(text) {
    var textunFormated = "";
    var flag = false;
    for (var i = 0; i < text.length; i++) {
        if (i != text.length && text[i] == "/" && text[i + 1] == "/")
            flag = true
        if ((text[i] != '\n' && text[i] != '\t' && text[i] != '\r')) {
            if (!flag) textunFormated += text[i];
        } else
            flag = false;
    }
    return textunFormated;
}

function openbexi_unformatXMLText(text) {
    var textunFormated = "";
    for (var i = 0; i < text.length; i++) {
        if ((text[i] != '\n' && text[i] != '\t' && text[i] != '\r'))
            textunFormated += text[i];
    }
    return textunFormated;
}
openbexi_timeline.prototype.scroll = function () {
    try {
        var current_band_number = 1;
        if (this.overview_band_position > 0)
            current_band_number = 0;
        if (document.getElementById(this.div.id + "_timeline_foot") == null)  return;
        var centerDate = this.timeline._bands[current_band_number].getCenterVisibleDate();
        var centerDateS = ob_dayNames[centerDate.getDay()] + ' ' + centerDate.getDate() + ' ' + ob_monthNames[centerDate.getMonth()] + ' ' + centerDate.getFullYear() + '  ' + ( centerDate.getHours() < 10 ? "0" : "" ) + centerDate.getHours() + '' + ( centerDate.getMinutes() < 10 ? ":0" : ":" ) + centerDate.getMinutes() + '' + ( centerDate.getSeconds() < 10 ? ":0" : ":" ) + centerDate.getSeconds();
        if (this.view_mode == "grant" && this.cursor_time != centerDateS) {
            var start_scroll = new Date();
            var comment = ""
            if (ob_parseDateTime(0, centerDateS) > ob_parseDateTime(0, "currentTime"))
                comment = "(future)"
            if (ob_parseDateTime(0, centerDateS) < ob_parseDateTime(0, "currentTime"))
                comment = "(Past)"
            if (this.timeline._bands[current_band_number]._ether.dateToPixelOffset(new Date().getTime()) < 0 || this.timeline._bands[current_band_number]._ether.dateToPixelOffset(new Date().getTime()) > this.timeline._bands[current_band_number]._viewLength) {
                document.getElementById(this.div.id + "_timeline_foot").innerHTML = "<div id=\"" + this.div.id + "_timeline_foot_clock\" style=\"position:absolute;background:black;color:white;left:" + ((parseInt(document.getElementById(this.div.id + "_timeline").style.width) / 2) - 140) + "px;top:10px;\">" + centerDateS + " " + comment + "</div>";
                this.resync_cursor = false;
            } else {
                document.getElementById(this.div.id + "_timeline_foot").innerHTML = "";
                this.resync_cursor = true;
            }
            this.cursor_previous_shift = this.cursor_shift;
            //Save new cursor position in pixel only if significant change occurs  (+or 5 pixels)
            this.cursor_shift = ((new Date(this.timeline._bands[current_band_number]._ether.pixelOffsetToDate(this.timeline._bands[current_band_number]._viewLength / 2)) - (new Date(this.timeline._bands[current_band_number]._ether.pixelOffsetToDate(this.timeline._bands[current_band_number]._ether.dateToPixelOffset(new Date().getTime()))))) / 1000);
            if (this.cursor_shift > this.cursor_previous_shift - 5 && this.cursor_shift < this.cursor_previous_shift + 5)
                this.cursor_shift = this.cursor_previous_shift;
            this.update_cursor(centerDate);
            this.cursor_time = centerDateS;
            //this.set_bands_width();
            openbexi_timeline_debug_real_time2(this.div.id, "ScrollListener: " + ob_get_consumming_time(start_scroll, new Date()), "#FA260A", false);

        }
    } catch (e) {
        openbexi_timeline_debug_real_time(div_id, "ScrollListener exception: " + e.message, "#0E0F0E", false);
        //alert("openbexi_addOnScrollListener() Exception:" + e.message);

    }
}
function openbexi_addOnScrollListener(div_id) {
    try {
        ob_get_timelines(div_id).timeline._bands[ob_get_timelines(div_id).overview_band_position].addOnScrollListener(function () {
            ob_get_timelines(div_id).scroll();
        });
    } catch (e) {
        openbexi_timeline_debug_real_time(div_id, "ScrollListener: " + e.message, "#0E0F0E", false);
        //alert("openbexi_addOnScrollListener() Exception:" + e.message);
    }
}
function openbexi_createTimeline(timeline, divId, file) {
    try {
        if (timeline == null) timeline = new openbexi_timeline("", "", divId, "", "", "", "", "");
        ob_save_timelines(timeline);
        openbexi_addOnScrollListener(divId);
    } catch (e) {
        alert(e);
    }
    try {
        //timeline.create(divId, timeline.resync, timeline.timeout,timeline.zone);
        if (file != undefined && file != "" && file != "no_load.xml") timeline.loadXML(file);
    } catch (e) {
    }
    return timeline;
}
function openbexi_timeline_ondrop_cancel(event) {

}

function openbexi_timeline_ondrop_ok(event) {
    try {
        if (!event.dataTransfer) {
            //alert("Your browser does not support the dataTransfer object...");
            return false;
        }
        var file_type = "";
        var file_name = "";
        if (event.dataTransfer.files.length == 0)
            return;
        if (event.dataTransfer.files[0] != undefined) {
            file_type = event.dataTransfer.files[0].type;
            file_name = event.dataTransfer.files[0].name;
        } else {
            //alert("Your browser does not support the dataTransfer object...");
            return false;
        }
        if (event.target != undefined) {
            var parent = event.target.parentElement;
            while (parent != undefined) {
                if (parent.className == ("ob_timeline_menu")) {
                    local_timeline_id = parent.id.replace("_timeline", "");
                    break;
                }
                parent = parent.parentElement;
            }
        } else {
            //alert("Your browser does not support the dataTransfer object...");
            local_timeline_id = "div0";
        }
        //Start loading data
        if (document.getElementById(local_timeline_id + "_timeline_foot") != null)
            document.getElementById(local_timeline_id + "_timeline_foot").innerHTML = "<div id=\"" + local_timeline_id + "_timeline_foot_clock\" style=\"font-size:22px;color:red;position:absolute;left:" + ((parseInt(document.getElementById(local_timeline_id + "_timeline").style.width) / 2) - 140) + "px;top:20px;\">" + "Loading data ..." + "</div>";

        var reader = new FileReader();
        reader.filename = file_name;
        reader.onloadend = function (event) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(event.target.result, 'text/xml');
            // Events
            if (file_name.match(RegExp(".xml")))
                ob_get_timelines(local_timeline_id).load_Data_Realtime(local_timeline_id, doc, true);
        }
        reader.onload = function (event) {
        };
        reader.readAsText(event.dataTransfer.files[0]);
        return false;

    } catch (e) {

    }
    return true;
}
function openbexi_timeline_debug(div_id) {
    try {
        if (OB_DEBUG != true)return;
        var timeline = ob_get_timelines(div_id).timeline;
        var overview_band_position = ob_get_timelines(div_id).overview_band_position;
        var band_count = ob_get_timelines(div_id).band_count;
        if (band_count == 0) band_count = ob_get_timelines(div_id).timeline._bands.length - 1;
        document.getElementById("ob_debug_timeline").style.visibility = "visible";
        document.getElementById("ob_debug_timeline").style.background = "#F7C6F6";
        document.getElementById("ob_debug_timeline").style.opacity = "0.89";
        document.getElementById("ob_debug_timeline").style.top = "500px";
        document.getElementById("ob_debug_timeline").style.height = "900px";
        document.getElementById("ob_debug_timeline").style.left = "0px";
        document.getElementById("ob_debug_timeline").style.width = "250px";
        document.getElementById("ob_debug_timeline").innerHTML = "<b><div style='font-size:13px;'>  - band_count        =" + band_count + "</div></b>";
        document.getElementById("ob_debug_timeline").innerHTML += "<b><div style='font-size:13px;'>  - overview_band_position=" + overview_band_position + "</div></b>";
        document.getElementById("ob_debug_timeline").innerHTML += "<b><div style='font-size:13px;'>  - viewLength        =" + timeline._bands[overview_band_position]._viewLength + "</div></b>";
        document.getElementById("ob_debug_timeline").innerHTML += "<b><div style='font-size:13px;'> - dateToPixelOffset =" + ob_get_timelines(div_id).cursor_shift + "</div></b>";
        for (var i = 0; i < band_count + 1; i++) {
            var eventIdToElmts = timeline._bandInfos[i].eventPainter._eventIdToElmt;
            document.getElementById("ob_debug_timeline").innerHTML += "<div style='font-size:11px;'> - bands[" + i + "].height   =" + timeline._bands[i]._div.clientHeight + "</div>";
            document.getElementById("ob_debug_timeline").innerHTML += "<div style='font-size:11px;'> - eventSource[" + i + "]   =" + timeline._bands[i]._eventSource.getCount() + "</div>";
            var len = 0;
            var maxTop = 0;
            for (var eventIdToElmt in eventIdToElmts) {
                len++;
                eventIdToElmt = eventIdToElmts[eventIdToElmt];
                if (eventIdToElmt.offsetTop > maxTop)
                    maxTop = eventIdToElmt.offsetTop;
                //document.getElementById("ob_debug_timeline").innerHTML += "<div style='font-size:11px;'> - " + len++ + ": id=" + eventIdToElmt.id +"---offsetTop = "+eventIdToElmt.offsetTop+ "</div>";
            }
            if (ob_get_timelines(div_id).band_width != null)
                document.getElementById("ob_debug_timeline").innerHTML += "<div style='font-size:11px;'> - " + len + ": maxTop[" + i + "]=" + maxTop + ": band_width[" + i + "]=" + ob_get_timelines(div_id).band_width[i] + "</div>";
            //for (var j = 0; j < timeline._bands[i]._eventSource.getCount(); j++) {
            //document.getElementById("ob_debug_timeline").innerHTML += "<div style='font-size:11px;'> - eventSource[" + i + "]   id=" + timeline._bands[i]._eventSource._events._events._a[j]._id + " -- color=" + timeline._bands[i]._eventSource._events._events._a[j]._color + "</div>";
        }
    } catch (e) {
        alert("openbexi_timeline_debug - Exception:" + e.message);
    }
}

function ob_get_random_color() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}
function ob_get_consumming_time(startDate, endDate) {

    //  Calculate Differences
    var difference = endDate.getTime() - startDate.getTime();

    difference = difference / 1000;

    return difference;
}
function openbexi_timeline_show_menu(event, div_id, action) {
    try {
        var menu_left = document.getElementById(div_id + "_menu_timeline").style.left;
        var menu_width = document.getElementById(div_id + "_menu_timeline").style.width;
        var timeline_width = document.getElementById(div_id + "_timeline").style.width;
        var resizer_width = document.getElementById(div_id + "_resizer").style.width;
        var new_resizer_left;

        if (action == OB_SHOW_OFF) {
            new_resizer_left = (parseInt(timeline_width) - parseInt(menu_left)) - 16 + "px";
            $ob_jquery("#" + div_id + "_menu_timeline").animate({width: '0px'}, "slow", function () {
                document.getElementById(div_id + "_timeline_menu_icon").style.visibility = "visible";
                document.getElementById(div_id + "_timeline_menu_icon").style.top = parseInt(document.getElementById(div_id + "_timeline_foot").style.top) + parseInt(document.getElementById(div_id + "_timeline_foot").style.height) - parseInt(document.getElementById(div_id + "_timeline_menu_icon").style.height) - 1 + "px";
                document.getElementById(div_id + "_timeline_menu_icon").style.left = "5px";

                document.getElementById(div_id + "_timeline_refresh_icon").style.visibility = "visible";
                document.getElementById(div_id + "_timeline_refresh_icon").style.top = parseInt(document.getElementById(div_id + "_timeline_foot").style.top) + parseInt(document.getElementById(div_id + "_timeline_foot").style.height) - parseInt(document.getElementById(div_id + "_timeline_menu_icon").style.height) - 1 + "px";
                if (ob_get_timelines(div_id).view_mode == "tabular")
                    document.getElementById(div_id + "_timeline_refresh_icon").style.left = "50px";
                else
                    document.getElementById(div_id + "_timeline_refresh_icon").style.left = (parseInt(document.getElementById(div_id + "_timeline").style.width) / 2) + "px";
            });
            $ob_jquery("#" + div_id + "_timeline").animate({left: menu_left}, "slow", function () {
            });
            $ob_jquery("#" + div_id + "_resizer").animate({left: new_resizer_left}, "slow", function () {
            });
        }
        else {
            new_resizer_left = (300 + parseInt(timeline_width) + parseInt(menu_left)) - 32 + "px";
            $ob_jquery("#" + div_id + "_timeline").animate({left: '300px'}, "slow", function () {
            });
            $ob_jquery("#" + div_id + "_menu_timeline").animate({width: '280px'}, "slow", function () {
                document.getElementById(div_id + "_timeline_menu_icon").style.visibility = "hidden";
                document.getElementById(div_id + "_timeline_refresh_icon").style.visibility = "hidden";
            });
            $ob_jquery("#" + div_id + "_resizer").animate({left: new_resizer_left}, "slow", function () {
            });
        }
    } catch (e) {
        alert("openbexi_timeline_show_menu - Exception:" + e.message);
    }
}
var ob_reset_timeline_debug_real_time = 0;
function openbexi_timeline_debug_real_time(div_id, message, color, reset) {
    try {
        if (OB_DEBUG) {
            if (ob_reset_timeline_debug_real_time > 70) {
                reset = true;
                ob_reset_timeline_debug_real_time = 0;
            }
            document.getElementById("ob_debug_timeline_real_time").style.visibility = "visible";
            document.getElementById("ob_debug_timeline_real_time").style.background = "#EBE1C0";
            document.getElementById("ob_debug_timeline_real_time").style.opacity = "0.89";
            document.getElementById("ob_debug_timeline_real_time").style.top = "0px";
            document.getElementById("ob_debug_timeline_real_time").style.height = "900px";
            document.getElementById("ob_debug_timeline_real_time").style.left = "0px";
            document.getElementById("ob_debug_timeline_real_time").style.width = "250px";
            document.getElementById("ob_debug_timeline_real_time").style.overflow = "auto";
            if (reset)
                document.getElementById("ob_debug_timeline_real_time").innerHTML = "<div style='color:" + color + ";font-size:9px;'>" + message + "</div>";
            else
                document.getElementById("ob_debug_timeline_real_time").innerHTML += "<div style='color:" + color + ";font-size:9px;'>" + message + "</div>";
            ob_reset_timeline_debug_real_time++;
        }
    } catch (e) {
        alert("openbexi_timeline_debug_real_time - Exception:" + e.message);
    }
}
var ob_reset_timeline_debug_real_time2 = 0;
function openbexi_timeline_debug_real_time2(div_id, message, color, reset) {
    try {
        if (OB_DEBUG2) {
            if (ob_reset_timeline_debug_real_time2 > 70) {
                reset = true;
                ob_reset_timeline_debug_real_time2 = 0;
            }
            document.getElementById("ob_debug_timeline_real_time").style.visibility = "visible";
            document.getElementById("ob_debug_timeline_real_time").style.background = "#EBE1C0";
            document.getElementById("ob_debug_timeline_real_time").style.opacity = "0.89";
            document.getElementById("ob_debug_timeline_real_time").style.top = "0px";
            document.getElementById("ob_debug_timeline_real_time").style.height = "900px";
            document.getElementById("ob_debug_timeline_real_time").style.left = "0px";
            document.getElementById("ob_debug_timeline_real_time").style.width = "250px";
            document.getElementById("ob_debug_timeline_real_time").style.overflow = "auto";
            if (reset)
                document.getElementById("ob_debug_timeline_real_time").innerHTML = "<div style='color:" + color + ";font-size:9px;'>" + message + "</div>";
            else
                document.getElementById("ob_debug_timeline_real_time").innerHTML += "<div style='color:" + color + ";font-size:9px;'>" + message + "</div>";
            ob_reset_timeline_debug_real_time2++;
        }
    } catch (e) {
        alert("openbexi_timeline_debug_real_time - Exception:" + e.message);
    }
}
