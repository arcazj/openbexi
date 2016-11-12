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

/**
 * Menage OPENBEXI object explorer.
 */

import java.io.*;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Vector;

public final class BEXI_ObjectExplorer {

    /**
     * BEXI_ObjectExplorer constructor.
     */
    public BEXI_ObjectExplorer() {
    }

    /**
     * <li> Return a list of OPENBEXI object according rules.
     * <li>
     * <li> First rule:
     * <li> the parser look for a set of OPENBEXI object attributs into a file list.
     * <li> if the File List is null, the parser look into the default OPENBEXI object name.
     * <li> Note: The name of the file is build with the ClassName+FirstObjectChar
     * <li>
     * <li> Second rule:
     * <li> A OPENBEXI object is built from :
     * <li> a class name,
     * <li> a object name,
     * <li> a attribut name list,
     * <li> a attribut list sequence,it says to the parser the exact sequence of attribut values for a file line.
     * <li> a list of mandatory attributs. If the parser cannot find a madatory attribut, it doesn't build a OPENBEXI object.
     * <li> a java.util.regex expression to split the current file line.
     * <li> a dictionary which describe OPENBEXI attribut keys. For instance, if the dictionary contains the key "KEY1" and the associate definition "ATTRIBUT_NAME:VALUE1", the parser will translate any word "KEY1" from a file line to the OPENBEXI attribut name: "ATTRIBUT_NAME" with the value "VALUE1". If there is more than one "KEY1" keys in the same line, it will build as much OPENBEXI object.
     *
     * @param context
     * @param dataContext
     * @param object
     * @return a list of OPENBEXI object
     * @throws BEXI_ObjectExplorerException
     */

    public static Vector lookForObject(final String[] host, final BEXI_SqlContext context, final BEXI_DataContext dataContext, final BEXI_Object object, final String[] driver) throws BEXI_ObjectExplorerException {

        Vector objects = null;

        //First, Look into the primary dataContext
        Vector objectEntry = new Vector();
        objectEntry.add(object);

        for (int i = 0; i < driver.length; i++) {
            try {
                BEXI_SQLDriver bexi_SQLDriver = new BEXI_SQLDriver();
                objects = bexi_SQLDriver.selectDriver(context, dataContext, objectEntry, "select_class_object", driver[i]);
            } catch (Exception e) {
                objects = null;
            }

            if (objects != null) {
                if (objects.size() != 0) {
                    break;
                }
            }
        }
        if (objects == null) return null;
        if (objects.size() == 0) return null;

        return objects;
    }
    //third Look into others databases if any

    public static void addObject(final String[] host, final BEXI_SqlContext context, final BEXI_DataContext dataContext, final BEXI_Object objectSource, final Vector objects, final String[] driver) throws BEXI_ObjectExplorerException {

        if (objectSource == null) return;
        if (objects == null) return;
        if (objects.size() == 0) return;

        for (int i = 0; i < driver.length; i++) {
            // Add in the Primary dataContext the new Objects
            if (objects != null) {
                if (objects.size() != 0) {
                    try {
                        BEXI_SQLDriver bexi_SQLDriver = new BEXI_SQLDriver();
                        bexi_SQLDriver.selectDriver(context, dataContext, objects, "insert_class_object", driver[i]);
                    } catch (Exception e) {
                        throw new BEXI_ObjectExplorerException("word " + objectSource.get_objectName() + " no found in the dictionary because:" + e.getMessage());

                    }
                } else {
                    throw new BEXI_ObjectExplorerException("word " + objectSource.get_objectName() + " no found in the dictionary");
                }
            }
        }

    }

