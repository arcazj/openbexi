<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>

    <title>OPEN OPENBEXI HTML Builder</title>
    <META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=ISO-8859-1">
    <link rel="stylesheet" href="css/openbexi_css3.css" type="text/css">
    <link rel="stylesheet" href="css/openbexi.css" type="text/css">
    <link rel="stylesheet" href="css/timeline.css" type="text/css">

    <script type="text/javascript">
        var OPENBEXI_PUBLIC_CONTEXT_XML = '<openbexiCreative><classe name="ob_ssh"><object name="connection_0"><attribute name="host" host="Create a new website"/><attribute name="user" user=""/><attribute name="passwd" passwd=""/><attribute name="PublicKey" PublicKey="ssh-dss"/><attribute name="SocketTimeout" SocketTimeout="30000"/><attribute name="connected" connected="false"/></object><object name="connection_1"><attribute name="host" host="host1"/><attribute name="user" user=""/><attribute name="passwd" passwd=""/><attribute name="PublicKey" PublicKey="ssh-dss"/><attribute name="SocketTimeout" SocketTimeout="30000"/><attribute name="connected" connected="false"/></object><object name="connection"><attribute name="count" count="2"/></object></classe><classe name="ob_server"><object name="connection_0"><attribute port="8282" name="port"/><attribute name="url" url="new OPENBEXI server"/><attribute name="user" user=""/><attribute name="password" password=""/><attribute name="path" path=""/><attribute name="protocole" protocole="http"/><attribute name="connected" connected="false"/></object><object name="connection_1"><attribute port="8282" name="port"/><attribute name="url" url="http://localhost:8282/openbexi.do"/><attribute name="user" user=""/><attribute name="password" password=""/><attribute name="path" path=""/><attribute name="protocole" protocole="http"/><attribute name="connected" connected="true"/></object><object name="connection"><attribute name="count" count="2"/></object></classe><classe name="bexicontext"><object name="browser"><attribute name=""/></object><object name="os"><attribute name=""/></object><object name="connection"><attribute name="url" url="http://localhost:8282/openbexi.do"/><attribute name="port" port="80"/><attribute name="asynchron" asynchron="true"/><attribute name="synchron" synchron="false"/><attribute name="post" post="true"/><attribute name="get" get="false"/><attribute name="user" user="root"/><attribute name="passwd" passwd=""/></object><object name="language"><attribute name="en"/></object></classe><classe name="ob_database"><object name="databaseAdmin"><attribute driver="org.hsqldb.jdbcDriver" name="driver"/><attribute name="url" url="jdbc:hsqldb:file:hsqldb/data/bexi_admin"/><attribute name="user" user="sa"/><attribute name="password" password=""/><attribute name="connected" connected="false"/></object><object name="database_0"><attribute driver="org.hsqldb.jdbcDriver" name="driver"/><attribute name="url" url="new database"/><attribute name="user" user="root"/><attribute name="password" password=""/><attribute name="connected" connected="false"/></object><object name="database_1"><attribute driver="org.hsqldb.jdbcDriver" name="driver"/><attribute name="url" url="jdbc:hsqldb:file:hsqldb/data/bexi_en"/><attribute name="user" user="root"/><attribute name="password" password=""/><attribute name="connected" connected="false"/></object><object name="database_2"><attribute driver="org.hsqldb.jdbcDriver" name="driver"/><attribute name="url" url="jdbc:hsqldb:file:hsqldb/data/bexi_fr"/><attribute name="user" user="root"/><attribute name="password" password=""/><attribute name="connected" connected="false"/></object><object name="database"><attribute name="count" count="4"/></object><object name="connection"><attribute name="connected" connected="false"/></object><object name="databaseCurrent"><attribute name="password" password=""/><attribute name="connected" connected="false"/><attribute name="myName" myName="myName3"/><attribute name="url" url="database3"/><attribute name="user" user=""/><attribute name="passwd" passwd=""/><attribute driver="" name="driver"/></object><object name="database_3"><attribute name="myName" myName="test"/><attribute name="url" url="jdbc:hsqldb:file:hsqldb/data/test"/><attribute name="user" user="sa"/><attribute name="passwd" passwd=""/><attribute name="driver" driver="org.hsqldb.jdbcDriver"/></object></classe></openbexiCreative>';
        var OPENBEXI_PRIVATE_CONTEXT_XML = null;
        var OPENBEXI_PAGES_DATA_XML = '<openbexiCreative><classe name="page"></classe><object name="init"><attribute name="init" init="init"/></object></openbexiCreative>';
    </script>

    <style type="text/css">
        @import "dojox/grid/resources/Grid.css";
        @import "gridx/resources/claro/Gridx.css";
        @import "gridx/resources/claro/Gridx_rtl.css";
    </style>
    <link rel="stylesheet" type="text/css" href="dijit/themes/claro/claro.css">
    <link rel="stylesheet" href="css/openbexi_icon.css" type="text/css">
    <link rel="stylesheet" href="javascript/jsPlumb/jsPlumb.css">
    <link rel="stylesheet" href="javascript/jquery/css/jquery-impromptu.css">


    <script type="text/javascript">
        var djConfig = {isDebug: false, parseOnLoad: true, extraLocale: ['en-us']};
        Timeline_ajax_url = "javascript/timeline/timeline_ajax/simile-ajax-api.js";
        Timeline_urlPrefix = "javascript/timeline/timeline_js/";
        Timeline_parameters = "bundle=true";
    </script>

    <script type="text/javascript" src="javascript/jquery/jquery.min.js"></script>
    <script type="text/javascript" src="javascript/jquery/jquery-ui.min.js"></script>
    <script type="text/javascript" src="javascript/jquery/jQueryRotate.js"></script>
    <script type="text/javascript" src="javascript/jquery/jquery.ui.touch-punch.min.js"></script>
    <script type="text/javascript" src="javascript/jquery/jquery-impromptu.js"></script>
    <script type="text/javascript"> var $ob_jquery = jQuery.noConflict();</script>
    <script type="text/javascript" src="javascript/jsPlumb/jquery.jsPlumb-1.5.2-min.js"></script>
    <script type="text/javascript" src="javascript/fabrics.js"></script>

    <link rel="stylesheet" href="javascript/CodeMirror/lib/codemirror.css">
    <link rel="stylesheet" href="javascript/CodeMirror/theme/night.css">

    <script type="text/javascript" src="javascript/CodeMirror/lib/codemirror.js"></script>
    <script type="text/javascript" src="javascript/CodeMirror/mode/javascript/javascript.js"></script>
    <script type="text/javascript" src="javascript/CodeMirror/mode/scheme/scheme.js"></script>
    <script type="text/javascript" src="javascript/CodeMirror/mode/xml/xml.js"></script>
    <script type="text/javascript" src="javascript/CodeMirror/mode/css/css.js"></script>
    <script type="text/javascript" src="javascript/CodeMirror/mode/htmlmixed/htmlmixed.js"></script>
    <script type="text/javascript" src="javascript/CodeMirror/util/formatting.js"></script>
    <script type="text/javascript" src="javascript/openbexi_Web_pages.js"></script>
    <script type="text/javascript" src="javascript/openbexi_compatibility.js"></script>
    <script type="text/javascript" src="javascript/openbexi_xml.js"></script>
    <script type="text/javascript" src="javascript/openbexi_drag_and_drop_img.js"></script>
    <script type="text/javascript" src="javascript/openbexi_css.js"></script>
    <script type="text/javascript" src="javascript/openbexi_slider.js"></script>
    <script type="text/javascript" src="javascript/openbexi_lang.js"></script>
    <script type="text/javascript" src="javascript/openbexi_system.js"></script>
    <script type="text/javascript" src="javascript/openbexi_body.js"></script>
    <script type="text/javascript" src="javascript/openbexi_popup_menu.js"></script>
    <script type="text/javascript" src="javascript/openbexi_page.js"></script>
    <script type="text/javascript" src="javascript/openbexi_pager.js"></script>
    <script type="text/javascript" src="javascript/openbexi_form.js"></script>
    <script type="text/javascript" src="javascript/openbexi_div.js"></script>
    <script type="text/javascript" src="javascript/openbexi_chartFlow.js"></script>
    <script type="text/javascript" src="javascript/openbexi_combobox.js"></script>
    <script type="text/javascript" src="javascript/openbexi_button.js"></script>
    <script type="text/javascript" src="javascript/openbexi_dojo_editor.js"></script>
    <script type="text/javascript" src="javascript/openbexi_line.js"></script>
    <script type="text/javascript" src="javascript/openbexi_link.js"></script>
    <script type="text/javascript" src="javascript/openbexi_img.js"></script>
    <script type="text/javascript" src="javascript/openbexi_chart.js"></script>
    <script type="text/javascript" src="javascript/dygraphs/dygraph-combined.js"></script>
    <script type="text/javascript" src="javascript/openbexi_dygraphs.js"></script>
    <script type="text/javascript" src="javascript/openbexi_list.js"></script>
    <script type="text/javascript" src="javascript/openbexi_tree.js"></script>
    <script type="text/javascript" src="javascript/openbexi_combobox.js"></script>
    <script type="text/javascript" src="javascript/openbexi_clock.js"></script>
    <script type="text/javascript" src="javascript/openbexi_calendar.js"></script>
    <script type="text/javascript" src="javascript/openbexi_fisheye.js"></script>
    <script type="text/javascript" src="javascript/openbexi_timeline.js"></script>
    <script type="text/javascript" src="javascript/openbexi_colorPicker.js"></script>
    <script type="text/javascript" src="javascript/openbexi_medias.js"></script>
    <script type="text/javascript" src="javascript/openbexi_javascript.js"></script>
    <script type="text/javascript" src="javascript/openbexi_navigator.js"></script>
    <script type="text/javascript" src="dojo/dojo.js"></script>
    <script type="text/javascript" src="javascript/openbexi_LN.js"></script>
    <script type="text/javascript" src="javascript/openbexi_dojo.js"></script>
    <script type="text/javascript" src="javascript/openbexi_generic_object.js"></script>
    <script type="text/javascript" src="javascript/openbexi_websocket.js"></script>
    <script type="text/javascript" src="javascript/openbexi_builder.js"></script>
    <script type="text/javascript" src="javascript/timeline/timeline_js/timeline-api.js"></script>
    <script type="text/javascript" src="javascript/wz_jsgraphics.js"></script>
    <script type="text/javascript" src="javascript/prototype.js"></script>
    <script type="text/javascript" src="javascript/scriptaculous.js"></script>
    <script type="text/javascript" src="javascript/slider.js"></script>

    <script type="text/javascript" subtype="openbexi_requirement1" for="document" event="onclick()">
        //if (getBrowser() == "ie7" || getBrowser() == "ie7_no_XMLHttpRequest")
        //my_PickFunc('BODY');
    </script>

    <script type="text/javascript" subtype="openbexi_requirement2">
        // Don't forget to update OPENBEXI_Creative_parser.java if line below updated
        try {
            dojo.require("dijit.Editor");
            dojo.require("dijit.form.ComboBox");
            dojo.require("dijit.form.CheckBox");
            dojo.require("dijit.form.TextBox");
            dojo.require("dijit.form.ValidationTextBox");
            dojo.require("dijit.form.NumberTextBox");
            dojo.require("dijit.form.CurrencyTextBox");
            dojo.require("dijit.form.DateTextBox");
            dojo.require("dojo.currency");
            dojo.require("dojo.data.ItemFileWriteStore");
            dojo.require("dijit.dijit"); // optimize: load dijit layer
            dojo.require("dojo.data.ItemFileReadStore");
            dojo.require("dijit.Tree");
            dojo.require("dojox.grid.EnhancedGrid");
            dojo.require("dojox.data.CsvStore");
            dojo.require("dijit._Calendar");
            dojo.require("dojo.date.locale");
            dojo.require("dojo.parser", "dijit/Editor", "dojo/domReady!");
            dojo.addOnLoad(load_openbexiBuilder);
            //window.onclick = function() {
            //my_PickFunc("BODY");
            //};
            window.ondrop = function (event) {
                openbexi_ondrop_ok(event);
                event.preventDefault();
            };
            window.ondragcenter = function (event) {
                openbexi_ondrop_cancel(event);
                event.preventDefault();
            };
            window.ondragover = function (event) {
                openbexi_ondrop_cancel(event);
                event.preventDefault();
            };
            window.ondragleave = function (event) {
                openbexi_ondrop_cancel(event);
                event.preventDefault();
            };

        } catch (e) {
            alert(" Error message: " + e.message);
        }
    </script>
