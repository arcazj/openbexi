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
function __openbexi_debugC_xml(f, text) {
    try {
        __openbexi_debugC(f, text);
    } catch (e) {
    }
}
function openbexi_synchron() {
    if (!OPENBEXI_PRIVATE_CONTEXT_XML) return false;
    var ob_doc = openbexi_get_documentElement(OPENBEXI_PRIVATE_CONTEXT_XML, "text/xml");
    var synchro = get_xml_classe_object_attribut_value(ob_doc, "bexicontext", "connection", "synchron");
    if (synchro == "") return false;
    return synchro == "true";
}
function openbexi_xml_alert(message, color) {
    if (document.getElementById("ob_status")) {
        document.getElementById("ob_status").innerHTML = message;
        document.getElementById("ob_status").style.background = color;
        document.getElementById("ob_status").style.height = "30px";
    }
}

function openbexi_set_OPENBEXI_PRIVATE_CONTEXT_XML(xml_data) {
    OPENBEXI_PRIVATE_CONTEXT_XML = xml_data;
}

function openbexi_set_OPENBEXI_PAGES_DATA_XML(xml_data) {
    OPENBEXI_PAGES_DATA_XML = xml_data;
}

function openbexi_readXML_CB(responseXML) {
    var ob_doc = openbexi_get_documentElement(responseXML, "text/xml");
    var ob_type = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "xml", "ob_type");
    if (ob_type == "OPENBEXI_PRIVATE_CONTEXT_XML")
        openbexi_set_OPENBEXI_PRIVATE_CONTEXT_XML(get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "OPENBEXI_PRIVATE_CONTEXT_XML", "text"));
    if (ob_type == "OPENBEXI_PAGES_DATA_XML")
        openbexi_set_OPENBEXI_PRIVATE_CONTEXT_XML(get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "OPENBEXI_PAGES_DATA_XML", "text"));
    if (ob_type == "OPENBEXI_TEMPLATE_DATA_XML")
        openbexi_set_OPENBEXI_PRIVATE_CONTEXT_XML(get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "OPENBEXI_TEMPLATE_DATA_XML", "text"));
    if (ob_type == "OPENBEXI_PUBLIC_CONTEXT_XML")
        openbexi_set_OPENBEXI_PRIVATE_CONTEXT_XML(get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "OPENBEXI_PUBLIC_CONTEXT_XML", "text"));
    try {
        if (openbexiNavigator) openbexiNavigator.reset();
    } catch (e) {
    }
}
function openbexi_loadXMLFile(file) {
    try {
        var xmlDoc;
        xmlDoc = openbexi_xmldoc();
        xmlDoc.load(file);
        return openbexi_get_xmlString(xmlDoc);
    }
    catch (e) {
        //alert("openbexi_loadXMLFile:" + e.message + "\nfile=" + file);
    }
    return null;
}
function openbexi_clearXMLFile_passwd(docXML) {
    var doc = openbexi_get_documentElement(docXML, "text/xml");
    var count = 0;
    while (get_xml_classe_object_attribut_value(doc, "ob_ssh", "connection_" + count++, "host") != "" && get_xml_classe_object_attribut_value(doc, "ob_ssh", "connection_" + count, "PublicKey") != "") {
        doc = set_xml_classe_object_attribut_value(doc, "ob_ssh", "connection_" + count, "passwd", "");
    }
    count = 0;
    while (get_xml_classe_object_attribut_value(doc, "ob_database", "database_" + count++, "url") != "" && get_xml_classe_object_attribut_value(doc, "ob_database", "database_" + count, "driver") != "")
        doc = set_xml_classe_object_attribut_value(doc, "ob_database", "database_" + count, "passwd", "");
    return openbexi_get_xmlString(doc);
}
function openbexi_saveXML_CB(responseXML) {
    try {
        var ob_doc = openbexi_get_documentElement(responseXML, "text/xml");
        var status = get_xml_classe_object_attribut_value(ob_doc, "openbexi_creative", "application", "status");

        if (status != "ok") {
            __openbexi_debugC("openbexi_saveXML_CB()", "Error:" + "Cannot save file");
            return;
        } else {
            __openbexi_debugC("openbexi_saveXML_CB()", "Info:" + "File successfully saved");
        }
        if (openbexiNavigator.mode == "save_before_publishing" || openbexiNavigator.mode == "save_project_before_publishing") {
            openbexi_unloading2();
            ob_setDirty_flag(true);
            openbexi_save_HTML_page(false, "true", "true");
            ob_setDirty_flag(false);
        } else
            if (openbexiNavigator) openbexiNavigator.reset();
    } catch (e) {
    }
}
function openbexi_saveXMLFile(file, docXML) {
    try {
        if (file == null) alert("openbexi_saveXMLFile: Cannot save a null file ...");
        if (docXML == null) alert("openbexi_saveXMLFile: Cannot save a  file with no data ...");
        if (file == "private_bexicontext.xml") docXML = openbexi_clearXMLFile_passwd(docXML);
        var doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "project", openbexiNavigator.projectName);
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_saveFileRequest");
        doc = set_xml_classe_object_attribut_value(doc, "file", "xml", "name", file);
        var ob_xml = openbexi_get_xmlString(doc);
        try {
            var mode_sync = openbexi_synchron();
            openbexi_connect_to_server(null, mode_sync, ob_xml + "\n " + docXML, openbexi_saveXML_CB);
        } catch(e) {
            alert("\nCannot save file\n\nError message: " + e.message);
        }
    } catch (e) {
        alert("openbexi_saveXMLFile:" + e.message);
    }
}
function openbexi_initPageData(e) {
    try {
        openbexi_stopEventPropagation(e);
    } catch (e) {
    }
    OPENBEXI_PAGES_DATA_XML = openbexi_loadXMLFile(openbexiNavigator.HTML_short_pageName + ".xml");
    if (OPENBEXI_PAGES_DATA_XML == null || OPENBEXI_PAGES_DATA_XML == "") {
        var doc = set_xml_classe_object_attribut_value(null, "page", "init", "init", "init");
        OPENBEXI_PAGES_DATA_XML = openbexi_get_xmlString(doc);
        //openbexi_savePageData(e);
    }
}
function openbexi_deletePageData(e, classe, object, attribute, value) {
    try {
        openbexi_stopEventPropagation(e);
    } catch (e) {
    }
    if (OPENBEXI_PAGES_DATA_XML == null) {
        openbexi_initPageData(e);
    }
    var doc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
    try {
        if (object == "ALL")
            doc = delete_xml_classe(doc, classe);
        else if (attribute == "ALL")
            doc = delete_xml_classe_object(doc, classe, object);
        else
            doc = delete_xml_classe_object_attribut_value(doc, classe, object, attribute, value);
    } catch (e) {
    }
    OPENBEXI_PAGES_DATA_XML = openbexi_get_xmlString(doc);
}

