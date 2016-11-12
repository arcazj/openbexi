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

import OPENBEXI.BEXI_XMLDriver;
import org.w3c.dom.Document;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;


public class OPENBEXI_List_gui extends HttpServlet {

    private HttpServletResponse _response;

    public OPENBEXI_List_gui(HttpServletResponse response) {
        _response = response;
    }

    public void update(String language, String listId, List result) throws Exception {

        // Send reponse
        final BEXI_XMLDriver xmlResponse = new BEXI_XMLDriver();
        Document doc = null;
        String count = String.valueOf(result.getItemCount());
        doc = xmlResponse.set_class_object_attribute_value(doc, "bexicontext_gui", "object", "id", listId);
        doc = xmlResponse.set_class_object_attribute_value(doc, "openbexi_listCounter", listId, "count", count);
        System.out.println("item count: " + result.getItemCount());
        if (result.getItemCount() == 0) {
            if (language.equals("French"))
                doc = xmlResponse.set_class_object_attribute_value(doc, "message", "no_name", "text", "Désolé, je n'ai pas de réponse à votre recherche");
            if (language.equals("English"))
                doc = xmlResponse.set_class_object_attribute_value(doc, "message", "no_name", "text", "Sorry, no data found");
        } else {
            for (int i = 0; i < result.getItemCount(); i++) {
                doc = xmlResponse.set_class_object_attribute_value(doc, "openbexi_list", listId, "item" + i, result.getItem(i));
                System.out.println("item" + i + ": " + result.getItem(i));
            }
            doc = xmlResponse.set_class_object_attribute_value(doc, "message", "no_name", "text", "OK");
        }

        _response.setContentType("text/xml");
        _response.setHeader("Cache-Control", "no-cache");
        _response.getWriter().write(xmlResponse.XMLSerializer(doc));
    }
}
