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


Timeline.OpenBEXITheme = new Object();
Timeline.OpenBEXITheme.implementations = [];
Timeline.OpenBEXITheme.create = function(locale) {
    if (locale == null) {
        locale = Timeline.getDefaultLocale();
    }
    var f = Timeline.OpenBEXITheme.implementations[locale];
    if (f == null) {
        f = Timeline.OpenBEXITheme._Impl;
    }
    return new f();
};
Timeline.OpenBEXITheme._Impl = function() {
    this.firstDayOfWeek = 0;
    this.autoWidth = false;
    this.autoWidthAnimationTime = 500;
    this.timeline_start = null;
    this.timeline_stop = null;
    this.ether = {backgroundColors:["green","red","blue","yellow"],highlightOpacity:50,interval:{line:{show:true,opacity:25},weekend:{opacity:30},marker:{hAlign:"Bottom",vAlign:"Right"}}};
    this.event = {track:{height:10,gap:2,offset:2,autoWidthMargin:1.5},overviewTrack:{offset:20,tickHeight:6,height:2,gap:1,autoWidthMargin:5},tape:{height:4},instant:{icon:Timeline.urlPrefix + "images/dull-red-circle.png",iconWidth:10,iconHeight:10,impreciseOpacity:20,impreciseIconMargin:3},duration:{impreciseOpacity:20},label:{backgroundOpacity:50,offsetFromLine:3},highlightColors:["#FFFF00","#FFC000","#FF0000","white"],highlightLabelBackground:false,bubble:{width:250,maxHeight:0,titleStyler:function(elmt) {
        elmt.className = "timeline-event-bubble-title";
    },bodyStyler:function(elmt) {
        elmt.className = "timeline-event-bubble-body";
    },imageStyler:function(elmt) {
        elmt.className = "timeline-event-bubble-image";
    },wikiStyler:function(elmt) {
        elmt.className = "timeline-event-bubble-wiki";
    },timeStyler:function(elmt) {
        elmt.className = "timeline-event-bubble-time";
    }}};
    this.mouseWheel = "scroll";
};

