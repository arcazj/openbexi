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

// Builder event global variables
// =================================
var _OPENBEXI__DEBUG = false;
var _OPENBEXI_TEST = false;
var _str_debug = "";

var zIndexFlag = true;
var currentObjNameSelected = null;
var previousObjNameSelected = null;
var lastBexiObj_duplicated = null;
var previousBexiObj_selected = null;
var currentBexiObj_selected = null;

var openbexi_main_previousObj_selected = null;
var openbexi_main_currentObj_selected = null;

var openbexi_main = null;
var dragFlag = false;

var openbexi_debugAllText = "";
var openbexi_previousDebugText = "";
var openbexi_debugText = "";
var openbexi_countSameText = 0;

var _ob_menu_direction = "none";

// Fabric.js canvas global variables
// =================================
var ob_enable_canevas_debugger = false;
var ob_enable_rotation = true;
var ob_over_canvas_div_id = null;
var ob_canvas_div_selected = true;
var ob_canvas__under_control = false;
var ob_previous_canvas_div_id = null;
var ob_canvas = null;
var ob_click = false;
var ob_modified_control_flag = false;
var ob_canvas_currentObjNameSelected = null;
var ob_width_correction = 0;
var ob_height_correction = 0;
var ob_parentObjetNameSelected;
var ob_rect = null;

window.onclick = function (event) {
    try {
        ob_undofadeInBody();
        if (event != null && event.target != null)
            __openbexi_debugC("window.onclick", "Event:" + event.target.getAttribute("id"));
        else
            __openbexi_debugC("window.onclick", "Event:" + event);
    } catch (e) {
    }

    if (event == null || ob_canvas__under_control) return;

    //if (openbexiNavigator && openbexiNavigator.prompt_working) return;

    // if click done on chartflow endpoints, ignore
    try {
        if (event.target.tag == "circle" || event.target.tag == "rect" || event.target.tag == "path" || event.target.id.match("jsPlumb_")) {
            return;
        }
    } catch (e) {
    }

    // if click done on any j-query-impromptu elements, ignore
    try {
        if (event.target.getAttribute("id") != null && event.target.getAttribute("id").match("jqi")) {
            return;
        }
    } catch (e) {
    }
    try {
        if (event.target.getAttribute("class") != null && event.target.getAttribute("class").match("jqi")) {
            return;
        }
    } catch (e) {
        return;
    }
    //openbexi_reset_all_z(null, null);
    ob_canvas_div_selected = false;
    //ob_debug_fabrics("====================================================selected==false");

    try {
        if (ob_modified_control_flag == false) {
            if (ob_canvas_currentObjNameSelected == null) ob_canvas_currentObjNameSelected = 'BODY';
            if (ob_canvas_currentObjNameSelected == 'BODY') {
                if (getSelectedBexiObj(previousObjNameSelected).type == "openbexi_dojo_editor")
                    getSelectedBexiObj(previousObjNameSelected).setUnSelected(previousObjNameSelected);
                my_PickFunc(ob_canvas_currentObjNameSelected);
            }
            else
                my_PickFunc(document.getElementById(ob_canvas_currentObjNameSelected));
        }
    } catch (e) {
    }

    ob_click = false;
    ob_modified_control_flag = false;
}
function openbexi_stopEventPropagation(event) {
    try {
        if (event != null && event.target != null)
            __openbexi_debugC("openbexi_stopEventPropagation", "Event:" + event.target.getAttribute("id"));

    } catch (ex) {
    }
    try {
        if (event == null && (getBrowser() == "ie6" || getBrowser() == "ie7" || getBrowser() == "ie7_no_XMLHttpRequest")) event = window.event;
        if (event != null && event != undefined) {
            event.cancelBubble = true;
            if (event.preventDefault) event.preventDefault();
            if (event.stopPropagation) event.stopPropagation();
        }
    } catch (ex) {
    }
    return false;
}

function openbexi_reset() {
    try {
        currentObjNameSelected = null;
        previousObjNameSelected = null;
        lastBexiObj_duplicated = null;
        previousBexiObj_selected = null;
        currentBexiObj_selected = null;
    } catch (e) {
        __openbexi_debugC("openbexi_reset", "Exception:" + e.message);
    }
}
function openbexi_canvas_init() {
    //ob_debug_fabrics("-->openbexi_canvas_init()");
    ob_canvas = new fabric.Canvas('ob_canvas');
    //ob_canvas.centerTransform = false;
    //ob_canvas.allowTouchScrolling = true;
    ob_canvas.on({
        'object:out': ob_outControls,
        'object:over': ob_overControls,
        'object:selected': ob_clickControls,
        'object:moving': ob_draggingControls,
        'object:scaling': ob_updateControls,
        'object:rotating': ob_rotateControls,
        'object:resizing': ob_resizingControls,
        'object:modified': ob_modifiedControls,
        'mouse:move': ob_mouseMoveControls,
        'mouse:up': ob_mouseUpControls,
        'mouse:down': ob_mouseDownControls,
        'after:render': ob_afterRender,
        'before:render': ob_beforeRender,
        'canvas:cleared': ob_canvasCleared
    });
}
function ob_afterRender(event) {
    //ob_debug_fabrics("-->ob_afterRender()");
}
function ob_beforeRender(event) {
    //ob_debug_fabrics("-->ob_beforeRender()");
}
function ob_canvasCleared(event) {
    //ob_debug_fabrics("-->ob_canvasCleared()");
}
function my_canvas_MouseOutFunc(event) {
    ob_debug_fabrics("-->my_canvas_MouseOutFunc()");
    ob_over_canvas_div_id = null;
}

function ob_mouseMoveControls(event) {
    //ob_debug_fabrics("-->ob_mouseMoveControls()");
    ob_canvas_currentObjNameSelected = 'BODY';
    for (var i = openbexi_object.length - 1; i >= 0; i--) {
        if (openbexi_object[i] != undefined && openbexi_object[i].id != "BODY") {
            if (openbexi_object[i].div.parentNode.nodeName == "BODY") {
                if (event.e.pageX >= parseInt(openbexi_object[i].div.style.left) && event.e.pageX <= parseInt(openbexi_object[i].div.style.left) + parseInt(openbexi_object[i].div.style.width) && event.e.pageY >= parseInt(openbexi_object[i].div.style.top) && event.e.pageY <= parseInt(openbexi_object[i].div.style.top) + parseInt(openbexi_object[i].div.style.height)) {
                    //ob_debug_fabrics("...........Inside " + openbexi_object[i].div.id + ".............. z="+openbexi_object[i].div.style.zIndex);
                    ob_canvas_currentObjNameSelected = openbexi_object[i].div.id;
                    return;
                }
            }
            else {
                if (event.e.pageX >= parseInt(document.getElementById(openbexi_object[i].div.parentNode.id).style.left) + parseInt(openbexi_object[i].div.style.left) && event.e.pageX <= parseInt(document.getElementById(openbexi_object[i].div.parentNode.id).style.left) + parseInt(openbexi_object[i].div.style.left) + parseInt(openbexi_object[i].div.style.width) && event.e.pageY >= parseInt(document.getElementById(openbexi_object[i].div.parentNode.id).style.top) + parseInt(openbexi_object[i].div.style.top) && event.e.pageY <= parseInt(document.getElementById(openbexi_object[i].div.parentNode.id).style.top) + parseInt(openbexi_object[i].div.style.top) + parseInt(openbexi_object[i].div.style.height)) {
                    //ob_debug_fabrics("...........Inside " + openbexi_object[i].div.id + ".............. z="+openbexi_object[i].div.style.zIndex);
                    ob_canvas_currentObjNameSelected = openbexi_object[i].div.id;
                    return;
                }
            }
        }
    }
}
function ob_mouseDownControls(event) {
    ob_canvas__under_control = true;
    ob_debug_fabrics("--%%%%%%%%%%%-->ob_mouseDownControls()");

    //if (document.getElementById(currentObjNameSelected).ob_rect.active==true)ob_manage_zIndex(true);
}
function ob_mouseUpControls(event) {
    //ob_debug_fabrics("-->ob_mouseUpControls()");
    ob_canvas__under_control = false;
    //if (document.getElementById(currentObjNameSelected).ob_rect.active==true)ob_manage_zIndex(false);
}
function ob_get_angle(obj) {
    try {
        var el = document.getElementById(obj);
        var st = window.getComputedStyle(el, null);
        var matrix = st.getPropertyValue("-webkit-transform") ||
                st.getPropertyValue("-moz-transform") ||
                st.getPropertyValue("-ms-transform") ||
                st.getPropertyValue("-o-transform") ||
                st.getPropertyValue("transform")
        if (matrix !== 'none') {
            var values = matrix.split('(')[1].split(')')[0].split(',');
            var a = values[0];
            var b = values[1];
            var ob_angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
        } else {
            var ob_angle = 0;
        }
        return (ob_angle < 0) ? ob_angle += 360 : ob_angle;
    } catch (e) {
        ob_angle = 0;
        ob_debug_fabrics("ob_get_angle", "Exception:" + e.message);
    }
    return ob_angle;
}
function get_pos_after_rotation(x, y, w, h, angle) {
    var pos = fabric.util.rotatePoint(
            new fabric.Point(x, y),
            new fabric.Point(x + (w / 2), y + (h / 2)),
            fabric.util.degreesToRadians(angle)
    );
    return pos;
}
function get_pos_before_rotation(x, y, w, h, angle) {
    var pos = fabric.util.rotatePoint(
            new fabric.Point(x, y),
            new fabric.Point(x - (w / 2), y - (h / 2)),
            fabric.util.degreesToRadians(angle)
    );
    return pos;
}

