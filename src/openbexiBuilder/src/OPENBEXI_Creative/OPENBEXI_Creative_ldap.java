package OPENBEXI_Creative;

import OPENBEXI.BEXI_ApplicationPath;
import OPENBEXI.BEXI_XMLDriver;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletResponse;

import org.w3c.dom.Document;
import org.apache.directory.ldap.client.api.LdapNetworkConnection;
import org.apache.directory.ldap.client.api.LdapConnection;
import org.apache.directory.shared.ldap.model.name.Dn;
import org.apache.directory.shared.ldap.model.name.Rdn;
import org.apache.directory.shared.ldap.model.exception.LdapException;
import org.apache.directory.shared.ldap.model.exception.LdapInvalidDnException;
import org.apache.directory.shared.ldap.model.message.*;
import org.apache.directory.shared.ldap.model.schema.SchemaManager;
import org.apache.directory.shared.ldap.model.cursor.SearchCursor;
import org.apache.directory.shared.ldap.model.cursor.EntryCursor;
import org.apache.directory.shared.ldap.model.cursor.Cursor;
import org.apache.directory.shared.ldap.model.entry.Entry;
import org.apache.directory.shared.ldap.schemamanager.impl.DefaultSchemaManager;
import org.apache.directory.shared.dsmlv2.reponse.SearchResponse;

import java.io.IOException;
import java.io.File;

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
public class OPENBEXI_Creative_ldap extends HttpServlet {

    private HttpServletResponse _response;
    private BEXI_ApplicationPath _applicationPath;

    public OPENBEXI_Creative_ldap(HttpServletResponse response, BEXI_ApplicationPath applicationPath) {
        _response = response;
        _applicationPath = applicationPath;
    }

    public void connect(Document docOut) throws Exception {
        try {
            final BEXI_XMLDriver xml = new BEXI_XMLDriver();
            String host = xml.get_class_object_attribute_value(docOut, "ldap", "host", "name");
            int port = Integer.parseInt(xml.get_class_object_attribute_value(docOut, "ldap", "port", "number"));
            String dn = xml.get_class_object_attribute_value(docOut, "ldap", "dn", "value");
            String password = xml.get_class_object_attribute_value(docOut, "ldap", "passwd", "value");
            LdapConnection connection = new LdapNetworkConnection(host);
            //EntryCursor cursor = connection.search( dn, "(objectclass=*)", SearchScope.ONELEVEL, "*" );

               connection.bind(dn, password);
            if (connection.isAuthenticated())
                System.out.println("Connection authenticated ...");
            connection.setTimeOut(0);
            connection.close();
        } catch (LdapInvalidDnException e) {
            System.err.println("Warning: Connection not authenticated !!!");
            System.err.println(e.getMessage());
        } catch (LdapException e) {
            System.err.println(e.getMessage());
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }

    }

    public static void main(String args[]) {
        try {
            Document docOut = null;
            final BEXI_XMLDriver xml = new BEXI_XMLDriver();
            OPENBEXI_Creative_ldap ldap = new OPENBEXI_Creative_ldap(null, null);

            boolean test_failure = false;
            boolean test_success = false;
            String host = args[0];
            String port = args[1];
            String dn = args[2];
            String passwd = args[3];

            if (test_failure) {
                dn = "uid=openbexi,ou=system";
                passwd = "wrong_passwd";
            }
            if (test_success) {
                dn = "uid=openbexi,ou=system";
                passwd = "";
            }
            docOut = xml.set_class_object_attribute_value(docOut, "ldap", "host", "name", host);
            docOut = xml.set_class_object_attribute_value(docOut, "ldap", "port", "number", port);
            docOut = xml.set_class_object_attribute_value(docOut, "ldap", "dn", "value", dn);
            docOut = xml.set_class_object_attribute_value(docOut, "ldap", "passwd", "value", passwd);
            ldap.connect(docOut);
        }
        catch (Exception e) {
            System.err.println(e.getMessage());
        }
        finally {
            System.exit(0);
        }
    }
}
