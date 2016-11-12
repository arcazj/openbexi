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

function ob_rollOver_img(widget_id, widget_type, time_out, img, urls, count) {
    //Variable declaration and initialization
    var pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
    if (pageDoc == null)      return;
    if (widget_id == undefined) return;
    if (widget_type == undefined)
        widget_type = get_xml_classe_object_attribut_value(pageDoc, "page", widget_id, "parentType");
    if (time_out == undefined || time_out == "")  time_out = 2;
    var imgId = get_xml_classe_object_attribut_value(pageDoc, "img", widget_id, "id");
    if (img == undefined) img = document.getElementById(imgId);
    if (img == undefined) return;
    var count;
    if (count == undefined)    count = 0;
    var rollOver = openbexi_getPageData(null, "page", widget_id, "rollOver");
    var urls;
    if (rollOver == "true") {
        if (urls == undefined) {
            urls = new Array();
            pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
            var imgs_div = get_xml_classe_object_attributes(pageDoc, "imgs", widget_id);
            if (imgs_div != null) {
                for (var i = 0; i < imgs_div.length; i++) {
                    urls[i] = get_xml_classe_object_attribut_value(pageDoc, "imgs", widget_id, imgs_div[i].getAttribute("name"));
                }
            }
        }
    }

    //Body: Javascript code
    try {
        img.src = urls[count];
        count++;
        if (count >= urls.length) count = 0;
        img.goRoolOver = setTimeout(function() {
            ob_rollOver_img(widget_id, widget_type, time_out, img, urls, count);
        }, parseInt(time_out) * 1000);

    } catch   (e) {
        clearTimeout(img.goRoolOver);
    }
}
