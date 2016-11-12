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

import java.io.IOException;
import java.sql.*;
import java.util.Random;
import java.util.Vector;

public final class BEXI_SQLDriver {

    /**
     * BEXI_SQLDriver constructor.
     */
    public BEXI_SQLDriver() {
    }

    /**
     * Return the list of primary keys of class objects.
     *
     * @param sStatement .
     * @param classe     .
     * @param object     .
     * @return list of promary class object key .
     * @throws SQLException            .
     * @throws BEXI_SQLDriverException .
     */
    private BEXI_results select_key_class_objet(final Statement sStatement, final String classe, final String object) throws SQLException, BEXI_SQLDriverException {

        BEXI_results bexi_results = new BEXI_results();
        bexi_results._list = new BEXI_list();
        bexi_results._SQL_query = new String[]{"SELECT " + BEXI_Object._ID_KEY + classe + " FROM " + classe + " WHERE name='" + object + "'"};
        // Look for the class attribute number

        try {
            sStatement.execute(bexi_results._SQL_query[0]);
            final ResultSet resultS = sStatement.getResultSet();

            int resultCout = 0;
            while (resultS.next()) {
                bexi_results._list.add(resultS.getString(BEXI_Object._ID_KEY + classe));
                resultCout = resultCout + 1;
            }
            resultS.close();

            if (resultCout == 0) {
                throw new BEXI_SQLDriverException("the " + classe + " " + object + " cannot be found");
            }
        } catch (SQLException e) {
            throw e;
        }
        return bexi_results;
    }

    /**
     * Return result from SQL query.
     *
     * @param sStatement .
     * @param query      .
     * @param classe     .
     * @return Return ResultSet from SQL query .
     * @throws SQLException .
     */
    public BEXI_results execute_SQL_query(final Statement sStatement, final String query, String classe) throws SQLException {
        try {
            BEXI_results bexi_results = new BEXI_results();
            bexi_results._SQL_query = new String[]{query};
            sStatement.execute(query);
            bexi_results._resultSet = sStatement.getResultSet();
            return bexi_results;
        } catch (SQLException e) {
            throw e;
        }
    }

    /**
     * create a table (= classe) in the database.
     *
     * @param sStatement .
     * @param classe     .
     * @throws SQLException .
     */
    public void create_class(final Statement sStatement, final String classe) throws SQLException {

        final String[] query = {
                "CREATE TABLE " + classe + " (" + BEXI_Object._ID_KEY + classe + " VARCHAR (254) PRIMARY KEY, name VARCHAR (254))",
                "CREATE UNIQUE INDEX _index_" + classe + " on " + classe + " (" + BEXI_Object._ID_KEY + classe + ")"
        };

        for (int i = 0; i < query.length; i++) {
            // drop table may fail
            try {
                //System.out.println(query[i]);
                sStatement.execute(query[i]);
                BEXI_results bexi_results = new BEXI_results();

            } catch (SQLException e) {
                //System.out.println(e.getMessage());
                throw e;
            }
        }
    }

    /**
     * delete a class in the database.
     *
     * @param sStatement .
     * @param classe     .
     * @throws SQLException .
     */
    public void delete_class(final Statement sStatement, final String classe) throws SQLException {

        final String[] query = {"DROP TABLE " + classe};

        for (int i = 0; i < query.length; i++) {
            // drop table may fail
            try {
                sStatement.execute(query[i]);
            } catch (SQLException e) {
                // e.printStackTrace();
                throw e;
            }
        }
    }

    /**
     * Create a link between two classes in the database.
     *
     * @param sStatement .
     * @param class1     .
     * @param link       .
     * @param class2     .
     * @throws SQLException .
     */
    public void create_class_link(final Statement sStatement, final String class1, final String link, final String class2) throws SQLException {

        final String[] query = {
                //Create class link
                "CREATE TABLE " + class1 + "_" + link + "_" + class2 + " (" + BEXI_Object._ID_KEY + class1 + BEXI_Object._ID_KEY + class2 + " VARCHAR (254) PRIMARY KEY," + BEXI_Object._ID_KEY + class1 + " VARCHAR (254), " + BEXI_Object._ID_KEY + class2 + " VARCHAR (254))  "
        };
        for (int i = 0; i < query.length; i++) {

            // drop table may fail
            try {
                //System.out.println(query[i]);
                sStatement.execute(query[i]);
            } catch (SQLException e) {
                //System.out.println(e.getMessage());
                throw e;
            }
        }
    }

    /**
     * Return true if the classes link exists.
     *
     * @param sStatement .
     * @param class1     .
     * @param link       .
     * @param class2     .
     * @return true if the classes link exists .
     */
    private boolean check_class_link(final Statement sStatement, final String class1, final String link, final String class2) {

        try {
            sStatement.execute("SELECT * FROM " + class1 + "_" + link + "_" + class2);
        } catch (SQLException e) {
            return false;
        }

        return true;
    }

    /**
     * Delete a link between two classes in the database.
     *
     * @param sStatement .
     * @param class1     .
     * @param link       .
     * @param class2     .
     * @throws SQLException .
     */
    public void delete_class_link(final Statement sStatement, final String class1, final String link, final String class2) throws SQLException {

        final String[] query = {
                "DROP TABLE " + class1 + "_" + link + "_" + class2
        };

        for (int i = 0; i < query.length; i++) {
            // drop table may fail
            try {
                //System.out.println(query[i]);
                sStatement.execute(query[i]);
            } catch (SQLException e) {
                throw e;
            } catch (Exception e) {
                e.getMessage();
            }
        }
    }

    /**
     * Create a column (= class attribut) in the database.
     *
     * @param sStatement .
     * @param classe     .
     * @param attribut   .
     * @throws SQLException .
     */
    public void create_class_attribut(final Statement sStatement, final String classe, final String attribut) throws SQLException {

        final String[] query = {
                "ALTER TABLE " + classe + " ADD COLUMN " + attribut + " VARCHAR (254)"
        };

        for (int i = 0; i < query.length; i++) {

            // drop table may fail
            try {
                sStatement.execute(query[i]);
            } catch (SQLException e) {
                //e.printStackTrace();
                throw e;
            }
        }
    }