function openbexi_updatePageData(e, classe, object, attribute, value) {
    try {
        openbexi_stopEventPropagation(e);
    } catch (e) {
    }
    if (OPENBEXI_PAGES_DATA_XML == null) {
        openbexi_initPageData(e);
    }
    var doc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
    doc = set_xml_classe_object_attribut_value(doc, classe, object, attribute, value);
    OPENBEXI_PAGES_DATA_XML = openbexi_get_xmlString(doc);
}
;
function openbexi_getPageInfo(e, data, classeName, objectName) {
    try {
        openbexi_stopEventPropagation(e);
    } catch (e) {
    }
    var info = "";
    try {
        if (data == null) openbexi_initPageData(e);
        var doc = openbexi_get_documentElement(data, "text/xml");
        var classe;
        var classeFound = false;
        var classes = doc.getElementsByTagName("classe");
        // Look for classe
        if (classes.length == 0) {
            return "";
        } else {
            for (i = 0; i < classes.length; i++) {
                if (classes[i].getAttribute("name") == classeName) {
                    classe = classes[i];
                    classeFound = true;
                    break;
                }
            }
        }
        if (!classeFound) return "";
        // Look for object
        var attributes;
        var objectCurrentName;
        var attributeName;
        var objects = classe.getElementsByTagName("object");
        if (objects.length == 0) {
            return info;
        } else {
            for (var i = 0; i < objects.length; i++) {
                // Look for attribute
                attributes = objects[i].getElementsByTagName("attribute");
                objectCurrentName = objects[i].getAttribute("name");
                if (attributes.length == 0) {
                    return info;
                } else {
                    for (var j = 0; j < attributes.length; j++) {
                        attributeName = attributes[j].getAttribute("name");
                        if (objectName == undefined) {
                            if (j == 1)
                                info += "\n   ----" + objectCurrentName + ":\n";
                            info += attributeName + ":" + attributes[j].getAttribute(attributeName) + "  ";
                        }
                        else
                            if (objectName == objectCurrentName)info += classeName + "." + objectName + "." + attributeName + ":" + attributes[j].getAttribute(attributeName) + "\n";
                    }
                }
            }
        }
        return info;
    } catch (e) {
        return info;
    }
}

