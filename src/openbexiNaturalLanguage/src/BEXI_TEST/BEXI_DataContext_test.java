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
package BEXI_TEST;

import OPENBEXI.*;
import junit.framework.TestCase;

import java.awt.*;
import java.sql.SQLException;

public class BEXI_DataContext_test extends TestCase {
    public BEXI_DataContext_test(String test) {
        super(test);
    }

    /**
     * The fixture set up called before every test method.
     */
    protected void setUp() throws Exception {
    }

    /**
     * The fixture cleanAllCells up called after every test method.
     */
    protected void tearDown() throws Exception {
    }

    public static void testSomething() throws Exception {

        // Set bexi context
        BEXI_Context context = new BEXI_Context(0);

        // Set a OPENBEXI application contextApplication
        BEXI_ApplicationPath contextPath = new BEXI_ApplicationPath();
        contextPath.set_defaultLanguage("fr");
        BEXI_SqlContext sqlContext = contextPath.get_SqlContextManager().getBEXI_SqlContext("jdbc:hsqldb:file:hsqldb/data/bexi_fr");
        contextPath.get_SqlContextManager().set_url_current(sqlContext.get_url());

        context.add(contextPath);
        context.add(sqlContext);

        // Set up MetaRules table from file
        BEXI_MetaRulesManager metaDatabase = new BEXI_MetaRulesManager();
        try {
            metaDatabase.createMetaRulesTable(contextPath);
        } catch (SQLException e) {
            //System.out.println(e.getMessage());
        }
        try {
            metaDatabase.createMetaRulesData(contextPath);
        } catch (SQLException e) {
            //System.out.println(e.getMessage());
            //System.out.println("exit...") ;
            //return;
        }
        String request[] = {"name"};
        // WARNING WARNING WARNING WARNING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        BEXI_list action = null;
        Object result = null;
        BEXI_list resultList = null;
        if (request != null) {
            // Test cleanup the database
            for (int i = 0; i < request.length; i++) {
                BEXI_Expression exp = new BEXI_Expression();
                try {

                    action = exp.analyze(context, request[i]);

                } catch (Exception e) {
                }
                for (int j = 0; j < exp.getFlexions().getItemCount(); j++) {
                    System.out.println(request[i] + " :flexion=" + exp.getFlexions().getItem(j));
                }
                for (int j = 0; j < exp.getFlexions().getItemCount(); j++) {
                    System.out.println(request[i] + " :type=" + exp.getTypes().getItem(j));
                }
                for (int j = 0; j < exp.getRacineList().getItemCount(); j++) {
                    System.out.println(request[i] + " :racine=" + exp.getRacineList().getItem(j));
                }
            }
        }
    }
}
