/* This notice must be untouched at all times.

 Copyright (c) 2005-2013 JC Arcaz. All rights reserved.
 OPEN OPENBEXI HTML Builder for generating dynanic HTML page and html code source from browsers.
 updated: September 28 2013 version 5.0
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

 Note:
 OPEN OPENBEXI htmlbuilder uses dojo Toolkit (http://dojotoolkit.org/).
 OPEN OPENBEXI htmlbuilder uses query.min.js, jquery-ui.min.js, jQueryRotate.js, jquery.ui.touch-punch.min.js, jquery.jsPlumb-1.5.2-min.js, codemirror.js, fabrics.js
 */
var ob_media_styles_BgImg = null;
var ob_media_inspectorAttributes = [
    ['editor'         ,'MediaEditor'   ,'true']
];
var ob_media_popupAttributes = [
    //['menuitem17','openbexiNavigator.window_factory(null, \'ob_menu_JavascriptBrowser\', ob_menu_javascripts, \'minimize\');openbexi_display_javascript_parameters(event,null,null);','Javascript'  ,'gif\/javascript_x48.png','48px','48px'],
    ['menuitem18','openbexiNavigator.browse_picture(\'video\',\'none\',null,\'tree\',true);'         ,'VideoBrowser'  ,'gif\/video_x48.png','48px','48px'],
    ['menuitem18','this.backward()'         ,'SendToBack'  ,'gif\/move_backward_x48.png','48px','48px'],
    ['menuitem20','this.forward()'          ,'BringToFront','gif\/move_forward_x48.png','48px','48px'],
    ['menuitem23','this.removeObject(true);openbexiNavigator.update_menu_editor(null, false);' ,'DlgSelectBtnDelete','gif\/video_delete_x48.png','48px','48px']
];
function __openbexi_debugC_Medias(f, text) {
    try {
        __openbexi_debugC(f, text);
    } catch (e) {
    }
}
var openbexi_medias = function(bexiObj, obj, name, fileName, top, left, width, height) {
    try {
        var divobj;
        __openbexi_debugC_Medias("openbexi_button(" + bexiObj + "," + obj + "," + name + "," + fileName + "," + top + "," + left + "," + width + "," + height + ")", "Classe:");
        this.loading_status = "loaded";
        if (name == null || name == "") name = getNewIdDiv("div");
        if (openbexiNavigator)
            this.openbexiNavigator = openbexiNavigator;
        else
            this.openbexiNavigator = new openbexi_navigator();
        //openbexi_medias properties
        this.name = name;
        this.id = name;
        this.type = "openbexi_medias";
        if (bexiObj == null)
            this.parentNodeId = "BODY";
        else
            this.parentNodeId = bexiObj.id;
        // events and functions variable
        this.events = new Array();
        this.eventUrls = new Array();
        this.fncSrcs = new Array();
        this.urls = new Array();

        if (obj == null) {
            var url1 = fileName;
            var url = fileName;
            var occur = fileName.match(openbexiNavigator.hrefPath);
            if (occur != null) url1 = openbexi_removePath(fileName, true);
            this.add(url1);
            // create object
            divobj = new openbexi_div(bexiObj, obj, name, top, left, width, height);
            this.div = divobj.div;
            this.div.setAttribute("CLASSE", "DIV_MEDIAS");
            this.div.setAttribute("creation_date", new Date());
            this.parent = this.div.id;
            this.div.style.border = "6px solid #e8e8e8";

            if (typeMIME(url).indexOf("audio") != -1) {
                this.div.style.width = 300;
                this.div.style.height = 60;
                this.div.innerHTML = insererAudio("aud" + name, url1, true, this.div.style.width, this.div.style.height);
            }
            else if (typeMIME(url).indexOf("mp3") != -1) {
                this.div.style.width = 300;
                this.div.style.height = 60;
                this.div.innerHTML = insererAudio("mp3" + name, url1);
            }
            else if (typeMIME(url).indexOf("flash") != -1) {
                    this.div.style.width = 500;
                    this.div.style.height = 350;
                    this.div.innerHTML = insererFlash("flash" + name, url1, this.div.style.width, this.div.style.height);
                } else {
                    this.div.style.width = 200;
                    this.div.style.height = 195;
                    this.div.innerHTML = insererVideo("video" + name, url1, true, this.div.style.width, this.div.style.height);
                }
        } else {
            divobj = new openbexi_div(bexiObj, obj, obj.id, top, left, width, height);
            this.div = obj;
            this.parent = this.div.id;
            this.div.ob_template = obj.getAttribute("ob_template");
            this.div.setAttribute("CLASSE", "DIV_MEDIAS");
            this.div.setAttribute("creation_date",  obj.getAttribute("creation_date"));
            this.div.setAttribute("obzindex",  obj.getAttribute("obzindex"));
            this.div.setAttribute("ob_template",  obj.getAttribute("ob_template"));
            this.div.style.zIndex = obj.getAttribute("obzindex");
            //alert(this.div.innerHTML)
        }
        this.genericObject = new openbexi_generic_object(this);
        this.div.onclick = this.my_PickFunc;
        //document.getElementById("video" + name).onclick = this.my_PickFunc;
        if (obj == null) this.forward();
        this.div.style.cursor = "pointer";
    } catch (e) {
        __openbexi_debugC_Medias("openbexi_medias()", "Exception:" + e.message);
    }
}
// tableau des extensions
var medias_ext = new Array("class", "swf", "au,snd", "mp2,mp3", "aif,aiff,aifc",
        "wav", "dus,cht", "mid,midi", "rm,ra,ram", "rpm",
        "cmu,ras", "fh4,fh5,fhc", "gif", "ief", "jpg,jpe,jpeg",
        "tif,tiff", "pnm", "pbm", "pgm", "ppm",
        "rgb", "xbm", "xpm", "xwd", "mpg,mpe,mpeg",
        "qt,mov", "wma,wmv,asf", "avi,vfw", "movie", "wrl,vrml");
