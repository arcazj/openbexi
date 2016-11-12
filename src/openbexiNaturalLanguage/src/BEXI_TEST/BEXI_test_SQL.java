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
/**
 * Test BEXI_ApplicationContext class.
 * <li> Unit test BEXI_ApplicationContext.createContext() method;
 * <li> Unit test BEXI_ApplicationContext.setDefaultPath() method;
 */
package BEXI_TEST;

import OPENBEXI.BEXI_ApplicationPath;
import OPENBEXI.BEXI_SqlContext;
import junit.framework.TestCase;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;

public class BEXI_test_SQL extends TestCase {
    public BEXI_test_SQL(String test) {
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

    /**
     * <li> Unit test BEXI_ApplicationContext.createContext() method.
     * <li> Unit test BEXI_ApplicationContext.setDefaultPath() method.
     *
     * @throws Exception
     */
    public void testSomething() throws Exception {
        BEXI_ApplicationPath contextPath = new BEXI_ApplicationPath();
        contextPath.set_defaultLanguage("fr");
        //BEXI_SqlContext sqlContext = contextPath.get_SqlContextManager().getBEXI_SqlContext("jdbc:mysql:///bexi_fr");
        BEXI_SqlContext sqlContext = contextPath.get_SqlContextManager().getBEXI_SqlContext("jdbc:hsqldb:file:hsqldb/data/bexi_fr");
        Statement sStatement = sqlContext.get_statement();
        boolean trace = false;

        String query[] = {

                //Delete classe homme and adresse ====================================================
                //"SET FOREIGN_KEY_CHECKS=0",
                //"SET REFERENTIAL_INTEGRITY FALSE",
                //"ALTER TABLE adresse DROP CONSTRAINT posseder",
                //"ALTER TABLE adresse DROP CONSTRAINT est_localiser_par",

                "drop table adresse",
                "drop table homme",
                "drop table homme_posseder_adresse",

                //Create classe homme and adresse ======================================================
                "CREATE TABLE " + "homme" + " (id VARCHAR (254), nom VARCHAR (254))  ",
                "CREATE UNIQUE INDEX ind on " + "homme" + " (id)",

                "CREATE TABLE " + "adresse" + " (id VARCHAR (254) , nom VARCHAR (254))",
                "CREATE UNIQUE INDEX ind on " + "adresse" + " (id)",

                //"ALTER TABLE adresse  ADD CONSTRAINT posseder FOREIGN key (id) REFERENCES homme (id) ON DELETE CASCADE",
                //"ALTER TABLE adresse DROP CONSTRAINT posseder",
                //"ALTER TABLE adresse  ADD CONSTRAINT posseder FOREIGN key (id) REFERENCES homme (id) ON DELETE CASCADE",
                //"ALTER TABLE adresse  ADD CONSTRAINT habiter FOREIGN key (id) REFERENCES homme (id) ON DELETE CASCADE",
                //"ALTER TABLE adresse  ADD CONSTRAINT est_localiser_par FOREIGN key (id) REFERENCES homme (id) ON DELETE CASCADE",
                //"ALTER TABLE adresse DROP CONSTRAINT habiter",

                //Create attribut classe homme
                "ALTER TABLE homme ADD COLUMN prenom VARCHAR (254)",
                "ALTER TABLE homme ADD COLUMN profession VARCHAR (254)",
                "ALTER TABLE homme ADD COLUMN age VARCHAR (254)",

                //Create attribut classe adresse
                "ALTER TABLE adresse ADD COLUMN rue VARCHAR (254)",
                "ALTER TABLE adresse ADD COLUMN ville VARCHAR (254)",

                //Create attribut object classe homme
                "INSERT INTO homme VALUES('0','lopez','Jean','informaticien','20')",
                "INSERT INTO homme VALUES('1','Martin','eric','ouvrier','20')",
                "INSERT INTO homme VALUES('2','Dupont','Jean','cuisinier','20')",
                "INSERT INTO homme VALUES('3','Durand','eric','cuisinier','43')",

                //Create attribut object classe adresse
                "INSERT INTO adresse VALUES('0','Lopez','rue Jaures','Toulouse')",
                "INSERT INTO adresse VALUES('1','Lopez','rue des Bois','Toulouse')",
                "INSERT INTO adresse VALUES('5','Lopez','rue des Lilas','Muret')",
                "INSERT INTO adresse VALUES('2','Martin','rue des Raisins','Washington')",
                "INSERT INTO adresse VALUES('3','Dupont','rue des Lilas','Mane')",
                "INSERT INTO adresse VALUES('4','God','rue personne','sans_nom')",
                "INSERT INTO adresse VALUES('6','Durand','rue Vinci','Toulouse')",

                //Create class link
                "CREATE TABLE " + "homme_posseder_adresse" + " (id_homme VARCHAR (254), id_adresse VARCHAR (254))  ",

                //Create class object link
                "INSERT INTO homme_posseder_adresse VALUES('0','0')",
                "INSERT INTO homme_posseder_adresse VALUES('0','1')",
                "INSERT INTO homme_posseder_adresse VALUES('1','2')",
                "INSERT INTO homme_posseder_adresse VALUES('2','3')",
                "INSERT INTO homme_posseder_adresse VALUES('0','5')",
                "INSERT INTO homme_posseder_adresse VALUES('3','6')",


                "SELECT * from homme",
                "SELECT * from adresse",

                // Select attribut object: Select all the cooks
                "SELECT * from homme where profession='cuisinier'",

                // Select class object link: return all adress men
                "SELECT * from homme,homme_posseder_adresse,adresse where homme.id=homme_posseder_adresse.id_homme and homme_posseder_adresse.id_adresse=adresse.id",

                // Select class object link: Select all adresses of mem who live in Toulouse
                "SELECT * from homme,homme_posseder_adresse,adresse where adresse.ville='Toulouse' and homme.id=homme_posseder_adresse.id_homme and homme_posseder_adresse.id_adresse=adresse.id",

                // Delete object link Lopez doesn't have Toulouse Jean Jaures adress anymore
                "DELETE FROM homme_posseder_adresse where id_homme='0' and id_adresse='0' ",
                // Check link delete
                "SELECT * from homme,homme_posseder_adresse,adresse where homme.id=homme_posseder_adresse.id_homme and homme_posseder_adresse.id_adresse=adresse.id",

                // Select class object link: Select Lopez adresses
                // This last query with hsqldb only if upcase
                "SELECT * from homme,homme_posseder_adresse,adresse where homme.id=homme_posseder_adresse.id_homme and homme_posseder_adresse.id_adresse=adresse.id and homme.nom='Lopez'",

        };


        for (int i = 0; i < query.length; i++) {
            //if (i==2)break;
            // drop table may fail
            try {
                if (trace) {
                    System.out.println(i + ":" + query[i].trim().toUpperCase());
                }

                sStatement.execute(query[i].trim().toUpperCase());
                ResultSet resultS = sStatement.getResultSet();
                if (resultS != null) {
                    ResultSetMetaData metaDataKey = resultS.getMetaData();
                    int col = metaDataKey.getColumnCount();
                    int count = 0;

                    while (resultS.next()) {
                        String res = "";
                        for (int j = 0; j < col; j++) {
                            res = res + resultS.getMetaData().getColumnLabel(j + 1) + ":" + resultS.getString(j + 1) + "  ";

                        }
                        if (trace) {
                            System.out.println(res);
                        }
                        //Check if test OK
                        // Select attribut object: Select all the cooks
                        if (i == 32 && count == 0) {
                            String resTest = "ID:2  NOM:Dupont  PRENOM:Jean  PROFESSION:cuisinier  AGE:20";
                            assertEquals(resTest.trim().toUpperCase(), res.trim().toUpperCase());
                        }
                        if (i == 32 && count == 1) {
                            String resTest = "ID:3  NOM:Durand  PRENOM:eric  PROFESSION:cuisinier  AGE:43";
                            assertEquals(resTest.trim().toUpperCase(), res.trim().toUpperCase());
                        }
                        // Select class object link: return all adress men
                        if (i == 33 && count == 2) {
                            String resTest = "ID:0  NOM:Lopez  PRENOM:Jean  PROFESSION:informaticien  AGE:20  ID_HOMME:0  ID_ADRESSE:5  ID:5  NOM:Lopez  RUE:rue des Lilas  VILLE:Muret";
                            assertEquals(resTest.trim().toUpperCase(), res.trim().toUpperCase());
                        }
                        // Select class object link: Donner les adresses de tous les hommes qui habite Toulouse
                        if (i == 34 && count == 1) {
                            String resTest = "ID:0  NOM:Lopez  PRENOM:Jean  PROFESSION:informaticien  AGE:20  ID_HOMME:0  ID_ADRESSE:1  ID:1  NOM:Lopez  RUE:rue des Bois  VILLE:Toulouse";
                            assertEquals(resTest.trim().toUpperCase(), res.trim().toUpperCase());
                        }
                        // Detruire lien object Lopez doesn't have Toulouse Jean Jaures adress anymore
                        // Check link delete
                        if (i == 36 && count == 0) {
                            String resTest = "id:0  nom:Lopez  prenom:Jean  profession:informaticien  age:20  id_homme:0  id_adresse:1  id:1  nom:Lopez  rue:rue des Bois  ville:Toulouse";
                            assertEquals(resTest.trim().toUpperCase(), res.trim().toUpperCase());
                        }
                        if (i == 37 && count == 0) {
                            String resTest = "ID:0  NOM:LOPEZ  PRENOM:JEAN  PROFESSION:INFORMATICIEN  AGE:20  ID_HOMME:0  ID_ADRESSE:1  ID:1  NOM:LOPEZ  RUE:RUE DES BOIS  VILLE:TOULOUSE";
                            assertEquals(resTest.trim().toUpperCase(), res.trim().toUpperCase());
                        }
                        if (i == 37 && count == 1) {
                            String resTest = "ID:0  NOM:LOPEZ  PRENOM:JEAN  PROFESSION:INFORMATICIEN  AGE:20  ID_HOMME:0  ID_ADRESSE:5  ID:5  NOM:LOPEZ  RUE:RUE DES LILAS  VILLE:MURET";
                            assertEquals(resTest.trim().toUpperCase(), res.trim().toUpperCase());
                        }
                        count = count + 1;
                    }

                    if (trace) {
                        System.out.println("---------------------------------------------------------");
                    }
                }

            } catch (SQLException e) {
                System.out.println(e.getMessage());
                //throw e;
            }
        }

        // Select all classes
        String querySys = "select TABLE_NAME from SYSTEM_TABLES";

        //DatabaseMetaData meta=null;

        if (sqlContext.get_driverName().equals("hsqldb")) {
            sStatement.execute(querySys.toUpperCase());
            ResultSet resultS = sStatement.getResultSet();
            int count = 0;
            if (resultS != null) {
                while (resultS.next()) {
                    String res = resultS.getString(1);
                    System.out.println(res);
                    if (count == 0) {
                        String resTest = "HOMME";
                        assertEquals(resTest.trim().toUpperCase(), res.trim().toUpperCase());
                    }
                    if (count == 1) {
                        String resTest = "ADRESSE";
                        assertEquals(resTest.trim().toUpperCase(), res.trim().toUpperCase());
                    }
                    if (count == 2) {
                        String resTest = "HOMME_POSSEDER_ADRESSE";
                        assertEquals(resTest.trim().toUpperCase(), res.trim().toUpperCase());
                    }
                    count = count + 1;
                }
            }
        }
    }
}