</head>


<body onunload="jsPlumb.unload();"
      onBeforeUnload="openbexi_onBeforeUnload();"
      onKeyPress="return detectPaste(event);">

<canvas id="ob_canvas" top="200" width="2500" height="4500" style="border:0px solid green"></canvas>

<script type="text/javascript" src="javascript/wz_dragdrop.js"></script>

<IFRAME ob_connection="true" id="SaveFrame" name="SaveFrame" style="display:none"></IFRAME>
<input id="ob_choosefile" type="file" value="" style="visibility: hidden;">

<div id="pageNameInput">
</div>
<div id="ob_project">
</div>

<div id="ob_frame_top" class="ob_openbexi_global_background"
     onclick="openbexi_stopEventPropagation(event);">
    <div id="ob_frame_top_div0"><img id=ob_top_frame_message_img alt="" src="gif/info_x32.png" class="ob_img"
                                     id="ob_frame_top_img0"
                                     onmouseover="openbexiNavigator.log_on(event);"
                                     onmouseout="this.src='gif/info_x32.png';"
                                     onmousedown="this.src='gif/info_down_x32.png';"
                                     onmouseup="openbexiNavigator.log_up(event);"
            ></div>
    <div id="ob_top_frame_message"><strong></strong></div>
    <div id="ob_frame_top_div1"><img alt="" src="gif/wizard_x32.png" class="ob_img" id="ob_frame_top_img1"
                                     onmouseover="openbexiNavigator.wizard_on(event);"
                                     onmouseout="this.src='gif/wizard_x32.png';"
                                     onmousedown="this.src='gif/wizard_down_x32.png';"
                                     onclick="openbexiNavigator.wizard(event);"
            ></div>
</div>

<div id="ob_logo" class="ob_openbexi_global_background" style="top:2px;left:1010px;width:219px;height:128px;">
    <img id="ob_logo_img0" class="ob_img" src="gif/openbexi.png">

    <div id="ob_logo_text0"
         style="top:109px;left:10px;width:119px;height:33px;">
        Version 5.0 Beta
    </div>
</div>

<div id="ob_menu1" style="top:40px;left:222px;width:388px;height:96px;"
     onclick="openbexi_stopEventPropagation(event);">
    <div id="ob_menu1_div0"><img class="ob_openbexi_global_background ob_main_menu"
                                 onclick="my_PickFunc('BODY');openbexiNavigator.project(event);"
                                 id="ob_menu1_img0"></div>
    <div id="ob_menu1_div1"><img class="ob_openbexi_global_background ob_main_menu"
                                 onclick="my_PickFunc('BODY');openbexiNavigator.save_project(event);"
                                 id="ob_menu1_img1"></div>
    <div id="ob_menu1_div2"><img class="ob_openbexi_global_background ob_main_menu"
                                 onclick="my_PickFunc('BODY');openbexiNavigator.preview(event);"
                                 id="ob_menu1_img2"></div>
    <div id="ob_menu1_div3"><img class="ob_openbexi_global_background ob_main_menu"
                                 onclick="openbexiNavigator.open_publish(event);"
                                 id="ob_menu1_img3">
    </div>
</div>
<div id="ob_menu_editor" style="top:40px;left:518px;width:326px;height:96px;overflow:hidden;"
     onclick="openbexi_stopEventPropagation(event);">
    <div id="ob_sub_menu_editor" style="top:0;left:0;width:400px;height:56px;">
    </div>
</div>

<div id="ob_menu2" style="top:40px;left:751px;width:294px;height:96px;"
     onmouseover="openbexi_stopEventPropagation(event);"
     onmouseout="openbexi_stopEventPropagation(event);"
     onclick="openbexi_stopEventPropagation(event);">
    <div id="ob_menu2_div0"><img class="ob_openbexi_global_background ob_main_menu"
                                 onclick="my_PickFunc('BODY');openbexiNavigator.widget(event);"
                                 id="ob_menu2_img0"></div>
    <div id="ob_menu2_div1"><img class="ob_openbexi_global_background ob_main_menu"
                                 onclick="openbexiNavigator.open_css(event);"
                                 id="ob_menu2_img1"></div>
    <div id="ob_menu2_div2"><img class="ob_openbexi_global_background ob_main_menu"
                                 onclick="openbexiNavigator.deleteProjects(event);"
                                 id="ob_menu2_img2"></div>
</div>

<div id="ob_menu_dynamic" style="visibility:hidden;top:280px;left:-999px;width:597px;height:371px;"
     onclick="openbexi_stopEventPropagation(event);">
    <div class="default" id="ob_menu_dynamic_fck0"><strong>Open</strong></div>
    <div id="ob_menu_dynamic_div0"><img alt="" src="gif/publisher_standby_x64.png" class="ob_img"
                                        id="img32" style="width: 100%; height: 100%;"></div>
    <div class="default" id="ob_fck2"><strong>Publish the current web page to the web</strong>
    </div>
    <div id="ob_menu_dynamic_div1"><img alt="" src="gif/close_x32.png" class="ob_img" id="img33"
                                        style="width: 100%; height: 100%;"></div>
    <div id="ob_menu_dynamic_div2"><img alt="" src="gif/window_manager_full_x32.png" class="ob_img"
                                        id="img34" style="width: 100%; height: 100%;"></div>
</div>

<div id="ob_menu_widget" class="ob_openbexi_global_background" style="left:-999px;visibility:hidden;"
     onclick="openbexi_stopEventPropagation(event);">
    <div id="ob_menu_widget_sub" style="visibility: hidden;">
    </div>
</div>

