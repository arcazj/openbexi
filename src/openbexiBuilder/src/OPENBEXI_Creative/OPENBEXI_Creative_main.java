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

import OPENBEXI.*;
import OPENBEXI_Timeline.OPENBEXI_timeline;
import com.sun.org.apache.xerces.internal.parsers.DOMParser;
import org.w3c.dom.Document;
import org.xml.sax.InputSource;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;
import java.util.Enumeration;
import java.util.logging.*;

public class OPENBEXI_Creative_main extends HttpServlet {

    String _bexi_path;
    BEXI_Context _context;
    BEXI_ApplicationPath _applicationPath = null;
    OPENBEXI_Creative_RealTime _realtime = null;

    static void ob_error(HttpServletResponse response, Document doc, String exception, String status) {
        final BEXI_XMLDriver xml = new BEXI_XMLDriver();
        try {
            doc = xml.set_class_object_attribute_value(doc, "openbexi_creative", "application", "status", status);
            doc = xml.set_class_object_attribute_value(doc, "openbexi_creative", "application", "exception", exception);
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }

        try {
            response.setContentType("text/xml");
            response.setHeader("Cache-Control", "no-cache");
            response.getWriter().write(xml.XMLSerializer(doc));
        } catch (IOException el) {
            System.err.println(el);
        }
    }

    public OPENBEXI_Creative_main() {
        _bexi_path = null;
        _context = null;
    }

    /**
     * Init OPENBEXI Creative servlet.
     *
     * @param config .
     * @throws ServletException .
     */
    public void init(ServletConfig config) throws ServletException {
        super.init(config);

        Handler fh = null;
        try {
            fh = new FileHandler("openbexi.log");
            fh.setFormatter(new SimpleFormatter());
        } catch (IOException e) {
            System.err.println(e.getMessage());
        }
        Logger.getLogger("com.sshtools").setUseParentHandlers(false);
        Logger.getLogger("com.sshtools").addHandler(fh);
        Logger.getLogger("com.sshtools").setLevel(Level.OFF);
        // Set bexi context
        _context = new BEXI_Context(200);

        // Set a OPENBEXI application contextApplication
        System.out.println("user.dir =" + System.getProperty("user.dir"));
        _applicationPath = new BEXI_ApplicationPath();
        _bexi_path = _applicationPath.getDefaultPath();
        System.out.println("_bexi_path=" + _bexi_path);
        _applicationPath.set_defaultLanguage("en");
        System.out.println("BEXI_LANGUAGE             =" + _applicationPath.getDefaultLanguage());
        System.out.println("");
        System.out.println("ClassPath                 =" + _applicationPath.getDefaultClassPath());
        System.out.println("DefaultXMLFilePath        =" + _applicationPath.getDefaultXMLFilePath());
        System.out.println("HomePath                  =" + _applicationPath.getHomePath());
        System.out.println("DefaultPath               =" + _applicationPath.getDefaultPath());
        System.out.println("DefaultMetaRulesPath      =" + _applicationPath.getDefaultMetaRulesPath());
        System.out.println("DefaultWebPagesPath       =" + _applicationPath.getDefaultWebPagesPath());
        System.out.println("DefaultImagesPath         =" + _applicationPath.getDefaultImagesPath());
        System.out.println("DefaultWebPagesClientPath =" + _applicationPath.getDefaultWebPagesClientPath());
        System.out.println("DefaultImagesClientPath   =" + _applicationPath.getDefaultImagesClientPath());
        System.out.println("");

        try {
            if (_applicationPath.get_SqlContextManager() != null) {
                BEXI_SqlContext sStatement_current = _applicationPath.get_SqlContextManager().getBEXI_SqlContext("jdbc:hsqldb:file:hsqldb/data/test");
                _applicationPath.get_SqlContextManager().set_url_current(sStatement_current.get_url());
                /*System.out.println("driver   (admin)         =" + _applicationPath.get_SqlContextManager().get_sqlContext_admin().get_driverName());
                System.out.println("url      (admin)         =" + _applicationPath.get_SqlContextManager().get_sqlContext_admin().get_url());
                System.out.println("user     (admin)         =" + _applicationPath.get_SqlContextManager().get_sqlContext_admin().get_user());
                System.out.println("password (admin)         =" + _applicationPath.get_SqlContextManager().get_sqlContext_admin().get_password());
                System.out.println("url      (current)       =" + _applicationPath.get_SqlContextManager().get_url_current());
                System.out.println("");*/
            }
        } catch (Exception e) {
            System.err.println("OPEN BEXI not connected to any SQL server ..." + e);
        }
    }

