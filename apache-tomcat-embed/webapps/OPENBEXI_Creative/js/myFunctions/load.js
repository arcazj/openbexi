google.load("feeds", "1");
google.setOnLoadCallback(load);
function load( widget_id ) {
//Body: Javascript code
    var samples = "http://dlc0421.googlepages.com/gfss.rss";
    var options = {
        displayTime: 2000,
        transistionTime: 600,
        linkTarget : google.feeds.LINK_TARGET_BLANK
    };
    new GFslideShow(samples, widget_id, options);
}
