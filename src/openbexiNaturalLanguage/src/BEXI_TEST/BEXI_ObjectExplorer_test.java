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

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.Vector;

public class BEXI_ObjectExplorer_test extends TestCase {
    public BEXI_ObjectExplorer_test(String test) {
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
        String bexi_path = contextPath.getDefaultPath();
        contextPath.set_defaultLanguage("fr");
        BEXI_SqlContext sqlContext = contextPath.get_SqlContextManager().getBEXI_SqlContext("jdbc:mysql:///bexi_fr");
        contextPath.get_SqlContextManager().set_url_current(sqlContext.get_url());

        // Set up all files which need to be parsed
        BEXI_ObjectExplorer objectExplorer = new BEXI_ObjectExplorer();
        String[] fileList = {
                bexi_path + "\\data\\FrenchDictionary\\dicoA.txt",
                bexi_path + "\\data\\FrenchDictionary\\dicoB.txt",
                bexi_path + "\\data\\FrenchDictionary\\dicoC.txt",
                bexi_path + "\\data\\FrenchDictionary\\dicoD.txt",
                bexi_path + "\\data\\FrenchDictionary\\dicoE.txt",
                bexi_path + "\\data\\FrenchDictionary\\dicoF.txt",
                bexi_path + "\\data\\FrenchDictionary\\dicoG.txt",
                bexi_path + "\\data\\FrenchDictionary\\dicoH.txt",
                bexi_path + "\\data\\FrenchDictionary\\dicoI.txt",
                bexi_path + "\\data\\FrenchDictionary\\dicoJ.txt",
                bexi_path + "\\data\\FrenchDictionary\\dicoK.txt",
                bexi_path + "\\data\\FrenchDictionary\\dicoL.txt",
                bexi_path + "\\data\\FrenchDictionary\\dicoM.txt",
                bexi_path + "\\data\\FrenchDictionary\\dicoN.txt",
                bexi_path + "\\data\\FrenchDictionary\\dicoO.txt",
                bexi_path + "\\data\\FrenchDictionary\\dicoP.txt",
                bexi_path + "\\data\\FrenchDictionary\\dicoQ.txt",
                bexi_path + "\\data\\FrenchDictionary\\dicoR.txt",
                bexi_path + "\\data\\FrenchDictionary\\dicoS.txt",
                bexi_path + "\\data\\FrenchDictionary\\dicoT.txt",
                bexi_path + "\\data\\FrenchDictionary\\dicoU.txt",
                bexi_path + "\\data\\FrenchDictionary\\dicoV.txt",
                bexi_path + "\\data\\FrenchDictionary\\dicoW.txt",
                bexi_path + "\\data\\FrenchDictionary\\dicoX.txt",
                bexi_path + "\\data\\FrenchDictionary\\dicoY.txt",
                bexi_path + "\\data\\FrenchDictionary\\dicoZ.txt"};

        //Read the ABU dico
        Vector wordList = null;
        FileReader reader = null;
        BufferedReader read = null;
        String line = null;
        String[] listWord = null;
        BEXI_Object word = null;
        String wordDef = null;
        BEXI_DataContext dataContext = null;
        String[] driverASCII = {"ASCII"};
        String[] driverSQL = {"SQL"};
        String[] hosts = {"localHost"};

        for (int l = 0; l < fileList.length; l++) {

            fileList[l] = fileList[l];
            System.out.println(fileList[l]);

            try {
                reader = new FileReader(fileList[l]);
                read = new BufferedReader(reader);

                boolean startFound = false;

                while ((line = read.readLine()) != null) {
                    //System.out.println(line);

                    if (line.compareTo("----------------------- FIN DE LA LICENCE ABU --------------------------------") == 0) {
                        startFound = true;
                    }
                    if (startFound == true && !line.equals("") && !line.equals("------------------------- FIN DU FICHIER --------------------------------") && !line.equals("----------------------- FIN DE LA LICENCE ABU --------------------------------")) {

                        listWord = line.split("[\t*]");
                        wordDef = listWord[0];
                        // Call the parser
                        try {
                            BEXI_Object dictionary = new BEXI_Object("French", "mot", wordDef, null, null, null, null, false);
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
                        if (wordList != null) {
                            for (int j = 0; j < wordList.size(); j++) {
                                word = (BEXI_Object) wordList.elementAt(j);
                                objectExplorer.save(dataContext, word, true);
                                //word.print();
                            }
                        } else {
                            System.out.println("No word found for the word " + wordDef);
                        }
                    }

                }

            } catch (IOException e) {
                System.out.println(e.getMessage());
            }
            read.close();
            reader.close();

        }
    }
}
