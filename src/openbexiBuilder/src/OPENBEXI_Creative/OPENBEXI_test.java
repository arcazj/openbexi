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
import com.stevesoft.pat.Regex;
import org.w3c.dom.Document;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.zip.CRC32;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;


public class OPENBEXI_test extends HttpServlet {

    private HttpServletResponse _response;
    private BEXI_ApplicationPath _applicationPath;

    private char ob_getSeparator(String path) {
        char c = '/';
        if (path == null) return c;
        for (int i = path.length() - 1; i >= 0; i--) {
            if (path.charAt(i) == '/') {
                return '/';
            }
            if (path.charAt(i) == '\\') {
                return '\\';
            }
        }
        return c;
    }

    public OPENBEXI_test(HttpServletResponse response, BEXI_ApplicationPath applicationPath) {
        _response = response;
        _applicationPath = applicationPath;
    }

    public void start_obsolete(String defaultWebPagesPath, Document docOut, HttpServletRequest request) {
        Object result[] = new Object[0];
        final BEXI_XMLDriver xml = new BEXI_XMLDriver();
        String test_name;
        try {
            test_name = xml.get_class_object_attribute_value(docOut, "ob_request", "request", "test_name");
            if (test_name.equals("return_text")) {
                docOut = xml.set_class_object_attribute_value(docOut, "ob_request", test_name, "text", "OK");
            }
            if (test_name.equals("widget_data")) {

                // Set bexi context
                BEXI_Context context = new BEXI_Context(0);

                // Set a OPENBEXI application contextApplication
                BEXI_ApplicationPath contextPath = new BEXI_ApplicationPath();
                contextPath.set_defaultLanguage("fr");
                //BEXI_SqlContext sqlContext = contextPath.get_SqlContextManager().getBEXI_SqlContext("jdbc:mysql:///bexi_en");
                BEXI_SqlContext sqlContext = contextPath.get_SqlContextManager().getBEXI_SqlContext("jdbc:hsqldb:file:hsqldb/data/bexi_fr");
                contextPath.get_SqlContextManager().set_url_current(sqlContext.get_url());

                context.add(contextPath);
                context.add(sqlContext);

                // Set up MetaRules table from file
                BEXI_MetaRulesManager metaDatabase = new BEXI_MetaRulesManager();
                try {
                    metaDatabase.createMetaRulesTable(contextPath);
                } catch (SQLException e) {
                    //System.out.println(e.getMessage());
                }

                try {
                    metaDatabase.createMetaRulesData(contextPath);
                } catch (SQLException e) {
                    //System.out.println(e.getMessage());
                    //System.out.println("exit...") ;
                    //return;
                }

                String requests[] = {

                        //delete class
                        "détruire la classe page",
                        "détruire la classe objet",

                        // create classes
                        "créer la classe page",
                        "créer la classe objet",

                        // Create class attributs
                        "une object a une nom",
                        "une object a des fonctions",
                        "une object a des images",
                        "une object a des liens",

                        // Create object
                        "créer le object button0",

                        // create_class_object_attribut
                        "le nom du objet button0 est button0",
                        "la fonction du objet button0 est test1",
                        "le image du widget button0 est gif/community",
                        "le lien du widget button0 est http://localhost:8080/openbexi.do"
                };

                String requestR[] = {
                        // show class
                        "donner la classe object"
                };

                BEXI_list action = null;
                BEXI_results resultList = null;
                if (request != null) {
                    // Test cleanup the database
                    for (int i = 0; i < requests.length; i++) {

                        try {
                            BEXI_Expression exp = new BEXI_Expression();
                            action = exp.analyze(context, requests[i]);
                            System.out.println("\n" + i + ":" + requests[i] + " ---  action:" + action.getItem(0) + "  ---- OK");
                            context.add(exp);
                            result[0] = exp.result(context, action.getItem(0));

                            if (result != null && result[0] instanceof BEXI_results) {
                                resultList = (BEXI_results) result[0];
                            }
                        } catch (Exception e) {
                            for (int j = 0; j < resultList.get_list().getItemCount(); j++) {
                                System.out.println(resultList.get_list().getItem(j));
                            }
                        }
                    }
                }
                if (requestR != null) {
                    // Test cleanup the database
                    for (int i = 0; i < requestR.length; i++) {

                        try {
                            BEXI_Expression exp = new BEXI_Expression();
                            action = exp.analyze(context, requestR[i]);
                            System.out.println("\n" + i + ":" + requestR[i] + " ---  action:" + action.getItem(0) + "  ---- OK");
                            context.add(exp);
                            result[0] = exp.result(context, action.getItem(0));

                            if (result != null && result[0] instanceof BEXI_results) {
                                resultList = (BEXI_results) result[0];
                            }
                        } catch (Exception e) {
                            for (int j = 0; j < resultList.get_list().getItemCount(); j++) {
                                System.out.println(resultList.get_list().getItem(j));
                            }
                        }
                    }
                }

                BEXI_list requestLN = null;
                BEXI_list status = null;
                requestLN.add(test_name);
                status.add("OK");


                OPENBEXI_Creative_MetaData data = new OPENBEXI_Creative_MetaData(_applicationPath, _response);
                data.sendResults(docOut, requestLN, result, status);

            }
            if (test_name.equals("page_data")) {
                docOut = xml.set_class_object_attribute_value(docOut, "ob_request", test_name, "text", "OK");
            }
        } catch (Exception e) {

        }
        if (_response != null) {
            try {
                _response.setContentType("text/xml");
                _response.setHeader("Cache-Control", "no-cache");
                _response.getWriter().write(xml.XMLSerializer(docOut));
            } catch (IOException e) {
                System.err.println("ob_openFile_fromTemplate:" + e);
            }
        }
    }