<div class="default" id="ob_menu_widget_head" class="ob_openbexi_global_background"
     style="visibility: hidden;top:300px;left:-999px;width:300px;height:36px;"
     onclick="openbexi_stopEventPropagation(event);openbexiNavigator.window_factory(event,'ob_menu_widget',null,'headClicked');">
    <div id="ob_menu_widget_text"><strong>Widget</strong><br></div>

    <div id="ob_menu_widget_window_manager" style="  top: 0;left: 170px;width: 32px;height: 32px;">
        <img alt="" src="gif/window_manager_full_x32.png" class="ob_img"
             id="ob_menu_widget_window_manager_img"
             onmouseover="openbexiNavigator.window_manager_on(event,this);"
             onmouseout="openbexiNavigator.window_manager_out(event,this);"
             onmousedown="openbexiNavigator.window_manager_down(event,this);"
             onclick="openbexi_stopEventPropagation(event);openbexiNavigator.window_factory(event,'ob_menu_widget',null,'default');"
             style="width: 100%; height: 100%;"></div>
    <div id="ob_menu_widget_close" style="    top: 0;left: 203px;width: 32px;height: 32px;">
        <img alt="" src="gif/close_x32.png" class="ob_img" id="ob_menu_widget_close_img"
             onmouseover="this.src='gif/close_on_x32.png';"
             onmouseout="this.src='gif/close_x32.png';"
             onmousedown="this.src='gif/close_down_x32.png';"
             onmouseup="this.src='gif/close_x32.png';"
             onclick="openbexi_stopEventPropagation(event);openbexiNavigator.window_factory(event,'ob_menu_widget',null,'hidden');"
             style="width: 100%; height: 100%;"></div>
</div>
<div class="default" id="ob_menu_widget_footer" onclick="openbexi_stopEventPropagation(event);">
</div>
<div id="ob_menu_widget_resize" style="width:24px;height:24px;"
     onclick="openbexi_stopEventPropagation(event);">
    <img alt="" src="gif/resize_standby_x32.png" class="ob_img"
         id="ob_menu_widget_resize_img"
         onmouseover="this.src='gif/resize_x32.png';"
         onmouseout="this.src='gif/resize_standby_x32.png';"
         style="width: 100%; height: 100%;">
</div>
<div id="ob_menu_JavascriptBrowser"
     style="visibility:hidden;top:300px;left:-999px;width:300px;height:371px; "
     onclick="openbexi_stopEventPropagation(event);">
    <div class="claro" id="ob_menu_JavascriptBrowser_sub"></div>
</div>

<div class="default" id="ob_menu_JavascriptBrowser_head"
     style="visibility: hidden;top:300px;left:-999px;width:300px;height:36px;"
     onclick="openbexi_stopEventPropagation(event);openbexiNavigator.window_factory(event,'ob_menu_JavascriptBrowser',null,'headClicked');">
    <div id="ob_menu_JavascriptBrowser_text"><strong>Js browser</strong><br></div>

    <div id="ob_menu_JavascriptBrowser_window_manager" style="  top: 0;left: 170px;width: 32px;height: 32px;">
        <img alt="" src="gif/window_manager_full_x32.png" class="ob_img"
             id="ob_menu_JavascriptBrowser_window_manager_img"
             onmouseover="openbexiNavigator.window_manager_on(event,this);"
             onmouseout="openbexiNavigator.window_manager_out(event,this);"
             onmousedown="openbexiNavigator.window_manager_down(event,this);"
             onclick="openbexi_stopEventPropagation(event);openbexiNavigator.window_factory(event,'ob_menu_JavascriptBrowser',null,'default');"
             style="width: 100%; height: 100%;"></div>
    <div id="ob_menu_JavascriptBrowser_close" style="    top: 0;left: 203px;width: 32px;height: 32px;">
        <img alt="" src="gif/close_x32.png" class="ob_img" id="ob_menu_JavascriptBrowser_close_img"
             onmouseover="this.src='gif/close_on_x32.png';"
             onmouseout="this.src='gif/close_x32.png';"
             onmousedown="this.src='gif/close_down_x32.png';"
             onmouseup="this.src='gif/close_x32.png';"
             onclick="openbexi_stopEventPropagation(event);openbexiNavigator.window_factory(event,'ob_menu_JavascriptBrowser',null,'hidden');"
             style="width: 100%; height: 100%;"></div>
</div>
<div id="ob_menu_JavascriptBrowser_resize" style="width:24px;height:24px;left:-999px;"
     onclick="openbexi_stopEventPropagation(event);">
    <img alt="" src="gif/resize_standby_x32.png" class="ob_img"
         id="ob_menu_JavascriptBrowser_resize_img"
         onmouseover="this.src='gif/resize_x32.png';"
         onmouseout="this.src='gif/resize_standby_x32.png';"
         style="width: 100%; height: 100%;">
</div>

<div class="claro" id="ob_menu_CSS"
     style="visibility:hidden;top:300px;left:-999px;width:300px;height:571px; "
     onclick="openbexi_stopEventPropagation(event);">
    <div id="ob_menu_CSS_sub" style="visibility: hidden;">
    </div>
</div>
<div class="default" id="ob_menu_CSS_head" style="visibility: hidden;top:300px;left:-999px;width:300px;height:36px;"
     onclick="openbexi_stopEventPropagation(event);openbexiNavigator.window_factory(event,'ob_menu_CSS',null,'headClicked');">
    <div id="ob_menu_CSS_text"><strong>CSS picker</strong><br></div>

    <div id="ob_menu_CSS_window_manager" style="  top: 0;left: 170px;width: 32px;height: 32px;">
        <img alt="" src="gif/window_manager_full_x32.png" class="ob_img"
             id="ob_menu_CSS_window_manager_img"
             onmouseover="openbexiNavigator.window_manager_on(event,this);"
             onmouseout="openbexiNavigator.window_manager_out(event,this);"
             onmousedown="openbexiNavigator.window_manager_down(event,this);"
             onclick="openbexi_stopEventPropagation(event);openbexiNavigator.window_factory(event,'ob_menu_CSS',null,'default');"
             style="width: 100%; height: 100%;"></div>
    <div id="ob_menu_CSS_close" style="    top: 0;left: 203px;width: 32px;height: 32px;">
        <img alt="" src="gif/close_x32.png" class="ob_img" id="ob_menu_CSS_close_img"
             onmouseover="this.src='gif/close_on_x32.png';"
             onmouseout="this.src='gif/close_x32.png';"
             onmousedown="this.src='gif/close_down_x32.png';"
             onmouseup="this.src='gif/close_x32.png';"
             onclick="openbexi_stopEventPropagation(event);openbexiNavigator.window_factory(event,'ob_menu_CSS',null,'hidden');"
             style="width: 100%; height: 100%;"></div>
</div>
<div id="ob_menu_CSS_resize" style="width:24px;height:24px;"
     onclick="openbexi_stopEventPropagation(event);">
    <img alt="" src="gif/resize_standby_x32.png" class="ob_img"
         id="ob_menu_CSS_resize_img"
         onmouseover="this.src='gif/resize_x32.png';"
         onmouseout="this.src='gif/resize_standby_x32.png';"
         style="width: 100%; height: 100%;">
</div>
<div id="ob_menu_debugging" style="visibility:hidden;top:300px;left:-999px;width:650px;height:300px;"
     onclick="openbexi_stopEventPropagation(event);">
    <div id="ob_menu_debugging_sub">
    </div>