    /**
     * OPENBEXI Creative doGet servlet.
     *
     * @param request  .
     * @param response .
     * @throws ServletException .
     * @throws IOException      .
     */
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html");
        //System.out.println("doGet started");
        // default:LocalAddr=127.0.0.1
        System.out.println("LocalAddr :               =" + request.getLocalAddr());
        // default: request.getContextPath=/OPENBEXI_Creative
        System.out.println("request.getContextPath    =" + request.getContextPath());
        // default: request.getServletPath=/openbexi.do
        System.out.println("request.getServletPath    =" + request.getServletPath());
        System.out.println("request.getLocalPort      =" + request.getLocalPort());
        System.out.println("session id:               =" + request.getSession().getId());
        System.out.println("request.getPathInfo:      =" + request.getPathInfo());
        System.out.println("request.getPathTranslated =" + request.getPathTranslated());
        System.out.println("ServletContextName        =" + request.getSession().getServletContext().getServletContextName());

        System.out.println("doGet:response=" + response);
        String url = "/index.jsp";
        //String url = null;
        // Update HTML page with the new parameters
        OPENBEXI_Creative_gui gui = new OPENBEXI_Creative_gui(url, request, response);
        gui.update(null);

        System.out.println("doGet completed");

    }

    /**
     * OPENBEXI Creative doPost servlet.
     *
     * @param request  .
     * @param response .
     * @throws ServletException .
     * @throws IOException      .
     */
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("doPost started ...");

        response.setContentType("text/html");
        // Mandatory to deal about French accents
        request.setCharacterEncoding("UTF-8");

        String userRequest = null;
        String fieldRequest = null;
        Enumeration req = request.getParameterNames();

        final BEXI_XMLDriver xml = new BEXI_XMLDriver();
        DOMParser parser = new DOMParser();
        Document docOut;

        if (request.getContentType().equals("application/x-www-form-urlencoded")) {
            while (req.hasMoreElements()) {
                fieldRequest = (String) req.nextElement();
                userRequest = request.getParameter(fieldRequest);
                System.out.println("doPost fieldRequest=" + fieldRequest + "\nuserRequest=" + userRequest);
            }
            try {
                if (userRequest != null)
                    parser.parse(new InputSource(new java.io.StringReader(userRequest)));
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
            docOut = parser.getDocument();
            if (fieldRequest != null && fieldRequest.equals("openbexi_pingRequest")) {
                try {
                    if (response != null) {
                        response.setContentType("text/xml");
                        response.setHeader("Cache-Control", "no-cache");
                        response.getWriter().write(xml.XMLSerializer(docOut));
                    }
                } catch (IOException e) {
                    System.err.println(e);
                }
            }
        } else {
            try {
                String fistLine = request.getReader().readLine();
                parser.parse(new InputSource(new java.io.StringReader(fistLine)));
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
            docOut = parser.getDocument();
            try {
                fieldRequest = xml.get_class_object_attribute_value(docOut, "ob_request", "request", "type");
                System.out.println("doPost fieldRequest=" + fieldRequest);
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
        }
        //*******************************************************************
        // Look for SQL context
        try {
            if (_applicationPath.get_SqlContextManager() == null) {
                _applicationPath = new BEXI_ApplicationPath();
                _bexi_path = _applicationPath.getDefaultPath();
                _applicationPath.set_defaultLanguage("en");
            }
        } catch (Exception e) {
            System.out.println("no SQLdatabase connected ..." + e.getMessage());
            _applicationPath.set_SqlContextManager(null);
        }
        // Check if new SQL context else keep the previous one
        String connection_number = "";
        String url = "";
        try {
            connection_number = xml.get_class_object_attribute_value(docOut, "bexicontext", "connection", "number");
            url = xml.get_class_object_attribute_value(docOut, "ob_database", "databaseCurrent", "url");
            String driver = xml.get_class_object_attribute_value(docOut, "ob_database", "databaseCurrent", "driver");
            String user = xml.get_class_object_attribute_value(docOut, "ob_database", "databaseCurrent", "user");
            String passwd = xml.get_class_object_attribute_value(docOut, "ob_database", "databaseCurrent", "passwd");
            if (url != null && !url.equals("")) {
                if (_applicationPath.get_SqlContextManager().getBEXI_SqlContext(url) == null) {
                    BEXI_SqlContext sqlContext = new BEXI_SqlContext(driver, driver, url, user, passwd, null);
                    _applicationPath.get_SqlContextManager().addBEXI_SqlContext(sqlContext);
                }
                // Set as default database
                BEXI_SqlContext sStatement_current = _applicationPath.get_SqlContextManager().getBEXI_SqlContext(url);
                _applicationPath.get_SqlContextManager().set_url_current(sStatement_current.get_url());
                String number = xml.get_class_object_attribute_value(docOut, "bexicontext", "connection", "number");
                xml.set_class_object_attribute_value(docOut, "ob_database", "database_" + number, "connected", "true");
                xml.set_class_object_attribute_value(docOut, "ob_database", "databaseCurrent", "connected", "true");
                xml.set_class_object_attribute_value(docOut, "ob_database", "database_" + connection_number, "connected", "true");
            }
            //System.out.println("Using " + _applicationPath.get_SqlContextManager().get_url_current());
        } catch (Exception e) {
            System.err.println("no SQLdatabase connected ..." + e.getMessage() + "\nurl=" + url);
            final BEXI_XMLDriver xmlResponse = new BEXI_XMLDriver();
            try {
                String objectId = xml.get_class_object_attribute_value(docOut, "ob_request", "object", "id");
                docOut = xml.set_class_object_attribute_value(docOut, "ob_database", "database_" + connection_number, "connected", "false");
                docOut = xml.set_class_object_attribute_value(docOut, "ob_database", "databaseCurrent", "connected", "false");
                docOut = xml.set_class_object_attribute_value(docOut, objectId, "SQLDatabase", "status", e.getMessage());
                response.setContentType("text/xml");
                response.setHeader("Cache-Control", "no-cache");
                response.getWriter().write(xmlResponse.XMLSerializer(docOut));
                return;
            } catch (Exception e1) {
                System.err.println(e1.getMessage());
            }
        }
        //*******************************************************************
        // openbexi_loadFileBrowserRequest case
        if (fieldRequest != null && fieldRequest.equals("openbexi_functionJavaRequest")) {
            // Send response
            OPENBEXI_JAVA java = new OPENBEXI_JAVA(response, _applicationPath);
            try {
                String packageName = xml.get_class_object_attribute_value(docOut, "ob_request", "request", "packageName");
                String className = xml.get_class_object_attribute_value(docOut, "ob_request", "request", "className");
                String functionName = xml.get_class_object_attribute_value(docOut, "ob_request", "request", "functionName");
                String parameter_count = xml.get_class_object_attribute_value(docOut, "ob_request", "request", "parameter_count");
                int cout = Integer.valueOf(parameter_count);
                Object[] parameters = new String[cout];
                for (int i = 0; i < parameters.length; i++) {
                    parameters[i] = xml.get_class_object_attribute_value(docOut, "ob_request", "request", "parameter_" + i);
                }
                java.functionInvoker(docOut, packageName + "." + className, functionName, parameters);
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
        }
        //*******************************************************************
        // timeline case
        else if (fieldRequest != null && fieldRequest.equals("getTimelineEvents")) {
            // Send response
            OPENBEXI_timeline timeline = new OPENBEXI_timeline(response, _applicationPath, null);
            try {
                timeline.readEvents(docOut);
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
        }
        //*******************************************************************
        // chart case
        else if (fieldRequest != null && fieldRequest.equals("getChartXML")) {
            // Send response
            OPENBEXI_Creative_Chart chart = new OPENBEXI_Creative_Chart(response, _applicationPath);
            try {
                chart.readXML(request, docOut, false);
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
        }
        //*******************************************************************
        // openbexi_contextFromServerRequest case
        else if (fieldRequest != null && (fieldRequest.equals("openbexi_ExplorerRequest") || fieldRequest.equals("openbexi_ExplorerRequest_and_attachJS"))) {
            // Send response
            OPENBEXI_Creative_explorer explorer = new OPENBEXI_Creative_explorer(response, _applicationPath);
            try {
                explorer.getObjects(docOut);
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
        }
        //*******************************************************************
        // openbexi_contextFromServerRequest case
        else if (fieldRequest != null && fieldRequest.equals("openbexi_getServerContextRequest")) {
            // Send response
            OPENBEXI_Creative_context context = new OPENBEXI_Creative_context(response, _applicationPath);
            try {
                context.get(docOut);
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
        }
        //*******************************************************************
        // openbexi_publishRequest case
        else if (fieldRequest != null && fieldRequest.equals("openbexi_publishRequest")) {
            //Publish
            OPENBEXI_Creative_publisher context = new OPENBEXI_Creative_publisher(response, _applicationPath);
            try {
                context.publish_project(fieldRequest, docOut);
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
        }
        //*******************************************************************
        // openbexi_publishRequest case
        else if (fieldRequest != null && fieldRequest.equals("openbexi_publishProjectRequest")) {
            //Publish
            OPENBEXI_Creative_publisher context = new OPENBEXI_Creative_publisher(response, _applicationPath);
            try {
                context.publish_project(fieldRequest, docOut);
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
        }
        //*******************************************************************
        // openbexi_updateServerContextRequest case
        else if (fieldRequest != null && fieldRequest.equals("openbexi_updateServerContextRequest")) {
            // Send response
            OPENBEXI_Creative_context context = new OPENBEXI_Creative_context(response, _applicationPath);
            try {
                context.update(docOut);
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
        }
        //*******************************************************************
        // openbexi_loadFileBrowserRequest case
        else if (fieldRequest != null && fieldRequest.equals("openbexi_loadFileBrowserRequest")) {
            // Send response
            OPENBEXI_Creative_file file = new OPENBEXI_Creative_file(response, _applicationPath);
            try {
                file.browse_media(docOut);
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
        }
        //*******************************************************************
        // openbexi_deleteFileRequest or openbexi_deleteTemplateRequest case
        else if (fieldRequest != null && (fieldRequest.equals("openbexi_deleteFileRequest") || fieldRequest.equals("openbexi_deleteTemplateRequest"))) {
            // Send response
            OPENBEXI_Creative_file file = new OPENBEXI_Creative_file(response, _applicationPath);
            try {
                docOut = file.ob_deleteFile(_applicationPath.getDefaultWebPagesPath(), docOut, request, fieldRequest);
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
            if (docOut != null) {
                OPENBEXI_Creative_explorer explorer = new OPENBEXI_Creative_explorer(response, _applicationPath);
                try {
                    explorer.getObjects(docOut);
                } catch (Exception e) {
                    System.err.println(e.getMessage());
                }
            }
        }
        //*******************************************************************
        // openbexi_createProjectRequest case
        else if (fieldRequest != null && (fieldRequest.equals("openbexi_createProjectRequest") || fieldRequest.equals("openbexi_createTemplateCategoryRequest"))) {
            OPENBEXI_Creative_file file = new OPENBEXI_Creative_file(response, _applicationPath);
            try {
                docOut = file.ob_createProject_or_TemplateCategory(_applicationPath.getDefaultWebPagesPath(), docOut, fieldRequest);
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
        }
        //*******************************************************************
        // openbexi_createPageRequest case
        else if (fieldRequest != null && (fieldRequest.equals("openbexi_createPageRequest"))) {
            OPENBEXI_Creative_file file = new OPENBEXI_Creative_file(response, _applicationPath);
            try {
                docOut = file.ob_createPage(_applicationPath.getDefaultWebPagesPath(), docOut);
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
            OPENBEXI_Creative_explorer explorer = new OPENBEXI_Creative_explorer(response, _applicationPath);
            try {
                explorer.getObjects(docOut);
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
        }
        //*******************************************************************
        // openbexi_createPageTemplateRequest case
        else if (fieldRequest != null && (fieldRequest.equals("openbexi_createPageTemplateRequest"))) {
            OPENBEXI_Creative_file file = new OPENBEXI_Creative_file(response, _applicationPath);
            try {
                docOut = file.ob_createPageTemplate(_applicationPath.getDefaultWebPagesPath(), docOut);
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
            OPENBEXI_Creative_explorer explorer = new OPENBEXI_Creative_explorer(response, _applicationPath);
            try {
                explorer.getObjects(docOut);
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
        }
        //*******************************************************************
        // openbexi_deleteProjectRequest case
        else if (fieldRequest != null && (fieldRequest.equals("openbexi_deleteProjectRequest"))) {
            OPENBEXI_Creative_file file = new OPENBEXI_Creative_file(response, _applicationPath);
            try {
                docOut = file.ob_deleteProject(_applicationPath.getDefaultWebPagesPath(), docOut);
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
        }
        //*******************************************************************
        // openbexi_deleteTemplateCategoryRequest case
        else if (fieldRequest != null && (fieldRequest.equals("openbexi_deleteTemplateCategoryRequest"))) {
            OPENBEXI_Creative_file file = new OPENBEXI_Creative_file(response, _applicationPath);
            try {
                docOut = file.ob_deleteTemplateCategory(_applicationPath.getDefaultWebPagesPath(), docOut);
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
        }
        //*******************************************************************
        // openbexi_saveFileRequest case
        else if (fieldRequest != null && (fieldRequest.equals("openbexi_saveFileRequest") || fieldRequest.equals("openbexi_saveFile_and_testRequest") || fieldRequest.equals("openbexi_save_and_newFileRequest") || fieldRequest.equals("openbexi_charFlowRequest"))) {
            OPENBEXI_Creative_file file = new OPENBEXI_Creative_file(response, _applicationPath);
            try {
                //noinspection ACCESS_STATIC_VIA_INSTANCE
                String filename = xml.get_class_object_attribute_value(docOut, "ob_explorer", "xml", "filename");
                if (filename != null) {
                    file.ob_saveFile(_applicationPath.getDefaultWebPagesPath(), docOut, request, "xml");
                    return;
                }
                filename = xml.get_class_object_attribute_value(docOut, "ob_explorer", "json", "filename");
                if (filename != null) {
                    file.ob_saveFile(_applicationPath.getDefaultWebPagesPath(), docOut, request, "json");
                    return;
                }
                filename = xml.get_class_object_attribute_value(docOut, "ob_explorer", "image", "filename");
                if (filename != null) {
                    file.ob_saveImage(docOut);
                    return;
                }
                filename = xml.get_class_object_attribute_value(docOut, "file", "html", "name");
                if (filename != null) {
                    file.ob_saveHtmlFile(_applicationPath.getDefaultWebPagesPath(), docOut, request);
                    return;
                }
                filename = xml.get_class_object_attribute_value(docOut, "file", "xml", "name");
                if (filename != null) {
                    file.ob_saveXmlFile(_applicationPath.getDefaultWebPagesPath(), docOut, request);
                    return;
                }
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
        }
        //*******************************************************************
        // openbexi_save chartFlow xml file case
        else if (fieldRequest.equals("openbexi_charFlowRequest")) {
            OPENBEXI_Creative_file file = new OPENBEXI_Creative_file(response, _applicationPath);
            try {
                String filename = xml.get_class_object_attribute_value(docOut, "file", "xml", "name");
                if (filename != null) {
                    file.ob_saveXmlFile(_applicationPath.getDefaultWebPagesPath(), docOut, request);
                    return;
                }
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
        }
        //*******************************************************************
        // natural_language case
        else if (fieldRequest != null && (fieldRequest.equals("natural_language") || fieldRequest.equals("sql"))) {
            String objectId = null;
            try {
                objectId = xml.get_class_object_attribute_value(docOut, "ob_request", "object", "id");
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
            // Get Language natural requests list
            BEXI_list requestLN = new BEXI_list();
            String requestCurrentLN = "";
            int count = 0;
            while (requestCurrentLN != null) {
                try {
                    requestCurrentLN = xml.get_class_object_attribute_value(docOut, objectId, "request" + count, "text");
                    count++;
                    if (requestCurrentLN != null) {
                        requestLN.add(requestCurrentLN);
                        System.out.println("request=" + requestCurrentLN);
                    }
                } catch (Exception e) {
                    System.err.println(e.getMessage());
                }
            }
            BEXI_list actions = new BEXI_list();
            BEXI_list status = new BEXI_list();
            Object[] results = new Object[requestLN.getItemCount()];
            //actions = exp.analyze(_context, userRequest);
            _context.add(_applicationPath);

            OPENBEXI_Creative_MetaData LN = new OPENBEXI_Creative_MetaData(_applicationPath, response);
            String current_sql_context = _applicationPath.get_SqlContextManager().get_url_current();
            if (current_sql_context != null)
                _context.add(_applicationPath.get_SqlContextManager().getBEXI_SqlContext(current_sql_context));
            else {
                try {
                    LN.sendResults(docOut, requestLN, null, null);
                } catch (Exception e1) {
                    System.err.println(e1.getMessage());
                }
            }

            for (int i = 0; i < requestLN.getItemCount(); i++) {
                requestCurrentLN = requestLN.getItem(i);
                if (!requestCurrentLN.trim().equals("")) {
                    //Perform the user request
                    if (_applicationPath.get_SqlContextManager().get_sqlContext_admin() != null) {

                        // Get an request action
                        BEXI_Expression exp = new BEXI_Expression();
                        //before decoding language Natural, check if the expression is a SQL query
                        try {
                            results[i] = exp.result(_context, requestCurrentLN);
                            status.add("done", i);
                        } catch (SQLException es) {
                            if (!fieldRequest.equals("sql")) {
                                // It's not a SQL query:
                                try {
                                    actions = exp.analyze(_context, requestCurrentLN);
                                    _context.add(exp);
                                    status.add("done", i);
                                } catch (Exception e) {
                                    System.err.println(e.getMessage());
                                }
                                //actions = exp.analyze("donner les synonymes que possèdent le mot détruire", sStatement);
                                try {
                                    results[i] = exp.result(_context, actions.getItem(0));
                                    status.add("done", i);
                                } catch (Exception e) {
                                    status.add("No data found for this expression", i);
                                    System.err.println(e.getMessage());
                                }
                            } else {
                                try {
                                    docOut = xml.set_class_object_attribute_value(docOut, objectId, "SQLDatabase", "status", es.getMessage());
                                } catch (Exception e) {
                                    System.err.println(e.getMessage());
                                }
                                response.setContentType("text/xml");
                                response.setHeader("Cache-Control", "no-cache");
                                response.getWriter().write(xml.XMLSerializer(docOut));
                            }
                        } catch (Exception es) {
                            status.add("No data found for this expression", i);
                        }
                    }
                }
            }

            try {
                LN.sendResults(docOut, requestLN, results, status);
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }

            // openbexi_ModelsRequest case
        } else if (fieldRequest != null && fieldRequest.equals("openbexi_ModelsRequest")) {
            OPENBEXI_Creative_MetaData LN = new OPENBEXI_Creative_MetaData(_applicationPath, response);
            try {
                String subtype = xml.get_class_object_attribute_value(docOut, "ob_request", "request", "subtype");
                if (subtype != null && (subtype.equals("database") || subtype.equals("database_table") || subtype.equals("database_table_attribute"))) {
                    OPENBEXI_Creative_explorer explorer = new OPENBEXI_Creative_explorer(response, _applicationPath);
                    explorer.getObjects(docOut);
                } else
                    LN.sendModels(docOut);
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
            //*******************************************************************
            // openbexi_saveRequest case
        } else if (fieldRequest != null && fieldRequest.equals("openbexi_saveRequest")) {
            // Update HTML page with the new parameters
            //OPENBEXI_Creative_gui gui = new OPENBEXI_Creative_gui(url, request, response);
            //gui.update(fieldRequest, widgetIdSource, widgetIdTarget, widgetTargetType, htmlPage, results);
        } else if (fieldRequest != null && fieldRequest.equals("openbexi_openHTMLPages_fromTemplateRequest")) {
            OPENBEXI_Creative_file file = new OPENBEXI_Creative_file(response, _applicationPath);
            try {
                file.ob_openFile_fromTemplate(_applicationPath.getDefaultWebPagesPath(), docOut);
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
        } else if (fieldRequest != null && (fieldRequest.equals("openbexi_openHTMLPagesRequest") || fieldRequest.equals("openbexi_openArchiveHTMLPagesRequest") || fieldRequest.equals("openbexi_openArchiveTemplateHTMLPagesRequest") || fieldRequest.equals("openbexi_openTemplateHTMLPagesRequest")|| fieldRequest.equals("openbexi_open_and_copyTemplateHTMLPagesRequest"))) {
            OPENBEXI_Creative_file file = new OPENBEXI_Creative_file(response, _applicationPath);
            try {
                file.ob_readHTMLPage(_applicationPath.getDefaultWebPagesPath(), docOut, fieldRequest);
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
        } else if (fieldRequest != null && (fieldRequest.equals("openbexi_overwrite_HTMLPageFromTemplateRequest") || fieldRequest.equals("openbexi_overwrite_HTMLPageFromArchiveRequest") || fieldRequest.equals("openbexi_overwrite_HTMLTemplateFromArchiveRequest"))) {
            OPENBEXI_Creative_file file = new OPENBEXI_Creative_file(response, _applicationPath);
            try {
                file.ob_overwriteHTMLPage_fromArchiveOrTemplate(_applicationPath.getDefaultWebPagesPath(), docOut, fieldRequest);
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
        } else if (fieldRequest != null && (fieldRequest.equals("openbexi_contextRequest") || fieldRequest.equals("openbexi_readXML"))) {
            OPENBEXI_Creative_file file = new OPENBEXI_Creative_file(response, _applicationPath);
            try {
                file.ob_readContext(_applicationPath.getDefaultWebPagesPath(), docOut);
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
        } else if (fieldRequest != null && fieldRequest.equals("openbexi_readJSONRequest")) {
            OPENBEXI_Creative_file file = new OPENBEXI_Creative_file(response, _applicationPath);
            try {
                file.ob_readMINEFile(docOut);
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
        } else if (fieldRequest != null && (fieldRequest.equals("openbexi_readXMLRequest") || fieldRequest.equals("openbexi_readDataRequest"))) {
            OPENBEXI_Creative_file file = new OPENBEXI_Creative_file(response, _applicationPath);
            try {
                file.ob_readMINEFile(docOut);
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
        } else if (fieldRequest != null && fieldRequest.equals("openbexi_readRSSRequest")) {
            OPENBEXI_Creative_file file = new OPENBEXI_Creative_file(response, _applicationPath);
            try {
                file.ob_readMINEFile(docOut);
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
        } else if (fieldRequest != null && fieldRequest.equals("openbexi_readCSVRequest")) {
            OPENBEXI_Creative_csv file = new OPENBEXI_Creative_csv(response, _applicationPath);
            try {
                file.ob_readCSVFile(docOut);
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
        } else if (fieldRequest != null && fieldRequest.equals("openbexi_readFILERequest")) {
            OPENBEXI_Creative_file file = new OPENBEXI_Creative_file(response, _applicationPath);
            try {
                file.ob_readFile(_applicationPath.getDefaultWebPagesPath(), docOut);
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
        } else if (fieldRequest != null && fieldRequest.equals("convertHTML2PDF")) {
            OPENBEXI_Creative_file file = new OPENBEXI_Creative_file(response, _applicationPath);
            try {
                file.ob_createPDFFile(docOut);
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
        } else if (fieldRequest != null && (fieldRequest.equals("openbexi_saveJSRequest") || fieldRequest.equals("openbexi_saveJSRequest_and_attachJS"))) {
            try {
                OPENBEXI_Creative_js js = new OPENBEXI_Creative_js(response, _applicationPath);
                js.ob_writeJSFile(docOut);
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
        } else if (fieldRequest != null && fieldRequest.equals("openbexi_deleteJSRequest")) {
            try {
                OPENBEXI_Creative_js js = new OPENBEXI_Creative_js(response, _applicationPath);
                js.ob_deleteJSFile(docOut);
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
        } else if (fieldRequest != null && fieldRequest.equals("openbexi_getJSHeaderBodyRequest")) {
            try {
                OPENBEXI_Creative_js js = new OPENBEXI_Creative_js(response, _applicationPath);
                js.ob_readJSFile(docOut);
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
        } else if (fieldRequest != null && fieldRequest.equals("openbexi_TestRequest")) {
            OPENBEXI_test test = new OPENBEXI_test(response, _applicationPath);
            try {
                test.start(_applicationPath.getDefaultWebPagesPath(), docOut, request);
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
        } else if (fieldRequest != null && fieldRequest.equals("openbexi_ChartRequest")) {
            OPENBEXI_Creative_Chart chart = new OPENBEXI_Creative_Chart(response, _applicationPath);
            try {
                chart.create(docOut, false);
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
        } else if (fieldRequest != null && (fieldRequest.equals("openbexi_DygraphsDataRequest") || fieldRequest.equals("openbexi_DygraphsViewRequest"))) {
            try {
                final BEXI_XMLDriver xmlResponse = new BEXI_XMLDriver();
                if (_realtime != null) {
                    docOut = xmlResponse.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "ok");
                    if (response != null) {
                        response.setContentType("text/xml");
                        response.setHeader("Cache-Control", "no-cache");
                        response.getWriter().write(xml.XMLSerializer(docOut));
                    }
                } else {
                    OPENBEXI_Creative_file file = new OPENBEXI_Creative_file(response, _applicationPath);
                    try {
                        file.ob_readMINEFile(docOut);
                    } catch (Exception e) {
                        System.err.println(e.getMessage());
                    }
                }
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
        } else if (fieldRequest != null && fieldRequest.equals("openbexi_runtime_exec")) {
            try {
                OPENBEXI_Runtime exec = new OPENBEXI_Runtime(response, _applicationPath);
                exec.cmd(docOut);
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
        } else if (fieldRequest != null && fieldRequest.equals("openbexi_runtime_exec")) {
            try {
                OPENBEXI_Runtime exec = new OPENBEXI_Runtime(response, _applicationPath);
                exec.cmd(docOut);
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
        } else if (fieldRequest != null && fieldRequest.equals("openbexi_SystemInfoRequest")) {
            OPENBEXI_SystemInfo systemInfo = new OPENBEXI_SystemInfo(response, _applicationPath);
            try {
                systemInfo.get(docOut);
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
        } else {
            System.err.println("doPost: Cannot process this request ...");
        }
        System.out.println("doPost completed.");
    }
}