    public void start(String defaultWebPagesPath, Document docOut, HttpServletRequest request) {
        Object result[] = new Object[1];
        final BEXI_XMLDriver xml = new BEXI_XMLDriver();
        String test_name;
        try {
            test_name = xml.get_class_object_attribute_value(docOut, "ob_request", "request", "test_name");
            if (test_name.equals("return_text")) {
                docOut = xml.set_class_object_attribute_value(docOut, "ob_request", test_name, "text", "OK");
            }
            if (test_name.equals("page_data")) {

                String widget_id = "div0";
                BEXI_ApplicationPath contextPath = new BEXI_ApplicationPath();
                contextPath.set_defaultLanguage("en");
                //BEXI_SqlContext sqlContext = contextPath.get_SqlContextManager().getBEXI_SqlContext("jdbc:mysql:///test");
                BEXI_SqlContext sqlContext = contextPath.get_SqlContextManager().getBEXI_SqlContext("jdbc:hsqldb:file:../../hsqldb/data/test");

                contextPath.get_SqlContextManager().addBEXI_SqlContext(sqlContext);

                BEXI_SQLDriver sqldriver = new BEXI_SQLDriver();
                try {
                    sqldriver.delete_class(sqlContext.get_statement(), "page");
                } catch (Exception e) {
                    System.err.println(e.getMessage());
                }
                try {
                    sqldriver.create_class(sqlContext.get_statement(), "page");
                } catch (Exception e) {
                }
                try {
                    sqldriver.create_class_attribut(sqlContext.get_statement(), "page", "widget_id");
                } catch (Exception e) {
                    System.err.println(" Cannot create page_id:" + e.getMessage());
                }
                try {
                    sqldriver.create_class_attribut(sqlContext.get_statement(), "page", "link");
                } catch (Exception e) {
                    System.err.println(" Cannot create page link:" + e.getMessage());
                }
                try {
                    sqldriver.create_class_attribut(sqlContext.get_statement(), "page", "function");
                } catch (Exception e) {
                    System.err.println(" Cannot create page function:" + e.getMessage());
                }
                try {
                    sqldriver.create_class_attribut(sqlContext.get_statement(), "page", "image");
                } catch (Exception e) {
                    System.err.println(" Cannot create page image:" + e.getMessage());
                }
                try {

                    String att[] = {"widget_id", "function"};
                    sqldriver.create_class_object(sqlContext.get_statement(), "page", widget_id);
                    String val0[] = new String[2];

                    int count = Integer.parseInt(xml.get_class_object_attribute_value(docOut, "urls", widget_id, "index"));
                    for (int i = 0; i < count; i++) {
                        val0[0] = widget_id;
                        String value = xml.get_class_object_attribute_value(docOut, "url_" + i, widget_id, "functionName");
                        if (value != null) {
                            val0[1] = value;
                            sqldriver.create_class_object_attribut(sqlContext.get_statement(), "page", widget_id, att, val0);
                        }
                    }
                    
                    String att2[] = {"widget_id", "image"};
                    for (int i = 0; i < 9999; i++) {
                        val0[0] = widget_id;
                        String value = xml.get_class_object_attribute_value(docOut, "imgs", widget_id, "file_" + i);
                        if (value != null) {
                            val0[1] = value;
                            sqldriver.create_class_object_attribut(sqlContext.get_statement(), "page", widget_id, att2, val0);
                        } else break;
                    }

                } catch (Exception e) {
                    System.err.println(" Cannot create widget data:" + e.getMessage());
                }

                BEXI_list requestLN = new BEXI_list();
                BEXI_list status = new BEXI_list();
                requestLN.add(test_name);
                status.add("OK");

                BEXI_results resultList = null;

                try {
                    resultList = sqldriver.select_class(sqlContext.get_statement(), "page");
                    result[0] = resultList;
                } catch (Exception e) {
                    System.out.println(e.getMessage());
                }

                OPENBEXI_Creative_MetaData data = new OPENBEXI_Creative_MetaData(_applicationPath, _response);
                data.sendResults(docOut, requestLN, result, status);
                return;
            }
            if (test_name.equals("page_data")) {
                docOut = xml.set_class_object_attribute_value(docOut, "ob_request", test_name, "text", "OK");
            }
        } catch (Exception e) {

        }
        if (_response != null) {
            try {
                _response.setContentType("text/xml");
                _response.setHeader("Cache-Control", "no-cache");
                _response.getWriter().write(xml.XMLSerializer(docOut));
            } catch (IOException e) {
                System.err.println("ob_openFile_fromTemplate:" + e);
            }
        }
    }

    public static void main(String args[]) {
        try {

        } catch (Exception e) {
            System.err.println(e);
        }
    }
}