</div>
<div class="default" id="ob_menu_debugging_head"
     style="visibility: hidden;top:300px;left:-999px;width:650px;height:36px;"
     onclick="openbexi_stopEventPropagation(event);">

    <div id="ob_menu_debugging_text" style="  top:2px;left: 5px;width: 95px;height: 30px;"><strong>Log
        window</strong><br>
    </div>
    <div id="ob_menu_debugging_exception" style="  top: 0;left: 105px;width: 32px;height: 32px;">
        <img alt="" src="gif/exception_x32.png" class="ob_img"
             id="ob_menu_debugging_exception_img"
             onmouseover="ob_set_debugger_on_log(event, this,'exception');"
             onmouseout="ob_set_debugger_out_log(event, this,'exception');"
             onmousedown="ob_set_debugger_down_log(event, this,'exception');"
             onclick="openbexi_stopEventPropagation(event);ob_set_debugger_log(event, this);"
             style="width: 100%; height: 100%;"></div>
    <div id="ob_menu_debugging_error" style="  top: 0;left: 138px;width: 32px;height: 32px;">
        <img alt="" src="gif/error_x32.png" class="ob_img"
             id="ob_menu_debugging_error_img"
             onmouseover="ob_set_debugger_on_log(event, this,'error');"
             onmouseout="ob_set_debugger_out_log(event, this,'error');"
             onmousedown="ob_set_debugger_down_log(event, this,'error');"
             onclick="openbexi_stopEventPropagation(event);ob_set_debugger_log(event, this);"
             style="width: 100%; height: 100%;"></div>
    <div id="ob_menu_debugging_warning" style="  top: 0;left: 171px;width: 32px;height: 32px;">
        <img alt="" src="gif/warning_standby_x32.png" class="ob_img"
             id="ob_menu_debugging_warning_img"
             onmouseover="ob_set_debugger_on_log(event, this,'warning');"
             onmouseout="ob_set_debugger_out_log(event, this,'warning');"
             onmousedown="ob_set_debugger_down_log(event, this,'warning');"
             onclick="openbexi_stopEventPropagation(event);ob_set_debugger_log(event, this);"
             style="width: 100%; height: 100%;"></div>
    <div id="ob_menu_debugging_classe" style="  top: 0;left: 204px;width: 32px;height: 32px;">
        <img alt="" src="gif/classe_standby_x32.png" class="ob_img"
             id="ob_menu_debugging_classe_img"
             onmouseover="ob_set_debugger_on_log(event, this,'classe');"
             onmouseout="ob_set_debugger_out_log(event, this,'classe');"
             onmousedown="ob_set_debugger_down_log(event, this,'classe');"
             onclick="openbexi_stopEventPropagation(event);ob_set_debugger_log(event, this);"
             style="width: 100%; height: 100%;"></div>
    <div id="ob_menu_debugging_function" style="  top: 0;left: 237px;width: 32px;height: 32px;">
        <img alt="" src="gif/function_standby_x32.png" class="ob_img"
             id="ob_menu_debugging_function_img"
             onmouseover="ob_set_debugger_on_log(event, this,'function');"
             onmouseout="ob_set_debugger_out_log(event, this,'function');"
             onmousedown="ob_set_debugger_down_log(event, this,'function');"
             onclick="openbexi_stopEventPropagation(event);ob_set_debugger_log(event, this);"
             style="width: 100%; height: 100%;"></div>
    <div id="ob_menu_debugging_data" style="  top: 0;left: 270px;width: 32px;height: 32px;">
        <img alt="" src="gif/data_standby_x32.png" class="ob_img"
             id="ob_menu_debugging_data_img"
             onmouseover="ob_set_debugger_on_log(event, this,'data');"
             onmouseout="ob_set_debugger_out_log(event, this,'data');"
             onmousedown="ob_set_debugger_down_log(event, this,'data');"
             onclick="openbexi_stopEventPropagation(event);ob_set_debugger_log(event, this);"
             style="width: 100%; height: 100%;"></div>
    <div id="ob_menu_debugging_info" style="  top: 0;left: 303px;width: 32px;height: 32px;">
        <img alt="" src="gif/info_standby_x32.png" class="ob_img"
             id="ob_menu_debugging_info_img"
             onmouseover="ob_set_debugger_on_log(event, this,'info');"
             onmouseout="ob_set_debugger_out_log(event, this,'info');"
             onmousedown="ob_set_debugger_down_log(event, this,'info');"
             onclick="openbexi_stopEventPropagation(event);ob_set_debugger_log(event, this);"
             style="width: 100%; height: 100%;"></div>
    <div id="ob_menu_debugging_event" style="  top: 0;left: 337px;width: 32px;height: 32px;">
        <img alt="" src="gif/event_standby_x32.png" class="ob_img"
             id="ob_menu_debugging_event_img"
             onmouseover="ob_set_debugger_on_log(event, this,'event');"
             onmouseout="ob_set_debugger_out_log(event, this,'event');"
             onmousedown="ob_set_debugger_down_log(event, this,'event');"
             onclick="openbexi_stopEventPropagation(event);ob_set_debugger_log(event, this);"
             style="width: 100%; height: 100%;"></div>

    <div id="ob_menu_debugging_clear" style="  top: 0;left: 132px;width: 32px;height: 32px;">
        <img alt="" src="gif/clear_x32.PNG" class="ob_img"
             id="ob_menu_debugging_clear_img"
             onmouseover="this.src='gif/clear_x32.PNG';"
             onmouseout="this.src='gif/clear_x32.PNG';"
             onmousedown="this.src='gif/clear_x32.PNG';"
             onmouseup="this.src='gif/clear_x32.PNG';"
             onclick="openbexi_stopEventPropagation(event);openbexiNavigator.clear_debugger(event);"
             style="width: 100%; height: 100%;"></div>
    <div id="ob_menu_debugging_window_manager" style="  top: 0;left: 170px;width: 32px;height: 32px;">
        <img alt="" src="gif/window_manager_keepfull_x32.png" class="ob_img"
             id="ob_menu_debugging_window_manager_img"
             onmouseover="openbexiNavigator.window_manager_on(event,this);"
             onmouseout="openbexiNavigator.window_manager_out(event,this);"
             onmousedown="openbexiNavigator.window_manager_down(event,this);"
             onclick="openbexi_stopEventPropagation(event);openbexiNavigator.window_factory(event,'ob_menu_debugging',null,'maximize');"
             style="width: 100%; height: 100%;"></div>
    <div id="ob_menu_debugging_close" style="    top: 0;left: 203px;width: 32px;height: 32px;">
        <img alt="" src="gif/close_x32.png" class="ob_img" id="ob_menu_debugging_close_img"
             onmouseover="this.src='gif/close_on_x32.png';"
             onmouseout="this.src='gif/close_x32.png';"
             onmousedown="this.src='gif/close_down_x32.png';"
             onmouseup="this.src='gif/close_x32.png';"
             onclick="openbexi_stopEventPropagation(event);openbexiNavigator.window_factory(event,'ob_menu_debugging',null,'hidden');"
             style="width: 100%; height: 100%;"></div>
</div>
<div id="ob_menu_debugging_resize" style="width:24px;height:24px;"
     onclick="openbexi_stopEventPropagation(event);">
    <img alt="" src="gif/resize_standby_x32.png" class="ob_img"
         id="ob_menu_debugging_resize_img"
         onmouseover="this.src='gif/resize_x32.png';"
         onmouseout="this.src='gif/resize_standby_x32.png';"
         style="width: 100%; height: 100%;">
</div>

<div id="ob_menu_FileBrowser"
     style="visibility:hidden;top:300px;left:-999px;width:300px;height:371px; "
     onclick="openbexi_stopEventPropagation(event);">
    <div class="claro" id="ob_menu_FileBrowser_sub"></div>
</div>

<div class="default" id="ob_menu_FileBrowser_head"
     style="visibility: hidden;top:300px;left:-999px;width:300px;height:36px;"
     onclick="openbexi_stopEventPropagation(event);openbexiNavigator.window_factory(event,'ob_menu_FileBrowser',null,'headClicked');">
    <div id="ob_menu_FileBrowser_text"><strong>File browser</strong><br></div>

    <div id="ob_menu_FileBrowser_window_manager" style="  top: 0;left: 170px;width: 32px;height: 32px;">
        <img alt="" src="gif/window_manager_full_x32.png" class="ob_img"
             id="ob_menu_FileBrowser_window_manager_img"
             onmouseover="openbexiNavigator.window_manager_on(event,this);"
             onmouseout="openbexiNavigator.window_manager_out(event,this);"
             onmousedown="openbexiNavigator.window_manager_down(event,this);"
             onclick="openbexi_stopEventPropagation(event);openbexiNavigator.window_factory(event,'ob_menu_FileBrowser',null,'default');"
             style="width: 100%; height: 100%;"></div>
    <div id="ob_menu_FileBrowser_close" style="    top: 0;left: 203px;width: 32px;height: 32px;">
        <img alt="" src="gif/close_x32.png" class="ob_img" id="ob_menu_FileBrowser_close_img"
             onmouseover="this.src='gif/close_on_x32.png';"
             onmouseout="this.src='gif/close_x32.png';"
             onmousedown="this.src='gif/close_down_x32.png';"
             onmouseup="this.src='gif/close_x32.png';"
             onclick="openbexi_stopEventPropagation(event);openbexiNavigator.window_factory(event,'ob_menu_FileBrowser',null,'hidden');"
             style="width: 100%; height: 100%;"></div>
</div>
<div id="ob_menu_FileBrowser_resize" style="width:24px;height:24px;left:-999px;"
     onclick="openbexi_stopEventPropagation(event);">
    <img alt="" src="gif/resize_standby_x32.png" class="ob_img"
         id="ob_menu_FileBrowser_resize_img"
         onmouseover="this.src='gif/resize_x32.png';"
         onmouseout="this.src='gif/resize_standby_x32.png';"
         style="width: 100%; height: 100%;">
</div>

<div class="claro" id="ob_menu_PictureBrowser"
     style="visibility:hidden;top:300px;left:-999px;width:300px;height:371px; "
     onclick="openbexi_stopEventPropagation(event);">
    <div id="ob_menu_PictureBrowser_filter"
         style="border-bottom:1px solid #DDE099;visibility:hidden;top:37px;width:100%;height:32px;overflow: hidden; position: absolute; ">
        <div id="ob_menu_PictureBrowser_labelfilter"
             style="position: absolute; width: 40px; height: 30px; overflow: hidden;">Filter:
        </div>
        <input type="text" id="ob_menu_PictureBrowser_inputfilter" onKeyPress="return openbexi_applyFilter(event);"
               style="position: absolute; left: 41px; width: 80px; height: 24px; overflow: hidden;">

        <div id="ob_menu_PictureBrowser_combofilter"
             style="position: absolute; left: 121px; width: 30px; height: 30px; overflow: hidden; cursor: pointer; background: url(gif/combo1.jpg) no-repeat scroll 0% 0% transparent;">
        </div>

        <input type="text" id="ob_menu_PictureBrowser_inputTypefilter" value="gif|png|jpeg|jpg|tiff|riff|bgi|bmp|svg"
               style="position: absolute; left: 152px; width: 44px; height: 24px; overflow: hidden;"
               onKeyPress="return openbexi_applyFilter(event);">
    </div>
    <div id="ob_menu_PictureBrowser_sub"
         style="visibility:hidden; ">
    </div>
</div>