    /**
     * Delete a column (= class attribute) in the database.
     *
     * @param sStatement .
     * @param classe     .
     * @param attribut   .
     * @throws SQLException .
     */
    public void delete_class_attribut(final Statement sStatement, final String classe, final String attribut) throws SQLException {

        final String[] query = {
                "ALTER TABLE " + classe + " DROP COLUMN " + attribut
        };

        for (int i = 0; i < query.length; i++) {

            // drop table may fail
            try {
                sStatement.execute(query[i]);
            } catch (SQLException e) {
                //e.printStackTrace();
                throw e;
            }
        }
    }

    /**
     * Create a row (class object) in the database.
     *
     * @param sStatement .
     * @param classe     .
     * @param object     .
     * @throws SQLException .
     */
    public void create_class_object(final Statement sStatement, final String classe, final String object) throws SQLException {

        // Look for special admin class and do nothing for this class
        if (classe.toLowerCase().equals(BEXI_DataContext.MOT) || classe.toLowerCase().equals(BEXI_DataContext.WORD) || classe.toLowerCase().contains("_metarules")) {
            return;
        }
        // Look for the class attribute number
        sStatement.execute("SELECT * FROM " + classe);
        final ResultSet resultS = sStatement.getResultSet();
        final ResultSetMetaData metaDataKey = resultS.getMetaData();
        final int col = metaDataKey.getColumnCount();
        resultS.close();

        // Build the query
        String queryPart = "";
        for (int i = 0; i < col - 2; i++) {
            queryPart = queryPart + "','";
        }
        queryPart = queryPart + "')";
        final String query = "INSERT INTO " + classe + " VALUES('" + BEXI_Key.generateKey() + "','" + object + queryPart;

        // drop table may fail
        try {
            //System.out.println(query);
            sStatement.execute(query);
            final String[] attributs = new String[1];
            final String[] values = new String[1];
            attributs[0] = "name";
            values[0] = object;
            create_class_object_attribut(sStatement, classe, object, attributs, values);
        } catch (SQLException e) {
            throw e;
        }
    }

    /**
     * Create a row (class object) in the database.
     * <li> The column "NAME" (class object name) doesn't exist
     *
     * @param sStatement .
     * @param classe     .
     * @param key        .
     * @throws SQLException .
     */
    private void create_class_objectWithoutName(final Statement sStatement, final String classe, final String key) throws SQLException {

        // Look for the class attribute number
        sStatement.execute("SELECT * FROM " + classe);
        final ResultSet resultS = sStatement.getResultSet();
        final ResultSetMetaData metaDataKey = resultS.getMetaData();
        final int col = metaDataKey.getColumnCount();
        resultS.close();

        // Build the query
        String queryPart = "";
        for (int i = 0; i < col - 1; i++) {
            queryPart = queryPart + "','";
        }
        queryPart = queryPart + "')";
        final String query = "INSERT INTO " + classe + " VALUES('" + key + queryPart;

        // drop table may fail
        try {
            //System.out.println(query[i]);
            sStatement.execute(query);
        } catch (SQLException e) {
            throw e;
        }
    }

    /**
     * Delete a row (= class object) in the database.
     *
     * @param sStatement .
     * @param classe     .
     * @param object     .
     * @throws SQLException .
     */
    public void delete_class_object(final Statement sStatement, final String classe, final String object) throws SQLException {

        // Look for the class attribute number

        final String[] query = {"DELETE FROM " + classe + " WHERE name='" + object + "'"};

        for (int i = 0; i < query.length; i++) {

            // drop table may fail
            try {
                //System.out.println(query[i]);
                sStatement.execute(query[i]);
            } catch (SQLException e) {
                System.out.println(e.getMessage());
                throw e;
            }
        }
    }

    /**
     * Create a new colum ( = class object attribut) in the database.
     *
     * @param sStatement .
     * @param classe     .
     * @param object     .
     * @param attribut
     * @param value
     * @throws SQLException .
     */
    public void create_class_object_attribut(final Statement sStatement, final String classe, final String object, final String[] attribut, final String[] value) throws SQLException {

        final String[] query = new String[attribut.length];
        // Build the query
        for (int i = 0; i < attribut.length; i++) {
            query[i] = "UPDATE " + classe + " SET " + attribut[i] + " = '" + value[i] + "' WHERE name = '" + object + "'";
        }

        // drop table may fail
        try {
            for (int j = 0; j < query.length; j++) {
                //System.out.println(query[j]);
                sStatement.execute(query[j]);
            }
        } catch (SQLException e) {
            //System.out.println(e.getMessage());
            throw e;
        }
    }

    /**
     * Update a class attribut of object witout name in the database.
     *
     * @param sStatement .
     * @param classe     .
     * @param attribut   .
     * @param value      .
     * @throws SQLException            .
     * @throws BEXI_SQLDriverException .
     */
    private void create_class_objectWithoutName_attribut(final Statement sStatement, final String classe, final String[] attribut, final String[] value) throws SQLException, BEXI_SQLDriverException {

        final String[] query = new String[attribut.length];
        String key = "";
        String valueKey = "";
        // Build the query and the Key
        for (int i = 0; i < attribut.length; i++) {
            query[i] = "UPDATE " + classe + " SET " + attribut[i] + " = '" + value[i] + "'";
            key = key + attribut[i];
            valueKey = valueKey + value[i];
        }
        for (int i = 0; i < attribut.length; i++) {
            query[i] = query[i] + " WHERE " + key + "='" + valueKey + "'";
        }

        try {
            create_class_objectWithoutName(sStatement, classe, valueKey);
        } catch (SQLException e) {
            throw new BEXI_SQLDriverException("Link already exist");
        }

        // drop table may fail
        try {
            for (int j = 0; j < query.length; j++) {
                //System.out.println(query[j]);
                sStatement.execute(query[j]);
            }
        } catch (SQLException e) {
            //e.printStackTrace();
            throw e;
        }
    }