// tableau des types MIME
var medias_mim = new Array("application/octet-stream", "application/x-shockwave-flash",
        "audio/basic", "audio/mpeg", "audio/x-aiff", "audio/x-wav",
        "audio/x-dspeeh", "audio/x-midi", "audio/x-pn-realaudio", "audio/x-pn-realaudio-plugin",
        "image/x-cmu-raster", "image/x-freehand", "image/gif", "image/ief",
        "image/jpeg", "image/tiff", "image/x-portable-anymap", "image/x-portable-bitmap",
        "image/x-portable-graymap", "image/x-portable-pixmap", "image/x-rgb",
        "image/x-xbitmap", "image/x-xpixmap", "image/x-xwindowdump", "video/mpeg",
        "video/quicktime", "video/x-ms-asf", "video/x-msvideo", "video/x-sgi-movie", "x-world/x-vrml");
// --- Fonctions ---
// retourne la balise OBJECT adaptee au navigateur utilise
function medias_baliseObject(id, url, auto, largeur, hauteur, console) {
    var obt;
    obt = "<OBJECT ";
    var agt = navigator.userAgent.toLowerCase();
    if ((agt.indexOf("msie") != -1) && (agt.indexOf("opera") == -1)) {
        obt += "ID=\"" + id + "\" ";
        if (typeMIME(url).indexOf("quicktime") != -1) {
            obt += "CLASSID=\"clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B\" ";
            obt += "CODEBASE=\"http://www.apple.com/qtactivex/qtplugin.cab\" ";
        } else if (typeMIME(url).indexOf("realaudio") != -1) {
            obt += "CLASSID=\"clsid:CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA\" ";
            obt += "CODEBASE=\"http://???\" ";
        } else if (typeMIME(url).indexOf("shockwave") != -1) {
            obt += "CLASSID=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" ";
            obt += "CODEBASE=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=5,0,0,0\" ";
        } else {
            obt += "CLASSID=\"clsid:22D6F312-B0F6-11D0-94AB-0080C74C7E95\" ";
            obt += "CODEBASE=\"http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=5,0,0,0\" ";
        }
        obt += "WIDTH=\"" + "100%" + "\" HEIGHT=\"" + "100%" + "\" ALIGN=\"middle\">";
        if (typeMIME(url).indexOf("shockwave") != -1) {
            obt += "<PARAM NAME=\"MOVIE\" VALUE=\"" + url + "\">";
            obt += "<PARAM NAME=\"QUALITY\" VALUE=\"high\">";
        } else {
            obt += "<PARAM NAME=\"SRC\" VALUE=\"" + url + "\">";
        }
    } else {
        obt += "NAME=\"" + id + "\" DATA=\"" + url + "\" ";
        obt += "TYPE=\"" + typeMIME(url) + "\" ";
        obt += "WIDTH=\"" + "100%" + "\" HEIGHT=\"" + "100%" + "\" ALIGN=\"middle\">";
    }
    if (auto) {
        obt += "<PARAM NAME=\"AUTOSTART\" VALUE=\"true\">";
        obt += "<PARAM NAME=\"AUTOPLAY\" VALUE=\"true\">";
    } else {
        obt += "<PARAM NAME=\"AUTOSTART\" VALUE=\"false\">";
        obt += "<PARAM NAME=\"AUTOPLAY\" VALUE=\"false\">";
    }
    obt += "<PARAM NAME=\"CONTROLLER\" VALUE=\"true\">";
    obt += "<PARAM NAME=\"CONSOLE\" VALUE=\"" + id + "\">";
    obt += "<PARAM NAME=\"CONTROLS\" VALUE=\"" + console + "\">";
    return(obt);
}