<div class="default" id="ob_menu_PictureBrowser_head"
     style="visibility: hidden;top:300px;left:-999px;width:300px;height:36px;"
     onclick="openbexi_stopEventPropagation(event);openbexiNavigator.window_factory(event,'ob_menu_PictureBrowser',null,'headClicked');">
    <div id="ob_menu_PictureBrowser_text"><strong>Image browser</strong><br></div>

    <div id="ob_menu_PictureBrowser_window_manager" style="  top: 0;left: 170px;width: 32px;height: 32px;">
        <img alt="" src="gif/window_manager_full_x32.png" class="ob_img"
             id="ob_menu_PictureBrowser_window_manager_img"
             onmouseover="openbexiNavigator.window_manager_on(event,this);"
             onmouseout="openbexiNavigator.window_manager_out(event,this);"
             onmousedown="openbexiNavigator.window_manager_down(event,this);"
             onclick="openbexi_stopEventPropagation(event);openbexiNavigator.window_factory(event,'ob_menu_PictureBrowser',null,'default');"
             style="width: 100%; height: 100%;"></div>
    <div id="ob_menu_PictureBrowser_close" style="    top: 0;left: 203px;width: 32px;height: 32px;">
        <img alt="" src="gif/close_x32.png" class="ob_img" id="ob_menu_PictureBrowser_close_img"
             onmouseover="this.src='gif/close_on_x32.png';"
             onmouseout="this.src='gif/close_x32.png';"
             onmousedown="this.src='gif/close_down_x32.png';"
             onmouseup="this.src='gif/close_x32.png';"
             onclick="openbexi_stopEventPropagation(event);openbexiNavigator.window_factory(event,'ob_menu_PictureBrowser',null,'hidden');"
             style="width: 100%; height: 100%;"></div>
</div>
<div id="ob_menu_PictureBrowser_resize" style="width:24px;height:24px;left:-999px;"
     onclick="openbexi_stopEventPropagation(event);">
    <img alt="" src="gif/resize_standby_x32.png" class="ob_img"
         id="ob_menu_PictureBrowser_resize_img"
         onmouseover="this.src='gif/resize_x32.png';"
         onmouseout="this.src='gif/resize_standby_x32.png';"
         style="width: 100%; height: 100%;">
</div>
<div class="default" id="ob_menu_PictureBrowser_footer" onclick="openbexi_stopEventPropagation(event);">
</div>
<div class="claro" id="ob_menu_TemplateBrowser"
     style="visibility:hidden;top:300px;left:-999px;width:300px;height:371px; "
     onclick="openbexi_stopEventPropagation(event);">
    <div id="ob_menu_TemplateBrowser_sub"
         style="visibility:hidden;top:37px;left:5px;width:100%;height:100%; ">
    </div>
</div>

<div class="default" id="ob_menu_TemplateBrowser_head"
     style="visibility: hidden;top:300px;left:-999px;width:300px;height:36px;"
     onclick="openbexi_stopEventPropagation(event);openbexiNavigator.window_factory(event,'ob_menu_TemplateBrowser',null,'headClicked');">
    <div id="ob_menu_TemplateBrowser_text"><strong>Template browser</strong><br></div>

    <div id="ob_menu_TemplateBrowser_window_manager" style="  top: 0;left: 170px;width: 32px;height: 32px;">
        <img alt="" src="gif/window_manager_full_x32.png" class="ob_img"
             id="ob_menu_TemplateBrowser_window_manager_img"
             onmouseover="openbexiNavigator.window_manager_on(event,this);"
             onmouseout="openbexiNavigator.window_manager_out(event,this);"
             onmousedown="openbexiNavigator.window_manager_down(event,this);"
             onclick="openbexi_stopEventPropagation(event);openbexiNavigator.window_factory(event,'ob_menu_TemplateBrowser',null,'default');"
             style="width: 100%; height: 100%;"></div>
    <div id="ob_menu_TemplateBrowser_close" style="    top: 0;left: 203px;width: 32px;height: 32px;">
        <img alt="" src="gif/close_x32.png" class="ob_img" id="ob_menu_TemplateBrowser_close_img"
             onmouseover="this.src='gif/close_on_x32.png';"
             onmouseout="this.src='gif/close_x32.png';"
             onmousedown="this.src='gif/close_down_x32.png';"
             onmouseup="this.src='gif/close_x32.png';"
             onclick="openbexi_stopEventPropagation(event);openbexiNavigator.window_factory(event,'ob_menu_TemplateBrowser',null,'hidden');"
             style="width: 100%; height: 100%;"></div>
</div>
<div id="ob_menu_TemplateBrowser_resize" style="width:24px;height:24px;left:-999px;"
     onclick="openbexi_stopEventPropagation(event);">
    <img alt="" src="gif/resize_standby_x32.png" class="ob_img"
         id="ob_menu_TemplateBrowser_resize_img"
         onmouseover="this.src='gif/resize_x32.png';"
         onmouseout="this.src='gif/resize_standby_x32.png';"
         style="width: 100%; height: 100%;">
</div>
<div class="claro" id="ob_menu_SQLBrowser" style="visibility:hidden;top:300px;left:-999px;width:300px;height:371px; "
     onclick="openbexi_stopEventPropagation(event);">
    <div class="claro" id="ob_menu_SQLBrowser_sub_left"
         style="visibility:hidden;top:37px;width:35%;height:100%; ">
    </div>
    <div id="ob_menu_SQLBrowser_sub_foot" align="CENTER"
         style="visibility:hidden; width:100%;height:35%;">
    </div>
    <div id="ob_menu_SQLBrowser_sub"
         style="visibility:hidden;top:37px;left:5px;width:100%;height:100%; ">
    </div>
</div>

<div class="default" id="ob_menu_SQLBrowser_head"
     style="visibility: hidden;top:300px;left:-999px;width:300px;height:36px;"
     onclick="openbexi_stopEventPropagation(event);openbexiNavigator.window_factory(event,'ob_menu_SQLBrowser',null,'headClicked');">
    <div id="ob_menu_SQLBrowser_text"><strong>SQL browser</strong><br></div>

    <div id="ob_menu_SQLBrowser_window_manager" style="  top: 0;left: 170px;width: 32px;height: 32px;">
        <img alt="" src="gif/window_manager_full_x32.png" class="ob_img"
             id="ob_menu_SQLBrowser_window_manager_img"
             onmouseover="openbexiNavigator.window_manager_on(event,this);"
             onmouseout="openbexiNavigator.window_manager_out(event,this);"
             onmousedown="openbexiNavigator.window_manager_down(event,this);"
             onclick="openbexi_stopEventPropagation(event);openbexiNavigator.window_factory(event,'ob_menu_RequestBrowser',ob_SQL_database,'maximize');openbexiNavigator.window_factory(null,'ob_menu_SQLBrowser',null,'hidden');"
             style="width: 100%; height: 100%;"></div>
    <div id="ob_menu_SQLBrowser_close" style="    top: 0;left: 203px;width: 32px;height: 32px;">
        <img alt="" src="gif/close_x32.png" class="ob_img" id="ob_menu_SQLBrowser_close_img"
             onmouseover="this.src='gif/close_on_x32.png';"
             onmouseout="this.src='gif/close_x32.png';"
             onmousedown="this.src='gif/close_down_x32.png';"
             onmouseup="this.src='gif/close_x32.png';"
             onclick="openbexi_stopEventPropagation(event);openbexiNavigator.window_factory(event,'ob_menu_SQLBrowser',null,'hidden');"
             style="width: 100%; height: 100%;"></div>
</div>
<div id="ob_menu_SQLBrowser_resize" style="width:24px;height:24px;left:-999px;"
     onclick="openbexi_stopEventPropagation(event);">
    <img alt="" src="gif/resize_standby_x32.png" class="ob_img"
         id="ob_menu_SQLBrowser_resize_img"
         onmouseover="this.src='gif/resize_x32.png';"
         onmouseout="this.src='gif/resize_standby_x32.png';"
         style="width: 100%; height: 100%;">
</div>
<div class="default" id="ob_menu_SQLBrowser_footer" onclick="openbexi_stopEventPropagation(event);">
</div>
<div class="claro" id="ob_menu_FTPBrowser" style="visibility:hidden;top:300px;left:300px;width:300px;height:371px; "
     onclick="openbexi_stopEventPropagation(event);">
    <div id="ob_menu_FTPBrowser_sub"
         style="visibility:hidden; ">
    </div>
</div>

<div class="default" id="ob_menu_FTPBrowser_head"
     style="visibility: hidden;top:300px;left:-999px;width:300px;height:36px;"
     onclick="openbexi_stopEventPropagation(event);openbexiNavigator.window_factory(event,'ob_menu_FTPBrowser',null,'headClicked');">
    <div id="ob_menu_FTPBrowser_text"><strong>sFTP browser</strong><br></div>

    <div id="ob_menu_FTPBrowser_window_manager" style="  top: 0;left: 170px;width: 32px;height: 32px;">
        <img alt="" src="gif/window_manager_full_x32.png" class="ob_img"
             id="ob_menu_FTPBrowser_window_manager_img"
             onmouseover="openbexiNavigator.window_manager_on(event,this);"
             onmouseout="openbexiNavigator.window_manager_out(event,this);"
             onmousedown="openbexiNavigator.window_manager_down(event,this);"
             onclick="openbexi_stopEventPropagation(event);openbexiNavigator.window_factory(event,'ob_menu_FTPBrowser',null,'default');"
             style="width: 100%; height: 100%;"></div>
    <div id="ob_menu_FTPBrowser_close" style="    top: 0;left: 203px;width: 32px;height: 32px;">
        <img alt="" src="gif/close_x32.png" class="ob_img" id="ob_menu_FTPBrowser_close_img"
             onmouseover="this.src='gif/close_on_x32.png';"
             onmouseout="this.src='gif/close_x32.png';"
             onmousedown="this.src='gif/close_down_x32.png';"
             onmouseup="this.src='gif/close_x32.png';"
             onclick="openbexi_stopEventPropagation(event);openbexiNavigator.window_factory(event,'ob_menu_FTPBrowser',null,'hidden');"
             style="width: 100%; height: 100%;"></div>