function openbexi_getPageData(e, classe, object, attribute) {
    try {
        openbexi_stopEventPropagation(e);
    } catch (e) {
    }
    try {
        if (OPENBEXI_PAGES_DATA_XML == null) openbexi_initPageData(e);
        var doc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
        return get_xml_classe_object_attribut_value(doc, classe, object, attribute);
    } catch (e) {
        return "";
    }
}

function openbexi_savePageData(e) {
    try {
        openbexi_stopEventPropagation(e);
    } catch (e) {
    }
    // Remove passwd data for secure reason before saving
    var data = "-1";
    var count = 0;
    var doc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
    while (data != "") {
        data = get_xml_classe_object_attribut_value(doc, "ob_publisher", "passwd_" + count, openbexiNavigator.HTML_pageName);
        if (data != "")
            doc = set_xml_classe_object_attribut_value(doc, "ob_publisher", "passwd_" + count, openbexiNavigator.HTML_pageName, "");
    }
    OPENBEXI_PAGES_DATA_XML = openbexi_get_xmlString(doc);
    //alert(openbexiNavigator.openbexi_home_directory +openbexiNavigator.HTML_short_pageName + ".xml"+"\n"+ OPENBEXI_PAGES_DATA_XML)
    if (OPENBEXI_PAGES_DATA_XML != null) {
        openbexi_saveXMLFile("project/" + openbexiNavigator.projectName + "/data/" + openbexiNavigator.HTML_short_pageName + ".xml", OPENBEXI_PAGES_DATA_XML);
    }
}

function openbexi_updateWebPrivateData(e, classe, object, attribute, value) {
    try {
        openbexi_stopEventPropagation(e);
    } catch (e) {
    }
    if (OPENBEXI_PRIVATE_CONTEXT_XML == null || OPENBEXI_PRIVATE_CONTEXT_XML == "") {
        return;
    }
    var doc = openbexi_get_documentElement(OPENBEXI_PRIVATE_CONTEXT_XML, "text/xml");
    doc = set_xml_classe_object_attribut_value(doc, classe, object, attribute, value);
    openbexi_set_OPENBEXI_PRIVATE_CONTEXT_XML(openbexi_get_xmlString(doc));
}
function openbexi_getWebPrivateData(e, classe, object, attribute) {
    try {
        openbexi_stopEventPropagation(e);
    } catch (e) {
    }
    if (OPENBEXI_PRIVATE_CONTEXT_XML == null || OPENBEXI_PRIVATE_CONTEXT_XML == "") {
        return "";
    }
    var doc = openbexi_get_documentElement(OPENBEXI_PRIVATE_CONTEXT_XML, "text/xml");
    return get_xml_classe_object_attribut_value(doc, classe, object, attribute);
}
function openbexi_savePrivateData(e) {
    try {
        openbexi_stopEventPropagation(e);
    } catch (e) {
    }
    if (OPENBEXI_PRIVATE_CONTEXT_XML != null && OPENBEXI_PRIVATE_CONTEXT_XML != "")
        openbexi_saveXMLFile("private_bexicontext.xml", OPENBEXI_PRIVATE_CONTEXT_XML);
}
function openbexi_stringReplaceAll(str, from, to) {
    if (from == to) return str;
    try {
        var idx = str.indexOf(from);
        while (idx > -1) {
            str = str.replace(from, to);
            idx = str.indexOf(from);
        }
        return str;
    } catch(e) {
        alert("\nopenbexi_system.prototype.openbexi_stringReplaceAll():" + e.name + ". Error message: " + e.message);
        return null;
    }
}
;
function openbexi_get_href_directory(path) {
    try {
        var sPathTmp = path;
        sPathTmp = openbexi_stringReplaceAll(sPathTmp, "\\", "/");
        var sPage = sPathTmp.substring(sPathTmp.lastIndexOf('\/') + 1);
        return sPathTmp.replace(sPage, "");
    } catch(e) {
        alert("openbexi_get_home_directory():" + e.name + ". Error message: " + e.message);
        return null;
    }
}
function openbexi_ping_CB() {
    /*var ob_doc = openbexi_get_documentElement(responseXML, "text/xml");
     var status = get_xml_classe_object_attribut_value(ob_doc, "openbexi_creative", "application", "status");
     if (status != "ok") {
     }*/
}

