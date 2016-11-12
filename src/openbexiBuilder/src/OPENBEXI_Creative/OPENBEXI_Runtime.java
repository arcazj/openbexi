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

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletResponse;
import java.io.InputStreamReader;
import java.io.BufferedReader;
import java.io.IOException;

import org.w3c.dom.Document;

public class OPENBEXI_Runtime extends HttpServlet {

    private HttpServletResponse _response;
    private BEXI_ApplicationPath _applicationPath;

    public OPENBEXI_Runtime(HttpServletResponse response, BEXI_ApplicationPath applicationPath) {
        _response = response;
        _applicationPath = applicationPath;
    }

    public void cmd(Document docOut) {

        Process p;
        final BEXI_XMLDriver xml = new BEXI_XMLDriver();
        try {
            String cmd = xml.get_class_object_attribute_value(docOut, "ob_request", "exec", "cmd");

            p = Runtime.getRuntime().exec(cmd);
            p.waitFor();
            BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()));
            String line = "";
            int count = 0;
            while ((line = reader.readLine()) != null) {
                if (!line.equals("")) {
                    System.out.println(line);
                    docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "cmd", "line_" + count, line);
                    count++;
                }
            }
            docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "status", "text", "done");
        } catch (Exception e) {
            try {
                docOut = xml.set_class_object_attribute_value(docOut, "ob_explorer", "status", "text", e.getMessage());
            } catch (Exception e1) {
            }
            e.getMessage();
        }

        try {
            if (_response != null) {
                _response.setContentType("text/xml");
                _response.setHeader("Cache-Control", "no-cache");
                _response.getWriter().write(xml.XMLSerializer(docOut));
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
            doc = xml.set_class_object_attribute_value(doc, "ob_request", "exec", "cmd", "cmd /c ipconfig");

            OPENBEXI_Runtime exec = new OPENBEXI_Runtime(null, null);
            exec.cmd(doc);
            
        } catch (Exception e) {
            e.getMessage();
        }
    }
}