    /**
     * Delete a class object attribut in the database.
     *
     * @param sStatement .
     * @param classe     .
     * @param object     .
     * @param attribute  .
     * @throws SQLException .
     */
    public void delete_classe_object_attribut(final Statement sStatement, final String classe, final String object, final String attribute) throws SQLException {

        // Build the query with value=""
        final String value = "";
        final String[] query = {"UPDATE " + classe + " SET " + attribute + " = '" + value + "' WHERE name = '" + object + "'"
        };

        for (int i = 0; i < query.length; i++) {

            // drop table may fail
            try {
                //System.out.println(query[i]);
                sStatement.execute(query[i]);
            } catch (SQLException e) {
                //e.printStackTrace();
                throw e;
            }
        }

    }

    /**
     * Return class data.
     *
     * @param sStatement .
     * @param classe     .
     * @return classe data as ResultSet
     * @throws SQLException .
     */
    public BEXI_results select_class(final Statement sStatement, final String classe) throws SQLException {
        try {
            BEXI_results bexi_results = new BEXI_results();
            bexi_results._SQL_query = new String[]{"SELECT * FROM " + classe};
            sStatement.execute(bexi_results._SQL_query[0]);
            bexi_results._resultSet = sStatement.getResultSet();
            //resultS.close();
            return bexi_results;

        } catch (SQLException e) {

            throw e;
        }
    }

    /**
     * Return one random classe attribut.
     *
     * @param sStatement .
     * @param classe     .
     * @return one random classe attribut
     * @throws SQLException .
     */
    public BEXI_results select_one_class_attribut(final Statement sStatement, final String classe) throws SQLException {

        // Look for the class attribute number
        BEXI_results bexi_results = new BEXI_results();
        bexi_results._list = new BEXI_list();
        bexi_results._SQL_query = new String[]{"SELECT * FROM " + classe};
        try {
            sStatement.execute(bexi_results._SQL_query[0]);
            final ResultSet resultS = sStatement.getResultSet();
            final ResultSetMetaData metaDataKey = resultS.getMetaData();
            final int col = metaDataKey.getColumnCount();

            // Look for random attributs
            int r = 0;
            final Random rand = new Random();
            while (r == 0 || r == 1) {
                r = rand.nextInt(col + 1);
            }
            bexi_results._list.add((metaDataKey.getColumnName(r)));
            bexi_results._resultSet.close();

        } catch (SQLException e) {

            throw e;
        }
        return bexi_results;
    }

    /**
     * Return  random classe attributs.
     *
     * @param sStatement .
     * @param classe     .
     * @return random classe attributs
     * @throws SQLException .
     */
    public BEXI_results select_random_class_attributs(final Statement sStatement, final String classe) throws SQLException {

        // Look for the class attribute number
        BEXI_results bexi_results = new BEXI_results();
        bexi_results._list = new BEXI_list();
        bexi_results._SQL_query = new String[]{"SELECT * FROM " + classe};
        try {
            sStatement.execute(bexi_results._SQL_query[0]);
            final ResultSet resultS = sStatement.getResultSet();
            final ResultSetMetaData metaDataKey = resultS.getMetaData();
            final int col = metaDataKey.getColumnCount();

            // Look for random attributs
            final int r;
            int r1 = 0;
            int r2 = 0;
            final int i;
            final Random rand = new Random();
            while (r1 == 0 || r1 == 1) {
                r1 = rand.nextInt(col + 1);
            }
            while (r2 == 0 || r2 == 1) {
                r2 = rand.nextInt(col + 1);
            }
            if (r1 > r2) {
                i = r2;
                r = r1;
            } else if (r1 < r2) {
                i = r1;
                r = r2;

            } else {
                i = r1;
                r = r2;
            }
            for (int j = i; j < r + 1; j++) {
                bexi_results._list.add((metaDataKey.getColumnName(j)));
            }
            resultS.close();

        } catch (SQLException e) {
            e.getMessage();
            throw e;
        }

        return bexi_results;
    }

    /**
     * Return the class attributs.
     *
     * @param sStatement .
     * @param classe     .
     * @return list of class attributs
     * @throws SQLException .
     */
    public BEXI_results select_class_attributs(final Statement sStatement, final String classe) throws SQLException {

        // Look for the class attribute number
        BEXI_results bexi_result = new BEXI_results();
        bexi_result._list = new BEXI_list();
        bexi_result._SQL_query = new String[]{"SELECT * FROM " + classe};
        try {
            sStatement.execute(bexi_result._SQL_query[0]);
            final ResultSet resultS = sStatement.getResultSet();
            final ResultSetMetaData metaDataKey = resultS.getMetaData();
            final int col = metaDataKey.getColumnCount();

            for (int i = 2; i < col + 1; i++) {
                bexi_result._list.add((metaDataKey.getColumnName(i)));
                //System.out.println(metaDataKey.getColumnName(i));
            }
            resultS.close();

        } catch (SQLException e) {
            e.getMessage();
            throw e;
        }
        return bexi_result;
    }

    /**
     * return class attributs.
     *
     * @param sStatement .
     * @param classe     .
     * @return results
     * @throws BEXI_SQLDriverException .
     * @throws SQLException            .
     */
    public BEXI_results select_all_class_attributs(final Statement sStatement, final String classe) throws BEXI_SQLDriverException, SQLException {

        // Look for the class attribute number
        BEXI_results bexi_results = new BEXI_results();
        bexi_results._list = new BEXI_list();
        bexi_results._SQL_query = new String[]{"SELECT * FROM " + classe};
        try {
            sStatement.execute(bexi_results._SQL_query[0]);
            final ResultSet resultS = sStatement.getResultSet();
            final ResultSetMetaData metaDataKey = resultS.getMetaData();
            final int col = metaDataKey.getColumnCount();
            int resultCout = 0;
            for (int i = 1; i < col + 1; i++) {
                bexi_results._list.add((metaDataKey.getColumnName(i)));
                resultCout = resultCout + 1;
            }
            resultS.close();

            if (resultCout == 0) {
                throw new BEXI_SQLDriverException("No attribut found for " + classe);
            }
        } catch (SQLException e) {
            throw e;
        }

        return bexi_results;
    }

