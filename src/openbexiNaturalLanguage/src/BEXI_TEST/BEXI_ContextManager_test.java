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

import java.sql.SQLException;

public class BEXI_ContextManager_test extends TestCase {
    public BEXI_ContextManager_test(String test) {
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

    public void testSomething() throws Exception {

        // Set bexi context
        BEXI_Context context = new BEXI_Context(10);

        // Set a OPENBEXI context
        BEXI_ApplicationPath contextPath = new BEXI_ApplicationPath();
        contextPath.set_defaultLanguage("fr");
        //BEXI_SqlContext sqlContext = contextPath.get_SqlContextManager().getBEXI_SqlContext("jdbc:mysql:///bexi_fr");
        BEXI_SqlContext sqlContext = contextPath.get_SqlContextManager().getBEXI_SqlContext("jdbc:hsqldb:file:hsqldb/data/bexi_fr");
        contextPath.get_SqlContextManager().set_url_current(sqlContext.get_url());

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
                "détruire la classe synonyme",
                "détruire la classe définition",
                "détruire la classe expression",
                "détruire la classe antonyme",

                // Delete class links
                "détruire mot possède synonyme",
                "détruire mot possède définitions",
                "détruire mot possède antonymes",

                // create classes
                "créer la classe synonyme",
                "créer la classe définition",
                "créer la table expression",
                "créer la table antonyme",

                // Create link between classes
                "un mot posséder des synonymes",
                "un mot posséder des antonymes",
                "un mot posséder des définitions",

                // Create class attributs
                "une expression a un contenu",
                "une expression a un lien",
                "un synonyme a des connotations",
                "un synonyme a des connotations",

                // Select  class attribut
                "donner les attributs de la classe mot",
                "donner tous les attributs d' un mot",
                "donner des attributs d' un mot",
                //Select  class object attribut
                "donner tous les attributs du mot venir",
                "donner des attributs du mot venir"

        };

        // WARNING WARNING WARNING WARNING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // WARNING WARNING WARNING WARNING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // request = null;
        // WARNING WARNING WARNING WARNING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // WARNING WARNING WARNING WARNING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        if (request != null) {
            // Test cleanup the database
            for (int i = 0; i < request.length; i++) {

                try {
                    System.out.println(i + ":" + request[i] + " OK");
                    BEXI_Expression exp = new BEXI_Expression();
                    context.add(contextPath);
                    context.add(sqlContext);
                    exp.analyze(context, request[i]);
                    context.add(exp);

                } catch (Exception e) {
                    System.out.println(request[i]);
                    System.out.println(e.getMessage());
                }
            }
        }

        // Test context manager
        BEXI_ContextManager contextManager = new BEXI_ContextManager(context);

        // Test contextManager.getLastContext
        BEXI_Expression expression = (BEXI_Expression) contextManager.getLastContext(new BEXI_Expression(null), BEXI_ContextManager.CIRCULAR_LIST);
        System.out.println("LAST EXPRESSION:" + expression.getExpression());

        // Test contextManager.getLastContext
        BEXI_Expression expressionTmp;
        int i = 0;
        System.out.println("NB_MAX_CONTEXT=" + context.getNbMaxContext());
        while ((expressionTmp = (BEXI_Expression) contextManager.getPreviousContext(new BEXI_Expression(null), BEXI_ContextManager.CIRCULAR_LIST)) != null) {
            //expressionTmp.printLists();
            System.out.println(expressionTmp.getExpression());

        }
    }

}
