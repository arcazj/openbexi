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

var openbexi_LNRequest1 = null;
var openbexi_LNtype = null;
var openbexi_LNRequestNewModel = null;

var openbexi_MetaDataRequest = null;
var openbexi_MetaDataClassRequest = null;
var openbexi_MetaDataAttributClassRequest = null;
var openbexi_MetaDataClassLinkRequest = null;

String.prototype.ob_trim = function () {
    return this.replace(/^\s*/, "").replace(/\s*$/, "");
}
function openbexi_builtDeleteSQLQuery(formId, buttonId) {
    var pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
    if (formId == null || formId == "")formId = get_xml_classe_object_attribut_value(pageDoc, "page", buttonId, "parentId");
    var table = get_xml_classe_object_attribut_value(pageDoc, "url", formId, "table");
    var formInputs = document.getElementById(formId).getElementsByTagName("input");
    if (formInputs == null)return;
    var query = "delete from $table where "
    for (var m = 0; m < formInputs.length; m++) {
        var occur = formInputs[m].name.match(table + ".");
        if (occur != null) {
            var item = formInputs[m].name.split(".");
            if (item[1] != undefined) {
                if (m != 0) {
                    query += " and ";
                }
                query += item[1].toLowerCase() + " = $" + item[1].toLowerCase();
            }
        }
    }
    return query;
}
function openbexi_getDeleteSQLQuery(formId, buttonId) {
    var pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
    var table = get_xml_classe_object_attribut_value(pageDoc, "url", buttonId, "table");
    if (table == "")table = get_xml_classe_object_attribut_value(pageDoc, "url", formId, "table");
    var query = get_xml_classe_object_attribut_value(pageDoc, "url_0", buttonId, "query");
    if (query == "") get_xml_classe_object_attribut_value(pageDoc, "url_0", formId, "query");
    if (query == "") return null;
    var formInputs = document.getElementById(formId).getElementsByTagName("input");
    if (formInputs == null)return null;
    query = query.replace("$table", table);
    for (var m = 0; m < formInputs.length; m++) {
        var occur = formInputs[m].name.match(table + ".");
        if (occur != null) {
            var item = formInputs[m].name.split(".");
            if (item[1] != undefined) {
                var inputId = formInputs[m].id;
                var inputValue = dojo.byId(inputId).value;
                query = query.replace("$" + item[1].toLowerCase(), "'" + inputValue + "'");
            }
        }
    }
    openbexi_updatePageData(null, "database", table, "filter", "");
    return query;
}
function openbexi_builtUpdateSQLQuery(formId, buttonId) {
    var pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
    if (formId == null || formId == "")formId = get_xml_classe_object_attribut_value(pageDoc, "page", buttonId, "parentId");
    var table = get_xml_classe_object_attribut_value(pageDoc, "url", formId, "table");
    var formInputs = document.getElementById(formId).getElementsByTagName("input");
    if (formInputs == null)return;
    var query_part1 = "update $table set ";
    var query_part2 = "";
    for (var m = 0; m < formInputs.length; m++) {
        var occur = formInputs[m].name.match(table + ".");
        if (occur != null) {
            var item = formInputs[m].name.split(".");
            if (item[1] != undefined) {
                if (m != 0) {
                    query_part1 += " , ";
                    query_part2 += " and "
                }
                query_part1 += item[1].toLowerCase() + " = $" + item[1].toLowerCase();
                query_part2 += item[1].toLowerCase() + " = $" + item[1].toLowerCase();
            }
        }
    }
    return query_part1 + " where " + query_part2;
}
function openbexi_getUpdateSQLQuery(formId, buttonId) {
    var pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
    var table = get_xml_classe_object_attribut_value(pageDoc, "url", buttonId, "table");
    if (table == "")table = get_xml_classe_object_attribut_value(pageDoc, "url", formId, "table");
    var query = get_xml_classe_object_attribut_value(pageDoc, "url_0", buttonId, "query");
    if (query == "") get_xml_classe_object_attribut_value(pageDoc, "url_0", formId, "query");
    if (query == "") return null;
    var formInputs = document.getElementById(formId).getElementsByTagName("input");
    if (formInputs == null)return null;
    query = query.replace("$table", table);
    for (var m = 0; m < formInputs.length; m++) {
        var occur = formInputs[m].name.match(table + ".");
        if (occur != null) {
            var item = formInputs[m].name.split(".");
            if (item[1] != undefined) {
                var inputId = formInputs[m].id;
                var inputValue = dojo.byId(inputId).value;
                var current_value = get_xml_classe_object_attribut_value(pageDoc, "page", inputId, "currentValue");
                query = query.replace("$" + item[1].toLowerCase(), "'" + inputValue + "'");
                query = query.replace("$" + item[1].toLowerCase(), "'" + current_value + "'");
            }
        }
    }
    //alert("openbexi_getUpdateSQLQuery\n"+query)
    openbexi_updatePageData(null, "database", table, "filter", "");
    return query;
}
function openbexi_builtAddSQLQuery(formId, buttonId) {
    var pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
    if (formId == null || formId == "")formId = get_xml_classe_object_attribut_value(pageDoc, "page", buttonId, "parentId");
    var table = get_xml_classe_object_attribut_value(pageDoc, "url", buttonId, "table");
    if (table == "")table = get_xml_classe_object_attribut_value(pageDoc, "url", formId, "table");
    var metaData = get_xml_classe_object_attribut_value(pageDoc, "database", table, "metaData");
    var items = metaData.split(";");
    var formInputs = document.getElementById(formId).getElementsByTagName("input");
    if (formInputs == null)return;
    // Create classe object if it does exist
    var query = "INSERT INTO $table VALUES("
    for (var m = 0; m < items.length; m++) {
        if (items[m].ob_trim() != "") {
            if (m == 0)
                query += " $" + items[m];
            else
                query += " ,$" + items[m];
        }
    }
    query += ")";
    return query;
}
function openbexi_getAddSQLQuery(formId, buttonId) {
    var pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
    var table = get_xml_classe_object_attribut_value(pageDoc, "url", buttonId, "table");
    if (table == "")table = get_xml_classe_object_attribut_value(pageDoc, "url", formId, "table");
    var query = get_xml_classe_object_attribut_value(pageDoc, "url_0", buttonId, "query");
    if (query == "") get_xml_classe_object_attribut_value(pageDoc, "url_0", formId, "query");
    if (query == "") return null;
    var formInputs = document.getElementById(formId).getElementsByTagName("input");
    if (formInputs == null)return null;
    query = query.replace("$table", table);
    for (var m = 0; m < formInputs.length; m++) {
        var occur = formInputs[m].name.match(table + ".");
        if (occur != null) {
            var item = formInputs[m].name.split(".");
            if (item[1] != undefined) {
                var inputId = formInputs[m].id;
                var inputValue = dojo.byId(inputId).value;
                query = query.replace("$" + item[1], "'" + inputValue + "'");
            }
        }
    }
    //var key = parseInt(Math.random() * 99999999);
    openbexi_updatePageData(null, "database", table, "filter", "");
    return query;
}
function openbexi_builtSearchSQLQuery(formId, buttonId) {
    var pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
    if (formId == null || formId == "")formId = get_xml_classe_object_attribut_value(pageDoc, "page", buttonId, "parentId");
    var table = get_xml_classe_object_attribut_value(pageDoc, "url", buttonId, "table");
    if (table == "")table = get_xml_classe_object_attribut_value(pageDoc, "url", formId, "table");
    var metaData = get_xml_classe_object_attribut_value(pageDoc, "database", table, "metaData");
    var items = metaData.split(";");
    var formInputs = document.getElementById(formId).getElementsByTagName("input");
    if (formInputs == null)return;
    // Create classe object if it does exist
    var query = "select * from $table where "
    var query_part2 = "";
    for (var m = 0; m < items.length; m++) {
        if (items[m].ob_trim() != "") {
            if (m != 0) {
                query_part2 += " and "
            }
            query_part2 += items[m].toLowerCase() + " like $" + items[m].toLowerCase();
        }
    }
    query += query_part2;
    return query;
}
function openbexi_getSearchSQLQuery(formId, buttonId) {
    var pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
    var table = get_xml_classe_object_attribut_value(pageDoc, "url", buttonId, "table");
    if (table == "")table = get_xml_classe_object_attribut_value(pageDoc, "url", formId, "table");
    var metaData = get_xml_classe_object_attribut_value(pageDoc, "database", table, "metaData");
    var items = metaData.split(";");
    var query = get_xml_classe_object_attribut_value(pageDoc, "url_0", buttonId, "query");
    if (query == "") get_xml_classe_object_attribut_value(pageDoc, "url_0", formId, "query");
    if (query == "") return null;
    query = query.toLowerCase();
    query = query.replace("$table", table);
    for (var m = 0; m < items.length; m++) {
        if (items[m].ob_trim() != "") {
            var input = document.getElementsByName(table + "." + items[m]);
            var inputValue = "";
            if (input.length != 0) {
                var inputId = input[0].id;
                inputValue = dojo.byId("text_" + inputId).value;
            }
            if (inputValue.ob_trim() == "") {
                query = query.replace(items[m].toLowerCase() + " like $" + items[m].toLowerCase() + " and ", "");
                query = query.replace(" and " + items[m].toLowerCase() + " like $" + items[m].toLowerCase(), "");
                query = query.replace(items[m].toLowerCase() + " like $" + items[m].toLowerCase(), "");
            }
            else
                query = query.replace("$" + items[m].toLowerCase(), "'%" + inputValue + "%'");
        }
    }
    if (query == "select * from " + table + " where ") {
        query = "select * from " + table;
    }
    openbexi_updatePageData(null, "database", table, "filter", query);
    //var key = parseInt(Math.random() * 99999999);
    return query;
}
function openbexi_builtEditSQLQuery(formId, buttonId) {
    return "select * from $table"
}
function openbexi_getEditSQLQuery(formId, buttonId) {
    var pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
    var table = get_xml_classe_object_attribut_value(pageDoc, "url", buttonId, "table");
    if (table == "")table = get_xml_classe_object_attribut_value(pageDoc, "url", formId, "table");
    var query = get_xml_classe_object_attribut_value(pageDoc, "url_0", buttonId, "query");
    if (query == "") get_xml_classe_object_attribut_value(pageDoc, "url_0", formId, "query");
    if (query == "") return null;
    query = query.replace("$table", table);

    return query;
}
function openbexi_setMetaDataAttributClassRequest(classe) {
    var ob_doc = openbexi_get_documentElement(openbexi_MetaDataRequest, "text/xml");
    var countClass_attribut = get_xml_classe_object_attribut_value(ob_doc, classe, "class_attribut", "count");
    if (parseInt(countClass_attribut) > 0) {
        for (var j = 0; j < parseInt(countClass_attribut); j++) {
            try {
                openbexi_MetaDataAttributClassRequest[j] = get_xml_classe_object_attribut_value(ob_doc, classe, "class_attribut_" + j, "name");
            } catch(e) {
                openbexi_MetaDataAttributClassRequest = [
                    ["none"]
                ];
            }
        }
    } else {
        openbexi_MetaDataAttributClassRequest = [
            ["none"]
        ];
    }
}
function openbexi_closeMenu3(event) {
    if (event) openbexi_stopEventPropagation(event);
    document.getElementById("popup_menu0").style.visibility = "hidden";
    //__openbexi_debugC("openbexi_closeMenu3", event);
}
function openbexi_setMetaDataRequest(event, value) {
    openbexi_stopEventPropagation(event);
    if (!document.getElementById("ob_models")) return;
    if (openbexiPopup_menu) openbexiPopup_menu.hideMenu(event);
    if (openbexi_MetaDataClassRequest[value] != "...") {
        document.getElementById("ob_models").innerHTML = openbexi_MetaDataClassRequest[value];
        //openbexi_setMetaDataAttributClassRequest(openbexi_MetaDataClassRequest[value]);
    }
    else
        document.getElementById("ob_models").innerHTML = "Meta Data:classes";
}
function openbexi_setPreviousMetaDataRequest(event) {
    openbexi_stopEventPropagation(event);
    openbexi_getMetaDataRequest(event, "previous");
}
function openbexi_setNextMetaDataRequest(event) {
    openbexi_stopEventPropagation(event);
    openbexi_getMetaDataRequest(event, "next");
}
function openbexi_getMetaDataRequest(event, nextPreviousStatus) {
    openbexi_stopEventPropagation(event);
    var doc = null;
    //openbexi_loading_bexiObj(document.getElementById("ob_models"));
    if (event != null) {
        if (openbexiPopup_menu) {
            if (nextPreviousStatus != "none") {
                openbexiPopup_menu.posCurrentItem = 0;
                openbexiPopup_menu.maxItems = 10;
                openbexiPopup_menu = new openbexi_popup_menu("popup_menu0");
                openbexiPopup_menu.x = getMouseX(event);
                openbexiPopup_menu.y = getMouseY(event);
            }
        }
    }
    doc = set_xml_classe_object_attribut_value(doc, "ob_request", "object", "id", "ob_models");
    doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_ModelsRequest");
    doc = set_xml_classe_object_attribut_value(doc, "ob_models", "mouse", "x", openbexiPopup_menu.x);
    doc = set_xml_classe_object_attribut_value(doc, "ob_models", "mouse", "y", openbexiPopup_menu.y);
    if (document.getElementById("ob_models"))doc = set_xml_classe_object_attribut_value(doc, "ob_models", "col_0", "name", document.getElementById("ob_models").innerHTML);
    doc = set_xml_classe_object_attribut_value(doc, "ob_models", "list", "nextPreviousStatus", nextPreviousStatus);
    doc = set_xml_classe_object_attribut_value(doc, "ob_models", "list", "maxItems", openbexiPopup_menu.maxItems);
    doc = set_xml_classe_object_attribut_value(doc, "ob_models", "list", "posCurrentItem", openbexiPopup_menu.posCurrentItem);

    var privateDoc = openbexi_get_documentElement(OPENBEXI_PRIVATE_CONTEXT_XML, "text/xml");
    var url = get_xml_classe_object_attribut_value(privateDoc, "ob_database", "databaseCurrent", "url");
    var user = get_xml_classe_object_attribut_value(privateDoc, "ob_database", "databaseCurrent", "user");
    var passwd = get_xml_classe_object_attribut_value(privateDoc, "ob_database", "databaseCurrent", "passwd");
    var driver = get_xml_classe_object_attribut_value(privateDoc, "ob_database", "databaseCurrent", "driver");

    if (driver != "") doc = set_xml_classe_object_attribut_value(doc, "ob_database", "databaseCurrent", "driver", driver);
    if (user != "") doc = set_xml_classe_object_attribut_value(doc, "ob_database", "databaseCurrent", "user", user);
    if (passwd != "") doc = set_xml_classe_object_attribut_value(doc, "ob_database", "databaseCurrent", "passwd", passwd);
    if (url != "") doc = set_xml_classe_object_attribut_value(doc, "ob_database", "databaseCurrent", "url", url);

    if (_CURRENT_OPENBEXI_LANGUAGE == "fr") {
        doc = set_xml_classe_object_attribut_value(doc, "bexicontext", "language", "name", "fr");
    } else if (_CURRENT_OPENBEXI_LANGUAGE == "en") {
        doc = set_xml_classe_object_attribut_value(doc, "bexicontext", "language", "name", "en");
    }
    else {
        doc = set_xml_classe_object_attribut_value(doc, "bexicontext", "language", "name", "en");
        alert("sorry, the current OPENBEXI version supports only  French and English\n (default English");
        _CURRENT_OPENBEXI_LANGUAGE = "en";
    }
    var ob_xml = openbexi_get_xmlString(doc);
    var mode_sync = openbexi_synchron();
    if (url != "")openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_getMetaDataRequest_CB);
}

