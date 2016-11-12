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

public class BEXI_ExpressionManager_test extends TestCase {
    public BEXI_ExpressionManager_test(String test) {
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
        BEXI_Context context = new BEXI_Context(20);

        // Set a OPENBEXI context
        BEXI_ApplicationPath contextPath = new BEXI_ApplicationPath();
        contextPath.set_defaultLanguage("fr");
        BEXI_SqlContext sqlContext = contextPath.get_SqlContextManager().getBEXI_SqlContext("jdbc:mysql:///bexi_fr");
        contextPath.get_SqlContextManager().set_url_current(sqlContext.get_url());

        context.add(contextPath);
        context.add(contextPath);
        context.add(sqlContext);

        boolean test = true;
        boolean test0 = false;
        boolean test1 = false;
        boolean test2 = false;
        boolean test3 = true;
        boolean test4 = false;
        boolean test5 = false;
        boolean test6 = false;
        boolean test7 = false;
        boolean test8 = false;
        boolean test9 = false;
        boolean test10 = false;
        boolean test11 = false;

        if (test) {
            BEXI_Expression exp = null;
            try {
                BEXI_ExpressionManager manager = new BEXI_ExpressionManager(context);
                exp = new BEXI_Expression();
                exp.analyze(context, "donner les attributs du mot venir");
                exp.print();
            } catch (Exception e) {
                System.err.println("donner les attributs du mot venir:-->" + e.getMessage());
                exp.printLists();
                exp.print();
            }
        }
        if (test) {
            BEXI_Expression exp = null;
            try {
                BEXI_ExpressionManager manager = new BEXI_ExpressionManager(context);
                exp = new BEXI_Expression();
                exp.analyze(context, "donner tous les attributs du mot venir");
                exp.print();
            } catch (Exception e) {
                System.err.println("donner tous les attributs du mot venir:-->" + e.getMessage());
                exp.printLists();
                exp.print();
            }
        }
        System.out.println("__________________________________________________________");
        if (test) {
            BEXI_Expression exp = null;
            try {
                BEXI_ExpressionManager manager = new BEXI_ExpressionManager(context);
                exp = new BEXI_Expression();
                exp.analyze(context, "donner les flexions du mot racine détruire");
                exp.print();
            } catch (Exception e) {
                System.err.println("donner les flexions du mot racine détruire:-->" + e.getMessage());
                exp.printLists();
                exp.print();
            }
        }
        System.out.println("__________________________________________________________");
        if (test) {
            BEXI_Expression exp = null;
            try {
                BEXI_ExpressionManager manager = new BEXI_ExpressionManager(context);
                exp = new BEXI_Expression();
                exp.analyze(context, "donner toutes les flexions du mot racine détruire");
                exp.print();
            } catch (Exception e) {
                System.err.println("donner toutes les flexions du mot racine détruire:-->" + e.getMessage());
                exp.printLists();
                exp.print();
            }
        }
        // _____________________________________________
        // test 0
        // _____________________________________________
        if (test0) {
            try {
                BEXI_ExpressionManager manager = new BEXI_ExpressionManager(context);
                BEXI_Expression exp = new BEXI_Expression();
                exp.analyze(context, "donner les attributs du mot venir");
                exp.print();
                BEXI_Expression exp1 = manager.buildNewExpressionFromPreviousOne(context, contextPath, sqlContext, "donner les attributs du mot venir", "donner tous les attributs du mot venir");
                System.out.println("- - -");
                exp1.print();
                System.out.println("________________________________________________________________________");
            } catch (Exception e) {
                System.err.println("donner tous les attributs du mot venir:-->" + e.getMessage());
            }
        }
        // _____________________________________________
        // test 1
        // _____________________________________________
        if (test1) {
            try {
                BEXI_ExpressionManager manager = new BEXI_ExpressionManager(context);
                BEXI_Expression exp = new BEXI_Expression();
                exp.analyze(context, "donner les attributs de la classe enfant");
                exp.print();
                BEXI_Expression exp1 = manager.buildNewExpressionFromPreviousOne(context, contextPath, sqlContext, "donner les attributs de la classe enfant", "donner moi les attributs de la classe enfant");
                System.out.println("- - -");
                exp1.print();
                System.out.println("________________________________________________________________________");
            } catch (Exception e) {
                System.err.println("donner les attributs de la classe enfant:-->" + e.getMessage());
            }
        }

        // _____________________________________________
        // test 2
        // _____________________________________________
        if (test2) {
            BEXI_ExpressionManager manager = new BEXI_ExpressionManager(context);
            BEXI_Expression exp = new BEXI_Expression();
            exp.analyze(context, "donner tous les attributs du mot venir");
            exp.print();

            BEXI_Expression exp1 = manager.buildNewExpressionFromPreviousOne(context, contextPath, sqlContext, "donner tous les attributs du mot venir", "donner moi tous les attributs du mot venir");
            System.out.println("- - -");
            exp1.print();
            System.out.println("________________________________________________________________________");
        }

        // _____________________________________________
        // test 3
        // _____________________________________________
        if (test3) {
            BEXI_ExpressionManager manager = new BEXI_ExpressionManager(context);
            BEXI_Expression exp = new BEXI_Expression();
            exp.analyze(context, "détruire la classe synonyme");
            exp.print();

            BEXI_Expression exp1 = manager.buildNewExpressionFromPreviousOne(context, contextPath, sqlContext, "détruire la classe synonyme", "la classe synonyme doit être détruite maintenant");
            System.out.println("- - -");
            exp1.print();
            System.out.println("________________________________________________________________________");
        }

        // _____________________________________________
        // test 4
        // _____________________________________________
        if (test4) {

            BEXI_ExpressionManager manager = new BEXI_ExpressionManager(context);
            BEXI_Expression exp = new BEXI_Expression();
            exp.analyze(context, "la classe synonyme doit être détruite maintenant");
            exp.print();

            BEXI_Expression exp1 = manager.buildNewExpressionFromPreviousOne(context, contextPath, sqlContext, "la classe synonyme doit être détruite maintenant", "la classe synonyme est maintenant détruite");
            System.out.println("- - -");
            exp1.print();
            System.out.println("________________________________________________________________________");

        }

        // _____________________________________________
        // test 5
        // _____________________________________________
        if (test5) {

            BEXI_ExpressionManager manager = new BEXI_ExpressionManager(context);
            BEXI_Expression exp = new BEXI_Expression();
            exp.analyze(context, "");
            exp.print();

            BEXI_Expression exp1 = manager.buildNewExpressionFromPreviousOne(context, contextPath, sqlContext, "", "donner tous les attributs du mot venir");
            System.out.println("- - -");
            exp1.print();
            System.out.println("________________________________________________________________________");

        }
    }
}
