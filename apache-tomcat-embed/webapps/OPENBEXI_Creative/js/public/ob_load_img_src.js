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
function ob_load_img_src(widget_id, img) {
    //Variable declaration and initialization
    var lang = "";
    var privateDoc = openbexi_get_documentElement(OPENBEXI_PRIVATE_CONTEXT_XML, "text/xml");
    if (privateDoc != null)
        lang = get_xml_classe_object_attribut_value(privateDoc, "bexicontext", "language", "name");
    if (lang == "") lang = "en";
    _CURRENT_OPENBEXI_LANGUAGE = lang;

    //Body: Javascript code
    try {
        var pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
        var img_id = get_xml_classe_object_attribut_value(pageDoc, "img", widget_id, "id");
        if (img_id == "") return;
        document.getElementById(img_id).src = img;
    } catch (e) {
    }
}
