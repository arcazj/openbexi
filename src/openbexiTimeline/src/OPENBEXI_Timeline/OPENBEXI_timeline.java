/* This notice must be untouched at all times.

Copyright (c) 2005-2012 JC Arcaz. All rights reserved.
OPEN OPENBEXI Creative: server side for generating dynanic HTML page and html code source from browsers.Works with OPEN OPENBEXI HTML Builder
updated: April 28 2012 version 4.1
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

package OPENBEXI_Timeline;

import OPENBEXI.BEXI_ApplicationPath;
import OPENBEXI.BEXI_Context;
import OPENBEXI.BEXI_SqlContext;
import OPENBEXI.BEXI_XMLDriver;
import OPENBEXI_Creative.OPENBEXI_Creative_RealTime;
import OPENBEXI_Creative.OPENBEXI_Creative_gui;
import com.sun.org.apache.xerces.internal.parsers.DOMParser;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Enumeration;
import java.util.logging.*;


public class OPENBEXI_timeline extends HttpServlet {

    private HttpServletResponse _response;
    String _bexi_path;
    BEXI_Context _context;
    BEXI_ApplicationPath _applicationPath = null;
    OPENBEXI_Creative_RealTime _realtime = null;

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

    /**
     *
     */
    public OPENBEXI_timeline() {
    }

    /**
     * @param response
     * @param applicationPath
     * @param _bexi_path
     */
    public OPENBEXI_timeline(HttpServletResponse response, BEXI_ApplicationPath applicationPath, String _bexi_path) {
        _response = response;
        _applicationPath = applicationPath;
        _bexi_path = null;
    }

    /**
     * Init OPENBEXI Creative servlet.
     *
     * @param config .
     * @throws javax.servlet.ServletException .
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
        String url = "/openbexi_timeline.html";
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

        //*******************************************************************
        // case
        if (fieldRequest != null && fieldRequest.equals("")) {
            try {
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
        }
    }

    /**
     * Add events.
     *
     * @param docOut .
     * @throws Exception .
     */
    public void addEvents(Document docOut) throws Exception {

        final BEXI_XMLDriver xml = new BEXI_XMLDriver();

        try {
            String value = xml.get_class_object_attribute_value(docOut, "bexicontext", "language", "name");
            System.out.println("OPENBEXI_Creative_context:update --- Current language:" + value);
            if (value != null) _applicationPath.set_defaultLanguage(value);
            value = xml.get_class_object_attribute_value(docOut, "bexicontext", "path", "class");
            if (value != null) _applicationPath.set_defaultMetaRulesPath(value);
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }

        try {
            _response.setContentType("text/xml");
            _response.setHeader("Cache-Control", "no-cache");
            _response.getWriter().write(xml.XMLSerializer(docOut));
        } catch (IOException e) {
            System.err.println(e.getMessage());
        }
    }

    /**
     * Read events from xml file.
     *
     * @param docOut ;
     * @return doc ;
     * @throws Exception ;
     */
    public String readEvents(Document docOut) throws Exception {
        int count = 0;
        String xmlCode = "";
        int maxCount = 0;
        Document doc = null;
        final BEXI_XMLDriver xml = new BEXI_XMLDriver();
        String file = xml.get_class_object_attribute_value(docOut, "ob_request", "timeline", "xmlFile");
        String divName = xml.get_class_object_attribute_value(docOut, "ob_explorer", "gui", "divName");
        String eventCount = xml.get_class_object_attribute_value(docOut, "ob_request", "timeline", "eventCount");
        String mode = xml.get_class_object_attribute_value(docOut, "ob_request", "timeline", "mode");
        int ieventCount = 0;
        if (eventCount == null) ieventCount = 0;
        else
            ieventCount = Integer.parseInt(eventCount);
        String posCurrentEvent = xml.get_class_object_attribute_value(docOut, "ob_request", "timeline", "posCurrentEvent");
        int iposCurrentEvent = 0;
        if (posCurrentEvent == null) iposCurrentEvent = 0;
        else
            iposCurrentEvent = Integer.parseInt(posCurrentEvent);
        int max = iposCurrentEvent + ieventCount;
        File path;
        if (_applicationPath != null)
            path = new File(_applicationPath.getDefaultWebPagesPath());
        else
            path = new File("");
        String path_dir = path.getAbsolutePath() + ob_getSeparator(path.getAbsolutePath());

        Document document = BEXI_XMLDriver.openbexi_loadXMLFile(path_dir + file);
        try {
            if (document == null) return xmlCode;
            Element classe = null;
            NodeList classes = document.getElementsByTagName("data");
            // Look for classe
            if (classes == null || classes.getLength() == 0) {
                return xmlCode;
            }
            // Look for events
            Element object = null;
            boolean objectFound = false;
            NodeList events = document.getElementsByTagName("event");
            if (events.getLength() == 0) {
                return xmlCode;
            } else {
                if (max > events.getLength()) max = events.getLength();
                maxCount = events.getLength();
                if (mode.equals("remote_file")) {
                    xmlCode = "<?xml version=\"1.0\" encoding=\"UTF-8\" ?> " +
                            "<data " +
                            "    wiki-url=\"http://simile.mit.edu/shelf/\" " +
                            "    wiki-section=\"Simile Openbexi Timeline\">";
                }
                for (int i = iposCurrentEvent; i < max; i++) {
                    try {
                        object = (Element) events.item(i);
                        String start = object.getAttribute("start");
                        String end = object.getAttribute("end");
                        String latestStart = object.getAttribute("latestStart");
                        String earliestEnd = object.getAttribute("earliestEnd");
                        String title = object.getAttribute("title");
                        String isDuration = object.getAttribute("isDuration");
                        String link = object.getAttribute("link");
                        String icon = object.getAttribute("icon");
                        String image = object.getAttribute("image");
                        String color = object.getAttribute("color");
                        String textColor = object.getAttribute("textColor");
                        String tapeImage = object.getAttribute("tapeImage");
                        String tapeRepeat = object.getAttribute("tapeRepeat");
                        String caption = object.getAttribute("caption");
                        Node text = object.getFirstChild();
                        //System.out.println(text.getNodeValue());
                        if (mode.equals("remote_file")) {
                            if (!start.equals("")) {
                                xmlCode += "<event start=\"" + start + "\" ";
                                if (!end.equals(""))
                                    xmlCode += "end=\"" + end + "\" ";
                                if (!title.equals(""))
                                    xmlCode += "title=\"" + title + "\" ";
                                if (!latestStart.equals(""))
                                    xmlCode += "latestStart=\"" + latestStart + "\" ";
                                if (!earliestEnd.equals(""))
                                    xmlCode += "earliestEnd=\"" + earliestEnd + "\" ";
                                if (!isDuration.equals(""))
                                    xmlCode += "isDuration=\"" + isDuration + "\" ";
                                if (!link.equals(""))
                                    xmlCode += "link=\"" + link + "\" ";
                                if (!icon.equals(""))
                                    xmlCode += "icon=\"" + icon + "\" ";
                                if (!image.equals(""))
                                    xmlCode += "image=\"" + image + "\" ";
                                if (!color.equals(""))
                                    xmlCode += "color=\"" + color + "\" ";
                                if (!textColor.equals(""))
                                    xmlCode += "textColor=\"" + textColor + "\" ";
                                if (!tapeImage.equals(""))
                                    xmlCode += "tapeImage=\"" + tapeImage + "\" ";
                                if (!tapeRepeat.equals(""))
                                    xmlCode += "tapeRepeat=\"" + tapeRepeat + "\" ";
                                if (!caption.equals(""))
                                    xmlCode += "caption=\"" + caption + "\" ";
                                xmlCode += "> " + text.getNodeValue() + " </event>";
                                count++;
                            }
                        } else {
                            if (!start.equals("")) {
                                doc = xml.set_class_object_attribute_value(doc, "event", divName + "_" + i, "start", start);
                                if (!end.equals(""))
                                    doc = xml.set_class_object_attribute_value(doc, "event", divName + "_" + i, "end", end);
                                if (!title.equals(""))
                                    doc = xml.set_class_object_attribute_value(doc, "event", divName + "_" + i, "title", title);
                                if (!latestStart.equals(""))
                                    doc = xml.set_class_object_attribute_value(doc, "event", divName + "_" + i, "latestStart", latestStart);
                                if (!earliestEnd.equals(""))
                                    doc = xml.set_class_object_attribute_value(doc, "event", divName + "_" + i, "earliestEnd", earliestEnd);
                                if (!isDuration.equals(""))
                                    doc = xml.set_class_object_attribute_value(doc, "event", divName + "_" + i, "isDuration", isDuration);
                                if (!link.equals(""))
                                    doc = xml.set_class_object_attribute_value(doc, "event", divName + "_" + i, "link", link);
                                if (!icon.equals(""))
                                    doc = xml.set_class_object_attribute_value(doc, "event", divName + "_" + i, "icon", icon);
                                if (!image.equals(""))
                                    doc = xml.set_class_object_attribute_value(doc, "event", divName + "_" + i, "image", image);
                                if (!color.equals(""))
                                    doc = xml.set_class_object_attribute_value(doc, "event", divName + "_" + i, "color", color);
                                if (!textColor.equals(""))
                                    doc = xml.set_class_object_attribute_value(doc, "event", divName + "_" + i, "textColor", textColor);
                                if (!tapeImage.equals(""))
                                    doc = xml.set_class_object_attribute_value(doc, "event", divName + "_" + i, "tapeImage", tapeImage);
                                if (!tapeRepeat.equals(""))
                                    doc = xml.set_class_object_attribute_value(doc, "event", divName + "_" + i, "tapeRepeat", tapeRepeat);
                                if (!caption.equals(""))
                                    doc = xml.set_class_object_attribute_value(doc, "event", divName + "_" + i, "caption", caption);
                                if (!text.equals(""))
                                    doc = xml.set_class_object_attribute_value(doc, "event", divName + "_" + i, "text", text.getNodeValue());
                                count++;
                            }
                        }
                    } catch (Exception e) {
                        System.out.println(e.getMessage());
                    }
                }
                if (mode.equals("remote_file")) {
                    xmlCode += "</data>";
                }
                System.out.println("Found " + maxCount + " events\ncount=" + count + "\nposCurrentEvent=" + posCurrentEvent);
                doc = xml.set_class_object_attribute_value(doc, "ob_request", "timeline", "posCurrentEvent", posCurrentEvent);
                doc = xml.set_class_object_attribute_value(doc, "event", divName, "count", String.valueOf(count));
                doc = xml.set_class_object_attribute_value(doc, "event", divName, "maxCount", String.valueOf(maxCount));
                doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "gui", "divName", divName);
                doc = xml.set_class_object_attribute_value(doc, "ob_request", "timeline", "xmlFile", file);
                doc = xml.set_class_object_attribute_value(doc, "ob_request", "timeline", "xmlCode", xmlCode);
                if (iposCurrentEvent == 0)
                    doc = xml.set_class_object_attribute_value(doc, "event", divName, "reload", "true");
                else
                    doc = xml.set_class_object_attribute_value(doc, "event", divName, "reload", "false");
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        try {
            if (_response != null) {
                _response.setContentType("text/xml");
                _response.setHeader("Cache-Control", "no-cache");
                _response.getWriter().write(xml.XMLSerializer(doc));
            }
        } catch (Exception e) {
            System.err.println(e);
        }
        return xmlCode;
    }

    public void createTestXmlFile() throws Exception {
        Date date = new Date();
        System.out.println(date);
        // Create event file
        File[] file_list_source = new File[1];
        BEXI_ApplicationPath applicationPath = new BEXI_ApplicationPath();
        file_list_source[0] = new File(applicationPath.getDefaultPath() + "/data/xml/simile_test.xml");
        String duration = "true";
        // Update version header
        for (int i = 0; i < file_list_source.length; i++) {
            try {

                PrintWriter out = new PrintWriter(file_list_source[0]);
                out.println("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>");
                out.println("<data wiki-url=\"http://www.openbexi.com\" wiki-section=\"Simile openbexi Timeline\">");
                Date now = new Date();
                long ldate;
                ldate = now.getTime();
                SimpleDateFormat dateFileStart = new SimpleDateFormat("MMM dd yyyy hh:mm:ss");
                String sdateFileStart = dateFileStart.format(ldate);

                SimpleDateFormat dateFileEnd = new SimpleDateFormat("MMM dd yyyy hh:mm:ss");
                String sdateFileEnd = dateFileEnd.format(ldate + 100000);

                //Type1
                duration = "false";
                out.println("   <event \n" +
                        "       start=\"" + sdateFileStart + "\"\n" +
                        "       end=\"" + sdateFileStart + "\"\n" +
                        "       isDuration=\"" + duration + "\"\n" +
                        "       title=\"Type1" + "\"\n" +
                        "   >\n" +
                        "    __start=" + sdateFileStart + "\n" +
                        "    __end=" + sdateFileStart + "\n" +
                        "    __isDuration=\"" + duration + "\"\n" +
                        "    __title=\"Type1\"" + "\n" +
                        "   </event>");

                // Type2
                sdateFileStart = dateFileStart.format(ldate + 200000);
                sdateFileEnd = dateFileEnd.format(ldate + 400000);
                duration = "true";
                out.println("   <event \n" +
                        "       start=\"" + sdateFileStart + "\"\n" +
                        "       end=\"" + sdateFileEnd + "\"\n" +
                        "       isDuration=\"" + duration + "\"\n" +
                        "       title=\"Type2" + "\"\n" +
                        "   >\n" +
                        "    __start=" + sdateFileStart + "\n" +
                        "    __end=" + sdateFileEnd + "\n" +
                        "    __isDuration=" + duration + "\n" +
                        "    __title=\"Type2\"" + "\n" +
                        "   </event>");


                // Type3
                sdateFileStart = dateFileStart.format(ldate + 400000);
                sdateFileEnd = dateFileEnd.format(ldate + 700000);
                duration = "true";
                out.println("   <event \n" +
                        "       start=\"" + sdateFileStart + "\"\n" +
                        "       end=\"" + sdateFileEnd + "\"\n" +
                        "       isDuration=\"" + duration + "\"\n" +
                        "       title=\"Type3" + "\"\n" +
                        "       color=\"#A2FAA4" + "\"\n" +
                        "   >\n" +
                        "    __start=" + sdateFileStart + "\n" +
                        "    __end=" + sdateFileEnd + "\n" +
                        "    __isDuration=\"" + duration + "\"\n" +
                        "    __title=\"Type3\"" + "\n" +
                        "    __color=\"#A2FAA4" + "\"\n" +
                        "   </event>");

                // Type4
                sdateFileStart = dateFileStart.format(ldate + 1700000);
                sdateFileEnd = dateFileEnd.format(ldate + 2900000);
                duration = "false";
                out.println("   <event \n" +
                        "       start=\"" + sdateFileStart + "\"\n" +
                        "       end=\"" + sdateFileEnd + "\"\n" +
                        "       isDuration=\"" + duration + "\"\n" +
                        "       title=\"Type4" + "\"\n" +
                        "       color=\"#929692" + "\"\n" +
                        "       icon=\"gif/warning_x22.png" + "\"\n" +
                        "   >\n" +
                        "    __start=" + sdateFileStart + "\n" +
                        "    __end=" + sdateFileEnd + "\n" +
                        "    __isDuration=\"" + duration + "\"\n" +
                        "    __title=\"Type4\"" + "\n" +
                        "    __color=\"#929692" + "\"\n" +
                        "    __icon=\"gif/warning_x22.png" + "\"\n" +
                        "   </event>");

                // Type5
                sdateFileStart = dateFileStart.format(ldate + 2000000);
                sdateFileEnd = dateFileEnd.format(ldate + 2900000);
                duration = "true";
                out.println("   <event \n" +
                        "       start=\"" + sdateFileStart + "\"\n" +
                        "       end=\"" + sdateFileEnd + "\"\n" +
                        "       isDuration=\"" + duration + "\"\n" +
                        "       title=\"Type5" + "\"\n" +
                        "       color=\"#509492" + "\"\n" +
                        "       icon=\"gif/bug_x22.png" + "\"\n" +
                        "   >\n" +
                        "    __start=" + sdateFileStart + "\n" +
                        "    __end=" + sdateFileEnd + "\n" +
                        "    __isDuration=\"" + duration + "\"\n" +
                        "    __title=\"Type5\"" + "\n" +
                        "    __color=\"#509492" + "\"\n" +
                        "    __icon=\"gif/bug_x22.png" + "\"\n" +
                        "   </event>");

                // Type6
                sdateFileStart = dateFileStart.format(ldate + 2000000);
                sdateFileEnd = dateFileEnd.format(ldate + 2900000);
                duration = "false";
                out.println("   <event \n" +
                        "       start=\"" + sdateFileStart + "\"\n" +
                        "       end=\"" + sdateFileEnd + "\"\n" +
                        "       isDuration=\"" + duration + "\"\n" +
                        "       title=\"Type6_link" + "\"\n" +
                        "       color=\"#144092" + "\"\n" +
                        "       icon=\"gif/satellite_x24.png" + "\"\n" +
                        "       link=\"http://www.google.com/" + "\"\n" +
                        "   >\n" +
                        "    __start=" + sdateFileStart + "\n" +
                        "    __end=" + sdateFileEnd + "\n" +
                        "    __isDuration=\"" + duration + "\"\n" +
                        "    __title=\"Type6_link\"" + "\n" +
                        "    __color=\"#144092" + "\"\n" +
                        "    __icon=\"gif/satellite_x24.png" + "\"\n" +
                        "    __link=\"http://www.google.com/" + "\"\n" +
                        "   </event>");

                // Type7
                sdateFileStart = dateFileStart.format(ldate + 4000000);
                sdateFileEnd = dateFileEnd.format(ldate + 4500000);
                duration = "true";
                out.println("   <event \n" +
                        "       start=\"" + sdateFileStart + "\"\n" +
                        "       end=\"" + sdateFileEnd + "\"\n" +
                        "       isDuration=\"" + duration + "\"\n" +
                        "       title=\"Type7_link" + "\"\n" +
                        "       color=\"green" + "\"\n" +
                        "       textColor=\"red" + "\"\n" +
                        "       icon=\"gif/warning_x22.png" + "\"\n" +
                        "       link=\"http://www.google.com/" + "\"\n" +
                        "   >\n" +
                        "    __start=" + sdateFileStart + "\n" +
                        "    __end=" + sdateFileEnd + "\n" +
                        "    __isDuration=\"" + duration + "\"\n" +
                        "    __title=\"Type7_link\"" + "\n" +
                        "    __color=\"green" + "\"\n" +
                        "    __textColor=\"red" + "\"\n" +
                        "    __icon=\"gif/warning_x22.png" + "\"\n" +
                        "    __link=\"http://www.google.com/" + "\"\n" +
                        "   </event>");

                // Type8
                sdateFileStart = dateFileStart.format(ldate + 6000000);
                sdateFileEnd = dateFileEnd.format(ldate + 9500000);
                duration = "true";
                out.println("   <event \n" +
                        "       start=\"" + sdateFileStart + "\"\n" +
                        "       end=\"" + sdateFileEnd + "\"\n" +
                        "       isDuration=\"" + duration + "\"\n" +
                        "       title=\"Type8_link" + "\"\n" +
                        "       color=\"green" + "\"\n" +
                        "       textColor=\"red" + "\"\n" +
                        "       icon=\"gif/error_x22.png" + "\"\n" +
                        "       link=\"http://www.google.com/" + "\"\n" +
                        "   >\n" +
                        "    __start=" + sdateFileStart + "\n" +
                        "    __end=" + sdateFileEnd + "\n" +
                        "    __isDuration=\"" + duration + "\"\n" +
                        "    __title=\"Type8_link\"" + "\n" +
                        "    __color=\"green" + "\"\n" +
                        "    __textColor=\"red" + "\"\n" +
                        "    __icon=\"gif/error_x22.png" + "\"\n" +
                        "    __link=\"http://www.google.com/" + "\"\n" +
                        "   </event>");

                // Type9
                sdateFileStart = dateFileStart.format(ldate + 8000000);
                sdateFileEnd = dateFileEnd.format(ldate + 8500000);
                duration = "false";
                out.println("   <event \n" +
                        "       start=\"" + sdateFileStart + "\"\n" +
                        "       end=\"" + sdateFileEnd + "\"\n" +
                        "       isDuration=\"" + duration + "\"\n" +
                        "       title=\"Type9_link" + "\"\n" +
                        "       color=\"green" + "\"\n" +
                        "       textColor=\"red" + "\"\n" +
                        "       icon=\"gif/error_x22.png" + "\"\n" +
                        "       link=\"http://www.google.com/" + "\"\n" +
                        "   >\n" +
                        "    __start=" + sdateFileStart + "\n" +
                        "    __end=" + sdateFileEnd + "\n" +
                        "    __isDuration=\"" + duration + "\"\n" +
                        "    __title=\"Type9_link\"" + "\n" +
                        "    __color=\"green" + "\"\n" +
                        "    __textColor=\"red" + "\"\n" +
                        "    __icon=\"gif/error_x22.png" + "\"\n" +
                        "    __link=\"http://www.google.com/" + "\"\n" +
                        "   </event>");

                // Type9_bis
                sdateFileStart = dateFileStart.format(ldate + 3500000);
                sdateFileEnd = dateFileEnd.format(ldate + 3500000);
                duration = "false";
                out.println("   <event \n" +
                        "       start=\"" + sdateFileStart + "\"\n" +
                        "       end=\"" + sdateFileEnd + "\"\n" +
                        "       isDuration=\"" + duration + "\"\n" +
                        "       title=\"Type9_bis_link" + "\"\n" +
                        "       color=\"green" + "\"\n" +
                        "       textColor=\"red" + "\"\n" +
                        "       icon=\"gif/info_x24.png" + "\"\n" +
                        "       link=\"http://www.google.com/" + "\"\n" +
                        "   >\n" +
                        "    __start=" + sdateFileStart + "\n" +
                        "    __end=" + sdateFileEnd + "\n" +
                        "    __isDuration=\"" + duration + "\"\n" +
                        "    __title=\"....Type9_bis_link\"" + "\n" +
                        "    __color=\"green" + "\"\n" +
                        "    __textColor=\"red" + "\"\n" +
                        "    __icon=\"gif/info_x24.png" + "\"\n" +
                        "    __link=\"http://www.google.com/" + "\"\n" +
                        "   </event>");

                // Type10
                sdateFileStart = dateFileStart.format(ldate + 10000000);
                sdateFileEnd = dateFileEnd.format(ldate + 11500000);
                duration = "false";
                out.println("   <event \n" +
                        "       start=\"" + sdateFileStart + "\"\n" +
                        "       end=\"" + sdateFileEnd + "\"\n" +
                        "       isDuration=\"" + duration + "\"\n" +
                        "       title=\"Type10_link_image" + "\"\n" +
                        "       color=\"red" + "\"\n" +
                        "       textColor=\"green" + "\"\n" +
                        "       icon=\"gif/warning_x22.png" + "\"\n" +
                        "       link=\"http://www.google.com/" + "\"\n" +
                        "       image=\"gif/bexi_no_transparency.png" + "\"\n" +
                        "   >\n" +
                        "    __start=" + sdateFileStart + "\n" +
                        "    __end=" + sdateFileEnd + "\n" +
                        "    __isDuration=\"" + duration + "\"\n" +
                        "    __title=\"Type10_link_image\"" + "\n" +
                        "    __color=\"red" + "\"\n" +
                        "    __textColor=\"green" + "\"\n" +
                        "    __icon=\"gif/warning_x22.png" + "\"\n" +
                        "    __link=\"http://www.google.com/" + "\"\n" +
                        "    __image=\"gif/bexi_no_transparency.png" + "\"\n" +
                        "   </event>");

                // Type11
                sdateFileStart = dateFileStart.format(ldate + 12500000);
                sdateFileEnd = dateFileEnd.format(ldate + 13500000);
                duration = "false";
                out.println("   <event \n" +
                        "       start=\"" + sdateFileStart + "\"\n" +
                        "       end=\"" + sdateFileEnd + "\"\n" +
                        "       isDuration=\"" + duration + "\"\n" +
                        "       title=\"Type11_link_image_repeat" + "\"\n" +
                        "       color=\"red" + "\"\n" +
                        "       tapeImage=\"gif/next_small.png" + "\"\n" +
                        "       tapeRepeat=\"repeat-x" + "\"\n" +
                        "       textColor=\"green" + "\"\n" +
                        "       icon=\"gif/warning_x22.png" + "\"\n" +
                        "       link=\"http://www.google.com/" + "\"\n" +
                        "       image=\"gif/bexi_no_transparency.png" + "\"\n" +
                        "       caption=\"http://www.google.com" + "\"\n" +
                        "   >\n" +
                        "    __start=" + sdateFileStart + "\n" +
                        "    __end=" + sdateFileEnd + "\n" +
                        "    __isDuration=\"" + duration + "\"\n" +
                        "    __title=\"Type11_link_image_repeat\"" + "\n" +
                        "    __color=\"red" + "\"\n" +
                        "    __tapeImage=\"gif/next_small.png" + "\"\n" +
                        "    __tapeRepeat=\"repeat-x" + "\"\n" +
                        "    __textColor=\"green" + "\"\n" +
                        "    __icon=\"gif/warning_x22.png" + "\"\n" +
                        "    __link=\"http://www.google.com/" + "\"\n" +
                        "    __image=\"gif/bexi_no_transparency.png" + "\"\n" +
                        "    __caption=\"http://www.google.com" + "\"\n" +
                        "   </event>");

                // Type11_2
                sdateFileStart = dateFileStart.format(ldate + 12500000);
                sdateFileEnd = dateFileEnd.format(ldate + 13500000);
                duration = "true";
                out.println("   <event \n" +
                        "       start=\"" + sdateFileStart + "\"\n" +
                        "       end=\"" + sdateFileEnd + "\"\n" +
                        "       isDuration=\"" + duration + "\"\n" +
                        "       title=\"Type11_2_link_image_repeat" + "\"\n" +
                        "       color=\"red" + "\"\n" +
                        "       tapeImage=\"gif/next_small.png" + "\"\n" +
                        "       tapeRepeat=\"repeat-x" + "\"\n" +
                        "       textColor=\"green" + "\"\n" +
                        "       icon=\"gif/warning_x22.png" + "\"\n" +
                        "       link=\"http://www.google.com/" + "\"\n" +
                        "       image=\"gif/bexi_no_transparency.png" + "\"\n" +
                        "       caption=\"http://www.google.com" + "\"\n" +
                        "   >\n" +
                        "    __start=" + sdateFileStart + "\n" +
                        "    __end=" + sdateFileEnd + "\n" +
                        "    __isDuration=\"" + duration + "\"\n" +
                        "    __title=\"Type11_2_link_image_repeat\"" + "\n" +
                        "    __color=\"red" + "\"\n" +
                        "    __tapeImage=\"gif/next_small.png" + "\"\n" +
                        "    __tapeRepeat=\"repeat-x" + "\"\n" +
                        "    __textColor=\"green" + "\"\n" +
                        "    __icon=\"gif/warning_x22.png" + "\"\n" +
                        "    __link=\"http://www.google.com/" + "\"\n" +
                        "    __image=\"gif/bexi_no_transparency.png" + "\"\n" +
                        "    __caption=\"http://www.google.com" + "\"\n" +
                        "   </event>");
                // Type11_3
                sdateFileStart = dateFileStart.format(ldate + 12500000);
                sdateFileEnd = dateFileEnd.format(ldate + 19500000);
                duration = "false";
                out.println("   <event \n" +
                        "       start=\"" + sdateFileStart + "\"\n" +
                        "       end=\"" + sdateFileEnd + "\"\n" +
                        "       isDuration=\"" + duration + "\"\n" +
                        "       title=\"Type11_3_link_image_repeat" + "\"\n" +
                        "       color=\"white" + "\"\n" +
                        "       tapeImage=\"gif/maneuver.png" + "\"\n" +
                        "       tapeRepeat=\"no-repeat" + "\"\n" +
                        "       textColor=\"green" + "\"\n" +
                        "       link=\"http://www.google.com/" + "\"\n" +
                        "       image=\"gif/bexi_no_transparency.png" + "\"\n" +
                        "       caption=\"http://www.google.com" + "\"\n" +
                        "   >\n" +
                        "    __start=" + sdateFileStart + "\n" +
                        "    __end=" + sdateFileEnd + "\n" +
                        "    __isDuration=\"" + duration + "\"\n" +
                        "    __title=\"Type11_3_link_image_repeat\"" + "\n" +
                        "    __color=\"white" + "\"\n" +
                        "    __tapeImage=\"gif/maneuver.png" + "\"\n" +
                        "    __tapeRepeat=\"no-repeat" + "\"\n" +
                        "    __textColor=\"green" + "\"\n" +
                        "    __link=\"http://www.google.com/" + "\"\n" +
                        "    __image=\"gif/bexi_no_transparency.png" + "\"\n" +
                        "    __caption=\"http://www.google.com" + "\"\n" +
                        "   </event>");

                out.println("</data>");
                out.flush();
                out.close();
            } catch (Exception e) {

            }
        }

        Date dateEnd = new Date();
        System.out.println(dateEnd);

    }

    public static void main(final String[] args) {

        OPENBEXI_timeline timeline = new OPENBEXI_timeline(null, null, null);
        boolean create_test = true;
        boolean create_timeline_client = false;
        if (create_test)
            try {
                timeline.createTestXmlFile();

            } catch (Exception e) {
                e.getMessage();
                System.exit(0);
            }
    }
}