function createYearMonthBands2(currentTime, timezone, eventSource, theme) {
    //Theme
    //theme.event.label.width = 320;
    theme.event.bubble.width = 350;
    theme.event.bubble.height = 300;
    theme.event.track.height = 15;
    theme.event.track.gap = 10;
    theme.event.tape.height = 8;

    //theme.event.overviewTrack.offset = 20;
    //theme.event.overviewTrack.tickHeight = 6;
    //theme.event.overviewTrack.height = 2;
    //theme.event.overviewTrack.gap = 1;

    //theme.event.instant.iconWidth = 40;
    //theme.event.instant.iconHeight = 40;

    //theme.event.label.width = 250;
    //theme.ether.backgroundColors = [ "#D8CAA8","#284907","#363942" ];

    //Theme2
    var OpenBEXI_theme = Timeline.OpenBEXITheme.create();
    OpenBEXI_theme.event.bubble.width = 450;
    OpenBEXI_theme.event.bubble.height = 400;
    OpenBEXI_theme.event.track.height = 15;
    OpenBEXI_theme.event.track.gap = 10;
    OpenBEXI_theme.event.tape.height = 8;

    //Does not work, not overwrite timeline-bundle.css
    OpenBEXI_theme.ether.backgroundColors[0] = "yellow";
    OpenBEXI_theme.ether.backgroundColors[1] = "red";
    OpenBEXI_theme.ether.backgroundColors[2] = "blue";
    OpenBEXI_theme.ether.backgroundColors[3] = "orange";
    OpenBEXI_theme.ether.backgroundColors[4] = "#F8D888";
    OpenBEXI_theme.ether.backgroundColors[5] = "green";
    OpenBEXI_theme.ether.backgroundColors[6] = "green";
    OpenBEXI_theme.ether.backgroundColors[7] = "green";
    OpenBEXI_theme.ether.backgroundColors[8] = "green";


    // Update bubble content
    (function() {
        var default_fillInfo = Timeline.DefaultEventSource.Event.prototype.fillInfoBubble;
        Timeline.DefaultEventSource.Event.prototype.fillInfoBubble = function (elmt, OpenBEXI_theme, labeller) {
            elmt.innerHTML = '<input type="button" onclick="Msg1()" value="Show Message 1" /><input type="button" onclick="Msg1()" value="Show Message 2" /><input type="button" onclick="Msg1()" value="Show Message 3" />';
        };
    })();

    try {
        var zones = [
            {
                start:    ob_parseDateTime(-10 * 3600, "currentTime"),
                end:      ob_parseDateTime(10 * 3600, "currentTime"),
                magnify:  3,
                unit:     Timeline.DateTime.MONTH,
                multiple: 2
            }
        ];
        var zones2 = [
            {
                start:    ob_parseDateTime(-3 * 3600, "currentTime"),
                end:      ob_parseDateTime(3 * 3600, "currentTime"),
                magnify:  8,
                unit:     Timeline.DateTime.YEAR,
                multiple: 1
            }
        ];
        var bandInfos = [
            Timeline.createHotZoneBandInfo({
                width:          "30%",
                intervalUnit:   Timeline.DateTime.MONTH,
                intervalPixels: 150,

                zones:          zones,
                eventSource:    eventSource,
                date:           currentTime,
                timeZone:       timezone ,
                overview:       true,
                theme:          OpenBEXI_theme
            }),
            Timeline.createHotZoneBandInfo({
                width:          "10%",
                intervalUnit:   Timeline.DateTime.MONTH,
                intervalPixels: 50,

                zones:          zones,
                eventSource:    eventSource,
                date:           currentTime,
                timeZone:       timezone ,
                theme:          OpenBEXI_theme
            }),
            Timeline.createBandInfo({
                width:          "20%",
                intervalUnit:   Timeline.DateTime.MONTH,
                intervalPixels: 40,
                zones:          zones,
                eventSource:    eventSource,
                date:           currentTime,
                timeZone:       timezone ,
                showEventText:  false,
                trackHeight: 10.5,
                trackGap: 5.2,
                theme:          OpenBEXI_theme
            }),
            Timeline.createHotZoneBandInfo({
                width:          "10%",
                intervalUnit:   Timeline.DateTime.MONTH,
                intervalPixels: 40,
                zones:          zones,
                eventSource:    eventSource,
                date:           currentTime,
                timeZone:       timezone ,
                theme:          OpenBEXI_theme
            }),
            Timeline.createHotZoneBandInfo({
                width:          "10%",
                intervalUnit:   Timeline.DateTime.MONTH,
                intervalPixels: 150,

                zones:          zones,
                eventSource:    eventSource,
                date:           currentTime,
                timeZone:       timezone ,
                theme:          OpenBEXI_theme
            }),
            Timeline.createHotZoneBandInfo({
                width:          "5%",
                intervalUnit:   Timeline.DateTime.MONTH,
                intervalPixels: 150,

                zones:          zones,
                eventSource:    eventSource,
                date:           currentTime,
                timeZone:       timezone ,
                theme:          theme
            }),
            Timeline.createHotZoneBandInfo({
                width:          "5%",
                intervalUnit:   Timeline.DateTime.MONTH,
                intervalPixels: 150,

                zones:          zones,
                eventSource:    eventSource,
                date:           currentTime,
                timeZone:       timezone ,
                theme:          theme
            }),
            Timeline.createHotZoneBandInfo({
                width:          "10%",
                intervalUnit:   Timeline.DateTime.MONTH,
                intervalPixels: 150,

                zones:          zones,
                eventSource:    eventSource,
                date:           currentTime,
                timeZone:       timezone ,
                theme:          OpenBEXI_theme
            }),
            Timeline.createHotZoneBandInfo({
                width:          "10%",
                intervalUnit:   Timeline.DateTime.MONTH,
                intervalPixels: 150,

                zones:          zones,
                eventSource:    eventSource,
                date:           currentTime,
                timeZone:       timezone ,
                theme:          theme
            }),
            Timeline.createBandInfo({
                width:          "10%",
                intervalUnit:   Timeline.DateTime.YEAR,
                intervalPixels: 100,
                zones:          zones2,
                eventSource:    eventSource,
                date:           currentTime,
                timeZone:       timezone,
                overview:       true,
                theme:          OpenBEXI_theme
            })
        ];

        bandInfos[0].decorators = [
            new Timeline.SpanHighlightDecorator({
                startDate:  ob_parseDateTime(-40 * 360, "currentTime"),
                endDate:    ob_parseDateTime(40, "currentTime"),
                color:      "green",
                opacity:    50,
                startLabel: "",
                endLabel:   "band 0",
                theme:      OpenBEXI_theme,
                cssClass: 't-highlight1'
            }),
            new Timeline.SpanHighlightDecorator({
                startDate:  ob_parseDateTime(-12 * 360 * 3600, "currentTime"),
                endDate:    ob_parseDateTime(0, "currentTime"),
                color:      "yellow",
                opacity:    50,
                startLabel: "deco1",
                //endLabel:   "",
                theme:      OpenBEXI_theme,
                cssClass: 't-highlight1'
            })  ,
            new Timeline.SpanHighlightDecorator({
                startDate:  ob_parseDateTime(3600 * 12, "currentTime"),
                endDate:    ob_parseDateTime(12 * 360 * 3600, "currentTime"),
                color:      "green",
                opacity:    50,
                startLabel: "deco2",
                //endLabel:   "",
                theme:      OpenBEXI_theme,
                cssClass: 't-highlight1'
            })
        ];
        bandInfos[1].decorators = [
            new Timeline.SpanHighlightDecorator({
                startDate:  ob_parseDateTime(-40 * 360 * 3600, "currentTime"),
                endDate:    ob_parseDateTime(40, "currentTime"),
                color:      "red",
                opacity:    50,
                startLabel: "band 1 (start)",
                endLabel:   "band 1 (end)",
                // theme:      theme,
                cssClass: 't-highlight1'
            })
        ];
        bandInfos[2].decorators = [
            new Timeline.SpanHighlightDecorator({
                startDate:  ob_parseDateTime(-40, "currentTime"),
                endDate:    ob_parseDateTime(40, "currentTime"),
                color:      "red",
                opacity:    50,
                startLabel: "band 2",
                //endLabel:   "",
                theme:      theme,
                cssClass: 't-highlight1'
            })
        ];
        bandInfos[3].decorators = [
            new Timeline.SpanHighlightDecorator({
                startDate:  ob_parseDateTime(-40, "currentTime"),
                endDate:    ob_parseDateTime(40, "currentTime"),
                color:      "red",
                opacity:    50,
                startLabel: "band 3",
                endLabel:   "",
                theme:      theme,
                cssClass: 't-highlight1'
            })
        ];
        bandInfos[4].decorators = [
            new Timeline.SpanHighlightDecorator({
                startDate:  ob_parseDateTime(-3600, "currentTime"),
                endDate:    ob_parseDateTime(3600, "currentTime"),
                color:      "red",
                opacity:    50,
                startLabel: "band 4",
                endLabel:   "",
                theme:      theme,
                cssClass: 't-highlight1'
            })
        ];
        bandInfos[5].decorators = [
            new Timeline.SpanHighlightDecorator({
                startDate:  ob_parseDateTime(-3600, "currentTime"),
                endDate:    ob_parseDateTime(3600, "currentTime"),
                color:      "blue",
                opacity:    50,
                startLabel: "band 5",
                endLabel:   "",
                theme:      theme,
                cssClass: 't-highlight1'
            })
        ];
        bandInfos[6].decorators = [
            new Timeline.SpanHighlightDecorator({
                startDate:  ob_parseDateTime(-40, "currentTime"),
                endDate:    ob_parseDateTime(40, "currentTime"),
                color:      "red",
                opacity:    50,
                endLabel:   "band 6",
                // theme:      theme,
                cssClass: 't-highlight1'
            })
        ];
        bandInfos[7].decorators = [
            new Timeline.SpanHighlightDecorator({
                startDate:  ob_parseDateTime(-3600, "currentTime"),
                endDate:    ob_parseDateTime(3600, "currentTime"),
                color:      "blue",
                opacity:    50,
                startLabel: "band 7",
                endLabel:   "",
                theme:      theme,
                cssClass: 't-highlight1'
            })
        ];
        bandInfos[8].decorators = [
            new Timeline.SpanHighlightDecorator({
                startDate:  ob_parseDateTime(-3600, "currentTime"),
                endDate:    ob_parseDateTime(3600, "currentTime"),
                color:      "blue",
                opacity:    50,
                startLabel: "band 8",
                endLabel:   "",
                theme:      OpenBEXI_theme,
                cssClass: 't-highlight1'
            })
        ];
        bandInfos[9].decorators = [
            new Timeline.SpanHighlightDecorator({
                startDate:  ob_parseDateTime(-40, "currentTime"),
                endDate:    ob_parseDateTime(40, "currentTime"),
                color:      "red",
                opacity:    50,
                startLabel: "Current year",
                endLabel:   "",
                // theme:      theme,
                cssClass: 't-highlight1'
            })   ,
            new Timeline.SpanHighlightDecorator({
                startDate:  ob_parseDateTime(-12 * 360 * 3600, "currentTime"),
                endDate:    ob_parseDateTime(12 * 360 * 3600, "currentTime"),
                color:      "green",
                opacity:    50,
                //startLabel: "CurrentYear",
                //endLabel:   "",
                theme:      theme,
                cssClass: 't-highlight1'
            })
        ];

        bandInfos[1].syncWith = 0;
        bandInfos[2].syncWith = 1;
        bandInfos[3].syncWith = 2;
        bandInfos[4].syncWith = 3;
        bandInfos[5].syncWith = 4;
        bandInfos[6].syncWith = 5;
        bandInfos[7].syncWith = 6;
        bandInfos[8].syncWith = 7;
        bandInfos[9].syncWith = 8;
        bandInfos[0].highlight = true;
    } catch (e) {
        return null;
    }
    try {
        setTimeout(function() {
            $('timeline-band-6').style.background = "-webkit-linear-gradient(top, #513D53 10%, #EFF588 30%)";
            $('timeline-band-6').style.background = "-moz-linear-gradient(top, #513D53 10%, #EFF588 30%";
            $('timeline-band-6').style.background = "-ms-linear-gradient(top, #513D53 10%, #EFF588 30%";
            $('timeline-band-6').style.background = "-o-linear-gradient(top, #513D53 10%, #EFF588 30%";
            $('timeline-band-6').style.background = "background-image:linear-gradient(top, #513D53 10%, #EFF588 30%)";
            $('timeline-band-6').style.filter = "progid:DXImageTransform.Microsoft.gradient( startColorstr='#cedce7', endColorstr='#596a72',GradientType=0 )";
        }, 50);
    } catch (e) {
    }
    return bandInfos;
}
