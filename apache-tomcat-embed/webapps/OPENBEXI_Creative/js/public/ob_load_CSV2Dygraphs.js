/* This notice must be untouched at all times.

 Copyright (c) 2005-2012 JC Arcaz. All rights reserved.
 OPEN OPENBEXI Creative: server side for generating dynanic HTML page and html code source from browsers.Works with OPEN OPENBEXI HTML Builder
 updated: January 22 2012 version 4.0
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
function ob_csv_getDate(dateCB, deltaTime, format) {
    if (dateCB == undefined) return;
    var myDate = new Date(dateCB);
    if (deltaTime.match("HH")) {
        try {
            deltaTime = deltaTime.replace("HH", "")
            myDate.setHours(eval(myDate.getHours() + deltaTime));
        } catch (e) {
        }
    }
    if (deltaTime.match("dd")) {
        try {
            deltaTime = deltaTime.replace("dd", "")
            myDate.setDate(eval(myDate.getDate() + deltaTime));
        } catch (e) {
        }
    }
    if (deltaTime.match("mm")) {
        try {
            deltaTime = deltaTime.replace("mm", "")
            myDate.setMonth(eval(myDate.getMonth() + deltaTime));
        } catch (e) {
        }
    }
    if (deltaTime.match("yyyy")) {
        try {
            deltaTime = deltaTime.replace("yyyy", "")
            myDate.setYear(eval(myDate.getYear() + deltaTime));
        } catch (e) {
        }
    }
    try {
        dateCB = myDate.toString();
        var newdate;
        var dateItems = dateCB.split(' ');
        var mm = myDate.getMonth() + 1;
        var qq = 1;
        if (mm == 4 || mm == 5 || mm == 6) qq = 2;
        if (mm == 7 || mm == 8 || mm == 9) qq = 3;
        if (mm == 10 || mm == 11 || mm == 12) qq = 4;
        if (dateItems.length > 6) {
            if (mm.toString().length == 1)   mm = "0" + mm;
            format = format.replace("mm", mm);
            var dd = dateItems[2];
            if (dd.length == 1)   dd = "0" + dd;
            format = format.replace("dd", dd);
            format = format.replace("qq", qq);
            var yyyy = dateItems[3];
            format = format.replace("yyyy", yyyy);
            var ZZ = dateItems[5];
            format = format.replace("ZZ", ZZ);
            var timeT = dateItems[4];
            var timeItems = timeT.split(':');
            var HH;
            var MM;
            var SS;
            if (timeItems.length == 3) {
                HH = timeItems[0];
                format = format.replace("HH", HH);
                MM = timeItems[1];
                format = format.replace("MM", MM);
                SS = timeItems[2];
                format = format.replace("SS", SS);
            }
            newdate = format;
        }
        else if (dateItems.length == 6) {
            if (mm.toString().length == 1)   mm = "0" + mm;
            format = format.replace("mm", mm);
            var dd = dateItems[2];
            if (dd.length == 1)   dd = "0" + dd;
            format = format.replace("dd", dd);
            format = format.replace("qq", qq);
            var yyyy = dateItems[5];
            format = format.replace("yyyy", yyyy);
            var ZZ = dateItems[4];
            format = format.replace("ZZ", ZZ);
            var timeT = dateItems[3];
            var timeItems = timeT.split(':');
            var HH;
            var MM;
            var SS;
            if (timeItems.length == 3) {
                HH = timeItems[0];
                format = format.replace("HH", HH);
                MM = timeItems[1];
                format = format.replace("MM", MM);
                SS = timeItems[2];
                format = format.replace("SS", SS);
            }
            newdate = format;
        } else {
            return filename;
        }
        return newdate;
    } catch (e) {
        return filename;
    }
}
function ob_load_CSV2Dygraphs(widget_id, dateCB, timeDelta, widget_type, filename, update_according_date) {
    //Variable declaration and initialization
    if (dateCB == undefined || dateCB == "arguments[0]")
        dateCB = new Date().toString();

    try {
        if (update_according_date == undefined || update_according_date == "true")
            filename = ob_json_getDate(dateCB, timeDelta, filename);
    } catch (e) {
    }
    //Body: Javascript code
    try {
        var doc = set_xml_classe_object_attribut_value(null, "ob_request", "request", "type", "openbexi_DygraphsDataRequest");
        var view = openbexi_getPageData(null, "dygraphs", widget_id, "view");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "div", "name", widget_id);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "csv", "filename", filename);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "csv", "text", "");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "json", "view", view);
        var ob_xml = openbexi_get_xmlString(doc);
        // Send Dygraphs data request to server
        var mode_sync = openbexi_synchron();
        openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_getDygraphs_CB);

    } catch (e) {
    }
}