</div>
<div id="ob_menu_FTPBrowser_resize" style="width:24px;height:24px;left:-999px;"
     onclick="openbexi_stopEventPropagation(event);">
    <img alt="" src="gif/resize_standby_x32.png" class="ob_img"
         id="ob_menu_FTPBrowser_resize_img"
         onmouseover="this.src='gif/resize_x32.png';"
         onmouseout="this.src='gif/resize_standby_x32.png';"
         style="width: 100%; height: 100%;">
</div>
<div class="default" id="ob_menu_FTPBrowser_footer" onclick="openbexi_stopEventPropagation(event);">
</div>
<div id="ob_menu_RequestBrowser" style="top: 0;left: 0;width: 600px;height: 500px;"
     onclick="openbexi_stopEventPropagation(event);">
    <div class="claro" id="ob_menu_RequestBrowser_sub_left"
         style="visibility:hidden;top:37px;width:35%;height:100%;left:0 ">
    </div>
    <div id="ob_menu_RequestBrowser_sub_foot" align="CENTER"
         style="visibility:hidden; width:100%;height:35%;top:0;left:0">
    </div>
    <div id="ob_menu_RequestBrowser_sub"
         style="visibility:hidden;top:37px;left:5px;width:100%;height:100%; ">
    </div>
</div>

<div class="default" id="ob_menu_RequestBrowser_head"
     onclick="openbexi_stopEventPropagation(event);openbexiNavigator.window_factory(event,'ob_menu_RequestBrowser',null,'headClicked');">
    <div style="top: 0;left: 2px;width: 32px;height: 32px;" id="ob_menu_RequestBrowser_text_icon">
        <img id="ob_menu_RequestBrowser_text_img" alt="" src="gif/info_x32.png" class="ob_img"
             style="width: 100%; height: 100%;"></div>
    <div id="ob_menu_RequestBrowser_text"><strong>Save project</strong><br></div>
    <div id="ob_menu_RequestBrowser_window_manager" style="top: 0;left: 0;width: 0;height: 0;">
        <img alt="" src="gif/window_manager_keepfull_x32.png" class="ob_img"
             id="ob_menu_RequestBrowser_window_manager_img"
             onmouseover="openbexiNavigator.window_manager_on(event,this);"
             onmouseout="openbexiNavigator.window_manager_out(event,this);"
             onmousedown="openbexiNavigator.window_manager_down(event,this);"
             onclick="openbexi_stopEventPropagation(event);openbexiNavigator.window_factory(event,'ob_menu_RequestBrowser',null,'default');"
             style="width: 100%; height: 100%;"></div>
    <div id="ob_menu_RequestBrowser_close" style="    top: 0;left: 203px;width: 32px;height: 32px;">
        <img alt="" src="gif/close_x32.png" class="ob_img" id="ob_menu_RequestBrowser_close_img"
             onmouseover="this.src='gif/close_on_x32.png';"
             onmouseout="this.src='gif/close_x32.png';"
             onmousedown="this.src='gif/close_down_x32.png';"
             onmouseup="this.src='gif/close_x32.png';"
             onclick="openbexi_stopEventPropagation(event);openbexiNavigator.window_factory(event,'ob_menu_RequestBrowser',null,'hidden');"
             style="width: 100%; height: 100%;"></div>
</div>
<div id="ob_menu_RequestBrowser_resize" style="width:24px;height:24px;left:-999px;"
     onclick="openbexi_stopEventPropagation(event);">
    <img alt="" src="gif/resize_standby_x32.png" class="ob_img"
         id="ob_menu_RequestBrowser_resize_img"
         onmouseover="this.src='gif/resize_x32.png';"
         onmouseout="this.src='gif/resize_standby_x32.png';"
         style="width: 100%; height: 100%;">
</div>
<div id="ob_color_picker_div" style="visibility:hidden;left:-999px;">
    <table onclick="openbexi_setCSSValue_fromPicker(event,'background',ob_source_color.bgColor);"
           style="overflow:hidden;">
        <tr>
            <td>
                <script language="Javascript" type="text/javascript">
                    var total = 1657;
                    var X = Y = j = RG = B = 0;
                    var aR = new Array(total);
                    var aG = new Array(total);
                    var aB = new Array(total);
                    for (var i = 0; i < 256; i++) {
                        aR[i + 510] = aR[i + 765] = aG[i + 1020] = aG[i + 5 * 255] = aB[i] = aB[i + 255] = 0;
                        aR[510 - i] = aR[i + 1020] = aG[i] = aG[1020 - i] = aB[i + 510] = aB[1530 - i] = i;
                        aR[i] = aR[1530 - i] = aG[i + 255] = aG[i + 510] = aB[i + 765] = aB[i + 1020] = 255;
                        if (i < 255) {
                            aR[i / 2 + 1530] = 127;
                            aG[i / 2 + 1530] = 127;
                            aB[i / 2 + 1530] = 127;
                        }
                    }
                    var hexbase = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F");
                    i = 0;
                    var jl = new Array();
                    for (x = 0; x < 16; x++)for (y = 0; y < 16; y++)jl[i++] = hexbase[x] + hexbase[y];
                    document.write('<' + 'table border="0" cellspacing="0" cellpadding="0" onclick="t(event)">');
                    //var H=W=63;
                    var H = 20;
                    var W = 80;
                    for (var Y = 0; Y <= H; Y++) {
                        s = '<' + 'tr height=2>';
                        j = Math.round(Y * (510 / (H + 1)) - 255);
                        for (X = 0; X <= W; X++) {
                            i = Math.round(X * (total / W));
                            R = aR[i] - j;
                            if (R < 0)R = 0;
                            if (R > 255 || isNaN(R))R = 255;
                            G = aG[i] - j;
                            if (G < 0)G = 0;
                            if (G > 255 || isNaN(G))G = 255;
                            B = aB[i] - j;
                            if (B < 0)B = 0;
                            if (B > 255 || isNaN(B))B = 255;
                            s = s + '<' + 'td width=2 bgcolor=#' + jl[R] + jl[G] + jl[B] + '><' + '/td>';
                        }
                        document.write(s + '<' + '/tr>');
                    }
                    document.write('<' + '/table>');
                    var ns6 = document.getElementById && !document.all;
                    var ie = document.all;
                    var artabus = '';
                    function t(e) {
                        ob_source_color = ie ? event.srcElement : e.target;
                    }
                </script>
        </tr>
    </table>
</div>
<div id="ob_slide_div0" style="visibility: hidden;position:absolute;" class="defaultPanel"
     onclick="openbexi_stopEventPropagation(event); ">
    <div id="defaultPanelContent" style="display:block;">
        <table>
            <tr>
                <td>
                    <div align=center class="panelTitle"> width :
                    </div>
                </td>
                <td>
                    <div class="largeInputContainer">
                        <input id="bwInput" class="largeInput" maxlength=2 value=2 onFocus="this.select();"
                               onKeyUp="ob_changeInputValue(event,this,0,99);CSS3ME.setBasics();my_canvas_PickFunc(currentObjNameSelected);"
                               autocomplete="off"/>
                    </div>
                </td>
            </tr>
        </table>
        <table>
            <tr>
                <td>
                    <div class="colorInputContainer bcInputContainer">
                        <div class="colorInputDiv">
                            <input id="bcInput" class="colorInput" value="border:" readonly/>

                            <div id="bcInputCP" class="colorPickerBox" onClick="createPicker('borderColor')"></div>
                        </div>
                        <input id="bcHiddenInput" type="hidden" value="#999999"/>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="colorInputContainer bgInputContainer">
                        <div class="colorInputDiv">
                            <input id="bgInput" class="colorInput" value="background:" readonly/>

                            <div id="bgInputCP" class="colorPickerBox"
                                 onClick="createPicker('backgroundColor')"></div>
                        </div>
                        <input id="bgHiddenInput" type="hidden" value="#ffffff"/>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</div>
<div id="ob_slide_div1" style="visibility: hidden;position:absolute;" class="ob_slide_panel2 one morePanel"
     onclick="openbexi_stopEventPropagation(event); ">
    <div class="ob_slide_panelContent">
        <table>
            <tbody>
            <tr>
                <td>
                    <div class="sliderMinus">-</div>
                </td>
                <td>
                    <div class="sliderContainer">
                        <div id="brSlider" class="slider">
                            <div id="brThumb" class="sliderThumb"></div>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="sliderPlus">+</div>
                </td>
                <td>
                    <div class="largeInputContainer"><input id="brInput" class="largeInput"
                                                            onkeyup="ob_changeInputValue(event,this,0,99);CSS3ME.updateBorderRadius(Math.round(Number(this.value)));CSS3ME.sliderBR.moveThumb(sliderBR.posPercToPx((this.value*2)+'%'))"
                                                            maxlength="2" value="0" onfocus="this.select();"
                                                            autocomplete="off"></div>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
    <div class="ob_slide_panelContent">
        <table>
            <tbody>
            <tr>
                <td>
                    <div class="brMoreInputs">
                        <div class="smallInputContainer brTLInputContainer"><input id="brTLInput" class="smallInput"
                                                                                   maxlength="2" value="0"
                                                                                   onfocus="this.select();"
                                                                                   onkeyup="ob_changeInputValue(event,this,0,99);CSS3ME.setBorderRadii();"
                                                                                   autocomplete="off"></div>
                        <div class="smallInputContainer brTRInputContainer"><input id="brTRInput" class="smallInput"
                                                                                   maxlength="2" value="0"
                                                                                   onfocus="this.select();"
                                                                                   onkeyup="ob_changeInputValue(event,this,0,99);CSS3ME.setBorderRadii();"
                                                                                   autocomplete="off"></div>
                        <div class="smallInputContainer brBRInputContainer"><input id="brBRInput" class="smallInput"
                                                                                   maxlength="2" value="0"
                                                                                   onfocus="this.select();"
                                                                                   onkeyup="ob_changeInputValue(event,this,0,99);CSS3ME.setBorderRadii();"
                                                                                   autocomplete="off"></div>
                        <div class="smallInputContainer brBLInputContainer"><input id="brBLInput" class="smallInput"
                                                                                   maxlength="2" value="0"
                                                                                   onfocus="this.select();"
                                                                                   onkeyup="ob_changeInputValue(event,this,0,99);CSS3ME.setBorderRadii();"
                                                                                   autocomplete="off"></div>
                        <div class="brBGBox"></div>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</div>
