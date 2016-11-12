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
import java.sql.Statement;

public class BEXI_BDD_language_testFrench1 extends TestCase {
    public BEXI_BDD_language_testFrench1(String test) {
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
        BEXI_Context context = new BEXI_Context(1000);

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
            System.out.println(e.getMessage());
            //System.out.println("exit...") ;
            //return;
        }
        try {
            // select_classes
            BEXI_SQLDriver bexi_SQLDriver = new BEXI_SQLDriver();
            String url_current = contextPath.get_SqlContextManager().get_url_current();
            Statement statement = contextPath.get_SqlContextManager().getBEXI_SqlContext(url_current).get_statement();
            String driver = contextPath.get_SqlContextManager().getBEXI_SqlContext(url_current).get_driver();
            BEXI_results bexi_result = bexi_SQLDriver.select_tables(statement, driver);

            if (bexi_result == null) return;
            int j = 0;
            while (j < bexi_result.get_list().getItemCount()) {
                System.out.println("Found table:" + bexi_result.get_list().getItem(j));
                j++;
            }
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
        String request_quick_test[] = {

                //delete class
                "détruire la classe synonyme",
                "créer la classe synonyme"


        };
        String request[] = {

                //delete class
                "détruire la classe mot",
                "détruire la classe synonyme",
                "détruire la classe définition",
                "détruire la classe expression",
                "détruire la classe antonyme",

                // Delete class links
                "détruire mot possède synonyme",
                "détruire mot possède définitions",
                "détruire mot possède antonymes",

                // create classes
                "créer la classe mot",
                "créer la table synonyme",
                "créer la classe définition",
                "créer la table expression",
                "créer la table antonyme",

                // select classes
                "donner toutes les classes",

                // Create link between classes
                "un mot posséder des synonymes",
                "un mot posséder des antonymes",
                "un mot posséder des définitions",

                // Create class attributs
                "une expression a un contenu",
                "une expression a un lien",
                "un synonyme a des connotations",

                // Select  class attribut
                "donner les attributs de la classe mot",
                "donner tous les attributs d' un mot",
                "donner des attributs d' un mot",
                //Select  class object attribut
                "donner tous les attributs du mot venir",
                "donner les attributs du mot venir",
                "donner des attributs du mot venir",
                "donner un attributs du mot venir",

                // Create class object link
                "le mot détruire possède le synonyme enlever",
                // already exist
                "le mot détruire possède le synonyme enlever",
                // Cannot create this link bause of design
                "le mot détruire venir le synonyme enlever",
                "le mot détruire possède le synonyme casser",
                "le mot détruire possède le synonyme couper",
                "donner les synonymes que possèdent le mot détruire",
                "donner les synonymes que possèdent le mot détruire",
                "le mot détruire possède le synonyme arracher",
                "donner les synonymes que possèdent le mot détruire",
                "le mot détruire possède le synonyme jeter",
                "donner les synonymes que possèdent le mot détruire",
                "le mot détruire possède le synonyme liquider",
                "donner les synonymes que possèdent le mot détruire",
                "le mot détruire possède le synonyme tuer",
                "donner les synonymes que possèdent le mot détruire",
                "le mot détruire possède le synonyme rayer",
                "donner les synonymes que possèdent le mot détruire",
                "le mot détruire possède le synonyme ruiner",
                "donner les synonymes que possèdent le mot détruire",
                "le mot détruire possède le synonyme rayer",
                "donner les synonymes que possèdent le mot détruire",
                "le mot détruire possède le synonyme étrangler",
                "donner les synonymes que possèdent le mot détruire",
                "le mot détruire ne possède plus le synonyme liquider",
                "donner les synonymes que possèdent le mot détruire",
                "le mot détruire ne possède plus le synonyme ruiner",
                "donner les synonymes que possèdent le mot détruire",
                "le mot détruire ne possède plus le synonyme étrangler",
                "donner les synonymes que possèdent le mot détruire",
                "le mot détruire ne possède plus le synonyme enlever",
                "donner les synonymes que possèdent le mot détruire",
                "le mot détruire ne possède plus le synonyme casser",
                "donner les synonymes que possèdent le mot détruire",
                "le mot détruire ne possède plus le synonyme couper",
                "donner les synonymes que possèdent le mot détruire",
                "le mot détruire ne possède plus le synonyme arracher",
                "donner les synonymes que possèdent le mot détruire",
                "le mot détruire ne possède plus le synonyme tuer",
                "donner les synonymes que possèdent le mot détruire",
                "le mot détruire ne possède plus le synonyme rayer",
                "donner les synonymes que possèdent le mot détruire",
                "le mot détruire possède le synonyme liquider",
                "le mot détruire possède le synonyme casser",
                "le mot détruire possède le synonyme couper",
                "donner les synonymes que possèdent le mot détruire",
                "donner toutes les flexions du mot racine détruire",
                "créer le synonyme détruirais",
                "créer le mot détruisez",
                "créer le mot détruire",
                "donner toutes les flexions du mot racine détruire",
                "le mot détruire possède le synonyme couper",
                "donner les synonymes que possèdent le mot détruis",
                "créer le mot détruiraient",
                "donner toutes les flexions du mot racine détruire"

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
                if (i == 21) {
                    System.out.println(i + ":" + request[i] + " OK");
                }

                try {
                    BEXI_Expression exp = new BEXI_Expression();
                    //context.add(contextPath);
                    //context.add(SqlContext);
                    action = exp.analyze(context, request[i]);
                    System.out.println(i + ":" + request[i] + " ---  action:" + action.getItem(0) + "  ---- OK");

                    context.add(exp);
                    result = exp.result(context, action.getItem(0));

                    if (result != null && result instanceof BEXI_results) {
                        resultList = (BEXI_results) result;
                        for (int j = 0; j < resultList.get_list().getItemCount(); j++) {
                            System.out.println(resultList.get_list().getItem(j));
                        }
                    }
                } catch (Exception e) {
                    System.err.println(e.getMessage() + " for:" + request[i]);
                }
            }
        }

