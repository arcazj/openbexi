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

import OPENBEXI.BEXI_XMLDriver;

import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.DocumentBuilder;
import java.net.ServerSocket;
import java.io.*;
import java.net.Socket;

import org.w3c.dom.Document;
import OPENBEXI_Timeline.OPENBEXI_timeline;

class ConnectionHandler implements Runnable {
    private Socket _socket;
    private String _mode;
    private String _retriever_object;
    private int _retriever_port;
    private int _session;
    private long _retriever_polling;

    public ConnectionHandler(Socket socket, String mode, String retriever_object, int retriever_port, int session, long retriever_polling) {
        _socket = socket;
        _mode = mode;
        _session = session;
        _retriever_object = retriever_object;
        _retriever_port = retriever_port;
        _retriever_polling = retriever_polling;

        Thread t = new Thread(this);
        t.start();
    }

    public void run() {
        if (_mode.equals("file_reader"))
            file_reader(_retriever_object, _retriever_port, _retriever_polling);
        else if (_mode.equals("file_pipe"))
            file_pipe(_retriever_object, _retriever_port, _retriever_polling);
        else if (_mode.equals("command"))
            execute_command(_retriever_object, _retriever_port, _retriever_polling);
        else if (_mode.equals("ob_xml_reader"))
            ob_xml_reader(_retriever_object, _retriever_port, _retriever_polling);
        else if (_mode.equals("ob_xml_simile_reader"))
            ob_xml_simile_reader(_retriever_object, _retriever_port, _retriever_polling);
        else
            driver();
    }

    private void ob_xml_reader(String retriever_object, int retriever_port, long retriever_polling) {
        file_reader(retriever_object, retriever_port, retriever_polling);
    }

