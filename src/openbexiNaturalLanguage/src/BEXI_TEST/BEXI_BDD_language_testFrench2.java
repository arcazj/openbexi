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

public class BEXI_BDD_language_testFrench2 extends TestCase {
    public BEXI_BDD_language_testFrench2(String test) {
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
        //BEXI_SqlContext sqlContext = contextPath.get_SqlContextManager().getBEXI_SqlContext("jdbc:mysql:///bexi_fr");
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
        String request[] = {

                //delete class
                "détruire la classe homme",
                "détruire la classe ville",
                "détruire la classe cinéma",
                "détruire la classe film",
                "détruire la classe caisse",

                // Delete class links
                "détruire homme habite ville",
                "détruire ville possède cinéma",
                "détruire cinéma diffuse films",

                // create classes
                "créer la classe homme",
                "créer la classe ville",
                "créer la table cinéma",
                "créer la table film",
                "créer la table image",
                "créer la table caisse",

                // Create link between classes
                "un homme habite une ville",
                "une ville posséder des cinémas",
                "un cinéma diffuse des films",

                // Create class attributs
                "un homme a une nom",
                "un homme a un prénom",
                "un homme a une adresse",
                "un homme a un email",
                "un homme a un téléphone",

                "un cinéma a un nom",
                "un cinéma a une adresse",

                // Select  class attribut
                "donner les attributs de la classe homme",
                "donner tous les attributs d' un homme",
                "donner des attributs d' un homme",

                "donner tous les attributs d' un cinéma",

                //Create  class object
                "créer l' homme Duppont",
                "créer l' homme Chatty",
                "créer l' homme Souler",
                "créer l' homme Bru",

                "créer la ville Toulouse",
                "créer la ville Paris",
                "créer la ville Marseille",
                "créer la ville Avignon",


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
