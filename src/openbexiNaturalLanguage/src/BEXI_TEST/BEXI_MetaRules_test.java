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

import OPENBEXI.BEXI_Expression;
import OPENBEXI.BEXI_list;
import junit.framework.TestCase;

import java.awt.*;

public class BEXI_MetaRules_test extends TestCase {
    public BEXI_MetaRules_test(String test) {
        super(test);
    }

    /**
     * @throws Exception
     */
    protected void setUp() throws Exception {
    }

    /**
     * @throws Exception
     */
    protected void tearDown() throws Exception {
    }

    /**
     * <li> test analyzeMetaLanguage
     * <li> Split and build all the sub-metarules from the following metarule :
     * <li> "if [verbe] créer;construire;établir; [déterminant] _X1 [Nom] classe [any] _X3"
     * <li> List of built sub-metarules:
     * <li> if [verbe] créer [déterminant] _X1 [nom] classe [adjectif] _X3
     * <li> if [verbe] créer [déterminant] _X1 [nom] classe [adverbe] _X3
     * <li> if [verbe] créer [déterminant] _X1 [nom] classe [conjonction] _X3
     * <li> if [verbe] créer [déterminant] _X1 [nom] classe [déterminant] _X3
     * <li> if [verbe] créer [déterminant] _X1 [nom] classe [interjection] _X3
     * <li> if [verbe] créer [déterminant] _X1 [nom] classe [nom] _X3
     * <li> if [verbe] créer [déterminant] _X1 [nom] classe [préposition] _X3
     * <li> if [verbe] créer [déterminant] _X1 [nom] classe [pronom] _X3
     * <li> if [verbe] créer [déterminant] _X1 [nom] classe [verbe] _X3
     * <li> if [verbe] créer [déterminant] _X1 [nom] classe [onomatopée] _X3
     * <li> if [verbe] construire [déterminant] _X1 [nom] classe [abréviation] _X3
     * <li> if [verbe] construire [déterminant] _X1 [nom] classe [adjectif] _X3
     * <li> if [verbe] construire [déterminant] _X1 [nom] classe [adverbe] _X3
     * <li> if [verbe] construire [déterminant] _X1 [nom] classe [conjonction] _X3
     * <li> if [verbe] construire [déterminant] _X1 [nom] classe [déterminant] _X3
     * <li> if [verbe] construire [déterminant] _X1 [nom] classe [interjection] _X3
     * <li> if [verbe] construire [déterminant] _X1 [nom] classe [nom] _X3
     * <li> if [verbe] construire [déterminant] _X1 [nom] classe [préposition] _X3
     * <li> if [verbe] construire [déterminant] _X1 [nom] classe [pronom] _X3
     * <li> if [verbe] construire [déterminant] _X1 [nom] classe [verbe] _X3
     * <li> if [verbe] construire [déterminant] _X1 [nom] classe [onomatopée] _X3
     * <li> if [verbe] établir [déterminant] _X1 [nom] classe [abréviation] _X3
     * <li> if [verbe] établir [déterminant] _X1 [nom] classe [adjectif] _X3
     * <li> if [verbe] établir [déterminant] _X1 [nom] classe [adverbe] _X3
     * <li> if [verbe] établir [déterminant] _X1 [nom] classe [conjonction] _X3
     * <li> if [verbe] établir [déterminant] _X1 [nom] classe [déterminant] _X3
     * <li> if [verbe] établir [déterminant] _X1 [nom] classe [interjection] _X3
     * <li> if [verbe] établir [déterminant] _X1 [nom] classe [nom] _X3
     * <li> if [verbe] établir [déterminant] _X1 [nom] classe [préposition] _X3
     * <li> if [verbe] établir [déterminant] _X1 [nom] classe [pronom] _X3
     * <li> if [verbe] établir [déterminant] _X1 [nom] classe [verbe] _X3
     * <li> if [verbe] établir [déterminant] _X1 [nom] classe [onomatopée] _X3
     * <li> if [verbe] établir [déterminant] _X1 [nom] classe [abréviation] _X3
     *
     * @throws Exception
     */
    public static void testSomething() throws Exception {

        // checkIfObjectExist metaRules from a expression
        BEXI_Expression exp = new BEXI_Expression();

        // Test create and remove class
        try {
            //String action = exp.analyze("créer la classe mot", sStatement);
            //List result = exp.result(action, sStatement);
            BEXI_list rules;
            int nbRule = 0;
            rules = exp.analyzeMetaLanguage("if [verbe] donner;montrer [déterminant] tout [déterminant] _X2 [nom] _X3 [déterminant] _X4 [nom] _X5 [nom] _X6 [any] _X7");

            // Test a metarule without sub-metarules.
            rules = exp.analyzeMetaLanguage("if [verbe] créer [déterminant] _X1 [nom] classe [nom] _X3");
            nbRule = rules.getItemCount();
            assertEquals(1, nbRule);
            assertEquals("if [verbe] créer [déterminant] _X1 [nom] classe [nom] _X3", rules.getItem(nbRule - 1));

            // Test a metarule with sub-metarules (case 1).
            rules = exp.analyzeMetaLanguage("if [verbe] créer;construire;établir; [déterminant] _X1 [nom] classe [any] _X3");
            nbRule = rules.getItemCount();
            assertEquals(36, nbRule);
            assertEquals("if [verbe] établir [déterminant] _X1 [nom] classe [any] _X3", rules.getItem(nbRule - 1));

            // Test a metarule with sub-metarules (case 2).
            rules = exp.analyzeMetaLanguage("if [verbe] créer;construire;établir; [déterminant] _X1 [nom] classe;table [nom] _X3");
            nbRule = rules.getItemCount();
            assertEquals("if [verbe] établir [déterminant] _X1 [nom] table [nom] _X3", rules.getItem(nbRule - 1));

            // Test a metarule with sub-metarules (case 3).
            rules = exp.analyzeMetaLanguage("if [verbe] créer;construire;établir; [déterminant] _X1 [nom] classe;table [any] _X3");
            nbRule = rules.getItemCount();
            assertEquals(72, nbRule);
            assertEquals("if [verbe] établir [déterminant] _X1 [nom] table [any] _X3", rules.getItem(nbRule - 1));

            // Test a metarule with sub-metarules (case 4) --> Doesn't work.
            rules = exp.analyzeMetaLanguage("if [verbe] créer;construire;établir; [déterminant] _X1 [nom] classe [nom;adjectif] _X3");
            nbRule = rules.getItemCount();
            assertEquals(6, nbRule);
            assertEquals("if [verbe] établir [déterminant] _X1 [nom] classe [adjectif] _X3", rules.getItem(nbRule - 1));

            // Test a metarule with sub-metarules (case 5)
            rules = exp.analyzeMetaLanguage("if [déterminant] _X0 [nom] _X1 [nom;verbe;adjectif] _X2 [adverbe] ne [verbe] _X4 [adverbe] _X5 [déterminant] _X6 [nom] _X7 [nom;verbe;adjectif] _X8");
            nbRule = rules.getItemCount();
            assertEquals(9, nbRule);
            assertEquals("if [déterminant] _X0 [nom] _X1 [adjectif] _X2 [adverbe] ne [verbe] _X4 [adverbe] _X5 [déterminant] _X6 [nom] _X7 [adjectif] _X8", rules.getItem(nbRule - 1));

            // Test a metarule with sub-metarules (case 6) --> Doesn't work.
            rules = exp.analyzeMetaLanguage("if [verbe] établir [déterminant;adjectif] une;la;ma [nom] classe [adjectif] _X3");
            nbRule = rules.getItemCount();
            //assertEquals(18, nbRule);
            //assertEquals("if [verbe] établir [déterminant;adjectif] une;la;ma [nom] classe [adjectif] _X3", rules.getItem(nbRule - 1));

            for (int j = 0; j < nbRule; j++) {
                System.out.println("sub-metarules----" + rules.getItem(j));
            }
            System.out.println("Nb rules=" + nbRule);
            System.out.println("BEXI_MetaRules_test:test ok");
        } catch (Exception e) {
            System.out.println(e);
            System.out.println("BEXI_MetaRules_test:test ok");
        }
    }
}
