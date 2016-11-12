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

public class BEXI_BDD_Modele_Compagnie_French extends TestCase {
    public BEXI_BDD_Modele_Compagnie_French(String test) {
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
        BEXI_SqlContext sqlContext = contextPath.get_SqlContextManager().getBEXI_SqlContext("jdbc:hsqldb:file:bexi_fr");
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
                "d�truire la classe budget",
                "cr�er la classe budget",
                //delete class
                "d�truire la classe compagnie",
                "d�truire la classe budget",
                "d�truire la classe structure",
                "d�truire la classe organisme",
                "d�truire la classe f�d�ration",
                "d�truire la classe homme",
                "d�truire la classe salari�",
                "d�truire la classe b�n�vole",
                "d�truire la classe d�pense",
                "d�truire la classe recette",
                "d�truire la classe subvention",
                "d�truire la classe fournisseur",
                "d�truire la classe activit�",

                // Delete class links
                "d�truire compagnie poss�de budget",
                "d�truire compagnie poss�de structure",
                "d�truire compagnie rattacher f�d�ration",
                "d�truire compagnie rattacher organisme",
                "d�truire compagnie emploie salari�s",
                "d�truire compagnie poss�de b�n�voles",
                "d�truire fournisseur poss�de compagnie",

                // create classes
                "cr�er la classe compagnie",
                "cr�er la classe budget",
                "cr�er la classe structure",
                "cr�er la classe organisme",
                "cr�er la classe f�d�ration",
                "cr�er la classe homme",
                "cr�er la classe salari�",
                "cr�er la classe b�n�vole",
                "cr�er la classe d�pense",
                "cr�er la classe recette",
                "cr�er la classe fournisseur",
                "cr�er la classe subvention",
                "cr�er la classe activit�",

                // Create link between classes
                "une compagnie poss�de un budget",
                "une compagnie poss�de une structure",
                "une compagnie rattacher une f�d�ration",
                "une compagnie rattacher un organisme",
                "une compagnie emploie des salari�s",
                "une compagnie poss�de des b�n�voles",

                "un fournisseur poss�de  une compagnie",

                // Create class attributs
                "une compagnie a un nom",
                "une compagnie a un age",
                "une compagnie a un si�ge",
                "une compagnie a un SIRET",
                "une compagnie a un code SIRET",
                "une compagnie a un APE",
                "une compagnie a une adresse",
                "une compagnie a un email",
                "une compagnie a un fax",
                "une compagnie a un t�l�phone",
                "une compagnie a un pr�sident",
                "une compagnie a un directeur",
                "une compagnie a un prix",
                "une compagnie a un CA",

                "un fournisseur a un nom",

                "un salari� a un nom",
                "un salari� a un pr�nom",
                "un salari� a un age",
                "un salari� a une position",
                "un salari� a un salaire",
                "un salari� a un photo",

                "un b�n�vole a un nom",
                "un salari� a un pr�nom",
                "un b�n�vole a un age",
                "un b�n�vole a une position",
                "un b�n�vole a une photo",

                "une recettes a un type",
                "une recettes a un montant",

                "une d�penses a un type",
                "une d�penses a un montant",

                "une subventions a un type",
                "une subventions a un montant",

                "donner tous les attributs d une compagnie",
                "donner tous les attributs d une salari�",
                "une compagnie a des salari�s",
                "la compagnie microsoft emploie le salari� martin",
                "la compagnie microsoft emploie le salari� dupont",
                "la compagnie microsoft emploie le salari� arcaz",
                "la compagnie microsoft emploie le salari� legs",
                "la compagnie microsoft emploie le salari� dubois",

                /*"montrer la table compagnie"*/

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
