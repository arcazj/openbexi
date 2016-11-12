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

public class BEXI_BDD_Modele_Picture extends TestCase {
    public BEXI_BDD_Modele_Picture(String test) {
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
        BEXI_SqlContext sqlContext = contextPath.get_SqlContextManager().getBEXI_SqlContext("jdbc:mysql:///bexi_en");
        contextPath.get_SqlContextManager().addBEXI_SqlContext(sqlContext);

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
                "delete the picture class",
                "delete the picture artist",
                "delete the picture actor",

                // create classes
                "create the picture class",
                "create the picture artist",

                // Create class attributs
                "a picture has a name",
                "a picture has a filename",
                "a picture has a title",
                "a picture has a description",
                "a picture has a date",
                "a picture has a filesize",
                "a picture has a filetype",
                "a picture has a link",
                "a picture has a copyright",
                "a picture has a genre",

                "a movie has a name",
                "a movie has a filename",
                "a movie has a title",
                "a movie has a description",
                "a movie has a release date",
                "a movie has a size",
                "a movie has a type",
                "a movie has a link",
                "a movie has a genre",
                "a movie has a runtime",

                "an artist has a name",
                "an artist has a fistname",
                "an artist has a age",
                "an artist has a address",

                "an actor has a name",
                "an actor has a fistname",
                "an actor has a age",
                "an actor has a address"

                // Select  class attribut

                //Create  class object
        };

        // WARNING WARNING WARNING WARNING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // WARNING WARNING WARNING WARNING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //request = null;
        // WARNING WARNING WARNING WARNING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // WARNING WARNING WARNING WARNING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        BEXI_list action = null;
        Object result = null;
        BEXI_list resultList = null;
        if (request != null) {
            // Test cleanup the database
            for (int i = 0; i < request.length; i++) {

                try {
                    BEXI_Expression exp = new BEXI_Expression();
                    action = exp.analyze(context, request[i]);
                    System.out.println("\n" + i + ":" + request[i] + " ---  action:" + action.getItem(0) + "  ---- OK");
                    context.add(exp);
                    result = exp.result(context, action.getItem(0));

                    if (result != null && result instanceof List) {
                        resultList = (BEXI_list) result;
                        for (int j = 0; j < resultList.getItemCount(); j++) {
                            System.out.println(resultList.getItem(j));
                        }
                    }
                } catch (Exception e) {
                    System.out.println(e.getMessage() + " for:" + request[i]);
                }
            }
        }
    }
}