    /**
     * Return all class object attributs.
     *
     * @param sStatement .
     * @param classe     .
     * @param attribut   .
     * @param object     .
     * @return list of class object attributs
     * @throws BEXI_SQLDriverException .
     */
    public BEXI_results select_all_class_object_attributs(final Statement sStatement, final String classe, final String attribut, final String object) throws BEXI_SQLDriverException {
        // Look for the class attribute number
        int resultCout = 0;
        BEXI_results bexi_results = new BEXI_results();
        bexi_results._list = new BEXI_list();
        bexi_results._SQL_query = new String[]{"SELECT " + attribut + " FROM " + classe + " WHERE name='" + object + "'"};
        try {
            sStatement.execute(bexi_results._SQL_query[0]);
            final ResultSet resultS = sStatement.getResultSet();
            while (resultS.next()) {
                bexi_results._list.add(resultS.getString(attribut));
                resultCout = resultCout + 1;
            }
            resultS.close();
        } catch (SQLException e) {
            resultCout = 0;
        }
        if (resultCout == 0) {
            final BEXI_Message message = new BEXI_Message();
            final String[] wordMessageList = {attribut, " no found for ", object};
            throw new BEXI_SQLDriverException(message.getMessage(wordMessageList));
        }
        return bexi_results;
    }

    /**
     * Select all class object attribut.
     *
     * @param sStatement .
     * @param attribut1  .
     * @param classe     .
     * @param attribut2  .
     * @param object     .
     * @return list of class object attributs.
     * @throws BEXI_SQLDriverException .
     */
    public BEXI_results select_all_class_object_attributs(final Statement sStatement, final String attribut1, final String classe, final String attribut2, final String object) throws BEXI_SQLDriverException {
        // Look for the class attribute number
        int resultCout = 0;
        BEXI_results bexi_results = new BEXI_results();
        bexi_results._list = new BEXI_list();
        bexi_results._SQL_query = new String[]{"SELECT " + attribut1 + " FROM " + classe + " WHERE " + attribut2 + "='" + object + "'"};
        try {
            sStatement.execute(bexi_results._SQL_query[0]);
            final ResultSet resultS = sStatement.getResultSet();
            while (resultS.next()) {
                bexi_results._list.add(resultS.getString(attribut1));
                resultCout = resultCout + 1;
            }
            resultS.close();

        } catch (SQLException e) {
            resultCout = 0;
        }
        if (resultCout == 0) {
            final BEXI_Message message = new BEXI_Message();
            final String[] wordMessageList = {attribut1, " no found for ", classe + " " + attribut2 + " " + object};
            throw new BEXI_SQLDriverException(message.getMessage(wordMessageList));
        }
        return bexi_results;
    }

    /**
     * Create class object link.
     *
     * @param sStatement .
     * @param class1     .
     * @param object1    .
     * @param link       .
     * @param class2     .
     * @param object2    .
     * @throws BEXI_SQLDriverException .
     */
    public void create_class_object_link(final Statement sStatement, final String class1, final String object1, final String link, final String class2, final String object2) throws BEXI_SQLDriverException {
        // Look if the class link exist
        if (!check_class_link(sStatement, class1, link, class2)) {
            throw new BEXI_SQLDriverException("It's not possible to create this link");
        }
        // Look for the first class object unique key
        BEXI_results bexi_result1 = new BEXI_results();
        String failReason = null;
        try {
            bexi_result1 = select_key_class_objet(sStatement, class1, object1);
        } catch (SQLException e) {
            failReason = e.getMessage();
            throw new BEXI_SQLDriverException("It's not possible to create this link because " + failReason);
        } catch (BEXI_SQLDriverException e) {
            failReason = e.getMessage();
        }

        // if the class1 object1 doesn't exist, create this object
        if (failReason != null) {
            failReason = null;
            try {
                create_class_object(sStatement, class1, object1);
            } catch (SQLException e) {
                failReason = e.getMessage();
                throw new BEXI_SQLDriverException("It's not possible to create this link because " + failReason);
            }
            // Look for the first class object unique key again
            try {
                bexi_result1 = select_key_class_objet(sStatement, class1, object1);
            } catch (SQLException e) {
                failReason = e.getMessage();
                throw new BEXI_SQLDriverException("It's not possible to create this link because " + failReason);
            } catch (BEXI_SQLDriverException e) {
                failReason = e.getMessage();
                throw new BEXI_SQLDriverException("It's not possible to create this link because " + failReason);
            }
        }

        BEXI_results bexi_result2 = new BEXI_results();
        // Look for the second class object unique key
        try {
            bexi_result2 = select_key_class_objet(sStatement, class2, object2);
        } catch (SQLException e) {
            failReason = e.getMessage();
            throw new BEXI_SQLDriverException("It's not possible to create this link because " + failReason);
        } catch (BEXI_SQLDriverException e) {
            failReason = e.getMessage();
        }

        // if the class2 object2 doesn't exist, create this object
        if (failReason != null) {
            try {
                create_class_object(sStatement, class2, object2);
            } catch (SQLException e) {
                failReason = e.getMessage();
                throw new BEXI_SQLDriverException("It's not possible to create this link because " + failReason);
            }
            // Look for the second class object unique key again
            try {
                bexi_result2 = select_key_class_objet(sStatement, class2, object2);
            } catch (SQLException e) {
                failReason = e.getMessage();
                throw new BEXI_SQLDriverException("It's not possible to create this link because " + failReason);
            } catch (BEXI_SQLDriverException e) {
                failReason = e.getMessage();
                throw new BEXI_SQLDriverException("It's not possible to create this link because " + failReason);
            }
        }

        //Create the links if there are all the keys
        final String[] attributs = new String[2];
        attributs[0] = BEXI_Object._ID_KEY + class1;
        attributs[1] = BEXI_Object._ID_KEY + class2;
        if (bexi_result1.get_list() != null && bexi_result2.get_list() != null) {
            for (int i = 0; i < bexi_result1.get_list().getItemCount(); i++) {
                for (int j = 0; j < bexi_result2.get_list().getItemCount(); j++) {
                    final String[] values = new String[2];
                    values[0] = bexi_result1.get_list().getItem(i);
                    values[1] = bexi_result2.get_list().getItem(j);
                    try {
                        create_class_objectWithoutName_attribut(sStatement, class1 + "_" + link + "_" + class2, attributs, values);
                    } catch (BEXI_SQLDriverException e) {
                        throw new BEXI_SQLDriverException("The link " + class1 + " " + object1 + " " + link + " " + class2 + " " + object2 + " already exists");
                    } catch (SQLException e) {
                        throw new BEXI_SQLDriverException("It's not possible to create this link because :" + e);
                    }
                }
            }
        } else {
            throw new BEXI_SQLDriverException("It's not possible to create this link");
        }

    }

