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
import OPENBEXI.BEXI_FileFinder;
import OPENBEXI.BEXI_XMLDriver;
import com.sshtools.j2ssh.sftp.SftpFile;
import com.enterprisedt.net.ftp.FTPFile;
import org.w3c.dom.Document;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;


public class OPENBEXI_Creative_explorer extends HttpServlet {

    private HttpServletResponse _response;
    private BEXI_ApplicationPath _applicationPath;

    /**
     * @param response        .
     * @param applicationPath .
     */
    public OPENBEXI_Creative_explorer(HttpServletResponse response, BEXI_ApplicationPath applicationPath) {
        _response = response;
        _applicationPath = applicationPath;

    }

    public String ob_getPathUp(String path) {
        File pathUp = new File(path);
        String newpath = pathUp.getParent();
        if (newpath == null)
            return path;
        else
            return newpath;
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

    private String ob_replaceAllChar(String str, char c1, char c2) {
        String newStr = "";
        for (int i = 0; i < str.length(); i++) {
            if (str.charAt(i) == c1) {
                newStr += c2;
            } else {
                newStr += str.charAt(i);
            }
        }
        return newStr;
    }

    public boolean ob_ifParent(String path) {
        return !(path == null || path.length() == 1 || (path.contains(":") && path.length() < 4));
    }

    private String ob_getPathParent2(String path) {
        String newPath = "";
        int count = 0;
        for (int i = path.length() - 1; i >= 0; i--) {
            if ((path.charAt(i) == '/' || path.charAt(i) == '\\') && i != path.length()) {
                newPath = path.substring(0, path.length() - count - 1);
                if (newPath.equals("")) newPath = String.valueOf(ob_getSeparator(path));
                return newPath;
            }
            count++;
        }
        if (newPath.equals("")) newPath = String.valueOf(ob_getSeparator(path));
        return newPath;
    }

    public String ob_getPathParent(String path) {
        if (path == null) return null;
        boolean flag = ob_ifParent(path);
        if (!flag) return path;
        String sep = String.valueOf(ob_getSeparator(path));

        File file = new File(path);
        String parent = file.getParent();
        try {
            if (sep.equals("\\"))
                parent = parent.replaceAll("/", sep);
            if (sep.equals("/"))
                parent = ob_replaceAllChar(path, '\\', '/');
        } catch (Exception e) {
            parent = path;
        }
        if (path.equals(parent)) parent = ob_getPathParent2(path);
        return parent;
    }

    /**
     * get openbexi explorer objects.
     *
     * @param docOut .
     * @return document to client .
     * @throws Exception .
     */
    public Document getObjects(Document docOut) throws Exception {
        final BEXI_XMLDriver xml = new BEXI_XMLDriver();
        final BEXI_XMLDriver xmlResponse = new BEXI_XMLDriver();
        String current_path = null;
        String path_dir = null;
        String filter = null;
        String fileFilter = null;
        String nextPreviousStatus;
        int maxItems = 0;
        int maxCountFiles = 0;
        int posCurrentItem = 0;

        String subtype = xmlResponse.get_class_object_attribute_value(docOut, "ob_request", "request", "subtype");
        String dirType = xmlResponse.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "type");
        String project = xmlResponse.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "project");
        String templateCategory = xml.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "templateCategory");
        String number = xmlResponse.get_class_object_attribute_value(docOut, "ob_ssh", "connection", "number");
        String pagerNumber = xmlResponse.get_class_object_attribute_value(docOut, "ob_explorer", "pager", "number");
        current_path = xmlResponse.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "path");
        filter = xmlResponse.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "filter");
        if (filter.equals("none")) filter = "";
        fileFilter = xmlResponse.get_class_object_attribute_value(docOut, "ob_explorer", "file", "filter");
        String dirname = xmlResponse.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "dirname");
        String objectType = xmlResponse.get_class_object_attribute_value(docOut, "ob_request", "request", "objectType");
        /*
        System.out.println("--------connection       =" + xmlResponse.get_class_object_attribute_value(docOut, "ob_ssh", "connection", "number"));
        System.out.println("--------subtype          =" + xmlResponse.get_class_object_attribute_value(docOut, "ob_request", "request", "subtype"));
        System.out.println("--------dirUp            =" + xmlResponse.get_class_object_attribute_value(docOut, "ob_explorer", "dirUp", "path"));
        System.out.println("--------path             =" + xmlResponse.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "path"));
        System.out.println("--------type             =" + xmlResponse.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "type"));
        System.out.println("--------objectCount      =" + xmlResponse.get_class_object_attribute_value(docOut, "ob_explorer", "file", "objectCount"));
        System.out.println("--------objectMaxCount   =" + xmlResponse.get_class_object_attribute_value(docOut, "ob_explorer", "file", "objectMaxCount"));
        System.out.println("--------posCurrentItem   =" + xmlResponse.get_class_object_attribute_value(docOut, "ob_explorer", "list", "posCurrentItem"));
        System.out.println("--------pagerNumber      =" + xmlResponse.get_class_object_attribute_value(docOut, "ob_explorer", "pager", "number"));
        System.out.println("--------filter           =" + xmlResponse.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "filter"));
        System.out.println("--------fileFilter=" + xmlResponse.get_class_object_attribute_value(docOut, "ob_explorer", "file", "filter"));
        System.out.println("--------status           =" + xmlResponse.get_class_object_attribute_value(docOut, "ob_explorer", "status", "text"));
        System.out.println("--------status connection=" + xmlResponse.get_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "text"));
        System.out.println("--------dirname          =" + xmlResponse.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "dirname"));
        System.out.println("--------objectType       =" + xmlResponse.get_class_object_attribute_value(docOut, "ob_request", "request", "objectType"));
        */

        String parent = null;
        int max = 0;
        int countFile = 0;
        BEXI_FileFinder filefinder = null;
        try {
            filefinder = new BEXI_FileFinder();
            if (subtype.equals("google")) {
                posCurrentItem = Integer.parseInt(xml.get_class_object_attribute_value(docOut, "ob_explorer", "list", "posCurrentItem"));
                if (pagerNumber == null) pagerNumber = "0";
                if (pagerNumber.equals("next")) pagerNumber = String.valueOf((posCurrentItem / 10) + 1);
                if (pagerNumber.equals("previous")) {
                    pagerNumber = String.valueOf((posCurrentItem / 10) - 1);
                    if (pagerNumber.equals("-1"))
                        pagerNumber = "0";
                }
                if (pagerNumber.equals("previousBegin")) pagerNumber = "0";
                if (pagerNumber.equals("nextEnd")) pagerNumber = String.valueOf((posCurrentItem / 10) + 1);
                int step = (Integer.parseInt(pagerNumber) * 10) + 1;
                String imgSize = "";
                if (filter.equals("")) filter = "icon";
                if (fileFilter.equals("img_small")) imgSize = filter;
                if (fileFilter.equals("img_medium")) imgSize = "small|medium|large|xlarge";
                if (fileFilter.equals("img_large")) imgSize = "xxlarge";
                filter = filter.replaceAll(" ", "+");
                String url = "http://images.google.com/images?q=" + filter + "&imgsz=icon&ndsp=21&svnum=10&um=1&hl=en&rls=com.microsoft:en-us:IE-SearchBox&rlz=1I7HPIA&start=" + step + "&sa=N" + "&imgsz=" + imgSize;
                System.out.println("url=" + url);
                OPENBEXI_Creative_google ob_google = new OPENBEXI_Creative_google(null, null);
                docOut = ob_google.readImageFromURL(docOut, url);
                docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_request", "request", "subtype", "google");
                countFile = ob_google.get_countValiding();
                if (countFile <= maxItems) maxCountFiles = (Integer.parseInt(pagerNumber) * 10) + countFile;
                else
                    maxCountFiles = 100;
            } else if (subtype.equals("drives")) {
                filefinder.findDrives();
                docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_request", "request", "subtype", "drives");
            } else if (subtype.equals("database") || subtype.equals("database_table")) {
                filefinder.findTables(_applicationPath);
                docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_request", "request", "subtype", "database_table");
            } else if (subtype.equals("database_table_attribute")) {
                String table = xmlResponse.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "filename");
                filefinder.findTablesAttribute(_applicationPath, table);
                docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_request", "request", "subtype", "database_table_attribute");
            } else if (subtype.equals("sftp")) {
                if (dirType.equals("dir_up")) {
                    path_dir = ob_getPathParent(current_path);
                    docOut = xmlResponse.set_class_object_attribute_value(docOut, "system", "command", "text", "cd " + path_dir);
                } else if (dirType.equals("dir")) {
                    path_dir = current_path + ob_getSeparator(current_path) + dirname;
                    docOut = xmlResponse.set_class_object_attribute_value(docOut, "system", "command", "text", "cd " + path_dir);
                } else {
                    if (current_path != null) {
                        path_dir = current_path + ob_getSeparator(current_path);
                        docOut = xmlResponse.set_class_object_attribute_value(docOut, "system", "command", "text", "cd " + path_dir);
                    } else {
                        docOut = xmlResponse.set_class_object_attribute_value(docOut, "system", "command", "text", "cd .");
                    }
                }
                OPENBEXI_Creative_ssh ssh = new OPENBEXI_Creative_ssh(_applicationPath,_response);
                docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_request", "request", "subtype", "sftp");
                filefinder = ssh.getObjects(docOut);
                parent = filefinder.getAbsolutePath();
            } else if (subtype.equals("sftpinit")) {
                docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_request", "request", "subtype", "sftp");
            } else if (subtype.equals("webPages") || subtype.equals("webTemplates") || subtype.equals("webProjects") || subtype.equals("webTemplateCategory") || subtype.equals("delete_webPages") || subtype.equals("delete_webPageTemplates") || subtype.equals("create_webTemplateCategory") || subtype.equals("delete_webTemplateCategory") || subtype.equals("create_webPages") || subtype.equals("webPageTemplates") || subtype.equals("create_webPageTemplates") || subtype.equals("create_webProjects") || subtype.equals("delete_webProjects") || subtype.equals("archives") || subtype.equals("archiveTemplates") || subtype.equals("templates") || subtype.equals("javascripts") || subtype.equals("dirJavascripts") || subtype.equals("timelineEvents") || subtype.equals("chartXML") || subtype.equals("RSS") || subtype.equals("timelineBands") || subtype.equals("timelineThemes")) {
                docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_request", "request", "subtype", subtype);
                File file = new File(_applicationPath.getDefaultWebPagesPath());
                if (subtype.equals("timelineBands") || subtype.equals("timelineThemes")) {
                    path_dir = file.getAbsolutePath() + ob_getSeparator(file.getAbsolutePath()) + dirname;
                    filefinder.find(new File(path_dir), BEXI_FileFinder.FILE, null, ".js", null);
                } else if (subtype.equals("javascripts")) {
                    path_dir = file.getAbsolutePath() + ob_getSeparator(file.getAbsolutePath()) + dirname;
                    filefinder.find(new File(path_dir), BEXI_FileFinder.FILE, null, ".js", null);
                } else if (subtype.equals("dirJavascripts")) {
                    path_dir = file.getAbsolutePath() + ob_getSeparator(file.getAbsolutePath()) + dirname;
                    filefinder.find(new File(path_dir), BEXI_FileFinder.DIRECTORY, null);
                } else if (subtype.equals("timelineEvents") || subtype.equals("chartXML") || subtype.equals("RSS")) {
                    path_dir = file.getAbsolutePath() + ob_getSeparator(file.getAbsolutePath()) + dirname;
                    filefinder.find(new File(path_dir), BEXI_FileFinder.FILE, null, ".xml", null);
                } else if (subtype.equals("archives")) {
                    path_dir = file.getAbsolutePath() + ob_getSeparator(file.getAbsolutePath()) + "project" + ob_getSeparator(file.getAbsolutePath()) + project + ob_getSeparator(file.getAbsolutePath()) + "archives";
                    filefinder.find(new File(path_dir), BEXI_FileFinder.FILE, filter, ".html", fileFilter);
                    filefinder.sort_files_per_date(true);
                } else if (subtype.equals("archiveTemplates")) {
                    path_dir = file.getAbsolutePath() + ob_getSeparator(file.getAbsolutePath()) + "template" + ob_getSeparator(file.getAbsolutePath()) + "ob_project" + ob_getSeparator(file.getAbsolutePath()) + templateCategory + ob_getSeparator(file.getAbsolutePath()) + "archives";
                    filefinder.find(new File(path_dir), BEXI_FileFinder.FILE, filter, ".html", fileFilter);
                    filefinder.sort_files_per_date(true);
                } else if (subtype.equals("templates")) {
                    path_dir = file.getAbsolutePath() + ob_getSeparator(file.getAbsolutePath()) + dirname;
                    filefinder.findTemplate(new File(path_dir), BEXI_FileFinder.FILE, null, ".css");
                } else if (subtype.equals("webProjects") || subtype.equals("create_webProjects") || subtype.equals("delete_webProjects")) {
                    path_dir = file.getAbsolutePath() + ob_getSeparator(file.getAbsolutePath()) + "project";
                    filefinder.find(new File(path_dir), BEXI_FileFinder.DIRECTORY, null);
                } else if (subtype.equals("webTemplateCategory") || subtype.equals("create_webTemplateCategory") || subtype.equals("delete_webTemplateCategory")) {
                    path_dir = file.getAbsolutePath() + ob_getSeparator(file.getAbsolutePath()) + "template" + ob_getSeparator(file.getAbsolutePath()) + "ob_project";
                    filefinder.find(new File(path_dir), BEXI_FileFinder.DIRECTORY, null);
                } else if (subtype.equals("webTemplates") || subtype.equals("webPageTemplates") || subtype.equals("create_webPageTemplates") || subtype.equals("delete_webPageTemplates")) {
                    path_dir = file.getAbsolutePath() + ob_getSeparator(file.getAbsolutePath()) + "template" + ob_getSeparator(file.getAbsolutePath()) + "ob_project" + ob_getSeparator(file.getAbsolutePath()) + templateCategory ;
                    filefinder.find(new File(path_dir), BEXI_FileFinder.FILE, filter, fileFilter);
                } else {
                    path_dir = file.getAbsolutePath() + ob_getSeparator(file.getAbsolutePath()) + "project" + ob_getSeparator(file.getAbsolutePath()) + project;
                    filefinder.find(new File(path_dir), BEXI_FileFinder.FILE, filter, fileFilter);
                }

                current_path = path_dir;
                parent = ob_getPathParent(current_path);
            } else if (subtype.equals("local")) {
                docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_request", "request", "subtype", subtype);
                if (current_path == null) {
                    File file = new File(_applicationPath.getDefaultPath());
                    path_dir = file.getCanonicalPath() + ob_getSeparator(file.getAbsolutePath()) + dirname;
                    current_path = path_dir;
                    parent = ob_getPathParent(current_path);
                } else if (current_path.equals("")) {
                    path_dir = dirname;
                    current_path = dirname;
                    parent = ob_getPathParent(current_path);
                } else {
                    if (dirType.equals("dir_up")) {
                        path_dir = ob_getPathParent(current_path);
                        parent = path_dir;
                    } else if (dirType.equals("dir_next") || dirType.equals("dir_previous")) {
                        path_dir = current_path;
                        parent = current_path;
                    } else {
                        String filename = xmlResponse.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "filename");
                        path_dir = current_path + ob_getSeparator(current_path) + filename;
                        current_path = path_dir;
                        parent = current_path;
                    }
                }
                filefinder.find(new File(path_dir), BEXI_FileFinder.FILE, filter, fileFilter);
            } else {
                System.out.println("subtype = ???");
            }
        } catch (Exception e) {
            return null;
        }

        docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "dir", "path", path_dir);
        docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "dir", "parent", parent);
        boolean root = ob_ifParent(parent);
        if (root)
            docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "dirUp", "path", "ok");
        else
            docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "dirUp", "path", "none");

        if (subtype.equals("templates"))
            docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "dirUp", "path", "none");
        if (subtype.equals("javascripts") && dirname.equals("js"))
            docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "dirUp", "path", "none");
        if (subtype.equals("timelineBands") && dirname.equals("js"))
            docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "dirUp", "path", "none");
        if (subtype.equals("timelineThemes") && dirname.equals("js"))
            docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "dirUp", "path", "none");
        if (subtype.equals("timelineEvents") && dirname.equals("data/xml"))
            docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "dirUp", "path", "none");
        if (subtype.equals("chartXML") && dirname.equals("data/xml"))
            docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "dirUp", "path", "none");
        if (subtype.equals("RSS") && dirname.equals("data/rss"))
            docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "dirUp", "path", "none");
        if ((subtype.equals("archives") || subtype.equals("archiveTemplates")) && dirname.equals("archives"))
            docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "dirUp", "path", "none");
        if (subtype.equals("webPages"))
            docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "dirUp", "path", "Create a new page");
        if (subtype.equals("webTemplates"))
            docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "dirUp", "path", "Create a new template");
        if (subtype.equals("create_webPageTemplates") || subtype.equals("delete_webPageTemplates"))
            docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "dirUp", "path", "Create a new template");
        if (subtype.equals("webPageTemplates"))
            docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "dirUp", "path", "Create a new template");
        if (subtype.equals("create_webPages"))
            docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "dirUp", "path", "Create a new page");
        if (subtype.equals("webProjects"))
            docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "dirUp", "path", "Create a new project");
        if (subtype.equals("webTemplateCategory"))
            docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "dirUp", "path", "Create a new template category");
        if (subtype.equals("database"))
            docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "dirUp", "path", "none");
        if (subtype.equals("database_table") || subtype.equals("database_table_attribute"))
            docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "dirUp", "path", "up");

        //System.out.println("parent =" + parent);
        Object object;

        maxItems = Integer.parseInt(xml.get_class_object_attribute_value(docOut, "ob_explorer", "list", "maxItems"));
        posCurrentItem = Integer.parseInt(xml.get_class_object_attribute_value(docOut, "ob_explorer", "list", "posCurrentItem"));
        nextPreviousStatus = xml.get_class_object_attribute_value(docOut, "ob_explorer", "list", "nextPreviousStatus");
        docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "list", "nextFlag", "next");
        docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "list", "previousFlag", "previous");
        int newposCurrentItem = 0;
        max = maxItems;
        if (!subtype.equals("google")) maxCountFiles = filefinder.get_files().size();
        if (nextPreviousStatus.equals("next")) {
            if (posCurrentItem == 0) {
                posCurrentItem = maxItems;
                max = posCurrentItem + maxItems;
                newposCurrentItem = posCurrentItem;
                docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "list", "nextFlag", "next");
                if ((maxCountFiles - posCurrentItem) < maxItems)
                    docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "list", "nextFlag", "null");
                else
                    docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "list", "nextFlag", "next");
            } else if ((maxCountFiles - posCurrentItem) <= maxItems) {
                max = posCurrentItem + (maxCountFiles - posCurrentItem);
                newposCurrentItem = posCurrentItem;
                docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "list", "nextFlag", "null");
            } else {
                posCurrentItem = posCurrentItem + maxItems;
                max = posCurrentItem + maxItems;
                newposCurrentItem = posCurrentItem;
                docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "list", "nextFlag", "next");
                docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "list", "previousFlag", "previous");
                if ((maxCountFiles - posCurrentItem) < maxItems)
                    docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "list", "nextFlag", "null");
                else
                    docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "list", "nextFlag", "next");
            }
        } else if (nextPreviousStatus.equals("previous")) {
            if (posCurrentItem == 0) {
                max = maxItems;
                newposCurrentItem = 0;
                docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "list", "previousFlag", "null");
            } else {
                posCurrentItem = posCurrentItem - maxItems;
                max = posCurrentItem + maxItems;
                newposCurrentItem = posCurrentItem;
                if (posCurrentItem < maxItems)
                    docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "list", "previousFlag", "null");
            }
        } else {
            if (pagerNumber == null || pagerNumber.equals("") || pagerNumber.equals("none")) pagerNumber = "0";
            if (pagerNumber == null || pagerNumber.equals("previousBegin")) pagerNumber = "0";
            if (pagerNumber == null || pagerNumber.equals("nextEnd"))
                pagerNumber = String.valueOf(maxCountFiles / maxItems);
            newposCurrentItem = Integer.valueOf(pagerNumber) * maxItems;
            posCurrentItem = newposCurrentItem;
            max = posCurrentItem + maxItems;
            docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "list", "previousFlag", "null");
            if ((maxCountFiles - posCurrentItem) <= maxItems) {
                docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "list", "nextFlag", "null");
            }
        }
        if (!subtype.equals("google")) {
            if (filefinder.get_files().size() < max) max = filefinder.get_files().size();
            maxCountFiles = filefinder.get_files().size();
            for (int j = posCurrentItem; j < max; j++) {
                object = filefinder.get_files().get(j);
                String type = null;
                if (object instanceof File) {
                    File file = (File) object;
                    if (subtype.equals("drives")) {
                        docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "file_" + countFile, "filename", file.getPath());
                        docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "file_" + countFile, "type", "dir");
                        countFile++;
                    } else if (subtype.equals("templates")) {
                        type = filefinder.findFileType(object);
                        docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "file_" + countFile, "filename", file.getName().replaceAll(".jpg", ""));
                        docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "file_" + countFile, "type", type);
                        docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "file_" + countFile, "icon", file.getName());
                        //System.out.println("filename=" +file.getName().replaceAll(".jpg",""));
                        //System.out.println("icon=" +file.getName());
                        countFile++;
                    } else if (subtype.equals("webPages") || subtype.equals("webTemplates") || subtype.equals("create_webPages") || subtype.equals("delete_webPages") || subtype.equals("webPageTemplates") || subtype.equals("create_webPageTemplates") || subtype.equals("delete_webPageTemplates")) {
                        type = filefinder.findFileType(object);
                        if (type.equals("web")) {
                            docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "file_" + countFile, "filename", file.getName());
                            docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "file_" + countFile, "type", type);
                            countFile++;
                        }
                    } else if (subtype.equals("dirJavascripts")) {
                        type = filefinder.findFileType(object);
                        docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "file_" + countFile, "filename", file.getName());
                        docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "file_" + countFile, "type", type);
                        countFile++;
                        String path_JS = file.getAbsolutePath() + ob_getSeparator(file.getAbsolutePath());
                        BEXI_FileFinder JSfinder = new BEXI_FileFinder();
                        JSfinder.find(new File(path_JS), BEXI_FileFinder.FILE, ".js", fileFilter);
                        int maxWEBPage = JSfinder.get_files().size();
                        int countJSFile = 0;
                        File JSFile;
                        for (int k = 0; k < maxWEBPage; k++) {
                            JSFile = (File) JSfinder.get_files().get(k);
                            type = JSfinder.findFileType(JSFile);
                            if (type.equals("js")) {
                                docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", file.getName() + "_" + countJSFile, "filename", JSFile.getName());
                                countJSFile++;
                            }
                        }
                        docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", file.getName(), "objectMaxCount", String.valueOf(countJSFile));
                    } else if ( subtype.equals("delete_webTemplateCategory") || subtype.equals("create_webTemplateCategory")) {
                        type = filefinder.findFileType(object);
                        if (!file.getName().equals("ob_dojo_editor") && !file.getName().equals("ob_img") && !file.getName().equals("ob_link") && !file.getName().equals("ob_calendar") && !file.getName().equals("ob_timeline") && !file.getName().equals("ob_project") && !file.getName().equals("ob_button") && !file.getName().equals("ob_form") && !file.getName().equals("ob_list") && !file.getName().equals("ob_grid")&& !file.getName().equals("ob_tree")&& !file.getName().equals("ob_chart")) {
                            docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "file_" + countFile, "filename", file.getName());
                            docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "file_" + countFile, "type", type);
                            countFile++;
                        }
                    } else {
                        type = filefinder.findFileType(object);
                        docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "file_" + countFile, "filename", file.getName());
                        docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "dir", "source_path", file.getParent().replaceAll("/|\\\\","#"));
                        docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "file_" + countFile, "type", type);
                        countFile++;
                         if (_applicationPath != null && !file.getPath().contains("gifPlus")) {
                            File newFile = new File(_applicationPath.getDefaultPath() + ob_getSeparator(_applicationPath.getDefaultPath()) + "gifPlus" + ob_getSeparator(_applicationPath.getDefaultPath()) + file.getName());
                            if (file.getName().equals(newFile.getName()) && (type.equals("img") || type.equals("video") || type.equals("audio") || type.equals("flash"))) {
                                if (!newFile.exists() && newFile.length() != file.length())
                                    OPENBEXI_Creative_file.ob_copyFile(file, newFile);
                            }
                        }
                        if (subtype.equals("webProjects")||subtype.equals("webTemplateCategory")) {
                            String path_project = file.getAbsolutePath() + ob_getSeparator(file.getAbsolutePath());
                            BEXI_FileFinder webPagefinder = new BEXI_FileFinder();
                            webPagefinder.find(new File(path_project), BEXI_FileFinder.FILE, filter, fileFilter);
                            int maxWEBPage = webPagefinder.get_files().size();
                            int countWEBPage = 0;
                            File webPage;
                            for (int k = 0; k < maxWEBPage; k++) {
                                webPage = (File) webPagefinder.get_files().get(k);
                                type = webPagefinder.findFileType(webPage);
                                if (type.equals("web")) {
                                    docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", file.getName() + "_" + countWEBPage, "filename", webPage.getName());
                                    countWEBPage++;
                                }
                            }
                            docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", file.getName(), "objectMaxCount", String.valueOf(countWEBPage));
                        }
                    }
                }
                if (object instanceof SftpFile) {
                    SftpFile file;
                    file = (SftpFile) object;
                    type = filefinder.findFileType(object);
                    docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "dir", "path", filefinder.getAbsolutePath());

                    if (!file.getFilename().equals("..")) {
                        if (!file.getFilename().equals(".") && !file.getFilename().contains("\b")) {
                            //System.out.println("filename=" + file.getFilename());
                            docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "file_" + countFile, "filename", file.getFilename());
                            docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "file_" + countFile, "type", type);
                            countFile++;
                        }
                    }
                }
                if (object instanceof FTPFile) {
                    FTPFile file;
                    file = (FTPFile) object;
                    type = filefinder.findFileType(object);
                    docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "dir", "path", filefinder.getAbsolutePath());
                    if (!file.getName().equals("..")) {
                        if (!file.getName().equals(".") && !file.getName().contains("\b")) {
                            //System.out.println("filename=" + file.getFilename());
                            docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "file_" + countFile, "filename", file.getName());
                            docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "file_" + countFile, "type", type);
                            countFile++;
                        }
                    }
                }
                if (object instanceof String) {
                    String file;
                    file = (String) object;
                    if (subtype.equals("database") || subtype.equals("database_table")) {
                        docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "dir", "path", "none");
                        docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "file_" + countFile, "type", "table");
                    } else {
                        docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "dir", "path", "dir_up");
                        if (countFile == 0) {
                            String table = xmlResponse.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "filename");
                            docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "file_0", "filename", table);
                            docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "file_0", "type", "table");
                            countFile++;
                        }
                        docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "file_" + countFile, "type", "table_attribute");
                    }
                    docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "file_" + countFile, "filename", file);
                    countFile++;
                }
                //System.out.println("parent="+ file.getParent()+ "  filename=" + file.getName() + "\t\t\t\t\t\t\t\ttype=" + type);
            }
        }
        int ipagerNumber = newposCurrentItem / maxItems;
        int maxPagerNumber = countFile / maxItems;
        docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "pager", "number", String.valueOf(ipagerNumber));
        docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "pager", "maxNumber", String.valueOf(maxPagerNumber));
        docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "file", "objectCount", String.valueOf(countFile));
        docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "file", "objectMaxCount", String.valueOf(maxCountFiles));
        docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "status", "text", "done");
        if (countFile == 0) {
            docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "status", "text", "none");
        }
        docOut = xmlResponse.set_class_object_attribute_value(docOut, "ob_explorer", "list", "posCurrentItem", String.valueOf(newposCurrentItem));

        /*
        System.out.println("connection       =" + xmlResponse.get_class_object_attribute_value(docOut, "ob_ssh", "connection", "number"));
        System.out.println("subtype          =" + xmlResponse.get_class_object_attribute_value(docOut, "ob_request", "request", "subtype"));
        System.out.println("dirUp            =" + xmlResponse.get_class_object_attribute_value(docOut, "ob_explorer", "dirUp", "path"));
        System.out.println("path             =" + xmlResponse.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "path"));
        System.out.println("type             =" + xmlResponse.get_class_object_attribute_value(docOut, "ob_explorer", "dir", "type"));
        System.out.println("objectCount      =" + xmlResponse.get_class_object_attribute_value(docOut, "ob_explorer", "file", "objectCount"));
        System.out.println("objectMaxCount   =" + xmlResponse.get_class_object_attribute_value(docOut, "ob_explorer", "file", "objectMaxCount"));
        System.out.println("posCurrentItem   =" + xmlResponse.get_class_object_attribute_value(docOut, "ob_explorer", "list", "posCurrentItem"));
        System.out.println("status           =" + xmlResponse.get_class_object_attribute_value(docOut, "ob_explorer", "status", "text"));
        System.out.println("status connection=" + xmlResponse.get_class_object_attribute_value(docOut, "ob_ssh", "connection_" + number, "text"));
        System.out.println("pagernumber      =" + xmlResponse.get_class_object_attribute_value(docOut, "ob_explorer", "pager", "number"));
        System.out.println("pagermaxNumber   =" + xmlResponse.get_class_object_attribute_value(docOut, "ob_explorer", "pager", "maxNumber"));
        */
        try {
            if (_response != null) {
                _response.setContentType("text/xml");
                _response.setHeader("Cache-Control", "no-cache");
                _response.getWriter().write(xml.XMLSerializer(docOut));
            }
        } catch (IOException e) {
            System.err.println(e.getMessage());
        }
        return docOut;
    }

    public static void main
            (
                    final String[] args) {
        OPENBEXI_Creative_explorer explorer = new OPENBEXI_Creative_explorer(null, null);
        try {
            Document docOut = null;
            final BEXI_XMLDriver xml = new BEXI_XMLDriver();
            docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "list", "nextPreviousStatus", "none");
            docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "list", "maxItems", "50");
            docOut = xml.set_class_object_attribute_value(docOut, "ob_request", "request", "subtype", "local");
            docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "dir", "type", "none");
            docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "list", "posCurrentItem", "0");
            docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "dir", "path", "");
            docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "dir", "filter", "none");
            docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "file", "filter", "none");
            docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "dir", "filename", "images");

            //Create xml data
            Document doc = explorer.getObjects(docOut);

            System.out.println(xml.XMLSerializer(doc));
        } catch (Exception e) {
            System.err.println(e);
        }
    }
}