var ob_pos;
var ob_pos_parent;
var ob_angle;
function my_canvas_PickFunc(objName) {
    ///openbexi_stopEventPropagation(event);
    ob_debug_fabrics("-->my_canvas_PickFunc()");
    if (openbexiNavigator && openbexiNavigator.init && openbexiNavigator.projectName == "no_name" && openbexiNavigator.HTML_pageName == "no_name.html") {
        openbexiNavigator.init = false;
        openbexiNavigator.prompt(null, "look_for_context");
        return;
    }
    if (ob_canvas__under_control) return;
    //if (openbexiNavigator && openbexiNavigator.prompt_working) return;
    ob_canvas_div_selected = true;
    previousBexiObj_selected = currentBexiObj_selected;
    previousObjNameSelected = objName;
    currentObjNameSelected = objName;
    lastBexiObj_duplicated = getSelectedBexiObj(currentObjNameSelected);
    currentBexiObj_selected = getSelectedBexiObj(currentObjNameSelected);
    ob_parentObjetNameSelected = document.getElementById(currentObjNameSelected).parentNode;

    try {


        if (document.getElementById(currentObjNameSelected).offsetWidth != undefined)
            ob_width_correction = parseFloat(document.getElementById(currentObjNameSelected).offsetWidth) - parseFloat(document.getElementById(currentObjNameSelected).style.width);
        if (document.getElementById(currentObjNameSelected).offsetHeight != undefined)
            ob_height_correction = parseFloat(document.getElementById(currentObjNameSelected).offsetHeight) - parseFloat(document.getElementById(currentObjNameSelected).style.height);

        if (ob_canvas == null) {
            openbexi_canvas_init();
        }

        ob_canvas.clear();
        ob_angle = ob_get_angle(currentObjNameSelected);
        ob_pos = get_pos_after_rotation(parseFloat(document.getElementById(currentObjNameSelected).offsetLeft), parseFloat(document.getElementById(currentObjNameSelected).offsetTop), parseFloat(document.getElementById(currentObjNameSelected).offsetWidth), parseFloat(document.getElementById(currentObjNameSelected).offsetHeight), ob_angle);
        if (ob_parentObjetNameSelected.nodeName == "BODY") {
            ob_rect = new fabric.Rect({
                top: ob_pos.y,
                left: ob_pos.x,
                height: parseFloat(document.getElementById(currentObjNameSelected).offsetHeight),
                width: parseFloat(document.getElementById(currentObjNameSelected).offsetWidth),
                angle: ob_angle,
                fill: 'rgba(0,0,0,0)'
            });
        } else {
            ob_pos_parent = get_pos_after_rotation(parseFloat(document.getElementById(ob_parentObjetNameSelected.id).offsetLeft), parseFloat(document.getElementById(ob_parentObjetNameSelected.id).offsetTop), parseFloat(document.getElementById(ob_parentObjetNameSelected.id).offsetWidth), parseFloat(document.getElementById(ob_parentObjetNameSelected.id).offsetHeight), ob_get_angle(ob_parentObjetNameSelected.id));
            ob_rect = new fabric.Rect({
                top: ob_pos_parent.y + ((parseFloat(document.getElementById(ob_parentObjetNameSelected.id).offsetWidth) - parseFloat(document.getElementById(ob_parentObjetNameSelected.id).style.width)) / 2.0) + ob_pos.y,
                left: ob_pos_parent.x + ((parseFloat(document.getElementById(ob_parentObjetNameSelected.id).offsetHeight) - parseFloat(document.getElementById(ob_parentObjetNameSelected.id).style.height)) / 2.0) + ob_pos.x,
                height: parseFloat(document.getElementById(currentObjNameSelected).offsetHeight),
                width: parseFloat(document.getElementById(currentObjNameSelected).offsetWidth),
                angle: ob_angle,
                fill: 'rgba(0,0,0,0)'
            });
        }
        ob_canvas.add(ob_rect);

        if (openbexiNavigator.HTML_pageName == "template.html" || (openbexiNavigator.HTML_pageName != "template.html" && !currentObjNameSelected.match("template_"))) {
            ob_canvas.item(0).hasBorders = true;
            ob_canvas.item(0).hasRotatingPoint = true;
            ob_canvas.item(0).set({
                transparentCorners: false,
                borderColor: 'red',
                cornerColor: 'red',
                cornerSize: 8
            });
        } else {
            ob_canvas.item(0).hasBorders = true;
            ob_canvas.item(0).hasRotatingPoint = false;
            ob_canvas.item(0).hasControls = false;
            ob_canvas.item(0).set({
                transparentCorners: false,
                stroke: 'red',
                strokeWidth: 3,
                strokeDashArray: [5, 5],
                cornerColor: 'red',
                borderColor: 'white',
                borderWidth: 0,
                cornerSize: 0
            });
            ob_canvas.item(0).lockMovement = true;
            ob_canvas.item(0).lockRotation = true;
            ob_canvas.item(0).selectable = false;
        }
        ob_manage_zIndex(true);
        ob_canvas.setActiveObject(ob_rect);
    } catch (e) {
        alert("my_canvas_PickFunc - Exception:" + e.message);
        ob_debug_fabrics("my_canvas_PickFunc - exception:", "Exception:" + e.message);
    }
}
function ob_draggingControls(event) {
    if (openbexiNavigator.HTML_pageName == "template.html" || (openbexiNavigator.HTML_pageName != "template.html" && !currentObjNameSelected.match("template_")))
        ob_updateControls(event);
}
var ob_border;
function ob_updateControls(event) {
    if (ob_canvas__under_control == false)
        ob_debug_fabrics("-->ob_updateControls()");

    try {
        if (currentObjNameSelected == null) return;
        ob_parentObjetNameSelected = document.getElementById(currentObjNameSelected).parentNode;
        ob_border = parseInt(document.getElementById(currentObjNameSelected).style.borderWidth);
        if (isNaN(ob_border)) ob_border = 0;
        ob_pos = get_pos_before_rotation(parseFloat(ob_rect.getLeft()), parseFloat(ob_rect.getTop()), parseFloat(document.getElementById(currentObjNameSelected).style.width), parseFloat(document.getElementById(currentObjNameSelected).style.height), ob_get_angle(currentObjNameSelected));

        if (ob_parentObjetNameSelected.nodeName == "BODY") {
            document.getElementById(currentObjNameSelected).style.top = ob_pos.y + "px";
            document.getElementById(currentObjNameSelected).style.left = ob_pos.x + "px";
            document.getElementById(currentObjNameSelected).style.width = ob_rect.getWidth() - ob_width_correction + "px";
            document.getElementById(currentObjNameSelected).style.height = ob_rect.getHeight() - ob_height_correction + "px";
        } else {
            ob_pos_parent = get_pos_after_rotation(parseFloat(document.getElementById(ob_parentObjetNameSelected.id).style.left), parseFloat(document.getElementById(ob_parentObjetNameSelected.id).style.top), parseFloat(document.getElementById(ob_parentObjetNameSelected.id).style.width), parseFloat(document.getElementById(ob_parentObjetNameSelected.id).style.height), ob_get_angle(ob_parentObjetNameSelected.id));
            document.getElementById(currentObjNameSelected).style.top = ob_pos.y - ob_pos_parent.y - ((parseFloat(document.getElementById(ob_parentObjetNameSelected.id).offsetWidth) - parseFloat(document.getElementById(ob_parentObjetNameSelected.id).style.width)) / 2.0) + "px";
            document.getElementById(currentObjNameSelected).style.left = ob_pos.x - ob_pos_parent.x - ((parseFloat(document.getElementById(ob_parentObjetNameSelected.id).offsetHeight) - parseFloat(document.getElementById(ob_parentObjetNameSelected.id).style.height)) / 2.0) + "px";
            document.getElementById(currentObjNameSelected).style.width = ob_rect.getWidth() - ob_width_correction + "px";
            document.getElementById(currentObjNameSelected).style.height = ob_rect.getHeight() - ob_height_correction + "px";
        }

        // #########UPDATE WIDGETS IF NEEDED###################
        if (currentBexiObj_selected.type == "openbexi_dojo_editor" && currentBexiObj_selected.subtype == "label") currentBexiObj_selected.resizeLabel();
        if (document.getElementById(currentBexiObj_selected.div.id).ob_endpoints != undefined)  jsPlumb.repaintEverything();
        if (currentBexiObj_selected.type == "openbexi_img") {
            if (getSelectedBexiObj(currentBexiObj_selected.parentNodeId) != null && getSelectedBexiObj(currentBexiObj_selected.parentNodeId).type == "openbexi_fisheye") {
                getSelectedBexiObj(currentBexiObj_selected.parentNodeId).manageFisheyeItem(parseFloat(currentBexiObj_selected.div.style.width), parseFloat(currentBexiObj_selected.div.style.height), null);
            }
        }
        else if (currentBexiObj_selected.type == "openbexi_dojo") {
            if (currentBexiObj_selected.subtype == "GridX") {
                currentBexiObj_selected.dojo.model.clearCache();
                currentBexiObj_selected.dojo.body.refresh();
            } else if (currentBexiObj_selected.subtype == "dojox.grid.Grid") {
                currentBexiObj_selected.dojo.render();
                currentBexiObj_selected.pager_move();
            } else {
                currentBexiObj_selected.move();
            }
        }
        else if (currentBexiObj_selected.type == "openbexi_dojo_editor" && currentBexiObj_selected.subtype == "label") currentBexiObj_selected.moveLabel();

        if (currentBexiObj_selected != null && (currentBexiObj_selected.type == "openbexi_timeline" || currentBexiObj_selected.type == "openbexi_dygraphs")) currentBexiObj_selected.resize(null);
        if (currentBexiObj_selected != null && currentBexiObj_selected.type == "openbexi_dojo") {
            if (currentBexiObj_selected.subtype == "dojox.grid.Grid") {
                currentBexiObj_selected.dojo.render();
                currentBexiObj_selected.pager_move();
            }
        }
        openbexiNavigator.move_ob_menus();
        ob_setDirty_flag(true);
    } catch (e) {
        alert(e);
    }
}
function ob_rotateControls(event) {
    if (ob_canvas__under_control == false)  ob_debug_fabrics("-->ob_rotateControls()");
    try {
        var div = document.getElementById(currentObjNameSelected);
        if (div == null) return;
        var css = div.style["cssText"];
        css += "-moz-transform:rotate(" + ob_rect.getAngle() + "deg);-webkit-transform:rotate(" + ob_rect.getAngle() + "deg);-o-transform:rotate(" + ob_rect.getAngle() + "deg); -ms-transform:rotate(" + ob_rect.getAngle() + "deg)"
        div.style["cssText"] = css;
        if (document.getElementById(currentBexiObj_selected.div.id).ob_endpoints != undefined)  jsPlumb.repaintEverything();
        ob_setDirty_flag(true);
    } catch (e) {
        alert(e);
    }
}
function ob_cleanup_canvas() {
    //ob_debug_fabrics("-->ob_cleanup_canvas()");
    try {
        //openbexi_reset_all_z(null, null);
        if (ob_canvas == null) return;
        ob_canvas.clear();
    } catch (e) {
        alert("cleanup_canvas - Exception:" + e.message);
        ob_debug_fabrics("ob_cleanup_canvas", "Exception:" + e.message);
    }
}
function my_canvas_MouseOverFunc(event) {
    //ob_debug_fabrics("-->my_canvas_MouseOverFunc(" + event.currentTarget.id + ")");
}

