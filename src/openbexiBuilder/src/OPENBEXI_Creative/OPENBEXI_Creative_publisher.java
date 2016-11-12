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
import OPENBEXI.BEXI_FileFinder;

import static OPENBEXI.BEXI_XMLDriver.openbexi_loadXMLFile;

import com.sshtools.j2ssh.SftpClient;
import com.enterprisedt.net.ftp.FileTransferClient;
import org.w3c.dom.Document;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletResponse;
import java.security.PublicKey;
import java.io.File;


public class OPENBEXI_Creative_publisher extends HttpServlet {

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

    /**
     * @param response .
     */
    public OPENBEXI_Creative_publisher(HttpServletResponse response, BEXI_ApplicationPath applicationPath) {
        _response = response;
        _applicationPath = applicationPath;

    }

    static void ob_error(HttpServletResponse response, Document doc) {
        try {
            final BEXI_XMLDriver xml = new BEXI_XMLDriver();
            response.setContentType("text/xml");
            response.setHeader("Cache-Control", "no-cache");
            response.getWriter().write(xml.XMLSerializer(doc));
        } catch (Exception el) {
            System.err.println(el);
        }
    }

    public void publish_project(String fieldRequest, Document docOut) {

        String pageName = null;
        String connection_number = null;
        String host = null;
        int count_issue = 0;
        final BEXI_XMLDriver xml = new BEXI_XMLDriver();
        char sep = ob_getSeparator(_applicationPath.getDefaultWebPagesPath());

        // Connection to the server
        OPENBEXI_Creative_ssh ssh = new OPENBEXI_Creative_ssh(_applicationPath, _response);
        SftpClient sftp = null;
        FileTransferClient ftp = null;
        String exception = null;
        boolean issue = false;

        try {
            connection_number = xml.get_class_object_attribute_value(docOut, "ob_ssh", "connection", "number");
            host = xml.get_class_object_attribute_value(docOut, "ob_ssh", "connection_" + connection_number, "host");
            String PublicKey = xml.get_class_object_attribute_value(docOut, "ob_ssh", "connection_" + connection_number, "PublicKey");

            // Note: if PublicKey = ftp or empty use ftp protocol via  FileTransferClient from LGPL edtFTPj lib
            if (PublicKey.equals("") || PublicKey.equals("FTP") || PublicKey.equals("ftp")) {
                if (ftp == null) ftp = ssh.connect(docOut, PublicKey);
                //else use j2ssh: Java SSH2 GNU API.
            } else {
                if (sftp == null) sftp = ssh.connect(docOut);
            }
        } catch (Exception e1) {
            exception = e1.getMessage();
        }
        if (exception != null || (ftp == null && sftp == null)) {
            try {
                docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "Nok");
                docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + connection_number, "type_0", "warning");
                docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + connection_number, "status_0", "Not connected to " + host + " .Please check your hostname, user name and password.");
                if (_response != null) {
                    _response.setContentType("text/xml");
                    _response.setHeader("Cache-Control", "no-cache");
                    _response.getWriter().write(xml.XMLSerializer(docOut));
                }

            } catch (Exception ea) {
                System.err.println(ea);
            }
        } else {
            try {
                //Create the list of web pages which have to be published
                String[] fileList = null;

                String project = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "project");
                String data_path = _applicationPath.getDefaultPath() + sep + "project" + sep + project + sep + "data";

                if (fieldRequest != null && fieldRequest.equals("openbexi_publishProjectRequest")) {
                    BEXI_FileFinder filefinder = new BEXI_FileFinder();
                    fileList = filefinder.getShortfileList(data_path, ".xml");
                } else {
                    pageName = xml.get_class_object_attribute_value(docOut, "ob_explorer", "file_0", "name");
                    fileList = new String[1];
                    fileList[0] = new String(pageName.replaceAll(".html", ".xml"));
                }

                for (int i = 0; i < fileList.length; i++) {
                    try {
                        Document pageDoc = openbexi_loadXMLFile(data_path + sep + fileList[i]);
                        Document doc = null;
                        int count = 0;
                        doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "dir", "project", project);
                        pageName = fileList[i].replaceAll(".xml", ".html");
                        doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "file_" + count, "name", pageName);
                        doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "dir", "filename", pageName);
                        doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "file_" + count, "type", "web");

                        // Add html and html  project files
                        count++;
                        doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "file_" + count, "name", "project/" + project + "/" + pageName);
                        doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "file_" + count, "type", "web");
                        count++;
                        doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "file_" + count, "type", "web");

                        // Add all dir file TBD
                        String dirs[] = xml.get_xml_classe_object_attributesName(pageDoc, "page", "dir");
                        if (dirs != null) {
                            String dirFile;
                            for (int m = 0; m < dirs.length; m++) {
                                dirFile = xml.get_class_object_attribute_value(pageDoc, "page", "dir", dirs[m]);
                                if (!dirFile.equals("")) {
                                    count++;
                                    doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "file_" + count, "name", dirFile);
                                }
                            }
                        }

                        // Add all img file
                        String imgs[] = xml.get_xml_classe_object_attributesName(pageDoc, "page", "img");
                        if (imgs != null) {
                            String imgFile;
                            for (int k = 0; k < imgs.length; k++) {
                                imgFile = xml.get_class_object_attribute_value(pageDoc, "page", "img", imgs[k]);
                                if (!imgFile.equals("")) {
                                    count++;
                                    doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "file_" + count, "name", imgFile);
                                }
                            }
                        }
                        // Add all media file TBD
                        String medias[] = xml.get_xml_classe_object_attributesName(pageDoc, "page", "media");
                        if (medias != null) {
                            String mediaFile;
                            for (int n = 0; n < medias.length; n++) {
                                mediaFile = xml.get_class_object_attribute_value(pageDoc, "page", "media", medias[n]);
                                if (!medias.equals("")) {
                                    count++;
                                    doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "file_" + count, "name", mediaFile);
                                }
                            }
                        }
                        // Add all javascript files using by the Web page
                        String javascripts[] = xml.get_xml_classe_object_attributesName(pageDoc, "page", "javascript");
                        if (javascripts != null) {
                            String javascriptFile;
                            for (int j = 0; j < javascripts.length; j++) {
                                javascriptFile = xml.get_class_object_attribute_value(pageDoc, "page", "javascript", javascripts[j]);
                                if (!javascriptFile.equals("")) {
                                    count++;
                                    doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "file_" + count, "name", javascriptFile);
                                }
                            }
                        }
                        // Add all data (like json, xml, etc ...) files using by the Web page
                        String data_list[] = xml.get_xml_classe_object_attributesName(pageDoc, "page", "data");
                        if (data_list != null) {
                            String dataFile;
                            for (int j = 0; j < data_list.length; j++) {
                                dataFile = xml.get_class_object_attribute_value(pageDoc, "page", "data", data_list[j]);
                                if (!dataFile.equals("") && !dataFile.equals("null")) {
                                    count++;
                                    doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "file_" + count, "name", dataFile);
                                }
                            }
                        }
                        // add background image
                        String backgroundbody = xml.get_class_object_attribute_value(pageDoc, "page", "body", "image");
                        if (backgroundbody != null && !backgroundbody.equals("")) {
                            count++;
                            doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "file_" + count, "name", backgroundbody);
                        }
                        // add css file
                        String css[] = xml.get_xml_classe_object_attributesName(pageDoc, "page", "css");
                        count++;
                        doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "file_" + count, "name", "css/*");
                        if (css != null) {
                            String cssFile;
                            for (int k = 0; k < css.length; k++) {
                                cssFile = xml.get_class_object_attribute_value(pageDoc, "page", "css", css[k]);
                                if (!cssFile.equals("")) {
                                    count++;
                                    doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "file_" + count, "name", cssFile);
                                }
                            }
                        }

                        // Add all data file
                        count++;
                        doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "file_" + count, "name", "project/" + project + "/data/" + fileList[i]);

                        // Look for and set up connection
                        String website2 = xml.get_class_object_attribute_value(docOut, "ob_ssh", "connection_" + connection_number, "website");
                        String host2 = xml.get_class_object_attribute_value(docOut, "ob_ssh", "connection_" + connection_number, "host");
                        String user2 = xml.get_class_object_attribute_value(docOut, "ob_ssh", "connection_" + connection_number, "user");
                        String passwd2 = xml.get_class_object_attribute_value(docOut, "ob_ssh", "connection_" + connection_number, "passwd");
                        String PublicKey2 = xml.get_class_object_attribute_value(docOut, "ob_ssh", "connection_" + connection_number, "PublicKey");
                        String SocketTimeout2 = xml.get_class_object_attribute_value(docOut, "ob_ssh", "connection_" + connection_number, "SocketTimeout");
                        String path2 = xml.get_class_object_attribute_value(docOut, "ob_ssh", "connection_" + connection_number, "path");

                        doc = xml.set_class_object_attribute_value(doc, "ob_ssh", "connection", "number", connection_number);
                        doc = xml.set_class_object_attribute_value(doc, "ob_ssh", "connection_" + connection_number, "website", website2);
                        doc = xml.set_class_object_attribute_value(doc, "ob_ssh", "connection_" + connection_number, "host", host2);
                        doc = xml.set_class_object_attribute_value(doc, "ob_ssh", "connection_" + connection_number, "user", user2);
                        doc = xml.set_class_object_attribute_value(doc, "ob_ssh", "connection_" + connection_number, "passwd", passwd2);
                        doc = xml.set_class_object_attribute_value(doc, "ob_ssh", "connection_" + connection_number, "PublicKey", PublicKey2);
                        doc = xml.set_class_object_attribute_value(doc, "ob_ssh", "connection_" + connection_number, "SocketTimeout", SocketTimeout2);
                        doc = xml.set_class_object_attribute_value(doc, "ob_ssh", "connection_" + connection_number, "path", path2);
                        doc = xml.set_class_object_attribute_value(doc, "ob_explorer", "remotedir", "path", path2);

                        if (sftp != null)
                            doc = ssh.copy(sftp, doc, i);
                        if (ftp != null)
                            doc = ssh.copy(ftp, doc, i);
                        docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + connection_number, "type_" + i, "info");
                        docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + connection_number, "status_" + i, "The Web page " + pageName + " has been successfully published");
                    } catch (Exception e) {
                        docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "Nok");
                        docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + connection_number, "type_" + i, "error");
                        docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + connection_number, "status_" + i, "Cannot publish the page " + pageName);
                        docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + connection_number, "status_" + i + "_" + count_issue, e.toString());
                        System.err.println(e.getMessage());
                        issue = true;
                        count_issue++;
                    }
                }

            } catch (Exception e) {
                try {
                    docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + connection_number, "type_0", "error");
                    docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + connection_number, "status_0", "Cannot publish the project ");
                    docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + connection_number, "status_0_0", e.toString());
                    issue = true;
                } catch (Exception e1) {
                    System.err.println(e1.getMessage());
                }
                System.err.println(e.getMessage());
            }
            try {
                if (issue == false) {
                    docOut = xml.set_class_object_attribute_value(docOut, "ob_ssh", "connection_" + connection_number, "status", "done");
                    docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "ok");
                } else {
                    docOut = xml.set_class_object_attribute_value(docOut, "openbexi_creative", "application", "status", "Nok");
                    docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "status", "text", exception);
                }
                if (_response != null) {
                    _response.setContentType("text/xml");
                    _response.setHeader("Cache-Control", "no-cache");
                    _response.getWriter().write(xml.XMLSerializer(docOut));
                }
            } catch (Exception e) {
                System.err.println(e);
            }
        }
    }

    public static void main
            (
                    final String[] args) {
        try {
            BEXI_ApplicationPath _applicationPath = new BEXI_ApplicationPath();
            Document docOut = null;
            final BEXI_XMLDriver xml = new BEXI_XMLDriver();
            docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "dir", "project", "no_name");
            OPENBEXI_Creative_publisher publisher = new OPENBEXI_Creative_publisher(null, _applicationPath);
            publisher.publish_project("openbexi_publishProjectRequest", docOut);
        } catch (Exception e) {
            System.err.println(e);
        }
    }
}