function openbexi_getLNtype(event) {
    openbexi_stopEventPropagation(event);

    openbexi_LNtype = [
        ["SQL"],
        ["English"],
        ["Francais"]
    ];

    try {
        var popupId = "popup_menu0";
        if (openbexiPopup_menu == null)
            openbexiPopup_menu = new openbexi_popup_menu(popupId);
        else
            openbexiPopup_menu.removeAllItemMenu();
        for (var i = 0; i < openbexi_LNtype.length; i++) {
            openbexiPopup_menu.addItemMenu(popupId + "_" + i, 'openbexi_setLNType(event,' + '"' + i + '' + '")', openbexi_LNtype[i]);
        }
        openbexiPopup_menu.addSep();
        openbexiPopup_menu.addItemMenu(popupId + "_close", 'openbexi_closeMenu3(event)', "close");
        openbexiPopup_menu.showMenu3(event, popupId, "150px", true, "0px", "0px");
    } catch(e) {
        alert("Sorry, cannot set up the language\n:" + e.name + ". Error message: " + e.message);
    }
}
function openbexi_setLNType(event, value) {
    openbexi_stopEventPropagation(event);
    if (openbexiPopup_menu != null) openbexiPopup_menu.hideMenu(event);
    document.getElementById("ob_LNtype").innerHTML = openbexi_LNtype[value];
    if (openbexi_LNtype[value] == "Francais") {
        _CURRENT_OPENBEXI_LANGUAGE = "fr";
        document.getElementById("ob_submitRequest").innerHTML = "Envoyer votre requête .";
        document.getElementById("ob_submitRequestExample").innerHTML = "Exemple de requête en francais :";
    } else    if (openbexi_LNtype[value] == "SQL") {
        _CURRENT_OPENBEXI_LANGUAGE = "sql";
        document.getElementById("ob_submitRequest").innerHTML = "submit your SQL request ...";
        document.getElementById("ob_submitRequestExample").innerHTML = "SQL request examples :";
    } else {
        _CURRENT_OPENBEXI_LANGUAGE = "en";
        document.getElementById("ob_submitRequest").innerHTML = "submit your request ...";
        document.getElementById("ob_submitRequestExample").innerHTML = "Natural language request examples :";
    }
    var ob_doc = openbexi_get_documentElement(OPENBEXI_PRIVATE_CONTEXT_XML, "text/xml");
    set_xml_classe_object_attribut_value(ob_doc, "bexicontext", "language", "name", _CURRENT_OPENBEXI_LANGUAGE);
    OPENBEXI_PRIVATE_CONTEXT_XML = openbexi_get_xmlString(ob_doc);
    openbexi_sendContext_to_Server("openbexi_updateServerContextRequest");
}
function openbexi_getLNRequest(event) {
    openbexi_stopEventPropagation(event);
    if (!document.getElementById("ob_models")) return;
    var currentMetaData = document.getElementById("ob_models").innerHTML;
    if (_CURRENT_OPENBEXI_LANGUAGE == "fr") {
        if (currentMetaData.match("Meta Data")) currentMetaData = "(nom de la classe)";
        openbexi_LNRequest1 = [
            ["montrer la classe " + currentMetaData],
            ["..."],
            ["donner les attributs de la classe " + currentMetaData],
            ["donner tous les attributs d\' un " + currentMetaData],
            ["donner des attributs d\' un " + currentMetaData]
        ];
    }
    else if (_CURRENT_OPENBEXI_LANGUAGE == "sql") {
        openbexi_LNRequest1 = [
            ["show tables"],
            ["..."],
            ["SELECT * FROM " + currentMetaData]
        ];
    } else {
        if (currentMetaData.match("Meta Data")) currentMetaData = "(class name)";
        openbexi_LNRequest1 = [
            ["show up the " + currentMetaData + " class"],
            ["..."],
            ["select attributes for " + currentMetaData + " class"],
            ["select all attributes for " + currentMetaData + " class"],
            ["select some attributes for " + currentMetaData + " class"]
        ];
    }
    var bexiObj = getSelectedBexiObj(null);
    try {
        var popupId = "popup_menu0";
        if (openbexiPopup_menu == null)
            openbexiPopup_menu = new openbexi_popup_menu(popupId);
        else
            openbexiPopup_menu.removeAllItemMenu();
        for (var i = 0; i < openbexi_LNRequest1.length; i++) {
            openbexiPopup_menu.addItemMenu(popupId + "_" + i, 'openbexi_setLNRequest(event,' + '"' + i + '' + '")', openbexi_LNRequest1[i]);
        }
        openbexiPopup_menu.addSep();
        openbexiPopup_menu.addItemMenu(popupId + "_close", 'openbexi_closeMenu3(event)', "close");
        openbexiPopup_menu.showMenu3(event, popupId, "500px", true, "0px", "0px");
        //alert(document.getElementById("popup_menu0").innerHTML)
    } catch(e) {
        alert("Sorry, cannot set up the " + property + " property for " + bexiObj.id + "\n:" + e.name + ". Error message: " + e.message);
    }
}
function openbexi_setLNRequest(event, value) {
    openbexi_stopEventPropagation(event);
    if (openbexiPopup_menu != null) openbexiPopup_menu.hideMenu(event);
    var bexiObj = getSelectedBexiObj(null);
    if (openbexi_LNRequest1[value] != "...") {
        document.getElementById("ob_LNRequestInput").value = openbexi_LNRequest1[parseInt(value)];
        bexiObj.div.setAttribute("ob_LN_request", openbexi_LNRequest1[parseInt(value)]);
        //document.getElementById("ob_models").value = "Meta Data:classes";
    }
}
function openbexi_getLNRequestNewModel(event) {
    if (_CURRENT_OPENBEXI_LANGUAGE == "fr") {
        openbexi_LNRequestNewModel = [
            ["créer la classe homme"],
            ["créer la table cinéma"],
            ["créer la table film"],
            ["..."],
            ["un homme a un nom"],
            ["un homme a un prénom"],
            ["un homme a une adresse"],
            ["un film a un titre"],
            ["un cinéma a un nom"],
            ["un cinéma a une adresse"],
            ["un cinéma diffuse des films"],
            ["supprimer la classe homme"],
            ["etc ..."],
        ];
    } else {
        openbexi_LNRequestNewModel = [
            ["create humain class"],
            ["create theater class"],
            ["create movie class"],
            ["..."],
            ["a humain has a name"],
            ["a humain has a firstname"],
            ["a humain has a name adress"],
            ["a movie has a title"],
            ["a theater has a name"],
            ["a theater has a adress"],
            ["a theater broadcasts movies"],
            ["delete the humain class"],
            ["etc ..."],
        ];
    }
    openbexi_stopEventPropagation(event);
    var bexiObj = getSelectedBexiObj(null);
    try {
        var popupId = "popup_menu0";
        if (openbexiPopup_menu == null)
            openbexiPopup_menu = new openbexi_popup_menu(popupId);
        else
            openbexiPopup_menu.removeAllItemMenu();
        for (var i = 0; i < openbexi_LNRequestNewModel.length; i++) {
            openbexiPopup_menu.addItemMenu(popupId + "_" + i, 'openbexi_setLNRequestNewModel(event,' + '"' + i + '' + '")', openbexi_LNRequestNewModel[i]);
        }
        openbexiPopup_menu.addSep();
        openbexiPopup_menu.addItemMenu(popupId + "_close", 'openbexi_closeMenu3(event)', "close");
        openbexiPopup_menu.showMenu3(event, popupId, "500px", true, "0px", "0px");
    } catch(e) {
        alert("Sorry, cannot set up property for " + bexiObj.id + "\n:" + e.name + ". Error message: " + e.message);
    }
}
function openbexi_setLNRequestNewModel(event, value) {
    // openbexi creative data
    openbexi_stopEventPropagation(event);
    if (openbexiPopup_menu != null) openbexiPopup_menu.hideMenu(event);
    var bexiObj = getSelectedBexiObj(null);
    //if (!openbexi_LNRequest[parseInt(value)].match("..."))
    document.getElementById("ob_LNRequestInput").value += openbexi_LNRequestNewModel[parseInt(value)] + "\n";
    // Send request
    //openbexi_NewModelRequest();
    bexiObj.div.setAttribute("ob_LN_request", openbexi_LNRequestNewModel[parseInt(value)]);
}
function openbexi_LNRequest(event, bexiObj, bexiObjId, objectType, parentId, parentType, action, table, attribut, request, requestType, driver, url, user, passwd, doc, change_model) {
    if (event) openbexi_stopEventPropagation(event);
    var bexiId ;
    var bexiType;

    // Split request
    var requestList;
    if (request == undefined) {
        requestList = document.getElementById("ob_LNRequestInput").value.split(/\;|\r|\n/);
    } else {
        requestList = new Array();
        requestList = request.split(/\;|\r|\n/);
    }
    if (bexiObjId != null) {
        bexiId = bexiObjId;
        bexiObj = "";
        bexiType = objectType;
    } else {
        if (bexiObj == null) bexiObj = getSelectedBexiObj(null);
        if (bexiObj.type != "openbexi_body" && bexiObj != null && bexiObj != "") {
            if (bexiObj.type == "openbexi_form" || bexiObj.type == "openbexi_dojo" || bexiObj.type == "openbexi_list" || bexiObj.type == "openbexi_activeWidgets" || bexiObj.type == "openbexi_dojo_editor" || bexiObj.type == "openbexi_dojo_editor") {
                bexiId = bexiObj.div.id;
            } else
                bexiId = bexiObj.id;
            if (bexiObj.parentNodeId == "BODY")
                openbexi_loading_bexiObj(bexiObj.div.id);
            else
                openbexi_loading_bexiObj(bexiObj.bexiParent.div.id);
            bexiObj.div.LN_request = requestList[0];
            bexiObj.div.requestType = requestType;
            bexiType = bexiObj.type;
        } else {
            bexiObj = "";
            bexiId = "none"
            bexiType = objectType;
        }
    }
    if (request == "requestCSVdata" || openbexi_getPageData(null, "page", bexiId, "csv_file") != "") {
        openbexi_loadCSV(bexiId, doc);
        return;
    } else
        openbexi_updatePageData(null, "page", bexiId, "csv_file", "");

    if (doc == null) {
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "nextPreviousStatus", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "pager", "number", "0");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "posCurrentItem", "0");
        var pager = ob_get_pagers(bexiId + "_pager");
        if (pager != null) {
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "maxItems", pager.maxItems);
        } else {
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "maxItems", "99");
        }
        var rowCount = openbexi_getPageData(null, "page", bexiId, "rowCount");
        if (rowCount != "")
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "maxItems", rowCount);
    }
    doc = set_xml_classe_object_attribut_value(doc, "ob_request", "object", "id", bexiId);
    doc = set_xml_classe_object_attribut_value(doc, "ob_request", "object", "type", bexiType);
    if (requestType == "sql")
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "sql");
    else
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "natural_language");
    for (var i = 0; i < requestList.length; i++) {
        doc = set_xml_classe_object_attribut_value(doc, bexiId, "request" + i, "text", requestList[i]);
    }
    if (_CURRENT_OPENBEXI_LANGUAGE == "fr") {
        doc = set_xml_classe_object_attribut_value(doc, "bexicontext", "language", "name", "fr");
    } else if (_CURRENT_OPENBEXI_LANGUAGE == "en") {
        doc = set_xml_classe_object_attribut_value(doc, "bexicontext", "language", "name", "en");
    }
    else {
        doc = set_xml_classe_object_attribut_value(doc, "bexicontext", "language", "name", "en");
        alert("sorry, the current OPENBEXI version supports only  French and English\n (default English");
        _CURRENT_OPENBEXI_LANGUAGE = "en";
    }
    var privateDoc = openbexi_get_documentElement(OPENBEXI_PRIVATE_CONTEXT_XML, "text/xml");
    if (privateDoc == null || url == null || url == "") {
        url = get_xml_classe_object_attribut_value(privateDoc, "ob_database", "databaseCurrent", "url");
        user = get_xml_classe_object_attribut_value(privateDoc, "ob_database", "databaseCurrent", "user");
        passwd = get_xml_classe_object_attribut_value(privateDoc, "ob_database", "databaseCurrent", "passwd");
        driver = get_xml_classe_object_attribut_value(privateDoc, "ob_database", "databaseCurrent", "driver");
    }
    if (driver != "") doc = set_xml_classe_object_attribut_value(doc, "ob_database", "databaseCurrent", "driver", driver);
    if (user != "") doc = set_xml_classe_object_attribut_value(doc, "ob_database", "databaseCurrent", "user", user);
    if (passwd != "") doc = set_xml_classe_object_attribut_value(doc, "ob_database", "databaseCurrent", "passwd", passwd);
    if (url != "") doc = set_xml_classe_object_attribut_value(doc, "ob_database", "databaseCurrent", "url", url);

    var pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
    if (parentType == null) {
        parentId = get_xml_classe_object_attribut_value(pageDoc, "page", bexiId, "parentId");
        parentType = get_xml_classe_object_attribut_value(pageDoc, "page", bexiId, "parentType");
    }
    if (table != null) {
        if (parentType == "openbexi_form") {
            if (table != "") {
                pageDoc = set_xml_classe_object_attribut_value(pageDoc, "url", parentId, "table", table);
                doc = set_xml_classe_object_attribut_value(doc, "url", parentId, "table", table);
            }
            if (attribut != "") pageDoc = set_xml_classe_object_attribut_value(pageDoc, "url", parentId, "attribut", attribut);
        } else {
            if (table != "") {
                pageDoc = set_xml_classe_object_attribut_value(pageDoc, "url", bexiId, "table", table);
                doc = set_xml_classe_object_attribut_value(doc, "url", bexiId, "table", table);
            }
            if (attribut != "") pageDoc = set_xml_classe_object_attribut_value(pageDoc, "url", bexiId, "attribut", attribut);
        }
    } else {
        table = get_xml_classe_object_attribut_value(pageDoc, "url", bexiId, "table");
        if (table == "")table = get_xml_classe_object_attribut_value(pageDoc, "url", parentId, "table");
        doc = set_xml_classe_object_attribut_value(doc, "url", bexiId, "table", table);
        doc = set_xml_classe_object_attribut_value(doc, "url", parentId, "table", table);
    }
    if (action != null) {
        pageDoc = set_xml_classe_object_attribut_value(pageDoc, "url", bexiId, "action", action);
        doc = set_xml_classe_object_attribut_value(doc, "url", bexiId, "action", action);
    }

    var model = openbexi_getPageData(null, "page", bexiId, "model");
    doc = set_xml_classe_object_attribut_value(doc, "url", bexiId, "model", model);
    var column_widths = openbexi_getPageData(null, "page", bexiId, "column_widths");
    doc = set_xml_classe_object_attribut_value(doc, "url", bexiId, "column_widths", column_widths);
    var column_hiddens = openbexi_getPageData(null, "page", bexiId, "column_hiddens");
    doc = set_xml_classe_object_attribut_value(doc, "url", bexiId, "column_hiddens", column_hiddens);
    var column_formatters = openbexi_getPageData(null, "page", bexiId, "column_formatters");
    doc = set_xml_classe_object_attribut_value(doc, "url", bexiId, "column_formatters", column_formatters);
    var data_change = openbexi_getPageData(null, "page", bexiId, "data_change");
    doc = set_xml_classe_object_attribut_value(doc, "url", bexiId, "data_change", data_change);
    var count = 0;
    var data_cvs;
    while (true) {
        data_cvs = openbexi_getPageData(null, "page", bexiId, "data_" + count);
        if (data_cvs == "")break;
        doc = set_xml_classe_object_attribut_value(doc, "url", bexiId, "data_" + count++, data_cvs);
    }

    var sqlFilter = get_xml_classe_object_attribut_value(pageDoc, "database", table, "filter");
    if (sqlFilter != "") doc = set_xml_classe_object_attribut_value(doc, bexiId, "request0", "text", sqlFilter);
    if (change_model != undefined) doc = set_xml_classe_object_attribut_value(doc, "page", bexiId, "change_model", change_model);

    OPENBEXI_PAGES_DATA_XML = openbexi_get_xmlString(pageDoc);
    var ob_xml = openbexi_get_xmlString(doc);
    var mode_sync = openbexi_synchron();
    if (bexiType == "openbexi_list") {
        openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_List_CB);
    } else   if (bexiType == "openbexi_dojo") {
        openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_dojoGrid_CB);
    } else   if (bexiType == "openbexi_dojo_editor") {
        openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_FCK_editor_CB);
    } else   if (bexiType == "openbexi_dojo_editor") {
        openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_DOJO_editor_CB);
    } else   if (bexiType == "openbexi_form" || parentType == "openbexi_form") {
        openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_Form_CB);
    } else   if (bexiType == "openbexi_table" || parentType == "") {
        return;
    } else {
        openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_NewModel_CB);
    }
    if (document.getElementById("LNRequestNewModel_status")) {
        document.getElementById("LNRequestNewModel_status").value = "Working ...";
        document.getElementById("LNRequestNewModel_status").style.background = "#ffde0f";
    }
    if (bexiObj != "")openbexi_ConnectionTimeout(bexiObj.div.id, 0);
}
function openbexi_getLoading_status(divId) {
    var ob_div;
    if (document.getElementById(divId))
        ob_div = document.getElementById(divId);
    else
        return "loaded";
    return ob_div.getAttribute(loading_status);
}
function openbexi_loading_bexiObj(divId) {
    var ob_div;
    if (document.getElementById(divId))
        ob_div = document.getElementById(divId);
    else
        return;
    ob_div.loading_status = "loading";

    var div = document.createElement("div");
    div.setAttribute("id", "loading_div");
    div.selected = false;
    if (ob_div != undefined) {
        div.style.top = ob_div.style.top;
        div.style.left = ob_div.style.left;
        //div.style.width = ob_div.style.width;
        //div.style.height = ob_div.style.height;
    } else {
        div.style.left = divPropertiesWidth;
    }
    div.style.border = "1px solid blue";
    div.style.position = "absolute";
    div.style.background = "white";
    div.style.zIndex = 999;
    var img = document.createElement("img");
    img.setAttribute("src", "gif/loading.gif");
    //img.style.width = "95%";
    var loadtext = document.createTextNode("loading ...");
    div.appendChild(loadtext);
    //openbexi_opacity(div,70);
    div.appendChild(img);
    document.body.appendChild(div);
}
function openbexi_loaded_bexiObj(divId) {
    try {
        if (openbexiNavigator) openbexiNavigator.working = false;
    } catch (e) {
    }
    var ob_div;
    if (document.getElementById(divId))
        ob_div = document.getElementById(divId);
    else
        return;
    ob_div.loading_status = "loaded";
    if (document.getElementById("loading_div")) document.body.removeChild(document.getElementById("loading_div"));
}
function openbexi_ConnectionTimeout(divId, count) {
    var ob_div;
    if (document.getElementById(divId))
        ob_div = document.getElementById(divId);
    else
        return;
    var newCount = count + 1;
    var LNGoIn = setTimeout(function() {
        openbexi_ConnectionTimeout(divId, newCount);
    }, 1000);
    if (ob_div.loading_status == "loaded") {
        clearTimeout(LNGoIn);
    }
    if (ob_div.loading_status == "loading" && newCount == 30) {
        openbexi_loaded_bexiObj(divId);
        clearTimeout(LNGoIn);
        //alert("Cannot get data from server. Please, check if the server is still working ...");
        if (document.getElementById("LNRequestNewModel_status")) {
            document.getElementById("LNRequestNewModel_status").value = "Cannot get data from server. Please, check if the WEB server is still working ...";
            document.getElementById("LNRequestNewModel_status").style.background = "red";
        }
    }
}
function openbexi_NewModel_CB(responseXML) {
    //str_debug += "-------------responseXML:" + responseXML;
    var ob_doc = openbexi_get_documentElement(responseXML, "text/xml");
    var div_id = get_xml_classe_object_attribut_value(ob_doc, "ob_request", "object", "id");
    //var parentId = get_xml_classe_object_attribut_value(page_doc, "page", div_id, "parentId");
    var MSQ_status = get_xml_classe_object_attribut_value(ob_doc, div_id, "SQLDatabase", "status");
    var count = get_xml_classe_object_attribut_value(ob_doc, div_id, "requests", "count");
    if (count == "")count = 1;
    var objectCount = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file", "objectCount");
    var objectMaxCount = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file", "objectMaxCount");
    var pagerNumber = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "pager", "number");
    try {
        var bexiObj = getSelectedBexiObj(div_id);
    }
    catch (e) {
    }
    //if (openbexi_getLoading_status(bexiObj.div.id) == "loaded") return;
    if (div_id != "" && div_id != undefined) openbexi_loaded_bexiObj(div_id);
    if (MSQ_status != "OK") {
        try {
            if (document.getElementById("messageBox_" + div_id) != undefined)document.getElementById("messageBox_" + div_id).innerHTML = "<B>" + MSQ_status + "</B>"
            //if (document.getElementById("messageBox_" + parentId) != undefined)document.getElementById("messageBox_" + parentId).innerHTML = "<B>" + MSQ_status + "</B>"
            if (openbexiNavigator) openbexiNavigator.status("SQLErrorData", "orange");
        } catch (e) {
            //alert(MSQ_status);
        }
        try {
            if (openbexiNavigator) openbexiNavigator.reset();
        } catch (e) {
        }
        return;
    } else {
        //if (document.getElementById("messageBox_" + div_id) != undefined)document.getElementById("messageBox_" + div_id).innerHTML = "<B> Updated:" + Date() + "</B>"
        //if (document.getElementById("messageBox_" + parentId) != undefined)document.getElementById("messageBox_" + parentId).innerHTML = "<B> Updated:" + Date() + "</B>"
    }
    //str_debug += "list.length=" + list.length + "\n";
    // Display results according SQL query
    var i = 0;
    var message = get_xml_classe_object_attribut_value(ob_doc, div_id, "message", "text" + i);
    var countCol = get_xml_classe_object_attribut_value(ob_doc, div_id, "column", "count" + i);
    var countRow = objectMaxCount;
    var pager = ob_get_pagers(div_id + "_pager");
    if (pager != null) {
        countRow = get_xml_classe_object_attribut_value(ob_doc, div_id, "row", "count" + i);
    }
    var header = new Array(parseInt(countCol));
    var data = new Array(parseInt(countCol));
    // Display SQL queries
    var query = "-1";
    var count1 = 0;
    if (document.getElementById("ob_SQLRequestInput"))document.getElementById("ob_SQLRequestInput").innerHTML = "";
    while (query != "") {
        query = get_xml_classe_object_attribut_value(ob_doc, div_id, "sql", "query" + i + "_" + String(count1));
        if (document.getElementById("ob_SQLRequestInput"))document.getElementById("ob_SQLRequestInput").innerHTML += query + " ;";
        count1++;
    }
    for (var k = 0; k < parseInt(countRow); k++) data[k] = new Array(parseInt(countCol));
    for (var j = 0; j < parseInt(countCol); j++) {
        header[j] = {name:get_xml_classe_object_attribut_value(ob_doc, div_id, "col", "name" + j)};
        for (var l = 0; l < parseInt(countRow); l++) {
            try {
                data[l][j] = get_xml_classe_object_attribut_value(ob_doc, div_id, "item" + i + "_" + j + "_" + l, "value");
                var occur = data[l][j].match(".gif|.jpg|jpeg|.bmp|.tif|.png|.riff|.bgi|.svg");
                if (occur != null)
                    data[l][j] = "<img src=" + data[l][j] + " style=\"width:100%;height:100%\" />";
                else {
                    occur = data[l][j].match("http:|https:");
                    if (occur != null)
                        data[l][j] = "<a href=" + data[l][j] + " >" + data[l][j] + "<\/a>";
                    else {
                        occur = data[l][j].match("true");
                        if (occur != null)
                            data[l][j] = "<INPUT TYPE=CHECKBOX checked />";
                        occur = data[l][j].match("false");
                        if (occur != null)
                            data[l][j] = "<INPUT TYPE=CHECKBOX />";
                    }
                }

            } catch(e) {
                //__openbexi_debugC("openbexi_NewModel_CB", "catch exception" + " " + e.name + ". Error message: " + e.message);
                if (document.getElementById("ob_text_connectionDetails")) document.getElementById("ob_text_connectionDetails").value = "openbexi_List_CB, problem for " + data[j][l] + " " + e.name + ". Error message: " + e.message;
            }
        }
    }
    var view1 = {cells: [header]};
    try {
        bexiObj.view1 = {cells: [header]};
    } catch (e) {
    }
    try {
        var grid = dijit.byId("dojo_" + div_id);
        var layout = [view1 ];
        var model = new dojox.grid.data.Table(null, data);
        grid.setStructure(layout);
        grid.setModel(model);
        grid.refresh();
        grid.update();
    } catch (e) {
    }
    //__openbexi_debugC("openbexi_NewModel_CB", str_debug);
    try {
        openbexi_updatePageData(null, "url", div_id, "lang", _CURRENT_OPENBEXI_LANGUAGE);
        query = get_xml_classe_object_attribut_value(ob_doc, div_id, "request0", "text");
        openbexi_updatePageData(null, "url_0", div_id, "query", query);
        var url = get_xml_classe_object_attribut_value(ob_doc, "ob_database", "databaseCurrent", "url");
        openbexi_updatePageData(null, "database", div_id, "url", url);
        var driver = get_xml_classe_object_attribut_value(ob_doc, "ob_database", "databaseCurrent", "driver");
        openbexi_updatePageData(null, "database", div_id, "driver", driver);
        var user = get_xml_classe_object_attribut_value(ob_doc, "ob_database", "databaseCurrent", "user");
        openbexi_updatePageData(null, "database", div_id, "user", user);
        var passwd = get_xml_classe_object_attribut_value(ob_doc, "ob_database", "databaseCurrent", "passwd");
        openbexi_updatePageData(null, "database", div_id, "passwd", passwd);
    } catch (e) {
    }
    try {
        if (pager != null) pager.setup(ob_doc);
    } catch (e) {
    }
    if (document.getElementById("LNRequestNewModel_status")) {
        if (status == "done") {
            document.getElementById("LNRequestNewModel_status").value = "OK ...";
            document.getElementById("LNRequestNewModel_status").style.background = "green";
        }
        else if (status == "Please, Check if the SQL server is still working ...") {
            document.getElementById("LNRequestNewModel_status").value = "Cannot get data from server. Please, check if the SQL server is still working ...";
            document.getElementById("LNRequestNewModel_status").style.background = "red";
        }
        else {
            document.getElementById("LNRequestNewModel_status").value = "Cannot get data from server.";
            document.getElementById("LNRequestNewModel_status").style.background = "yellow";
        }
    }
    try {
        openbexi_add_SQL_link(div_id, "openbexi_dojo", query);
        if (openbexiNavigator) openbexiNavigator.reset();
    } catch (e) {
    }
}
function openbexi_FCK_editor_CB(responseXML) {
    //var str_debug = "-------------responseXML:" + responseXML;
    var ob_doc = openbexi_get_documentElement(responseXML, "text/xml");
    var div_id = get_xml_classe_object_attribut_value(ob_doc, "ob_request", "object", "id");
    var MSQ_status = get_xml_classe_object_attribut_value(ob_doc, div_id, "SQLDatabase", "status");
    var count = get_xml_classe_object_attribut_value(ob_doc, div_id, "requests", "count");
    if (count == "")count = 1;
    var bexiObj = getSelectedBexiObj(div_id);
    if (openbexi_getLoading_status(bexiObj.div.id) == "loaded") return;
    openbexi_loaded_bexiObj(bexiObj.div.id);
    if (MSQ_status != "OK") {
        try {
            if (openbexiNavigator) openbexiNavigator.status("SQLErrorData", "red");
        } catch (e) {
        }
        try {
            if (openbexiNavigator) openbexiNavigator.reset();
        } catch (e) {
        }
        return;
    }

    if (parseInt(count) > 0) {
        bexiObj.htmlText = "";
        for (var i = 0; i < parseInt(count); i++) {
            var message = get_xml_classe_object_attribut_value(ob_doc, div_id, "message", "text" + i);
            var countCol = get_xml_classe_object_attribut_value(ob_doc, div_id, "col", "count" + i);
            var countRow = get_xml_classe_object_attribut_value(ob_doc, div_id, "row", "count" + i);
            for (var j = 0; j < parseInt(countCol); j++) {
                bexiObj.htmlText += "<p>"
                for (var l = 0; l < parseInt(countRow); l++) {
                    try {
                        bexiObj.htmlText += get_xml_classe_object_attribut_value(ob_doc, div_id, "item" + i + "_" + j + "_" + l, "value") + " ";
                        //alert("openbexi_List_CB:  bexiObj.div.innerHTML=\n"+bexiObj.div.innerHTML);
                    } catch(e) {
                        //__openbexi_debugC("openbexi_List_CB", "catch exception" + " " + e.name + ". Error message: " + e.message);
                        if (document.getElementById("ob_text_connectionDetails")) document.getElementById("ob_text_connectionDetails").value = "openbexi_List_CB:" + e.name + ". Error message: " + e.message;
                    }
                }
                bexiObj.htmlText += "</p>"
            }
        }
        bexiObj.div.innerHTML = bexiObj.htmlText;
    } else {
        alert(message);
    }
    try {
        if (openbexiNavigator) openbexiNavigator.reset();
    } catch (e) {
    }
    //__openbexi_debugC("openbexi_List_CB", str_debug);
}
function openbexi_Form_CB(responseXML) {
    //alert("openbexi_Form_CB:\n" + responseXML)
    //str_debug += "-------------responseXML:" + responseXML;
    var ob_doc = openbexi_get_documentElement(responseXML, "text/xml");
    var div_id = get_xml_classe_object_attribut_value(ob_doc, "ob_request", "object", "id");
    var MSQ_status = get_xml_classe_object_attribut_value(ob_doc, div_id, "SQLDatabase", "status");
    var count = get_xml_classe_object_attribut_value(ob_doc, div_id, "requests", "count");
    if (count == "")count = 1;
    var objectCount = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file", "objectCount");
    var objectMaxCount = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file", "objectMaxCount");
    var pagerNumber = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "pager", "number");
    var url = get_xml_classe_object_attribut_value(ob_doc, "ob_database", "databaseCurrent", "url");
    var page_doc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
    var action = get_xml_classe_object_attribut_value(page_doc, "url", div_id, "action");
    var parentId = get_xml_classe_object_attribut_value(page_doc, "page", div_id, "parentId");
    if (parentId == "" || parentId == "BODY") {
        var table = get_xml_classe_object_attribut_value(page_doc, "url", div_id, "table");
        var attribut = get_xml_classe_object_attribut_value(page_doc, "url", div_id, "attribut");
    } else {
        var table = get_xml_classe_object_attribut_value(page_doc, "url", parentId, "table");
        var attribut = get_xml_classe_object_attribut_value(page_doc, "url", parentId, "attribut");
    }
    try {
        var metaData = get_xml_classe_object_attribut_value(ob_doc, "database", table, "metaData");
        if (metaData != "")openbexi_updatePageData(null, "database", table, "metaData", metaData);
        var bexiObj = getSelectedBexiObj(div_id);
    }
    catch (e) {
    }
    //if (openbexi_getLoading_status(bexiObj.div.id) == "loaded") return;
    if (div_id != "" && div_id != undefined) openbexi_loaded_bexiObj(div_id);
    if (MSQ_status != "OK") {
        try {
            if (document.getElementById("messageBox_" + parentId) != undefined)document.getElementById("messageBox_" + parentId).innerHTML = "<B>" + MSQ_status + "</B>"
            if (document.getElementById("messageBox_" + div_id) != undefined)document.getElementById("messageBox_" + div_id).innerHTML = "<B>" + MSQ_status + "</B>"
            if (openbexiNavigator) openbexiNavigator.status("SQLErrorData", "red");
        } catch (e) {
            //alert(MSQ_status);
        }
        try {
            if (openbexiNavigator) openbexiNavigator.reset();
        } catch (e) {
        }
        return;
    }
    //str_debug += "list.length=" + list.length + "\n";
    // Display results according SQL query
    var i = 0;
    var message = get_xml_classe_object_attribut_value(ob_doc, div_id, "message", "text" + i);
    var countCol = get_xml_classe_object_attribut_value(ob_doc, div_id, "column", "count" + i);
    var countRow = objectMaxCount;
    var pager = ob_get_pagers(div_id + "_pager");
    if (pager != null) {
        countRow = get_xml_classe_object_attribut_value(ob_doc, div_id, "row", "count" + i);
        pager.setup(ob_doc);
    }
    var header = new Array(parseInt(countCol));
    var data = new Array(parseInt(countCol));
    // Display SQL queries
    var query = "-1";
    var count1 = 0;
    if (document.getElementById("ob_SQLRequestInput"))document.getElementById("ob_SQLRequestInput").innerHTML = "";
    while (query != "") {
        query = get_xml_classe_object_attribut_value(ob_doc, div_id, "sql", "query" + i + "_" + String(count1));
        if (document.getElementById("ob_SQLRequestInput"))document.getElementById("ob_SQLRequestInput").innerHTML += query + " ;";
        count1++;
    }
    var text = "";
    if (action == "create_form") {
        for (var j = 0; j < parseInt(countCol); j++) {
            try {
                text = get_xml_classe_object_attribut_value(ob_doc, div_id, "col", "name" + j);
                if (text == "")text = "label";
                add_HTMLDojo(null, "dijit.form.TextBox", "TextBox", text, null, table, text);
                openbexi_updatePageData(null, "url", div_id, "action", "Edit");
            } catch(e) {
                if (openbexiNavigator) openbexiNavigator.status(e.message, "orange");
            }
        }
    }
    else if (action == "pager" || action == "Edit") {
        if (parseInt(countCol) != 0 && parseInt(countRow) != 0) {
            for (var j = 0; j < parseInt(countCol); j++) {
                var colName = get_xml_classe_object_attribut_value(ob_doc, div_id, "col", "name" + j);
                for (var l = 0; l < parseInt(countRow); l++) {
                    try {
                        var formInputs = document.getElementById(div_id).getElementsByTagName("input");
                        if (formInputs.length == 0)  formInputs = document.getElementById(parentId).getElementsByTagName("input");
                        for (var m = 0; m < formInputs.length; m++) {
                            if (formInputs[m].name == table + "." + colName) {
                                var dojoId = formInputs[m].id.replace("text_", "dojo_");
                                var value = get_xml_classe_object_attribut_value(ob_doc, div_id, "item" + i + "_" + j + "_" + l, "value");
                                if (formInputs[m].type == "image")
                                    formInputs[m].src = value;
                                else if (formInputs[m].type == "checkbox")
                                    formInputs[m].checked = value;
                                else if (formInputs[m].type == "url")
                                        formInputs[m].href = value;
                                    else {
                                        formInputs[m].value = value;
                                        //if (dijit.byId(dojoId))
                                        //dijit.byId(dojoId).value = value;
                                    }
                                openbexi_updatePageData(null, "page", dojoId, "currentValue", value);
                            }
                        }
                    } catch(e) {
                        try {
                            if (document.getElementById("messageBox_" + parentId) != undefined)document.getElementById("messageBox_" + parentId).innerHTML = "<B>" + e.message + "</B>"
                            if (openbexiNavigator) openbexiNavigator.status(e.message, "orange");
                        } catch(e) {
                            //alert(e.message);
                        }
                    }
                }
            }
            if (document.getElementById("messageBox_" + div_id) != undefined)document.getElementById("messageBox_" + div_id).innerHTML = "<B>" + "Editing item " + pagerNumber + "</B>"
            if (document.getElementById("messageBox_" + parentId) != undefined)document.getElementById("messageBox_" + parentId).innerHTML = "<B>" + "Editing item " + pagerNumber + "</B>"
        } else {
            if (document.getElementById("messageBox_" + div_id) != undefined)document.getElementById("messageBox_" + div_id).innerHTML = "<B>" + "No item found" + "</B>"
            if (document.getElementById("messageBox_" + parentId) != undefined)document.getElementById("messageBox_" + parentId).innerHTML = "<B>" + "No item found" + "</B>"
        }
    }
    else
        if (action == "Add") {
            try {
                if (document.getElementById("messageBox_" + parentId) != undefined)document.getElementById("messageBox_" + parentId).innerHTML = "<B>" + "Current item has been added" + "</B>"
                if (openbexiNavigator) openbexiNavigator.status("Current item has been added", "green");
            } catch(e) {
                if (MSQ_status == "OK" && document.getElementById("messageBox_" + parentId) == undefined) alert("Current item has been added");
            }
        } else if (action == "Search") {
            try {
                if (document.getElementById("messageBox_" + parentId) != undefined)document.getElementById("messageBox_" + parentId).innerHTML = "<B>" + "Done" + "</B>"
                if (openbexiNavigator) openbexiNavigator.status("Current item has been added", "green");
            } catch(e) {
                if (MSQ_status == "OK" && document.getElementById("messageBox_" + parentId) == undefined) alert("Done");
            }
        }

        else if (action == "Submit" || action == "Update") {
                try {
                    if (document.getElementById("messageBox_" + parentId) != undefined)document.getElementById("messageBox_" + parentId).innerHTML = "<B>" + "Current item has been updated" + "</B>"
                    var formInputs = document.getElementById(parentId).getElementsByTagName("input");
                    if (formInputs == null)return null;
                    for (var m = 0; m < formInputs.length; m++) {
                        var occur = formInputs[m].name.match(table + ".");
                        if (occur != null) {
                            var item = formInputs[m].name.split(".");
                            if (item[1] != undefined) {
                                var inputId = formInputs[m].id;
                                var inputValue = formInputs[m].value;
                                openbexi_updatePageData(null, "page", inputId, "currentValue", inputValue);
                            }
                        }
                    }
                    if (openbexiNavigator) openbexiNavigator.status("Current item has been updated", "green");
                } catch(e) {
                    if (MSQ_status == "OK" && document.getElementById("messageBox_" + parentId) == undefined) alert("Current item has been updated");
                }
            }
            else if (action == "Delete") {
                    try {
                        if (document.getElementById("messageBox_" + parentId) != undefined)document.getElementById("messageBox_" + parentId).innerHTML = "<B>" + "Current item has been deleted" + "</B>"
                        var formInputs = document.getElementById(parentId).getElementsByTagName("input");
                        if (formInputs == null)return null;
                        for (var m = 0; m < formInputs.length; m++) {
                            var occur = formInputs[m].name.match(table + ".");
                            if (occur != null) {
                                var item = formInputs[m].name.split(".");
                                if (item[1] != undefined) {
                                    formInputs[m].value = "";
                                }
                            }
                        }
                        //action="pager";
                        //query="select * from "+table;
                        //openbexi_LNRequest(null, null, parentId, parentType, null, null, action, null, null, query, query_type, driver, url, user, passwd, null);
                        if (openbexiNavigator) openbexiNavigator.status("Current item has been deleted", "green");
                    }
                    catch(e) {
                        if (MSQ_status == "OK" && document.getElementById("messageBox_" + parentId) == undefined) alert("Current item has been deleted");
                    }
                }
                else
                {
                    try {
                        if (document.getElementById("messageBox_" + parentId) != undefined)document.getElementById("messageBox_" + parentId).innerHTML = "<B>" + "Sorry, function not yet implemented" + "</B>"
                        if (openbexiNavigator) openbexiNavigator.status("Sorry, function not yet implemented", "orange");
                    } catch(e) {
                        alert("Sorry, function not yet implemented");
                    }
                }

    try {
        openbexi_updatePageData(null, "url", div_id, "lang", _CURRENT_OPENBEXI_LANGUAGE);
        query = get_xml_classe_object_attribut_value(ob_doc, div_id, "request0", "text");
        openbexi_updatePageData(null, "url_0", div_id, "query", query);
        var url = get_xml_classe_object_attribut_value(ob_doc, "ob_database", "databaseCurrent", "url");
        openbexi_updatePageData(null, "database", div_id, "url", url);
        var driver = get_xml_classe_object_attribut_value(ob_doc, "ob_database", "databaseCurrent", "driver");
        openbexi_updatePageData(null, "database", div_id, "driver", driver);
        var user = get_xml_classe_object_attribut_value(ob_doc, "ob_database", "databaseCurrent", "user");
        openbexi_updatePageData(null, "database", div_id, "user", user);
        var passwd = get_xml_classe_object_attribut_value(ob_doc, "ob_database", "databaseCurrent", "passwd");
        openbexi_updatePageData(null, "database", div_id, "passwd", passwd);
    } catch (e) {
    }
    try {
        openbexi_add_SQL_link(div_id, "openbexi_form");
        if (openbexiNavigator) openbexiNavigator.reset();
        bexiObj.show_pager(null);
    } catch (e) {
    }
}
function openbexi_makeImg(value) {
    return "<img src=" + value + " style=\"width:100%;height:100%\" />";
}
function openbexi_makeImg_smaller(value) {
    return "<img src=" + value + " style=\"width:50%;height:50%\" />";
}
function openbexi_makeURL(value) {
    return "<a href=" + value + " >" + value + "<\/a>";
}
function openbexi_makeCheckbox(value) {
    if (value == true)
        return "<INPUT TYPE=CHECKBOX checked />";
    else
        return "<INPUT TYPE=CHECKBOX />";
}
function openbexi_dojoGrid_CB(responseXML) {
    //str_debug += "-------------responseXML:" + responseXML;
    var ob_doc = openbexi_get_documentElement(responseXML, "text/xml");
    var div_id = get_xml_classe_object_attribut_value(ob_doc, "ob_request", "object", "id");
    //var parentId = get_xml_classe_object_attribut_value(page_doc, "page", div_id, "parentId");
    var status = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "status", "text");
    if (status != "" && status != "done") {
        __openbexi_debugC("openbexi_dojoGrid_CB() Info:", "status=" + status);
        try {
            if (openbexiNavigator) openbexiNavigator.top_frame_message(status, "50px", "error");
        } catch (e) {
        }
        return;
    }

    var MSQ_status = get_xml_classe_object_attribut_value(ob_doc, div_id, "SQLDatabase", "status");
    try {
        var bexiObj = getSelectedBexiObj(div_id);
    }
    catch (e) {
    }
    //if (openbexi_getLoading_status(bexiObj.div.id) == "loaded") return;
    if (div_id != "" && div_id != undefined) openbexi_loaded_bexiObj(div_id);
    if (MSQ_status != "OK") {
        try {
            if (document.getElementById("messageBox_" + div_id) != undefined)document.getElementById("messageBox_" + div_id).innerHTML = "<B>" + MSQ_status + "</B>"
            //if (document.getElementById("messageBox_" + parentId) != undefined)document.getElementById("messageBox_" + parentId).innerHTML = "<B>" + MSQ_status + "</B>"
            if (openbexiNavigator) openbexiNavigator.status("SQLErrorData", "orange");
        } catch (e) {
            //alert(MSQ_status);
        }
        try {
            if (openbexiNavigator) openbexiNavigator.reset();
        } catch (e) {
        }
        return;
    }

    var count = get_xml_classe_object_attribut_value(ob_doc, div_id, "requests", "count");
    if (count == "")count = 1;
    var objectCount = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file", "objectCount");
    var objectMaxCount = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file", "objectMaxCount");
    var pagerNumber = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "pager", "number");
    //var change_model = get_xml_classe_object_attribut_value(ob_doc, "page", div_id, "change_model");
    var change_model = "true";
    var column_widths = get_xml_classe_object_attribut_value(ob_doc, "url", div_id, "column_widths");
    var column_widths_items = column_widths.split(",");
    var column_hiddens = get_xml_classe_object_attribut_value(ob_doc, "url", div_id, "column_hiddens");
    var column_hiddens_items = column_hiddens.split(",");
    var column_formatters = get_xml_classe_object_attribut_value(ob_doc, "url", div_id, "column_formatters");
    var column_formatters_items = column_formatters.split(",");
    var separator = openbexi_getPageData(null, "page", div_id, "csv_separator");
    if (separator == "") separator = ",";

    // Display results according SQL query
    var i = 0;
    var message = get_xml_classe_object_attribut_value(ob_doc, div_id, "message", "text" + i);
    var countCol = get_xml_classe_object_attribut_value(ob_doc, div_id, "column", "count" + i);
    var countRow = objectMaxCount;
    var pager = ob_get_pagers(div_id + "_pager");
    if (pager != null) {
        countRow = get_xml_classe_object_attribut_value(ob_doc, div_id, "row", "count" + i);
    }
    // Display SQL queries
    var query = "-1";
    var count1 = 0;
    if (document.getElementById("ob_SQLRequestInput"))document.getElementById("ob_SQLRequestInput").innerHTML = "";
    while (query != "") {
        query = get_xml_classe_object_attribut_value(ob_doc, div_id, "sql", "query" + i + "_" + String(count1));
        if (document.getElementById("ob_SQLRequestInput"))document.getElementById("ob_SQLRequestInput").innerHTML += query + " ;";
        count1++;
    }

    var header = new Array(parseInt(countCol));
    var model = "";
    var new_view = "[[";
    var structure = "{";
    for (var j = 0; j < parseInt(countCol); j++) {
        if (j == 0)
            structure += 'identifier:\'Column' + j + '\'';
        else
            structure += ', label:\'Column' + j + '\'';
    }
    structure += ', items:[]}';
    var store_data = new dojo.data.ItemFileWriteStore({data: eval('(' + structure + ')')});

    for (var l = 0; l < parseInt(countRow); l++) {
        var ob_row = "{";
        for (j = 0; j < parseInt(countCol); j++) {
            try {
                var head = get_xml_classe_object_attribut_value(ob_doc, div_id, "col", "name" + j);
                var value = get_xml_classe_object_attribut_value(ob_doc, div_id, "item" + i + "_" + j + "_" + l, "value");

                if (j == 0)
                    ob_row += "\'Column" + j + "\':\'" + value + '\'';
                else
                    ob_row += ", \'Column" + j + "\':\'" + value + '\'';

                if (change_model == "true" && l == 0) {
                    var width = "100px";
                    var hidden = false;
                    var formatter = "";

                    if (j == 0)
                        model += head;
                    else
                        model += separator + head;

                    var occur = value.match(".gif|.jpg|jpeg|.bmp|.tiff|.png|.riff|.bgi|.svg|.PNG|.JPG|.JPEG|.GIF|.BMP|.TIFF");
                    if (occur != null && change_model == "true" && formatter == "") formatter = "openbexi_makeImg";
                    occur = value.match("http:|https:");
                    if (occur != null && change_model == "true" && formatter == "") formatter = "openbexi_makeURL";
                    occur = value.match("true|false");
                    if (occur != null && change_model == "true" && formatter == "") formatter = "openbexi_makeCheckbox";

                    if (column_widths != "") {
                        width = column_widths_items[j];
                        if (width == undefined || width == "undefined") width = "100px";
                    }
                    if (column_formatters != "") {
                        formatter = column_formatters_items[j];
                        if (formatter == undefined || formatter == "undefined") formatter = "";
                    }
                    if (column_hiddens != "") {
                        hidden = column_hiddens_items[j];
                        if (hidden == undefined || hidden == "undefined" || hidden == "false")
                            hidden = false;
                        else
                            hidden = true;
                    }

                    if (formatter != "") {
                        header [j] = {name:head,field:'Column' + j,width:width,hidden:hidden,formatter:eval(formatter)};
                        new_view += "{name: \"" + head + "\", field: \"Column " + j + "\", width: \"" + width + "\", hidden: \"" + hidden + "\", formatter: \"" + formatter + "\"},";
                    }
                    else {
                        header [j] = {name:head,field:'Column' + j,width:width,hidden:hidden};
                        new_view += "{name: \"" + head + "\", field: \"Column " + j + "\", width: \"" + width + "\", hidden: \"" + hidden + "\"},";
                    }
                }

            } catch(e) {
                __openbexi_debugC("openbexi_dojoGrid_CB()", "Exception:" + e.message);
            }
        }
        ob_row += "}";
        try {
            store_data.newItem(eval('(' + ob_row + ')'));
        } catch (e) {
            __openbexi_debugC("openbexi_dojoGrid_CB()", "Exception:" + e.message);
        }
    }
    new_view += "]];";
    try {
        openbexi_getCsvData(div_id, store_data, false);
        getSelectedBexiObj(div_id).view1 = new_view;
    } catch (e) {
    }
    try {
        openbexi_updatePageData(null, "page", div_id, "model", model);
        var grid = dijit.byId("dojo_" + div_id);
        if (change_model == "true") {
            grid.setStructure(header);
        }
        grid.store.fetch({
            query : {},
            onComplete : function(items, request) {
                var grid = dijit.byId("dojo_" + div_id);
                grid.setStore(store_data);
                setTimeout(function() {
                    grid.update();
                }, 1000);
            },
            error: function(message, ioArgs) {
                alert(message + "\nurl: " + ioArgs.url);
            }
        });
    } catch (e) {
        alert(e)
    }
    //__openbexi_debugC("openbexi_dojoGrid_CB", str_debug);
    try {
        openbexi_updatePageData(null, "url", div_id, "lang", _CURRENT_OPENBEXI_LANGUAGE);
        query = get_xml_classe_object_attribut_value(ob_doc, div_id, "request0", "text");
        openbexi_updatePageData(null, "url_0", div_id, "query", query);
        var url = get_xml_classe_object_attribut_value(ob_doc, "ob_database", "databaseCurrent", "url");
        openbexi_updatePageData(null, "database", div_id, "url", url);
        var driver = get_xml_classe_object_attribut_value(ob_doc, "ob_database", "databaseCurrent", "driver");
        openbexi_updatePageData(null, "database", div_id, "driver", driver);
        var user = get_xml_classe_object_attribut_value(ob_doc, "ob_database", "databaseCurrent", "user");
        openbexi_updatePageData(null, "database", div_id, "user", user);
        var passwd = get_xml_classe_object_attribut_value(ob_doc, "ob_database", "databaseCurrent", "passwd");
        openbexi_updatePageData(null, "database", div_id, "passwd", passwd);
    } catch (e) {
    }
    try {
        if (pager != null) pager.setup(ob_doc);
    } catch (e) {
    }
    if (document.getElementById("LNRequestNewModel_status")) {
        if (status == "done") {
            document.getElementById("LNRequestNewModel_status").value = "OK ...";
            document.getElementById("LNRequestNewModel_status").style.background = "green";
        }
        else if (status == "Please, Check if the SQL server is still working ...") {
            document.getElementById("LNRequestNewModel_status").value = "Cannot get data from server. Please, check if the SQL server is still working ...";
            document.getElementById("LNRequestNewModel_status").style.background = "red";
        }
        else {
            document.getElementById("LNRequestNewModel_status").value = "Cannot get data from server.";
            document.getElementById("LNRequestNewModel_status").style.background = "yellow";
        }
    }
    try {
        openbexi_add_SQL_link(div_id, "openbexi_dojo", query);
        if (openbexiNavigator) openbexiNavigator.reset();
    } catch (e) {
    }
}
// =====TABLE====
function openbexi_cleanUpData() {
    // alert("Sorry, not yet implemented");
}
function openbexi_SQL_update() {
    alert("Sorry, not yet implemented");
}
function openbexi_SQL_refresh() {
    alert("Sorry, not yet implemented");
}
function openbexi_setData2(div_id, ob_doc) {
    openbexi_cleanUpData();
    var maxrow = get_xml_classe_object_attribut_value(ob_doc, div_id, "message", "text0");
    var message = get_xml_classe_object_attribut_value(ob_doc, div_id, "message", "text0");
    var countCol = get_xml_classe_object_attribut_value(ob_doc, div_id, "column", "count0");
    var countRow = get_xml_classe_object_attribut_value(ob_doc, div_id, "row", "count0");
    if (countCol == "")countCol = "0";
    if (countRow == "")countRow = "0";
    for (var i = 0; i < parseInt(countCol); i++) {
        if (document.getElementById("text_" + div_id + "headH_" + i)) {
            document.getElementById("text_" + div_id + "headH_" + i).innerHTML = get_xml_classe_object_attribut_value(ob_doc, div_id, "col", "name" + i);
        }
        for (var j = 0; j < parseInt(countRow); j++) {
            if (document.getElementById("text_" + div_id + "_" + i + "_" + j))
                document.getElementById("text_" + div_id + "_" + i + "_" + j).innerHTML = get_xml_classe_object_attribut_value(ob_doc, div_id, "item0" + "_" + i + "_" + j, "value");
        }
    }
    var row = document.getElementById(div_id).getAttribute("ob_row");
    for (j = 0; j < row; j++) {
        if (document.getElementById("text_" + div_id + "headV_" + j))document.getElementById("text_" + div_id + "headV_" + j).innerHTML = j;
    }
}
function openbexi_List_CB(responseXML) {
    //alert(responseXML);
    var bexiObj;
    var ob_doc = openbexi_get_documentElement(responseXML, "text/xml");
    var div_id = get_xml_classe_object_attribut_value(ob_doc, "ob_request", "object", "id");
    var row = get_xml_classe_object_attribut_value(ob_doc, div_id, "row", "count0");
    var list_id = div_id;
    var MSQ_status = get_xml_classe_object_attribut_value(ob_doc, div_id, "SQLDatabase", "status");
    var status = get_xml_classe_object_attribut_value(ob_doc, div_id, "request0", "status");
    var objectMaxCount = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file", "objectMaxCount");

    if (div_id != "" && div_id != undefined)openbexi_loaded_bexiObj(div_id);
    if (row == "0") {
        bexiObj = getSelectedBexiObj(list_id);
        if (bexiObj.type == "openbexi_list")bexiObj.removeAllItem();
        try {
            if (openbexiNavigator) openbexiNavigator.status("SQLNoData", "yellow");
        } catch (e) {
        }
        try {
            if (openbexiNavigator) openbexiNavigator.reset();
        } catch (e) {
        }
        return;
    }
    if (MSQ_status != "OK") {
        try {
            if (openbexiNavigator) openbexiNavigator.status("SQLErrorData", "red");
        } catch (e) {
        }
        try {
            if (openbexiNavigator) openbexiNavigator.reset();
        } catch (e) {
        }
        return;
    }
    if (div_id == "" || div_id == "none" || div_id == undefined) {
        var list = add_HTMLList(null);
        list_id = list.div.id;
    }
    if (document.getElementById("LNRequestNewModel_status")) {
        if (status == "done") {
            document.getElementById("LNRequestNewModel_status").value = "OK ...";
            document.getElementById("LNRequestNewModel_status").style.background = "green";
        }
        else if (status == "Please, Check if the SQL server is still working ...") {
            document.getElementById("LNRequestNewModel_status").value = "Cannot get data from server. Please, check if the SQL server is still working ...";
            document.getElementById("LNRequestNewModel_status").style.background = "red";
            try {
                if (openbexiNavigator) openbexiNavigator.reset();
            } catch (e) {
            }
            return;
        }
        else {
            document.getElementById("LNRequestNewModel_status").value = "Cannot get data from server.";
            document.getElementById("LNRequestNewModel_status").style.background = "yellow";
            try {
                if (openbexiNavigator) openbexiNavigator.reset();
            } catch (e) {
            }
            return;
        }
    }
    //str_debug += "list.length=" + list.length + "\n";
    try {
        bexiObj = getSelectedBexiObj(list_id);
        if (bexiObj.type == "openbexi_list")bexiObj.removeAllItem();

        // Display results according SQL query
        var count = get_xml_classe_object_attribut_value(ob_doc, div_id, "requests", "count");
        if (count == "")count = 1;
        for (var i = 0; i < parseInt(count); i++) {
            var message = get_xml_classe_object_attribut_value(ob_doc, div_id, "message", "text" + i);
            var countCol = get_xml_classe_object_attribut_value(ob_doc, div_id, "column", "count" + i);
            var countRow = objectMaxCount;
            var pager = ob_get_pagers(div_id + "_pager");
            if (pager != null) {
                countRow = get_xml_classe_object_attribut_value(ob_doc, div_id, "row", "count" + i);
            }
            // Display SQL queries
            var query = "-1";
            var count1 = 0;
            if (document.getElementById("ob_SQLRequestInput"))document.getElementById("ob_SQLRequestInput").innerHTML = "";
            while (query != "") {
                query = get_xml_classe_object_attribut_value(ob_doc, div_id, "sql", "query" + i + "_" + String(count1));
                if (document.getElementById("ob_SQLRequestInput"))document.getElementById("ob_SQLRequestInput").innerHTML += query + " ;";
                count1++;
            }
            for (var j = 0; j < parseInt(countCol); j++) {
                for (var l = 0; l < parseInt(countRow); l++) {
                    try {
                        bexiObj.addItem(get_xml_classe_object_attribut_value(ob_doc, div_id, "item" + i + "_" + j + "_" + l, "value"), bexiObj.theme);
                        //alert("openbexi_List_CB:  bexiObj.div.innerHTML=\n"+bexiObj.div.innerHTML);
                    } catch(e) {
                        //__openbexi_debugC("openbexi_List_CB", "catch exception" + " " + e.name + ". Error message: " + e.message);
                        if (document.getElementById("ob_text_connectionDetails")) document.getElementById("ob_text_connectionDetails").value = "openbexi_List_CB, problem for " + list[i].name + " " + e.name + ". Error message: " + e.message;
                    }
                }
            }
        }
    } catch (e) {
    }
    try {
        openbexi_updatePageData(null, "url", list_id, "lang", _CURRENT_OPENBEXI_LANGUAGE);
        var query = get_xml_classe_object_attribut_value(ob_doc, div_id, "request0", "text");
        openbexi_updatePageData(null, "url_0", list_id, "query", query);
        var url = get_xml_classe_object_attribut_value(ob_doc, "ob_database", "databaseCurrent", "url");
        openbexi_updatePageData(null, "database", list_id, "url", url);
        var driver = get_xml_classe_object_attribut_value(ob_doc, "ob_database", "databaseCurrent", "driver");
        openbexi_updatePageData(null, "database", list_id, "driver", driver);
        var user = get_xml_classe_object_attribut_value(ob_doc, "ob_database", "databaseCurrent", "user");
        openbexi_updatePageData(null, "database", list_id, "user", user);
        var passwd = get_xml_classe_object_attribut_value(ob_doc, "ob_database", "databaseCurrent", "passwd");
        openbexi_updatePageData(null, "database", list_id, "passwd", passwd);
        if (countRow == 0)
            if (openbexiNavigator) openbexiNavigator.status("SQLNoData", "yellow");
        if (status == "OK")
            if (openbexiNavigator) openbexiNavigator.status("Found " + count + " item(s)", "yellow");
            else
                if (openbexiNavigator) openbexiNavigator.status(status, "yellow");
    } catch (e) {
    }
    try {
        if (openbexiNavigator) openbexiNavigator.reset();
    } catch (e) {
    }
    //__openbexi_debugC("openbexi_List_CB", str_debug);
}
function openbexi_getMetaDataRequest_CB(responseXML) {
    //alert(responseXML);
    openbexi_MetaDataRequest = responseXML;
    openbexi_MetaDataClassRequest = [];
    openbexi_MetaDataAttributClassRequest = [];
    openbexi_MetaDataClassLinkRequest = [];
    var ob_doc = openbexi_get_documentElement(responseXML, "text/xml");
    var div_id = get_xml_classe_object_attribut_value(ob_doc, "ob_request", "object", "id");
    if (div_id != "" && div_id != undefined)openbexi_loaded_bexiObj(div_id);
    var MSQ_status = get_xml_classe_object_attribut_value(ob_doc, div_id, "SQLDatabase", "status");
    if (MSQ_status != "OK") {
        try {
            if (openbexiNavigator) openbexiNavigator.status("SQLErrorData", "red");
            if (openbexiNavigator) openbexiNavigator.reset();
        } catch (e) {
        }
        try {
            if (openbexiNavigator) openbexiNavigator.reset();
        } catch (e) {
        }
        return;
    }
    var mouse_x = get_xml_classe_object_attribut_value(ob_doc, div_id, "mouse", "x");
    var mouse_y = get_xml_classe_object_attribut_value(ob_doc, div_id, "mouse", "y");
    //var col_name = get_xml_classe_object_attribut_value(ob_doc, div_id, "col_0", "name");
    var maxItems = get_xml_classe_object_attribut_value(ob_doc, div_id, "list", "maxItems");
    var posCurrentItem = get_xml_classe_object_attribut_value(ob_doc, div_id, "list", "posCurrentItem");
    if (openbexiPopup_menu != null) {
        openbexiPopup_menu.posCurrentItem = parseInt(posCurrentItem);
        openbexiPopup_menu.x = mouse_x;
        openbexiPopup_menu.y = mouse_y;
    }
    var nextPreviousStatus = get_xml_classe_object_attribut_value(ob_doc, div_id, "list", "nextPreviousStatus");
    var countClass = get_xml_classe_object_attribut_value(ob_doc, div_id, "class", "count");

    // Update posCurrentItem of the  current openbexiPopup_menu
    if (parseInt(countClass) > 0) {
        for (var j = 0; j < parseInt(maxItems); j++) {
            try {
                var data = get_xml_classe_object_attribut_value(ob_doc, div_id, "class_" + j, "name");
                if (data == "")
                    openbexi_MetaDataClassRequest[j] = "..."
                else
                    openbexi_MetaDataClassRequest[j] = get_xml_classe_object_attribut_value(ob_doc, div_id, "class_" + j, "name");
            } catch(e) {
                openbexi_MetaDataClassRequest = [
                    ["Meta Data:classes"]
                ];
            }
        }
    } else {
        openbexi_MetaDataClassRequest = [
            ["Meta Data:classes"]
        ];
    }
    // If nextPreviousStatus = none: don't display the popup menu
    if (nextPreviousStatus == "none") {
        try {
            if (openbexiNavigator) openbexiNavigator.reset();
        } catch (e) {
        }
        return;
    }
    try {
        var popupId = "popup_menu0";
        if (openbexiPopup_menu == null)
            openbexiPopup_menu = new openbexi_popup_menu(popupId);
        else
            openbexiPopup_menu.removeAllItemMenu();
        for (var i = 0; i < openbexi_MetaDataClassRequest.length; i++) {
            openbexiPopup_menu.addItemMenu(popupId + "_" + i, 'openbexi_setMetaDataRequest(event,' + '"' + i + '' + '")', openbexi_MetaDataClassRequest[i]);
        }
        openbexiPopup_menu.addSep(null, "");
        openbexiPopup_menu.addNextPreviousItemMenu(popupId + "_previousNext", 'openbexi_setPreviousMetaDataRequest(event)', 'openbexi_setNextMetaDataRequest(null)');
        //openbexiPopup_menu.addCloseItemMenu(popupId + "_close", 'openbexiPopup_menu.hiddenMenu(null)');
        openbexiPopup_menu.addItemMenu(popupId + "_close", 'openbexi_closeMenu3(event)', "close");
        openbexiPopup_menu.showMenu3(null, popupId, "220px", false, mouse_x, mouse_y);
    } catch(e) {
        alert("Sorry, cannot set up the popup_menu for " + div_id + "\n:" + e.name + ". Error message: " + e.message);
    }
    try {
        if (openbexiNavigator) openbexiNavigator.reset();
    } catch (e) {
    }
}
function openbexi_loadCSV(div_id, doc) {
    try {
        if (div_id == null || div_id == undefined)  div_id = getSelectedBexiObj(null).div.id;

        if (doc == null) {
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "objectMaxCount", 100);
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "objectCount", 0);
            var rowCount = openbexi_getPageData(null, "page", div_id, "rowCount");
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "maxItems", rowCount);
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "posCurrentItem", 0);
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "nextPreviousStatus", "none");
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "pager", "number", 0);
        }

        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_readCSVRequest");

        //Mode
        var mode = openbexi_getPageData(null, "page", div_id, "csv_mode");
        if (document.getElementById("bexicontext_csv_mode")) {
            mode = document.getElementById("bexicontext_csv_mode").value;
            if (mode == "") mode = "local";
            openbexi_updatePageData(null, "page", div_id, "csv_mode", mode);
        }
        doc = set_xml_classe_object_attribut_value(doc, "file", "csv", "mode", mode);

        // filename
        var name = openbexi_getPageData(null, "page", div_id, "csv_file");
        if (document.getElementById("bexicontext_csv_file")) {
            name = document.getElementById("bexicontext_csv_file").value;
            openbexi_updatePageData(null, "page", div_id, "csv_file", name);
        }
        doc = set_xml_classe_object_attribut_value(doc, "file", "csv", "name", name);

        // path
        var path = openbexi_getPageData(null, "page", div_id, "csv_path");
        if (document.getElementById("bexicontext_csv_path")) {
            path = document.getElementById("bexicontext_csv_path").value;
            openbexi_updatePageData(null, "page", div_id, "csv_path", path);
        }
        doc = set_xml_classe_object_attribut_value(doc, "file", "csv", "path", path);

        //extension
        var extension = openbexi_getPageData(null, "page", div_id, "csv_extension");
        if (document.getElementById("bexicontext_csv_extension")) {
            extension = document.getElementById("bexicontext_csv_extension").value;
            if (extension == "") extension = ".csv";
            openbexi_updatePageData(null, "page", div_id, "csv_extension", extension);
        }
        doc = set_xml_classe_object_attribut_value(doc, "file", "csv", "extension", extension);

        // separator
        var separator = openbexi_getPageData(null, "page", div_id, "csv_separator");
        if (document.getElementById("bexicontext_csv_separator")) {
            separator = document.getElementById("bexicontext_csv_separator").value;
            if (separator == "") separator = ",";
            openbexi_updatePageData(null, "page", div_id, "csv_separator", separator);
        }
        doc = set_xml_classe_object_attribut_value(doc, "file", "csv", "separator", separator);
        __openbexi_debugC("openbexi_loadCSV", "Info:separator=" + separator);
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "object", "id", div_id);
        var model = openbexi_getPageData(null, "page", div_id, "model");
        doc = set_xml_classe_object_attribut_value(doc, "url", div_id, "model", model);
        __openbexi_debugC("openbexi_loadCSV", "Info:model=" + model);
        var column_widths = openbexi_getPageData(null, "page", div_id, "column_widths");
        doc = set_xml_classe_object_attribut_value(doc, "url", div_id, "column_widths", column_widths);
        var column_hiddens = openbexi_getPageData(null, "page", div_id, "column_hiddens");
        doc = set_xml_classe_object_attribut_value(doc, "url", div_id, "column_hiddens", column_hiddens);
        var column_formatters = openbexi_getPageData(null, "page", div_id, "column_formatters");
        doc = set_xml_classe_object_attribut_value(doc, "url", div_id, "column_formatters", column_formatters);
        var data_change = openbexi_getPageData(null, "page", div_id, "data_change");
        doc = set_xml_classe_object_attribut_value(doc, "url", div_id, "data_change", data_change);
        var count = 0;
        var data_cvs;
        while (true) {
            data_cvs = openbexi_getPageData(null, "page", div_id, "data_" + count);
            if (data_cvs == "")break;
            doc = set_xml_classe_object_attribut_value(doc, "url", div_id, "data_" + count, data_cvs);
            __openbexi_debugC("openbexi_loadCSV", "Info:data=" + data_cvs);
            count++;
        }
        var ob_xml = openbexi_get_xmlString(doc);
        var mode_sync = openbexi_synchron();
        openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_dojoGrid_CB, null);
    } catch (e) {
        __openbexi_debugC("openbexi_loadCSV", "Exception:" + e.message);
    }
}
;
function openbexi_DOJOEditor_CB(responseXML) {
    var ob_doc = openbexi_get_documentElement(responseXML, "text/xml");
    var targetId = get_xml_classe_object_attribut_value(ob_doc, "ob_request", "request", "targetId");
    var value = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "function", "return");
    if (targetId != "") {
        var widget = document.getElementById(targetId);
        if (widget) widget.innerHTML = value;
    }
}
function openbexi_update_FormData() {
    if (OPENBEXI_PRIVATE_CONTEXT_XML) openbexi_server_CB(OPENBEXI_PRIVATE_CONTEXT_XML);
    if (document.getElementById("bexicontext.language.name") && document.getElementById("bexicontext.language.name").value == "")
        document.getElementById("bexicontext.language.name").value = openbexi_getLanguage2();
    if (document.getElementById("bexicontext.browser.name") && document.getElementById("bexicontext.browser.name").value == "")
        document.getElementById("bexicontext.browser.name").value = getBrowser();
    if (document.getElementById("bexicontext.os.name") && document.getElementById("bexicontext.os.name").value == "")
        document.getElementById("bexicontext.os.name").value = openbexi_get_OS();
}

