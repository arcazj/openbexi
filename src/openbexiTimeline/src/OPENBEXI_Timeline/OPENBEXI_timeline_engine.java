package OPENBEXI_Timeline;

/* This notice must be untouched at all times.

Copyright (c) 2005-2012 JC Arcaz. All rights reserved.
OPEN OPENBEXI Creative: server side for generating dynanic HTML page and html code source from browsers.Works with OPEN OPENBEXI HTML Builder
updated: January 22 2012 version 4.0
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
import OPENBEXI.BEXI_ApplicationPath;
import OPENBEXI.BEXI_XMLDriver;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServlet;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.w3c.dom.Node;

import java.util.*;

public class OPENBEXI_timeline_engine extends HttpServlet implements Runnable {

    private HttpServletResponse _response;
    private BEXI_ApplicationPath _applicationPath;
    private Document _docOut = null;
    private Vector _events = new Vector();
    private ArrayList _resources = new ArrayList();

    /**
     * @param response        .
     * @param applicationPath .
     * @param docOut          .
     */
    public OPENBEXI_timeline_engine(HttpServletResponse response, BEXI_ApplicationPath applicationPath, Document docOut) {
        _response = response;
        _applicationPath = applicationPath;
        _docOut = docOut;
    }

    public Vector get_events() {
        return _events;
    }

    private static ArrayList GetUniqueRessource(Collection values) {
        return new ArrayList(new HashSet(values));
    }

    public void set_events() {
        ArrayList resources = new ArrayList();
        int count = 0;
        String xmlCode = "";
        int maxCount = 0;
        try {
            if (_docOut == null) return;
            Element classe = null;
            NodeList classes = _docOut.getElementsByTagName("data");
            // Look for classe
            if (classes == null || classes.getLength() == 0) {
                return;
            }
            // Look for events
            Element object = null;
            boolean objectFound = false;
            NodeList events = _docOut.getElementsByTagName("event");
            if (events.getLength() == 0) {
                return;
            }


            for (int i = 0; i < events.getLength(); i++) {
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
                String resource = object.getAttribute("ressource");
                String resourceText = object.getAttribute("resourceText");
                Node text = object.getFirstChild();

                final BEXI_XMLDriver xml = new BEXI_XMLDriver();
                if (!start.equals("")) {
                    OPENBEXI_timeline_event event = new OPENBEXI_timeline_event();
                    event.set_start(start);
                    event.set_end(end);
                    event.set_title(title);
                    event.set_latestStart(latestStart);
                    event.set_earliestEnd(earliestEnd);
                    event.set_isDuration(isDuration);
                    event.set_link(link);
                    event.set_icon(icon);
                    event.set_icon(image);
                    event.set_color(color);
                    event.set_textColor(textColor);
                    event.set_tapeImage(tapeImage);
                    event.set_tapeRepeat(tapeRepeat);
                    event.set_caption(caption);
                    event.set_text(text.getNodeValue());
                    event.set_ressource(new OPENBEXI_timeline_resource(resource, resourceText, OPENBEXI_timeline_resource.status.ENABLE));
                    count++;

                    resources.add(resource);

                    _events.add(event);
                }
            }
            _resources = GetUniqueRessource(resources);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        this._events = null;
    }

    public void run() {

        set_events();

        try {
            scheduleEvents();
        } catch (Exception e) {
            e.getMessage();
        }
    }

    /**
     * @throws Exception
     */
    public void scheduleEvents() throws Exception {

        Vector[] event_list_by_resource = new Vector[_resources.size()];
        //Create an event list by ressource;
        for (int i = 0; i < _resources.size(); i++) {
            OPENBEXI_timeline_resource resource = (OPENBEXI_timeline_resource) _events.get(i);
            for (int j = 0; j < _events.size(); j++) {
                OPENBEXI_timeline_event event = (OPENBEXI_timeline_event) _events.get(j);
                if (event.get_ressource().get_name().equals(resource.get_name())) {
                    event_list_by_resource[i].add(event);
                }
            }
            // Resolve timeline conflict
            conflictSolver(event_list_by_resource[i]);
        }
    }

    private void conflictSolver(Vector event_list) throws Exception {

    }
}
