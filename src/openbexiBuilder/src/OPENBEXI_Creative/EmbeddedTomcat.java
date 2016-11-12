/* This notice must be untouched at all times.

Copyright (c) 2005-2013 JC Arcaz. All rights reserved.
OPEN OPENBEXI Creative: server side for generating dynanic HTML page and html code source from browsers.Works with OPEN OPENBEXI HTML Builder
updated: July 25  2009 version 2.3
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

// Tomcat 5

import org.apache.catalina.connector.Connector;
import org.apache.catalina.realm.MemoryRealm;
import org.apache.catalina.startup.Embedded;

// Tomcat 7
import org.apache.catalina.Context;
import org.apache.catalina.*;
import org.apache.catalina.startup.Tomcat;

import javax.servlet.ServletException;
import java.io.File;


public class EmbeddedTomcat {
    // Instance variables:
    private String name;
    private String mode;
    private int portNumber;
    private Embedded embedded;
    private Engine baseEngine;
    private Host baseHost;
    private Connector httpConnector;


    /**
     * Creates a new instance of EmbeddedTomcat
     */
    public EmbeddedTomcat(
            int version,
            String name,
            int portNumber,
            String mode) {

        this.name = name;
        this.mode = mode;
        this.portNumber = portNumber;

        if (version == 5) init_tomcat5();
        if (version == 7) init_tomcat7();
    }

    private void init_tomcat7() {
        System.out.println("Start tomcat 7 ...");
        Tomcat tomcat;
        String baseDir = "apache-tomcat-embed/webapps";
        File file = new File(baseDir);

        try {
            tomcat = new Tomcat();
            tomcat.setPort(portNumber);
            tomcat.addWebapp(null, "/", file.getAbsolutePath() + "/OPENBEXI_Creative");
            tomcat.addWebapp(null, "/manager", file.getAbsolutePath() + "/manager");
            tomcat.start();
            if (this.mode.equals("display")) {
                OPENBEXI_Browser browser = new OPENBEXI_Browser();
                browser.launch("http://localhost:8282/openbexi.do");
            }
            while (true) {
                try {
                    Thread.sleep(5000);
                } catch (InterruptedException e) {
                    System.err.println("Exception:" + e.getMessage());
                }
            }
        } catch (LifecycleException e) {
            System.err.println("Exception:" + e.getMessage());
        }
    }

    private void init_tomcat5() {
        System.out.println("Start tomcat 5 ...");
        MemoryRealm realm;
        Context context;
        String baseEngineName;
        String hostName;

        embedded = new Embedded();
        realm = new MemoryRealm();
        embedded.setRealm(realm);

        // create an Engine
        baseEngine = embedded.createEngine();

        // set Engine properties
        baseEngineName = name + "Engine";
        hostName = name + "Host";

        baseEngine.setName(baseEngineName);
        baseEngine.setDefaultHost(hostName);

        baseHost = embedded.createHost(hostName, "webapps");
        baseEngine.addChild(baseHost);

        // RootContext
        //context = addContext("", "ROOT");
        context = addContext("", "OPENBEXI_Creative");

        // ManagerContext
        context = addContext("/manager", "manager");
        context.setPrivileged(true);

        // add new Engine to set of Engine for embedded server
        embedded.addEngine(baseEngine);

        // create Connector
        httpConnector = embedded.createConnector((java.net.InetAddress) null,
                portNumber, false);

        // add new Connector to set of Connectors for embedded server, associated
        // with Engine
        embedded.addConnector(httpConnector);
    }

    public void start() {
        // start server
        try {
            embedded.start();
        }
        catch (org.apache.catalina.LifecycleException ex) {
            ex.printStackTrace();

            //fileLog.log("Startup failed");
            //fileLog.log(ex.getMessage());
        }
    }

    public Context addContext(
            String path,
            String docBase) {
        Context c;

        c = embedded.createContext(path, docBase);
        baseHost.addChild(c);

        return c;
    }

    public static void main(String[] args) {
        int version = 7;
        int port = 8282;
        String mode = "display";
        if (args.length > 0) {
            if (args[0].equals("-p")) {
                try {
                    if (!args[1].equals("")) {
                        port = Integer.parseInt(args[1]);
                    }
                } catch (Exception e) {
                    port = 8282;
                }
            }
            if (args[2].equals("-mode")) {
                try {
                    if (args[3].equals("text")) {
                        mode = "text";
                    }
                } catch (Exception e) {

                }
            }
            if (args[4].equals("-tomcat_version")) {
                try {
                    version = Integer.parseInt(args[5]);
                } catch (Exception e) {
                    version = 7;
                }
            }
        }
        System.out.println("Starting tomcat " + version + " ..." + "port:" + port + " mode:" + mode);
        try {
            if (version == 5)
                new EmbeddedTomcat(version, "openbexi", port, mode).start();
            else
                new EmbeddedTomcat(version, "openbexi", port, mode);
        } catch (Exception e) {
        }
    }
}


