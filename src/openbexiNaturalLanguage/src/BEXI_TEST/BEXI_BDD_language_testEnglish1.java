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

public class BEXI_BDD_language_testEnglish1 extends TestCase {
    public BEXI_BDD_language_testEnglish1(String test) {
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
        contextPath.set_defaultLanguage("en");
        //BEXI_SqlContext sqlContext = contextPath.get_SqlContextManager().getBEXI_SqlContext("jdbc:mysql:///bexi_en");
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
            //System.out.println("exit...") ;
            //return;
        }

        String request[] = {

                //delete class
                "delete the author class",
                "delete the book class",
                "delete the publisher class",

                // Delete class links
                "delete author write books",
                "delete publisher publishes books",

                // create classes
                "create the author class",
                "create the book class",
                "create the publisher class",

                // Create link between classes
                "an author writes books",
                "an publisher publishes books",

                // delete link between classes
                "delete author write books",
                // Recreate
                "an author writes books",

                // Create class attributs
                "an author has a name",
                "an author has a firstname",
                "an author have an age",

                "a book has a title",
                "a book has a date",
                "a book has a format",
                "a book has pages",

                // delete class attributs
                "delete author name attribute",
                "an author has a name",
                "an author has a firstname",
                "an author have an age",

                // Select  class attribut
                "select all attributes for publisher class",
                "select all attributes for author class",
                "select one attribute for book class",

                //Create  class object
                "create the author Vernes",};

        String request1[] = {

                "a book has a title"
        };

        // WARNING WARNING WARNING WARNING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // WARNING WARNING WARNING WARNING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //request = null;
        // WARNING WARNING WARNING WARNING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // WARNING WARNING WARNING WARNING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        BEXI_list action = null;
        Object result = null;
        BEXI_results resultList = null;
        if (request != null) {
            // Test cleanup the database
            for (int i = 0; i < request.length; i++) {

                try {
                    BEXI_Expression exp = new BEXI_Expression();
                    action = exp.analyze(context, request[i]);
                    System.out.println("\n" + i + ":" + request[i] + " ---  action:" + action.getItem(0) + "  ---- OK");
                    context.add(exp);
                    result = exp.result(context, action.getItem(0));

                    if (result != null && result instanceof BEXI_results) {
                        resultList = (BEXI_results) result;
                        for (int j = 0; j < resultList.get_list().getItemCount(); j++) {
                            System.out.println(resultList.get_list().getItem(j));
                        }
                    }
                } catch (Exception e) {
                    System.out.println(e.getMessage() + " for:" + request[i]);
                }
            }
        }
    }
}