function openbexi_ping(call_back) {
    var doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_pingRequest");
    var ob_xml = openbexi_get_xmlString(doc);
    try {
        var mode_sync = openbexi_synchron();
        if (call_back == null || call_back == undefined)
            return openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_ping_CB, null);
        else
            return openbexi_connect_to_server(null, mode_sync, ob_xml, call_back, null);
    } catch(e) {
        this.status("Sorry, not connected ...", "red");
        return null;
    }
}
function openbexi_connect_to_server(formName, mode_sync, request, openbexi_CB, loaded_obj, message) {
    var error = false;
    try {
        if (openbexiNavigator.working) {
            __openbexi_debugC_xml("openbexi_connect_to_server()", "Error: Cannot process your request, because the navigator is still working ...");
            return null;
        }
        if (loaded_obj != undefined)openbexi_loading2(loaded_obj, message);
    } catch(e) {
    }
    try {
        if (mode_sync) {
            if (formName) document.getElementById(formName).submit();
        } else {
            var req = openbexi_ajax_obj();
            // Set the handler function to receive callback notifications from the request object
            req.onreadystatechange = open_bexi_getReadyStateHandler(req, openbexi_CB);
            // Open an HTTP POST connection to servlet.Third parameter specifies request is asynchronous.
            var url;
            if (document.getElementById("bexicontext.connection.url") == null || document.getElementById("bexicontext.connection.url") == undefined) {
                url = openbexi_get_href_directory(window.location.href) + "/openbexi.do";
            }
            else {
                url = document.getElementById("bexicontext.connection.url").value;
            }
            req.open("POST", url, true);
            // Specify that the body of the request contains form data
            req.setRequestHeader("Content-Type", "text/xml");
            req.send(request);
        }
    }
    catch(e) {
        __openbexi_debugC_xml("openbexi_unloading2()", "Error:Connection to server failed\nError message: " + e.message);
        document.getElementById("SaveFrame").setAttribute("ob_connection", "false");
        error = true;
        openbexi_unloading2();
    }
    return error;
}
function openbexi_ajax_obj() {
    var xmlreq = false;
    if (window.XMLHttpRequest) {
        // Create XMLHttpRequest object in non-Microsoft browsers
        xmlreq = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        // Create XMLHttpRequest via MS ActiveX
        try {
            // Try to create XMLHttpRequest in later versions of Internet Explorer
            xmlreq = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e1) {
            if (document.getElementById("ob_text_connectionDetails"))
                document.getElementById("ob_text_connectionDetails").value = "Cannot create (Msxml2.XMLHTTP) AJAX object" + " [openbexi_ajax_obj()]";
            try {
                // Try version supported by older versions of Internet Explorer
                xmlreq = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e2) {
                // Unable to create an XMLHttpRequest with ActiveX

            }
        }
    }
    return xmlreq;
}
;
window.onerror = openbexi_errorHandler;
function open_bexi_getReadyStateHandler(req, responseXmlHandler) {
    return function () {
        // If the request's status is "complete"
        if (req.readyState == 4) {
            // Check that a successful server response was received
            if (req.status == 200) {
                //alert("open_bexi_getReadyStateHandler (7)------ req.responseXML=\n" + req.responseXML);
                //alert("open_bexi_getReadyStateHandler (7)------ req.responseText=\n" + req.responseText);
                responseXmlHandler(req.responseText);
            } else {
                // An HTTP problem has occurred
                if (openbexiNavigator != null && openbexiNavigator.top_frame_message != null)
                    openbexiNavigator.top_frame_message("Server not available ...", "40px", "error");
                if (openbexiNavigator != null && openbexiNavigator.frame_message != null)
                    openbexiNavigator.frame_message("ob_menu_RequestBrowser_text", "Server openBEXI not available. Sorry your request cannot be processed ...", "error", "40px");

            }
        }
    };
}
;
function openbexi_errorHandler(message, url, line)
{
    if (document.getElementById("ob_text_connectionDetails"))
        document.getElementById("ob_text_connectionDetails").value = "Error loading file!" + "\n" + message + "=" + line + " [openbexi_errorHandler()]";
    try {
        if (openbexiNavigator) openbexiNavigator.status(message + "=" + line, "red");
        openbexiNavigator.status(message + "\n" + url.replace(window.location.href.replace("openbexi.do", ""), "") + " (line:" + line + ")", "red");
    } catch (e) {

    }
    return true;
}
;
function openbexi_xmldoc() {
    var openbexi_xmlRequest = null;
    var openbexi_xmldoc = null;
    var openbexi_xmlElt;
    if (document.implementation && document.implementation.createDocument)
    {
        openbexi_xmldoc = document.implementation.createDocument("", "", null);
        openbexi_xmldoc.async = false;
    }
    else if (window.ActiveXObject)
    {
        openbexi_xmldoc = new ActiveXObject("Microsoft.XMLDOM");
        openbexi_xmldoc.async = false;
    }
    else
    {
        alert('Your browser can\'t handle the file:' + openbexi_xmldoc);
        return;
    }
    return openbexi_xmldoc;
}
;
function openbexi_loadXMLDocument(txt) {
    var xmlDoc;
    try //Internet Explorer
    {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = "false";
        xmlDoc.loadXML(txt);
        return xmlDoc;
    }
    catch(e)
    {
        var parser = new DOMParser();
        xmlDoc = parser.parseFromString(txt, "text/xml");
        return xmlDoc;
    }
}
;
function get_xml_classes(doc) {
    if (!doc)  return null;
    return doc.getElementsByTagName("classe");
}
;
function get_xml_classesName(doc) {
    if (!doc)  return null;
    var classes = doc.getElementsByTagName("classe");
    var classeNameList = new Array(classes.length);
    for (var i = 0; i < classes.length; i++) {
        classeNameList[i] = classes[i].getAttribute("name");
    }
    return classeNameList;
}

