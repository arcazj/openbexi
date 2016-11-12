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

package OPENBEXI_Timeline;

import OPENBEXI_Creative.OPENBEXI_Creative_file;
import OPENBEXI_Creative.OPENBEXI_Creative_main;

import java.net.ServerSocket;
import java.net.Socket;
import java.io.*;
import java.util.*;

import java.text.SimpleDateFormat;

import OPENBEXI.BEXI_XMLDriver;
import OPENBEXI.BEXI_ApplicationPath;
import com.sun.org.apache.xerces.internal.parsers.DOMParser;
import org.w3c.dom.Document;

import javax.xml.transform.stream.StreamResult;

class ConnectionHandler implements Runnable {
    private Socket _socket;
    private String _mode;
    private String _file;
    private String _command;
    private int _port;
    private int _session;
    private long _updateInterval;

    public ConnectionHandler(Socket socket, String mode, String obj, int port, int session, long updateInterval) {
        _socket = socket;
        _mode = mode;
        _file = obj;
        _command = obj;
        _port = port;
        _session = session;
        _updateInterval = updateInterval;

        Thread t = new Thread(this);
        t.start();
    }

    public void run() {
        if (_mode.equals("test"))
            ob_test();
        if (_mode.equals("test2"))
            ob_test2();
        if (_mode.equals("test3"))
            ob_test3();
        if (_mode.equals("test_add_delete"))
            ob_test_add_delete();
        if (_mode.equals("xml_reader"))
            xml_event_reader();
    }

