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
function createDefaultBands_2(currentTime, timezone, eventSource, theme) {
    try {
        var zones = [
            {
                start:    ob_parseDateTime(-999999 * 3600),
                end:      ob_parseDateTime(999999 * 3600),
                magnify:  3,
                unit:     Timeline.DateTime.MINUTE,
                multiple: 5
            }
        ];
        var bandInfos = [
            Timeline.createBandInfo({
                width:          "10%",
                intervalUnit:   Timeline.DateTime.DAY,
                intervalPixels: 300,
                eventSource:    eventSource,
                date:           currentTime,
                timeZone:       timezone,
                overview:       true
            }),
            Timeline.createHotZoneBandInfo({
                width:          "30%",
                intervalUnit:   Timeline.DateTime.HOUR,
                intervalPixels: 300,
                zones:          zones,
                eventSource:    eventSource,
                date:           currentTime,
                timeZone:       timezone ,
                theme:          theme
            }),
            Timeline.createHotZoneBandInfo({
                width:          "30%",
                intervalUnit:   Timeline.DateTime.HOUR,
                intervalPixels: 300,
                zones:          zones,
                eventSource:    eventSource,
                date:           currentTime,
                timeZone:       timezone ,
                theme:          theme
            })    ,
            Timeline.createHotZoneBandInfo({
                width:          "30%",
                intervalUnit:   Timeline.DateTime.HOUR,
                intervalPixels: 300,
                zones:          zones,
                eventSource:    eventSource,
                date:           currentTime,
                timeZone:       timezone ,
                theme:          theme
            })
        ];

        bandInfos[0].decorators = [
            new Timeline.SpanHighlightDecorator({
                startDate:  ob_parseDateTime(-10, "currentTime"),
                endDate:    ob_parseDateTime(10, "currentTime"),
                color:      "red",
                opacity:    50,
                startLabel: "Current day",
                cssClass: 't-highlight1'
            }) ,
            new Timeline.SpanHighlightDecorator({
                startDate:  ob_parseDateTime(-12 * 3600, "currentTime"),
                endDate:    ob_parseDateTime(12 * 3600, "currentTime"),
                color:      "#f0c000",
                opacity:    50,
                cssClass: 't-highlight1'
            })
        ];
        bandInfos[1].decorators = [
            new Timeline.SpanHighlightDecorator({
                startDate:  ob_parseDateTime(-2, "currentTime"),
                endDate:    ob_parseDateTime(2, "currentTime"),
                color:      "red",
                opacity:    50,
                cssClass: 't-highlight1'
            }),
            new Timeline.SpanHighlightDecorator({
                startDate:  ob_parseDateTime(-2, "currentTime"),
                endDate:    ob_parseDateTime(2, "currentTime"),
                color:      "red",
                opacity:    50,
                cssClass: 't-highlight1'
            })
        ];
        bandInfos[2].decorators = [
            new Timeline.SpanHighlightDecorator({
                startDate:  ob_parseDateTime(-2, "currentTime"),
                endDate:    ob_parseDateTime(2, "currentTime"),
                color:      "red",
                opacity:    50,
                cssClass: 't-highlight1'
            }),
            new Timeline.SpanHighlightDecorator({
                startDate:  ob_parseDateTime(-2, "currentTime"),
                endDate:    ob_parseDateTime(2, "currentTime"),
                color:      "red",
                opacity:    50,
                cssClass: 't-highlight1'
            })
        ];
        bandInfos[3].decorators = [
            new Timeline.SpanHighlightDecorator({
                startDate:  ob_parseDateTime(-2, "currentTime"),
                endDate:    ob_parseDateTime(2, "currentTime"),
                color:      "red",
                opacity:    50,
                cssClass: 't-highlight1'
            }),
            new Timeline.SpanHighlightDecorator({
                startDate:  ob_parseDateTime(-2, "currentTime"),
                endDate:    ob_parseDateTime(2, "currentTime"),
                color:      "red",
                opacity:    50,
                cssClass: 't-highlight1'
            })
        ];
        bandInfos[0].syncWith = 1;
        bandInfos[1].syncWith = 2;
        bandInfos[2].syncWith = 3;
        bandInfos[0].highlight = true;

    } catch (e) {
        return null;
    }
    return bandInfos;
}
