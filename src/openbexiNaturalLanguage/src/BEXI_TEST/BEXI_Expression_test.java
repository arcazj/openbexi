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

public class BEXI_Expression_test extends TestCase {
    public BEXI_Expression_test(String test) {
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

        BEXI_list actions = null;

        // Set bexi context
        BEXI_Context context = new BEXI_Context(200);

        // Set a OPENBEXI application contextApplication
        BEXI_ApplicationPath contextPath = new BEXI_ApplicationPath();
        contextPath.set_defaultLanguage("fr");
        BEXI_SqlContext sqlContext = contextPath.get_SqlContextManager().getBEXI_SqlContext("jdbc:mysql:///bexi_fr");
        contextPath.get_SqlContextManager().set_url_current(sqlContext.get_url());

        // Test create and remove class
        try {

            actions = null;
            context.add(contextPath);
            context.add(sqlContext);
            BEXI_Expression exp = new BEXI_Expression();
            actions = exp.analyze(context, "détruire la classe synonyme");
            context.add(exp);
            assertEquals("delete_class synonyme", actions.getItem(2));
            exp.printLists();
            System.out.println("========================================================");

            actions = null;
            context.add(contextPath);
            context.add(sqlContext);
            BEXI_Expression exp1 = new BEXI_Expression();
            actions = exp1.analyze(context, "détruire la classe mot");
            context.add(exp1);
            assertEquals("delete_class mot", actions.getItem(0));
            exp1.printLists();
            System.out.println("========================================================");

            actions = null;
            context.add(contextPath);
            context.add(sqlContext);
            BEXI_Expression exp2 = new BEXI_Expression();
            actions = exp2.analyze(context, "détruire la classe synonyme");
            context.add(exp2);
            assertEquals("delete_class synonyme", actions.getItem(0));
            exp2.printLists();
            System.out.println("========================================================");

            context.add(contextPath);
            context.add(sqlContext);
            BEXI_Expression exp3 = new BEXI_Expression();
            actions = exp3.analyze(context, "un synonyme a des connotations");
            context.add(exp3);
            assertEquals("create_class_attribut synonyme connotation", actions.getItem(0));
            exp3.printLists();
            System.out.println("========================================================");

            context.add(contextPath);
            context.add(sqlContext);
            BEXI_Expression exp4 = new BEXI_Expression();
            actions = exp4.analyze(context, "un mot possède des synonymes");
            context.add(exp4);
            assertEquals("create_class_link mot posséder synonyme", actions.getItem(0));
            exp4.printLists();
            System.out.println("========================================================");

            context.add(contextPath);
            context.add(sqlContext);
            BEXI_Expression exp5 = new BEXI_Expression();
            actions = exp5.analyze(context, "créer la classe synonyme");
            context.add(exp5);
            assertEquals("create_class synonyme", actions.getItem(0));
            exp5.printLists();
            System.out.println("========================================================");

            //Select
            context.add(contextPath);
            context.add(sqlContext);
            BEXI_Expression exp6 = new BEXI_Expression();
            actions = exp6.analyze(context, "donner les synonymes que possèdent le mot détruire");
            context.add(exp6);
            assertEquals("select_all_class_object_link mot détruire posséder synonyme", actions.getItem(0));
            exp6.printLists();
            System.out.println("========================================================");

            context.add(contextPath);
            context.add(sqlContext);
            BEXI_Expression exp7 = new BEXI_Expression();
            actions = exp7.analyze(context, "donner tous les attributs du mot venir");
            context.add(exp7);
            assertEquals("select_all_class_attributs mot", actions.getItem(0));
            exp7.printLists();
            System.out.println("========================================================");

            context.add(contextPath);
            context.add(sqlContext);
            BEXI_Expression exp8 = new BEXI_Expression();
            actions = exp8.analyze(context, "donner tous les attributs d' un mot");
            context.add(exp8);
            assertEquals("select_all_class_attributs mot", actions.getItem(0));
            exp8.printLists();
            System.out.println("========================================================");

            //Select
            context.add(contextPath);
            context.add(sqlContext);
            BEXI_Expression exp9 = new BEXI_Expression();
            actions = exp9.analyze(context, "donner les synonymes que possèdent le mot détruire");
            context.add(exp9);
            assertEquals("select_all_class_object_link mot détruire posséder synonyme", actions.getItem(0));
            exp9.printLists();
            System.out.println("========================================================");

            context.add(contextPath);
            context.add(sqlContext);
            BEXI_Expression exp10 = new BEXI_Expression();
            actions = exp10.analyze(context, "le mot détruire possède le synonyme enlever");
            context.add(exp10);
            assertEquals("create_class_object_link mot détruire posséder synonyme enlever", actions.getItem(0));
            exp10.printLists();
            System.out.println("========================================================");

            context.add(contextPath);
            context.add(sqlContext);
            BEXI_Expression exp11 = new BEXI_Expression();
            actions = exp11.analyze(context, "le mot détruire possède le synonyme liquider");
            context.add(exp11);
            assertEquals("create_class_object_link mot détruire posséder synonyme liquider", actions.getItem(0));
            exp11.printLists();
            System.out.println("========================================================");

            context.add(contextPath);
            context.add(sqlContext);
            BEXI_Expression exp12 = new BEXI_Expression();
            actions = exp12.analyze(context, "donner un attributs du mot venir");
            context.add(exp12);
            assertEquals("select_one_class_attribut mot", actions.getItem(0));
            exp12.printLists();
            System.out.println("========================================================");

            context.add(contextPath);
            context.add(sqlContext);
            BEXI_Expression exp13 = new BEXI_Expression();
            actions = exp13.analyze(context, "donner des attributs d' un mot");
            context.add(exp13);
            assertEquals("select_random_class_attributs mot", actions.getItem(0));
            exp13.printLists();
            System.out.println("========================================================");

            context.add(contextPath);
            context.add(sqlContext);
            BEXI_Expression exp14 = new BEXI_Expression();
            actions = exp14.analyze(context, "le mot détruire ne possède plus le synonyme rayer");
            context.add(exp14);
            assertEquals("delete_class_object_link mot détruire posséder synonyme rayer", actions.getItem(0));
            exp14.printLists();
            System.out.println("========================================================");

            context.add(contextPath);
            context.add(sqlContext);
            BEXI_Expression exp15 = new BEXI_Expression();
            actions = exp15.analyze(context, "le mot détruire ne possède plus le synonyme liquider");
            context.add(exp15);
            assertEquals("delete_class_object_link mot détruire posséder synonyme liquider", actions.getItem(0));
            exp15.printLists();
            System.out.println("========================================================");

            context.add(contextPath);
            context.add(sqlContext);
            BEXI_Expression exp16 = new BEXI_Expression();
            actions = exp16.analyze(context, "donner moi tous les attributs du mot venir");
            context.add(exp16);
            //assertEquals("select_all_class_attributs mot", actions.getItem(0));
            exp16.printLists();
            System.out.println("========================================================");


            System.out.println("BEXI_MetaRules_test:test ok");

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
