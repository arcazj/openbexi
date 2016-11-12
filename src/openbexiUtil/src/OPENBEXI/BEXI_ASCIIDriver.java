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
package OPENBEXI;

import com.stevesoft.pat.Regex;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.Dictionary;
import java.util.Vector;

public class BEXI_ASCIIDriver {


    public Vector select_class_object(final BEXI_SqlContext context, final BEXI_DataContext dataContext, final BEXI_Object object) throws BEXI_ASCIIDriverException, IOException {

        Vector objects = new Vector();

        String attributList[] = object.getAttributs();
        if (attributList == null) {
            attributList = dataContext.getParserAttributList();
            object.set_attributs(attributList);
        }

        //Look for the righ dataContext
        final String[] fileList;
        fileList = dataContext.getDatabase();

        //If the object has not ben found look for secondary dataContext
        // Set Parameters
        int count = 0;
        String line;
        String AttValueTmp;
        String valueTmp = null;
        String attributTmp = null;
        BEXI_Object objectTmp = null;
        String[] listWord;
        FileReader reader;
        BufferedReader read;

        String[] valueList;
        String[] previousValueList;

        // Set parser context
        final String regex = dataContext.getParserRegex();
        final String[] attributListSeq = dataContext.getParserAttributListSeq();
        final Dictionary valueMatch = dataContext.getParserValueMatch();
        final String[] attributListMandatory = dataContext.getParserAttributListMandatory();

        for (int l = 0; l < fileList.length; l++) {
            try {
                reader = new FileReader(fileList[l]);
                read = new BufferedReader(reader);

                int lineCount = 0;
                while ((line = read.readLine()) != null) {
                    //System.out.println(line);
                    lineCount = lineCount + 1;
                    valueList = new String[attributList.length];

                    // Split the string according regex
                    listWord = line.split(regex);

                    // If the objectTmp matches
                    if (listWord[0].equals(object.get_objectName())) {
                        for (int i = 0; i < listWord.length; i++) {

                            //Create a OPENBEXI objectTmp the first time
                            if (i == 0) {
                                objectTmp = new BEXI_Object(null, object.get_className(), object.get_objectName(), attributList, valueList, null, null, false);
                                objectTmp.set_lineSource(line);
                            }

                            // Set the objectTmp attribute via the dictionary if the next attribute is valueMatch
                            if (attributListSeq[i].equals("valueMatch")) {
                                final String key = listWord[i];
                                try {
                                    AttValueTmp = (String) valueMatch.get(key);
                                    final Regex r = new Regex("[\t:+*]");
                                    if (r.search(AttValueTmp)) {
                                        attributTmp = r.left();
                                        valueTmp = r.right();
                                    }
                                } catch (NullPointerException e) {
                                    //throw new BEXI_ASCIIDriverException("Attribut Key [" + key + "] in the dictionnary not found" + System.getProperty("line.separator") + "file=" + fileList[l] + " (line " + lineCount + ")");
                                    System.err.println("Attribut Key [" + key + "] in the dictionnary not found" + System.getProperty("line.separator") + "file=" + fileList[l] + " (line " + lineCount + ")");
                                }

                            } else {
                                attributTmp = attributList[i];
                                valueTmp = listWord[i];
                            }

                            // Set the objectTmp attribute if it's the first time
                            // if not create a new objectTmp
                            if (objectTmp.get_Values(attributTmp) == null) {
                                objectTmp.set_values(attributTmp, valueTmp);
                            } else {
                                //add objectTmp in the list and  save the value list of the previuos objectTmp
                                previousValueList = objectTmp.get_values();

                                objects.add(count, objectTmp);
                                count = count + 1;
                                valueList = new String[attributList.length];
                                objectTmp = new BEXI_Object(null, object.get_className(), object.get_objectName(), attributList, valueList, null, null, false);
                                objectTmp.set_values(attributTmp, valueTmp);
                                objectTmp.set_lineSource(line);

                                //A new objectTmp has been created, check if all madatory value are set up
                                //if not do it from the previous objectTmp
                                for (int n = 0; n < attributListMandatory.length; n++) {
                                    objectTmp.set_values(attributList[n], previousValueList[n]);
                                }
                            }
                        }
                        //add the last objectTmp in the list
                        objectTmp.set_lineSource(line);
                        objects.add(count, objectTmp);
                        //valueList = objectTmp.get_values();
                        count = count + 1;
                    }
                }
            } catch (IOException e) {
                System.out.println(e.getMessage());
                throw e;
            }
            read.close();
            reader.close();
        }
        return objects;
    }
}