<div id="ob_slide_div2" style="visibility: hidden;position:absolute;" class="ob_slide_panel2 two morePanel"
     onclick="openbexi_stopEventPropagation(event); ">
    <div class="ob_slide_panelContent">
        <table>
            <tr>
                <td>
                    <div class="sliderMinus">&#45;</div>
                </td>
                <td>
                    <div class="sliderContainer">
                        <div id="bsSlider" class="slider">
                            <div id="bsThumb" class="sliderThumb"></div>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="sliderPlus">&#43;</div>
                </td>
                <td>
                    <div class="largeInputContainer">
                        <input id="bsInput" class="largeInput"
                               onKeyUp="ob_changeInputValue(event,this,0,100);CSS3ME.updateBoxShadow(Math.round(Number(this.value)));CSS3ME.sliderBS.moveThumb(sliderBS.posPercToPx((this.value)+'%'))"
                               maxlength=3 value=0 onFocus="this.select();" autocomplete="off"/>
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <div class="ob_slide_panelContent">
        <table>
            <tr>
                <td>
                    <div class="bsMoreInputs">
                        <table>
                            <tr>
                                <td><label for="bsHorzInput"><font size="1">hori</font></label>
												<span class="smallInputContainer bsHorzInputContainer">
												<input id="bsHorzInput" class="smallInput" maxlength=3 value=0
                                                       onFocus="this.select();"
                                                       onKeyUp="ob_changeInputValue(event,this,-99,99);CSS3ME.setBoxShadow();"
                                                       autocomplete="off"/>
												</span></td>
                                <td><label for="bsVertInput"><font size="1">vertical</font></label>
												<span class="smallInputContainer bsVertInputContainer">
												<input id="bsVertInput" class="smallInput" maxlength=3 value=0
                                                       onFocus="this.select();"
                                                       onKeyUp="ob_changeInputValue(event,this,-99,99);CSS3ME.setBoxShadow();"
                                                       autocomplete="off"/>
												</span></td>
                                <td>
                                    <div class="colorInputContainer">
                                        <div class="colorInputDiv">
                                            <input id="bsColorInput" class="colorInput" value="shadow:" readonly/>

                                            <div id="bsInputCP" class="colorPickerBox"
                                                 onClick="createPicker('boxShadowColor')"></div>
                                        </div>
                                        <input id="bsColorHiddenInput" type="hidden" value="#000000"/>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td><label for="bsBlurInput"><font size="1">blur</font></label>
												<span class="smallInputContainer bsBlurInputContainer">
												<input id="bsBlurInput" class="smallInput" maxlength=2 value=0
                                                       onFocus="this.select();"
                                                       onKeyUp="ob_changeInputValue(event,this,0,99);CSS3ME.setBoxShadow();"
                                                       autocomplete="off"/>
												</span></td>
                                <td><label for="bsSpreadInput"><font size="1">spread</font></label>
												<span class="smallInputContainer bsSpreadInputContainer">
												<input id="bsSpreadInput" class="smallInput" maxlength=3 value=0
                                                       onFocus="this.select();"
                                                       onKeyUp="ob_changeInputValue(event,this,-99,99);CSS3ME.setBoxShadow();"
                                                       autocomplete="off"/>
												</span></td>
                                <td>
                                    <div id="insetShadowBtn" class="insetBtn"
                                         onClick="if(this.className=='insetBtn'){this.className='outsetBtn';}else{this.className='insetBtn';}CSS3ME.setBoxShadow();">
                                        <span class="insetBtnOff">Inset Shadow?</span><span class="insetBtnOn">Outset Shadow?</span>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</div>
<div id="ob_slide_div3" style="visibility: hidden;position:absolute;" class="ob_slide_panel2 three morePanel"
     onclick="openbexi_stopEventPropagation(event); ">
    <div class="ob_slide_panelContent">
        <table>
            <tr>
                <td><span class="gradTextOff"><font size="1">OFF</font></span><span id="gradientSwitch"
                                                                                    class="gradSwitch"
                                                                                    onclick="if(this.className!='gradSwitch gradOn'){this.className='gradSwitch gradOn';}else{this.className='gradSwitch';}CSS3ME.updateGradient();"> </span><span
                        class="gradTextOn"><font size="1">ON</font></span></td>
            </tr>
        </table>
    </div>
    <div class="ob_slide_panelContent">
        <table>
            <tr>
                <td>
                    <div class="colorInputContainer bgFromContainer">
                        <div class="colorInputDiv">
                            <input id="bgFromInput" class="colorInput" value="from:" readonly/>

                            <div id="bgFromInputCP" class="colorPickerBox"
                                 onClick="createPicker('backgroundFromColor')"></div>
                        </div>
                        <input id="bgFromHiddenInput" type="hidden" value="#ffffff"/>
                    </div>
                </td>
                <td>
                    <div class="gradientArrow"></div>
                </td>
                <td>
                    <div class="colorInputContainer bgToContainer">
                        <div class="colorInputDiv">
                            <input id="bgToInput" class="colorInput" value="to:" readonly/>

                            <div id="bgToInputCP" class="colorPickerBox"
                                 onClick="createPicker('backgroundToColor')"></div>
                        </div>
                        <input id="bgToHiddenInput" type="hidden" value="#000000"/>
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <div class="ob_slide_panelContent">
        <table>
            <tr>
                <td>
                    <div class="radioWrp">
                        <div id="bgT2B" class="radioBtn radioChecked" onClick="CSS3ME.bgRadioChecked(this.id)"></div>
                        <p onClick="CSS3ME.bgRadioChecked('bgT2B')"><font size="1">top to bottom</font></p>
                    </div>
                </td>
                <td>
                    <div class="radioWrp">
                        <div id="bgL2R" class="radioBtn" onClick="CSS3ME.bgRadioChecked(this.id)"></div>
                        <p onClick="CSS3ME.bgRadioChecked('bgL2R')"><font size="1">left to right</font></p>
                    </div>
                </td>
                <td>
                    <div class="radioWrp">
                        <div id="bgR2L" class="radioBtn" onClick="CSS3ME.bgRadioChecked(this.id)"></div>
                        <p onClick="CSS3ME.bgRadioChecked('bgR2L')"><font size="1">right to left</font></p>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</div>
<div id="ob_slide_div4" style="visibility: hidden;position:absolute;" class="ob_slide_panel2 four"
     onclick="openbexi_stopEventPropagation(event); ">
    <div class="icon opacity"></div>
    <div class="ob_slide_panelContent">
        <table>
            <tr>
                <td>
                    <div class="sliderMinus">&#45;</div>
                </td>
                <td>
                    <div class="sliderContainer">
                        <div id="oSlider" class="slider">
                            <div id="oThumb" class="sliderThumb"></div>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="sliderPlus">&#43;</div>
                </td>
                <td>
                    <div class="largeInputContainer">
                        <input id="oInput" class="largeInput" maxlength=3 value=100 onFocus="this.select();"
                               onKeyUp="ob_changeInputValue(event,this,0,100);CSS3ME.updateOpacity(Number(this.value));CSS3ME.sliderO.moveThumb(sliderO.posPercToPx((this.value)+'%'));"
                               autocomplete="off"/>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</div>
<div id="ob_slide_div5" style="visibility: hidden;position:absolute;" class="defaultPanel five"
     onclick="openbexi_stopEventPropagation(event); ">
    <div id="defaultBodyPanelContent" style="display:block;">
        <table>
            <td>
                <div class="colorInputContainer bgInputContainer">
                    <div class="colorInputDiv">
                        <input id="bgBodyInput" class="colorInput" value="background:" readonly/>

                        <div id="bgBodyInputCP" class="colorPickerBox"
                             onClick="createPicker('backgroundBodyColor')"></div>
                    </div>
                    <input id="bgBodyHiddenInput" type="hidden" value="#ffffff"/>
                </div>
            </td>
        </table>
    </div>