function openbexi_getCsvData(div_id, store, reload) {
    //Invoke the fetch to update grid_data.
    try {
        function completed(items, findResult) {
            var grid_data = "";
            var attr = store.getAttributes(items[0]);
            for (var j = 0; j < attr.length; j++) {
                if (j == 0)
                    grid_data += attr[j];
                else
                    grid_data += "," + attr[j];
            }
            openbexi_updatePageData(null, "page", div_id, "data_0", grid_data);
            for (var i = 0; i < items.length; i++) {
                grid_data = "";
                for (j = 0; j < attr.length; j++) {
                    var value = store.getValue(items[i], attr[j]);
                    if (j == 0)
                        grid_data += value;
                    else
                        grid_data += "," + value;
                }
                openbexi_updatePageData(null, "page", div_id, "data_" + (i + 1), grid_data);
            }
            openbexi_updatePageData(null, "page", div_id, "data_change", "true");
            if (reload) getSelectedBexiObj(null).reload_model_and_data(null);
            openbexi_updatePageData(null, "page", div_id, "data_change", "false");
        }

        function ob_storeData_error(errData, request) {
            try {
            } catch(e) {
            }
        }

        store.fetch({onComplete: completed, onError: ob_storeData_error});
    } catch (e) {
        __openbexi_debugC("openbexi_getCvsData()", "Exception: " + e.message);
    }
}
function openbexi_getStoreData(grid_data, type, separator) {
    try {
        var store;
        if (type == "csv")
            store = dojox.data.CsvStore({data: grid_data});
        else
            store = new dojo.data.ItemFileReadStore({data: grid_data});
    } catch (e) {
        __openbexi_debugC("openbexi_getStoreData()", "Exception: " + e.message);
    }
    return store;
}
;
function openbexi_getStrView(view) {
    var str_view = "";
    try {
        if (view == null || view == undefined) {
            str_view = "[\n";
            str_view += "    {\n";
            str_view += "        field: 'Column0',\n";
            str_view += "        name: 'Column 0',\n";
            str_view += "        width: '200px'\n";
            str_view += "    },\n";
            str_view += "    {\n";
            str_view += "        field: 'Column1',\n";
            str_view += "        name: 'Column 1',\n";
            str_view += "        width: '200px'\n";
            str_view += "    },\n";
            str_view += "    {\n";
            str_view += "        field: 'Column2',\n";
            str_view += "        name: 'Column 2',\n";
            str_view += "        width: '200px'\n";
            str_view += "    }\n";
            str_view += "];\n";
        } else {
            str_view = JSON.stringify(view);
        }
        try {
            return openbexi_unformatText(str_view);
        } catch(e) {
        }
    } catch(e) {
    }
    return view;
}
function openbexi_getJsonView(str_view) {
    try {
        return eval(str_view);
    } catch(e) {
        return null;
    }
}
function openbexi_formatText(text, tab, ret) {
    var textFormated = "";
    for (var i = 0; i < text.length; i++) {
        if ((text[i] == "{"))
            textFormated += "\n\t" + text[i];
        else if ((text[i] == "[" && ret))
            textFormated += "\n" + text[i];
        else if ((text[i] == "]" && ret))
                textFormated += "\n" + text[i];
            else if ((text[i] == "," && tab && ret))
                    textFormated += "\n\t" + text[i];
                else
                    textFormated += text[i];

    }
    return textFormated;
}
function openbexi_unformatText(text) {
    var textunFormated = "";
    for (var i = 0; i < text.length; i++) {
        if ((text[i] != '\n' && text[i] != '\t' && text[i] != '\r'))
            textunFormated += text[i];
    }
    return textunFormated;
}

