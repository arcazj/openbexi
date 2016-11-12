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


var ob_init_jsPlumb = false;
var ob_import_default = false;
var ob_clear_endpoint = null;
var ob_current_endpoint = null;
var ob_current_connector = null;
var ob_clear_connector = null;
var ob_endpoint_count = 0;
var ob_main_instance = null;
var ob_addlink = "add_link";
var ob_node_styles_BgImg = null;
var ob_node_inspectorAttributes = [
    ['editor'         , 'NodeEditor'   , 'true']
];
var ob_node_popupAttributes = [
    ['menuitem8', 'openbexi_chartFlow_add_endpoint(event,null,null,null,true,null,\'dynamic\')'     , 'AddEndpoint'  , 'gif\/endpoint_x48.png', '48px', '48px'],
    ['menuitem7', 'openbexi_showPropertiesChartFlowEditor(event,\'default\')', 'Dynamic Flowchart Advanced Properties Editor', 'gif\/properties_x48.png', '48px', '48px'],
    ['menuitem18', 'this.backward()'         , 'SendToBack'  , 'gif\/move_backward_x48.png', '48px', '48px'],
    ['menuitem20', 'this.forward()'          , 'BringToFront', 'gif\/move_forward_x48.png', '48px', '48px'],
    ['menuitem25', 'duplicate_HTMLChartFlow(\'vertical\')', 'Duplicate', 'gif\/copyVertical_x48.png', '48px', '48px'],
    ['menuitem26', 'duplicate_HTMLChartFlow(\'horizontal\')', 'Duplicate', 'gif\/copyHorizontal_x48.png', '48px', '48px'],
    ['menuitem36', 'this.removeObject(event);openbexiNavigator.update_menu_editor(null, false);'          , 'DeleteNode', 'gif\/no_chartFlow_x48.png', '48px', '48px']
];
var ob_endpoint_popupAttributes = [
    ['menuitem7', 'openbexi_showPropertiesChartFlowEditor(event,\'currentEndpoint\')', 'Default Dynamic Flowchart Advanced Properties Editor', 'gif\/properties_x48.png', '48px', '48px'],
    ['menuitem9', 'openbexi_remove_endpoint(ob_current_endpoint)'  , 'RemoveEndpoint'  , 'gif\/no_endpoint_x48.png', '48px', '48px']
];
var ob_connector_popupAttributes = [
    ['menuitem9', 'openbexi_remove_connector(ob_current_connector)'  , 'RemoveConnector'  , 'gif\/no_connector_x48.png', '48px', '48px']
];
var ob_overlay_popupAttributes = [
    ['menuitem9', 'remove_overlay(ob_current_overlay)'  , 'RemoveOverlay'  , 'gif\/no_overlay_x48.png', '48px', '48px']
];

