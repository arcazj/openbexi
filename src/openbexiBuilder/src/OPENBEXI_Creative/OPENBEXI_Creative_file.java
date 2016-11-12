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
import OPENBEXI.BEXI_HTML2PDF;
import OPENBEXI.BEXI_XMLDriver;
import com.stevesoft.pat.Regex;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Attributes;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.w3c.dom.Document;
import org.xml.sax.InputSource;

import javax.imageio.ImageIO;
import javax.imageio.ImageReadParam;
import javax.imageio.ImageReader;
import javax.imageio.stream.ImageInputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.zip.CRC32;


public class OPENBEXI_Creative_file extends HttpServlet {

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

    public OPENBEXI_Creative_file(HttpServletResponse response, BEXI_ApplicationPath applicationPath) {
        _response = response;
        _applicationPath = applicationPath;
    }

    private void ob_error(Document doc, BEXI_XMLDriver xml, String message) {
        try {
            doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "status", "text", message);
            if (_response != null) {
                _response.setContentType("text/xml");
                _response.setHeader("Cache-Control", "no-cache");
                _response.getWriter().write(xml.XMLSerializer(doc));
            }
        } catch (Exception e) {
            System.err.println("Exception:" + e.getMessage());
        }
    }

    private void ob_do_nothing() {
    }

    // constant values for the override option
    public static final int OVERWRITE_ALWAYS = 1;
    public static final int OVERWRITE_NEVER = 2;
    public static final int OVERWRITE_ASK = 3;

    // program options initialized to default values
    private static int bufferSize = 100 * 1024;
    private static boolean clock = false;
    private static boolean verify = false;
    private static int override = OVERWRITE_ASK;

    public Document ob_createProject_or_TemplateCategory(String defaultWebPagesPath, Document docOut, String typeRequest) {
        final BEXI_XMLDriver xml = new BEXI_XMLDriver();
        String project;
        String dir_project;
        final BEXI_XMLDriver xmlResponse = new BEXI_XMLDriver();
        try {
            if (typeRequest.equals("openbexi_createTemplateCategoryRequest")) {
                project = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "templateCategory");
                dir_project = "template" + ob_getSeparator(defaultWebPagesPath) + "ob_project";
            } else {
                project = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "project");
                dir_project = "project";
            }
            boolean success;
            File f = new File(defaultWebPagesPath + ob_getSeparator(defaultWebPagesPath) + dir_project + ob_getSeparator(defaultWebPagesPath) + project);
            if (!f.exists()) {
                success = (new File(defaultWebPagesPath + ob_getSeparator(defaultWebPagesPath) + dir_project + ob_getSeparator(defaultWebPagesPath) + project)).mkdir();
                if (success)
                    success = (new File(defaultWebPagesPath + ob_getSeparator(defaultWebPagesPath) + dir_project + ob_getSeparator(defaultWebPagesPath) + project + ob_getSeparator(defaultWebPagesPath) + "css")).mkdir();
                if (success)
                    success = (new File(defaultWebPagesPath + ob_getSeparator(defaultWebPagesPath) + dir_project + ob_getSeparator(defaultWebPagesPath) + project + ob_getSeparator(defaultWebPagesPath) + "archives")).mkdir();
                if (success)
                    success = (new File(defaultWebPagesPath + ob_getSeparator(defaultWebPagesPath) + dir_project + ob_getSeparator(defaultWebPagesPath) + project + ob_getSeparator(defaultWebPagesPath) + "data")).mkdir();
                if (success)
                    success = (new File(defaultWebPagesPath + ob_getSeparator(defaultWebPagesPath) + dir_project + ob_getSeparator(defaultWebPagesPath) + project + ob_getSeparator(defaultWebPagesPath) + "gif")).mkdir();
                if (success) {
                    docOut = xml.set_class_object_attribute_value(docOut, "ob_request", "request", "subtype", "");
                    docOut = xml.set_class_object_attribute_value(docOut, "file", "html", "name", "template.html");
                    docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "dir", "project", project);
                    docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "dir", "filename", "template.html");
                    this.ob_createHtmlFile(_applicationPath.getDefaultWebPagesPath(), docOut, null);
                }
                if (!success)
                    if (typeRequest.equals("openbexi_createTemplateCategoryRequest"))
                        docOut = xmlResponse.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "CannotCreateTemplateCategory");
                    else
                        docOut = xmlResponse.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "CannotCreateProject");
                else
                    docOut = xmlResponse.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "ok");
            } else {
                if (typeRequest.equals("openbexi_createTemplateCategoryRequest"))
                    docOut = xmlResponse.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "TemplateCategoryAlreadyExist");
                else
                    docOut = xmlResponse.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "ProjectAlreadyExit");
            }
        } catch (Exception e) {
            try {
                docOut = xmlResponse.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "CannotCreateProject");
                docOut = xmlResponse.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "exception", e.getMessage());
            } catch (Exception e1) {
                System.err.println("ob_createProject_or_TemplateCategory:" + e);
            }
        }
        if (_response != null) {
            try {
                _response.setContentType("text/xml");
                _response.setHeader("Cache-Control", "no-cache");
                _response.getWriter().write(xml.XMLSerializer(docOut));
            } catch (IOException e) {
                System.err.println("ob_createProject_or_TemplateCategory:" + e);
            }
        }
        return docOut;
    }

    public Document ob_createPage(String defaultWebPagesPath, Document docOut) {
        final BEXI_XMLDriver xml = new BEXI_XMLDriver();
        String project;
        String fileName;
        final BEXI_XMLDriver xmlResponse = new BEXI_XMLDriver();
        try {
            project = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "project");
            fileName = xml.get_class_object_attribute_value(docOut, "ob_request", "template", "name");
            File f = new File(defaultWebPagesPath + ob_getSeparator(defaultWebPagesPath) + "project" + ob_getSeparator(defaultWebPagesPath) + project + ob_getSeparator(defaultWebPagesPath) + fileName);
            File f_project = new File(defaultWebPagesPath + ob_getSeparator(defaultWebPagesPath) + "project" + ob_getSeparator(defaultWebPagesPath) + project);
            if (f_project.exists()) {
                if (!fileName.equals("no_name.html"))
                    docOut = xmlResponse.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "PageAlreadyExit");
                else {
                    f.createNewFile();
                    docOut = xmlResponse.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "ok");
                }
            } else {
                docOut = xmlResponse.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "ProjectNotExist");
            }
        } catch (Exception e) {
            try {
                docOut = xmlResponse.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", e.getMessage());
            } catch (Exception e1) {
                System.err.println("ob_createPage:" + e);
            }
        }
        return docOut;
    }

    public Document ob_createPageTemplate(String defaultWebPagesPath, Document docOut) {
        final BEXI_XMLDriver xml = new BEXI_XMLDriver();
        String templateCategory;
        String project;
        String template;
        String page;
        boolean overwrite = true;
        final BEXI_XMLDriver xmlResponse = new BEXI_XMLDriver();
        try {
            String overwrite_s = xml.get_class_object_attribute_value(docOut, "ob_request", "dir", "overwrite");
            if (overwrite_s != null && overwrite_s.equals("false")) overwrite = false;
            templateCategory = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "templateCategory");
            project = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "project");
            page = xml.get_class_object_attribute_value(docOut, "ob_request", "page", "name");
            template = xml.get_class_object_attribute_value(docOut, "ob_request", "template", "name");
            File f_source = new File(defaultWebPagesPath + ob_getSeparator(defaultWebPagesPath) + "project" + ob_getSeparator(defaultWebPagesPath) + project + ob_getSeparator(defaultWebPagesPath) + page);
            File f = new File(defaultWebPagesPath + ob_getSeparator(defaultWebPagesPath) + "template" + ob_getSeparator(defaultWebPagesPath) + "ob_project" + ob_getSeparator(defaultWebPagesPath) + templateCategory + ob_getSeparator(defaultWebPagesPath) + template);

            if (!template.equals("no_name.html") && overwrite_s == null) {
                docOut = xmlResponse.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "TemplateAlreadyExit");
                overwrite = false;
            }
            if (overwrite) {
                if (f_source.exists()) ob_copyFile(f_source, f);
                docOut = xmlResponse.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "ok");
            }

        } catch (Exception e) {
            try {
                docOut = xmlResponse.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", e.getMessage());
            } catch (Exception e1) {
                System.err.println("ob_createPageTemplate:" + e);
            }
        }
        return docOut;
    }

    public static boolean ob_deleteDir(File dir) {
        if (dir.isDirectory()) {
            String[] children = dir.list();
            for (int i = 0; i < children.length; i++) {
                boolean success = ob_deleteDir(new File(dir, children[i]));
                if (!success) {
                    return false;
                }
            }
        }
        // The directory is now empty so delete it
        return dir.delete();
    }

    public Document ob_deleteProject(String defaultWebPagesPath, Document docOut) {
        final BEXI_XMLDriver xml = new BEXI_XMLDriver();
        String project;
        final BEXI_XMLDriver xmlResponse = new BEXI_XMLDriver();
        try {
            project = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "project");
            boolean success;
            File dir = new File(defaultWebPagesPath + ob_getSeparator(defaultWebPagesPath) + "project" + ob_getSeparator(defaultWebPagesPath) + project);
            if (!project.equals("no_name") && dir.exists()) {
                success = ob_deleteDir(dir);
                if (!success)
                    docOut = xmlResponse.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "CannotDeleteProject");
                else
                    docOut = xmlResponse.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "ok");
            } else {
                docOut = xmlResponse.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "ProjectNotExist");
            }
        } catch (Exception e) {
            try {
                docOut = xmlResponse.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", e.getMessage());
            } catch (Exception e1) {
                System.err.println("ob_deleteProject:" + e);
            }
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
        return docOut;
    }

    public Document ob_deleteTemplateCategory(String defaultWebPagesPath, Document docOut) {
        final BEXI_XMLDriver xml = new BEXI_XMLDriver();
        String templateCategory;
        final BEXI_XMLDriver xmlResponse = new BEXI_XMLDriver();
        try {
            templateCategory = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "templateCategory");
            boolean success;
            File dir = new File(defaultWebPagesPath + ob_getSeparator(defaultWebPagesPath) + "template" + ob_getSeparator(defaultWebPagesPath) + "ob_project" + ob_getSeparator(defaultWebPagesPath) + templateCategory);
            if (!templateCategory.equals("no_name") && dir.exists()) {
                success = ob_deleteDir(dir);
                if (!success)
                    docOut = xmlResponse.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "CannotDeleteTemplateCategory");
                else
                    docOut = xmlResponse.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "ok");
            } else {
                docOut = xmlResponse.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "CategoryTemplateNotExist");
            }
        } catch (Exception e) {
            try {
                docOut = xmlResponse.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", e.getMessage());
            } catch (Exception e1) {
                System.err.println("ob_deletetemplateCategory:" + e);
            }
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
        return docOut;
    }

    public Document ob_deleteFile(String defaultWebPagesPath, Document docOut, HttpServletRequest request, String type) {
        final BEXI_XMLDriver xml = new BEXI_XMLDriver();
        String project;
        String dir_project;
        String filename;
        final BEXI_XMLDriver xmlResponse = new BEXI_XMLDriver();
        try {
            if (type.equals("openbexi_deleteTemplateRequest")) {
                project = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "templateCategory");
                dir_project = "template" + ob_getSeparator(defaultWebPagesPath) + "ob_project";
            } else {
                project = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "project");
                dir_project = "project";
            }
            filename = xml.get_class_object_attribute_value(docOut, "file", "html", "name");
        } catch (Exception e) {
            try {
                if (type.equals("openbexi_deleteTemplateRequest"))
                    docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "CannotDeleteTemplate");
                else
                    docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "CannotDeleteFile");
                docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "exception", e.getMessage());
                return docOut;
            } catch (Exception e1) {
                return docOut;
            }
        }
        boolean success = new File(defaultWebPagesPath + ob_getSeparator(defaultWebPagesPath) + dir_project + ob_getSeparator(defaultWebPagesPath) + project + ob_getSeparator(defaultWebPagesPath) + filename).delete();
        if (!success) {
            try {
                if (type.equals("openbexi_deleteTemplateRequest"))
                    docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "CannotDeleteTemplate");
                else
                    docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "CannotDeleteFile");
            } catch (Exception e1) {
                System.err.println(e1.getMessage());
            }
        } else {
            success = new File(defaultWebPagesPath + ob_getSeparator(defaultWebPagesPath) + dir_project + ob_getSeparator(defaultWebPagesPath) + project + ob_getSeparator(defaultWebPagesPath) + filename).delete();
            if (!success) {
                try {
                    if (type.equals("openbexi_deleteTemplateRequest"))
                        docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "CannotDeleteTemplate");
                    else
                        docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "CannotDeleteFile");
                    docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "exception", "cannot delete " + filename);
                } catch (Exception e1) {
                    System.err.println(e1.getMessage());
                }
            } else {
                try {
                    String localAdress = request.getLocalAddr() + ":" + request.getLocalPort();
                    Pattern patternG = Pattern.compile("(127.)|(0.0.0)");
                    Matcher matcher = patternG.matcher(localAdress);
                    if (matcher.find()) {
                        localAdress = "localhost:" + request.getLocalPort();
                    }
                    String url_default = "http://" + localAdress + request.getContextPath() + "/openbexi.do";
                    docOut = xmlResponse.set_class_object_attribute_value(docOut, "file", "html", "url_default", url_default);
                    docOut = xmlResponse.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "ok");
                } catch (Exception e) {
                    System.err.println(e.getMessage());
                }
            }
        }
        return docOut;
    }

    public void ob_openFile_fromTemplate(String defaultWebPagesPath, Document docOut) {
        final BEXI_XMLDriver xml = new BEXI_XMLDriver();
        String filename;
        try {
            filename = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "filename");
            File fileTemplate = new File(_applicationPath.getDefaultPath() + ob_getSeparator(_applicationPath.getDefaultPath()) + "template" + ob_getSeparator(defaultWebPagesPath) + "ob_project" + ob_getSeparator(_applicationPath.getDefaultPath()) + filename);
            File fileTmp = new File(_applicationPath.getDefaultPath() + ob_getSeparator(_applicationPath.getDefaultPath()) + filename);
            OPENBEXI_Creative_file.ob_copyFile(fileTemplate, fileTmp);
        } catch (Exception e) {
            //e.printStackTrace();
            try {
                docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "failed");
            } catch (Exception e1) {
                System.err.println("ob_openFile_fromTemplate:" + e);
            }

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

    public void ob_overwriteHTMLPage_fromArchiveOrTemplate(String defaultWebPagesPath, Document docOut, String type) {
        final BEXI_XMLDriver xml = new BEXI_XMLDriver();
        try {
            String dir_project = "project";
            String project = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "project");

            if (type.equals("openbexi_overwrite_HTMLTemplateFromArchiveRequest")) {
                dir_project = "template" + ob_getSeparator(defaultWebPagesPath) + "ob_project";
                project = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "templateCategory");
            }
            if (type.equals("openbexi_overwrite_HTMLPageFromArchiveRequest") || type.equals("openbexi_overwrite_HTMLTemplateFromArchiveRequest")) {
                String archive_filename = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "archive_filename");
                String[] filename_item = archive_filename.split(".html");
                docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "dir", "filename", filename_item[0] + ".html");
            } else {
                String filename = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "filename");
                File file_project = new File(_applicationPath.getDefaultPath() + ob_getSeparator(_applicationPath.getDefaultPath()) + "project" + ob_getSeparator(_applicationPath.getDefaultPath()) + project + ob_getSeparator(_applicationPath.getDefaultPath()) + filename);
                file_project.createNewFile();
            }
            docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "ok");
        } catch (Exception e) {
            System.err.println("ob_overwriteHTMLPage_fromArchiveOrTemplate():" + e.getMessage());
            try {
                docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "failed");
                docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "exception", e.getMessage());
            } catch (Exception e1) {
                System.err.println("ob_overwriteHTMLPage_fromArchiveOrTemplate():" + e1.getMessage());
            }
        }
        if (_response != null) {
            try {
                _response.setContentType("text/xml");
                _response.setHeader("Cache-Control", "no-cache");
                _response.getWriter().write(xml.XMLSerializer(docOut));
            } catch (IOException e) {
                System.err.println("ob_overwriteHTMLPage_fromArchiveOrTemplate():" + e.getMessage());
            }
        }
    }

    /**
     * Read HTML page, and return xml data, and divs to the OpenBEXI builder
     *
     * @param file .
     * @return Elements .
     */
    private Elements ob_get_div_from_HTML(File file) {
        org.jsoup.nodes.Document docOut;
        Elements divs = null;
        try {
            if (file == null || !file.isFile()) return null;
            docOut = Jsoup.parse(file, "UTF-8");
            divs = docOut.getElementsByAttributeValueMatching("CLASSE", "DIV");
            if (file.getName().equals("template.html")) {
                Elements divs_tmp = new Elements();
                for (Element pdiv : divs) {
                    if (pdiv.id().contains("template"))
                        divs_tmp.add(pdiv);
                }
                return divs_tmp;
            }
        } catch (IOException e) {
            System.err.println("ob_readHTMLTemplate:" + e.getMessage());
        }
        return divs;
    }

    private void ob_print_OPENBEXI_PAGES_DATA_XML(String OPENBEXI_PAGES_DATA_XML) {
        BEXI_XMLDriver xml = new BEXI_XMLDriver();
        Document doc_OPENBEXI_TEMPLATE_DATA_XML = null;
        try {
            doc_OPENBEXI_TEMPLATE_DATA_XML = xml.openbexi_loadXML(OPENBEXI_PAGES_DATA_XML);
            String[] objects = xml.get_xml_classe_objectsName(doc_OPENBEXI_TEMPLATE_DATA_XML, "page");
            if (objects != null) {
                for (int i = 0; i < objects.length; i++) {
                    if (objects[i].toString().contains("div")) {
                        String[] attr_name = xml.get_xml_classe_object_attributesName(doc_OPENBEXI_TEMPLATE_DATA_XML, "page", objects[i]);
                        System.out.format("%-45s \n", "Object=" + objects[i].toString());
                        for (int j = 0; j < attr_name.length; j++) {
                            String attr = xml.get_class_object_attribute_value(doc_OPENBEXI_TEMPLATE_DATA_XML, "page", objects[i], attr_name[j]);
                            System.out.format("%-45s %-100s\n", "     " + attr_name[j], attr.toString());
                        }
                    }
                }
            }
        } catch (Exception e) {
            System.err.println("ob_print_OPENBEXI_PAGES_DATA_XML:" + e.getMessage());
        }
    }

    private Document ob_clean_OPENBEXI_DATA_XML(Document doc, Elements divs) {
        if (divs == null) return doc;
        BEXI_XMLDriver xml = new BEXI_XMLDriver();
        try {
            boolean object_found = false;
            String[] objects = xml.get_xml_classe_objectsName(doc, "page");
            for (int i = 0; i < objects.length; i++) {
                for (Element pdiv : divs) {
                    if (pdiv.id().equals(objects[i])) {
                        object_found = true;
                        break;
                    }
                }
                if (object_found == false) {
                    doc = xml.delete_xml_classe_object(doc, "page", objects[i]);
                    doc = xml.delete_xml_classe(doc, objects[i]);
                    doc = xml.delete_xml_classe_containing_object(doc, "chartflow", objects[i]);
                    doc = xml.delete_xml_classe_object_containing_attribute(doc, "chartflow", "node", objects[i]);
                    doc = xml.delete_xml_classe_object_containing_attribute(doc, "chartflow", "connection", objects[i]);
                }
            }
        } catch (Exception e) {
            System.err.println("ob_clean_OPENBEXI_DATA_XML:" + e.getMessage());
        }
        return doc;
    }

    private Document ob_clean_OPENBEXI_DATA_XML(Document doc, Element div) {
        BEXI_XMLDriver xml = new BEXI_XMLDriver();
        try {
            doc = xml.delete_xml_classe_object(doc, "page", div.id());
            doc = xml.delete_xml_classe(doc, div.id());
            doc = xml.delete_xml_classe_containing_object(doc, "chartflow", div.id());
            doc = xml.delete_xml_classe_object_containing_attribute(doc, "chartflow", "node", div.id());
            doc = xml.delete_xml_classe_object_containing_attribute(doc, "chartflow", "connection", div.id());
        } catch (Exception e) {
            System.err.println("ob_clean_OPENBEXI_DATA_XML:" + e.getMessage());
        }
        return doc;
    }

    private String ob_get_OPENBEXI_PAGES_DATA_XML(File html_file, File html_template) {
        boolean widget_found = false;
        String OPENBEXI_PAGES_DATA_XML = "<openbexiCreative><object name=\"init\"><attribute name=\"init\" init=\"init\"/></object><classe name=\"ob_ssh\"><object name=\"connection\"><attribute name=\"number\" number=\"0\"/></object></classe><classe name=\"chartflow\"><object name=\"node\"><attribute name=\"count\" count=\"0\"/></object></classe><classe name=\"page\"><object name=\"version\"><attribute name=\"code\" code=\"5.0 Beta\"/></object></classe></openbexiCreative>";
        String OPENBEXI_TEMPLATE_DATA_XML = "<openbexiCreative><object name=\"init\"><attribute name=\"init\" init=\"init\"/></object><classe name=\"ob_ssh\"><object name=\"connection\"><attribute name=\"number\" number=\"0\"/></object></classe><classe name=\"chartflow\"><object name=\"node\"><attribute name=\"count\" count=\"0\"/></object></classe><classe name=\"page\"><object name=\"version\"><attribute name=\"code\" code=\"5.0 Beta\"/></object></classe></openbexiCreative>";
        Document doc_OPENBEXI_PAGES_DATA_XML = null;
        Document doc_OPENBEXI_TEMPLATE_DATA_XML = null;
        org.jsoup.nodes.Document doc_html_file = null;
        org.jsoup.nodes.Document doc_template_file = null;
        Elements P_divs = null;
        Elements T_divs = null;
        List<Element> P_divs_to_delete = new Vector();
        List<Element> T_divs_to_delete = new Vector();
        BEXI_XMLDriver xml = new BEXI_XMLDriver();

        try {
            // ############################################################
            // Parse html_template to extract XML data for the current page
            // ############################################################
            if (html_template.exists()) {
                try {
                    doc_template_file = Jsoup.parse(html_template, "UTF-8");
                    for (int i = 0; i < doc_template_file.head().childNodes().size(); i++) {
                        try {
                            if (doc_template_file.head().childNode(i).toString().contains("OPENBEXI_PAGES_DATA_XML")) {
                                OPENBEXI_TEMPLATE_DATA_XML = doc_template_file.head().childNode(i).childNode(0).toString();
                                OPENBEXI_TEMPLATE_DATA_XML = OPENBEXI_TEMPLATE_DATA_XML.replace("var OPENBEXI_PAGES_DATA_XML = ", "");
                                OPENBEXI_TEMPLATE_DATA_XML = OPENBEXI_TEMPLATE_DATA_XML.replace("'", "");
                                OPENBEXI_TEMPLATE_DATA_XML = OPENBEXI_TEMPLATE_DATA_XML.replace("\'</script>", "");
                                break;
                            }
                        } catch (Exception e) {
                            ob_do_nothing();
                        }
                    }
                    doc_OPENBEXI_TEMPLATE_DATA_XML = xml.openbexi_loadXML(OPENBEXI_TEMPLATE_DATA_XML);
                } catch (Exception e) {
                    System.err.println("ob_get_OPENBEXI_PAGES_DATA_XML:" + e.getMessage());
                }
            }
            // ########################################################
            // Parse html_file to extract XML data for the current page
            // ########################################################
            if (html_file != null && !html_file.getName().equals("template.html") && html_file.exists()) {
                try {
                    doc_html_file = Jsoup.parse(html_file, "UTF-8");
                    for (int i = 0; i < doc_html_file.head().childNodes().size(); i++) {
                        try {
                            if (doc_html_file.head().childNode(i).toString().contains("OPENBEXI_PAGES_DATA_XML")) {
                                OPENBEXI_PAGES_DATA_XML = doc_html_file.head().childNode(i).childNode(0).toString();
                                OPENBEXI_PAGES_DATA_XML = OPENBEXI_PAGES_DATA_XML.replace("var OPENBEXI_PAGES_DATA_XML = ", "");
                                OPENBEXI_PAGES_DATA_XML = OPENBEXI_PAGES_DATA_XML.replace("'", "");
                                OPENBEXI_PAGES_DATA_XML = OPENBEXI_PAGES_DATA_XML.replace("\'</script>", "");
                                break;
                            }
                        } catch (Exception e) {
                            ob_do_nothing();
                        }
                    }
                    doc_OPENBEXI_PAGES_DATA_XML = xml.openbexi_loadXML(OPENBEXI_PAGES_DATA_XML);
                } catch (Exception e) {
                    System.err.println("ob_get_OPENBEXI_PAGES_DATA_XML:" + e.getMessage());
                }
            }

            // Clean up  OPENBEXI_PAGES_DATA_XML data according widgets found in the html_file body
            // ####################################################################################
            try {
                T_divs = ob_get_div_from_HTML(html_template);
                if (!html_template.getName().equals(html_file.getName()))
                    P_divs = ob_get_div_from_HTML(html_file);

                if (P_divs != null) {
                    if (T_divs == null || T_divs.size() == 0) {
                        for (Element pdiv : P_divs) {
                            if (pdiv.id().contains("template_")) {
                                P_divs_to_delete.add(pdiv);
                                T_divs_to_delete.add(pdiv);
                            }
                        }
                    } else {
                        for (Element pdiv : P_divs) {
                            for (Element tdiv : T_divs) {
                                if (tdiv.id().equals(pdiv.id()) && pdiv.id().contains("template_") && tdiv.attr("creation_date").equals(pdiv.attr("creation_date"))) {
                                    T_divs_to_delete.add(pdiv);
                                    break;
                                }
                            }
                        }
                        for (Element pdiv : P_divs) {
                            for (Element tdiv : T_divs) {
                                if (tdiv.id().equals(pdiv.id()) && pdiv.id().contains("template_") && !tdiv.attr("creation_date").equals(pdiv.attr("creation_date"))) {
                                    P_divs_to_delete.add(pdiv);
                                    break;
                                }
                            }
                        }
                        for (Element pdiv : P_divs) {
                            widget_found = false;
                            for (Element tdiv : T_divs) {
                                if (tdiv.id().equals(pdiv.id()) && pdiv.id().contains("template_")) {
                                    widget_found = true;
                                    break;
                                }
                            }
                            if (widget_found == false)
                                if (pdiv.id().contains("template_")) {
                                    P_divs_to_delete.add(pdiv);
                                }
                        }
                    }
                }
                if (T_divs_to_delete != null) {
                    for (int i = 0; i < T_divs_to_delete.size(); i++) {
                        doc_OPENBEXI_TEMPLATE_DATA_XML = ob_clean_OPENBEXI_DATA_XML(doc_OPENBEXI_TEMPLATE_DATA_XML, T_divs_to_delete.get(i));
                    }
                }
                if (P_divs_to_delete != null) {
                    for (int i = 0; i < P_divs_to_delete.size(); i++) {
                        doc_OPENBEXI_PAGES_DATA_XML = ob_clean_OPENBEXI_DATA_XML(doc_OPENBEXI_PAGES_DATA_XML, P_divs_to_delete.get(i));
                    }
                }
                doc_OPENBEXI_PAGES_DATA_XML = ob_clean_OPENBEXI_DATA_XML(doc_OPENBEXI_PAGES_DATA_XML, P_divs);
                doc_OPENBEXI_TEMPLATE_DATA_XML = ob_clean_OPENBEXI_DATA_XML(doc_OPENBEXI_TEMPLATE_DATA_XML, T_divs);

            } catch (Exception e) {
                System.err.println("ob_get_OPENBEXI_PAGES_DATA_XML:" + e.getMessage());
            }

        } catch (Exception e) {
            System.err.println("ob_clean_OPENBEXI_PAGES_DATA_XML:" + e.getMessage());
        }

        // Merge OPENBEXI_PAGES_DATA_XML and doc_OPENBEXI_TEMPLATE_DATA_XML
        // ################################################################
        try {
            doc_OPENBEXI_PAGES_DATA_XML = xml.XMLmerge(doc_OPENBEXI_PAGES_DATA_XML, doc_OPENBEXI_TEMPLATE_DATA_XML, "subtheme|template|theme|backgroundImage|backgroundRepeat|BACKGROUND|tree_name|listStyleImage|background|bgColor");
        } catch (Exception e) {
            System.err.println("ob_clean_OPENBEXI_DATA_XML: " + e.getMessage());
        }

        if (doc_OPENBEXI_PAGES_DATA_XML != null)
            return xml.XMLSerializer(doc_OPENBEXI_PAGES_DATA_XML);
        return OPENBEXI_PAGES_DATA_XML;
    }

    /**
     * @param style
     * @return
     */
    private String ob_get_zIndex(String style) {
        String[] style_list = style.split(";");
        String zIndex = "";

        for (int i = 0; i < style_list.length; i++)
            if (style_list[i].contains("z-index")) {
                String[] zIndex_set = style_list[i].split(":");
                if (zIndex_set.length == 2)
                    return zIndex_set[1].trim();
            }

        return zIndex;
    }

    /**
     * @param elt
     * @param key
     * @param new_value
     */
    private void ob_set_style_attr(Element elt, String key, String new_value) {

        String style = elt.attr("style");
        if (style.equals("")) return;

        String[] style_list = style.split(";");
        String new_style = "";

        for (int i = 0; i < style_list.length; i++)
            if (style_list[i].contains(key))
                new_style += key + ":" + new_value + ";";
            else
                new_style += style_list[i] + ";";

        elt.attr("style", new_style);
    }

    /**
     * @param elt
     * @param key
     * @return
     */
    private String ob_get_style_attr(Element elt, String key) {
        String attr = "";
        String style = elt.attr("style");
        if (style.equals("")) return attr;
        String[] style_list = style.split(";");
        String[] attr_set;

        for (int i = 0; i < style_list.length; i++)
            if (style_list[i].contains(key)) {
                attr_set = style_list[i].split(":");
                if (attr_set.length == 2)
                    return attr_set[1].trim();
            }
        return attr;
    }

    /**
     * @param T_divs
     * @param P_divs
     * @param id
     * @return
     */
    private String ob_get_zIndex(Elements T_divs, Elements P_divs, String id) {
        String z;
        try {
            if (T_divs != null) {
                for (Element tdiv : T_divs) {
                    try {
                        if (tdiv.attr("style") != null || !tdiv.attr("style").equals("")) {
                            if (tdiv.attr("id").equals(id)) {
                                z = ob_get_zIndex(tdiv.attr("style"));
                                if (Integer.parseInt(z) >= 0) return z;
                                z = tdiv.attr("obzindex");
                                if (Integer.parseInt(z) >= 0) return z;
                            }
                        }
                    } catch (Exception e) {
                        System.err.println("ob_get_zIndex" + e.getMessage());
                    }
                }
            }
            if (P_divs != null) {
                for (Element pdiv : P_divs) {
                    try {
                        if (pdiv.attr("style") != null || !pdiv.attr("style").equals("")) {
                            if (pdiv.attr("id").equals(id)) {
                                z = ob_get_zIndex(pdiv.attr("style"));
                                if (Integer.parseInt(z) >= 0) return z;
                                z = pdiv.attr("obzindex");
                                if (Integer.parseInt(z) >= 0) return z;
                                return "0";
                            }
                        } else
                            return "0";
                    } catch (Exception e) {
                        System.err.println("ob_get_zIndex" + e.getMessage());
                    }
                }
            }

        } catch (Exception e) {
            System.err.println("ob_get_zIndex:" + e.getMessage());
        }
        return "0";
    }

    /**
     * @param T_divs
     * @param elt
     * @return
     */
    private boolean ob_if_obsolete_template(Elements T_divs, Element elt) {
        // Check if obsolete template
        if (T_divs == null || elt == null) return false;
        for (Element tdiv : T_divs) {
            try {
                if (tdiv.id().equals(elt))
                    return false;
            } catch (Exception e) {
                System.err.println("ob_if_templatee:" + e.getMessage());
            }
        }
        return true;
    }

    /**
     * @param elt
     * @return
     */
    private boolean ob_if_template(Element elt) {
        // Check if obsolete template
        if (elt.id().contains("template"))
            return true;
        return false;
    }

    /**
     * @param elt
     * @return
     */
    private boolean ob_if_not_template(Element elt) {
        // Check if obsolete template
        if (elt.id().contains("template"))
            return false;
        return true;
    }

    /**
     * @param doc
     * @param elt
     * @return
     */
    private String ob_get_inline_style(org.jsoup.nodes.Document doc, Element elt) {
        String style = null;
        for (int i = 0; i < doc.head().childNodes().size(); i++) {
            if (doc.head().childNodes().get(i).attr("type").equals("text/css") && doc.head().childNodes().get(i).childNodes().size() > 0) {
                String data = doc.head().childNodes().get(i).childNode(0).attributes().toString().replaceAll("\n", "").replaceAll(" ", "");
                Pattern p = Pattern.compile("(?<=#" + elt.id() + "\\{).*.(?=\\})");
                Matcher m = p.matcher(data);
                while (m.find()) {
                    style = m.group().toString();
                }
                if (style != null)
                    return style;
            }
        }
        return style;
    }

    /**
     * @param docTemplate
     * @param pdiv
     * @return
     */
    private org.jsoup.nodes.Document ob_update_node(org.jsoup.nodes.Document docTemplate, Element pdiv) {

        //If pdiv parent is not body, replace the element to the parent
        if (pdiv.attr("classe").equals("DIV_PAGE") || pdiv.attr("classe").equals("DIV_FORM") || pdiv.attr("classe").equals("DIV_FISHEYE"))
            this.ob_do_nothing();
        else if (pdiv.attr("classe").equals("DIV_CHARTFLOW")) {
            int size = docTemplate.body().getElementById(pdiv.parent().id()).children().size();
            int count2 = 0;
            for (int i = 0; i < size; i++) {
                if (docTemplate.body().getElementById(pdiv.parent().id()).children().get(count2).attr("classe").equals(""))
                    docTemplate.body().getElementById(pdiv.parent().id()).children().get(count2).remove();
                else
                    count2++;
            }
        } else if (pdiv.attr("classe").equals("DIV_DOJOTEXTAREA") || pdiv.attr("classe").equals("DIV_BUTTON") || pdiv.attr("classe").equals("DIV")) {
            docTemplate.body().getElementById(pdiv.id()).html(pdiv.html());
        } else if (pdiv.attr("classe").equals("DIV_DYGRAPHS")) {
            int size = docTemplate.body().getElementById(pdiv.id()).children().size();
            for (int i = 0; i < size; i++) {
                if (docTemplate.body().getElementById(pdiv.parent().id()).children().get(i).attr("id").equals(pdiv.id()))
                    docTemplate.body().getElementById(pdiv.parent().id()).children().get(i).children().get(0).remove();
            }
        } else
            this.ob_do_nothing();

        return docTemplate;
    }

    /**
     * ob_merge_HTML_div
     *
     * @param template_file
     * @param html_file
     * @return
     */
    private Element ob_merge_HTML_div(File template_file, File html_file) {
        org.jsoup.nodes.Document docTemplate = null;
        Elements P_divs = null;
        Elements T_divs = null;
        String style = null;
        String zindex = null;
        try {
            int count = 0;
            //Get element template and update the current page according the template
            T_divs = ob_get_div_from_HTML(template_file);
            P_divs = ob_get_div_from_HTML(html_file);

            if (P_divs != null) {
                if (!template_file.exists()) {
                    Document docOut = null;
                    final BEXI_XMLDriver xml = new BEXI_XMLDriver();
                    try {
                        docOut = xml.set_class_object_attribute_value(docOut, "ob_request", "request", "subtype", "");
                        docOut = xml.set_class_object_attribute_value(docOut, "file", "html", "name", template_file.getName());
                        docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "dir", "project", template_file.getParentFile().getName());
                        docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "dir", "filename", template_file.getName());
                        ob_createHtmlFile(_applicationPath.getDefaultWebPagesPath(), docOut, null);
                    } catch (Exception e) {
                        System.err.println(e);
                    }
                }
                docTemplate = Jsoup.parse(template_file, "UTF-8");
                docTemplate.body().getElementsByTag("script").remove();
                docTemplate.body().getElementsByTag("input").remove();
                docTemplate.body().getElementsByTag("iframe").remove();

                for (Element pdiv : P_divs) {
                    try {
                        //If no template, add it!
                        if (ob_if_not_template(pdiv)) {

                            // Turn to "false"  ob_template attribute because this element does not belong to the template
                            pdiv.attributes().put("ob_template", "false");

                            //Check if top or width is well defined for the current element, if not set top or width from inline attributes if any
                            if (ob_get_style_attr(pdiv, "top").equals("") || ob_get_style_attr(pdiv, "width").equals("")) {
                                style = ob_get_inline_style(docTemplate, pdiv);
                                if (style != null)
                                    pdiv.attributes().put("style", ob_get_inline_style(docTemplate, pdiv));
                            }

                            //Check if zindex is well defined for the current element
                            if (pdiv.attr("obzindex").equals("")) {
                                zindex = ob_get_zIndex(null, P_divs, pdiv.id());
                                pdiv.attributes().put("obzindex", zindex);
                            }
                            ob_set_style_attr(pdiv, "z-index", pdiv.attr("obzindex"));

                            //If pdiv parent is body, attach the element to the body
                            if (pdiv.parent().tagName().matches("body|BODY"))
                                docTemplate.body().appendChild(pdiv);
                                // pdiv parent is not body, replace the element to the parent
                            else
                                docTemplate.body().getElementById(pdiv.parent().id()).appendChild(pdiv);
                            //docTemplate = ob_update_node(docTemplate, pdiv);

                        } else if (docTemplate.body().getElementById(pdiv.id()) != null && ob_if_template(pdiv) && docTemplate.body().getElementById(pdiv.id()).attr("creation_date").equals(pdiv.attr("creation_date"))) {

                            //Turn to "true"  ob_template attribute because this element belongs to the template
                            docTemplate.body().getElementById(pdiv.id()).attributes().put("ob_template", "true");

                            //Check if top or width is well defined for the current element, if not set top or width from inline attributes if any
                            if (ob_get_style_attr(pdiv, "top").equals("") || ob_get_style_attr(pdiv, "width").equals("")) {
                                style = ob_get_inline_style(docTemplate, pdiv);
                                if (style != null) {
                                    pdiv.attr("style", style);
                                    pdiv.attributes().put("style", ob_get_inline_style(docTemplate, pdiv));
                                    docTemplate.body().getElementById(pdiv.id()).attributes().put("style", style);
                                } else
                                    docTemplate.body().getElementById(pdiv.id()).remove();
                            }

                            //merge pdiv style
                            if (pdiv.attr("classe").equals(docTemplate.body().getElementById(pdiv.id()).attr("classe"))) {
                                String top = ob_get_style_attr(docTemplate.body().getElementById(pdiv.id()), "top");
                                String left = ob_get_style_attr(docTemplate.body().getElementById(pdiv.id()), "left");
                                String width = ob_get_style_attr(docTemplate.body().getElementById(pdiv.id()), "width");
                                String height = ob_get_style_attr(docTemplate.body().getElementById(pdiv.id()), "height");
                                docTemplate.body().getElementById(pdiv.id()).attributes().put("style", pdiv.attr("style"));

                                docTemplate = ob_update_node(docTemplate, pdiv);

                                ob_set_style_attr(docTemplate.body().getElementById(pdiv.id()), "top", top);
                                ob_set_style_attr(docTemplate.body().getElementById(pdiv.id()), "left", left);
                                ob_set_style_attr(docTemplate.body().getElementById(pdiv.id()), "width", width);
                                ob_set_style_attr(docTemplate.body().getElementById(pdiv.id()), "height", height);

                                //Check if zindex is well defined for the current element
                                if (docTemplate.body().getElementById(pdiv.id()).attr("obzindex").equals("")) {
                                    zindex = ob_get_zIndex(T_divs, null, pdiv.id());
                                    docTemplate.body().getElementById(pdiv.id()).attributes().put("obzindex", zindex);
                                }
                                ob_set_style_attr(docTemplate.body().getElementById(pdiv.id()), "z-index", docTemplate.body().getElementById(pdiv.id()).attr("obzindex"));
                            }
                        } else if (docTemplate.body().getElementById(pdiv.id()) != null && ob_if_template(pdiv) && !docTemplate.body().getElementById(pdiv.id()).attr("creation_date").equals(pdiv.attr("creation_date"))) {
                            this.ob_do_nothing();
                        } else if (ob_if_obsolete_template(T_divs, pdiv)) {
                            if (docTemplate.body().getElementById(pdiv.id()) != null) {
                                int size = docTemplate.body().getElementById(pdiv.id()).children().size();
                                for (int i = 0; i < size; i++)
                                    docTemplate.body().getElementById(pdiv.id()).child(0).remove();
                            }
                        } else {
                            this.ob_do_nothing();
                        }
                    } catch (Exception e) {
                        System.err.println("ob_merge_HTML_div: cannot add " + pdiv.attr("id") + " -- " + e.getMessage());
                    }
                }
            }

        } catch (Exception e) {
            System.err.println("ob_merge_HTML_div:" + e.getMessage());
        }
        //docTemplate = ob_fix_style(docTemplate);
        if (docTemplate != null) {
            for (int i = 0; i < docTemplate.body().childNodes().size(); i++) {
                if (docTemplate.body().childNodes().get(i) != null) {
                    if (docTemplate.body().childNodes().get(i).attr("classe") != "") {
                        ob_print((Element) docTemplate.body().childNodes().get(i), "");
                    }
                }
            }
            return docTemplate.body();
        } else
            return null;
    }

    /**
     * Print element properties and all children element properties
     *
     * @param elt
     * @param tab
     */

    public void ob_print(Element elt, String tab) {
        Element elt_tmp;
        try {
            System.out.format("%-25s %-20s z=%-3s Z=%-3s T=%-6s %25s %-100s \n", tab + elt.attr("id"), elt.attr("classe"), elt.attr("obzindex"), ob_get_zIndex(elt.attr("style")), elt.attr("ob_template"), elt.attr("creation_date"), elt.attr("style"));
            if (elt.childNodes() != null) {
                tab += "     ";
                for (int i = 0; i < elt.childNodes().size(); i++) {
                    if (!elt.childNodes().get(i).attr("id").equals(""))
                        ob_print((Element) elt.childNodes().get(i), tab);
                }
            }
        } catch (Exception e) {
            System.err.println("ob_print:" + e.getMessage());
        }
    }

    public void ob_print(String str, Element elt) {
        System.out.println(str + elt.attr("id") + " " + elt.attr("classe") + " " + elt.attr("obzindex") + " " + ob_get_zIndex(elt.attr("style")) + "                " + elt.attr("style"));
    }

    /**
     * Read HTML page, and return xml data, and divs to the OpenBEXI builder
     *
     * @param defaultWebPagesPath .
     * @param docOut              .
     * @param type                .
     */
    public void ob_readHTMLPage(String defaultWebPagesPath, Document docOut, String type) {
        final BEXI_XMLDriver xml = new BEXI_XMLDriver();
        Boolean fileAlreadyExist = false;
        String project;
        String templateCategory;
        String templateName;
        String html_file_name;
        File html_file = null;
        String subtype = null;
        File html_project = null;
        //File index_file;
        try {

            project = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "project");
            templateCategory = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "templateCategory");
            templateName = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "template");
            html_file_name = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "filename");
            subtype = xml.get_class_object_attribute_value(docOut, "ob_request", "request", "subtype");

            // If new file
            if (subtype != null && subtype.equals("openNewHTMLPages")) {
                html_project = new File(_applicationPath.getDefaultPath() + ob_getSeparator(_applicationPath.getDefaultPath()) + "project" + ob_getSeparator(_applicationPath.getDefaultPath()) + project);
                html_file = new File(_applicationPath.getDefaultPath() + ob_getSeparator(_applicationPath.getDefaultPath()) + "project" + ob_getSeparator(_applicationPath.getDefaultPath()) + project + ob_getSeparator(_applicationPath.getDefaultPath()) + html_file_name);
                if (html_file.exists())
                    fileAlreadyExist = true;
                else
                    html_file.createNewFile();
            } else if (subtype != null && subtype.equals("openNewTemplateHTMLPages")) {
                html_file = new File(_applicationPath.getDefaultPath() + ob_getSeparator(_applicationPath.getDefaultPath()) + "template" + ob_getSeparator(defaultWebPagesPath) + "ob_project" + ob_getSeparator(_applicationPath.getDefaultPath()) + templateCategory + ob_getSeparator(_applicationPath.getDefaultPath()) + templateName);
                html_project = new File(_applicationPath.getDefaultPath() + ob_getSeparator(_applicationPath.getDefaultPath()) + "template" + ob_getSeparator(defaultWebPagesPath) + "ob_project" + ob_getSeparator(_applicationPath.getDefaultPath()) + templateCategory);
                if (html_file.exists())
                    fileAlreadyExist = true;
                else
                    html_file.createNewFile();
            } else {
                if (!html_file_name.contains(".html"))
                    html_file_name = html_file_name + ".html";
                if (type.equals("openbexi_openArchiveHTMLPagesRequest")) {
                    html_file = new File(_applicationPath.getDefaultPath() + ob_getSeparator(_applicationPath.getDefaultPath()) + "project" + ob_getSeparator(_applicationPath.getDefaultPath()) + project + ob_getSeparator(_applicationPath.getDefaultPath()) + "archives" + ob_getSeparator(_applicationPath.getDefaultPath()) + html_file_name);
                    html_project = new File(_applicationPath.getDefaultPath() + ob_getSeparator(_applicationPath.getDefaultPath()) + "project" + ob_getSeparator(_applicationPath.getDefaultPath()) + project);
                } else if (type.equals("openbexi_openArchiveTemplateHTMLPagesRequest"))
                    html_file = new File(_applicationPath.getDefaultPath() + ob_getSeparator(_applicationPath.getDefaultPath()) + "template" + ob_getSeparator(defaultWebPagesPath) + "ob_project" + ob_getSeparator(_applicationPath.getDefaultPath()) + templateCategory + ob_getSeparator(_applicationPath.getDefaultPath()) + "archives" + ob_getSeparator(_applicationPath.getDefaultPath()) + html_file_name);
                else if (type.equals("openbexi_openTemplateHTMLPagesRequest")) {
                    html_file = new File(_applicationPath.getDefaultPath() + ob_getSeparator(_applicationPath.getDefaultPath()) + "template" + ob_getSeparator(defaultWebPagesPath) + "ob_project" + ob_getSeparator(_applicationPath.getDefaultPath()) + templateCategory + ob_getSeparator(_applicationPath.getDefaultPath()) + templateName);
                    html_project = new File(_applicationPath.getDefaultPath() + ob_getSeparator(_applicationPath.getDefaultPath()) + "template" + ob_getSeparator(defaultWebPagesPath) + "ob_project" + ob_getSeparator(_applicationPath.getDefaultPath()) + templateCategory);
                } else if (type.equals("openbexi_open_and_copyTemplateHTMLPagesRequest")) {
                    File html_template = new File(_applicationPath.getDefaultPath() + ob_getSeparator(_applicationPath.getDefaultPath()) + "template" + ob_getSeparator(defaultWebPagesPath) + "ob_project" + ob_getSeparator(_applicationPath.getDefaultPath()) + templateCategory + ob_getSeparator(_applicationPath.getDefaultPath()) + templateName);
                    html_file = new File(_applicationPath.getDefaultPath() + ob_getSeparator(_applicationPath.getDefaultPath()) + "project" + ob_getSeparator(_applicationPath.getDefaultPath()) + project + ob_getSeparator(_applicationPath.getDefaultPath()) + html_file_name);
                    OPENBEXI_Creative_file.ob_copyFile(html_template, html_file);
                } else {
                    html_project = new File(_applicationPath.getDefaultPath() + ob_getSeparator(_applicationPath.getDefaultPath()) + "project" + ob_getSeparator(_applicationPath.getDefaultPath()) + project);
                    html_file = new File(_applicationPath.getDefaultPath() + ob_getSeparator(_applicationPath.getDefaultPath()) + "project" + ob_getSeparator(_applicationPath.getDefaultPath()) + project + ob_getSeparator(_applicationPath.getDefaultPath()) + html_file_name);
                }
            }

            String template_and_divs = "";
            String bodyBackGround = "";
            String OPENBEXI_PAGES_DATA_XML = "";
            try {

                // Get template xml data
                File template_file;
                if (type.equals("openbexi_openTemplateHTMLPagesRequest")) {
                    template_file = html_file;
                    html_file = null;
                } else
                    template_file = new File(_applicationPath.getDefaultPath() + ob_getSeparator(_applicationPath.getDefaultPath()) + "project" + ob_getSeparator(_applicationPath.getDefaultPath()) + project + ob_getSeparator(_applicationPath.getDefaultPath()) + "template.html");


                // Clean up  and merge template html body code and html body code for the current page
                Element new_body = ob_merge_HTML_div(template_file, html_file);
                if (new_body != null)
                    template_and_divs = new_body.html();

                // Build and Clean up OPENBEXI_PAGES_DATA_XML
                OPENBEXI_PAGES_DATA_XML = ob_get_OPENBEXI_PAGES_DATA_XML(html_file, template_file);
                ob_print_OPENBEXI_PAGES_DATA_XML(OPENBEXI_PAGES_DATA_XML);

                try {
                    if (bodyBackGround != null) {
                        bodyBackGround = bodyBackGround.replace("bgcolor=\"", "");
                        bodyBackGround = bodyBackGround.substring(0, 7);
                    } else {
                        bodyBackGround = "";
                    }
                } catch (Exception e) {
                    ob_do_nothing();
                }

                docOut = xml.set_class_object_attribute_value(docOut, "ob_request", "request", "subtype", subtype);
                docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "ok");

            } catch (Exception e) {
                System.err.println("ob_readHTMLPage():" + e.getMessage());
                docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "CannotReadPage");
                if (type.equals("openbexi_openHTMLPagesRequest") && !html_project.exists())
                    docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "CannotReadProject");
                docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "exception", e.getMessage());
            }
            docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "file", "text", template_and_divs);
            docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "OPENBEXI_PAGES_DATA_XML", "text", OPENBEXI_PAGES_DATA_XML);
            docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "file", "bodyBackGround", bodyBackGround);
            //Check if the WEB page still exists
            if (html_project != null && !html_project.exists()) {
                docOut = xml.set_class_object_attribute_value(docOut, "ob_request", "request", "subtype", subtype);
                docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "WebPageDoNotExist");
            }
            //Check if the project still exists
            if (html_project != null && !html_project.exists()) {
                docOut = xml.set_class_object_attribute_value(docOut, "ob_request", "request", "subtype", subtype);
                docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "ProjectDoNotExist");
            }
            if (fileAlreadyExist == true) {
                docOut = xml.set_class_object_attribute_value(docOut, "ob_request", "request", "subtype", subtype);
                docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "fileAlreadyExist");
            }

        } catch (Exception e) {
            //e.printStackTrace();
            try {
                docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "CannotReadPage");
                docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "exception", e.getMessage());
            } catch (Exception e1) {
                System.err.println("ob_readHTMLPage():" + e1);
            }

        }
        if (_response != null) {
            try {
                _response.setContentType("text/xml");
                _response.setHeader("Cache-Control", "no-cache");
                _response.getWriter().write(xml.XMLSerializer(docOut));
            } catch (IOException e) {
                System.err.println("ob_readHTMLPage:" + e);
            }
        }
    }

    public void ob_readContext(String defaultWebPagesPath, Document docOut) {
        final BEXI_XMLDriver xml = new BEXI_XMLDriver();
        String project;
        String openbexi_filename;
        String openbexi_filename_type;
        File filename;
        try {
            project = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "project");
            openbexi_filename_type = xml.get_class_object_attribute_value(docOut, "ob_explorer", "xml", "ob_type");
            openbexi_filename = xml.get_class_object_attribute_value(docOut, "ob_explorer", "xml", "filename");

            if (openbexi_filename_type.equals("OPENBEXI_PRIVATE_CONTEXT_XML") || openbexi_filename_type.equals("OPENBEXI_PUBLIC_CONTEXT_XML"))
                filename = new File(_applicationPath.getDefaultPath() + ob_getSeparator(defaultWebPagesPath) + openbexi_filename);
            else if (openbexi_filename_type.equals("XML")) {
                if (new File(openbexi_filename).isFile())
                    filename = new File(openbexi_filename);
                else
                    filename = new File(_applicationPath.getDefaultPath() + ob_getSeparator(_applicationPath.getDefaultPath()) + openbexi_filename);
            } else
                filename = new File(_applicationPath.getDefaultPath() + ob_getSeparator(defaultWebPagesPath) + "project" + ob_getSeparator(defaultWebPagesPath) + project + ob_getSeparator(_applicationPath.getDefaultPath()) + openbexi_filename);

            String sCurrentLine;
            String str = "";
            try {
                BufferedReader br = new BufferedReader(new FileReader(filename.getAbsolutePath()));
                while ((sCurrentLine = br.readLine()) != null) {
                    str += sCurrentLine;
                }
                br.close();
            } catch (Exception e) {
                System.err.println("cannot_read_file:" + e.getMessage());
            }
            if (openbexi_filename_type.equals("OPENBEXI_PRIVATE_CONTEXT_XML")) {
                str = str.replace(" <?xml version", "<?xml version");
                docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "OPENBEXI_PRIVATE_CONTEXT_XML", "text", str);
            } else if (openbexi_filename_type.equals("OPENBEXI_PAGES_DATA_XML"))
                docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "OPENBEXI_PAGES_DATA_XML", "text", str);
            else if (openbexi_filename_type.equals("OPENBEXI_PUBLIC_CONTEXT_XML"))
                docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "OPENBEXI_PUBLIC_CONTEXT_XML", "text", str);
            else
                docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "OTHER_XML", "text", str);

        } catch (Exception e) {
            //e.printStackTrace();
            try {
                docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "failed");
                docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "exception", e.getMessage());
            } catch (Exception e1) {
                System.err.println("ob_readContext:" + e1);
            }

        }
        if (_response != null) {
            try {
                _response.setContentType("text/xml");
                _response.setHeader("Cache-Control", "no-cache");
                _response.getWriter().write(xml.XMLSerializer(docOut));
            } catch (IOException e) {
                System.err.println("ob_readContext:" + e);
            }
        }
    }

    public void ob_saveDataFile(HttpServletRequest request, File file) {
        String line;
        String data = "";
        try {
            if (!file.exists())
                file.createNewFile();
            OutputStream out = new FileOutputStream(file.getCanonicalFile());
            while (true) {
                line = request.getReader().readLine();
                if (line == null) break;
                data += line.replace(" <?xml version=\"1.0\"?>", "").replace("<?xml version=\"1.0\" encoding=\"UTF-8\"?>", "") + "\n";
            }
            new PrintStream(out).println("<?xml version=\"1.0\" encoding=\"iso-8859-1\" ?>" + "\n" + data);
            out.close();
        } catch (Exception e) {
            System.err.println("CannotSaveFile:" + e.getMessage());
        }
    }

    public void ob_saveXmlFile(String
                                       defaultWebPagesPath, Document
                                       docOut, HttpServletRequest
                                       request) {
        final BEXI_XMLDriver xml = new BEXI_XMLDriver();
        String filename;
        String project;
        String typeFile;
        String xmlFile = "";
        Document doc = null;
        final BEXI_XMLDriver xmlResponse = new BEXI_XMLDriver();
        try {
            typeFile = xml.get_class_object_attribute_value(docOut, "ob_request", "request", "type");
            filename = xml.get_class_object_attribute_value(docOut, "file", "xml", "name");
            doc = xmlResponse.set_class_object_attribute_value(doc, "ob_request", "request", "type", typeFile);
            project = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "project");
            doc = xmlResponse.set_class_object_attribute_value(doc, "file", "xml", "name", filename);
            System.out.println("save url path:" + filename);
        } catch (Exception e) {
            OPENBEXI_Creative_main.ob_error(_response, doc, e.getMessage(), "CannotSaveFile");
            return;
        }

        try {
            if (!new File(defaultWebPagesPath + ob_getSeparator(defaultWebPagesPath) + "project" + ob_getSeparator(defaultWebPagesPath) + project).exists())
                ob_createProject_or_TemplateCategory(defaultWebPagesPath, docOut, "create_project");
            OutputStream out = new FileOutputStream(defaultWebPagesPath + ob_getSeparator(_applicationPath.getDefaultPath()) + filename);
            String line = "";
            while (line != null) {
                line = request.getReader().readLine();
                if (line != null)
                    xmlFile += line.replace(" <?xml version=\"1.0\"?>", "").replace("<?xml version=\"1.0\" encoding=\"UTF-8\"?>", "");
            }
            if (!xmlFile.equals(""))
                if (xmlFile.contains("xml version=")) {
                    xmlFile = xmlFile.replace(" <?xml version=", "<?xml version=");
                    new PrintStream(out).println(xmlFile);
                } else
                    new PrintStream(out).println("<?xml version=\"1.0\" encoding=\"iso-8859-1\" ?>" + xmlFile);
            out.close();
        } catch (Exception e) {
            System.err.println("CannotSaveFile:" + e.getMessage());
            OPENBEXI_Creative_main.ob_error(_response, doc, e.getMessage(), "CannotSaveFile");
            return;
        }

        // rebuild the url   and  Send reponse
        String localAdress = request.getLocalAddr() + ":" + request.getLocalPort();
        Pattern patternG = Pattern.compile("(127.)|(0.0.0)");
        Matcher matcher = patternG.matcher(localAdress);
        if (matcher.find()) {
            localAdress = "localhost:" + request.getLocalPort();
        }
        String url = "http://" + localAdress + request.getContextPath() + "/" + filename;
        try {
            doc = xmlResponse.set_class_object_attribute_value(doc, "file", "xml", "url", url);
            System.out.println("filename=" + url + " saved");
        } catch (Exception e) {
            System.err.println(e);
        }

        try {
            doc = xmlResponse.set_class_object_attribute_value(doc, "openbexi_creative", "application", "status", "ok");
            doc = xmlResponse.set_class_object_attribute_value(doc, "openbexi_creative", "application", "exception", "");
            _response.setContentType("text/xml");
            _response.setHeader("Cache-Control", "no-cache");
            _response.getWriter().write(xml.XMLSerializer(doc));
        } catch (Exception e) {
            System.err.println(e);
        }
    }

    public void ob_readFile(String defaultWebPagesPath, Document docOut) {
        final BEXI_XMLDriver xml = new BEXI_XMLDriver();
        String openbexi_filename;
        String text_regex_filter;
        String ob_css_text;
        String ob_lighting_selection;
        String ob_lighting_selection_color;
        String openbexi_path;
        File filename;
        boolean found_expression = false;
        try {
            openbexi_filename = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "filename");
            openbexi_path = xml.get_class_object_attribute_value(docOut, "ob_explorer", "file", "path");
            ob_css_text = xml.get_class_object_attribute_value(docOut, "ob_explorer", "file", "ob_css_text");
            text_regex_filter = xml.get_class_object_attribute_value(docOut, "ob_explorer", "file", "text_regex_filter");
            ob_lighting_selection = xml.get_class_object_attribute_value(docOut, "ob_explorer", "file", "ob_lighting_selection");
            ob_lighting_selection_color = xml.get_class_object_attribute_value(docOut, "ob_explorer", "file", "ob_lighting_selection_color");

            if (openbexi_path.equals(""))
                filename = new File(_applicationPath.getDefaultPath() + ob_getSeparator(defaultWebPagesPath) + openbexi_filename);
            else
                filename = new File(openbexi_path + ob_getSeparator(defaultWebPagesPath) + openbexi_filename);

            String line;
            String text = "";
            Pattern p = null;
            if (!text_regex_filter.equals("")) p = Pattern.compile(text_regex_filter);

            BufferedReader br = new BufferedReader(new FileReader(filename));
            while ((line = br.readLine()) != null) {
                if (ob_css_text.equals("")) {
                    if (text_regex_filter.equals(""))
                        text += line;
                    else {
                        if (p.matcher(line).find())
                            if (ob_lighting_selection.equals("true"))
                                text += "<font color=\"" + ob_lighting_selection_color + "\" >" + line + "</font>";
                            else
                                text += "<font color=\"" + ob_lighting_selection_color + "\" >" + line + "</font>";
                        else
                            text += line;
                    }
                } else {
                    if (text_regex_filter.equals(""))
                        text += ob_css_text.replace("$text", line);
                    else {
                        if (p.matcher(line).find())
                            if (ob_lighting_selection.equals("true"))
                                text += ob_css_text.replace("$text", "<font color=\"" + ob_lighting_selection_color + "\" >" + line + "</font>");
                            else
                                text += ob_css_text.replace("$text", "<font color=\"" + ob_lighting_selection_color + "\" >" + line + "</font>");
                        else
                            text += ob_css_text.replace("$text", line);
                    }
                }
                if (!found_expression) {
                    found_expression = text.matches(text_regex_filter);
                }
            }
            br.close();

            xml.set_class_object_attribute_value(docOut, "ob_explorer", "file", "text", text);
            if (found_expression)
                xml.set_class_object_attribute_value(docOut, "ob_explorer", "file", "found_expression", "true");
            else
                xml.set_class_object_attribute_value(docOut, "ob_explorer", "file", "found_expression", "false");

            docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "ok");
        } catch (Exception e) {
            //e.printStackTrace();
            try {
                OPENBEXI_Creative_main.ob_error(_response, docOut, e.getMessage(), "CannotReadFile");
                return;
            } catch (Exception e1) {
                System.err.println("ob_readFile:" + e1);
            }

        }
        if (_response != null) {
            try {
                docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "ok");
                docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "exception", "");
                _response.setContentType("text/xml");
                _response.setHeader("Cache-Control", "no-cache");
                _response.getWriter().write(xml.XMLSerializer(docOut));
            } catch (Exception e) {
                System.err.println("ob_readFile:" + e);
            }
        }
    }

    public void ob_createPDFFile(Document docOut) {
        final BEXI_XMLDriver xml = new BEXI_XMLDriver();
        String html_file;
        String pdf_file;
        String show_up;
        String status = "ok";
        String exception = "";
        try {
            html_file = xml.get_class_object_attribute_value(docOut, "ob_explorer", "html", "filename");
            pdf_file = xml.get_class_object_attribute_value(docOut, "ob_explorer", "pdf", "filename");
            show_up = xml.get_class_object_attribute_value(docOut, "ob_explorer", "pdf", "show_up");

            File full_pdf_file = new File(pdf_file);
            // Create a tmp pdf file for reading id show_up true
            if (show_up.equals("true")) {
                File tmp_html_file = new File(html_file);
                String defaultWebPagesPath = _applicationPath.getDefaultWebPagesPath();
                pdf_file = "gifPlus" + ob_getSeparator(defaultWebPagesPath) + tmp_html_file.getName() + ".pdf";
                docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "pdf", "filename", pdf_file);
                full_pdf_file = new File(_applicationPath.getDefaultPath() + ob_getSeparator(defaultWebPagesPath) + pdf_file);
            }

            // Create PDF file fron HTL file or code
            BEXI_HTML2PDF html2pdf = new BEXI_HTML2PDF(full_pdf_file.getCanonicalPath(), null, html_file);
            html2pdf.convert_to_pdf();

        } catch (Exception e) {
            status = "NOK";
            exception = "ob_createPDFFile:" + e;
            System.err.println("ob_createPDFFile:" + e);
        }

        if (_response != null) {
            try {
                docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", status);
                docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "exception", exception);
                _response.setContentType("text/xml");
                _response.setHeader("Cache-Control", "no-cache");
                _response.getWriter().write(xml.XMLSerializer(docOut));
            } catch (Exception e) {
                System.err.println("ob_createPDFFile:" + e);
            }
        }
    }

    public void ob_readMINEFile(Document docOut) {
        final BEXI_XMLDriver xml = new BEXI_XMLDriver();
        String project;
        String webpage;
        String div_id;
        String openbexi_filename;
        String keepname;
        String mine_text;
        String file_source = null;
        String file_target;
        String OB_MINE = null;

        try {
            project = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "project");
            webpage = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "filename");
            div_id = xml.get_class_object_attribute_value(docOut, "ob_explorer", "div", "name");

            openbexi_filename = xml.get_class_object_attribute_value(docOut, "ob_explorer", "json", "filename");
            if (openbexi_filename != null) {
                OB_MINE = "json";
            } else {
                openbexi_filename = xml.get_class_object_attribute_value(docOut, "ob_explorer", "csv", "filename");
                if (openbexi_filename != null) {
                    OB_MINE = "csv";
                } else {
                    openbexi_filename = xml.get_class_object_attribute_value(docOut, "ob_explorer", "rss", "filename");
                    if (openbexi_filename != null) {
                        OB_MINE = "rss";
                    } else {
                        openbexi_filename = xml.get_class_object_attribute_value(docOut, "ob_explorer", "xml", "filename");
                        if (openbexi_filename != null) {
                            OB_MINE = "xml";
                        } else {
                            openbexi_filename = xml.get_class_object_attribute_value(docOut, "ob_explorer", "js", "filename");
                            if (openbexi_filename != null) {
                                OB_MINE = "js";
                            }
                        }
                    }
                }
            }

            // get file contain if any
            mine_text = xml.get_class_object_attribute_value(docOut, "ob_explorer", OB_MINE, "text");
            openbexi_filename = openbexi_filename.trim();
            File appli_path_dir = new File(_applicationPath.getDefaultWebPagesPath());

            // if mine_text empty, read the file to get it

            if (mine_text == null || mine_text.equals("")) {
                if (new File(openbexi_filename).exists())
                    file_source = openbexi_filename;
                else if (new File(appli_path_dir.getCanonicalPath() + ob_getSeparator(appli_path_dir.getPath()) + openbexi_filename).exists())
                    file_source = appli_path_dir.getCanonicalPath() + ob_getSeparator(appli_path_dir.getPath()) + openbexi_filename;
                else {
                    System.err.println("Error: File not found: ");
                    String message = "Cannot find " + OB_MINE + " file:" + file_source;
                    ob_error(docOut, xml, message);
                    return;
                }
                String sCurrentLine;
                mine_text = "";
                BufferedReader br = new BufferedReader(new FileReader(file_source));
                while ((sCurrentLine = br.readLine()) != null) {
                    mine_text += sCurrentLine;
                }
                br.close();
            }

            //Save the file to the local directory if path not empty by convention)
            keepname = xml.get_class_object_attribute_value(docOut, "ob_explorer", OB_MINE, "keepname");
            if (project != null) {
                String data_path = "data";
                if (OB_MINE.equals("js")) data_path = "js";
                //Check if keeping same openbexi_filename
                if (keepname != null && keepname.equals("true"))
                    file_target = openbexi_filename;
                else
                    file_target = project + "_" + webpage + "_" + div_id + "." + OB_MINE;
                docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", OB_MINE, "filename", "project/" + project + "/" + data_path + "/" + file_target);
                docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", OB_MINE, "shortname", file_target);
                docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", OB_MINE, "path", "project/" + project + "/" + data_path + "/");

                File path_dir = new File(_applicationPath.getDefaultWebPagesPath());
                String path_dir_canonical = path_dir.getCanonicalPath() + ob_getSeparator(path_dir.getPath()) + "project/" + project + "/" + data_path;
                if (!new File(path_dir_canonical).exists()) {
                    System.err.println("Error: Directory not found: " + path_dir_canonical);
                    String message = "Cannot find " + path_dir_canonical;
                    ob_error(docOut, xml, message);
                    return;
                }
                String filename = path_dir.getCanonicalPath() + ob_getSeparator(path_dir.getPath()) + "project" + ob_getSeparator(path_dir.getPath()) + project + ob_getSeparator(path_dir.getPath()) + data_path + ob_getSeparator(path_dir.getPath()) + file_target;
                OutputStream outLocal = new FileOutputStream(filename);
                if (OB_MINE.contains("csv"))
                    new PrintStream(outLocal).println(mine_text.replaceAll("@", "\n"));
                else
                    new PrintStream(outLocal).println(mine_text);
                outLocal.close();
            }

            // if csv , force js to read the file instead data
            if (OB_MINE.contains("csv"))
                docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", OB_MINE, "text", "");
            else
                docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", OB_MINE, "text", mine_text);
            docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "ok");

        } catch (Exception e) {
            //e.printStackTrace();
            try {
                OPENBEXI_Creative_main.ob_error(_response, docOut, e.getMessage(), "CannotReadFile");
                return;
            } catch (Exception e1) {
                System.err.println("ob_readMINEFile:" + e1);
            }

        }
        if (_response != null) {
            try {
                docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "ok");
                docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "exception", "");
                _response.setContentType("text/xml");
                _response.setHeader("Cache-Control", "no-cache");
                _response.getWriter().write(xml.XMLSerializer(docOut));
            } catch (Exception e) {
                System.err.println("ob_readMINEFile:" + e);
            }
        }
    }

    public void ob_saveFile(String defaultWebPagesPath, Document docOut, HttpServletRequest request, String type) {

        final BEXI_XMLDriver xml = new BEXI_XMLDriver();
        String project;
        String webpage;
        String filename;
        String div_id;
        String path;
        String _text;
        final BEXI_XMLDriver xmlResponse = new BEXI_XMLDriver();

        try {
            project = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "project");
            webpage = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "filename");
            filename = xml.get_class_object_attribute_value(docOut, "ob_explorer", type, "filename");
            path = xml.get_class_object_attribute_value(docOut, "ob_explorer", type, "path");
            _text = xml.get_class_object_attribute_value(docOut, "ob_explorer", type, "text");
            div_id = xml.get_class_object_attribute_value(docOut, "ob_explorer", "div", "name");

            // rebuild the url   and  Send reponse
            String localAdress = request.getLocalAddr() + ":" + request.getLocalPort();
            Pattern patternG = Pattern.compile("(127.)|(0.0.0)");
            Matcher matcher = patternG.matcher(localAdress);
            if (matcher.find()) {
                localAdress = "localhost:" + request.getLocalPort();
            }
            String url = "http://" + localAdress + request.getContextPath() + "/" + filename;
            docOut = xmlResponse.set_class_object_attribute_value(docOut, "file", "xml", "url", url);

        } catch (Exception e) {
            OPENBEXI_Creative_main.ob_error(_response, docOut, e.getMessage(), "CannotSaveFile");
            return;
        }

        try {
            String sCurrentLine;
            OutputStream out;
            if (path.equals("") && filename.equals("treeDefault.json")) {
                BufferedReader br = new BufferedReader(new FileReader(defaultWebPagesPath + ob_getSeparator(_applicationPath.getDefaultPath()) + filename));
                while ((sCurrentLine = br.readLine()) != null) {
                    _text += sCurrentLine;
                }
                br.close();
                filename = project + "_" + webpage + "_" + div_id + ".json";
                xml.set_class_object_attribute_value(docOut, "ob_explorer", "json", "filename", filename);
            } else {
                File path_dir = new File(_applicationPath.getDefaultWebPagesPath());
                String path_dir_canonical = path_dir.getCanonicalPath() + ob_getSeparator(path_dir.getPath()) + path;
                if (!new File(path_dir_canonical).exists()) {
                    System.err.println("Error: Directory not found: " + path_dir_canonical);
                    String message = "Cannot found " + path_dir_canonical;
                    ob_error(docOut, xml, message);
                    return;
                }
                if (!new File(path_dir_canonical + ob_getSeparator(path_dir.getPath()) + filename).exists()) {
                    new File(path_dir_canonical + ob_getSeparator(path_dir.getPath()) + filename).createNewFile();
                }
                out = new FileOutputStream(path_dir_canonical + ob_getSeparator(path_dir.getPath()) + filename);
                new PrintStream(out).println(_text);
                out.close();
            }

        } catch (Exception e) {
            System.err.println("CannotSaveFile:" + e.getMessage());
            OPENBEXI_Creative_main.ob_error(_response, docOut, e.getMessage(), "CannotSaveFile");
            return;
        }

        try {
            docOut = xmlResponse.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "ok");
            System.out.println("filename=" + filename + " saved");
        } catch (Exception e) {
            System.err.println(e);
        }

        try {
            _response.setContentType("text/xml");
            _response.setHeader("Cache-Control", "no-cache");
            _response.getWriter().write(xml.XMLSerializer(docOut));
        } catch (IOException e) {
            System.err.println(e);
        }
    }

    public void ob_saveImage(Document docOut) {
        final BEXI_XMLDriver xml = new BEXI_XMLDriver();
        String project;
        String path_source;
        String filename;
        String codec;
        final BEXI_XMLDriver xmlResponse = new BEXI_XMLDriver();
        try {
            project = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "project");
            path_source = xml.get_class_object_attribute_value(docOut, "ob_explorer", "image", "path_source");
            if (path_source != null) path_source = path_source.replaceAll("#", "/");
            filename = xml.get_class_object_attribute_value(docOut, "ob_explorer", "image", "filename");
            codec = xml.get_class_object_attribute_value(docOut, "ob_explorer", "image", "codec");
        } catch (Exception e) {
            OPENBEXI_Creative_main.ob_error(_response, docOut, e.getMessage(), "CannotSaveFile");
            return;
        }

        try {
            BufferedImage image = null;

            File path_dir = new File(_applicationPath.getDefaultWebPagesPath());
            String path_dir_canonical = path_dir.getCanonicalPath() + ob_getSeparator(path_dir.getPath()) + "project" + ob_getSeparator(path_dir.getPath()) + project;
            if (!new File(path_dir_canonical).exists()) {
                System.err.println("Error: Directory not found: " + path_dir_canonical);
                String message = "Cannot found " + path_dir_canonical;
                ob_error(docOut, xml, message);
                return;
            }
            if (!new File(path_dir_canonical + ob_getSeparator(path_dir.getPath()) + "gif").exists()) {
                new File(path_dir_canonical + ob_getSeparator(path_dir.getPath()) + "gif").mkdir();
            }
            if (!new File(path_dir_canonical + ob_getSeparator(path_dir.getPath()) + "gif" + ob_getSeparator(path_dir.getPath()) + filename).exists()) {
                new File(path_dir_canonical + ob_getSeparator(path_dir.getPath()) + "gif" + ob_getSeparator(path_dir.getPath()) + filename).createNewFile();
            }

            if (codec != null) {
                byte decoded[] = new sun.misc.BASE64Decoder().decodeBuffer(codec);
                ByteArrayInputStream bis = new ByteArrayInputStream(decoded);
                Iterator<?> readers = ImageIO.getImageReadersByFormatName("jpg");

                ImageReader reader = (ImageReader) readers.next();
                ImageInputStream iis = ImageIO.createImageInputStream(bis);
                reader.setInput(iis, true);
                ImageReadParam param = reader.getDefaultReadParam();

                Image img = reader.read(0, param);

                BufferedImage bufferedImage = new BufferedImage(image.getWidth(null), img.getHeight(null), BufferedImage.TYPE_INT_RGB);
                //bufferedImage is the RenderedImage to be written
                Graphics2D g2 = bufferedImage.createGraphics();
                g2.drawImage(img, null, null);
                File imageFile = new File("path_dir_canonical + ob_getSeparator(path_dir.getPath()) + \"gif\" + ob_getSeparator(path_dir.getPath()) + filename");
                ImageIO.write(bufferedImage, "jpg", imageFile);

                System.out.println(imageFile.getPath());
            } else {
                File file_source = new File(path_source + ob_getSeparator(path_dir.getPath()) + filename);
                if (path_source.endsWith("gifPlus") || path_source.endsWith("gifPlus/") || path_source.endsWith("background/"))
                    file_source = new File(_applicationPath.getDefaultWebPagesPath() + ob_getSeparator(path_dir.getPath()) + path_source + ob_getSeparator(path_dir.getPath()) + filename);

                if (file_source.exists()) {
                    File file_target = new File(path_dir_canonical + ob_getSeparator(path_dir.getPath()) + "gif" + ob_getSeparator(path_dir.getPath()) + filename);
                    OPENBEXI_Creative_file.ob_copyFile(file_source, file_target);

                    //Get image size
                    try {
                        ImageInputStream iis = ImageIO.createImageInputStream(file_source);
                        Iterator<ImageReader> readers = ImageIO.getImageReaders(iis);
                        if (readers.hasNext()) {
                            // pick the first available ImageReader
                            ImageReader reader = readers.next();
                            // attach source to the reader
                            reader.setInput(iis, true);
                            // read metadata of first image
                            // IIOMetadata metadata = reader.getImageMetadata(0);
                            docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "image", "width", Integer.toString(reader.getWidth(0)));
                            docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "image", "heigth", Integer.toString(reader.getHeight(0)));
                        }
                    } catch (Exception e1) {
                        docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "image", "width", "-1");
                        docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "image", "heigth", "-1");
                    }

                } else {
                    System.err.println("Error: Cannot not found source: " + file_source.getName());
                    String message = "Cannot found source " + file_source.getName();
                    ob_error(docOut, xml, message);
                    return;
                }
            }

        } catch (Exception e) {
            System.err.println("CannotSaveFile:" + e.getMessage());
            OPENBEXI_Creative_main.ob_error(_response, docOut, e.getMessage(), "CannotSaveFile");
            return;
        }

        try {
            docOut = xmlResponse.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "ok");
            System.out.println("filename=" + filename + " saved");
        } catch (Exception e) {
            System.err.println(e);
        }

        try {
            _response.setContentType("text/xml");
            _response.setHeader("Cache-Control", "no-cache");
            _response.getWriter().write(xml.XMLSerializer(docOut));
        } catch (IOException e) {
            System.err.println(e);
        }
    }

    /**
     * Clean, repair and re-sync the project template if necessary.
     *
     * @param webpage   .
     * @param html_code .
     */

    public void ob_cleanHtmlFile(File webpage, String html_code) {
        try {

            OutputStream out = new FileOutputStream(webpage);

            org.jsoup.nodes.Document docOut = Jsoup.parse(html_code, "UTF-8");
            //docOut.getElementById("div0").remove();
            new PrintStream(out).println(docOut.html());

            out.flush();
            out.close();

        } catch (Exception e) {
            System.err.println(e);
        }
    }

    /**
     * Clean and save header HTML file
     *
     * @param html .
     * @return html_head .
     * @throws Exception .
     */
    public String ob_buildHeaderHtmlFile(String filename, String html) throws Exception {
        String html_head = "";

        // Parse html
        org.jsoup.nodes.Document doc_head = Jsoup.parse(html, "UTF-8");
        String OPENBEXI_PUBLIC_CONTEXT_XML = null;
        String OPENBEXI_PAGES_DATA_XML = null;
        String OPENBEXI_PRIVATE_CONTEXT_XML = null;
        String OPENBEXI_PAGES_DATA_XML_updated = null;
        String CSS_INLINE = "";
        String JAVASCRIPT_CODE = "";
        String previous_css = "";


        for (int i = 0; i < doc_head.head().childNodes().size(); i++) {
            try {
                if (doc_head.head().childNode(i).toString().contains("OPENBEXI_PUBLIC_CONTEXT_XML"))
                    OPENBEXI_PUBLIC_CONTEXT_XML = doc_head.head().childNode(i).toString();
                else if (doc_head.head().childNode(i).toString().contains("OPENBEXI_PRIVATE_CONTEXT_XML"))
                    OPENBEXI_PRIVATE_CONTEXT_XML = doc_head.head().childNode(i).toString();
                else if (doc_head.head().childNode(i).toString().contains("OPENBEXI_PAGES_DATA_XML")) {
                    OPENBEXI_PAGES_DATA_XML = doc_head.head().childNode(i).toString();
                    OPENBEXI_PAGES_DATA_XML_updated = doc_head.head().childNode(i).childNode(0).toString();
                    OPENBEXI_PAGES_DATA_XML_updated = OPENBEXI_PAGES_DATA_XML_updated.replace("var OPENBEXI_PAGES_DATA_XML = ", "");
                    OPENBEXI_PAGES_DATA_XML_updated = OPENBEXI_PAGES_DATA_XML_updated.replace("'", "");
                    OPENBEXI_PAGES_DATA_XML_updated = OPENBEXI_PAGES_DATA_XML_updated.replace("\'</script>", "");
                } else {
                    if (doc_head.head().childNode(i).attributes() != null)
                        if (doc_head.head().childNode(i).attributes().get("type").equals("text/javascript")) {
                            if (doc_head.head().childNode(i).toString() != null)
                                JAVASCRIPT_CODE += "    " + doc_head.head().childNode(i).toString() + "\n";
                        }
                }
                if (doc_head.head().childNode(i).attributes() != null)
                    if (doc_head.head().childNode(i).attributes().get("type").equals("text/css")) {
                        if (doc_head.head().childNode(i).attributes().size() != 0)
                            if (!previous_css.equals(doc_head.head().childNode(i).attributes().get("href"))) {
                                if (!doc_head.head().childNode(i).attributes().get("href").equals("")) {
                                    CSS_INLINE += "    " + doc_head.head().childNode(i).toString().replace(";", ";\n").replace("}", "}\n").replace("{", "{\n").replace(">", ">\n");
                                    previous_css = doc_head.head().childNode(i).attributes().get("href");
                                } else
                                    CSS_INLINE += "    " + doc_head.head().childNode(i).toString().replace(";", ";\n").replace("}", "}\n").replace("{", "{\n").replace(">", ">\n");
                            }
                    }
            } catch (Exception e) {
                ob_do_nothing();
            }
        }

        // Look for OPENBEXI_PAGES_DATA_XML data
        String title = "";
        String metaTags_description = "";
        String metaTags_keywords = "";

        try {
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document docPage = builder.parse(new InputSource(new StringReader(OPENBEXI_PAGES_DATA_XML_updated)));
            final BEXI_XMLDriver page_data = new BEXI_XMLDriver();
            title = page_data.get_class_object_attribute_value(docPage, "page", "title", "text");
            if (title == null) title = "";
            metaTags_description = page_data.get_class_object_attribute_value(docPage, "page", "metaTags", "description");
            if (metaTags_description == null) metaTags_description = "";
            metaTags_keywords = page_data.get_class_object_attribute_value(docPage, "page", "metaTags", "keywords");
            if (metaTags_keywords == null) metaTags_keywords = "";
        } catch (Exception e) {
        }

        // Create page header
        html_head += "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">\n";
        html_head += "<html xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"en\" lang=\"en\">\n";
        html_head += "<head>\n";
        html_head += "    <title>" + title + "</title>\n";
        html_head += "\n";
        html_head += "    <META HTTP-EQUIV=\"Content-Type\" CONTENT=\"text/html; charset=ISO-8859-1\">\n";
        html_head += "    <META name=\"description\" content=" + metaTags_description + ">\n";
        html_head += "    <META name=\"keywords\" content=" + metaTags_keywords + ">\n";
        html_head += "\n";

        // Add CSS header
        html_head += "    <link rel=\"stylesheet\" href=\"css/openbexi.css\">\n";
        html_head += "    <link rel=\"stylesheet\" href=\"css/timeline.css\">\n";
        html_head += "    <link rel=\"stylesheet\" href=\"css/openbexi_icon.css\">\n";
        html_head += "\n";
        html_head += "    <link rel=\"stylesheet\" href=\"javascript/CodeMirror/lib/codemirror.css\">\n";
        html_head += "    <link rel=\"stylesheet\" href=\"javascript/CodeMirror/theme/night.css\">\n";
        html_head += "\n";

        //Add CSS inline
        if (CSS_INLINE != null)
            html_head += CSS_INLINE;
        else {
            html_head += "<style type=\"text/css\">\n" +
                    "        body {\n" +
                    "               background:url('');\n" +
                    "               background-color:none;\n" +
                    "               background-repeat:no-repeat;\n" +
                    "        }\n" +
                    "    </style>\n";
        }

        html_head += "\n";

        // Add XML data
        // Fixed IE bug with replace to avoid extra <\n> return
        if (OPENBEXI_PUBLIC_CONTEXT_XML != null)
            html_head += "    " + OPENBEXI_PUBLIC_CONTEXT_XML + "\n";
        else
            html_head += "<script type=\"text/javascript\">      var OPENBEXI_PUBLIC_CONTEXT_XML = '<openbexiCreative><classe name=\"ob_ssh\"><object name=\"connection_0\"><attribute name=\"host\" host=\"Create a new website\"/><attribute name=\"user\" user=\"\"/><attribute name=\"passwd\" passwd=\"\"/><attribute name=\"PublicKey\" PublicKey=\"ssh-dss\"/><attribute name=\"SocketTimeout\" SocketTimeout=\"30000\"/><attribute name=\"connected\" connected=\"false\"/></object><object name=\"connection_1\"><attribute name=\"host\" host=\"host1\"/><attribute name=\"user\" user=\"\"/><attribute name=\"passwd\" passwd=\"\"/><attribute name=\"PublicKey\" PublicKey=\"ssh-dss\"/><attribute name=\"SocketTimeout\" SocketTimeout=\"30000\"/><attribute name=\"connected\" connected=\"false\"/></object><object name=\"connection\"><attribute name=\"count\" count=\"2\"/></object></classe><classe name=\"ob_server\"><object name=\"connection_0\"><attribute port=\"8282\" name=\"port\"/><attribute name=\"url\" url=\"new OPENBEXI server\"/><attribute name=\"user\" user=\"\"/><attribute name=\"password\" password=\"\"/><attribute name=\"path\" path=\"\"/><attribute name=\"protocole\" protocole=\"http\"/><attribute name=\"connected\" connected=\"false\"/></object><object name=\"connection_1\"><attribute port=\"8282\" name=\"port\"/><attribute name=\"url\" url=\"http://localhost:8282/openbexi.do\"/><attribute name=\"user\" user=\"\"/><attribute name=\"password\" password=\"\"/><attribute name=\"path\" path=\"\"/><attribute name=\"protocole\" protocole=\"http\"/><attribute name=\"connected\" connected=\"true\"/></object><object name=\"connection\"><attribute name=\"count\" count=\"2\"/></object></classe><classe name=\"bexicontext\"><object name=\"browser\"><attribute name=\"\"/></object><object name=\"os\"><attribute name=\"\"/></object><object name=\"connection\"><attribute name=\"url\" url=\"http://localhost:8282/openbexi.do\"/><attribute name=\"port\" port=\"80\"/><attribute name=\"asynchron\" asynchron=\"true\"/><attribute name=\"synchron\" synchron=\"false\"/><attribute name=\"post\" post=\"true\"/><attribute name=\"get\" get=\"false\"/><attribute name=\"user\" user=\"root\"/><attribute name=\"passwd\" passwd=\"\"/></object><object name=\"language\"><attribute name=\"en\"/></object></classe><classe name=\"ob_database\"><object name=\"databaseAdmin\"><attribute driver=\"org.hsqldb.jdbcDriver\" name=\"driver\"/><attribute name=\"url\" url=\"jdbc:hsqldb:file:hsqldb/data/bexi_admin\"/><attribute name=\"user\" user=\"sa\"/><attribute name=\"password\" password=\"\"/><attribute name=\"connected\" connected=\"false\"/></object><object name=\"database_0\"><attribute driver=\"org.hsqldb.jdbcDriver\" name=\"driver\"/><attribute name=\"url\" url=\"new database\"/><attribute name=\"user\" user=\"root\"/><attribute name=\"password\" password=\"\"/><attribute name=\"connected\" connected=\"false\"/></object><object name=\"database_1\"><attribute driver=\"org.hsqldb.jdbcDriver\" name=\"driver\"/><attribute name=\"url\" url=\"jdbc:hsqldb:file:hsqldb/data/bexi_en\"/><attribute name=\"user\" user=\"root\"/><attribute name=\"password\" password=\"\"/><attribute name=\"connected\" connected=\"false\"/></object><object name=\"database_2\"><attribute driver=\"org.hsqldb.jdbcDriver\" name=\"driver\"/><attribute name=\"url\" url=\"jdbc:hsqldb:file:hsqldb/data/bexi_fr\"/><attribute name=\"user\" user=\"root\"/><attribute name=\"password\" password=\"\"/><attribute name=\"connected\" connected=\"false\"/></object><object name=\"database\"><attribute name=\"count\" count=\"4\"/></object><object name=\"connection\"><attribute name=\"connected\" connected=\"false\"/></object><object name=\"databaseCurrent\"><attribute name=\"password\" password=\"\"/><attribute name=\"connected\" connected=\"false\"/><attribute name=\"myName\" myName=\"myName3\"/><attribute name=\"url\" url=\"database3\"/><attribute name=\"user\" user=\"\"/><attribute name=\"passwd\" passwd=\"\"/><attribute driver=\"\" name=\"driver\"/></object><object name=\"database_3\"><attribute name=\"myName\" myName=\"test\"/><attribute name=\"url\" url=\"jdbc:hsqldb:file:hsqldb/data/test\"/><attribute name=\"user\" user=\"sa\"/><attribute name=\"passwd\" passwd=\"\"/><attribute name=\"driver\" driver=\"org.hsqldb.jdbcDriver\"/></object></classe></openbexiCreative>'</script>\n";

        if (OPENBEXI_PRIVATE_CONTEXT_XML != null)
            html_head += "    " + OPENBEXI_PRIVATE_CONTEXT_XML + "\n";
        else
            html_head += "<script type=\"text/javascript\">      var OPENBEXI_PRIVATE_CONTEXT_XML = '<?xml version=\"1.0\" encoding=\"iso-8859-1\"?><openbexiCreative>\t<classe name=\"ob_server\">\t\t<object name=\"connection_0\">\t\t\t<attribute name=\"port\" port=\"8282\"/>\t\t\t<attribute name=\"url\" url=\"new OPENBEXI server\"/>\t\t\t<attribute name=\"user\" user=\"\"/>\t\t\t<attribute name=\"passwd\" passwd=\"\"/>\t\t\t<attribute name=\"path\" path=\"\"/>\t\t\t<attribute name=\"protocole\" protocole=\"http\"/>\t\t\t<attribute name=\"connected\" connected=\"false\"/>\t\t</object>\t\t<object name=\"connection_1\">\t\t\t<attribute name=\"port\" port=\"8282\"/>\t\t\t<attribute name=\"url\" url=\"http://localhost:8282/openbexi.do\"/>\t\t\t<attribute name=\"user\" user=\"\"/>\t\t\t<attribute name=\"passwd\" passwd=\"\"/>\t\t\t<attribute name=\"path\" path=\"\"/>\t\t\t<attribute name=\"protocole\" protocole=\"http\"/>\t\t\t<attribute name=\"connected\" connected=\"true\"/>\t\t</object>\t\t<object name=\"connection\">\t\t\t<attribute name=\"count\" count=\"2\"/>\t\t</object>\t</classe>\t<classe name=\"bexicontext\">\t\t<object name=\"browser\">\t\t\t<attribute name=\"\"/>\t\t</object>\t\t<object name=\"os\">\t\t\t<attribute name=\"\"/>\t\t</object>\t\t<object name=\"connection\">\t\t\t<attribute name=\"url\" url=\"http://localhost:8282/openbexi.do\"/>\t\t\t<attribute name=\"port\" port=\"80\"/>\t\t\t<attribute name=\"asynchron\" asynchron=\"true\"/>\t\t\t<attribute name=\"synchron\" synchron=\"false\"/>\t\t\t<attribute name=\"post\" post=\"true\"/>\t\t\t<attribute name=\"get\" get=\"false\"/>\t\t\t<attribute name=\"user\" user=\"root\"/>\t\t\t<attribute name=\"passwd\" passwd=\"\"/>\t\t</object>\t\t<object name=\"page_draft\">\t\t\t<attribute name=\"no_name_draft.html\"/></object><object name=\"mode\">\t\t\t<attribute name=\"projects\"/></object><object name=\"language\">\t\t\t<attribute name=\"en\"/></object><object name=\"project\">\t\t\t<attribute name=\"tests\"/></object><object name=\"page\">\t\t\t<attribute name=\"test_buttons.html\"/></object></classe><classe name=\"ob_ssh\">\t\t<object name=\"connection_0\">\t\t\t<attribute name=\"website\" website=\"new_FTP_connection\"/>\t\t\t<attribute name=\"host\" host=\"new_FTP_connection\"/>\t\t\t<attribute name=\"user\" user=\"\"/>\t\t\t<attribute name=\"PublicKey\" PublicKey=\"ssh-dss\"/>\t\t\t<attribute name=\"SocketTimeout\" SocketTimeout=\"30000\"/>\t\t\t<attribute name=\"connected\" connected=\"false\"/>\t\t\t<attribute name=\"passwd\" passwd=\"\"/>\t\t</object>\t\t<object name=\"connection\">\t\t\t<attribute name=\"tests\" tests=\"6\"/>\t\t\t<attribute name=\"no_name\" no_name=\"4\"/>\t\t\t<attribute name=\"connected\" connected=\"false\"/><attribute name=\"count\" count=\"3\"/><attribute name=\"number\" number=\"1\"/></object><object name=\"connection_1\">\t\t\t<attribute name=\"website\" website=\"local\"/><attribute name=\"host\" host=\"127.0.0.1\"/><attribute name=\"user\" user=\"openbexi\"/><attribute name=\"PublicKey\" PublicKey=\"FTP\"/><attribute name=\"SocketTimeout\" SocketTimeout=\"30000\"/><attribute name=\"path\" path=\"\"/><attribute name=\"passwd\" passwd=\"\"/></object><object name=\"connection_2\"><attribute name=\"website\" website=\"openbexi web site\"/><attribute name=\"host\" host=\"75.131.48.177\"/><attribute name=\"user\" user=\"bexiadmin\"/><attribute name=\"PublicKey\" PublicKey=\"ssh-dss\"/><attribute name=\"SocketTimeout\" SocketTimeout=\"30000\"/><attribute name=\"path\" path=\"../public_html\"/><attribute name=\"passwd\" passwd=\"\"/></object></classe><classe name=\"ob_database\">\t\t<object name=\"databaseAdmin\">\t\t\t<attribute name=\"driver\" driver=\"org.hsqldb.jdbcDriver\"/>\t\t\t<attribute name=\"url\" url=\"jdbc:hsqldb:file:hsqldb/data/bexi_admin\"/>\t\t\t<attribute name=\"user\" user=\"sa\"/>\t\t\t<attribute name=\"passwd\" passwd=\"\"/>\t\t\t<attribute name=\"connected\" connected=\"false\"/>\t\t</object>\t\t<object name=\"database_0\">\t\t\t<attribute name=\"driver\" driver=\"org.hsqldb.jdbcDriver\"/>\t\t\t<attribute name=\"url\" url=\"new database\"/>\t\t\t<attribute name=\"user\" user=\"root\"/>\t\t\t<attribute name=\"passwd\" passwd=\"\"/>\t\t\t<attribute name=\"connected\" connected=\"false\"/>\t\t</object>\t\t<object name=\"connection\">\t\t\t<attribute name=\"connected\" connected=\"false\"/><attribute name=\"count\" count=\"4\"/><attribute name=\"number\" number=\"3\"/></object><object name=\"databaseCurrent\">\t\t\t<attribute name=\"connected\" connected=\"false\"/>\t\t\t<attribute name=\"myName\" myName=\"test\"/><attribute name=\"url\" url=\"jdbc:hsqldb:file:hsqldb/data/test\"/><attribute name=\"user\" user=\"sa\"/><attribute name=\"passwd\" passwd=\"\"/><attribute name=\"driver\" driver=\"org.hsqldb.jdbcDriver\"/></object><object name=\"database_1\">\t\t\t<attribute name=\"connected\" connected=\"false\"/>\t\t\t<attribute name=\"myName\" myName=\"fr\"/>\t\t\t<attribute name=\"url\" url=\"jdbc:hsqldb:file:hsqldb/data/bexi_fr\"/>\t\t\t<attribute name=\"user\" user=\"sa\"/>\t\t\t<attribute name=\"driver\" driver=\"org.hsqldb.jdbcDriver\"/>\t\t\t<attribute name=\"passwd\" passwd=\"\"/></object><object name=\"database_2\">\t\t\t<attribute name=\"connected\" connected=\"false\"/>\t\t\t<attribute name=\"myName\" myName=\"en\"/>\t\t\t<attribute name=\"url\" url=\"jdbc:hsqldb:file:hsqldb/data/bexi_en\"/>\t\t\t<attribute name=\"user\" user=\"sa\"/>\t\t\t<attribute name=\"driver\" driver=\"org.hsqldb.jdbcDriver\"/>\t\t\t<attribute name=\"passwd\" passwd=\"\"/></object><object name=\"database_3\">\t\t\t<attribute name=\"connected\" connected=\"false\"/>\t\t\t<attribute name=\"myName\" myName=\"test\"/><attribute name=\"url\" url=\"jdbc:hsqldb:file:hsqldb/data/test\"/><attribute name=\"user\" user=\"sa\"/><attribute name=\"driver\" driver=\"org.hsqldb.jdbcDriver\"/><attribute name=\"passwd\" passwd=\"\"/></object></classe></openbexiCreative>'</script>\n";
        if (OPENBEXI_PAGES_DATA_XML != null)
            html_head += "    " + OPENBEXI_PAGES_DATA_XML + "\n";
        else
            html_head += "<script type=\"text/javascript\">      var OPENBEXI_PAGES_DATA_XML = '<openbexiCreative><object name=\"init\"><attribute name=\"init\" init=\"init\"/></object><classe name=\"ob_ssh\"><object name=\"connection\"><attribute name=\"number\" number=\"0\"/></object></classe><classe name=\"chartflow\"><object name=\"node\"><attribute name=\"count\" count=\"0\"/></object></classe><classe name=\"page\"><object name=\"version\"><attribute name=\"code\" code=\"5.0 Beta\"/></object></classe></openbexiCreative>'</script>\n";
        //if (filename.equals("template.html") )
        //html_head += "<script type=\"text/javascript\">      var OPENBEXI_TEMPLATE_DATA_XML = '<openbexiCreative><object name=\"init\"><attribute name=\"init\" init=\"init\"/></object><classe name=\"ob_ssh\"><object name=\"connection\"><attribute name=\"number\" number=\"0\"/></object></classe><classe name=\"chartflow\"><object name=\"node\"><attribute name=\"count\" count=\"0\"/></object></classe><classe name=\"page\"><object name=\"version\"><attribute name=\"code\" code=\"5.0 Beta\"/></object></classe></openbexiCreative>'</script>\n";
        html_head += "\n";

        // Add @import
        html_head += "    <script type=\"text/javascript\" src=\"javascript/jquery/jquery.min.js\"></script>\n";
        html_head += "    <script type=\"text/javascript\" src=\"javascript/jquery/jquery-ui.min.js\"></script>\n";
        html_head += "    <script type=\"text/javascript\" src=\"javascript/jquery/jQueryRotate.js\"></script>\n";
        // IMPORTANT: Redefine $ function to be able to use prototype.js and jQuery together on the same web page
        html_head += "    <script type=\"text/javascript\"> var $ob_jquery = jQuery.noConflict();</script>\n";

        // Add all other javascript specific to widgets
        html_head += JAVASCRIPT_CODE;
        html_head += "<script type=\"text/javascript\" src=\"javascript/prototype.js\"></script>";
        html_head += "<script type=\"text/javascript\" src=\"javascript/scriptaculous.js\"></script>";
        html_head += "<script type=\"text/javascript\" src=\"javascript/effects.js\"></script>";
        html_head += "<script type=\"text/javascript\" src=\"javascript/slider.js\"></script>";
        html_head += "<script type=\"text/javascript\" src=\"javascript/openbexi_xml.js\"></script>";

        // End html header
        html_head += "\n";
        html_head += "</head>\n";
        html_head += "\n";

        return html_head;
    }

    /**
     * Clean and save body HTML file
     *
     * @param html .
     * @return html_body .
     * @throws Exception                    .
     * @throws ParserConfigurationException .
     */
    public String ob_buildTemplateBodyHtmlFile(String templateFile, String html) throws Exception {
        String html_body;

        // Parse docOut
        org.jsoup.nodes.Document template_doc_body = Jsoup.parse(html, "UTF-8");
        org.jsoup.nodes.Document original_template_doc_body = Jsoup.parse(new File(templateFile), "UTF-8");

        // Remove all widgets which are not part of the template and populate all original childnodes to the template
        String current_id;
        for (int j = 0; j < original_template_doc_body.body().childNodes().size(); j++) {
            try {
                current_id = original_template_doc_body.body().childNode(j).attributes().get("id");
                if (!current_id.equals("")) {
                    Attributes att = template_doc_body.getElementById(current_id).attributes();
                    original_template_doc_body.body().childNode(j).attributes().addAll(att);
                }
            } catch (Exception e) {
            }
        }
        // set default class
        if (original_template_doc_body.body().attr("class").equals(""))
            original_template_doc_body.body().attr("class", "claro");

        // Get body
        html_body = original_template_doc_body.body().toString();

        // End
        html_body += "</html>\n";
        return html_body;
    }

    private void ob_setTemplate(Element node, boolean isTemplate) {
        if (isTemplate)
            node.attributes().put("ob_template", "true");
        else {
            if (!node.attributes().get("ob_template").equals("true"))
                node.attributes().put("ob_template", "false");
        }
        if (node.childNodeSize() != 0) {
            for (int i = 0; i < node.childNodes().size(); i++) {
                ob_setTemplate(node.child(i), isTemplate);
            }
        }
    }

    /**
     * Clean and save body HTML file
     *
     * @param html .
     * @return html_body .
     * @throws Exception                    .
     * @throws ParserConfigurationException .
     */
    public String ob_buildBodyHtmlFile(File filename, String html) throws Exception {
        String html_body;
        boolean isTemplate = false;
        if (filename.getName().equals("template.html")) isTemplate = true;

        // Parse docOut
        org.jsoup.nodes.Document doc_body = Jsoup.parse(html, "UTF-8");
        //org.jsoup.nodes.Document doc_body = ob_sort_HTML_div_by_index(filename);

        // set default class
        if (doc_body.body().attr("class").equals(""))
            doc_body.body().attr("class", "claro");

        // Set ob_template tag to true if filename = template.html
        for (int i = 0; i < doc_body.body().childNodes().size(); i++) {
            try {
                if (doc_body.body().child(i).attributes() != null && !doc_body.body().child(i).attributes().get("id").matches("lefttopdiv|righttopdiv|rightbottomdiv|leftbottomdiv"))
                    ob_setTemplate(doc_body.body().child(i), isTemplate);
            } catch (Exception e) {
            }
        }

        // Get body
        html_body = doc_body.body().toString();

        // End
        html_body += "</html>\n";
        return html_body;
    }

    /**
     * @param fileNmae
     */
    public void ob_createHtmlTemplateFile(String fileNmae) {

    }

    public void ob_createHtmlFile(String defaultWebPagesPath, Document docOut, HttpServletRequest request) {
        final BEXI_XMLDriver xml = new BEXI_XMLDriver();
        String dir_project;
        String subtype;
        String project;
        String filename;
        String typeFile;
        String html = "";
        File file;
        Document doc = null;
        final BEXI_XMLDriver xmlResponse = new BEXI_XMLDriver();

        // Get data from the web browser
        try {
            subtype = xml.get_class_object_attribute_value(docOut, "ob_request", "request", "subtype");
            if (subtype.equals("webPageTemplates")) {
                dir_project = "template" + ob_getSeparator(defaultWebPagesPath) + "ob_project";
                project = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "templateCategory");
            } else {
                dir_project = "project";
                project = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "project");
            }
            typeFile = xml.get_class_object_attribute_value(docOut, "ob_request", "request", "type");
            filename = xml.get_class_object_attribute_value(docOut, "file", "html", "name");
            doc = xmlResponse.set_class_object_attribute_value(doc, "ob_request", "request", "type", typeFile);
            doc = xmlResponse.set_class_object_attribute_value(doc, "file", "html", "name", filename);
            doc = xmlResponse.set_class_object_attribute_value(doc, "ob_explorer", "dir", "project", project);
            doc = xmlResponse.set_class_object_attribute_value(doc, "ob_explorer", "dir", "filename", filename);

        } catch (Exception e) {
            System.err.println("CannotSaveFile:" + e.getMessage());
            OPENBEXI_Creative_main.ob_error(_response, doc, e.getMessage(), "CannotSaveFile");
            return;
        }

        //Read Open BEXI web page created by users
        try {

            // ------------------------
            // Build htlm page
            // ------------------------
            // Build Header page
            String header = ob_buildHeaderHtmlFile(filename, html);

            // Build Body page
            file = new File(_applicationPath.getDefaultPath() + ob_getSeparator(_applicationPath.getDefaultPath()) + dir_project + ob_getSeparator(_applicationPath.getDefaultPath()) + project + ob_getSeparator(_applicationPath.getDefaultPath()) + filename);
            String body = ob_buildBodyHtmlFile(file, html);
            String htmlPage = header + body;

            // Save webpage files
            // Check if the project exist otherwise create the project
            if (!new File(defaultWebPagesPath + ob_getSeparator(defaultWebPagesPath) + dir_project + ob_getSeparator(defaultWebPagesPath) + project).exists())
                ob_createProject_or_TemplateCategory(defaultWebPagesPath, docOut, "create_project");
            OutputStream out = new FileOutputStream(defaultWebPagesPath + ob_getSeparator(defaultWebPagesPath) + dir_project + ob_getSeparator(defaultWebPagesPath) + project + ob_getSeparator(_applicationPath.getDefaultPath()) + filename);
            new PrintStream(out).println(htmlPage);
            out.close();

            // Update the template html file from the current html page only if the  current html page is not the template itself.
            String templateFile = defaultWebPagesPath + ob_getSeparator(defaultWebPagesPath) + dir_project + ob_getSeparator(defaultWebPagesPath) + project + ob_getSeparator(_applicationPath.getDefaultPath()) + "template.html";
            if (new File(templateFile).exists() && !filename.equals("template.html")) {

                // ------------------------
                // Build template htlm page
                // ------------------------
                // Build Header page
                String headerTemplate = ob_buildHeaderHtmlFile("template.html", html);

                // Build Template Body page
                String templateBody = ob_buildTemplateBodyHtmlFile(templateFile, html);
                html = headerTemplate + templateBody;

                // Save template webpage files
                out = new FileOutputStream(templateFile);
                new PrintStream(out).println(html);
                out.close();
            }

        } catch (Exception e) {
            System.err.println("ob_saveHtmlFile():" + e.getMessage());
            OPENBEXI_Creative_main.ob_error(_response, doc, e.getMessage(), "CannotSaveFile");
            return;
        }

        // Copy Default URL
        try {
            File defaultURL = new File(_applicationPath.getDefaultPath() + ob_getSeparator(_applicationPath.getDefaultPath()) + filename);
            ob_copyFile(file, defaultURL);
        } catch (IOException e) {
            System.err.println(e);
        }

        //Send response to the web browser
        if (request != null) {
            try {
                _response.setContentType("text/xml");
                _response.setHeader("Cache-Control", "no-cache");
                _response.getWriter().write(xml.XMLSerializer(doc));
            } catch (IOException e) {
                System.err.println(e);
            }
        }

    }

    /**
     * Clean and save HTML file
     *
     * @param defaultWebPagesPath .
     * @param docOut              .
     * @param request             .
     */
    public void ob_saveHtmlFile(String defaultWebPagesPath, Document docOut, HttpServletRequest request) {
        final BEXI_XMLDriver xml = new BEXI_XMLDriver();
        String dir_project;
        String subtype;
        String project;
        String filename;
        File file;
        String typeFile;
        String html = "";
        Document doc = null;
        final BEXI_XMLDriver xmlResponse = new BEXI_XMLDriver();

        // Get data from the web browser
        try {
            subtype = xml.get_class_object_attribute_value(docOut, "ob_request", "request", "subtype");
            if (subtype.equals("webPageTemplates")) {
                dir_project = "template" + ob_getSeparator(defaultWebPagesPath) + "ob_project";
                project = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "templateCategory");
            } else {
                dir_project = "project";
                project = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "project");
            }
            typeFile = xml.get_class_object_attribute_value(docOut, "ob_request", "request", "type");
            filename = xml.get_class_object_attribute_value(docOut, "file", "html", "name");
            doc = xmlResponse.set_class_object_attribute_value(doc, "ob_request", "request", "type", typeFile);
            doc = xmlResponse.set_class_object_attribute_value(doc, "file", "html", "name", filename);
            doc = xmlResponse.set_class_object_attribute_value(doc, "ob_explorer", "dir", "project", project);
            doc = xmlResponse.set_class_object_attribute_value(doc, "ob_explorer", "dir", "filename", filename);

            // rebuild the url   and  Send reponse
            String localAdress = request.getLocalAddr() + ":" + request.getLocalPort();
            Pattern patternG = Pattern.compile("(127.)|(0.0.0)");
            Matcher matcher = patternG.matcher(localAdress);
            if (matcher.find()) {
                localAdress = "localhost:" + request.getLocalPort();
            }
            String url_default = "http://" + localAdress + request.getContextPath() + "/openbexi.do";
            doc = xmlResponse.set_class_object_attribute_value(doc, "file", "html", "url_default", url_default);
            System.out.println("save url path:" + filename);
            System.out.println("save url_default path:" + url_default);
        } catch (Exception e) {
            System.err.println("CannotSaveFile:" + e.getMessage());
            OPENBEXI_Creative_main.ob_error(_response, doc, e.getMessage(), "CannotSaveFile");
            return;
        }

        //Read Open BEXI web page created by users
        try {

            String line = "";
            int count = 0;
            Matcher matcher;
            Pattern patternG = Pattern.compile("DOCTYPE html PUBLIC");
            while (line != null) {
                line = request.getReader().readLine();
                if (line != null) {
                    matcher = patternG.matcher(line);
                    if (matcher.find()) {
                        count++;
                    }
                    if (count == 1) html += line;
                }
            }

            // ------------------------
            // Build htlm page
            // ------------------------
            file = new File(_applicationPath.getDefaultPath() + ob_getSeparator(_applicationPath.getDefaultPath()) + dir_project + ob_getSeparator(_applicationPath.getDefaultPath()) + project + ob_getSeparator(_applicationPath.getDefaultPath()) + filename);

            // Build Header page
            String header = ob_buildHeaderHtmlFile(filename, html);

            // Build Body page
            String body = ob_buildBodyHtmlFile(file, html);
            String htmlPage = header + body;

            // Save webpage files
            // Check if the project exist otherwise create the project
            if (!new File(defaultWebPagesPath + ob_getSeparator(defaultWebPagesPath) + dir_project + ob_getSeparator(defaultWebPagesPath) + project).exists())
                ob_createProject_or_TemplateCategory(defaultWebPagesPath, docOut, "create_project");
            OutputStream out = new FileOutputStream(defaultWebPagesPath + ob_getSeparator(defaultWebPagesPath) + dir_project + ob_getSeparator(defaultWebPagesPath) + project + ob_getSeparator(_applicationPath.getDefaultPath()) + filename);
            new PrintStream(out).println(htmlPage);
            out.close();

        } catch (Exception e) {
            System.err.println("ob_saveHtmlFile():" + e.getMessage());
            OPENBEXI_Creative_main.ob_error(_response, doc, e.getMessage(), "CannotSaveFile");
            return;
        }

        // rebuild the url  and  Send reponse
        String localAdress = request.getLocalAddr() + ":" + request.getLocalPort();
        Pattern patternG = Pattern.compile("(127.)|(0.0.0)");
        Matcher matcher = patternG.matcher(localAdress);
        if (matcher.find()) {
            localAdress = "localhost:" + request.getLocalPort();
        }

        String url_default = "http://" + localAdress + request.getContextPath() + "/" + filename;
        String url = "http://" + localAdress + request.getContextPath() + "/" + dir_project + "/" + project + "/" + filename;
        try {
            doc = xmlResponse.set_class_object_attribute_value(doc, "file", "html", "url_default", url_default);
            doc = xmlResponse.set_class_object_attribute_value(doc, "file", "html", "url", url);
            doc = xmlResponse.set_class_object_attribute_value(doc, "openbexi_creative", "application", "status", "ok");
            System.out.println("filename=" + url + " saved.");
        } catch (Exception e) {
            System.err.println("CannotSaveFile:" + e.getMessage());
            System.err.println(e);
        }

        // Copy Default URL
        try {
            File defaultURL = new File(_applicationPath.getDefaultPath() + ob_getSeparator(_applicationPath.getDefaultPath()) + filename);
            ob_copyFile(file, defaultURL);
        } catch (IOException e) {
            System.err.println(e);
        }

        //Send response to the web browser
        try {
            String alertuser = "";
            try {
                alertuser = xml.get_class_object_attribute_value(docOut, "file", "html", "alertuser");
            } catch (Exception e) {
                System.err.println(e);
            }
            if (alertuser.equals("true")) {
                _response.setContentType("text/xml");
                _response.setHeader("Cache-Control", "no-cache");
                _response.getWriter().write(xml.XMLSerializer(doc));
            }
        } catch (IOException e) {
            System.err.println(e);
        }

        // Copy Archive
        File fileArchive;
        file = new File(_applicationPath.getDefaultPath() + ob_getSeparator(_applicationPath.getDefaultPath()) + dir_project + ob_getSeparator(_applicationPath.getDefaultPath()) + project + ob_getSeparator(_applicationPath.getDefaultPath()) + filename);

        try {
            Date now = new Date();
            SimpleDateFormat dateFileT = new SimpleDateFormat("dd MMM yyyy hh:mm:ss");
            String dateFileT2 = dateFileT.format(now);
            String dateFile = dateFileT2.replaceAll(" ", "_");
            dateFile = dateFile.replaceAll(":", "_");

            // Check if the directory archives exist
            File archives = new File(_applicationPath.getDefaultPath() + ob_getSeparator(defaultWebPagesPath) + dir_project + ob_getSeparator(defaultWebPagesPath) + project + ob_getSeparator(_applicationPath.getDefaultPath()) + "archives");
            if (!archives.exists()) archives.mkdir();

            // Create archive
            File fileArchiveDir2 = new File(_applicationPath.getDefaultPath() + ob_getSeparator(defaultWebPagesPath) + dir_project + ob_getSeparator(defaultWebPagesPath) + project + ob_getSeparator(_applicationPath.getDefaultPath()) + "archives" + ob_getSeparator(_applicationPath.getDefaultPath()));
            fileArchive = new File(_applicationPath.getDefaultPath() + ob_getSeparator(defaultWebPagesPath) + dir_project + ob_getSeparator(defaultWebPagesPath) + project + ob_getSeparator(_applicationPath.getDefaultPath()) + "archives" + ob_getSeparator(_applicationPath.getDefaultPath()) + filename + "_" + dateFile + ".html");
            ob_copyFile(file, fileArchive);
            ob_checkArchiveFile(fileArchiveDir2, fileArchive);

        } catch (Exception e) {
            System.err.println(e);
        }
    }

    public static String ob_readFile(File srcFile) {
        String sCurrentLine;
        String str = "";
        try {
            BufferedReader br = new BufferedReader(new FileReader(srcFile));
            while ((sCurrentLine = br.readLine()) != null) {
                str += sCurrentLine;
            }
            br.close();
        } catch (Exception e) {
            System.err.println("cannot_read_file:" + e.getMessage());
            return str;
        }
        return str;
    }

    public static Long ob_copyFile
            (File
                     srcFile, File
                     destFile)
            throws IOException {
        InputStream in = new FileInputStream(srcFile);
        OutputStream out = new FileOutputStream(destFile);
        long millis = System.currentTimeMillis();
        CRC32 checksum = null;
        if (verify) {
            checksum = new CRC32();
            checksum.reset();
        }
        byte[] buffer = new byte[bufferSize];
        int bytesRead;
        while ((bytesRead = in.read(buffer)) >= 0) {
            if (verify) {
                assert checksum != null;
                checksum.update(buffer, 0, bytesRead);
            }
            out.write(buffer, 0, bytesRead);
        }
        out.close();
        in.close();
        if (clock) {
            millis = System.currentTimeMillis() - millis;
            System.out.println("Second(s): " + (millis / 1000L));
        }
        if (verify) {
            return checksum.getValue();
        } else {
            return null;
        }
    }

    /**
     * Delete archive file if a previous one aready exist.
     *
     * @param dirPath .
     * @param file    .
     */
    public static void ob_checkArchiveFile
    (File
             dirPath, File
             file) {
        File files[] = dirPath.listFiles();
        for (File file1 : files) {
            try {
                if ((file.exists() && !file1.getName().equals(file.getName())) && ob_createChecksum(file1).equals(ob_createChecksum(file))) {
                    file.delete();
                }
            } catch (IOException e) {
                System.err.println(e);
            }
        }
    }

    /**
     * @param file .
     * @return Checksum;
     * @throws IOException .
     */
    public static Long ob_createChecksum(File file) throws IOException {
        //long millis = System.currentTimeMillis();
        InputStream in = new FileInputStream(file);
        CRC32 checksum = new CRC32();
        checksum.reset();
        byte[] buffer = new byte[bufferSize];
        int bytesRead;
        while ((bytesRead = in.read(buffer)) >= 0) {
            checksum.update(buffer, 0, bytesRead);
        }
        in.close();
        //if (clock) {
        //millis = System.currentTimeMillis() - millis;
        //System.out.println("Second(s): " + (millis / 1000L));
        //}
        return checksum.getValue();
    }

    /**
     * Determine if data is to be copied to given file.
     * Take into consideration override option and
     * ask user in case file exists and override option is ask.
     *
     * @param file File object for potential destination file
     * @return true if data is to be copied to file, false if not
     */
    public static boolean ob_doCopy
    (File
             file) {
        boolean exists = file.exists();
        if (override == OVERWRITE_ALWAYS || !exists) {
            return true;
        } else if (override == OVERWRITE_NEVER) {
            return false;
        } else {
            throw new InternalError("Program error. Invalid " +
                    "value for override: " + override);
        }
    }

    /**
     * Launch file chooser and set up media file name.
     *
     * @param docOut .
     * @throws Exception .
     */
    public void browse_media(Document docOut) throws Exception {
        final BEXI_XMLDriver xml = new BEXI_XMLDriver();
        FileDialog selFile = new FileDialog(new Frame(), "Please choose file!", FileDialog.LOAD);
        selFile.setModal(true);
        selFile.setVisible(true);
        String src = selFile.getDirectory() + ob_getSeparator(_applicationPath.getDefaultPath()) + selFile.getFile();
        String target = _applicationPath.getDefaultImagesPath() + selFile.getFile();
        String targetRelative = _applicationPath.getDefaultImagesClientPath() + selFile.getFile();
        File fileSrc = new File(src);
        File fileTarget = new File(target);
        System.out.println("file=" + src);
        System.out.println("fileCopy=" + target);
        System.out.println("file client path=" + _applicationPath.getDefaultImagesClientPath() + selFile.getFile());
        ob_copyFile(fileSrc, fileTarget);

        try {
            xml.set_class_object_attribute_value(docOut, "media", "file", "name", targetRelative);
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

    public void test_ob_createHtmlFile() {
        Document docOut = null;
        final BEXI_XMLDriver xml = new BEXI_XMLDriver();
        try {
            docOut = xml.set_class_object_attribute_value(docOut, "ob_request", "request", "subtype", "");
            docOut = xml.set_class_object_attribute_value(docOut, "file", "html", "name", "test1.html");
            docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "dir", "project", "tests");
            docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "dir", "filename", "test1.html");
            this.ob_createHtmlFile(_applicationPath.getDefaultWebPagesPath(), docOut, null);
        } catch (Exception e) {
            System.err.println(e);
        }
    }

    public void ob_createCSSFile(String defaultWebPagesPath, Document docOut, HttpServletRequest request) {
        final BEXI_XMLDriver xml = new BEXI_XMLDriver();
        String CSSCode = "";
        String widgetType;
        String filename;
        String templateCategory;
        Document doc = null;
        final BEXI_XMLDriver xmlResponse = new BEXI_XMLDriver();

        // Get data from the web browser
        try {
            widgetType = xml.get_class_object_attribute_value(docOut, "ob_request", "request", "widgetType");
            templateCategory = xml.get_class_object_attribute_value(docOut, "ob_request", "request", "templateCategory");
            filename = xml.get_class_object_attribute_value(docOut, "file", "css", "name");
            doc = xmlResponse.set_class_object_attribute_value(doc, "ob_request", "request", "templateCategory", templateCategory);
            doc = xmlResponse.set_class_object_attribute_value(doc, "file", "css", "name", filename);
            doc = xmlResponse.set_class_object_attribute_value(doc, "ob_request", "request", "widgetType", widgetType);

        } catch (Exception e) {
            System.err.println("CannotSaveFile:" + e.getMessage());
            OPENBEXI_Creative_main.ob_error(_response, doc, e.getMessage(), "CannotSaveFile");
            return;
        }

        //Read Open BEXI web page created by users
        try {

            // Update the template html file from the current html page only if the  current html page is not the template itself.
            String CSSFile = defaultWebPagesPath + ob_getSeparator(defaultWebPagesPath) + "template" + ob_getSeparator(defaultWebPagesPath) + widgetType + ob_getSeparator(defaultWebPagesPath) + templateCategory + ob_getSeparator(_applicationPath.getDefaultPath()) + filename;
            if (new File(CSSFile).exists()) {

                // ------------------------
                // Build template CSS template
                // ------------------------

                // Save template webpage files
                OutputStream out = new FileOutputStream(CSSFile);
                new PrintStream(out).println(CSSCode);
                out.close();
            }

        } catch (Exception e) {
            System.err.println("ob_createCSSFile():" + e.getMessage());
            OPENBEXI_Creative_main.ob_error(_response, doc, e.getMessage(), "CannotSaveFile");
            return;
        }

        //Send response to the web browser
        if (request != null) {
            try {
                _response.setContentType("text/xml");
                _response.setHeader("Cache-Control", "no-cache");
                _response.getWriter().write(xml.XMLSerializer(doc));
            } catch (IOException e) {
                System.err.println(e);
            }
        }

    }

    public static void main(String args[]) {
        boolean test1 = false;
        boolean test2 = false;
        boolean test_ob_createHtmlFile = false;
        boolean test_XMLmerge = false;
        boolean test_TemplateCreation = true;
        boolean test_ob_createCSSFile = true;
        if (test_TemplateCreation) {

        }
        if (test1) {
            try {
                int count;
                File input = new File("C:\\Users\\arcaz-jca\\myProject\\openbexi\\apache-tomcat_7\\webapps\\OPENBEXI_Creative\\project\\openbexi_site\\" + "index.html");
                org.jsoup.nodes.Document docOut = Jsoup.parse(input, "UTF-8");

                Elements doctype = docOut.getElementsByTag("!DOCTYPE");
                System.out.println("doctype:" + doctype);

                //meta
                count = 0;
                Elements metas = docOut.getElementsByTag("meta");
                for (Element meta : metas) {
                    System.out.println(count++ + ":" + meta);
                }

                //link
                count = 0;
                Elements links = docOut.getElementsByTag("link");
                for (Element link : links) {
                    System.out.println(count++ + ":" + link);
                }
                //Style
                count = 0;
                Elements styles = docOut.getElementsByTag("style");
                for (Element style : styles) {
                    System.out.println(count++ + ":" + style);
                }

                //Script
                count = 0;
                Elements scripts = docOut.getElementsByTag("script");
                for (Element script : scripts) {
                    System.out.println(count++ + ":" + script);
                }

                //head
                //Elements head = docOut.getElementsByTag("head");
                //System.out.println(head);

                //body
                Elements body = docOut.getElementsByTag("body");
                System.out.println("body class=" + body.attr("class"));
                System.out.println("body content=" + body.attr("onclick"));


                //div
                count = 0;
                Elements divs = docOut.getElementsByTag("div");
                for (Element div : divs) {
                    String divId = div.attr("id");
                    String divStyle = div.attr("style");
                    String divHtml = div.html();
                    System.out.println(count++ + ": div id=" + divId + "\n   -- html=" + divHtml + "\n   -- divStyle=" + divStyle);
                    System.out.println(count++ + ":" + div);
                    System.out.println(count++ + ":" + div.attributes());
                }

                // body head
                System.out.println("body head=" + body);


            } catch (Exception e) {
                System.err.println(e);
            }
        }
        if (test2) {
            try {
                String filename = "C:\\Users\\arcaz-jca\\myProject\\openbexi\\apache-tomcat_7\\webapps\\OPENBEXI_Creative\\" + "no_name.html";
                String sCurrentLine;
                String str = "";
                BufferedReader br = new BufferedReader(new FileReader(filename));
                while ((sCurrentLine = br.readLine()) != null) {
                    str += sCurrentLine;
                }
                br.close();

                Regex r = new Regex("(var OPENBEXI_PRIVATE_CONTEXT_XML = '.*'</script>   <script type=\"text/javascript\">)");
                r.search(str);
                //System.out.println(str);
                String OPENBEXI_PRIVATE_CONTEXT_XML = r.stringMatched();
                OPENBEXI_PRIVATE_CONTEXT_XML = OPENBEXI_PRIVATE_CONTEXT_XML.replace("var OPENBEXI_PRIVATE_CONTEXT_XML = ' ", "");
                OPENBEXI_PRIVATE_CONTEXT_XML = OPENBEXI_PRIVATE_CONTEXT_XML.replace("'</script>   <script type=\"text/javascript\">", "");
                System.out.println(OPENBEXI_PRIVATE_CONTEXT_XML);

                r = new Regex("(var OPENBEXI_PAGES_DATA_XML = '.*'</script>)");
                r.search(str);
                String OPENBEXI_PAGES_DATA_XML = r.stringMatched();
                OPENBEXI_PAGES_DATA_XML = OPENBEXI_PAGES_DATA_XML.replace("var OPENBEXI_PAGES_DATA_XML = '", "");
                OPENBEXI_PAGES_DATA_XML = OPENBEXI_PAGES_DATA_XML.replace("'</script>", "");
                System.out.println(OPENBEXI_PAGES_DATA_XML);

                r = new Regex("(<div CLASSE=.*SET_DHTML)");
                r.search(str);
                String divs = r.stringMatched();
                divs = divs.replace("<script type=\"text/javascript\"> SET_DHTML", "");
                System.out.println(divs);

            } catch (Exception e) {
                System.err.println(e);
            }
        }
        if (test_ob_createHtmlFile) {

            try {
                Document docOut = null;
                final BEXI_XMLDriver xml = new BEXI_XMLDriver();
                BEXI_ApplicationPath applicationPath = new BEXI_ApplicationPath();
                OPENBEXI_Creative_file creative_file = new OPENBEXI_Creative_file(null, applicationPath);
                creative_file.test_ob_createHtmlFile();
            } catch (Exception e) {
                System.err.println(e);
            }
        }
        if (test_ob_createCSSFile) {

            try {
                Document docOut = null;
                final BEXI_XMLDriver xml = new BEXI_XMLDriver();
                BEXI_ApplicationPath applicationPath = new BEXI_ApplicationPath();
                OPENBEXI_Creative_file creative_file = new OPENBEXI_Creative_file(null, applicationPath);

                creative_file.ob_createCSSFile(applicationPath.getDefaultPath(), docOut, null);

            } catch (Exception e) {
                System.err.println(e);
            }
        }
        if (test_XMLmerge) {
            try {
                String merged_xml_string_ref = "<openbexiCreative><object name=\"init\"><attribute init=\"init\" name=\"init\"/></object><classe name=\"ob_ssh\"><object name=\"connection\"><attribute name=\"number\" number=\"0\"/></object></classe><classe name=\"chartflow\"><object name=\"node\"><attribute count=\"0\" name=\"count\"/></object></classe><classe name=\"DOJOeditor\"><object name=\"template_div1\"><attribute name=\"subtype\" subtype=\"none\"/></object></classe><classe name=\"page\"><object name=\"dir\"><attribute file_0=\"template/ob_button/none/gif/*\" name=\"file_0\"/><attribute file_1=\"template/ob_dojo_editor/none/gif/*\" name=\"file_1\"/><attribute file_2=\"template/ob_dojo_editor/rounded/gif/*\" name=\"file_2\"/></object><object name=\"body\"><attribute background=\"\" name=\"background\"/><attribute image=\"\" name=\"image\"/><attribute bgColor=\"#ffffff\" name=\"bgColor\"/><attribute backgroundRepeat=\"repeat\" name=\"backgroundRepeat\"/></object><object name=\"css\"><attribute default=\"template/ob_button/default.css\" name=\"default\"/><attribute name=\"rounded_brown_style_1\" rounded_brown_style_1=\"template/ob_dojo_editor/rounded/rounded_brown_style_1.css\"/></object><object name=\"version\"><attribute code=\"5.0 Beta\" name=\"code\"/></object><object name=\"template_div0\"><attribute cursor=\"undefined\" name=\"cursor\"/><attribute name=\"type\" type=\"openbexi_button\"/><attribute name=\"subtype\" subtype=\"\"/><attribute name=\"parentId\" parentId=\"BODY\"/><attribute name=\"parentType\" parentType=\"openbexi_body\"/><attribute name=\"theme\" theme=\"default\"/><attribute name=\"subtheme\" subtheme=\"none\"/><attribute name=\"template\" template=\"template/ob_button/default.css\"/><attribute name=\"obzindex\" obzindex=\"0\"/></object><object name=\"template_div1\"><attribute name=\"subtype\" subtype=\"undefined\"/><attribute name=\"subtheme\" subtheme=\"rounded\"/><attribute name=\"type\" type=\"openbexi_dojo_editor\"/><attribute name=\"parentId\" parentId=\"BODY\"/><attribute name=\"parentType\" parentType=\"undefined\"/><attribute cursor=\"undefined\" name=\"cursor\"/><attribute name=\"rss\" rss=\"\"/><attribute name=\"theme\" theme=\"rounded_brown_style_1\"/><attribute name=\"template\" template=\"template/ob_dojo_editor/rounded/rounded_brown_style_1.css\"/><attribute name=\"obzindex\" obzindex=\"1\"/></object></classe></openbexiCreative>";
                String OPENBEXI_PAGES_DATA_XML = "<openbexiCreative><object name=\"init\"><attribute name=\"init\" init=\"init\"/></object><classe name=\"ob_ssh\"><object name=\"connection\"><attribute name=\"number\" number=\"0\"/></object></classe><classe name=\"chartflow\"><object name=\"node\"><attribute name=\"count\" count=\"0\"/></object></classe><classe name=\"page\"><object name=\"version\"><attribute name=\"code\" code=\"5.0 Beta\"/></object></classe></openbexiCreative>";
                String OPENBEXI_TEMPLATE_DATA_XML = "<openbexiCreative><object name=\"init\"><attribute init=\"init\" name=\"init\"/></object><classe name=\"ob_ssh\"><object name=\"connection\"><attribute name=\"number\" number=\"0\"/></object></classe><classe name=\"chartflow\"><object name=\"node\"><attribute name=\"count\" count=\"0\"/></object></classe><classe name=\"DOJOeditor\"><object name=\"template_div1\"><attribute name=\"subtype\" subtype=\"none\"/></object></classe><classe name=\"page\"><object name=\"dir\"><attribute file_0=\"template/ob_button/none/gif/*\" name=\"file_0\"/><attribute file_1=\"template/ob_dojo_editor/none/gif/*\" name=\"file_1\"/><attribute file_2=\"template/ob_dojo_editor/rounded/gif/*\" name=\"file_2\"/></object><object name=\"body\"><attribute name=\"background\" background=\"\"/><attribute name=\"image\" image=\"\"/><attribute name=\"bgColor\" bgColor=\"#ffffff\"/><attribute name=\"backgroundRepeat\" backgroundRepeat=\"repeat\"/></object><object name=\"css\"><attribute default=\"template/ob_button/default.css\" name=\"default\"/><attribute name=\"rounded_brown_style_1\" rounded_brown_style_1=\"template/ob_dojo_editor/rounded/rounded_brown_style_1.css\"/></object><object name=\"version\"><attribute code=\"5.0 Beta\" name=\"code\"/></object><object name=\"template_div0\"><attribute cursor=\"undefined\" name=\"cursor\"/><attribute name=\"type\" type=\"openbexi_button\"/><attribute name=\"subtype\" subtype=\"\"/><attribute name=\"parentId\" parentId=\"BODY\"/><attribute name=\"parentType\" parentType=\"openbexi_body\"/><attribute name=\"theme\" theme=\"default\"/><attribute name=\"subtheme\" subtheme=\"none\"/><attribute name=\"template\" template=\"template/ob_button/default.css\"/><attribute name=\"obzindex\" obzindex=\"0\"/></object><object name=\"template_div1\"><attribute name=\"subtype\" subtype=\"undefined\"/><attribute name=\"subtheme\" subtheme=\"rounded\"/><attribute name=\"type\" type=\"openbexi_dojo_editor\"/><attribute name=\"parentId\" parentId=\"BODY\"/><attribute name=\"parentType\" parentType=\"undefined\"/><attribute cursor=\"undefined\" name=\"cursor\"/><attribute name=\"rss\" rss=\"\"/><attribute name=\"theme\" theme=\"rounded_brown_style_1\"/><attribute name=\"template\" template=\"template/ob_dojo_editor/rounded/rounded_brown_style_1.css\"/><attribute name=\"obzindex\" obzindex=\"1\"/></object></classe></openbexiCreative>";
                BEXI_XMLDriver xml = new BEXI_XMLDriver();
                Document doc_OPENBEXI_TEMPLATE_DATA_XML = xml.openbexi_loadXML(OPENBEXI_TEMPLATE_DATA_XML);
                Document doc_OPENBEXI_PAGES_DATA_XML = xml.openbexi_loadXML(OPENBEXI_PAGES_DATA_XML);
                BEXI_ApplicationPath applicationPath = new BEXI_ApplicationPath();
                OPENBEXI_Creative_file creative_file = new OPENBEXI_Creative_file(null, applicationPath);
                Document merged_doc = xml.XMLmerge(doc_OPENBEXI_TEMPLATE_DATA_XML, doc_OPENBEXI_PAGES_DATA_XML, "subtheme|template|theme|background|backgroundImage|BACKGROUND|tree_name|listStyleImage|backgroundRepeat|bgColor");
                String merged_xml_string = xml.XMLSerializer(merged_doc);
                if (merged_xml_string_ref.equals(merged_xml_string))
                    System.out.println("1) test_XMLmerge has been done successfully");
                else
                    System.err.println("1) ERROR: test_XMLmerge has not been done successfully");

                merged_xml_string_ref = "<openbexiCreative><object name=\"init\"><attribute init=\"init\" name=\"init\"/></object><classe name=\"ob_ssh\"><object name=\"connection\"><attribute name=\"number\" number=\"0\"/></object></classe><classe name=\"chartflow\"><object name=\"node\"><attribute count=\"0\" name=\"count\"/></object></classe><classe name=\"DOJOeditor\"><object name=\"template_div1\"><attribute name=\"subtype\" subtype=\"none\"/></object></classe><classe name=\"page\"><object name=\"div1\"><attribute name=\"subtype\" subtype=\"undefined\"/><attribute name=\"subtheme\" subtheme=\"rounded\"/><attribute name=\"type\" type=\"openbexi_dojo_editor\"/><attribute name=\"parentId\" parentId=\"BODY\"/><attribute name=\"parentType\" parentType=\"undefined\"/><attribute cursor=\"undefined\" name=\"cursor\"/><attribute name=\"rss\" rss=\"\"/><attribute name=\"theme\" theme=\"rounded_brown_style_4\"/><attribute name=\"template\" template=\"template/ob_dojo_editor/rounded/rounded_brown_style_4.css\"/><attribute name=\"obzindex\" obzindex=\"1\"/></object><object name=\"dir\"><attribute file_0=\"template/ob_button/none/gif/*\" name=\"file_0\"/><attribute file_1=\"template/ob_dojo_editor/none/gif/*\" name=\"file_1\"/><attribute file_2=\"template/ob_dojo_editor/rounded/gif/*\" name=\"file_2\"/></object><object name=\"body\"><attribute background=\"\" name=\"background\"/><attribute image=\"\" name=\"image\"/><attribute bgColor=\"#ffffff\" name=\"bgColor\"/><attribute backgroundRepeat=\"repeat\" name=\"backgroundRepeat\"/></object><object name=\"css\"><attribute default=\"template/ob_button/default.css\" name=\"default\"/><attribute name=\"rounded_brown_style_1\" rounded_brown_style_1=\"template/ob_dojo_editor/rounded/rounded_brown_style_1.css\"/></object><object name=\"version\"><attribute code=\"5.0 Beta\" name=\"code\"/></object><object name=\"template_div0\"><attribute cursor=\"undefined\" name=\"cursor\"/><attribute name=\"type\" type=\"openbexi_button\"/><attribute name=\"subtype\" subtype=\"\"/><attribute name=\"parentId\" parentId=\"BODY\"/><attribute name=\"parentType\" parentType=\"openbexi_body\"/><attribute name=\"theme\" theme=\"default\"/><attribute name=\"subtheme\" subtheme=\"none\"/><attribute name=\"template\" template=\"template/ob_button/default.css\"/><attribute name=\"obzindex\" obzindex=\"0\"/></object><object name=\"template_div1\"><attribute name=\"subtype\" subtype=\"undefined\"/><attribute name=\"subtheme\" subtheme=\"rounded\"/><attribute name=\"type\" type=\"openbexi_dojo_editor\"/><attribute name=\"parentId\" parentId=\"BODY\"/><attribute name=\"parentType\" parentType=\"undefined\"/><attribute cursor=\"undefined\" name=\"cursor\"/><attribute name=\"rss\" rss=\"\"/><attribute name=\"theme\" theme=\"rounded_brown_style_1\"/><attribute name=\"template\" template=\"template/ob_dojo_editor/rounded/rounded_brown_style_1.css\"/><attribute name=\"obzindex\" obzindex=\"1\"/></object></classe></openbexiCreative>";
                OPENBEXI_PAGES_DATA_XML = "<openbexiCreative><object name=\"init\"><attribute init=\"init\" name=\"init\"/></object><classe name=\"ob_ssh\"><object name=\"connection\"><attribute name=\"number\" number=\"0\"/></object></classe><classe name=\"chartflow\"><object name=\"node\"><attribute name=\"count\" count=\"0\"/></object></classe><classe name=\"DOJOeditor\"><object name=\"template_div1\"><attribute name=\"subtype\" subtype=\"none\"/></object></classe><classe name=\"page\"><object name=\"dir\"><attribute file_0=\"template/ob_button/none/gif/*\" name=\"file_0\"/><attribute file_1=\"template/ob_dojo_editor/none/gif/*\" name=\"file_1\"/><attribute file_2=\"template/ob_dojo_editor/rounded/gif/*\" name=\"file_2\"/></object><object name=\"body\"><attribute name=\"background\" background=\"\"/><attribute name=\"image\" image=\"\"/><attribute name=\"bgColor\" bgColor=\"#ffffff\"/><attribute name=\"backgroundRepeat\" backgroundRepeat=\"repeat\"/></object><object name=\"css\"><attribute default=\"template/ob_button/default.css\" name=\"default\"/><attribute name=\"rounded_brown_style_1\" rounded_brown_style_1=\"template/ob_dojo_editor/rounded/rounded_brown_style_1.css\"/></object><object name=\"version\"><attribute code=\"5.0 Beta\" name=\"code\"/></object><object name=\"template_div0\"><attribute cursor=\"undefined\" name=\"cursor\"/><attribute name=\"type\" type=\"openbexi_button\"/><attribute name=\"subtype\" subtype=\"\"/><attribute name=\"parentId\" parentId=\"BODY\"/><attribute name=\"parentType\" parentType=\"openbexi_body\"/><attribute name=\"theme\" theme=\"default\"/><attribute name=\"subtheme\" subtheme=\"none\"/><attribute name=\"template\" template=\"template/ob_button/default.css\"/><attribute name=\"obzindex\" obzindex=\"0\"/></object><object name=\"template_div1\"><attribute name=\"subtype\" subtype=\"undefined\"/><attribute name=\"subtheme\" subtheme=\"rounded\"/><attribute name=\"type\" type=\"openbexi_dojo_editor\"/><attribute name=\"parentId\" parentId=\"BODY\"/><attribute name=\"parentType\" parentType=\"undefined\"/><attribute cursor=\"undefined\" name=\"cursor\"/><attribute name=\"rss\" rss=\"\"/><attribute name=\"theme\" theme=\"rounded_brown_style_3\"/><attribute name=\"template\" template=\"template/ob_dojo_editor/rounded/rounded_brown_style_3.css\"/><attribute name=\"obzindex\" obzindex=\"1\"/></object><object name=\"div1\"><attribute name=\"subtype\" subtype=\"undefined\"/><attribute name=\"subtheme\" subtheme=\"rounded\"/><attribute name=\"type\" type=\"openbexi_dojo_editor\"/><attribute name=\"parentId\" parentId=\"BODY\"/><attribute name=\"parentType\" parentType=\"undefined\"/><attribute cursor=\"undefined\" name=\"cursor\"/><attribute name=\"rss\" rss=\"\"/><attribute name=\"theme\" theme=\"rounded_brown_style_4\"/><attribute name=\"template\" template=\"template/ob_dojo_editor/rounded/rounded_brown_style_4.css\"/><attribute name=\"obzindex\" obzindex=\"1\"/></object></classe></openbexiCreative>";
                OPENBEXI_TEMPLATE_DATA_XML = "<openbexiCreative><object name=\"init\"><attribute init=\"init\" name=\"init\"/></object><classe name=\"ob_ssh\"><object name=\"connection\"><attribute name=\"number\" number=\"0\"/></object></classe><classe name=\"chartflow\"><object name=\"node\"><attribute name=\"count\" count=\"0\"/></object></classe><classe name=\"DOJOeditor\"><object name=\"template_div1\"><attribute name=\"subtype\" subtype=\"none\"/></object></classe><classe name=\"page\"><object name=\"dir\"><attribute file_0=\"template/ob_button/none/gif/*\" name=\"file_0\"/><attribute file_1=\"template/ob_dojo_editor/none/gif/*\" name=\"file_1\"/><attribute file_2=\"template/ob_dojo_editor/rounded/gif/*\" name=\"file_2\"/></object><object name=\"body\"><attribute name=\"background\" background=\"\"/><attribute name=\"image\" image=\"\"/><attribute name=\"bgColor\" bgColor=\"#ffffff\"/><attribute name=\"backgroundRepeat\" backgroundRepeat=\"repeat\"/></object><object name=\"css\"><attribute default=\"template/ob_button/default.css\" name=\"default\"/><attribute name=\"rounded_brown_style_1\" rounded_brown_style_1=\"template/ob_dojo_editor/rounded/rounded_brown_style_1.css\"/></object><object name=\"version\"><attribute code=\"5.0 Beta\" name=\"code\"/></object><object name=\"template_div0\"><attribute cursor=\"undefined\" name=\"cursor\"/><attribute name=\"type\" type=\"openbexi_button\"/><attribute name=\"subtype\" subtype=\"\"/><attribute name=\"parentId\" parentId=\"BODY\"/><attribute name=\"parentType\" parentType=\"openbexi_body\"/><attribute name=\"theme\" theme=\"default\"/><attribute name=\"subtheme\" subtheme=\"none\"/><attribute name=\"template\" template=\"template/ob_button/default.css\"/><attribute name=\"obzindex\" obzindex=\"0\"/></object><object name=\"template_div1\"><attribute name=\"subtype\" subtype=\"undefined\"/><attribute name=\"subtheme\" subtheme=\"rounded\"/><attribute name=\"type\" type=\"openbexi_dojo_editor\"/><attribute name=\"parentId\" parentId=\"BODY\"/><attribute name=\"parentType\" parentType=\"undefined\"/><attribute cursor=\"undefined\" name=\"cursor\"/><attribute name=\"rss\" rss=\"\"/><attribute name=\"theme\" theme=\"rounded_brown_style_1\"/><attribute name=\"template\" template=\"template/ob_dojo_editor/rounded/rounded_brown_style_1.css\"/><attribute name=\"obzindex\" obzindex=\"1\"/></object></classe></openbexiCreative>";
                doc_OPENBEXI_TEMPLATE_DATA_XML = xml.openbexi_loadXML(OPENBEXI_TEMPLATE_DATA_XML);
                doc_OPENBEXI_PAGES_DATA_XML = xml.openbexi_loadXML(OPENBEXI_PAGES_DATA_XML);
                creative_file = new OPENBEXI_Creative_file(null, applicationPath);
                merged_doc = xml.XMLmerge(doc_OPENBEXI_TEMPLATE_DATA_XML, doc_OPENBEXI_PAGES_DATA_XML, "");
                merged_xml_string = xml.XMLSerializer(merged_doc);
                if (merged_xml_string_ref.equals(merged_xml_string))
                    System.out.println("2) test_XMLmerge has been done successfully");
                else
                    System.err.println("2) ERROR: test_XMLmerge has not been done successfully");

            } catch (Exception e) {
                System.err.println(e);
            }
        }
    }
}