    /**
     * Check if an object exist in the file database.
     *
     * @param database
     * @param object
     * @return true if the object exist
     * @throws IOException
     * @throws java.io.FileNotFoundException
     */
    private static boolean checkIfObjectExist(final BEXI_DataContext database, final BEXI_Object object) throws IOException, java.io.FileNotFoundException {

        final FileReader reader;
        final BufferedReader read;
        String line;
        String[] values;

        try {
            final String[] dataBase = database.getDatabase();
            reader = new FileReader(dataBase[0]);
            read = new BufferedReader(reader);

            while ((line = read.readLine()) != null) {
                if (line.charAt(0) != '#') {
                    values = line.split("[;*]");
                    // If found string "null" convert to null
                    for (int i = 0; i < values.length; i++) {
                        if (values[i].equals("null")) {
                            values[i] = null;
                        }
                    }
                    // if the object values are  similar, that means the object is already in the file data base
                    if (object.checkIfSimilarValues(values) == true) {
                        return true;
                    }
                }
            }
        } catch (java.io.FileNotFoundException e) {
            //System.out.println(e.getMessage());
            throw e;
        } catch (IOException e) {
            //System.out.println(e.getMessage());
            throw e;
        }
        read.close();
        reader.close();

        return false;

    }

    /**
     * Read a OPENBEXI object from a file.
     * <li> The name of the file is build with the ClassName+FirstObjectChar.
     * <li> File format:
     * <li> The first line contains # + the attributs object list name with the separator=";"
     * <li> exemple: # attribut1;attribut2;...
     * <li> All others lines contains:
     * <li> objectName;attributValue1;attributValue2;...
     *
     * @param database
     * @param object
     * @return a list of OPENBEXI object found in the file
     * @throws IOException
     * @throws java.io.FileNotFoundException
     */
    public static Vector get(final BEXI_DataContext database, final BEXI_Object object) throws IOException, java.io.FileNotFoundException {

        final FileReader reader;
        final BufferedReader read;
        String line;
        String[] attributs = null;
        String[] values;
        final Vector objectList = new Vector();


        try {
            final String[] dataBase = database.getDatabase();
            reader = new FileReader(dataBase[0]);
            read = new BufferedReader(reader);

            while ((line = read.readLine()) != null) {
                if (line.charAt(0) == '#') {
                    // Split the string
                    attributs = line.split("[#;*]");
                } else {
                    values = line.split("[;*]");
                    // If found string "null" convert to null
                    for (int i = 0; i < values.length; i++) {
                        if (values[i].equals("null")) {
                            values[i] = null;
                        }
                    }
                    if (object.get_objectName().equals(values[0])) {
                        final BEXI_Object o = new BEXI_Object(null, object.get_className(), object.get_objectName(), attributs, values, null, null, false);
                        objectList.add(o);
                    }
                }
            }
        } catch (java.io.FileNotFoundException e) {
            //System.out.println(e.getMessage());
            throw e;
        } catch (IOException e) {
            //System.out.println(e.getMessage());
            throw e;
        }
        read.close();
        reader.close();

        return objectList;

    }


    /**
     * Save a OPENBEXI object in a file.
     * <li> The name of the file is build with the ClassName+FirstObjectChar.
     * <li> File format:
     * <li> The first line contains # + the attributs object list name with the separator=";"
     * <li> exemple: # attribut1;attribut2;...
     * <li> All others lines contains:
     * <li> objectName;attributValue1;attributValue2;...
     * <li> Note:check or not  if the object exist before saving with the flag checkIfExist
     *
     * @param database
     * @param object
     * @param checkIfExist
     * @throws IOException
     */
    public static void save(final BEXI_DataContext database, final BEXI_Object object, final boolean checkIfExist) throws Exception {

        Vector objectList;
        final FileWriter writer;
        final BufferedWriter write;
        final String class_path;
        String line = "";
        final String file;
        boolean FileFound = true;
        boolean objectFound = false;

        // Set a OPENBEXI context
        BEXI_ApplicationPath contextPath = new BEXI_ApplicationPath();

        //Check if it's the first time we save an object for the given class
        //If it is , write a special first line with the attribut name
        if (checkIfExist == true) {
            try {
                if (checkIfObjectExist(database, object)) {
                    objectFound = true;
                }
            } catch (java.io.FileNotFoundException e) {
                //System.out.println(e.getMessage());
                FileFound = false;
            }
        }


        if (FileFound == false) {
            final String[] attributList = object.getAttributs();
            for (int i = 0; i < attributList.length; i++) {
                if (i == 0) {
                    line = "#" + attributList[i];
                } else {
                    line = line + ";" + attributList[i];
                }
            }
            line = line + System.getProperty("line.separator");
        }

        // Write the object only if it doesn't already exist in the file
        if (objectFound == false && contextPath != null) {
            try {

                class_path = contextPath.getDefaultClassPath();
                file = class_path +
                        System.getProperty("file.separator") +
                        object.get_className() + object.get_objectName().toUpperCase().charAt(0) + ".txt";

                writer = new FileWriter(file, true);
                write = new BufferedWriter(writer);

                //Build the line and save the attribut values in the file
                final String[] valuesList = object.get_values();
                for (int i = 0; i < valuesList.length; i++) {
                    final String val = valuesList[i];
                    if (i == 0) {
                        line = line + val;
                    } else {
                        line = line + ";" + val;
                    }
                }
                line = line + System.getProperty("line.separator");
                write.write(line);

            } catch (IOException e) {
                //System.out.println(e.getMessage());
                throw e;
            }

            write.close();
            writer.close();
        }
    }

