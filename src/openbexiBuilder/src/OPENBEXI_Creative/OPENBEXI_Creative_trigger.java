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
import OPENBEXI.BEXI_results;
import org.w3c.dom.Document;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletResponse;
import java.io.*;

import java.sql.Statement;
import java.sql.ResultSet;
import java.sql.DriverManager;
import java.sql.Connection;
import java.util.Properties;
import java.util.Date;
import java.util.zip.CRC32;
import java.net.URL;
import java.net.URLConnection;
import java.awt.*;


public class OPENBEXI_Creative_trigger extends HttpServlet {

    private HttpServletResponse _response;
    private BEXI_ApplicationPath _applicationPath;

    public OPENBEXI_Creative_trigger(HttpServletResponse response, BEXI_ApplicationPath applicationPath) {
        _response = response;
        _applicationPath = applicationPath;
    }

    public void fire_CB(Document docOut) {
        final BEXI_XMLDriver xml = new BEXI_XMLDriver();

        final BEXI_XMLDriver xmlResponse = new BEXI_XMLDriver();
        try {
            String objectId = xml.get_class_object_attribute_value(docOut, "ob_request", "object", "id");
            System.err.println("fire_CB:");
        } catch (Exception e) {
            e.getMessage();
        }
    }

    public void start(Document docOut) {
        final BEXI_XMLDriver xml = new BEXI_XMLDriver();
        int bufferSize = 100 * 1024;

        try {
            String objectId = xml.get_class_object_attribute_value(docOut, "ob_request", "object", "id");
            String file = xml.get_class_object_attribute_value(docOut, "ob_request", "object", "file");
            String type = xml.get_class_object_attribute_value(docOut, "ob_request", "trigger", "type");
            Long new_checksum = null;
            Long previous_checksum;
            if (type.equals("file_cksum_changed")) {
                int timeout_int = 60;
                String timeout = xml.get_class_object_attribute_value(docOut, "ob_request", "trigger", "timeout");
                if (timeout != null) timeout_int = Integer.valueOf(timeout);

                String interval = xml.get_class_object_attribute_value(docOut, "ob_request", "trigger", "interval");
                int interval_int = 1;
                if (interval != null) interval_int = Integer.valueOf(interval);

                Date date = new Date();
                while (true) {
                    Date date2 = new Date();

                    // Check if file checksum cahnge
                    InputStream in = new FileInputStream(file);
                    CRC32 checksum = new CRC32();
                    checksum.reset();
                    byte[] buffer = new byte[bufferSize];
                    int bytesRead;
                    while ((bytesRead = in.read(buffer)) >= 0) {
                        checksum.update(buffer, 0, bytesRead);
                    }
                    in.close();

                    previous_checksum = new_checksum;
                    new_checksum = checksum.getValue();
                    if (previous_checksum!=null && !previous_checksum.equals(new_checksum)) {
                        fire_CB(docOut);
                        break;
                    }
                    if ((date2.getTime() - date.getTime()) > timeout_int*1000) {
                        fire_CB(docOut);
                        break;
                    }
                    Thread.sleep(interval_int*1000);
                }
                fire_CB(docOut);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void main(String args[]) {
        try {
            BEXI_ApplicationPath applicationPath = new BEXI_ApplicationPath();
            File path = new File(applicationPath.getDefaultPath());
            String filename = path.getCanonicalPath() + "/table/movies.csv";

            final BEXI_XMLDriver xml = new BEXI_XMLDriver();
            Document docOut = null;
            docOut = xml.set_class_object_attribute_value(docOut, "ob_request", "object", "id", "1");
            docOut = xml.set_class_object_attribute_value(docOut, "ob_request", "object", "file", filename);
            docOut = xml.set_class_object_attribute_value(docOut, "ob_request", "trigger", "type", "file_cksum_changed");
            docOut = xml.set_class_object_attribute_value(docOut, "ob_request", "trigger", "timeout", "300");
            docOut = xml.set_class_object_attribute_value(docOut, "ob_request", "trigger", "interval", "1");

            OPENBEXI_Creative_trigger trigger = new OPENBEXI_Creative_trigger(null, null);
            trigger.start(docOut);

        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }
}


