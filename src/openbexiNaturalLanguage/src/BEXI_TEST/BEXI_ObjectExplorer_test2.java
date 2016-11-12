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

import java.util.Vector;

public class BEXI_ObjectExplorer_test2 extends TestCase {
    public BEXI_ObjectExplorer_test2(String test) {
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

        // Set a OPENBEXI context
        BEXI_ApplicationPath contextPath = new BEXI_ApplicationPath();
        contextPath.set_defaultLanguage("fr");
        //BEXI_SqlContext sqlContext = contextPath.get_SqlContextManager().getBEXI_SqlContext("jdbc:mysql:///bexi_fr");
        BEXI_SqlContext sqlContext = contextPath.get_SqlContextManager().getBEXI_SqlContext("jdbc:hsqldb:file:hsqldb/data/bexi_fr");
        contextPath.get_SqlContextManager().set_url_current(sqlContext.get_url());

        //Set other parameters
        BEXI_Object word = null;
        Vector wordList = null;
        Vector wordListAfterMarshalling = null;
        String[] listWord = {"vivre", "centrer", "mangeras", "abaisser", "le", "a"};
        BEXI_Object dictionary = null;
        BEXI_DataContext dataContext = null;
        String wordDef = null;
        String[] driverASCII = {"ASCII"};
        String[] driverSQL = {"SQL"};
        String[] hosts = {"localHost"};

        BEXI_ObjectExplorer objectExplorer = new BEXI_ObjectExplorer();
        for (int i = 0; i < listWord.length; i++) {
            wordDef = listWord[i];
            // Call the objectExplorer
            try {
                dictionary = new BEXI_Object("French", "mot", wordDef, null, null, null, null, false);
                dataContext = new BEXI_DataContext(contextPath, dictionary);
                wordList = objectExplorer.lookForObject(hosts, sqlContext, dataContext, dictionary, driverSQL);
                if (wordList == null) {
                    wordList = objectExplorer.lookForObject(hosts, sqlContext, dataContext, dictionary, driverASCII);
                    objectExplorer.addObject(hosts, sqlContext, dataContext, dictionary, wordList, driverSQL);
                }
            } catch (BEXI_ObjectExplorerException e) {
                System.out.println(e.getMessage());

            } catch (Exception e) {
                System.out.println(e.getMessage());
            }

            // test unmarshalling BEXI_ObjectExplorer
            String objectListAfterMarshalling = objectExplorer.unMarshalling(wordList);
            System.out.println("object after unmarshalling (objectExplorer):" + objectListAfterMarshalling);
            // test marshalling BEXI_ObjectExplorer
            wordListAfterMarshalling = objectExplorer.marshalling(objectListAfterMarshalling);

            if (wordList != null) {
                for (int j = 0; j < wordList.size(); j++) {
                    word = (BEXI_Object) wordList.elementAt(j);
                    if (word != null) {
                        word.print();

                        // test unmarshalling OPENBEXI object
                        String obj = word.unMarshalling();
                        System.out.println("object after unmarshalling:" + obj);
                        // test unmarshalling OPENBEXI object
                        BEXI_Object obj1 = word.Marshalling(obj);
                        System.out.println("  object after marshalling:");
                        obj1.print();
                    }
                }
            } else {
                System.out.println("Word no found for:" + wordDef);
            }

        }
        // Check if the test is ok
        assertEquals("a", word.get_Values("flexion"));
        assertEquals("avoir", word.get_Values("racine"));
        assertEquals("verbe", word.get_Values("type"));
        assertEquals("singulier", word.get_Values("nombre"));
        assertEquals("troisième personne", word.get_Values("personne"));


    }
}
