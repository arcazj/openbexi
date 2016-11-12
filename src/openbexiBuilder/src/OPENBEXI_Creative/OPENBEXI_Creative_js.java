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
import OPENBEXI.BEXI_XMLDriver;
import org.w3c.dom.Document;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class OPENBEXI_Creative_js extends HttpServlet {

    private HttpServletResponse _response;
    private BEXI_ApplicationPath _applicationPath;

    public OPENBEXI_Creative_js(HttpServletResponse response, BEXI_ApplicationPath applicationPath) {
        _response = response;
        _applicationPath = applicationPath;
    }

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

    private void ob_get_js_header(OutputStream out) {
        new PrintStream(out).println("/* This notice must be untouched at all times.");
        new PrintStream(out).println("");
        new PrintStream(out).println("Copyright(c) 2005-2011 JC Arcaz. All rights reserved.");
        new PrintStream(out).println("OPEN OPENBEXI htmlbuilder library for generating dynanic HTML page and html code source from browsers.");
        new PrintStream(out).println("updated : January 03  2011 version 3.1");
        new PrintStream(out).println("The latest version is available at http://www.openbexi.com");
        new PrintStream(out).println("");
        new PrintStream(out).println("This program is free software; you can redistribute it and/or");
        new PrintStream(out).println("modify it under the terms of the GNU General Public License");
        new PrintStream(out).println("as published by the Free Software Foundation; either version 2");
        new PrintStream(out).println("of the License, or (at your option) any later version.");
        new PrintStream(out).println("");
        new PrintStream(out).println("This program is distributed in the hope that it will be useful,");
        new PrintStream(out).println("MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the");
        new PrintStream(out).println("GNU General Public License for more details.");
        new PrintStream(out).println("");
        new PrintStream(out).println("You should have received a copy of the GNU General Public License");
        new PrintStream(out).println("along with this program; if not, write to the Free Software");
        new PrintStream(out).println("Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA");
        new PrintStream(out).println("*/");
    }

    public Document ob_getJavascriptSpec(Document docOut, String functionName) {
        Document document = null;
        try {
            final BEXI_XMLDriver xml = new BEXI_XMLDriver();
            String path = xml.get_class_object_attribute_value(docOut, "file", "js", "path");
            String group = xml.get_class_object_attribute_value(docOut, "file", "js", "group");
            File path_dir = new File(_applicationPath.getDefaultWebPagesPath());
            String xml_filename = path_dir.getCanonicalPath() + ob_getSeparator(path_dir.getPath()) + path + ob_getSeparator(path_dir.getPath()) + group + ob_getSeparator(path_dir.getPath()) + functionName.replace(".js", "") + ".xml";
            document = BEXI_XMLDriver.openbexi_loadXMLFile(xml_filename);
            xml.set_class_object_attribute_value(document, "file", "js", "group", group);
            String filename = xml.get_class_object_attribute_value(document, "ob_explorer", "file", "filename");
            xml.set_class_object_attribute_value(docOut, "file", "js", "filename", filename);
            String list = xml.get_class_object_attribute_value(document, "ob_explorer", "file", "list");
            xml.set_class_object_attribute_value(docOut, "file", "js", "list", list);
            xml.set_class_object_attribute_value(docOut, "file", "js", "type", "javascripts");
            String icon = xml.get_class_object_attribute_value(document, "ob_explorer", "file", "icon");
            xml.set_class_object_attribute_value(docOut, "file", "js", "icon", icon);
            String specification = xml.get_class_object_attribute_value(document, "ob_explorer", "file", "specification_en");
            xml.set_class_object_attribute_value(docOut, "file", "js", "specification_en", specification);
            specification = xml.get_class_object_attribute_value(document, "ob_explorer", "file", "specification_fr");
            xml.set_class_object_attribute_value(docOut, "file", "js", "specification_fr", specification);
            String parameterCount = xml.get_class_object_attribute_value(document, "ob_explorer", "file", "parameterCount");
            if (parameterCount == null) parameterCount = "0";
            xml.set_class_object_attribute_value(docOut, "file", "js", "parameterCount", parameterCount);
            String trigger = xml.get_class_object_attribute_value(document, "ob_explorer", "file", "event");
            xml.set_class_object_attribute_value(docOut, "file", "js", "trigger", trigger);
            for (int p = 0; p < Integer.valueOf(parameterCount); p++) {
                String parameterName = xml.get_class_object_attribute_value(document, "ob_explorer", "file", "parameterName_" + p);
                xml.set_class_object_attribute_value(docOut, "file", "js", "parameterName_" + p, parameterName);
                String parameterType = xml.get_class_object_attribute_value(document, "ob_explorer", "file", "parameterType_" + p);
                xml.set_class_object_attribute_value(docOut, "file", "js", "parameterType_" + p, parameterType);
                String parameterSpecification = xml.get_class_object_attribute_value(document, "ob_explorer", "file", "parameterSpecification_" + p + "_en");
                xml.set_class_object_attribute_value(docOut, "file", "js", "parameterSpecification_" + p + "_en", parameterSpecification);
                parameterSpecification = xml.get_class_object_attribute_value(document, "ob_explorer", "file", "parameterSpecification_" + p + "_fr");
                xml.set_class_object_attribute_value(docOut, "file", "js", "parameterSpecification_" + p + "_fr", parameterSpecification);
            }
        } catch (Exception e) {
            e.getMessage();
        }
        return docOut;
    }

    public void ob_deleteJSFile(Document docOut) {
        final BEXI_XMLDriver xml = new BEXI_XMLDriver();
        String error = null;
        boolean msg_js = true;
        boolean msg_xml = true;
        String js_filename = null;
        String xml_filename = null;
        try {
            File path_dir = new File(_applicationPath.getDefaultWebPagesPath());

            String path = xml.get_class_object_attribute_value(docOut, "file", "js", "path");
            String filename = xml.get_class_object_attribute_value(docOut, "file", "js", "filename");
            String group = xml.get_class_object_attribute_value(docOut, "file", "js", "group");

            js_filename = path_dir.getCanonicalPath() + ob_getSeparator(path_dir.getPath()) + path + ob_getSeparator(path_dir.getPath()) + group + ob_getSeparator(path_dir.getPath()) + filename + ".js";

            xml_filename = path_dir.getCanonicalPath() + ob_getSeparator(path_dir.getPath()) + path + ob_getSeparator(path_dir.getPath()) + group + ob_getSeparator(path_dir.getPath()) + filename + ".xml";

            // Delete the JS
            msg_js = new File(js_filename).delete();
            msg_xml = new File(xml_filename).delete();


        } catch (Exception e) {
            System.err.println("Exception:" + e.getMessage());
            error = e.getLocalizedMessage();
        }
        try {
            if (error == null)
                docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "status", "text", "done");
            else
                docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "status", "text", error);
            if (!msg_js)
                docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "status", "text", "Cannot delete " + js_filename);
            if (!msg_xml)
                docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "status", "text", "Cannot delete " + xml_filename);

            if (_response != null) {
                _response.setContentType("text/xml");
                _response.setHeader("Cache-Control", "no-cache");
                _response.getWriter().write(xml.XMLSerializer(docOut));
            }
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }

    public void ob_writeJSFile(Document docOut) {
        final BEXI_XMLDriver xml = new BEXI_XMLDriver();
        String error = null;
        int count = 0;
        String filename = null;
        String group = null;
        String path = null;
        File path_dir = null;
        int count_param = 0;
        boolean found_func = false;
        Document doc = null;
        String xml_filename_source = null;
        String xml_filename_instance = null;
        boolean success = true;
        boolean new_source = false;
        String project = null;


        try {
            path_dir = new File(_applicationPath.getDefaultWebPagesPath());
            path = xml.get_class_object_attribute_value(docOut, "file", "js", "path");
            filename = xml.get_class_object_attribute_value(docOut, "file", "js", "filename");
            filename = filename.replace(".js", "");
            filename += ".js";
            group = xml.get_class_object_attribute_value(docOut, "file", "js", "group");
            project = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "project");
            String webpage = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "filename");
            String div_name = xml.get_class_object_attribute_value(docOut, "ob_explorer", "gui", "divName");

            // Checck if the group dir exist
            OutputStream out_source = null;
            OutputStream out_instance;
            File dir = new File(path_dir.getCanonicalPath() + ob_getSeparator(path_dir.getPath()) + path + ob_getSeparator(path_dir.getPath()) + group);
            if (!dir.exists()) {
                success = dir.mkdir();
                new_source = true;
            }
            if (success) {
                // Create function file
                if (new_source)
                    out_source = new FileOutputStream(path_dir.getCanonicalPath() + ob_getSeparator(path_dir.getPath()) + path + ob_getSeparator(path_dir.getPath()) + group + ob_getSeparator(path_dir.getPath()) + filename.replace(".js", "") + ".js");
                // Create js directory if it does not exist
                File js = new File(path_dir.getCanonicalPath() + ob_getSeparator(path_dir.getPath()) + "project" + ob_getSeparator(path_dir.getPath()) + project + ob_getSeparator(path_dir.getPath()) + "js");
                if (!js.exists()) js.mkdir();
                out_instance = new FileOutputStream(path_dir.getCanonicalPath() + ob_getSeparator(path_dir.getPath()) + "project" + ob_getSeparator(path_dir.getPath()) + project + ob_getSeparator(path_dir.getPath()) + "js" + ob_getSeparator(path_dir.getPath()) + filename);

                String data;
                count = 0;
                while (true) {
                    data = xml.get_class_object_attribute_value(docOut, "file", "js", "callBack_" + count++);
                    if (data == null) break;
                    if (new_source) new PrintStream(out_source).println(data);
                    new PrintStream(out_instance).println(data);
                }
                if (new_source) new PrintStream(out_source).print("function " + filename.replace(".js", "") + "( ");
                new PrintStream(out_instance).print("function " + filename.replace(".js", "") + "( ");
                while (true) {
                    data = xml.get_class_object_attribute_value(docOut, "file", "js", "parameterName_" + count_param);
                    if (data == null) break;
                    if (count_param == 0) {
                        if (new_source) new PrintStream(out_source).print(data);
                        new PrintStream(out_instance).print(data);
                    } else {
                        if (new_source) new PrintStream(out_source).print(", " + data);
                        new PrintStream(out_instance).print(", " + data);
                    }
                    count_param++;
                }
                if (new_source) new PrintStream(out_source).println(" ) {");
                new PrintStream(out_instance).println(" ) {");

                count = 0;
                while (true) {
                    data = xml.get_class_object_attribute_value(docOut, "file", "js", "header_" + count++);
                    if (data == null) break;
                    if (new_source) new PrintStream(out_source).println(data);
                    new PrintStream(out_instance).println(data);
                }
                count = 0;
                while (true) {
                    data = xml.get_class_object_attribute_value(docOut, "file", "js", "body_" + count++);
                    if (data == null) break;
                    if (new_source) new PrintStream(out_source).println(data);
                    new PrintStream(out_instance).println(data);
                }
                if (new_source) new PrintStream(out_source).println("}");
                new PrintStream(out_instance).println("}");
                if (new_source) out_source.close();
                out_instance.close();

                // If it is a new function, save a js copy to the js source
                File js_filename_source = new File(path_dir.getCanonicalPath() + ob_getSeparator(path_dir.getPath()) + path + ob_getSeparator(path_dir.getPath()) + group + ob_getSeparator(path_dir.getPath()) + filename);
                File js_filename_instance = new File(path_dir.getCanonicalPath() + ob_getSeparator(path_dir.getPath()) + "project" + ob_getSeparator(path_dir.getPath()) + project + ob_getSeparator(path_dir.getPath()) + "js" + ob_getSeparator(path_dir.getPath()) + filename);
                if (!js_filename_source.getAbsolutePath().contains("public") && !js_filename_source.getAbsolutePath().contains("ob_attach_web_socket")) {
                    OPENBEXI_Creative_file.ob_copyFile(js_filename_instance, js_filename_source);
                }
            }
        } catch (Exception e) {
            System.err.println("Exception:" + e);
            error = e.getMessage();
        }
        try {
            //update <javascripts>.xml
            xml_filename_instance = path_dir.getCanonicalPath() + ob_getSeparator(path_dir.getPath()) + "project" + ob_getSeparator(path_dir.getPath()) + project + ob_getSeparator(path_dir.getPath()) + "js" + ob_getSeparator(path_dir.getPath()) + filename.replace(".js", "") + ".xml";
            found_func = false;
            doc = BEXI_XMLDriver.openbexi_loadXMLFile(xml_filename_instance);
        } catch (Exception e) {
            System.err.println("Exception:" + e);
        }
        if (success) {
            try {
                doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "file", "filename", filename);
                String type = xml.get_class_object_attribute_value(docOut, "file", "js", "type");
                doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "file", "type", type);
                String list = xml.get_class_object_attribute_value(docOut, "file", "js", "list");
                doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "file", "list", list);
                String specification_en = xml.get_class_object_attribute_value(docOut, "file", "js", "specification_en");
                doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "file", "specification_en", specification_en);
                String specification_fr = xml.get_class_object_attribute_value(docOut, "file", "js", "specification_fr");
                doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "file", "specification_fr", specification_fr);
                String icon = xml.get_class_object_attribute_value(docOut, "file", "js", "icon");
                doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "file", "icon", icon);
                count_param = 0;
                while (true) {
                    String parameterName = xml.get_class_object_attribute_value(docOut, "file", "js", "parameterName_" + count_param);
                    if (parameterName == null) {
                        doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "file", "parameterCount", Integer.toString(count_param));
                        break;
                    }
                    String parameterType = xml.get_class_object_attribute_value(docOut, "file", "js", "parameterType_" + count_param);
                    if (parameterType == null) parameterType = "TBD";
                    String parameterSpecification_en = xml.get_class_object_attribute_value(docOut, "file", "js", "parameterSpecification_" + count_param + "_en");
                    if (parameterSpecification_en == null) parameterSpecification_en = "TBD";
                    String parameterSpecification_fr = xml.get_class_object_attribute_value(docOut, "file", "js", "parameterType_" + count_param + "_fr");
                    if (parameterSpecification_fr == null) parameterSpecification_fr = "TBD";
                    doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "file", "parameterName_" + count_param, parameterName);
                    doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "file", "parameterType_" + count_param, parameterType);
                    doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "file", "parameterSpecification_" + count_param + "_en", parameterSpecification_en);
                    doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "file", "parameterSpecification_" + count_param + "_fr", parameterSpecification_fr);
                    count_param++;
                }
                String evt = xml.get_class_object_attribute_value(docOut, "file", "js", "event");
                doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "file", "event", evt);
                String ret = xml.get_class_object_attribute_value(docOut, "file", "js", "return");
                doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "file", "return", ret);
                BEXI_XMLDriver.openbexi_saveXMLFile(xml_filename_instance, doc);

                // If it is a new function, save a xml copy to the js source
                xml_filename_source = path_dir.getCanonicalPath() + ob_getSeparator(path_dir.getPath()) + path + ob_getSeparator(path_dir.getPath()) + group + ob_getSeparator(path_dir.getPath()) + filename.replace(".js", "") + ".xml";
                if (!xml_filename_source.contains("public") && !xml_filename_source.contains("ob_attach_web_socket"))
                    BEXI_XMLDriver.openbexi_saveXMLFile(xml_filename_source, doc);


            } catch (Exception e) {
                System.err.println("Exception:" + e);
                error = e.getMessage();
            }
        }
        try {
            if (error == null)
                docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "status", "text", "done");
            else {
                docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "status", "text", error);
                if (!success)
                    docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "status", "text", "Cannot create group");
            }
            if (_response != null) {
                _response.setContentType("text/xml");
                _response.setHeader("Cache-Control", "no-cache");
                _response.getWriter().write(xml.XMLSerializer(docOut));
            }
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }

    public void ob_readJSFile(Document docOut) {
        final BEXI_XMLDriver xml = new BEXI_XMLDriver();
        String error = null;

        String extension = ".js";
        boolean headerB = false;
        boolean bodyB = false;
        boolean callBackB = true;
        String code = "";
        int count = 0;
        try {
            File path_dir = new File(_applicationPath.getDefaultWebPagesPath());
            String path = xml.get_class_object_attribute_value(docOut, "file", "js", "path");
            String filename = xml.get_class_object_attribute_value(docOut, "file", "js", "filename");
            String group = xml.get_class_object_attribute_value(docOut, "file", "js", "group");
            String project = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "project");
            String webpage = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "filename");
            String div_name = xml.get_class_object_attribute_value(docOut, "ob_explorer", "gui", "divName");


            // Check if a javascript instance already exit for the widget, if the javascript instance does not exist create the file under the project "js" directory.
            File js_instance = new File(path_dir.getPath() + ob_getSeparator(path_dir.getPath()) + "project" + ob_getSeparator(path_dir.getPath()) + project + ob_getSeparator(path_dir.getPath()) + "js" + ob_getSeparator(path_dir.getPath()) + filename);
            File js_source = new File(path_dir.getCanonicalPath() + ob_getSeparator(path_dir.getPath()) + path + ob_getSeparator(path_dir.getPath()) + group + ob_getSeparator(path_dir.getPath()) + filename);
            File xml_instance = new File(js_instance.toString().replace(".js", ".xml"));
            File xml_source = new File(js_source.toString().replace(".js", ".xml"));
            OutputStream out_js_instance = null;
            boolean new_instance = false;
            if (!js_instance.exists()) {
                new_instance = true;
                OPENBEXI_Creative_file.ob_copyFile(js_source, js_instance);
                OPENBEXI_Creative_file.ob_copyFile(xml_source, xml_instance);
                out_js_instance = new FileOutputStream(js_instance.getCanonicalFile());
            }

            // Read JS specification
            docOut = this.ob_getJavascriptSpec(docOut, filename);

            // Read and save new JS code
            String buffer = "";
            filename = filename.replace(extension, "");

            FileInputStream fis = null;
            if (new_instance)
                fis = new FileInputStream(js_source.getAbsoluteFile());
            else
                fis = new FileInputStream(js_instance.getAbsoluteFile());
            BufferedInputStream bis = new BufferedInputStream(fis);
            DataInputStream dis = new DataInputStream(bis);
            Pattern patternG = Pattern.compile("function " + filename);
            Matcher matcher = null;
            while (dis.available() != 0) {
                if (new_instance)
                    code = dis.readLine().replace("__widgetID__", "_" + webpage + "_" + div_name + "_");
                else
                    code = dis.readLine();
                if (code.equals("")) code = " ";
                matcher = patternG.matcher(code);
                if (matcher.find()) {
                    callBackB = false;
                    bodyB = false;
                    headerB = false;
                    count = 0;
                }
                if (code.contains("//Variable declaration and initialization") && !callBackB) {
                    headerB = true;
                    bodyB = false;
                    callBackB = false;
                    count = 0;
                }
                if (code.contains("//Body: Javascript code") && !callBackB) {
                    bodyB = true;
                    headerB = false;
                    callBackB = false;
                    count = 0;
                }
                if (headerB) {
                    docOut = xml.set_class_object_attribute_value(docOut, "file", "js", "header_" + count, code);
                    count++;
                }
                if (bodyB) {
                    if (dis.available() != 0)
                        docOut = xml.set_class_object_attribute_value(docOut, "file", "js", "body_" + count, code);
                    count++;
                }
                if (callBackB) {
                    docOut = xml.set_class_object_attribute_value(docOut, "file", "js", "callBack_" + count, code);
                    count++;
                }
                if (new_instance) new PrintStream(out_js_instance).println(code);
            }
            if (new_instance) out_js_instance.close();
            dis.close();
            bis.close();
            fis.close();


        } catch (Exception e) {
            error = e.getMessage();
            System.err.println(e.getMessage());
        }

        try {
            if (error == null)
                docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "status", "text", "done");
            else
                docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "status", "text", error);
            if (_response != null) {
                _response.setContentType("text/xml");
                _response.setHeader("Cache-Control", "no-cache");
                _response.getWriter().write(xml.XMLSerializer(docOut));
            }
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }

    public static void main(String args[]) {
        try {
            final BEXI_XMLDriver xml = new BEXI_XMLDriver();
            Document docOut = null;

            docOut = xml.set_class_object_attribute_value(docOut, "file", "js", "group", "myFunctions");
            docOut = xml.set_class_object_attribute_value(docOut, "file", "js", "filename", "myFunction");
            docOut = xml.set_class_object_attribute_value(docOut, "file", "js", "type", "javascripts");
            docOut = xml.set_class_object_attribute_value(docOut, "file", "js", "list", "openbexi_button");

            docOut = xml.set_class_object_attribute_value(docOut, "file", "js", "specification_en", "my Function");
            docOut = xml.set_class_object_attribute_value(docOut, "file", "js", "specification_fr", "ma Function");
            docOut = xml.set_class_object_attribute_value(docOut, "file", "js", "icon", "default.jpg");
            docOut = xml.set_class_object_attribute_value(docOut, "file", "js", "parameterCount", "1");

            docOut = xml.set_class_object_attribute_value(docOut, "file", "js", "parameterName_0", "widget_id");
            docOut = xml.set_class_object_attribute_value(docOut, "file", "js", "parameterType_0", "string");
            docOut = xml.set_class_object_attribute_value(docOut, "file", "js", "parameterSpecification_0_en", "Trigger the function from this selected widget");
            docOut = xml.set_class_object_attribute_value(docOut, "file", "js", "parameterSpecification_0_fr", "Activer la fonction a partir de ce widget selectionné");

            docOut = xml.set_class_object_attribute_value(docOut, "file", "js", "event", "none");
            docOut = xml.set_class_object_attribute_value(docOut, "file", "js", "return", "none");

            docOut = xml.set_class_object_attribute_value(docOut, "file", "js", "path", "js");
            docOut = xml.set_class_object_attribute_value(docOut, "file", "js", "private", "true");

            docOut = xml.set_class_object_attribute_value(docOut, "file", "js", "header_0", "//Variable declaration and initialization");
            docOut = xml.set_class_object_attribute_value(docOut, "file", "js", "header_1", "var widget_type = openbexi_getPageData(null, 'page', widget_id, 'type');");

            docOut = xml.set_class_object_attribute_value(docOut, "file", "js", "body_0", "//Body: Javascript code");
            docOut = xml.set_class_object_attribute_value(docOut, "file", "js", "body_1", "alert (widget_type);");

            docOut = xml.set_class_object_attribute_value(docOut, "file", "js", "callBack_0", "");

            BEXI_ApplicationPath applicationPath = new BEXI_ApplicationPath();
            File path_dir = new File(applicationPath.getDefaultWebPagesPath());


            // Reading JS function count  after updating the database
            OPENBEXI_Creative_js js = new OPENBEXI_Creative_js(null, applicationPath);
            String xml_filename = null;
            xml_filename = path_dir.getCanonicalPath() + js.ob_getSeparator(path_dir.getPath()) + "js" + js.ob_getSeparator(path_dir.getPath()) + "myFunctions" + js.ob_getSeparator(path_dir.getPath()) + "myFunction.xml";
            Document doc = BEXI_XMLDriver.openbexi_loadXMLFile(xml_filename);

            // Creating new JS function in the database
            js.ob_writeJSFile(docOut);

            // Deleting new JS function in the database
            //js.ob_deleteJSFile(docOut);

        }
        catch (Exception e) {
            System.err.println("Exception:" + e);
        }
    }
}


