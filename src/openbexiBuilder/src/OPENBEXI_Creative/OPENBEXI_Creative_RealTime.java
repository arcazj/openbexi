package OPENBEXI_Creative;

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
Ex:ws://localhost:8080/OPENBEXI_Creative/OPENBEXI_Creative_RealTime.do
*/


import java.io.*;
import java.net.InetAddress;
import java.net.Socket;

import org.apache.catalina.websocket.MessageInbound;
import org.apache.catalina.websocket.StreamInbound;
import org.apache.catalina.websocket.WebSocketServlet;
import org.apache.catalina.websocket.WsOutbound;
import org.w3c.dom.Document;

import OPENBEXI.BEXI_XMLDriver;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.servlet.http.HttpServletRequest;


public class OPENBEXI_Creative_RealTime extends WebSocketServlet {
    @Override
    protected StreamInbound createWebSocketInbound(String s, HttpServletRequest httpServletRequest) {
        return new steamInbound();
        //return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    private static final long serialVersionUID = 1L;
    private static int _session = 0;

    protected StreamInbound createWebSocketInbound(String subProtocol) {
        return new steamInbound();
    }

    private static final class steamInbound extends StreamInbound {
        @Override
        protected void onOpen(WsOutbound outbound) {
            try {
                System.out.println("OPENBEXI_Creative_RealTime: onOpen");
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
        }

        @Override
        protected void onClose(int status) {
            try {
                System.out.println("OPENBEXI_Creative_RealTime: onClose");
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
        }

        @Override
        protected void onBinaryData(InputStream is) throws IOException {
            System.out.println("OPENBEXI_Creative_RealTime: onBinaryData");
        }

        @Override
        protected void onTextData(Reader r) throws IOException {
            // Connect to the source
            InetAddress host = null;
            int retriever_port = 7777;
            Socket socket = null;
            String xml_request = "";
            ObjectOutputStream oos = null;
            try {

                WsOutbound outbound = getWsOutbound();
                int c = r.read();
                while (c != -1) {
                    xml_request += (char) c;
                    c = r.read();
                }
                //System.out.println("OPENBEXI_Creative_RealTime.onTextData() " + _session + " port:" + port + " request:" + xml_request);
                //Decode openBEXI request
                InputStream input = new ByteArrayInputStream(xml_request.getBytes("UTF-8"));
                final BEXI_XMLDriver xmlResponse = new BEXI_XMLDriver();
                final DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
                final DocumentBuilder docbuilder = factory.newDocumentBuilder();
                final Document doc = docbuilder.parse(input);
                String widget_id = xmlResponse.get_class_object_attribute_value(doc, "ob_request", "websocket", "widget_id");
                String retriever_host = xmlResponse.get_class_object_attribute_value(doc, widget_id, "websocket", "retriever_host");
                if (retriever_host == null || retriever_host.equals(""))
                    host = InetAddress.getLocalHost();
                else
                   host = InetAddress.getByName(retriever_host);
                String retriever_portS = xmlResponse.get_class_object_attribute_value(doc, widget_id, "websocket", "retriever_port");
                if (retriever_portS == null || retriever_portS.equals("")) retriever_portS = "7777";
                retriever_port = Integer.parseInt(retriever_portS);


                System.out.println("connecting to:" + host.getHostAddress());
                socket = new Socket(host, retriever_port);
                socket.setKeepAlive(true);

                // Send the xml_request to the retriever , and it will behave accordingly
                oos = new ObjectOutputStream(socket.getOutputStream());
                oos.writeObject(xml_request);

                OPENBEXI_Creative_socket_client.run(outbound, socket, _session++);

            } catch (Exception e) {
                System.err.println("OPENBEXI_Creative_RealTime.onTextData() session:" + _session + " port:" + retriever_port + " " + e.getMessage());
            }
            try {
                if (oos != null) oos.close();
            } catch (Exception e) {
                System.err.println("OPENBEXI_Creative_RealTime.onTextData() session:" + _session + " port:" + retriever_port + " " + e.getMessage());
            }
            try {
                if (socket != null) socket.close();
            } catch (Exception e) {
                System.err.println("OPENBEXI_Creative_RealTime.onTextData() session:" + _session + " port:" + retriever_port + " " + e.getMessage());
            }
        }
    }
}