// fin medias_baliseObject(id, url, auto, largeur, hauteur, console)
// insere un media audio
function insererAudio(id, url, auto, largeur, hauteur) {
    largeur = parseInt(largeur);
    hauteur = parseInt(hauteur);
    if ((!url) || (url == "")) {
        return false;
    }
    if (!auto) {
        auto = false;
    }
    if ((isNaN(largeur)) || (parseInt(largeur) < 1)) {
        largeur = 300;
    }
    if ((isNaN(hauteur)) || (parseInt(hauteur) < 1)) {
        hauteur = 45;
    }
    var txt;
    if (typeMIME(url).indexOf("realaudio") != -1) {
        //txt = medias_baliseObject(id, url, auto, largeur, hauteur, "ControlPanel");
    } else {
        //txt = medias_baliseObject(id, url, auto, largeur, hauteur, "console");
    }
    txt += "<EMBED NAME=\"" + "embed" + id + "\" SRC=\"" + url + "\" ";
    txt += "TYPE=\"" + typeMIME(url) + "\" MASTERSOUND ";
    if (typeMIME(url).indexOf("quicktime") != -1) {
        txt += "PLUGINSPAGE=\"http://www.apple.com/quicktime/download/\" ";
    } else if (typeMIME(url).indexOf("realaudio") == -1) {
        txt += "PLUGINSPAGE=\"http://www.microsoft.com/isapi/redir.dll?prd=windows&sbp=mediaplayer&ar=Media&sba=Plugin\" ";
    }
    txt += "WIDTH=\"" + "100%" + "\" HEIGHT=\"" + "100%" + "\" ";
    txt += "HIDDEN=\"false\" ALIGN=\"middle\" ";
    if (auto) {
        txt += "AUTOSTART=\"true\" AUTOPLAY=\"true\" ";
    }
    else {
        txt += "AUTOSTART=\"false\" AUTOPLAY=\"false\" ";
    }
    txt += "CONTROLLER=\"true\" CONSOLE=\"" + id + "\" ";
    if (typeMIME(url).indexOf("realaudio") != -1) {
        txt += "CONTROLS=\"ControlPanel\">";
    } else {
        txt += "CONTROLS=\"console\">";
    }
    txt += "</EMBED>";
    return(txt);
}
;
// fin insererAudio(id, url, auto, largeur, hauteur)
// insere une animation Flash
function insererFlash(id, url, largeur, hauteur) {
    largeur = parseInt(largeur);
    hauteur = parseInt(hauteur);
    if ((!url) || (url == "")) {
        return false;
    }
    if ((isNaN(largeur)) || (parseInt(largeur) < 1)) {
        largeur = 300;
    }
    if ((isNaN(hauteur)) || (parseInt(hauteur) < 1)) {
        hauteur = 225;
    }
    var txt = "";
    //txt = medias_baliseObject(id, url, true, largeur, hauteur, "");
    txt += "<EMBED NAME=\"" + "embed" + id + "\" SRC=\"" + url + "\" QUALITY=\"high\" ";
    txt += "TYPE=\"" + typeMIME(url) + "\" ";
    txt += "PLUGINSPAGE=\"http://www.macromedia.com/go/getflashplayer\" ";
    txt += "WIDTH=\"" + "100%" + "\" HEIGHT=\"" + "100%" + "\" ";
    txt += "HIDDEN=\"false\" ALIGN=\"middle\" ";
    txt += "AUTOSTART=\"true\" AUTOPLAY=\"true\" ";
    txt += "CONTROLLER=\"false\" CONSOLE=\"" + id + "\" CONTROLS=\"\">";
    txt += "</EMBED>";
    return(txt);
}
;
// fin insererFlash(id, url, largeur, hauteur)

