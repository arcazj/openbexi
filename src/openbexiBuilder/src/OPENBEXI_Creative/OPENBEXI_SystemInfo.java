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
import java.io.IOException;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.BufferedReader;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Enumeration;
import java.util.Properties;

public class OPENBEXI_SystemInfo extends HttpServlet {

    private HttpServletResponse _response;
    private BEXI_ApplicationPath _applicationPath;

    public OPENBEXI_SystemInfo(HttpServletResponse response, BEXI_ApplicationPath applicationPath) {
        _response = response;
        _applicationPath = applicationPath;
    }

    public void get(Document docOut) {
        byte[] ipAddr = null;
        String hostname = null;
        final BEXI_XMLDriver xml = new BEXI_XMLDriver();
        try {

            docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "status", "text", "done");
            try {
                InetAddress addr = InetAddress.getLocalHost();

                // Get IP Address
                docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "serverInfo", "ipAddr", InetAddress.getLocalHost().getHostAddress());

                // Get hostname
                hostname = addr.getHostName();
                docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "serverInfo", "hostname", hostname);

                // System property
                Properties p = System.getProperties();
                Enumeration keys = p.keys();
                while (keys.hasMoreElements()) {
                    String key = (String) keys.nextElement();
                    String value = (String) p.get(key);
                    System.out.println(key + ": " + value);
                    docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "serverInfo", key, value);

                }

            } catch (UnknownHostException e) {
                e.getMessage();
            }
        } catch (Exception e) {
            try {
                docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "serverInfo", "text", e.getMessage());
            } catch (Exception e1) {
                e1.getMessage();
            }
            e.getMessage();
        }

        try {
            if (_response != null) {
                _response.setContentType("text/xml");
                _response.setHeader("Cache-Control", "no-cache");
                _response.getWriter().write(xml.XMLSerializer(docOut));
            } else {
                System.out.println("ipAddr=" + InetAddress.getLocalHost().getHostAddress());
                System.out.println("hostname=" + hostname);

                Properties p = System.getProperties();
                Enumeration keys = p.keys();
                while (keys.hasMoreElements()) {
                    String key = (String) keys.nextElement();
                    String value = (String) p.get(key);
                    System.out.println(key + ": " + value);
                }
            }
        } catch (IOException e) {
            System.err.println(e.getMessage());
        }

        System.exit(0);
    }

    public static void main(String args[]) {
        Document doc = null;
        final BEXI_XMLDriver xml = new BEXI_XMLDriver();
        try {
            doc = xml.set_class_object_attribute_value(doc, "ob_request", "request", "type", "openbexi_SystemInfoRequest");

            OPENBEXI_SystemInfo systemInfo = new OPENBEXI_SystemInfo(null, null);
            systemInfo.get(doc);

        } catch (Exception e) {
            e.getMessage();
        }
    }
}