    private void xml_event_reader() {
        ObjectInputStream ois = null;
        ObjectOutputStream oos = null;
        try {

            // Read a message sent by client application
            ois = new ObjectInputStream(_socket.getInputStream());
            String message = (String) ois.readObject();
            System.out.println("Reading file: " + _file);

            // Send a response information to the client application
            oos = new ObjectOutputStream(_socket.getOutputStream());
            int count_reset = 0;
            long _filePointer = new File(_file).length();
            long len = 0;

            while (true) {
                String str = "";
                try {
                    if (len != _filePointer) {
                        FileInputStream fis = new FileInputStream(_file);
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
                    System.err.println("xml_event_reader() cannot_read_file:" + e.getMessage());
                    break;
                }

                // Test to reset ObjectOutputStream object to avaoid heap memory issue
                if (count_reset++ > 500) {
                    oos.reset();
                    count_reset = 0;
                }
                try {
                    Thread.sleep(_updateInterval);
                } catch (InterruptedException e) {
                    System.err.println("xml_event_reader() port:" + this._port + " " + e.getMessage());
                }
                len = new File(_file).length();
            }
        } catch (IOException e) {
            System.err.println("xml_event_reader() port:" + this._port + " " + e.getMessage());
        } catch (ClassNotFoundException e) {
            System.err.println("xml_event_reader() port:" + this._port + " " + e.getMessage());
        }
        try {
            if (ois != null) ois.close();
        } catch (Exception e) {
            System.err.println("xml_event_reader() port:" + this._port + " " + e.getMessage());
        }
        try {
            if (oos != null) oos.close();
        } catch (Exception e) {
            System.err.println("xml_event_reader() port:" + this._port + " " + e.getMessage());
        }
        try {
            if (_socket != null) _socket.close();
        } catch (Exception e) {
            System.err.println("xml_event_reader() port:" + this._port + " " + e.getMessage());
        }
        System.out.println("Client " + _socket.getPort() + " disconnected ... - Waiting for new client message...");
    }

    private void ob_test() {
        ObjectInputStream ois = null;
        ObjectOutputStream oos = null;
        try {
            // Read a message sent by client application
            ois = new ObjectInputStream(_socket.getInputStream());
            String message = (String) ois.readObject();
            System.out.println("Message Received: " + message);

            // Send a response information to the client application
            oos = new ObjectOutputStream(_socket.getOutputStream());
            int count_reset = 0;
            String type = "xml";
            Boolean save_file = false;
            String events;
            String sdateFileStart;
            String sdateFileEnd;
            long minuteInMillis = 60L * 1000L;
            Random randomGenerator = new Random();
            int random_nb_minutes;
            long current_time_plus_nb_minutes;
            Date start;
            SimpleDateFormat dateFileStart = new SimpleDateFormat("MMM dd yyyy hh:mm:ss", Locale.ENGLISH);
            int random_last;
            Date end;
            SimpleDateFormat dateFileEnd = new SimpleDateFormat("MMM dd yyyy hh:mm:ss", Locale.ENGLISH);
            int random_type_event;
            int random_color;
            int random_background = 0;
            int random_OverviewTrackGap = 0;
            int random_OverviewTrackHeight = 0;
            int random_TrackGap = 0;
            int random_TrackHeight = 0;
            int random_TapeHeight = 0;

            int i;

            while (true) {
                try {
                    random_background = randomGenerator.nextInt(30);
                    random_OverviewTrackGap = randomGenerator.nextInt(30);
                    random_OverviewTrackHeight = randomGenerator.nextInt(30);
                    random_TrackGap = randomGenerator.nextInt(30);
                    random_TrackHeight = randomGenerator.nextInt(30);
                    random_TapeHeight = randomGenerator.nextInt(30);
                    if (type.equals("json")) {
                        events = "{ \"dateTimeFormat\": \"iso8601\", \"events\":[";
                        for (i = 0; i < 50; i++) {
                            random_nb_minutes = randomGenerator.nextInt(3600);
                            current_time_plus_nb_minutes = new Date().getTime() + (random_nb_minutes * minuteInMillis);
                            start = new Date(current_time_plus_nb_minutes);

                            random_last = randomGenerator.nextInt(60 * 60 * 1000);
                            end = new Date(current_time_plus_nb_minutes + random_last);

                            sdateFileStart = dateFileStart.format(start);
                            sdateFileEnd = dateFileEnd.format(end);

                            random_type_event = randomGenerator.nextInt(2);
                            random_color = randomGenerator.nextInt(999999);
                            if (random_type_event > 0)
                                events += "{ \"start\":\"" + sdateFileStart + "\" \"end\":\"" + sdateFileEnd + "\" \"title\":\"event" + i + "\" \"isDuration\":\"true\" \"color\":\"#" + random_color + "\" \"textColor\":\"red\" \"description\":\"" + i + "\" },";
                            else
                                events += "{\"start\":\"" + sdateFileStart + "\" \"title\":\"event" + i + "\" \"isDuration\":\"true\" \"color\":\"#" + random_color + "\" \"textColor\":\"white\" \"description\":\"" + i + "\" },";
                        }
                        events += "]}";
                    } else {

                        events = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<data ";
                        events += "wiki-url=\"http://www.openbexi.com\" ";
                        events += "wiki-section=\"Simile openbexi Timeline\" ";

                        events += "loadEvents=\"yes\" ";

                        events += "setBackgroundImgBand=\"yes\" ";
                        events += "BackgroundImgBand=\"background/fading_background_" + random_background + ".png\" ";

                        events += "OverviewTrackGap=\"" + random_OverviewTrackGap + "\" ";
                        events += "OverviewTrackHeight=\"" + random_OverviewTrackHeight + "\" ";
                        events += "TrackGap=\"" + random_TrackGap + "\" ";
                        events += "TrackHeight=\"" + random_TrackHeight + "\" ";
                        events += "TapeHeight=\"" + random_TapeHeight + "\" ";

                        if (random_background < 10)
                            events += "BackgroundBand=\"top, rgba(244,252,249,1) 0%, rgba(232,250,244,1) 31%, rgba(197,253,235,1) 100%\" ";
                        else if (random_background > 10 && random_background < 20)
                            events += "BackgroundBand=\"top, #b8af80 0%,#b3af80 100%\" ";
                        else
                            events += "BackgroundBand=\"top, #f3e2c7 0%,#c19e67 50%,#b68d4c 51%,#e9d4b3 100%\" ";

                        for (i = 0; i < 1050; i++) {
                            random_nb_minutes = randomGenerator.nextInt(4 * 3600);
                            current_time_plus_nb_minutes = new Date().getTime() + (random_nb_minutes * minuteInMillis);
                            start = new Date(current_time_plus_nb_minutes);


                            random_last = randomGenerator.nextInt(60 * 60 * 1000);
                            end = new Date(current_time_plus_nb_minutes + random_last);

                            sdateFileStart = dateFileStart.format(start);
                            sdateFileEnd = dateFileEnd.format(end);

                            random_type_event = randomGenerator.nextInt(2);
                            random_color = randomGenerator.nextInt(999999);
                            if (random_type_event > 0)
                                events += "<event start=\"" + sdateFileStart + "\" end=\"" + sdateFileEnd + "\" title=\"event" + i + "\" isDuration=\"true\" color=\"#" + random_color + "\" textColor=\"red\" > description" + i + " </event>\n";
                            else
                                events += "<event start=\"" + sdateFileStart + "\" title=\"event" + i + "\" isDuration=\"true\" color=\"#" + random_color + "\" textColor=\"white\"> description" + i + " </event>\n";
                        }
                        events += "</data>\n";
                    }
                    if (save_file) {
                        OutputStream out = new FileOutputStream("/project/no_name/data/no_name_no_name_div0.xml");
                        new PrintStream(out).println(events);
                        out.close();
                        oos.writeObject("project/no_name/data/no_name_no_name_div0.xml");
                    } else
                        oos.writeObject(events);

                    // Test to reset ObjectOutputStream object to avaoid heap memory issue
                    if (count_reset++ > 500) {
                        oos.reset();
                        count_reset = 0;
                    }
                } catch (Exception e) {
                    System.err.println("OPENBEXI_Creative_socket_retriever.ob_test() port:" + this._port + " " + e.getMessage());
                    break;
                }
                try {
                    Thread.sleep(_updateInterval);
                } catch (InterruptedException e) {
                    System.err.println("OPENBEXI_Creative_socket_retriever.ob_test() port:" + this._port + " " + e.getMessage());
                    break;
                }
            }

        } catch (IOException e) {
            System.err.println("OPENBEXI_Creative_socket_retriever.ob_test() port:" + this._port + " " + e.getMessage());
        } catch (ClassNotFoundException e) {
            System.err.println("OPENBEXI_Creative_socket_retriever.ob_test() port:" + this._port + " " + e.getMessage());
        }
        try {
            if (ois != null) ois.close();
        } catch (Exception e) {
            System.err.println("OPENBEXI_Creative_socket_retriever.ob_test() port:" + this._port + " " + e.getMessage());
        }
        try {
            if (oos != null) oos.close();
        } catch (Exception e) {
            System.err.println("OPENBEXI_Creative_socket_retriever.ob_test() port:" + this._port + " " + e.getMessage());
        }
        try {
            if (_socket != null) _socket.close();
        } catch (Exception e) {
            System.err.println("OPENBEXI_timeline_retriever.ob_test() port:" + this._port + " " + e.getMessage());
        }
        System.out.println("Client " + _socket.getPort() + " disconnected ... - Waiting for new client message...");
    }

    private void ob_test2() {
        ObjectInputStream ois = null;
        ObjectOutputStream oos = null;
        try {
            // Read a message sent by client application
            ois = new ObjectInputStream(_socket.getInputStream());
            String message = (String) ois.readObject();
            System.out.println("Message Received: " + message);

            // Send a response information to the client application
            oos = new ObjectOutputStream(_socket.getOutputStream());
            int count_reset = 0;
            String events;
            int event_number = 500;
            long minuteInMillis = 60L * 1000L;
            Random randomGenerator = new Random();
            long current_time_plus_nb_minutes;

            SimpleDateFormat dateFileEnd = new SimpleDateFormat("MMM dd yyyy hh:mm:ss", Locale.ENGLISH);
            int[] random_event_status = new int[event_number];
            int[] random_resource = new int[event_number];
            int[] random_type_event = new int[event_number];
            String[] current_color = new String[event_number];
            int[] last = new int[event_number];
            int[] starttime = new int[event_number];
            int[] band_position = new int[event_number];
            Date[] start = new Date[event_number];
            SimpleDateFormat dateFileStart = new SimpleDateFormat("MMM dd yyyy hh:mm:ss", Locale.ENGLISH);
            Date[] end = new Date[event_number];

            // Set scheduling
            for (int l = 0; l < event_number; l++) {
                random_event_status[l] = randomGenerator.nextInt(5);
                random_resource[l] = randomGenerator.nextInt(5);
                random_type_event[l] = randomGenerator.nextInt(5);
                starttime[l] = randomGenerator.nextInt(5000);
                last[l] = randomGenerator.nextInt(30);
                band_position[l] = randomGenerator.nextInt(4);
                Date date = new Date();
                start[l] = new Date(date.getTime() + (starttime[l] * minuteInMillis));
                end[l] = new Date(date.getTime() + ((starttime[l] * minuteInMillis) + (last[l] * minuteInMillis)));
                current_color[l] = "BFC7C9"; //white-Gray
            }

            int i;
            Long current_event_start_date = 0L;
            Long current_event_end_date = 0L;
            int random_band_count = 0;
            String setOverviewPosition = "top";
            while (true) {
                try {

                    events = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<data ";
                    events += "wiki-url=\"http://www.openbexi.com\" ";
                    events += "wiki-section=\"Simile openbexi Timeline\" ";

                    events += "loadEvents=\"yes\" ";

                    //overview position
                    if (randomGenerator.nextInt(5) == 0) {
                        events += "setOverviewPosition=\"top\" ";
                        setOverviewPosition = "top";
                    } else {
                        events += "setOverviewPosition=\"bottom\" ";
                        setOverviewPosition = "botton";
                    }

                    //Background
                    events += "BackgroundBand=\"top, #A7DDE8 0%,#87D6E6 100%\" ";

                    if (randomGenerator.nextInt(2) != 0) {
                        events += "band_count=\"" + "2" + "\">\n";
                    } else {
                        events += "band_count=\"" + "3" + "\">\n";
                    }
                    long current_date = new Date().getTime();
                    for (i = 0; i < event_number; i++) {
                        current_event_start_date = start[i].getTime();
                        if (random_type_event[i] < 1)
                            events += "<event band_position=\"1\" start=\"" + start[i] + "\" title=\"event " + i + "\" isDuration=\"true\" color=\"#" + current_color[i] + "\" textColor=\"black\" > description" + i + " </event>\n";
                        else {
                            current_event_end_date = end[i].getTime();
                            if (current_event_start_date < current_date && current_date < current_event_end_date)
                                current_color[i] = "5ECF32";  //green
                            else if (current_event_start_date < current_date && current_date > current_event_end_date)
                                if (random_event_status[i] == 0)
                                    current_color[i] = "B13EDE";  //purple Aborted
                                else
                                    current_color[i] = "9FCFED";  //blue conpleted
                            else
                                current_color[i] = "BFC7C9";  //white-Gray
                            if (band_position[i] != 1)
                                events += "<event band_position=\"" + band_position[i] + "\" resource=\"" + random_resource[i] + "\" start=\"" + start[i] + "\" end=\"" + end[i] + "\" title=\"session " + i + "\" isDuration=\"true\" color=\"#" + current_color[i] + "\" textColor=\"black\" > description" + i + " </event>\n";
                        }
                    }
                    events += "</data>\n";
                    oos.writeObject(events);

                    // Test to reset ObjectOutputStream object to avaoid heap memory issue
                    if (count_reset++ > 500) {
                        oos.reset();
                        count_reset = 0;
                    }
                } catch (Exception e) {
                    System.err.println("OPENBEXI_Creative_socket_retriever.test2() port:" + this._port + " " + e.getMessage());
                    break;
                }
                try {
                    Thread.sleep(_updateInterval);
                } catch (InterruptedException e) {
                    System.err.println("OPENBEXI_Creative_socket_retriever.test2() port:" + this._port + " " + e.getMessage());
                    break;
                }
            }

        } catch (IOException e) {
            System.err.println("OPENBEXI_Creative_socket_retriever.test2() port:" + this._port + " " + e.getMessage());
        } catch (ClassNotFoundException e) {
            System.err.println("OPENBEXI_Creative_socket_retriever.test2() port:" + this._port + " " + e.getMessage());
        }
        try {
            if (ois != null) ois.close();
        } catch (Exception e) {
            System.err.println("OPENBEXI_Creative_socket_retriever.test2() port:" + this._port + " " + e.getMessage());
        }
        try {
            if (oos != null) oos.close();
        } catch (Exception e) {
            System.err.println("OPENBEXI_Creative_socket_retriever.test2() port:" + this._port + " " + e.getMessage());
        }
        try {
            if (_socket != null) _socket.close();
        } catch (Exception e) {
            System.err.println("OPENBEXI_timeline_retriever.test2() port:" + this._port + " " + e.getMessage());
        }
        System.out.println("Client " + _socket.getPort() + " disconnected ... - Waiting for new client message...");
    }


    private void ob_test3() {
        ObjectInputStream ois = null;
        ObjectOutputStream oos = null;
        try {
            // Read a message sent by client application
            ois = new ObjectInputStream(_socket.getInputStream());
            String message = (String) ois.readObject();
            System.out.println("Message Received: " + message);

            // Send a response information to the client application
            oos = new ObjectOutputStream(_socket.getOutputStream());
            int count_reset = 0;
            String events;
            int event_number = 2500;
            long minuteInMillis = 60L * 1000L;
            Random randomGenerator = new Random();
            long current_time_plus_nb_minutes;

            SimpleDateFormat dateFileEnd = new SimpleDateFormat("MMM dd yyyy hh:mm:ss", Locale.ENGLISH);
            int[] random_event_status = new int[event_number];
            int[] random_resource = new int[event_number];
            String[] current_color = new String[event_number];
            int[] last = new int[event_number];
            int[] starttime = new int[event_number];
            int[] band_position = new int[event_number];
            Date[] start = new Date[event_number];
            SimpleDateFormat dateFileStart = new SimpleDateFormat("MMM dd yyyy hh:mm:ss", Locale.ENGLISH);
            Date[] end = new Date[event_number];
            int band_count = 4;

            // Set scheduling
            for (int l = 0; l < event_number; l++) {
                random_event_status[l] = randomGenerator.nextInt(5);
                random_resource[l] = randomGenerator.nextInt(7);
                starttime[l] = randomGenerator.nextInt(3000);
                last[l] = randomGenerator.nextInt(30);
                band_position[l] = randomGenerator.nextInt(band_count);
                if (band_position[l] == 0) band_position[l] = 1;
                Date date = new Date();
                start[l] = new Date(date.getTime() + (starttime[l] * minuteInMillis));
                end[l] = new Date(date.getTime() + ((starttime[l] * minuteInMillis) + (last[l] * minuteInMillis)));
                current_color[l] = "BFC7C9"; //white-Gray
            }

            int i;
            Long current_event_start_date = 0L;
            Long current_event_end_date = 0L;
            int random_band_count = 0;
            String setOverviewPosition = "top";
            Boolean first_time = false;
            while (true) {
                try {

                    events = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<data ";
                    events += "wiki-url=\"http://www.openbexi.com\" ";
                    events += "wiki-section=\"Simile openbexi Timeline\" ";

                    events += "loadEvents=\"yes\" ";

                    if (!first_time) {
                        //user/role
                        events += "user=\"user1\" ";
                        events += "role=\"role1\" ";
                        events += "group=\"group1\" ";
                        //overview position
                        events += "setOverviewPosition=\"top\" ";
                        setOverviewPosition = "top";
                        //Background
                        events += "BackgroundBand=\"top, #A7DDE8 0%,#87D6E6 100%\" ";
                        events += "band_count=\"" + (band_count - 1) + "\"";
                        first_time = true;
                    }
                    events += ">\n";

                    long current_date = new Date().getTime();
                    for (i = 0; i < event_number; i++) {
                        current_event_start_date = start[i].getTime();
                        current_event_end_date = end[i].getTime();
                        if (current_event_start_date < current_date && current_date < current_event_end_date)
                            current_color[i] = "5ECF32";  //green
                        else if (current_event_start_date < current_date && current_date > current_event_end_date)
                            if (random_event_status[i] == 0)
                                current_color[i] = "B13EDE";  //purple Aborted
                            else
                                current_color[i] = "9FCFED";  //blue conpleted
                        else
                            current_color[i] = "BFC7C9";  //white-Gray
                        events += "<event id=\"" + i + "\" band_position=\"" + band_position[i] + "\" resource=\"" + random_resource[i] + "\" start=\"" + start[i] + "\" end=\"" + end[i] + "\" title=\"session " + i + "\" isDuration=\"true\" color=\"#" + current_color[i] + "\" textColor=\"black\" icon=\"/OPENBEXI_Creative/gif/info.png\" image=\"/OPENBEXI_Creative/gif/info.png\"> description" + i + " </event>\n";
                    }
                    events += "</data>\n";
                    oos.writeObject(events);

                    // Save events instance in xml file
                    /*try {
                        BEXI_ApplicationPath _applicationPath = new BEXI_ApplicationPath();
                        FileOutputStream file = new FileOutputStream(_applicationPath.getDefaultPath() + "/data/timeline/" + "timeline_test.xml");
                        StreamResult result = new StreamResult(file);
                        new PrintStream(file).println(events);
                        file.close();
                    } catch (Exception e) {
                        System.err.println("CannotSaveFile:" + e.getMessage());
                    }*/

                    // Test to reset ObjectOutputStream object to avaoid heap memory issue
                    if (count_reset++ > 500) {
                        oos.reset();
                        count_reset = 0;
                    }
                } catch (Exception e) {
                    System.err.println("OPENBEXI_Creative_socket_retriever.ob_test2() port:" + this._port + " " + e.getMessage());
                    break;
                }
                try {
                    Thread.sleep(_updateInterval);
                } catch (InterruptedException e) {
                    System.err.println("OPENBEXI_Creative_socket_retriever.ob_test2() port:" + this._port + " " + e.getMessage());
                    break;
                }
            }

        } catch (IOException e) {
            System.err.println("OPENBEXI_Creative_socket_retriever.ob_test2() port:" + this._port + " " + e.getMessage());
        } catch (ClassNotFoundException e) {
            System.err.println("OPENBEXI_Creative_socket_retriever.ob_test2() port:" + this._port + " " + e.getMessage());
        }
        try {
            if (ois != null) ois.close();
        } catch (Exception e) {
            System.err.println("OPENBEXI_Creative_socket_retriever.ob_test2() port:" + this._port + " " + e.getMessage());
        }
        try {
            if (oos != null) oos.close();
        } catch (Exception e) {
            System.err.println("OPENBEXI_Creative_socket_retriever.ob_test2() port:" + this._port + " " + e.getMessage());
        }
        try {
            if (_socket != null) _socket.close();
        } catch (Exception e) {
            System.err.println("OPENBEXI_timeline_retriever.ob_test2() port:" + this._port + " " + e.getMessage());
        }
        System.out.println("Client " + _socket.getPort() + " disconnected ... - Waiting for new client message...");
    }

    private void ob_test_add_delete() {
        ObjectInputStream ois = null;
        ObjectOutputStream oos = null;
        try {
            // Read a message sent by client application
            ois = new ObjectInputStream(_socket.getInputStream());
            String message = (String) ois.readObject();
            System.out.println("Message Received: " + message);

            // Send a response information to the client application
            oos = new ObjectOutputStream(_socket.getOutputStream());
            int count_reset = 0;
            String events;
            int event_number = 1000;
            long minuteInMillis = 60L * 1000L;
            Random randomGenerator = new Random();
            long current_time_plus_nb_minutes;

            SimpleDateFormat dateFileEnd = new SimpleDateFormat("MMM dd yyyy hh:mm:ss", Locale.ENGLISH);
            int[] random_event_status = new int[event_number];
            int[] random_resource = new int[event_number];
            String[] current_color = new String[event_number];
            int[] last = new int[event_number];
            int[] starttime = new int[event_number];
            int[] band_position = new int[event_number];
            Date[] start = new Date[event_number];
            SimpleDateFormat dateFileStart = new SimpleDateFormat("MMM dd yyyy hh:mm:ss", Locale.ENGLISH);
            Date[] end = new Date[event_number];
            int band_count = 2;

            // Set scheduling
            for (int l = 0; l < event_number; l++) {
                random_event_status[l] = randomGenerator.nextInt(5);
                random_resource[l] = randomGenerator.nextInt(7);
                starttime[l] = randomGenerator.nextInt(3000);
                last[l] = randomGenerator.nextInt(30);
                band_position[l] = randomGenerator.nextInt(band_count);
                if (band_position[l] == 0) band_position[l] = 1;
                Date date = new Date();
                start[l] = new Date(date.getTime() + (starttime[l] * minuteInMillis));
                end[l] = new Date(date.getTime() + ((starttime[l] * minuteInMillis) + (last[l] * minuteInMillis)));
                current_color[l] = "BFC7C9"; //white-Gray
            }

            int i;
            Long current_event_start_date = 0L;
            Long current_event_end_date = 0L;
            int random_band_count = 0;
            String setOverviewPosition = "top";
            Boolean first_time = false;
            Boolean add_flag = false;
            while (true) {
                try {

                    events = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<data ";
                    events += "wiki-url=\"http://www.openbexi.com\" ";
                    events += "wiki-section=\"Simile openbexi Timeline\" ";

                    if (!first_time) {
                        events += "loadEvents=\"yes\" ";
                        //user/role
                        events += "user=\"user1\" ";
                        events += "role=\"role1\" ";
                        events += "group=\"group1\" ";
                        //overview position
                        events += "setOverviewPosition=\"top\" ";
                        setOverviewPosition = "top";
                        //Background
                        events += "BackgroundBand=\"top, #A7DDE8 0%,#87D6E6 100%\" ";
                        events += "band_count=\"" + (band_count - 1) + "\" ";
                        first_time = true;

                        events += ">\n";

                        long current_date = new Date().getTime();
                        for (i = 0; i < event_number; i++) {
                            current_event_start_date = start[i].getTime();
                            current_event_end_date = end[i].getTime();
                            if (current_event_start_date < current_date && current_date < current_event_end_date)
                                current_color[i] = "5ECF32";  //green
                            else if (current_event_start_date < current_date && current_date > current_event_end_date)
                                if (random_event_status[i] == 0)
                                    current_color[i] = "B13EDE";  //purple Aborted
                                else
                                    current_color[i] = "9FCFED";  //blue conpleted
                            else
                                current_color[i] = "BFC7C9";  //white-Gray
                            events += "<event id=\"" + i + "\" band_position=\"" + band_position[i] + "\" resource=\"" + random_resource[i] + "\" start=\"" + start[i] + "\" end=\"" + end[i] + "\" title=\"session " + i + "\" isDuration=\"true\" color=\"#" + current_color[i] + "\" textColor=\"black\" icon=\"/OPENBEXI_Creative/gif/info.png\" image=\"/OPENBEXI_Creative/gif/info.png\"> description" + i + " </event>\n";
                        }
                    } else {
                        // Remove all odd events
                        long current_date = new Date().getTime();
                        events += "loadEvents=\"yes\" ";
                        events += "updateEvents=\"yes\" ";
                        events += ">\n";

                        // Add all odd events
                        add_flag = !add_flag;
                        for (i = 0; i < event_number; i++) {
                            current_event_start_date = start[i].getTime();
                            current_event_end_date = end[i].getTime();
                            if (current_event_start_date < current_date && current_date < current_event_end_date)
                                current_color[i] = "5ECF32";  //green
                            else if (current_event_start_date < current_date && current_date > current_event_end_date)
                                if (random_event_status[i] == 0)
                                    current_color[i] = "B13EDE";  //purple Aborted
                                else
                                    current_color[i] = "9FCFED";  //blue conpleted
                            else
                                current_color[i] = "BFC7C9";  //white-Gray

                            //If odd event
                            if ((i / 2) * 2 == i)
                                if (add_flag) {
                                    events += "<event action=\"add\" id=\"" + i + "\" band_position=\"" + band_position[i] + "\" resource=\"" + random_resource[i] + "\" start=\"" + start[i] + "\" end=\"" + end[i] + "\" title=\"session " + i + " added\" isDuration=\"true\" color=\"#" + current_color[i] + "\" textColor=\"black\" icon=\"/OPENBEXI_Creative/gif/info.png\" image=\"/OPENBEXI_Creative/gif/info.png\"> description" + i + " </event>\n";
                                } else {
                                    events += "<event action=\"delete\" id=\"" + i + "\" band_position=\"" + band_position[i] + "\" resource=\"" + random_resource[i] + "\" start=\"" + start[i] + "\" end=\"" + end[i] + "\" title=\"session " + i + "\" isDuration=\"true\" color=\"#" + current_color[i] + "\" textColor=\"black\" icon=\"/OPENBEXI_Creative/gif/info.png\" image=\"/OPENBEXI_Creative/gif/info.png\"> description" + i + " </event>\n";
                                }
                        }
                    }
                    events += "</data>\n";

                    oos.writeObject(events);

                    // Test to reset ObjectOutputStream object to avaoid heap memory issue
                    if (count_reset++ > 500) {
                        oos.reset();
                        count_reset = 0;
                    }
                } catch (Exception e) {
                    System.err.println("OPENBEXI_Creative_socket_retriever.ob_test2() port:" + this._port + " " + e.getMessage());
                    break;
                }
                try {
                    Thread.sleep(_updateInterval);
                } catch (InterruptedException e) {
                    System.err.println("OPENBEXI_Creative_socket_retriever.ob_test2() port:" + this._port + " " + e.getMessage());
                    break;
                }
            }

        } catch (IOException e) {
            System.err.println("OPENBEXI_Creative_socket_retriever.ob_test2() port:" + this._port + " " + e.getMessage());
        } catch (ClassNotFoundException e) {
            System.err.println("OPENBEXI_Creative_socket_retriever.ob_test2() port:" + this._port + " " + e.getMessage());
        }
        try {
            if (ois != null) ois.close();
        } catch (Exception e) {
            System.err.println("OPENBEXI_Creative_socket_retriever.ob_test2() port:" + this._port + " " + e.getMessage());
        }
        try {
            if (oos != null) oos.close();
        } catch (Exception e) {
            System.err.println("OPENBEXI_Creative_socket_retriever.ob_test2() port:" + this._port + " " + e.getMessage());
        }
        try {
            if (_socket != null) _socket.close();
        } catch (Exception e) {
            System.err.println("OPENBEXI_timeline_retriever.ob_test2() port:" + this._port + " " + e.getMessage());
        }
        System.out.println("Client " + _socket.getPort() + " disconnected ... - Waiting for new client message...");
    }
}

public class OPENBEXI_timeline_retriever {