    /**
     * Return all class object link.
     *
     * @param sStatement .
     * @param class1     .
     * @param object     .
     * @param link       .
     * @param class2     .
     * @return all class object link .
     * @throws BEXI_SQLDriverException .
     */
    public BEXI_results select_all_class_object_link(final Statement sStatement, final String class1, final String object, final String link, final String class2) throws BEXI_SQLDriverException {
        // Look for the class attribute number
        int resultCout = 0;
        BEXI_results bexi_results = new BEXI_results();
        bexi_results._list = new BEXI_list();
        bexi_results._SQL_query = new String[]{"SELECT " + class2 + "." + "name" + " from " + class2 + "," + class1 + "_" + link + "_" + class2 + "," + class1 + " where " + class1 + "." + BEXI_Object._ID_KEY + class1 + "=" + class1 + "_" + link + "_" + class2 + "." + BEXI_Object._ID_KEY + class1 + " and " + class1 + "_" + link + "_" + class2 + "." + BEXI_Object._ID_KEY + class2 + "=" + class2 + "." + BEXI_Object._ID_KEY + class2};
        try {
            sStatement.execute(bexi_results._SQL_query[0]);
            final ResultSet resultS = sStatement.getResultSet();

            while (resultS.next()) {
                bexi_results._list.add(resultS.getString("name"));
                resultCout = resultCout + 1;
            }
            resultS.close();
            if (resultCout == 0) {
                final BEXI_Message message = new BEXI_Message();
                final String[] wordMessageList = {"name", " no found for ", object};
                throw new BEXI_SQLDriverException(message.getMessage(wordMessageList));
            }
        } catch (SQLException e) {
            resultCout = 0;
        }
        if (resultCout == 0) {
            final BEXI_Message message = new BEXI_Message();
            final String[] wordMessageList = {"name", " no found for ", object};
            throw new BEXI_SQLDriverException(message.getMessage(wordMessageList));
        }

        return bexi_results;
    }

    /**
     * Delete a attribut of class object without name.
     *
     * @param sStatement .
     * @param classe     .
     * @param attribut   .
     * @param value      .
     * @throws SQLException .
     */
    private void delete_class_objectWithoutName_attribut(final Statement sStatement, final String classe, final String[] attribut, final String[] value) throws SQLException {

        final String[] query = new String[1];
        String key = "";
        String valueKey = "";
        // Build the query and the Key
        for (int i = 0; i < attribut.length; i++) {
            query[0] = "DELETE FROM " + classe;
            key = key + attribut[i];
            valueKey = valueKey + value[i];
        }
        query[0] = query[0] + " WHERE " + key + "='" + valueKey + "'";

        // drop table may fail
        try {
            for (int j = 0; j < query.length; j++) {
                //System.out.println(query[j]);
                sStatement.execute(query[j]);
            }
        } catch (SQLException e) {
            //e.printStackTrace();
            throw e;
        }
    }

    /**
     * Delete a class object link.
     *
     * @param sStatement .
     * @param class1     .
     * @param object1    .
     * @param link       .
     * @param class2     .
     * @param object2    .
     * @throws BEXI_SQLDriverException .
     */
    public void delete_class_object_link(final Statement sStatement, final String class1, final String object1, final String link, final String class2, final String object2) throws BEXI_SQLDriverException {
        // Look if the class link exist
        if (!check_class_link(sStatement, class1, link, class2)) {
            throw new BEXI_SQLDriverException("It's not possible to delete this link");
        }
        // Look for the first class object unique key
        BEXI_results bexi_result1 = new BEXI_results();
        final String failReason;
        try {
            bexi_result1 = select_key_class_objet(sStatement, class1, object1);
        } catch (SQLException e) {
            failReason = e.getMessage();
            throw new BEXI_SQLDriverException("It's not possible to delete this link because " + failReason);
        } catch (BEXI_SQLDriverException e) {
            //failReason = e.getMessage();
        }


        BEXI_results bexi_result2 = new BEXI_results();
        // Look for the second class object unique key
        try {
            bexi_result2 = select_key_class_objet(sStatement, class2, object2);
        } catch (SQLException e) {
            throw new BEXI_SQLDriverException("It's not possible to delete this link because " + e.getMessage());
        } catch (BEXI_SQLDriverException e) {
            //failReason = e.getMessage();
        }

        //Delete the links if there are all the keys
        final String[] attributs = new String[2];
        attributs[0] = BEXI_Object._ID_KEY + class1;
        attributs[1] = BEXI_Object._ID_KEY + class2;
        if (bexi_result1.get_list() != null && bexi_result2.get_list() != null) {
            for (int i = 0; i < bexi_result1.get_list().getItemCount(); i++) {
                for (int j = 0; j < bexi_result2.get_list().getItemCount(); j++) {
                    final String[] values = new String[2];
                    values[0] = bexi_result1.get_list().getItem(i);
                    values[1] = bexi_result2.get_list().getItem(j);
                    try {
                        delete_class_objectWithoutName_attribut(sStatement, class1 + "_" + link + "_" + class2, attributs, values);
                    } catch (SQLException e) {
                        throw new BEXI_SQLDriverException("It's not possible to delete this link because :" + e);
                    }
                }
            }
        } else {
            throw new BEXI_SQLDriverException("It's not possible to delete this link");
        }

    }

