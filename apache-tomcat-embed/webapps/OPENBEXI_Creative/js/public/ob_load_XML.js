/* This notice must be untouched at all times.

 Copyright (c) 2005-2012 JC Arcaz. All rights reserved.
 OPEN OPENBEXI Creative: server side for generating dynanic HTML page and html code source from browsers.Works with OPEN OPENBEXI HTML Bu
 ilder
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
function ob_XML_getDate(dateCB, deltaTime, format) {
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
var ob_first_time = true;
function ob_load_XML(widget_id, dateCB, timeDelta, widget_type, filename, update_according_date) {
    //Variable declaration and initialization
    var original_filename = filename;
    var previous_filename = filename;
    if (dateCB == undefined || dateCB == "arguments[0]")
        dateCB = new Date().toString();

    try {
        original_filename = filename;
        if (update_according_date == undefined || update_according_date == "true")
            filename = ob_XML_getDate(dateCB, timeDelta, filename);
    } catch (e) {
    }

    var pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
    if (pageDoc == null) return;


    //Body: Javascript code
    if (widget_type == "openbexi_dojo_editor") {
        try {
            var rss ;
            document.getElementById(widget_id).innerHTML = '<div class=ob_rss_title id="' + widget_id + '_rssTitleTemplate">(::Title::)<br/><a class=ob_rss_link href="(::Link::)"><h2 class=ob_rss_description >(::Description::)</h2></a></div><div class=ob_rss_body  id="' + widget_id + '_rssBodyTemplate"><a class=ob_rss_link_body href="(::Link::)"><b class=ob_rss_title_body>(::Title::)</b></a> <b class=ob_rss_pubdate_body>(::Pubdate::)</b><br/><font class=ob_rss_description_body size="-1">(::Description::)</font><hr class=ob_shade noshade/><br/>';
            if (filename == "")
                rss = get_xml_classe_object_attribut_value(pageDoc, "page", "fck", "RSS");
            else
                rss = filename;
            openbexi_updatePageData(null, "ob_explorer", "html", "filename", filename);
            return openbexi_readRSS(widget_id, rss, widget_id + '_rssBodyTemplate', widget_id + '_rssTitleTemplate');
            //console.log("load XML success");
        } catch (e) {
            //console.log("load XML failed, " + e.message);
        }
    }
    if (widget_type == "openbexi_chart") {
        try {
            var type1 = get_xml_classe_object_attribut_value(pageDoc, "chart", widget_id, "type") ;
            openbexi_readXMLfunction(widget_id, type1, filename);
        } catch (e) {
        }
    }
    if (widget_type == "openbexi_timeline") {
        try {
            local_timeline.mode = "local";
            local_timeline.timeline.getBand(0).setCenterVisibleDate(dateCB);
            local_timeline.loadXML(filename, true);

            if (ob_first_time == true) {
                local_timeline.timeline.getBand(0).addOnScrollListener(function(band) {
                    var minDate = band.getMinDate();
                    var maxDate = band.getMaxDate();
                    filename = ob_XML_getDate(minDate, timeDelta, original_filename);
                    if (previous_filename != filename && previous_filename != original_filename) {
                        local_timeline.timeline.getBand(0).getEventSource().clear();
                        local_timeline.loadXML(previous_filename, true);
                        local_timeline.loadXML(filename, false);
                        ob_first_time = false;
                    }
                    previous_filename = filename;
                });
            }

        } catch (e) {
            alert(e);
        }
    }
}