    private void ob_xml_simile_reader(String retriever_object, int retriever_port, long retriever_polling) {
        try {
            Document doc = null;
            final BEXI_XMLDriver xml = new BEXI_XMLDriver();

            doc = xml.set_class_object_attribute_value(doc, "ob_request", "timeline", "mode", "remote_file");
            doc = xml.set_class_object_attribute_value(doc, "ob_request", "timeline", "xmlFile", retriever_object);
            OPENBEXI_timeline timeline = new OPENBEXI_timeline(null, null,null);
            String events = timeline.readEvents(doc);
            file_reader(events, retriever_port, retriever_polling);
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }

    private void execute_command(String retriever_object, int retriever_port, long retriever_polling) {
        ObjectInputStream ois = null;
        ObjectOutputStream oos = null;
        try {

            System.out.println("execute command: " + retriever_object);

            // Send a response information to the client application
            oos = new ObjectOutputStream(_socket.getOutputStream());

            int count_reset = 0;

            while (true) {
                String str = "";
                try {
                    try {
                        Process p = Runtime.getRuntime().exec(retriever_object);
                        //p.waitFor();
                        BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()));
                        String line = reader.readLine();
                        while (line != null) {
                            oos.writeObject(line);
                            line = reader.readLine();
                        }
                    }
                    catch (IOException e1) {
                    }


                } catch (Exception e) {
                    System.err.println("execute_command() cannot execute command:" + e.getMessage());
                }
                try {
                    if (retriever_polling == 0) break;
                    Thread.sleep(retriever_polling);
                } catch (InterruptedException x) {
                    Thread.currentThread().interrupt();
                    break;
                }

                // Test to reset ObjectOutputStream object to avaoid heap memory issue
                if (count_reset++ > 5000) {
                    oos.reset();
                    count_reset = 0;
                }
            }
        } catch (IOException e) {
            System.err.println("execute_command() port:" + retriever_port + " " + e.getMessage());
        }
        try {
            if (ois != null) ois.close();
        } catch (Exception e) {
            System.err.println("execute_command() port:" + retriever_port + " " + e.getMessage());
        }
        try {
            if (oos != null) oos.close();
        } catch (Exception e) {
            System.err.println("execute_command() port:" + retriever_port + " " + e.getMessage());
        }
        try {
            if (_socket != null) _socket.close();
        } catch (Exception e) {
            System.err.println("execute_command() port:" + retriever_port + " " + e.getMessage());
        }
        System.out.println("Client " + _socket.getPort() + " disconnected ... - Waiting for new client message...");
    }

    private void file_pipe(String retriever_object, int retriever_port, long retriever_polling) {
        ObjectOutputStream oos = null;
        try {

            System.out.println("Piping file: " + retriever_object);

            // Send a response information to the client application
            oos = new ObjectOutputStream(_socket.getOutputStream());
            double count = 0;
            int count_reset = 0;
            File file = new File(retriever_object);

            if (!file.exists()) {
                oos.writeObject("Cannot read " + retriever_object + " - File doesn't exits");
                System.err.println("file_pipe():" + "Cannot read " + retriever_object + " - File doesn't exits");
                return;
            }
            if (file.isDirectory()) {
                oos.writeObject("Cannot read a directory:" + retriever_object);
                System.err.println("file_pipe():Cannot read a directory:" + retriever_object);
                return;
            }
            if (!file.canRead()) {
                oos.writeObject("Cannot read :" + retriever_object + " - Please check right ...");
                System.err.println("file_pipe():" + "Cannot read:" + retriever_object + " - Please check right ...");
                return;
            }
            String line = null;
            long _filePointer = file.length();
            long len = _filePointer;
            while (true) {
                String str = "";
                try {
                    try {
                        Thread.sleep(retriever_polling);
                    } catch (InterruptedException x) {
                        Thread.currentThread().interrupt();
                        break;
                    }
                    len = file.length();
                    if (len < _filePointer) {
                        // Log must have been deleted.
                        _filePointer = len;
                    } else if (len > _filePointer) {
                        // File must have had something added to it!
                        RandomAccessFile raf = new RandomAccessFile(retriever_object, "r");
                        raf.seek(_filePointer);
                        while ((line = raf.readLine()) != null) {
                            oos.writeObject(line);
                        }
                        _filePointer = raf.getFilePointer();
                        raf.close();
                    }


                } catch (Exception e) {
                    System.err.println("file_pipe() cannot_pipe_file:" + e.getMessage());
                }

                // Test to reset ObjectOutputStream object to avaoid heap memory issue
                if (count_reset++ > 5000) {
                    oos.reset();
                    count_reset = 0;
                }
            }
        } catch (IOException e) {
            System.err.println("file_pipe() port:" + retriever_port + " " + e.getMessage());
        }
        try {
            if (oos != null) oos.close();
        } catch (Exception e) {
            System.err.println("file_pipe() port:" + retriever_port + " " + e.getMessage());
        }
        try {
            if (_socket != null) _socket.close();
        } catch (Exception e) {
            System.err.println("file_pipe() port:" + retriever_port + " " + e.getMessage());
        }
        System.out.println("Client " + _socket.getPort() + " disconnected ... - Waiting for new client message...");
    }

    private void file_reader(String retriever_object, int retriever_port, long retriever_polling) {
        ObjectOutputStream oos = null;
        try {

            System.out.println("Reading file: " + retriever_object);
            // Send a response information to the client application
            oos = new ObjectOutputStream(_socket.getOutputStream());
            double count = 0;
            int count_reset = 0;
            long _filePointer = new File(retriever_object).length();
            long len = 0;

            while (true) {
                String str = "";
                try {
                    if (len != _filePointer) {
                        FileInputStream fis = new FileInputStream(retriever_object);
                        BufferedInputStream bis = new BufferedInputStream(fis);
                        DataInputStream dis = new DataInputStream(bis);
                        while (dis.available() != 0) {
                            str += dis.readLine();
                        }
                        oos.writeObject(str);
                        fis.close();
                        bis.close();
                        dis.close();
                    }
                    _filePointer = len;

                } catch (Exception e) {
                    System.err.println("file_reader() cannot_read_file:" + e.getMessage());
                }

                // Test to reset ObjectOutputStream object to avaoid heap memory issue
                if (count_reset++ > 5000) {
                    oos.reset();
                    count_reset = 0;
                }
                try {
                    Thread.sleep(retriever_polling);
                } catch (InterruptedException e) {
                    System.err.println("file_reader() port:" + retriever_port + " " + e.getMessage());
                }
                len = new File(retriever_object).length();
            }
        } catch (IOException e) {
            System.err.println("file_reader() port:" + retriever_port + " " + e.getMessage());
        }
        try {
            if (oos != null) oos.close();
        } catch (Exception e) {
            System.err.println("file_reader() port:" + retriever_port + " " + e.getMessage());
        }
        try {
            if (_socket != null) _socket.close();
        } catch (Exception e) {
            System.err.println("file_reader() port:" + retriever_port + " " + e.getMessage());
        }
        System.out.println("Client " + _socket.getPort() + " disconnected ... - Waiting for new client message...");
    }

    private void driver() {
        boolean testing = false;
        ObjectInputStream ois = null;
        ObjectOutputStream oos = null;
        int retriever_port = 7777;
        long retriever_polling = 60;
        try {
            // Read a message sent by client application
            ois = new ObjectInputStream(_socket.getInputStream());
            String message = (String) ois.readObject();
            //System.out.println("driver():Message Received: " + message);

            //System.out.println("OPENBEXI_Creative_RealTime.onTextData() " + _session + " port:" + port + " request:" + xml_request);
            //Decode openBEXI request

            InputStream input = new ByteArrayInputStream(message.getBytes("UTF-8"));
            final BEXI_XMLDriver xmlResponse = new BEXI_XMLDriver();
            final DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            final DocumentBuilder docbuilder;
            try {
                docbuilder = factory.newDocumentBuilder();
                final Document doc = docbuilder.parse(input);
                String widget_id = xmlResponse.get_class_object_attribute_value(doc, "ob_request", "websocket", "widget_id");
                //String widget_type = xmlResponse.get_class_object_attribute_value(doc, widget_id, "websocket", "widget_type");
                //String username = xmlResponse.get_class_object_attribute_value(doc, widget_id, "websocket", "username");
                //String password = xmlResponse.get_class_object_attribute_value(doc, widget_id, "websocket", "password");
                _mode = xmlResponse.get_class_object_attribute_value(doc, widget_id, "websocket", "jws_request_type");
                if (_mode == null || _mode.equals("")) _mode = "test";
                String retriever_object = xmlResponse.get_class_object_attribute_value(doc, widget_id, "websocket", "retriever_object");
                String retriever_portS = xmlResponse.get_class_object_attribute_value(doc, widget_id, "websocket", "retriever_port");
                if (retriever_portS != null || !retriever_portS.equals(""))
                    retriever_port = Integer.valueOf(retriever_portS);
                String retriever_pollingS = xmlResponse.get_class_object_attribute_value(doc, widget_id, "websocket", "retriever_polling");
                if (retriever_pollingS != null || !retriever_pollingS.equals(""))
                    retriever_polling = Long.valueOf(retriever_pollingS);

                if (_mode.equals("file_reader"))
                    file_reader(retriever_object, retriever_port, retriever_polling);
                else if (_mode.equals("file_pipe"))
                    file_pipe(retriever_object, retriever_port, retriever_polling);
                else if (_mode.equals("command"))
                    execute_command(retriever_object, retriever_port, retriever_polling);
                else if (_mode.equals("ob_xml_reader"))
                    ob_xml_reader(retriever_object, retriever_port, retriever_polling);
                else if (_mode.equals("ob_xml_simile_reader"))
                    ob_xml_simile_reader(retriever_object, retriever_port, retriever_polling);
                else
                    testing = true;
            } catch (Exception e) {
                System.err.println("OPENBEXI_Creative_socket_retriever.driver() port:" + retriever_port + " " + e.getMessage());
            }

            if (testing) {

                // Send a response information to the client application
                oos = new ObjectOutputStream(_socket.getOutputStream());
                double count = 0;
                int count_reset = 0;


                while (true) {
                    try {
                        oos.writeObject("Testing message " + count++ + " ...");

                        // Test to reset ObjectOutputStream object to avaoid heap memory issue
                        if (count_reset++ > 5000) {
                            oos.reset();
                            count_reset = 0;
                        }
                    } catch (Exception e) {
                        System.err.println("OPENBEXI_Creative_socket_retriever.driver() port:" + retriever_port + " " + e.getMessage());
                        break;
                    }
                    try {
                        Thread.sleep(retriever_polling);
                    } catch (InterruptedException e) {
                        System.err.println("OPENBEXI_Creative_socket_retriever.driver() port:" + retriever_port + " " + e.getMessage());
                        break;
                    }
                }
            }
        } catch (IOException e) {
            System.err.println("OPENBEXI_Creative_socket_retriever.driver() port:" + retriever_port + " " + e.getMessage());
        } catch (ClassNotFoundException e) {
            System.err.println("OPENBEXI_Creative_socket_retriever.driver() port:" + retriever_port + " " + e.getMessage());
        }
        try {
            if (ois != null) ois.close();
        } catch (Exception e) {
            System.err.println("OPENBEXI_Creative_socket_retriever.driver() port:" + retriever_port + " " + e.getMessage());
        }
        try {
            if (oos != null) oos.close();
        } catch (Exception e) {
            System.err.println("OPENBEXI_Creative_socket_retriever.driver() port:" + retriever_port + " " + e.getMessage());
        }
        try {
            if (_socket != null) _socket.close();
        } catch (Exception e) {
            System.err.println("OPENBEXI_Creative_socket_retriever.driver() port:" + retriever_port + " " + e.getMessage());
        }
        System.out.println("Client " + _socket.getPort() + " disconnected ... - Waiting for new client message...");
    }
}