    /**
     * Return classe of the database.
     *
     * @param sStatement .
     * @param driver     .
     * @return results
     * @throws BEXI_SQLDriverException .
     * @throws SQLException            .
     */
    public BEXI_results select_classes(final Statement sStatement, final String driver) throws BEXI_SQLDriverException, SQLException {

        // Look for the class attribute number
        BEXI_results bexi_results = new BEXI_results();
        bexi_results._list = new BEXI_list();

        // oracle
        if (driver.equals("oracle.jdbc.driver.OracleDriver")) {
            bexi_results._SQL_query = new String[]{"select * from user_objects where object_type = 'TABLE'"};
            // select * from user_objects where object_type = 'TABLE';
            //query = "select " + classe.toUpperCase() + " from system_columns";
            // ORACLE:select table_name from system_tables;
        } else if (driver.equals("org.hsqldb.jdbcDriver")) {
            //Obsolete after 1.7
            bexi_results._SQL_query = new String[]{"SELECT * FROM SYSTEM_TABLES"};
        } else if (driver.equals("org.mysql.jdbc.Driver")) {
            bexi_results._SQL_query = new String[]{"show tables tables"};
        } else if (driver.equals("com.mysql.jdbc.Driver")) {
            bexi_results._SQL_query = new String[]{"show tables"};
        } else {
            throw new BEXI_SQLDriverException("No classes found because " + driver + " is not supported");
        }
        //System.out.println(query);

        try {
            int resultCout = 1;
            if (driver.equals("org.hsqldb.jdbcDriver")) {
                DatabaseMetaData md = sStatement.getConnection().getMetaData();
                ResultSet rs = md.getTables(null, null, "%", null);
                while (rs.next()) {
                    if (rs.getString(2).equals("PUBLIC")) {
                        if (rs.getString(3).contains("_")) {
                            bexi_results._list.add(rs.getString(3));
                            resultCout = resultCout + 1;
                        }
                    }
                }
            } else {
                sStatement.execute(bexi_results._SQL_query[0]);
                final ResultSet resultS = sStatement.getResultSet();
                while (resultS.next()) {
                    if (!resultS.getString(1).contains("_")) {
                        bexi_results._list.add(resultS.getString(1));
                        resultCout = resultCout + 1;
                    }
                }
            }
            if (resultCout == 0) {
                throw new BEXI_SQLDriverException("No classes found");
            }
        } catch (SQLException e) {
            throw e;
        }

        return bexi_results;
    }

    /**
     * Return table of the database.
     *
     * @param sStatement .
     * @param driver     .
     * @return results
     * @throws BEXI_SQLDriverException .
     * @throws SQLException            .
     */
    public BEXI_results select_tables(final Statement sStatement, final String driver) throws BEXI_SQLDriverException, SQLException {

        // Look for the class attribute number
        BEXI_results bexi_results = new BEXI_results();
        bexi_results._list = new BEXI_list();

        // oracle
        if (driver.equals("oracle.jdbc.driver.OracleDriver")) {
            bexi_results._SQL_query = new String[]{"select * from user_objects where object_type = 'TABLE'"};
            // select * from user_objects where object_type = 'TABLE';
            //query = "select " + classe.toUpperCase() + " from system_columns";
            // ORACLE:select table_name from system_tables;
        } else if (driver.equals("org.hsqldb.jdbcDriver")) {
            //Obsolete after 1.7
            bexi_results._SQL_query = new String[]{"SELECT * FROM SYSTEM_TABLES"};
        } else if (driver.equals("org.mysql.jdbc.Driver")) {
            bexi_results._SQL_query = new String[]{"show tables tables"};
        } else if (driver.equals("com.mysql.jdbc.Driver")) {
            bexi_results._SQL_query = new String[]{"show tables"};
        } else {
            throw new BEXI_SQLDriverException("No classes found because " + driver + " is not supported");
        }
        //System.out.println(query);
        int resultCout = 1;
        try {
            if (driver.equals("org.hsqldb.jdbcDriver")) {
                DatabaseMetaData md = sStatement.getConnection().getMetaData();
                ResultSet rs = md.getTables(null, null, "%", null);
                while (rs.next()) {
                    if (rs.getString(2).equals("PUBLIC")) {
                        bexi_results._list.add(rs.getString(3));
                        resultCout = resultCout + 1;
                    }
                }
            } else {
                sStatement.execute(bexi_results._SQL_query[0]);
                final ResultSet resultS = sStatement.getResultSet();
                while (resultS.next()) {
                    bexi_results._list.add(resultS.getString(1));
                    resultCout = resultCout + 1;
                }
            }
            if (resultCout == 0) {
                throw new BEXI_SQLDriverException("No table found");
            }
        } catch (SQLException e) {
            throw e;
        }

        return bexi_results;
    }

    /**
     * Return the list of class link.
     *
     * @param sStatement .
     * @param driver     .
     * @return class link list.
     * @throws BEXI_SQLDriverException .
     * @throws SQLException            .
     */
    public BEXI_results select_class_link(final Statement sStatement, final String driver) throws BEXI_SQLDriverException, SQLException {

        // Look for the class attribute number
        BEXI_results bexi_results = new BEXI_results();
        bexi_results._list = new BEXI_list();
        if (driver.equals("oracle.jdbc.driver.OracleDriver")) {
            bexi_results._SQL_query = new String[]{"select * from user_objects where object_type = 'TABLE'"};
        } else if (driver.equals("org.hsqldb.jdbcDriver")) {
            //Obsolete after 1.7
            bexi_results._SQL_query = new String[]{"SELECT * FROM SYSTEM_TABLES"};
        } else if (driver.equals("org.mysql.jdbc.Driver")) {
            bexi_results._SQL_query = new String[]{"show table"};
        } else if (driver.equals("com.mysql.jdbc.Driver")) {
            bexi_results._SQL_query = new String[]{"show table"};
        } else {
            throw new BEXI_SQLDriverException("No classes found because " + driver + " is not supported");
        }
        //System.out.println(query);
        int resultCout = 1;
        try {
            if (driver.equals("org.hsqldb.jdbcDriver")) {
                DatabaseMetaData md = sStatement.getConnection().getMetaData();
                ResultSet rs = md.getTables(null, null, "%", null);
                while (rs.next()) {
                    if (rs.getString(2).equals("PUBLIC")) {
                        final String[] word = rs.getString(3).split("[ *_]");
                        if (word.length == 3) {
                            bexi_results._list.add(rs.getString(3));
                            resultCout = resultCout + 1;
                        }
                    }
                }
            } else {
                sStatement.execute(bexi_results._SQL_query[0]);
                final ResultSet resultS = sStatement.getResultSet();
                while (resultS.next()) {
                    final String[] word = resultS.getString(1).split("[ *_]");
                    if (word.length == 3) {
                        bexi_results._list.add(resultS.getString(1));
                        resultCout = resultCout + 1;
                    }
                }
                resultS.close();
            }
            if (resultCout == 0) {
                throw new BEXI_SQLDriverException("No classes found");
            }
        } catch (SQLException e) {
            throw e;
        }

        return bexi_results;
    }