function get_xml_classe_objects(doc, classeName) {
    if (!doc)  return null;
    var classe;
    var classeFound = false;
    var classes = doc.getElementsByTagName("classe");
    // Look for classe
    if (classes.length == 0) {
        return null;
    } else {
        for (var i = 0; i < classes.length; i++) {
            if (classes[i].getAttribute("name") == classeName) {
                classe = classes[i];
                classeFound = true;
                break;
            }
        }
    }
    if (!classeFound) return null;
    // Look for object
    var objects = classe.getElementsByTagName("object");
    if (objects.length == 0) {
        return null;
    } else {
        return objects;
    }
}

function get_xml_classe_objectsName(doc, classeName) {
    if (!doc)  return null;
    var classe;
    var classeFound = false;
    var classes = doc.getElementsByTagName("classe");
    // Look for classe
    if (classes.length == 0) {
        return null;
    } else {
        for (var i = 0; i < classes.length; i++) {
            if (classes[i].getAttribute("name") == classeName) {
                classe = classes[i];
                classeFound = true;
                break;
            }
        }
    }
    if (!classeFound) return null;
    // Look for object
    var objects = classe.getElementsByTagName("object");
    if (objects.length == 0) {
        return null;
    } else {
        var objectNameList = new Array(objects.length);
        for (i = 0; i < objects.length; i++) {
            objectNameList[i] = objects[i].getAttribute("name");
        }
        return objectNameList;
    }
}

function get_xml_classe_object_count(doc, classeName) {
    if (!doc)  return null;
    var classe;
    var classeFound = false;
    var classes = doc.getElementsByTagName("classe");
    // Look for classe
    if (classes.length == 0) {
        return null;
    } else {
        for (var i = 0; i < classes.length; i++) {
            if (classes[i].getAttribute("name") == classeName) {
                classe = classes[i];
                classeFound = true;
                break;
            }
        }
    }
    if (!classeFound) return 0;
    return classe.getElementsByTagName("object").length;
}

function get_xml_classe_object(doc, classeName, item) {
    if (!doc)  return null;
    var classe;
    var classeFound = false;
    var classes = doc.getElementsByTagName("classe");
    // Look for classe
    if (classes.length == 0) {
        return null;
    } else {
        for (var i = 0; i < classes.length; i++) {
            if (classes[i].getAttribute("name") == classeName) {
                classe = classes[i];
                classeFound = true;
                break;
            }
        }
    }
    if (!classeFound) return null;
    // Look for object
    var object;
    var objectFound = false;
    var objects = classe.getElementsByTagName("object");
    if (objects.length < item) {
        return null;
    } else {
        return objects[item];
    }
}

function get_xml_classe_object_attributes(doc, classeName, objectName) {
    if (!doc)  return null;
    var classe;
    var classeFound = false;
    var classes = doc.getElementsByTagName("classe");
    // Look for classe
    if (classes.length == 0) {
        return null;
    } else {
        for (var i = 0; i < classes.length; i++) {
            if (classes[i].getAttribute("name") == classeName) {
                classe = classes[i];
                classeFound = true;
                break;
            }
        }
    }
    if (!classeFound) return null;
    // Look for object
    var object;
    var objectFound = false;
    var objects = classe.getElementsByTagName("object");
    if (objects.length == 0) {
        return null;
    } else {
        for (var i = 0; i < objects.length; i++) {
            if (objects[i].getAttribute("name") == objectName) {
                object = objects[i];
                objectFound = true;
                break;
            }
        }
        if (!objectFound) {
            return null;
        }
    }
    // Look for attributes
    var attributes = object.getElementsByTagName("attribute");
    if (attributes.length == 0) {
        return null;
    } else {
        return attributes;
    }
}

