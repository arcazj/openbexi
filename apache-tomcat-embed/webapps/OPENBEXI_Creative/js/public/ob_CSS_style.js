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
function ob_CSS_style( widget_id, widget_type, CSS ) {
    //Variable declaration and initialization
    var lang = "";
    var privateDoc = openbexi_get_documentElement(OPENBEXI_PRIVATE_CONTEXT_XML, "text/xml");
    if (privateDoc != null)
        lang = get_xml_classe_object_attribut_value(privateDoc, "bexicontext", "language", "name");
    if (lang == "") lang = "en";
    _CURRENT_OPENBEXI_LANGUAGE = lang;
 
    var pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
    var object_id = get_xml_classe_object_attribut_value(pageDoc, "url", widget_id, "object.id");
    if (object_id == "")   object_id = widget_id;
    var object_type = get_xml_classe_object_attribut_value(pageDoc, "url", widget_id, "object.type");
    if (object_type == "")   object_type = widget_type;
    var widget_css = get_xml_classe_object_attribut_value(pageDoc, "url", widget_id, "CSS");
    if (widget_css == "")   widget_css = CSS;
 
 
    //Body: Javascript code
    try {
        document.getElementById(object_type).style["cssText"] += widget_css;
    } catch (e) {
    }
}