    /**
     * Return a list of OPENBEXI obect from SQL database according the class name and the object name.
     *
     * @param context     .
     * @param dataContext .
     * @param object      .
     * @return list of OPENBEXI object .
     */
    public Vector<BEXI_Object> select_class_object(final BEXI_SqlContext context, final BEXI_DataContext dataContext, final BEXI_Object object) {

        final Vector<BEXI_Object> objectList = new Vector<BEXI_Object>();
        String[] valueList;
        String attributList[] = object.getAttributs();
        if (attributList == null) {
            attributList = dataContext.getParserAttributList();
            object.set_attributs(attributList);
        }


        final String query = "SELECT * FROM " + object.get_className() + " WHERE NAME='" + object.get_objectName().replace('\'', '#') + "'";
        final Statement sStatement;
        int count = 0;

        sStatement = context.get_statement();

        try {
            sStatement.execute(query);
            final ResultSet result = sStatement.getResultSet();
            final ResultSetMetaData metaDataKey = result.getMetaData();
            final int col = metaDataKey.getColumnCount();
            final String[] metaKey = new String[col];
            BEXI_Object objectTmp;

            while (result.next()) {
                valueList = new String[attributList.length];
                for (int j = 1; j <= col; j++) {
                    // checkIfObjectExist head meta data
                    metaKey[j - 1] = metaDataKey.getColumnLabel(j);
                    // Set up Object value
                    for (int i = 0; i < attributList.length; i++) {
                        if (metaKey[j - 1].toUpperCase().equals(attributList[i].toUpperCase())) {
                            valueList[i] = "";
                            valueList[i] = result.getString(j);
                        }
                        if (result.wasNull()) {
                            valueList[i] = "";
                            valueList[i] = "(null)";
                        }
                    }
                } //end for column
                // Buld and add object in the list
                objectTmp = new BEXI_Object(null, object.get_className(), object.get_objectName(), attributList, valueList, null, null, false);
                objectTmp.set_lineSource("SQL database");
                objectList.add(count, objectTmp);
                count = count + 1;
            } // end while result

            result.close();

        } catch (SQLException e) {
            e.getMessage();
        }

        return objectList;
    }

    /**
     * Insert a OPENBEXI obect into the SQL database.
     *
     * @param context    .
     * @param objectList .
     */
    public void insert_class_object(final BEXI_SqlContext context, final Vector objectList) {

        if (objectList == null) return;
        final Statement sStatement;
        BEXI_Object object;
        String query;
        String query2;

        sStatement = context.get_statement();

        for (int i = 0; i < objectList.size(); i++) {
            object = (BEXI_Object) objectList.elementAt(i);
            final String[] attributList = object.getAttributs();

            // Create the table if it doesn't exist
            query = "CREATE TABLE " + object.get_className() + " (" + BEXI_Object._ID_KEY + object.get_className() + " VARCHAR (254), name VARCHAR (254)";

            for (int j = 0; j < attributList.length; j++) {
                if (!attributList[j].equals(BEXI_Object._ID_KEY)) {
                    query = query + "," + attributList[j].toUpperCase() + " VARCHAR (254)";
                }
            }
            query = query + ")";
            query2 = "CREATE UNIQUE INDEX _index_" + object.get_className() + " on " + object.get_className() + " (" + BEXI_Object._ID_KEY + ")";
            try {
                sStatement.execute(query);
                sStatement.execute(query2);
            } catch (SQLException e) {
                //System.out.println(e.getMessage());
            }

            //Insert attribut values
            query = "INSERT INTO " + object.get_className() + " VALUES('" + BEXI_Key.generateKey() + "','" + object.get_objectName();
            for (int j = 0; j < attributList.length; j++) {
                if (!attributList[j].equals(BEXI_Object._ID_KEY)) {
                    query = query + "','" + object.get_Values(attributList[j]);
                }
            }
            query = query + "')";

            try {
                //System.out.println(query);
                sStatement.execute(query);
            } catch (SQLException e) {
                //System.out.println(e.getMessage());
            }
        }

    }