function get_xml_classe_object_attributesName(doc, classeName, objectName) {
    if (!doc)  return null;
    var classe;
    var classeFound = false;
    var classes = doc.getElementsByTagName("classe");
    // Look for classe
    if (classes.length == 0) {
        return null;
    } else {
        for (i = 0; i < classes.length; i++) {
            if (classes[i].getAttribute("name") == classeName) {
                classe = classes[i];
                classeFound = true;
                break;
            }
        }
    }
    if (!classeFound) return null;
    // Look for object
    var object;
    var objectFound = false;
    var objects = classe.getElementsByTagName("object");
    if (objects.length == 0) {
        return null;
    } else {
        for (var i = 0; i < objects.length; i++) {
            if (objects[i].getAttribute("name") == objectName) {
                object = objects[i];
                objectFound = true;
                break;
            }
        }
        if (!objectFound) {
            return null;
        }
    }
    // Look for attributes
    var attributes = object.getElementsByTagName("attribute");
    if (attributes.length == 0) {
        return null;
    } else {
        var attributetNameList = new Array(objects.attributes);
        for (i = 0; i < attributes.length; i++) {
            attributetNameList[i] = attributes[i].getAttribute("name");
        }
        return attributetNameList;
    }
}
;
function get_xml_classe_object_attribut_value(doc, classeName, objectName, attributName) {
    if (!doc)  return "";
    var classe;
    var classeFound = false;
    var classes = doc.getElementsByTagName("classe");
    // Look for classe
    if (classes.length == 0) {
        return "";
    } else {
        for (i = 0; i < classes.length; i++) {
            if (classes[i].getAttribute("name") == classeName) {
                classe = classes[i];
                classeFound = true;
                break;
            }
        }
    }
    if (!classeFound) return "";
    // Look for object
    var object;
    var objectFound = false;
    var objects = classe.getElementsByTagName("object");
    if (objects.length == 0) {
        return "";
    } else {
        for (i = 0; i < objects.length; i++) {
            if (objects[i].getAttribute("name") == objectName) {
                object = objects[i];
                objectFound = true;
                break;
            }
        }
        if (!objectFound) {
            return "";
        }
    }
    // Look for attribute
    var attribute;
    var attributes = object.getElementsByTagName("attribute");
    if (attributes.length == 0) {
        return "";
    } else {
        for (var i = 0; i < attributes.length; i++) {
            if (attributes[i].getAttribute("name") == attributName || attributName == "name") {
                return attributes[i].getAttribute(attributName);
            }
        }
    }
    return "";
}
;
function set_xml_classe_object(doc, classeName, object) {
    var root = null;
    if (!doc) {
        doc = openbexi_xmldoc();
        root = doc.createElement("openbexiCreative");
        doc.appendChild(root);
    }
    if (!root) {
        var roots = doc.getElementsByTagName("openbexiCreative");
        if (roots.length == 0) {
            root = doc.createElement("openbexiCreative");
            doc.appendChild(root);
        }
        root = roots[0];
    }

    var classe;
    var classeFound = false;
    var classes = root.getElementsByTagName("classe");
    // Create or update classe
    if (classes.length == 0) {
        classe = doc.createElement("classe");
        classe.setAttribute("name", classeName);
    } else {
        for (var i = 0; i < classes.length; i++) {
            if (classes[i].getAttribute("name") == classeName) {
                classe = classes[i];
                classeFound = true;
            }
        }
        if (!classeFound) {
            classe = doc.createElement("classe");
            classe.setAttribute("name", classeName);
        }
    }
    try {
        classe.appendChild(object);
        root.appendChild(classe);
    } catch (e) {
        //alert("classe="+classeName+"\n"+"object="+objectName+"\n"+"attribute="+attributName+"\nattributName="+value+"\n"+e+"\n"+doc) ;
    }
    return doc;
}
;
function set_xml_classe_object_attribut_value(doc, classeName, objectName, attributName, value) {
    var root = null;
    if (!doc) {
        doc = openbexi_xmldoc();
        root = doc.createElement("openbexiCreative");
        doc.appendChild(root);
    }
    if (!root) {
        var roots = doc.getElementsByTagName("openbexiCreative");
        if (roots.length == 0) {
            root = doc.createElement("openbexiCreative");
            doc.appendChild(root);
        }
        root = roots[0];
    }

    var classe;
    var classeFound = false;
    var classes = root.getElementsByTagName("classe");
    // Create or update classe
    if (classes.length == 0) {
        classe = doc.createElement("classe");
        classe.setAttribute("name", classeName);
    } else {
        for (i = 0; i < classes.length; i++) {
            if (classes[i].getAttribute("name") == classeName) {
                classe = classes[i];
                classeFound = true;
            }
        }
        if (!classeFound) {
            classe = doc.createElement("classe");
            classe.setAttribute("name", classeName);
        }
    }
    // Create or update object
    var object;
    var objectFound = false;
    var objects = classe.getElementsByTagName("object");
    if (objects.length == 0) {
        object = doc.createElement("object");
        object.setAttribute("name", objectName);
    } else {
        for (i = 0; i < objects.length; i++) {
            if (objects[i].getAttribute("name") == objectName) {
                object = objects[i];
                objectFound = true;
            }
        }
        if (!objectFound) {
            object = doc.createElement("object");
            object.setAttribute("name", objectName);
        }
    }
    // Create or update attribute
    var attribute;
    var attributeFound = false;
    var attributes = object.getElementsByTagName("attribute");
    if (attributes.length == 0) {
        attribute = doc.createElement("attribute");
        attribute.setAttribute("name", attributName);
    } else {
        for (var i = 0; i < attributes.length; i++) {
            if (attributes[i].getAttribute("name") == attributName || attributName == "name") {
                attribute = attributes[i];
                attributeFound = true;
            }
        }
        if (!attributeFound) {
            attribute = doc.createElement("attribute");
            attribute.setAttribute("name", attributName);
        }
    }
    try {
        attribute.setAttribute(attributName, value);
        object.appendChild(attribute);
        classe.appendChild(object);
        root.appendChild(classe);
    } catch (e) {
        //alert("classe="+classeName+"\n"+"object="+objectName+"\n"+"attribute="+attributName+"\nattributName="+value+"\n"+e+"\n"+doc) ;
    }
    return doc;
}
;
function delete_xml_classe(doc, classeName) {
    var root = null;
    if (!doc) {
        return null;
    }
    if (!root) {
        var roots = doc.getElementsByTagName("openbexiCreative");
        root = roots[0];
    }

    var classe;
    var classeFound = false;
    var classes = root.getElementsByTagName("classe");
    // Create or update classe
    if (classes.length != 0) {
        for (var i = 0; i < classes.length; i++) {
            if (classes[i].getAttribute("name") == classeName) {
                classe = classes[i];
                root.removeChild(classe);
                return doc;
            }
        }
    }
    return doc;
}
;
function delete_xml_classe_object(doc, classeName, objectName) {
    var root = null;
    if (!doc) {
        return null;
    }
    if (!root) {
        var roots = doc.getElementsByTagName("openbexiCreative");
        root = roots[0];
    }

    var classe;
    var classeFound = false;
    var classes = root.getElementsByTagName("classe");
    // Create or update classe
    if (classes.length != 0) {
        for (var i = 0; i < classes.length; i++) {
            if (classes[i].getAttribute("name") == classeName) {
                classe = classes[i];
                classeFound = true;
            }
        }
    }
    // Create or update object
    var object;
    var objectFound = false;
    if (classe != undefined) {
        var objects = classe.getElementsByTagName("object");
        if (objects.length != 0) {
            for (var i = 0; i < objects.length; i++) {
                if (objects[i].getAttribute("name") == objectName) {
                    object = objects[i];
                    classe.removeChild(object);
                    return doc;
                }
            }
        }
    }
    return doc;
}
;
function delete_xml_classe_object_attribut_value(doc, classeName, objectName, attributName, value) {
    var root = null;
    if (!doc) {
        return null;
    }
    if (!root) {
        var roots = doc.getElementsByTagName("openbexiCreative");
        root = roots[0];
    }

    var classe;
    var classeFound = false;
    var classes = root.getElementsByTagName("classe");
    // Create or update classe
    if (classes.length != 0) {
        for (var i = 0; i < classes.length; i++) {
            if (classes[i].getAttribute("name") == classeName) {
                classe = classes[i];
                classeFound = true;
            }
        }
    }
    // Create or update object
    var object;
    var objectFound = false;
    var objects = classe.getElementsByTagName("object");
    if (objects.length != 0) {
        for (var i = 0; i < objects.length; i++) {
            if (objects[i].getAttribute("name") == objectName) {
                object = objects[i];
                objectFound = true;
            }
        }
    }
    // find attribute
    var attribute;
    var attributeFound = false;
    var attributes = object.getElementsByTagName("attribute");
    if (attributes.length != 0) {
        for (var i = 0; i < attributes.length; i++) {
            if (attributes[i].getAttribute("name") == attributName) {
                attribute = attributes[i];
                object.removeChild(attribute);
                return doc;
            }
        }
    }
    return doc;
}