function ob_clickControls(event) {
    if (ob_canvas__under_control == true) return;
    ob_debug_fabrics("+++++++++++++++++++++++=>ob_clickControls()");
    if (ob_canvas_div_selected == true) {
        ob_debug_fabrics("+++++++++++++++++++++++++++++++++++++++++++++++++++++=selected==true");
        ob_click = true;
    }
}
function ob_overControls(event) {
    ob_debug_fabrics("-->ob_overControls()");
    //alert("ob_overControls")
}
function ob_outControls(event) {
    ob_debug_fabrics("-->ob_outControls()");
    //alert("ob_outControls")
}
function ob_modifiedControls(event) {
    ob_debug_fabrics("--@@@@@@@@@@-->ob_modifiedControls()");
    ob_modified_control_flag = true;
}
function ob_resizingControls(event) {
    ob_debug_fabrics("-->ob_resizingControls()");
    //alert("ob_resizingControls")
}
function ob_manage_zIndex(all) {
    //ob_debug_fabrics("@@@@@@@@@@@@@@@@-->ob_manage_zIndex(" + all + ")");
    var myDocumentElementdiv = document.getElementsByTagName("div");
    try {
        if (all)
            for (var i = openbexi_object.length - 1; i >= 0; i--) {
                if (openbexi_object[i] != undefined && openbexi_object[i].id != "BODY") {
                    openbexi_object[i].div.style.zIndex = parseInt(-9999) + parseInt(openbexi_object[i].div.style.zIndex);
                    //openbexi_object[i].div.style.zIndex=-2;
                }
            }
        else
            openbexi_reset_all_z(null, null);
    } catch (e) {
        ob_debug_fabrics("ob_manage_zIndex()", e.message);
    }
    if (document.getElementById(currentObjNameSelected).id == "BODY") document.getElementById(currentObjNameSelected).style.zIndex = -1;
    //document.getElementById(currentObjNameSelected).style.zIndex = -1;
}
var message = "";
var ob_count_deb = 0;
function ob_debug_fabrics(message_tmp) {
    if (!ob_enable_canevas_debugger) {
        document.getElementById("ob_debug_fabrics").style.visibility = "hidden";
        return;
    }
    document.getElementById("ob_debug_fabrics").style.visibility = "visible";
    message += ob_count_deb + " ----" + message_tmp + "<br>";
    if (currentObjNameSelected == null)
        message += "currentObjNameSelected=" + currentObjNameSelected + " - id=" + getSelectedBexiObj(currentObjNameSelected).id + " - previousObjNameSelected=" + previousObjNameSelected + "<br>";
    else
        message += "currentObjNameSelected=" + currentObjNameSelected + "-- z=" + document.getElementById(currentObjNameSelected).style.zIndex + " - id=" + getSelectedBexiObj(currentObjNameSelected).id + " - previousObjNameSelected=" + previousObjNameSelected + "<br>";

    document.getElementById("ob_debug_fabrics").innerHTML = message;
    ob_count_deb++;
    if (ob_count_deb == 32) {
        message = "";
        ob_count_deb = 0;
    }
}
function my_PickFunc(objName) {
    ob_undofadeInBody();
    if (openbexiNavigator && openbexiNavigator.init && openbexiNavigator.projectName == "no_name" && openbexiNavigator.HTML_pageName == "no_name.html") {
        openbexiNavigator.init = false;
        if (openbexiNavigator.projectName == undefined) {
            if (document.getElementById('ob_menu_FileBrowser') != null && document.getElementById('ob_menu_FileBrowser').style.visibility != "minimize")
                this.window_factory(null, 'ob_menu_FileBrowser', null, "minimize");
            openbexiNavigator.prompt(null, ob_select_WebPage);
            return;
        }
    }
    //if (openbexiNavigator && openbexiNavigator.prompt_working) return;
    try {
        try {
            if (dd.obj != null)
                if (objName == undefined) {
                    __openbexi_debugC("> my_PickFunc", "dd.obj.id:" + dd.obj.id + "  (objName:" + objName + ")");
                    ob_debug_fabrics("-->>>>>>>>>>>my_PickFunc" + "  (objName:" + objName + ")");
                }
                else {
                    __openbexi_debugC("> my_PickFunc", "dd.obj.id:" + dd.obj.id + "  (objName:" + objName.id + ")");
                    ob_debug_fabrics("-->>>>>>>>>>>my_PickFunc" + "  (objName:" + objName.id + ")");
                }
            else if (objName == undefined || objName == "BODY") {
                __openbexi_debugC("> my_PickFunc", "dd.obj: null" + "  (objName:" + objName + ")");
                ob_debug_fabrics("-->>>>>>>>>>>my_PickFunc" + "  (objName:" + objName + ")");
            }
            else {
                ob_debug_fabrics("-->my_PickFunc" + "  (objName:" + objName.id + ")");
                ob_debug_fabrics("-->>>>>>>>>>>my_PickFunc" + "  (objName:" + objName.id + ")");
            }
        } catch (e) {
            __openbexi_debugC("my_PickFunc --", "Exception:" + e.message);
            ob_debug_fabrics("-->>>>>>>>>>>my_PickFunc - exception: " + e);
        }
        if (dd.obj != null) {
            if (dd.obj.id.match(RegExp("ob_sub_menu_editor"))) {
                _ob_menu_direction = "none";
            }
            if (dd.obj.id.match(RegExp("menu_editor"))) {
                return;
            }
            if (dd.obj.id.match(RegExp("ob_menu_widget"))) {
                openbexiNavigator.set_menu_focus("ob_menu_widget");
                if (dd.obj.id == "ob_menu_widget" || dd.obj.id == "ob_menu_widget_head" || dd.obj.id == "ob_menu_widget_sub")openbexi_reset_all_z(document.getElementById("ob_menu_widget"), "ob_window_up");
            }
            if (dd.obj.id.match(RegExp("ob_menu_CSS"))) {
                openbexiNavigator.set_menu_focus("ob_menu_CSS");
                openbexi_reset_all_z(document.getElementById("ob_menu_CSS"), "ob_window_up");
            }
            if (dd.obj.id.match(RegExp("ob_menu_debugging"))) {
                openbexiNavigator.set_menu_focus("ob_menu_debugging");
                openbexi_reset_all_z(document.getElementById("ob_menu_debugging"), "ob_window_up");
            }
            if (dd.obj.id.match(RegExp("ob_menu_FileBrowser"))) {
                openbexiNavigator.set_menu_focus("ob_menu_FileBrowser");
                openbexi_reset_all_z(document.getElementById("ob_menu_FileBrowser"), "ob_window_up");
            }
            if (dd.obj.id.match(RegExp("ob_menu_PictureBrowser"))) {
                openbexiNavigator.set_menu_focus("ob_menu_PictureBrowser");
                openbexi_reset_all_z(document.getElementById("ob_menu_PictureBrowser"), "ob_window_up");
            }
            if (dd.obj.id.match(RegExp("ob_menu_TemplateBrowser"))) {
                openbexiNavigator.set_menu_focus("ob_menu_TemplateBrowser");
                openbexi_reset_all_z(document.getElementById("ob_menu_TemplateBrowser"), "ob_window_up");
            }
            if (dd.obj.id.match(RegExp("ob_menu_RequestBrowser"))) {
                openbexiNavigator.set_menu_focus("ob_menu_RequestBrowser");
                openbexi_reset_all_z(document.getElementById("ob_menu_RequestBrowser"), "ob_window_up");
            }
            if (dd.obj.id.match(RegExp("ob_menu_JavascriptBrowser"))) {
                openbexiNavigator.set_menu_focus("ob_menu_JavascriptBrowser");
                openbexi_reset_all_z(document.getElementById("ob_menu_JavascriptBrowser"), "ob_window_up");
            }
            if (dd.obj.id.match(RegExp("ob_menu_SQLBrowser"))) {
                openbexiNavigator.set_menu_focus("ob_menu_SQLBrowser");
                openbexi_reset_all_z(document.getElementById("ob_menu_SQLBrowser"), "ob_window_up");
            }
            if (dd.obj.id.match(RegExp("ob_menu_FTPBrowser"))) {
                openbexiNavigator.set_menu_focus("ob_menu_FTPBrowser");
                openbexi_reset_all_z(document.getElementById("ob_menu_FTPBrowser"), "ob_window_up");
            }
        }
        if (ob_disable_selection)return;
        if (objName == undefined) return;
        if (objName.id != undefined && objName.id.match(RegExp("ob_menu_")) && currentBexiObj_selected && (currentBexiObj_selected.type == "openbexi_page" || currentBexiObj_selected.type == "openbexi_form" || currentBexiObj_selected.type == "openbexi_fisheye" || currentBexiObj_selected.type == "openbexi_tabber")) {
            return;
        }
        if (objName == "divProperties" || objName == "divLNEditor" || objName == "divCSSEditor" || objName == "divLinkEditor" || objName == "divLinkEditor" || objName == "divViewEditor" || objName == "divURLsEditor") {
            __openbexi_debugC("my_PickFunc", "Exception:" + objName + " obsolete", "red");
            return;
        }
        zIndexFlag = !zIndexFlag;
        if (document.getElementById("divFunctionEditor"))document.getElementById("divFunctionEditor").style.visibility = "hidden";
        if (document.getElementById("divCSSEditor"))document.getElementById("divCSSEditor").style.visibility = "hidden";
        // Avoid to select an object if popup menu is visibl
        if (document.getElementById("popup_menu0") && document.getElementById("popup_menu0").style.visibility == "visible") {
            if (objName != null) {
                document.getElementById("popup_menu0").style.visibility = "hidden";
            }
            return;
        }

        if (dragFlag) {
            dragFlag = false;
            if (currentObjNameSelected != null) {
                if (document.getElementById(currentObjNameSelected) != null) document.getElementById(currentObjNameSelected).selected = true;
                return;
            }
        }
        if (dd.obj != null) {
            return;
        }
        if (objName != null) {
            if (objName == "BODY") {
                if (previousObjNameSelected == 'BODY' && document.getElementById('ob_menu_widget') != null && document.getElementById('ob_menu_widget').style.visibility != "hidden") return;
                if (document.getElementById(currentObjNameSelected) == null) currentObjNameSelected = null;
                if (currentObjNameSelected != null) {
                    try {
                        getSelectedBexiObj("BODY").setSelected(currentObjNameSelected);
                    }
                    catch (e) {
                    }
                }
                ob_cleanup_canvas();
                lastBexiObj_duplicated = null;
                currentBexiObj_selected = null;
                previousObjNameSelected = 'BODY';
                openbexi_main = null;
                if (openbexiNavigator) {
                    if (document.getElementById("ob_error_popup"))document.getElementById("ob_error_popup").style.visibility = "hidden";
                    if (document.getElementById('ob_menu_RequestBrowser') != null && document.getElementById('ob_menu_RequestBrowser').style.visibility != "hidden")
                        openbexiNavigator.window_factory(null, 'ob_menu_RequestBrowser', null, "hidden");
                    if (document.getElementById('ob_menu_PictureBrowser') != null && document.getElementById('ob_menu_PictureBrowser').style.visibility != "hidden")
                        openbexiNavigator.window_factory(null, 'ob_menu_PictureBrowser', null, "hidden");
                    if (checkRelativePage() == false) {
                        if (document.getElementById('ob_menu_widget') != null)
                            openbexiNavigator.window_factory(null, 'ob_menu_widget', ob_menu_widget, 'minimize');
                    }
                }
                openbexi_chartFlow_unselect_endpoinds();
                return;
            } else {
                // If object is editor than turn in edition mode and return;
                if (getSelectedBexiObj(objName.id).type == "openbexi_dojo_editor" && ob_rect != undefined && ob_rect.active == true) {
                    if (previousObjNameSelected != null && previousObjNameSelected == objName.id) {
                        try {
                            getSelectedBexiObj(objName.id).turnToEdit();
                            return;
                        } catch (e) {
                        }
                    }
                }
                previousBexiObj_selected = currentBexiObj_selected;
                previousObjNameSelected = currentObjNameSelected;
                currentObjNameSelected = objName.id;
                lastBexiObj_duplicated = getSelectedBexiObj(currentObjNameSelected);
                currentBexiObj_selected = getSelectedBexiObj(currentObjNameSelected);
                openbexi_chartFlow_unselect_endpoinds();
            }
        }
        if (currentObjNameSelected == null) {
            return;
        }
        if (!document.getElementById(currentObjNameSelected).selected) {
            if (document.getElementById(previousObjNameSelected) == null) {
                previousBexiObj_selected = null;
                previousObjNameSelected = null;
            }
            if (previousObjNameSelected != null) {
                try {
                    previousBexiObj_selected.setUnSelected(previousObjNameSelected);
                }
                catch (e) {
                }
            }
            if (document.getElementById(currentObjNameSelected) == null)currentObjNameSelected = null;
            if (currentObjNameSelected != null) {
                try {
                    currentBexiObj_selected.setSelected(currentObjNameSelected);
                }
                catch (e) {
                }
                my_canvas_PickFunc(objName.id);
            }
        } else {
            if (document.getElementById(previousObjNameSelected) == null) {
                previousBexiObj_selected = null;
                previousObjNameSelected = null;
            }
            if (previousObjNameSelected != null && previousObjNameSelected != currentObjNameSelected) {
                try {
                    previousBexiObj_selected.setSelected(previousObjNameSelected);
                }
                catch (e) {
                }
            }
            if (document.getElementById(currentObjNameSelected) == null) {
                currentBexiObj_selected = null;
                currentObjNameSelected = null;
            }
            if (currentObjNameSelected != null) {
                try {
                    currentBexiObj_selected.setUnSelected(currentObjNameSelected);
                }
                catch (e) {
                }
                ob_cleanup_canvas();
                currentBexiObj_selected = null;
                currentObjNameSelected = null;
                openbexi_main = null;
            }
        }
    } catch (e) {
        __openbexi_debugC("my_PickFunc", "Exception:" + e.message);
    }
}
var _ob_menu_pos = 0;
function my_DropFunc(event) {
    try {
        openbexiNavigator.move_ob_menus();
        if (dd.obj != null && dd.obj.id == _ob_menuId_focus + "_head") {
            openbexiNavigator.update_size_and_xy(_ob_menuId_focus);
            openbexiNavigator.resize();
            return;
        }
        if (dd.obj != null && dd.obj.id == _ob_menuId_focus + "_resize") {
            if (_ob_menuId_focus == "ob_menu_widget") {
                if (getSelectedBexiObj(null).type == "openbexi_body")
                    openbexiNavigator.update_window_body_items(_ob_menuId_focus, ob_menu_widget, true);
                else if (getSelectedBexiObj(null).getPopupWidgets != undefined)
                    openbexiNavigator.update_window_body_items(_ob_menuId_focus, getSelectedBexiObj(null).getPopupWidgets(), true);
            }
            if (_ob_menuId_focus == "ob_menu_PictureBrowser")  openbexiNavigator.update_window_body_items(_ob_menuId_focus, ob_menu_pictures, true);
            if (_ob_menuId_focus == "ob_menu_JavascriptBrowser")  openbexiNavigator.update_window_body_items(_ob_menuId_focus, ob_menu_javascripts, false);
            if (_ob_menuId_focus == "ob_menu_SQLBrowser")  openbexiNavigator.update_window_body_items(_ob_menuId_focus, ob_menu_SQL, false);

            openbexiNavigator.update_size_and_xy(_ob_menuId_focus);
            return;
        }
        if (dd.obj != null && dd.obj.id.match("ob_menu_widget" + "_")) {
            if (getSelectedBexiCount() < 1)
                openbexiNavigator.update_menu_editor(null, false);
            if (currentBexiObj_selected != null) {
                if (getSelectedBexiObj(null).type == "openbexi_body")
                    openbexiNavigator.update_window_body_items(_ob_menuId_focus, ob_menu_widget, true);
                else {
                    if (getSelectedBexiObj(null).getPopupWidgets != undefined)
                        openbexiNavigator.update_window_body_items(_ob_menuId_focus, getSelectedBexiObj(null).getPopupWidgets(), true);
                }
                return;
            } else {
                openbexiNavigator.update_window_body_items(_ob_menuId_focus, ob_menu_widget, true);
                return;
            }
        }
        if (dd.obj != null && dd.obj.id.match("ob_menu_PictureBrowser" + "_")) {
            openbexiNavigator.update_window_body_items(_ob_menuId_focus, ob_menu_pictures, true);
            return;
        }
        if (dd.obj != null && dd.obj.id.match("ob_menu_JavascriptBrowser" + "_")) {
            openbexiNavigator.update_window_body_items(_ob_menuId_focus, ob_menu_javascripts, false);
            return;
        }
        if (dd.obj != null && dd.obj.id.match("ob_menu_SQLBrowser" + "_")) {
            openbexiNavigator.update_window_body_items(_ob_menuId_focus, ob_menu_SQL, false);
            return;
        }
    } catch (e) {
        __openbexi_debugC("my_DropFunc", "Exception:" + e.message);
    }
}