    /**
     * TBD.
     *
     * @param dataContext
     * @param context
     * @throws SQLException
     * @throws ClassNotFoundException
     * @throws IllegalAccessException
     * @throws InstantiationException
     * @throws IOException
     * @throws BEXI_ObjectExplorerException
     */
    public static void getWordFromMetaRules(final BEXI_DataContext dataContext, BEXI_ApplicationPath contextPath, final BEXI_SqlContext context) throws Exception {

        final Statement sStatement = context.get_statement();
        String currentRule;
        String[] driverASCII = {"ASCII"};
        String[] driverSQL = {"SQL"};
        String[] hosts = {"localHost"};

        try {

            // Look for all metarules
            final BEXI_MetaRulesManager metaBase = new BEXI_MetaRulesManager();
            final String[] rules = metaBase.getAllRules(contextPath);

            for (int j = 0; j < rules.length; j++) {

                currentRule = rules[j];

                // split in word the current rule
                final String[] wordListTmp = currentRule.split("[ *.,]");

                boolean passFlag = false;
                int count = 0;
                for (int i = 1; i < wordListTmp.length - 1; i++) {
                    final String var;
                    if (wordListTmp[i].charAt(0) == '[') {
                        //String typeWord = wordListTmp[i].substring(1, (wordListTmp[i].length() - 1));
                        var = "_X" + count++;
                        if (wordListTmp[i].length() != 0 && (wordListTmp[i + 1].compareTo(var) != 0) && !passFlag) {
                            passFlag = true;

                            final BEXI_Object dictionary = new BEXI_Object(BEXI_DataContext.FRENCH, BEXI_DataContext.MOT, wordListTmp[i + 1], null, null, null, null, false);
                            try {
                                Vector objects = lookForObject(hosts, context, dataContext, dictionary, driverSQL);
                                if (objects == null) {
                                    objects = lookForObject(hosts, context, dataContext, dictionary, driverASCII);
                                    addObject(hosts, context, dataContext, dictionary, objects, driverSQL);
                                }
                            } catch (Exception e) {
                                throw e;
                            }
                        } else {
                            passFlag = false;
                        }
                    }
                }
            }

        } catch (SQLException e) {
            //e.printStackTrace();
            throw e;

        }
    }

    public Vector marshalling(String objectList) {

        Vector objects = new Vector();
        String[] objectsTmp = objectList.split(";");

        for (int i = 0; i < objectsTmp.length; i++) {
            BEXI_Object object = new BEXI_Object(null, null, null, null, null, null, null, false);
            object = object.Marshalling(objectsTmp[i]);
            objects.add(i, object);
        }
        return objects;
    }

    public String unMarshalling(Vector objects) {

        String objectList = "";
        for (int i = 0; i < objects.size(); i++) {
            BEXI_Object object = (BEXI_Object) objects.get(i);
            objectList = objectList + object.unMarshalling();
        }
        return objectList;
    }
}