/* IE support */
if (!window.XMLSerializer) {
    var XMLSerializer = new Function();
    XMLSerializer.prototype.serializeToString = function(e) {
        return e.xml;
    };
}

/* IE support */
if (!window.DOMParser) {
    if (typeof DOMParser == "undefined") {
        DOMParser = function () {
        };

        DOMParser.prototype.parseFromString = function (str, contentType) {
            if (typeof ActiveXObject != "undefined") {
                var d = new ActiveXObject("MSXML2.DomDocument");
                d.loadXML(str);
                return d;
            } else if (typeof XMLHttpRequest != "undefined") {
                var req = new XMLHttpRequest;
                req.open("GET", "data:" + (contentType || "application/xml") + ";charset=utf-8," + encodeURIComponent(str), false);
                if (req.overrideMimeType) {
                    req.overrideMimeType(contentType);
                }
                req.send(null);
                return req.responseXML;
            }
        };
    }
}

var ob_parser = new DOMParser();
function openbexi_get_documentElement(xml, mine) {
    try {
        //var parser = new DOMParser();
        return ob_parser.parseFromString(xml, mine);
    } catch(e) {
        alert("openbexi_get_documentElement:" + e.name + ". Error message: " + e.message);
        return null;
    }
}

var ob_serializer = new XMLSerializer();
function openbexi_get_xmlString(doc) {
    try {
        //var serializer = new XMLSerializer();
        return ob_serializer.serializeToString(doc);

    } catch(e) {
        alert("openbexi_get_xmlString: :" + e.name + ". Error message: " + e.message);
        return null;
    }
}