</div>
<div id="ob_slide_div6" style="visibility: hidden;position:absolute;" class="ob_slide_panel2 three morePanel"
     onclick="openbexi_stopEventPropagation(event); ">
    <div class="ob_slide_panelContent">
        <table>
            <tr>
                <td>
                    <div class="sliderMinus">&#45;</div>
                </td>
                <td>
                    <div class="sliderContainer">
                        <div id="fsSlider" class="slider">
                            <div id="fsThumb" class="sliderThumb"></div>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="sliderPlus">&#43;</div>
                </td>
                <td>
                    <div class="largeInputContainer">
                        <input id="fsInput" class="largeInput" maxlength=3 value=12 onFocus="this.select();"
                               onKeyUp="ob_changeInputValue(event,this,0,100);CSS3ME.updateFontSize(Math.round(Number(this.value)));CSS3ME.sliderFs.moveThumb(sliderFs.posPercToPx((this.value)+'%'));"
                               autocomplete="off"/>
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <div class="ob_slide_panelContent">
        <table>
            <tr>
                <td>
                    <div class="radioWrp">
                        <div id="ftpx" class="radioBtn radioChecked" onClick="CSS3ME.ftRadioChecked(this.id)"></div>
                        <p onClick="CSS3ME.ftRadioChecked('ftpx')"><font size="1">px</font></p>
                    </div>
                </td>
                <td>
                    <div class="radioWrp">
                        <div id="ftem" class="radioBtn" onClick="CSS3ME.ftRadioChecked(this.id)"></div>
                        <p onClick="CSS3ME.ftRadioChecked('ftem')"><font size="1">em</font></p>
                    </div>
                </td>
                <td>
                    <div class="radioWrp">
                        <div id="ftrem" class="radioBtn" onClick="CSS3ME.ftRadioChecked(this.id)"></div>
                        <p onClick="CSS3ME.ftRadioChecked('ftrem')"><font size="1">rem</font></p>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</div>
<div id="ob_slide_div7" style="visibility: hidden;position:absolute;" class="ob_slide_panel2 three morePanel"
     onclick="openbexi_stopEventPropagation(event); ">
    <div class="ob_slide_panelContent">
        <table>
            <tr>
                <td>
                    <div class="colorInputContainer bgFromContainer">
                        <div class="colorInputDiv">
                            <input id="fontColorInput" class="colorInput" value="Color:" readonly/>

                            <div id="fontColorInputCP" class="colorPickerBox"
                                 onClick="createPicker('FontColor')"></div>
                        </div>
                        <input id="fontColorHiddenInput" type="hidden" value="#ffffff"/>
                    </div>
                </td>
                <td>
                    <div class="gradientArrow"></div>
                </td>
                <td>
                    <div class="colorInputContainer bgToContainer">
                        <div class="colorInputDiv">
                            <input id="bgFontColorInput" class="colorInput" value="Bg:" readonly/>

                            <div id="bgFontColorInputCP" class="colorPickerBox"
                                 onClick="createPicker('backgroundTextColor')"></div>
                        </div>
                        <input id="bgFontColorHiddenInput" type="hidden" value="#000000"/>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</div>

<div align=center onmousedown="openbexi_stopEventPropagation(event);" class="popup_menu0" id="popup_menu0"></div>
<script type="text/javascript" subtype="walterzorn"> SET_DHTML(TRANSPARENT);</script>
<script type="text/javascript" src="javascript/openbexi_builder_events.js"></script>
<script type="text/javascript" src="javascript/openbexi_css3.js"></script>

<script>
    var cpm = false;
    var currOpenCPMElmId = false;
    function isMouseOut(e, handler) {
        if (e.type !== 'mouseout') {
            return false;
        }
        var reltg = e.relatedTarget ? e.relatedTarget : e.type === 'mouseout' ? e.toElement : e.fromElement;
        while (reltg && reltg !== handler) {
            reltg = reltg.parentNode;
        }
        return (reltg !== handler);
    }
    var listOfColorItemInfo = {
        'borderColor': {'elmId': 'bcInputCP', 'hiddenInputId': 'bcHiddenInput', 'textInputId': 'bcInput'},
        'backgroundColor': {'elmId': 'bgInputCP', 'hiddenInputId': 'bgHiddenInput', 'textInputId': 'bgInput'},
        'boxShadowColor': {'elmId': 'bsInputCP', 'hiddenInputId': 'bsColorHiddenInput', 'textInputId': 'bsColorInput'},
        'backgroundFromColor': {'elmId': 'bgFromInputCP', 'hiddenInputId': 'bgFromHiddenInput', 'textInputId': 'bgFromInput'},
        'backgroundToColor': {'elmId': 'bgToInputCP', 'hiddenInputId': 'bgToHiddenInput', 'textInputId': 'bgToInput'},
        'backgroundBodyColor': {'elmId': 'bgBodyInputCP', 'hiddenInputId': 'bgBodyHiddenInput', 'textInputId': 'bgBodyInput'},
    };
    function createPicker(colorItem) {
        var thisElm = false, thisItem = listOfColorItemInfo[colorItem], currColor = '';
        if (currOpenCPMElmId) {
            if (currOpenCPMElmId !== thisItem.elmId) {
                document.getElementById(currOpenCPMElmId).innerHTML = '';
                cpm.decontructor();
                cpm = null;
                currOpenCPMElmId = false;
            } else {
                return;
            }
        }
        currOpenCPMElmId = thisItem.elmId;
        currColor = document.getElementById(thisItem.hiddenInputId).value;
        document.getElementById(thisItem.elmId).innerHTML = '<div id="colorPickerWrp">\
    		<div class="safeArea" onmouseout="if(isMouseOut(event,this)){document.getElementById(\'' + thisItem.elmId + '\').innerHTML=\'\';currOpenCPMElmId=false;}">\
    			<div class="colorPicker">\
    				<div class="pickerColorWrpr">\
    					<div id="pickerColor" class="pickerColor" onmousemove="cpm.changeColor(event,this,-1,-1)" onclick="cpm.setColor(event,this,-1,-1)" onmouseover="cpm.hasColorClicked=false;" onmouseout="cpm.resetColor();">\
    						<input type="hidden" id="hiddenColor" value="' + currColor + '" />\
    					</div>\
    				</div>\
    				<div id="pickerHueWrpr" class="pickerHueWrpr">\
    					<div id="pickerHue" class="pickerHue">\
    						<div id="hueColor" class="hueColor" onclick="cpm.setHue(event,this)"></div>\
    						<div id="hueLine" class="hueLine"></div>\
    						<input type="hidden" id="hiddenHue" value="0" />\
    						<div id="hueArrow" class="hueArrow" onmousedown="cpm.startHueChange(event,this)"></div>\
    					</div>\
    				</div>\
    			</div>\
    			<div id="pickerColorTrans" onmouseover="cpm.changeTransparentElms(true)" onmouseout="cpm.changeTransparentElms(false)" onclick="if(!cpm.isTransparent){cpm.toggleTransparent();}">transparent</div>\
    			<input id="pickerColorInput" value="' + currColor + '" onfocus="this.select()" onkeyup="cpm.setColorFromInput(event,this)" maxlength=7 />\
    		</div>\
    	</div>';
        cpm = new ColorPickerModal({'inputElmId': thisItem.hiddenInputId, 'coloredElmId': thisItem.textInputId, 'startColor': currColor});
    }
    function initPage() {
        document.getElementById('bwInput').value = 2;
        document.getElementById('bcHiddenInput').value = "#999999";
        document.getElementById('bgHiddenInput').value = "#ffffff";
        document.getElementById('brInput').value = 0;
        document.getElementById('brTLInput').value = 0;
        document.getElementById('brTRInput').value = 0;
        document.getElementById('brBRInput').value = 0;
        document.getElementById('brBLInput').value = 0;
        document.getElementById('bsInput').value = 0;
        document.getElementById('bsHorzInput').value = 0;
        document.getElementById('bsVertInput').value = 0;
        document.getElementById('bsColorHiddenInput').value = "#000000";
        document.getElementById('bsBlurInput').value = 0;
        document.getElementById('bsSpreadInput').value = 0;
        document.getElementById('oInput').value = 100;
        document.getElementById('bgFromHiddenInput').value = "#ffffff";
        document.getElementById('bgToHiddenInput').value = "#000000";
    }
    initPage();
</script>

<div id="ob_error_popup"
     style="top:37px;left:2px;width: 1007px; height:200px; visibility:hidden; border:0px solid green"
     onclick="openbexi_stopEventPropagation(event);">
    <div style="    top: 4px;left:987px;width: 16px;height: 16px;position:absolute;">
        <img alt="" src="gif/close_x32.png" class="ob_img"
             onmouseover="this.src='gif/close_on_x32.png';"
             onmouseout="this.src='gif/close_x32.png';"
             onmousedown="this.src='gif/close_down_x32.png';"
             onmouseup="this.src='gif/close_x32.png';"
             onclick="openbexi_stopEventPropagation(event);document.getElementById('ob_error_popup').style.visibility='hidden';"
             style="width: 100%; height: 100%;">
    </div>
    <div id="ob_error_popup_txt"
         style="    top: 25px;left:0px;width: 1007px;height: 166px;position:absolute;overflow:auto">
    </div>
</div>
<div id=preloadLYR
     style="Z-INDEX: 999; LEFT: 1px; VISIBILITY: hidden; WIDTH: 360px; POSITION: absolute; TOP: 1px; HEIGHT: 115px">
    <img height=60 width=60>
</div>
<div id="ob_debug_fabrics"
     style="top: 0px; left: 1600px; width: 584px; height: 1721px;border:1px red solid; border-radius: 1em 1em 1em 1em; position: absolute;visibility:hidden ">
</div>
</body>
</html>