var ob_default_properties = {"endpoint": "Dot",
    "paintStyle": {"radius": "5",
        "fillStyle": "#316b31"},
    "connector": "Flowchart",
    "isSource": true,
    "anchors": "TopCenter",
    "maxConnections": 1,
    "connectorStyle": {"strokeStyle": "#316b31",
        "lineWidth": 2},
    "isTarget": true,
    "dropOptions": {"tolerance": "touch",
        "hoverClass": "dropHover",
        "activeClass": "dragActive"},
    "connectorOverlays": [
        ["Arrow",
            {
                "id": "arrow",
                "location": 0.5,
                "width": 12,
                "length": 15,
                "foldback": 0.6,
                "direction": 1,
                "paintStyle": {"fillStyle": "#316b31"}
            }],
        ["Label",
            {
                "id": "label",
                "location": 0.3,
                "label": "text",
                "cssClass": "aLabel",
                "events": {"click": openbexi_get_overlay_editor}
            }]
    ]
};
var ob_connector_text_properties_editor = [
    ['menu_RequestBrowser', 'ob_menu_RequestBrowser', '', '', '', '', '', 'Text Properties for the selected connector', '', '850px', '560px', '', ''],
    ['window_left', 'ob_menu_RequestBrowser_sub_left', '', '', '', '', '', '', '', '', '', 'overflow: hidden;position:absolute;width:0%;', ''],
    ['end_window_left', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_body', 'ob_menu_RequestBrowser_sub', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow: auto;position:absolute;width:100%;', ''],
    ['form', 'ob_form', '', '', '', '', '', '', '', '', '', 'position:absolute;left:0px;', ''],
    ['fieldset', 'ob_fieldset', '', '', '', '', '', '', '', '', '', 'width:780px', ''],
    ['legend', '', '', '', '', '', '', 'Text Properties for the selected connector', '', '', '', '', ''],
    ['textarea', 'bexicontext_flowChart_properties', '', '', '', '', '', 'Properties', '', '', '', '', '18'],
    ['sep', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_form', '', '', '', '', '', '', ' name', '', '', '', '', ''],
    ['end_window_body', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_foot', 'ob_menu_RequestBrowser_sub_foot', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow: hidden;position:absolute;height:20%', ''],
    ['ok', '', 'onclick="openbexi_applyPropertiesTextEditor(event);"', '', 'onmousedown="src=\'gif/ob_ok_down.png\';"', 'onmouseover="src=\'gif/ob_ok_on.png\';"', 'onmouseout="src=\'gif/ob_ok.png\';"', 'Apply', '', '', '', '', ''],
    ['cancel', '', 'onclick="openbexiNavigator.window_factory(event,\'ob_menu_RequestBrowser\',null,\'hidden\');"', '', 'onmousedown="src=\'gif/ob_cancel_down.png\';"', 'onmouseover="src=\'gif/ob_cancel_on.png\';"', 'onmouseout="src=\'gif/ob_cancel.png\';"', 'Cancel', '', '', '', '', ''],

    ['end_window_foot', '', '', '', '', '', '', '', '', '', '', '', '']
];
var ob_chartFlow_properties_editor = [
    ['menu_RequestBrowser', 'ob_menu_RequestBrowser', '', '', '', '', '', 'Dynamic Flowchart Advanced Properties Editor for the selected endpoint/connector', '', '850px', '560px', '', ''],
    ['window_left', 'ob_menu_RequestBrowser_sub_left', '', '', '', '', '', '', '', '', '', 'overflow: hidden;position:absolute;width:0%;', ''],
    ['end_window_left', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_body', 'ob_menu_RequestBrowser_sub', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow: auto;position:absolute;width:100%;', ''],
    ['form', 'ob_form', '', '', '', '', '', '', '', '', '', 'position:absolute;left:0px;', ''],
    ['fieldset', 'ob_fieldset', '', '', '', '', '', '', '', '', '', 'width:780px', ''],
    ['legend', '', '', '', '', '', '', 'Dynamic Flowchart Advanced Properties for the selected endpoint/connector', '', '', '', '', ''],
    ['textarea', 'bexicontext_flowChart_properties', '', '', '', '', '', 'Properties', '', '', '', '', '18'],
    ['sep', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_form', '', '', '', '', '', '', ' name', '', '', '', '', ''],
    ['end_window_body', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_foot', 'ob_menu_RequestBrowser_sub_foot', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow: hidden;position:absolute;height:20%', ''],
    ['ok', '', 'onclick="openbexi_applyPropertiesChartFlowEditor(event);"', '', 'onmousedown="src=\'gif/ob_ok_down.png\';"', 'onmouseover="src=\'gif/ob_ok_on.png\';"', 'onmouseout="src=\'gif/ob_ok.png\';"', 'Apply', '', '', '', '', ''],
    ['cancel', '', 'onclick="openbexiNavigator.window_factory(event,\'ob_menu_RequestBrowser\',null,\'hidden\');"', '', 'onmousedown="src=\'gif/ob_cancel_down.png\';"', 'onmouseover="src=\'gif/ob_cancel_on.png\';"', 'onmouseout="src=\'gif/ob_cancel.png\';"', 'Cancel', '', '', '', '', ''],

    ['end_window_foot', '', '', '', '', '', '', '', '', '', '', '', '']
];
var ob_chartFlow_default_properties_editor = [
    ['menu_RequestBrowser', 'ob_menu_RequestBrowser', '', '', '', '', '', 'Default Dynamic Flowchart Advanced Properties Editor', '', '850px', '560px', '', ''],
    ['window_left', 'ob_menu_RequestBrowser_sub_left', '', '', '', '', '', '', '', '', '', 'overflow: hidden;position:absolute;width:0%;', ''],
    ['end_window_left', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_body', 'ob_menu_RequestBrowser_sub', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow: auto;position:absolute;width:100%;', ''],
    ['form', 'ob_form', '', '', '', '', '', '', '', '', '', 'position:absolute;left:0px;', ''],
    ['fieldset', 'ob_fieldset', '', '', '', '', '', '', '', '', '', 'width:780px', ''],
    ['legend', '', '', '', '', '', '', 'Default Dynamic Flowchart Advanced Properties', '', '', '', '', ''],
    ['textarea', 'bexicontext_flowChart_properties', '', '', '', '', '', 'Properties', '', '', '', '', '18'],
    ['sep', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_form', '', '', '', '', '', '', ' name', '', '', '', '', ''],
    ['end_window_body', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_foot', 'ob_menu_RequestBrowser_sub_foot', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow: hidden;position:absolute;height:20%', ''],
    ['ok', '', 'onclick="openbexi_applyDefaultPropertiesChartFlowEditor(event);"', '', 'onmousedown="src=\'gif/ob_ok_down.png\';"', 'onmouseover="src=\'gif/ob_ok_on.png\';"', 'onmouseout="src=\'gif/ob_ok.png\';"', 'Apply', '', '', '', '', ''],
    ['cancel', '', 'onclick="openbexiNavigator.window_factory(event,\'ob_menu_RequestBrowser\',null,\'hidden\');"', '', 'onmousedown="src=\'gif/ob_cancel_down.png\';"', 'onmouseover="src=\'gif/ob_cancel_on.png\';"', 'onmouseout="src=\'gif/ob_cancel.png\';"', 'Cancel', '', '', '', '', ''],

    ['end_window_foot', '', '', '', '', '', '', '', '', '', '', '', '']
];
var ob_endpoint_json_tree = [
    {
        label: '<b style=\"cursor:pointer;\" >Text color</b>',
        id: 'ob_color.CSS',
        status: 'none',
        children: [
            {
                label: '<font onclick="openbexi_setCSSValue(event, \\\'background\\\', \\\'More\\\');" face="Arial">Enter bg color</font>',
                id: 'ob_more_color3',
                status: 'none'
            }
        ]
    },
    {
        label: '<b style=\"cursor:pointer;\">Endpoint type</b>',
        id: 'ob_endpoint_type.CSS',
        status: 'none',
        children: [
            {
                label: '<a onmouseover="this.style.background=\' url(gif/fading_background_9.png)\';this.style.cursor=\'pointer\';" onmouseout="this.style.background=\'\'; this.style.cursor=\'\';"><font onclick=\"openbexi_setEndpointProperties(event, \'style\', \'Dot\')\"; >Dot</font></a>',
                id: 'ob_template_0_0',
                status: '__TEMPLATE'
            },
            {
                label: '<a onmouseover="this.style.background=\' url(gif/fading_background_9.png)\';this.style.cursor=\'pointer\';" onmouseout="this.style.background=\'\'; this.style.cursor=\'\';"><font onclick="openbexi_setEndpointProperties(event, \'style\',\'Rectangle\')\"; >Rectangle</font></a>',
                id: 'ob_template_0_1',
                status: '__TEMPLATE'
            }
        ]
    },
    {
        label: '<b style=\"cursor:pointer;\">Endpoint size</b>',
        id: 'ob_endpoint_size.CSS',
        status: 'none',
        children: [
            {
                label: '<a onmouseover="this.style.background=\' url(gif/fading_background_9.png)\';this.style.cursor=\'pointer\';" onmouseout="this.style.background=\'\'; this.style.cursor=\'\';"><font onclick=\"openbexi_setEndpointProperties(event, \'radius\', \'+\')\"; >Increase radius</font></a>',
                id: 'ob_template_1_0',
                status: '__TEMPLATE'
            },
            {
                label: '<a onmouseover="this.style.background=\' url(gif/fading_background_9.png)\';this.style.cursor=\'pointer\';" onmouseout="this.style.background=\'\'; this.style.cursor=\'\';"><font onclick=\"openbexi_setEndpointProperties(event, \'radius\', \'-\')\"; >Decrease radius</font></a>',
                id: 'ob_template_1_1',
                status: '__TEMPLATE'
            },
            {
                label: '<a onmouseover="this.style.background=\' url(gif/fading_background_9.png)\';this.style.cursor=\'pointer\';" onmouseout="this.style.background=\'\'; this.style.cursor=\'\';"><font onclick=\"openbexi_setEndpointProperties(event, \'radius\', \'1\')\"; >Enter radius</font></a>',
                id: 'ob_template_1_2',
                status: '__TEMPLATE'
            },
            {
                label: '<a onmouseover="this.style.background=\' url(gif/fading_background_9.png)\';this.style.cursor=\'pointer\';" onmouseout="this.style.background=\'\'; this.style.cursor=\'\';"><font onclick="openbexi_setEndpointProperties(event, \'width\',\'6px\')\"; >Enter width</font></a>',
                id: 'ob_template_1_5',
                status: '__TEMPLATE'
            },
            {
                label: '<a onmouseover="this.style.background=\' url(gif/fading_background_9.png)\';this.style.cursor=\'pointer\';" onmouseout="this.style.background=\'\'; this.style.cursor=\'\';"><font onclick=\"openbexi_setEndpointProperties(event, \'height\',\'6px\')\"; >Enter height</font></a>',
                id: 'ob_template_1_8',
                status: '__TEMPLATE'
            }
        ]
    },
    {
        label: '<b style=\"cursor:pointer;\" >More ...</b>',
        id: 'ob_css_editor',
        status: 'none',
        children: [
            {
                label: '<a onclick=\"display_CSS_editor();\" onmouseover="this.style.background=\\\' url(gif/fading_background_9.png)\\\';this.style.cursor=\\\'pointer\\\';" onmouseout="this.style.background=\\\'\\\'; this.style.cursor=\\\'\\\';"><font ; >CSS editor</font></a>',
                id: 'ob_css_editor2',
                status: 'none'
            },
            {
                label: '<a onclick="openbexi_setCSSValue(event,\\\'border\\\', \\\'0px solid black\\\');" onmouseover="this.style.background=\\\' url(gif/fading_background_9.png)\\\';this.style.cursor=\\\'pointer\\\';" onmouseout="this.style.background=\\\'\\\'; this.style.cursor=\\\'\\\';"><font ; >Remove border</font></a>',
                id: 'ob_template_4_0',
                status: '__TEMPLATE'
            },
            {
                label: '<a onclick="openbexi_setCSSValue(event,\\\'border\\\', \\\'1px solid black\\\');" onmouseover="this.style.background=\\\' url(gif/fading_background_9.png)\\\';this.style.cursor=\\\'pointer\\\';" onmouseout="this.style.background=\\\'\\\'; this.style.cursor=\\\'\\\';"><font ; >Add border</font></a>',
                id: 'ob_template_4_1',
                status: '__TEMPLATE'
            }
        ]
    }
];
var ob_connector_json_tree = [
    {
        label: '<b style=\"cursor:pointer;\" >Stroke color</b>',
        id: 'ob_color.CSS',
        status: 'none',
        children: [
            {
                label: '<font onclick="openbexi_setCSSValue(event, \\\'background\\\', \\\'More\\\');" face="Arial">Enter stroke color</font>',
                id: 'ob_more_color3',
                status: 'none'
            }
        ]
    },
    {
        label: '<b style=\"cursor:pointer;\">Connector style</b>',
        id: 'ob_connector_style',
        status: 'none',
        children: [
            {
                label: '<a onmouseover="this.style.background=\' url(gif/fading_background_9.png)\';this.style.cursor=\'pointer\';" onmouseout="this.style.background=\'\'; this.style.cursor=\'\';"><font onclick=\"openbexi_setConnectorProperties(event, \'style\', \'Bezier\')\"; >Bezier</font></a>',
                id: 'ob_template_0_0',
                status: '__TEMPLATE'
            },
            {
                label: '<a onmouseover="this.style.background=\' url(gif/fading_background_9.png)\';this.style.cursor=\'pointer\';" onmouseout="this.style.background=\'\'; this.style.cursor=\'\';"><font onclick="openbexi_setConnectorProperties(event, \'style\',\'Straight\')\"; >Straight</font></a>',
                id: 'ob_template_0_1',
                status: '__TEMPLATE'
            },
            {
                label: '<a onmouseover="this.style.background=\' url(gif/fading_background_9.png)\';this.style.cursor=\'pointer\';" onmouseout="this.style.background=\'\'; this.style.cursor=\'\';"><font onclick=\"openbexi_setConnectorProperties(event, \'style\',\'Flowchart\')\"; >Flowchart</font></a>',
                id: 'ob_template_0_2',
                status: '__TEMPLATE'
            }
        ]
    },
    {
        label: '<b style=\"cursor:pointer;\">Connector width</b>',
        id: 'ob_connector_width',
        status: 'none',
        children: [
            {
                label: '<a onmouseover="this.style.background=\' url(gif/fading_background_9.png)\';this.style.cursor=\'pointer\';" onmouseout="this.style.background=\'\'; this.style.cursor=\'\';"><font onclick=\"openbexi_setConnectorProperties(event, \'width\', \'+\')\"; >Increase width</font></a>',
                id: 'ob_template_1_0',
                status: '__TEMPLATE'
            },
            {
                label: '<a onmouseover="this.style.background=\' url(gif/fading_background_9.png)\';this.style.cursor=\'pointer\';" onmouseout="this.style.background=\'\'; this.style.cursor=\'\';"><font onclick="openbexi_setConnectorProperties(event,\'width\',\'-\')\"; >Decrease with</font></a>',
                id: 'ob_template_1_1',
                status: '__TEMPLATE'
            },
            {
                label: '<a onmouseover="this.style.background=\' url(gif/fading_background_9.png)\';this.style.cursor=\'pointer\';" onmouseout="this.style.background=\'\'; this.style.cursor=\'\';"><font onclick=\"openbexi_setConnectorProperties(event,\'width\',\'others\')\"; >others</font></a>',
                id: 'ob_template_1_4',
                status: '__TEMPLATE'
            }
        ]
    }
];

var openbexi_chartFlow = function (bexiObj, obj, name, top, left, width, height, positionning, background, create_endpoint) {
    this.loading_status = "loaded";
    this.name = name;
    this.id = name;
    this.type = "openbexi_chartFlow";
    if (name == null || name == "") name = getNewIdDiv("div");

    if (bexiObj == null) {
        this.parentNodeId = "BODY";
    } else {
        this.parentNodeId = bexiObj.id;
    }

    if (obj == null) {
        this.div = document.createElement("div");
        this.div.setAttribute("id", name);
        this.parent = this.div.id;
        this.div.setAttribute("CLASSE", "DIV_CHARTFLOW");
        this.div.setAttribute("creation_date", new Date());
        this.div.selected = false;
        this.div.align = "center";
        this.div.style.top = top;
        this.div.style.left = left;
        this.div.style.width = width;
        this.div.style.height = height;
        this.div.style.borderRadius = "1em";
        this.div.style.backgroundColor = "white";
        this.div.style.opacity = 0.9;
        this.div.style.border = "0.25em solid #ddd";
        this.div.style.position = "absolute";
        if (bexiObj == null) {
            document.body.appendChild(this.div);
            //__openbexi_debugC_page("openbexi_page",document.body.innerHTML)
        } else {
            bexiObj.div.appendChild(this.div);
        }
        this.setData();
        if (create_endpoint)
            openbexi_chartFlow_add_endpoint(null, this.parentNodeId, this.div.id, null, true, null, "dynamic");

    } else {
        this.div = obj;
        this.div.setAttribute("id", name);
        this.parent = this.div.id;
        this.div.setAttribute("CLASSE", "DIV_CHARTFLOW");
        this.div.setAttribute("creation_date", obj.getAttribute("creation_date"));
        this.div.setAttribute("obzindex", obj.getAttribute("obzindex"));
        this.div.setAttribute("ob_template", obj.getAttribute("ob_template"));
        this.div.selected = false;
        this.div.style.position = "absolute";
        this.div.style.top = parseInt(this.div.style.top) + "px";
        if (bexiObj == null) {
            this.div.style.left = (parseInt(this.div.style.left) + parseInt(divPropertiesWidth)) + "px";
            this.div.style.top = (parseInt(this.div.style.top) + parseInt(divPropertiesTop)) + "px";
        }
        this.div.style.zIndex = obj.getAttribute("obzindex");
        this.getData();
    }
    this.genericObject = new openbexi_generic_object(this);
    this.div.onclick = this.my_PickFunc;
    this.div.onmouseover = my_canvas_MouseOverFunc;
    if (obj == null) this.forward();
    this.set_template(this.template, null, null, null);

}
openbexi_chartFlow.prototype.setData = function () {
    openbexi_updatePageData(null, "page", this.div.id, "type", this.type);
    openbexi_updatePageData(null, "page", this.div.id, "subtype", this.subtype);
    openbexi_updatePageData(null, "page", this.div.id, "parentId", this.parentNodeId);
    openbexi_updatePageData(null, "page", this.div.id, "parentType", this.parentType);
    if (this.theme == "" || this.theme == undefined)  this.theme = "default";
    openbexi_updatePageData(null, "page", this.div.id, "theme", this.theme);
    openbexi_updatePageData(null, "page", this.div.id, "subtheme", this.subtheme);
    if (this.template == "" || this.template == undefined)  this.template = "template/ob_chartFlow/default.css";
    openbexi_updatePageData(null, "page", this.div.id, "template", this.template);
};
openbexi_chartFlow.prototype.getData = function () {
    this.type = openbexi_getPageData(null, "page", this.div.id, "type");
    this.subtype = openbexi_getPageData(null, "page", this.div.id, "subtype");
    this.parentNodeId = openbexi_getPageData(null, "page", this.div.id, "parentId");
    this.parentType = openbexi_getPageData(null, "page", this.div.id, "parentType");
    this.theme = openbexi_getPageData(null, "page", this.div.id, "theme");
    this.subtheme = openbexi_getPageData(null, "page", this.div.id, "subtheme");
    this.template = openbexi_getPageData(null, "page", this.div.id, "template");
};
openbexi_chartFlow.prototype.set_template = function (css_file, category, action, rsync_canvas) {
    if (css_file == null || css_file == "")return;
    if (action == "open") {
        this.subtheme = css_file;
        openbexi_updatePageData(null, "page", this.div.id, "subtheme", css_file);
        openbexiNavigator.browse_CSS(null, null, this.subtheme, true);
    }
    else {
        this.genericObject.set_template(this, css_file, action, rsync_canvas);
        this.div.setAttribute((document.all ? "className" : "class"), "ob_chartFlow_" + this.theme);
        //$ob_jquery('#'+this.div.id).addClass("ob_chartFlow_" + this.theme);
    }
}
openbexi_chartFlow.prototype.remove_connectors = function (e) {
    try {
        var connections = jsPlumb.getConnections(this.parentNodeId);
        if (connections != undefined)
            for (var i = 0; i < connections.length; i++) {
                if (connections[i].sourceId == this.div.id) {
                    jsPlumb.detach(connections[i]);
                }
                if (connections[i].targetId == this.div.id) {
                    jsPlumb.detach(connections[i]);

                }
            }
    } catch (e) {
        __openbexi_debugC_page("openbexi_chartFlow.prototype.remove_connector()", "Exception:" + e.message);
    }
}
openbexi_chartFlow.prototype.remove_endpoints = function (e) {
    try {
        var connections = jsPlumb.getConnections(this.parentNodeId);
        if (connections != undefined) {
            for (var i = 0; i < connections.length; i++) {
                openbexi_remove_endpoint(connections[i].endpoints[0]);
                openbexi_remove_endpoint(connections[i].endpoints[1]);
            }
        }
    } catch (e) {
        __openbexi_debugC_page("openbexi_chartFlow.prototype.remove_connector()", "Exception:" + e.message);
    }
}
function openbexi_remove_connector(e) {
    try {
        openbexi_stopEventPropagation(e);
        if (ob_current_connector != null) jsPlumb.detach(ob_current_connector);
    } catch (e) {
        __openbexi_debugC_page("openbexi_remove_connector()", "Exception:" + e.message);
    }
}
openbexi_chartFlow.prototype.getClass = function () {
    return "ob_chartFlow_" + this.theme;
};
openbexi_chartFlow.prototype.count_endpoints = function (div_id) {
    var endpoints = jsPlumb.getEndpoints(div_id);
    if (endpoints != null && endpoints != undefined)
        return endpoints.length
    return 0;
}
function openbexi_detect_if_add_endpoint(e) {
    __openbexi_debugC_page("openbexi_detect_if_add_endpoint()", "Info:" + e.target.id);
}

function openbexi_find_endpoints_json_index(divId, endpointId) {
    //__openbexi_debugC_page("openbexi_find_endpoints_json_index("+endpointId+")");
    for (var i = 0; i < document.getElementById(divId).ob_endpoints.length; i++) {
        if (document.getElementById(divId).ob_endpoints[i].id == endpointId)
            return i;
    }
    return null;
}

function openbexi_chartFlow_add_endpoint(event, div_parent, div_id, json, new_anchor, anchors_position, mode) {
    try {

        if (div_id == null || div_id == undefined)
            div_id = getSelectedBexiObj(null).div.id;

        if (!ob_import_default) {
            __openbexi_debugC_page("openbexi_chartFlow_add_endpoint()", "Error: jsPlumb is not ready ...   ");
            return null;
        }
        if (document.getElementById(div_id).ob_endpoints == undefined) document.getElementById(div_id).ob_endpoints = [];
        if (document.getElementById(div_id).ob_connections_json == undefined) document.getElementById(div_id).ob_connections_json = [];
        if (document.getElementById(div_id).ob_endpoints_json == undefined)  document.getElementById(div_id).ob_endpoints_json = [];
        if (div_parent == null)
            ob_default_properties.scope = getSelectedBexiObj(div_id).parentNodeId;
        else
            ob_default_properties.scope = div_parent;
        if (document.getElementById(div_id).ob_scope == undefined) document.getElementById(div_id).ob_scope = ob_default_properties.scope;

        if (new_anchor) {
            if (anchors_position == null || anchors_position == undefined) {
                anchors_position = openbexi_chartFlow_get_anchors_position(event, div_id);
                if (anchors_position == null) {
                    return ob_current_endpoint;
                }
            }
            ob_default_properties.anchors = anchors_position;
        }
    } catch (e) {
        __openbexi_debugC_page("openbexi_chartFlow_add_endpoint()", "Exception:" + e.message);
    }

    var ob_properties;
    try {
        if (json != null && json != "") {
            var json_tmp = openbexi_formatJsonText(json);
            ob_properties = JSON.parse(json_tmp);
        } else {
            ob_properties = ob_default_properties;
            json = JSON.stringify(ob_properties);
        }
    } catch (e) {
        __openbexi_debugC_page("openbexi_chartFlow_add_endpoint()", "Exception:" + e.message);

    }
    try {
        var endpoint = jsPlumb.addEndpoint(div_id, ob_properties);
        if (mode == "dynamic") {
            endpoint.bind("dblclick", function (e) {
                openbexi_endpoind_bind_dblclick(e)
            });
            endpoint.bind("click", function (e) {
                //__openbexi_debugC_page("openbexi_chartFlow_add_endpoint():click", "Info:" + e.elementId + "  " + e.id);
                openbexi_update_endpoint_json_tree(endpoint);
                openbexi_endpoind_bind_click(e);
            });
            endpoint.bind("mouseenter", function (e) {
                if (getSelectedBexiObj(null).div.id == e.elementId)
                    openbexi_set_draggable(e.elementId, false);
                //__openbexi_debugC_page("openbexi_chartFlow_add_endpoint():mouseenter", "Info:" + e.elementId + "  " + e.id);
            });
            endpoint.bind("mouseexit", function (e) {
                if (getSelectedBexiObj(null).div.id == e.elementId)
                    openbexi_set_draggable(e.elementId, true);
                // __openbexi_debugC_page("openbexi_chartFlow_add_endpoint():onmouseexit", "Info:" + e.elementId + "  " + e.id);
            });
            if (ob_init_jsPlumb == false) {
                ob_init_jsPlumb = true;
                jsPlumb.bind("beforeDetach", function (connection) {
                    __openbexi_debugC_page("jsPlumb.bind():beforeDetach", "Info:" + connection);
                    return true;
                });
                jsPlumb.bind("beforeDrop", function (connection) {
                    __openbexi_debugC_page("jsPlumb.bind():beforeDrop", "Info:" + connection);
                    return true;
                });
                jsPlumb.bind("dblclick", function (conn, originalEvent) {
                    try {
                        if (confirm("Delete connection from " + conn.sourceId + " to " + conn.targetId + "?")) {
                            jsPlumb.detach(conn);
                        }
                    } catch (e) {
                        __openbexi_debugC("jsPlumbConnectiondblclick()", "Exception:" + e.message);
                    }
                });
                jsPlumb.bind("jsPlumbConnectionDetached", function (e) {
                    try {
                        __openbexi_debugC_page("jsPlumb.bind():jsPlumbConnectionDetached", "event:" + e);
                        return true;
                    } catch (e) {
                        __openbexi_debugC("jsPlumbConnectionDetached()", "Exception:" + e.message);
                    }
                });
                jsPlumb.bind("jsPlumbConnection", function (info) {
                    try {
                        //__openbexi_debugC_page("jsPlumb.bind():jsPlumbConnection", "Info:" + info);
                    } catch (e) {
                        __openbexi_debugC("jsPlumbConnection()", "Exception:" + e.message);
                    }
                });
            }
            document.getElementById(div_id).ob_endpoints_json.push(json);
        }
        //document.getElementById(div_id).style.zIndex=0;
        document.getElementById(div_id).ob_endpoints.push(endpoint);
    } catch (e) {
        __openbexi_debugC_page("openbexi_chartFlow_add_endpoint()", "Exception:" + e.message);
    }
    try {
        var label = ob_properties.connectorOverlays[1][1].label;
        document.getElementById(div_id).connectionOverlayLabel = label;

    } catch (e) {
    }
    return endpoint;
}

function openbexi_add_overlay(type, connection, json) {
    try {
        var overlay = [];

        var overlays = connection.getOverlays();

        if (json != null) {
            var json_tmp = openbexi_formatJsonText(json);
            var overlay_tmp = JSON.parse(json_tmp);
            if (overlay_tmp[0] == "Label") {
                overlay = ["Label",
                    {
                        "connection": connection.id,
                        "id": overlay_tmp[1].id,
                        "location": overlay_tmp[1].location,
                        "label": overlay_tmp[1].label,
                        "cssClass": overlay_tmp[1].cssClass,
                        "events": {"click": openbexi_get_overlay_editor}
                    }];
            }
            else {
                overlay = ["Arrow",
                    {
                        "connection": connection.id,
                        "id": overlay_tmp[1].id,
                        "location": overlay_tmp[1].location,
                        "width": overlay_tmp[1].width,
                        "length": overlay_tmp[1].length,
                        "foldback": overlay_tmp[1].foldback,
                        "direction": overlay_tmp[1].direction,
                        "paintStyle": overlay_tmp[1].paintStyle
                    }]
            }
        } else {
            if (type == "Label") {
                overlay = ["Label",
                    {
                        "connection": connection.id,
                        "id": "label__" + connection.id,
                        "location": 0.3,
                        "label": "text",
                        "cssClass": "aLabel",
                        "events": {"click": openbexi_get_overlay_editor}
                    }];
            }
            else {
                overlay = ["Arrow",
                    {
                        "connection": connection.id,
                        "id": "Arrow__" + connection.id,
                        "location": 0.5,
                        "width": 12,
                        "length": 15,
                        "foldback": 0.6,
                        "direction": 1,
                        "paintStyle": {"fillStyle": "#316b31"}
                    }]
            }
        }
        connection.addOverlay(overlay);
        json = JSON.stringify(overlay);

        var overlay_jason;
        var overlay_count = document.getElementById(connection.sourceId).ob_overlays_json.length;
        for (var i = 0; i < overlay_count; i++) {
            overlay_jason = document.getElementById(connection.sourceId).ob_overlays_json;
            if (overlay_jason.indexOf(type)) {
                var json_tmp2 = openbexi_unformatJsonText(overlay_jason);
                var overlay_tmp2 = JSON.parse(json_tmp2);
                connection.hideOverlay(overlay_tmp2[1].id);
                document.getElementById(connection.sourceId).ob_overlays_json.splice(i, 1);
            }
        }
        document.getElementById(connection.sourceId).ob_overlays_json.push(json);
    } catch (e) {
        __openbexi_debugC_page("openbexi_add_label()", "Exception:" + e.message);

    }
}

function openbexi_chartFlow_get_anchors_position(event, div_id) {
    var index;
    var TopCenter = false;
    var BottomCenter = false;
    var LeftMiddle = false;
    var RightMiddle = false;
    var Top025 = false;
    var Top075 = false;
    var Bottom025 = false;
    var Bottom075 = false;
    var Left025 = false;
    var Left075 = false;
    var Right025 = false;
    var Right075 = false;
    for (var i = 0; i < document.getElementById(div_id).ob_endpoints.length; i++) {
        index = i;
        if (document.getElementById(div_id).ob_endpoints[i].anchor.type == "TopCenter") TopCenter = true;
        if (document.getElementById(div_id).ob_endpoints[i].anchor.type == "BottomCenter") BottomCenter = true;
        if (document.getElementById(div_id).ob_endpoints[i].anchor.type == "LeftMiddle") LeftMiddle = true;
        if (document.getElementById(div_id).ob_endpoints[i].anchor.type == "RightMiddle") RightMiddle = true;
        if (document.getElementById(div_id).ob_endpoints[i].anchor.type1 == "Top025") Top025 = true;
        if (document.getElementById(div_id).ob_endpoints[i].anchor.type1 == "Top075") Top075 = true;
        if (document.getElementById(div_id).ob_endpoints[i].anchor.type1 == "Bottom025") Bottom025 = true;
        if (document.getElementById(div_id).ob_endpoints[i].anchor.type1 == "Bottom075") Bottom075 = true;
        if (document.getElementById(div_id).ob_endpoints[i].anchor.type1 == "Left025") Left025 = true;
        if (document.getElementById(div_id).ob_endpoints[i].anchor.type1 == "Left075") Left075 = true;
        if (document.getElementById(div_id).ob_endpoints[i].anchor.type1 == "Right025") Right025 = true;
        if (document.getElementById(div_id).ob_endpoints[i].anchor.type1 == "Right075") Right075 = true;
    }
    if (!TopCenter)  return "TopCenter";
    if (!BottomCenter)   return"BottomCenter";
    if (!LeftMiddle)   return "LeftMiddle";
    if (!RightMiddle)  return "RightMiddle";
    // Don't add new endpoint with x/y = 0.25 or 0.75 because of jsPlumb bug when drawing connector
    //return null;
    if (!Top025) {
        document.getElementById(div_id).ob_endpoints[index].anchor.type1 = "Top025";
        return [ 0.25, 0, 0, -1 ];
    }
    if (!Top075) {
        document.getElementById(div_id).ob_endpoints[index].anchor.type1 = "Top075";
        return [ 0.75, 0, 0, -1 ];
    }
    if (!Bottom025) {
        document.getElementById(div_id).ob_endpoints[index].anchor.type1 = "Bottom025";
        return [ 0.25, 1, 0, -1 ];
    }
    if (!Bottom075) {
        document.getElementById(div_id).ob_endpoints[index].anchor.type1 = "Bottom075";
        return [ 0.75, 1, 0, -1 ];
    }
    if (!Left025) {
        document.getElementById(div_id).ob_endpoints[index].anchor.type1 = "Left025";
        return [ 0, 0.25, 0, -1 ];
    }
    if (!Left075) {
        document.getElementById(div_id).ob_endpoints[index].anchor.type1 = "Left075";
        return [ 0, 0.75, 0, -1 ];
    }
    if (!Right025) {
        document.getElementById(div_id).ob_endpoints[index].anchor.type1 = "Right025";
        return [ 1, 0.25, 0, -1 ];
    }
    if (!Right075) {
        document.getElementById(div_id).ob_endpoints[index].anchor.type1 = "Right075";
        return [ 1, 0.75, 0, 0.75 ];
    }
    return null;
}

function openbexi_endpoind_blinking(endpoint) {
    if (endpoint.isVisible())
        endpoint.setVisible(false, true, true);
    else
        endpoint.setVisible(true, true, true);
    ob_clear_endpoint = setTimeout(function () {
        openbexi_endpoind_blinking(endpoint)
    }, 300);
}

function openbexi_connector_blinking(connector) {
    if (connector.isVisible())
        connector.setVisible(false, false, true);
    else
        connector.setVisible(true, false, true);
    ob_clear_connector = setTimeout(function () {
        openbexi_connector_blinking(connector)
    }, 300);
}

function openbexi_getChartFlow_connections(node_id, original_endpoint_id) {
    var connection_list = [];
    try {
        //Getconnections
        var scope = document.getElementById(node_id).ob_scope;
        var connections = jsPlumb.getConnections(scope);
        openbexi_updatePageData(null, "chartflow", "connection", "count", connections.length);
        if (connections != undefined)
            for (i = 0; i < connections.length; i++) {
                if (original_endpoint_id == connections[i].endpoints[0].id && original_endpoint_id == connections[i].endpoints[1].id) {
                    connection_list.push(connections[i].sourceId + "___undefined___" + connections[i].targetId + "___undefined");
                }
                else if (original_endpoint_id == connections[i].endpoints[0].id) {
                    connection_list.push(connections[i].sourceId + "___undefined___" + connections[i].targetId + "___" + connections[i].endpoints[1].id);
                }
                else if (original_endpoint_id == connections[i].endpoints[1].id) {
                    connection_list.push(connections[i].sourceId + "___" + connections[i].endpoints[0].id + "___" + connections[i].targetId + "___undefined");
                }
            }
    } catch (e) {
        __openbexi_debugC_page("openbexi_getChartFlow_connections()", "Exception:" + e.message);
    }
    return connection_list;
}

function openbexi_rebuildChartFlow_connections(connections, endpoind_id, json) {
    var remap_endpoint = [];
    try {
        openbexi_saveChartFlow();
        var cout_node = openbexi_getPageData(null, "chartflow", "node", "count");
        for (var j = 0; j < cout_node; j++) {
            var div_id = openbexi_getPageData(null, "chartflow", "node", "id_" + j, openbexi_object[j].div.id);
            var cout_endpoint = openbexi_getPageData(null, div_id, "endpoint", "count");
            for (var i = 0; i < cout_endpoint; i++) {
                var endpoint_id = openbexi_getPageData(null, div_id, "endpoint", "id_" + i);
                remap_endpoint[endpoint_id] = i;
            }
        }
        // Rebuild connections
        for (i = 0; i < connections.length; i++) {
            var items = connections[i].split("___");
            if (items[1] == "undefined")items[1] = endpoind_id;
            if (items[3] == "undefined")items[3] = endpoind_id;
            var endpoint_index_source = remap_endpoint[items[1]];
            var endpoint_index_target = remap_endpoint[items[3]];
            var conn = jsPlumb.connect({sourceEndpoint: document.getElementById(items[0]).ob_endpoints[endpoint_index_source], targetEndpoint: document.getElementById(items[2]).ob_endpoints[endpoint_index_target]}, json);
            try {
                //var label = document.getElementById(items[0]).connectionOverlayLabel;
                //conn.setLabel(label);
                //ob_properties.connectorOverlays[0][0]="Arrow";
                //ob_properties.connectorOverlays[0][1].location="0.9";

                //ob_properties.connectorOverlays[1][0]="Label";
                //ob_properties.connectorOverlays[1][1].location="0.3";
                //ob_properties.connectorOverlays[1][1].id="label";
                //ob_properties.connectorOverlays[1][1].label="text33333";
                //ob_properties.connectorOverlays[1][1].cssClass="aLabel";

            } catch (e) {
            }
        }
        jsPlumb.repaintEverything();
    } catch (e) {
        __openbexi_debugC_page("openbexi_rebuildChartFlow_connections()", "Exception:" + e.message);
    }
}

function openbexi_getChartFlow_CB(responseXML) {
    var ob_doc = openbexi_get_documentElement(responseXML, "text/xml");
    var status = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "status", "text");
    var file = get_xml_classe_object_attribut_value(ob_doc, "file", "xml", "name");
    try {
        if (openbexiNavigator) {
            if (status != "OK")
                openbexiNavigator.status("ChartFlow not updated:" + file, "red");
            else
                openbexiNavigator.status("ChartFlow updated:" + file, "#abff4b");
        }
    } catch (e) {
    }
}

function openbexi_saveChartFlow() {
    try {
        // Clean up old ref.
        try {
            openbexi_deletePageData(null, "chartflow", "ALL", "ALL", null);
        }
        catch (e) {
            __openbexi_debugC_page("openbexi_saveChartFlow", "Exception:" + e.message);
        }

        //Save Endpoints for each node
        var count_node = 0;

        var doc = set_xml_classe_object_attribut_value(null, "ob_request", "request", "type", "openbexi_charFlowRequest");
        doc = set_xml_classe_object_attribut_value(doc, "file", "xml", "name", "project/" + openbexiNavigator.projectName + "/data/chartFlow_" + openbexiNavigator.HTML_pageName.replace(".html", "") + ".xml");
        var ob_xml = openbexi_get_xmlString(doc);

        for (var j = 0; j < openbexi_object.length; j++) {
            var div = document.getElementById(openbexi_object[j].div.id);
            if (div.ob_endpoints != undefined && div.ob_endpoints.length > 0) {
                openbexi_updatePageData(null, "chartflow", "node", "id_" + count_node, div.id);
                doc = set_xml_classe_object_attribut_value(doc, "chartflow", "node", "id_" + count_node, div.id);
                doc = set_xml_classe_object_attribut_value(doc, div.id, "node", "parent", openbexi_object[j].parentNodeId);
                openbexi_updatePageData(null, div.id, "node", "parent", openbexi_object[j].parentNodeId);
                doc = set_xml_classe_object_attribut_value(doc, div.id, "node", "type", openbexi_object[j].type);
                openbexi_updatePageData(null, div.id, "node", "type", openbexi_object[j].type);
                doc = set_xml_classe_object_attribut_value(doc, div.id, "node", "style", openbexi_get_CSS(div));
                doc = set_xml_classe_object_attribut_value(doc, div.id, "node", "theme", openbexi_object[j].theme);
                doc = set_xml_classe_object_attribut_value(doc, div.id, "node", "template", openbexi_object[j].template);
                if (openbexi_object[j].type == "openbexi_img") {
                    doc = set_xml_classe_object_attribut_value(doc, div.id, "node", "img_id", openbexi_object[j].img.id);
                    doc = set_xml_classe_object_attribut_value(doc, div.id, "node", "src", openbexi_object[j].img.src);
                }
                if (openbexi_object[j].type == "openbexi_dojo_editor") {
                    var
                            doc = set_xml_classe_object_attribut_value(doc, div.id, "node", "inner", openbexi_object[j].innerHTML_and_EVENTS(div.id));
                }
                openbexi_updatePageData(null, div.id, "endpoint", "count", div.ob_endpoints.length);
                doc = set_xml_classe_object_attribut_value(doc, div.id, "endpoint", "count", div.ob_endpoints.length);
                count_node++;
                for (var i = 0; i < div.ob_endpoints.length; i++) {
                    openbexi_updatePageData(null, div.id, "endpoint", "id_" + i, div.ob_endpoints[i].id);
                    doc = set_xml_classe_object_attribut_value(doc, div.id, "endpoint", "id_" + i, div.ob_endpoints[i].id);
                    openbexi_updatePageData(null, div.id, div.ob_endpoints[i].id, "json", div.ob_endpoints_json[i]);
                    doc = set_xml_classe_object_attribut_value(doc, div.id, div.ob_endpoints[i].id, "json", div.ob_endpoints_json[i]);
                }
            }
        }
        openbexi_updatePageData(null, "chartflow", "node", "count", count_node);
        doc = set_xml_classe_object_attribut_value(doc, "chartflow", "node", "count", count_node);

        if (count_node > 0) {
            //Save connections
            var connections = jsPlumb.getConnections("*");
            openbexi_updatePageData(null, "chartflow", "connection", "count", connections.length);
            doc = set_xml_classe_object_attribut_value(doc, "chartflow", "connection", "count", connections.length);
            if (connections != undefined)
                for (i = 0; i < connections.length; i++) {
                    var link = connections[i].sourceId + "___" + connections[i].endpoints[0].id + "___" + connections[i].targetId + "___" + connections[i].endpoints[1].id + "___" + connections[i].id;
                    openbexi_updatePageData(null, "chartflow", "connection", "link_" + i, link);
                    doc = set_xml_classe_object_attribut_value(doc, "chartflow", "connection", "link_" + i, link);
                    div = document.getElementById(connections[i].sourceId);
                    openbexi_updatePageData(null, "chartflow", link, "json", div.ob_connections_json[connections[i].id]);
                    doc = set_xml_classe_object_attribut_value(doc, "chartflow", link, "json", div.ob_connections_json[connections[i].id]);
                }

            var ob_char_xml = openbexi_get_xmlString(doc);
            var mode_sync = openbexi_synchron();
            openbexi_connect_to_server(null, mode_sync, ob_xml + "\n " + ob_char_xml, openbexi_getChartFlow_CB);
        }

    } catch (e) {
        __openbexi_debugC_page("openbexi_saveChartFlow()", "Exception:" + e.message);
    }
}

function openbexi_rebuildChartFlow_CB(responseXML) {
    try {
        if (openbexiNavigator)
            openbexi_rebuildChartFlow("dynamic", responseXML);
        else
            openbexi_rebuildChartFlow("static", responseXML);
    } catch (e) {
    }
}

function openbexi_rebuildChartFlow(mode, responseXML) {
    try {
        var endpoint;
        var json;

        if (responseXML == undefined)
            responseXML = OPENBEXI_PAGES_DATA_XML;

        var ob_doc = openbexi_get_documentElement(responseXML, "text/xml");
        var cout_node = get_xml_classe_object_attribut_value(ob_doc, "chartflow", "node", "count");
        if (cout_node == 0) return;
        for (var j = 0; j < cout_node; j++) {
            var div_id = get_xml_classe_object_attribut_value(ob_doc, "chartflow", "node", "id_" + j);
            var cout_endpoint = get_xml_classe_object_attribut_value(ob_doc, div_id, "endpoint", "count");

            // Create node if it does not exist, and set up any css  (this case occurs when chartflow data comes from xml file)
            var parent = get_xml_classe_object_attribut_value(ob_doc, div_id, "node", "parent");
            if (!document.getElementById(div_id)) {
                var bexiParent = getSelectedBexiObj(parent);
                if (bexiParent.id == "BODY") bexiParent = null;
                var type = get_xml_classe_object_attribut_value(ob_doc, div_id, "node", "type");
                var style = get_xml_classe_object_attribut_value(ob_doc, div_id, "node", "style");
                var theme = get_xml_classe_object_attribut_value(ob_doc, div_id, "node", "theme");
                var template = get_xml_classe_object_attribut_value(ob_doc, div_id, "node", "template");
                if (type == "openbexi_img") {
                    var src = get_xml_classe_object_attribut_value(ob_doc, div_id, "node", "src");
                    var img_id = get_xml_classe_object_attribut_value(ob_doc, div_id, "node", "img_id");
                    var img = new openbexi_img(bexiParent, null, div_id, src, 0, 0, 0, 0, true);
                    img.div.style["cssText"] = style;
                    img.set_template(theme, null, null, null);
                    openbexi_updatePageData(null, "page", div_id, "template", template);
                    save_openbexi_object(img, false);
                    if (bexiParent == null) {
                        img.div.style.top = (parseInt(img.div.style.top) + parseInt(divPropertiesTop)) + "px";
                        //ADD_DHTML(img.div.id + CURSOR_MOVE);
                    }
                    img.add(src);
                }
                else if (type == "openbexi_page") {
                    var dojo_page = new openbexi_page(bexiParent, null, div_id, 0, 0, 0, 0, "none", "");
                    dojo_page.div.style["cssText"] = style;
                    dojo_page.set_template(theme, null, null, null);
                    openbexi_updatePageData(null, "page", div_id, "template", template);
                    save_openbexi_object(dojo_page, false);
                    if (bexiParent == null) {
                        dojo_page.div.style.top = (parseInt(dojo_page.div.style.top) + parseInt(divPropertiesTop)) + "px";
                        //ADD_DHTML(div_id + CURSOR_MOVE);
                    }
                }
                else if (type == "openbexi_button") {
                    var ob_button = new openbexi_button(bexiParent, null, div_id, 0, 0, 0, 0, "none", "");
                    ob_button.div.style["cssText"] = style;
                    ob_button.set_template(theme, null, null, null);
                    openbexi_updatePageData(null, "page", div_id, "template", template);
                    save_openbexi_object(ob_button, false);
                    if (bexiParent == null) {
                        ob_button.div.style.top = (parseInt(ob_button.div.style.top) + parseInt(divPropertiesTop)) + "px";
                        //ADD_DHTML(div_id + CURSOR_MOVE);
                    }
                }
                else if (type == "openbexi_dygraphs") {
                    var ob_dygraph = new openbexi_dygraphs(bexiParent, null, div_id, 0, 0, 0, 0, "none", "");
                    ob_dygraph.div.style["cssText"] = style;
                    ob_dygraph.set_template(theme, null, null, null);
                    openbexi_updatePageData(null, "page", div_id, "template", template);
                    save_openbexi_object(ob_dygraph, false);
                    if (bexiParent == null) {
                        ob_dygraph.div.style.top = (parseInt(ob_dygraph.div.style.top) + parseInt(divPropertiesTop)) + "px";
                        //ADD_DHTML(div_id + CURSOR_MOVE);
                    }
                }
                else if (type == "openbexi_dojo_editor") {
                    var dojo_editor = new openbexi_dojo_editor(bexiParent, null, div_id, 0, 0, 0, 0, "none", "");
                    dojo_editor.div.style["cssText"] = style;
                    dojo_editor.set_template(theme, null, null, null);
                    openbexi_updatePageData(null, "page", div_id, "template", template);
                    save_openbexi_object(dojo_editor, false);
                    dojo_editor.div.innerHTML = get_xml_classe_object_attribut_value(ob_doc, div_id, "node", "inner");
                    if (bexiParent == null) {
                        dojo_editor.div.style.top = (parseInt(dojo_editor.div.style.top) + parseInt(divPropertiesTop)) + "px";
                        //ADD_DHTML(div_id + CURSOR_MOVE);
                    }
                } else {
                    //ChartFlow type
                    var chartflow = new openbexi_chartFlow(bexiParent, null, div_id, 0, 0, 0, 0, false);
                    chartflow.div.style["cssText"] = style;
                    chartflow.set_template(theme, null, null, null);
                    openbexi_updatePageData(null, "page", div_id, "template", template);
                    save_openbexi_object(chartflow, false);
                    if (bexiParent == null) {
                        chartflow.div.style.top = (parseInt(chartflow.div.style.top) + parseInt(divPropertiesTop)) + "px";
                        //ADD_DHTML(div_id + CURSOR_MOVE);
                    }
                }
            }
            // Rebuild endpoints and init endpoint database for each node if it is not yet done
            if (cout_endpoint != "") {
                try {
                    if (document.getElementById(div_id).ob_endpoints == undefined) {
                        document.getElementById(div_id).ob_endpoints = [];
                        document.getElementById(div_id).remap_endpoint = [];
                    }
                    for (var i = 0; i < cout_endpoint; i++) {
                        var endpoint_id = get_xml_classe_object_attribut_value(ob_doc, div_id, "endpoint", "id_" + i);
                        json = get_xml_classe_object_attribut_value(ob_doc, div_id, endpoint_id, "json");
                        try {
                            endpoint = openbexi_chartFlow_add_endpoint(null, parent, div_id, json, false, null, mode);
                        } catch (e) {
                        }
                        document.getElementById(div_id).remap_endpoint[endpoint_id] = i;
                    }
                } catch (e) {
                }
            }
        }
        // Rebuild connections
        var count_connection = get_xml_classe_object_attribut_value(ob_doc, "chartflow", "connection", "count");
        if (count_connection != undefined || count_connection != "") {
            for (i = 0; i < count_connection; i++) {
                var link = get_xml_classe_object_attribut_value(ob_doc, "chartflow", "connection", "link_" + i);
                var items = link.split("___");
                json = get_xml_classe_object_attribut_value(ob_doc, "chartflow", link, "json");
                try {
                    var endpoint_index_source = document.getElementById(items[0]).remap_endpoint[items[1]];
                    var endpoint_index_target = document.getElementById(items[2]).remap_endpoint[items[3]];
                    var conn = jsPlumb.connect({source: document.getElementById(items[0]).ob_endpoints[endpoint_index_source], target: document.getElementById(items[2]).ob_endpoints[endpoint_index_target]}, json);
                    conn.bind("click", function (conn) {
                        openbexi_bind_connector(conn.id);
                    });
                    openbexi_setConnectorProperties_fromJson(items[0], conn, json);

                } catch (e) {
                }
            }
        }
        jsPlumb.repaintEverything();
    } catch (e) {
        __openbexi_debugC_page("openbexi_rebuildChartFlow()", "Exception:" + e.message);
    }
}

openbexi_chartFlow.prototype.setSelected = function (objId) {
    this.genericObject.setSelected(objId, true);
    if (openbexiNavigator) openbexiNavigator.update_menu_editor(this, true);
    this.first_node_selected = true;
}
openbexi_chartFlow.prototype.setSelectedEndpoint = function (objId) {
    openbexiNavigator.window_factory(null, 'ob_menu_CSS', null, 'minimize');
    if (openbexiNavigator) openbexiNavigator.update_menu_editor(this, true);
    this.first_node_selected = true;
}
openbexi_chartFlow.prototype.setUnSelected = function (objId) {
    try {
        this.genericObject.setUnSelected(objId);
        if (currentBexiObj_selected.type != this.type)
            this.openbexiNavigator.update_menu_editor(this, false);
        jsPlumb.repaintEverything();
    } catch (e) {
        __openbexi_debugC("openbexi_chartFlow.prototype.setUnSelected()", "Exception:" + e.message);
    }
}
openbexi_chartFlow.prototype.getChildrenId = function () {
    return this.genericObject.getChildrenId();
}
openbexi_chartFlow.prototype.setAttribute = function (name, value) {
    return this.genericObject.setAttribute(this.getChildrenId(), name, value);
}
openbexi_chartFlow.prototype.getText = function () {
    return this.div.innerHTML;
}
openbexi_chartFlow.prototype.getPopupAttributes = function () {
    return ob_node_popupAttributes;
}
openbexi_chartFlow.prototype.getInspectorAttributes = function () {
    return ob_node_inspectorAttributes;
}
openbexi_chartFlow.prototype.setAttribute = function (name, value) {
    //this.div.style.align="center";
    return this.genericObject.setAttribute(this.getChildrenId(), name, value);
}
openbexi_chartFlow.prototype.getSrc = function (objId, eventStr) {
    if (objId == null)objId = this.div.id;
    if (eventStr == null)eventStr = "click";
    var src = this.genericObject.getSrc(objId, eventStr);
    if (src == undefined)
        return "";
    else
        return this.genericObject.getSrc(objId, eventStr);
}
openbexi_chartFlow.prototype.pasteText_or_Link = function () {
    if (getBrowser() == "NN6") {
        if (openbexiNavigator) openbexiNavigator.status("Copy&Paste not supported for this browser", "yellow");
        return;
    }
    var text = window.clipboardData.getData('Text');
    var occurHTTP = text.match("http:\/\/|https:\/\/|c:|C:|d:|D:|file:|javascript:void");
    if (occurHTTP == null || occurHTTP.length == 0) {
        var child = this.div.firstChild;
        if (child != null) {
            this.div.removeChild(child);
        }
        var eltA = document.createElement("A");
        eltA.setAttribute("CLASSE", "CLASSEA");
        var idChild = getNewIdChild("A");
        eltA.setAttribute("id", "A" + idChild);
        eltA.setAttribute("name", "A" + idChild);
        eltA.appendChild(document.createTextNode(text));
        this.div.appendChild(eltA);
    } else {
        this.add_link(text, true);
    }
}
openbexi_chartFlow.prototype.LNRequest = function () {
    this.genericObject.LNRequest();
}
openbexi_chartFlow.prototype.innerHTML_and_IMGS = function (objId) {
    var text = document.getElementById(objId).innerHTML;
    var listIdChild = this.getChildrenId();
    var textTmp = text;
    for (var j = 0; j < listIdChild.length; j++) {
        textTmp = text.replace("id=" + listIdChild[j], "id=" + listIdChild[j] + " " + scrs + " ");
    }
    //alert("openbexi_chartFlow.prototype.innerHTML_and_IMGS: "+textTmp)
    return textTmp;
}
openbexi_chartFlow.prototype.innerHTML_and_EVENTS = function (objId) {
    return document.getElementById(objId).innerHTML;
}
openbexi_chartFlow.prototype.changeStyle = function (objBexi, direction) {
    this.genericObject.changeStyle(objBexi, this, direction);
}
openbexi_chartFlow.prototype.removeObject = function (e) {
    try {
        openbexi_stopEventPropagation(e);
        var listIdChild = this.getChildrenId();
        if (listIdChild) {
            for (var j = 0; j < listIdChild.length; j++) {
                openbexi_deletePageData(null, "page", listIdChild[j], "ALL", null);
            }
        }
    }
    catch (e) {
        __openbexi_debugC_page("1-openbexi_chartFlow.prototype.removeObject()", "Exception:" + e.message);
    }
    // Clean up old ref.
    try {
        openbexi_deletePageData(null, this.div.id, "ALL", "ALL", null);
    }
    catch (e) {
        __openbexi_debugC_page("2-openbexi_chartFlow.prototype.removeObject()", "Exception:" + e.message);
    }
    try {
        jsPlumb.removeAllEndpoints(this.div.id);
    }
    catch (e) {
        __openbexi_debugC_page("3-openbexi_chartFlow.prototype.removeObject()", "Exception:" + e.message);
    }
    try {
        if (this.div.getAttribute("ob_template") == "true" && openbexiNavigator.HTML_pageName != "template.html")   return;
        this.genericObject.removeObject(this);
    }
    catch (e) {
        __openbexi_debugC_page("4-openbexi_chartFlow.prototype.removeObject()", "Exception:" + e.message);
    }
}
openbexi_chartFlow.prototype.my_PickFunc = function (e) {
    openbexi_stopEventPropagation(e);
    var bexiObj = getSelectedBexiObj(this.id);
    my_PickFunc(bexiObj.div);
}
openbexi_chartFlow.prototype.add_function = function (protocole, functionName, ob_doc) {
    if (this.genericObject != null) this.genericObject.add_function(protocole, functionName, ob_doc);
}
openbexi_chartFlow.prototype.add_link = function (url, unselect) {
    if (this.genericObject != null) this.genericObject.delete_link(this.div.id);
    this.div.style.cursor = "default";
    if (unselect)my_PickFunc(this.div);
}
openbexi_chartFlow.prototype.delete_link = function (unselect) {
    if (this.genericObject != null) this.genericObject.delete_link(this.div.id);
    this.img.style.cursor = "default";
    if (unselect)my_PickFunc(this.div);
}
openbexi_chartFlow.prototype.get_editor = function () {
    if (this.genericObject == null) alert("openbexi_chartFlow.prototype.get_editor:this.genericObject null ");
    return openbexiNavigator.get_menu_editor(this.getPopupAttributes());
}
function openbexi_get_endpoint_editor(e) {
    openbexi_stopEventPropagation(e);
    document.getElementById("ob_sub_menu_editor").innerHTML = openbexiNavigator.get_menu_editor(ob_endpoint_popupAttributes);
}

function openbexi_get_connector_editor(e) {
    openbexi_stopEventPropagation(e);
    document.getElementById("ob_sub_menu_editor").innerHTML = openbexiNavigator.get_menu_editor(ob_connector_popupAttributes);
}

function openbexi_get_array_editor(arrowOverlay, originalEvent) {
    alert("you clicked on the arrow overlay for this connection :" + arrowOverlay.id);
}

function openbexi_on_drop(connection, originalEvent) {
    alert("you clicked on drop for this connection :" + connection);
}

function openbexi_get_overlay_editor(labelOverlay, originalEvent) {
    openbexi_showConnectorTextEditor(labelOverlay, originalEvent);
    //alert("you clicked on the label overlay for this connection :" + labelOverlay.id+" "+labelOverlay.connection);
}

openbexi_chartFlow.prototype.forward = function () {
    return this.genericObject.forward(this.div, "+");
}
openbexi_chartFlow.prototype.backward = function () {
    return this.genericObject.backward(this.div, "-");
}
openbexi_chartFlow.prototype.debug = function () {
    return this.genericObject.debug(this);
}
openbexi_chartFlow.prototype.zoomdefault = function () {
    if (document.body && document.body.style && typeof document.body.style.zoom != "undefined") {
        this.bexiParent.div.style.zoom = "100%";
    }
}
openbexi_chartFlow.prototype.zoomplus = function () {
    if (document.body && document.body.style && typeof document.body.style.zoom != "undefined") {
        this.bexiParent.div.style.zoom = (parseInt(this.bexiParent.div.style.zoom) + 10) + "%";
    }
}
openbexi_chartFlow.prototype.zoomminus = function () {
    if (document.body && document.body.style && typeof document.body.style.zoom != "undefined") {
        this.bexiParent.div.style.zoom = (parseInt(this.bexiParent.div.style.zoom) - 10) + "%";
    }
}
openbexi_chartFlow.prototype.align_left_auto_arrange = function () {
    try {
        this.genericObject.align_left_auto_arrange(this);
        jsPlumb.repaintEverything();
    } catch (e) {
        __openbexi_debugC_page("align_top_auto_arrange()", "Exception:" + e.message);
    }
}
openbexi_chartFlow.prototype.align_right_auto_arrange = function () {
    try {
        this.genericObject.align_right_auto_arrange(this);
        jsPlumb.repaintEverything();
    } catch (e) {
        __openbexi_debugC_page("align_top_auto_arrange()", "Exception:" + e.message);
    }
}
openbexi_chartFlow.prototype.align_top_auto_arrange = function () {
    try {
        this.genericObject.align_top_auto_arrange(this);
        jsPlumb.repaintEverything();
    } catch (e) {
        __openbexi_debugC_page("align_top_auto_arrange()", "Exception:" + e.message);
    }
}
openbexi_chartFlow.prototype.align_bottom_auto_arrange = function () {
    try {
        this.genericObject.align_bottom_auto_arrange(this);
        jsPlumb.repaintEverything();
    } catch (e) {
        __openbexi_debugC_page("align_top_auto_arrange()", "Exception:" + e.message);
    }
}
openbexi_chartFlow.prototype.vertical_width_auto_resize = function () {
    try {
        this.genericObject.vertical_width_auto_resize(this);
        jsPlumb.repaintEverything();
    } catch (e) {
        __openbexi_debugC_page("align_top_auto_arrange()", "Exception:" + e.message);
    }
}
openbexi_chartFlow.prototype.vertical_height_auto_resize = function () {
    try {
        this.genericObject.vertical_height_auto_resize(this);
        jsPlumb.repaintEverything();
    } catch (e) {
        __openbexi_debugC_page("align_top_auto_arrange()", "Exception:" + e.message);
    }
}
openbexi_chartFlow.prototype.horizontal_width_auto_resize = function () {
    try {
        this.genericObject.horizontal_width_auto_resize(this);
        jsPlumb.repaintEverything();
    } catch (e) {
        __openbexi_debugC_page("align_top_auto_arrange()", "Exception:" + e.message);
    }
}
openbexi_chartFlow.prototype.horizontal_height_auto_resize = function () {
    try {
        this.genericObject.horizontal_height_auto_resize(this);
        jsPlumb.repaintEverything();
    } catch (e) {
        __openbexi_debugC_page("align_top_auto_arrange()", "Exception:" + e.message);
    }
}
openbexi_chartFlow.prototype.vertical_spacing_auto_arrange = function () {
    try {
        this.genericObject.vertical_spacing_auto_arrange(this);
        jsPlumb.repaintEverything();
    } catch (e) {
        __openbexi_debugC_page("align_top_auto_arrange()", "Exception:" + e.message);
    }
}
openbexi_chartFlow.prototype.horizontal_spacing_auto_arrange = function () {
    try {
        this.genericObject.horizontal_spacing_auto_arrange(this);
        jsPlumb.repaintEverything();
    } catch (e) {
        __openbexi_debugC_page("align_top_auto_arrange()", "Exception:" + e.message);
    }
}
openbexi_chartFlow.prototype.undo_auto_arrange = function () {
    return this.genericObject.undo_auto_arrange(this);
}
openbexi_chartFlow.prototype.redo_auto_arrange = function () {
    try {
        this.genericObject.redo_auto_arrange(this);
        jsPlumb.repaintEverything();
    } catch (e) {
        __openbexi_debugC_page("align_top_auto_arrange()", "Exception:" + e.message);
    }
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

function openbexi_unformatJsonText(text) {
    var textunFormated = "";
    for (var i = 0; i < text.length; i++) {
        if ((text[i] != '\n' && text[i] != '\t' && text[i] != '\r'))
            textunFormated += text[i];
    }
    return textunFormated;
}

var ob_ConnectorText_editor;

function openbexi_showConnectorTextEditor(labelOverlay, originalEvent) {
    try {
        var label;
        if (labelOverlay == null) {
            label = ["Label", {
                "location": 0.3,
                "id": "label",
                "label": "",
                "cssClass": "aLabel"
            }];
        } else {
            if (labelOverlay.cssClass == undefined) labelOverlay.cssClass = "aLabel";
            label = ["Label", {
                "id": labelOverlay.id,
                "location": labelOverlay.getLocation(),
                "label": labelOverlay.getLabel(),
                "cssClass": labelOverlay.cssClass
            }];
        }
        var json = JSON.stringify(label);
        openbexiNavigator.window_factory(event, 'ob_menu_RequestBrowser', ob_connector_text_properties_editor, 'maximize');
        if (document.getElementById("bexicontext_flowChart_properties"))
            document.getElementById("bexicontext_flowChart_properties").value = openbexi_formatJsonText(json);
        //Implementing a Syntax-Highlighting with JavaScript Editor from code mirror
        ob_ConnectorText_editor = CodeMirror.fromTextArea(document.getElementById("bexicontext_flowChart_properties"), {mode: "javascript", json: true, theme: "night", lineNumbers: true, matchBrackets: true, autoClearEmptyLines: true, smartIndent: true, tabMode: "indent", onChange: function () {
            clearTimeout(pending);
            setTimeout(update, 800);
        }});
    } catch (e) {
        __openbexi_debugC_page("openbexi_showPropertiesChartFlowEditor()", "Exception:" + e.message);
    }
}

function openbexi_applyPropertiesTextEditor(event) {
    try {

    } catch (e) {
        __openbexi_debugC_page("openbexi_applyPropertiesTextEditor()", "Exception:" + e.message);
    }
}

var ob_chartFlow_editor;

function openbexi_showPropertiesChartFlowEditor(event, endpoint) {
    try {
        openbexi_stopEventPropagation(event);
        var json;
        if (endpoint == "default") {
            json = JSON.stringify(ob_default_properties);
        } else {
            var node_id = ob_current_endpoint.elementId;
            var endpoint_index = openbexi_find_endpoints_json_index(node_id, ob_current_endpoint.id);
            json = document.getElementById(node_id).ob_endpoints_json[endpoint_index];
            if (json == undefined) json = JSON.stringify(ob_default_properties);
        }
        if (endpoint == "default")
            openbexiNavigator.window_factory(event, 'ob_menu_RequestBrowser', ob_chartFlow_default_properties_editor, 'maximize');
        else
            openbexiNavigator.window_factory(event, 'ob_menu_RequestBrowser', ob_chartFlow_properties_editor, 'maximize');
        if (document.getElementById("bexicontext_flowChart_properties"))
            document.getElementById("bexicontext_flowChart_properties").value = openbexi_formatJsonText(json);
        //Implementing a Syntax-Highlighting with JavaScript Editor from code mirror
        ob_chartFlow_editor = CodeMirror.fromTextArea(document.getElementById("bexicontext_flowChart_properties"), {mode: "javascript", json: true, theme: "night", lineNumbers: true, matchBrackets: true, autoClearEmptyLines: true, smartIndent: true, tabMode: "indent", onChange: function () {
            clearTimeout(pending);
            setTimeout(update, 800);
        }});
    } catch (e) {
        __openbexi_debugC_page("openbexi_showPropertiesChartFlowEditor()", "Exception:" + e.message);
    }
}

function openbexi_applyPropertiesChartFlowEditor(event) {
    try {
        openbexi_stopEventPropagation(event);
        var node_id = ob_current_endpoint.elementId;
        var json = openbexi_unformatJsonText(ob_chartFlow_editor.getValue());
        var connections = openbexi_getChartFlow_connections(node_id, ob_current_endpoint.id);
        openbexi_remove_endpoint(ob_current_endpoint);
        var new_endpoint = openbexi_chartFlow_add_endpoint(null, null, node_id, json, false, null, "dynamic");
        openbexi_rebuildChartFlow_connections(connections, new_endpoint.id, json);
        ob_current_endpoint = new_endpoint;
    } catch (e) {
        __openbexi_debugC_page("openbexi_applyPropertiesChartFlowEditor()", "Exception:" + e.message);
    }
}

function openbexi_applyDefaultPropertiesChartFlowEditor(event) {
    try {
        openbexi_stopEventPropagation(event);
        var json = openbexi_unformatJsonText(ob_chartFlow_editor.getValue());
        var json_tmp = openbexi_formatJsonText(json);
        ob_default_properties = JSON.parse(json_tmp);
        jsPlumb.importDefaults(ob_default_properties);
        openbexi_updatePageData(null, "chartflow", "ob_default_properties", "json", json);
        // Apply the new properties to the selected endpoint:
        openbexi_applyPropertiesChartFlowEditor(event);
    } catch (e) {
        __openbexi_debugC_page("openbexi_applyDefaultPropertiesChartFlowEditor()", "Exception:" + e.message);
    }
}

openbexi_chartFlow.prototype.functions_to_load = function () {
    return this.genericObject.functions_to_load(this.div.id);
}
openbexi_chartFlow.prototype.head_code = function () {
    openbexi_add_javascript(null, "javascript/jquery/", "jquery.min.js");
    openbexi_add_javascript(null, "javascript/jquery/", "jquery-ui.min.js");
    openbexi_add_javascript(null, "javascript/jsPlumb/", "jquery.jsPlumb-1.5.2-min.js");
    openbexi_add_javascript(null, "javascript/", "openbexi_chartFlow.js");
    return this.genericObject.head_code(this);
}
openbexi_chartFlow.prototype.body_code = function () {
    return this.genericObject.body_code(this);
}
document.onselectstart = function () {
    return false;
};
function openbexi_get_connection(endpoint, connection_id) {
    var connections;
    if (endpoint == null)
        connections = jsPlumb.getAllConnections().BODY;
    else
        var connections = jsPlumb.getAllConnections().BODY;
    for (var i = 0; i < connections.length; i++) {
        if (connections[i].id == connection_id)
            return  connections[i]
    }
    return null;
}

function openbexi_bind_connector(connection_id) {
    try {
        //Detect if coonection object or id connection
        var conn;
        if (connection_id != null && connection_id != undefined) {
            conn = openbexi_get_connection(ob_current_endpoint, connection_id);
            if (conn == null)   return;

            openbexi_chartFlow_unselect_endpoinds();
            ob_current_connector = conn;
            // set up CSS menu
            getSelectedBexiObj(conn.sourceId).setSelected(conn.sourceId);
            openbexi_set_draggable(conn.sourceId, false);

            // make theconnector blinking
            openbexi_connector_blinking(conn);

            // set up the connector editor
            openbexi_get_connector_editor(null);
        }
    } catch (e) {
        __openbexi_debugC("openbexi_bind_connector()", "Exception:" + e.message);
    }
}

function openbexi_endpoind_bind_dblclick(e) {
    try {
        openbexi_showPropertiesChartFlowEditor(e, "currentEndpoint")
    } catch (e) {
        __openbexi_debugC_page("openbexi_endpoind_bind_dblclick()", "Exception:" + e.message);
    }
}

function openbexi_endpoind_bind_click(e) {
    try {
        openbexi_stopEventPropagation(e);
        if (ob_current_endpoint == null || ob_current_endpoint.id != e.id) {
            if (currentObjNameSelected != null) {
                try {
                    openbexi_set_draggable(currentObjNameSelected, false);
                }
                catch (e) {
                }
                ob_canvas.clear();
                currentBexiObj_selected = null;
                currentObjNameSelected = null;
                openbexi_main = null;
            }
            openbexi_chartFlow_unselect_endpoinds();
            ob_current_endpoint = e;
            // set up CSS menu
            getSelectedBexiObj(e.elementId).setSelectedEndpoint(e.elementId);
            openbexi_set_draggable(e.elementId, false);

            // make the endpoint blinking
            openbexi_endpoind_blinking(e);

            // set up the endpoint editor
            openbexi_get_endpoint_editor(e);

        } else {
            ob_current_endpoint = null;

            // unset up CSS menu
            getSelectedBexiObj(e.elementId).setUnSelected(e.elementId);

            // unset up the endpoint editor
            if (openbexiNavigator) openbexiNavigator.update_menu_editor(this, false);
        }
        //openbexi_debug_chartflow();
    } catch (e) {
        __openbexi_debugC_page("openbexi_endpoind_bind_click()", "Exception:" + e.message);
    }
}

function openbexi_chartFlow_unselect_endpoinds() {
    // Clear endpoint timeout, and set the previous endpoint to the original style if any
    try {
        clearTimeout(ob_clear_endpoint);
        if (ob_current_endpoint != null) {
            __openbexi_debugC("openbexi_chartFlow_unselect_endpoinds()", "Warning:select " + ob_current_endpoint.id);
            ob_current_endpoint.setVisible(true, true, true);
            jsPlumb.repaintEverything();
            ob_current_endpoint = null;
        }
        // Clear connector timeout, and set the previous connector  to the original style if any
        clearTimeout(ob_clear_connector);
        if (ob_current_connector != null) {
            __openbexi_debugC("openbexi_chartFlow_unselect_endpoinds()", "Warning:select connector from" + ob_current_connector.endpoints[0]);
            ob_current_connector.endpoints[0].setVisible(true, true, true);
            jsPlumb.repaintEverything();
            ob_current_connector = null;
        }
    } catch (e) {
        __openbexi_debugC("openbexi_chartFlow_unselect_endpoinds()", "Exception:" + e.message);
    }
}

function openbexi_remove_endpoint(current_endpoint) {
    try {
        if (current_endpoint == null) return;
        var node_id = current_endpoint.elementId;
        var div = document.getElementById(node_id);
        var index = openbexi_find_endpoints_json_index(node_id, current_endpoint.id);
        div.ob_endpoints.splice(index, 1);
        div.ob_endpoints_json.splice(index, 1);
        jsPlumb.deleteEndpoint(current_endpoint);
        if (ob_current_endpoint.id == current_endpoint.id)ob_current_endpoint = null;
        //openbexi_debug_chartflow();
    } catch (e) {
        __openbexi_debugC_page("openbexi_remove_endpoint()", "Exception:" + e.message);
    }
}

function openbexi_setConnectorProperties_fromJson(node_id, connector, json) {
    if (json == "undefined") return;
    try {
        var ob_new_properties;
        if (document.getElementById(node_id).ob_connections_json == undefined)
            document.getElementById(node_id).ob_connections_json = [];
        document.getElementById(node_id).ob_connections_json[connector.id] = json;
        var json_tmp = openbexi_formatJsonText(json);
        ob_new_properties = JSON.parse(json_tmp);
        if (ob_new_properties.connectorStyle.strokeStyle != undefined)
        //connector.setPaintStyle("strokeStyle" , ob_new_properties.connectorStyle.strokeStyle);

            if (ob_new_properties.connectorStyle.lineWidth != undefined)
            //connector.setPaintStyle("lineWidth",  ob_new_properties.connectorStyle.lineWidth);

                if (ob_new_properties.connector != undefined)
                    connector.setConnector(ob_new_properties.connector, true);
        connector.repaint();

    } catch (e) {
        __openbexi_debugC_page("openbexi_setConnectorProperties_fromJson()", "Exception:" + e.message);
    }
}

function openbexi_setConnectorProperties(e, property, value) {
    // Get current endpoint json
    var node_id;
    var endpoint_index;
    var endpoint_id;
    var json;
    var ob_new_properties;
    try {
        openbexi_stopEventPropagation(e);

        // Check if json connection has already been created, if not inherit from the endpoint source
        node_id = ob_current_connector.sourceId;
        endpoint_id = ob_current_connector.endpoints[0].id;
        endpoint_index = openbexi_find_endpoints_json_index(node_id, endpoint_id);
        json = document.getElementById(node_id).ob_connections_json[endpoint_index];

        if (json == undefined)
            json = document.getElementById(node_id).ob_endpoints_json[endpoint_index];

        // Check if endpount json exists, if not inherit from  the defualt endpoint source
        if (json == undefined)
            ob_new_properties = ob_default_properties;
        else
            ob_new_properties = JSON.parse(json);

    } catch (e) {
        __openbexi_debugC_page("openbexi_setConnectorProperties()", "Exception:" + e.message);
    }
    try {
        if (property == "style") {
            ob_current_connector.setConnector(value, true);
            ob_new_properties.connector = value;
        }
        if (property == "width") {
            if (value == "others") {
                var valueTmp = prompt("Please enter the width:", "1");
                if (valueTmp != null) {
                    value = valueTmp;
                }
            }
            if (value == "+")
                value = ob_current_connector.paintStyle.lineWidth + 1;
            if (value == "-")
                value = ob_current_connector.paintStyle.lineWidth - 1;

            ob_current_connector.paintStyle.lineWidth = value;
            ob_new_properties.connectorStyle.lineWidth = value;
        }
        if (property == "strokeStyle") {
            //ob_current_connector.setPaintStyle({strokeStyle:value}, true);
            ob_current_connector.paintStyle.strokeStyle = value;
            ob_new_properties.connectorStyle.strokeStyle = value;
        }
        ob_current_connector.paint();
    } catch (e) {
        __openbexi_debugC_page("openbexi_setConnectorProperties()", "Exception:" + e.message);
    }
    // Update json connection database
    try {
        json = JSON.stringify(ob_new_properties);
        document.getElementById(node_id).ob_connections_json[ob_current_connector.id] = json;

    } catch (e) {
        __openbexi_debugC_page("openbexi_setConnectorProperties()", "Exception:" + e.message);
    }
}

function openbexi_setEndpointProperties(e, property, value) {
    // Get current endpoint json
    var node_id;
    var endpoint_index;
    var ob_new_properties;
    try {
        openbexi_stopEventPropagation(e);
        node_id = ob_current_endpoint.elementId;
        endpoint_index = openbexi_find_endpoints_json_index(node_id, ob_current_endpoint.id);
        var json = document.getElementById(node_id).ob_endpoints_json[endpoint_index];
        if (json != undefined) {
            ob_new_properties = JSON.parse(json);
        }
    } catch (e) {
        __openbexi_debugC_page("openbexi_setConnectorProperties()", "Exception:" + e.message);
    }
    //Update enpoint property
    try {
        //Style
        if (property == "style") {
            if (value == "Rectangle") {
                ob_new_properties.endpoint = "Rectangle";
            } else
                ob_new_properties.endpoint = "Dot";
        }

        //Property
        if (property == "radius") {

            if (value == "+")
                value = parseInt(ob_new_properties.paintStyle.radius) + 1;
            else if (value == "-")
                value = parseInt(ob_new_properties.paintStyle.radius) - 1;
            else
                value = prompt("Please enter the radius:", value);
            if (value != null)
                ob_new_properties.paintStyle.radius = value;

        }
        if (property == "width") {
            if (value == "+")
                value = parseInt(ob_new_properties.paintStyle.width) + 1;
            else if (value == "-")
                value = parseInt(ob_new_properties.paintStyle.width) - 1;
            else
                value = prompt("Please enter the width:", value.replace("px", ""));
            if (value != null) {
                if (value == NaN) value = 10;
                ob_new_properties.paintStyle.width = value;
            }
        }
        if (property == "height") {
            if (value == "+")
                value = parseInt(ob_new_properties.paintStyle.height) + 1;
            else if (value == "-")
                value = parseInt(ob_new_properties.paintStyle.height) - 1;
            else
                value = prompt("Please enter the height:", value.replace("px", ""));
            if (value != null) {
                if (value == NaN) value = 10;
                ob_new_properties.paintStyle.height = value
            }
        }
        if (property == "fillStyle") {
            ob_new_properties.paintStyle.fillStyle = value;
        }
        if (property == "label") {
            var label = document.getElementById(node_id).connectionOverlayLabel;
            if (label != undefined) conn.setLabel(value);
        }
    } catch (e) {
        __openbexi_debugC_page("openbexi_setEndpointProperties()", "Exception:" + e.message);
    }
    // Update endpoint database and rebuild connections if any
    try {
        json = JSON.stringify(ob_new_properties);
        var connections = openbexi_getChartFlow_connections(node_id, ob_current_endpoint.id);
        openbexi_remove_endpoint(ob_current_endpoint);
        var new_endpoint = openbexi_chartFlow_add_endpoint(null, null, node_id, json, false, null, "dynamic");
        openbexi_rebuildChartFlow_connections(connections, new_endpoint.id, json);
        ob_current_endpoint = new_endpoint;

    } catch (e) {
        __openbexi_debugC_page("openbexi_setEndpointProperties()", "Exception:" + e.message);
    }
}

function openbexi_debug_chartflow() {
    try {
        __openbexi_debugC_page("openbexi_debug_chartflow()", "Warning: -- current node=" + currentObjNameSelected);
        if (currentObjNameSelected != null) {
            for (var i = 0; i < document.getElementById(currentObjNameSelected).ob_endpoints.length; i++) {
                __openbexi_debugC_page("openbexi_debug_chartflow()", "Warning: -- endpoint_" + i + "=" + document.getElementById(currentObjNameSelected).ob_endpoints[i].id);
            }
        }
        if (ob_current_endpoint == null)
            __openbexi_debugC_page("openbexi_debug_chartflow()", "Warning: -- current node from endpoint=" + ob_current_endpoint);
        else {
            __openbexi_debugC_page("openbexi_debug_chartflow()", "Warning: -- current node from endpoint=" + ob_current_endpoint.elementId);
            __openbexi_debugC_page("openbexi_debug_chartflow()", "Warning: -- current endpoint=" + ob_current_endpoint.id);
            for (i = 0; i < document.getElementById(ob_current_endpoint.elementId).ob_endpoints.length; i++) {
                __openbexi_debugC_page("openbexi_debug_chartflow()", "Warning: -- endpoint_" + i + "=" + document.getElementById(ob_current_endpoint.elementId).ob_endpoints[i].id);
            }
        }
    } catch (e) {
        __openbexi_debugC_page("openbexi_debug_chartflow()", "Exception:" + e.message);
    }
}

function openbexi_setConnectionVisible(scope, connectionId, visible) {
    var allconnections = jsPlumb.getConnections(scope);
    for (var i = 0; i < allconnections.length; i++) {
        if (allconnections[i].id == connectionId)
            if (visible)
                allconnections[i].setVisible(true, true, true);
            else
                allconnections[i].setVisible(false, true, true);
    }
}

function openbexi_getChartFlowScopes() {
    var scopes = [];
}

function openbexi_update_endpoint_json_tree(endpoint) {

    var scope = document.getElementById(endpoint.elementId).ob_scope;
    var connections = endpoint.connections;
    var connections_json = "{";
    if (connections.length == 0)
        connections_json += "   label: '<b style=\"cursor:pointer;\">no connection</b>',";
    else if (connections.length == 1)
        connections_json += "   label: '<b style=\"cursor:pointer;\">1 connection</b>',";
    else
        connections_json += "   label: '<b style=\"cursor:pointer;\">" + connections.length + " connections</b>',";
    connections_json += "   id: 'ob_connections',";
    connections_json += "   status:'none',";
    connections_json += "   children: [";
    for (i = 0; i < connections.length; i++) {
        connections_json += "       {";
        connections_json += "         label: '" + '<a onmouseover=openbexi_setConnectionVisible(\"' + scope + '\",\"' + connections[i].id + '\",false);openbexi_set_CSS(this,\"background:url(gif/fading_background_12_H.png);cursor:pointer;\") onmouseout=openbexi_setConnectionVisible(\"' + scope + '\",\"' + connections[i].id + '\",true);openbexi_set_CSS(this,\"background:;cursor:;\") onclick=openbexi_bind_connector(\"' + connections[i].id + '\") >' + 'connection ' + i + '</a>' + "',\n";
        connections_json += "           id: 'ob_connection_" + i + "',";
        connections_json += "          status:'none'";
        connections_json += "       },";
    }
    connections_json += "   ]";
    connections_json += "}";
    //insert connections json object before the last json object
    var index;
    for (var j = 0; j < ob_endpoint_json_tree.length; j++) {
        if (ob_endpoint_json_tree[j].id == "ob_connections") {
            index = j;
            ob_endpoint_json_tree.splice(index, 1);
            break;
        }
    }
    var last_obj = ob_endpoint_json_tree[ob_endpoint_json_tree.length - 1];
    ob_endpoint_json_tree[ob_endpoint_json_tree.length - 1] = eval("(" + connections_json + ")");
    ob_endpoint_json_tree.push(last_obj);
}

jsPlumb.ready(function () {
    ob_import_default = true;
    var json = openbexi_getPageData(null, "chartflow", "ob_default_properties", "json");
    if (json != "") {
        try {
            var json_tmp = openbexi_formatJsonText(json);
            ob_default_properties = JSON.parse(json_tmp);
        } catch (e) {
            __openbexi_debugC_page("openbexi_chartFlow()", "Exception:" + e.message);
        }
    }
    try {
        jsPlumb.importDefaults(ob_default_properties);
    } catch (e) {
        __openbexi_debugC_page("openbexi_chartFlow()", "Exception:" + e.message);
    }
});
