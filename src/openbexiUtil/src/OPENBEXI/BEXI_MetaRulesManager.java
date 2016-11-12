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

import java.awt.*;
import java.io.*;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.regex.PatternSyntaxException;

/**
 * Menage the OPENBEXI metaRules
 */
public class BEXI_MetaRulesManager {

    public BEXI_MetaRulesManager() {
    }

    /**
     * Get the number of OPENBEXI rules from metaRules OPENBEXI database.
     *
     * @param contextPath .
     * @return the number of OPENBEXI rules from metaRules OPENBEXI database.
     * @throws SQLException .
     */
    private int getNbRules(BEXI_ApplicationPath contextPath) throws SQLException {


        try {
            Statement sStatement = contextPath.get_SqlContextManager().get_sqlContext_admin().get_statement();
            // Look for all metarules
            String query = "SELECT rule FROM " + contextPath.getDefaultLanguage() + "_metaRules";
            sStatement.execute(query);
            ResultSet result = sStatement.getResultSet();
            ResultSetMetaData metaDataKey = result.getMetaData();
            int col = metaDataKey.getColumnCount();

            int i = 0;
            while (result.next()) {
                for (int j = 1; j <= col; j++) {

                    i++;
                }
            }
            return i;

        } catch (SQLException e) {
            //e.printStackTrace();
            throw e;
        }
    }

    /**
     * Get the list of OPENBEXI rules from the metaRules OPENBEXI database:
     * <li> query = "SELECT rule FROM metaRules".
     *
     * @param contextPath .
     * @return listRules .
     * @throws SQLException .
     */

    public String[] getAllRules(BEXI_ApplicationPath contextPath) throws Exception {


        try {
            // Look for all metarules
            Statement sStatement = contextPath.get_SqlContextManager().get_sqlContext_admin().get_statement();
            String[] listRules = new String[getNbRules(contextPath)];
            String query = "SELECT rule FROM " + contextPath.getDefaultLanguage() + "_metaRules";
            sStatement.execute(query);
            ResultSet result = sStatement.getResultSet();
            ResultSetMetaData metaDataKey = result.getMetaData();
            int col = metaDataKey.getColumnCount();

            int i = 0;
            while (result.next()) {
                for (int j = 1; j <= col; j++) {
                    listRules[i] = result.getString(j);
                    i++;
                }
            }
            return listRules;

        } catch (SQLException e) {
            //e.printStackTrace();
            throw e;
        }
    }

    /**
     * Create and Set up a metaRules table:
     * <li> query = "CREATE TABLE metaRules( rule VARCHAR(254) PRIMARY KEY ,action VARCHAR(254) ,NLexample VARCHAR(254), driver VARCHAR(254) ,  priority VARCHAR(254) )".
     *
     * @param contextPath .
     * @throws SQLException .
     */
    public void createMetaRulesTable(BEXI_ApplicationPath contextPath) throws SQLException {

        String query[] = {
                "CREATE TABLE " + contextPath.getDefaultLanguage() + "_metaRules( _id_metaRules VARCHAR(254),rule VARCHAR(254) PRIMARY KEY, genericMetaRule VARCHAR(254),action VARCHAR(254) ,NLexample VARCHAR(254), driver VARCHAR(254) ,  priority VARCHAR(254) )",
                "CREATE UNIQUE INDEX _index_metarules on " + contextPath.getDefaultLanguage() + "_metaRules (_id_metaRules)"
        };

        int i = 0;
        while (i < query.length) {
            try {
                contextPath.get_SqlContextManager().get_sqlContext_admin().get_statement().execute(query[i]);
            } catch (SQLException e) {
                //e.printStackTrace();
                throw e;
            }
            i++;
        }
    }

    /**
     * Fill up metaRules OPENBEXI database from a text file.
     *
     * @param contextPath .
     * @throws SQLException .
     */
    public void createMetaRulesData(BEXI_ApplicationPath contextPath) throws
            SQLException {

        String genericMetarule;
        String action;
        String context1;
        String driver;
        String priority;

        try {
            // Set a OPENBEXI context
            String fileName = contextPath.getDefaultMetaRulesPath() + System.getProperty("file.separator") + contextPath.getDefaultLanguage() + "_BEXIMetaRules.txt";
            FileReader reader = new FileReader(fileName);
            BufferedReader read = new BufferedReader(reader);
            //sStatement.execute("SET REFERENTIAL_INTEGRITY FALSE");

            String s;
            while ((s = read.readLine()) != null) {

                // Decode the line
                if (!s.equals("") && s.charAt(0) != '#') {

                    //sStatement.execute("SET REFERENTIAL_INTEGRITY FALSE");
                    String[] item = s.split("[|]");
                    genericMetarule = item[0];
                    action = item[1];
                    context1 = item[2];
                    driver = item[3];
                    priority = item[4];

                    // Look for sub-metarules if any
                    BEXI_list subMetaRules = null;
                    BEXI_Expression expression = new BEXI_Expression();
                    try {
                        subMetaRules = expression.analyzeMetaLanguage(genericMetarule);
                    } catch (BEXI_ExpressionException e) {
                        e.getMessage();
                    } catch (BEXI_MetaRuleException e) {
                        e.getMessage();
                    }
                    for (int l = 0; l < subMetaRules.getItemCount(); l++) {
                        try {
                            String metarule = subMetaRules.getItem(l);
                            String query = "INSERT INTO " + contextPath.getDefaultLanguage() + "_metaRules VALUES("
                                    + "'" + BEXI_Key.generateKey()
                                    + "','" + metarule
                                    + "','" + genericMetarule
                                    + "','" + action
                                    + "','" + context1
                                    + "','" + driver
                                    + "','" + priority
                                    + "')";
                            //System.out.println(query);
                            contextPath.get_SqlContextManager().get_sqlContext_admin().get_statement().execute(query);
                        } catch (SQLException e) {
                            //System.err.println(e.getMessage());
                            //throw e;
                        } catch (PatternSyntaxException e) {
                            System.err.println(e.getMessage());
                        } catch (NullPointerException e) {
                            System.err.println(e.getMessage());
                        } catch (Exception e) {
                            System.err.println(e.getMessage());
                        } finally {
                        }
                    }
                }
            }
            read.close();
            reader.close();

        } catch (IOException e) {
            //System.out.println(e.getMessage());
            e.printStackTrace();
        } catch (IllegalArgumentException e) {
            e.getMessage();
        } catch (Exception e) {
            e.getMessage();
        } finally {
            //System.out.println(i + ":insertData:unknown exception:");
        }

    }