function my_DragFunc() {
    try {
        if (dd.obj != null) ob_dhtml_debug("------my_DragFunc(" + dd.obj.id + ")");
        if (dd.obj != null && dd.obj.id == _ob_menuId_focus + "_head") {
            openbexiNavigator.move();
            return;
        }
        if (dd.obj != null && dd.obj.id.match(RegExp("ob_sub_menu_editor"))) {
            _ob_menu_direction = "none";
            var new_pos = parseInt(document.getElementById("ob_sub_menu_editor").style.left);
            if (new_pos >= 0) {
                document.getElementById("ob_sub_menu_editor").style.left = ob_sub_menu_editor_current_left;
                return;
            }
            if (new_pos < _ob_menu_pos - 1)
                _ob_menu_direction = "left";
            if (new_pos > _ob_menu_pos + 1)
                _ob_menu_direction = "right";
            _ob_menu_pos = new_pos;
            return;
        }
        if (dd.obj != null && dd.obj.id == _ob_menuId_focus + "_resize") {
            openbexiNavigator.resize();
            openbexiNavigator.update_size_and_xy(_ob_menuId_focus);
            if (_ob_menuId_focus == "ob_menu_widget") {
                if (getSelectedBexiObj(null).type == "openbexi_body")
                    openbexiNavigator.update_window_body_items(_ob_menuId_focus, ob_menu_widget, true);
                else
                    openbexiNavigator.update_window_body_items(_ob_menuId_focus, getSelectedBexiObj(null).getPopupWidgets(), true);
            }
            if (_ob_menuId_focus == "ob_menu_PictureBrowser") openbexiNavigator.update_window_body_items(_ob_menuId_focus, ob_menu_pictures, true);
            if (_ob_menuId_focus == "ob_menu_JavascriptBrowser") openbexiNavigator.update_window_body_items(_ob_menuId_focus, ob_menu_javascripts, false);
            if (_ob_menuId_focus == "ob_menu_SQLBrowser") openbexiNavigator.update_window_body_items(_ob_menuId_focus, ob_menu_SQL, false);
            return;
        }

    } catch (e) {
        __openbexi_debugC("my_DragFunc", "Exception:" + e.message);
    }
}