// insere un media video
function insererVideo(id, url, auto, largeur, hauteur) {
    largeur = parseInt(largeur);
    hauteur = parseInt(hauteur);
    if ((!url) || (url == "")) {
        return false;
    }
    if (!auto) {
        auto = false;
    }
    if ((isNaN(largeur)) || (parseInt(largeur) < 1)) {
        largeur = 300;
    }
    if ((isNaN(hauteur)) || (parseInt(hauteur) < 1)) {
        hauteur = 270;
    }
    var txt = "";
    if (typeMIME(url).indexOf("realaudio") != -1) {
        //txt = medias_baliseObject(id, url, auto, largeur, hauteur, "ImageWindow,ControlPanel");
    } else {
        //txt = medias_baliseObject(id, url, auto, largeur, hauteur, "console");
    }
    txt += "<EMBED NAME=\"" + "embed" + id + "\" SRC=\"" + url + "\" ";
    txt += "TYPE=\"" + typeMIME(url) + "\" MASTERSOUND ";
    if (typeMIME(url).indexOf("quicktime") != -1) {
        txt += "PLUGINSPAGE=\"http://www.apple.com/quicktime/download/\" ";
    } else if (typeMIME(url).indexOf("realaudio") == -1) {
        txt += "PLUGINSPAGE=\"http://www.microsoft.com/isapi/redir.dll?prd=windows&sbp=mediaplayer&ar=Media&sba=Plugin\" ";
    }
    txt += "WIDTH=\"" + "100%" + "\" HEIGHT=\"" + "100%" + "\" ";
    txt += "HIDDEN=\"false\" ALIGN=\"middle\" ";
    if (auto) {
        txt += "AUTOSTART=\"true\" AUTOPLAY=\"true\" ";
    }
    else {
        txt += "AUTOSTART=\"false\" AUTOPLAY=\"false\" ";
    }
    txt += "CONTROLLER=\"true\" CONSOLE=\"" + id + "\" ";
    if (typeMIME(url).indexOf("realaudio") != -1) {
        txt += "CONTROLS=\"ImageWindow,ControlPanel\">";
    } else {
        txt += "CONTROLS=\"console\">";
    }
    txt += "</EMBED>";
    return(txt);
}
;
// fin insererVideo(id, url, auto, largeur, hauteur)

