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

public class BEXI_BDD_Modele_FR_EN extends TestCase {
    public BEXI_BDD_Modele_FR_EN(String test) {
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

        BEXI_list action;
        Object result;
        BEXI_list resultList;

        // Set bexi context
        BEXI_Context context = new BEXI_Context(0);

        // Set a OPENBEXI application contextApplication
        BEXI_ApplicationPath contextPath = new BEXI_ApplicationPath();
        contextPath.set_defaultLanguage("en");
        BEXI_SqlContext sqlContext = contextPath.get_SqlContextManager().getBEXI_SqlContext("jdbc:hsqldb:file:hsqldb/data/bexi_en");
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
            //return;
        }
        String request1[] = {

                "select all attributes for book class",

        };

        if (request1 != null) {
            // Test cleanup the database
            for (int i = 0; i < request1.length; i++) {

                try {
                    BEXI_Expression exp = new BEXI_Expression();
                    action = exp.analyze(context, request1[i]);
                    System.out.println("\n" + i + ":" + request1[i] + " ---  action:" + action.getItem(0) + "  ---- OK");
                    context.add(exp);
                    result = exp.result(context, action.getItem(0));

                    if (result != null && result instanceof List) {
                        resultList = (BEXI_list) result;
                        for (int j = 0; j < resultList.getItemCount(); j++) {
                            System.out.println(resultList.getItem(j));
                        }
                    }
                } catch (Exception e) {
                    System.out.println(e.getMessage() + " for:" + request1[i]);
                }
            }
        }


        contextPath.set_defaultLanguage("fr");
        BEXI_SqlContext sqlContext1 = contextPath.get_SqlContextManager().getBEXI_SqlContext("jdbc:hsqldb:file:hsqldb/data/bexi_fr");
        contextPath.get_SqlContextManager().set_url_current(sqlContext1.get_url());

        context.add(contextPath);
        context.add(sqlContext1);

        String request2[] = {
                "donner tous les attributs d une compagnie",
                "donner tous les attributs d une salarié",
                "créer la compagnie Microsoft",
                "créer la compagnie IBM",
                "créer la compagnie Apple",
                "le président de compagnie Microsoft est Gates"

        };

        if (request2 != null) {
            // Test cleanup the database
            for (int i = 0; i < request2.length; i++) {

                try {
                    BEXI_Expression exp = new BEXI_Expression();
                    action = exp.analyze(context, request2[i]);
                    System.out.println("\n" + i + ":" + request2[i] + " ---  action:" + action.getItem(0) + "  ---- OK");
                    context.add(exp);
                    result = exp.result(context, action.getItem(0));

                    if (result != null && result instanceof List) {
                        resultList = (BEXI_list) result;
                        for (int j = 0; j < resultList.getItemCount(); j++) {
                            System.out.println(resultList.getItem(j));
                        }
                    }
                } catch (Exception e) {
                    System.out.println(e.getMessage() + " for:" + request2[i]);
                }
            }
        }
    }
}