    /**
     * Insert metaRules OPENBEXI in ASCIIdatabase.
     *
     * @param contextPath     .
     * @param genericMetarule .
     * @param action          .
     * @param context1        .
     * @param driver          .
     * @param priority        .
     * @throws Exception .
     */
    private void updateMetaRulesASCII(BEXI_ApplicationPath contextPath, String genericMetarule, String action, String context1, String driver, String priority) throws
            Exception {

        BEXI_list Metarules = new BEXI_list();

        // Compile regular expression
        String items[] = action.split("_X");

        try {

            // Set a OPENBEXI context
            FileReader reader = new FileReader(contextPath.getDefaultMetaRulesPath() + System.getProperty("file.separator") + contextPath.getDefaultLanguage() + "_BEXIMetaRules.txt");
            BufferedReader read = new BufferedReader(reader);
            //sStatement.execute("SET REFERENTIAL_INTEGRITY FALSE");

            String s;
            while ((s = read.readLine()) != null) {

                if (!s.trim().equals("")) {
                    // Keep existing metarules
                    Metarules.add(s);
                    // Decode the line
                    if (s.charAt(0) == '#') {
                        Pattern pattern = Pattern.compile("####################################" + items[0].trim() + "####################################");
                        Matcher matcher = pattern.matcher(s);
                        if (matcher.find()) {
                            Metarules.add(genericMetarule + "|" + action + "|" + context1 + "|" + driver + "|" + priority);
                        }
                    }
                }
            }
            read.close();
            reader.close();

            // Save new metarules data
            final FileWriter writer;
            final BufferedWriter write;

            writer = new FileWriter(contextPath.getDefaultMetaRulesPath() + System.getProperty("file.separator") + contextPath.getDefaultLanguage() + "_BEXIMetaRules.txt", false);
            write = new BufferedWriter(writer);

            for (int i = 0; i < Metarules.getItemCount(); i++) {
                write.write(Metarules.getItem(i) + System.getProperty("line.separator"));
            }
            write.close();
            writer.close();


        } catch (IOException e) {
            //System.out.println(e.getMessage());
            System.err.println(e.getMessage());
        } catch (IllegalArgumentException e) {
            System.err.println(e.getMessage());
        } catch (Exception e) {
            System.err.println(e.getMessage());
        } finally {
            //System.out.println(i + ":insertData:unknown exception:");
        }
    }

    /**
     * Insert metaRules OPENBEXI in database.
     *
     * @param contextPath     .
     * @param genericMetarule .
     * @param action          .
     * @param context1        .
     * @param driver          .
     * @param priority        .
     * @throws Exception .
     */
    public void insertMetaRule(BEXI_ApplicationPath contextPath, String genericMetarule, String action, String context1, String driver, String priority) throws
            Exception {

        try {

            //sStatement.execute("SET REFERENTIAL_INTEGRITY FALSE");

            // Look for sub-metarules if any
            BEXI_list subMetaRules = null;
            BEXI_Expression expression = new BEXI_Expression();
            try {
                subMetaRules = expression.analyzeMetaLanguage(genericMetarule);
            } catch (BEXI_ExpressionException e) {
                System.err.println(e.getMessage());
            } catch (BEXI_MetaRuleException e) {
                System.err.println(e.getMessage());
            }
            if (subMetaRules == null) return;
            String metarule;
            for (int l = 0; l < subMetaRules.getItemCount(); l++) {
                metarule = subMetaRules.getItem(l);
                contextPath.get_SqlContextManager().get_sqlContext_admin().get_statement().execute("INSERT INTO " + contextPath.getDefaultLanguage() + "_metaRules VALUES("
                        + "'" + BEXI_Key.generateKey()
                        + "','" + metarule
                        + "','" + genericMetarule
                        + "','" + action
                        + "','" + context1
                        + "','" + driver
                        + "','" + priority
                        + "')");
            }

            updateMetaRulesASCII(contextPath, genericMetarule, action, context1, driver, priority);

        } catch (Exception e) {
            System.err.println(e.getMessage());
            throw e;
        }

    }

    /**
     * Delete metaRule OPENBEXI in database.
     *
     * @param contextPath     .
     * @param genericMetarule .
     * @param action          .
     * @param context1        .
     * @param driver          .
     * @param priority        .
     * @throws Exception .
     */
    public void deleteMetaRule(BEXI_ApplicationPath contextPath, String genericMetarule, String action, String context1, String driver, String priority) throws Exception {

        try {

            //sStatement.execute("SET REFERENTIAL_INTEGRITY FALSE");
            contextPath.get_SqlContextManager().get_sqlContext_admin().get_statement().execute("DELETE FROM " + contextPath.getDefaultLanguage() + "_metaRules WHERE name='" + genericMetarule + "'");

            updateMetaRulesASCII(contextPath, genericMetarule, action, context1, driver, priority);

        } catch (Exception e) {
            System.err.println(e.getMessage());
            throw e;
        }
    }
}
