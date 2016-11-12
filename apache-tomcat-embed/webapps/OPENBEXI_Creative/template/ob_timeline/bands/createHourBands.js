/* This notice must be untouched at all times.

Copyright (c) 2006-2011 JC Arcaz. All rights reserved.
OPEN OPENBEXI htmlbuilder library for generating dynanic HTML page and html code source from browsers.
updated: Jan 03 2011 version 3.1
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
function createHourBands(currentTime, timezone, eventSource, theme) {
    try {
        var zones = [
        {   start:    ob_parseDateTime(-12, "currentTime"),
            end:      ob_parseDateTime(12, "currentTime"),
            magnify:  3,
            unit:     Timeline.DateTime.MINUTE,
            multiple: 5
        }
                ];
        var zones2 = [
        {   start:    ob_parseDateTime(-3, "currentTime"),
            end:      ob_parseDateTime(3, "currentTime"),
            magnify:  8,
            unit:     Timeline.DateTime.HOUR,
            multiple: 1
        },
                ];
        var bandInfos = [
                Timeline.createHotZoneBandInfo({
                    width:          "90%",
height:          "100%",
                    intervalUnit:   Timeline.DateTime.HOUR,
                    intervalPixels: 200,
                    zones:          zones,
                    eventSource:    eventSource,
                    date:           currentTime,
                    timeZone:       timezone ,
                    theme:          theme
                }),
                Timeline.createBandInfo({
                    width:          "10%",
                    intervalUnit:   Timeline.DateTime.DAY,
                    intervalPixels: 400,
                    zones:          zones2,
                    eventSource:    eventSource,
                    date:           currentTime,
                    timeZone:       timezone,
                    overview:       true
                    // theme:          theme
                })
                ];
        bandInfos[1].syncWith = 0;
        bandInfos[1].highlight = true;

        bandInfos[0].decorators = [
                new Timeline.SpanHighlightDecorator({
                    startDate:  ob_parseDateTime(-3 , "currentTime"),
                    endDate:    ob_parseDateTime(3 , "currentTime"),
                    color:      "red",
                    opacity:    50,
                //startLabel: "",
                //endLabel:   "",
                // theme:      theme,
                    cssClass: 't-highlight1'
                })
                ];
        bandInfos[1].decorators = [
                new Timeline.SpanHighlightDecorator({
                    startDate:  ob_parseDateTime(-10 , "currentTime"),
                    endDate:    ob_parseDateTime(10 , "currentTime"),
                    color:      "red",
                    opacity:    50,
                    startLabel: "Current day",
                //endLabel:   "",
                // theme:      theme,
                    cssClass: 't-highlight1'
                }) ,
                new Timeline.SpanHighlightDecorator({
                    startDate:  ob_parseDateTime(-12 * 3600 , "currentTime"),
                    endDate:    ob_parseDateTime(12 * 3600 , "currentTime"),
                    color:      "#f0c000",
                    opacity:    50,
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