        String request1[] = {
                //"donner toutes la racine du mot viens",
                //"donner toutes les types du mot venir",
                //"donner des attributs du mot curer",
                //"donner le type du mot maison" ,
                //"donner la racine du mot abaisse",
                "donner la racine du mot maison",
                //"donner les flexions du mot détruire",
                //"donner le genre du mot maison",

                // THIS CASE NEED TO IMPLEMENT A CONTEXT DESIGN
                //"donner les synonymes du mot détruire",

                //"donner un attribut du mot venir",
                //"donner toutes les flexions du mot détruire",
                //"donner les flexions du mot détruire",
                //"donner les flexions du mot racine détruire",
                //"créer le mot détruirais",
                //"créer le mot détruiraient",
                //"donner toutes les flexions du mot racine détruire",
                //"donner des flexions du mot venir",
                //"donner la racine du mot détruisi",
                //"donner toutes les flexions du mot racine détruire",
                "donner une flexions du mot détruire",
                "donner toutes les flexions du mot racine détruire",
                "donner les synonymes que possèdent le mot détruire",
                "donner les synonymes que possèdent le mot détruire",
                //"le mot détruire ne possède plus le synonyme couper",
                //"détruire le mot détruira",
                //"le mot détruire ne possède plus le synonyme couper",
                //"le mot détruire ne possède plus le synonyme étrangler"
                //"un mot posséder des synonymes"

        };

        if (request1 != null) {
            for (int i = 0; i < request1.length; i++) {
                try {
                    System.out.println(i + ":" + request1[i] + " OK");
                    BEXI_Expression exp = new BEXI_Expression();
                    //context.add(contextPath);
                    //context.add(SqlContext);
                    action = exp.analyze(context, request1[i]);
                    context.add(exp);

                    // Save context
                    //BEXI_Expression exp = new BEXI_Expression();
                    //exp.analyze(contextPath, request[i]);
                    //context.add(exp, "Expression");

                    result = exp.result(context, action.getItem(0));
                    if (result != null && result instanceof BEXI_results) {
                        resultList = (BEXI_results) result;
                        for (int j = 0; j < resultList.get_list().getItemCount(); j++) {
                            System.out.println(resultList.get_list().getItem(j));
                        }
                    }
                } catch (Exception e) {
                    System.out.println(request1[i]);
                    System.out.println(e.getMessage());
                }
            }
        }
    }
}
