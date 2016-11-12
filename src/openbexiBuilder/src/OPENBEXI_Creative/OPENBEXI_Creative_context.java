/* This notice must be untouched at all times.

Copyright (c) 2005-2013 JC Arcaz. All rights reserved.
OPEN OPENBEXI Creative: server side for generating dynanic HTML page and html code source from browsers.Works with OPEN OPENBEXI HTML Builder
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

*/

package OPENBEXI_Creative;

import OPENBEXI.BEXI_ApplicationPath;
import OPENBEXI.BEXI_SqlContext;
import OPENBEXI.BEXI_XMLDriver;
import org.w3c.dom.Document;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


public class OPENBEXI_Creative_context extends HttpServlet {

    private HttpServletResponse _response;
    private BEXI_ApplicationPath _applicationPath;

    /**
     * @param response        .
     * @param applicationPath .
     */
    public OPENBEXI_Creative_context(HttpServletResponse response, BEXI_ApplicationPath applicationPath) {
        _response = response;
        _applicationPath = applicationPath;
    }

    /**
     * Update openbexi context.
     *
     * @param docOut .
     * @throws Exception .
     */
    public void update(Document docOut) throws Exception {

        final BEXI_XMLDriver xml = new BEXI_XMLDriver();

        try {
            String value = xml.get_class_object_attribute_value(docOut, "bexicontext", "language", "name");
            System.out.println("OPENBEXI_Creative_context:update --- Current language:" + value);
            if (value != null) _applicationPath.set_defaultLanguage(value);
            value = xml.get_class_object_attribute_value(docOut, "bexicontext", "path", "class");
            if (value != null) _applicationPath.set_defaultMetaRulesPath(value);
            value = xml.get_class_object_attribute_value(docOut, "bexicontext", "path", "home");
            if (value != null) _applicationPath.set_defaultPath(value);
            value = xml.get_class_object_attribute_value(docOut, "bexicontext", "path", "metarules");
            if (value != null) _applicationPath.set_defaultMetaRulesPath(value);
            value = xml.get_class_object_attribute_value(docOut, "bexicontext", "path", "webpages");
            if (value != null) _applicationPath.set_defaultWebPagesPath(value);
            value = xml.get_class_object_attribute_value(docOut, "bexicontext", "path", "images");
            if (value != null) _applicationPath.set_defaultImagesPath(value);
            value = xml.get_class_object_attribute_value(docOut, "bexicontext", "path", "webpagesClient");
            if (value != null) _applicationPath.set_defaultWebPagesClientPath(value);
            value = xml.get_class_object_attribute_value(docOut, "bexicontext", "path", "imagesClient");
            if (value != null) _applicationPath.set_defaultImagesClientPath(value);
            value = xml.get_class_object_attribute_value(docOut, "bexicontext", "path", "xml");
            if (value != null) _applicationPath.set_defaultXMLFilePath(value);

            // Set current database
            String url = xml.get_class_object_attribute_value(docOut, "bexicontext", "database_current", "url");
            System.out.println("OPENBEXI_Creative_context:update --- database_current:" + url);
            BEXI_SqlContext sqlContext = _applicationPath.get_SqlContextManager().getBEXI_SqlContext(url);
            if (sqlContext == null) {
                String driverName = xml.get_class_object_attribute_value(docOut, "bexicontext", "database_current", "driverName");
                String driver = xml.get_class_object_attribute_value(docOut, "bexicontext", "database_current", "driver");
                String user = xml.get_class_object_attribute_value(docOut, "bexicontext", "database_current", "user");
                String password = xml.get_class_object_attribute_value(docOut, "bexicontext", "database_current", "password");
                sqlContext = new BEXI_SqlContext(driverName, driver, url, user, password, null);
            }
            _applicationPath.get_SqlContextManager().set_url_current(url);

            // Set admin database
            String url_admin = xml.get_class_object_attribute_value(docOut, "bexicontext", "database_admin", "url");
            System.out.println("OPENBEXI_Creative_context:update --- database_admin:" + url_admin);
            BEXI_SqlContext sqlContext_admin = _applicationPath.get_SqlContextManager().getBEXI_SqlContext(url_admin);
            if (sqlContext == null) {
                String driverName = xml.get_class_object_attribute_value(docOut, "bexicontext", "database_admin", "driverName");
                String driver = xml.get_class_object_attribute_value(docOut, "bexicontext", "database_admin", "driver");
                String user = xml.get_class_object_attribute_value(docOut, "bexicontext", "database_admin", "user");
                String password = xml.get_class_object_attribute_value(docOut, "bexicontext", "database_admin", "password");
                sqlContext_admin = new BEXI_SqlContext(driverName, driver, url_admin, user, password, null);
                _applicationPath.get_SqlContextManager().addBEXI_SqlContext(sqlContext_admin);
            }
            _applicationPath.get_SqlContextManager().set_url_admin(url_admin);

        } catch (Exception e) {
            System.err.println(e.getMessage());
        }

        try {
            _response.setContentType("text/xml");
            _response.setHeader("Cache-Control", "no-cache");
            _response.getWriter().write(xml.XMLSerializer(docOut));
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }

    /**
     * Provide openbexi context.
     *
     * @param docOut .
     * @throws Exception .
     */
    public void get(Document docOut) throws Exception {

        final BEXI_XMLDriver xml = new BEXI_XMLDriver();

        try {
            String value = _applicationPath.getDefaultLanguage();
            if (value != null) xml.set_class_object_attribute_value(docOut, "bexicontext", "language", "name", value);
            value = _applicationPath.getDefaultClassPath();
            if (value != null) xml.set_class_object_attribute_value(docOut, "bexicontext", "path", "class", value);
            value = _applicationPath.getDefaultPath();
            if (value != null) xml.set_class_object_attribute_value(docOut, "bexicontext", "path", "home", value);
            value = _applicationPath.getDefaultMetaRulesPath();
            if (value != null) xml.set_class_object_attribute_value(docOut, "bexicontext", "path", "metarules", value);
            value = _applicationPath.getDefaultWebPagesPath();
            if (value != null) xml.set_class_object_attribute_value(docOut, "bexicontext", "path", "webpages", value);
            value = _applicationPath.getDefaultImagesPath();
            if (value != null) xml.set_class_object_attribute_value(docOut, "bexicontext", "path", "images", value);
            value = _applicationPath.getDefaultXMLFilePath();
            if (value != null) xml.set_class_object_attribute_value(docOut, "bexicontext", "path", "xml", value);

            for (int i = 0; i < _applicationPath.get_SqlContextManager().getBEXI_SqlContext().size(); i++) {
                BEXI_SqlContext sqlContext = _applicationPath.get_SqlContextManager().getBEXI_SqlContext().get(i);
                value = sqlContext.get_driverName();
                if (value != null)
                    xml.set_class_object_attribute_value(docOut, "ob_database", "database_" + i, "driver", value);
                value = sqlContext.get_url();
                if (value != null)
                    xml.set_class_object_attribute_value(docOut, "ob_database", "database_" + i, "url", value);
                value = sqlContext.get_user();
                if (value != null)
                    xml.set_class_object_attribute_value(docOut, "ob_database", "database_" + i, "user", value);
                value = sqlContext.get_user();
                if (value != null)
                    xml.set_class_object_attribute_value(docOut, "ob_database", "database_" + i, "password", value);
            }

            // Set current database
            String url_current = _applicationPath.get_SqlContextManager().get_url_current();
            BEXI_SqlContext sqlContext_current = _applicationPath.get_SqlContextManager().getBEXI_SqlContext(url_current);
            value = sqlContext_current.get_driverName();
            if (value != null)
                xml.set_class_object_attribute_value(docOut, "bexicontext", "database_current", "driver", value);
            value = sqlContext_current.get_url();
            if (value != null)
                xml.set_class_object_attribute_value(docOut, "bexicontext", "database_current", "url", value);
            value = sqlContext_current.get_user();
            if (value != null)
                xml.set_class_object_attribute_value(docOut, "bexicontext", "database_current", "user", value);
            value = sqlContext_current.get_user();
            if (value != null)
                xml.set_class_object_attribute_value(docOut, "bexicontext", "database_current", "password", value);

            // Set admin database
            BEXI_SqlContext sqlContext_admin = _applicationPath.get_SqlContextManager().get_sqlContext_admin();
            value = sqlContext_admin.get_driverName();
            if (value != null)
                xml.set_class_object_attribute_value(docOut, "bexicontext", "database_admin", "driver", value);
            value = sqlContext_admin.get_url();
            if (value != null)
                xml.set_class_object_attribute_value(docOut, "bexicontext", "database_admin", "url", value);
            value = sqlContext_admin.get_user();
            if (value != null)
                xml.set_class_object_attribute_value(docOut, "bexicontext", "database_admin", "user", value);
            value = sqlContext_admin.get_user();
            if (value != null)
                xml.set_class_object_attribute_value(docOut, "bexicontext", "database_admin", "password", value);

        } catch (Exception e) {
            e.printStackTrace();
        }

        try {
            _response.setContentType("text/xml");
            _response.setHeader("Cache-Control", "no-cache");
            _response.getWriter().write(xml.XMLSerializer(docOut));
        } catch (IOException e) {
            System.err.println(e);
        }
    }
}
