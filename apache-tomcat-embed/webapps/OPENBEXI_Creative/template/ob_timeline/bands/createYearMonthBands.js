/* This notice must be untouched at all times.

 Copyright (c) 2005-2009 JC Arcaz. All rights reserved.
 OPEN OPENBEXI htmlbuilder library for generating dynanic HTML page and html code source from browsers.
 updated: Feb  21  2009 version 2.2
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
function createYearMonthBands(currentTime, timezone, eventSource, theme) {
    try {
        theme.autoWidth = true;
        var zones = [
            {
                start:    ob_parseDateTime(-10 * 3600, "currentTime"),
                end:      ob_parseDateTime(10 * 3600, "currentTime"),
                magnify:  3,
                unit:     Timeline.DateTime.MONTH,
                multiple: 5
            }
        ];
        var zones2 = [
            {
                start:    ob_parseDateTime(-3 * 3600, "currentTime"),
                end:      ob_parseDateTime(3 * 3600, "currentTime"),
                magnify:  8,
                unit:     Timeline.DateTime.YEAR,
                multiple: 1
            },
        ];
        var bandInfos = [
            Timeline.createHotZoneBandInfo({
                width:          "85%",
                intervalUnit:   Timeline.DateTime.MONTH,
                intervalPixels: 50,
                zones:          zones,
                eventSource:    eventSource,
                date:           currentTime,
                timeZone:       timezone ,
                theme:          theme,
             
            }),
            Timeline.createBandInfo({
                width:          "15%",
                intervalUnit:   Timeline.DateTime.YEAR,
                intervalPixels: 100,
                //zones:          zones2,
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
                startDate:  ob_parseDateTime(-40, "currentTime"),
                endDate:    ob_parseDateTime(40, "currentTime"),
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
                startDate:  ob_parseDateTime(-40, "currentTime"),
                endDate:    ob_parseDateTime(40, "currentTime"),
                color:      "red",
                opacity:    50,
                startLabel: "Current year",
                //endLabel:   "",
                // theme:      theme,
                cssClass: 't-highlight1'
            }) ,
            new Timeline.SpanHighlightDecorator({
                startDate:  ob_parseDateTime(-12 * 360 * 3600, "currentTime"),
                endDate:    ob_parseDateTime(12 * 360 * 3600, "currentTime"),
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
