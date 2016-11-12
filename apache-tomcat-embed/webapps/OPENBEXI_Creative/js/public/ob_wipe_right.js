/* This notice must be untouched at all times.

Copyright (c) 2005-2011 JC Arcaz. All rights reserved.
 OPEN OPENBEXI HTML Builder for generating dynanic HTML page and html code source from browsers.
updated: Janvier 03  2011 version 3.1
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

var ob_previousPageTab = null;
var ob_previousButtonTab = null;
var ob_goIn;
function ob_wipe_right(widget_id, widget_type, width, timeout) {
    //Variable declaration and initialization
    var pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
    if (pageDoc == null)      return;
    if (widget_id == undefined) return;
    if (timeout == undefined || timeout == "")  timeout = 80;
    if (widget_id == undefined)
        widget_id = get_xml_classe_object_attribut_value(pageDoc, "elt", widget_id, "id");
    if (widget_type == undefined)
        widget_type = get_xml_classe_object_attribut_value(pageDoc, "page", widget_id, "parentType");

    //Body: Javascript code
    try {
        var div = document.getElementById(widget_id);
        if (!div) return;
        if (ob_previousPageTab != widget_id) {
            ob_previousPageTab = widget_id;
            div.style.width = "0px";
            clearTimeout(ob_goIn);
            if (ob_previousPageTab != null) {
                var divPrevious = document.getElementById(ob_previousPageTab);
                divPrevious.style.visibility = "hidden";
            }
        }
        var w = parseInt(div.style.width);
        div.style.visibility = "visible";
        if (isNaN(w))
            div.style.width = "0px";
        else
            div.style.width = (w + parseInt(timeout)) + "px";
        ob_goIn = setTimeout(function() {
            ob_wipe_right(widget_id, widget_type, width, timeout)
        }, 50);
        if (parseInt(div.style.width) > width) {
            clearTimeout(ob_goIn);
            div.style.width = width + "px";
            ob_previousPageTab = null;
        }
    } catch   (e) {
        ob_previousPageTab = widget_id;
        div.style.width = width + "px";
        clearTimeout(ob_goIn);
    }
}
