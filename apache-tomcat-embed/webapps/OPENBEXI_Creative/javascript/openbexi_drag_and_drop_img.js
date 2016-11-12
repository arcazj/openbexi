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
function __openbexi_drag_and_drop_img_debugC(f, text) {
    try {
        __openbexi_debugC(f, text);
    } catch (e) {
    }
}
function openbexi_drop_new_cvs(e, div_id, filename) {
    var items = e.target.result.split("\n");
    var count = -1;
    var separator = ",";
    var col_count;
    var flag_ID = false;

    for (var h = 0; h < items.length; h++) {
        if (count == -1) {
            //Look for separator
            var list = items[h].split("|");
            if (list.length > 2) separator = "|";
            list = items[h].split(";");
            if (list.length > 2) separator = ";";
            list = items[h].split("#");
            if (list.length > 2) separator = "#";
            list = items[h].split(separator);
            var model = "";
            col_count = list.length;
            if (col_count > 1) {
                if (list[0] == "ID")
                    flag_ID = true;
                else
                    model = "ID";
                for (var z = 0; z < col_count; z++)
                    model += separator + list[z];
                openbexi_updatePageData(null, "page", div_id, "model", model);
            } else
                count --;
        }
        else {
            list = items[h].split(separator);
            if (list.length > 1) {
                var data = "";
                if (!flag_ID)
                    data = count + separator + list[0];
                else
                    data = list[0];
                for (var z = 1; z < col_count; z++) {
                    try {
                        if (list[z] == undefined) list[z] = "";
                        data += separator + list[z];
                    } catch (e2) {
                        data += separator;
                    }
                }
                openbexi_updatePageData(null, "page", div_id, "data_" + count, data);
            } else
                count--;
        }
        count++;
    }
    openbexi_deletePageData(null, "page", div_id, "data_" + count, "");
    openbexi_updatePageData(null, "page", div_id, "csv_path", "project/" + openbexiNavigator.projectName + "/data");
    openbexi_updatePageData(null, "page", div_id, "csv_file", filename.replace(".csv", ""));
    openbexi_updatePageData(null, "page", div_id, "csv_extension", ".csv");
    openbexi_updatePageData(null, "page", div_id, "csv_separator", separator);
    openbexi_updatePageData(null, "page", div_id, "data_change", "dropped");
    openbexi_loadCSV(div_id, null);
    openbexi_updatePageData(null, "page", div_id, "data_change", "false");
    //openbexi_updatePageData(null, "page", div_id, "rowCount", (count-1));
}
function openbexi_drop_new_img(e, index, bexi_obj) {
    try {
        openbexi_stopEventPropagation(e);
        if (index == undefined)  index = 0;
        var ob_loading_img_from_drop = bexi_obj.img;
        if (!e.dataTransfer) {
            alert("Your browser does not support the dataTransfer object.");
            return;
        }
        var file = e.dataTransfer.files[index];
        //alert(file.name+" "+file.fileName)
        var reader = new FileReader();
        reader.bexi_type = bexi_obj.type;
        if (openbexiNavigator.css_mode == "backgroundImage")
            if (reader.bexi_type == "openbexi_body")
                reader.ob_loading_img_from_drop = bexi_obj;
            else
                reader.ob_loading_img_from_drop = bexi_obj.div;
        else
            reader.ob_loading_img_from_drop = bexi_obj.img;
        reader.css_mode = openbexiNavigator.css_mode;
        reader.onloadend = function (event) {
            if (this.css_mode == "backgroundImage")
                if (this.bexi_type == "openbexi_body")
                    document.body.background = event.target.result;
                else
                    this.ob_loading_img_from_drop.style.background = "url(" + event.target.result + ")";
            else
                this.ob_loading_img_from_drop.src = event.target.result;
            bexi_obj.base64 = "true";
            openbexi_updatePageData(null, "img", bexi_obj.div.id, "base64", "true");
            //getSelectedBexiObj(null).save_image(event, null, file.fileName, event.target.result );
            ob_setDirty_flag(true);
        };
        reader.onload = function (event) {
        };
        reader.readAsDataURL(file);

        var transferObj = e.dataTransfer;
        if (transferObj == null || transferObj == "" || transferObj == undefined)
            alert("Your browser does not support the dataTransfer object.");

    } catch (e1) {
        __openbexi_drag_and_drop_img_debugC("openbexi_img.prototype.drop_new_img()", "Exception:" + e1.message);
    }
}
function openbexi_ondrop_cancel(event) {
    openbexi_stopEventPropagation(event);
    return false;
}
function openbexi_ondrop_ok(event) {
    try {
        openbexi_stopEventPropagation(event);
        if (!event.dataTransfer) {
            //alert("Your browser does not support the dataTransfer object...");
            return false;
        }
        var file_type = "";
        var file_name = "";
        if (event.dataTransfer.files.length == 0)
            return;
        if (event.dataTransfer.files[0] != undefined) {
            file_type = event.dataTransfer.files[0].type;
            file_name = event.dataTransfer.files[0].name;
        } else {
            //alert("Your browser does not support the dataTransfer object...");
            return false;
        }

        if (getSelectedBexiObj(null).type == "openbexi_img" && file_type.match("image")) {
            openbexi_drop_new_img(event, 0, getSelectedBexiObj(null));
            return false;
        }
        else if ((getSelectedBexiObj(null).subtype == "dojox.grid.Grid" || getSelectedBexiObj(null).type == "openbexi_body" || getSelectedBexiObj(null).type == "openbexi_page" || getSelectedBexiObj(null).type == "openbexi_form") && file_name.match(".csv")) {
            var div_id;
            if ((getSelectedBexiObj(null).type == "openbexi_body") || getSelectedBexiObj(null).type == "openbexi_page" || getSelectedBexiObj(null).type == "openbexi_form") {
                var grid = add_HTMLDojo(null, 'dojox.grid.Grid', 'Grid/Table', null, null, null, null);
                div_id = grid.div.id;
            } else {
                div_id = getSelectedBexiObj(null).div.id;
            }

            var reader = new FileReader();
            reader.filename = file_name;
            reader.div_id = div_id;
            reader.onloadend = function (event) {
                openbexi_drop_new_cvs(event, this.div_id, this.filename);
            };
            reader.onload = function (event) {
            };
            reader.readAsText(event.dataTransfer.files[0]);
            return false;
        }
        else  if ((getSelectedBexiObj(null).type == "openbexi_body" || getSelectedBexiObj(null).type == "openbexi_page" || getSelectedBexiObj(null).type == "openbexi_form" || getSelectedBexiObj(null).type == "openbexi_fisheye") && file_type.match("image")) {
                for (var i = 0; i < event.dataTransfer.files.length; i++) {
                    if (openbexiNavigator.css_mode == "backgroundImage")
                        openbexi_drop_new_img(event, i, getSelectedBexiObj(null));
                    else
                        openbexi_drop_new_img(event, i, add_HTMLImg(null, "gif/no-photo.jpg", null, null, true));
                }
                return false;
            }
            else if (getSelectedBexiObj(null).type == "openbexi_tree" && file_name.match(RegExp(".json"))) {
                    var reader = new FileReader();
                    reader.filename = file_name;
                    reader.onloadend = function (event) {
                        if (getSelectedBexiObj(null).type == "openbexi_tree") {
                            openbexi_updatePageData(null, "page", getSelectedBexiObj(null).div.id, "tree_path", "");
                            openbexi_updatePageData(null, "page", getSelectedBexiObj(null).div.id, "tree_name", this.filename);
                            openbexi_updatePageData(null, "page", getSelectedBexiObj(null).div.id, "tree_json", event.target.result);
                            getSelectedBexiObj(null).load_tree_view(event);
                        }
                    };
                    reader.onload = function (event) {
                    };
                    reader.readAsText(event.dataTransfer.files[0]);
                    return false;
                }
                else if (getSelectedBexiObj(null).type == "openbexi_timeline" && (file_name.match(RegExp(".xml")) || file_name.match(RegExp(".js")))) {
                        var reader = new FileReader();
                        var div_id =getSelectedBexiObj(null).div.id;
                        reader.filename = file_name;
                        reader.onloadend = function (event) {
                            // Events
                            if (file_name.match(RegExp(".xml"))) {
                                //getSelectedBexiObj(null).save_timeline_events(event);
                                ob_get_timelines(div_id).load_Data(div_id,this.filename, event.target.result);
                            }
                            // Theme/Bands infos
                            if (file_name.match(RegExp(".js"))) {
                                ob_get_timelines(div_id).load_Data(div_id,this.filename, event.target.result);
                            }
                        };
                        reader.onload = function (event) {
                        };
                        reader.readAsText(event.dataTransfer.files[0]);
                        return false;
                    }
                    else if (getSelectedBexiObj(null).type == "openbexi_body" && file_name.match(RegExp(".xml"))) {
                            var reader = new FileReader();
                            reader.filename = file_name;
                            reader.onloadend = function (event) {
                                var doc = event.target.result;
                                var ob_doc = openbexi_get_documentElement(doc, "text/xml");
                                var request_type = get_xml_classe_object_attribut_value(ob_doc, "ob_request", "request", "type");
                                if (request_type == "openbexi_charFlowRequest") {
                                    openbexi_rebuildChartFlow_CB(doc);
                                } else {
                                    alert(file_name + ": Type " + file_type + " not supported for " + getSelectedBexiObj(null).type);
                                }
                            };
                            reader.onload = function (event) {
                            };
                            reader.readAsText(event.dataTransfer.files[0]);
                            return false;
                        }
                        else if (getSelectedBexiObj(null).type == "openbexi_dojo_editor" && (file_name.match(RegExp(".xml"))) || file_name.match(RegExp(".rss"))) {
                                var reader = new FileReader();
                                reader.filename = file_name;
                                reader.onloadend = function (event) {
                                    var doc = null;
                                    var div_id = getSelectedBexiObj(null).div.id;
                                    doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "xml", "div_id", div_id);
                                    doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "xml", "Body", div_id + "_rssBodyTemplate");
                                    doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "xml", "Title", div_id + "_rssTitleTemplate");
                                    doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "xml", "text", event.target.result);
                                    var ob_xml = openbexi_get_xmlString(doc);
                                    openbexi_readRSS_CB(ob_xml);
                                };
                                reader.onload = function (event) {
                                };
                                reader.readAsText(event.dataTransfer.files[0]);
                                return false;
                            }
                            else if (getSelectedBexiObj(null).type == "openbexi_chart" && file_name.match(RegExp(".xml"))) {
                                    var reader = new FileReader();
                                    reader.filename = file_name;
                                    reader.onloadend = function (event) {
                                        openbexi_readXMLfunction(getSelectedBexiObj(null).div.id, getSelectedBexiObj(null).subtype, file_name, event.target.result);
                                    };
                                    reader.onload = function (event) {
                                    };
                                    reader.readAsText(event.dataTransfer.files[0]);
                                    return false;
                                }
                                else if (getSelectedBexiObj(null).type == "openbexi_dygraphs" && (file_name.match(RegExp(".csv")) || file_name.match(RegExp(".json")))) {
                                        var reader = new FileReader();
                                        reader.filename = file_name;
                                        reader.onloadend = function (event) {
                                            getSelectedBexiObj(null).load_Data(getSelectedBexiObj(null).div.id, file_name, event.target.result);
                                            // test
                                            // openbexi_dygraphs_load_Data(getSelectedBexiObj(null).div.id, "data/dygraphs/"+file_name);
                                        };
                                        reader.onload = function (event) {
                                        };
                                        reader.readAsText(event.dataTransfer.files[0]);
                                        return false;
                                    }
                                    else  if (file_type.match("html")) {
                                            var reader = new FileReader();
                                            reader.onloadend = function (event) {
                                            };
                                            reader.onload = function (event) {
                                            };
                                            reader.readAsText(event.dataTransfer.files[0]);
                                            return false;
                                        }
                                        else {
                                            var reader = new FileReader();
                                            reader.onloadend = function (event) {
                                            };
                                            reader.onload = function (event) {
                                            };
                                            reader.readAsText(event.dataTransfer.files[0]);
                                            alert(file_name + ": Type " + file_type + " not supported for " + getSelectedBexiObj(null).type);
                                        }

    } catch (e) {
        __openbexi_drag_and_drop_img_debugC("openbexi_ondrop()", "Exception:" + e.message);
        //alert("Your browser does not support the dataTransfer object.");
    }
    return false;
}
