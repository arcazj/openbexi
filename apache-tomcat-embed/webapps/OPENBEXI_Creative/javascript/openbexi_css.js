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
 */

if (OB_CSS == null) var OB_CSS = new Array();
var openbexi_CSS_build = false;
var ob_css_editor = [
    ['menu_RequestBrowser', 'ob_menu_RequestBrowser', '', '', '', '', '', 'Cascading Style Sheets Editor', '', '840px', '740px', '', ''],
    ['window_left', 'ob_menu_RequestBrowser_sub_left', '', '', '', '', '', '', '', '', '', 'overflow: auto;position:absolute;width:0%;', ''],
    ['end_window_left', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_body', 'ob_menu_RequestBrowser_sub', '', '', '', '', '', '', '', '', '', 'border-left:0px solid gray;overflow: auto;position:absolute;width:100%;', ''],
    ['form', 'ob_form', '', '', '', '', '', '', '', '', '', 'position:absolute;left:0px;', ''],
    ['fieldset', 'ob_fieldset', '', '', '', '', '', '', '', '', '', 'width:600px', ''],
    ['legend', 'ob_legend', '', '', '', '', '', 'CSS Editor', '', '', '', '', ''],
    ['textarea', 'bexicontext_CSS_class_data', '', '', '', '', '', 'CSS class', '', '', '', 'width:100%;', '13'],
    ['textarea', 'bexicontext_CSS_data', '', '', '', '', '', 'Div CSS', '', '', '', 'width:100%;', '13'],
    ['textarea', 'bexicontext_CSS_child_data', '', '', '', '', '', 'Child CSS', '', '', '', 'width:100%;', '13'],
    ['end_fieldset', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_form', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['end_window_body', '', '', '', '', '', '', '', '', '', '', '', ''],

    ['window_foot', 'ob_menu_RequestBrowser_sub_foot', '', '', '', '', '', '', '', '', '', 'border-left:1px solid gray;overflow: hidden;position:absolute;height:25%', ''],
    ['sep', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['ok', '', 'onclick="update_CSS_editor();"', '', 'onmousedown="src=\'gif/ob_ok_down.png\';"', 'onmouseover="src=\'gif/ob_ok_on.png\';"', 'onmouseout="src=\'gif/ob_ok.png\';"', 'Apply', '', '', '', '', ''],
    ['cancel', '', 'onclick="openbexiNavigator.window_factory(event,\'ob_menu_RequestBrowser\',null,\'hidden\');openbexiNavigator.update_css_editor_mode(\'tree\');"', '', 'onmousedown="src=\'gif/ob_cancel_down.png\';"', 'onmouseover="src=\'gif/ob_cancel_on.png\';"', 'onmouseout="src=\'gif/ob_cancel.png\';"', 'Cancel', '', '', '', '', ''],
    ['end_window_foot', '', '', '', '', '', '', '', '', '', '', '', '']
];

function openbexi_build_CSS() {
    var css = '    <style type="text/css">\n';
    try {
        var bgColor = openbexi_getPageData(null, "page", "body", "bgColor");
        var background = openbexi_getPageData(null, "page", "body", "background");
        var backgroundRepeat = openbexi_getPageData(null, "page", "body", "backgroundRepeat");
        css += "\n";
        css += "        body {";
        css += "               background:url(\'" + background + "\');";
        css += "               background-color:" + bgColor + ";";
        if (backgroundRepeat == "")
            css += "               background-repeat:no-repeat;";
        else
            css += "               background-repeat:" + backgroundRepeat + ";";
        css += "        }";
        for (var i = 0; i < openbexi_object.length; i++) {
            if (openbexi_object[i].id != "lefttop" && openbexi_object[i].id != "righttop" && openbexi_object[i].id != "rightbottom" && openbexi_object[i].id != "leftbottom") {
                try {
                    if (openbexi_object[i].positionning == "relative") {
                        openbexi_object[i].turnToRelative();
                    }
                } catch (e) {
                }
                try {
                    if (openbexi_object[i].cursor != undefined) {
                        openbexi_object[i].div.style.cursor = openbexi_object[i].cursor;
                    }
                } catch (e) {
                }
                css += "        #" + openbexi_object[i].div.id + "{\n            ";
                css += openbexi_get_CSS_and_CSS3(openbexi_object[i].div, true);
                css += "\n}\n";
                try {
                    if (openbexi_object[i].positionning == "relative") {
                        openbexi_object[i].turnToAbsolute();
                    }
                } catch (e) {
                }
            }
        }
        openbexi_CSS_build = true;
    } catch (e) {
        return null;
    }
    css += '    </style>\n';
    return css;
}
function openbexi_get_CSS_and_CSS3(obj, indent) {
    var css;
    var css_value;

    if (obj == undefined)  return null;
    css = openbexi_get_CSS_except_CSS3(obj);
    css_value = openbexi_getPageData(null, "page", obj.id, "css_border_bg");
    if (css_value != "") css += css_value;
    css_value = openbexi_getPageData(null, "page", obj.id, "css3_radius");
    if (css_value != "") css += css_value;
    css_value = openbexi_getPageData(null, "page", obj.id, "css3_boxShadow");
    if (css_value != "") css += css_value;
    css_value = openbexi_getPageData(null, "page", obj.id, "css3_gradient");
    if (css_value != "") css += css_value;
    css_value = openbexi_getPageData(null, "page", obj.id, "css_opacity");
    if (css_value != "") css += css_value;
    css_value = openbexi_getPageData(null, "page", obj.id, "css_font");

    if (css_value != "") css += css_value;
    if (indent)
        css = css.replace(/;/g, ";\n            ");
    else
        css = css.replace(/;/g, ";\n");
    css = css.replace("(\"", "(");
    css = css.replace("('", "(");
    css = css.replace("\")", ")");
    css = css.replace("')", ")");
    css = css.replace(openbexiNavigator.hrefPath, "");
    return css;
}
function openbexi_get_CSS_except_CSS3(obj) {
    if (obj == null) return null;
    try {
        var obj_clone = obj.cloneNode(true);
        obj_clone.style.removeProperty("border");
        obj_clone.style.removeProperty("border-color");
        obj_clone.style.removeProperty("border-width");
        obj_clone.style.removeProperty("background-color");
        obj_clone.style.removeProperty("-webkit-box-shadow");
        obj_clone.style.removeProperty("box-shadow");
        obj_clone.style.removeProperty("border-top");
        obj_clone.style.removeProperty("border-bottom");
        obj_clone.style.removeProperty("-moz-border-radius");
        obj_clone.style.removeProperty("-webkit-border-radius");
        obj_clone.style.removeProperty("-moz-box-shadow");
        obj_clone.style.removeProperty("-webkit-box-shadow");
        obj_clone.style.removeProperty("box-shadow");
        obj_clone.style.removeProperty("background-image");
        obj_clone.style.removeProperty("-moz-background-clip");
        obj_clone.style.removeProperty("-webkit-background-clip");
        obj_clone.style.removeProperty("background-clip");
        obj_clone.style.removeProperty("padding-box");
        obj_clone.style.removeProperty("opacity");
        obj_clone.style.removeProperty("background-repeat");
        obj_clone.style.removeProperty("background-origin");
        obj_clone.style.removeProperty("background-size");
        obj_clone.style.removeProperty("background-attachment");
        obj_clone.style.removeProperty("-webkit-transform");
        obj_clone.style.removeProperty("background-position");


        var angle = ob_get_angle(obj.id);
        var css = obj_clone.style["cssText"];
        css += "-moz-transform:rotate(" + ob_rect.getAngle() + "deg);-webkit-transform:rotate(" + angle + "deg);-o-transform:rotate(" + angle + "deg); -ms-transform:rotate(" + angle + "deg);";

    } catch (e) {
        css = openbexi_get_CSS(obj);
        __openbexi_debugC("openbexi_get_CSS_except_CSS3", "Exception:" + e.message);
    }

    if (obj.style.position == "relative")
        return "margin: 0px auto;" + css;
    else
        return css;
}
function openbexi_get_CSS(obj) {
    if (obj == null) return null;
    var css = obj.style["cssText"];
    css = css.replace("(\"", "(");
    css = css.replace("('", "(");
    css = css.replace("\")", ")");
    css = css.replace("')", ")");
    css = css.replace(openbexiNavigator.hrefPath, "");
    return css;
}
function openbexi_remove_CSS(div) {

    // If child, remove css too
    var list = getSelectedBexiObj(div).getChildrenId();
    if (list == null || list.length > 0) {
        for (var i = 0; i < list.length; i++) {
            var child_obj = document.getElementById(list[i]);
            if (child_obj != null) {
                var top = child_obj.style.top;
                var width = child_obj.style.width;
                var height = child_obj.style.height;
                var left = child_obj.style.left;
                var position = child_obj.style.position;
                child_obj.style["cssText"] = "";
                child_obj.style.top = top;
                child_obj.style.width = width;
                child_obj.style.height = height;
                child_obj.style.left = left;
                child_obj.style.position = position;
                ob_rotateControls(null);
            }
        }
    }
}
function openbexi_set_CSS(div, css) {
    if (div != null) {
        div.style["cssText"] = css;
        if (div.style.listStyleImage != undefined)openbexi_updatePageData(null, "page", div.id, "listStyleImage", div.style.listStyleImage);
    } else {
        var cssItems = css.split(";");
        for (var i = 0; i < cssItems.length; i++) {
            cssItems[i] = cssItems[i].replace("\n", "");
            var property_value = cssItems[i].split(":");
            if (property_value.length == 2 && property_value[0].replace(" ", "") == "bgColor") {
                openbexi_updatePageData(null, "page", "body", "bgColor", property_value[1]);
                document.body.bgColor = property_value[1];
            }
            if (property_value.length == 2 && (property_value[0].replace(" ", "") == "background" || property_value[0].replace(" ", "") == "background-color")) {
                openbexi_updatePageData(null, "page", "body", "background", property_value[1]);
                document.body.background = property_value[1];
            }
            if (property_value.length == 2 && property_value[0].replace(" ", "") == "background-repeat") {
                openbexi_updatePageData(null, "page", "body", "backgroundRepeat", property_value[1]);
                document.body.style.backgroundRepeat = property_value[1];
            }
            if (property_value.length == 2 && property_value[0].replace(" ", "") == "background-image") {
                var img = property_value[1].split("(");
                if (img.length == 2)
                    openbexi_add_page_image(img[1].replace(" ", "").replace(")", ""));
                if (img.length == 1 && img[0].replace(" ", "") != "none")
                    openbexi_add_page_image(property_value[1]);
            }
        }
    }
    // Save any img in page data if any
    cssItems = css.split(";");
    for (i = 0; i < cssItems.length; i++) {
        cssItems[i] = cssItems[i].replace("\n", "");
        property_value = cssItems[i].split(":");
        if (property_value.length == 2 && property_value[0].replace(" ", "") == "background-image") {
            img = property_value[1].split("(");
            if (img.length == 2)
                openbexi_add_page_image(img[1].replace(" ", "").replace(")", ""));
            if (img.length == 1 && img[0].replace(" ", "") != "none")
                openbexi_add_page_image(property_value[1]);
        }
    }
}
function openbexi_getCurrentCSSObj() {
    var bexiDiv;
    if (document.getElementById("ob_labelWidgetId") != null && document.getElementById("ob_labelWidgetId").value != "BODY") {
        var widgetId = document.getElementById("ob_labelWidgetId").value;
        var widgetIdList = widgetId.split(".");
        widgetIdList = widgetIdList[widgetIdList.length - 1].split(".");
        bexiDiv = document.getElementById(widgetIdList[0]);
    } else {
        bexiDiv = getSelectedBexiObj(null).div;
    }
    return bexiDiv;
}
function openbexi_setCSSValue_fromPicker(event, property, value) {
    try {
        openbexi_stopEventPropagation(event);
        if (ob_current_connector != null) {
            __openbexi_debugC("openbexi_setCSSValue_fromPicker", property + " value=" + value + " for " + ob_current_connector);
            if (value != "")
                openbexi_setConnectorProperties(event, "strokeStyle", value);
        }
        else if (ob_current_endpoint != null) {
            __openbexi_debugC("openbexi_setCSSValue_fromPicker", property + " value=" + value + " for " + ob_current_endpoint.id);
            if (value != "")
                openbexi_setEndpointProperties(event, "fillStyle", value);

        }
        else {
            __openbexi_debugC("openbexi_setCSSValue_fromPicker", property + " value=" + value + " for " + currentObjNameSelected);
            openbexi_setCSSValue(event, property, value);
        }
    } catch (e) {
        __openbexi_debugC("openbexi_setCSSValue_fromPicker()", "Exception:" + e.message, "red");
    }
}
function openbexi_load_JS_CSS_file(filename, filetype) {
    var fileref;
    try {
        if (filetype == "js") { //if filename is a external JavaScript file
            fileref = document.createElement('script');
            fileref.setAttribute("type", "text/javascript");
            fileref.setAttribute("src", filename);
        }
        else if (filetype == "css") { //if filename is an external CSS file
            fileref = document.createElement("link");
            fileref.setAttribute("rel", "stylesheet");
            fileref.setAttribute("type", "text/css");
            fileref.setAttribute("href", filename);
        }
        if (typeof fileref != "undefined")
            document.getElementsByTagName("head")[0].appendChild(fileref);
    } catch (e) {
    }
}
function openbexi_getStyleByClass(ob_class) {
    // Ex:openbexi_getStyleBySelector("." + getSelectedBexiObj(null).div.getAttribute("class"));
    var sheetList = document.styleSheets;
    var ruleList;
    var i, j;

    /* look through stylesheets in reverse order that
     they appear in the document */
    for (i = sheetList.length - 1; i >= 0; i--) {
        ruleList = sheetList[i].cssRules;
        for (j = 0; j < ruleList.length; j++) {
            if (ruleList[j].type == CSSRule.STYLE_RULE &&
                    ruleList[j].selectorText.search(ob_class) != -1) {
                return ruleList[0].cssText;
            }
        }
    }
    return "";
}
function openbexi_getStyleBySelector(selector) {
    // Ex:openbexi_getStyleBySelector("." + getSelectedBexiObj(null).div.getAttribute("class"));
    var sheetList = document.styleSheets;
    var ruleList;
    var i, j;

    /* look through stylesheets in reverse order that
     they appear in the document */
    for (i = sheetList.length - 1; i >= 0; i--) {
        ruleList = sheetList[i].cssRules;
        for (j = 0; j < ruleList.length; j++) {
            if (ruleList[j].type == CSSRule.STYLE_RULE &&
                    ruleList[j].selectorText == selector) {
                return ruleList[0].cssText;
            }
        }
    }
    return "";
}
function openbexi_adjust_CSS_editor(editor, success) {
    if (success) {
        totalLines = editor.lineCount();
        totalChars = editor.getTextArea().value.length;
        editor.autoFormatRange({line: 0, ch: 0}, {line: totalLines, ch: totalChars});
        CodeMirror.commands["goPageUp"](editor);
        totalLines = editor.lineCount();
        editor.setSize("100%", (totalLines * 13) + "px");
    } else {
        document.getElementById("label_" + editor).style.visibility = "hidden";
        document.getElementById(editor).style.visibility = "hidden";
        document.getElementById(editor).style.height = "0%";
        document.getElementById(editor).style.width = "0%";
        document.getElementById(editor).rows = 0;
        document.getElementById(editor).cols = 0;
    }
}
var bexicontext_CSS_class_editor;
var bexicontext_CSS_editor;
var bexicontext_CSS_child_editor;
function display_CSS_editor() {
    var totalLines;
    var totalChars;
    try {
        var css;
        openbexiNavigator.css_editor_mode = "text";
        openbexiNavigator.window_factory(null, 'ob_menu_RequestBrowser', ob_css_editor, 'maximize');
        if (currentObjNameSelected == null) {
            try {
                var bgColor = openbexi_getPageData(null, "page", "body", "bgColor");
                var background = openbexi_getPageData(null, "page", "body", "background");
                var backgroundRepeat = openbexi_getPageData(null, "page", "body", "backgroundRepeat");
                css = "bgColor:" + bgColor + ";\n";
                if (backgroundRepeat == "")
                    css = "background-repeat:no-repeat;\n";
                else
                    css = "background-repeat:" + backgroundRepeat + ";\n";
                if (background != "")
                    css += "background:" + background;
                document.getElementById("bexicontext_CSS_data").value = css;
                //Implementing a Syntax-Highlighting with JavaScript Editor from code mirror
                bexicontext_CSS_editor = CodeMirror.fromTextArea(document.getElementById("bexicontext_CSS_data"), {mode: "css", theme: "night", lineNumbers: true, matchBrackets: true, tabMode: "indent", onChange: function () {
                    clearTimeout(pending);
                    setTimeout(update, 400);
                }});
                openbexi_adjust_CSS_editor(bexicontext_CSS_editor, true);
            } catch (e) {
                openbexi_adjust_CSS_editor("bexicontext_CSS_data", false);
            }

        } else {
            // CSS class
            try {
                css = openbexi_getStyleByClass(getSelectedBexiObj(null).getClass());
                document.getElementById("bexicontext_CSS_class_data").value = css;
                //Implementing a Syntax-Highlighting with JavaScript Editor from code mirror
                bexicontext_CSS_class_editor = CodeMirror.fromTextArea(document.getElementById("bexicontext_CSS_class_data"), {mode: "css", theme: "night", lineNumbers: true, matchBrackets: true, tabMode: "indent", onChange: function () {
                    clearTimeout(pending);
                    setTimeout(update, 400);
                }});
                openbexi_adjust_CSS_editor(bexicontext_CSS_class_editor, true);
            } catch (e) {
                openbexi_adjust_CSS_editor("bexicontext_CSS_class_data", false);
            }

            // CSS
            try {
                var obj = openbexi_getCurrentCSSObj();
                css = obj.id + " {\n";
                css += openbexi_get_CSS_and_CSS3(obj, false);
                css += "\n}\n";
                document.getElementById("bexicontext_CSS_data").value = css;
                //Implementing a Syntax-Highlighting with JavaScript Editor from code mirror
                bexicontext_CSS_editor = CodeMirror.fromTextArea(document.getElementById("bexicontext_CSS_data"), {mode: "css", theme: "night", lineNumbers: true, matchBrackets: true, tabMode: "indent", onChange: function () {
                    clearTimeout(pending);
                    setTimeout(update, 400);
                }});
                openbexi_adjust_CSS_editor(bexicontext_CSS_editor, true);
            } catch (e) {
                openbexi_adjust_CSS_editor("bexicontext_CSS_data", false);
            }
            //Child CSS
            try {
                if (getSelectedBexiObj(null).getChildrenId() != undefined) {
                    var list = getSelectedBexiObj(null).getChildrenId();
                    if (list == null || list.length == 1)
                        document.getElementById("bexicontext_CSS_child_data").value = "no  Child";
                    else
                        document.getElementById("bexicontext_CSS_child_data").value = "";
                    if (getSelectedBexiObj(null).type != "openbexi_dojo_editor")
                        for (var i = 1; i < list.length; i++) {
                            var child_obj = document.getElementById(list[i]);
                            document.getElementById("bexicontext_CSS_child_data").value += list[i] + " {\n";
                            document.getElementById("bexicontext_CSS_child_data").value += openbexi_get_CSS_and_CSS3(child_obj, false);
                            document.getElementById("bexicontext_CSS_child_data").value += "}\n";
                        }
                    else {
                        var html_code = getSelectedBexiObj(null).div.innerHTML;
                        //remove the blankspaces from left and right of the string
                        document.getElementById("bexicontext_CSS_child_data").value = html_code.replace(/^\s+/, '').replace(/\s+$/, '');
                    }
                }

                //Implementing a Syntax-Highlighting with JavaScript Editor from code mirror
                bexicontext_CSS_child_editor = CodeMirror.fromTextArea(document.getElementById("bexicontext_CSS_child_data"), {mode: "css", theme: "night", lineNumbers: true, matchBrackets: true, tabMode: "indent", onChange: function () {
                    clearTimeout(pending);
                    setTimeout(update, 400);
                }});
                openbexi_adjust_CSS_editor(bexicontext_CSS_child_editor, true);
            } catch (e) {
                openbexi_adjust_CSS_editor("bexicontext_CSS_child_data", false);
            }
        }
    } catch (e) {
        __openbexi_debugC("display_CSS_editor()", "Exception:" + e.message);
    }
}
function update_CSS_editor() {
    try {
        var obj = openbexi_getCurrentCSSObj();
        var css = bexicontext_CSS_editor.getValue();
        if (obj != undefined) {
            css = css.replace(obj.id, "");
            css = css.replace("{", "");
            css = css.replace("}", "");
            css = css.replace("no-repeat no-repeat", "no-repeat");
            openbexi_set_CSS(obj, css);
            //if child
            if (getSelectedBexiObj(null).getChildrenId() != undefined) {
                var list = getSelectedBexiObj(null).getChildrenId();
                if (list == null || list.length <= 1) {
                    if (getSelectedBexiObj(null).type == "openbexi_dojo_editor") {
                        getSelectedBexiObj(null).div.innerHTML = bexicontext_CSS_child_editor.getValue();
                    }
                } else {
                    for (var i = 1; i < list.length; i++) {
                        var child_obj = document.getElementById(list[i]);
                        var css_child = bexicontext_CSS_child_editor.getValue();
                        css = css_child.replace(list[i], "");
                        css = css.replace("{", "");
                        css = css.replace("}", "");
                        css = css.replace("no-repeat no-repeat", "no-repeat");
                    }
                    openbexi_set_CSS(child_obj, css);
                }
            }
        } else
            openbexi_set_CSS(null, css);
        my_canvas_PickFunc(getSelectedBexiObj(null).div.id);

    } catch (e) {
        __openbexi_debugC("update_CSS_editor()", "Exception:" + e.message);
    }
}
function openbexi_setCSSValue(event, property, value) {
    try {
        __openbexi_debugC("openbexi_setCSSValue", property + " value=" + value + " for " + currentObjNameSelected);
        openbexi_stopEventPropagation(event);
        ob_setDirty_flag(true);
        if (openbexiNavigator.css_mode == "css_javascript") {
            if (document.getElementById(openbexiNavigator.css_div))document.getElementById(openbexiNavigator.css_div).value = property + ":" + value + ";";
            return;
        }
        if (property == "backgroundImage") {
            if (value != "none")
                getSelectedBexiObj(null).setAttribute(property, value);
            else
                getSelectedBexiObj(null).setAttribute(property, '');
        } else {
            if (value == "More")
                value = prompt("enter property value for " + property + ":", "");
            try {
                if (getSelectedBexiObj(null) == openbexiBody) {
                    openbexiBody.setAttribute(property, value);
                } else {
                    getSelectedBexiObj(null).setAttribute(property, value);
                }
            } catch (e) {
                __openbexi_debugC("openbexi_setCSSValue()", "Exception:" + e.message);
            }
        }
    } catch (e) {
        __openbexi_debugC("openbexi_setCSSValue()", "Exception:" + e.message, "red");
    }
}
function save_background_CB(responseXML) {
    try {
        __openbexi_debugC_page("save_background_CB(" + responseXML + ")", "Info:");

        if (responseXML == null || responseXML == "") {
            if (openbexiNavigator) openbexiNavigator.status("save_background_CB bug ???");
            __openbexi_debugC_page("save_background_CB() Exception:", "No answer from the server");
            openbexi_unloading2();
            return;
        }

        var ob_doc = openbexi_get_documentElement(responseXML, "text/xml");

        var status = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "status", "text");
        if (status != "" && status != "done") {
            __openbexi_debugC_page("save_background_CB() Info:", "status=" + status);
            openbexiNavigator.top_frame_message(status, "50px", "error");
            return;
        }

        var appli_status = get_xml_classe_object_attribut_value(ob_doc, "openbexi_creative", "application", "status");
        if (appli_status != "") {
            __openbexi_debugC_page("save_background_CB() Info:", "appli_status=" + appli_status);
        }

        var exception = get_xml_classe_object_attribut_value(ob_doc, "openbexi_creative", "application", "exception");
        if (exception != "") __openbexi_debugC_page("save_background_CB() Exception:", exception);

        var div_id = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "div", "name");
        var filename = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "image", "filename");
        var project = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "dir", "project");

        if (appli_status == "CannotSaveFile") {
            openbexiNavigator.top_frame_message("Cannot save " + filename, "30px", "warning");
            return;
        }

        if (filename == "" || project == "")return;
        if (div_id == "")
            openbexiBody.setAttribute("backgroundImage", "project/" + project + "/gif/" + filename);
        else {
            if (div_id == "null") div_id = null;
            getSelectedBexiObj(div_id).setAttribute("backgroundImage", "project/" + project + "/gif/" + filename);
            //openbexi_updatePageData(null, "page", div_id, "background", "project/" + project + "/gif/" + filename);
        }
        openbexi_add_page_image("project/" + project + "/" + "/gif/" + filename);

        if (appli_status == "ok")
            openbexiNavigator.top_frame_message(filename + " successfully saved", "30px", "info");

    } catch (e) {
        __openbexi_debugC_page("save_background_CB()", "Exception:" + e.message);
    }
    openbexi_unloading2();

}
function openbexi_save_background(e, div_id, path_source, filename, codec) {
    try {
        openbexi_stopEventPropagation(e);
        __openbexi_debugC_page("save_background_CB(" + div_id + "," + path_source + "," + filename + ")", "Info:");
        var doc = null;
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_saveFileRequest");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "project", openbexiNavigator.projectName);
        if (filename != null) {
            var file = openbexi_stringReplaceAll(filename, "-##-", " ");
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "image", "filename", file);
        }
        if (path_source != null) {
            var path = openbexi_stringReplaceAll(path_source, "-##-", " ");
            path = openbexi_stringReplaceAll(path, "#", "/");
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "image", "path_source", path);
        }
        if (codec != null) doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "image", "background", codec);
        if (div_id == null) div_id = "null";
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "div", "name", div_id);
        var ob_xml = openbexi_get_xmlString(doc);

        var mode_sync = openbexi_synchron();
        openbexi_connect_to_server(null, mode_sync, ob_xml, save_background_CB);
    } catch (e) {
        __openbexi_debugC_page("openbexi_save_background()", "Exception:" + e.message);
    }
}