    private ServerSocket _server;
    private int _port = 7777;
    private String _mode = "test";
    private String _file;
    private int _session;
    private long _updateInterval = 10000L;

    public OPENBEXI_timeline_retriever(int port, String mode, String file, int session, long updateInterval) {
        try {
            _port = port;
            _server = new ServerSocket(_port);
            _mode = mode;
            _file = file;
            _session = session;
            _updateInterval = updateInterval;
        } catch (IOException e) {
            System.err.println("OPENBEXI_timeline_retriever() port:" + this._port + " " + e.getMessage());
        }
    }

    public void handleConnection() {
        System.out.println("Waiting for client message... port:" + _port);

        // The server do a loop here to accept all connection initiated by the client application.
        while (true) {
            try {
                Socket socket = _server.accept();
                new ConnectionHandler(socket, _mode, _file, _port, _session, _updateInterval);
                System.out.println("socket port:" + socket.getPort() + " - InetAddress:" + socket.getInetAddress() + " - server port:" + _server.getLocalPort());
            } catch (IOException e) {
                System.err.println("OPENBEXI_timeline_retriever.handleConnection() port:" + this._port + " " + e.getMessage());
                break;
            }
        }
    }

    public static void main(String[] args) {
        String mode = "test";
        int port = 7777;
        long updateInterval = 15000L;
        String file = null;
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
                            updateInterval = Integer.parseInt(args[i + 1]) * 1000L;
                        }
                    } catch (Exception e) {
                        updateInterval = 15000L;
                    }
                }
                if (args[0] != null && args[i].equals("-mode")) {
                    try {
                        if (args[i + 1] != null && !args[i + 1].equals("")) {
                            mode = args[i + 1];
                            file = args[i + 2];
                            File file2 = new File(file);
                            //if (!file2.isFile()) System.err.println(file + " does not exist!");
                        }
                    } catch (Exception e) {
                    }
                }
            }
        } else {
            System.out.println("Usage:" + args[0] + " -mode xml_event_reader <filename> -p <port number> -updateInterval <seconde(s)> -- ex: " + args[0] + " -mode xml_event_reader foo -p 7777 -updateInterval 2");
            System.exit(1);
        }

        if (mode.equals("xml_event_reader"))
            System.out.println("Starting timeline server, reading " + file + ", on port:" + port + ", updateInterval=" + updateInterval);
        else
            System.out.println("Starting timeline server... port:" + port);
        OPENBEXI_timeline_retriever server;
        server = new OPENBEXI_timeline_retriever(port, mode, file, 0, updateInterval);
        server.handleConnection();
    }
}