function openbexi_WZ_objectSelected_height() {
    if (openbexi_main.h == null)return 0;
    if (openbexi_main.h > 0) return parseInt(openbexi_main.h);
    return 0;
}

function openbexi_WZ_objectSelected_width() {
    if (openbexi_main.w == null)return 0;
    if (openbexi_main.w > 0) return parseInt(openbexi_main.w);
    return 0;
}

function my_ResizeFunc() {
}

function openbexi_removeFocus() {
    try {
        var zValue = -1;
        if ((getBrowser() != "ie6" && getBrowser() != "ie7" && getBrowser() != "ie7_no_XMLHttpRequest")) zValue = 0;
        for (var i = 0; i < openbexi_object.length; i++) {
            if (openbexi_object[i].div != null) {
                openbexi_reset_z(openbexi_object[i].div, zValue, null);
            }
        }
    } catch (e) {
        __openbexi_debugC("openbexi_removeFocus", "Exception:" + e.message);
    }
    return openbexi_object.length + 30;
}
;
function openbexi_count_pageElt(bexiObj) {
    try {
        var count = 0;
        if (bexiObj == null) return count;
        if (bexiObj.type != "openbexi_page" && bexiObj.type != "openbexi_tabber" && bexiObj.type != "openbexi_form" && bexiObj.type != "openbexi_fisheye") {
            return count;
        }
        for (var i = 0; i < openbexi_object.length; i++) {
            if (openbexi_object[i].parentNodeId == bexiObj.id) {
                count++;
            }
        }
    } catch (e) {
        __openbexi_debugC("openbexi_count_pageElt", "Exception:" + e.message);
    }
    return count;
}