public class OPENBEXI_Creative_socket_retriever {
    private ServerSocket _server;
    private int _retriever_port = 7777;
    private String _mode = "test";
    private String _retriever_object;
    private int _session;
    private long _retriever_polling = 2000L;

    public OPENBEXI_Creative_socket_retriever(int port, String mode, String file, int session, long updateInterval) {
        try {
            _server = new ServerSocket(_retriever_port);
            _mode = mode;
            _session = session;
            _retriever_port = port;
            _retriever_object = file;
            _retriever_polling = updateInterval;
        } catch (IOException e) {
            System.err.println("OPENBEXI_Creative_socket_retriever() port:" + this._retriever_port + " " + e.getMessage());
        }
    }

    public void handleConnection() {
        System.out.println("OPENBEXI_Creative_socket_retriever():Waiting for client message... port:" + _retriever_port);

        // The server do a loop here to accept all connection initiated by the client application.
        while (true) {
            try {
                Socket socket = _server.accept();
                new ConnectionHandler(socket, _mode, _retriever_object, _retriever_port, _session, _retriever_polling);
                System.out.println("socket port:" + socket.getPort() + " - InetAddress:" + socket.getInetAddress() + " - server port:" + _server.getLocalPort());
            } catch (IOException e) {
                System.err.println("OPENBEXI_Creative_socket_retriever.handleConnection() port:" + this._retriever_port + " " + e.getMessage());
            }
        }
    }

