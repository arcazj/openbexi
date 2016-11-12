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

*/

import org.apache.catalina.websocket.WsOutbound;
import org.w3c.dom.Document;

import java.net.InetAddress;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.InputStream;
import java.net.Socket;
import java.net.UnknownHostException;
import java.net.SocketException;
import java.nio.CharBuffer;

public class OPENBEXI_Creative_socket_client extends Thread {
    public static void run(WsOutbound outbound, Socket socket, int session) {
        ObjectInputStream ois = null;
        String message =null;
        try {
            ois = new ObjectInputStream(socket.getInputStream());
            while (true) {
                try {
                    // Read and display the response message sent by server application
                    message = (String) ois.readObject();

                    //System.out.println("Message: " + message);
                    for (int i = 0; i < message.length(); i++) {
                        outbound.writeTextData(message.charAt(i));
                    }

                    // Send output to client
                    outbound.flush();

                } catch (Exception e) {
                    System.err.println("OPENBEXI_Creative_socket_client.run()() session:" + session + " " + e.getMessage());
                    break;
                }
            }
        } catch (Exception e) {
            System.err.println("OPENBEXI_Creative_socket_client.run() session:" + session + " " + e.getMessage());
        }
        try {
            if (ois != null) ois.close();
        } catch (Exception e) {
            System.err.println("OPENBEXI_Creative_socket_client.run() :" + session + " " + e.getMessage());
        }
        System.out.println("Client disconnected ... " + socket.getLocalPort());
    }

    public static void run(Socket socket, int session) {
        try {
            String message = null;
            ObjectInputStream ois = new ObjectInputStream(socket.getInputStream());
            while (true) {
                try {
                    // Read and display the response message sent by server application
                    message = (String) ois.readObject();
                    System.out.println("OPENBEXI_Creative_socket_client.run() Message: " + message);
                } catch (IOException e) {
                    System.err.println("OPENBEXI_Creative_socket_client.run() session:" + session + " " + e.getMessage());
                    break;
                } catch (Exception e) {
                    System.err.println("OPENBEXI_Creative_socket_client.run() session:" + session + " " + e.getMessage());
                    break;
                }
            }
            ois.close();
        } catch (Exception e3) {
            System.err.println("OPENBEXI_Creative_socket_client.run() session:" + session + " " + e3.getMessage());
        }
        System.out.println("Client disconnected ... " + socket.getLocalPort());
    }

    public static void main(String[] args) {
        InetAddress host = null;
        Socket socket = null;
        try {
            // Create a connection to the server socket on the server application
            host = InetAddress.getLocalHost();
            socket = new Socket(host.getHostName(), 7777);
            socket.setKeepAlive(true);

            // Send a message to the client application
            ObjectOutputStream oos = new ObjectOutputStream(socket.getOutputStream());
            oos.writeObject("Client there...");
            run(socket, 0);
            oos.close();
        } catch (UnknownHostException e) {
            e.getMessage();
        } catch (IOException e) {
            e.getMessage();
        }
    }
}