function openbexi_get_pageBexiObj(bexiObj) {
    try {
        if (bexiObj == null) return "BODY";
        if (bexiObj.type == "openbexi_page" || bexiObj.type == "openbexi_tabber" || bexiObj.type == "openbexi_form" || bexiObj.type == "openbexi_fisheye") {
            return "BODY";
        }
        for (var i = 0; i < openbexi_object.length; i++) {
            if (openbexi_object[i].id == bexiObj.parentNodeId) {
                return openbexi_object[i];
            }
        }
    } catch (e) {
        __openbexi_debugC("openbexi_get_pageBexiObj", "Exception:" + e.message);
    }
    return "BODY";
}

function openbexi_count_Elt() {
    try {
        var count = 1;
        for (var i = 0; i < openbexi_object.length; i++) {
            if (openbexi_object[i] != undefined && openbexi_object[i].id != "BODY") {
                count++;
            }
        }
    } catch (e) {
        __openbexi_debugC("openbexi_count_Elt", "Exception:" + e.message);
    }
    return count - 1;
}

function openbexi_reset_all_z(div, z_action) {
    try {
        if (div) {
            __openbexi_debugC("openbexi_reset_all_z()", "Info:" + div.id + " " + z_action);
            ob_debug_fabrics("###>openbexi_reset_all_z(" + div.id + "," + z_action + ")");
        }
        else {
            __openbexi_debugC("openbexi_reset_all_z()", "Info:" + div + " " + z_action);
            ob_debug_fabrics("###>openbexi_reset_all_z(" + div + "," + z_action + ")");
        }
        var new_z;
        //var str = "";
        var bexiObj = null;
        if (div != null) {
            bexiObj = getSelectedBexiObj(div.id);
            //if (div.obzindex == undefined) div.obzindex=div.style.zIndex;
        }
        if (div == null && currentBexiObj_selected != null) {
            div = currentBexiObj_selected.div;
            bexiObj = currentBexiObj_selected;
        }

        if (div == null) return 0;
        var current_obzindex = div.obzindex;
        var pageElt_counter = openbexi_count_pageElt(bexiObj);
        var Elt_counter = openbexi_count_Elt();
        //case 1: bring to front and the current element is  a page or a form
        if (z_action == "+" && div.obzindex != undefined && ( bexiObj.type == "openbexi_page" || bexiObj.type == "openbexi_tabber" || bexiObj.type == "openbexi_form" || bexiObj.type == "openbexi_fisheye" )) {
            //str += "case 1:";
            if (div.obzindex == (Elt_counter - pageElt_counter)) return 0;
            for (var i = 0; i < openbexi_object.length; i++) {
                if (openbexi_object[i] != undefined && openbexi_object[i].id != "BODY" && openbexi_object[i].div.obzindex != undefined && parseInt(openbexi_object[i].div.obzindex) > current_obzindex) {
                    if (openbexi_object[i].div.id != div.id) {
                        // if element belongs to page
                        if (openbexi_object[i].parentNodeId == div.id) {
                            //str += " a for " + openbexi_object[i].div.id + " z=" + openbexi_object[i].div.obzindex;
                            new_z = Elt_counter - pageElt_counter - current_obzindex + parseInt(openbexi_object[i].div.obzindex) - 1;
                            openbexi_reset_z(openbexi_object[i].div, new_z, new_z);
                            //str += " new_z=" + new_z + " |";
                        }
                        else {
                            //str += " b for " + openbexi_object[i].div.id + " z=" + openbexi_object[i].div.obzindex;
                            new_z = parseInt(openbexi_object[i].div.obzindex) - pageElt_counter - 1;
                            openbexi_reset_z(openbexi_object[i].div, new_z, new_z);
                            //str += " new_z=" + new_z + " |";
                        }
                    }
                }
            }
            new_z = Elt_counter - pageElt_counter - 1;
            openbexi_reset_z(div, new_z, new_z);
        }
        //case 2: send to back and and the current element is  a page
        if (z_action == "-" && div.obzindex != undefined && (bexiObj.type == "openbexi_page" || bexiObj.type == "openbexi_tabber" || bexiObj.type == "openbexi_form" || bexiObj.type == "openbexi_fisheye" )) {
            //str += "case 2:";
            if (current_obzindex == 0) return 0;
            for (i = 0; i < openbexi_object.length; i++) {
                if (openbexi_object[i].div.id != div.id) {
                    // if element belongs to page
                    if (openbexi_object[i].parentNodeId == div.id) {
                        //str += " 2a for " + openbexi_object[i].div.id + " z=" + openbexi_object[i].div.obzindex;
                        new_z = parseInt(openbexi_object[i].div.obzindex) - current_obzindex;
                        openbexi_reset_z(openbexi_object[i].div, new_z, new_z);
                        //str += " new_z=" + new_z + " |";
                    }
                    if (openbexi_object[i].parentNodeId != div.id && openbexi_object[i].div.obzindex != undefined && parseInt(openbexi_object[i].div.obzindex) < current_obzindex) {
                        //str += " 2b for " + openbexi_object[i].div.id + " z=" + openbexi_object[i].div.obzindex;
                        new_z = parseInt(openbexi_object[i].div.obzindex) + pageElt_counter + 1;
                        openbexi_reset_z(openbexi_object[i].div, new_z, new_z);
                        //str += " new_z=" + new_z + " |";
                    }
                }
            }
            openbexi_reset_z(div, 0, 0);
        }
        //case 3: bring to front and the current element is not a page  and doesn't belong to a page
        if (z_action == "+" && div.obzindex != undefined && bexiObj.type != "openbexi_page" && bexiObj.type != "openbexi_tabber" && bexiObj.type != "openbexi_form" && bexiObj.type != "openbexi_fisheye" && bexiObj.parentNodeId == "BODY") {
            //str += "case 3:";
            if (div.obzindex == (Elt_counter - pageElt_counter)) return 0;
            for (i = 0; i < openbexi_object.length; i++) {
                if (openbexi_object[i] != undefined && openbexi_object[i].id != "BODY" && openbexi_object[i].div.obzindex != undefined && parseInt(openbexi_object[i].div.obzindex) > div.obzindex) {
                    if (openbexi_object[i].div.id != div.id) {
                        //str += " 3a for " + openbexi_object[i].div.id + " z=" + openbexi_object[i].div.obzindex;
                        new_z = parseInt(openbexi_object[i].div.obzindex) - 1;
                        openbexi_reset_z(openbexi_object[i].div, new_z, new_z);
                        //str += " new_z=" + new_z + " |";
                    }
                }
            }
            new_z = Elt_counter - 1;
            openbexi_reset_z(div, new_z, new_z);
        }
        //case 4: send to back and the current element is not a page and doesn't belong to a page
        if (z_action == "-" && div.obzindex != undefined && bexiObj.type != "openbexi_page" && bexiObj.type != "openbexi_tabber" && bexiObj.type != "openbexi_form" && bexiObj.type != "openbexi_fisheye" && bexiObj.parentNodeId == "BODY") {
            //str += "case 4:";
            if (current_obzindex == 0) return 0;
            for (i = 0; i < openbexi_object.length; i++) {
                if (openbexi_object[i] != undefined && openbexi_object[i].id != "BODY" && openbexi_object[i].div.obzindex != undefined && parseInt(openbexi_object[i].div.obzindex) < current_obzindex) {
                    if (openbexi_object[i].div.id != div.id) {
                        //str += " 4a for " + openbexi_object[i].div.id + " z=" + openbexi_object[i].div.obzindex;
                        new_z = parseInt(openbexi_object[i].div.obzindex) + 1;
                        openbexi_reset_z(openbexi_object[i].div, new_z, new_z);
                        //str += " new_z=" + new_z + " |";
                    }
                }
            }
            openbexi_reset_z(div, 0, 0);
        }
        //case 5: send to back and the current element is not a page and belongs to a page
        if (z_action == "-" && div.obzindex != undefined && bexiObj.type != "openbexi_page" && bexiObj.type != "openbexi_tabber" && bexiObj.type != "openbexi_form" && bexiObj.type != "openbexi_fisheye" && bexiObj.parentNodeId != "BODY") {
            //str += "case 5:";
            page_obzindex = 0;
            for (i = 0; i < openbexi_object.length; i++) {
                if (openbexi_object[i] != undefined && openbexi_object[i].id != "BODY" && parseInt(openbexi_object[i].div.obzindex) < current_obzindex) {
                    // look for page obzindex
                    if (openbexi_object[i].id == bexiObj.parentNodeId) {
                        //str += " 5a for " + openbexi_object[i].div.id + " z=" + openbexi_object[i].div.obzindex;
                        page_obzindex = parseInt(openbexi_object[i].div.obzindex);
                    }
                    if (openbexi_object[i].parentNodeId == bexiObj.parentNodeId) {
                        //str += " 5b for " + openbexi_object[i].div.id + " z=" + openbexi_object[i].div.obzindex;
                        new_z = parseInt(openbexi_object[i].div.obzindex) + 1;
                        openbexi_reset_z(openbexi_object[i].div, new_z, new_z);
                        //str += " new_z=" + new_z + " |";
                    }
                }
            }
            openbexi_reset_z(div, page_obzindex + 1, page_obzindex + 1);
        }
        //case 6: send to front and the current element is not a page and belongs to a page
        if (z_action == "+" && div.obzindex != undefined && bexiObj.type != "openbexi_page" && bexiObj.type != "openbexi_tabber" && bexiObj.type != "openbexi_form" && bexiObj.type != "openbexi_fisheye" && bexiObj.parentNodeId != "BODY") {
            //str += "case 6:";
            page_obzindex = 0;
            count_pageElt = 0;
            for (i = 0; i < openbexi_object.length; i++) {
                if (openbexi_object[i].parentNodeId == bexiObj.parentNodeId) count_pageElt++;
                // look for page obzindex
                if (openbexi_object[i].div.id == bexiObj.parentNodeId) {
                    //str += " 6a for " + openbexi_object[i].div.id + " z=" + openbexi_object[i].div.obzindex;
                    page_obzindex = parseInt(openbexi_object[i].div.obzindex);
                }
                if (openbexi_object[i] != undefined && openbexi_object[i].id != "BODY" && openbexi_object[i].div.obzindex != undefined && parseInt(openbexi_object[i].div.obzindex) > current_obzindex) {
                    if (openbexi_object[i].parentNodeId == bexiObj.parentNodeId) {
                        //str += " 6b for " + openbexi_object[i].div.id + " z=" + openbexi_object[i].div.obzindex;
                        new_z = parseInt(openbexi_object[i].div.obzindex) - 1;
                        openbexi_reset_z(openbexi_object[i].div, new_z, new_z);
                        //str += " new_z=" + new_z + " |";
                    }
                }
            }
            new_z = page_obzindex + count_pageElt;
            openbexi_reset_z(div, new_z, new_z);
        }
        //case 7: the current element has not a obzindex yet
        if (z_action == "add" && div.obzindex == undefined) {
            //str += "case 7:";
            var pageBexiPage = openbexi_get_pageBexiObj(bexiObj);
            if (pageBexiPage == "BODY") {
                new_z = Elt_counter - pageElt_counter - 1;
                //(div,new_z,new_z);
                //str += "7a for " + div.id + " z=" + div.obzindex;
            } else {
                var count_pageElt = openbexi_count_pageElt(pageBexiPage);
                var page_obzindex = parseInt(pageBexiPage.div.obzindex);
                var new_eltz = page_obzindex + count_pageElt;
                for (i = 0; i < openbexi_object.length; i++) {
                    if (openbexi_object[i] != undefined && openbexi_object[i].id != "BODY" && openbexi_object[i].div.obzindex != undefined && parseInt(openbexi_object[i].div.obzindex) >= new_eltz) {
                        //str += " 7b for " + openbexi_object[i].div.id + " z=" + openbexi_object[i].div.obzindex;
                        new_z = parseInt(openbexi_object[i].div.obzindex) + 1;
                        openbexi_reset_z(openbexi_object[i].div, new_z, new_z);
                        //str += " new_z=" + new_z + " |";
                    }
                }
                openbexi_reset_z(div, new_eltz, new_eltz);
            }
        }
        //case 8:  Element deleted
        if (z_action == "remove") {
            //str += "case 8:";
            for (i = 0; i < openbexi_object.length; i++) {
                if (openbexi_object[i] != undefined && openbexi_object[i].id != "BODY" && openbexi_object[i].div.obzindex != undefined && parseInt(openbexi_object[i].div.obzindex) > current_obzindex) {
                    if (openbexi_object[i].div.id != div.id) {
                        //str += "8a for " + openbexi_object[i].div.id + " z=" + openbexi_object[i].div.obzindex;
                        new_z = parseInt(openbexi_object[i].div.obzindex) - 1;
                        openbexi_reset_z(openbexi_object[i].div, new_z, new_z);
                        //str += " new_z=" + new_z + " |";
                    }
                }
            }
        }
        if (z_action != "*") {
            var count = 0;
            for (i = 0; i < openbexi_object.length; i++) {
                if (openbexi_object[i] != undefined && openbexi_object[i].id != "BODY") {
                    if (openbexi_object[i].div.obzindex == undefined) {
                        openbexi_reset_z(openbexi_object[i].div, count, count);
                        //alert("openbexi_reset_all_z:" + openbexi_object[i].div.id + " new_z=" + count)
                    } else {
                        var current_z = parseInt(openbexi_object[i].div.obzindex);
                        openbexi_reset_z(openbexi_object[i].div, current_z, current_z);
                        //alert("openbexi_reset_all_z:" + openbexi_object[i].div.id + " current_z=" + current_z)
                    }
                    count = count + 1;
                }
            }
        }

        var count_zz = openbexi_object.length + 13;
        openbexi_reset_z(document.getElementById("warningMsgDiv"), count_zz++, count_zz++);
        openbexi_reset_z(document.getElementById("codeDiv"), count_zz++, count_zz++);
        openbexi_reset_z(document.getElementById("codeHTMLDiv"), count_zz++, count_zz++);
        openbexi_reset_z(document.getElementById("debugDiv"), count_zz++, count_zz++);
        openbexi_reset_z(document.getElementById("LNRequestDiv"), count_zz++, count_zz++);
        openbexi_reset_z(document.getElementById("LayerRequest"), count_zz++, count_zz++);
        openbexi_reset_z(document.getElementById("divHelp"), count_zz++, count_zz++);

        if (z_action == "ob_window_up") {
            count_zz += 1;
            for (var p = 0; p < ob_minimize_menu_list.length; p++) {
                if (ob_minimize_menu_list[p] != div.id) {
                    openbexi_reset_z(document.getElementById(ob_minimize_menu_list[p]), count_zz++, count_zz++);
                    openbexi_reset_z(document.getElementById(ob_minimize_menu_list[p] + "_head"), count_zz++, count_zz++);
                    openbexi_reset_z(document.getElementById(ob_minimize_menu_list[p] + "_resize"), count_zz, count_zz);
                }
            }
            for (p = 0; p < ob_maximize_menu_list.length; p++) {
                if (ob_maximize_menu_list[p] != div.id) {
                    openbexi_reset_z(document.getElementById(ob_maximize_menu_list[p]), count_zz++, count_zz++);
                    openbexi_reset_z(document.getElementById(ob_maximize_menu_list[p] + "_head"), count_zz++, count_zz++);
                    openbexi_reset_z(document.getElementById(ob_maximize_menu_list[p] + "_resize"), count_zz++, count_zz++);
                    if (ob_maximize_menu_list[p] == "ob_menu_widget" || ob_maximize_menu_list[p] == "ob_menu_PictureBrowser" || ob_maximize_menu_list[p] == "_ob_menu_JavascriptBrowser" || ob_maximize_menu_list[p] == "ob_menu_SQLBrowser") {
                        count_zz++;
                        for (var m = 0; m < document.getElementById(ob_maximize_menu_list[p] + "_sub").childNodes.length; m++) {
                            openbexi_reset_z(document.getElementById(ob_maximize_menu_list[p] + "_sub").childNodes[m], count_zz, count_zz);
                        }
                    }
                }
            }
            if (div.id.match(RegExp("_resize"))) {
                openbexi_reset_z(document.getElementById(div.id.replace("_resize", "")), count_zz++, count_zz++);
                openbexi_reset_z(document.getElementById(div.id.replace("_resize", "") + "_head"), count_zz++, count_zz++);
                openbexi_reset_z(document.getElementById(div.id), count_zz++, count_zz++);
            }
            else if (div.id.match(RegExp("_head"))) {
                openbexi_reset_z(document.getElementById(div.id.replace("_head", "")), count_zz++, count_zz++);
                openbexi_reset_z(document.getElementById(div.id), count_zz++, count_zz++);
                openbexi_reset_z(document.getElementById(div.id.replace("_head", "") + "_resize"), count_zz++, count_zz++);
            }
            else {
                openbexi_reset_z(document.getElementById(div.id), count_zz++, count_zz++);
                openbexi_reset_z(document.getElementById(div.id + "_head"), count_zz++, count_zz++);
                openbexi_reset_z(document.getElementById(div.id + "_resize"), count_zz++, count_zz++);
            }
            if (div.id == "ob_menu_widget" || div.id == "ob_menu_PictureBrowser" || div.id == "_ob_menu_JavascriptBrowser") {
                count_zz++;
                for (var n = 0; n < document.getElementById(div.id + "_sub").childNodes.length; n++) {
                    openbexi_reset_z(document.getElementById(div.id + "_sub").childNodes[n], count_zz, count_zz);
                }
            }
            if (div.id == "ob_menu_JavascriptBrowser")
                if (currentObjNameSelected != null) ob_manage_zIndex("all");
            if (div.id == "ob_menu_RequestBrowser")
                if (currentObjNameSelected != null) ob_manage_zIndex("all");
            if (div.id == "ob_menu_CSS")
                if (currentObjNameSelected != null) ob_manage_zIndex("all");
            if (div.id == "ob_menu_debugging")
                if (currentObjNameSelected != null) ob_manage_zIndex("all");


        }
    } catch (e) {
        __openbexi_debugC("openbexi_reset_all_z", "Exception:" + e.message);
    }
    return parseInt(openbexi_object.length + count_zz);
}
function openbexi_reset_z(obj, zIndex, obzindex) {
    try {
        // Sync-up wz_dragdrop data Base
        if (obj == null)return;
        if (obj.style == undefined) return;
        obj.style.zIndex = zIndex;
        if (obzindex != null)obj.obzindex = obzindex;
        if (dd.elements[obj.id] != null) {
            dd.elements[obj.id].setZ(zIndex);
        }
        obj.setAttribute("obzindex", zIndex);
    } catch (e) {
        __openbexi_debugC("openbexi_reset_z", "Exception:" + e.message);
    }
}

