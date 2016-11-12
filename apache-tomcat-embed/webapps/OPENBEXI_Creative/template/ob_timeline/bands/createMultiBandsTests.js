function createMultiBandsTests(currentTime, timezone, eventSource, theme) {
   theme.event.bubble.width = 350;
   theme.event.bubble.height = 300;
   theme.event.track.height = 15;
   theme.event.track.gap = 10;
   theme.event.tape.height = 8;
   
   try {
       var zones = [
           { start:    ob_parseDateTime(-3600*6, "currentTime"),
             end:      ob_parseDateTime(3600*24, "currentTime"),
             magnify:  3,
             unit:     Timeline.DateTime.MINUTE,
             multiple: 15 
           } 
       ];
       var zones2 = [
           { start:    ob_parseDateTime(-3600*24, "currentTime"),
             end:      ob_parseDateTime(3600*24, "currentTime"),
             magnify:  2,
            unit:     Timeline.DateTime.DAY,
            multiple: 1
        }
    ];
    var eventSource = new Array(7);
    eventSource[0]=new Timeline.DefaultEventSource();
    eventSource[1]=new Timeline.DefaultEventSource();
    eventSource[2]=new Timeline.DefaultEventSource();
    eventSource[3]=new Timeline.DefaultEventSource();
    eventSource[4]=new Timeline.DefaultEventSource();
    eventSource[5]=new Timeline.DefaultEventSource();
    eventSource[6]=new Timeline.DefaultEventSource();
    var bandInfos = [
           //First YEAR band
           Timeline.createHotZoneBandInfo({
               width: "8%",
               intervalUnit:   Timeline.DateTime.DAY,
               intervalPixels: 180,
               zones:          zones2,
               eventSource:    eventSource[0],
               date:           currentTime,
               timeZone:       timezone ,
               overview:       true
           }),
           Timeline.createHotZoneBandInfo({
               width: "15%",
               intervalUnit:   Timeline.DateTime.HOUR,
               intervalPixels: 120,
               zones:          zones,
               eventSource:    eventSource[1],
               date:           currentTime,
               timeZone:       timezone ,
               overview:       true
           }),
           Timeline.createHotZoneBandInfo({
               width: "15%",
               intervalUnit:   Timeline.DateTime.HOUR,
               intervalPixels: 120,
               zones:          zones,
               eventSource:    eventSource[2],
               date:           currentTime,
               timeZone:       timezone ,
               overview:       true
           }),
           Timeline.createHotZoneBandInfo({
               width: "15%",
               intervalUnit:   Timeline.DateTime.HOUR,
               intervalPixels: 120,
               zones:          zones,
               eventSource:    eventSource[3],
               date:           currentTime,
               timeZone:       timezone ,
               overview:       true
           }),
           Timeline.createHotZoneBandInfo({
               width: "15%",
               intervalUnit:   Timeline.DateTime.HOUR,
               intervalPixels: 120,
               zones:          zones,
               eventSource:    eventSource[4],
               date:           currentTime,
               timeZone:       timezone ,
               overview:       true
           }),
           Timeline.createHotZoneBandInfo({
               width: "15%",
               intervalUnit:   Timeline.DateTime.HOUR,
               intervalPixels: 120,
               zones:          zones,
               eventSource:    eventSource[5],
               date:           currentTime,
               timeZone:       timezone ,
               overview:       true
           }),
           Timeline.createHotZoneBandInfo({
               width: "15%",
               intervalUnit:   Timeline.DateTime.HOUR,
               intervalPixels: 120,
               zones:          zones,
               eventSource:    eventSource[6],
               date:           currentTime,
               timeZone:       timezone ,
               overview:       true
           }),
           Timeline.createHotZoneBandInfo({
               width: "15%",
               intervalUnit:   Timeline.DateTime.HOUR,
               intervalPixels: 120,
               zones:          zones,
               eventSource:    eventSource[7],
               date:           currentTime,
               timeZone:       timezone ,
               overview:       true
           }),
       ];
 
       bandInfos[0].decorators = [
           new Timeline.SpanHighlightDecorator({
               startDate:  ob_parseDateTime(-200 , "currentTime"),
               endDate:    ob_parseDateTime(200 , "currentTime"),
               color:      "red",
               opacity:    100,
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  ob_parseDateTime(-3600*12 , "currentTime"),
               endDate:    ob_parseDateTime(3600*12 , "currentTime"),
               color:      "#979998",
               opacity:    50,
               startLabel: "Current day",
               endLabel: ob_parseDateTime(1 , "currentTime"),
               cssClass: 't-highlight1'
           })
       ];
       bandInfos[1].decorators = [
           new Timeline.SpanHighlightDecorator({
               startDate:  ob_parseDateTime(-12 , "currentTime"),
               endDate:    ob_parseDateTime(12 , "currentTime"),
               color:      "red",
               opacity:    100,
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  "Oct 12 2012 07:13:00",
               endDate:    "Oct 12 2012 07:45:00",
               color:      "black",
               opacity:    50,
               startLabel: "906 enter shadow",
               endLabel:   "",
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  ob_parseDateTime(-12 , "currentTime"),
               endDate:    ob_parseDateTime(12 , "currentTime"),
               color:      "red",
               opacity:    100,
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  "Oct 14 2012 07:21:00",
               endDate:    "Oct 14 2012 07:36:00",
               color:      "black",
               opacity:    50,
               startLabel: "906 enter shadow",
               endLabel:   "",
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  ob_parseDateTime(-12 , "currentTime"),
               endDate:    ob_parseDateTime(12 , "currentTime"),
               color:      "red",
               opacity:    100,
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  "Oct 15 2012 07:28:00",
               endDate:    "Oct 15 2012 07:28:00",
               color:      "black",
               opacity:    50,
               startLabel: "906 enter shadow",
               endLabel:   "",
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  ob_parseDateTime(-12 , "currentTime"),
               endDate:    ob_parseDateTime(12 , "currentTime"),
               color:      "red",
               opacity:    100,
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  "Oct 10 2012 07:09:00",
               endDate:    "Oct 10 2012 07:50:00",
               color:      "black",
               opacity:    50,
               startLabel: "906 enter shadow",
               endLabel:   "",
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  ob_parseDateTime(-12 , "currentTime"),
               endDate:    ob_parseDateTime(12 , "currentTime"),
               color:      "red",
               opacity:    100,
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  "Oct 13 2012 07:16:00",
               endDate:    "Oct 13 2012 07:41:00",
               color:      "black",
               opacity:    50,
               startLabel: "906 enter shadow",
               endLabel:   "",
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  ob_parseDateTime(-12 , "currentTime"),
               endDate:    ob_parseDateTime(12 , "currentTime"),
               color:      "red",
               opacity:    100,
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  "Oct 11 2012 07:11:00",
               endDate:    "Oct 11 2012 07:48:00",
               color:      "black",
               opacity:    50,
               startLabel: "906 enter shadow",
               endLabel:   "",
               cssClass: 't-highlight1'
           }),
       ];
       bandInfos[2].decorators = [
           new Timeline.SpanHighlightDecorator({
               startDate:  ob_parseDateTime(-12 , "currentTime"),
               endDate:    ob_parseDateTime(12 , "currentTime"),
               color:      "red",
               opacity:    100,
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  "Oct 13 2012 01:09:00",
               endDate:    "Oct 13 2012 01:39:00",
               color:      "black",
               opacity:    50,
               startLabel: "905 enter shadow",
               endLabel:   "",
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  ob_parseDateTime(-12 , "currentTime"),
               endDate:    ob_parseDateTime(12 , "currentTime"),
               color:      "red",
               opacity:    100,
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  "Oct 10 2012 01:02:00",
               endDate:    "Oct 10 2012 01:47:00",
               color:      "black",
               opacity:    50,
               startLabel: "905 enter shadow",
               endLabel:   "",
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  ob_parseDateTime(-12 , "currentTime"),
               endDate:    ob_parseDateTime(12 , "currentTime"),
               color:      "red",
               opacity:    100,
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  "Oct 15 2012 01:18:00",
               endDate:    "Oct 15 2012 01:28:00",
               color:      "black",
               opacity:    50,
               startLabel: "905 enter shadow",
               endLabel:   "",
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  ob_parseDateTime(-12 , "currentTime"),
               endDate:    ob_parseDateTime(12 , "currentTime"),
               color:      "red",
               opacity:    100,
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  "Oct 14 2012 01:12:00",
               endDate:    "Oct 14 2012 01:35:00",
               color:      "black",
               opacity:    50,
               startLabel: "905 enter shadow",
               endLabel:   "",
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  ob_parseDateTime(-12 , "currentTime"),
               endDate:    ob_parseDateTime(12 , "currentTime"),
               color:      "red",
               opacity:    100,
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  "Oct 12 2012 01:06:00",
               endDate:    "Oct 12 2012 01:42:00",
               color:      "black",
               opacity:    50,
               startLabel: "905 enter shadow",
               endLabel:   "",
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  ob_parseDateTime(-12 , "currentTime"),
               endDate:    ob_parseDateTime(12 , "currentTime"),
               color:      "red",
               opacity:    100,
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  "Oct 11 2012 01:04:00",
               endDate:    "Oct 11 2012 01:44:00",
               color:      "black",
               opacity:    50,
               startLabel: "905 enter shadow",
               endLabel:   "",
               cssClass: 't-highlight1'
           }),
       ];
       bandInfos[3].decorators = [
           new Timeline.SpanHighlightDecorator({
               startDate:  ob_parseDateTime(-12 , "currentTime"),
               endDate:    ob_parseDateTime(12 , "currentTime"),
               color:      "red",
               opacity:    100,
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  "Oct 11 2012 12:38:00",
               endDate:    "Oct 11 2012 01:18:00",
               color:      "black",
               opacity:    50,
               startLabel: "901 enter shadow",
               endLabel:   "",
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  ob_parseDateTime(-12 , "currentTime"),
               endDate:    ob_parseDateTime(12 , "currentTime"),
               color:      "red",
               opacity:    100,
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  "Oct 10 2012 12:36:00",
               endDate:    "Oct 10 2012 01:21:00",
               color:      "black",
               opacity:    50,
               startLabel: "901 enter shadow",
               endLabel:   "",
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  ob_parseDateTime(-12 , "currentTime"),
               endDate:    ob_parseDateTime(12 , "currentTime"),
               color:      "red",
               opacity:    100,
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  "Oct 14 2012 12:46:00",
               endDate:    "Oct 14 2012 01:09:00",
               color:      "black",
               opacity:    50,
               startLabel: "901 enter shadow",
               endLabel:   "",
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  ob_parseDateTime(-12 , "currentTime"),
               endDate:    ob_parseDateTime(12 , "currentTime"),
               color:      "red",
               opacity:    100,
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  "Oct 15 2012 12:52:00",
               endDate:    "Oct 15 2012 01:03:00",
               color:      "black",
               opacity:    50,
               startLabel: "901 enter shadow",
               endLabel:   "",
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  ob_parseDateTime(-12 , "currentTime"),
               endDate:    ob_parseDateTime(12 , "currentTime"),
               color:      "red",
               opacity:    100,
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  "Oct 16 2012 12:57:00",
               endDate:    "Oct 16 2012 12:57:00",
               color:      "black",
               opacity:    50,
               startLabel: "901 enter shadow",
               endLabel:   "",
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  ob_parseDateTime(-12 , "currentTime"),
               endDate:    ob_parseDateTime(12 , "currentTime"),
               color:      "red",
               opacity:    100,
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  "Oct 13 2012 12:43:00",
               endDate:    "Oct 13 2012 01:13:00",
               color:      "black",
               opacity:    50,
               startLabel: "901 enter shadow",
               endLabel:   "",
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  ob_parseDateTime(-12 , "currentTime"),
               endDate:    ob_parseDateTime(12 , "currentTime"),
               color:      "red",
               opacity:    100,
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  "Oct 12 2012 12:40:00",
               endDate:    "Oct 12 2012 01:16:00",
               color:      "black",
               opacity:    50,
               startLabel: "901 enter shadow",
               endLabel:   "",
               cssClass: 't-highlight1'
           }),
       ];
       bandInfos[4].decorators = [
           new Timeline.SpanHighlightDecorator({
               startDate:  ob_parseDateTime(-12 , "currentTime"),
               endDate:    ob_parseDateTime(12 , "currentTime"),
               color:      "red",
               opacity:    100,
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  "Oct 11 2012 07:28:00",
               endDate:    "Oct 11 2012 08:04:00",
               color:      "black",
               opacity:    50,
               startLabel: "904 enter shadow",
               endLabel:   "",
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  ob_parseDateTime(-12 , "currentTime"),
               endDate:    ob_parseDateTime(12 , "currentTime"),
               color:      "red",
               opacity:    100,
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  "Oct 13 2012 07:33:00",
               endDate:    "Oct 13 2012 07:58:00",
               color:      "black",
               opacity:    50,
               startLabel: "904 enter shadow",
               endLabel:   "",
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  ob_parseDateTime(-12 , "currentTime"),
               endDate:    ob_parseDateTime(12 , "currentTime"),
               color:      "red",
               opacity:    100,
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  "Oct 10 2012 07:26:00",
               endDate:    "Oct 10 2012 08:07:00",
               color:      "black",
               opacity:    50,
               startLabel: "904 enter shadow",
               endLabel:   "",
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  ob_parseDateTime(-12 , "currentTime"),
               endDate:    ob_parseDateTime(12 , "currentTime"),
               color:      "red",
               opacity:    100,
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  "Oct 15 2012 07:45:00",
               endDate:    "Oct 15 2012 07:45:00",
               color:      "black",
               opacity:    50,
               startLabel: "904 enter shadow",
               endLabel:   "",
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  ob_parseDateTime(-12 , "currentTime"),
               endDate:    ob_parseDateTime(12 , "currentTime"),
               color:      "red",
               opacity:    100,
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  "Oct 14 2012 07:38:00",
               endDate:    "Oct 14 2012 07:53:00",
               color:      "black",
               opacity:    50,
               startLabel: "904 enter shadow",
               endLabel:   "",
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  ob_parseDateTime(-12 , "currentTime"),
               endDate:    ob_parseDateTime(12 , "currentTime"),
               color:      "red",
               opacity:    100,
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  "Oct 12 2012 07:30:00",
               endDate:    "Oct 12 2012 08:01:00",
               color:      "black",
               opacity:    50,
               startLabel: "904 enter shadow",
               endLabel:   "",
               cssClass: 't-highlight1'
           }),
       ];
       bandInfos[5].decorators = [
           new Timeline.SpanHighlightDecorator({
               startDate:  ob_parseDateTime(-12 , "currentTime"),
               endDate:    ob_parseDateTime(12 , "currentTime"),
               color:      "red",
               opacity:    100,
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  "Oct 12 2012 07:22:00",
               endDate:    "Oct 12 2012 07:54:00",
               color:      "black",
               opacity:    50,
               startLabel: "902 enter shadow",
               endLabel:   "",
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  ob_parseDateTime(-12 , "currentTime"),
               endDate:    ob_parseDateTime(12 , "currentTime"),
               color:      "red",
               opacity:    100,
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  "Oct 15 2012 07:37:00",
               endDate:    "Oct 15 2012 07:37:00",
               color:      "black",
               opacity:    50,
               startLabel: "902 enter shadow",
               endLabel:   "",
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  ob_parseDateTime(-12 , "currentTime"),
               endDate:    ob_parseDateTime(12 , "currentTime"),
               color:      "red",
               opacity:    100,
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  "Oct 13 2012 07:25:00",
               endDate:    "Oct 13 2012 07:50:00",
               color:      "black",
               opacity:    50,
               startLabel: "902 enter shadow",
               endLabel:   "",
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  ob_parseDateTime(-12 , "currentTime"),
               endDate:    ob_parseDateTime(12 , "currentTime"),
               color:      "red",
               opacity:    100,
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  "Oct 14 2012 07:30:00",
               endDate:    "Oct 14 2012 07:45:00",
               color:      "black",
               opacity:    50,
               startLabel: "902 enter shadow",
               endLabel:   "",
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  ob_parseDateTime(-12 , "currentTime"),
               endDate:    ob_parseDateTime(12 , "currentTime"),
               color:      "red",
               opacity:    100,
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  "Oct 11 2012 07:19:00",
               endDate:    "Oct 11 2012 07:57:00",
               color:      "black",
               opacity:    50,
               startLabel: "902 enter shadow",
               endLabel:   "",
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  ob_parseDateTime(-12 , "currentTime"),
               endDate:    ob_parseDateTime(12 , "currentTime"),
               color:      "red",
               opacity:    100,
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  "Oct 10 2012 07:18:00",
               endDate:    "Oct 10 2012 07:59:00",
               color:      "black",
               opacity:    50,
               startLabel: "902 enter shadow",
               endLabel:   "",
               cssClass: 't-highlight1'
           }),
       ];
       bandInfos[6].decorators = [
           new Timeline.SpanHighlightDecorator({
               startDate:  ob_parseDateTime(-12 , "currentTime"),
               endDate:    ob_parseDateTime(12 , "currentTime"),
               color:      "red",
               opacity:    100,
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  "Oct 16 2012 01:35:00",
               endDate:    "Oct 16 2012 01:35:00",
               color:      "black",
               opacity:    50,
               startLabel: "907 enter shadow",
               endLabel:   "",
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  ob_parseDateTime(-12 , "currentTime"),
               endDate:    ob_parseDateTime(12 , "currentTime"),
               color:      "red",
               opacity:    100,
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  "Oct 12 2012 01:18:00",
               endDate:    "Oct 12 2012 01:54:00",
               color:      "black",
               opacity:    50,
               startLabel: "907 enter shadow",
               endLabel:   "",
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  ob_parseDateTime(-12 , "currentTime"),
               endDate:    ob_parseDateTime(12 , "currentTime"),
               color:      "red",
               opacity:    100,
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  "Oct 13 2012 01:21:00",
               endDate:    "Oct 13 2012 01:51:00",
               color:      "black",
               opacity:    50,
               startLabel: "907 enter shadow",
               endLabel:   "",
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  ob_parseDateTime(-12 , "currentTime"),
               endDate:    ob_parseDateTime(12 , "currentTime"),
               color:      "red",
               opacity:    100,
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  "Oct 14 2012 01:24:00",
               endDate:    "Oct 14 2012 01:47:00",
               color:      "black",
               opacity:    50,
               startLabel: "907 enter shadow",
               endLabel:   "",
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  ob_parseDateTime(-12 , "currentTime"),
               endDate:    ob_parseDateTime(12 , "currentTime"),
               color:      "red",
               opacity:    100,
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  "Oct 10 2012 01:14:00",
               endDate:    "Oct 10 2012 01:59:00",
               color:      "black",
               opacity:    50,
               startLabel: "907 enter shadow",
               endLabel:   "",
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  ob_parseDateTime(-12 , "currentTime"),
               endDate:    ob_parseDateTime(12 , "currentTime"),
               color:      "red",
               opacity:    100,
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  "Oct 11 2012 01:16:00",
               endDate:    "Oct 11 2012 01:56:00",
               color:      "black",
               opacity:    50,
               startLabel: "907 enter shadow",
               endLabel:   "",
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  ob_parseDateTime(-12 , "currentTime"),
               endDate:    ob_parseDateTime(12 , "currentTime"),
               color:      "red",
               opacity:    100,
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  "Oct 15 2012 01:30:00",
               endDate:    "Oct 15 2012 01:41:00",
               color:      "black",
               opacity:    50,
               startLabel: "907 enter shadow",
               endLabel:   "",
               cssClass: 't-highlight1'
           }),
       ];
       bandInfos[7].decorators = [
           new Timeline.SpanHighlightDecorator({
               startDate:  ob_parseDateTime(-12 , "currentTime"),
               endDate:    ob_parseDateTime(12 , "currentTime"),
               color:      "red",
               opacity:    100,
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  "Oct 13 2012 01:49:00",
               endDate:    "Oct 13 2012 02:19:00",
               color:      "black",
               opacity:    50,
               startLabel: "903 enter shadow",
               endLabel:   "",
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  ob_parseDateTime(-12 , "currentTime"),
               endDate:    ob_parseDateTime(12 , "currentTime"),
               color:      "red",
               opacity:    100,
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  "Oct 12 2012 01:46:00",
               endDate:    "Oct 12 2012 02:22:00",
               color:      "black",
               opacity:    50,
               startLabel: "903 enter shadow",
               endLabel:   "",
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  ob_parseDateTime(-12 , "currentTime"),
               endDate:    ob_parseDateTime(12 , "currentTime"),
               color:      "red",
               opacity:    100,
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  "Oct 14 2012 01:52:00",
               endDate:    "Oct 14 2012 02:15:00",
               color:      "black",
               opacity:    50,
               startLabel: "903 enter shadow",
               endLabel:   "",
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  ob_parseDateTime(-12 , "currentTime"),
               endDate:    ob_parseDateTime(12 , "currentTime"),
               color:      "red",
               opacity:    100,
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  "Oct 15 2012 01:58:00",
               endDate:    "Oct 15 2012 02:08:00",
               color:      "black",
               opacity:    50,
               startLabel: "903 enter shadow",
               endLabel:   "",
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  ob_parseDateTime(-12 , "currentTime"),
               endDate:    ob_parseDateTime(12 , "currentTime"),
               color:      "red",
               opacity:    100,
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  "Oct 10 2012 01:42:00",
               endDate:    "Oct 10 2012 02:27:00",
               color:      "black",
               opacity:    50,
               startLabel: "903 enter shadow",
               endLabel:   "",
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  ob_parseDateTime(-12 , "currentTime"),
               endDate:    ob_parseDateTime(12 , "currentTime"),
               color:      "red",
               opacity:    100,
               cssClass: 't-highlight1'
           }),
           new Timeline.SpanHighlightDecorator({
               startDate:  "Oct 11 2012 01:44:00",
               endDate:    "Oct 11 2012 02:24:00",
               color:      "black",
               opacity:    50,
               startLabel: "903 enter shadow",
               endLabel:   "",
               cssClass: 't-highlight1'
           }),
       ];
       bandInfos[1].syncWith = 0;
       bandInfos[2].syncWith = 1;
       bandInfos[3].syncWith = 2;
       bandInfos[4].syncWith = 3;
       bandInfos[5].syncWith = 4;
       bandInfos[6].syncWith = 5;
       bandInfos[7].syncWith = 6;

       bandInfos[0].highlight = true;
       try {
           setTimeout(function() {
             $('timeline-band-1').style.color = "rgb(153, 99, 0)";
             $('timeline-band-1').style.backgroundImage = "url(background/fading_background_12.png)";
             $('timeline-band-1').style.boxShadow = "rgba(255, 254, 255, 0.592157) 0px 0.3em 0.3em inset, rgba(0, 0, 0, 0.14902) 0px -0.1em 0.3em inset, rgb(204, 133, 0) 0px 0.1em 3px, rgb(153, 99, 0) 0px 0.3em 1px, rgba(0, 0, 0, 0.2) 0px 0.5em 5px";
             $('timeline-band-2').style.color = "rgb(153, 99, 0)";
             $('timeline-band-2').style.backgroundImage = "url(background/fading_background_12.png)";
             $('timeline-band-2').style.boxShadow = "rgba(255, 254, 255, 0.592157) 0px 0.3em 0.3em inset, rgba(0, 0, 0, 0.14902) 0px -0.1em 0.3em inset, rgb(204, 133, 0) 0px 0.1em 3px, rgb(153, 99, 0) 0px 0.3em 1px, rgba(0, 0, 0, 0.2) 0px 0.5em 5px";
             $('timeline-band-3').style.color = "rgb(153, 99, 0)";
             $('timeline-band-3').style.backgroundImage = "url(background/fading_background_12.png)";
             $('timeline-band-3').style.boxShadow = "rgba(255, 254, 255, 0.592157) 0px 0.3em 0.3em inset, rgba(0, 0, 0, 0.14902) 0px -0.1em 0.3em inset, rgb(204, 133, 0) 0px 0.1em 3px, rgb(153, 99, 0) 0px 0.3em 1px, rgba(0, 0, 0, 0.2) 0px 0.5em 5px";
             $('timeline-band-4').style.color = "rgb(153, 99, 0)";
             $('timeline-band-4').style.backgroundImage = "url(background/fading_background_12.png)";
             $('timeline-band-4').style.boxShadow = "rgba(255, 254, 255, 0.592157) 0px 0.3em 0.3em inset, rgba(0, 0, 0, 0.14902) 0px -0.1em 0.3em inset, rgb(204, 133, 0) 0px 0.1em 3px, rgb(153, 99, 0) 0px 0.3em 1px, rgba(0, 0, 0, 0.2) 0px 0.5em 5px";
             $('timeline-band-5').style.color = "rgb(153, 99, 0)";
             $('timeline-band-5').style.backgroundImage = "url(background/fading_background_12.png)";
             $('timeline-band-5').style.boxShadow = "rgba(255, 254, 255, 0.592157) 0px 0.3em 0.3em inset, rgba(0, 0, 0, 0.14902) 0px -0.1em 0.3em inset, rgb(204, 133, 0) 0px 0.1em 3px, rgb(153, 99, 0) 0px 0.3em 1px, rgba(0, 0, 0, 0.2) 0px 0.5em 5px";
             $('timeline-band-6').style.color = "rgb(153, 99, 0)";
             $('timeline-band-6').style.backgroundImage = "url(background/fading_background_12.png)";
             $('timeline-band-6').style.boxShadow = "rgba(255, 254, 255, 0.592157) 0px 0.3em 0.3em inset, rgba(0, 0, 0, 0.14902) 0px -0.1em 0.3em inset, rgb(204, 133, 0) 0px 0.1em 3px, rgb(153, 99, 0) 0px 0.3em 1px, rgba(0, 0, 0, 0.2) 0px 0.5em 5px";
             $('timeline-band-7').style.color = "rgb(153, 99, 0)";
             $('timeline-band-7').style.backgroundImage = "url(background/fading_background_12.png)";
             $('timeline-band-7').style.boxShadow = "rgba(255, 254, 255, 0.592157) 0px 0.3em 0.3em inset, rgba(0, 0, 0, 0.14902) 0px -0.1em 0.3em inset, rgb(204, 133, 0) 0px 0.1em 3px, rgb(153, 99, 0) 0px 0.3em 1px, rgba(0, 0, 0, 0.2) 0px 0.5em 5px";
             $('timeline-band-0').style.color = "rgb(153, 99, 0)";
             $('timeline-band-0').style.backgroundImage = "url(background/fading_background_14.png)";
             $('timeline-band-0').style.boxShadow = "rgba(255, 254, 255, 0.592157) 0px 0.3em 0.3em inset, rgba(0, 0, 0, 0.14902) 0px -0.1em 0.3em inset, rgb(204, 133, 0) 0px 0.1em 3px, rgb(153, 99, 0) 0px 0.3em 1px, rgba(0, 0, 0, 0.2) 0px 0.5em 5px";

       }, 50);
       } catch (e) {
       }
   } catch (e) {
       return null;
   }

   return bandInfos;
}