// retourne le type MIME du fichier d'URL specifiee
function typeMIME(url) {
    if ((!url) || (url == "")) {
        return ("inconnu");
    }
    var xts;
    var tab;
    if (url.indexOf("?") > 0)
        xts = url.substring(0, url.indexOf("?"));
    else
        xts = url;
    xts = (xts.substring(xts.lastIndexOf(".") + 1)).toLowerCase();
    if (xts.indexOf(" ") != -1)
        xts = xts.substring(0, xts.indexOf(" "));
    for (var i = 0; i < medias_ext.length; i++) {
        tab = medias_ext[i].split(',');
        for (var j = 0; j < tab.length; j++) {
            if (tab[j] == xts) return (medias_mim[i]);
        }
    }
    return ("application/octet-stream");
}
openbexi_medias.prototype.setData = function() {
}
openbexi_medias.prototype.getText = function() {
    return this.genericObject.getText();
}
openbexi_medias.prototype.getPopupAttributes = function() {
    return ob_media_popupAttributes;
}
openbexi_medias.prototype.getInspectorAttributes = function() {
    return ob_media_inspectorAttributes;
}
openbexi_medias.prototype.setSelected = function(objId) {
    this.genericObject.setSelected(objId);
    if (openbexiNavigator) openbexiNavigator.update_menu_editor(this, true);
    this.div.style.cursor = "pointer";
}
openbexi_medias.prototype.setUnSelected = function(objId) {
    try {
        this.genericObject.setUnSelected(objId);
        if (currentBexiObj_selected.type != this.type)
            this.openbexiNavigator.update_menu_editor(this, false);
    } catch (e) {
        __openbexi_debugC("openbexi_medias.prototype.setUnSelected()", "Exception:" + e.message);
    }
    this.div.style.cursor = "pointer";
}
openbexi_medias.prototype.getChildrenId = function() {
    var count = 0;
    var list = new Array();
    list[count++] = this.div.id;
    return list;
}
openbexi_medias.prototype.setAttribute = function(name, value) {
    return this.genericObject.setAttribute(this.getChildrenId(), name, value);
}
openbexi_medias.prototype.setURL = function(objId, eventStr, URL) {
    this.genericObject.setURL(objId, eventStr, URL);
}
openbexi_medias.prototype.unsetURL = function(objId, eventStr, URL) {
    this.genericObject.unsetURL(objId, eventStr, URL);
}
openbexi_medias.prototype.disableURLs = function() {
    this.genericObject.disableURLs();
}
openbexi_medias.prototype.enableURLs = function() {
    this.genericObject.enableURLs();
}
openbexi_medias.prototype.getSrc = function() {
    return "";
}
openbexi_medias.prototype.getURL = function(objId, eventStr) {
    return this.genericObject.getURL(objId, eventStr);
}
openbexi_medias.prototype.innerHTML_and_EVENTS = function(objId) {
    return document.getElementById(objId).innerHTML;
}
openbexi_medias.prototype.changeStyle = function(objBexi, direction) {
    this.genericObject.changeStyle(objBexi, this, direction);
}
openbexi_medias.prototype.removeObject = function(flag) {
    try {
        if(this.div.getAttribute("ob_template")== "true" && openbexiNavigator.HTML_pageName != "template.html")   return;
        var listIdChild = this.getChildrenId();
        if (listIdChild) {
            for (var j = 0; j < listIdChild.length; j++) {
                openbexi_deletePageData(null, "page", listIdChild[j], "ALL", null);
            }
        }
    }
    catch (e) {
    }
    this.genericObject.removeObject(this);
    ob_setDirty_flag(flag);
}
openbexi_medias.prototype.my_PickFunc = function(e) {
    openbexi_stopEventPropagation(e);
    var bexiObj = getSelectedBexiObj(this.id);
    my_PickFunc(bexiObj.div);
}
openbexi_medias.prototype.get_editor = function() {
    return this.openbexiNavigator.get_menu_editor(this.getPopupAttributes());
}
openbexi_medias.prototype.forward = function() {
    return this.genericObject.forward(this.div, "+");
}
openbexi_medias.prototype.backward = function() {
    return this.genericObject.backward(this.div, "-");
}
openbexi_medias.prototype.debug = function() {
    return this.genericObject.debug(this);
}
openbexi_medias.prototype.align_left_auto_arrange = function() {
    return this.genericObject.align_left_auto_arrange(this);
}
openbexi_medias.prototype.align_right_auto_arrange = function() {
    return this.genericObject.align_right_auto_arrange(this);
}
openbexi_medias.prototype.align_top_auto_arrange = function() {
    return this.genericObject.align_top_auto_arrange(this);
}
openbexi_medias.prototype.align_bottom_auto_arrange = function() {
    return this.genericObject.align_bottom_auto_arrange(this);
}
openbexi_medias.prototype.vertical_width_auto_resize = function() {
    return this.genericObject.vertical_width_auto_resize(this);
}
openbexi_medias.prototype.vertical_height_auto_resize = function() {
    return this.genericObject.vertical_height_auto_resize(this);
}
openbexi_medias.prototype.horizontal_width_auto_resize = function() {
    return this.genericObject.horizontal_width_auto_resize(this);
}
openbexi_medias.prototype.horizontal_height_auto_resize = function() {
    return this.genericObject.horizontal_height_auto_resize(this);
}
openbexi_medias.prototype.vertical_spacing_auto_arrange = function() {
    return this.genericObject.vertical_spacing_auto_arrange(this);
}
openbexi_medias.prototype.horizontal_spacing_auto_arrange = function() {
    return this.genericObject.horizontal_spacing_auto_arrange(this);
}
openbexi_medias.prototype.undo_auto_arrange = function() {
    return this.genericObject.undo_auto_arrange(this);
}
openbexi_medias.prototype.redo_auto_arrange = function() {
    return this.genericObject.redo_auto_arrange(this);
}
openbexi_medias.prototype.functions_to_load = function() {
    return this.genericObject.functions_to_load(this.div.id);
}
openbexi_medias.prototype.head_code = function() {
    return this.genericObject.head_code(this);
}
openbexi_medias.prototype.body_code = function() {
    return this.genericObject.body_code(this);
}
openbexi_medias.prototype.add = function(media) {
    // Do not add http media
    if (!media) return;
    if (media.match(RegExp("http:|https:"))) return;

    // Remove href if any
    if (media) media = media.replace(this.openbexiNavigator.hrefPath, "");

    var pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
    var medias = get_xml_classe_object_attributes(pageDoc, "page", "media");
    var already_in_list = false;
    if (medias != null) {
        for (var i = 0; i < medias.length; i++) {
            var mediaFile = get_xml_classe_object_attribut_value(pageDoc, "page", "media", medias[i].getAttribute("name"));
            if (mediaFile == media) {
                already_in_list = true;
            }
        }
    }
    var count = 0;
    if (medias) count = medias.length;
    if (!already_in_list)set_xml_classe_object_attribut_value(pageDoc, "page", "media", "file_" + count, media);
    OPENBEXI_PAGES_DATA_XML = openbexi_get_xmlString(pageDoc);
}
function save_media_CB(responseXML) {
    try {
        __openbexi_debugC_Medias("save_media_CB(" + responseXML + ")", "Info:");

        if (responseXML == null || responseXML == "") {
            if (openbexiNavigator) openbexiNavigator.status("save_media_CB bug ???");
            __openbexi_debugC_Medias("save_media_CB() Exception:", "No answer from the server");
            openbexi_unloading2();
            return;
        }

        var ob_doc = openbexi_get_documentElement(responseXML, "text/xml");

        var status = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "status", "text");
        if (status != "" && status != "done") {
            __openbexi_debugC_Medias("save_media_CB() Info:", "status=" + status);
            openbexiNavigator.top_frame_message(status, "50px", "error");
            return;
        }

        var appli_status = get_xml_classe_object_attribut_value(ob_doc, "openbexi_creative", "application", "status");
        if (appli_status != "") {
            __openbexi_debugC_Medias("save_media_CB() Info:", "appli_status=" + appli_status);
        }

        var exception = get_xml_classe_object_attribut_value(ob_doc, "openbexi_creative", "application", "exception");
        if (exception != "") __openbexi_debugC_Medias("save_media_CB() Exception:", exception);

        var filename = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "image", "filename");
        var project = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "dir", "project");
        var div_id = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "div", "name");

        if (appli_status == "CannotSaveFile") {
            openbexiNavigator.top_frame_message("Cannot save " + filename, "30px", "warning");
            return;
        }

        if (filename == "" || project == "")return;
        add_HTMLMedia(null, "project/" + project + "/gif/" + filename, null, null);
        getSelectedBexiObj(div_id).add("project/" + project + "/" + "/gif/" + filename);
        if (appli_status == "ok")
            openbexiNavigator.top_frame_message(filename + " successfully saved", "30px", "info");

    } catch (e) {
        __openbexi_debugC_Medias("save_media_CB()", "Exception:" + e.message);
    }
    openbexi_unloading2();

}

function openbexi_save_media(e, path_source2, filename2, codec) {
    try {
        openbexi_stopEventPropagation(e);
        var doc = null;
        var path_source = openbexi_system.openbexi_stringReplaceAll(path_source2, "-##-", " ");
        var filename = openbexi_system.openbexi_stringReplaceAll(filename2, "-##-", " ");
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_saveFileRequest");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "project", openbexiNavigator.projectName);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "image", "filename", filename);
        if (path_source != null) doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "image", "path_source", path_source);
        if (codec != null) doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "image", "codec", codec);
        var ob_xml = openbexi_get_xmlString(doc);

        var mode_sync = openbexi_synchron();
        openbexi_connect_to_server(null, mode_sync, ob_xml, save_media_CB);
    } catch (e) {
        __openbexi_debugC_Medias("openbexi_img.prototype.save_media()", "Exception:" + e.message);
    }
}
;
