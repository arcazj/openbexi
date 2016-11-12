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

import org.omg.CORBA.ORB;
import org.omg.PortableServer.POA;
import org.omg.PortableServer.POAHelper;

import java.io.PrintWriter;
import java.io.FileWriter;

public class OPENBEXI_timeline_server extends OPENBEXI_timeline_orbPOA {
    @Override
    public timeline[] get_Timelines() {
        return new timeline[0];  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public timeline_alive contact_Timelines(String id) {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public timeline_status add_Timeline_ressources(String id, resource[] res) {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public timeline_status delete_Timeline_ressources(String id, resource[] res) {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public timeline_status update_Timeline_ressources(String id, resource[] res) {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public resource[] get_Timeline_ressources(String id) {
        return new resource[0];  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public timeline_status add_Timeline_sessions(String id, session[] res) {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public timeline_status delete_Timeline_sessions(String id, session[] res) {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public timeline_status update_Timeline_sessions(String id, session[] res) {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public session[] get_Timeline_sessions(String id) {
        return new session[0];  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public session get_Timeline_session(String id, String session_id) {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public timeline_status update_Timeline_css(String id, css properties) {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public void print(timeline[] timelines) {
        //To change body of implemented methods use File | Settings | File Templates.
    }

    public timeline_alive contact_Timelines() {
        System.out.println("Timeline has been contacted");
        return timeline_alive.T_ON;
    }

    /*public resource[] get_Resources() {
        resource[] resources = new resource[3];
        resource r0 = new resource(0, "R0");
        resource r1 = new resource(1, "R1");
        resource r2 = new resource(1, "R2");
        resources[0] = r0;
        resources[1] = r1;
        resources[2] = r2;
        return resources;  //To change body of implemented methods use File | Settings | File Templates.
    }*/

    public event get_Resource(String resource_id) {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    public event[] get_Events() {
        return new event[0];  //To change body of implemented methods use File | Settings | File Templates.
    }

    public event get_Event(String event_id) {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    public static void main(final String[] args) {

        OPENBEXI_timeline timeline = new OPENBEXI_timeline(null, null,null);

        boolean create_test = false;
        boolean create_timeline_server = true;
        if (create_test)
            try {
                timeline.createTestXmlFile();

            } catch (Exception e) {
                e.getMessage();
                System.exit(0);
            }
        if (create_timeline_server && args.length != 1) {
            System.out.println(
                    "Usage: OPENBEXI_timeline <ior_file>");
            System.exit(1);
        }
        System.out.println("Timeline server started ...");
        try {
            //init ORB
            ORB orb = ORB.init(args, null);

            //init POA
            POA poa =
                    POAHelper.narrow(orb.resolve_initial_references("RootPOA"));

            poa.the_POAManager().activate();

            // create a GoodDay object
            OPENBEXI_timeline_server timeline_server = new OPENBEXI_timeline_server();

            // create the object reference
            org.omg.CORBA.Object obj = poa.servant_to_reference(timeline_server);

            PrintWriter pw = new PrintWriter(new FileWriter(args[0]));

            // print stringified object reference to file
            pw.println(orb.object_to_string(obj));
            

            pw.flush();
            pw.close();

            // wait for requests
            orb.run();
        }
        catch (Exception e) {
            System.out.println(e);
        }
    }
}