    /**
     * Select the appropriate driver to execute the current action.
     *
     * @param context .
     * @param action  .
     * @param driverG .
     * @return List of result .
     * @throws SQLException            .
     * @throws BEXI_SQLDriverException .
     * @throws BEXI_ActionException    .
     */
    public Object selectListDriver(final BEXI_SqlContext context, final String action, final String driverG)
            throws SQLException, BEXI_SQLDriverException, BEXI_ActionException {

        final String[] items = action.split("[ ]");
        final String func = items[0].trim();
        Object result = null;

        try {

            if (driverG.equals("OPENBEXI")) {
                if (func.compareTo(BEXI_Action.CREATE_CLASS) == 0) {
                    create_class(context.get_statement(), items[1]);
                } else if (func.compareTo(BEXI_Action.SQL_QUERY) == 0) {
                    String query = "";
                    for (int i = 1; i < items.length; i++) {
                        if (!items[i].trim().equals(";")) query += items[i] + " ";
                    }
                    result = execute_SQL_query(context.get_statement(), query.trim(), null);
                } else if (func.compareTo(BEXI_Action.SELECT_CLASS) == 0) {
                    result = select_class(context.get_statement(), items[1]);
                } else if (func.compareTo(BEXI_Action.DELETE_CLASS) == 0) {
                    delete_class(context.get_statement(), items[1]);
                } else if (func.compareTo(BEXI_Action.CREATE_CLASS_LINK) == 0) {
                    create_class_link(context.get_statement(), items[1], items[2], items[3]);
                } else if (func.compareTo(BEXI_Action.DELETE_CLASS_LINK) == 0) {
                    try {
                        delete_class_link(context.get_statement(), items[1], items[2], items[3]);
                    } catch (SQLException e) {
                        throw e;
                    }
                } else if (func.compareTo(BEXI_Action.CREATE_CLASS_ATTRIBUT) == 0) {
                    create_class_attribut(context.get_statement(), items[1], items[2]);
                } else if (func.compareTo(BEXI_Action.DELETE_CLASS_ATTRIBUT) == 0) {
                    delete_class_attribut(context.get_statement(), items[2], items[1]);
                } else if (func.compareTo(BEXI_Action.CREATE_CLASS_OBJECT) == 0) {
                    try {
                        create_class_object(context.get_statement(), items[1], items[2]);
                    } catch (SQLException e) {
                        throw e;
                    }
                } else if (func.compareTo(BEXI_Action.DELETE_CLASS_OBJECT) == 0) {
                    delete_class_object(context.get_statement(), items[1], items[2]);
                } else if (func.compareTo(BEXI_Action.CREATE_CLASS_OBJECT_ATTRIBUT) == 0) {
                    final String[] attributs = new String[1];
                    final String[] values = new String[1];
                    attributs[0] = items[3];
                    values[0] = items[4];
                    create_class_object_attribut(context.get_statement(), items[1], items[2], attributs, values);
                } else if (func.compareTo(BEXI_Action.CREATE_CLASS_OBJECT_LINK) == 0) {
                    create_class_object_link(context.get_statement(), items[1], items[2], items[3], items[4], items[5]);
                } else if (func.compareTo(BEXI_Action.DELETE_CLASS_OBJECT_ATTRIBUT) == 0) {
                    delete_classe_object_attribut(context.get_statement(), items[1], items[2], items[3]);
                } else if (func.compareTo(BEXI_Action.SELECT_CLASSES) == 0) {
                    result = select_classes(context.get_statement(), context.get_driver());
                } else if (func.compareTo(BEXI_Action.SELECT_ONE_CLASS_ATTRIBUT) == 0) {
                    result = select_one_class_attribut(context.get_statement(), items[1]);
                } else if (func.compareTo(BEXI_Action.SELECT_RANDOM_CLASS_ATTRIBUTS) == 0) {
                    result = select_random_class_attributs(context.get_statement(), items[1]);
                } else if (func.compareTo(BEXI_Action.SELECT_CLASS_ATTRIBUT) == 0) {
                    result = select_class_attributs(context.get_statement(), items[1]);
                } else if (func.compareTo(BEXI_Action.SELECT_CLASS_OBJECT_ATTRIBUTS) == 0) {
                    if (items.length == 4) {
                        result = select_all_class_object_attributs(context.get_statement(), items[1], items[2], items[3]);
                    }
                    if (items.length == 5) {
                        result = select_all_class_object_attributs(context.get_statement(), items[1], items[2], items[3], items[4]);
                    }
                } else if (func.compareTo(BEXI_Action.SELECT_CLASS_OBJECT_LINK) == 0) {
                    result = select_all_class_object_link(context.get_statement(), items[1], items[2], items[3], items[4]);
                } else if (func.compareTo(BEXI_Action.DELETE_CLASS_OBJECT_LINK) == 0) {
                    delete_class_object_link(context.get_statement(), items[1], items[2], items[3], items[4], items[5]);
                } else {
                    String query = "";
                    for (int i = 0; i < items.length; i++) {
                        if (!items[i].trim().equals(";")) query += items[i] + " ";
                    }
                    result = execute_SQL_query(context.get_statement(), query.trim(), null);
                }
            }
        } catch (SQLException e) {
            throw e;
        } catch (BEXI_SQLDriverException e) {
            throw e;
        }
        return result;
    }

    /**
     * Select the appropriate driver to execute the current action with the OPENBEXI object.
     *
     * @param context     .
     * @param dataContext .
     * @param objects     .
     * @param func        .
     * @param driverType  .
     * @return OPENBEXI object.
     * @throws BEXI_ActionException      .
     * @throws java.io.IOException       .
     * @throws BEXI_ASCIIDriverException .
     */


    public Vector selectDriver(final BEXI_SqlContext context, final BEXI_DataContext dataContext, final Vector objects, final String func, final String driverType) throws BEXI_ActionException, IOException, BEXI_ASCIIDriverException {

        Vector objectList = null;
        if (func.compareTo("select_class_object") == 0 && driverType.equals("SQL")) {
            final BEXI_Object object = (BEXI_Object) objects.firstElement();
            objectList = select_class_object(context, dataContext, object);
        } else if (func.compareTo("select_class_object") == 0 && driverType.equals("ASCII")) {
            final BEXI_Object object = (BEXI_Object) objects.firstElement();
            BEXI_ASCIIDriver asciii_driver = new BEXI_ASCIIDriver();
            objectList = asciii_driver.select_class_object(context, dataContext, object);
        } else if (func.compareTo("insert_class_object") == 0 && driverType.equals("SQL")) {
            insert_class_object(context, objects);
        } else if (func.compareTo("insert_class_object") == 0 && driverType.equals("ASCII")) {
            //final BEXI_ASCIIDriver driver = new BEXI_ASCIIDriver();
            //driver.insert_class_object(context, objectList);
        } else {
            throw new BEXI_ActionException("This version cannot support your request, you need to get the last version");
        }
        return objectList;
    }


}