function openbexi_server_CB(responseXML) {
    //str_debug = "";
    var count = 0;
    var attributeValue = "";
    var items = null;
    var attributeName = null;
    //str_debug += "-------------responseXML:" + responseXML;
    var ob_doc = openbexi_get_documentElement(responseXML, "text/xml");
    //str_debug += "\n\n------------ob_doc:" + ob_doc;

    var inputs = document.getElementsByTagName("input");
    //str_debug += "inputs.length=" + inputs.length + "\n";
    for (var i = 0; i < inputs.length; i++) {
        try {
            attributeName = inputs[i].getAttribute("id");
            if (attributeName != null) {
                items = attributeName.split(/\./);
                //str_debug += "attributeName=" + attributeName + "   ---items.length=" + items.length + "\n";
                if (items.length == 3) {
                    attributeValue = get_xml_classe_object_attribut_value(ob_doc, items[0], items[1], items[2]);
                    //str_debug += inputs[i].id + "-->" + count++ + ": " + " " + items[0] + " " + items[1] + " " + items[2] + " value=" + attributeValue + "\n";
                    if (inputs[i].type == "text" || inputs[i].type == "passwd")
                        inputs[i].value = attributeValue;
                    if (inputs[i].type == "checkbox") {
                        inputs[i].checked = attributeValue == "true";
                    }
                }
            }
        } catch(e) {
            // str_debug += "Error message: " + e.message;
            if (document.getElementById("ob_text_connectionDetails")) document.getElementById("ob_text_connectionDetails").value = "openbexi_server_CB, problem for " + inputs[i].name + " " + e.name + ". Error message: " + e.message;
        }
    }
    //__openbexi_debugC_xml("openbexi_server_CB", str_debug);
    if (document.getElementById("ob_text_connectionDetails")) {
        document.getElementById("ob_text_connectionDetails").value += "openbexi_server_CB: ok\n";
    }
    try {
        if (openbexiNavigator) openbexiNavigator.reset();
    } catch(e) {
    }
}

function openbexi_sendContext_to_Server(request_type) {

    var doc = null;
    var mode_sync = openbexi_synchron();
    doc = openbexi_get_documentElement(OPENBEXI_PRIVATE_CONTEXT_XML, "text/xml");
    doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "project", openbexiNavigator.projectName);
    doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", request_type);
    var ob_xml = openbexi_get_xmlString(doc);
    document.getElementById("SaveFrame").setAttribute("ob_connection", "true");
    //__openbexi_debugC_xml("openbexi_sendContext_to_Server", OPENBEXI_PRIVATE_CONTEXT_XML);
    var error = openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_server_CB);
    if (error) document.getElementById("SaveFrame").setAttribute("ob_connection", "false");
}