function openbexi_set_draggable(objId, draggable) {
    try {
        if (dd.elements[objId] != undefined) dd.elements[objId].setDraggable(draggable);
    } catch (e) {
        __openbexi_debugC("openbexi_set_draggable", "Exception:" + e.message);
    }
}
function openbexi_print_div_position(str) {
    try {
        var div = currentBexiObj_selected.div;
        str += "currentBexiObj_selected.type=" + currentBexiObj_selected.type + "  div.id=" + div.id + "  ********\n";
        str += "currentBexiObj_selected.div.style.left=" + currentBexiObj_selected.div.style.left + "\n";
        str += "currentBexiObj_selected.div.style.top=" + currentBexiObj_selected.div.style.top + "\n";
        str += "currentBexiObj_selected.div.style.width=" + currentBexiObj_selected.div.style.width + "\n";
        str += "currentBexiObj_selected.div.style.height=" + currentBexiObj_selected.div.style.height + "\n\n";
        str += "openbexi_main.x=" + openbexi_main.x + "\n";
        str += "openbexi_main.y=" + openbexi_main.y + "\n";
        str += "openbexi_main.w=" + openbexi_main.w + "\n";
        str += "openbexi_main.h=" + openbexi_main.h + "\n";
        str += "dd.elements[div.id].x=" + dd.elements[div.id].x + "\n";
        str += "dd.elements[div.id].y=" + dd.elements[div.id].y + "\n";
        str += "dd.elements[div.id].w=" + dd.elements[div.id].w + "\n";
        str += "dd.elements[div.id].h=" + dd.elements[div.id].h + "\n";
        __openbexi_debugC("openbexi_print_div_position", str);
    } catch (e) {
        __openbexi_debugC("openbexi_print_div_position", "Exception:" + e.message);
    }
    return str;
}
;
window.onresize = function () {
    try {
        for (var i = 0; i < openbexi_object.length; i++) {
            try {
                if (openbexi_object[i].positionning == "relative") {
                    if (openbexi_object[i].div.selected) my_PickFunc(openbexi_object[i].div);
                    openbexi_object[i].move_position();
                }
            } catch (e) {
            }
        }
    } catch (e) {
        __openbexi_debugC("onresize", "Exception:" + e.message);
    }
};




