/* This notice must be untouched at all times.
 
Copyright (c) 2005-2011 JC Arcaz. All rights reserved.
 OPEN OPENBEXI HTML Builder for generating dynanic HTML page and html code source from browsers.
updated: Janvier 03  2011 version 3.1
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
 
var goIn_auto_SQL_refresh;
function auto_SQL_refresh( widget_id, widget_type, query, query_type, timeout, database_driver, database_url, database_user, database_passwd ) {
    //Variable declaration and initialization
    var lang = "";
    var pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");
    if (pageDoc == null || database_url == null || database_url == "")
        lang = get_xml_classe_object_attribut_value(pageDoc, "url", widget_id, "lang");
    if (lang == "") lang = "en";
    _CURRENT_OPENBEXI_LANGUAGE = "en";
 
    //Body: Javascript code
    try {
        var pager_obj = document.getElementById(widget_id + "_pager");
        if (pager_obj) pager_obj = new openbexi_pager(null, pager_obj, widget_id + "_pager", "0px", "2px", "25px", "15px", "23px", 10, "static");
        if (pager_obj) {
            pager_obj.posCurrentItem = 0;
            pager_obj.widget_id = widget_id;
            pager_obj.widget_type = widget_type;
            pager_obj.query = query;
            pager_obj.driver = database_driver;
            pager_obj.url = database_url;
            pager_obj.user = database_user;
            pager_obj.passwd = database_passwd;
        }
        setTimeout(function() {
            openbexi_LNRequest(null, null, widget_id, widget_type, null, null, null, null, null, query, query_type, database_driver, database_url, database_user, database_passwd, null, "false");
        }, 10);
        goIn_auto_SQL_refresh = setTimeout(function() {
            auto_SQL_refresh(widget_id, widget_type, query, query_type, timeout, database_driver, database_url, database_user, database_passwd);
        }, parseInt(timeout) * 1000);
 
    } catch (e) {
        clearTimeout(goIn_auto_SQL_refresh);
        //alert("Not connected to database")
    }
}