    public static void main(String[] args) {
        String mode = "test";
        int port = 7777;
        long updateInterval = 2000L;
        String file = null;
        String command = null;
        if (args.length > 0) {
            for (int i = 0; i < args.length; i++) {
                if (args[0] != null && args[i].equals("-p")) {
                    try {
                        if (args[i + 1] != null && !args[i + 1].equals("")) {
                            port = Integer.parseInt(args[i + 1]);
                        }
                    } catch (Exception e) {
                        port = 7777;
                    }
                }
                if (args[0] != null && args[i].equals("-updateInterval")) {
                    try {
                        if (args[i + 1] != null && !args[i + 1].equals("")) {
                            updateInterval = Integer.parseInt(args[i + 1]) * 1000;
                        }
                    } catch (Exception e) {
                        updateInterval = 2000L;
                    }
                }
                if (args[0] != null && args[i].equals("-mode")) {
                    try {
                        if (args[i + 1] != null && !args[i + 1].equals("")) {
                            mode = args[i + 1];
                            if (mode.equals("command"))
                                command = args[i + 2];
                            else {
                                file = args[i + 2];
                                File file2 = new File(file);
                                if (!file2.isFile()) System.err.println(file + " does not exist!");
                            }
                        }
                    } catch (Exception e) {
                        mode = "test";
                    }
                }
            }
        } else {
            System.out.println("Usage:" + args[0] + " -p <port number> -- ex: " + args[0] + " -p 7777");
            System.out.println("Usage:" + args[0] + " -mode test -p <port number> -- ex: " + args[0] + " -mode test -p 7777");
            System.out.println("Usage:" + args[0] + " -mode file_reader <filename> -p <port number> -updateInterval <seconde(s)> -- ex: " + args[0] + " -mode file_reader foo -p 7777 -updateInterval 2");
            System.out.println("Usage:" + args[0] + " -mode ob_xml_reader <filename> -p <port number> -updateInterval <seconde(s)> -- ex: " + args[0] + " -mode ob_xml_reader foo -p 7777 -updateInterval 2");
            System.out.println("Usage:" + args[0] + " -mode ob_xml_simile_reader <filename> -p <port number> -updateInterval <seconde(s)> -- ex: " + args[0] + " -mode ob_xml_reader foo -p 7777 -updateInterval 2");
            System.out.println("Usage:" + args[0] + " -mode file_pipe <filename> -p <port number> -updateInterval <seconde(s)> -- ex: " + args[0] + " -mode file_pipe foo -p 7777 -updateInterval 2");
            System.exit(1);
        }

        if (mode.equals("file_pipe"))
            System.out.println("Starting server, piping " + file + ", on port:" + port + ", updateInterval=" + updateInterval);
        else if (mode.equals("file_reader"))
            System.out.println("Starting server, reading " + file + ", on port:" + port + ", updateInterval=" + updateInterval);
        else if (mode.equals("ob_xml_reader"))
            System.out.println("Starting server, reading " + file + ", on port:" + port + ", updateInterval=" + updateInterval);
        else if (mode.equals("ob_xml_simile_reader"))
            System.out.println("Starting server, reading " + file + ", on port:" + port + ", updateInterval=" + updateInterval);
        else if (mode.equals("command"))
            System.out.println("Starting server, reading " + command + ", on port:" + port + ", updateInterval=" + updateInterval);
        else
            System.out.println("Starting server... port:" + port);
        OPENBEXI_Creative_socket_retriever server;
        if (mode.equals("command"))
            server = new OPENBEXI_Creative_socket_retriever(port, mode, command, 0, updateInterval);
        else
            server = new OPENBEXI_Creative_socket_retriever(port, mode, file, 0, updateInterval);
        server.handleConnection();
    }
}
